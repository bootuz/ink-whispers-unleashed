
import { useAuthors } from "@/hooks/useApi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { UserRound } from "lucide-react"
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
  const [sortBy, setSortBy] = useState<"name" | "poems">("name");
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

  const sortedAuthors = [...authors].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-8 md:py-16 max-w-7xl mx-auto">
      <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold">УсакIуэхэр</h1>
        <Select value={sortBy} onValueChange={(value: "name" | "poems") => setSortBy(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Alphabetically</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full mb-8 grid gap-4">
        {sortedAuthors.map((author) => (
          <Link to={`/author/${author.id}`} key={author.id}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow hover:bg-muted/20">
              <CardContent className="p-4 flex items-center space-x-4">
                <Avatar className="h-12 w-12 md:h-16 md:w-16">
                  {author.photo ? (
                    <AvatarImage src={author.photo} alt={author.name} />
                  ) : (
                    <AvatarFallback>
                      <UserRound className="w-6 h-6 md:w-8 md:h-8 text-muted-foreground" />
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="flex flex-col flex-1 min-w-0">
                  <h2 className="text-base md:text-lg font-semibold truncate">{author.name}</h2>
                </div>
                <Badge variant="outline" className="ml-auto whitespace-nowrap">
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
