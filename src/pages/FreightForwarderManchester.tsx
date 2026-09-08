import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import {
  ArrowRight,
  CheckCircle,
  Clock,
  FileCheck,
  MapPin,
  Plane,
  Ship,
  Truck,
  Warehouse,
} from 'lucide-react';

const faqData = [
  {
    q: 'Is Carrgo a freight forwarder near Manchester?',
    a: 'Yes. Carrgo supports importers and exporters across Manchester, Greater Manchester and the North West with sea freight, air freight, road freight, customs clearance and door-to-door delivery.',
  },
  {
    q: 'Can Carrgo collect cargo from Manchester and the North West?',
    a: 'Yes. Carrgo can arrange collection from warehouses, suppliers, factories, shops and fulfilment centres across Manchester, Bolton, Salford, Trafford Park, Stockport and the wider North West.',
  },
  {
    q: 'Which freight services are available for Manchester businesses?',
    a: 'Manchester businesses can use Carrgo for sea freight through UK ports, air freight through Manchester Airport and Heathrow, European road freight, China-UK rail freight, customs clearance, warehousing and final delivery.',
  },
  {
    q: 'How quickly can I get a Manchester freight quote?',
    a: 'Carrgo aims to send all-inclusive freight quotes within 2 business hours when shipment details are complete.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Freight Forwarder Manchester',
  serviceType: ['Freight Forwarding', 'Cargo Services', 'Customs Clearance', 'Air Freight', 'Sea Freight', 'Road Freight'],
  provider: {
    '@type': 'Organization',
    name: 'Carrgo Freight Solutions Ltd',
    url: 'https://www.carrgo.co.uk',
    email: 'support@carrgo.co.uk',
  },
  areaServed: [
    { '@type': 'City', name: 'Manchester' },
    { '@type': 'AdministrativeArea', name: 'Greater Manchester' },
    { '@type': 'AdministrativeArea', name: 'North West England' },
  ],
  description: 'Freight forwarding and cargo services for Manchester and North West businesses, including sea freight, air freight, road freight, customs clearance and door-to-door delivery.',
  url: 'https://www.carrgo.co.uk/freight-forwarder-manchester',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqData.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.a,
    },
  })),
};

const services = [
  {
    icon: Ship,
    title: 'Sea Freight',
    desc: 'FCL and LCL imports through Felixstowe, Liverpool, Southampton, London Gateway and other UK ports.',
    href: '/services/sea-freight',
  },
  {
    icon: Plane,
    title: 'Air Freight',
    desc: 'Express and economy cargo through Manchester Airport, Heathrow and other UK air gateways.',
    href: '/services/air-freight',
  },
  {
    icon: Truck,
    title: 'Road Freight',
    desc: 'European pallets, full loads and part loads moving to or from Manchester and the North West.',
    href: '/services/road-freight',
  },
  {
    icon: FileCheck,
    title: 'Customs Clearance',
    desc: 'UK import declarations, duty and VAT guidance, commodity-code support and port release coordination.',
    href: '/services/customs-clearance',
  },
];

const areas = ['Manchester', 'Bolton', 'Salford', 'Trafford Park', 'Stockport', 'Oldham', 'Rochdale', 'Warrington'];

export default function FreightForwarderManchester() {
  return (
    <>
      <Seo
        title="Freight Forwarder Manchester | Cargo Quotes in 2 Hours | Carrgo"
        description="Freight forwarder for Manchester and North West businesses. Sea, air and road cargo with customs clearance, tracking and door-to-door delivery. Quote in 2 hours."
        keywords="freight forwarder manchester, freight forwarder near me, manchester freight forwarder, cargo services manchester, shipping company manchester, customs clearance manchester, manchester air freight, north west freight forwarder"
        ogUrl="https://www.carrgo.co.uk/freight-forwarder-manchester"
        canonical="https://www.carrgo.co.uk/freight-forwarder-manchester"
        structuredData={[serviceSchema, faqSchema]}
      />

      <main id="main-content">
        <section aria-labelledby="hero-heading" className="bg-gradient-to-br from-[#0f4db5] to-[#1A6DFF] text-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
              <div>
                <span className="inline-block text-xs font-semibold tracking-wider uppercase text-blue-200 mb-3">Manchester freight support</span>
                <h1 id="hero-heading" className="text-4xl lg:text-5xl font-extrabold leading-tight mb-6">
                  Freight Forwarder Manchester
                </h1>
                <p className="text-lg text-blue-100 mb-8 leading-relaxed">
                  Cargo services for Manchester, Greater Manchester and North West businesses. Carrgo handles sea freight, air freight, road freight, customs clearance, tracking and door-to-door delivery with all-inclusive quotes in 2 hours.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/get-a-quote" className="inline-flex items-center gap-2 bg-white text-[#1A6DFF] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors min-h-[44px]">
                    Get a Freight Quote <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                  <Link to="/contact" className="inline-flex items-center gap-2 bg-[#1A6DFF] text-white border border-white/30 px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors min-h-[44px]">
                    Speak to Carrgo
                  </Link>
                </div>
              </div>
              <div className="bg-white/10 border border-white/20 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Best for Manchester businesses needing:</h2>
                <ul className="space-y-3 text-blue-100">
                  {[
                    'A freight forwarder near Manchester with UK-wide coverage',
                    'Manchester Airport air freight with customs support',
                    'Supplier collection and final delivery in one quote',
                    'Sea, road or air cargo advice before booking',
                  ].map((item) => (
                    <li key={item} className="flex gap-3">
                      <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="near-me-heading" className="py-14 bg-white border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start">
              <div>
                <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">Freight forwarder near me</span>
                <h2 id="near-me-heading" className="text-3xl font-bold text-[#111827] mt-3 mb-4">
                  Local freight forwarding support without managing separate suppliers
                </h2>
                <p className="text-[#4B5563] leading-relaxed mb-4">
                  If you are searching for a freight forwarder near you, the important point is not just distance. You need a team that can quote the full route, coordinate carriers, check customs documents and keep you updated until delivery.
                </p>
                <p className="text-[#4B5563] leading-relaxed">
                  Carrgo supports Manchester importers and exporters remotely and by appointment, with coverage across the North West and the main UK ports, airports and fulfilment networks.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: Clock, title: '2-hour quotes', desc: 'Fast, all-inclusive pricing when shipment details are complete.' },
                  { icon: MapPin, title: 'North West coverage', desc: 'Manchester, Bolton, Trafford Park, Salford and nearby areas.' },
                  { icon: Warehouse, title: 'Warehouse delivery', desc: 'Delivery to business premises, sites and fulfilment centres.' },
                  { icon: FileCheck, title: 'Customs handled', desc: 'CDS declarations, duty checks and release coordination.' },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <article key={item.title} className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg p-5">
                      <Icon className="w-6 h-6 text-[#1A6DFF] mb-3" aria-hidden="true" />
                      <h3 className="font-bold text-[#111827] mb-2">{item.title}</h3>
                      <p className="text-sm text-[#4B5563] leading-relaxed">{item.desc}</p>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="services-heading" className="py-16 md:py-24 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">Cargo services</span>
              <h2 id="services-heading" className="text-3xl lg:text-4xl font-bold text-[#111827] mt-3 mb-4">
                Freight services for Manchester importers and exporters
              </h2>
              <p className="text-[#4B5563]">
                Start with the shipment goal. Carrgo will recommend the right mode and quote the full movement.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <Link key={service.title} to={service.href} className="bg-white rounded-lg border border-[#E5E7EB] p-6 hover:shadow-md transition-shadow">
                    <Icon className="w-8 h-8 text-[#1A6DFF] mb-4" aria-hidden="true" />
                    <h3 className="font-bold text-[#111827] mb-2">{service.title}</h3>
                    <p className="text-sm text-[#4B5563] leading-relaxed mb-4">{service.desc}</p>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#1A6DFF]">
                      View service <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section aria-labelledby="areas-heading" className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-8 items-start">
              <div>
                <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">Areas covered</span>
                <h2 id="areas-heading" className="text-3xl font-bold text-[#111827] mt-3 mb-4">
                  Manchester and North West freight coverage
                </h2>
                <p className="text-[#4B5563] leading-relaxed">
                  Carrgo arranges collection and delivery across Greater Manchester and nearby logistics hubs, then connects your cargo to UK ports, airports and road networks.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
                {areas.map((area) => (
                  <div key={area} className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg p-4 text-sm font-semibold text-[#111827]">
                    {area}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="faq-heading" className="py-16 bg-[#F8FAFC]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">FAQ</span>
              <h2 id="faq-heading" className="text-3xl font-bold text-[#111827] mt-3">
                Manchester freight forwarding questions
              </h2>
            </div>
            <div className="space-y-4">
              {faqData.map((faq) => (
                <article key={faq.q} className="bg-white rounded-lg border border-[#E5E7EB] p-5">
                  <h3 className="font-bold text-[#111827] mb-2">{faq.q}</h3>
                  <p className="text-[#4B5563] leading-relaxed">{faq.a}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#1A6DFF] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-extrabold mb-4">Need a freight forwarder near Manchester?</h2>
            <p className="text-blue-100 mb-8">
              Send your shipment details and Carrgo will return an all-inclusive quote covering freight, customs and delivery.
            </p>
            <Link to="/get-a-quote" className="inline-flex items-center gap-2 bg-white text-[#1A6DFF] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors min-h-[44px]">
              Get a Freight Quote <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
