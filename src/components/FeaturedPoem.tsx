
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
    <Card className="overflow-hidden bg-white border border-purple-100 shadow-sm rounded-xl h-full">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Quote className="text-purple-700 h-5 w-5" />
          <h3 className="text-xl font-marck-script">Нобэрей усэр</h3>
        </div>
        
        <h4 className="text-2xl font-bold mb-2 text-gray-900">{title}</h4>
        <p className="text-sm text-purple-700 mb-4">by {author.name}</p>
        
        <div className="bg-purple-50/60 p-4 rounded-md mb-6 italic text-gray-700 border border-purple-100">
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
