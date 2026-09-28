import { Link, useLocation } from 'react-router-dom';
import Seo from '../components/Seo';

const pageNames: Record<string, string> = {
  '/results': 'Results page',
  '/resources/case-studies': 'Case studies page',
  '/resources/testimonials': 'Testimonials page',
};

export default function EvidenceCorrection() {
  const { pathname } = useLocation();
  const path = pathname.replace(/\/$/, '');
  const pageName = pageNames[path] || 'Client evidence page';
  const canonical = `https://www.carrgo.co.uk${path}`;

  return (
    <>
      <Seo
        title={`${pageName} correction | Carrgo`}
        description="Carrgo has withdrawn unverified client totals, ratings, testimonials and outcome figures pending source records and publication consent."
        canonical={canonical}
        ogUrl={canonical}
        noindex
      />

      <section className="bg-gray-50 py-16 lg:py-24" aria-labelledby="evidence-correction-heading">
        <div className="container-carrgo max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-700 mb-3">Evidence correction</p>
          <h1 id="evidence-correction-heading" className="text-3xl lg:text-5xl font-extrabold text-gray-900 mb-6">
            Unverified client claims withdrawn
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed mb-5">
            Carrgo has removed the client totals, ratings, named testimonials, case-study outcomes and performance figures previously shown at this URL. Source records and publication consent were not available for independent verification.
          </p>
          <p className="text-gray-700 leading-relaxed mb-8">
            This address remains available as a transparent correction record and is excluded from search indexing. No customer result or endorsement should be inferred from the earlier content.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/get-a-quote" className="inline-flex min-h-11 items-center rounded-lg bg-brand-800 px-6 py-3 font-semibold text-white hover:bg-brand-900">
              Request a freight quote
            </Link>
            <Link to="/resources/port-congestion-tracker" className="inline-flex min-h-11 items-center rounded-lg border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-800 hover:bg-gray-100">
              View Carrgo's evidence policy in practice
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
