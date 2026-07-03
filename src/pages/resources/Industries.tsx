import { Link } from 'react-router-dom';
import Seo from '../../components/Seo';
import {
  Sofa, ShoppingCart, Car, Hammer, Cpu, Shirt, UtensilsCrossed, Pill,
  Factory, ArrowRight, Ship, Plane, Truck
} from 'lucide-react';

interface Industry {
  icon: React.ReactNode;
  name: string;
  description: string;
  cargoTypes: string[];
  recommendedService: string;
  serviceIcon: React.ReactNode;
}

const industries: Industry[] = [
  {
    icon: <Sofa className="w-7 h-7" />,
    name: 'Furniture',
    description: 'From flat-pack to bespoke, we handle furniture shipments of all sizes with care. Our team ensures proper packaging, stacking and delivery to showroom or warehouse.',
    cargoTypes: ['Flat-pack furniture', 'Upholstered goods', 'Mattresses', 'Office furniture', 'Outdoor sets'],
    recommendedService: 'Sea Freight (FCL/LCL)',
    serviceIcon: <Ship className="w-4 h-4" />,
  },
  {
    icon: <ShoppingCart className="w-7 h-7" />,
    name: 'E-commerce',
    description: 'Specialised FBA prep and multi-channel fulfilment. We handle high-volume, SKU-diverse shipments with barcode compliance and inventory accuracy.',
    cargoTypes: ['Amazon FBA shipments', 'Electronics', 'Consumer goods', 'Homeware', 'Toys & games'],
    recommendedService: 'Sea Freight + FBA Prep',
    serviceIcon: <Ship className="w-4 h-4" />,
  },
  {
    icon: <Car className="w-7 h-7" />,
    name: 'Automotive',
    description: 'Just-in-time parts delivery with millimetre precision. We support UK automotive manufacturers with reliable, trackable component shipments.',
    cargoTypes: ['Engine components', 'Brake systems', 'Electrical parts', 'Body panels', 'Tyres'],
    recommendedService: 'Road Freight / Air Freight',
    serviceIcon: <Truck className="w-4 h-4" />,
  },
  {
    icon: <Hammer className="w-7 h-7" />,
    name: 'Construction',
    description: 'Heavy, bulky and time-critical materials delivered to site or depot. We handle everything from tiles and fixtures to structural steel.',
    cargoTypes: ['Tiles & ceramics', 'Sanitary ware', 'Fixtures & fittings', 'Structural steel', 'Tools & equipment'],
    recommendedService: 'Sea Freight (FCL)',
    serviceIcon: <Ship className="w-4 h-4" />,
  },
  {
    icon: <Cpu className="w-7 h-7" />,
    name: 'Electronics',
    description: 'Anti-static packaging, shock protection and secure handling for sensitive electronic components. Full compliance with battery shipping regulations.',
    cargoTypes: ['PCBs', 'Consumer electronics', 'LED lighting', 'Batteries (UN 38.3)', 'Cables & accessories'],
    recommendedService: 'Air Freight / Sea Freight',
    serviceIcon: <Plane className="w-4 h-4" />,
  },
  {
    icon: <Shirt className="w-7 h-7" />,
    name: 'Fashion',
    description: 'Fast turnaround for seasonal collections. We understand the urgency of fashion logistics with flexible scheduling and express options.',
    cargoTypes: ['Clothing & apparel', 'Footwear', 'Accessories', 'Textiles', 'Jewellery'],
    recommendedService: 'Rail Freight / Air Freight',
    serviceIcon: <Truck className="w-4 h-4" />,
  },
  {
    icon: <UtensilsCrossed className="w-7 h-7" />,
    name: 'Food & Beverage',
    description: 'Temperature-controlled and ambient shipping for food products. Full compliance with UK food import regulations and labelling requirements.',
    cargoTypes: ['Packaged foods', 'Beverages', 'Ingredients', 'Health foods', 'Speciality items'],
    recommendedService: 'Temperature-Controlled Freight',
    serviceIcon: <Ship className="w-4 h-4" />,
  },
  {
    icon: <Pill className="w-7 h-7" />,
    name: 'Pharmaceuticals',
    description: 'GDP-compliant logistics for pharmaceutical products. Cold chain integrity, full batch traceability and regulatory documentation handled end-to-end.',
    cargoTypes: ['APIs', 'Medical devices', 'Vaccines (cold chain)', 'Diagnostic kits', 'Supplements'],
    recommendedService: 'Air Freight (Cold Chain)',
    serviceIcon: <Plane className="w-4 h-4" />,
  },
];

export default function Industries() {
  return (
    <>
      <Seo
        title="Industries We Serve | Carrgo Freight Solutions"
        description="Freight solutions for furniture, e-commerce, automotive, construction, electronics, fashion, food & beverage and pharmaceuticals."
      />

      {/* Hero */}
      <section aria-label="Industries hero" className="relative bg-brand-800 py-20 lg:py-28">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        </div>
        <div className="container-carrgo relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-brand-100 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <Factory className="w-4 h-4" />
              Sectors
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Industries We Serve
            </h1>
            <p className="text-lg text-brand-100 leading-relaxed max-w-2xl mx-auto">
              Specialised freight solutions tailored to the unique demands of your industry. From fragile furniture to time-critical automotive parts.
            </p>
          </div>
        </div>
      </section>

      {/* Industry Cards */}
      <section aria-label="Industry cards" className="py-16 lg:py-20 bg-white">
        <div className="container-carrgo">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {industries.map((ind) => (
              <article
                key={ind.name}
                className="bg-white rounded-xl border hover:shadow-lg transition-shadow p-6 flex flex-col"
              >
                <div className="w-12 h-12 rounded-lg bg-brand-50 flex items-center justify-center text-brand-700 mb-4">
                  {ind.icon}
                </div>
                <h2 className="text-lg font-bold text-gray-900 mb-2">{ind.name}</h2>
                <p className="text-sm text-gray-600 mb-4 flex-1">{ind.description}</p>

                <div className="mb-4">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Common Cargo</h3>
                  <ul className="flex flex-wrap gap-1.5">
                    {ind.cargoTypes.map((ct) => (
                      <li key={ct} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {ct}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-700 bg-brand-50 px-2.5 py-1 rounded-full">
                    {ind.serviceIcon}
                    {ind.recommendedService}
                  </span>
                </div>
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
              Serving Your Industry?
            </h2>
            <p className="text-gray-600 mb-8">
              We tailor our logistics approach to your sector&apos;s specific requirements. Let us discuss your supply chain needs.
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
