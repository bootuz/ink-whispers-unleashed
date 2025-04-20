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

export function usePoems(themeId?: string) {
  return useInfiniteQuery<PaginatedResponse<Poem>>({
    queryKey: ['poems', themeId],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) => {
      const endpoint = themeId 
        ? `${API_ENDPOINTS.themePoems(Number(themeId))}?page=${pageParam}`
        : `${API_ENDPOINTS.poems}?page=${pageParam}`;
      return fetchFromApi<PaginatedResponse<Poem>>(endpoint);
    },
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

export function useAuthors() {
  return useQuery<AuthorDetail[]>({
    queryKey: ['authors'],
    queryFn: () => fetchFromApi<AuthorDetail[]>(`${API_ENDPOINTS.authors}`),
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

export function useThemePoems(themeId: number, options: { enabled: boolean } = { enabled: true }) {
  return useQuery<Poem[]>({
    queryKey: ['theme', themeId, 'poems'],
    queryFn: () => fetchFromApi<Poem[]>(API_ENDPOINTS.themePoems(themeId)),
    enabled: themeId > 0 && options.enabled,
  });
}

export function useGenres() {
  return useQuery<Theme[]>({
    queryKey: ['categories'],
    queryFn: () => fetchFromApi<Theme[]>(API_ENDPOINTS.themes),
  });
}

export function useFilterAuthors() {
  return useQuery<PaginatedResponse<Author>>({
    queryKey: ['authors', 'filter'],
    queryFn: () => fetchFromApi<PaginatedResponse<Author>>(API_ENDPOINTS.authors),
  });
}
