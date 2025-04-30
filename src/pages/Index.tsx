
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useLatestPoems } from "@/hooks/useApi"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { HeroSection } from "@/components/HeroSection"
import { PoemGrid } from "@/components/PoemGrid"
import { CategoryGrid } from "@/components/CategoryGrid"
import { FeaturedPoem } from "@/components/FeaturedPoem"
import { FeaturedAuthor } from "@/components/FeaturedAuthor"
import { SiteStats } from "@/components/SiteStats"

const Index = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const { 
    data: latestPoems = [], 
    isLoading: isLoadingLatest,
    error: latestError 
  } = useLatestPoems();

  const handleNewPoemsMore = () => {
    navigate('/poems?filter=new');
  };

  const handlePopularPoemsMore = () => {
    navigate('/poems?filter=popular');
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  
  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      navigate(`/poems?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  // Featured poem - in a real app, this would come from an API
  // For now, use the first poem from latestPoems if available
  const featuredPoem = latestPoems.length > 0 ? latestPoems[0] : null;

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-8 max-w-7xl mx-auto">
      {/* Hero Section with Search */}
      <HeroSection 
        searchQuery={searchQuery}
        onSearch={handleSearch}
        onKeyPress={handleKeyPress}
      />
      
      {latestError && (
        <Alert variant="destructive" className="mb-6 w-full">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Unable to load latest poems. Please try again later.
          </AlertDescription>
        </Alert>
      )}

      <div className="w-full space-y-12">
        {/* Featured Section - 2 columns on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Featured Poem - 2/3 width on desktop */}
          <div className="lg:col-span-2">
            {featuredPoem && (
              <FeaturedPoem 
                id={featuredPoem.id}
                title={featuredPoem.title}
                author={featuredPoem.author}
                excerpt={featuredPoem.excerpt || "This beautiful poem showcases the rich cultural heritage and poetic traditions..."}
              />
            )}
          </div>
          
          {/* Featured Author - 1/3 width on desktop */}
          <div>
            <FeaturedAuthor />
          </div>
        </div>
        
        {/* Categories/Genres Grid */}
        <CategoryGrid />
        
        {/* Latest Poems */}
        <PoemGrid 
          title="УсэщIэхэр" 
          poems={latestPoems}
          onMoreClick={handleNewPoemsMore}
          hasMore={true}
          loading={isLoadingLatest}
        />
        
        {/* Popular Poems */}
        <PoemGrid 
          title="Нэхъ зэджэ усэхэр" 
          poems={latestPoems.slice().sort((a, b) => (b.views || 0) - (a.views || 0))}
          onMoreClick={handlePopularPoemsMore}
          hasMore={true}
        />
        
        {/* Site Statistics */}
        <SiteStats />
      </div>
    </div>
  )
}

export default Index
