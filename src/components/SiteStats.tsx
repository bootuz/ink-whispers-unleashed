
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
    { label: "Poems", value: totalPoems, icon: BookOpen, color: "text-purple-700" },
    { label: "Authors", value: totalAuthors, icon: User, color: "text-purple-700" },
    { label: "Views", value: totalViews, icon: BarChart2, color: "text-purple-700" },
    { label: "Likes", value: totalLikes, icon: Star, color: "text-purple-700" }
  ];
  
  if (!poemsResponse) {
    return (
      <Card className="bg-white border border-purple-100 shadow-sm rounded-xl">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <BarChart2 className="text-purple-700 h-5 w-5" />
            <h3 className="text-xl font-marck-script">Site Statistics</h3>
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
    <Card className="bg-white border border-purple-100 shadow-sm rounded-xl">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <BarChart2 className="text-purple-700 h-5 w-5" />
          <h3 className="text-xl font-marck-script">Site Statistics</h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map(stat => (
            <div key={stat.label} className="bg-purple-50 p-4 rounded-lg border border-purple-100 text-center">
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
