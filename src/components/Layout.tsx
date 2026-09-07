import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import QuickQuoteForm from './QuickQuoteForm';

export default function Layout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main id="main-content">
        <Outlet />
      </main>
      <QuickQuoteForm />
      <Footer />
    </>
  );
}
