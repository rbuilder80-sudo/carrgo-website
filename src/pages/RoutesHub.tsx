import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import {
  Ship, Plane, Truck, TrainFront, ArrowRight, CheckCircle, ChevronRight,
  Clock, Shield, Globe, Anchor, Package, FileCheck, MapPin
} from 'lucide-react';

/* ── JSON-LD Structured Data ── */
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'International Shipping UK — Global Freight Routes',
  provider: {
    '@type': 'Organization',
    name: 'Carrgo Freight Solutions Ltd',
    url: 'https://carrgo.co.uk',
  },
  areaServed: [
    { '@type': 'Country', name: 'United Kingdom' },
    { '@type': 'Country', name: 'China' },
    { '@type': 'Country', name: 'Germany' },
    { '@type': 'Country', name: 'Netherlands' },
    { '@type': 'Country', name: 'India' },
    { '@type': 'Country', name: 'United States' },
    { '@type': 'Country', name: 'Turkey' },
    { '@type': 'Country', name: 'United Arab Emirates' },
    { '@type': 'Country', name: 'Spain' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'International Freight Routes',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'China to UK Shipping' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Germany to UK Freight' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Netherlands to UK Transport' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'India to UK Cargo' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'USA to UK Shipping' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Turkey to UK Freight' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'UAE to UK Cargo' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Spain to UK Transport' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Northern Ireland to UK' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Ireland to UK Shipping' } },
    ],
  },
};

/* ── Route Cards Data ── */
const routes = [
  {
    country: 'China',
    flag: '🇨🇳',
    description: 'The world\'s busiest trade lane. Sea freight 25–35 days, air 3–5 days, rail 14–20 days. Full FCL, LCL and express air options from Shanghai, Shenzhen, Ningbo and more.',
    seaTime: '25–35 days',
    airTime: '3–5 days',
    modes: [Ship, Plane, TrainFront],
    link: '/routes/china-to-uk',
  },
  {
    country: 'Germany',
    flag: '🇩🇪',
    description: 'Major European trade route with fast road and sea connections. Daily departures available via road freight. Sea from Hamburg takes 3–7 days. Ideal for automotive and manufacturing supply chains.',
    seaTime: '3–7 days',
    airTime: '1–2 days',
    modes: [Ship, Plane, Truck],
    link: '/routes/germany-to-uk',
  },
  {
    country: 'Netherlands',
    flag: '🇳🇱',
    description: 'Rotterdam is Europe\'s largest port with excellent UK connections. Road freight via ferry or Eurotunnel takes 1–2 days. Daily departures for groupage and full truck loads.',
    seaTime: '2–5 days',
    airTime: '1 day',
    modes: [Ship, Plane, Truck],
    link: '/routes/netherlands-to-uk',
  },
  {
    country: 'India',
    flag: '🇮🇳',
    description: 'Fast-growing trade corridor. Sea freight 18–28 days from Mumbai, Chennai and Mundra. Air cargo 2–3 days. Strong connections for textiles, pharmaceuticals and manufactured goods.',
    seaTime: '18–28 days',
    airTime: '2–3 days',
    modes: [Ship, Plane],
    link: '/routes/india-to-uk',
  },
  {
    country: 'USA',
    flag: '🇺🇸',
    description: 'Transatlantic shipping to the UK. East coast sea freight 10–18 days, west coast 25–35 days. Air cargo 1–2 days from New York, Chicago and Los Angeles. Major trade lane for diverse cargo types.',
    seaTime: '10–18 days',
    airTime: '1–2 days',
    modes: [Ship, Plane],
    link: '/routes/usa-to-uk',
  },
  {
    country: 'Turkey',
    flag: '🇹🇷',
    description: 'Strategic gateway between Europe and Asia. Sea freight 7–14 days from Istanbul and Mersin. Road freight 4–6 days through Europe. Growing trade in textiles, automotive parts and machinery.',
    seaTime: '7–14 days',
    airTime: '2–3 days',
    modes: [Ship, Plane, Truck],
    link: '/routes/turkey-to-uk',
  },
  {
    country: 'UAE',
    flag: '🇦🇪',
    description: 'Dubai and Abu Dhabi are major Middle East cargo hubs. Sea freight 18–25 days, air cargo 1–2 days. Key route for electronics, luxury goods and oil & gas equipment.',
    seaTime: '18–25 days',
    airTime: '1–2 days',
    modes: [Ship, Plane],
    link: '/routes/uae-to-uk',
  },
  {
    country: 'Spain',
    flag: '🇪🇸',
    description: 'European road and sea freight route. Barcelona and Valencia to UK ports in 4–8 days by sea. Road freight via France takes 3–5 days. Popular for food, wine and automotive imports.',
    seaTime: '4–8 days',
    airTime: '1–2 days',
    modes: [Ship, Plane, Truck],
    link: '/routes/spain-to-uk',
  },
  {
    country: 'Belfast',
    flag: '🇬🇧',
    description: 'Irish Sea freight between Belfast and UK mainland ports. Sea crossings 8–16 hours. Daily sailings on most routes. Essential supply chain link for Northern Ireland businesses trading with GB.',
    seaTime: '8–16 hrs',
    airTime: 'N/A',
    modes: [Ship, Truck],
    link: '/routes/belfast-northern-ireland',
  },
  {
    country: 'Dublin',
    flag: '🇮🇪',
    description: 'Irish Sea crossings from Dublin to Holyhead, Liverpool and Heysham. Ferry times 2–8 hours. Daily sailings with extensive capacity for roll-on/roll-out and container freight.',
    seaTime: '2–8 hrs',
    airTime: 'N/A',
    modes: [Ship, Truck],
    link: '/routes/dublin-ireland',
  },
];

/* ── Shipping Modes ── */
const shippingModes = [
  {
    icon: Ship,
    title: 'Sea Freight',
    description: 'The most cost-effective way to move large volumes internationally. FCL and LCL container shipping to 150+ countries with transit times from 1 day (Ireland) to 35 days (China).',
    link: '/services/sea-freight',
  },
  {
    icon: Plane,
    title: 'Air Freight',
    description: 'The fastest option for time-critical cargo. Express and economy services from Heathrow, East Midlands and Manchester to 200+ destinations worldwide. Transit from 1 day.',
    link: '/services/air-freight',
  },
  {
    icon: Truck,
    title: 'Road Freight',
    description: 'Ideal for European destinations and UK domestic distribution. Full truck load and groupage services with daily departures to Germany, Netherlands, France, Spain and all EU countries.',
    link: '/services/road-freight',
  },
  {
    icon: TrainFront,
    title: 'Rail Freight',
    description: 'The perfect middle ground between sea and air for China-UK shipments. Transit times of 14–20 days via the New Silk Road, at a fraction of air freight cost.',
    link: '/services/rail-freight-china-uk',
  },
];

/* ── How Route Shipping Works ── */
const howSteps = [
  {
    step: '1',
    title: 'Select Your Route',
    description: 'Choose your origin country and destination. We will advise on the best transport mode based on your cargo type, timeline and budget.',
    icon: Globe,
  },
  {
    step: '2',
    title: 'Get Your Quote',
    description: 'Receive a detailed, all-inclusive quote covering collection, freight, customs clearance, and delivery. No hidden fees — ever.',
    icon: FileCheck,
  },
  {
    step: '3',
    title: 'Book & Ship',
    description: 'Accept your quote and we handle everything — carrier booking, documentation, collection, and customs. Real-time tracking keeps you informed.',
    icon: Anchor,
  },
  {
    step: '4',
    title: 'Delivery & Confirmation',
    description: 'Your cargo clears customs and is delivered to your specified address. We provide signed proof of delivery for every shipment.',
    icon: Package,
  },
];

export default function RoutesHub() {
  return (
    <>
      <Seo
        title="International Shipping UK | Global Freight Routes | Carrgo"
        description="International shipping from the UK to 150+ countries. Sea, air, road & rail routes. China, USA, India, Germany, UAE, Turkey & more. Get route quotes."
        keywords="international shipping uk, shipping from uk, global freight routes, uk shipping routes, freight routes, shipping routes from uk, uk to china shipping, uk to usa freight, uk to india cargo, uk to europe haulage"
        ogUrl="https://carrgo.co.uk/routes"
        canonical="https://carrgo.co.uk/routes"
        structuredData={serviceSchema}
      />

      <main id="main-content">
        {/* ====== HERO ====== */}
        <section aria-labelledby="hero-heading" className="bg-gradient-to-br from-[#0f4db5] to-[#1A6DFF] text-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-block text-xs font-semibold tracking-wider uppercase text-blue-200 mb-3">Global Freight Network</span>
              <h1 id="hero-heading" className="text-4xl lg:text-5xl font-extrabold leading-tight mb-6">
                International Shipping UK — Global Freight Routes
              </h1>
              <p className="text-lg text-blue-100 mb-8 leading-relaxed">
                Carrgo operates international shipping services on the world&apos;s major trade routes. From China to the UK via sea, air and rail; from Germany by road; from the USA by ocean — we connect your business to 150+ countries with reliable, cost-effective freight solutions. Explore our most popular routes or contact us for a bespoke shipping quote.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/get-a-quote"
                  className="inline-flex items-center gap-2 bg-white text-[#1A6DFF] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors min-h-[44px]"
                >
                  Get Route Quote <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
                <a
                  href="tel:+442045827588"
                  className="inline-flex items-center gap-2 bg-[#1A6DFF] text-white border border-white/30 px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors min-h-[44px]"
                >
                  Call 020 4582 7588
                </a>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
                <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-center border border-white/20">
                  <Globe className="w-6 h-6 mx-auto mb-1 text-blue-200" aria-hidden="true" />
                  <div className="text-2xl font-extrabold">150+</div>
                  <div className="text-xs text-blue-200">Countries</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-center border border-white/20">
                  <Ship className="w-6 h-6 mx-auto mb-1 text-blue-200" aria-hidden="true" />
                  <div className="text-2xl font-extrabold">10</div>
                  <div className="text-xs text-blue-200">Popular Routes</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-center border border-white/20">
                  <Clock className="w-6 h-6 mx-auto mb-1 text-blue-200" aria-hidden="true" />
                  <div className="text-2xl font-extrabold">4</div>
                  <div className="text-xs text-blue-200">Transport Modes</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-center border border-white/20">
                  <MapPin className="w-6 h-6 mx-auto mb-1 text-blue-200" aria-hidden="true" />
                  <div className="text-2xl font-extrabold">UK</div>
                  <div className="text-xs text-blue-200">Wide Delivery</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====== ROUTE CARDS ====== */}
        <section aria-labelledby="routes-heading" className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">Popular Destinations</span>
              <h2 id="routes-heading" className="text-3xl lg:text-4xl font-bold text-[#111827] mt-3 mb-4">
                Our Most Popular Shipping Routes
              </h2>
              <p className="text-[#4B5563] max-w-2xl mx-auto">
                We operate regular freight services on these major trade lanes. Click on any route to learn more about transit times, transport modes and pricing.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {routes.map((route, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-6 hover:shadow-md transition-shadow flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{route.flag}</span>
                    <div>
                      <h3 className="text-lg font-bold text-[#111827]">{route.country} to UK</h3>
                      <div className="flex items-center gap-2 mt-1">
                        {route.modes.map((Mode, j) => (
                          <span key={j} className="bg-[#EFF6FF] rounded p-1" title={Mode.name}>
                            <Mode className="w-3 h-3 text-[#1A6DFF]" aria-hidden="true" />
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-[#4B5563] text-sm leading-relaxed mb-4 flex-grow">{route.description}</p>
                  <div className="flex items-center gap-4 text-sm text-[#4B5563] mb-4 pt-3 border-t border-[#E5E7EB]">
                    <span className="flex items-center gap-1">
                      <Ship className="w-3 h-3 text-[#1A6DFF]" aria-hidden="true" /> Sea: {route.seaTime}
                    </span>
                    {route.airTime !== 'N/A' && (
                      <span className="flex items-center gap-1">
                        <Plane className="w-3 h-3 text-[#1A6DFF]" aria-hidden="true" /> Air: {route.airTime}
                      </span>
                    )}
                  </div>
                  <Link
                    to={route.link}
                    className="inline-flex items-center gap-1 text-[#1A6DFF] font-semibold hover:underline mt-auto"
                  >
                    View Route <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====== SHIPPING MODES ====== */}
        <section aria-labelledby="modes-heading" className="py-16 md:py-24 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">Transport Options</span>
              <h2 id="modes-heading" className="text-3xl lg:text-4xl font-bold text-[#111827] mt-3 mb-4">
                Choose Your Shipping Mode
              </h2>
              <p className="text-[#4B5563] max-w-2xl mx-auto">
                Every route supports multiple transport modes. Choose the option that best balances your timeline, budget and cargo requirements.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {shippingModes.map((mode, i) => {
                const Icon = mode.icon;
                return (
                  <div key={i} className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-6 flex flex-col">
                    <div className="w-12 h-12 bg-[#EFF6FF] rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-[#1A6DFF]" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-bold text-[#111827] mb-2">{mode.title}</h3>
                    <p className="text-[#4B5563] text-sm leading-relaxed mb-4 flex-grow">{mode.description}</p>
                    <Link
                      to={mode.link}
                      className="inline-flex items-center gap-1 text-[#1A6DFF] font-semibold hover:underline text-sm mt-auto"
                    >
                      Learn More <ChevronRight className="w-3 h-3" aria-hidden="true" />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ====== HOW ROUTE SHIPPING WORKS ====== */}
        <section aria-labelledby="process-heading" className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">Our Process</span>
              <h2 id="process-heading" className="text-3xl lg:text-4xl font-bold text-[#111827] mt-3 mb-4">
                How International Route Shipping Works
              </h2>
              <p className="text-[#4B5563] max-w-2xl mx-auto">
                Shipping internationally does not have to be complicated. Our four-step process gets your cargo from origin to destination with full visibility and minimal hassle.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {howSteps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={i} className="relative text-center">
                    <div className="w-14 h-14 bg-[#EFF6FF] rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-7 h-7 text-[#1A6DFF]" aria-hidden="true" />
                    </div>
                    <div className="text-3xl font-extrabold text-[#EFF6FF] mb-2">{step.step}</div>
                    <h3 className="text-xl font-bold text-[#111827] mb-3">{step.title}</h3>
                    <p className="text-[#4B5563] text-sm leading-relaxed">{step.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ====== CTA ====== */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-[#0f4db5] to-[#1A6DFF] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-extrabold mb-4">
              Get Your International Shipping Quote
            </h2>
            <p className="text-lg text-blue-100 mb-8 leading-relaxed">
              Whether you are shipping from China, Germany, the USA or anywhere else in the world, our team will provide a competitive, all-inclusive route quote within 2 hours. Sea, air, road or rail — we have the right solution for your cargo.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/get-a-quote"
                className="inline-flex items-center gap-2 bg-white text-[#1A6DFF] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors min-h-[44px]"
              >
                Get Route Quote <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-transparent text-white border border-white/30 px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors min-h-[44px]"
              >
                Contact Our Team
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-blue-200">
              <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4" aria-hidden="true" /> 150+ countries</span>
              <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4" aria-hidden="true" /> Sea, air, road & rail</span>
              <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4" aria-hidden="true" /> 2-hour quote response</span>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
