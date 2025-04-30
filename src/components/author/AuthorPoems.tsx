
import { Book } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Theme, Poem } from "@/types/api";
import { PoemMetrics } from "@/components/PoemMetrics";
import { AuthorPoemFilter, FilterValues } from "@/components/AuthorPoemFilter";
import { Link } from "react-router-dom";

interface AuthorPoemsProps {
  poems: { [theme: string]: Poem[] };
  presentThemes: { id: number; title: string }[];
  onFilterChange: (filter: FilterValues) => void;
}

export function AuthorPoems({ poems, presentThemes, onFilterChange }: AuthorPoemsProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Book className="h-5 w-5 text-purple-800" />
        <h2 className="text-xl font-semibold text-purple-950">Poems</h2>
      </div>
      <AuthorPoemFilter
        availableThemes={presentThemes}
        onFilterChange={onFilterChange}
      />
      <div className="grid gap-6">
        {Object.entries(poems).length === 0 && (
          <div className="text-gray-400 italic">No poems yet.</div>
        )}
        {Object.entries(poems).map(([theme, poemsInGroup]) => (
          <div key={theme || "all"}>
            {theme && <div className="font-semibold text-purple-800 mb-2 text-base">{theme}</div>}
            <div className="grid gap-3">
              {poemsInGroup.map((poem) => (
                <Link 
                  key={poem.id} 
                  to={`/poem/${poem.id}`}
                  className="block transition-transform hover:scale-[1.01] focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-lg"
                >
                  <Card
                    className="rounded-lg shadow-[0_1px_8px_0_rgba(153,110,255,0.08)] bg-purple-50/40 hover:bg-purple-50/70 transition-colors"
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
                        views={typeof poem.views === "number" ? poem.views : undefined}
                        likes={typeof poem.likes === "number" ? poem.likes : undefined}
                      />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
