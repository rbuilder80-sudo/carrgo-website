import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import PortQuoteForm from './PortQuoteForm';

type QuoteContext = { title: string; origin?: string; destination: string };

const routeQuotes: Record<string, QuoteContext> = {
  '/routes/china-to-uk': { title: 'Get a China–UK shipping quote', origin: 'China', destination: 'United Kingdom' },
  '/routes/germany-to-uk': { title: 'Get a Germany–UK shipping quote', origin: 'Germany', destination: 'United Kingdom' },
  '/routes/netherlands-to-uk': { title: 'Get a Netherlands–UK shipping quote', origin: 'Netherlands', destination: 'United Kingdom' },
  '/routes/india-to-uk': { title: 'Get an India–UK shipping quote', origin: 'India', destination: 'United Kingdom' },
  '/routes/usa-to-uk': { title: 'Get a USA–UK shipping quote', origin: 'United States', destination: 'United Kingdom' },
  '/routes/turkey-to-uk': { title: 'Get a Turkey–UK shipping quote', origin: 'Turkey', destination: 'United Kingdom' },
  '/routes/uae-to-uk': { title: 'Get a UAE–UK shipping quote', origin: 'United Arab Emirates', destination: 'United Kingdom' },
  '/routes/spain-to-uk': { title: 'Get a Spain–UK shipping quote', origin: 'Spain', destination: 'United Kingdom' },
  '/routes/belfast-northern-ireland': { title: 'Get a Northern Ireland freight quote', origin: 'Northern Ireland', destination: 'Great Britain' },
  '/routes/dublin-ireland': { title: 'Get an Ireland–UK shipping quote', origin: 'Ireland', destination: 'United Kingdom' },
};

const serviceNames: Record<string, string> = {
  'sea-freight': 'sea freight',
  'air-freight': 'air freight',
  'road-freight': 'road freight',
  'rail-freight-china-uk': 'China–UK rail freight',
  'customs-clearance': 'customs clearance',
  'door-to-door': 'door-to-door freight',
  'amazon-fba-freight': 'Amazon FBA freight',
  'warehousing': 'freight and warehousing',
  'container-shipping': 'container shipping',
  'logistics': 'logistics',
};

function quoteContext(pathname: string): QuoteContext | null {
  const path = pathname.replace(/\/$/, '') || '/';

  // These pages already contain a complete quote form of their own.
  if (path === '/' || path === '/get-a-quote' || path.startsWith('/ports/') ||
      path === '/tools/port-comparison' || path.startsWith('/resources/port-congestion-tracker') ||
      path.startsWith('/resources/uk-port-congestion-report')) return null;

  if (routeQuotes[path]) return routeQuotes[path];
  if (path.startsWith('/routes/')) return { title: 'Get a route-specific freight quote', destination: 'United Kingdom' };

  const service = path.match(/^\/services\/([^/]+)$/)?.[1];
  if (service && serviceNames[service]) {
    return { title: `Get a ${serviceNames[service]} quote`, destination: 'United Kingdom' };
  }

  if (path.startsWith('/industries/')) {
    const industry = path.split('/').pop()?.replace(/-/g, ' ') || 'commercial';
    return { title: `Get a freight quote for ${industry} goods`, destination: 'United Kingdom' };
  }

  return { title: 'Get a freight shipping quote', destination: 'United Kingdom' };
}

export default function Layout() {
  const { pathname } = useLocation();
  const quote = quoteContext(pathname);

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main id="main-content" className={quote ? 'xl:pr-[22rem]' : undefined}>
        <Outlet />
      </main>
      {quote && <PortQuoteForm title={quote.title} origin={quote.origin} destination={quote.destination} sourcePage={pathname} />}
      <Footer />
    </>
  );
}
