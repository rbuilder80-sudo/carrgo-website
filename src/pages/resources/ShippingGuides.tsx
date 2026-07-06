import { Link } from 'react-router-dom';
import Seo from '../../components/Seo';
import {
  Ship, Plane, Truck, TrainFront, FileCheck, Package, Shield, BookOpen, ArrowRight
} from 'lucide-react';

interface Guide {
  icon: React.ReactNode;
  title: string;
  description: string;
  slug: string;
}

const guides: Guide[] = [
  {
    icon: <Ship className="w-7 h-7" />,
    title: 'Sea Freight Guide',
    description: 'Complete guide to FCL and LCL container shipping. Learn about port-to-port, door-to-door, transit times and documentation.',
    slug: '#',
  },
  {
    icon: <Plane className="w-7 h-7" />,
    title: 'Air Freight Guide',
    description: 'Everything about express and economy air cargo. Understand chargeable weight, airport handling and customs at UK airports.',
    slug: '#',
  },
  {
    icon: <Truck className="w-7 h-7" />,
    title: 'Road Freight Guide',
    description: 'FTL and LTL road haulage from Europe to the UK. Covering routes, transit times, permits and GPS tracking.',
    slug: '#',
  },
  {
    icon: <TrainFront className="w-7 h-7" />,
    title: 'Rail Freight Guide',
    description: 'Shipping via the New Silk Road from China to UK. Faster than sea, cheaper than air. Routes, schedules and costs.',
    slug: '#',
  },
  {
    icon: <FileCheck className="w-7 h-7" />,
    title: 'Customs Guide',
    description: 'UK import and export customs procedures. EORI numbers, commodity codes, declarations and compliance requirements.',
    slug: '#',
  },
  {
    icon: <Package className="w-7 h-7" />,
    title: 'Packaging Guide',
    description: 'Best practices for cargo packaging. Palletisation, labelling, FBA prep and protecting goods in transit.',
    slug: '#',
  },
  {
    icon: <BookOpen className="w-7 h-7" />,
    title: 'Incoterms Guide',
    description: 'Understand EXW, FOB, CIF, DDP and all 11 Incoterms. Know who pays for what and where risk transfers.',
    slug: '/resources/incoterms-guide',
  },
  {
    icon: <Shield className="w-7 h-7" />,
    title: 'Insurance Guide',
    description: 'Cargo insurance explained. All-risk vs total loss coverage, how to value your goods and how to claim.',
    slug: '#',
  },
];

export default function ShippingGuides() {
  return (
    <>
      <Seo
        title="Shipping Guides | Carrgo Freight Solutions"
        description="Comprehensive guides to sea, air, road and rail freight shipping. Learn about customs, packaging, Incoterms and cargo insurance."
      />

      {/* Hero */}
      <section aria-label="Shipping guides hero" className="relative bg-brand-800 py-20 lg:py-28">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        </div>
        <div className="container-carrgo relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-brand-100 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4" />
              Resources
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Shipping Guides
            </h1>
            <p className="text-lg text-brand-100 leading-relaxed max-w-2xl mx-auto">
              Everything you need to know about freight forwarding. Browse our comprehensive guides covering every mode of transport and key topics.
            </p>
          </div>
        </div>
      </section>

      {/* Guides Grid */}
      <section aria-label="Guide cards" className="py-16 lg:py-20 bg-white">
        <div className="container-carrgo">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {guides.map((guide) => (
              <article
                key={guide.title}
                className="bg-white rounded-xl border hover:shadow-lg transition-shadow p-6 flex flex-col"
              >
                <div className="w-12 h-12 rounded-lg bg-brand-50 flex items-center justify-center text-brand-700 mb-4">
                  {guide.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{guide.title}</h3>
                <p className="text-sm text-gray-600 mb-4 flex-1">{guide.description}</p>
                <Link
                  to={guide.slug}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-700 hover:text-brand-800 transition-colors mt-auto"
                >
                  Read Guide
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section aria-label="Get a quote" className="py-16 lg:py-20 bg-gray-50">
        <div className="container-carrgo">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Still Have Questions?
            </h2>
            <p className="text-gray-600 mb-8">
              Our freight experts are here to help. Get personalised advice for your shipment.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/get-a-quote"
                className="inline-flex items-center gap-2 bg-brand-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-brand-900 transition-colors"
              >
                Get a Quote
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
