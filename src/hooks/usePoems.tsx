
import { useSearchParams } from "react-router-dom";
import { usePoems, useSearchPoems, useThemes, useThemePoems, useAuthorPoems, useAuthors } from "@/hooks/useApi";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export const usePoemsPage = () => {
  const [searchParams] = useSearchParams();
  const [hasShownError, setHasShownError] = useState(false);
  
  const filterType = searchParams.get('filter');
  const selectedGenre = searchParams.get('genre');
  const selectedAuthor = searchParams.get('author');
  const searchQuery = searchParams.get('q') || '';
  
  const { data: themes } = useThemes();
  const { data: authors } = useAuthors();
  
  const selectedThemeId = themes?.find(
    theme => theme.title.toLowerCase() === selectedGenre?.toLowerCase()
  )?.id;

  // Find the author ID based on the URL slug (author name with dashes)
  const selectedAuthorId = authors?.find(
    author => author.name.toLowerCase().replace(/\s+/g, '-') === selectedAuthor?.toLowerCase()
  )?.id;

  // Only enable the poems query on the Poems page, not on the Index page
  const isPoemsPage = window.location.pathname === '/poems';

  const { 
    data: poemsResponse, 
    isLoading: isLoadingPoems,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    error: poemsError
  } = usePoems(undefined, { enabled: isPoemsPage });

  const {
    data: themePoems,
    isLoading: isLoadingThemePoems,
    error: themePoemsError
  } = useThemePoems(selectedThemeId || 0, {
    enabled: !!selectedThemeId
  });

  const {
    data: authorPoems,
    isLoading: isLoadingAuthorPoems,
    error: authorPoemsError
  } = useAuthorPoems(selectedAuthorId || 0, {
    enabled: !!selectedAuthorId
  });

  const {
    data: searchResults,
    isLoading: isLoadingSearch,
    error: searchError
  } = useSearchPoems(searchQuery);

  // Error handling effect
  if ((poemsError || searchError || themePoemsError || authorPoemsError) && !hasShownError) {
    console.error("API Error:", poemsError || searchError || themePoemsError || authorPoemsError);
    toast({
      title: "Error loading poems",
      description: "Using cached data. Some features may be limited.",
      variant: "destructive"
    });
    setHasShownError(true);
  }

  const poemsFromPages = poemsResponse?.pages 
    ? poemsResponse.pages.flatMap(page => page.results) 
    : [];
    
  const poems = searchQuery 
    ? (searchResults || []) 
    : selectedAuthorId 
      ? (authorPoems || [])
      : selectedThemeId 
        ? (themePoems || [])
        : poemsFromPages;

  const isLoading = searchQuery 
    ? isLoadingSearch 
    : selectedAuthorId
      ? isLoadingAuthorPoems
      : selectedThemeId 
        ? isLoadingThemePoems 
        : isLoadingPoems;

  // Determine if we should show the "Load More" button based on current filter
  const shouldShowLoadMore = !selectedAuthor && !selectedGenre && !searchQuery && hasNextPage;

  const filteredPoems = (() => {
    if (!poems?.length) return [];
    
    let filtered = [...poems];
    
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

  const getPageTitle = () => {
    if (searchQuery) {
      return `Search results for "${searchQuery}"`;
    }
    if (selectedAuthor) {
      // Get proper author name from slug
      const authorName = authors?.find(
        author => author.name.toLowerCase().replace(/\s+/g, '-') === selectedAuthor.toLowerCase()
      )?.name || selectedAuthor;
      
      return `Poems by ${authorName}`;
    }
    if (selectedGenre) {
      return `${selectedGenre.charAt(0).toUpperCase() + selectedGenre.slice(1)} Poems`;
    }
    if (filterType === 'new') return "New Poems";
    if (filterType === 'popular') return "Popular Poems";
    return "Усэу хъуар";
  };

  return {
    filteredPoems,
    isLoading,
    hasNextPage: shouldShowLoadMore, // Here we use our new check
    isFetchingNextPage,
    fetchNextPage,
    getPageTitle,
    poemsError,
    searchError,
    themePoemsError,
    authorPoemsError
  };
};
