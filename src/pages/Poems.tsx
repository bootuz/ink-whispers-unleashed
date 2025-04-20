
import { SearchBar } from "@/components/SearchBar"
import { FilterBar } from "@/components/FilterBar"
import { PoemGrid } from "@/components/PoemGrid"
import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { usePoems, useSearchPoems } from "@/hooks/useApi"

const Poems = () => {
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const filterType = searchParams.get('filter');
  const selectedGenre = searchParams.get('genre');
  const selectedAuthor = searchParams.get('author');
  const searchQuery = searchParams.get('q') || '';
  
  const { 
    data: poemsResponse, 
    isLoading: isLoadingPoems 
  } = usePoems(currentPage);
  
  const {
    data: searchResults,
    isLoading: isLoadingSearch
  } = useSearchPoems(searchQuery);

  // Use search results if there's a query, otherwise use paginated poems
  const poems = searchQuery ? searchResults || [] : poemsResponse?.results || [];
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

  const totalPages = searchQuery ? 
    Math.ceil(filteredPoems.length / 20) : 
    Math.ceil((poemsResponse?.count || 0) / 20);

  // Reset to first page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filterType, searchQuery]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return <div className="min-h-screen px-4 py-16">Loading...</div>;
  }

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
    return "All Poems";
  };

  return (
    <div className="min-h-screen px-4 py-16 max-w-7xl mx-auto">
      <div className="max-w-2xl mx-auto mb-8">
        <SearchBar />
      </div>
      <FilterBar />
      <div className="mt-8">
        <PoemGrid 
          title={getPageTitle()} 
          poems={filteredPoems}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          showPagination={!searchQuery}
        />
      </div>
    </div>
  )
}

export default Poems
