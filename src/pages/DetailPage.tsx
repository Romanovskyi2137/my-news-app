import { useParams, useNavigate } from 'react-router-dom';
import { useNews } from '../hooks/useNews';

const DetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { data, isLoading, isError } = useNews();

  const article = data?.pages
  .flatMap((page) => page.articles)
  .find((item) => item.id === id);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 font-medium animate-pulse">Завантаження статті...</p>
      </div>
    );
  }

  if (isError || !article) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <div className="bg-red-50 text-red-500 w-20 h-20 rounded-full flex items-center justify-center mb-6">
          <span className="text-4xl font-black">!</span>
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-2">Статтю не знайдено</h2>
        <p className="text-gray-600 mb-8 max-w-md">
          Можливо, термін дії посилання закінчився або новина більше не доступна в актуальному списку.
        </p>
        <button 
          onClick={() => navigate('/')}
          className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-95"
        >
          Повернутися до новин
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <nav className="mb-8">
        <button 
          onClick={() => navigate(-1)}
          className="group flex items-center text-sm font-bold text-gray-400 hover:text-blue-600 transition-colors"
        >
          <span className="mr-2 text-lg transition-transform group-hover:-translate-x-1">←</span>
          НАЗАД ДО СПИСКУ
        </button>
      </nav>

      <article>
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-blue-600 text-white text-[10px] font-black px-2.5 py-1 rounded shadow-sm uppercase tracking-wider">
              {article.source.name}
            </span>
            <span className="w-1.5 h-1.5 bg-gray-200 rounded-full"></span>
            <time className="text-sm font-bold text-gray-400 uppercase tracking-tight">
              {new Date(article.publishedAt).toLocaleDateString('uk-UA', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </time>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-[1.05] mb-8 tracking-tighter">
            {article.title}
          </h1>
          
          {article.description && (
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed border-l-4 border-blue-600 pl-6 py-1 italic">
              {article.description}
            </p>
          )}
        </header>

        <div className="relative aspect-video rounded-[2rem] overflow-hidden mb-12 shadow-2xl ring-1 ring-black/5">
          <img 
            src={article.image} 
            alt={article.title} 
            className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition-transform duration-1000"
            loading="eager"
          />
        </div>

        <div className="max-w-none">
          <div className="text-gray-800 text-xl leading-[1.8] whitespace-pre-line mb-16">
            {article.content}
          </div>
          
          <div className="p-8 md:p-12 bg-gray-50 rounded-[2.5rem] border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-black text-gray-900 mb-2">Читати повну версію</h3>
              <p className="text-gray-500 font-medium">
                Ця стаття була опублікована на ресурсі <span className="text-blue-600">{article.source.name}</span>.
              </p>
            </div>
            <a 
              href={article.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group whitespace-nowrap bg-gray-900 text-white font-black px-10 py-5 rounded-2xl hover:bg-blue-600 transition-all active:scale-95 shadow-xl shadow-gray-200 flex items-center gap-2"
            >
              ПЕРЕЙТИ НА САЙТ
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </article>
    </div>
  );
};

export default DetailPage;