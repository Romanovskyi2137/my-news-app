import { useQuery } from '@tanstack/react-query';
import { useNewsStore } from '../store/useNewsStore';
import { MOCK_ARTICLES } from '../mocks/newsMock';
import { type NewsResponse } from '../types/news';

export const useNews = () => {
  const { category, searchQuery } = useNewsStore();

  return useQuery<NewsResponse>({
    queryKey: ['news', category, searchQuery],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 800));
      return { 
        totalArticles: MOCK_ARTICLES.length, 
        articles: MOCK_ARTICLES 
      };
    },
    staleTime: 1000 * 60 * 5,
  });
};