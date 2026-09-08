import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, FileSearch, ListChecks, ShieldCheck } from 'lucide-react';
import Seo from '../../components/Seo';

const steps = [
  'Describe the goods in plain English, including material, use, and how they are supplied.',
  'Search the GOV.UK Trade Tariff for the closest heading and subheading.',
  'Check duty rate, VAT treatment, licence requirements, and any origin-specific rules.',
  'Keep supplier evidence with the commercial invoice and packing list before shipping.',
];

const commonMistakes = [
  'Using a supplier code without checking it against the UK Trade Tariff.',
  'Choosing a broad code that misses material, product use, or technical specification.',
  'Forgetting that the same product can have different duty treatment by origin country.',
  'Submitting customs paperwork before the invoice, packing list, and code agree.',
];

export default function CommodityCodes() {
  return (
    <>
      <Seo
        title="How to Find a Commodity Code for UK Imports | HS Code Guide | Carrgo"
        description="Find the right commodity code or HS code for UK imports. Learn how codes affect duty, VAT, licences and customs delays, with Carrgo support for freight quotes."
        keywords="commodity code, HS code UK, trade tariff, import classification, customs commodity code, UK import duty code"
        ogUrl="https://www.carrgo.co.uk/guides/commodity-codes"
        canonical="https://www.carrgo.co.uk/guides/commodity-codes"
        structuredData={[
          {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'How to Find a Commodity Code for UK Imports',
            description: 'Find the right commodity code or HS code for UK imports and understand how it affects duty, VAT, licences and customs clearance.',
            author: { '@type': 'Organization', name: 'Carrgo Freight Solutions' },
            publisher: { '@type': 'Organization', name: 'Carrgo Freight Solutions', url: 'https://www.carrgo.co.uk' },
            mainEntityOfPage: 'https://www.carrgo.co.uk/guides/commodity-codes',
          },
        ]}
      />

      <main id="main-content">
        <section className="bg-gradient-to-br from-[#0f4db5] to-[#1A6DFF] text-white py-16 lg:py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-200">UK Import Guide</span>
            <h1 className="mt-3 text-4xl lg:text-5xl font-extrabold leading-tight">
              How to Find a Commodity Code for UK Imports
            </h1>
            <p className="mt-6 text-lg text-blue-100 leading-relaxed max-w-3xl">
              A commodity code, also called an HS code, tells HMRC what your goods are, which duty rate applies, whether import VAT is due, and whether licences or checks are needed before release.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/get-a-quote" className="inline-flex items-center gap-2 bg-white text-[#1A6DFF] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors min-h-[44px]">
                Get Customs Help <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link to="/services/customs-clearance" className="inline-flex items-center gap-2 bg-[#1A6DFF] border border-white/30 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors min-h-[44px]">
                Customs Clearance
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-3 gap-8">
            <article className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-gray-900">How do I find the right commodity code?</h2>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Start with a precise product description, then search the official UK Trade Tariff by product type, material, use, and technical details. The right code should match the goods being shipped, the commercial invoice, and the supplier paperwork.
              </p>
              <ol className="mt-8 space-y-4">
                {steps.map((step, index) => (
                  <li key={step} className="flex gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1A6DFF] text-sm font-bold text-white">{index + 1}</span>
                    <span className="text-gray-700 leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </article>

            <aside className="bg-[#F8FAFC] border border-gray-200 rounded-lg p-6">
              <FileSearch className="w-10 h-10 text-[#1A6DFF]" aria-hidden="true" />
              <h2 className="mt-4 text-xl font-bold text-gray-900">Why the code matters</h2>
              <p className="mt-3 text-gray-600 leading-relaxed">
                The wrong code can cause duty underpayment, overpayment, customs delays, port storage, inspections, or penalties. Carrgo checks commodity code readiness before shipping so customs paperwork is less likely to hold the cargo.
              </p>
            </aside>
          </div>
        </section>

        <section className="py-16 bg-[#F8FAFC]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center gap-3">
                <ListChecks className="w-8 h-8 text-[#1A6DFF]" aria-hidden="true" />
                <h2 className="text-2xl font-bold text-gray-900">Common mistakes to avoid</h2>
              </div>
              <ul className="mt-6 space-y-3">
                {commonMistakes.map((item) => (
                  <li key={item} className="flex gap-3 text-gray-700">
                    <CheckCircle className="mt-0.5 w-5 h-5 shrink-0 text-green-600" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-[#1A6DFF]" aria-hidden="true" />
                <h2 className="text-2xl font-bold text-gray-900">What Carrgo checks</h2>
              </div>
              <p className="mt-6 text-gray-600 leading-relaxed">
                Carrgo reviews the product description, origin country, Incoterm, invoice value, packing list, and route before preparing customs clearance. That gives importers a clearer landed-cost estimate and reduces avoidable questions at the border.
              </p>
              <p className="mt-4 text-gray-600 leading-relaxed">
                For live tariff classification decisions, use the official UK Trade Tariff or ask HMRC for a ruling. For freight planning and customs-readiness support, send Carrgo the shipment details and we will flag the information needed before booking.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#1A6DFF] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold">Need a freight quote with customs checked?</h2>
            <p className="mt-4 text-blue-100 leading-relaxed">
              Send your origin, destination, product description, dimensions, weight, and invoice value. Carrgo will review the freight route and customs information before quoting.
            </p>
            <Link to="/get-a-quote" className="mt-8 inline-flex items-center gap-2 bg-white text-[#1A6DFF] px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors min-h-[44px]">
              Request a Quote <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
