import { lazy, Suspense } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Loading from './components/Loading';

const Home = lazy(() => import('./pages/Home'));

// Company pages
const About = lazy(() => import('./pages/About'));
const Results = lazy(() => import('./pages/Results'));
const Contact = lazy(() => import('./pages/Contact'));
const GetAQuote = lazy(() => import('./pages/GetAQuote'));

// Legal pages
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));

// Hub pages
const ServicesHub = lazy(() => import('./pages/ServicesHub'));
const RoutesHub = lazy(() => import('./pages/RoutesHub'));

// Service pages
const SeaFreight = lazy(() => import('./pages/services/SeaFreight'));
const AirFreight = lazy(() => import('./pages/services/AirFreight'));
const RoadFreight = lazy(() => import('./pages/services/RoadFreight'));
const RailFreight = lazy(() => import('./pages/services/RailFreight'));
const CustomsClearance = lazy(() => import('./pages/services/CustomsClearance'));
const DoorToDoor = lazy(() => import('./pages/services/DoorToDoor'));
const AmazonFba = lazy(() => import('./pages/services/AmazonFba'));
const Warehousing = lazy(() => import('./pages/services/Warehousing'));
const ContainerShipping = lazy(() => import('./pages/services/ContainerShipping'));
const AirCargo = lazy(() => import('./pages/services/AirCargo'));
const Logistics = lazy(() => import('./pages/services/Logistics'));

// Route pages
const ChinaToUk = lazy(() => import('./pages/routes/ChinaToUk'));
const GermanyToUk = lazy(() => import('./pages/routes/GermanyToUk'));
const NetherlandsToUk = lazy(() => import('./pages/routes/NetherlandsToUk'));
const IndiaToUk = lazy(() => import('./pages/routes/IndiaToUk'));
const UsaToUk = lazy(() => import('./pages/routes/UsaToUk'));
const TurkeyToUk = lazy(() => import('./pages/routes/TurkeyToUk'));
const UaeToUk = lazy(() => import('./pages/routes/UaeToUk'));
const SpainToUk = lazy(() => import('./pages/routes/SpainToUk'));
const BelfastToUk = lazy(() => import('./pages/routes/BelfastToUk'));
const DublinToUk = lazy(() => import('./pages/routes/DublinToUk'));

// Sitemap page
const AiSitemap = lazy(() => import('./pages/AiSitemap'));

// Resource pages
const PortCongestion = lazy(() => import('./pages/resources/PortCongestion'));
const ShippingGuides = lazy(() => import('./pages/resources/ShippingGuides'));
const ContainerGuide = lazy(() => import('./pages/resources/ContainerGuide'));
const Incoterms = lazy(() => import('./pages/resources/Incoterms'));
const FreightFaqs = lazy(() => import('./pages/resources/FreightFaqs'));
const CaseStudies = lazy(() => import('./pages/resources/CaseStudies'));
const Industries = lazy(() => import('./pages/resources/Industries'));
const OurProcess = lazy(() => import('./pages/resources/OurProcess'));
const PostBrexit = lazy(() => import('./pages/resources/PostBrexit'));

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Suspense fallback={<Loading />}><Home /></Suspense>} />

          {/* Sitemap page */}
          <Route path="/sitemap" element={<Suspense fallback={<Loading />}><AiSitemap /></Suspense>} />

          {/* Company pages */}
          <Route path="/about" element={<Suspense fallback={<Loading />}><About /></Suspense>} />
          <Route path="/results" element={<Suspense fallback={<Loading />}><Results /></Suspense>} />
          <Route path="/contact" element={<Suspense fallback={<Loading />}><Contact /></Suspense>} />
          <Route path="/get-a-quote" element={<Suspense fallback={<Loading />}><GetAQuote /></Suspense>} />

          {/* Legal pages */}
          <Route path="/privacy" element={<Suspense fallback={<Loading />}><Privacy /></Suspense>} />
          <Route path="/terms" element={<Suspense fallback={<Loading />}><Terms /></Suspense>} />

          {/* Hub pages */}
          <Route path="/services" element={<Suspense fallback={<Loading />}><ServicesHub /></Suspense>} />
          <Route path="/routes" element={<Suspense fallback={<Loading />}><RoutesHub /></Suspense>} />

          {/* Service pages */}
          <Route path="/services/sea-freight" element={<Suspense fallback={<Loading />}><SeaFreight /></Suspense>} />
          <Route path="/services/air-freight" element={<Suspense fallback={<Loading />}><AirFreight /></Suspense>} />
          <Route path="/services/road-freight" element={<Suspense fallback={<Loading />}><RoadFreight /></Suspense>} />
          <Route path="/services/rail-freight-china-uk" element={<Suspense fallback={<Loading />}><RailFreight /></Suspense>} />
          <Route path="/services/customs-clearance" element={<Suspense fallback={<Loading />}><CustomsClearance /></Suspense>} />
          <Route path="/services/door-to-door" element={<Suspense fallback={<Loading />}><DoorToDoor /></Suspense>} />
          <Route path="/services/amazon-fba-freight" element={<Suspense fallback={<Loading />}><AmazonFba /></Suspense>} />
          <Route path="/services/warehousing" element={<Suspense fallback={<Loading />}><Warehousing /></Suspense>} />
          <Route path="/services/container-shipping" element={<Suspense fallback={<Loading />}><ContainerShipping /></Suspense>} />
          <Route path="/services/air-cargo" element={<Suspense fallback={<Loading />}><AirCargo /></Suspense>} />
          <Route path="/services/logistics" element={<Suspense fallback={<Loading />}><Logistics /></Suspense>} />

          {/* Route pages */}
          <Route path="/routes/china-to-uk" element={<Suspense fallback={<Loading />}><ChinaToUk /></Suspense>} />
          <Route path="/routes/germany-to-uk" element={<Suspense fallback={<Loading />}><GermanyToUk /></Suspense>} />
          <Route path="/routes/netherlands-to-uk" element={<Suspense fallback={<Loading />}><NetherlandsToUk /></Suspense>} />
          <Route path="/routes/india-to-uk" element={<Suspense fallback={<Loading />}><IndiaToUk /></Suspense>} />
          <Route path="/routes/usa-to-uk" element={<Suspense fallback={<Loading />}><UsaToUk /></Suspense>} />
          <Route path="/routes/turkey-to-uk" element={<Suspense fallback={<Loading />}><TurkeyToUk /></Suspense>} />
          <Route path="/routes/uae-to-uk" element={<Suspense fallback={<Loading />}><UaeToUk /></Suspense>} />
          <Route path="/routes/spain-to-uk" element={<Suspense fallback={<Loading />}><SpainToUk /></Suspense>} />
          <Route path="/routes/belfast-northern-ireland" element={<Suspense fallback={<Loading />}><BelfastToUk /></Suspense>} />
          <Route path="/routes/dublin-ireland" element={<Suspense fallback={<Loading />}><DublinToUk /></Suspense>} />

          {/* Resource pages */}
          <Route path="/resources/port-congestion-tracker" element={<Suspense fallback={<Loading />}><PortCongestion /></Suspense>} />
          <Route path="/resources/shipping-guides" element={<Suspense fallback={<Loading />}><ShippingGuides /></Suspense>} />
          <Route path="/resources/container-size-guide" element={<Suspense fallback={<Loading />}><ContainerGuide /></Suspense>} />
          <Route path="/resources/incoterms-guide" element={<Suspense fallback={<Loading />}><Incoterms /></Suspense>} />
          <Route path="/resources/freight-faqs" element={<Suspense fallback={<Loading />}><FreightFaqs /></Suspense>} />
          <Route path="/resources/case-studies" element={<Suspense fallback={<Loading />}><CaseStudies /></Suspense>} />
          <Route path="/resources/industries" element={<Suspense fallback={<Loading />}><Industries /></Suspense>} />
          <Route path="/resources/our-process" element={<Suspense fallback={<Loading />}><OurProcess /></Suspense>} />
          <Route path="/resources/post-brexit-customs-guide" element={<Suspense fallback={<Loading />}><PostBrexit /></Suspense>} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
