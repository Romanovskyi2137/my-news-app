import { create } from 'zustand'
import type { Category } from '../types/news';


interface NewsState {
  category: Category;
  searchQuery: string;
  setCategory: (category: Category) => void;
  setSearchQuery: (query: string) => void;
}

export const useNewsStore = create<NewsState>((set) => ({
  category: 'general',
  searchQuery: '',
  setCategory: (category) => set({ category, searchQuery: '' }),
  setSearchQuery: (query) => set({ searchQuery: query }),
}))