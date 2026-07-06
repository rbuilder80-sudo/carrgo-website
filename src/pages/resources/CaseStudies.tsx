import { Link } from 'react-router-dom';
import Seo from '../../components/Seo';
import { TrendingUp, ArrowRight, CheckCircle, BarChart3 } from 'lucide-react';

interface CaseStudy {
  companyType: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  route: string;
  metric: string;
  metricLabel: string;
}

const cases: CaseStudy[] = [
  {
    companyType: 'Furniture Importer',
    industry: 'Furniture',
    route: 'China → UK',
    challenge: 'A growing UK furniture retailer was struggling with inconsistent delivery times from multiple Chinese suppliers. Shipments were arriving 2-3 weeks late, causing stock-outs during peak sales periods and damaging customer relationships.',
    solution: 'We consolidated their supplier pickups in the Guangdong region, implemented a weekly FCL consolidation service, and coordinated factory-to-warehouse logistics with customs clearance included.',
    results: [
      'Reduced average transit time from 42 to 31 days',
      'Eliminated stock-outs during Q4 peak season',
      'Consolidated 6 supplier shipments into 3 weekly containers',
      'Reduced shipping costs by 18% through volume consolidation',
    ],
    metric: '26%',
    metricLabel: 'Faster Delivery',
  },
  {
    companyType: 'E-commerce Seller',
    industry: 'Amazon FBA',
    route: 'China → UK Amazon FBA',
    challenge: 'An Amazon FBA seller was facing repeated rejections at Amazon fulfilment centres due to incorrect labelling and palletisation. Returns were costing over £2,000 per month in extra fees and lost sales.',
    solution: 'We implemented full FBA prep at origin including carton labelling, palletisation to Amazon spec, and pre-shipment photo verification. Direct BHX4 delivery with appointment booking.',
    results: [
      'Zero Amazon rejections in 12 months',
      'Saved £24,000/year in return fees',
      'Improved inventory placement score from 68 to 92',
      'Reduced time from factory to FBA from 35 to 22 days',
    ],
    metric: '£24K',
    metricLabel: 'Annual Savings',
  },
  {
    companyType: 'Automotive Parts Distributor',
    industry: 'Automotive',
    route: 'Germany & China → UK',
    challenge: 'An automotive parts distributor needed just-in-time delivery to support UK manufacturing clients. Delays of even one day caused production line stoppages costing thousands per hour.',
    solution: 'We set up a scheduled weekly road freight service from Germany (3-day transit) and air-sea hybrid from China for critical components. Real-time GPS tracking and proactive delay alerts included.',
    results: [
      '99.2% on-time delivery rate achieved',
      'Zero production line stoppages due to logistics',
      'Reduced safety stock requirement by 40%',
      'Full end-to-end visibility via our tracking portal',
    ],
    metric: '99.2%',
    metricLabel: 'On-Time Rate',
  },
  {
    companyType: 'Construction Materials Supplier',
    industry: 'Construction',
    route: 'Turkey & India → UK',
    challenge: 'A construction materials supplier was importing tiles, fixtures and fittings from Turkey and India. They faced unpredictable duty calculations and delays at UK customs due to incomplete documentation.',
    solution: 'We took over customs clearance with pre-submission document review, ensured correct commodity codes were used, and negotiated favourable payment terms with key mills for consolidated ordering.',
    results: [
      'Customs clearance time reduced from 5 days to under 24 hours',
      'Identified 12% duty overpayment on 3 product lines',
      'Streamlined documentation reducing admin by 60%',
      'Improved cash flow with 30-day credit terms',
    ],
    metric: '60%',
    metricLabel: 'Less Admin Time',
  },
];

export default function CaseStudies() {
  return (
    <>
      <Seo
        title="Case Studies | Carrgo Freight Solutions"
        description="Success stories from UK importers using Carrgo freight services. See real results for furniture, e-commerce, automotive and construction."
      />

      {/* Hero */}
      <section aria-label="Case studies hero" className="relative bg-brand-800 py-20 lg:py-28">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        </div>
        <div className="container-carrgo relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-brand-100 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <BarChart3 className="w-4 h-4" />
              Results
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Case Studies
            </h1>
            <p className="text-lg text-brand-100 leading-relaxed max-w-2xl mx-auto">
              Real results for real UK businesses. See how we have helped importers across industries streamline their supply chains and cut costs.
            </p>
          </div>
        </div>
      </section>

      {/* Case Study Cards */}
      <section aria-label="Case study cards" className="py-16 lg:py-20 bg-white">
        <div className="container-carrgo">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {cases.map((c) => (
              <article
                key={c.companyType}
                className="bg-white rounded-xl border hover:shadow-lg transition-shadow p-8 flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="inline-block bg-brand-50 text-brand-700 text-xs font-semibold px-2.5 py-1 rounded-full mb-2">
                      {c.route}
                    </span>
                    <h2 className="text-xl font-bold text-gray-900">{c.companyType}</h2>
                    <p className="text-sm text-gray-500">{c.industry}</p>
                  </div>
                  <div className="text-center bg-brand-800 text-white rounded-lg px-3 py-2 flex-shrink-0">
                    <div className="text-lg font-bold">{c.metric}</div>
                    <div className="text-[10px] uppercase tracking-wide opacity-90">{c.metricLabel}</div>
                  </div>
                </div>

                <div className="space-y-4 flex-1">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4 text-red-500" />
                      Challenge
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{c.challenge}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4 text-brand-700" />
                      Solution
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{c.solution}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Results</h3>
                    <ul className="space-y-1.5">
                      {c.results.map((r, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
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
              Ready for Similar Results?
            </h2>
            <p className="text-gray-600 mb-8">
              Every business is different. Tell us about your supply chain challenges and we will build a solution tailored to you.
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
