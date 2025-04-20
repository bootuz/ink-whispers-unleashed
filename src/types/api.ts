
export interface Theme {
  id: number;
  title: string;
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
