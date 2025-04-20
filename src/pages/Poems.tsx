
import { SearchBar } from "@/components/SearchBar";
import { FilterBar } from "@/components/FilterBar";
import { PoemGrid } from "@/components/PoemGrid";
import { PoemError } from "@/components/PoemError";
import { usePoemsPage } from "@/hooks/usePoems";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate, useSearchParams } from "react-router-dom";

const Poems = () => {
  const {
    filteredPoems,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    getPageTitle,
    poemsError,
    searchError,
    themePoemsError,
    authorPoemsError
  } = usePoemsPage();
  
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  
  const handleSearch = (query: string) => {
    const currentParams = new URLSearchParams(searchParams);
    
    if (query) {
      currentParams.set('q', query);
    } else {
      currentParams.delete('q');
    }
    
    // Reset any filter params when doing a search
    currentParams.delete('filter');
    currentParams.delete('genre');
    currentParams.delete('author');
    
    navigate(`/poems?${currentParams.toString()}`);
  };
  
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      const target = event.target as HTMLInputElement;
      handleSearch(target.value);
    }
  };

  return (
    <div className="min-h-screen px-4 py-8 md:py-16 max-w-7xl mx-auto">
      <div className="max-w-2xl mx-auto mb-4">
        <SearchBar 
          value={searchQuery}
          onSearch={handleSearch}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="max-w-2xl mx-auto mb-6 md:mb-8">
        <FilterBar />
      </div>
      
      {(poemsError || searchError || themePoemsError || authorPoemsError) && <PoemError />}
      
      <div className="mt-6 md:mt-8">
        {isLoading && filteredPoems.length === 0 ? (
          <div>
            <h2 className="text-xl md:text-2xl font-playfair mb-4 md:mb-6">{getPageTitle()}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="overflow-hidden rounded-lg border border-gray-200">
                  <Skeleton className="h-[200px] w-full" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <PoemGrid 
            title={getPageTitle()} 
            poems={filteredPoems}
            hasMore={!!hasNextPage}
            loading={isFetchingNextPage}
            onMoreClick={fetchNextPage}
          />
        )}
      </div>
    </div>
  );
};

export default Poems;
