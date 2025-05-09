
export interface Theme {
  id: number;
  title: string;
  poems_count?: number; // Add this property as optional
}

export interface Author {
  id: number;
  name: string;
}

export interface AuthorDetail extends Author {
  bio: string;
  photo: string | null;
  views: number;
  poems_count: number;  // Add the poems_count property
  created_at: string;
}

export interface Poem {
  id: number;
  title: string;
  author: Author;
  content: string;
  created_at: string;
  category: Theme;
  theme?: Theme;        // Adding optional theme property
  theme_title?: string; // Adding optional theme_title property
  views?: number;       // Adding optional views property
  likes?: number;       // Adding optional likes property
  excerpt?: string;     // Add excerpt property as optional
}

export interface PoemDetail extends Poem {
  views: number;        // Required in PoemDetail
  likes: number;        // Required in PoemDetail
}

export interface FeaturedPoemResponse {
  featured_date: string;
  poem: Poem;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
