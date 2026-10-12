import { useEffect, useState } from 'react';
import { FileText, X, CheckCircle } from 'lucide-react';
import { submitToFormspree, trackLead } from '../lib/formConfig';

type Props = { title: string; destination: string; sourcePage: string; origin?: string };
const input = 'w-full min-h-11 rounded-lg border border-gray-300 bg-white px-3 text-base focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200';
const label = 'block text-sm font-semibold text-gray-800 mb-1';
const initial = { mode: 'sea', load: 'FCL', equipment: '40HC', origin: '', destination: '', cargo: '', weight: '', name: '', email: '', phone: '' };

export default function PortQuoteForm({ title, destination, sourcePage, origin }: Props) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [values, setValues] = useState({ ...initial, origin: origin || '', destination });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);
  const change = (key: keyof typeof initial, value: string) => setValues(v => ({ ...v, [key]: value }));
  useEffect(() => { setOpen(false); setStep(1); setSent(false); setValues({ ...initial, origin: origin || '', destination }); }, [sourcePage, origin, destination]);
  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, [open]);
  async function send(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    setBusy(true); setError('');
    const result = await submitToFormspree('Quick Freight Quote', {
      ...values, source_page: window.location.href,
      shipment_priority: values.load === 'FCL' || values.load === 'FTL' ? 'Full load' : 'Part load'
    });
    setBusy(false);
    if (result.success) { setSent(true); trackLead('quick_quote', result.deliveryMethod); }
    else setError(result.error || 'Unable to send. Please email support@carrgo.co.uk.');
  }
  return <div id="quick-quote">
    <button type="button" onClick={() => setOpen(true)} className="fixed bottom-5 right-5 z-40 hidden min-h-12 items-center gap-2 rounded-full bg-[#1A6DFF] px-5 font-bold text-white shadow-xl hover:bg-[#1557CC] lg:inline-flex"><FileText size={19}/> Get a Freight Quote</button>
    <div className="fixed inset-x-0 bottom-0 z-40 bg-white/95 p-2 shadow-lg lg:hidden"><button type="button" onClick={() => setOpen(true)} className="min-h-12 w-full rounded-xl bg-[#1A6DFF] font-bold text-white">Get a Freight Quote</button></div>
    {open && <>
      <button type="button" onClick={() => setOpen(false)} aria-label="Close quick quote" className="fixed inset-0 z-40 bg-slate-950/40"/>
      <section role="dialog" aria-modal="true" aria-label={title} className="fixed inset-x-2 bottom-2 top-6 z-50 overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:inset-x-auto sm:bottom-5 sm:right-5 sm:top-12 sm:w-[430px]">
        <div className="mb-4 flex items-start justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-wider text-blue-600">Free, no-obligation quote</p><h2 className="text-xl font-extrabold text-gray-900">{title}</h2><p className="text-sm text-gray-600">Quick details now; we can confirm the rest later.</p></div><button type="button" aria-label="Close quote form" onClick={() => setOpen(false)} className="rounded-full p-2 hover:bg-gray-100"><X/></button></div>
        {sent ? <div role="status" className="space-y-3 py-8 text-center"><CheckCircle className="mx-auto text-green-600" size={44}/><h3 className="text-xl font-bold">Request submitted</h3><p>Thank you. We will review your shipment and reply using your contact details.</p><p className="text-sm">If you do not hear back, email support@carrgo.co.uk.</p></div> :
        <form onSubmit={send} className="space-y-3">
          <p className="text-xs font-semibold text-gray-500">Step {step} of 2</p>
          {step === 1 ? <>
            <div><label className={label} htmlFor="quick-mode">Shipping method</label><select id="quick-mode" className={input} value={values.mode} onChange={e => {change('mode',e.target.value); change('load',e.target.value==='road'?'FTL':'FCL');}}><option value="sea">Sea freight</option><option value="road">Road freight</option><option value="air">Air freight</option><option value="rail">Rail freight</option><option value="unsure">Not sure — advise me</option></select></div>
            {(values.mode === 'sea' || values.mode === 'road' || values.mode === 'rail') && <div><label className={label} htmlFor="quick-load">Shipment size</label><select id="quick-load" className={input} value={values.load} onChange={e => change('load',e.target.value)}>{values.mode === 'road' ? <><option value="FTL">Full truckload (FTL) — recommended</option><option value="LTL">Part load (LTL)</option></> : <><option value="FCL">Full container load (FCL) — recommended</option><option value="LCL">Less than container load (LCL)</option></>}</select></div>}
            {(values.mode === 'sea' || values.mode === 'rail') && values.load === 'FCL' && <div><label className={label} htmlFor="quick-equipment">Container size</label><select id="quick-equipment" className={input} value={values.equipment} onChange={e => change('equipment',e.target.value)}><option value="40HC">40ft High Cube</option><option value="40GP">40ft Standard</option><option value="20GP">20ft Standard</option><option value="45HC">45ft High Cube</option><option value="unsure">Not sure</option></select></div>}
            <div><label className={label} htmlFor="quick-origin">Collection location *</label><input id="quick-origin" className={input} required value={values.origin} onChange={e=>change('origin',e.target.value)} placeholder="City, country or postcode"/></div>
            <div><label className={label} htmlFor="quick-destination">Delivery location *</label><input id="quick-destination" className={input} required value={values.destination} onChange={e=>change('destination',e.target.value)} placeholder="City, country or postcode"/></div>
            <button type="button" disabled={!values.origin.trim() || !values.destination.trim()} onClick={()=>setStep(2)} className="min-h-12 w-full rounded-lg bg-[#1A6DFF] font-bold text-white disabled:opacity-40">Next: cargo and contact →</button>
          </> : <>
            <div><label className={label} htmlFor="quick-cargo">What are you shipping? *</label><input id="quick-cargo" required className={input} value={values.cargo} onChange={e=>change('cargo',e.target.value)} placeholder="e.g. 20 pallets of clothing"/></div>
            <div><label className={label} htmlFor="quick-weight">Approx. weight / volume (optional)</label><input id="quick-weight" className={input} value={values.weight} onChange={e=>change('weight',e.target.value)} placeholder="e.g. 15,000 kg or 20 CBM"/></div>
            <div><label className={label} htmlFor="quick-name">Your name *</label><input id="quick-name" required className={input} autoComplete="name" value={values.name} onChange={e=>change('name',e.target.value)}/></div>
            <div><label className={label} htmlFor="quick-email">Email address *</label><input id="quick-email" type="email" required className={input} autoComplete="email" value={values.email} onChange={e=>change('email',e.target.value)}/></div>
            <div><label className={label} htmlFor="quick-phone">Phone / WhatsApp (optional)</label><input id="quick-phone" type="tel" className={input} autoComplete="tel" value={values.phone} onChange={e=>change('phone',e.target.value)}/></div>
            {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
            <div className="flex gap-2"><button type="button" onClick={()=>setStep(1)} className="min-h-12 rounded-lg border px-4 font-semibold">Back</button><button disabled={busy} type="submit" className="min-h-12 flex-1 rounded-lg bg-[#1A6DFF] px-4 font-bold text-white disabled:opacity-50">{busy ? 'Sending…' : 'Request my freight quote'}</button></div>
          </>}
          <p className="text-center text-xs text-gray-500">No obligation. We use your details only to respond to your enquiry.</p>
        </form>}
      </section>
    </>}
  </div>;
}
