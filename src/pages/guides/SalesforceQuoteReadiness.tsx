import { Link } from 'react-router-dom';
import Seo from '../../components/Seo';
import { ArrowRight, CheckCircle } from 'lucide-react';

/* ── JSON-LD Structured Data ── */
const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Freight Quote Readiness for Salesforce Teams',
  url: 'https://carrgo.co.uk/salesforce-freight-quote-readiness',
  description:
    'Half of freight enquiries can\u2019t be quoted on first touch. Carrgo\u2019s readiness review scores each enquiry on nine fields and hands your reps a missing-data checklist, a customs-risk flag and the next best action.',
  publisher: {
    '@type': 'Organization',
    name: 'Carrgo Freight Solutions Ltd',
    url: 'https://carrgo.co.uk',
  },
};

const fields = [
  'Shipment type',
  'Origin',
  'Destination',
  'Cargo value',
  'Incoterms',
  'HS code',
  'Urgency',
  'Port',
  'Customs status',
];

const deliverables = [
  'A missing-data checklist',
  'A customs-risk flag',
  'The next best action',
];

export default function SalesforceQuoteReadiness() {
  return (
    <>
      <Seo
        title="Freight Quote Readiness for Salesforce Teams | Carrgo"
        description="Half of freight enquiries can't be quoted on first touch. Carrgo scores each Salesforce enquiry on nine fields and hands reps a missing-data checklist."
        keywords="salesforce freight quote, freight quote readiness, uk freight enquiries salesforce, customs risk check, freight forwarder uk"
        ogUrl="https://carrgo.co.uk/salesforce-freight-quote-readiness"
        canonical="https://carrgo.co.uk/salesforce-freight-quote-readiness"
        structuredData={pageSchema}
      />

      <main id="main-content" role="main">
        {/* ====== HERO ====== */}
        <section aria-labelledby="hero-heading" className="bg-white border-b border-[#E5E7EB]">
          <div className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="max-w-3xl">
              <span className="inline-block text-xs font-semibold tracking-widest text-[#1A6DFF] uppercase mb-4">Quote Readiness</span>
              <h1 id="hero-heading" className="text-4xl lg:text-5xl font-extrabold text-[#111827] leading-tight mb-4">
                Freight Quote Readiness for Salesforce Teams
              </h1>
              <p className="text-lg text-[#4B5563] leading-relaxed">
                Half of freight enquiries can&apos;t be quoted on first touch — no HS code, vague origin, missing Incoterms. Carrgo&apos;s readiness review scores each enquiry on nine fields — shipment type, origin, destination, cargo value, Incoterms, HS code, urgency, port and customs status — and hands your reps a missing-data checklist, a customs-risk flag and the next best action.
              </p>
            </div>
          </div>
        </section>

        {/* ====== WHAT WE SCORE ====== */}
        <section aria-labelledby="fields-heading" className="bg-[#F8FAFC] py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-8 lg:p-10">
              <h2 id="fields-heading" className="text-2xl font-bold text-[#111827] mb-6">The nine fields we score</h2>
              <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
                {fields.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 bg-[#F8FAFC] rounded-lg border border-[#E5E7EB] px-4 py-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-[#EBF2FF] text-[#1A6DFF] rounded-full flex items-center justify-center text-sm font-bold">{i + 1}</span>
                    <span className="text-[#4B5563] font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <h2 className="text-2xl font-bold text-[#111827] mb-4">What your reps get</h2>
              <ul className="space-y-3 ml-4 text-[#4B5563] leading-relaxed mb-8">
                {deliverables.map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-[#22C55E] flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-[#9CA3AF] border-t border-[#E5E7EB] pt-6">
                Guidance only, not legal/tax advice.
              </p>
            </div>
          </div>
        </section>

        {/* ====== CTA BANNER ====== */}
        <section aria-label="Quote readiness review" className="py-16 bg-[#1A6DFF] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-extrabold mb-4">Score Your Enquiries for Quote Readiness</h2>
            <p className="text-[#D4E3FF] text-lg mb-8">
              Send us an enquiry export and we&apos;ll score it for quote readiness.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-white text-[#1A6DFF] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors min-h-[44px]"
              >
                Contact Us <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Link>
              <Link
                to="/get-a-quote"
                className="inline-flex items-center gap-2 bg-[#1557CC] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#1149AD] transition-colors min-h-[44px]"
              >
                Get a Quote
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
