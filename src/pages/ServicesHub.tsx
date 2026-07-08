import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import {
  Ship, Plane, Truck, TrainFront, FileCheck, Package,
  Warehouse, Globe, ArrowRight, CheckCircle, Clock, Shield, Users, TrendingUp, ChevronRight
} from 'lucide-react';

/* ── JSON-LD Structured Data ── */
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'UK Freight Forwarding Services',
  provider: {
    '@type': 'Organization',
    name: 'Carrgo Freight Solutions Ltd',
    url: 'https://carrgo.co.uk',
    logo: { '@type': 'ImageObject', url: 'https://carrgo.co.uk/logo.png' },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+44-20-4582-7588',
      contactType: 'Customer Service',
      areaServed: 'GB',
      availableLanguage: 'English',
    },
  },
  areaServed: { '@type': 'Country', name: 'United Kingdom' },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Freight Forwarding Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Sea Freight — FCL & LCL Container Shipping' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Air Freight — Express & Economy Air Cargo' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Road Freight — European Haulage & Groupage' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Rail Freight — China to UK via New Silk Road' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Customs Clearance — UK HMRC Broker Services' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Door-to-Door Shipping — End-to-End Delivery' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Amazon FBA Freight — Prep & Fulfilment' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Warehousing — UK Storage & Distribution' } },
    ],
  },
};

/* ── Service Cards Data ── */
const services = [
  {
    icon: Ship,
    title: 'Sea Freight',
    description: 'FCL and LCL container shipping from China, India, USA and Europe to UK ports including Felixstowe, Southampton and London Gateway. Competitive ocean freight rates with customs clearance included.',
    link: '/services/sea-freight',
  },
  {
    icon: Plane,
    title: 'Air Freight',
    description: 'Express and economy air cargo services from Heathrow, East Midlands and Manchester airports. Fast international air freight to 200+ destinations worldwide with full documentation handling.',
    link: '/services/air-freight',
  },
  {
    icon: Truck,
    title: 'Road Freight',
    description: 'European road haulage and groupage services covering Germany, Netherlands, Spain, France and all EU countries. Full truck load and part load options with daily departures.',
    link: '/services/road-freight',
  },
  {
    icon: TrainFront,
    title: 'Rail Freight',
    description: 'China to UK rail freight via the New Silk Road. Transit times of 14–20 days offer the perfect balance between sea and air freight costs and speed.',
    link: '/services/rail-freight-china-uk',
  },
  {
    icon: FileCheck,
    title: 'Customs Clearance',
    description: 'Expert UK customs brokerage with HMRC CDS entries, duty and VAT calculations, and compliance management. Our 99%+ first-submission success rate ensures your cargo clears quickly.',
    link: '/services/customs-clearance',
  },
  {
    icon: Package,
    title: 'Door-to-Door Shipping',
    description: 'Complete end-to-end logistics from supplier collection to final UK delivery. One point of contact handles every step including pickup, freight, customs and last-mile delivery.',
    link: '/services/door-to-door',
  },
  {
    icon: Globe,
    title: 'Amazon FBA Freight',
    description: 'Specialised freight forwarding for Amazon FBA sellers. We handle FBA prep, labelling, palletising and direct delivery to Amazon fulfilment centres across the UK and Europe.',
    link: '/services/amazon-fba-freight',
  },
  {
    icon: Warehouse,
    title: 'Warehousing',
    description: 'Secure UK warehousing and distribution centres offering short-term and long-term storage, inventory management, pick-and-pack, and fulfilment services for businesses of all sizes.',
    link: '/services/warehousing',
  },
];

/* ── Why Choose Data ── */
const whyChoose = [
  {
    icon: Shield,
    title: 'Fully Licensed & Accredited',
    description: 'Carrgo is a fully licensed freight forwarder with AEO accreditation, BIFA membership, and direct HMRC customs broker status. Your cargo is always in safe, regulated hands.',
  },
  {
    icon: Clock,
    title: 'Fast Quote Turnaround',
    description: 'Receive detailed, all-inclusive freight quotes within 2 hours during business hours. No hidden fees, no surprises — just transparent pricing for every shipment.',
  },
  {
    icon: Users,
    title: 'Dedicated Account Managers',
    description: 'Every client gets a dedicated freight specialist who knows your business, your routes and your requirements. Direct phone and email access whenever you need support.',
  },
  {
    icon: TrendingUp,
    title: '99%+ Customs Clearance Success',
    description: 'Our expert customs brokers achieve a first-submission clearance rate of over 99%, minimising delays, detention charges and storage fees at UK ports and airports.',
  },
];

/* ── How It Works Steps ── */
const howItWorks = [
  {
    step: '01',
    title: 'Get a Quote',
    description: 'Fill out our quick quote form or call our team. Tell us what you are shipping, where from and where to. We will send a detailed, all-inclusive quote within 2 hours.',
    link: '/get-a-quote',
  },
  {
    step: '02',
    title: 'Book Your Shipment',
    description: 'Accept your quote and we will book space with the best carrier for your route and timeline. We handle all documentation including bills of lading, customs paperwork and insurance.',
    link: null,
  },
  {
    step: '03',
    title: 'We Ship Your Cargo',
    description: 'Your goods are collected, transported and tracked every step of the way. We provide real-time updates via email and our tracking portal so you always know where your cargo is.',
    link: null,
  },
  {
    step: '04',
    title: 'Delivered to Your Door',
    description: 'Once your cargo arrives in the UK, we clear customs and arrange final delivery to your warehouse, fulfilment centre or any UK address. Signed proof of delivery provided.',
    link: null,
  },
];

export default function ServicesHub() {
  return (
    <>
      <Seo
        title="Freight Forwarding Services UK | Sea, Air, Road & Rail | Carrgo"
        description="Full-service freight forwarding from the UK. FCL/LCL sea freight, air cargo, European road haulage, China-UK rail, customs clearance & warehousing. Get quotes in 2 hours."
        keywords="freight forwarding services uk, freight forwarding, logistics services, haulage company, transport company, shipping company, freight forwarder uk, cargo shipping services, uk freight services, international freight forwarding"
        ogUrl="https://carrgo.co.uk/services"
        canonical="https://carrgo.co.uk/services"
        structuredData={serviceSchema}
      />

      <main id="main-content">
        {/* ====== HERO ====== */}
        <section aria-labelledby="hero-heading" className="bg-gradient-to-br from-[#0f4db5] to-[#1A6DFF] text-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-block text-xs font-semibold tracking-wider uppercase text-blue-200 mb-3">Complete Freight Solutions</span>
              <h1 id="hero-heading" className="text-4xl lg:text-5xl font-extrabold leading-tight mb-6">
                UK Freight Forwarding Services
              </h1>
              <p className="text-lg text-blue-100 mb-8 leading-relaxed">
                Carrgo provides comprehensive freight forwarding services from the UK — sea freight, air cargo, road haulage, rail freight, customs clearance, warehousing and door-to-door delivery. Whatever you are shipping, wherever it is going, we get it there on time and on budget.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/get-a-quote"
                  className="inline-flex items-center gap-2 bg-white text-[#1A6DFF] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors min-h-[44px]"
                >
                  Get a Quote <ArrowRight className="w-4 h-4" aria-hidden="true" />
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
                  <div className="text-2xl font-extrabold">8</div>
                  <div className="text-xs text-blue-200">Core Services</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-center border border-white/20">
                  <div className="text-2xl font-extrabold">150+</div>
                  <div className="text-xs text-blue-200">Countries Served</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-center border border-white/20">
                  <div className="text-2xl font-extrabold">2hrs</div>
                  <div className="text-xs text-blue-200">Quote Response</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-center border border-white/20">
                  <div className="text-2xl font-extrabold">99%+</div>
                  <div className="text-xs text-blue-200">Customs Success</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====== SERVICE CARDS ====== */}
        <section aria-labelledby="services-heading" className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">What We Offer</span>
              <h2 id="services-heading" className="text-3xl lg:text-4xl font-bold text-[#111827] mt-3 mb-4">
                What freight forwarding services does Carrgo offer?
              </h2>
              <p className="text-[#4B5563] max-w-2xl mx-auto">
                Carrgo provides a complete range of international freight services for UK importers including sea freight (FCL/LCL), air cargo, road haulage, rail freight, customs clearance, door-to-door delivery, Amazon FBA shipping, and UK warehousing — all managed by dedicated account managers.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, i) => {
                const Icon = service.icon;
                return (
                  <div
                    key={i}
                    className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-6 hover:shadow-md transition-shadow flex flex-col"
                  >
                    <div className="w-12 h-12 bg-[#EFF6FF] rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-[#1A6DFF]" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-bold text-[#111827] mb-3">{service.title}</h3>
                    <p className="text-[#4B5563] leading-relaxed mb-4 flex-grow">{service.description}</p>
                    <Link
                      to={service.link}
                      className="inline-flex items-center gap-1 text-[#1A6DFF] font-semibold hover:underline mt-auto"
                    >
                      Learn More <ChevronRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ====== WHY CHOOSE CARRGO ====== */}
        <section aria-labelledby="why-heading" className="py-16 md:py-24 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">Why Carrgo</span>
              <h2 id="why-heading" className="text-3xl lg:text-4xl font-bold text-[#111827] mt-3 mb-4">
                Why do UK businesses choose Carrgo for freight forwarding?
              </h2>
              <p className="text-[#4B5563] max-w-2xl mx-auto">
                UK importers and exporters choose Carrgo because we combine decades of industry expertise, cutting-edge shipment tracking technology, personalised account management, and all-inclusive pricing with no hidden fees — ensuring supply chains keep moving smoothly.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyChoose.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-6 text-center">
                    <div className="w-12 h-12 bg-[#EFF6FF] rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-[#1A6DFF]" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-bold text-[#111827] mb-2">{item.title}</h3>
                    <p className="text-[#4B5563] text-sm leading-relaxed">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ====== HOW IT WORKS ====== */}
        <section aria-labelledby="how-heading" className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">Our Process</span>
              <h2 id="how-heading" className="text-3xl lg:text-4xl font-bold text-[#111827] mt-3 mb-4">
                How does Carrgo's freight forwarding process work?
              </h2>
              <p className="text-[#4B5563] max-w-2xl mx-auto">
                Shipping freight internationally with Carrgo follows a simple 4-step process: request a quote with your shipment details, receive your all-inclusive price within 2 hours, we collect and handle all transport and customs, then deliver to your UK warehouse.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {howItWorks.map((step, i) => (
                <div key={i} className="relative text-center">
                  <div className="text-5xl font-extrabold text-[#EFF6FF] mb-4">{step.step}</div>
                  <h3 className="text-xl font-bold text-[#111827] mb-3">{step.title}</h3>
                  <p className="text-[#4B5563] text-sm leading-relaxed mb-4">{step.description}</p>
                  {step.link && (
                    <Link
                      to={step.link}
                      className="inline-flex items-center gap-1 text-[#1A6DFF] font-semibold hover:underline text-sm"
                    >
                      Get Started <ChevronRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====== CTA SECTION ====== */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-[#0f4db5] to-[#1A6DFF] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-extrabold mb-4">
              How do I get a free freight quote from Carrgo?
            </h2>
            <p className="text-lg text-blue-100 mb-8 leading-relaxed max-w-3xl mx-auto">
              Whether you need sea freight, air cargo, road haulage or rail freight, our team is ready to provide a competitive, all-inclusive quote within 2 hours. Simply tell us about your shipment and we will respond with a no-obligation quote.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/get-a-quote"
                className="inline-flex items-center gap-2 bg-white text-[#1A6DFF] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors min-h-[44px]"
              >
                Get a Free Quote <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-transparent text-white border border-white/30 px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors min-h-[44px]"
              >
                Contact Our Team
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-blue-200">
              <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4" aria-hidden="true" /> No obligation quotes</span>
              <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4" aria-hidden="true" /> All-inclusive pricing</span>
              <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4" aria-hidden="true" /> 2-hour response time</span>
            </div>
          </div>
        </section>

        {/* ====== LAST UPDATED ====== */}
        <section className="py-4 bg-gray-100 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm text-gray-500">
              <span className="inline-flex items-center gap-1.5">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
                Last Updated: <time dateTime="2026-07-08">July 2026</time> — Service details and pricing verified
              </span>
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
