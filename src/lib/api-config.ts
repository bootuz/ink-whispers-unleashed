
export const API_BASE_URL = 'https://wuserade.onrender.com';

export const API_ENDPOINTS = {
  poems: '/poems',
  authors: '/authors',
  poem: (id: number) => `/poems/${id}`,
  author: (id: number) => `/authors/${id}`,
} as const;
