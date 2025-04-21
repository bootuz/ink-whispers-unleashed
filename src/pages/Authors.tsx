
import { useAuthors } from "@/hooks/useApi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { UserRound, BookOpen, Eye, CalendarDays } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const Authors = () => {
  const [sortBy, setSortBy] = useState<"name" | "poems" | "date" | "views">("name");
  const { data: authors, isLoading } = useAuthors();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center px-4 py-16">
        Loading...
      </div>
    );
  }

  if (!authors?.length) {
    return (
      <div className="min-h-screen flex flex-col items-center px-4 py-16">
        No authors found
      </div>
    );
  }

  // Helper to generate random number in a range
  const randomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

  // Add temporary random poems_count and views to each author for sorting and display
  const authorsWithRandomData = authors.map(author => ({
    ...author,
    poems_count: randomNumber(5, 50),
    views: randomNumber(100, 10000),
  }));

  const sortedAuthors = [...authorsWithRandomData].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }
    if (sortBy === "poems") {
      return (b.poems_count ?? 0) - (a.poems_count ?? 0);
    }
    if (sortBy === "views") {
      return (b.views ?? 0) - (a.views ?? 0);
    }
    if (sortBy === "date") {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
    return 0;
  });

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-8 md:py-16 max-w-7xl mx-auto">
      <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold">УсакIуэхэр</h1>
        <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Alphabetically</SelectItem>
            <SelectItem value="poems">Number of Poems</SelectItem>
            <SelectItem value="views">Most Popular</SelectItem>
            <SelectItem value="date">Newest Authors</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {sortedAuthors.map((author) => (
          <Link to={`/author/${author.id}`} key={author.id}>
            <Card className="overflow-hidden hover:shadow-xl transition-shadow hover:bg-muted/30">
              <CardContent className="p-5 flex flex-col items-center gap-3">
                <Avatar className="h-16 w-16 mb-2">
                  {author.photo ? (
                    <AvatarImage src={author.photo} alt={author.name} />
                  ) : (
                    <AvatarFallback>
                      <UserRound className="w-8 h-8 text-muted-foreground" />
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="flex flex-col items-center w-full">
                  <h2 className="text-lg font-bold truncate text-center">{author.name}</h2>
                  {author.bio && author.bio.length > 10 && (
                    <div className="text-xs text-muted-foreground mt-1 line-clamp-2 text-center max-w-[90%]">
                      {author.bio.slice(0, 70)}{author.bio.length > 70 ? "…" : ""}
                    </div>
                  )}
                  <div className="flex justify-center gap-3 mt-2 w-full text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      {author.poems_count ?? "-"} Poems
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {author.views ?? "-"} Views
                    </span>
                    <span className="flex items-center gap-1">
                      <CalendarDays className="w-4 h-4" />
                      {author.created_at ? new Date(author.created_at).toLocaleDateString() : "-"}
                    </span>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className="mt-4 whitespace-nowrap self-center bg-purple-100 text-purple-800 border-transparent hover:bg-purple-200 cursor-pointer"
                >
                  View Profile
                </Badge>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Authors;
