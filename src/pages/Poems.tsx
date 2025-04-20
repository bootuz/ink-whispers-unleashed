
import { SearchBar } from "@/components/SearchBar"
import { FilterBar } from "@/components/FilterBar"
import { PoemGrid } from "@/components/PoemGrid"
import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { usePoems, useSearchPoems } from "@/hooks/useApi"

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
    isFetchingNextPage
  } = usePoems();
  
  const {
    data: searchResults,
    isLoading: isLoadingSearch
  } = useSearchPoems(searchQuery);

  const handleSearch = (query: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (query) {
      newParams.set('q', query);
    } else {
      newParams.delete('q');
    }
    setSearchParams(newParams);
  };

  // Flatten the pages from infinite query
  const poemsFromPages: Poem[] = poemsResponse?.pages 
    ? poemsResponse.pages.flatMap(page => page.results) 
    : [];
    
  // Use search results if there's a query, otherwise use paginated poems
  const poems = searchQuery ? searchResults || [] : poemsFromPages;
  const isLoading = searchQuery ? isLoadingSearch : isLoadingPoems;
  
  // Filter poems based on URL parameter
  const filteredPoems = (() => {
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

  if (isLoading && poems.length === 0) {
    return <div className="min-h-screen px-4 py-16">Loading...</div>;
  }

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
        <PoemGrid 
          title={getPageTitle()} 
          poems={filteredPoems}
          hasMore={!searchQuery && !!hasNextPage}
          loading={isFetchingNextPage}
          onMoreClick={handleMoreClick}
        />
      </div>
    </div>
  )
}

export default Poems