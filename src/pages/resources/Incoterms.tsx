import { Link } from 'react-router-dom';
import Seo from '../../components/Seo';
import { BookOpen, ArrowRight, Ship, Truck } from 'lucide-react';

interface Incoterm {
  code: string;
  fullName: string;
  sellerPays: string;
  riskTransfer: string;
  useFor: string;
}

const seaTerms: Incoterm[] = [
  {
    code: 'FAS',
    fullName: 'Free Alongside Ship',
    sellerPays: 'To port alongside vessel',
    riskTransfer: 'When goods alongside ship',
    useFor: 'Bulk cargo, oversized goods',
  },
  {
    code: 'FOB',
    fullName: 'Free On Board',
    sellerPays: 'To port + loading on vessel',
    riskTransfer: 'When goods pass ship\'s rail',
    useFor: 'Sea freight (most common)',
  },
  {
    code: 'CFR',
    fullName: 'Cost and Freight',
    sellerPays: 'To destination port',
    riskTransfer: 'When goods pass ship\'s rail',
    useFor: 'Sea freight, seller arranges transport',
  },
  {
    code: 'CIF',
    fullName: 'Cost, Insurance & Freight',
    sellerPays: 'To destination port + insurance',
    riskTransfer: 'When goods pass ship\'s rail',
    useFor: 'Sea freight with insurance included',
  },
];

const anyTerms: Incoterm[] = [
  {
    code: 'EXW',
    fullName: 'Ex Works',
    sellerPays: 'Nothing — buyer collects',
    riskTransfer: 'At seller\'s premises',
    useFor: 'Maximum buyer responsibility',
  },
  {
    code: 'FCA',
    fullName: 'Free Carrier',
    sellerPays: 'To named carrier/terminal',
    riskTransfer: 'When handed to carrier',
    useFor: 'Any transport mode, flexible',
  },
  {
    code: 'CPT',
    fullName: 'Carriage Paid To',
    sellerPays: 'To named destination',
    riskTransfer: 'When handed to first carrier',
    useFor: 'Any mode, seller pays freight',
  },
  {
    code: 'CIP',
    fullName: 'Carriage & Insurance Paid To',
    sellerPays: 'To destination + insurance',
    riskTransfer: 'When handed to first carrier',
    useFor: 'Any mode with insurance',
  },
  {
    code: 'DAP',
    fullName: 'Delivered at Place',
    sellerPays: 'To named destination',
    riskTransfer: 'Ready for unloading',
    useFor: 'Door-to-door, buyer clears customs',
  },
  {
    code: 'DPU',
    fullName: 'Delivered at Place Unloaded',
    sellerPays: 'To destination + unloading',
    riskTransfer: 'After unloading',
    useFor: 'Seller unloads at destination',
  },
  {
    code: 'DDP',
    fullName: 'Delivered Duty Paid',
    sellerPays: 'Everything including duties',
    riskTransfer: 'Ready for unloading',
    useFor: 'Maximum seller responsibility',
  },
];

function IncotermsTable({ terms, title, icon }: { terms: Incoterm[]; title: string; icon: React.ReactNode }) {
  return (
    <div className="mb-12">
      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        {icon}
        {title}
      </h2>
      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-sm font-semibold text-gray-700">Incoterm</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-700">Full Name</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-700">Seller Pays</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-700">Risk Transfer</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-700">Use For</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {terms.map((t) => (
              <tr key={t.code} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-4 py-3">
                  <span className="inline-flex items-center justify-center w-12 h-7 bg-brand-800 text-white text-xs font-bold rounded">
                    {t.code}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{t.fullName}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{t.sellerPays}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{t.riskTransfer}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{t.useFor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function Incoterms() {
  return (
    <>
      <Seo
        title="Incoterms Guide | Carrgo Freight Solutions"
        description="Complete guide to EXW, FCA, CPT, CIP, DAP, DPU, DDP, FAS, FOB, CFR, CIF. Understand who pays for what and where risk transfers."
      />

      {/* Hero */}
      <section aria-label="Incoterms guide hero" className="relative bg-brand-800 py-20 lg:py-28">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        </div>
        <div className="container-carrgo relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-brand-100 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4" />
              Reference Guide
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Incoterms Guide
            </h1>
            <p className="text-lg text-brand-100 leading-relaxed max-w-2xl">
              Understand International Commercial Terms. Know exactly who is responsible for costs, insurance and risk at every stage of the shipment journey.
            </p>
          </div>
        </div>
      </section>

      {/* Explanation */}
      <section aria-label="What are Incoterms" className="py-16 bg-white">
        <div className="container-carrgo">
          <div className="max-w-4xl mx-auto">
            <article className="bg-brand-50 rounded-xl p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-3">What Are Incoterms?</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Incoterms (International Commercial Terms) are a set of 11 standardized trade terms published by the International Chamber of Commerce (ICC). They define the responsibilities of buyers and sellers in international transactions — specifying who pays for transport, insurance, duties and where the risk of loss transfers from seller to buyer.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Choosing the right Incoterm affects your total shipping cost, risk exposure and logistical complexity. Our team can advise on the best option for your specific shipment.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Tables */}
      <section aria-label="Incoterms tables" className="py-16 lg:py-20 bg-gray-50">
        <div className="container-carrgo">
          <div className="max-w-6xl mx-auto">
            <IncotermsTable
              terms={seaTerms}
              title="Sea & Inland Waterway Transport"
              icon={<Ship className="w-5 h-5 text-brand-700" />}
            />
            <IncotermsTable
              terms={anyTerms}
              title="Any Transport Mode"
              icon={<Truck className="w-5 h-5 text-brand-700" />}
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section aria-label="Get a quote" className="py-16 lg:py-20 bg-white">
        <div className="container-carrgo">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Need Help Choosing an Incoterm?
            </h2>
            <p className="text-gray-600 mb-8">
              Our freight experts will recommend the best Incoterm based on your supplier location, cargo type and risk preference.
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
