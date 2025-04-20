
import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL, API_ENDPOINTS } from "@/lib/api-config";

async function fetchFromApi<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export function usePoems() {
  return useQuery({
    queryKey: ['poems'],
    queryFn: () => fetchFromApi(API_ENDPOINTS.poems),
  });
}

export function useAuthors() {
  return useQuery({
    queryKey: ['authors'],
    queryFn: () => fetchFromApi(API_ENDPOINTS.authors),
  });
}

export function usePoem(id: number) {
  return useQuery({
    queryKey: ['poem', id],
    queryFn: () => fetchFromApi(API_ENDPOINTS.poem(id)),
  });
}

export function useAuthor(id: number) {
  return useQuery({
    queryKey: ['author', id],
    queryFn: () => fetchFromApi(API_ENDPOINTS.author(id)),
  });
}
