
import { SearchBar } from "@/components/SearchBar"
import { FilterBar } from "@/components/FilterBar"
import { PoemGrid } from "@/components/PoemGrid"
import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { usePoems, useSearchPoems } from "@/hooks/useApi"
import { Poem } from "@/types/api"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "@/hooks/use-toast"
import { AlertCircle } from "lucide-react"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"

const Poems = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filterType = searchParams.get('filter');
  const selectedGenre = searchParams.get('genre');
  const selectedAuthor = searchParams.get('author');
  const searchQuery = searchParams.get('q') || '';
  
  const { 
    data: poemsResponse, 
    isLoading: isLoadingPoems,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    error: poemsError
  } = usePoems(selectedGenre || undefined);
  
  const {
    data: searchResults,
    isLoading: isLoadingSearch,
    error: searchError
  } = useSearchPoems(searchQuery);

  const [hasShownError, setHasShownError] = useState(false);

  useEffect(() => {
    if ((poemsError || searchError) && !hasShownError) {
      console.error("API Error:", poemsError || searchError);
      toast({
        title: "Error loading poems",
        description: "Using cached data. Some features may be limited.",
        variant: "destructive"
      });
      setHasShownError(true);
    }
  }, [poemsError, searchError, hasShownError]);

  const handleSearch = (query: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (query) {
      newParams.set('q', query);
    } else {
      newParams.delete('q');
    }
    setSearchParams(newParams);
  };

  const poemsFromPages: Poem[] = poemsResponse?.pages 
    ? poemsResponse.pages.flatMap(page => page.results) 
    : [];
    
  const poems = searchQuery ? (searchResults || []) : poemsFromPages;
  const isLoading = searchQuery ? isLoadingSearch : isLoadingPoems;
  
  const filteredPoems = (() => {
    if (!poems?.length) return [];
    
    let filtered = [...poems];
    
    if (selectedAuthor) {
      filtered = filtered.filter(poem => {
        if (!poem.author) return false;
        
        const authorName = poem.author.name?.toLowerCase() || '';
        let filterValue = selectedAuthor.toLowerCase();
        
        if (filterValue === 'frost' && authorName.includes('robert frost')) return true;
        if (filterValue === 'dickinson' && authorName.includes('emily dickinson')) return true;
        if (filterValue === 'poe' && authorName.includes('edgar allan poe')) return true;
        
        return authorName.includes(filterValue);
      });
    }
    
    if (selectedGenre) {
      filtered = filtered.filter(poem => {
        if (!poem.category) return false;
        const categoryTitle = poem.category.title?.toLowerCase() || '';
        return categoryTitle.includes(selectedGenre.toLowerCase());
      });
    }
    
    if (filterType === 'new') {
      return filtered.sort((a, b) => {
        if (!a.created_at || !b.created_at) return 0;
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });
    } else if (filterType === 'popular') {
      return filtered.reverse();
    }
    
    return filtered;
  })();

  const handleMoreClick = () => {
    fetchNextPage();
  };

  const getPageTitle = () => {
    if (searchQuery) {
      return `Search results for "${searchQuery}"`;
    }
    if (selectedAuthor) {
      return `Poems by ${selectedAuthor === 'frost' ? 'Robert Frost' : 
        selectedAuthor === 'dickinson' ? 'Emily Dickinson' : 
        selectedAuthor === 'poe' ? 'Edgar Allan Poe' : 'All Authors'}`;
    }
    if (selectedGenre) {
      return `${selectedGenre.charAt(0).toUpperCase() + selectedGenre.slice(1)} Poems`;
    }
    if (filterType === 'new') return "New Poems";
    if (filterType === 'popular') return "Popular Poems";
    return "Усэу хъуар";
  };

  return (
    <div className="min-h-screen px-4 py-16 max-w-7xl mx-auto">
      <div className="max-w-2xl mx-auto mb-8">
        <SearchBar 
          value={searchQuery}
          onSearch={handleSearch}
        />
      </div>
      <FilterBar />
      
      {(poemsError || searchError) && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Unable to connect to the server. Showing available data.
          </AlertDescription>
        </Alert>
      )}
      
      <div className="mt-8">
        {isLoading && poems.length === 0 ? (
          <div>
            <h2 className="text-2xl font-playfair mb-6">{getPageTitle()}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="overflow-hidden rounded-lg border border-gray-200">
                  <Skeleton className="h-[200px] w-full" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <PoemGrid 
            title={getPageTitle()} 
            poems={filteredPoems}
            hasMore={!searchQuery && !selectedAuthor && !selectedGenre && !!hasNextPage}
            loading={isFetchingNextPage}
            onMoreClick={handleMoreClick}
          />
        )}
      </div>
    </div>
  )
}

export default Poems
