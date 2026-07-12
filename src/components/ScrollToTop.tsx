import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop
 * 
 * Automatically scrolls the window to the top whenever the route changes.
 * This ensures users always land at the top of a new page, not mid-scroll
 * from their previous position.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    /* Scroll both window and the main content area to top */
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    /* Also scroll the main content container if it exists */
    const main = document.getElementById('main-content');
    if (main) main.scrollTop = 0;
  }, [pathname]);

  return null;
}
