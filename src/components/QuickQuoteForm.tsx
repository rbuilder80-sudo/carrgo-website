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

  const formBody = (
    <form onSubmit={handleSubmit} className="space-y-3">
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
          <label className="block">
            <span className="text-xs font-semibold text-gray-800">Origin</span>
            <input name="origin" defaultValue={context.origin} required className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-base text-gray-900 focus:border-[#1A6DFF] focus:outline-none focus:ring-2 focus:ring-[#1A6DFF]/20" placeholder="City, country or supplier" />
          </label>
          <label className="block">
            <span className="text-xs font-semibold text-gray-800">Destination</span>
            <input name="destination" defaultValue={context.destination} required className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-base text-gray-900 focus:border-[#1A6DFF] focus:outline-none focus:ring-2 focus:ring-[#1A6DFF]/20" placeholder="UK address, city or port" />
          </label>
          <label className="block">
            <span className="text-xs font-semibold text-gray-800">Goods</span>
            <input name="goods" required className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-base text-gray-900 focus:border-[#1A6DFF] focus:outline-none focus:ring-2 focus:ring-[#1A6DFF]/20" placeholder="Furniture, cartons, machinery" />
          </label>
          <label className="block">
            <span className="text-xs font-semibold text-gray-800">Approx weight / volume</span>
            <input name="weight_volume" required className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-base text-gray-900 focus:border-[#1A6DFF] focus:outline-none focus:ring-2 focus:ring-[#1A6DFF]/20" placeholder="600 kg / 4 CBM" />
          </label>
          <label className="block">
            <span className="text-xs font-semibold text-gray-800">Dimensions</span>
            <input name="dimensions" disabled={dimensionsUnknown} className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-base text-gray-900 disabled:bg-gray-100 disabled:text-gray-500 focus:border-[#1A6DFF] focus:outline-none focus:ring-2 focus:ring-[#1A6DFF]/20" placeholder="Pallet/carton size or CBM" />
          </label>
          <label className="flex items-center gap-2 text-xs text-gray-700">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-3">
            <label className="block">
              <span className="text-xs font-semibold text-gray-800">Name</span>
              <input name="name" required autoComplete="name" className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-base text-gray-900 focus:border-[#1A6DFF] focus:outline-none focus:ring-2 focus:ring-[#1A6DFF]/20" placeholder="Your name" />
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-gray-800">Email</span>
              <input name="email" type="email" required autoComplete="email" className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-base text-gray-900 focus:border-[#1A6DFF] focus:outline-none focus:ring-2 focus:ring-[#1A6DFF]/20" placeholder="you@example.com" />
            </label>
          </div>
          <label className="block">
            <span className="text-xs font-semibold text-gray-800">Phone / WhatsApp</span>
            <input name="phone" type="tel" autoComplete="tel" className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-base text-gray-900 focus:border-[#1A6DFF] focus:outline-none focus:ring-2 focus:ring-[#1A6DFF]/20" placeholder="Best number to contact you" />
          </label>
          {error && (
            <p className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700">
              {error} You can also email {SUPPORT_EMAIL}.
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex min-h-[46px] items-center justify-center gap-2 rounded-lg bg-[#1A6DFF] px-4 py-3 text-base font-bold text-white transition-colors hover:bg-[#1557CC] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? 'Sending...' : 'Get instant quote'}
            <Send className="w-4 h-4" aria-hidden="true" />
          </button>
        </>
      )}
    </form>
  );

  return (
    <>
      <style>{`
        @media (min-width: 1280px) {
          #main-content,
          footer {
            padding-right: 360px;
          }
        }
      `}</style>

      <aside
        id="quick-quote"
        data-quick-quote-placement="sticky-sidebar"
        className="hidden xl:block fixed right-4 top-24 z-40 w-[320px] max-h-[calc(100vh-7rem)] overflow-y-auto rounded-2xl border border-gray-200 bg-white p-4 shadow-2xl"
        aria-labelledby="quick-quote-heading"
      >
        <p className="mb-1 text-xs font-bold tracking-wider uppercase text-[#1A6DFF]">2-minute quote</p>
        <h2 id="quick-quote-heading" className="text-xl font-extrabold text-gray-900 leading-tight">
          {context.heading}
        </h2>
        <p className="mt-2 mb-4 text-xs text-gray-600 leading-relaxed">
          Send the basics now. We will ask for the extra shipment details after your enquiry arrives.
        </p>
        {formBody}
      </aside>

      <details
        className="xl:hidden fixed inset-x-3 bottom-3 z-40 rounded-2xl border border-gray-200 bg-white shadow-2xl open:max-h-[82vh] open:overflow-y-auto"
        data-quick-quote-placement="mobile-sticky"
      >
        <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-3 rounded-2xl bg-[#1A6DFF] px-4 py-3 text-white [&::-webkit-details-marker]:hidden">
          <span>
            <span className="block text-[11px] font-bold uppercase tracking-wider text-white/80">Quick enquiry</span>
            <span className="block text-base font-extrabold">{context.heading}</span>
          </span>
          <span className="shrink-0 rounded-lg bg-white px-3 py-2 text-sm font-bold text-[#1A6DFF]">Open</span>
        </summary>
        <div className="p-4">
          <p className="mb-3 text-sm text-gray-600">
            Send origin, destination, goods and contact details now. Extra shipment details can come later.
          </p>
          {formBody}
        </div>
      </details>

      <section className="sr-only" aria-labelledby="quick-quote-inline-heading">
        <h2 id="quick-quote-inline-heading">
          {context.heading}
        </h2>
        <p>
          Quick quote form available as a sticky sidebar on desktop and a sticky quote button on mobile.
        </p>
      </section>
    </>
  );
}
