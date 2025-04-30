
import { Card, CardContent } from "@/components/ui/card"
import { BarChart2, BookOpen, Star, User } from "lucide-react"
import { useAuthors, usePoems } from "@/hooks/useApi"
import { Skeleton } from "@/components/ui/skeleton"

export const SiteStats = () => {
  const { data: poemsResponse } = usePoems();
  const { data: authors = [] } = useAuthors();
  
  const poems = poemsResponse?.pages?.flatMap(page => page.results) || [];
  const totalPoems = poems.length;
  const totalAuthors = authors.length;
  
  // Placeholder stats - in a real app these would come from API
  const totalViews = 1250;
  const totalLikes = 367;
  
  const stats = [
    { label: "Poems", value: totalPoems, icon: BookOpen, color: "text-blue-600" },
    { label: "Authors", value: totalAuthors, icon: User, color: "text-purple-600" },
    { label: "Views", value: totalViews, icon: BarChart2, color: "text-green-600" },
    { label: "Likes", value: totalLikes, icon: Star, color: "text-amber-600" }
  ];
  
  if (!poemsResponse) {
    return (
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <BarChart2 className="text-purple-800 h-5 w-5" />
            <h3 className="text-xl font-semibold">Site Statistics</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <Skeleton key={i} className="h-20" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-blue-100">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <BarChart2 className="text-purple-800 h-5 w-5" />
          <h3 className="text-xl font-semibold text-purple-900">Site Statistics</h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map(stat => (
            <div key={stat.label} className="bg-white/70 p-4 rounded-lg shadow-sm text-center">
              <stat.icon className={`mx-auto mb-2 h-6 w-6 ${stat.color}`} />
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
