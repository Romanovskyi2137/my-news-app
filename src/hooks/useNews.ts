import { useInfiniteQuery } from '@tanstack/react-query';
import { useNewsStore } from '../store/useNewsStore';
import { type NewsResponse } from '../types/news';

const PAGE_SIZE = 10;

export const useNews = () => {
  const { category, searchQuery } = useNewsStore();

  return useInfiniteQuery<NewsResponse>({
    queryKey: ['news', category, searchQuery],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const page = pageParam as number;
      const url = new URL('/api/news', window.location.origin);

      if (searchQuery) {
        url.searchParams.append('q', searchQuery);
      } else if (category && category !== 'general') {
        url.searchParams.append('category', category);
      }
      
      url.searchParams.append('page', page.toString());

      const response = await fetch(url.toString());

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'API Error');
      }

      return response.json();
    },
    getNextPageParam: (lastPage, allPages) => {
      const loadedSoFar = allPages.length * PAGE_SIZE;
      return loadedSoFar < lastPage.totalArticles ? allPages.length + 1 : undefined;
    },
    staleTime: 1000 * 60 * 5,
  });
};