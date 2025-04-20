
export interface Theme {
  id: number;
  title: string;
}

export interface Author {
  id: number;
  name: string;
}

export interface AuthorDetail extends Author {
  bio: string;
  photo: string | null;
  views: number;
  created_at: string;
}

export interface Poem {
  id: number;
  title: string;
  author: Author;
  content: string;
  created_at: string;
  category: Theme;
}

export interface PoemDetail extends Poem {
  views: number;
  likes: number;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
