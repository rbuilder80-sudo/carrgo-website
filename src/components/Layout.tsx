import { Link, Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';

function FloatingQuoteButton() {
  return (
    <Link
      to="/get-a-quote"
      aria-label="Get a free freight quote"
      className="fixed bottom-4 right-4 z-30 inline-flex min-h-[48px] max-w-[calc(100vw-2rem)] items-center justify-center rounded-full bg-[#1A6DFF] px-5 py-3 text-sm font-extrabold text-white shadow-xl shadow-blue-900/25 ring-1 ring-white/70 transition-colors hover:bg-[#1557CC] focus:outline-none focus:ring-4 focus:ring-[#D4E3FF] sm:bottom-6 sm:right-6 sm:px-6 print:hidden"
      style={{ bottom: 'max(1rem, env(safe-area-inset-bottom))' }}
    >
      <span className="sm:hidden">Get Quote</span>
      <span className="hidden sm:inline">Get a Free Quote</span>
    </Link>
  );
}

export default function Layout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main id="main-content">
        <Outlet />
      </main>
      <FloatingQuoteButton />
      <Footer />
    </>
  );
}
