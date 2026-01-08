import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_ARTICLES } from '../mocks/newsMock';

const DetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const article = MOCK_ARTICLES.find(
    (a) => a.title === decodeURIComponent(id || '')
  );

  if (!article) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-800">Статтю не знайдено</h2>
        <button 
          onClick={() => navigate('/')}
          className="mt-4 text-blue-600 hover:underline"
        >
          Повернутися на головну
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button 
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center text-gray-500 hover:text-blue-600 transition-colors"
      >
        ← Назад до новин
      </button>

      <article>
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase">
              {article.source.name}
            </span>
            <time className="text-sm text-gray-400">
              {new Date(article.publishedAt).toLocaleDateString()}
            </time>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight mb-6">
            {article.title}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed italic border-l-4 border-blue-500 pl-4">
            {article.description}
          </p>
        </header>

        <div className="rounded-3xl overflow-hidden mb-8 shadow-2xl">
          <img 
            src={article.image} 
            alt={article.title} 
            className="w-full h-auto object-cover"
          />
        </div>

        <div className="prose prose-lg max-w-none text-gray-800 leading-loose">
          <p>{article.content}</p>
          
          <div className="mt-10 p-6 bg-gray-50 rounded-2xl border border-gray-100">
            <h3 className="text-lg font-bold mb-2">Хочете прочитати більше?</h3>
            <p className="text-gray-600 mb-4">
              Повна версія статті доступна на першоджерелі.
            </p>
            <a 
              href={article.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors"
            >
              Читати оригінал на {article.source.name}
            </a>
          </div>
        </div>
      </article>
    </div>
  );
};

export default DetailPage;