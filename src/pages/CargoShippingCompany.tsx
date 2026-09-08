import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import {
  ArrowRight,
  CheckCircle,
  ClipboardCheck,
  FileCheck,
  PackageCheck,
  Plane,
  Route,
  Ship,
  Truck,
} from 'lucide-react';

const faqData = [
  {
    q: 'Is Carrgo a cargo shipping company?',
    a: 'Yes. Carrgo is a UK cargo shipping and freight forwarding company arranging sea freight, air cargo, road freight, customs clearance, tracking and final delivery for importers and exporters.',
  },
  {
    q: 'What is the difference between cargo shippers and a freight forwarder?',
    a: 'Cargo shippers often move goods on one leg of the journey. A freight forwarder coordinates the full movement, including carrier booking, documents, customs clearance, tracking and final delivery.',
  },
  {
    q: 'Can Carrgo manage the whole cargo shipment?',
    a: 'Yes. Carrgo can manage supplier collection, sea, air or road freight, customs paperwork, duty and VAT guidance, release at the port or airport, and final delivery to your UK address.',
  },
  {
    q: 'How quickly can I get a cargo shipping quote?',
    a: 'Carrgo aims to provide all-inclusive cargo shipping quotes within 2 business hours when shipment details are complete.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Cargo Shipping Company UK',
  serviceType: ['Cargo Shipping', 'Freight Forwarding', 'Sea Freight', 'Air Cargo', 'Road Freight', 'Customs Clearance'],
  provider: {
    '@type': 'Organization',
    name: 'Carrgo Freight Solutions Ltd',
    url: 'https://www.carrgo.co.uk',
    email: 'support@carrgo.co.uk',
  },
  areaServed: { '@type': 'Country', name: 'United Kingdom' },
  description: 'UK cargo shipping company for sea freight, air cargo, road freight, customs clearance, tracking and door-to-door delivery.',
  url: 'https://www.carrgo.co.uk/cargo-shipping-company',
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

const options = [
  {
    icon: Ship,
    title: 'Sea cargo shipping',
    desc: 'FCL and LCL container shipping for cost-focused imports and exports.',
    href: '/services/sea-freight',
  },
  {
    icon: Plane,
    title: 'Air cargo shipping',
    desc: 'Express and economy air freight for urgent stock, samples and high-value goods.',
    href: '/services/air-freight',
  },
  {
    icon: Truck,
    title: 'Road cargo shipping',
    desc: 'European full loads, part loads and pallets with post-Brexit customs support.',
    href: '/services/road-freight',
  },
  {
    icon: FileCheck,
    title: 'Customs and delivery',
    desc: 'CDS declarations, duty checks, port release and delivery to your final address.',
    href: '/services/customs-clearance',
  },
];

export default function CargoShippingCompany() {
  return (
    <>
      <Seo
        title="Cargo Shipping Company UK | Sea, Air & Road Cargo | Carrgo"
        description="UK cargo shipping company for importers and exporters. Sea freight, air cargo, road freight, customs clearance, tracking and door-to-door delivery. Quote in 2 hours."
        keywords="cargo shipping company, cargo shippers, cargo services uk, cargo freight forwarding, shipping and cargo services, cargo forwarder, freight forwarding company uk, cargo shipping quote"
        ogUrl="https://www.carrgo.co.uk/cargo-shipping-company"
        canonical="https://www.carrgo.co.uk/cargo-shipping-company"
        structuredData={[serviceSchema, faqSchema]}
      />

      <main id="main-content">
        <section aria-labelledby="hero-heading" className="bg-gradient-to-br from-[#0f4db5] to-[#1A6DFF] text-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
              <div>
                <span className="inline-block text-xs font-semibold tracking-wider uppercase text-blue-200 mb-3">Cargo shipping and freight forwarding</span>
                <h1 id="hero-heading" className="text-4xl lg:text-5xl font-extrabold leading-tight mb-6">
                  Cargo Shipping Company UK
                </h1>
                <p className="text-lg text-blue-100 mb-8 leading-relaxed">
                  Carrgo arranges cargo shipping for UK importers and exporters by sea, air and road. One team handles carrier booking, supplier collection, customs clearance, tracking and final delivery.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/get-a-quote" className="inline-flex items-center gap-2 bg-white text-[#1A6DFF] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors min-h-[44px]">
                    Get a Cargo Quote <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                  <Link to="/services" className="inline-flex items-center gap-2 bg-[#1A6DFF] text-white border border-white/30 px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors min-h-[44px]">
                    View Cargo Services
                  </Link>
                </div>
              </div>
              <div className="bg-white/10 border border-white/20 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Use Carrgo when you need:</h2>
                <ul className="space-y-3 text-blue-100">
                  {[
                    'A cargo shipping company for commercial goods',
                    'Sea, air or road freight advice before booking',
                    'Customs clearance included with the shipment',
                    'One quote covering freight, paperwork and delivery',
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

        <section aria-labelledby="choice-heading" className="py-14 bg-white border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start">
              <div>
                <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">Cargo shippers vs freight forwarder</span>
                <h2 id="choice-heading" className="text-3xl font-bold text-[#111827] mt-3 mb-4">
                  What should I look for in a cargo shipping company?
                </h2>
                <p className="text-[#4B5563] leading-relaxed mb-4">
                  The best cargo shipping company does more than move goods from port to port. For most UK businesses, the real value is one team that can choose the right mode, book the carrier, check paperwork, clear customs and arrange final delivery.
                </p>
                <p className="text-[#4B5563] leading-relaxed">
                  Carrgo works as a cargo forwarder for commercial shipments, so you can compare sea, air and road options before choosing the right balance of speed, cost and risk.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: Route, title: 'Mode advice', desc: 'Sea, air or road matched to cost and urgency.' },
                  { icon: ClipboardCheck, title: 'Paperwork checked', desc: 'Commercial invoices, packing lists and codes reviewed.' },
                  { icon: PackageCheck, title: 'Tracked delivery', desc: 'Shipment updates from booking to final delivery.' },
                  { icon: FileCheck, title: 'Customs support', desc: 'UK customs clearance and duty guidance included.' },
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

        <section aria-labelledby="options-heading" className="py-16 md:py-24 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">Shipping options</span>
              <h2 id="options-heading" className="text-3xl lg:text-4xl font-bold text-[#111827] mt-3 mb-4">
                Cargo shipping services from one UK freight team
              </h2>
              <p className="text-[#4B5563]">
                Carrgo quotes the full cargo movement, not just one transport leg.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {options.map((option) => {
                const Icon = option.icon;
                return (
                  <Link key={option.title} to={option.href} className="bg-white rounded-lg border border-[#E5E7EB] p-6 hover:shadow-md transition-shadow">
                    <Icon className="w-8 h-8 text-[#1A6DFF] mb-4" aria-hidden="true" />
                    <h3 className="font-bold text-[#111827] mb-2">{option.title}</h3>
                    <p className="text-sm text-[#4B5563] leading-relaxed mb-4">{option.desc}</p>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#1A6DFF]">
                      View option <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section aria-labelledby="faq-heading" className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">FAQ</span>
              <h2 id="faq-heading" className="text-3xl font-bold text-[#111827] mt-3">
                Cargo shipping company questions
              </h2>
            </div>
            <div className="space-y-4">
              {faqData.map((faq) => (
                <article key={faq.q} className="bg-[#F8FAFC] rounded-lg border border-[#E5E7EB] p-5">
                  <h3 className="font-bold text-[#111827] mb-2">{faq.q}</h3>
                  <p className="text-[#4B5563] leading-relaxed">{faq.a}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#1A6DFF] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-extrabold mb-4">Need a cargo shipping quote?</h2>
            <p className="text-blue-100 mb-8">
              Send the cargo details and Carrgo will quote the best sea, air or road option with customs and delivery included.
            </p>
            <Link to="/get-a-quote" className="inline-flex items-center gap-2 bg-white text-[#1A6DFF] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors min-h-[44px]">
              Get a Cargo Quote <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
