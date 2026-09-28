import { Link } from 'react-router-dom';
import { ArrowRight, FileCheck, Plane, Ship, TrainFront, Truck } from 'lucide-react';
import Seo from '../components/Seo';

const services = [
  { icon: Ship, title: 'Sea freight', text: 'FCL and LCL planning, carrier booking, port handling and onward delivery.' },
  { icon: Plane, title: 'Air freight', text: 'Express and economy air-cargo coordination for commercial shipments.' },
  { icon: Truck, title: 'Road freight', text: 'UK and European pallet, part-load and full-load movements.' },
  { icon: TrainFront, title: 'Rail freight', text: 'Rail options where the route, cargo and current operating conditions are suitable.' },
  { icon: FileCheck, title: 'Customs support', text: 'Document checks and customs-clearance coordination for import and export movements.' },
];

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Carrgo Freight Solutions Ltd',
  url: 'https://www.carrgo.co.uk/',
  email: 'support@carrgo.co.uk',
  areaServed: ['GB', 'IE', 'Northern Ireland'],
  serviceType: ['Freight Forwarding', 'Sea Freight', 'Air Freight', 'Road Freight', 'Rail Freight', 'Customs Clearance'],
};

export default function About() {
  return (
    <>
      <Seo
        title="About Carrgo | UK Freight Forwarding Support"
        description="Carrgo coordinates sea, air, road and rail freight, customs support and delivery for UK and Ireland importers and exporters."
        canonical="https://www.carrgo.co.uk/about"
        ogUrl="https://www.carrgo.co.uk/about"
        structuredData={[
          organizationSchema,
          {
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            name: 'About Carrgo Freight Solutions',
            url: 'https://www.carrgo.co.uk/about/',
            description: 'How Carrgo coordinates commercial freight movements and handles evidence on its public website.',
          },
        ]}
      />

      <section className="bg-gradient-to-br from-brand-900 to-brand-800 py-16 text-white lg:py-24" aria-labelledby="about-heading">
        <div className="container-carrgo max-w-4xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-200">About Carrgo</p>
          <h1 id="about-heading" className="mb-6 text-4xl font-extrabold leading-tight lg:text-5xl">Freight coordination for UK and Ireland businesses</h1>
          <p className="max-w-3xl text-lg leading-relaxed text-brand-100">
            Carrgo Freight Solutions Ltd helps commercial importers and exporters coordinate collection, international freight, customs support and final delivery. Shipment scope and availability are confirmed against the actual route, cargo and booking requirements.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/get-a-quote" className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-brand-900 hover:bg-gray-100">Request a freight quote <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            <Link to="/contact" className="inline-flex min-h-11 items-center rounded-lg border border-brand-300 px-6 py-3 font-semibold text-white hover:bg-white/10">Contact Carrgo</Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-16" aria-labelledby="services-heading">
        <div className="container-carrgo">
          <h2 id="services-heading" className="mb-4 text-3xl font-bold text-gray-900">What Carrgo can arrange</h2>
          <p className="mb-10 max-w-3xl text-gray-600">The exact service depends on origin, destination, goods, dimensions, weight, ready date and the importer or exporter responsible for the movement.</p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map(({ icon: Icon, title, text }) => (
              <article key={title} className="rounded-xl border border-gray-200 p-6">
                <Icon className="mb-4 h-7 w-7 text-brand-700" aria-hidden="true" />
                <h3 className="mb-2 text-xl font-bold text-gray-900">{title}</h3>
                <p className="leading-relaxed text-gray-600">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16" aria-labelledby="quote-process-heading">
        <div className="container-carrgo grid gap-10 lg:grid-cols-2">
          <div>
            <h2 id="quote-process-heading" className="mb-5 text-3xl font-bold text-gray-900">How quote requests are handled</h2>
            <ol className="space-y-4 text-gray-700">
              <li><strong>1. Shipment facts:</strong> Carrgo collects the route, goods, weight or volume, dimensions and ready date.</li>
              <li><strong>2. Scope check:</strong> The team confirms which collection, freight, customs and delivery elements are required.</li>
              <li><strong>3. Supplier checks:</strong> Carrier or agent availability, cut-offs and charges are checked for the specific movement.</li>
              <li><strong>4. Clear handover:</strong> The quotation states its included scope, validity and any information still required.</li>
            </ol>
          </div>
          <aside className="rounded-xl border border-blue-200 bg-blue-50 p-7">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Public evidence standard</h2>
            <p className="mb-4 leading-relaxed text-gray-700">Carrgo does not publish customer totals, ratings, performance results or industry accreditations without source records that can support the claim and, where relevant, permission to publish it.</p>
            <p className="mb-6 leading-relaxed text-gray-700">Operational notices and weather advisories are kept separate from measured congestion data. Unknown measurements are shown as unknown rather than treated as normal conditions.</p>
            <Link to="/resources/port-congestion-tracker" className="font-semibold text-brand-800 hover:underline">Review the 17-port evidence tracker →</Link>
          </aside>
        </div>
      </section>

      <section className="bg-white py-16" aria-labelledby="next-step-heading">
        <div className="container-carrgo max-w-3xl text-center">
          <h2 id="next-step-heading" className="mb-4 text-3xl font-bold text-gray-900">Tell Carrgo what needs to move</h2>
          <p className="mb-8 text-gray-600">Include the origin, destination, goods, approximate weight or volume and your contact details. Dimensions can be marked “I’m not sure”.</p>
          <Link to="/get-a-quote" className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-brand-800 px-6 py-3 font-semibold text-white hover:bg-brand-900">Start a freight quote <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
        </div>
      </section>
    </>
  );
}
