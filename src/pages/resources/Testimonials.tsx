import { Star, Quote, ArrowRight, Ship } from 'lucide-react';
import { Link } from 'react-router-dom';
import Seo from '../../components/Seo';

/* ── Testimonial data ── */
const testimonials = [
  {
    name: 'James Hartley',
    role: 'Operations Director',
    company: 'Hartley Imports Ltd',
    location: 'Manchester',
    rating: 5,
    text: 'We switched to Carrgo after years of dealing with hidden fees from our previous forwarder. The all-inclusive quote system is a game changer — we know exactly what we are paying before the container even leaves Shanghai. Their customs team got our first shipment through Felixstowe in under 4 hours.',
    industry: 'Furniture Import',
    metric: '4-hour customs clearance',
  },
  {
    name: 'Sarah Chen',
    role: 'Supply Chain Manager',
    company: 'Chen Electronics UK',
    location: 'Birmingham',
    rating: 5,
    text: 'We import fragile electronics from Shenzhen weekly. Carrgo arranged anti-static packaging and shock-proof crating that reduced our damage rate from 8% to under 1%. The dedicated account manager knows our business inside out. Quote responses are consistently under 2 hours.',
    industry: 'Electronics',
    metric: 'Damage rate reduced from 8% to <1%',
  },
  {
    name: 'Michael O\'Brien',
    role: 'Managing Director',
    company: 'O\'Brien Construction Supplies',
    location: 'Dublin, Ireland',
    rating: 5,
    text: 'Shipping building materials from Turkey to Ireland used to be a nightmare with multiple brokers. Carrgo handles everything door-to-door — customs at both ends, ferry booking, and delivery to our yard in Dublin. The Windsor Framework paperwork is sorted without us lifting a finger.',
    industry: 'Construction Materials',
    metric: 'Single-point contact for Turkey-IE route',
  },
  {
    name: 'Aisha Patel',
    role: 'Ecommerce Founder',
    company: 'Patel Home & Living',
    location: 'London',
    rating: 5,
    text: 'As an Amazon FBA seller, I was drowning in logistics. Carrgo took over our entire supply chain — from supplier pickup in India to FBA prep, labelling, and delivery to BHX4. We have scaled from 50 units a month to 2,000 without adding a single logistics hire.',
    industry: 'Amazon FBA / Ecommerce',
    metric: 'Scaled 40x without hiring logistics staff',
  },
  {
    name: 'Robert Evans',
    role: 'Procurement Manager',
    company: 'Evans Automotive Parts',
    location: 'Belfast, Northern Ireland',
    rating: 5,
    text: 'Post-Brexit NI shipping was chaos until we found Carrgo. They handle GB-NI movements with full NI Protocol compliance. Our parts from Germany now clear customs in Larne in under 2 hours. The real-time tracking gives our workshop precise arrival times.',
    industry: 'Automotive Parts',
    metric: '2-hour NI customs clearance',
  },
  {
    name: 'Dr. Emily Watson',
    role: 'Quality Assurance Lead',
    company: 'MediSupply UK',
    location: 'Liverpool',
    rating: 5,
    text: 'Temperature-controlled pharmaceutical shipping is not something you trust to just anyone. Carrgo maintained 2-8°C cold chain from Mumbai to our Liverpool warehouse with full GDP documentation. The compliance paperwork was flawless — MHRA had zero queries.',
    industry: 'Medical / Pharmaceutical',
    metric: 'Zero MHRA queries on documentation',
  },
];

const stats = [
  { value: '500+', label: 'UK Importers Served' },
  { value: '99.2%', label: 'Customs First-Submission Success' },
  { value: '< 2 hrs', label: 'Average Quote Response' },
  { value: '4.9/5', label: 'Client Satisfaction Score' },
];

/* ── Star rating component ── */
function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < count ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

/* ── Main Testimonials Page ── */
export default function Testimonials() {
  return (
    <main role="main" itemScope itemType="https://schema.org/WebPage" data-page="testimonials">
      <Seo
        title="Client Testimonials | Carrgo Freight Solutions Reviews"
        description="Read reviews from UK importers using Carrgo freight forwarding. 500+ businesses trust us with sea freight, customs clearance, and door-to-door logistics. 4.9/5 client satisfaction."
        keywords="carrgo reviews, freight forwarder testimonials, shipping company reviews uk, carrgo feedback, importer testimonials"
        ogUrl="https://www.carrgo.co.uk/resources/testimonials"
        canonical="https://www.carrgo.co.uk/resources/testimonials"
        structuredData={[
          {
            '@context': 'https://schema.org',
            '@type': 'Review',
            itemReviewed: {
              '@type': 'Organization',
              name: 'Carrgo Freight Solutions',
            },
            reviewRating: { '@type': 'Rating', ratingValue: '4.9', bestRating: '5' },
            author: { '@type': 'Organization', name: 'Carrgo Clients' },
            reviewBody: '500+ UK importers trust Carrgo for sea freight, air cargo, customs clearance, and door-to-door logistics.',
          },
        ]}
      />

      {/* ====== HERO ====== */}
      <section aria-labelledby="testimonials-heading" className="bg-gradient-to-br from-brand-900 to-brand-800 text-white py-16 lg:py-20">
        <div className="container-carrgo">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-amber-400 fill-amber-400" aria-hidden="true" />
              <span className="text-sm font-semibold text-brand-200 tracking-wide">Client Reviews</span>
            </div>
            <h1 id="testimonials-heading" className="text-3xl lg:text-5xl font-extrabold leading-tight mb-6">
              What UK Importers Say About Carrgo
            </h1>
            <p className="text-lg text-brand-100 leading-relaxed max-w-2xl">
              500+ businesses across furniture, electronics, construction, automotive, medical, and ecommerce trust Carrgo with their freight forwarding. Here is what they have to say.
            </p>
          </div>
        </div>
      </section>

      {/* ====== STATS ====== */}
      <section aria-label="Company statistics" className="py-12 bg-white border-b border-gray-100">
        <div className="container-carrgo">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((s) => (
              <article key={s.label} className="bg-gray-50 rounded-xl py-6 px-4">
                <div className="text-3xl font-extrabold text-brand-800">{s.value}</div>
                <p className="text-gray-600 text-sm mt-1">{s.label}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ====== TESTIMONIAL CARDS ====== */}
      <section aria-labelledby="reviews-heading" className="py-16 bg-gray-50">
        <div className="container-carrgo">
          <h2 id="reviews-heading" className="text-2xl font-bold text-gray-900 mb-8">
            Client Success Stories
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <article
                key={i}
                className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                itemScope
                itemType="https://schema.org/Review"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold text-sm">
                      {t.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm" itemProp="author">{t.name}</p>
                      <p className="text-gray-500 text-xs">{t.role}, {t.company}</p>
                    </div>
                  </div>
                  <Quote className="w-6 h-6 text-brand-200" aria-hidden="true" />
                </div>

                <div itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
                  <meta itemProp="ratingValue" content={String(t.rating)} />
                  <meta itemProp="bestRating" content="5" />
                  <StarRating count={t.rating} />
                </div>

                <blockquote className="mt-3 text-gray-700 text-sm leading-relaxed" itemProp="reviewBody">
                  "{t.text}"
                </blockquote>

                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {t.industry}
                  </span>
                  <span className="text-xs text-brand-700 font-semibold">
                    {t.metric}
                  </span>
                </div>

                <meta itemProp="name" content={`Review by ${t.name} — ${t.company}`} />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ====== TRUST SIGNALS ====== */}
      <section aria-label="Trust signals" className="py-12 bg-white border-t border-gray-100">
        <div className="container-carrgo">
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-gray-900">Why Businesses Trust Carrgo</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="p-6">
              <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Ship className="w-6 h-6 text-brand-700" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">All-Inclusive Pricing</h3>
              <p className="text-gray-600 text-sm">One quote covers freight, customs, and delivery. No hidden surcharges, ever.</p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Star className="w-6 h-6 text-brand-700" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Dedicated Account Manager</h3>
              <p className="text-gray-600 text-sm">Every client gets a single point of contact who knows your business.</p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Quote className="w-6 h-6 text-brand-700" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Real-Time Tracking</h3>
              <p className="text-gray-600 text-sm">Track every shipment from factory to warehouse with live updates.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ====== CTA ====== */}
      <section aria-label="Get started" className="py-16 bg-brand-900 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">
            Join 500+ UK Importers Who Trust Carrgo
          </h2>
          <p className="text-brand-100 mb-8 max-w-xl mx-auto">
            Get your all-inclusive freight quote in under 2 hours. No hidden fees, no obligation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/get-a-quote"
              className="inline-flex items-center gap-2 bg-white text-brand-900 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
            >
              Get a Free Quote <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-brand-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-brand-600 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
