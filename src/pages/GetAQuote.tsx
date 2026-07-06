import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import {
  CheckCircle, ArrowRight, ArrowLeft, Send, Mail,
  Clock, FileCheck, TrendingUp, Shield, Phone, MessageCircle
} from 'lucide-react';

/* ── JSON-LD Structured Data ── */
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Freight Quote Service',
  provider: { '@type': 'Organization', name: 'Carrgo Freight Solutions Ltd' },
  areaServed: { '@type': 'Country', name: 'United Kingdom' },
  description: 'Get an all-inclusive freight quote within 2 hours. Sea, air, road, and rail freight forwarding from Carrgo.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'GBP',
    description: 'Free freight quote — no obligation',
  },
};

const benefits = [
  {
    icon: Clock,
    title: '2-Hour Response',
    desc: 'We respond within 2 hours during UK business hours. Average response time is just 1 hour 42 minutes.',
  },
  {
    icon: TrendingUp,
    title: 'All-Inclusive Pricing',
    desc: 'Every cost itemised — freight, customs, documentation, and UK delivery. No surprises, ever.',
  },
  {
    icon: FileCheck,
    title: 'Customs Clearance Included',
    desc: 'Customs clearance built into every quote. Our customs brokers handle everything.',
  },
  {
    icon: Shield,
    title: 'Multiple Options',
    desc: 'We compare sea, air, road, and rail to find the best balance of speed and cost for your shipment.',
  },
  {
    icon: CheckCircle,
    title: 'No Obligation',
    desc: 'Free quote with absolutely no commitment required. Get pricing, compare, and decide on your terms.',
  },
];

const freightModes = [
  { value: '', label: 'Select freight mode...' },
  { value: 'sea', label: 'Sea Freight (FCL / LCL)' },
  { value: 'air', label: 'Air Freight' },
  { value: 'road', label: 'Road Freight' },
  { value: 'rail', label: 'Rail Freight' },
  { value: 'not-sure', label: 'Not Sure — Advise Me' },
];

const incoterms = [
  { value: '', label: 'Select Incoterms (optional)...' },
  { value: 'exw', label: 'EXW — Ex Works' },
  { value: 'fob', label: 'FOB — Free On Board' },
  { value: 'cif', label: 'CIF — Cost, Insurance & Freight' },
  { value: 'ddp', label: 'DDP — Delivered Duty Paid' },
  { value: 'not-sure', label: 'Not Sure — Advise Me' },
];

const hearAbout = [
  { value: '', label: 'How did you hear about us? (optional)' },
  { value: 'google', label: 'Google Search' },
  { value: 'referral', label: 'Referral / Word of Mouth' },
  { value: 'social', label: 'Social Media' },
  { value: 'other', label: 'Other' },
];

const whatHappensNext = [
  { step: '1', title: 'We Review', desc: 'Our team reviews your shipment details within 2 hours during UK business hours.' },
  { step: '2', title: 'We Compare', desc: 'We calculate the best route and rates across our carrier network for your cargo.' },
  { step: '3', title: 'You Receive', desc: 'You get your all-inclusive quote with every cost itemised and explained clearly.' },
  { step: '4', title: 'We Ship', desc: 'Approve the quote and we book your shipment — collection through to delivery.' },
];

function generateReference() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let ref = 'CARG-';
  for (let i = 0; i < 5; i++) ref += chars.charAt(Math.floor(Math.random() * chars.length));
  return ref;
}

export default function GetAQuote() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [submitted, setSubmitted] = useState(false);
  const [reference, setReference] = useState('');

  const handleNext = useCallback(() => setStep(2), []);
  const handleBack = useCallback(() => setStep(1), []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setReference(generateReference());
    setSubmitted(true);
  }, []);

  return (
    <>
      <Seo
        title="Get a Freight Quote UK | Shipping & Air Freight Quotes | Carrgo"
        description="Get freight quotations in 2 hours. Sea, air, road & rail shipping quotes UK. Tell us your route, cargo & timing — we send all-inclusive pricing."
        keywords="freight quote uk, shipping quote uk, freight forwarding quote, sea freight quote, air freight quote, customs clearance quote, freight cost estimate, cheap freight uk"
        ogUrl="https://carrgo.co.uk/get-a-quote"
        canonical="https://carrgo.co.uk/get-a-quote"
        structuredData={serviceSchema}
      />

      <main>
        {/* ====== HERO ====== */}
        <section aria-labelledby="quote-hero-heading" className="bg-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-[#EFF6FF] to-transparent pointer-events-none" />
          <div className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-block text-xs font-semibold tracking-widest text-[#1A6DFF] uppercase mb-4">Get a Quote</span>
              <h1 id="quote-hero-heading" className="text-4xl lg:text-5xl font-extrabold text-[#111827] leading-tight mb-6">
                Get a Freight Quote UK — Shipping Quotes in 2 Hours
              </h1>
              <p className="text-lg text-[#4B5563] leading-relaxed">
                Complete the form below and our team will respond with a competitive, all-inclusive freight quote. No hidden fees, no obligation. Average response time: 1 hour 42 minutes.
              </p>
            </div>
          </div>
        </section>

        {/* ====== QUOTE FORM ====== */}
        <section aria-labelledby="quote-form-heading" className="bg-[#F8FAFC] py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-5 gap-8">
              {/* Left — Why Quote With Carrgo */}
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-extrabold text-[#111827] mb-4">
                  Why Request a Quote From Carrgo?
                </h2>
                <p className="text-[#4B5563] mb-6 leading-relaxed">
                  We have helped over 500 UK importers reduce freight costs by up to 22% while eliminating customs delays. Get your quote today and see the difference.
                </p>

                <div className="space-y-4 mb-8">
                  {benefits.map((b, i) => {
                    const Icon = b.icon;
                    return (
                      <div key={i} className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-[#EBF2FF] rounded-lg flex items-center justify-center mt-0.5">
                          <Icon className="w-4 h-4 text-[#1A6DFF]" aria-hidden="true" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-[#111827] text-sm">{b.title}</h3>
                          <p className="text-sm text-[#4B5563]">{b.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Trust indicators */}
                <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-5 mb-6">
                  <div className="flex flex-wrap gap-3">
                    {['BIFA Registered', 'IATA Accredited', 'AEO Certified'].map((badge) => (
                      <span key={badge} className="inline-flex items-center gap-1 text-xs font-medium text-[#16A34A] bg-[#DCFCE7] px-3 py-1.5 rounded-full">
                        <CheckCircle className="w-3.5 h-3.5" aria-hidden="true" /> {badge}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Alternative contact */}
                <div className="bg-[#EBF2FF] rounded-xl p-5 border border-[#D4E3FF]">
                  <h3 className="font-bold text-[#111827] mb-2">Prefer to Talk?</h3>
                  <p className="text-sm text-[#4B5563] mb-3">Speak directly with a freight specialist.</p>
                  <div className="space-y-2">
                    <a href="mailto:info@carrgo.co.uk" className="flex items-center gap-2 text-sm font-medium text-[#1A6DFF] hover:underline">
                      <Mail className="w-4 h-4" aria-hidden="true" /> info@carrgo.co.uk
                    </a>
                    
                  </div>
                </div>
              </div>

              {/* Right — Form */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-2xl shadow-lg border border-[#E5E7EB] p-6 lg:p-10">
                  {submitted ? (
                    /* Step 3: Confirmation */
                    <div className="text-center py-12">
                      <div className="w-20 h-20 bg-[#DCFCE7] rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-[#16A34A]" aria-hidden="true" />
                      </div>
                      <h3 className="text-2xl font-bold text-[#111827] mb-2">Quote Request Received!</h3>
                      <p className="text-[#4B5563] mb-4 max-w-md mx-auto leading-relaxed">
                        Thank you. Our team will review your shipment details and respond within 2 hours with your all-inclusive quote.
                      </p>
                      <div className="bg-[#F8FAFC] rounded-lg p-4 inline-block mb-6">
                        <span className="text-sm text-[#4B5563]">Your Reference: </span>
                        <span className="font-mono font-bold text-[#111827]">{reference}</span>
                      </div>
                      <p className="text-sm text-[#4B5563] mb-6">
                        Questions? Email us at{' '}
                        <a href="mailto:info@carrgo.co.uk" className="text-[#1A6DFF] font-medium hover:underline">info@carrgo.co.uk</a>
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
                      {/* Step indicator */}
                      <div className="mb-8">
                        <div className="flex items-center justify-between mb-2">
                          {[
                            { num: 1, label: 'Shipment Details' },
                            { num: 2, label: 'Your Details' },
                            { num: 3, label: 'Submit' },
                          ].map((s, i) => (
                            <div key={i} className="flex items-center">
                              <div className="flex flex-col items-center">
                                <div
                                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                                    step >= s.num
                                      ? 'bg-[#1A6DFF] text-white'
                                      : 'bg-[#F3F4F6] text-[#9CA3AF]'
                                  }`}
                                >
                                  {s.num}
                                </div>
                                <span className={`text-xs mt-1 font-medium ${step >= s.num ? 'text-[#1A6DFF]' : 'text-[#9CA3AF]'}`}>
                                  {s.label}
                                </span>
                              </div>
                              {i < 2 && (
                                <div className={`w-16 md:w-24 h-1 mx-2 ${step > s.num ? 'bg-[#1A6DFF]' : 'bg-[#E5E7EB]'}`} />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      <h3 id="quote-form-heading" className="text-xl font-bold text-[#111827] mb-6">
                        {step === 1 ? 'Step 1: Shipment Details' : 'Step 2: Your Details'}
                      </h3>

                      <form onSubmit={step === 1 ? (e => { e.preventDefault(); handleNext(); }) : handleSubmit} className="space-y-4">
                        {step === 1 ? (
                          /* Step 1: Shipment Details */
                          <>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <label htmlFor="qt-origin-country" className="block text-sm font-medium text-[#111827] mb-1">
                                  Origin Country <span className="text-[#DC2626]">*</span>
                                </label>
                                <input
                                  id="qt-origin-country"
                                  type="text"
                                  required
                                  placeholder="e.g. China, Germany, USA"
                                  className="w-full h-12 px-4 rounded-lg border border-[#E5E7EB] text-[#111827] placeholder-[#9CA3AF] focus:border-[#1A6DFF] focus:ring-2 focus:ring-[#D4E3FF] outline-none transition-all"
                                  aria-required="true"
                                />
                              </div>
                              <div>
                                <label htmlFor="qt-origin-city" className="block text-sm font-medium text-[#111827] mb-1">
                                  Origin City/Port <span className="text-[#DC2626]">*</span>
                                </label>
                                <input
                                  id="qt-origin-city"
                                  type="text"
                                  required
                                  placeholder="e.g. Shanghai, Rotterdam, Hamburg"
                                  className="w-full h-12 px-4 rounded-lg border border-[#E5E7EB] text-[#111827] placeholder-[#9CA3AF] focus:border-[#1A6DFF] focus:ring-2 focus:ring-[#D4E3FF] outline-none transition-all"
                                  aria-required="true"
                                />
                              </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <label htmlFor="qt-dest-country" className="block text-sm font-medium text-[#111827] mb-1">
                                  Destination Country <span className="text-[#DC2626]">*</span>
                                </label>
                                <input
                                  id="qt-dest-country"
                                  type="text"
                                  defaultValue="United Kingdom"
                                  readOnly
                                  className="w-full h-12 px-4 rounded-lg border border-[#E5E7EB] bg-[#F8FAFC] text-[#111827] focus:border-[#1A6DFF] focus:ring-2 focus:ring-[#D4E3FF] outline-none transition-all"
                                />
                              </div>
                              <div>
                                <label htmlFor="qt-dest-city" className="block text-sm font-medium text-[#111827] mb-1">
                                  UK Destination City/Port <span className="text-[#DC2626]">*</span>
                                </label>
                                <input
                                  id="qt-dest-city"
                                  type="text"
                                  required
                                  placeholder="e.g. Felixstowe, London, Birmingham"
                                  className="w-full h-12 px-4 rounded-lg border border-[#E5E7EB] text-[#111827] placeholder-[#9CA3AF] focus:border-[#1A6DFF] focus:ring-2 focus:ring-[#D4E3FF] outline-none transition-all"
                                  aria-required="true"
                                />
                              </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <label htmlFor="qt-freight-mode" className="block text-sm font-medium text-[#111827] mb-1">
                                  Freight Mode <span className="text-[#DC2626]">*</span>
                                </label>
                                <select
                                  id="qt-freight-mode"
                                  required
                                  defaultValue=""
                                  className="w-full h-12 px-4 rounded-lg border border-[#E5E7EB] text-[#111827] focus:border-[#1A6DFF] focus:ring-2 focus:ring-[#D4E3FF] outline-none transition-all bg-white"
                                  aria-required="true"
                                >
                                  {freightModes.map((m) => (
                                    <option key={m.value} value={m.value}>{m.label}</option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <label htmlFor="qt-incoterms" className="block text-sm font-medium text-[#111827] mb-1">
                                  Incoterms
                                </label>
                                <select
                                  id="qt-incoterms"
                                  defaultValue=""
                                  className="w-full h-12 px-4 rounded-lg border border-[#E5E7EB] text-[#111827] focus:border-[#1A6DFF] focus:ring-2 focus:ring-[#D4E3FF] outline-none transition-all bg-white"
                                >
                                  {incoterms.map((inc) => (
                                    <option key={inc.value} value={inc.value}>{inc.label}</option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            <div>
                              <label htmlFor="qt-cargo" className="block text-sm font-medium text-[#111827] mb-1">
                                Cargo Description <span className="text-[#DC2626]">*</span>
                              </label>
                              <textarea
                                id="qt-cargo"
                                rows={3}
                                required
                                placeholder="Describe your cargo — type, quantity, packaging, HS code if known..."
                                className="w-full px-4 py-3 rounded-lg border border-[#E5E7EB] text-[#111827] placeholder-[#9CA3AF] focus:border-[#1A6DFF] focus:ring-2 focus:ring-[#D4E3FF] outline-none transition-all resize-vertical"
                                aria-required="true"
                              />
                            </div>

                            <div className="grid md:grid-cols-3 gap-4">
                              <div>
                                <label htmlFor="qt-weight" className="block text-sm font-medium text-[#111827] mb-1">
                                  Weight (kg) <span className="text-[#DC2626]">*</span>
                                </label>
                                <input
                                  id="qt-weight"
                                  type="number"
                                  required
                                  min="0"
                                  placeholder="Total weight in kg"
                                  className="w-full h-12 px-4 rounded-lg border border-[#E5E7EB] text-[#111827] placeholder-[#9CA3AF] focus:border-[#1A6DFF] focus:ring-2 focus:ring-[#D4E3FF] outline-none transition-all"
                                  aria-required="true"
                                />
                              </div>
                              <div>
                                <label htmlFor="qt-volume" className="block text-sm font-medium text-[#111827] mb-1">
                                  Volume (CBM)
                                </label>
                                <input
                                  id="qt-volume"
                                  type="number"
                                  min="0"
                                  step="0.01"
                                  placeholder="Total volume"
                                  className="w-full h-12 px-4 rounded-lg border border-[#E5E7EB] text-[#111827] placeholder-[#9CA3AF] focus:border-[#1A6DFF] focus:ring-2 focus:ring-[#D4E3FF] outline-none transition-all"
                                />
                              </div>
                              <div>
                                <label htmlFor="qt-pallets" className="block text-sm font-medium text-[#111827] mb-1">
                                  No. of Pallets
                                </label>
                                <input
                                  id="qt-pallets"
                                  type="number"
                                  min="0"
                                  placeholder="Number of pallets"
                                  className="w-full h-12 px-4 rounded-lg border border-[#E5E7EB] text-[#111827] placeholder-[#9CA3AF] focus:border-[#1A6DFF] focus:ring-2 focus:ring-[#D4E3FF] outline-none transition-all"
                                />
                              </div>
                            </div>

                            <div>
                              <label htmlFor="qt-special" className="block text-sm font-medium text-[#111827] mb-1">
                                Special Requirements
                              </label>
                              <textarea
                                id="qt-special"
                                rows={2}
                                placeholder="Temperature control, fragile goods, hazardous materials, or any other special requirements..."
                                className="w-full px-4 py-3 rounded-lg border border-[#E5E7EB] text-[#111827] placeholder-[#9CA3AF] focus:border-[#1A6DFF] focus:ring-2 focus:ring-[#D4E3FF] outline-none transition-all resize-vertical"
                              />
                            </div>
                          </>
                        ) : (
                          /* Step 2: Your Details */
                          <>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <label htmlFor="qt-name" className="block text-sm font-medium text-[#111827] mb-1">
                                  Full Name <span className="text-[#DC2626]">*</span>
                                </label>
                                <input
                                  id="qt-name"
                                  type="text"
                                  required
                                  placeholder="Your full name"
                                  className="w-full h-12 px-4 rounded-lg border border-[#E5E7EB] text-[#111827] placeholder-[#9CA3AF] focus:border-[#1A6DFF] focus:ring-2 focus:ring-[#D4E3FF] outline-none transition-all"
                                  aria-required="true"
                                />
                              </div>
                              <div>
                                <label htmlFor="qt-email" className="block text-sm font-medium text-[#111827] mb-1">
                                  Email <span className="text-[#DC2626]">*</span>
                                </label>
                                <input
                                  id="qt-email"
                                  type="email"
                                  required
                                  placeholder="your@email.com"
                                  className="w-full h-12 px-4 rounded-lg border border-[#E5E7EB] text-[#111827] placeholder-[#9CA3AF] focus:border-[#1A6DFF] focus:ring-2 focus:ring-[#D4E3FF] outline-none transition-all"
                                  aria-required="true"
                                />
                              </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <label htmlFor="qt-email" className="block text-sm font-medium text-[#111827] mb-1">
                                  Email <span className="text-[#DC2626]">*</span>
                                </label>
                                <input
                                  id="qt-email"
                                  type="email"
                                  required
                                  placeholder="Your email address"
                                  className="w-full h-12 px-4 rounded-lg border border-[#E5E7EB] text-[#111827] placeholder-[#9CA3AF] focus:border-[#1A6DFF] focus:ring-2 focus:ring-[#D4E3FF] outline-none transition-all"
                                  aria-required="true"
                                />
                              </div>
                              <div>
                                <label htmlFor="qt-company" className="block text-sm font-medium text-[#111827] mb-1">
                                  Company Name
                                </label>
                                <input
                                  id="qt-company"
                                  type="text"
                                  placeholder="Your Company Ltd"
                                  className="w-full h-12 px-4 rounded-lg border border-[#E5E7EB] text-[#111827] placeholder-[#9CA3AF] focus:border-[#1A6DFF] focus:ring-2 focus:ring-[#D4E3FF] outline-none transition-all"
                                />
                              </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <label htmlFor="qt-eori" className="block text-sm font-medium text-[#111827] mb-1">
                                  EORI Number
                                </label>
                                <input
                                  id="qt-eori"
                                  type="text"
                                  placeholder="GB EORI number (if known)"
                                  className="w-full h-12 px-4 rounded-lg border border-[#E5E7EB] text-[#111827] placeholder-[#9CA3AF] focus:border-[#1A6DFF] focus:ring-2 focus:ring-[#D4E3FF] outline-none transition-all"
                                />
                              </div>
                              <div>
                                <label htmlFor="qt-hear" className="block text-sm font-medium text-[#111827] mb-1">
                                  How Did You Hear About Us?
                                </label>
                                <select
                                  id="qt-hear"
                                  defaultValue=""
                                  className="w-full h-12 px-4 rounded-lg border border-[#E5E7EB] text-[#111827] focus:border-[#1A6DFF] focus:ring-2 focus:ring-[#D4E3FF] outline-none transition-all bg-white"
                                >
                                  {hearAbout.map((h) => (
                                    <option key={h.value} value={h.value}>{h.label}</option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </>
                        )}

                        {/* Navigation buttons */}
                        <div className="flex gap-4 pt-4">
                          {step === 2 && (
                            <button
                              type="button"
                              onClick={handleBack}
                              className="inline-flex items-center justify-center gap-2 bg-white text-[#4B5563] border border-[#E5E7EB] px-6 py-3 rounded-lg font-semibold hover:bg-[#F8FAFC] transition-colors min-h-[44px]"
                            >
                              <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Back
                            </button>
                          )}
                          <button
                            type="submit"
                            className={`inline-flex items-center justify-center gap-2 bg-[#1A6DFF] hover:bg-[#1557CC] text-white px-6 py-3 rounded-lg font-bold transition-colors min-h-[44px] ${step === 1 ? 'w-full' : 'flex-1'}`}
                          >
                            {step === 1 ? (
                              <>Next Step <ArrowRight className="w-4 h-4" aria-hidden="true" /></>
                            ) : (
                              <><Send className="w-4 h-4" aria-hidden="true" /> Submit Quote Request</>
                            )}
                          </button>
                        </div>

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

        {/* ====== WHAT HAPPENS NEXT ====== */}
        {!submitted && (
          <section aria-labelledby="next-heading" className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 id="next-heading" className="text-3xl font-extrabold text-[#111827] text-center mb-10">
                What Happens After You Submit?
              </h2>
              <ol className="grid md:grid-cols-4 gap-6">
                {whatHappensNext.map((item) => (
                  <li key={item.step} className="text-center">
                    <div className="w-12 h-12 bg-[#1A6DFF] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                      {item.step}
                    </div>
                    <h3 className="font-bold text-[#111827]">{item.title}</h3>
                    <p className="text-sm text-[#4B5563] mt-1">{item.desc}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}

        {/* ====== CTA BANNER ====== */}
        {!submitted && (
          <section aria-label="Contact us" className="py-16 bg-[#1A6DFF] text-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-extrabold mb-4">Need Help With Your Quote?</h2>
              <p className="text-[#D4E3FF] text-lg mb-8">
                Not sure about freight mode, Incoterms, or cargo details? Our team is happy to help — email us at info@carrgo.co.uk.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="mailto:info@carrgo.co.uk"
                  className="inline-flex items-center gap-2 bg-white text-[#1A6DFF] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors min-h-[44px]"
                >
                  <Mail className="w-5 h-5" aria-hidden="true" /> Email Us Now
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-[#1557CC] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#1149AD] transition-colors min-h-[44px]"
                >
                  Contact Form
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
