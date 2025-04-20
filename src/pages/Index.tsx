import { SearchBar } from "@/components/SearchBar"
import { PoemGrid } from "@/components/PoemGrid"
import { useState } from "react"

// Placeholder data
const newPoems = [
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
]

const popularPoems = [
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

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-16 max-w-7xl mx-auto">
      <h1 className="font-marck-script text-5xl mb-8 tracking-wider text-center">Усэрадэ</h1>
      <SearchBar className="mb-16" />
      <div className="w-full space-y-16">
        <PoemGrid 
          title="New Poems" 
          poems={newPoems}
          currentPage={1}
          totalPages={1}
          onPageChange={() => {}}
        />
        <PoemGrid 
          title="Popular Poems" 
          poems={popularPoems}
          currentPage={1}
          totalPages={1}
          onPageChange={() => {}}
        />
      </div>
    </div>
  )
}

export default Index
