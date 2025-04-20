import { SearchBar } from "@/components/SearchBar"
import { FilterBar } from "@/components/FilterBar"
import { PoemGrid } from "@/components/PoemGrid"
import { useState } from "react"

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
  
  const totalPages = Math.ceil(allPoems.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedPoems = allPoems.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen px-4 py-16 max-w-7xl mx-auto">
      <div className="max-w-2xl mx-auto mb-8">
        <SearchBar />
      </div>
      <FilterBar />
      <div className="mt-8">
        <PoemGrid 
          title="All Poems" 
          poems={paginatedPoems}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  )
}

export default Poems
