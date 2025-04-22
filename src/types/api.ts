
export interface Poem {
  id: number;
  title: string;
  author: Author;
  content: string;
  created_at: string;
  category?: Theme;
  views?: number;
  likes?: number;
}

export interface PoemDetail extends Poem {
  views: number;
  likes: number;
}
