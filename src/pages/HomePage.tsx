import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useNews } from '../hooks/useNews';
import NewsCard from '../components/NewsCard';

const HomePage = () => {
  const { 
    data, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage, 
    isLoading,
    isError 
  } = useNews();


  const { ref, inView } = useInView({
    threshold: 0.1, 
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const articles = data?.pages.flatMap(page => page.articles) || [];

  if (isLoading) return <div>Завантаження...</div>;
  if (isError) return <div>Помилка завантаження новин.</div>;

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>

      <div ref={ref} className="h-20 flex items-center justify-center mt-8">
        {isFetchingNextPage ? (
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        ) : hasNextPage ? (
          <p className="text-gray-400 text-sm">Завантаження ще новин...</p>
        ) : (
          <p className="text-gray-500 font-medium">Ви переглянули всі новини</p>
        )}
      </div>
    </div>
  );
};

export default HomePage