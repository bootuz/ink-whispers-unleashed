
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { API_BASE_URL, API_ENDPOINTS } from "@/lib/api-config";
import { Poem, PoemDetail, Author, AuthorDetail, Theme, PaginatedResponse } from "@/types/api";

async function fetchFromApi<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export function usePoems() {
  return useInfiniteQuery<PaginatedResponse<Poem>>({
    queryKey: ['poems'],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) => 
      fetchFromApi<PaginatedResponse<Poem>>(`${API_ENDPOINTS.poems}?page=${pageParam}`),
    getNextPageParam: (lastPage: PaginatedResponse<Poem>) => {
      if (lastPage.next) {
        const url = new URL(lastPage.next);
        return url.searchParams.get('page');
      }
      return undefined;
    },
  });
}

export function useLatestPoems() {
  return useQuery<Poem[]>({
    queryKey: ['poems', 'latest'],
    queryFn: () => fetchFromApi<Poem[]>(API_ENDPOINTS.latestPoems),
  });
}

export function useSearchPoems(query: string) {
  return useQuery<Poem[]>({
    queryKey: ['poems', 'search', query],
    queryFn: () => fetchFromApi<Poem[]>(API_ENDPOINTS.searchPoems(query)),
    enabled: query.length > 0,
  });
}

export function usePoem(id: number) {
  return useQuery<PoemDetail>({
    queryKey: ['poem', id],
    queryFn: () => fetchFromApi<PoemDetail>(API_ENDPOINTS.poemDetail(id)),
  });
}

export function useAuthors(page = 1) {
  return useQuery<PaginatedResponse<AuthorDetail>>({
    queryKey: ['authors', page],
    queryFn: () => fetchFromApi<PaginatedResponse<AuthorDetail>>(`${API_ENDPOINTS.authors}?page=${page}`),
  });
}

export function useAuthor(id: number) {
  return useQuery<AuthorDetail>({
    queryKey: ['author', id],
    queryFn: () => fetchFromApi<AuthorDetail>(API_ENDPOINTS.authorDetail(id)),
  });
}

export function useAuthorPoems(authorId: number) {
  return useQuery<Poem[]>({
    queryKey: ['author', authorId, 'poems'],
    queryFn: () => fetchFromApi<Poem[]>(API_ENDPOINTS.authorPoems(authorId)),
  });
}

export function useThemes() {
  return useQuery<Theme[]>({
    queryKey: ['themes'],
    queryFn: () => fetchFromApi<Theme[]>(API_ENDPOINTS.themes),
  });
}

export function useThemePoems(themeId: number) {
  return useQuery<Poem[]>({
    queryKey: ['theme', themeId, 'poems'],
    queryFn: () => fetchFromApi<Poem[]>(API_ENDPOINTS.themePoems(themeId)),
  });
}

export function useGenres() {
  return useQuery<Theme[]>({
    queryKey: ['genres'],
    queryFn: () => fetchFromApi<Theme[]>(API_ENDPOINTS.themes),
  });
}

export function useFilterAuthors() {
  return useQuery<PaginatedResponse<Author>>({
    queryKey: ['authors', 'filter'],
    queryFn: () => fetchFromApi<PaginatedResponse<Author>>(API_ENDPOINTS.authors),
  });
}
