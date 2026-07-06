import { Link } from 'react-router-dom';
import Seo from '../../components/Seo';
import {
  Ship, Plane, Truck, TrainFront, FileCheck, Package,
  Warehouse, Globe, ArrowRight, CheckCircle, ChevronRight,
  Clock, Shield, Users, TrendingUp, BarChart3, MapPin, Boxes, Headphones, Factory
} from 'lucide-react';

/* ── JSON-LD Structured Data ── */
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'UK Logistics Provider — Freight & Supply Chain Services',
  provider: {
    '@type': 'Organization',
    name: 'Carrgo Freight Solutions Ltd',
    url: 'https://carrgo.co.uk',
  },
  areaServed: { '@type': 'Country', name: 'United Kingdom' },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Logistics Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Freight Management' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Warehousing & Storage' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Distribution Services' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Customs Clearance' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Supply Chain Consulting' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Last Mile Delivery' } },
    ],
  },
};

/* ── Logistics Services ── */
const logisticsServices = [
  {
    icon: Ship,
    title: 'Freight Management',
    description: 'End-to-end freight forwarding management across sea, air, road and rail. We coordinate carriers, optimise routes, negotiate rates, and handle all documentation — giving you a single point of contact for your entire supply chain.',
    link: '/services/sea-freight',
  },
  {
    icon: Warehouse,
    title: 'Warehousing',
    description: 'Secure UK warehousing facilities offering short-term and long-term storage, inventory management, pick-and-pack operations, and value-added services including labelling, repacking and quality control inspections.',
    link: '/services/warehousing',
  },
  {
    icon: Boxes,
    title: 'Distribution',
    description: 'Nationwide distribution services across the UK and Ireland. From palletised freight to parcel delivery, we manage your distribution network with real-time tracking, proof of delivery, and returns management.',
    link: '/services/door-to-door',
  },
  {
    icon: FileCheck,
    title: 'Customs Clearance',
    description: 'Expert UK customs brokerage services with HMRC CDS entries, duty deferment, tariff classification, and compliance management. Our 99%+ first-submission clearance rate minimises delays and detention charges.',
    link: '/services/customs-clearance',
  },
  {
    icon: BarChart3,
    title: 'Supply Chain Consulting',
    description: 'Strategic supply chain analysis and optimisation. We review your logistics operations, identify cost savings, recommend transport mode alternatives, and help you build a more resilient, efficient supply chain.',
    link: '/contact',
  },
  {
    icon: Truck,
    title: 'Last Mile Delivery',
    description: 'Final-mile delivery solutions across the UK including timed deliveries, white glove service, installation support, and collection from your premises. We ensure your goods reach their destination on time, every time.',
    link: '/services/road-freight',
  },
];

/* ── Industries Served ── */
const industries = [
  {
    icon: Globe,
    name: 'E-commerce',
    description: 'Multi-channel fulfilment, FBA prep, returns processing, and inventory management for online retailers selling on Amazon, eBay, Shopify and direct-to-consumer platforms.',
  },
  {
    icon: Factory,
    name: 'Automotive',
    description: 'Just-in-time parts delivery, component sourcing from Europe and Asia, finished vehicle logistics, and aftermarket distribution for UK automotive manufacturers and suppliers.',
  },
  {
    icon: Package,
    name: 'Manufacturing',
    description: 'Raw material import management, production line supply chains, finished goods export, and vendor-managed inventory for UK manufacturing businesses.',
  },
  {
    icon: Users,
    name: 'Retail',
    description: 'Seasonal stock management, store replenishment, promotional campaign logistics, and returns handling for high street and online retail brands.',
  },
  {
    icon: Clock,
    name: 'Food & Beverage',
    description: 'Temperature-controlled transport, BRC-compliant warehousing, FIFO stock rotation, and compliant import/export documentation for food and drink businesses.',
  },
  {
    icon: Shield,
    name: 'Pharmaceutical',
    description: 'GDP-compliant logistics, temperature-monitoring, serialisation support, and secure chain-of-custody documentation for pharmaceutical and medical device companies.',
  },
];

/* ── Why Choose Carrgo for Logistics ── */
const whyChoose = [
  {
    icon: MapPin,
    title: 'UK-Wide Coverage',
    description: 'With facilities and partner networks across England, Scotland, Wales and Northern Ireland, we provide truly national logistics coverage with local expertise.',
  },
  {
    icon: TrendingUp,
    title: 'Scalable Solutions',
    description: 'Whether you ship one pallet a week or one hundred containers a month, our logistics services scale with your business. No minimum volumes, no long-term contracts required.',
  },
  {
    icon: Headphones,
    title: 'Single Point of Contact',
    description: 'Your dedicated logistics account manager coordinates every aspect of your supply chain. One phone number, one email — complete visibility and accountability.',
  },
  {
    icon: BarChart3,
    title: 'Data-Driven Optimisation',
    description: 'We use advanced logistics analytics to identify inefficiencies, reduce costs, and improve delivery performance. Regular reporting keeps you informed and in control.',
  },
];

/* ── Logistics Process ── */
const processSteps = [
  {
    step: '1',
    title: 'Discovery & Analysis',
    description: 'We start by understanding your business, your supply chain, and your logistics challenges. Our team analyses your current operations, shipment patterns, and cost structures.',
    icon: Users,
  },
  {
    step: '2',
    title: 'Solution Design',
    description: 'Based on our analysis, we design a tailored logistics solution combining the right transport modes, warehousing, and distribution channels to meet your requirements and budget.',
    icon: BarChart3,
  },
  {
    step: '3',
    title: 'Implementation',
    description: 'We onboard your operations, set up systems integration where required, train your team on our platforms, and establish standard operating procedures for every service element.',
    icon: Package,
  },
  {
    step: '4',
    title: 'Ongoing Management',
    description: 'Your dedicated account manager oversees daily operations, resolves issues proactively, and ensures your logistics run smoothly. Regular reviews keep everything on track.',
    icon: Headphones,
  },
  {
    step: '5',
    title: 'Continuous Improvement',
    description: 'We continuously monitor KPIs, benchmark performance, and identify optimisation opportunities. Quarterly business reviews ensure your logistics evolve with your business.',
    icon: TrendingUp,
  },
];

export default function Logistics() {
  return (
    <>
      <Seo
        title="UK Logistics Provider | Freight & Supply Chain Services | Carrgo"
        description="UK logistics provider offering end-to-end supply chain services. Freight forwarding, warehousing, distribution & customs. Tailored logistics for importers & exporters."
        keywords="logistics provider uk, logistics company, logistics services, supply chain services, freight logistics, uk logistics, 3pl uk, warehousing uk, distribution services, supply chain management"
        ogUrl="https://carrgo.co.uk/services/logistics"
        canonical="https://carrgo.co.uk/services/logistics"
        structuredData={serviceSchema}
      />

      <main id="main-content">
        {/* ====== HERO ====== */}
        <section aria-labelledby="hero-heading" className="bg-gradient-to-br from-[#0f4db5] to-[#1A6DFF] text-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block text-xs font-semibold tracking-wider uppercase text-blue-200 mb-3">Logistics Solutions</span>
                <h1 id="hero-heading" className="text-4xl lg:text-5xl font-extrabold leading-tight mb-6">
                  UK Logistics Provider — Freight & Supply Chain Services
                </h1>
                <p className="text-lg text-blue-100 mb-8 leading-relaxed">
                  Carrgo is a full-service UK logistics provider delivering end-to-end supply chain solutions for businesses of all sizes. From freight management and warehousing to distribution and customs clearance, we design, implement and manage logistics operations that reduce costs, improve efficiency, and keep your customers satisfied.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    'Complete freight management across all transport modes',
                    'UK warehousing with pick-and-pack and inventory management',
                    'Nationwide distribution and last-mile delivery',
                    'Expert customs clearance with 99%+ success rate',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-blue-100">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/get-a-quote"
                    className="inline-flex items-center gap-2 bg-white text-[#1A6DFF] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors min-h-[44px]"
                  >
                    Get Logistics Quote <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 bg-[#1A6DFF] text-white border border-white/30 px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors min-h-[44px]"
                  >
                    Speak to Our Team
                  </Link>
                </div>
              </div>
              <div className="hidden lg:grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center border border-white/20">
                  <Ship className="w-8 h-8 mx-auto mb-2 text-blue-200" aria-hidden="true" />
                  <div className="text-2xl font-extrabold">4</div>
                  <div className="text-xs text-blue-200">Transport Modes</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center border border-white/20">
                  <Warehouse className="w-8 h-8 mx-auto mb-2 text-blue-200" aria-hidden="true" />
                  <div className="text-2xl font-extrabold">UK</div>
                  <div className="text-xs text-blue-200">Wide Warehousing</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center border border-white/20">
                  <Shield className="w-8 h-8 mx-auto mb-2 text-blue-200" aria-hidden="true" />
                  <div className="text-2xl font-extrabold">99%+</div>
                  <div className="text-xs text-blue-200">Customs Success</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center border border-white/20">
                  <Users className="w-8 h-8 mx-auto mb-2 text-blue-200" aria-hidden="true" />
                  <div className="text-2xl font-extrabold">6</div>
                  <div className="text-xs text-blue-200">Industries Served</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====== LOGISTICS SERVICES ====== */}
        <section aria-labelledby="services-heading" className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">What We Offer</span>
              <h2 id="services-heading" className="text-3xl lg:text-4xl font-bold text-[#111827] mt-3 mb-4">
                Our Logistics Services
              </h2>
              <p className="text-[#4B5563] max-w-2xl mx-auto">
                Comprehensive logistics solutions designed to streamline your supply chain, reduce operational complexity, and give you complete visibility from origin to destination.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {logisticsServices.map((service, i) => {
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

        {/* ====== INDUSTRIES SERVED ====== */}
        <section aria-labelledby="industries-heading" className="py-16 md:py-24 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">Sector Expertise</span>
              <h2 id="industries-heading" className="text-3xl lg:text-4xl font-bold text-[#111827] mt-3 mb-4">
                Industries We Serve
              </h2>
              <p className="text-[#4B5563] max-w-2xl mx-auto">
                We provide tailored logistics solutions for businesses across a diverse range of industries. Our sector expertise ensures compliance, efficiency, and competitive advantage for your supply chain.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {industries.map((ind, i) => {
                const Icon = ind.icon;
                return (
                  <div
                    key={i}
                    className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="w-12 h-12 bg-[#EFF6FF] rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-[#1A6DFF]" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-bold text-[#111827] mb-2">{ind.name}</h3>
                    <p className="text-[#4B5563] text-sm leading-relaxed">{ind.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ====== WHY CHOOSE CARRGO FOR LOGISTICS ====== */}
        <section aria-labelledby="why-heading" className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">Why Carrgo</span>
              <h2 id="why-heading" className="text-3xl lg:text-4xl font-bold text-[#111827] mt-3 mb-4">
                Why Choose Carrgo for Logistics
              </h2>
              <p className="text-[#4B5563] max-w-2xl mx-auto">
                Partnering with Carrgo means gaining a logistics provider that treats your supply chain as seriously as you do. Here is what sets us apart.
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

        {/* ====== OUR LOGISTICS PROCESS ====== */}
        <section aria-labelledby="process-heading" className="py-16 md:py-24 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">How We Work</span>
              <h2 id="process-heading" className="text-3xl lg:text-4xl font-bold text-[#111827] mt-3 mb-4">
                Our Logistics Process
              </h2>
              <p className="text-[#4B5563] max-w-2xl mx-auto">
                A proven five-step methodology that delivers logistics excellence from day one. We analyse, design, implement, manage and continuously improve your supply chain operations.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
              {processSteps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={i} className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-6 text-center">
                    <div className="w-12 h-12 bg-[#EFF6FF] rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-[#1A6DFF]" aria-hidden="true" />
                    </div>
                    <div className="text-2xl font-extrabold text-[#EFF6FF] mb-2">{step.step}</div>
                    <h3 className="text-lg font-bold text-[#111827] mb-2">{step.title}</h3>
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
              Transform Your Logistics Today
            </h2>
            <p className="text-lg text-blue-100 mb-8 leading-relaxed">
              Ready to streamline your supply chain? Our logistics experts will analyse your operations and design a tailored solution that reduces costs, improves efficiency, and scales with your business.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/get-a-quote"
                className="inline-flex items-center gap-2 bg-white text-[#1A6DFF] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors min-h-[44px]"
              >
                Get Logistics Quote <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-transparent text-white border border-white/30 px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors min-h-[44px]"
              >
                Contact Our Team
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-blue-200">
              <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4" aria-hidden="true" /> Free logistics audit</span>
              <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4" aria-hidden="true" /> Tailored solutions</span>
              <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4" aria-hidden="true" /> No minimum volumes</span>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
