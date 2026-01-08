import { useNewsStore} from '../store/useNewsStore';
import type { Category } from '../types/news';

const categories: Category[] = ['general', 'business', 'technology', 'entertainment', 'sports', 'science', 'health'];

const Header = () => {
  const { category, setCategory, searchQuery, setSearchQuery } = useNewsStore();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center py-4 gap-4">
          <h1 className="text-2xl font-bold text-blue-600 tracking-tight cursor-pointer" onClick={() => setCategory('general')}>
            WORLD<span className="text-gray-900">NEWS</span>
          </h1>
          
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Пошук новин..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-10 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
            />
          </div>
        </div>

        <nav className="flex space-x-4 overflow-x-auto pb-3 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`whitespace-nowrap px-4 py-1 rounded-full text-sm font-medium transition-colors ${
                category === cat 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
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