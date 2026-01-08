import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-xl font-bold text-blue-600">World News</div>
          <nav>Пошук та Категорії будуть тут</nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet /> 
      </main>

      <footer className="bg-white border-t py-6 mt-auto">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} World News App. Test Task.
        </div>
      </footer>
    </div>
  );
};

export default Layout;