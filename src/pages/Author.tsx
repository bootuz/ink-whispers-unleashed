
import { useParams } from "react-router-dom";
import { Book, Calendar, FileText, UserRound } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PoemCard } from "@/components/PoemCard";

// Placeholder data - in a real app this would come from an API
const authorsData = {
  1: {
    id: 1,
    name: "Robert Frost",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    yearBorn: 1874,
    yearDied: 1963,
    bio: "Robert Frost was an American poet known for his realistic depictions of rural life and command of American colloquial speech. His work frequently employed settings from rural life in New England in the early twentieth century.",
    poems: [
      {
        id: 1,
        title: "The Road Not Taken",
        content: "Two roads diverged in a yellow wood, And sorry I could not travel both..."
      },
      {
        id: 4,
        title: "Stopping by Woods on a Snowy Evening",
        content: "Whose woods these are I think I know. His house is in the village though..."
      }
    ]
  },
  2: {
    id: 2,
    name: "Emily Dickinson",
    image: null,
    yearBorn: 1830,
    yearDied: 1886,
    bio: "Emily Dickinson was an American poet known for her reclusive lifestyle and unique style of short poems. Though virtually unknown in her lifetime, she has come to be regarded as one of the most important figures in American poetry.",
    poems: [
      {
        id: 2,
        title: "Hope is the thing with feathers",
        content: "Hope is the thing with feathers That perches in the soul..."
      },
      {
        id: 5,
        title: "Because I could not stop for Death",
        content: "Because I could not stop for Death – He kindly stopped for me..."
      }
    ]
  }
};

const Author = () => {
  const { id } = useParams<{ id: string }>();
  const author = authorsData[Number(id)];

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
              {author.image ? (
                <img
                  src={author.image}
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
                  <span>{author.yearBorn} - {author.yearDied}</span>
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
              {author.poems.map((poem) => (
                <PoemCard
                  key={poem.id}
                  id={poem.id}
                  title={poem.title}
                  author={{id: author.id, name: author.name}}
                  content={poem.content}
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
