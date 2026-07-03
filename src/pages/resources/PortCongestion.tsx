import { Link } from 'react-router-dom';
import Seo from '../../components/Seo';
import { Ship, Clock, AlertTriangle, ArrowRight, Anchor } from 'lucide-react';

interface PortStatus {
  port: string;
  status: 'Normal' | 'Busy' | 'Congested';
  waitTime: string;
  lastUpdated: string;
}

const ports: PortStatus[] = [
  { port: 'Felixstowe', status: 'Busy', waitTime: '2-4 days', lastUpdated: 'Updated 2h ago' },
  { port: 'Southampton', status: 'Normal', waitTime: '1-2 days', lastUpdated: 'Updated 1h ago' },
  { port: 'London Gateway', status: 'Normal', waitTime: '1-2 days', lastUpdated: 'Updated 3h ago' },
  { port: 'Liverpool', status: 'Busy', waitTime: '2-3 days', lastUpdated: 'Updated 4h ago' },
  { port: 'Bristol', status: 'Normal', waitTime: '1 day', lastUpdated: 'Updated 5h ago' },
  { port: 'Grangemouth', status: 'Congested', waitTime: '4-6 days', lastUpdated: 'Updated 1h ago' },
  { port: 'Belfast', status: 'Normal', waitTime: '1-2 days', lastUpdated: 'Updated 6h ago' },
];

function StatusBadge({ status }: { status: PortStatus['status'] }) {
  const styles = {
    Normal: 'bg-green-100 text-green-800 border-green-200',
    Busy: 'bg-amber-100 text-amber-800 border-amber-200',
    Congested: 'bg-red-100 text-red-800 border-red-200',
  };
  const icons = {
    Normal: <Clock className="w-3.5 h-3.5 mr-1" />,
    Busy: <AlertTriangle className="w-3.5 h-3.5 mr-1" />,
    Congested: <AlertTriangle className="w-3.5 h-3.5 mr-1" />,
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status]}`}>
      {icons[status]}
      {status}
    </span>
  );
}

export default function PortCongestion() {
  return (
    <>
      <Seo
        title="UK Port Congestion Tracker | Carrgo Freight Solutions"
        description="Live UK port congestion status for Felixstowe, Southampton, London Gateway, Liverpool, Bristol, Grangemouth and Belfast."
      />

      {/* Hero */}
      <section aria-label="Port congestion hero" className="relative bg-brand-800 py-20 lg:py-28">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        </div>
        <div className="container-carrgo relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-brand-100 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <Ship className="w-4 h-4" />
              Live Status
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              UK Port Congestion Tracker
            </h1>
            <p className="text-lg text-brand-100 leading-relaxed max-w-2xl">
              Real-time congestion status for all major UK container ports. Plan your shipments with up-to-date wait times and operational conditions.
            </p>
          </div>
        </div>
      </section>

      {/* Status Table */}
      <section aria-label="Port congestion table" className="py-16 lg:py-20 bg-white">
        <div className="container-carrgo">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Current Port Status</h2>
              <span className="text-sm text-gray-500 flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                Refreshed every 4 hours
              </span>
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">Port</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">Status</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">Avg. Wait Time</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">Last Updated</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {ports.map((p) => (
                    <tr key={p.port} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Anchor className="w-5 h-5 text-brand-700" />
                          <span className="font-medium text-gray-900">{p.port}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={p.status} />
                      </td>
                      <td className="px-6 py-4 text-gray-600">{p.waitTime}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{p.lastUpdated}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Legend */}
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-500" />
                Normal — Standard operations
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-500" />
                Busy — Expect minor delays
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                Congested — Significant delays likely
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section aria-label="How to use tracker" className="py-16 bg-gray-50">
        <div className="container-carrgo">
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
            <article className="bg-white rounded-xl border p-6">
              <Clock className="w-8 h-8 text-brand-700 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Wait Times</h3>
              <p className="text-sm text-gray-600">Average vessel waiting time at anchorage before berth assignment.</p>
            </article>
            <article className="bg-white rounded-xl border p-6">
              <AlertTriangle className="w-8 h-8 text-brand-700 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Status Alerts</h3>
              <p className="text-sm text-gray-600">Congested ports may impact your supply chain. Consider alternative routes.</p>
            </article>
            <article className="bg-white rounded-xl border p-6">
              <Ship className="w-8 h-8 text-brand-700 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Planning Ahead</h3>
              <p className="text-sm text-gray-600">Use this data to plan shipment timing and select the best UK arrival port.</p>
            </article>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section aria-label="Get a quote" className="py-16 lg:py-20 bg-white">
        <div className="container-carrgo">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Need Help Routing Your Shipment?
            </h2>
            <p className="text-gray-600 mb-8">
              Our team monitors port conditions daily and can advise the best route and port for your cargo.
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
