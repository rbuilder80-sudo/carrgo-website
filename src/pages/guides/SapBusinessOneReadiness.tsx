import { Link } from 'react-router-dom';
import Seo from '../../components/Seo';
import { ArrowRight, CheckCircle } from 'lucide-react';

/* ── JSON-LD Structured Data ── */
const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Import Duty & Landed Cost Readiness for SAP Business One',
  url: 'https://carrgo.co.uk/sap-business-one-import-duty-landed-cost-readiness',
  description:
    'SAP Business One runs your purchasing — but if HS codes, Incoterms and freight costs aren\u2019t captured cleanly, your landed cost is wrong. Carrgo reviews your import data readiness.',
  publisher: {
    '@type': 'Organization',
    name: 'Carrgo Freight Solutions Ltd',
    url: 'https://carrgo.co.uk',
  },
};

const checks = [
  'Item master HS-code coverage',
  'Supplier origin data',
  'Incoterms',
  'Freight & insurance capture',
  'Broker fee lines',
  'VAT/duty estimate handling',
  'Port-of-arrival consistency',
];

export default function SapBusinessOneReadiness() {
  return (
    <>
      <Seo
        title="Import Duty & Landed Cost for SAP Business One | Carrgo"
        description="SAP Business One runs your purchasing — but missing HS codes and Incoterms break landed cost. Carrgo reviews your import data readiness and flags gaps."
        keywords="sap business one import duty, sap b1 landed cost, uk landed cost readiness, sap business one customs data, uk import duty review"
        ogUrl="https://carrgo.co.uk/sap-business-one-import-duty-landed-cost-readiness"
        canonical="https://carrgo.co.uk/sap-business-one-import-duty-landed-cost-readiness"
        structuredData={pageSchema}
      />

      <main id="main-content" role="main">
        {/* ====== HERO ====== */}
        <section aria-labelledby="hero-heading" className="bg-white border-b border-[#E5E7EB]">
          <div className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="max-w-3xl">
              <span className="inline-block text-xs font-semibold tracking-widest text-[#1A6DFF] uppercase mb-4">Landed-Cost Readiness</span>
              <h1 id="hero-heading" className="text-4xl lg:text-5xl font-extrabold text-[#111827] leading-tight mb-4">
                Import Duty &amp; Landed Cost Readiness for SAP Business One
              </h1>
              <p className="text-lg text-[#4B5563] leading-relaxed">
                SAP Business One runs your purchasing — but if HS codes, Incoterms and freight costs aren&apos;t captured cleanly, your landed cost is wrong before the goods leave the supplier. Carrgo reviews your import data readiness and flags the customs and landed-cost gaps that hurt margin.
              </p>
            </div>
          </div>
        </section>

        {/* ====== WHAT WE CHECK ====== */}
        <section aria-labelledby="checks-heading" className="bg-[#F8FAFC] py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-8 lg:p-10">
              <h2 id="checks-heading" className="text-2xl font-bold text-[#111827] mb-6">What we check</h2>
              <ul className="grid sm:grid-cols-2 gap-3 mb-10">
                {checks.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 bg-[#F8FAFC] rounded-lg border border-[#E5E7EB] px-4 py-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-[#EBF2FF] text-[#1A6DFF] rounded-full flex items-center justify-center text-sm font-bold">{i + 1}</span>
                    <span className="text-[#4B5563] font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-[#9CA3AF] border-t border-[#E5E7EB] pt-6">
                Guidance only, not legal/tax advice; rates verified on GOV.UK Trade Tariff.
              </p>
            </div>
          </div>
        </section>

        {/* ====== CTA BANNER ====== */}
        <section aria-label="Readiness review" className="py-16 bg-[#1A6DFF] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-extrabold mb-4">Flag the Gaps Before Your Goods Ship</h2>
            <p className="text-[#D4E3FF] text-lg mb-8">
              Request a Carrgo readiness review.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/get-a-quote"
                className="inline-flex items-center gap-2 bg-white text-[#1A6DFF] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors min-h-[44px]"
              >
                Get a Quote <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Link>
              <Link
                to="/services/customs-clearance"
                className="inline-flex items-center gap-2 bg-[#1557CC] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#1149AD] transition-colors min-h-[44px]"
              >
                Customs Clearance
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
