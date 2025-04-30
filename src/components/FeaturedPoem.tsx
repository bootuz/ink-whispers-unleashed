
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

interface FeaturedPoemProps {
  id: number;
  title: string;
  author: { id: number; name: string };
  excerpt?: string; // Make excerpt optional
}

export const FeaturedPoem = ({ id, title, author, excerpt }: FeaturedPoemProps) => {
  return (
    <Card className="overflow-hidden bg-purple-100/40 border-purple-200 shadow-md">
      <CardContent className="p-6 md:p-8">
        <div className="flex items-center gap-2 mb-4">
          <Quote className="text-purple-800 h-6 w-6" />
          <h3 className="text-xl font-semibold text-purple-900">Featured Poem</h3>
        </div>
        
        <h4 className="text-2xl font-bold mb-2 text-purple-950">{title}</h4>
        <p className="text-sm text-purple-800 mb-4">by {author.name}</p>
        
        <div className="bg-white/60 p-4 rounded-md mb-6 italic text-gray-700">
          {excerpt || "This beautiful poem showcases the rich cultural heritage and poetic traditions..."}
        </div>
        
        <Link to={`/poem/${id}`}>
          <Button 
            variant="default" 
            className="w-full md:w-auto bg-purple-600 hover:bg-purple-700 transition-colors"
          >
            <BookOpen className="mr-2 h-5 w-5" />
            Read Full Poem
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
