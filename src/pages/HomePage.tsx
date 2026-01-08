import { useNews } from '../hooks/useNews';
import NewsCard from '../components/NewsCard';
import { type Article } from '../types/news';

const HomePage = () => {
  const { data, isLoading, isError } = useNews();

  if (isLoading) {
    return <div className="text-center py-20 font-medium text-gray-400 animate-pulse">Loading news...</div>;
  }

  if (isError) {
    return <div className="text-center py-20 text-red-500 font-semibold">Error loading news. Please try again later.</div>;
  }

  const articles = data?.articles || [];

  if (articles.length === 0) {
    return <div className="text-center py-20 text-gray-500 font-medium text-lg">No news found for this search.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
      {articles.map((article: Article, index: number) => (
        <NewsCard key={`${article.url}-${index}`} article={article} />
      ))}
      
    </div>
  );
};

export default HomePage;