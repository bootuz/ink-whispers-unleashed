
export const API_BASE_URL = 'https://wuserade.com/api/v1';

export const API_ENDPOINTS = {
  poems: '/poems/',
  poemDetail: (id: number) => `/poems/${id}/`,
  latestPoems: '/poems/latest/',
  searchPoems: (query: string) => `/poems/search/?q=${encodeURIComponent(query)}`,
  authors: '/authors/',
  authorDetail: (id: number) => `/authors/${id}/`,
  authorPoems: (id: number) => `/authors/${id}/poems/`,
  themes: '/themes/',
  themePoems: (id: number) => `/themes/${id}/poems/`,
} as const;
