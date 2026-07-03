import { Link } from 'react-router-dom';
import Seo from '../../components/Seo';
import {
  ArrowRight, AlertTriangle, Info, CheckCircle, FileCheck, ScanSearch,
  Receipt, PoundSterling, AlertCircle, ClipboardList
} from 'lucide-react';

function InfoBox({ children, title, icon }: { children: React.ReactNode; title: string; icon: React.ReactNode }) {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <h3 className="font-semibold text-blue-900">{title}</h3>
      </div>
      <div className="text-blue-800 text-sm leading-relaxed">{children}</div>
    </div>
  );
}

function WarningBox({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="w-5 h-5 text-amber-700" />
        <h3 className="font-semibold text-amber-900">{title}</h3>
      </div>
      <div className="text-amber-800 text-sm leading-relaxed">{children}</div>
    </div>
  );
}

export default function PostBrexit() {
  return (
    <>
      <Seo
        title="Post-Brexit Customs Guide | Carrgo Freight Solutions"
        description="Navigating UK customs after Brexit. Essential guidance for importers on EORI numbers, commodity codes, customs declarations, VAT and duties."
      />

      {/* Hero */}
      <section aria-label="Post-Brexit guide hero" className="relative bg-brand-800 py-20 lg:py-28">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        </div>
        <div className="container-carrgo relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-brand-100 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <FileCheck className="w-4 h-4" />
              Essential Guide
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Post-Brexit Customs Guide
            </h1>
            <p className="text-lg text-brand-100 leading-relaxed max-w-2xl">
              Everything UK importers need to know about customs since Brexit. From EORI numbers to commodity codes and declarations.
            </p>
          </div>
        </div>
      </section>

      {/* What Changed */}
      <section aria-label="What changed after Brexit" className="py-16 bg-white">
        <div className="container-carrgo">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-brand-700" />
              What Changed After Brexit?
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 leading-relaxed mb-4">
                Since the UK left the European Union on 31 January 2020, the way goods move between the EU and UK has changed fundamentally. The UK is now treated as a third country for customs purposes, meaning all goods crossing the UK-EU border require customs declarations.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mt-6">
                <article className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Customs Declarations Required</h3>
                  <p className="text-sm text-gray-600">All goods imported into the UK from the EU now require a full customs declaration. The previous temporary waiver periods have ended.</p>
                </article>
                <article className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Rules of Origin</h3>
                  <p className="text-sm text-gray-600">Goods qualifying under the UK-EU Trade and Cooperation Agreement may benefit from zero tariffs if correct proof of origin is provided.</p>
                </article>
                <article className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">UKCA Marking</h3>
                  <p className="text-sm text-gray-600">The UKCA (UK Conformity Assessed) mark replaces the CE mark for goods placed on the UK market in most cases.</p>
                </article>
                <article className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">EORI Number Required</h3>
                  <p className="text-sm text-gray-600">All UK businesses importing goods must have a UK EORI number starting with GB. EU EORI numbers are no longer sufficient for UK imports.</p>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EORI Numbers */}
      <section aria-label="EORI numbers" className="py-16 bg-gray-50">
        <div className="container-carrgo">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <ClipboardList className="w-6 h-6 text-brand-700" />
              EORI Numbers
            </h2>
            <div className="bg-white rounded-xl border p-6">
              <p className="text-gray-600 leading-relaxed mb-4">
                An EORI (Economic Operators Registration and Identification) number is a unique identifier required for all businesses moving goods between the UK and any other country, including the EU.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>UK EORI numbers start with GB followed by 12 digits (e.g., GB123456789000)</span>
                </li>
                <li className="flex items-start gap-3 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Apply free on the UK government website — takes 3-5 working days</span>
                </li>
                <li className="flex items-start gap-3 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>You also need an XI EORI if moving goods to or from Northern Ireland</span>
                </li>
              </ul>
              <InfoBox title="Tip" icon={<Info className="w-5 h-5 text-blue-700" />}>
                If you are VAT registered, HMRC may have already assigned you an EORI number. Check your VAT registration documents or contact HMRC to confirm before applying for a new one.
              </InfoBox>
            </div>
          </div>
        </div>
      </section>

      {/* Commodity Codes */}
      <section aria-label="Commodity codes" className="py-16 bg-white">
        <div className="container-carrgo">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <ScanSearch className="w-6 h-6 text-brand-700" />
              Commodity Codes (HS Codes)
            </h2>
            <div className="bg-white rounded-xl border p-6">
              <p className="text-gray-600 leading-relaxed mb-4">
                Every product imported into the UK must be classified with a commodity code (also called an HS code or tariff code). This 8-digit number determines the rate of duty, VAT, and any import restrictions that apply to your goods.
              </p>
              <div className="grid sm:grid-cols-3 gap-4 mb-6">
                <article className="bg-brand-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-brand-800 mb-1">94.03</div>
                  <p className="text-xs text-gray-600">Wooden furniture</p>
                </article>
                <article className="bg-brand-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-brand-800 mb-1">61.09</div>
                  <p className="text-xs text-gray-600">T-shirts, knitted</p>
                </article>
                <article className="bg-brand-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-brand-800 mb-1">85.44</div>
                  <p className="text-xs text-gray-600">Insulated wiring/cables</p>
                </article>
              </div>
              <WarningBox title="Common Mistake">
                Using the wrong commodity code can result in overpaying duty, shipment delays, penalties, or seizure of goods. Always double-check your codes using the UK Trade Tariff tool on GOV.UK.
              </WarningBox>
            </div>
          </div>
        </div>
      </section>

      {/* Customs Declarations */}
      <section aria-label="Customs declarations" className="py-16 bg-gray-50">
        <div className="container-carrgo">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Receipt className="w-6 h-6 text-brand-700" />
              Customs Declarations
            </h2>
            <div className="bg-white rounded-xl border p-6">
              <p className="text-gray-600 leading-relaxed mb-4">
                A customs declaration is the official document submitted to HMRC declaring the details of your imported goods. All UK imports now require a declaration through either CHIEF (being phased out) or the new Customs Declaration Service (CDS).
              </p>
              <h3 className="font-semibold text-gray-900 mb-3">Required Documents</h3>
              <ul className="space-y-2 mb-6">
                {[
                  'Commercial Invoice — shows value, description and seller/buyer details',
                  'Packing List — itemises contents of each package with weights and dimensions',
                  'Bill of Lading (sea) or Airway Bill (air) — contract of carriage and receipt',
                  'Certificate of Origin — required for preferential tariff claims',
                  'Import Licence — required for controlled goods (certain foods, textiles, etc.)',
                ].map((doc, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <FileCheck className="w-4 h-4 text-brand-700 flex-shrink-0 mt-0.5" />
                    {doc}
                  </li>
                ))}
              </ul>
              <InfoBox title="Carrgo Can Help" icon={<CheckCircle className="w-5 h-5 text-blue-700" />}>
                Our customs brokers handle declarations on your behalf through our direct CDS filing access. We ensure accuracy and compliance, with a high first-submission acceptance rate.
              </InfoBox>
            </div>
          </div>
        </div>
      </section>

      {/* VAT & Duties */}
      <section aria-label="VAT and duties" className="py-16 bg-white">
        <div className="container-carrgo">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <PoundSterling className="w-6 h-6 text-brand-700" />
              VAT & Import Duties
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <article className="bg-white rounded-xl border p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Import Duty</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Duty rates vary by commodity code and country of origin. The UK Global Tariff applies standard rates, but preferential rates under trade agreements may reduce or eliminate duty.
                </p>
                <p className="text-sm text-gray-600">
                  Duty is calculated on the CIF value (cost of goods + insurance + freight).
                </p>
              </article>
              <article className="bg-white rounded-xl border p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Import VAT</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Most imports attract 20% VAT calculated on the total value including goods value, duty, shipping and insurance.
                </p>
                <p className="text-sm text-gray-600">
                  VAT-registered businesses can reclaim import VAT on their VAT return using the C79 certificate.
                </p>
              </article>
              <article className="bg-white rounded-xl border p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Postponed VAT Accounting</h3>
                <p className="text-sm text-gray-600">
                  VAT-registered businesses can use Postponed VAT Accounting (PVA) to declare and recover import VAT on the same VAT return, rather than paying it upfront at the border. This improves cash flow significantly.
                </p>
              </article>
              <article className="bg-white rounded-xl border p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Deferred Duty</h3>
                <p className="text-sm text-gray-600">
                  Businesses can set up a Duty Deferment Account (DDA) to delay paying customs charges until the 15th of the following month. A bank guarantee may be required depending on your deferment limit.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* Common Mistakes */}
      <section aria-label="Common mistakes" className="py-16 bg-gray-50">
        <div className="container-carrgo">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-amber-600" />
              Common Mistakes to Avoid
            </h2>
            <div className="space-y-4">
              {[
                {
                  title: 'Incorrect commodity codes',
                  desc: 'Using the wrong HS code is the most common cause of overpaid duty, delays and penalties. Always verify using the UK Trade Tariff.',
                },
                {
                  title: 'Undervaluing goods',
                  desc: 'Declaring a lower value than the actual transaction price is customs fraud. HMRC routinely checks valuations and can issue substantial penalties.',
                },
                {
                  title: 'Missing EORI number',
                  desc: 'Shipments without a valid UK EORI number will be held at the border until one is provided, causing expensive demurrage charges.',
                },
                {
                  title: 'Incomplete documentation',
                  desc: 'Missing commercial invoices, packing lists or certificates of origin will delay clearance. Ensure your supplier provides complete, accurate paperwork.',
                },
                {
                  title: 'Forgetting about VAT',
                  desc: 'Many new importers budget for duty and shipping but forget the 20% import VAT. Use PVA or factor this into your cash flow planning.',
                },
              ].map((m) => (
                <article key={m.title} className="bg-white rounded-lg border border-amber-200 p-5 flex gap-4">
                  <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{m.title}</h3>
                    <p className="text-sm text-gray-600">{m.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How Carrgo Helps */}
      <section aria-label="How Carrgo helps" className="py-16 bg-white">
        <div className="container-carrgo">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-600" />
              How Carrgo Helps
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: <FileCheck className="w-6 h-6" />,
                  title: 'Customs Clearance',
                  desc: 'Full import and export declarations filed through our direct CHIEF and CDS access.',
                },
                {
                  icon: <ScanSearch className="w-6 h-6" />,
                  title: 'Commodity Code Verification',
                  desc: 'We check your HS codes for accuracy and optimal duty rates.',
                },
                {
                  icon: <ClipboardList className="w-6 h-6" />,
                  title: 'Document Preparation',
                  desc: 'We prepare and review all required documentation before submission.',
                },
                {
                  icon: <PoundSterling className="w-6 h-6" />,
                  title: 'Duty & VAT Calculation',
                  desc: 'All-inclusive quotes with accurate duty, VAT and disbursement calculations.',
                },
                {
                  icon: <Receipt className="w-6 h-6" />,
                  title: 'Postponed VAT Advice',
                  desc: 'We advise on PVA eligibility and help you manage cash flow.',
                },
                {
                  icon: <CheckCircle className="w-6 h-6" />,
                  title: 'Compliance Support',
                  desc: 'Ongoing guidance to keep your imports compliant with evolving regulations.',
                },
              ].map((item) => (
                <article key={item.title} className="bg-brand-50 rounded-xl p-6">
                  <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-brand-700 mb-3">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section aria-label="Get a quote" className="py-16 lg:py-20 bg-gray-50">
        <div className="container-carrgo">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Navigating Customs Made Simple
            </h2>
            <p className="text-gray-600 mb-8">
              Let our customs experts handle the complexity. Get compliant, stress-free imports with Carrgo.
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
