import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import {
  TrendingDown, TrendingUp, Clock, Users, PoundSterling,
  ArrowRight, CheckCircle, Quote, BarChart3, Package, Shield
} from 'lucide-react';

/* ── JSON-LD Structured Data ── */
const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Carrgo Freight Solutions Ltd',
  url: 'https://carrgo.co.uk',
  logo: 'https://carrgo.co.uk/favicon.ico',
  description: 'Proven results for UK importers — Carrgo delivers measurable improvements in freight efficiency, customs clearance success, and cost savings.',
  email: 'info@carrgo.co.uk',
  };

/* ── Data ── */
const metrics = [
  { icon: TrendingDown, value: '40%', label: 'Average Delay Reduction', desc: 'For clients switching from other forwarders to Carrgo.' },
  { icon: CheckCircle, value: '99.2%', label: 'Customs Success Rate', desc: 'First-submission clearance rate across all UK ports.' },
  { icon: Users, value: '94%', label: 'Client Retention', desc: 'Annual client retention rate — our clients stay with us.' },
  { icon: Clock, value: '1h 42m', label: 'Average Response Time', desc: 'Quote response time during UK business hours.' },
  { icon: PoundSterling, value: '22%', label: 'Average Cost Savings', desc: 'Freight cost reduction for clients switching to Carrgo.' },
  { icon: TrendingUp, value: '£18k/yr', label: 'Max Cost Savings', desc: 'Highest annual cost savings for a single client.' },
];

const caseStudies = [
  {
    icon: Package,
    industry: 'Furniture Import from China',
    client: 'Whitfield Imports Ltd',
    challenge: '40% of shipments delayed at Felixstowe due to incorrect customs documentation, costing £18,000 annually in detention and storage charges.',
    solution: 'Implemented proactive customs documentation review with pre-submission checks and direct liaison with customs authorities. Assigned dedicated account manager for all shipments.',
    result: '40% reduction in delays. £18,000 annual cost savings. 100% first-submission clearance achieved within 3 months.',
    quote: 'No more surprise holds at Felixstowe. Carrgo handles the paperwork before the container even arrives. That proactive approach has transformed our cash flow.',
    author: 'James Whitfield',
    role: 'Managing Director',
  },
  {
    icon: BarChart3,
    industry: 'E-commerce Retail',
    client: 'Brightline Retail Group',
    challenge: 'Previous forwarder provided poor communication and consistently missed delivery deadlines, leading to stockouts during peak sales periods.',
    solution: 'Assigned dedicated account manager with real-time tracking dashboard. Implemented proactive shipment milestone notifications and buffer planning for peak seasons.',
    result: '100% on-time delivery rate achieved. Complete visibility across the supply chain. Zero stockouts during Q4 peak period.',
    quote: 'The transparency — it is a completely different level. I know exactly where every shipment is, and my account manager anticipates problems before they happen.',
    author: 'Sarah Onwukwe',
    role: 'Supply Chain Director',
  },
  {
    icon: Shield,
    industry: 'Electronics — Amazon FBA',
    client: 'TechSource UK',
    challenge: 'FBA shipments consistently arrived late at Amazon fulfilment centres, resulting in inventory shortfalls and lost sales during critical selling periods.',
    solution: 'End-to-end FBA freight management including FBA prep, labelling, palletisation, and direct delivery scheduling with Amazon. Proactive booking system for delivery appointments.',
    result: 'On-time delivery to Amazon every single time. Inventory planning accuracy improved dramatically. No more missed sales due to stock unavailability.',
    quote: 'Carrgo handles everything from collecting in Shenzhen to delivering at BHX4. I do not have to worry about labels, pallet specs, or appointment bookings anymore.',
    author: 'Marcus Chen',
    role: 'Founder & CEO',
  },
];

const clientLogos = [
  'Whitfield Imports',
  'Brightline Retail',
  'TechSource UK',
  'Apex Construction',
  'EuroParts Direct',
  'Bloom Boutique',
];

export default function Results() {
  return (
    <>
      <Seo
        title="Our Results | Carrgo — Proven Freight Results for UK Importers"
        description="See real results from Carrgo clients — 40% delay reduction, 99.2% customs success rate, 22% cost savings, and £18,000 cost savings. Read case studies from UK importers."
        structuredData={orgSchema}
      />

      <main>
        {/* ====== HERO ====== */}
        <section aria-labelledby="results-hero-heading" className="bg-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-[#EFF6FF] to-transparent pointer-events-none" />
          <div className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-block text-xs font-semibold tracking-widest text-[#1A6DFF] uppercase mb-4">Our Results</span>
              <h1 id="results-hero-heading" className="text-4xl lg:text-5xl font-extrabold text-[#111827] leading-tight mb-6">
                Proven Results for UK Importers
              </h1>
              <p className="text-lg text-[#4B5563] leading-relaxed mb-8">
                Real numbers, real clients, real results. See the measurable impact Carrgo has made for UK businesses importing goods from around the world. From reducing delays by 40% to saving clients thousands in storage charges, our track record speaks for itself.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/get-a-quote"
                  className="inline-flex items-center gap-2 bg-[#1A6DFF] hover:bg-[#1557CC] text-white px-6 py-3 rounded-lg font-semibold transition-colors min-h-[44px]"
                >
                  Get Your Quote <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-white text-[#1A6DFF] border-2 border-[#1A6DFF] px-6 py-3 rounded-lg font-semibold hover:bg-[#EBF2FF] transition-colors min-h-[44px]"
                >
                  Speak to Our Team
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ====== KEY METRICS ====== */}
        <section aria-label="Key performance metrics" className="bg-[#EFF6FF] py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
              {metrics.map((m, i) => {
                const Icon = m.icon;
                return (
                  <article key={i} className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-6 text-center hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-[#EBF2FF] rounded-full flex items-center justify-center mx-auto mb-3">
                      <Icon className="w-6 h-6 text-[#1A6DFF]" aria-hidden="true" />
                    </div>
                    <div className="text-3xl lg:text-4xl font-extrabold text-[#1A6DFF] mb-1">{m.value}</div>
                    <h3 className="font-bold text-[#111827] mb-1">{m.label}</h3>
                    <p className="text-sm text-[#4B5563]">{m.desc}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ====== CASE STUDIES ====== */}
        <section aria-labelledby="case-studies-heading" className="bg-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 id="case-studies-heading" className="text-3xl lg:text-4xl font-extrabold text-[#111827] mb-3">
                Client Success Stories
              </h2>
              <p className="text-[#4B5563] max-w-2xl mx-auto">
                Real-world examples of how Carrgo has helped UK businesses overcome their freight challenges and achieve measurable improvements.
              </p>
            </div>

            <div className="space-y-8">
              {caseStudies.map((cs, i) => {
                const Icon = cs.icon;
                return (
                  <article key={i} className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <div className="grid lg:grid-cols-3 gap-0">
                      {/* Left — Info */}
                      <div className="bg-[#F8FAFC] p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-[#E5E7EB]">
                        <div className="w-12 h-12 bg-[#EBF2FF] rounded-lg flex items-center justify-center mb-4">
                          <Icon className="w-6 h-6 text-[#1A6DFF]" aria-hidden="true" />
                        </div>
                        <span className="inline-block text-xs font-semibold tracking-wider text-[#1A6DFF] uppercase mb-2">{cs.industry}</span>
                        <h3 className="text-xl font-bold text-[#111827] mb-4">{cs.client}</h3>
                        <div className="space-y-3">
                          <div>
                            <h4 className="text-sm font-semibold text-[#DC2626] uppercase tracking-wide">Challenge</h4>
                            <p className="text-sm text-[#4B5563] mt-1">{cs.challenge}</p>
                          </div>
                        </div>
                      </div>

                      {/* Middle — Solution & Result */}
                      <div className="p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-[#E5E7EB]">
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-[#1A6DFF] uppercase tracking-wide mb-2">Our Solution</h4>
                          <p className="text-[#4B5563] text-sm leading-relaxed">{cs.solution}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-[#16A34A] uppercase tracking-wide mb-2">Results</h4>
                          <p className="text-[#111827] font-medium text-sm leading-relaxed">{cs.result}</p>
                        </div>
                      </div>

                      {/* Right — Quote */}
                      <div className="p-6 lg:p-8 bg-[#F8FAFC]">
                        <Quote className="w-8 h-8 text-[#1A6DFF] mb-3 opacity-50" aria-hidden="true" />
                        <blockquote className="text-[#4B5563] italic leading-relaxed mb-4">
                          &ldquo;{cs.quote}&rdquo;
                        </blockquote>
                        <footer>
                          <cite className="not-italic">
                            <span className="font-semibold text-[#111827] block">{cs.author}</span>
                            <span className="text-sm text-[#4B5563]">{cs.role}, {cs.client}</span>
                          </cite>
                        </footer>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ====== CLIENT LOGOS ====== */}
        <section aria-label="Trusted by leading UK companies" className="bg-[#F8FAFC] py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="inline-block text-xs font-semibold tracking-widest text-[#1A6DFF] uppercase mb-3">Trusted By</span>
              <h2 className="text-3xl font-extrabold text-[#111827]">Companies That Trust Carrgo</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {clientLogos.map((name, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-6 flex items-center justify-center h-24 hover:shadow-md transition-shadow"
                >
                  <span className="text-[#9CA3AF] font-semibold text-sm text-center">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* ====== CTA BANNER ====== */}
        <section aria-label="Get started" className="py-16 md:py-24 bg-[#1A6DFF] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-extrabold mb-4">
              Ready to Improve Your Freight Results?
            </h2>
            <p className="text-[#D4E3FF] text-lg mb-8 max-w-2xl mx-auto">
              Join the hundreds of UK importers who have reduced costs, eliminated delays, and gained complete visibility over their supply chain with Carrgo.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/get-a-quote"
                className="inline-flex items-center gap-2 bg-white text-[#1A6DFF] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors min-h-[44px]"
              >
                Get Your Quote <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-[#1557CC] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#1149AD] transition-colors min-h-[44px]"
              >
                Speak to Our Team
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
