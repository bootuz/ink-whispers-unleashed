
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { API_BASE_URL, API_ENDPOINTS } from "@/lib/api-config";
import { Poem, PoemDetail, Author, AuthorDetail, Theme, PaginatedResponse, FeaturedPoemResponse } from "@/types/api";

async function fetchFromApi<T>(endpoint: string, options = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export function usePoems(themeId?: string, options: { enabled?: boolean } = { enabled: true }) {
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
    enabled: options.enabled !== false,
    staleTime: 60000, // 1 minute
  });
}

export function useLatestPoems() {
  return useQuery<Poem[]>({
    queryKey: ['poems', 'latest'],
    queryFn: () => fetchFromApi<Poem[]>(API_ENDPOINTS.latestPoems),
    staleTime: 60000, // 1 minute
  });
}

export function useSearchPoems(query: string) {
  return useQuery<Poem[]>({
    queryKey: ['poems', 'search', query],
    queryFn: () => fetchFromApi<Poem[]>(API_ENDPOINTS.searchPoems(query)),
    enabled: query.length > 0,
    staleTime: 60000, // 1 minute
  });
}

export function usePoem(id: number) {
  return useQuery<PoemDetail>({
    queryKey: ['poem', id],
    queryFn: () => fetchFromApi<PoemDetail>(API_ENDPOINTS.poemDetail(id)),
    staleTime: 60000, // 1 minute
  });
}

export function useFeaturedPoem() {
  return useQuery<FeaturedPoemResponse>({
    queryKey: ['poems', 'featured'],
    queryFn: () => fetchFromApi<FeaturedPoemResponse>(API_ENDPOINTS.featuredPoem),
    staleTime: 300000, // 5 minutes - this rarely changes
  });
}

export function useAuthors() {
  return useQuery<AuthorDetail[]>({
    queryKey: ['authors'],
    queryFn: () => fetchFromApi<AuthorDetail[]>(`${API_ENDPOINTS.authors}`),
    staleTime: 300000, // 5 minutes
  });
}

export function useAuthor(id: number, countView: boolean = true) {
  return useQuery<AuthorDetail>({
    queryKey: ['author', id],
    queryFn: () => {
      const endpoint = API_ENDPOINTS.authorDetail(id);
      // We don't need to pass any query parameters since the backend handles the session management
      return fetchFromApi<AuthorDetail>(`${endpoint}`);
    },
    staleTime: 60000, // 1 minute
  });
}

export function useAuthorPoems(authorId: number, options: { enabled: boolean } = { enabled: true }) {
  return useQuery<Poem[]>({
    queryKey: ['author', authorId, 'poems'],
    queryFn: () => fetchFromApi<Poem[]>(API_ENDPOINTS.authorPoems(authorId)),
    enabled: authorId > 0 && options.enabled,
    staleTime: 60000, // 1 minute
  });
}

export function useThemes() {
  return useQuery<Theme[]>({
    queryKey: ['themes'],
    queryFn: () => fetchFromApi<Theme[]>(API_ENDPOINTS.themes),
    staleTime: 300000, // 5 minutes
  });
}

export function useThemePoems(themeId: number, options: { enabled: boolean } = { enabled: true }) {
  return useQuery<Poem[]>({
    queryKey: ['theme', themeId, 'poems'],
    queryFn: () => fetchFromApi<Poem[]>(API_ENDPOINTS.themePoems(themeId)),
    enabled: themeId > 0 && options.enabled,
    staleTime: 60000, // 1 minute
  });
}

export function useThemePoemsCount(themeId: number, options: { enabled: boolean } = { enabled: true }) {
  return useQuery<Poem[]>({
    queryKey: ['theme', themeId, 'poemsCount'],
    queryFn: () => fetchFromApi<Poem[]>(API_ENDPOINTS.themePoems(themeId)),
    enabled: themeId > 0 && options.enabled,
    staleTime: 300000, // 5 minutes since counts don't change frequently
  });
}

export function useGenres() {
  return useQuery<Theme[]>({
    queryKey: ['categories'],
    queryFn: () => fetchFromApi<Theme[]>(API_ENDPOINTS.themes),
    staleTime: 300000, // 5 minutes
  });
}

export function useFilterAuthors() {
  return useQuery<PaginatedResponse<Author>>({
    queryKey: ['authors', 'filter'],
    queryFn: () => fetchFromApi<PaginatedResponse<Author>>(API_ENDPOINTS.authors),
    staleTime: 300000, // 5 minutes
  });
}
