
import { Filter, RefreshCw } from "lucide-react"
import { useSearchParams } from "react-router-dom"
import { useThemes, useAuthors } from "@/hooks/useApi"
import { Skeleton } from "./ui/skeleton"
import { useIsMobile } from "@/hooks/use-mobile"
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer"
import { Button } from "./ui/button"

export const FilterBar = () => {
  const isMobile = useIsMobile();
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: themes, isLoading: isLoadingThemes } = useThemes();
  const { data: authors, isLoading: isLoadingAuthors } = useAuthors();

  const handleOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('filter', e.target.value);
    setSearchParams(newParams);
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newParams = new URLSearchParams(searchParams);
    if (e.target.value) {
      newParams.set('genre', e.target.value);
      // Clear author when selecting a genre
      newParams.delete('author');
    } else {
      newParams.delete('genre');
    }
    setSearchParams(newParams);
  };

  const handleAuthorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newParams = new URLSearchParams(searchParams);
    if (e.target.value) {
      newParams.set('author', e.target.value);
      // Clear genre when selecting an author
      newParams.delete('genre');
    } else {
      newParams.delete('author');
    }
    setSearchParams(newParams);
  };

  const handleReset = () => {
    setSearchParams(new URLSearchParams());
  };

  const FilterControls = () => (
    <div className="flex flex-col md:flex-row md:items-center gap-4 py-4 w-full">
      {isLoadingThemes ? (
        <Skeleton className="h-8 w-full md:w-32" />
      ) : (
        <select 
          onChange={handleGenreChange}
          value={searchParams.get('genre') || ""}
          className="px-3 py-1 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-black transition-colors w-full md:w-auto"
        >
          <option value="">All Genres</option>
          {themes?.map((theme) => (
            <option key={theme.id} value={theme.title.toLowerCase()}>
              {theme.title}
            </option>
          ))}
        </select>
      )}
      
      {isLoadingAuthors ? (
        <Skeleton className="h-8 w-full md:w-32" />
      ) : (
        <select 
          onChange={handleAuthorChange}
          value={searchParams.get('author') || ""}
          className="px-3 py-1 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-black transition-colors w-full md:w-auto"
        >
          <option value="">All Authors</option>
          {authors?.map((author) => (
            <option key={author.id} value={author.name.toLowerCase().replace(/\s+/g, '-')}>
              {author.name}
            </option>
          ))}
        </select>
      )}

      <select 
        onChange={handleOrderChange}
        value={searchParams.get('filter') || "default"}
        className="px-3 py-1 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-black transition-colors w-full md:w-auto"
      >
        <option value="default">Default order</option>
        <option value="new">Newest first</option>
        <option value="popular">Most popular</option>
      </select>

      <button
        onClick={handleReset}
        className="flex items-center justify-center gap-2 px-3 py-1 text-sm border border-gray-200 rounded-lg hover:border-black transition-colors w-full md:w-auto"
      >
        <RefreshCw className="w-4 h-4" />
        Reset
      </button>
    </div>
  );

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline" className="w-full flex items-center gap-2">
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">Filters</span>
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="px-4 pb-4">
            <h3 className="text-lg font-semibold mb-4">Filter Poems</h3>
            <FilterControls />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <div className="flex flex-col md:flex-row items-center md:justify-center gap-4 py-4 max-w-4xl mx-auto">
      <div className="flex items-center gap-2 whitespace-nowrap">
        <Filter className="w-4 h-4" />
        <span className="text-sm font-medium">Filter by:</span>
      </div>
      <FilterControls />
    </div>
  );
};

