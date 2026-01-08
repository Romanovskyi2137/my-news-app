import { useState, useEffect } from 'react';
import { useNewsStore } from '../store/useNewsStore';
import type { Category } from '../types/news';

const categories: Category[] = [
  'general', 'business', 'technology', 'entertainment', 'sports', 'science', 'health'
];

const Header = () => {
  const { category, setCategory, searchQuery, setSearchQuery } = useNewsStore();

  const [inputValue, setInputValue] = useState(searchQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(inputValue);
    }, 400);

    return () => clearTimeout(timer);
  }, [inputValue, setSearchQuery]);

  useEffect(() => {
    setInputValue(searchQuery);
  }, [searchQuery]);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center py-4 gap-4">
          <h1 
            className="text-2xl font-black text-blue-600 tracking-tight cursor-pointer select-none" 
            onClick={() => setCategory('general')}
          >
            WORLD<span className="text-gray-900">NEWS</span>
          </h1>
          
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search news..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full pl-4 pr-10 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 transition-all"
            />
            <div className="absolute right-3 top-2.5 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        <nav className="flex space-x-2 overflow-x-auto pb-3 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`whitespace-nowrap px-5 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                category === cat 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-200' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 active:scale-95'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;