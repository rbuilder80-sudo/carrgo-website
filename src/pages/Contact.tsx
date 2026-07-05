import { useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import {
  Phone, Mail, MapPin, Clock, MessageCircle,
  ArrowRight, Send, CheckCircle
} from 'lucide-react';

/* ── JSON-LD Structured Data ── */
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Carrgo Freight Solutions Ltd',
  image: 'https://carrgo.co.uk/og-image.jpg',
  '@id': 'https://carrgo.co.uk',
  url: 'https://carrgo.co.uk',
  telephone: '+44-20-3950-5050',
  email: 'info@carrgo.co.uk',
  priceRange: '££',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Suite 12, International Trade Centre',
    addressLocality: 'London',
    postalCode: 'EC2A 4BX',
    addressCountry: 'GB',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '51.5203',
    longitude: '-0.0793',
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

const contactMethods = [
  {
    icon: Phone,
    label: 'Call Us',
    value: '+44 (0)20 3950 5050',
    note: 'Monday–Friday, 8:30am–6pm GMT',
    href: 'tel:+442039505050',
  },
  {
    icon: Mail,
    label: 'Email Us',
    value: 'info@carrgo.co.uk',
    note: 'We respond within 2 hours',
    href: 'mailto:info@carrgo.co.uk',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+44 7700 123456',
    note: 'Quick questions welcome',
    href: 'https://wa.me/447700123456',
  },
  {
    icon: MapPin,
    label: 'Office',
    value: 'Suite 12, International Trade Centre, London, EC2A 4BX',
    note: 'By appointment only',
    href: 'https://maps.google.com/?q=EC2A+4BX',
  },
  {
    icon: Clock,
    label: 'Business Hours',
    value: 'Monday–Friday: 8:30am–6pm',
    note: 'Saturday: 9am–1pm (limited)',
    href: undefined,
  },
];

const subjectOptions = [
  'How can we help?',
  'Quote Request',
  'Customs Question',
  'General Enquiry',
  'Partnership Opportunity',
  'Feedback',
];

const quickLinks = [
  {
    title: 'Get a Freight Quote',
    desc: 'The fastest way to get accurate pricing for your shipment.',
    href: '/get-a-quote',
    icon: Send,
  },
  {
    title: 'HMRC Customs Help',
    desc: 'Expert customs clearance and documentation support.',
    href: '/services/customs-clearance',
    icon: CheckCircle,
  },
  {
    title: 'Call Our Team',
    desc: 'Speak directly with a freight specialist.',
    href: 'tel:+442039505050',
    icon: Phone,
  },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Seo
        title="Contact Carrgo | UK Freight Forwarder | Quotes & Customs Help"
        description="Contact Carrgo Freight Solutions for freight quotes, customs questions or logistics support. Call +44 (0)20 3950 5050 or email info@carrgo.co.uk. We respond within 2 hours."
        keywords="contact freight forwarder, freight quote contact, customs broker contact, shipping company uk contact, freight forwarding phone"
        ogUrl="https://carrgo.co.uk/contact"
        canonical="https://carrgo.co.uk/contact"
        structuredData={[
          localBusinessSchema,
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact Carrgo Freight Solutions",
            "url": "https://carrgo.co.uk/contact",
            "description": "Contact Carrgo Freight Solutions for freight quotes, customs questions or logistics support."
          }
        ]}
      />

      <main>
        {/* ====== HERO ====== */}
        <section aria-labelledby="contact-hero-heading" className="bg-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-[#EFF6FF] to-transparent pointer-events-none" />
          <div className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-block text-xs font-semibold tracking-widest text-[#1A6DFF] uppercase mb-4">Contact Us</span>
              <h1 id="contact-hero-heading" className="text-4xl lg:text-5xl font-extrabold text-[#111827] leading-tight mb-6">
                Get in Touch With Our Team
              </h1>
              <p className="text-lg text-[#4B5563] leading-relaxed">
                Whether you need a freight quote, have a customs question, or want to discuss your supply chain — our team is here to help. We respond within 2 hours during UK business hours and every enquiry is handled by a real person who understands freight forwarding.
              </p>
            </div>
          </div>
        </section>

        {/* ====== CONTACT DETAILS + FORM ====== */}
        <section aria-labelledby="contact-form-heading" className="bg-[#F8FAFC] py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-5 gap-8">
              {/* Left — Contact Info (2 cols) */}
              <div className="lg:col-span-2">
                <h2 id="contact-form-heading" className="text-2xl font-extrabold text-[#111827] mb-6">
                  Contact Information
                </h2>
                <div className="space-y-4">
                  {contactMethods.map((method, i) => {
                    const Icon = method.icon;
                    const content = (
                      <div className="flex gap-4 bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-5 hover:shadow-md transition-shadow">
                        <div className="flex-shrink-0 w-12 h-12 bg-[#EBF2FF] rounded-lg flex items-center justify-center">
                          <Icon className="w-6 h-6 text-[#1A6DFF]" aria-hidden="true" />
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wide">{method.label}</span>
                          <p className="font-semibold text-[#111827] mt-0.5">{method.value}</p>
                          <p className="text-sm text-[#4B5563] mt-0.5">{method.note}</p>
                        </div>
                      </div>
                    );
                    return method.href ? (
                      <a key={i} href={method.href} className="block">
                        {content}
                      </a>
                    ) : (
                      <div key={i}>{content}</div>
                    );
                  })}
                </div>

                {/* Additional contact note */}
                <div className="mt-6 bg-[#EBF2FF] rounded-xl p-5 border border-[#D4E3FF]">
                  <h3 className="font-bold text-[#111827] mb-2">Need an Urgent Quote?</h3>
                  <p className="text-sm text-[#4B5563] mb-3">
                    For the fastest response, use our online quote form. We typically respond within 1 hour 42 minutes during business hours.
                  </p>
                  <Link
                    to="/get-a-quote"
                    className="inline-flex items-center gap-2 text-[#1A6DFF] font-semibold text-sm hover:underline"
                  >
                    Get a Quote Now <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>

              {/* Right — Contact Form (3 cols) */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-2xl shadow-lg border border-[#E5E7EB] p-6 lg:p-10">
                  {submitted ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-[#DCFCE7] rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-[#16A34A]" aria-hidden="true" />
                      </div>
                      <h3 className="text-2xl font-bold text-[#111827] mb-2">Message Sent!</h3>
                      <p className="text-[#4B5563] mb-6">
                        Thank you for contacting us. Our team will review your message and respond within 2 hours during UK business hours.
                      </p>
                      <Link
                        to="/"
                        className="inline-flex items-center gap-2 bg-[#1A6DFF] hover:bg-[#1557CC] text-white px-6 py-3 rounded-lg font-semibold transition-colors min-h-[44px]"
                      >
                        Return to Home <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </Link>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-xl font-bold text-[#111827] mb-1">Send Us a Message</h3>
                      <p className="text-sm text-[#4B5563] mb-6">Fill in the form below and our team will get back to you shortly.</p>

                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="contact-name" className="block text-sm font-medium text-[#111827] mb-1">
                              Full Name <span className="text-[#DC2626]">*</span>
                            </label>
                            <input
                              id="contact-name"
                              type="text"
                              required
                              placeholder="John Smith"
                              className="w-full h-12 px-4 rounded-lg border border-[#E5E7EB] text-[#111827] placeholder-[#9CA3AF] focus:border-[#1A6DFF] focus:ring-2 focus:ring-[#D4E3FF] outline-none transition-all"
                              aria-required="true"
                            />
                          </div>
                          <div>
                            <label htmlFor="contact-email" className="block text-sm font-medium text-[#111827] mb-1">
                              Email <span className="text-[#DC2626]">*</span>
                            </label>
                            <input
                              id="contact-email"
                              type="email"
                              required
                              placeholder="john@company.co.uk"
                              className="w-full h-12 px-4 rounded-lg border border-[#E5E7EB] text-[#111827] placeholder-[#9CA3AF] focus:border-[#1A6DFF] focus:ring-2 focus:ring-[#D4E3FF] outline-none transition-all"
                              aria-required="true"
                            />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="contact-phone" className="block text-sm font-medium text-[#111827] mb-1">
                              Phone
                            </label>
                            <input
                              id="contact-phone"
                              type="tel"
                              placeholder="+44 (0)20 0000 0000"
                              className="w-full h-12 px-4 rounded-lg border border-[#E5E7EB] text-[#111827] placeholder-[#9CA3AF] focus:border-[#1A6DFF] focus:ring-2 focus:ring-[#D4E3FF] outline-none transition-all"
                            />
                          </div>
                          <div>
                            <label htmlFor="contact-company" className="block text-sm font-medium text-[#111827] mb-1">
                              Company
                            </label>
                            <input
                              id="contact-company"
                              type="text"
                              placeholder="Your Company Ltd"
                              className="w-full h-12 px-4 rounded-lg border border-[#E5E7EB] text-[#111827] placeholder-[#9CA3AF] focus:border-[#1A6DFF] focus:ring-2 focus:ring-[#D4E3FF] outline-none transition-all"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="contact-subject" className="block text-sm font-medium text-[#111827] mb-1">
                            Subject <span className="text-[#DC2626]">*</span>
                          </label>
                          <select
                            id="contact-subject"
                            required
                            defaultValue=""
                            className="w-full h-12 px-4 rounded-lg border border-[#E5E7EB] text-[#111827] focus:border-[#1A6DFF] focus:ring-2 focus:ring-[#D4E3FF] outline-none transition-all bg-white"
                            aria-required="true"
                          >
                            {subjectOptions.map((opt, i) => (
                              <option key={i} value={i === 0 ? '' : opt}>{opt}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label htmlFor="contact-message" className="block text-sm font-medium text-[#111827] mb-1">
                            Your Message <span className="text-[#DC2626]">*</span>
                          </label>
                          <textarea
                            id="contact-message"
                            rows={5}
                            required
                            placeholder="Tell us about your freight requirements, customs questions, or any other enquiries..."
                            className="w-full px-4 py-3 rounded-lg border border-[#E5E7EB] text-[#111827] placeholder-[#9CA3AF] focus:border-[#1A6DFF] focus:ring-2 focus:ring-[#D4E3FF] outline-none transition-all resize-vertical"
                            aria-required="true"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full inline-flex items-center justify-center gap-2 bg-[#1A6DFF] hover:bg-[#1557CC] text-white px-6 py-4 rounded-lg font-bold text-lg transition-colors min-h-[44px]"
                        >
                          <Send className="w-5 h-5" aria-hidden="true" /> Send Message
                        </button>

                        <p className="text-xs text-[#9CA3AF] text-center">
                          By submitting this form, you agree to our <Link to="/privacy" className="text-[#1A6DFF] hover:underline">Privacy Policy</Link> and <Link to="/terms" className="text-[#1A6DFF] hover:underline">Terms of Service</Link>.
                        </p>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====== MAP ====== */}
        <section aria-label="Office location map" className="bg-white">
          <div className="w-full h-96 bg-[#F8FAFC] border-y border-[#E5E7EB] relative overflow-hidden">
            {/* Map placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-[#1A6DFF] mx-auto mb-3" aria-hidden="true" />
                <p className="font-bold text-[#111827] text-lg">Carrgo Freight Solutions Ltd</p>
                <p className="text-[#4B5563]">Suite 12, International Trade Centre, London, EC2A 4BX</p>
                <a
                  href="https://maps.google.com/?q=EC2A+4BX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#1A6DFF] font-medium mt-3 hover:underline"
                >
                  Get Directions <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ====== QUICK LINKS ====== */}
        <section aria-labelledby="quick-links-heading" className="bg-[#EFF6FF] py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="quick-links-heading" className="text-2xl font-extrabold text-[#111827] text-center mb-8">
              Need Something Specific?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {quickLinks.map((link, i) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={i}
                    to={link.href}
                    className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-6 hover:shadow-md transition-shadow flex items-start gap-4 group"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-[#EBF2FF] rounded-lg flex items-center justify-center group-hover:bg-[#1A6DFF] transition-colors">
                      <Icon className="w-6 h-6 text-[#1A6DFF] group-hover:text-white transition-colors" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#111827] group-hover:text-[#1A6DFF] transition-colors">{link.title}</h3>
                      <p className="text-sm text-[#4B5563] mt-1">{link.desc}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
