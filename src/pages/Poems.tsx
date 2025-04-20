import { SearchBar } from "@/components/SearchBar"
import { FilterBar } from "@/components/FilterBar"
import { PoemGrid } from "@/components/PoemGrid"
import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"

// Placeholder data
const allPoems = [
  {
    id: 1,
    title: "The Road Not Taken",
    author: "Robert Frost",
    excerpt: "Two roads diverged in a yellow wood, And sorry I could not travel both...",
  },
  {
    id: 2,
    title: "Hope is the thing with feathers",
    author: "Emily Dickinson",
    excerpt: "Hope is the thing with feathers That perches in the soul...",
  },
  {
    id: 3,
    title: "The Raven",
    author: "Edgar Allan Poe",
    excerpt: "Once upon a midnight dreary, while I pondered, weak and weary...",
  },
  {
    id: 4,
    title: "Stopping by Woods",
    author: "Robert Frost",
    excerpt: "Whose woods these are I think I know. His house is in the village though...",
  },
  {
    id: 5,
    title: "Because I could not stop for Death",
    author: "Emily Dickinson",
    excerpt: "Because I could not stop for Death – He kindly stopped for me...",
  },
  {
    id: 6,
    title: "Annabel Lee",
    author: "Edgar Allan Poe",
    excerpt: "It was many and many a year ago, In a kingdom by the sea...",
  },
]

const ITEMS_PER_PAGE = 6;

const Poems = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams] = useSearchParams();
  const filterType = searchParams.get('filter');
  
  // Filter poems based on URL parameter
  const filteredPoems = (() => {
    // This is just a simulation since we're using static data
    // In a real app, you would fetch the data with the appropriate sorting
    if (filterType === 'new') {
      return [...allPoems].sort((a, b) => b.id - a.id); // Newest first
    } else if (filterType === 'popular') {
      // For demo, we'll just reverse the order to simulate popularity
      return [...allPoems].reverse();
    }
    return allPoems;
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

  const getPageTitle = () => {
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
