
import { Filter, RefreshCw } from "lucide-react"
import { useSearchParams } from "react-router-dom"
import { useThemes, useFilterAuthors } from "@/hooks/useApi"
import { Skeleton } from "./ui/skeleton"

export const FilterBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: categories, isLoading: isLoadingCategories } = useThemes();
  const { data: authorsData, isLoading: isLoadingAuthors } = useFilterAuthors();
  
  // Extract the authors array from the paginated response
  const authors = authorsData?.results || [];

  const handleOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('filter', e.target.value);
    setSearchParams(newParams);
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newParams = new URLSearchParams(searchParams);
    if (e.target.value) {
      newParams.set('genre', e.target.value);
    } else {
      newParams.delete('genre');
    }
    setSearchParams(newParams);
  };

  const handleAuthorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newParams = new URLSearchParams(searchParams);
    if (e.target.value) {
      newParams.set('author', e.target.value);
    } else {
      newParams.delete('author');
    }
    setSearchParams(newParams);
  };

  const handleReset = () => {
    setSearchParams(new URLSearchParams());
  };

  return (
    <div className="flex items-center gap-4 py-4">
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4" />
        <span className="text-sm font-medium">Filter by:</span>
      </div>

      {isLoadingCategories ? (
        <Skeleton className="h-8 w-32" />
      ) : (
        <select 
          onChange={handleGenreChange}
          value={searchParams.get('genre') || ""}
          className="px-3 py-1 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-black transition-colors"
        >
          <option value="">All Genres</option>
          {categories?.map((category) => (
            <option key={category.id} value={category.title.toLowerCase()}>
              {category.title}
            </option>
          ))}
        </select>
      )}
      
      {isLoadingAuthors ? (
        <Skeleton className="h-8 w-32" />
      ) : (
        <select 
          onChange={handleAuthorChange}
          value={searchParams.get('author') || ""}
          className="px-3 py-1 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-black transition-colors"
        >
          <option value="">All Authors</option>
          {authors.map((author) => (
            <option key={author.id} value={author.name.toLowerCase().replace(/\s+/g, '-')}>
              {author.name}
            </option>
          ))}
        </select>
      )}

      <select 
        onChange={handleOrderChange}
        value={searchParams.get('filter') || "default"}
        className="px-3 py-1 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-black transition-colors"
      >
        <option value="default">Default order</option>
        <option value="new">Newest first</option>
        <option value="popular">Most popular</option>
      </select>

      <button
        onClick={handleReset}
        className="flex items-center gap-2 px-3 py-1 text-sm border border-gray-200 rounded-lg hover:border-black transition-colors"
      >
        <RefreshCw className="w-4 h-4" />
        Reset
      </button>
    </div>
  );
};
