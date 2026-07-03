import { Link } from 'react-router-dom';
import Seo from '../../components/Seo';
import { Star, ArrowRight, Quote } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  industry: string;
  quote: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: 'James R.',
    role: 'Managing Director',
    industry: 'Furniture',
    quote: 'Carrgo transformed our supply chain. We went from constant delays and stock-outs to reliable 31-day deliveries from China. Their consolidation service saved us 18% on shipping costs and their customs team is exceptional.',
    rating: 5,
  },
  {
    name: 'Sarah C.',
    role: 'Operations Manager',
    industry: 'E-commerce',
    quote: 'Since switching to Carrgo for our Amazon FBA shipments, we have had zero rejections at fulfilment centres. Their FBA prep service at origin is worth every penny — the labelling and palletisation is always spot on.',
    rating: 5,
  },
  {
    name: 'Michael O.',
    role: 'Procurement Director',
    industry: 'Construction',
    quote: 'The customs expertise at Carrgo is outstanding. They identified we were overpaying duty on three product lines and got us a refund. Our clearance times went from 5 days to under 24 hours. Highly recommended.',
    rating: 5,
  },
  {
    name: 'Lisa T.',
    role: 'Supply Chain Manager',
    industry: 'Automotive',
    quote: 'In the automotive industry, timing is everything. Carrgo delivers our just-in-time parts from Germany with 99%+ reliability. Their tracking portal gives us the visibility we need to keep production running smoothly.',
    rating: 5,
  },
  {
    name: 'David K.',
    role: 'Founder',
    industry: 'Electronics',
    quote: 'We import sensitive electronics from Shenzhen and Carrgo handles everything from packaging advice to customs. Their air-sea hybrid option cut our shipping costs by 35% while keeping transit times manageable.',
    rating: 5,
  },
  {
    name: 'Amina H.',
    role: 'CEO',
    industry: 'Fashion',
    quote: 'As a fast fashion brand, we need flexibility and speed. Carrgo helped us switch from air to rail freight from China, cutting costs by 40% while only adding a week to transit. Their team is responsive and proactive.',
    rating: 5,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <>
      <Seo
        title="Testimonials | Carrgo Freight Solutions"
        description="See what UK importers say about Carrgo Freight Solutions. Reviews from furniture, e-commerce, automotive, construction, electronics and fashion businesses."
      />

      {/* Hero */}
      <section aria-label="Testimonials hero" className="relative bg-brand-800 py-20 lg:py-28">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        </div>
        <div className="container-carrgo relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-brand-100 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <Quote className="w-4 h-4" />
              Client Stories
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              What Our Clients Say
            </h1>
            <p className="text-lg text-brand-100 leading-relaxed max-w-2xl mx-auto">
              Trusted by UK importers across industries. Here is what they have to say about working with Carrgo.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonial Cards */}
      <section aria-label="Testimonial cards" className="py-16 lg:py-20 bg-white">
        <div className="container-carrgo">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((t) => (
              <article
                key={t.name}
                className="bg-white rounded-xl border hover:shadow-lg transition-shadow p-6 flex flex-col"
              >
                <div className="mb-4">
                  <StarRating rating={t.rating} />
                </div>
                <blockquote className="text-gray-700 leading-relaxed mb-6 flex-1">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <footer className="pt-4 border-t border-gray-100">
                  <cite className="not-italic">
                    <span className="font-semibold text-gray-900">{t.name}</span>
                    <span className="text-gray-500"> — {t.role}</span>
                    <span className="inline-block ml-2 bg-brand-50 text-brand-700 text-xs font-medium px-2 py-0.5 rounded-full">
                      {t.industry}
                    </span>
                  </cite>
                </footer>
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
              Join Our Satisfied Clients
            </h2>
            <p className="text-gray-600 mb-8">
              Experience the Carrgo difference for yourself. Get your free quote today.
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
