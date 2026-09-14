import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, ChevronLeft, Info, Ship } from 'lucide-react';
import Seo from '../../components/Seo';
import PortQuoteForm from '../../components/PortQuoteForm';
import { allPorts } from '../../data/portData';

export default function PortComparison() {
  const [selectedSlugs, setSelectedSlugs] = useState<Set<string>>(new Set());
  const selectedPorts = useMemo(() => allPorts.filter((port) => selectedSlugs.has(port.slug)), [selectedSlugs]);

  const togglePort = (slug: string) => {
    setSelectedSlugs((previous) => {
      const next = new Set(previous);
      if (next.has(slug)) next.delete(slug);
      else if (next.size < 5) next.add(slug);
      return next;
    });
  };

  return (
    <>
      <Seo
        title="UK & Ireland Port Evidence Comparison | Carrgo"
        description="Compare evidence coverage for 17 UK and Ireland ports. Unverified waiting times, queues, berth utilisation, scores and forecasts are shown as unknown."
        keywords="UK port status evidence, Ireland port notices, port congestion evidence, shipping disruption notices"
        canonical="https://www.carrgo.co.uk/tools/port-comparison/"
      />
      <div className="xl:pr-[360px]">
        <section className="bg-[#1A6DFF] py-16 text-white lg:py-24" aria-labelledby="port-comparison-title">
          <div className="container-carrgo">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-100">Evidence-led tool</p>
            <h1 id="port-comparison-title" className="mb-5 text-4xl font-bold md:text-5xl">UK &amp; Ireland Port Evidence Comparison</h1>
            <p className="max-w-3xl text-lg leading-relaxed text-blue-50">Compare what Carrgo can substantiate for 17 ports. Numerical congestion measurements remain unknown unless a dated, traceable primary measurement is available.</p>
          </div>
        </section>
        <section className="bg-amber-50 py-8" aria-labelledby="measurement-warning">
          <div className="container-carrgo">
            <div className="flex max-w-4xl gap-4 rounded-xl border border-amber-200 bg-white p-5">
              <Info className="mt-0.5 h-6 w-6 shrink-0 text-amber-700" aria-hidden="true" />
              <div><h2 id="measurement-warning" className="font-bold text-gray-900">Current numerical measurements are unverified</h2><p className="mt-1 text-gray-700">Carrgo withholds untraceable health scores, vessel queues, waiting times, berth utilisation and forecasts. “Unknown” does not mean normal operations.</p></div>
            </div>
          </div>
        </section>
        <section className="bg-white py-12 lg:py-16" aria-labelledby="choose-ports">
          <div className="container-carrgo">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div><h2 id="choose-ports" className="text-2xl font-bold text-gray-900">Choose up to five ports</h2><p className="mt-1 text-gray-600">This compares evidence availability, not which port is “best”.</p></div>
              <button type="button" onClick={() => setSelectedSlugs(new Set())} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50">Clear selection</button>
            </div>
            <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {allPorts.map((port) => {
                const selected = selectedSlugs.has(port.slug);
                const disabled = !selected && selectedSlugs.size >= 5;
                return <button type="button" key={port.slug} onClick={() => togglePort(port.slug)} disabled={disabled} className={`relative rounded-xl border p-4 text-left transition ${selected ? 'border-[#1A6DFF] bg-blue-50' : 'border-gray-200 bg-white hover:border-blue-300'} disabled:cursor-not-allowed disabled:opacity-45`}>
                  {selected && <Check className="absolute right-3 top-3 h-4 w-4 text-[#1A6DFF]" aria-hidden="true" />}<Ship className="mb-2 h-5 w-5 text-[#1A6DFF]" aria-hidden="true" /><span className="block font-bold text-gray-900">{port.port}</span><span className="text-sm text-gray-500">{port.region}</span>
                </button>;
              })}
            </div>
            {selectedPorts.length > 0 ? <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="min-w-[720px] w-full text-left"><caption className="sr-only">Evidence availability for selected ports</caption><thead className="bg-gray-50 text-sm text-gray-600"><tr><th className="px-4 py-3">Port</th><th className="px-4 py-3">Area</th><th className="px-4 py-3">Current metrics</th><th className="px-4 py-3">Evidence</th><th className="px-4 py-3">Shipment help</th></tr></thead>
              <tbody className="divide-y divide-gray-100">{selectedPorts.map((port) => <tr key={port.slug}><th scope="row" className="px-4 py-4 font-bold text-gray-900">{port.port}</th><td className="px-4 py-4 text-gray-600">{port.country}</td><td className="px-4 py-4"><span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-700">Unknown</span></td><td className="px-4 py-4 text-sm text-gray-600">Check dated primary notices and limitations in the tracker.</td><td className="px-4 py-4"><Link className="font-semibold text-[#0B57D0]" to={`/ports/${port.slug}/`}>View {port.port}</Link></td></tr>)}</tbody></table>
            </div> : <p className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-6 text-center text-gray-600">Select one or more ports to compare evidence coverage.</p>}
          </div>
        </section>
        <section className="bg-[#F8FAFC] py-12" aria-labelledby="methodology">
          <div className="container-carrgo max-w-4xl"><h2 id="methodology" className="text-2xl font-bold text-gray-900">How this comparison works</h2><p className="mt-3 text-gray-700">Carrgo reviews public port, terminal, carrier and official transport or weather notices. A local closure or weather warning is not treated as a port-wide congestion measurement. Missing data remains unknown and no ranking or forecast is generated.</p>
            <div className="mt-6 flex flex-wrap gap-3"><Link to="/resources/port-congestion-tracker/" className="inline-flex items-center gap-2 rounded-lg bg-[#1A6DFF] px-5 py-3 font-semibold text-white">View current evidence <ArrowRight className="h-4 w-4" /></Link><Link to="/resources/uk-port-congestion-report/" className="rounded-lg border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-800">Read the Friday report</Link></div>
          </div>
        </section>
        <div className="container-carrgo py-8"><Link to="/resources/port-congestion-tracker/" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-[#1A6DFF]"><ChevronLeft className="h-4 w-4" /> Back to port evidence</Link></div>
      </div>
      <PortQuoteForm title="Ask about your shipment through a UK or Ireland port" destination="UK or Ireland port" sourcePage="/tools/port-comparison/" />
    </>
  );
}
