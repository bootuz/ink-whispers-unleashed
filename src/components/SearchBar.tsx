
import { Search } from "lucide-react"

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  onSearch?: (query: string) => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  value?: string;
}

export const SearchBar = ({ 
  placeholder = "Search poems...", 
  className = "",
  onSearch,
  onKeyDown,
  value = ""
}: SearchBarProps) => {
  return (
    <div className={`relative max-w-2xl w-full ${className}`}>
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
      <input
        type="text"
        value={value}
        onChange={(e) => onSearch?.(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className="w-full pl-12 pr-4 py-3 border border-purple-200 dark:border-purple-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 dark:focus:ring-purple-700 transition-colors font-inter bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm text-black dark:text-white"
      />
    </div>
  )
}
