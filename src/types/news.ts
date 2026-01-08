export interface NewsSource {
  id: string;
  name: string;
  url: string;
  country: string;
}

export interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  publishedAt: string;
  lang: string;
  source: NewsSource;
}

export interface NewsResponse {
  totalArticles: number;
  articles: Article[];
}

export type Category = 'general' | 'world' | 'nation' | 'business' | 'technology' | 'entertainment' | 'sports' | 'science' | 'health';