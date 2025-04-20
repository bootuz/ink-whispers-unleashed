
import { Card, CardContent } from "@/components/ui/card"
import { UserRound } from "lucide-react"

// Placeholder data for authors
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

const Authors = () => {
  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-16 max-w-7xl mx-auto">
      <h1 className="text-3xl font-semibold mb-8">Authors</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
        {authors.map((author) => (
          <Card key={author.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative aspect-square">
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
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold text-center">{author.name}</h2>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Authors
