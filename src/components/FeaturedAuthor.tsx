
import { Card, CardContent } from "@/components/ui/card"
import { User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { useAuthors } from "@/hooks/useApi"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"

export const FeaturedAuthor = () => {
  const { data: authors = [], isLoading } = useAuthors();
  
  if (isLoading || authors.length === 0) {
    return (
      <Card className="bg-white border border-purple-100 shadow-sm rounded-xl h-full">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <User className="text-purple-700 h-5 w-5" />
            <h3 className="text-xl font-marck-script">Featured Author</h3>
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
    <Card className="bg-white border border-purple-100 shadow-sm rounded-xl h-full">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <User className="text-purple-700 h-5 w-5" />
          <h3 className="text-xl font-marck-script">Нобэрей усакlуэр</h3>
        </div>
        
        <div className="mb-4">
          <h4 className="text-lg font-bold mb-2 text-gray-900">{featuredAuthor.name}</h4>
          <p className="text-gray-600 line-clamp-3">
            {featuredAuthor.bio || "An accomplished Circassian poet with a unique voice and perspective."}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge className="bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100">
            {featuredAuthor.poems_count || 0} poems
          </Badge>
          <Badge className="bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100">
            {featuredAuthor.views || 0} views
          </Badge>
        </div>
        
        <Link to={`/author/${featuredAuthor.id}`}>
          <Button variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50 w-full">
            View Profile
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};
