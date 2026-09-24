import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] dark:bg-[#0D1117] text-neutral-900 dark:text-neutral-100 transition-colors duration-200 flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}