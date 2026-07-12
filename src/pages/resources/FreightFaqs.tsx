import { useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../../components/Seo';
import { HelpCircle, ArrowRight, ChevronDown, Ship, Plane, FileCheck, MessageCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqCategory {
  name: string;
  icon: React.ReactNode;
  items: FaqItem[];
}

const categories: FaqCategory[] = [
  {
    name: 'Sea Freight',
    icon: <Ship className="w-5 h-5" />,
    items: [
      {
        question: 'How long does sea freight from China to UK take?',
        answer: 'Sea freight from China to UK typically takes 25-35 days port-to-port, or 35-45 days door-to-door depending on the origin city and UK destination port. Peak season (August-October) may add 3-5 days.',
      },
      {
        question: 'What is the difference between FCL and LCL shipping?',
        answer: 'FCL (Full Container Load) means you rent an entire container exclusively for your goods. LCL (Less than Container Load) means your goods share container space with other shipments. FCL is more cost-effective for volumes above 15-20 CBM and offers better security. LCL is ideal for smaller shipments (1-15 CBM).',
      },
      {
        question: 'Which UK port should I use for my shipment?',
        answer: 'Felixstowe is the UK\'s largest container port and ideal for most Far East imports. Southampton is excellent for European and transatlantic routes. London Gateway offers modern facilities with good rail links. Liverpool serves the North and Ireland. We can advise based on your cargo origin and final UK destination.',
      },
      {
        question: 'What documents are needed for sea freight imports?',
        answer: 'Required documents include: Commercial Invoice, Packing List, Bill of Lading (or Sea Waybill), and your UK EORI number. Depending on the goods, you may also need Certificates of Origin, import licences, or health certificates.',
      },
      {
        question: 'Can you ship hazardous cargo by sea?',
        answer: 'Yes, we handle IMO Class hazardous cargo including flammable liquids, batteries, and chemicals. Hazardous shipments require proper classification, packaging, labelling and MSDS documentation. Advance notice is required — contact us for specific guidance.',
      },
    ],
  },
  {
    name: 'Air Freight',
    icon: <Plane className="w-5 h-5" />,
    items: [
      {
        question: 'How is air freight chargeable weight calculated?',
        answer: 'Airlines charge whichever is greater: the actual gross weight or the volumetric weight. Volumetric weight is calculated by dividing the cargo volume (L x W x H in cm) by 6,000. For example, a 100x80x60cm shipment weighing 50kg has a volumetric weight of 80kg — so you would be charged for 80kg.',
      },
      {
        question: 'How quickly can air freight arrive from China?',
        answer: 'Express air freight from China to UK takes 1-3 days door-to-door. Economy air freight takes 4-7 days. Transit times depend on the origin city, flight availability, and UK customs clearance speed.',
      },
      {
        question: 'Are there restrictions on what can be shipped by air?',
        answer: 'Yes, prohibited items include lithium batteries (unless properly declared and packaged), explosives, flammable gases, toxic substances, and certain magnetic materials. Some items require aviation dangerous goods documentation. We can advise on your specific cargo.',
      },
    ],
  },
  {
    name: 'Customs',
    icon: <FileCheck className="w-5 h-5" />,
    items: [
      {
        question: 'What is an EORI number and do I need one?',
        answer: 'An EORI (Economic Operators Registration and Identification) number is mandatory for all UK businesses importing or exporting goods. It starts with GB followed by 12 digits. You can apply free on the UK government website — it typically takes 3-5 working days to receive.',
      },
      {
        question: 'How do I find my commodity code (HS code)?',
        answer: 'Use the UK Trade Tariff tool on GOV.UK to find your commodity code. The code is an 8-digit number classifying your goods for customs duty and VAT purposes. Getting the correct code is essential — wrong codes can lead to overpayment, underpayment penalties, or shipment seizures.',
      },
      {
        question: 'What customs duties will I pay on imports?',
        answer: 'Import duty depends on your commodity code, origin country and any trade agreements. The UK has tariff rates from 0% to over 20%. VAT at 20% is payable on most imports on the total value including shipping and duty. We calculate all costs upfront in our quotes.',
      },
      {
        question: 'Can Carrgo handle customs clearance for me?',
        answer: 'Yes, our experienced customs brokers handle import and export declarations with a high first-submission success rate. We are a direct CHIEF and CDS filer and can clear goods at all UK ports and airports. Customs clearance is included in our door-to-door quotes.',
      },
    ],
  },
  {
    name: 'General',
    icon: <MessageCircle className="w-5 h-5" />,
    items: [
      {
        question: 'How quickly can I get a freight quote?',
        answer: 'We provide all-inclusive freight quotes within 2 hours during UK business hours (Mon-Fri, 9am-6pm). Simply fill out our quote form with your cargo details, origin, destination and preferred transport mode.',
      },
      {
        question: 'Do you ship to Amazon FBA warehouses?',
        answer: 'Yes, we specialise in Amazon FBA freight including FBA prep, labelling, palletisation and delivery to all UK fulfilment centres including BHX4, EMA1, LBA1, GLA1 and others. We ensure compliance with Amazon\'s strict receiving requirements.',
      },
      {
        question: 'What payment terms do you offer?',
        answer: 'For new clients, we require payment before shipping. We accept bank transfer and all major debit/credit cards. For established clients with regular shipments, we offer 30-day credit terms subject to credit checks and trade references.',
      },
      {
        question: 'Do you offer cargo insurance?',
        answer: 'Yes, we offer comprehensive all-risk cargo insurance covering theft, damage, loss and general average. We recommend insurance for all shipments. Premiums are typically 0.15-0.5% of goods value depending on cargo type and route. Claims are handled directly through our team.',
      },
    ],
  },
];

function AccordionItem({ faq, isOpen, onToggle }: { faq: FaqItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between py-4 px-2 text-left hover:bg-gray-50/50 transition-colors rounded-lg"
      >
        <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
        <ChevronDown
          className={`w-5 h-5 text-brand-700 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <div className="pb-4 px-2">
          <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FreightFaqs() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      <Seo
        title="Freight FAQs | Carrgo Freight Solutions"
        description="Answers to common freight forwarding questions about sea freight, air freight, customs clearance, insurance and more."
      />

      {/* Hero */}
      <section aria-label="FAQs hero" className="relative bg-brand-800 py-20 lg:py-28">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        </div>
        <div className="container-carrgo relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-brand-100 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <HelpCircle className="w-4 h-4" />
              Support
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Freight FAQs
            </h1>
            <p className="text-lg text-brand-100 leading-relaxed max-w-2xl mx-auto">
              Find answers to the most common questions about freight forwarding, customs clearance and international shipping.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section aria-label="Frequently asked questions" className="py-16 lg:py-20 bg-white">
        <div className="container-carrgo">
          <div className="max-w-4xl mx-auto">
            {categories.map((category) => (
              <article key={category.name} className="mb-10 last:mb-0">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-9 h-9 rounded-lg bg-brand-50 flex items-center justify-center text-brand-700">
                    {category.icon}
                  </span>
                  {category.name}
                </h2>
                <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100 px-4">
                  {category.items.map((faq, idx) => {
                    const key = `${category.name}-${idx}`;
                    return (
                      <AccordionItem
                        key={key}
                        faq={faq}
                        isOpen={!!openItems[key]}
                        onToggle={() => toggleItem(key)}
                      />
                    );
                  })}
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
              Still Have Questions?
            </h2>
            <p className="text-gray-600 mb-8">
              Our team is happy to help with any specific questions about your shipment.
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
