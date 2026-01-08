
import { Link } from 'react-router-dom';
import type { Article } from '../types/news';

interface NewsCardProps {
  article: Article;
}

const NewsCard = ({ article }: NewsCardProps) => {
  const articleId = encodeURIComponent(article.title);

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={article.image} 
          alt={article.title} 
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase">
          {article.source.name}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold leading-tight mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
          <Link to={`/article/${articleId}`}>{article.title}</Link>
        </h3>
        
        <p className="text-gray-500 text-sm mb-4 line-clamp-3">
          {article.description}
        </p>

        <div className="mt-auto pt-4 flex justify-between items-center border-t border-gray-50">
          <span className="text-[11px] text-gray-400 font-medium">
            {new Date(article.publishedAt).toLocaleDateString()}
          </span>
          <Link 
            to={`/article/${articleId}`} 
            className="text-blue-600 text-sm font-bold hover:underline"
          >
            Read more →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;