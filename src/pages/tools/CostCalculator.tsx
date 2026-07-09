import { useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../../components/Seo';
import { allPorts, calculateCosts, type CostBreakdown } from '../../data/portData';
import {
  Calculator,
  ArrowRight,
  Warehouse,
  Anchor,
  Package,
  TrendingDown,
  DollarSign,
  Clock,
  AlertTriangle,
  CheckCircle2,
  ChevronLeft,
  Truck,
  Ship,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function StatusBadge({ status }: { status: 'Normal' | 'Moderate' | 'Congested' | 'Severe' }) {
  const styles: Record<string, string> = {
    Normal: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Moderate: 'bg-amber-50 text-amber-700 border-amber-200',
    Congested: 'bg-red-50 text-red-700 border-red-200',
    Severe: 'bg-red-100 text-red-800 border-red-300',
  };
  const icons = {
    Normal: <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />,
    Moderate: <AlertTriangle className="w-3.5 h-3.5 mr-1.5" />,
    Congested: <AlertTriangle className="w-3.5 h-3.5 mr-1.5" />,
    Severe: <AlertTriangle className="w-3.5 h-3.5 mr-1.5" />,
  };
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${styles[status]}`}
    >
      {icons[status as keyof typeof icons]}
      {status}
    </span>
  );
}

function formatCurrency(n: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(n);
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function CostCalculator() {
  const [portSlug, setPortSlug] = useState('');
  const [containerType, setContainerType] = useState<'20ft' | '40ft' | '40ft HC' | 'LCL'>('40ft');
  const [cargoValue, setCargoValue] = useState<string>('');
  const [delayDays, setDelayDays] = useState<string>('');
  const [result, setResult] = useState<CostBreakdown | null>(null);
  const [selectedPort, setSelectedPort] = useState<typeof allPorts[0] | null>(null);

  const handleCalculate = () => {
    const days = parseInt(delayDays, 10);
    const value = parseFloat(cargoValue);
    if (!portSlug || !days || days < 1 || days > 30 || !value || value < 0) return;

    const port = allPorts.find((p) => p.slug === portSlug) || null;
    setSelectedPort(port);

    const breakdown = calculateCosts({
      port: portSlug,
      containerType,
      cargoValue: value,
      delayDays: days,
    });
    setResult(breakdown);
  };

  const isFormValid =
    portSlug !== '' &&
    cargoValue !== '' &&
    parseFloat(cargoValue) > 0 &&
    delayDays !== '' &&
    parseInt(delayDays, 10) >= 1 &&
    parseInt(delayDays, 10) <= 30;

  return (
    <>
      <Seo
        title="Importer Cost Calculator | Port Delay Costs | Carrgo"
        description="Calculate the real cost of port delays including demurrage, detention, storage and lost sales for UK and Ireland ports. Free importer cost calculator from Carrgo."
        keywords="importer cost calculator, demurrage calculator, port delay costs, container detention cost, storage cost calculator, uk port costs"
      />

      {/* ====== Hero ====== */}
      <section aria-label="Cost calculator hero" className="relative py-20 lg:py-28 overflow-hidden" style={{ backgroundColor: '#1A6DFF' }}>
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '32px 32px',
            }}
          />
        </div>
        <div className="container-carrgo relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white/90 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <Calculator className="w-4 h-4" />
              Free Tool
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Importer Cost Calculator
            </h1>
            <p className="text-lg text-white/90 leading-relaxed max-w-2xl">
              Calculate the real cost of port delays — demurrage, detention, storage &amp; lost sales.
            </p>
          </div>
        </div>
      </section>

      {/* ====== Calculator Form ====== */}
      <section aria-label="Cost calculator form" className="py-12 lg:py-16 bg-white">
        <div className="container-carrgo">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Enter Shipment Details</h2>
              <div className="space-y-5">
                {/* Port */}
                <div>
                  <label htmlFor="port" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Port
                  </label>
                  <select
                    id="port"
                    value={portSlug}
                    onChange={(e) => setPortSlug(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A6DFF]/30 focus:border-[#1A6DFF] transition-all bg-white"
                  >
                    <option value="">Select a port</option>
                    {allPorts.map((p) => (
                      <option key={p.slug} value={p.slug}>
                        {p.port} — {p.country}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Container Type */}
                <div>
                  <label htmlFor="container" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Container Type
                  </label>
                  <select
                    id="container"
                    value={containerType}
                    onChange={(e) =>
                      setContainerType(e.target.value as '20ft' | '40ft' | '40ft HC' | 'LCL')
                    }
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A6DFF]/30 focus:border-[#1A6DFF] transition-all bg-white"
                  >
                    <option value="20ft">20ft Standard</option>
                    <option value="40ft">40ft Standard</option>
                    <option value="40ft HC">40ft High Cube</option>
                    <option value="LCL">LCL (Less than Container Load)</option>
                  </select>
                </div>

                {/* Cargo Value */}
                <div>
                  <label htmlFor="cargoValue" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Cargo Value (GBP)
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      id="cargoValue"
                      type="number"
                      min={0}
                      placeholder="e.g. 50000"
                      value={cargoValue}
                      onChange={(e) => setCargoValue(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A6DFF]/30 focus:border-[#1A6DFF] transition-all"
                    />
                  </div>
                </div>

                {/* Delay Days */}
                <div>
                  <label htmlFor="delayDays" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Delay Days (1–30)
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      id="delayDays"
                      type="number"
                      min={1}
                      max={30}
                      placeholder="e.g. 7"
                      value={delayDays}
                      onChange={(e) => setDelayDays(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A6DFF]/30 focus:border-[#1A6DFF] transition-all"
                    />
                  </div>
                </div>

                <button
                  onClick={handleCalculate}
                  disabled={!isFormValid}
                  className="w-full inline-flex items-center justify-center gap-2 text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: '#1A6DFF' }}
                >
                  <Calculator className="w-4 h-4" />
                  Calculate Costs
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== Results Panel ====== */}
      {result && selectedPort && (
        <section aria-label="Cost results" className="py-12 lg:py-16" style={{ backgroundColor: '#F8FAFC' }}>
          <div className="container-carrgo">
            <div className="max-w-4xl mx-auto">
              {/* Port context */}
              <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6 flex flex-wrap items-center gap-4">
                <Ship className="w-6 h-6 text-[#1A6DFF]" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Selected Port</p>
                  <p className="font-semibold text-gray-900">
                    {selectedPort.port} — Health Score {selectedPort.healthScore}/100
                  </p>
                </div>
                <StatusBadge status={selectedPort.status} />
              </div>

              {/* Cost cards */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-blue-50">
                      <Warehouse className="w-5 h-5 text-[#1A6DFF]" />
                    </div>
                    <p className="text-sm font-medium text-gray-600">Storage Cost</p>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(result.storage)}</p>
                  <p className="text-xs text-gray-400 mt-1">Daily rate × {delayDays} days</p>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-amber-50">
                      <Anchor className="w-5 h-5 text-amber-600" />
                    </div>
                    <p className="text-sm font-medium text-gray-600">Demurrage</p>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(result.demurrage)}</p>
                  <p className="text-xs text-gray-400 mt-1">After 3 free days</p>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-red-50">
                      <Package className="w-5 h-5 text-red-600" />
                    </div>
                    <p className="text-sm font-medium text-gray-600">Detention</p>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(result.detention)}</p>
                  <p className="text-xs text-gray-400 mt-1">After 5 free days</p>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-purple-50">
                      <TrendingDown className="w-5 h-5 text-purple-600" />
                    </div>
                    <p className="text-sm font-medium text-gray-600">Lost Sales</p>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(result.lostSales)}</p>
                  <p className="text-xs text-gray-400 mt-1">0.2% of cargo value/day</p>
                </div>
              </div>

              {/* Total */}
              <div className="bg-white rounded-xl border-2 border-[#1A6DFF] p-6 md:p-8 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Estimated Cost</p>
                    <p className="text-3xl md:text-4xl font-bold text-gray-900 mt-1">
                      {formatCurrency(result.total)}
                    </p>
                  </div>
                  <div className="text-sm text-gray-500 max-w-md">
                    Based on a {containerType} container delayed {delayDays} days at {selectedPort.port} with a cargo value of {formatCurrency(parseFloat(cargoValue))}.
                  </div>
                </div>
              </div>

              {/* Breakdown text */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-3">How this is calculated</h3>
                <ul className="text-sm text-gray-600 space-y-2 leading-relaxed">
                  <li>
                    <strong>Storage:</strong> Charged by the port/terminal per day after free time expires. For a {containerType} container, the daily storage rate is applied across all {delayDays} delay days.
                  </li>
                  <li>
                    <strong>Demurrage:</strong> Charged by the shipping line for keeping the container at the port beyond the agreed free time (typically 3 days). Kicks in after day 3.
                  </li>
                  <li>
                    <strong>Detention:</strong> Charged for using the container outside the port beyond the agreed free time (typically 5 days). Kicks in after day 5.
                  </li>
                  <li>
                    <strong>Lost Sales:</strong> Estimated revenue impact of delayed inventory. Calculated as 0.2% of total cargo value per day of delay.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ====== How It Works ====== */}
      <section aria-label="How it works" className="py-16 bg-white">
        <div className="container-carrgo">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">How Delay Costs Work</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <article className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <Warehouse className="w-8 h-8 text-[#1A6DFF] mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Storage</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Charged by the port or terminal per day after free time expires. Rates vary by container size and port.
                </p>
              </article>
              <article className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <Anchor className="w-8 h-8 text-[#1A6DFF] mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Demurrage</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Charged by the shipping line for keeping the container at the port beyond the agreed free time.
                </p>
              </article>
              <article className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <Package className="w-8 h-8 text-[#1A6DFF] mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Detention</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Charged for using the container outside the port beyond the agreed time. Affects haulage and inland logistics.
                </p>
              </article>
              <article className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <TrendingDown className="w-8 h-8 text-[#1A6DFF] mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Lost Sales</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Estimated revenue impact of delayed inventory. Stock arriving late means missed sales opportunities.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* ====== CTA ====== */}
      <section aria-label="Get a quote" className="py-16 lg:py-20" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="container-carrgo">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Need Help Avoiding Port Delays?
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Our freight forwarding team monitors UK &amp; Ireland port conditions daily and can help you route cargo through the best available port to minimise delays and costs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/get-a-quote"
                className="inline-flex items-center gap-2 text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#1A6DFF' }}
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

      {/* ====== Back Link ====== */}
      <section className="py-8 bg-white">
        <div className="container-carrgo">
          <Link
            to="/resources/port-congestion-tracker"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#1A6DFF] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Port Intelligence
          </Link>
        </div>
      </section>
    </>
  );
}
