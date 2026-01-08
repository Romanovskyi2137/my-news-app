import { useQuery } from '@tanstack/react-query';
import { useNewsStore } from '../store/useNewsStore';
import { type NewsResponse } from '../types/news';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = 'https://gnews.io/api/v4';

export const useNews = () => {
  const { category, searchQuery } = useNewsStore();

  return useQuery<NewsResponse>({
    queryKey: ['news', category, searchQuery],
    queryFn: async () => {
      const endpoint = searchQuery ? '/search' : '/top-headlines';
      const url = new URL(`${BASE_URL}${endpoint}`);

      url.searchParams.append('token', API_KEY);
      url.searchParams.append('lang', 'uk');
      url.searchParams.append('country', 'ua');

      if (searchQuery) {
        url.searchParams.append('q', searchQuery);
      } else if (category && category !== 'general') {
        url.searchParams.append('category', category);
      }

      const response = await fetch(url.toString());

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errors ? errorData.errors[0] : 'Помилка API');
      }

      const data = await response.json();
      

      return data;
    },
    staleTime: 1000 * 60 * 10,
    retry: 1,
  });
};