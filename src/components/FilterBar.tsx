
import { Filter } from "lucide-react"

export const FilterBar = () => {
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
    </div>
  )
}
