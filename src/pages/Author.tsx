import { useParams } from "react-router-dom";
import { useAuthor, useAuthorPoems, useThemes } from "@/hooks/useApi";
import { AuthorHeader } from "@/components/author/AuthorHeader";
import { AuthorInfoCards } from "@/components/author/AuthorInfoCards";
import { AuthorPoems } from "@/components/author/AuthorPoems";
import { FilterValues } from "@/components/AuthorPoemFilter";
import { useMemo, useState, useEffect } from "react";

const MOCK_DETAILS = {
  yearsActive: "N/A",
  placeOfBirth: "Unknown",
  languages: ["Адыгабзэ"],
};

const Author = () => {
  const { id } = useParams<{ id: string }>();
  const [shouldCountView, setShouldCountView] = useState(true);
  const { data: author, isLoading: authorLoading } = useAuthor(Number(id), shouldCountView);
  const { data: poems, isLoading: poemsLoading } = useAuthorPoems(Number(id));
  const { data: themes } = useThemes();
  
  useEffect(() => {
    const authorViewKey = `author_viewed_${id}`;
    const alreadyViewed = sessionStorage.getItem(authorViewKey);
    
    if (!alreadyViewed) {
      sessionStorage.setItem(authorViewKey, 'true');
      setShouldCountView(true);
    } else {
      setShouldCountView(false);
    }
  }, [id]);

  const [poemFilter, setPoemFilter] = useState<FilterValues>({
    sort: "date",
    theme: "all",
    search: "",
  });

  const presentThemes = useMemo(() => {
    if (!poems) return [];
    const themeSet = new Map<string, { id: number; title: string }>();
    poems.forEach(poem => {
      if (poem.theme?.id && poem.theme?.title) {
        themeSet.set(poem.theme.title, { id: poem.theme.id, title: poem.theme.title });
      } else if (poem.category?.title) {
        themeSet.set(poem.category.title, { id: poem.category.id, title: poem.category.title });
      }
    });
    if (themeSet.size === 0 && themes && themes.length > 0) {
      themes.slice(0, 3).forEach((t) => themeSet.set(t.title, { id: t.id, title: t.title }));
    }
    return Array.from(themeSet.values());
  }, [poems, themes]);

  const filteredPoemsByTheme = useMemo(() => {
    if (!poems) return {};
    let filtered = poems;

    if (poemFilter.search) {
      filtered = filtered.filter(poem => poem.title.toLowerCase().includes(poemFilter.search.toLowerCase()) ||
        (poem.content && poem.content.toLowerCase().includes(poemFilter.search.toLowerCase()))
      );
    }
    if (poemFilter.theme !== "all") {
      filtered = filtered.filter(poem =>
        (poem.theme?.title === poemFilter.theme) ||
        (poem.category?.title === poemFilter.theme)
      );
    }

    filtered = [...filtered].sort((a, b) => {
      if (poemFilter.sort === "date") {
        const da = new Date(a.created_at ?? 0).getTime();
        const db = new Date(b.created_at ?? 0).getTime();
        return db - da;
      }
      if (poemFilter.sort === "title") {
        return a.title.localeCompare(b.title);
      }
      if (poemFilter.sort === "views") {
        const va = (typeof a.views === "number") ? a.views : MOCK_DETAILS.views;
        const vb = (typeof b.views === "number") ? b.views : MOCK_DETAILS.views;
        return vb - va;
      }
      return 0;
    });

    if (poemFilter.theme === "all" && presentThemes.length) {
      const grouped: { [theme: string]: typeof poems } = {};
      presentThemes.forEach(t => grouped[t.title] = []);
      filtered.forEach(poem => {
        const themeTitle = poem.theme?.title ?? poem.category?.title ?? presentThemes[0]?.title ?? "Uncategorized";
        if (grouped[themeTitle]) grouped[themeTitle].push(poem);
        else grouped[themeTitle] = [poem];
      });
      return grouped;
    }

    return { "": filtered };
  }, [poems, poemFilter, presentThemes]);

  if (authorLoading || poemsLoading) {
    return <div className="min-h-screen px-4 py-16">Loading...</div>;
  }
  
  if (!author) {
    return <div className="min-h-screen px-4 py-16">Author not found</div>;
  }

  const details = {
    yearsActive: MOCK_DETAILS.yearsActive,
    lastActivity: poems && poems.length > 0
      ? new Date(poems[0].created_at).toLocaleDateString()
      : "-",
    placeOfBirth: MOCK_DETAILS.placeOfBirth,
    languages: MOCK_DETAILS.languages.join(", "),
  };

  return (
    <div className="min-h-screen px-4 py-10 md:py-16 max-w-4xl mx-auto flex flex-col gap-10">
      <AuthorHeader
        name={author.name}
        photo={author.photo}
        joined={author.created_at ? new Date(author.created_at).toLocaleDateString() : "-"}
        poemsCount={poems?.length ?? 0}
        viewsCount={author.views}
      />

      <AuthorInfoCards
        bio={author.bio}
        details={details}
      />

      <AuthorPoems
        poems={filteredPoemsByTheme}
        presentThemes={presentThemes}
        onFilterChange={setPoemFilter}
      />
    </div>
  );
};

export default Author;
