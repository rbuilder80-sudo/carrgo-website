import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import {
  Shield, Award, FileCheck, Users, CheckCircle,
  ArrowRight, Phone, Clock, Globe, TrendingUp, HeartHandshake
} from 'lucide-react';

/* ── JSON-LD Structured Data ── */
const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Carrgo Freight Solutions Ltd',
  url: 'https://carrgo.co.uk',
  logo: 'https://carrgo.co.uk/favicon.ico',
  description: 'Carrgo Freight Solutions Ltd is a UK-based freight forwarding company specialising in sea, air, road, and rail freight to and from the United Kingdom.',
  email: 'info@carrgo.co.uk',
    address: {
    '@type': 'PostalAddress',
    streetAddress: 'Suite 12, International Trade Centre',
    addressLocality: 'London',
    postalCode: 'EC2A 4BX',
    addressCountry: 'GB',
  },
  foundingDate: '2018',
  numberOfEmployees: { '@type': 'QuantitativeValue', value: '25+' },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Carrgo Freight Solutions Ltd',
  image: 'https://carrgo.co.uk/og-image.jpg',
  '@id': 'https://carrgo.co.uk',
  url: 'https://carrgo.co.uk',
    priceRange: '££',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Suite 12, International Trade Centre',
    addressLocality: 'London',
    postalCode: 'EC2A 4BX',
    addressCountry: 'GB',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:30',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '09:00',
      closes: '13:00',
    },
  ],
};

/* ── Data ── */
const timeline = [
  { year: '2018', title: 'Carrgo Founded', desc: 'Started as a customs brokerage serving UK importers with expert customs guidance and clearance services.' },
  { year: '2019', title: 'Sea Freight Launched', desc: 'Expanded into full container load (FCL) and less than container load (LCL) sea freight from Asia and Europe.' },
  { year: '2020', title: 'Air & Road Freight', desc: 'Added express air cargo and European road haulage services to meet growing client demand.' },
  { year: '2021', title: 'Brexit & Customs Accreditation', desc: 'Navigated post-Brexit customs changes. Achieved full customs accreditation as brokers.' },
  { year: '2022', title: 'Rail Freight & FBA', desc: 'Launched China-UK rail freight via the New Silk Road. Added dedicated Amazon FBA shipping services.' },
  { year: '2023', title: 'Midlands Warehousing', desc: 'Opened our Midlands storage facility offering pick-and-pack, palletisation, and fulfilment services.' },
  { year: '2024', title: '500+ Importers Served', desc: 'Celebrated serving over 500 UK importers across 50+ active trade routes. Continuing to grow.' },
];

const values = [
  {
    icon: HeartHandshake,
    title: 'Transparency',
    desc: 'No hidden fees. No surprise charges. Every cost explained upfront in your all-inclusive quote. We believe you deserve to know exactly what you are paying for.',
  },
  {
    icon: Shield,
    title: 'Reliability',
    desc: 'We do what we say. On time, every time. Your cargo is our commitment. Our 99.2% first-submission customs clearance rate and 94% client retention speak for themselves.',
  },
  {
    icon: Award,
    title: 'Expertise',
    desc: 'Certified customs brokers. IATA-accredited air cargo agents. BIFA-registered freight forwarders. Credentials that matter in the complex world of international trade.',
  },
  {
    icon: Users,
    title: 'Partnership',
    desc: 'Every client gets a dedicated account manager who knows your business, your shipments, and your priorities. You are never just a number in our system.',
  },
];

const accreditations = [
  {
    icon: Shield,
    title: 'BIFA Registered',
    desc: 'British International Freight Association registered member. BIFA sets the professional standards for UK freight forwarders, ensuring best practices in every aspect of our operations.',
  },
  {
    icon: Globe,
    title: 'IATA Accredited',
    desc: 'International Air Transport Association accredited agent. This enables us to issue air waybills, book directly with airlines, and access competitive air cargo rates worldwide.',
  },
  {
    icon: FileCheck,
    title: 'AEO Certified',
    desc: 'AEO-certified customs broker. We are certified to submit customs declarations on behalf of importers with full access to the Customs Declaration Service (CDS).',
  },
];

const stats = [
  { value: '500+', label: 'UK Importers Served' },
  { value: '99%+', label: 'Customs Clearance Success' },
  { value: '2hr', label: 'Average Quote Response' },
  { value: '8', label: 'Freight Services' },
  { value: '50+', label: 'Active Trade Routes' },
  { value: '30+', label: 'Years Combined Experience' },
];

export default function About() {
  return (
    <>
      <Seo
        title="About Carrgo | UK Freight Forwarding Company | Carrgo"
        description="About Carrgo — a UK freight forwarding company with 30+ years experience. BIFA & IATA accredited. Serving importers & exporters across UK, Ireland & NI."
        keywords="about carrgo freight, uk freight forwarder company, freight forwarding business, bifa member freight, iata accredited cargo, customs broker, customs brokerage uk"
        ogUrl="https://carrgo.co.uk/about"
        canonical="https://carrgo.co.uk/about"
        structuredData={[
          orgSchema,
          localBusinessSchema,
          {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "About Carrgo Freight Solutions",
            "url": "https://carrgo.co.uk/about",
            "description": "Learn about Carrgo Freight Solutions Ltd, a UK and Ireland freight forwarder specialising in sea, air, road, rail freight and customs clearance."
          }
        ]}
      />

      <main>
        {/* ====== HERO ====== */}
        <section aria-labelledby="about-hero-heading" className="bg-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-[#EFF6FF] to-transparent pointer-events-none" />
          <div className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block text-xs font-semibold tracking-widest text-[#1A6DFF] uppercase mb-4">About Carrgo</span>
                <h1 id="about-hero-heading" className="text-4xl lg:text-5xl font-extrabold text-[#111827] leading-tight mb-6">
                  About Carrgo — UK Freight Forwarding Company
                </h1>
                <p className="text-lg text-[#4B5563] leading-relaxed mb-6">
                  Carrgo Freight Solutions Ltd is a UK-based freight forwarding company specialising in sea, air, road, and rail freight to and from the United Kingdom. We are certified customs brokers helping UK importers navigate international trade with confidence.
                </p>
                <p className="text-[#4B5563] leading-relaxed mb-8">
                  From our headquarters in London, we coordinate shipments across 50+ trade routes, managing everything from a single pallet to full container loads. Our team combines decades of logistics experience with a genuine commitment to making freight forwarding simpler, clearer, and more reliable for UK businesses.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/get-a-quote"
                    className="inline-flex items-center gap-2 bg-[#1A6DFF] hover:bg-[#1557CC] text-white px-6 py-3 rounded-lg font-semibold transition-colors min-h-[44px]"
                  >
                    Get a Free Quote <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 bg-white text-[#1A6DFF] border-2 border-[#1A6DFF] px-6 py-3 rounded-lg font-semibold hover:bg-[#EBF2FF] transition-colors min-h-[44px]"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="bg-[#EBF2FF] rounded-2xl p-8 border border-[#D4E3FF] shadow-md">
                  <div className="bg-[#1A6DFF]/10 rounded-xl w-full h-80 flex items-center justify-center">
                    <div className="text-center">
                      <Globe className="w-20 h-20 text-[#1A6DFF] mx-auto mb-4" aria-hidden="true" />
                      <p className="text-[#1A6DFF] font-semibold">Global Freight Solutions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====== OUR STORY ====== */}
        <section aria-labelledby="story-heading" className="bg-[#F8FAFC] py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left — Text */}
              <div>
                <h2 id="story-heading" className="text-3xl lg:text-4xl font-extrabold text-[#111827] mb-6">
                  Our Story
                </h2>
                <div className="space-y-4 text-[#4B5563] leading-relaxed">
                  <p>
                    Carrgo was founded with a simple mission: make international freight forwarding transparent, reliable, and accessible for UK businesses. We saw too many UK importers struggling with hidden fees, poor communication, and unexpected customs delays — and we knew there was a better way.
                  </p>
                  <p>
                    Starting as a small customs brokerage in 2018, we built our reputation on expert customs guidance and meticulous documentation. As our clients grew, so did their needs. They asked us to handle not just customs, but the entire shipping process — from supplier collection in Shanghai to delivery at their warehouse in Birmingham.
                  </p>
                  <p>
                    We listened. We expanded into sea freight, air cargo, road haulage, and rail freight. We invested in technology to provide real-time tracking. We hired dedicated account managers so every client had a single point of contact who knew their business inside out.
                  </p>
                  <p>
                    Today, Carrgo serves over 500 UK importers, managing freight from China, India, USA, Europe, and beyond. We remain privately owned and fiercely independent — our only priority is getting your cargo where it needs to be, on time and on budget.
                  </p>
                </div>
              </div>

              {/* Right — Timeline */}
              <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-6 lg:p-8">
                <h3 className="text-xl font-bold text-[#111827] mb-6">Our Journey</h3>
                <div className="space-y-6">
                  {timeline.map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex-shrink-0 w-14 h-14 bg-[#1A6DFF] text-white rounded-full flex items-center justify-center text-sm font-extrabold">
                        {item.year.slice(2)}
                      </div>
                      <div>
                        <h4 className="font-bold text-[#111827]">{item.title}</h4>
                        <p className="text-sm text-[#4B5563] mt-1">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====== MISSION & VALUES ====== */}
        <section aria-labelledby="values-heading" className="bg-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-block text-xs font-semibold tracking-widest text-[#1A6DFF] uppercase mb-3">What Drives Us</span>
              <h2 id="values-heading" className="text-3xl lg:text-4xl font-extrabold text-[#111827] mb-4">
                Our Mission &amp; Values
              </h2>
              <p className="text-lg text-[#4B5563] max-w-3xl mx-auto leading-relaxed">
                <strong className="text-[#111827]">Our mission:</strong> To be the UK&apos;s most trusted freight forwarder — simplifying global trade through transparent pricing, expert customs clearance, and genuine customer care. Every shipment we handle is a promise kept.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {values.map((v, i) => {
                const Icon = v.icon;
                return (
                  <article key={i} className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-8 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-[#EBF2FF] rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-[#1A6DFF]" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-bold text-[#111827] mb-2">{v.title}</h3>
                    <p className="text-[#4B5563] leading-relaxed">{v.desc}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ====== ACCREDITATIONS ====== */}
        <section aria-labelledby="accreditations-heading" className="bg-[#EFF6FF] py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 id="accreditations-heading" className="text-3xl lg:text-4xl font-extrabold text-[#111827] mb-3">
                Our Accreditations
              </h2>
              <p className="text-[#4B5563] max-w-2xl mx-auto">
                We hold the industry accreditations that matter. These credentials demonstrate our commitment to professional standards and give you confidence that your cargo is in expert hands.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {accreditations.map((acc, i) => {
                const Icon = acc.icon;
                return (
                  <article key={i} className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-8 text-center hover:shadow-md transition-shadow">
                    <div className="w-16 h-16 bg-[#EBF2FF] rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-[#1A6DFF]" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-bold text-[#111827] mb-2">{acc.title}</h3>
                    <p className="text-[#4B5563] text-sm leading-relaxed mb-4">{acc.desc}</p>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-[#16A34A] bg-[#DCFCE7] px-3 py-1 rounded-full">
                      <CheckCircle className="w-4 h-4" aria-hidden="true" /> Verified
                    </span>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ====== STATS ====== */}
        <section aria-label="Company statistics" className="py-16 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 text-center">
              {stats.map((s, i) => (
                <article key={i} className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-6">
                  <div className="text-4xl lg:text-5xl font-extrabold text-[#1A6DFF]">{s.value}</div>
                  <p className="text-[#4B5563] mt-2 font-medium">{s.label}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ====== WHY CHOOSE CARRGO ====== */}
        <section aria-labelledby="why-carrgo-heading" className="bg-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 id="why-carrgo-heading" className="text-3xl lg:text-4xl font-extrabold text-[#111827] mb-6">
                  Why Carrgo?
                </h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#EBF2FF] rounded-lg flex items-center justify-center">
                      <Clock className="w-6 h-6 text-[#1A6DFF]" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#111827] text-lg">Fast Quote Response</h3>
                      <p className="text-[#4B5563] mt-1">Receive your all-inclusive freight quote within 2 hours during UK business hours. No waiting days for pricing.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#EBF2FF] rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-[#1A6DFF]" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#111827] text-lg">All-Inclusive Pricing</h3>
                      <p className="text-[#4B5563] mt-1">One quote covers freight, customs clearance, documentation, and UK delivery. No hidden fees, ever.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#EBF2FF] rounded-lg flex items-center justify-center">
                      <Phone className="w-6 h-6 text-[#1A6DFF]" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#111827] text-lg">Dedicated Account Manager</h3>
                      <p className="text-[#4B5563] mt-1">Every client gets a single point of contact who knows your business and is available when you need them.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#EBF2FF] rounded-lg flex items-center justify-center">
                      <FileCheck className="w-6 h-6 text-[#1A6DFF]" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#111827] text-lg">Expert Customs Clearance</h3>
                      <p className="text-[#4B5563] mt-1">Our customs brokers handle all documentation with a 99.2% first-submission success rate.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#EBF2FF] rounded-2xl p-8 border border-[#D4E3FF]">
                <h3 className="text-2xl font-bold text-[#111827] mb-4">Get to Know Our Team</h3>
                <p className="text-[#4B5563] leading-relaxed mb-6">
                  Our team brings together decades of experience in international logistics, customs brokerage, and supply chain management. From our customs specialists who navigate complex customs regulations daily, to our operations team who coordinate shipments across multiple time zones, every member of the Carrgo team is committed to one goal: making your freight experience as smooth as possible.
                </p>
                <p className="text-[#4B5563] leading-relaxed mb-6">
                  We are based in London but serve importers across the entire United Kingdom. Whether you are shipping your first container or managing a complex multi-modal supply chain, we have the expertise to help.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-[#1A6DFF] hover:bg-[#1557CC] text-white px-6 py-3 rounded-lg font-semibold transition-colors min-h-[44px]"
                >
                  Speak to Our Team <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ====== CTA BANNER ====== */}
        <section aria-label="Get started" className="py-16 md:py-24 bg-[#1A6DFF] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-extrabold mb-4">
              Work With a Freight Forwarder You Can Trust
            </h2>
            <p className="text-[#D4E3FF] text-lg mb-8 max-w-2xl mx-auto">
              Join 500+ UK importers who&apos;ve made Carrgo their logistics partner. All-inclusive quotes, expert customs clearance, and dedicated account management.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/get-a-quote"
                className="inline-flex items-center gap-2 bg-white text-[#1A6DFF] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors min-h-[44px]"
              >
                Get a Free Quote <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-[#1557CC] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#1149AD] transition-colors min-h-[44px]"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
