
import { Card, CardContent } from "@/components/ui/card"
import { UserRound } from "lucide-react"
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

const authors = [
  {
    id: 1,
    name: "Robert Frost",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
  },
  {
    id: 2,
    name: "Emily Dickinson",
    image: null
  },
  {
    id: 3,
    name: "Edgar Allan Poe",
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952"
  },
  {
    id: 4,
    name: "Maya Angelou",
    image: null
  }
]

const AUTHORS_PER_PAGE = 8

const Authors = () => {
  const [currentPage, setCurrentPage] = useState(1)
  
  const totalPages = Math.ceil(authors.length / AUTHORS_PER_PAGE)
  const startIndex = (currentPage - 1) * AUTHORS_PER_PAGE
  const paginatedAuthors = authors.slice(startIndex, startIndex + AUTHORS_PER_PAGE)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-16 max-w-7xl mx-auto">
      <h1 className="text-3xl font-semibold mb-8">Authors</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full mb-8">
        {paginatedAuthors.map((author) => (
          <Link to={`/author/${author.id}`} key={author.id}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative aspect-square">
                {author.image ? (
                  <img
                    src={author.image}
                    alt={author.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <UserRound className="w-1/2 h-1/2 text-muted-foreground" />
                  </div>
                )}
              </div>
              <CardContent className="p-2">
                <h2 className="text-sm font-semibold text-center">{author.name}</h2>
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
