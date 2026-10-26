import { useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../../components/Seo';
import {
  ArrowRight, BookOpen, Calculator, CheckCircle, ChevronDown,
  ClipboardList, FileCheck, Info, Package, Plane, Ship, Truck,
} from 'lucide-react';

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'UK Customs Clearance Support',
  serviceType: 'Customs clearance coordination',
  provider: {
    '@type': 'Organization',
    name: 'CARRGO FREIGHT LTD',
    url: 'https://www.carrgo.co.uk/',
  },
  areaServed: { '@type': 'Country', name: 'United Kingdom' },
  description: 'Customs-clearance support for UK imports and exports, including document review, declaration coordination, tariff checks and release planning.',
  url: 'https://www.carrgo.co.uk/services/customs-clearance/',
};

const faqData = [
  {
    q: 'What information is needed for a UK customs-clearance quote?',
    a: 'Provide the route, importer or exporter details, EORI number where required, commercial invoice, packing list, transport document, goods description, country of origin, Incoterm and any known commodity code or licence requirement. Carrgo can identify missing information before the declaration scope is confirmed.',
  },
  {
    q: 'Can I appoint someone to deal with customs for me?',
    a: 'Yes. GOV.UK explains that a customs agent, freight forwarder or other intermediary can be appointed. The appointment and type of representation must be agreed, and the trader must provide accurate shipment and authorisation details.',
  },
  {
    q: 'How are commodity codes, duty and VAT checked?',
    a: 'The UK Trade Tariff is used to identify commodity codes and the measures, duty and VAT rates linked to the goods. The result depends on the product description, origin, customs value and any relief or preference that can be evidenced.',
  },
  {
    q: 'Can import VAT be accounted for on a VAT Return?',
    a: 'Eligible VAT-registered businesses may use postponed VAT accounting. Whether it applies depends on the importer and declaration, so the intended payment method should be confirmed before submission.',
  },
  {
    q: 'Does customs clearance guarantee immediate release?',
    a: 'No. A correctly prepared declaration does not control an HMRC, Border Force, port or terminal intervention. Release timing can also depend on document availability, payment, licences, inspections and the carrier or terminal process.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqData.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

function FaqAccordion() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return <div className="space-y-3">
    {faqData.map((faq, index) => <div key={faq.q} className="overflow-hidden rounded-lg border border-gray-200">
      <button type="button" className="flex w-full items-center justify-between p-4 text-left font-medium text-gray-900 hover:bg-gray-50" onClick={() => setOpenIdx(openIdx === index ? null : index)} aria-expanded={openIdx === index} aria-controls={`customs-faq-${index}`}>
        <span>{faq.q}</span>
        <ChevronDown className={`h-5 w-5 flex-shrink-0 text-gray-500 transition-transform ${openIdx === index ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>
      {openIdx === index && <div id={`customs-faq-${index}`} className="px-4 pb-4 leading-relaxed text-gray-600">{faq.a}</div>}
    </div>)}
  </div>;
}

export default function CustomsClearance() {
  const checklist = [
    ['Importer or exporter', 'Legal name, address, EORI where required and the party responsible for the declaration.'],
    ['Goods', 'Plain-language description, intended use, material or composition, quantity and any known commodity code.'],
    ['Value and origin', 'Commercial invoice, currency, Incoterm, freight elements, country of origin and preference evidence where claimed.'],
    ['Transport', 'Packing list, transport document, route, port or terminal and expected arrival or departure details.'],
    ['Controls', 'Any licences, certificates, sanitary or product-specific requirements known to apply.'],
    ['Payment', 'How duty, import VAT and other charges will be paid or accounted for, including PVA where eligible.'],
  ];

  return <>
    <Seo title="Customs Clearance UK | Import & Export Support | Carrgo" description="UK customs-clearance support for imports and exports: document review, CDS declaration coordination, commodity-code checks, duty and VAT planning, and port release." keywords="customs clearance uk, customs declaration support, import customs clearance, export customs declaration, cds declaration, commodity code checks" ogUrl="https://www.carrgo.co.uk/services/customs-clearance/" canonical="https://www.carrgo.co.uk/services/customs-clearance/" structuredData={[serviceSchema, faqSchema]} />
    <main id="main-content">
      <section aria-labelledby="customs-heading" className="bg-gradient-to-br from-[#EFF6FF] to-white py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-[#1A6DFF]">Customs clearance</p>
            <h1 id="customs-heading" className="mt-3 text-3xl font-extrabold leading-tight text-[#111827] lg:text-5xl">UK Customs Clearance for Imports and Exports</h1>
            <p className="mt-6 text-lg leading-relaxed text-[#4B5563]">Carrgo coordinates the information, documents and declaration scope needed for a UK import or export movement. The service can sit alongside sea, air or road freight, or support a customs-only enquiry where the transport details are already known.</p>
            <ul className="mt-7 space-y-3 text-[#4B5563]">
              {['Import and export declaration coordination', 'Commercial-document and shipment-data checks', 'Commodity-code and UK Trade Tariff review', 'Duty, VAT and release-method questions identified before submission'].map(item => <li key={item} className="flex gap-3"><CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" aria-hidden="true" /><span>{item}</span></li>)}
            </ul>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/get-a-quote" className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-[#1A6DFF] px-6 py-3 font-semibold text-white hover:bg-[#1557CC]">Request a customs-clearance quote <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
              <Link to="/resources/post-brexit-customs-guide" className="inline-flex min-h-11 items-center rounded-lg border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50">Read the customs guide</Link>
            </div>
          </div>
          <aside className="rounded-2xl border border-blue-100 bg-white p-7 shadow-lg" aria-label="Customs scope note">
            <Info className="h-9 w-9 text-[#1A6DFF]" aria-hidden="true" />
            <h2 className="mt-4 text-2xl font-bold text-gray-900">What this page does not promise</h2>
            <p className="mt-3 leading-relaxed text-gray-600">No customs provider can guarantee a particular duty outcome, inspection decision or release time without the complete facts and the authorities’ decision. Carrgo confirms the proposed scope, assumptions, representation route and exclusions against the shipment information supplied.</p>
          </aside>
        </div>
      </section>

      <section aria-labelledby="scope-heading" className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#1A6DFF]">Service scope</p>
            <h2 id="scope-heading" className="mt-3 text-3xl font-bold text-gray-900">What Carrgo can coordinate</h2>
            <p className="mt-4 text-lg text-gray-600">The final scope depends on the route, goods, importer or exporter, Incoterm and declaration type. These are the main workstreams to confirm.</p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: FileCheck, title: 'Declaration preparation', body: 'Collect the required shipment data and coordinate the import or export declaration route and supporting records.' },
              { icon: BookOpen, title: 'Tariff and commodity checks', body: 'Review the supplied goods description against the UK Trade Tariff and flag where more technical product detail is needed.' },
              { icon: Calculator, title: 'Duty and VAT planning', body: 'Identify the customs value, origin evidence and intended payment method needed to estimate or account for charges.' },
              { icon: ClipboardList, title: 'Document readiness', body: 'Check the commercial invoice, packing list, transport document and available licences or certificates before submission.' },
              { icon: Package, title: 'Release coordination', body: 'Align the declaration reference and release steps with the carrier, port, terminal or delivery plan for the booked movement.' },
              { icon: Info, title: 'Exceptions and limitations', body: 'Explain outstanding information, third-party dependencies and items outside the quoted customs-clearance scope.' },
            ].map(({ icon: Icon, title, body }) => <article key={title} className="rounded-xl border border-gray-200 p-6"><Icon className="h-9 w-9 text-[#1A6DFF]" aria-hidden="true" /><h3 className="mt-4 text-lg font-bold text-gray-900">{title}</h3><p className="mt-2 leading-relaxed text-gray-600">{body}</p></article>)}
          </div>
        </div>
      </section>

      <section aria-labelledby="checklist-heading" className="bg-[#F8FAFC] py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="checklist-heading" className="text-3xl font-bold text-gray-900">Customs-clearance information checklist</h2>
          <p className="mt-4 max-w-3xl text-lg text-gray-600">Send what is available. If a field is unknown, mark it as unknown rather than guessing; Carrgo can then identify what must be confirmed before the declaration is prepared.</p>
          <div className="mt-8 overflow-x-auto rounded-xl border border-gray-200 bg-white">
            <table className="w-full min-w-[680px] border-collapse text-left"><caption className="sr-only">Information commonly needed to scope UK customs clearance</caption><thead className="bg-gray-100"><tr><th scope="col" className="px-5 py-4">Area</th><th scope="col" className="px-5 py-4">Information to provide</th></tr></thead><tbody>{checklist.map(([area, detail]) => <tr key={area} className="border-t border-gray-200"><th scope="row" className="px-5 py-4 font-semibold text-gray-900">{area}</th><td className="px-5 py-4 text-gray-600">{detail}</td></tr>)}</tbody></table>
          </div>
          <p className="mt-5 text-sm text-gray-600">The importer or exporter remains responsible for supplying accurate information and retaining the records required for their transaction. Any tariff, origin or tax treatment depends on the facts and supporting evidence.</p>
        </div>
      </section>

      <section aria-labelledby="guidance-heading" className="bg-white py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_.9fr] lg:px-8">
          <div>
            <h2 id="guidance-heading" className="text-3xl font-bold text-gray-900">Official guidance used for this service explanation</h2>
            <p className="mt-4 leading-relaxed text-gray-600">These GOV.UK sources explain the declaration system and the trader’s options. They are linked so an importer can check the underlying rule instead of relying on an unsupported marketing promise.</p>
            <ul className="mt-6 space-y-3">
              <li><a className="font-semibold text-[#1557CC] underline" href="https://www.gov.uk/government/collections/customs-declaration-service">Customs Declaration Service</a></li>
              <li><a className="font-semibold text-[#1557CC] underline" href="https://www.gov.uk/guidance/appoint-someone-to-deal-with-customs-on-your-behalf">Appoint someone to deal with customs</a></li>
              <li><a className="font-semibold text-[#1557CC] underline" href="https://www.gov.uk/trade-tariff">UK Trade Tariff: commodity codes, duty and VAT</a></li>
              <li><a className="font-semibold text-[#1557CC] underline" href="https://www.gov.uk/eori">Get an EORI number</a></li>
              <li><a className="font-semibold text-[#1557CC] underline" href="https://www.gov.uk/guidance/check-when-you-can-account-for-import-vat-on-your-vat-return">Postponed VAT accounting eligibility</a></li>
            </ul>
          </div>
          <aside className="rounded-2xl bg-[#EFF6FF] p-7"><h3 className="text-xl font-bold text-gray-900">Related Carrgo guidance</h3><ul className="mt-5 space-y-3"><li><Link className="font-semibold text-[#1557CC]" to="/guides/commodity-codes">Commodity-code guide →</Link></li><li><Link className="font-semibold text-[#1557CC]" to="/resources/incoterms-guide">Incoterms guide →</Link></li><li><Link className="font-semibold text-[#1557CC]" to="/services/sea-freight">Sea freight and customs scope →</Link></li><li><Link className="font-semibold text-[#1557CC]" to="/services/road-freight">European road freight →</Link></li></ul></aside>
        </div>
      </section>

      <section aria-labelledby="faq-heading" className="bg-[#F8FAFC] py-16 md:py-24"><div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8"><h2 id="faq-heading" className="text-center text-3xl font-bold text-gray-900">Customs-clearance questions</h2><div className="mt-9"><FaqAccordion /></div></div></section>

      <section aria-label="Request a customs-clearance quote" className="bg-[#1A6DFF] py-16 md:py-20"><div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8"><h2 className="text-3xl font-bold text-white">Scope your customs-clearance requirement</h2><p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">Send the origin, destination, goods, approximate weight or volume and available documents. Carrgo will identify the proposed declaration scope and any missing information.</p><Link to="/get-a-quote" className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-lg bg-white px-8 py-4 text-lg font-bold text-[#1A6DFF] hover:bg-gray-100">Request a customs-clearance quote <ArrowRight className="h-5 w-5" aria-hidden="true" /></Link></div></section>

      <section aria-label="Related freight services" className="bg-white py-12"><div className="mx-auto grid max-w-5xl gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4">{[
        { icon: Ship, label: 'Sea freight', to: '/services/sea-freight' },
        { icon: Plane, label: 'Air freight', to: '/services/air-freight' },
        { icon: Truck, label: 'Road freight', to: '/services/road-freight' },
        { icon: Package, label: 'Door-to-door freight', to: '/services/door-to-door' },
      ].map(({ icon: Icon, label, to }) => <Link key={label} to={to} className="flex items-center gap-3 rounded-xl border border-gray-200 p-4 font-semibold text-gray-900 hover:border-blue-300 hover:shadow-sm"><Icon className="h-6 w-6 text-[#1A6DFF]" aria-hidden="true" />{label}</Link>)}</div></section>

      <p className="border-t border-gray-200 bg-gray-50 py-4 text-center text-sm text-gray-500">Content reviewed against the linked GOV.UK guidance on 26 October 2026.</p>
    </main>
  </>;
}
