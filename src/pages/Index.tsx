
import { SearchBar } from "@/components/SearchBar"
import { PoemGrid } from "@/components/PoemGrid"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useLatestPoems } from "@/hooks/useApi"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

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

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-16 max-w-7xl mx-auto">
      <h1 
        className="text-5xl mb-8 tracking-wider text-center"
        style={{
          fontFamily: "'Marck Script', cursive",
          fontWeight: 400,
          fontStyle: "normal"
        }}
      >
        Усэрадэ
      </h1>
      <SearchBar 
        className="mb-16" 
        value={searchQuery}
        onSearch={handleSearch}
        onKeyDown={handleKeyPress}
      />
      
      {latestError && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Unable to load latest poems. Please try again later.
          </AlertDescription>
        </Alert>
      )}

      <div className="w-full space-y-16">
        {isLoadingLatest ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="overflow-hidden rounded-lg border border-gray-200">
                <Skeleton className="h-[200px] w-full" />
              </div>
            ))}
          </div>
        ) : (
          <PoemGrid 
            title="УсэщIэхэр" 
            poems={latestPoems}
            onMoreClick={handleNewPoemsMore}
          />
        )}
        
        <PoemGrid 
          title="Нэхъ зэджэ усэхэр" 
          poems={[]} // For now, keeping this empty as we don't have a popular poems endpoint
          onMoreClick={handlePopularPoemsMore}
        />
      </div>
    </div>
  )
}

export default Index
