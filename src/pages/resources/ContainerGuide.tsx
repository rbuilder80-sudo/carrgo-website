import { Link } from 'react-router-dom';
import Seo from '../../components/Seo';
import { Container, ArrowRight, Ruler, Weight, Box } from 'lucide-react';

interface ContainerSpec {
  type: string;
  length: string;
  width: string;
  height: string;
  capacity: string;
  maxPayload: string;
  tareWeight: string;
}

const containers: ContainerSpec[] = [
  { type: '20ft GP', length: '5.90m', width: '2.35m', height: '2.39m', capacity: '33.2 CBM', maxPayload: '28,200 kg', tareWeight: '2,200 kg' },
  { type: '40ft GP', length: '12.03m', width: '2.35m', height: '2.39m', capacity: '67.7 CBM', maxPayload: '26,600 kg', tareWeight: '3,700 kg' },
  { type: '40ft HC', length: '12.03m', width: '2.35m', height: '2.69m', capacity: '76.3 CBM', maxPayload: '26,200 kg', tareWeight: '3,900 kg' },
  { type: '45ft HC', length: '13.56m', width: '2.35m', height: '2.69m', capacity: '86.0 CBM', maxPayload: '27,700 kg', tareWeight: '4,800 kg' },
];

function ContainerVisual({ type }: { type: string }) {
  const dims = {
    '20ft GP': { w: 'w-32', h: 'h-20', label: '20ft' },
    '40ft GP': { w: 'w-48', h: 'h-20', label: '40ft' },
    '40ft HC': { w: 'w-48', h: 'h-24', label: '40ft HC' },
    '45ft HC': { w: 'w-56', h: 'h-24', label: '45ft HC' },
  };
  const d = dims[type as keyof typeof dims];
  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`${d.w} ${d.h} border-2 border-brand-300 bg-brand-50 rounded-md flex items-center justify-center relative`}>
        <span className="text-xs font-semibold text-brand-700">{d.label}</span>
        <div className="absolute -bottom-1.5 left-2 right-2 h-1 bg-gray-300 rounded-full" />
      </div>
    </div>
  );
}

export default function ContainerGuide() {
  return (
    <>
      <Seo
        title="Container Size Guide | Carrgo Freight Solutions"
        description="20ft, 40ft, 40ft HC and 45ft HC container dimensions, capacity and weight limits. Compare sizes and choose the right container."
      />

      {/* Hero */}
      <section aria-label="Container guide hero" className="relative bg-brand-800 py-20 lg:py-28">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        </div>
        <div className="container-carrgo relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-brand-100 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <Container className="w-4 h-4" />
              Reference
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Container Size Guide
            </h1>
            <p className="text-lg text-brand-100 leading-relaxed max-w-2xl">
              Compare standard shipping container dimensions, capacities and weight limits to choose the right option for your cargo.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section aria-label="Container comparison table" className="py-16 lg:py-20 bg-white">
        <div className="container-carrgo">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Container Specifications</h2>

            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">Type</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                      <span className="inline-flex items-center gap-1"><Ruler className="w-3.5 h-3.5" />Int. Length</span>
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">Int. Width</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">Int. Height</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                      <span className="inline-flex items-center gap-1"><Box className="w-3.5 h-3.5" />Capacity</span>
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                      <span className="inline-flex items-center gap-1"><Weight className="w-3.5 h-3.5" />Max Payload</span>
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">Tare Weight</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {containers.map((c) => (
                    <tr key={c.type} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-gray-900">{c.type}</td>
                      <td className="px-6 py-4 text-gray-600">{c.length}</td>
                      <td className="px-6 py-4 text-gray-600">{c.width}</td>
                      <td className="px-6 py-4 text-gray-600">{c.height}</td>
                      <td className="px-6 py-4 text-gray-600 font-medium">{c.capacity}</td>
                      <td className="px-6 py-4 text-gray-600">{c.maxPayload}</td>
                      <td className="px-6 py-4 text-gray-600">{c.tareWeight}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Diagrams */}
      <section aria-label="Container size diagrams" className="py-16 bg-gray-50">
        <div className="container-carrgo">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Size Comparison</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {containers.map((c) => (
                <article key={c.type} className="bg-white rounded-xl border p-6 flex flex-col items-center">
                  <ContainerVisual type={c.type} />
                  <h3 className="mt-4 font-semibold text-gray-900">{c.type}</h3>
                  <p className="text-sm text-gray-600 mt-1">{c.capacity}</p>
                  <p className="text-xs text-gray-500 mt-1">Up to {c.maxPayload}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tips */}
      <section aria-label="Container selection tips" className="py-16 bg-white">
        <div className="container-carrgo">
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
            <article className="bg-brand-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-2">20ft GP</h3>
              <p className="text-sm text-gray-600">Best for heavy, dense cargo like machinery or metals. Limited volume but high payload capacity.</p>
            </article>
            <article className="bg-brand-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-2">40ft GP / HC</h3>
              <p className="text-sm text-gray-600">Ideal for general cargo, furniture and voluminous goods. HC adds extra height for tall items.</p>
            </article>
            <article className="bg-brand-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-2">45ft HC</h3>
              <p className="text-sm text-gray-600">Maximum volume for light, bulky cargo. Popular for e-commerce and consumer goods.</p>
            </article>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section aria-label="Get a quote" className="py-16 lg:py-20 bg-gray-50">
        <div className="container-carrgo">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Not Sure Which Container?
            </h2>
            <p className="text-gray-600 mb-8">
              Tell us about your cargo and we will recommend the most cost-effective container type and size.
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
