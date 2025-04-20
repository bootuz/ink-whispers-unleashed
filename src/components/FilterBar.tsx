
import { Filter } from "lucide-react"
import { useSearchParams } from "react-router-dom"

export const FilterBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('filter', e.target.value);
    setSearchParams(newParams);
  };

  return (
    <div className="flex items-center gap-4 py-4">
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4" />
        <span className="text-sm font-medium">Filter by:</span>
      </div>
      <select className="px-3 py-1 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-black transition-colors">
        <option value="">All Genres</option>
        <option value="love">Love</option>
        <option value="nature">Nature</option>
        <option value="life">Life</option>
      </select>
      <select className="px-3 py-1 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-black transition-colors">
        <option value="">All Authors</option>
        <option value="frost">Robert Frost</option>
        <option value="dickinson">Emily Dickinson</option>
        <option value="poe">Edgar Allan Poe</option>
      </select>
      <select 
        onChange={handleOrderChange}
        value={searchParams.get('filter') || "default"}
        className="px-3 py-1 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-black transition-colors"
      >
        <option value="default">Default order</option>
        <option value="new">Newest first</option>
        <option value="popular">Most popular</option>
      </select>
    </div>
  )
}
