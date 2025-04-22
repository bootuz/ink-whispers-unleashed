
import { useParams } from "react-router-dom";
import { Book, Calendar, FileText, UserRound, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuthor, useAuthorPoems, useThemes } from "@/hooks/useApi";
import { AuthorPoemFilter, FilterValues } from "@/components/AuthorPoemFilter";
import { PoemMetrics } from "@/components/PoemMetrics";
import { useMemo, useState } from "react";

const PRIMARY_PURPLE = "bg-purple-100 text-purple-800";
const AVATAR_GRADIENT = "bg-gradient-to-br from-purple-200 via-purple-100 to-white border-4 border-white shadow-lg";

const MOCK_DETAILS = {
  yearsActive: "N/A",
  lastActivity: "2024-04-10",
  placeOfBirth: "Unknown",
  languages: ["Адыгабзэ"],
};

const MOCK_ENGAGEMENT = { views: 100, likes: 20 };

const Author = () => {
  const { id } = useParams<{ id: string }>();
  const { data: author, isLoading: authorLoading } = useAuthor(Number(id));
  const { data: poems, isLoading: poemsLoading } = useAuthorPoems(Number(id));
  const { data: themes } = useThemes();

  // State for filtering, sorting, and search inside poems
  const [poemFilter, setPoemFilter] = useState<FilterValues>({
    sort: "date",
    theme: "all",
    search: "",
  });

  if (authorLoading || poemsLoading) {
    return <div className="min-h-screen px-4 py-16">Loading...</div>;
  }
  if (!author) {
    return <div className="min-h-screen px-4 py-16">Author not found</div>;
  }

  // Prepare categories/themes present in this author's poems (mock if themes not linked)
  const presentThemes = useMemo(() => {
    if (!poems) return [];
    const themeSet = new Map<string, { id: number; title: string }>();
    poems.forEach(poem => {
      // Try to use theme info if present
      if (poem.theme?.id && poem.theme?.title) {
        themeSet.set(poem.theme.title, { id: poem.theme.id, title: poem.theme.title });
      } else if (poem.theme_title) {
        // fallback mock, not in api? use unique title as theme
        themeSet.set(poem.theme_title, { id: Math.floor(Math.random() * 10000), title: poem.theme_title });
      }
    });
    // If no info, mock some
    if (themeSet.size === 0 && themes && themes.length > 0) {
      themes.slice(0, 3).forEach((t) => themeSet.set(t.title, { id: t.id, title: t.title }));
    }
    return Array.from(themeSet.values());
  }, [poems, themes]);

  // Filtering, grouping & sort logic
  const filteredPoemsByTheme = useMemo(() => {
    if (!poems) return {};
    let filtered = poems;

    // Search
    if (poemFilter.search) {
      filtered = filtered.filter(poem => poem.title.toLowerCase().includes(poemFilter.search.toLowerCase()) ||
        (poem.content && poem.content.toLowerCase().includes(poemFilter.search.toLowerCase()))
      );
    }
    // Theme/category filter
    if (poemFilter.theme !== "all") {
      filtered = filtered.filter(poem =>
        // try by theme title or mock
        (poem.theme?.title === poemFilter.theme) ||
        (poem.theme_title === poemFilter.theme)
      );
    }

    // Sort
    filtered = [...filtered].sort((a, b) => {
      if (poemFilter.sort === "date") {
        // Descending by created_at
        const da = new Date(a.created_at ?? 0).getTime();
        const db = new Date(b.created_at ?? 0).getTime();
        return db - da;
      }
      if (poemFilter.sort === "title") {
        return a.title.localeCompare(b.title);
      }
      if (poemFilter.sort === "views") {
        const va = (typeof a.views === "number") ? a.views : MOCK_ENGAGEMENT.views;
        const vb = (typeof b.views === "number") ? b.views : MOCK_ENGAGEMENT.views;
        return vb - va;
      }
      return 0;
    });

    // Group by current theme/category
    if (poemFilter.theme === "all" && presentThemes.length) {
      // Group poems by their theme title (or theme_title)
      const grouped: { [theme: string]: typeof poems } = {};
      presentThemes.forEach(t => grouped[t.title] = []);
      filtered.forEach(poem => {
        const themeTitle = poem.theme?.title ?? poem.theme_title ?? presentThemes[0]?.title ?? "Uncategorized";
        if (grouped[themeTitle]) grouped[themeTitle].push(poem);
        else grouped[themeTitle] = [poem];
      });
      return grouped;
    }

    // Not grouping, all filtered poems in one group
    return { "": filtered };
  }, [poems, poemFilter, presentThemes]);

  // Statistics/mocks
  const poemsCount = poems?.length ?? 0;
  const viewsCount = typeof author.views === "number" ? author.views : 2345;
  const joined = author.created_at
    ? new Date(author.created_at).toLocaleDateString()
    : "-";
  const lastActivity =
    poems && poems.length > 0
      ? new Date(poems[0].created_at).toLocaleDateString()
      : MOCK_DETAILS.lastActivity;

  // MOCK for info fields (substitute with author fields if present)
  const details = {
    fullName: author.name,
    yearsActive: MOCK_DETAILS.yearsActive,
    lastActivity: lastActivity,
    placeOfBirth: MOCK_DETAILS.placeOfBirth,
    languages: MOCK_DETAILS.languages.join(", "),
  };

  return (
    <div className="min-h-screen px-4 py-10 md:py-16 max-w-4xl mx-auto flex flex-col gap-10">
      {/* Visual Profile Header */}
      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
        <div
          className={`relative flex-shrink-0 w-36 h-36 rounded-full overflow-hidden ${AVATAR_GRADIENT} flex items-center justify-center`}
        >
          {author.photo ? (
            <img
              src={author.photo}
              alt={author.name}
              className="object-cover w-full h-full rounded-full"
            />
          ) : (
            <UserRound className="w-16 h-16 text-muted-foreground" />
          )}
        </div>
        <div className="flex-1 flex flex-col gap-3 items-center md:items-start">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">{author.name}</h1>
            <Badge
              className={`text-base font-medium px-3 py-1 border-transparent ${PRIMARY_PURPLE}`}
            >
              Автор
            </Badge>
          </div>
          <div className="flex gap-5 mt-2 text-gray-700 text-sm flex-wrap">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>Joined: {joined}</span>
            </div>
            <div className="flex items-center gap-1">
              <Book className="w-4 h-4" />
              <span>{poemsCount} Poems</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{viewsCount} Views</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bio and Author Details - Responsive grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white bg-opacity-80 border-0 shadow-none rounded-xl min-h-[180px]">
          <CardContent className="p-6 md:p-8">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="h-5 w-5 text-purple-800" />
              <h2 className="text-xl font-semibold text-purple-950">Bio</h2>
            </div>
            <p className="text-md text-muted-foreground leading-relaxed">
              {author.bio || (
                <span className="italic text-gray-400">
                  No biography provided yet.
                </span>
              )}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white bg-opacity-80 border-0 shadow-none rounded-xl min-h-[180px]">
          <CardContent className="p-6 md:p-8">
            <div className="flex items-center gap-2 mb-4">
              <UserRound className="h-5 w-5 text-purple-800" />
              <h2 className="text-xl font-semibold text-purple-950">
                Author Details
              </h2>
            </div>
            <ul className="text-md text-gray-700 space-y-2">
              <li>
                <span className="font-semibold text-purple-900">Full Name: </span>
                {details.fullName}
              </li>
              <li>
                <span className="font-semibold text-purple-900">Years Active: </span>
                {details.yearsActive}
              </li>
              <li>
                <span className="font-semibold text-purple-900">Last Activity: </span>
                {details.lastActivity}
              </li>
              <li>
                <span className="font-semibold text-purple-900">Place of Birth: </span>
                {details.placeOfBirth}
              </li>
              <li>
                <span className="font-semibold text-purple-900">Languages: </span>
                {details.languages}
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Poems Section WITH FILTERS & GROUPING */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Book className="h-5 w-5 text-purple-800" />
          <h2 className="text-xl font-semibold text-purple-950">Poems</h2>
        </div>
        <AuthorPoemFilter
          availableThemes={presentThemes}
          onFilterChange={setPoemFilter}
        />
        {/* Grouped by theme/category if "all" or single group */}
        <div className="grid gap-6">
          {Object.entries(filteredPoemsByTheme).length === 0 && (
            <div className="text-gray-400 italic">No poems yet.</div>
          )}
          {Object.entries(filteredPoemsByTheme).map(([theme, poemsInGroup]) => (
            <div key={theme || "all"}>
              {theme && <div className="font-semibold text-purple-800 mb-2 text-base">{theme}</div>}
              <div className="grid gap-3">
                {poemsInGroup.map((poem) => (
                  <Card
                    key={poem.id}
                    className="rounded-lg shadow-[0_1px_8px_0_rgba(153,110,255,0.08)] bg-purple-50/40"
                  >
                    <CardContent className="py-4 px-6">
                      <div className="flex items-center justify-between">
                        <div className="text-lg font-semibold text-purple-950">
                          {poem.title}
                        </div>
                        <div className="text-xs text-gray-400">
                          {poem.created_at && new Date(poem.created_at).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-gray-500 text-sm mt-1 line-clamp-2">
                        {poem.content
                          ? poem.content.slice(0, 140) +
                            (poem.content.length > 140 ? "…" : "")
                          : ""}
                      </div>
                      <PoemMetrics
                        views={typeof poem.views === "number" ? poem.views : MOCK_ENGAGEMENT.views}
                        likes={typeof poem.likes === "number" ? poem.likes : undefined}
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Author;
