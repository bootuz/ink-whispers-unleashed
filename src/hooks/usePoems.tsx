
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

  const selectedAuthorId = authors?.find(
    author => author.name.toLowerCase().replace(/\s+/g, '-') === selectedAuthor?.toLowerCase()
  )?.id;

  const { 
    data: poemsResponse, 
    isLoading: isLoadingPoems,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    error: poemsError
  } = usePoems();

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
  } = useAuthorPoems(selectedAuthorId || 0);

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

  const filteredPoems = (() => {
    if (!poems?.length) return [];
    
    let filtered = [...poems];
    
    if (selectedAuthor) {
      filtered = filtered.filter(poem => {
        if (!poem?.author) return false;
        
        const authorName = poem.author.name?.toLowerCase() || '';
        let filterValue = selectedAuthor.toLowerCase();
        
        if (filterValue === 'frost' && authorName.includes('robert frost')) return true;
        if (filterValue === 'dickinson' && authorName.includes('emily dickinson')) return true;
        if (filterValue === 'poe' && authorName.includes('edgar allan poe')) return true;
        
        return authorName.includes(filterValue);
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

  return {
    filteredPoems,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    getPageTitle,
    poemsError,
    searchError,
    themePoemsError,
    authorPoemsError
  };
};
