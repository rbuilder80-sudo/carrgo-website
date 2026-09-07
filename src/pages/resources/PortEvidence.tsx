import { useEffect, useState } from 'react';
import Seo from '../../components/Seo';

interface Evidence {
  checkedOn: string;
  coverage: number;
  methodology: string;
  ports: { port: string; slug: string; sources: string[]; review: string }[];
  sources: { id: string; url: string; publisher: string; publishedOn: string | null; claim: string | null; validThrough?: string }[];
}

export default function PortEvidence() {
  const [evidence, setEvidence] = useState<Evidence | null>(null);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState('');
  useEffect(() => {
    const controller = new AbortController();
    fetch('/data/port-evidence/latest.json', { signal: controller.signal, cache: 'no-cache' })
      .then(response => { if (!response.ok) throw new Error('Evidence unavailable'); return response.json(); })
      .then(data => {
        if (!Array.isArray(data.ports) || !Array.isArray(data.sources) || data.coverage !== data.ports.length) throw new Error('Invalid evidence');
        setEvidence(data);
      })
      .catch(() => { if (!controller.signal.aborted) setError(true); });
    return () => controller.abort();
  }, []);
  const stale = evidence && Date.now() - Date.parse(evidence.checkedOn + 'T00:00:00Z') > 48 * 60 * 60 * 1000;
  return <main className="max-w-7xl mx-auto px-4 py-10">
    <Seo title="UK & Ireland Port Congestion Evidence | Carrgo"
      description="Port operating notices and evidence status for 17 UK and Ireland ports. Unverified waiting times, scores and forecasts are not presented as live measurements."
      canonical="https://www.carrgo.co.uk/resources/port-congestion-tracker/"
      ogUrl="https://www.carrgo.co.uk/resources/port-congestion-tracker/"
      ogImage="https://www.carrgo.co.uk/og-image.png" />
    <h1 className="text-3xl font-bold mb-4">UK &amp; Ireland Port Congestion Tracker</h1>
    <section aria-label="Data quality" className="border-l-4 border-amber-600 bg-amber-50 p-5 mb-6">
      <h2 className="text-xl font-semibold">Current congestion measurements are unverified</h2>
      <p className="mt-2">Previous scores, waiting times, forecasts and generated history are not validated operational observations. They have been withheld here. Unknown does not mean normal operations.</p>
      <p className="mt-2">Other Carrgo port-detail and comparison tools may still contain those unverified figures. Do not use them to make routing decisions.</p>
    </section>
    {error && <p role="alert">Evidence could not be loaded. Current conditions remain unknown. <a className="underline" href="/resources/uk-port-congestion-report/">Read the report data warning</a>.</p>}
    {!evidence && !error && <p role="status">Loading source evidence...</p>}
    {evidence && <>
      <p className="mb-6">Coverage: {evidence.coverage} ports. Evidence review: <time dateTime={evidence.checkedOn}>{evidence.checkedOn}</time>. Last verified numerical measurement: unknown.{stale && ' This evidence review is older than 48 hours; recheck all notices with the operator.'}</p>
      <h2 className="text-xl font-semibold mb-3">Dated operating notices</h2>
      <div className="space-y-4 mb-8">{evidence.sources.filter(source => source.claim).map(source => <article key={source.id} className="border-b pb-4">
        <h3 className="font-semibold">{source.publisher}: Liverpool</h3>
        <p className="my-2">{source.claim}</p>
        <p>Published {source.publishedOn}. Scheduled through {source.validThrough}. {source.validThrough && new Date().toISOString().slice(0, 10) > source.validThrough ? 'The stated period has ended; retained as historical evidence.' : 'Check with the operator for amendments.'}</p>
        <a className="underline text-blue-700" href={source.url}>Read the original notice</a>
      </article>)}</div>
      <label className="block font-semibold mb-2" htmlFor="port-search">Find a port</label>
      <input id="port-search" type="search" value={query} onChange={event => setQuery(event.target.value)} className="border rounded p-3 w-full max-w-md mb-4" />
      <div className="overflow-x-auto"><table className="w-full text-left border-collapse">
        <caption className="text-left mb-3">Evidence coverage, not a congestion ranking. Numeric metrics are unknown for every listed port.</caption>
        <thead><tr><th className="p-3 border-b" scope="col">Port</th><th className="p-3 border-b" scope="col">Evidence status</th><th className="p-3 border-b" scope="col">Primary sources</th></tr></thead>
        <tbody>{evidence.ports.filter(port => port.port.toLowerCase().includes(query.toLowerCase())).map(port => <tr key={port.slug}>
          <th className="p-3 border-b font-medium" scope="row">{port.port}</th><td className="p-3 border-b">{port.review}</td>
          <td className="p-3 border-b">{port.sources.length ? port.sources.map(id => { const source = evidence.sources.find(item => item.id === id); return source ? <a key={id} className="block underline text-blue-700" href={source.url}>{source.publisher}</a> : null; }) : 'Not reviewed'}</td>
        </tr>)}</tbody>
      </table></div>
      {!evidence.ports.some(port => port.port.toLowerCase().includes(query.toLowerCase())) && <p role="status" className="py-4">No matching ports.</p>}
      <section className="mt-8"><h2 className="text-xl font-semibold">Methodology and limitations</h2><p className="mt-2">{evidence.methodology}</p>
        <p className="mt-2"><a className="underline text-blue-700" href={'/data/port-evidence/' + evidence.checkedOn + '.json'}>Download this dated evidence record (JSON)</a></p>
      </section>
    </>}
    <nav aria-label="Related freight resources" className="flex flex-wrap gap-5 mt-8">
      <a className="underline text-blue-700" href="/resources/uk-port-congestion-report/">Weekly report and data warning</a>
      <a className="underline text-blue-700" href="/services/sea-freight/">Sea freight</a>
      <a className="underline text-blue-700" href="/services/customs-clearance/">Customs clearance</a>
      <a className="underline text-blue-700" href="/get-a-quote/">Discuss your shipment</a>
    </nav>
  </main>;
}
