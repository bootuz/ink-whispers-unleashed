
import { SearchBar } from "@/components/SearchBar";
import { FilterBar } from "@/components/FilterBar";
import { PoemGrid } from "@/components/PoemGrid";
import { PoemError } from "@/components/PoemError";
import { usePoemsPage } from "@/hooks/usePoems";
import { Skeleton } from "@/components/ui/skeleton";

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

  return (
    <div className="min-h-screen px-4 py-16 max-w-7xl mx-auto">
      <div className="max-w-2xl mx-auto mb-8">
        <SearchBar />
      </div>
      <FilterBar />
      
      {(poemsError || searchError || themePoemsError || authorPoemsError) && <PoemError />}
      
      <div className="mt-8">
        {isLoading && filteredPoems.length === 0 ? (
          <div>
            <h2 className="text-2xl font-playfair mb-6">{getPageTitle()}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
