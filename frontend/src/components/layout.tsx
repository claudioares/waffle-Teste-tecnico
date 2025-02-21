import { Link, Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <div>
      <header className="p-4 bg-gray-800 text-white">
        <nav>
          <Link to="/" className="px-4">Dashboard</Link>
          <Link to="/admin/dashboard" className="px-4">Admin</Link>
        </nav>
      </header>

      <main>
        <Outlet /> {/* Aqui é onde o conteúdo das rotas será renderizado */}
      </main>
    </div>
  );
};
