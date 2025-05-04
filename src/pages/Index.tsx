
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useLatestPoems, useFeaturedPoem } from "@/hooks/useApi"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { HeroSection } from "@/components/HeroSection"
import { PoemGrid } from "@/components/PoemGrid"
import { CategoryGrid } from "@/components/CategoryGrid"
import { FeaturedPoem, FeaturedPoemSkeleton } from "@/components/FeaturedPoem"
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
  
  const {
    data: featuredPoem,
    isLoading: isFeaturedLoading,
    error: featuredError
  } = useFeaturedPoem();

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

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-8 max-w-7xl mx-auto">
      {/* Hero Section with Search */}
      <HeroSection 
        searchQuery={searchQuery}
        onSearch={handleSearch}
        onKeyPress={handleKeyPress}
      />
      
      {(latestError || featuredError) && (
        <Alert variant="destructive" className="mb-6 w-full">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Unable to load poems. Please try again later.
          </AlertDescription>
        </Alert>
      )}

      <div className="w-full space-y-8">
        {/* Featured Section - 2 columns on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Featured Poem - 2/3 width on desktop */}
          <div className="lg:col-span-2">
            {isFeaturedLoading ? (
              <FeaturedPoemSkeleton />
            ) : featuredPoem ? (
              <FeaturedPoem 
                id={featuredPoem.id}
                title={featuredPoem.title}
                author={featuredPoem.author}
                excerpt={featuredPoem.excerpt}
              />
            ) : (
              <div className="p-6 bg-white border border-purple-100 shadow-sm rounded-xl">
                <p className="text-gray-600">No featured poem available.</p>
              </div>
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
          title="Усэщlэхэр" 
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
