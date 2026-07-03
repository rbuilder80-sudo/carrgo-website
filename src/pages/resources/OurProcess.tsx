import { Link } from 'react-router-dom';
import Seo from '../../components/Seo';
import {
  ArrowRight, Phone, ClipboardList, Package, Globe, FileCheck, Truck
} from 'lucide-react';

interface ProcessStep {
  step: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  details: string[];
}

const steps: ProcessStep[] = [
  {
    step: 1,
    icon: <Phone className="w-6 h-6" />,
    title: 'Initial Consultation',
    description: 'We learn about your business, cargo, routes and requirements. Every shipment starts with understanding your needs.',
    details: [
      'Discuss cargo type, volume and dimensions',
      'Identify origin, destination and timing requirements',
      'Review Incoterm preferences and risk appetite',
      'Assess any special handling or compliance needs',
    ],
  },
  {
    step: 2,
    icon: <ClipboardList className="w-6 h-6" />,
    title: 'Quote & Booking',
    description: 'We provide a detailed all-inclusive quote within 2 hours. Once confirmed, we book cargo space and coordinate with your supplier.',
    details: [
      'All-inclusive quote with no hidden fees',
      'Multiple transport options provided',
      'Space booking with carrier confirmed',
      'Supplier coordination and pickup arranged',
    ],
  },
  {
    step: 3,
    icon: <Package className="w-6 h-6" />,
    title: 'Collection & Export',
    description: 'We collect from your supplier, manage export customs and ensure proper documentation and packaging.',
    details: [
      'Factory or warehouse collection arranged',
      'Export customs declaration filed',
      'Documentation checked and completed',
      'Cargo loaded and secured for transit',
    ],
  },
  {
    step: 4,
    icon: <Globe className="w-6 h-6" />,
    title: 'Transit & Tracking',
    description: 'Your cargo is in transit with full visibility. We monitor progress and proactively alert you to any developments.',
    details: [
      'Real-time tracking portal access',
      'Proactive milestone notifications',
      'Route monitoring and contingency planning',
      '24/7 support for any transit issues',
    ],
  },
  {
    step: 5,
    icon: <FileCheck className="w-6 h-6" />,
    title: 'UK Customs & Delivery',
    description: 'We clear your goods through UK customs and arrange final delivery to your door, warehouse or Amazon FBA centre.',
    details: [
      'UK import customs declaration filed (CDS/CHIEF)',
      'Duty and VAT calculation and payment facilitation',
      'Final mile delivery arranged to your destination',
      'Proof of delivery and final documentation sent',
    ],
  },
];

export default function OurProcess() {
  return (
    <>
      <Seo
        title="Our Process | Carrgo Freight Solutions"
        description="Our 5-step freight forwarding process from quote to delivery. See how we handle your shipment every step of the way."
      />

      {/* Hero */}
      <section aria-label="Our process hero" className="relative bg-brand-800 py-20 lg:py-28">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        </div>
        <div className="container-carrgo relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-brand-100 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <Truck className="w-4 h-4" />
              How It Works
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our Process
            </h1>
            <p className="text-lg text-brand-100 leading-relaxed max-w-2xl mx-auto">
              A simple, transparent 5-step process from your first enquiry to final delivery. We handle the complexity so you do not have to.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section aria-label="Process timeline" className="py-16 lg:py-20 bg-white">
        <div className="container-carrgo">
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-brand-200 hidden md:block" />

              <div className="space-y-8">
                {steps.map((s) => (
                  <article key={s.step} className="relative flex gap-6">
                    {/* Step number / icon */}
                    <div className="hidden md:flex w-12 h-12 rounded-full bg-brand-800 text-white items-center justify-center flex-shrink-0 z-10 relative">
                      {s.icon}
                    </div>
                    <div className="md:hidden w-10 h-10 rounded-full bg-brand-800 text-white flex items-center justify-center flex-shrink-0 text-sm font-bold">
                      {s.step}
                    </div>

                    {/* Content */}
                    <div className="bg-white rounded-xl border hover:shadow-lg transition-shadow p-6 flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="md:hidden w-6 h-6 rounded-full bg-brand-50 text-brand-700 flex items-center justify-center text-xs font-bold">
                          {s.step}
                        </span>
                        <h2 className="text-xl font-bold text-gray-900">{s.title}</h2>
                      </div>
                      <p className="text-gray-600 mb-4">{s.description}</p>
                      <ul className="space-y-2">
                        {s.details.map((d, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                            <FileCheck className="w-4 h-4 text-brand-700 flex-shrink-0 mt-0.5" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section aria-label="Get a quote" className="py-16 lg:py-20 bg-gray-50">
        <div className="container-carrgo">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-gray-600 mb-8">
              Start with Step 1 — get in touch for a free consultation and quote. No obligation, no pressure.
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
