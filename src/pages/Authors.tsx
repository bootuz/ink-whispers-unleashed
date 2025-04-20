import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, UserRound } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const authors = [
  {
    id: 1,
    name: "Robert Frost",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    poemCount: 12
  },
  {
    id: 2,
    name: "Emily Dickinson",
    image: null,
    poemCount: 8
  },
  {
    id: 3,
    name: "Edgar Allan Poe",
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
    poemCount: 15
  },
  {
    id: 4,
    name: "Maya Angelou",
    image: null,
    poemCount: 7
  },
  {
    id: 5,
    name: "Walt Whitman",
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742",
    poemCount: 10
  }
]

const AUTHORS_PER_PAGE = 15

const Authors = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState<"name" | "poems">("name")
  
  const sortedAuthors = [...authors].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name)
    }
    return b.poemCount - a.poemCount
  })

  const totalPages = Math.ceil(sortedAuthors.length / AUTHORS_PER_PAGE)
  const startIndex = (currentPage - 1) * AUTHORS_PER_PAGE
  const paginatedAuthors = sortedAuthors.slice(startIndex, startIndex + AUTHORS_PER_PAGE)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

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
            <SelectItem value="poems">Number of poems</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full space-y-4 mb-8">
        {paginatedAuthors.map((author) => (
          <Link to={`/author/${author.id}`} key={author.id}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow hover:bg-muted/20">
              <CardContent className="p-4 flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  {author.image ? (
                    <AvatarImage src={author.image} alt={author.name} />
                  ) : (
                    <AvatarFallback>
                      <UserRound className="w-8 h-8 text-muted-foreground" />
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="flex flex-col flex-1">
                  <h2 className="text-lg font-semibold">{author.name}</h2>
                  <div className="flex items-center mt-1">
                    <BookOpen className="w-4 h-4 text-muted-foreground mr-1" />
                    <span className="text-sm text-muted-foreground">{author.poemCount} poems</span>
                  </div>
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
  )
}

export default Authors
