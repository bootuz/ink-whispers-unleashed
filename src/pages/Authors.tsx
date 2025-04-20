
import { useAuthors } from "@/hooks/useApi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { UserRound, BookOpen } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const Authors = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<"name" | "poems">("name");
  const { data: authorData, isLoading } = useAuthors(currentPage);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center px-4 py-16">
        Loading...
      </div>
    );
  }

  if (!authorData) {
    return (
      <div className="min-h-screen flex flex-col items-center px-4 py-16">
        No authors found
      </div>
    );
  }

  const totalPages = Math.ceil(authorData.count / 15); // Assuming 15 authors per page

  const sortedAuthors = [...authorData.results].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }
    // Since we don't have poem count in the API response, we'll remove this sort option
    return 0;
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-16 max-w-7xl mx-auto">
      <div className="w-full flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold">Authors</h1>
        <Select value={sortBy} onValueChange={(value: "name" | "poems") => setSortBy(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Alphabetically</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full mb-8 grid gap-y-4">
        {sortedAuthors.map((author) => (
          <Link to={`/author/${author.id}`} key={author.id}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow hover:bg-muted/20">
              <CardContent className="p-4 flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  {author.photo ? (
                    <AvatarImage src={author.photo} alt={author.name} />
                  ) : (
                    <AvatarFallback>
                      <UserRound className="w-8 h-8 text-muted-foreground" />
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="flex flex-col flex-1">
                  <h2 className="text-lg font-semibold">{author.name}</h2>
                </div>
                <Badge variant="outline" className="ml-auto">
                  View Profile
                </Badge>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
              className={currentPage <= 1 ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                onClick={() => handlePageChange(page)}
                isActive={currentPage === page}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext 
              onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
              className={currentPage >= totalPages ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default Authors;
