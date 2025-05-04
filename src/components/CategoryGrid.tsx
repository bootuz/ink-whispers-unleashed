
import { useThemes } from "@/hooks/useApi"
import { Book, BookOpen } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom"
import { Skeleton } from "@/components/ui/skeleton"
import { useState, useEffect } from "react"
import { API_BASE_URL, API_ENDPOINTS } from "@/lib/api-config"

// Array of gradient classes for category cards
const gradientColors = [
  "from-pink-50 to-pink-100 border-pink-200 text-pink-800",
  "from-blue-50 to-blue-100 border-blue-200 text-blue-800",
  "from-green-50 to-green-100 border-green-200 text-green-800",
  "from-yellow-50 to-yellow-100 border-yellow-200 text-yellow-800",
  "from-orange-50 to-orange-100 border-orange-200 text-orange-800",
  "from-red-50 to-red-100 border-red-200 text-red-800",
  "from-indigo-50 to-indigo-100 border-indigo-200 text-indigo-800",
  "from-purple-50 to-purple-100 border-purple-200 text-purple-800",
];

export const CategoryGrid = () => {
  const { data: themes = [], isLoading } = useThemes();
  const [themePoems, setThemePoems] = useState<Record<number, number>>({});
  
  // Only show top categories (max 8)
  const displayThemes = themes.slice(0, 8);
  
  // Fetch poem counts for each theme
  useEffect(() => {
    if (displayThemes.length > 0) {
      const fetchPoemCounts = async () => {
        const counts: Record<number, number> = {};
        
        for (const theme of displayThemes) {
          try {
            const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.themePoems(theme.id)}`);
            if (response.ok) {
              const data = await response.json();
              counts[theme.id] = Array.isArray(data) ? data.length : 0;
            }
          } catch (error) {
            console.error(`Error fetching poems for theme ${theme.id}:`, error);
            counts[theme.id] = 0;
          }
        }
        
        setThemePoems(counts);
      };
      
      fetchPoemCounts();
    }
  }, [displayThemes]);
  
  if (isLoading) {
    return (
      <div className="mb-8 bg-white rounded-xl p-6 shadow-sm border border-purple-100">
        <div className="flex items-center gap-2 mb-6">
          <BookOpen className="text-purple-700 h-5 w-5" />
          <h2 className="text-2xl font-marck-script">Categories</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <Skeleton key={i} className="h-20 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div className="mb-8 bg-white rounded-xl p-6 shadow-sm border border-purple-100">
      <div className="flex items-center gap-2 mb-6">
        <BookOpen className="text-purple-700 h-5 w-5" />
        <h2 className="text-2xl font-marck-script">Жанрхэр</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {displayThemes.map((theme, index) => (
          <Link 
            to={`/poems?genre=${theme.title.toLowerCase()}`}
            key={theme.id} 
            className={`rounded-lg bg-gradient-to-br ${gradientColors[index % gradientColors.length]} border p-4 
              flex flex-col items-center justify-center text-center transition-all hover:scale-105 
              focus:outline-none focus:ring-2 focus:ring-purple-400 h-24 md:h-32 shadow-sm`}
          >
            <Book className={`h-6 w-6 mb-2 ${gradientColors[index % gradientColors.length].includes('purple') ? 'text-purple-700' : ''}`} />
            <span className="font-medium">
              {theme.title}
            </span>
            <Badge variant="outline" className="mt-1 bg-white/70 border border-opacity-20 text-opacity-90">
              {themePoems[theme.id] || 0} poems
            </Badge>
          </Link>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <Link to="/poems" className="text-purple-700 hover:text-purple-900 text-sm font-medium flex items-center gap-1 hover:underline">
          View all categories →
        </Link>
      </div>
    </div>
  );
};
