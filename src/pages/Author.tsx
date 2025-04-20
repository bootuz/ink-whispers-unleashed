
import { useParams } from "react-router-dom";
import { Book, Calendar, FileText, UserRound } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PoemCard } from "@/components/PoemCard";
import { useAuthor, useAuthorPoems } from "@/hooks/useApi";

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

  return (
    <div className="min-h-screen px-4 py-16 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Author info section */}
        <div className="md:col-span-1">
          <Card className="overflow-hidden">
            <div className="aspect-square relative">
              {author.photo ? (
                <img
                  src={author.photo}
                  alt={author.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <UserRound className="w-1/3 h-1/3 text-muted-foreground" />
                </div>
              )}
            </div>
            <CardContent className="p-6">
              <h1 className="text-2xl font-bold mb-4">{author.name}</h1>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Created: {new Date(author.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bio and poems section */}
        <div className="md:col-span-2 space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="h-5 w-5" />
                <h2 className="text-xl font-semibold">Biography</h2>
              </div>
              <p className="text-muted-foreground">{author.bio}</p>
            </CardContent>
          </Card>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <Book className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Poems</h2>
            </div>
            <div className="grid gap-4">
              {poems?.map((poem) => (
                <PoemCard
                  key={poem.id}
                  id={poem.id}
                  title={poem.title}
                  author={{id: author.id, name: author.name}}
                  excerpt={poem.content}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Author;
