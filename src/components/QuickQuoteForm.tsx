import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CheckCircle, Send } from 'lucide-react';
import { submitToFormspree, SUPPORT_EMAIL } from '../lib/formConfig';

type QuoteContext = {
  heading: string;
  origin: string;
  destination: string;
  context: string;
};

const routeContexts: Record<string, QuoteContext> = {
  '/routes/china-to-uk': {
    heading: 'Get a China-UK shipping quote',
    origin: 'China',
    destination: 'United Kingdom',
    context: 'China to UK route page',
  },
  '/routes/germany-to-uk': {
    heading: 'Get a Germany-UK shipping quote',
    origin: 'Germany',
    destination: 'United Kingdom',
    context: 'Germany to UK route page',
  },
  '/routes/netherlands-to-uk': {
    heading: 'Get a Netherlands-UK shipping quote',
    origin: 'Netherlands',
    destination: 'United Kingdom',
    context: 'Netherlands to UK route page',
  },
  '/routes/india-to-uk': {
    heading: 'Get an India-UK shipping quote',
    origin: 'India',
    destination: 'United Kingdom',
    context: 'India to UK route page',
  },
  '/routes/usa-to-uk': {
    heading: 'Get a USA-UK shipping quote',
    origin: 'United States',
    destination: 'United Kingdom',
    context: 'USA to UK route page',
  },
  '/routes/turkey-to-uk': {
    heading: 'Get a Turkey-UK shipping quote',
    origin: 'Turkey',
    destination: 'United Kingdom',
    context: 'Turkey to UK route page',
  },
  '/routes/uae-to-uk': {
    heading: 'Get a UAE-UK shipping quote',
    origin: 'United Arab Emirates',
    destination: 'United Kingdom',
    context: 'UAE to UK route page',
  },
  '/routes/spain-to-uk': {
    heading: 'Get a Spain-UK shipping quote',
    origin: 'Spain',
    destination: 'United Kingdom',
    context: 'Spain to UK route page',
  },
  '/routes/dublin-ireland': {
    heading: 'Get a Dublin-UK shipping quote',
    origin: 'Dublin, Ireland',
    destination: 'United Kingdom',
    context: 'Dublin to UK route page',
  },
  '/routes/belfast-northern-ireland': {
    heading: 'Get a Belfast-UK shipping quote',
    origin: 'Belfast, Northern Ireland',
    destination: 'Great Britain',
    context: 'Belfast to UK route page',
  },
};

const serviceHeadings: Array<[string, string]> = [
  ['/services/sea-freight', 'Get a sea freight quote'],
  ['/services/air-freight', 'Get an air freight quote'],
  ['/services/road-freight', 'Get a road freight quote'],
  ['/services/rail-freight-china-uk', 'Get a rail freight quote'],
  ['/services/customs-clearance', 'Ask about customs clearance'],
  ['/services/door-to-door', 'Get a door-to-door freight quote'],
  ['/services/amazon-fba-freight', 'Get an Amazon FBA freight quote'],
  ['/services/warehousing', 'Ask about warehousing and delivery'],
  ['/services/container-shipping', 'Get a container shipping quote'],
  ['/services/logistics', 'Get a logistics quote'],
];

const industryHeadings: Array<[string, string]> = [
  ['/industries/ecommerce', 'Get an ecommerce shipping quote'],
  ['/industries/manufacturing', 'Get a manufacturing freight quote'],
  ['/industries/retail', 'Get a retail freight quote'],
  ['/industries/automotive', 'Get an automotive freight quote'],
  ['/industries/construction', 'Get a construction freight quote'],
  ['/industries/electronics', 'Get an electronics freight quote'],
  ['/industries/medical', 'Get a medical freight quote'],
  ['/industries/furniture', 'Get a furniture shipping quote'],
];

const portNames: Record<string, string> = {
  felixstowe: 'Felixstowe',
  southampton: 'Southampton',
  'london-gateway': 'London Gateway',
  liverpool: 'Liverpool',
  bristol: 'Bristol',
  tilbury: 'Tilbury',
  immingham: 'Immingham',
  grangemouth: 'Grangemouth',
  holyhead: 'Holyhead',
  belfast: 'Belfast',
  larne: 'Larne',
  londonderry: 'Londonderry',
  dublin: 'Dublin',
  cork: 'Cork',
  'rosslare-europort': 'Rosslare Europort',
  'shannon-foynes': 'Shannon Foynes',
  waterford: 'Waterford',
};

function quoteContextForPath(pathname: string): QuoteContext {
  const path = pathname.replace(/\/$/, '') || '/';

  if (routeContexts[path]) return routeContexts[path];

  const portMatch = path.match(/^\/ports\/([^/]+)$/);
  if (portMatch && portNames[portMatch[1]]) {
    const port = portNames[portMatch[1]];
    return {
      heading: `Ask about your shipment through ${port}`,
      origin: '',
      destination: `${port} / UK delivery`,
      context: `${port} port page`,
    };
  }

  if (path.includes('/resources/port-congestion-tracker') || path.includes('/resources/uk-port-congestion-report')) {
    return {
      heading: 'Ask about your shipment through this port',
      origin: '',
      destination: 'UK or Ireland port',
      context: 'port delays resource',
    };
  }

  const service = serviceHeadings.find(([prefix]) => path.startsWith(prefix));
  if (service) {
    return { heading: service[1], origin: '', destination: 'United Kingdom', context: `${service[0]} page` };
  }

  const industry = industryHeadings.find(([prefix]) => path.startsWith(prefix));
  if (industry) {
    return { heading: industry[1], origin: '', destination: 'United Kingdom', context: `${industry[0]} page` };
  }

  return {
    heading: 'Get a quick freight quote',
    origin: '',
    destination: '',
    context: path === '/' ? 'homepage' : `${path} page`,
  };
}

export default function QuickQuoteForm() {
  const { pathname } = useLocation();
  const context = useMemo(() => quoteContextForPath(pathname), [pathname]);
  const [dimensionsUnknown, setDimensionsUnknown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const fields: Record<string, string> = {
      page_context: context.context,
      source_page: window.location.href,
      follow_up_note: 'Initial mobile quote enquiry. Ask for shipment dates, Incoterms, HS code, packing list and customs details after this enquiry arrives.',
    };

    formData.forEach((value, key) => {
      fields[key] = String(value);
    });

    if (dimensionsUnknown) {
      fields.dimensions = "I'm not sure";
      fields.dimensions_unknown = 'Yes';
    }

    const result = await submitToFormspree('Quick Quote Enquiry', fields);
    if (result.success) {
      setSuccess(true);
      e.currentTarget.reset();
      setDimensionsUnknown(false);
    } else {
      setError(result.error || 'Please email us and we will pick this up manually.');
    }
    setLoading(false);
  }

  return (
    <section id="quick-quote" className="bg-white py-10 sm:py-12 border-t border-gray-200" aria-labelledby="quick-quote-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-6 lg:gap-8 items-start">
          <div>
            <p className="text-xs font-semibold tracking-wider uppercase text-[#1A6DFF] mb-2">Quick enquiry</p>
            <h2 id="quick-quote-heading" className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
              {context.heading}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
              Send the basics now. We will ask for the extra shipment details after your enquiry arrives.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-gray-50 border border-gray-200 rounded-xl p-4 sm:p-5 shadow-sm">
            {success ? (
              <div className="flex gap-3 rounded-lg bg-green-50 border border-green-200 p-4 text-green-800">
                <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="font-semibold">Enquiry sent.</p>
                  <p className="text-sm">Carrgo will review the route, goods and contact details, then ask for anything else needed.</p>
                </div>
              </div>
            ) : (
              <>
                <input type="hidden" name="quote_invitation" value={context.heading} />
                <div className="grid sm:grid-cols-2 gap-3">
                  <label className="block">
                    <span className="text-sm font-medium text-gray-800">Origin</span>
                    <input name="origin" defaultValue={context.origin} required className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-base text-gray-900 focus:border-[#1A6DFF] focus:outline-none focus:ring-2 focus:ring-[#1A6DFF]/20" placeholder="City, country or supplier location" />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-gray-800">Destination</span>
                    <input name="destination" defaultValue={context.destination} required className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-base text-gray-900 focus:border-[#1A6DFF] focus:outline-none focus:ring-2 focus:ring-[#1A6DFF]/20" placeholder="UK address, city or port" />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="text-sm font-medium text-gray-800">Goods</span>
                    <input name="goods" required className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-base text-gray-900 focus:border-[#1A6DFF] focus:outline-none focus:ring-2 focus:ring-[#1A6DFF]/20" placeholder="Example: furniture, cartons, machinery" />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-gray-800">Approx weight / volume</span>
                    <input name="weight_volume" required className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-base text-gray-900 focus:border-[#1A6DFF] focus:outline-none focus:ring-2 focus:ring-[#1A6DFF]/20" placeholder="Example: 600 kg / 4 CBM" />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-gray-800">Dimensions</span>
                    <input name="dimensions" disabled={dimensionsUnknown} className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-base text-gray-900 disabled:bg-gray-100 disabled:text-gray-500 focus:border-[#1A6DFF] focus:outline-none focus:ring-2 focus:ring-[#1A6DFF]/20" placeholder="Pallet/carton size or CBM" />
                  </label>
                  <label className="sm:col-span-2 flex items-center gap-2 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      name="dimensions_not_sure"
                      value="Yes"
                      checked={dimensionsUnknown}
                      onChange={(e) => setDimensionsUnknown(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-[#1A6DFF] focus:ring-[#1A6DFF]"
                    />
                    I'm not sure about dimensions yet
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-gray-800">Name</span>
                    <input name="name" required autoComplete="name" className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-base text-gray-900 focus:border-[#1A6DFF] focus:outline-none focus:ring-2 focus:ring-[#1A6DFF]/20" placeholder="Your name" />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-gray-800">Email</span>
                    <input name="email" type="email" required autoComplete="email" className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-base text-gray-900 focus:border-[#1A6DFF] focus:outline-none focus:ring-2 focus:ring-[#1A6DFF]/20" placeholder="you@example.com" />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="text-sm font-medium text-gray-800">Phone / WhatsApp</span>
                    <input name="phone" type="tel" autoComplete="tel" className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-base text-gray-900 focus:border-[#1A6DFF] focus:outline-none focus:ring-2 focus:ring-[#1A6DFF]/20" placeholder="Best number to contact you" />
                  </label>
                </div>
                {error && (
                  <p className="mt-3 rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700">
                    {error} You can also email {SUPPORT_EMAIL}.
                  </p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-4 w-full sm:w-auto inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-[#1A6DFF] px-5 py-3 text-base font-semibold text-white transition-colors hover:bg-[#1557CC] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? 'Sending...' : 'Send quick quote enquiry'}
                  <Send className="w-4 h-4" aria-hidden="true" />
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
