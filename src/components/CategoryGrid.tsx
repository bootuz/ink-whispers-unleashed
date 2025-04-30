
import { useThemes } from "@/hooks/useApi"
import { Book, BookOpen } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom"
import { Skeleton } from "@/components/ui/skeleton"

export const CategoryGrid = () => {
  const { data: themes = [], isLoading } = useThemes();
  
  if (isLoading) {
    return (
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="text-purple-800 h-5 w-5" />
          <h2 className="text-2xl font-playfair">Categories</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <Skeleton key={i} className="h-20 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }
  
  // Show only top categories (max 8)
  const displayThemes = themes.slice(0, 8);
  
  // Color variations for category cards
  const bgColors = [
    "bg-purple-100", "bg-blue-100", "bg-pink-100", "bg-green-100", 
    "bg-yellow-100", "bg-indigo-100", "bg-red-100", "bg-orange-100"
  ];
  
  const textColors = [
    "text-purple-800", "text-blue-800", "text-pink-800", "text-green-800", 
    "text-yellow-800", "text-indigo-800", "text-red-800", "text-orange-800"
  ];
  
  const borderColors = [
    "border-purple-200", "border-blue-200", "border-pink-200", "border-green-200", 
    "border-yellow-200", "border-indigo-200", "border-red-200", "border-orange-200"
  ];

  return (
    <div className="mb-12">
      <div className="flex items-center gap-2 mb-6">
        <BookOpen className="text-purple-800 h-5 w-5" />
        <h2 className="text-2xl font-playfair">Categories</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {displayThemes.map((theme, index) => (
          <Link 
            to={`/poems?genre=${theme.title.toLowerCase()}`}
            key={theme.id} 
            className={`rounded-lg ${bgColors[index % bgColors.length]} ${borderColors[index % borderColors.length]} border p-4 
              flex flex-col items-center justify-center text-center transition-transform hover:scale-105 
              focus:outline-none focus:ring-2 focus:ring-purple-400 h-24 md:h-32`}
          >
            <Book className={`${textColors[index % textColors.length]} h-6 w-6 mb-2`} />
            <span className={`font-medium ${textColors[index % textColors.length]}`}>
              {theme.title}
            </span>
            <Badge variant="outline" className="mt-1 bg-white/50">
              {theme.poems_count ?? 0} poems
            </Badge>
          </Link>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <Link to="/poems" className="text-purple-700 hover:text-purple-900 text-sm font-medium">
          View all categories →
        </Link>
      </div>
    </div>
  );
};
