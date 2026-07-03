import { lazy, Suspense } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Loading from './components/Loading';
import Placeholder from './pages/Placeholder';

const Home = lazy(() => import('./pages/Home'));
const PortCongestion = lazy(() => import('./pages/resources/PortCongestion'));
const ShippingGuides = lazy(() => import('./pages/resources/ShippingGuides'));
const ContainerGuide = lazy(() => import('./pages/resources/ContainerGuide'));
const Incoterms = lazy(() => import('./pages/resources/Incoterms'));
const FreightFaqs = lazy(() => import('./pages/resources/FreightFaqs'));
const CaseStudies = lazy(() => import('./pages/resources/CaseStudies'));
const Testimonials = lazy(() => import('./pages/resources/Testimonials'));
const Industries = lazy(() => import('./pages/resources/Industries'));
const OurProcess = lazy(() => import('./pages/resources/OurProcess'));
const PostBrexit = lazy(() => import('./pages/resources/PostBrexit'));

const resourcePages: Record<string, React.ComponentType> = {
  '/resources/port-congestion-tracker': PortCongestion,
  '/resources/shipping-guides': ShippingGuides,
  '/resources/container-size-guide': ContainerGuide,
  '/resources/incoterms-guide': Incoterms,
  '/resources/freight-faqs': FreightFaqs,
  '/resources/case-studies': CaseStudies,
  '/resources/testimonials': Testimonials,
  '/resources/industries': Industries,
  '/resources/our-process': OurProcess,
  '/resources/post-brexit-customs-guide': PostBrexit,
};

const pageMap: Record<string, { title: string; desc?: string }> = {
  '/about': { title: 'About Carrgo', desc: 'Learn about Carrgo Freight Solutions, our story, mission, and values as a trusted UK freight forwarder.' },
  '/results': { title: 'Our Results', desc: 'See the results we have achieved for UK importers.' },
  '/contact': { title: 'Contact Us', desc: 'Get in touch with Carrgo Freight Solutions. Email info@carrgo.co.uk.' },
  '/get-a-quote': { title: 'Get a Quote', desc: 'Get your free all-inclusive freight quote within 2 hours.' },
  '/privacy': { title: 'Privacy Policy', desc: 'Carrgo Freight Solutions privacy policy.' },
  '/terms': { title: 'Terms of Service', desc: 'Carrgo Freight Solutions terms and conditions.' },
  '/services/sea-freight': { title: 'Sea Freight UK', desc: 'FCL and LCL container shipping to UK ports. All-inclusive sea freight with customs clearance.' },
  '/services/air-freight': { title: 'Air Freight UK', desc: 'Express and economy air cargo to UK airports. Door-to-door delivery in 1-5 days.' },
  '/services/road-freight': { title: 'Road Freight UK', desc: 'FTL and LTL European road haulage to the UK. Daily departures with GPS tracking.' },
  '/services/rail-freight-china-uk': { title: 'Rail Freight China to UK', desc: 'New Silk Road shipping via China-UK rail. Faster than sea, cheaper than air.' },
  '/services/customs-clearance': { title: 'Customs Clearance UK', desc: 'Expert customs brokers for smooth UK import and export clearance.' },
  '/services/door-to-door': { title: 'Door-to-Door Freight', desc: 'Complete factory-to-warehouse forwarding. One quote, one invoice, zero hassle.' },
  '/services/amazon-fba-freight': { title: 'Amazon FBA Freight UK', desc: 'FBA prep and delivery to UK Amazon fulfilment centres including BHX4, EMA1, LBA1.' },
  '/services/warehousing': { title: 'Warehousing UK', desc: 'Midlands storage with pick and pack, container devanning, and bonded warehouse.' },
  '/routes/china-to-uk': { title: 'China to UK Shipping', desc: 'Sea, air and rail freight from China to UK. Transit times and rates.' },
  '/routes/germany-to-uk': { title: 'Germany to UK Shipping', desc: 'Road, sea and air freight from Germany to UK. Transit times and rates.' },
  '/routes/netherlands-to-uk': { title: 'Netherlands to UK Shipping', desc: 'Road, sea and air freight from Netherlands to UK. Transit times and rates.' },
  '/routes/india-to-uk': { title: 'India to UK Shipping', desc: 'Sea and air freight from India to UK. Transit times and rates.' },
  '/routes/usa-to-uk': { title: 'USA to UK Shipping', desc: 'Sea and air freight from USA to UK. Transit times and rates.' },
  '/routes/turkey-to-uk': { title: 'Turkey to UK Shipping', desc: 'Sea and road freight from Turkey to UK. Transit times and rates.' },
  '/routes/uae-to-uk': { title: 'UAE to UK Shipping', desc: 'Sea and air freight from UAE to UK. Transit times and rates.' },
  '/routes/spain-to-uk': { title: 'Spain to UK Shipping', desc: 'Road and sea freight from Spain to UK. Transit times and rates.' },
};

function PlaceholderRoute({ path }: { path: string }) {
  const p = pageMap[path] || { title: 'Page' };
  return <Placeholder title={p.title} description={p.desc} />;
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Suspense fallback={<Loading />}><Home /></Suspense>} />
          {/* Resource pages — fully implemented */}
          {Object.entries(resourcePages).map(([path, Component]) => (
            <Route key={path} path={path} element={<Suspense fallback={<Loading />}><Component /></Suspense>} />
          ))}
          {/* Placeholder pages — not yet implemented */}
          {Object.keys(pageMap).map(path => (
            <Route key={path} path={path} element={<PlaceholderRoute path={path} />} />
          ))}
        </Route>
      </Routes>
    </HashRouter>
  );
}
