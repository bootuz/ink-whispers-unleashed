import { SearchBar } from "@/components/SearchBar"
import { FilterBar } from "@/components/FilterBar"
import { PoemGrid } from "@/components/PoemGrid"
import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { usePoems, useSearchPoems } from "@/hooks/useApi"
import { Poem } from "@/types/api"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "@/hooks/use-toast"

const Poems = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filterType = searchParams.get('filter');
  const selectedGenre = searchParams.get('genre');
  const selectedAuthor = searchParams.get('author');
  const searchQuery = searchParams.get('q') || '';
  
  const { 
    data: poemsResponse, 
    isLoading: isLoadingPoems,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    error: poemsError
  } = usePoems();
  
  const {
    data: searchResults,
    isLoading: isLoadingSearch,
    error: searchError
  } = useSearchPoems(searchQuery);

  if (poemsError || searchError) {
    console.error("API Error:", poemsError || searchError);
    toast({
      title: "Error loading poems",
      description: "Please try again later",
      variant: "destructive"
    });
  }

  const handleSearch = (query: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (query) {
      newParams.set('q', query);
    } else {
      newParams.delete('q');
    }
    setSearchParams(newParams);
  };

  const poemsFromPages: Poem[] = poemsResponse?.pages 
    ? poemsResponse.pages.flatMap(page => page.results) 
    : [];
    
  const poems = searchQuery ? (searchResults || []) : poemsFromPages;
  const isLoading = searchQuery ? isLoadingSearch : isLoadingPoems;
  
  const filteredPoems = (() => {
    if (!poems?.length) return [];
    if (filterType === 'new') {
      return [...poems].sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    } else if (filterType === 'popular') {
      return [...poems].reverse();
    }
    return poems;
  })();

  const handleMoreClick = () => {
    fetchNextPage();
  };

  const getPageTitle = () => {
    if (searchQuery) {
      return `Search results for "${searchQuery}"`;
    }
    if (selectedAuthor) {
      return `Poems by ${selectedAuthor === 'frost' ? 'Robert Frost' : 
        selectedAuthor === 'dickinson' ? 'Emily Dickinson' : 
        selectedAuthor === 'poe' ? 'Edgar Allan Poe' : 'All Authors'}`;
    }
    if (selectedGenre) {
      return `${selectedGenre.charAt(0).toUpperCase() + selectedGenre.slice(1)} Poems`;
    }
    if (filterType === 'new') return "New Poems";
    if (filterType === 'popular') return "Popular Poems";
    return "Усэу хъуар";
  };

  return (
    <div className="min-h-screen px-4 py-16 max-w-7xl mx-auto">
      <div className="max-w-2xl mx-auto mb-8">
        <SearchBar 
          value={searchQuery}
          onSearch={handleSearch}
        />
      </div>
      <FilterBar />
      
      <div className="mt-8">
        {isLoading && poems.length === 0 ? (
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
            hasMore={!searchQuery && !!hasNextPage}
            loading={isFetchingNextPage}
            onMoreClick={handleMoreClick}
          />
        )}
      </div>
    </div>
  )
}

export default Poems
