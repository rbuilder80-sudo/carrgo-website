import { useEffect, useState } from 'react';
import Seo from '../../components/Seo';
import { submitToFormspree, trackLead, type FormDeliveryMethod } from '../../lib/formConfig';

interface EvidenceSource {
  id: string;
  url: string;
  publisher: string;
  publishedOn: string | null;
  publishedAt?: string | null;
  checkedAt?: string | null;
  kind: string;
  confidence: string;
  claim: string | null;
  validThrough?: string;
}
interface EvidencePort {
  port: string;
  slug: string;
  sources: string[];
  review: string;
  observedAt?: string | null;
  confidence?: string;
  missingEvidence?: string;
}

interface Evidence {
  checkedOn: string;
  checkedAt?: string;
  measurementObservedAt: string | null;
  coverage: number;
  methodology: string;
  ports: EvidencePort[];
  sources: EvidenceSource[];
}

function QuickQuote({ id }: { id: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState<FormDeliveryMethod>('api');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(event.currentTarget);
    const fields: Record<string, string> = {};
    formData.forEach((value, key) => {
      fields[key] = String(value);
    });
    fields.source_page = '/resources/port-congestion-tracker/';
    fields.quote_invitation = 'Ask about your shipment through this port';
    fields.follow_up_note = 'Ask for shipment dates, Incoterms, HS code, packing list and customs details after this enquiry arrives.';

    const result = await submitToFormspree('Port Congestion Quote Request', fields);
    if (result.success) {
      const method = result.deliveryMethod || 'api';
      setDeliveryMethod(method);
      setSubmitted(true);
      trackLead('port_congestion_quote', method);
    } else {
      setError(result.error || 'Something went wrong. Please try again.');
    }
    setLoading(false);
  }

  if (submitted) {
    return (
      <div role="status" className="rounded-xl bg-green-50 border border-green-200 p-5">
        <h2 className="text-lg font-bold text-green-900">
          {deliveryMethod === 'email_client' ? 'Email app opened' : 'Enquiry received'}
        </h2>
        <p className="mt-2 text-sm text-green-800">
          {deliveryMethod === 'email_client'
            ? 'Press Send in your email app so Carrgo receives your shipment details.'
            : 'Carrgo will review the route and contact you for any extra shipment details.'}
        </p>
      </div>
    );
  }

  const fieldClass = 'min-h-[44px] w-full rounded-lg border border-slate-300 px-3 py-2 text-base text-slate-900';
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
      <p className="text-xs font-extrabold uppercase tracking-widest text-[#1A6DFF]">2-minute quote</p>
      <h2 className="mt-1 text-xl font-extrabold text-slate-900">Ask about your shipment through this port</h2>
      <p className="mt-2 text-sm text-slate-600">Send the basics now. We will ask for extra shipment details after your enquiry arrives.</p>
      <form className="mt-4 grid gap-3" onSubmit={handleSubmit}>
        <label className="grid gap-1 text-sm font-semibold" htmlFor={id + '-origin'}>Origin
          <input className={fieldClass} id={id + '-origin'} name="origin" required placeholder="City, country or supplier" />
        </label>
        <label className="grid gap-1 text-sm font-semibold" htmlFor={id + '-destination'}>Destination
          <input className={fieldClass} id={id + '-destination'} name="destination" required defaultValue="UK or Ireland port" placeholder="UK address, city or port" />
        </label>
        <label className="grid gap-1 text-sm font-semibold" htmlFor={id + '-goods'}>Goods
          <input className={fieldClass} id={id + '-goods'} name="goods" required placeholder="Furniture, cartons, machinery" />
        </label>
        <label className="grid gap-1 text-sm font-semibold" htmlFor={id + '-weight'}>Approximate weight / volume
          <input className={fieldClass} id={id + '-weight'} name="weight_volume" required placeholder="600 kg / 4 CBM" />
        </label>
        <label className="grid gap-1 text-sm font-semibold" htmlFor={id + '-dimensions'}>Dimensions
          <input className={fieldClass} id={id + '-dimensions'} name="dimensions" placeholder="Enter dimensions or “I’m not sure”" />
        </label>
        <label className="grid gap-1 text-sm font-semibold" htmlFor={id + '-name'}>Name
          <input className={fieldClass} id={id + '-name'} name="name" autoComplete="name" required placeholder="Your name" />
        </label>
        <label className="grid gap-1 text-sm font-semibold" htmlFor={id + '-email'}>Email
          <input className={fieldClass} id={id + '-email'} name="email" type="email" autoComplete="email" required placeholder="you@example.com" />
        </label>
        <label className="grid gap-1 text-sm font-semibold" htmlFor={id + '-phone'}>Phone / WhatsApp
          <input className={fieldClass} id={id + '-phone'} name="phone" type="tel" autoComplete="tel" placeholder="Best number to contact you" />
        </label>
        {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
        <button type="submit" disabled={loading} className="min-h-[46px] rounded-lg bg-[#1A6DFF] px-4 py-3 font-bold text-white disabled:opacity-60">
          {loading ? 'Sending…' : 'Request a freight quote'}
        </button>
      </form>
    </div>
  );
}

export default function PortCongestion() {
  const [evidence, setEvidence] = useState<Evidence | null>(null);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    fetch('/data/port-evidence/latest.json', { signal: controller.signal, cache: 'no-cache' })
      .then(response => {
        if (!response.ok) throw new Error('Evidence unavailable');
        return response.json();
      })
      .then(data => {
        if (!Array.isArray(data.ports) || !Array.isArray(data.sources) || data.coverage !== data.ports.length) {
          throw new Error('Invalid evidence');
        }
        setEvidence(data);
      })
      .catch(() => {
        if (!controller.signal.aborted) setError(true);
      });
    return () => controller.abort();
  }, []);

  const matchingPorts = evidence?.ports.filter(port =>
    port.port.toLowerCase().includes(query.toLowerCase())
  ) || [];

  return (
    <>
      <Seo
        title="UK & Ireland Port Congestion Evidence | Carrgo"
        description="Dated primary-source port operating notices for 17 UK and Ireland ports. Unverified waiting times, scores and forecasts are shown as unknown."
        canonical="https://www.carrgo.co.uk/resources/port-congestion-tracker/"
        ogUrl="https://www.carrgo.co.uk/resources/port-congestion-tracker/"
        ogImage="https://www.carrgo.co.uk/og-image.png"
      />
      <div className="mx-auto max-w-7xl px-4 py-10 lg:pr-[360px]">
        <h1 className="text-3xl font-extrabold text-slate-900">UK &amp; Ireland Port Congestion Tracker</h1>
        <p className="mt-3 max-w-3xl text-slate-600">
          Dated operating notices and evidence status for import planning. This is a public-source review, not an AIS feed.
        </p>

        <section aria-label="Data quality" className="my-6 border-l-4 border-amber-600 bg-amber-50 p-5">
          <h2 className="text-xl font-bold text-slate-900">Current congestion measurements are unverified</h2>
          <p className="mt-2">Previous scores, waiting times, vessel queues, berth utilisation, forecasts and generated history are not validated operational observations. They are withheld. Unknown does not mean normal operations.</p>
          <p className="mt-2">Other Carrgo port-detail and comparison pages may still contain legacy figures. Do not use them for routing decisions.</p>
        </section>

        {error && (
          <p role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4">
            Evidence could not be loaded. Current measured conditions remain unknown.{' '}
            <a className="underline text-blue-700" href="/resources/uk-port-congestion-report/">Read the report status</a>.
          </p>
        )}
        {!evidence && !error && <p role="status">Loading source evidence…</p>}

        {evidence && (
          <>
            <p className="mb-6">
              Coverage: {evidence.coverage} ports. Last checked:{' '}
              <time dateTime={evidence.checkedAt || evidence.checkedOn}>{evidence.checkedAt || evidence.checkedOn}</time>.
              {' '}Last measured: {evidence.measurementObservedAt || 'unknown'}.
            </p>

            <h2 className="mb-3 text-2xl font-bold">Dated operating and weather notices</h2>
            <div className="mb-8 space-y-4">
              {evidence.sources.filter(source => source.claim).map(source => {
                const locations = evidence.ports
                  .filter(port => port.sources.includes(source.id))
                  .map(port => port.port)
                  .join(', ');
                const expired = Boolean(source.validThrough && evidence.checkedAt && Date.parse(source.validThrough) < Date.parse(evidence.checkedAt));
                return (
                  <article key={source.id} className="rounded-xl border border-slate-200 p-4">
                    <h3 className="font-bold">{source.publisher}{locations ? ': ' + locations : ''}</h3>
                    <p className="my-2">{source.claim}</p>
                    <p className="text-sm text-slate-600">
                      Published: {source.publishedAt || source.publishedOn || 'time unavailable'}.
                      {' '}Status at check: {expired ? 'stated period ended; retained as historical evidence' : 'check with the operator for amendments'}.
                    </p>
                    <p className="mt-1 text-sm text-slate-600">Confidence: {source.confidence}.</p>
                    <a className="mt-2 inline-block underline text-blue-700" href={source.url}>Read the original source</a>
                  </article>
                );
              })}
            </div>

            <label className="mb-2 block font-semibold" htmlFor="port-search">Find a port</label>
            <input
              id="port-search"
              type="search"
              value={query}
              onChange={event => setQuery(event.target.value)}
              className="mb-4 w-full max-w-md rounded-lg border border-slate-300 p-3"
              placeholder="Search 17 ports"
            />

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <caption className="mb-3 text-left">Evidence coverage, not a congestion ranking. Numerical metrics are unknown for every listed port.</caption>
                <thead>
                  <tr>
                    <th className="border-b p-3" scope="col">Port</th>
                    <th className="border-b p-3" scope="col">Metrics</th>
                    <th className="border-b p-3" scope="col">Evidence review</th>
                    <th className="border-b p-3" scope="col">Primary sources</th>
                  </tr>
                </thead>
                <tbody>
                  {matchingPorts.map(port => (
                    <tr key={port.slug}>
                      <th className="border-b p-3 font-semibold" scope="row">{port.port}</th>
                      <td className="border-b p-3">Unknown</td>
                      <td className="border-b p-3">{port.review}</td>
                      <td className="border-b p-3">
                        {port.sources.length
                          ? port.sources.map(id => {
                              const source = evidence.sources.find(item => item.id === id);
                              return source ? <a key={id} className="block underline text-blue-700" href={source.url}>{source.publisher}</a> : null;
                            })
                          : 'Not reviewed'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {!matchingPorts.length && <p role="status" className="py-4">No matching ports.</p>}

            <section className="mt-8">
              <h2 className="text-xl font-bold">Methodology and limitations</h2>
              <p className="mt-2">{evidence.methodology}</p>
              <p className="mt-2">
                <a className="underline text-blue-700" href={'/data/port-evidence/' + evidence.checkedOn + '.json'}>
                  Download this dated evidence record (JSON)
                </a>
              </p>
            </section>
          </>
        )}

        <nav aria-label="Related freight resources" className="mt-8 flex flex-wrap gap-5">
          <a className="underline text-blue-700" href="/resources/uk-port-congestion-report/">Weekly report status</a>
          <a className="underline text-blue-700" href="/services/sea-freight/">Sea freight</a>
          <a className="underline text-blue-700" href="/services/customs-clearance/">Customs clearance</a>
          <a className="underline text-blue-700" href="/get-a-quote/">Discuss your shipment</a>
        </nav>
      </div>

      <aside className="fixed right-4 top-24 z-40 hidden w-[320px] max-h-[calc(100vh-112px)] overflow-auto lg:block" aria-label="Quick freight quote">
        <QuickQuote id="port-quote-desktop" />
      </aside>
      <details className="fixed bottom-3 left-3 right-3 z-40 max-h-[82vh] overflow-auto rounded-2xl border border-slate-200 bg-white shadow-2xl lg:hidden">
        <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between rounded-2xl bg-[#1A6DFF] px-4 py-3 font-bold text-white">
          <span>Ask about your shipment through this port</span>
          <span className="rounded-lg bg-white px-3 py-2 text-sm text-[#1A6DFF]">Open</span>
        </summary>
        <div className="p-3"><QuickQuote id="port-quote-mobile" /></div>
      </details>
    </>
  );
}
