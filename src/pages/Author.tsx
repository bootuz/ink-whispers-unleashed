
import { useParams } from "react-router-dom";
import { Book, Calendar, FileText, UserRound, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuthor, useAuthorPoems } from "@/hooks/useApi";

const PRIMARY_PURPLE = "bg-purple-100 text-purple-800";
const AVATAR_GRADIENT =
  "bg-gradient-to-br from-purple-200 via-purple-100 to-white border-4 border-white shadow-lg";

const MOCK_DETAILS = {
  yearsActive: "N/A",
  lastActivity: "2024-04-10",
  placeOfBirth: "Unknown",
  languages: ["Адыгабзэ"],
};

const Author = () => {
  const { id } = useParams<{ id: string }>();
  const { data: author, isLoading: authorLoading } = useAuthor(Number(id));
  const { data: poems, isLoading: poemsLoading } = useAuthorPoems(Number(id));

  if (authorLoading || poemsLoading) {
    return <div className="min-h-screen px-4 py-16">Loading...</div>;
  }

  if (!author) {
    return <div className="min-h-screen px-4 py-16">Author not found</div>;
  }

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

      {/* Poems section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Book className="h-5 w-5 text-purple-800" />
          <h2 className="text-xl font-semibold text-purple-950">Poems</h2>
        </div>
        <div className="grid gap-4">
          {poems && poems.length > 0 ? (
            poems.map((poem) => (
              <Card
                key={poem.id}
                className="rounded-lg shadow-[0_1px_8px_0_rgba(153,110,255,0.08)] bg-purple-50/40"
              >
                <CardContent className="py-4 px-6">
                  <div className="text-lg font-semibold text-purple-950">
                    {poem.title}
                  </div>
                  <div className="text-gray-500 text-sm mt-1 line-clamp-2">
                    {poem.content
                      ? poem.content.slice(0, 140) +
                        (poem.content.length > 140 ? "…" : "")
                      : ""}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-gray-400 italic">No poems yet.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Author;

