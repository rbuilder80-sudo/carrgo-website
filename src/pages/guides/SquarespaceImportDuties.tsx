import { Link } from 'react-router-dom';
import Seo from '../../components/Seo';
import { ArrowRight, CheckCircle } from 'lucide-react';

/* ── JSON-LD Structured Data ── */
const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Squarespace Import Duties, DDP and Tariff Workarounds for UK Sellers',
  url: 'https://carrgo.co.uk/squarespace-import-duties-ddp-tariff-uk-sellers',
  description:
    'Squarespace handles your storefront — it doesn\u2019t clear UK customs for you. Guide to import duties, DDP/DDU choices and HS codes for UK Squarespace sellers.',
  publisher: {
    '@type': 'Organization',
    name: 'Carrgo Freight Solutions Ltd',
    url: 'https://carrgo.co.uk',
  },
};

const supports = [
  'Shipping zones and rates per zone — you can add a handling/shipping fee per zone, but Squarespace does not calculate or collect UK import duty for your customers at checkout.',
  'Product-level pricing notes: use product descriptions to state "price excludes import duties" where you ship DDU.',
  'Tax settings cover VAT configuration basics — they do not classify your goods or produce commodity codes.',
];

const ddpDdu = [
  'DDU (delivered duty unpaid): your customer pays duty + VAT + courier handling fee on arrival. Common cause of refused parcels and bad reviews.',
  'DDP (delivered duty paid): you pay duty upfront via your carrier. Smoother delivery, but you must know the duty rate — which needs the right HS code.',
  'Rule of thumb: low-value one-off orders can survive DDU; repeat customers and brand experience usually justify DDP via a carrier\u2019s DDP service.',
];

const hsPrep = [
  'Every product needs a 6–10 digit commodity code. Find it on the official GOV.UK Trade Tariff (gov.uk/trade-tariff).',
  'Keep a spreadsheet: SKU → description → HS code → country of origin → duty rate checked (date).',
  'Wrong code = wrong duty, delays, or seizure. When unsure, ask a customs professional.',
];

const origin = [
  'Origin = where the goods were made/substantially processed, not the warehouse they left. Getting this wrong changes the duty rate and can void preferential tariffs.',
];

const workarounds = [
  'Build a landed-cost buffer into product pricing for DDU lanes and disclose it clearly.',
  'Use a per-zone handling fee to recover carrier disbursement fees.',
  'Hold UK stock for your top 20% SKUs (bulk import once, fulfil domestically — no per-order customs).',
  'For orders over the £135 VAT threshold, prepare the customer for import charges or move to DDP.',
];

const expert = [
  'Regular shipments, duty bills you don\u2019t recognise, goods stuck at a UK port, or scaling beyond ~50 international orders/month.',
];

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3 ml-4">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2">
          <span className="text-[#1A6DFF] font-bold">&bull;</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function SquarespaceImportDuties() {
  return (
    <>
      <Seo
        title="Squarespace Import Duties & DDP for UK Sellers | Carrgo"
        description="Squarespace doesn't clear UK customs for you. Learn how import duties, DDP/DDU choices and HS codes work for UK sellers — plus the practical workarounds."
        keywords="squarespace import duties uk, squarespace ddp ddu, uk import duty squarespace, hs codes squarespace, uk customs ecommerce sellers"
        ogUrl="https://carrgo.co.uk/squarespace-import-duties-ddp-tariff-uk-sellers"
        canonical="https://carrgo.co.uk/squarespace-import-duties-ddp-tariff-uk-sellers"
        structuredData={pageSchema}
      />

      <main id="main-content" role="main">
        {/* ====== HERO ====== */}
        <section aria-labelledby="hero-heading" className="bg-white border-b border-[#E5E7EB]">
          <div className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="max-w-3xl">
              <span className="inline-block text-xs font-semibold tracking-widest text-[#1A6DFF] uppercase mb-4">Import Guide</span>
              <h1 id="hero-heading" className="text-4xl lg:text-5xl font-extrabold text-[#111827] leading-tight mb-4">
                Squarespace Import Duties, DDP and Tariff Workarounds for UK Sellers
              </h1>
              <p className="text-lg text-[#4B5563] leading-relaxed">
                Squarespace handles your storefront — it doesn&apos;t clear UK customs for you. If you ship internationally into the UK (or dropship from overseas suppliers), duties, DDP/DDU choices and HS codes are on you. This guide covers what Squarespace can and can&apos;t do, and the practical workarounds.
              </p>
            </div>
          </div>
        </section>

        {/* ====== GUIDE CONTENT ====== */}
        <section className="bg-[#F8FAFC] py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-8 lg:p-10">

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-[#111827] mb-4">What Squarespace actually supports</h2>
                <div className="text-[#4B5563] leading-relaxed">
                  <BulletList items={supports} />
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-[#111827] mb-4">DDP vs DDU in plain English</h2>
                <div className="text-[#4B5563] leading-relaxed">
                  <BulletList items={ddpDdu} />
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-[#111827] mb-4">HS code preparation (the bit everyone skips)</h2>
                <div className="text-[#4B5563] leading-relaxed">
                  <ul className="space-y-3 ml-4">
                    <li className="flex gap-2">
                      <span className="text-[#1A6DFF] font-bold">&bull;</span>
                      <span>
                        Every product needs a 6–10 digit commodity code. Find it on the official{' '}
                        <a href="https://www.gov.uk/trade-tariff" target="_blank" rel="noopener noreferrer" className="text-[#1A6DFF] hover:underline">
                          GOV.UK Trade Tariff (gov.uk/trade-tariff)
                        </a>.
                      </span>
                    </li>
                    {hsPrep.slice(1).map((item, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-[#1A6DFF] font-bold">&bull;</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-[#111827] mb-4">Country of origin — not where it shipped from</h2>
                <div className="text-[#4B5563] leading-relaxed">
                  <BulletList items={origin} />
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-[#111827] mb-4">Practical workarounds Squarespace sellers use</h2>
                <div className="text-[#4B5563] leading-relaxed">
                  <ol className="space-y-3 ml-4">
                    {workarounds.map((item, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-[#EBF2FF] text-[#1A6DFF] rounded-full flex items-center justify-center text-sm font-bold">{i + 1}</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-[#111827] mb-4">When to speak to a customs/freight expert</h2>
                <div className="text-[#4B5563] leading-relaxed">
                  <BulletList items={expert} />
                </div>
              </section>

              <p className="text-sm text-[#9CA3AF] border-t border-[#E5E7EB] pt-6">
                Disclaimer: guidance only, not legal or tax advice; verify rates on GOV.UK Trade Tariff.
              </p>
            </div>
          </div>
        </section>

        {/* ====== CTA BANNER ====== */}
        <section aria-label="Import-duty risk check" className="py-16 bg-[#1A6DFF] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-extrabold mb-4">Check Your Import-Duty Risk Before You Ship</h2>
            <p className="text-[#D4E3FF] text-lg mb-8">
              Send Carrgo your Squarespace export and we&apos;ll check import-duty risk before you ship.
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
                <CheckCircle className="w-5 h-5" aria-hidden="true" /> Get a Quote
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
