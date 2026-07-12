import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import {
  ArrowRight, BookOpen, Truck, FileText, Calendar,
  CreditCard, Shield, FileCheck, Gavel
} from 'lucide-react';

/* ── JSON-LD Structured Data ── */
const legalSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Terms of Service — Carrgo Freight Solutions Ltd',
  url: 'https://carrgo.co.uk/terms',
  description: 'Terms and conditions for Carrgo Freight Solutions Ltd freight forwarding services.',
  publisher: {
    '@type': 'Organization',
    name: 'Carrgo Freight Solutions Ltd',
    url: 'https://carrgo.co.uk',
  },
};

/* ── Navigation sections ── */
const sections = [
  { id: 'definitions', label: 'Definitions', icon: BookOpen },
  { id: 'our-services', label: 'Our Services', icon: Truck },
  { id: 'quotes-pricing', label: 'Quotes and Pricing', icon: FileText },
  { id: 'booking-cancellation', label: 'Booking and Cancellation', icon: Calendar },
  { id: 'payment-terms', label: 'Payment Terms', icon: CreditCard },
  { id: 'liability-insurance', label: 'Liability and Insurance', icon: Shield },
  { id: 'customs-compliance', label: 'Customs and Compliance', icon: FileCheck },
  { id: 'disputes', label: 'Disputes and Governing Law', icon: Gavel },
];

export default function Terms() {
  return (
    <>
      <Seo
        title="Terms of Service | Carrgo Freight Solutions Ltd"
        description="Terms and conditions for Carrgo Freight Solutions Ltd freight forwarding services. Read about our booking, payment, liability, and cancellation policies."
        noindex={true}
        structuredData={legalSchema}
      />

      <main>
        {/* ====== HERO ====== */}
        <section aria-labelledby="terms-hero-heading" className="bg-white border-b border-[#E5E7EB]">
          <div className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="max-w-3xl">
              <span className="inline-block text-xs font-semibold tracking-widest text-[#1A6DFF] uppercase mb-4">Legal</span>
              <h1 id="terms-hero-heading" className="text-4xl lg:text-5xl font-extrabold text-[#111827] leading-tight mb-4">
                Terms of Service
              </h1>
              <p className="text-lg text-[#4B5563]">
                Last updated: January 2026. These terms govern your use of Carrgo Freight Solutions Ltd&apos;s services and website. Please read them carefully before booking our services.
              </p>
            </div>
          </div>
        </section>

        {/* ====== TERMS CONTENT ====== */}
        <section className="bg-[#F8FAFC] py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Sidebar Navigation */}
              <nav aria-label="Terms of service sections" className="hidden lg:block">
                <div className="sticky top-24 bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-5">
                  <h2 className="text-sm font-bold text-[#111827] uppercase tracking-wide mb-4">On This Page</h2>
                  <ul className="space-y-1">
                    {sections.map((s) => {
                      const Icon = s.icon;
                      return (
                        <li key={s.id}>
                          <a
                            href={`#${s.id}`}
                            className="flex items-center gap-2 text-sm text-[#4B5563] hover:text-[#1A6DFF] py-1.5 px-2 rounded-md hover:bg-[#EBF2FF] transition-colors"
                          >
                            <Icon className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                            {s.label}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </nav>

              {/* Main Content */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-8 lg:p-10">

                  {/* 1. Definitions */}
                  <section id="definitions" className="mb-12 scroll-mt-24">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-[#EBF2FF] rounded-lg flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-[#1A6DFF]" aria-hidden="true" />
                      </div>
                      <h2 className="text-2xl font-bold text-[#111827]">1. Definitions</h2>
                    </div>
                    <div className="text-[#4B5563] leading-relaxed space-y-4">
                      <p>In these terms and conditions, unless the context requires otherwise, the following definitions apply:</p>
                      <ul className="space-y-3 ml-4">
                        <li className="flex gap-2">
                          <span className="text-[#1A6DFF] font-bold">&bull;</span>
                          <span><strong className="text-[#111827]">&ldquo;We&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;, &ldquo;Carrgo&rdquo;:</strong> Carrgo Freight Solutions Ltd, a company registered in England and Wales with its registered office at Suite 12, International Trade Centre, London, EC2A 4BX.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-[#1A6DFF] font-bold">&bull;</span>
                          <span><strong className="text-[#111827]">&ldquo;You&rdquo;, &ldquo;your&rdquo;, &ldquo;the Client&rdquo;:</strong> The person, company, or organisation booking our freight forwarding services.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-[#1A6DFF] font-bold">&bull;</span>
                          <span><strong className="text-[#111827]">&ldquo;Goods&rdquo;:</strong> The cargo, merchandise, commodities, or property being shipped or transported.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-[#1A6DFF] font-bold">&bull;</span>
                          <span><strong className="text-[#111827]">&ldquo;Services&rdquo;:</strong> All freight forwarding, customs clearance, warehousing, and related logistics services provided by Carrgo.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-[#1A6DFF] font-bold">&bull;</span>
                          <span><strong className="text-[#111827]">&ldquo;Quote&rdquo;:</strong> The written estimate of charges for the Services provided to you.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-[#1A6DFF] font-bold">&bull;</span>
                          <span><strong className="text-[#111827]">&ldquo;Carrier&rdquo;:</strong> The shipping line, airline, road haulier, rail operator, or other transport provider engaged to carry the Goods.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-[#1A6DFF] font-bold">&bull;</span>
                          <span><strong className="text-[#111827]">&ldquo;Incoterms&rdquo;:</strong> The internationally recognised rules published by the International Chamber of Commerce that define the responsibilities of buyers and sellers in international trade.</span>
                        </li>
                      </ul>
                    </div>
                  </section>

                  {/* 2. Our Services */}
                  <section id="our-services" className="mb-12 scroll-mt-24">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-[#EBF2FF] rounded-lg flex items-center justify-center">
                        <Truck className="w-5 h-5 text-[#1A6DFF]" aria-hidden="true" />
                      </div>
                      <h2 className="text-2xl font-bold text-[#111827]">2. Our Services</h2>
                    </div>
                    <div className="text-[#4B5563] leading-relaxed space-y-4">
                      <p>
                        Carrgo Freight Solutions Ltd provides freight forwarding services including sea freight (FCL and LCL), air freight, road freight, rail freight, customs clearance, warehousing, and related logistics services. All services are provided subject to these terms and conditions.
                      </p>
                      <p>
                        We act as a freight forwarder and not as a common carrier. This means we arrange the carriage of goods on your behalf with third-party carriers. We reserve the right to refuse to handle any shipment at our sole discretion, including but not limited to dangerous goods, prohibited items, or shipments that do not comply with applicable laws and regulations.
                      </p>
                      <p>
                        While we make every reasonable effort to ensure timely delivery, transit times provided in quotes or communications are estimates only and are not guaranteed unless expressly stated otherwise in writing. Actual transit times may vary due to weather conditions, port congestion, customs delays, carrier schedule changes, or other circumstances beyond our control.
                      </p>
                      <p>
                        We may subcontract any part of the Services to third-party providers, including carriers, warehousing facilities, and customs brokers. All subcontractors are carefully selected and bound by contractual obligations to maintain the standards of service expected by Carrgo.
                      </p>
                    </div>
                  </section>

                  {/* 3. Quotes and Pricing */}
                  <section id="quotes-pricing" className="mb-12 scroll-mt-24">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-[#EBF2FF] rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-[#1A6DFF]" aria-hidden="true" />
                      </div>
                      <h2 className="text-2xl font-bold text-[#111827]">3. Quotes and Pricing</h2>
                    </div>
                    <div className="text-[#4B5563] leading-relaxed space-y-4">
                      <ul className="space-y-3 ml-4">
                        <li className="flex gap-2">
                          <span className="text-[#1A6DFF] font-bold">&bull;</span>
                          <span>All quotes are valid for 30 days from the date of issue unless otherwise stated in writing. After 30 days, the quote expires and a new quote may be required.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-[#1A6DFF] font-bold">&bull;</span>
                          <span>All quotes are estimates based on the information provided by you at the time of quotation. We rely on the accuracy of the information you provide.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-[#1A6DFF] font-bold">&bull;</span>
                          <span>Final charges may vary if the cargo details differ from the quoted specifications, including but not limited to weight, dimensions, commodity type, or origin/destination changes.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-[#1A6DFF] font-bold">&bull;</span>
                          <span>Additional charges may apply for customs inspections (both physical and documentary), additional storage, detention charges at ports, special handling requirements, or any other costs arising from circumstances beyond our reasonable control.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-[#1A6DFF] font-bold">&bull;</span>
                          <span>Fuel surcharges (Bunker Adjustment Factor for sea freight, Fuel Surcharge for air freight) may be applied in line with carrier adjustments. We will notify you of any applicable fuel surcharge at the time of quotation.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-[#1A6DFF] font-bold">&bull;</span>
                          <span>Currency fluctuations may affect pricing for international shipments. Quotes are typically provided in GBP but may be subject to exchange rate adjustments for certain trade lanes.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-[#1A6DFF] font-bold">&bull;</span>
                          <span>VAT at the prevailing UK rate will be added to all charges where applicable, unless you provide a valid VAT exemption certificate.</span>
                        </li>
                      </ul>
                    </div>
                  </section>

                  {/* 4. Booking and Cancellation */}
                  <section id="booking-cancellation" className="mb-12 scroll-mt-24">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-[#EBF2FF] rounded-lg flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-[#1A6DFF]" aria-hidden="true" />
                      </div>
                      <h2 className="text-2xl font-bold text-[#111827]">4. Booking and Cancellation</h2>
                    </div>
                    <div className="text-[#4B5563] leading-relaxed space-y-4">
                      <ul className="space-y-3 ml-4">
                        <li className="flex gap-2">
                          <span className="text-[#1A6DFF] font-bold">&bull;</span>
                          <span>A booking is confirmed only upon your written acceptance of our quote and our written confirmation of the booking. Verbal bookings or instructions will not be accepted as confirmed bookings.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-[#1A6DFF] font-bold">&bull;</span>
                          <span>Cancellations made 7 or more days before the scheduled collection date will receive a full refund of any prepaid charges.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-[#1A6DFF] font-bold">&bull;</span>
                          <span>Cancellations made between 3 and 7 days before the scheduled collection date will receive a 50% refund of any prepaid charges. The remaining 50% covers costs already incurred by Carrgo.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-[#1A6DFF] font-bold">&bull;</span>
                          <span>Cancellations made less than 3 days before the scheduled collection date are non-refundable, as carrier space and resources will have been committed.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-[#1A6DFF] font-bold">&bull;</span>
                          <span>Changes to booking details (origin, destination, cargo details, collection date) may incur additional charges. We will notify you of any additional charges before processing the changes.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-[#1A6DFF] font-bold">&bull;</span>
                          <span>We reserve the right to cancel or postpone a booking if the goods do not match the description provided, if documentation is incomplete or inaccurate, or if the goods cannot be lawfully transported.</span>
                        </li>
                      </ul>
                    </div>
                  </section>

                  {/* 5. Payment Terms */}
                  <section id="payment-terms" className="mb-12 scroll-mt-24">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-[#EBF2FF] rounded-lg flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-[#1A6DFF]" aria-hidden="true" />
                      </div>
                      <h2 className="text-2xl font-bold text-[#111827]">5. Payment Terms</h2>
                    </div>
                    <div className="text-[#4B5563] leading-relaxed space-y-4">
                      <ul className="space-y-3 ml-4">
                        <li className="flex gap-2">
                          <span className="text-[#1A6DFF] font-bold">&bull;</span>
                          <span><strong className="text-[#111827]">New clients:</strong> Payment in full is required before shipment unless a credit account has been explicitly agreed in writing by Carrgo. Goods will not be released until payment is received and cleared.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-[#1A6DFF] font-bold">&bull;</span>
                          <span><strong className="text-[#111827]">Credit account clients:</strong> Payment is due 30 days from the invoice date unless otherwise agreed in writing. Credit accounts are subject to satisfactory credit checks and may be reviewed periodically.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-[#1A6DFF] font-bold">&bull;</span>
                          <span><strong className="text-[#111827]">Late payment:</strong> A service charge of 2% per month (or part thereof) will be applied to all overdue amounts, calculated from the due date until payment is received. We also reserve the right to suspend services for accounts with overdue balances exceeding 60 days.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-[#1A6DFF] font-bold">&bull;</span>
                          <span><strong className="text-[#111827]">Payment methods:</strong> We accept BACS bank transfer, direct debit (for credit account holders), and debit/credit card payments. We do not accept cash payments.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-[#1A6DFF] font-bold">&bull;</span>
                          <span><strong className="text-[#111827]">Disputed invoices:</strong> If you dispute any charge on an invoice, you must notify us in writing within 14 days of the invoice date, specifying the reason for the dispute. Undisputed portions of the invoice must be paid in full by the due date.</span>
                        </li>
                      </ul>
                    </div>
                  </section>

                  {/* 6. Liability and Insurance */}
                  <section id="liability-insurance" className="mb-12 scroll-mt-24">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-[#EBF2FF] rounded-lg flex items-center justify-center">
                        <Shield className="w-5 h-5 text-[#1A6DFF]" aria-hidden="true" />
                      </div>
                      <h2 className="text-2xl font-bold text-[#111827]">6. Liability and Insurance</h2>
                    </div>
                    <div className="text-[#4B5563] leading-relaxed space-y-4">
                      <ul className="space-y-3 ml-4">
                        <li className="flex gap-2">
                          <span className="text-[#1A6DFF] font-bold">&bull;</span>
                          <span>Our liability for loss of or damage to goods is limited in accordance with the applicable international convention governing the mode of transport used: CMR Convention for road freight, Hague-Visby Rules for sea freight, Montreal Convention for air freight, or COTIF-CIM for rail freight.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-[#1A6DFF] font-bold">&bull;</span>
                          <span>Under these conventions, our liability may be limited by weight or package, and certain exclusions may apply. We strongly recommend that all clients arrange adequate cargo insurance to cover the full value of their goods.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-[#1A6DFF] font-bold">&bull;</span>
                          <span>We can arrange cargo insurance on your behalf through our insurance partners. This is an optional service and will be quoted separately. Please request cargo insurance at the time of booking if required.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-[#1A6DFF] font-bold">&bull;</span>
                          <span>We are not liable for delays caused by circumstances beyond our reasonable control, including but not limited to: adverse weather conditions, port congestion, strikes or industrial action, customs inspections, war, terrorism, pandemic, or government restrictions.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-[#1A6DFF] font-bold">&bull;</span>
                          <span>We are not liable for indirect or consequential losses, including but not limited to loss of profits, loss of market, loss of business opportunity, or reputational damage, even if advised of the possibility of such losses.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-[#1A6DFF] font-bold">&bull;</span>
                          <span>Any claim for loss or damage must be notified to us in writing within 7 days of delivery (or the date delivery should have occurred). Claims must include supporting documentation including photographs, commercial invoices, and packing lists.</span>
                        </li>
                      </ul>
                    </div>
                  </section>

                  {/* 7. Customs and Compliance */}
                  <section id="customs-compliance" className="mb-12 scroll-mt-24">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-[#EBF2FF] rounded-lg flex items-center justify-center">
                        <FileCheck className="w-5 h-5 text-[#1A6DFF]" aria-hidden="true" />
                      </div>
                      <h2 className="text-2xl font-bold text-[#111827]">7. Customs and Compliance</h2>
                    </div>
                    <div className="text-[#4B5563] leading-relaxed space-y-4">
                      <ul className="space-y-3 ml-4">
                        <li className="flex gap-2">
                          <span className="text-[#1A6DFF] font-bold">&bull;</span>
                          <span>You are responsible for ensuring that all information provided for customs declarations is accurate, complete, and truthful. This includes correct commodity codes (HS codes), accurate valuations, and proper descriptions of goods.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-[#1A6DFF] font-bold">&bull;</span>
                          <span>You must provide all necessary documentation and information required for customs clearance in a timely manner. Delays caused by late or incomplete documentation are your responsibility.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-[#1A6DFF] font-bold">&bull;</span>
                          <span>You must hold all necessary licences, permits, and authorisations required for the import or export of your goods. We are not responsible for verifying the sufficiency of your licences or permits.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-[#1A6DFF] font-bold">&bull;</span>
                          <span>We are not liable for customs penalties, fines, seizure of goods, or any other sanctions arising from incorrect information provided by you, or from your failure to comply with customs requirements.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-[#1A6DFF] font-bold">&bull;</span>
                          <span>Our customs accreditation applies to our customs brokerage services only. It does not guarantee the outcome of any customs declaration or inspection, nor does it exempt you from your obligations as the importer or exporter.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-[#1A6DFF] font-bold">&bull;</span>
                          <span>You must ensure that your goods comply with all applicable UK and EU regulations, including product safety standards, labelling requirements, and restrictions on prohibited or controlled goods.</span>
                        </li>
                      </ul>
                    </div>
                  </section>

                  {/* 8. Disputes and Governing Law */}
                  <section id="disputes" className="scroll-mt-24">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-[#EBF2FF] rounded-lg flex items-center justify-center">
                        <Gavel className="w-5 h-5 text-[#1A6DFF]" aria-hidden="true" />
                      </div>
                      <h2 className="text-2xl font-bold text-[#111827]">8. Disputes and Governing Law</h2>
                    </div>
                    <div className="text-[#4B5563] leading-relaxed space-y-4">
                      <ul className="space-y-3 ml-4">
                        <li className="flex gap-2">
                          <span className="text-[#1A6DFF] font-bold">&bull;</span>
                          <span>These terms and conditions are governed by and construed in accordance with the laws of England and Wales.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-[#1A6DFF] font-bold">&bull;</span>
                          <span>In the event of any dispute arising from or relating to these terms or our Services, both parties agree to first attempt to resolve the dispute through good-faith negotiation.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-[#1A6DFF] font-bold">&bull;</span>
                          <span>If the dispute cannot be resolved through negotiation within 30 days, either party may refer the dispute to mediation through recognised industry mediation services.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-[#1A6DFF] font-bold">&bull;</span>
                          <span>If mediation is unsuccessful or not pursued, the dispute shall be subject to the exclusive jurisdiction of the courts of England and Wales.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-[#1A6DFF] font-bold">&bull;</span>
                          <span>Nothing in these terms shall prevent either party from seeking injunctive relief or any other urgent legal remedy from the courts where necessary to protect their rights.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-[#1A6DFF] font-bold">&bull;</span>
                          <span>If any provision of these terms is found to be invalid or unenforceable by a court of competent jurisdiction, the remaining provisions shall continue in full force and effect.</span>
                        </li>
                      </ul>
                      <p className="text-sm text-[#9CA3AF] mt-6">
                        These terms and conditions were last updated on 1 January 2026. We may update these terms from time to time and will post any changes on this page. Your continued use of our Services after any changes constitutes acceptance of the updated terms. We encourage you to review these terms periodically.
                      </p>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====== CTA BANNER ====== */}
        <section aria-label="Get started" className="py-16 bg-[#1A6DFF] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-extrabold mb-4">Ready to Ship With Carrgo?</h2>
            <p className="text-[#D4E3FF] text-lg mb-8">
              Get your all-inclusive freight quote in 2 hours. No hidden fees, no obligation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/get-a-quote"
                className="inline-flex items-center gap-2 bg-white text-[#1A6DFF] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors min-h-[44px]"
              >
                Get a Free Quote <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Link>
              <Link
                to="/privacy"
                className="inline-flex items-center gap-2 bg-[#1557CC] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#1149AD] transition-colors min-h-[44px]"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
