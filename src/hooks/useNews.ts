import { useInfiniteQuery } from '@tanstack/react-query';
import { useNewsStore } from '../store/useNewsStore';
import { type NewsResponse } from '../types/news';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = 'https://gnews.io/api/v4';
const PAGE_SIZE = 10;

export const useNews = () => {
  const { category, searchQuery } = useNewsStore();

  return useInfiniteQuery<NewsResponse>({

    queryKey: ['news', category, searchQuery],
    
    initialPageParam: 1,

    queryFn: async ({ pageParam }) => {
      let page = pageParam as number
      const endpoint = searchQuery ? '/search' : '/top-headlines';
      const url = new URL(`${BASE_URL}${endpoint}`);

      url.searchParams.append('token', API_KEY);
      url.searchParams.append('lang', 'uk');
      url.searchParams.append('country', 'ua');
      url.searchParams.append('max', PAGE_SIZE.toString());
      url.searchParams.append('page', page.toString());

      if (searchQuery) {
        url.searchParams.append('q', searchQuery);
      } else if (category && category !== 'general') {
        url.searchParams.append('category', category);
      }

      const response = await fetch(url.toString());

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errors ? errorData.errors[0] : 'API Error');
      }

      return response.json();
    },

    getNextPageParam: (lastPage, allPages) => {
      const loadedSoFar = allPages.length * PAGE_SIZE;
      
      if (loadedSoFar < lastPage.totalArticles) {
        return allPages.length + 1;
      }
      
      return undefined;
    },
    
    staleTime: 1000 * 60 * 5,
  });
};