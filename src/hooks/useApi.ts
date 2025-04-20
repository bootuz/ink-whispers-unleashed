
import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL, API_ENDPOINTS } from "@/lib/api-config";
import { Poem, Author } from "@/types/api";

async function fetchFromApi<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export function usePoems() {
  return useQuery<Poem[]>({
    queryKey: ['poems'],
    queryFn: () => fetchFromApi<Poem[]>(API_ENDPOINTS.poems),
  });
}

export function useAuthors() {
  return useQuery<Author[]>({
    queryKey: ['authors'],
    queryFn: () => fetchFromApi<Author[]>(API_ENDPOINTS.authors),
  });
}

export function usePoem(id: number) {
  return useQuery<Poem>({
    queryKey: ['poem', id],
    queryFn: () => fetchFromApi<Poem>(API_ENDPOINTS.poem(id)),
  });
}

export function useAuthor(id: number) {
  return useQuery<Author>({
    queryKey: ['author', id],
    queryFn: () => fetchFromApi<Author>(API_ENDPOINTS.author(id)),
  });
}
