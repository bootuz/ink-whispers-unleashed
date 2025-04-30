
import { Card, CardContent } from "@/components/ui/card"
import { User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { useAuthors } from "@/hooks/useApi"
import { Skeleton } from "@/components/ui/skeleton"

export const FeaturedAuthor = () => {
  const { data: authors = [], isLoading } = useAuthors();
  
  if (isLoading || authors.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <User className="text-purple-800 h-5 w-5" />
            <h3 className="text-xl font-semibold">Featured Author</h3>
          </div>
          <Skeleton className="h-24 mb-4" />
          <Skeleton className="h-10 w-32" />
        </CardContent>
      </Card>
    );
  }
  
  // Get a featured author (could be random, most poems, etc.)
  // For now, just take the first one
  const featuredAuthor = authors[0];
  
  return (
    <Card className="bg-purple-50/70 border-purple-200">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <User className="text-purple-800 h-5 w-5" />
          <h3 className="text-xl font-semibold text-purple-900">Featured Author</h3>
        </div>
        
        <div className="mb-4">
          <h4 className="text-lg font-bold mb-2">{featuredAuthor.name}</h4>
          <p className="text-gray-600 line-clamp-3">
            {featuredAuthor.bio || "An accomplished Circassian poet with a unique voice and perspective."}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
            {featuredAuthor.poems_count || 0} poems
          </Badge>
          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
            {featuredAuthor.views || 0} views
          </Badge>
        </div>
        
        <Link to={`/author/${featuredAuthor.id}`}>
          <Button variant="outline" className="border-purple-300 text-purple-800 hover:bg-purple-100">
            View Profile
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};
