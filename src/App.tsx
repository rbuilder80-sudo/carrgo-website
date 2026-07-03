import { lazy, Suspense } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Loading from './components/Loading';
import Placeholder from './pages/Placeholder';

const Home = lazy(() => import('./pages/Home'));

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
  '/resources/port-congestion-tracker': { title: 'Port Congestion Tracker', desc: 'Live UK port congestion status for Felixstowe, Southampton and London Gateway.' },
  '/resources/shipping-guides': { title: 'Shipping Guides', desc: 'Comprehensive guides to sea, air, road and rail freight shipping.' },
  '/resources/container-size-guide': { title: 'Container Size Guide', desc: '20ft, 40ft and 40ft HC container dimensions, capacity and weight limits.' },
  '/resources/incoterms-guide': { title: 'Incoterms Guide', desc: 'Complete guide to EXW, FCA, CPT, CIP, DAP, DPU, DDP, FAS, FOB, CFR, CIF.' },
  '/resources/freight-faqs': { title: 'Freight FAQs', desc: 'Answers to common freight forwarding questions.' },
  '/resources/case-studies': { title: 'Case Studies', desc: 'Success stories from UK importers using Carrgo freight services.' },
  '/resources/industries': { title: 'Industries We Serve', desc: 'Freight solutions for furniture, ecommerce, automotive, construction and more.' },
  '/resources/our-process': { title: 'Our Process', desc: 'Our 5-step freight forwarding process from quote to delivery.' },
  '/resources/post-brexit-customs-guide': { title: 'Post-Brexit Customs Guide', desc: 'Navigating UK customs after Brexit. Essential guidance for importers.' },
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
          {Object.keys(pageMap).map(path => (
            <Route key={path} path={path} element={<PlaceholderRoute path={path} />} />
          ))}
        </Route>
      </Routes>
    </HashRouter>
  );
}
