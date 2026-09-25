import { useEffect, useId, useState } from 'react';
import { X, FileText } from 'lucide-react';

type Props = { title: string; destination: string; sourcePage: string; origin?: string };

function QuoteFields({ destination, sourcePage, origin, suffix, onSubmitted }: Omit<Props, 'title'> & { suffix: string; onSubmitted?: () => void }) {
  const dimensionsId = `dimensions-${suffix}`;
  const inputClass = 'min-h-11 rounded-lg border border-gray-300 px-3 text-base font-normal focus:border-[#1A6DFF] focus:outline-none focus:ring-2 focus:ring-[#1A6DFF]/20';

  return (
    <form
      action="https://formsubmit.co/support@carrgo.co.uk"
      method="POST"
      className="grid gap-2.5"
      onSubmit={onSubmitted}
    >
      <input type="hidden" name="_subject" value="Quick freight quote request" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="source_page" value={sourcePage} />

      <label className="grid gap-1 text-xs font-bold text-gray-700">
        Origin
        <input required name="origin" defaultValue={origin} placeholder="City, country or supplier" className={inputClass} />
      </label>
      <label className="grid gap-1 text-xs font-bold text-gray-700">
        Destination
        <input required name="destination" defaultValue={destination} className={inputClass} />
      </label>
      <label className="grid gap-1 text-xs font-bold text-gray-700">
        Goods
        <input required name="goods" placeholder="Furniture, cartons, machinery" className={inputClass} />
      </label>
      <label className="grid gap-1 text-xs font-bold text-gray-700">
        Approximate weight / volume
        <input required name="weight_volume" placeholder="600 kg / 4 CBM" className={inputClass} />
      </label>
      <label className="grid gap-1 text-xs font-bold text-gray-700">
        Dimensions
        <input name="dimensions" list={dimensionsId} placeholder="Size or I’m not sure" className={inputClass} />
        <datalist id={dimensionsId}><option value="I’m not sure" /></datalist>
      </label>
      <label className="grid gap-1 text-xs font-bold text-gray-700">
        Name
        <input required name="name" autoComplete="name" className={inputClass} />
      </label>
      <label className="grid gap-1 text-xs font-bold text-gray-700">
        Email
        <input required name="email" type="email" autoComplete="email" className={inputClass} />
      </label>
      <label className="grid gap-1 text-xs font-bold text-gray-700">
        Phone / WhatsApp
        <input name="phone" type="tel" autoComplete="tel" className={inputClass} />
      </label>
      <button type="submit" className="min-h-12 rounded-lg bg-[#1A6DFF] px-4 font-extrabold text-white transition-colors hover:bg-[#1557CC] focus:outline-none focus:ring-2 focus:ring-[#1A6DFF] focus:ring-offset-2">
        Request my freight quote
      </button>
      <p className="m-0 text-center text-[11px] leading-relaxed text-gray-500">
        No obligation. Send the basics now and we can collect any extra shipment details afterwards.
      </p>
    </form>
  );
}

export default function PortQuoteForm({ title, destination, sourcePage, origin }: Props) {
  const id = useId().replace(/:/g, '');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [sourcePage]);

  return (
    <div id="quick-quote">
      {/* Desktop: small floating trigger, no content-width penalty. */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 hidden min-h-12 items-center gap-2 rounded-full bg-[#1A6DFF] px-5 font-extrabold text-white shadow-xl transition hover:-translate-y-0.5 hover:bg-[#1557CC] focus:outline-none focus:ring-2 focus:ring-[#1A6DFF] focus:ring-offset-2 lg:inline-flex"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="desktop-quick-quote"
      >
        <FileText className="h-5 w-5" aria-hidden="true" />
        Get a Freight Quote
      </button>

      {/* Mobile: slim bottom bar with safe-area spacing. */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white/95 p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgba(15,23,42,0.10)] backdrop-blur lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#1A6DFF] px-4 font-extrabold text-white focus:outline-none focus:ring-2 focus:ring-[#1A6DFF] focus:ring-offset-2"
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls="mobile-quick-quote"
        >
          <FileText className="h-5 w-5" aria-hidden="true" />
          Get a Freight Quote
        </button>
      </div>

      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-slate-950/35 backdrop-blur-[1px]"
            onClick={() => setOpen(false)}
            aria-label="Close quick quote"
          />

          {/* Desktop slide-in panel. */}
          <aside
            id="desktop-quick-quote"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`quote-title-${id}-desktop`}
            className="fixed bottom-4 right-4 top-20 z-50 hidden w-[min(25rem,calc(100vw-2rem))] overflow-y-auto rounded-2xl border border-gray-200 bg-white p-5 shadow-2xl lg:block"
          >
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <p className="m-0 text-[11px] font-extrabold uppercase tracking-wider text-[#1A6DFF]">2-minute quote</p>
                <h2 id={`quote-title-${id}-desktop`} className="mb-1 mt-1 text-xl font-extrabold text-gray-900">{title}</h2>
                <p className="m-0 text-xs leading-relaxed text-gray-600">Send the basics without leaving this page.</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1A6DFF]"
                aria-label="Close quote form"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <QuoteFields origin={origin} destination={destination} sourcePage={sourcePage} suffix={`${id}-desktop`} />
          </aside>

          {/* Mobile bottom sheet. */}
          <section
            id="mobile-quick-quote"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`quote-title-${id}-mobile`}
            className="fixed inset-x-0 bottom-0 z-50 max-h-[90dvh] overflow-y-auto rounded-t-3xl bg-white p-4 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-2xl lg:hidden"
          >
            <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-gray-300" aria-hidden="true" />
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <p className="m-0 text-[11px] font-extrabold uppercase tracking-wider text-[#1A6DFF]">2-minute quote</p>
                <h2 id={`quote-title-${id}-mobile`} className="mb-1 mt-1 text-lg font-extrabold text-gray-900">{title}</h2>
                <p className="m-0 text-xs text-gray-600">Send the basics now; extra details can come later.</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#1A6DFF]"
                aria-label="Close quote form"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <QuoteFields origin={origin} destination={destination} sourcePage={sourcePage} suffix={`${id}-mobile`} />
          </section>
        </>
      )}
    </div>
  );
}
