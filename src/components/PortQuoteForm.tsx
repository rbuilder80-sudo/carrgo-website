import { useId } from 'react';

type Props = { title: string; destination: string; sourcePage: string };

function QuoteFields({ destination, sourcePage, suffix }: Omit<Props, 'title'> & { suffix: string }) {
  const dimensionsId = `dimensions-${suffix}`;
  const inputClass = 'min-h-11 rounded-lg border border-gray-300 px-3 text-base font-normal';
  return <form action="https://formsubmit.co/support@carrgo.co.uk" method="POST" className="grid gap-2.5">
    <input type="hidden" name="_subject" value="Port shipment quote request" /><input type="hidden" name="_template" value="table" /><input type="hidden" name="_captcha" value="false" /><input type="hidden" name="source_page" value={sourcePage} />
    <label className="grid gap-1 text-xs font-bold text-gray-700">Origin<input required name="origin" placeholder="City, country or supplier" className={inputClass} /></label>
    <label className="grid gap-1 text-xs font-bold text-gray-700">Destination<input required name="destination" defaultValue={destination} className={inputClass} /></label>
    <label className="grid gap-1 text-xs font-bold text-gray-700">Goods<input required name="goods" placeholder="Furniture, cartons, machinery" className={inputClass} /></label>
    <label className="grid gap-1 text-xs font-bold text-gray-700">Approximate weight / volume<input required name="weight_volume" placeholder="600 kg / 4 CBM" className={inputClass} /></label>
    <label className="grid gap-1 text-xs font-bold text-gray-700">Dimensions<input name="dimensions" list={dimensionsId} placeholder="Size or I’m not sure" className={inputClass} /><datalist id={dimensionsId}><option value="I’m not sure" /></datalist></label>
    <label className="grid gap-1 text-xs font-bold text-gray-700">Name<input required name="name" autoComplete="name" className={inputClass} /></label>
    <label className="grid gap-1 text-xs font-bold text-gray-700">Email<input required name="email" type="email" autoComplete="email" className={inputClass} /></label>
    <label className="grid gap-1 text-xs font-bold text-gray-700">Phone / WhatsApp<input name="phone" type="tel" autoComplete="tel" className={inputClass} /></label>
    <button type="submit" className="min-h-12 rounded-lg bg-[#1A6DFF] px-4 font-extrabold text-white hover:bg-[#1557CC]">Request a freight quote</button>
  </form>;
}

export default function PortQuoteForm({ title, destination, sourcePage }: Props) {
  const id = useId().replace(/:/g, '');
  return <div id="quick-quote">
    <aside className="fixed right-4 top-24 z-40 hidden max-h-[calc(100vh-7rem)] w-80 overflow-auto rounded-2xl border border-gray-200 bg-white p-4 shadow-2xl xl:block" aria-label="Quick freight quote"><p className="m-0 text-[11px] font-extrabold uppercase tracking-wider text-[#1A6DFF]">2-minute quote</p><h2 className="mb-2 mt-1 text-xl font-extrabold text-gray-900">{title}</h2><p className="mb-4 text-xs leading-relaxed text-gray-600">Send the basics now. Carrgo can ask for extra shipment details after your enquiry arrives.</p><QuoteFields destination={destination} sourcePage={sourcePage} suffix={`${id}-desktop`} /></aside>
    <details className="fixed bottom-3 left-3 right-3 z-40 max-h-[82vh] overflow-auto rounded-2xl border border-gray-200 bg-white shadow-2xl xl:hidden"><summary className="flex min-h-14 cursor-pointer list-none items-center justify-between rounded-2xl bg-[#1A6DFF] px-4 text-white"><strong>{title}</strong><span className="rounded-lg bg-white px-3 py-2 text-sm font-extrabold text-[#1A6DFF]">Open</span></summary><div className="p-4"><p className="mb-4 text-sm text-gray-600">Send the basics now; extra details can come later.</p><QuoteFields destination={destination} sourcePage={sourcePage} suffix={`${id}-mobile`} /></div></details>
  </div>;
}
