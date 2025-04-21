import { Filter, RefreshCw } from "lucide-react"
import { useSearchParams } from "react-router-dom"
import { useThemes, useAuthors } from "@/hooks/useApi"
import { Skeleton } from "./ui/skeleton"
import { useIsMobile } from "@/hooks/use-mobile"
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer"
import { Button } from "./ui/button"
import * as React from "react"

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select"

export const FilterBar = () => {
  const isMobile = useIsMobile();
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: themes, isLoading: isLoadingThemes } = useThemes();
  const { data: authors, isLoading: isLoadingAuthors } = useAuthors();

  const handleOrderSelectChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value && value !== "default") {
      newParams.set('filter', value);
    } else {
      newParams.delete('filter');
    }
    setSearchParams(newParams);
  };

  const handleGenreChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value !== "all") {
      newParams.set('genre', value);
      newParams.delete('author');
    } else {
      newParams.delete('genre');
    }
    setSearchParams(newParams);
  };

  const handleAuthorChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value !== "all") {
      newParams.set('author', value);
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
    <div className="flex flex-wrap gap-3 py-4 justify-center max-w-4xl mx-auto">
      {isLoadingThemes ? (
        <Skeleton className="h-8 w-36" />
      ) : (
        <Select
          value={searchParams.get('genre') || "all"}
          onValueChange={handleGenreChange}
          className="min-w-[140px]"
        >
          <SelectTrigger className="px-2 py-1 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-black transition-colors whitespace-nowrap" aria-label="Select genre">
            <SelectValue placeholder="All Genres" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Genres</SelectItem>
            {themes?.map((theme) => (
              <SelectItem key={theme.id} value={theme.title.toLowerCase()}>
                {theme.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      
      {isLoadingAuthors ? (
        <Skeleton className="h-8 w-36" />
      ) : (
        <Select
          value={searchParams.get('author') || "all"}
          onValueChange={handleAuthorChange}
          className="min-w-[140px]"
        >
          <SelectTrigger className="px-2 py-1 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-black transition-colors whitespace-nowrap" aria-label="Select author">
            <SelectValue placeholder="All Authors" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Authors</SelectItem>
            {authors?.map((author) => (
              <SelectItem key={author.id} value={author.name.toLowerCase().replace(/\s+/g, '-')}>
                {author.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      <Select
        value={searchParams.get('filter') || "default"}
        onValueChange={handleOrderSelectChange}
        className="min-w-[140px]"
      >
        <SelectTrigger className="px-2 py-1 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-black transition-colors whitespace-nowrap" aria-label="Order poems">
          <SelectValue placeholder="Order" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="default">Default order</SelectItem>
          <SelectItem value="new">Newest first</SelectItem>
          <SelectItem value="popular">Most popular</SelectItem>
        </SelectContent>
      </Select>

      <button
        onClick={handleReset}
        className="flex items-center justify-center gap-2 px-3 py-1 text-sm border border-gray-200 rounded-lg hover:border-black transition-colors whitespace-nowrap"
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
            <span className="text-sm font-medium whitespace-nowrap">Filters</span>
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
    <div className="flex flex-col md:flex-row items-center justify-center gap-3 py-4 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 whitespace-nowrap">
        <Filter className="w-4 h-4" />
        <span className="text-sm font-medium whitespace-nowrap text-center">Filter by:</span>
      </div>
      <FilterControls />
    </div>
  );
};
