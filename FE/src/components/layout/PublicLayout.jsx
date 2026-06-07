import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import FloatingActions from './FloatingActions';

export default function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f6fbff] transition-colors dark:bg-[#061827]">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
