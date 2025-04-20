import { SearchBar } from "@/components/SearchBar"
import { FilterBar } from "@/components/FilterBar"
import { PoemGrid } from "@/components/PoemGrid"
import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { usePoems } from "@/hooks/useApi"

const ITEMS_PER_PAGE = 6;

const Poems = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams] = useSearchParams();
  const filterType = searchParams.get('filter');
  const selectedGenre = searchParams.get('genre');
  const selectedAuthor = searchParams.get('author');
  
  const { data: poems = [], isLoading, error } = usePoems();
  
  // Filter poems based on URL parameter
  const filteredPoems = (() => {
    if (!poems) return [];
    
    if (filterType === 'new') {
      return [...poems].sort((a, b) => b.id - a.id); // Newest first
    } else if (filterType === 'popular') {
      return [...poems].reverse();
    }
    return poems;
  })();

  const totalPages = Math.ceil(filteredPoems.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedPoems = filteredPoems.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Reset to first page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filterType]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return <div className="min-h-screen px-4 py-16">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen px-4 py-16">Error loading poems</div>;
  }

  const getPageTitle = () => {
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
          poems={paginatedPoems}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          showPagination={true}
        />
      </div>
    </div>
  )
}

export default Poems
