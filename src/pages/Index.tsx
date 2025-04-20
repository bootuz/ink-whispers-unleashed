
import { SearchBar } from "@/components/SearchBar"
import { PoemGrid } from "@/components/PoemGrid"
import { useNavigate } from "react-router-dom"

// Placeholder data
const newPoems = [
  {
    id: 1,
    title: "The Road Not Taken",
    author: { id: 1, name: "Robert Frost" },
    excerpt: "Two roads diverged in a yellow wood, And sorry I could not travel both...",
  },
  {
    id: 2,
    title: "Hope is the thing with feathers",
    author: { id: 1, name: "Robert Frost" },
    excerpt: "Hope is the thing with feathers That perches in the soul...",
  },
  {
    id: 3,
    title: "The Raven",
    author: { id: 1, name: "Robert Frost" },
    excerpt: "Once upon a midnight dreary, while I pondered, weak and weary...",
  },
]

const popularPoems = [
  {
    id: 4,
    title: "Stopping by Woods",
    author: { id: 1, name: "Robert Frost" },
    excerpt: "Whose woods these are I think I know. His house is in the village though...",
  },
  {
    id: 5,
    title: "Because I could not stop for Death",
    author: { id: 1, name: "Robert Frost" },
    excerpt: "Because I could not stop for Death – He kindly stopped for me...",
  },
  {
    id: 6,
    title: "Annabel Lee",
    author: { id: 1, name: "Robert Frost" },
    excerpt: "It was many and many a year ago, In a kingdom by the sea...",
  },
]

const Index = () => {
  const navigate = useNavigate();

  const handleNewPoemsMore = () => {
    navigate('/poems?filter=new');
  };

  const handlePopularPoemsMore = () => {
    navigate('/poems?filter=popular');
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
      <SearchBar className="mb-16" />
      <div className="w-full space-y-16">
        <PoemGrid 
          title="УсэщIэхэр" 
          poems={newPoems}
          onMoreClick={handleNewPoemsMore}
        />
        <PoemGrid 
          title="Нэхъ зэджэ усэхэр" 
          poems={popularPoems}
          onMoreClick={handlePopularPoemsMore}
        />
      </div>
    </div>
  )
}

export default Index
