import { Link } from 'react-router-dom';
import Seo from '../../components/Seo';
import { ArrowRight, CheckCircle } from 'lucide-react';

/* ── JSON-LD Structured Data ── */
const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Import Duty & Landed Cost Readiness for Business Central Users',
  url: 'https://carrgo.co.uk/business-central-import-duty-landed-cost-readiness',
  description:
    'If your purchase invoices live in Dynamics 365 Business Central but your customs data doesn\u2019t, your margins are guessing. Carrgo reviews the nine inputs that decide your UK landed cost.',
  publisher: {
    '@type': 'Organization',
    name: 'Carrgo Freight Solutions Ltd',
    url: 'https://carrgo.co.uk',
  },
};

const inputs = [
  'Supplier country',
  'HS code',
  'Incoterms',
  'Freight',
  'Insurance',
  'Broker fees',
  'VAT',
  'Duty estimate',
  'Port of arrival',
];

const deliverables = [
  'A landed-cost risk summary',
  'A missing-customs-data list',
  'A margin-risk warning where duty or freight assumptions look off',
];

export default function BusinessCentralLandedCost() {
  return (
    <>
      <Seo
        title="Import Duty & Landed Cost for Business Central | Carrgo"
        description="If purchase invoices live in Business Central but customs data doesn't, margins are guessing. Carrgo reviews the nine inputs behind your UK landed cost."
        keywords="business central import duty, dynamics 365 landed cost, uk landed cost readiness, business central customs data, uk import duty review"
        ogUrl="https://carrgo.co.uk/business-central-import-duty-landed-cost-readiness"
        canonical="https://carrgo.co.uk/business-central-import-duty-landed-cost-readiness"
        structuredData={pageSchema}
      />

      <main id="main-content" role="main">
        {/* ====== HERO ====== */}
        <section aria-labelledby="hero-heading" className="bg-white border-b border-[#E5E7EB]">
          <div className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="max-w-3xl">
              <span className="inline-block text-xs font-semibold tracking-widest text-[#1A6DFF] uppercase mb-4">Landed-Cost Readiness</span>
              <h1 id="hero-heading" className="text-4xl lg:text-5xl font-extrabold text-[#111827] leading-tight mb-4">
                Import Duty &amp; Landed Cost Readiness for Business Central Users
              </h1>
              <p className="text-lg text-[#4B5563] leading-relaxed">
                If your purchase invoices live in Dynamics 365 Business Central but your customs data doesn&apos;t, your margins are guessing. Carrgo reviews the nine inputs that decide your UK landed cost — supplier country, HS code, Incoterms, freight, insurance, broker fees, VAT, duty estimate and port of arrival — and tells you what&apos;s missing before your goods ship.
              </p>
            </div>
          </div>
        </section>

        {/* ====== WHAT WE REVIEW ====== */}
        <section aria-labelledby="inputs-heading" className="bg-[#F8FAFC] py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-8 lg:p-10">
              <h2 id="inputs-heading" className="text-2xl font-bold text-[#111827] mb-6">The nine inputs we review</h2>
              <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
                {inputs.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 bg-[#F8FAFC] rounded-lg border border-[#E5E7EB] px-4 py-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-[#EBF2FF] text-[#1A6DFF] rounded-full flex items-center justify-center text-sm font-bold">{i + 1}</span>
                    <span className="text-[#4B5563] font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <h2 className="text-2xl font-bold text-[#111827] mb-4">What you get</h2>
              <ul className="space-y-3 ml-4 text-[#4B5563] leading-relaxed mb-8">
                {deliverables.map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-[#22C55E] flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-[#9CA3AF] border-t border-[#E5E7EB] pt-6">
                Guidance only, not legal/tax advice; duty rates verified on GOV.UK Trade Tariff.
              </p>
            </div>
          </div>
        </section>

        {/* ====== CTA BANNER ====== */}
        <section aria-label="Landed-cost review" className="py-16 bg-[#1A6DFF] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-extrabold mb-4">Know Your Landed Cost Before Your Goods Ship</h2>
            <p className="text-[#D4E3FF] text-lg mb-8">
              Request a Carrgo landed-cost review.
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
