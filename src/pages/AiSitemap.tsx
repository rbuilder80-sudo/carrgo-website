import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { Ship, Globe, FileText, Building2, ExternalLink } from 'lucide-react';

/* ── Page Data with Categories ── */
const servicePages = [
  { path: '/services/sea-freight', title: 'Sea Freight', desc: 'FCL & LCL container shipping worldwide to UK ports including Felixstowe, Southampton, and London Gateway.', modified: '2025-01-15' },
  { path: '/services/air-freight', title: 'Air Freight', desc: 'Express and economy air cargo from China, USA, UAE, and Europe to UK airports.', modified: '2025-01-15' },
  { path: '/services/road-freight', title: 'Road Freight', desc: 'FTL & LTL European haulage to and from the UK with daily departures and GPS tracking.', modified: '2025-01-15' },
  { path: '/services/rail-freight-china-uk', title: 'Rail Freight China to UK', desc: 'New Silk Road rail shipping — faster than sea (14-20 days), 40% cheaper than air.', modified: '2025-01-15' },
  { path: '/services/customs-clearance', title: 'Customs Clearance', desc: 'Authorised customs brokers handling all UK import and export declarations.', modified: '2025-01-15' },
  { path: '/services/door-to-door', title: 'Door-to-Door Freight', desc: 'Complete factory-to-warehouse forwarding with one quote and one invoice.', modified: '2025-01-15' },
  { path: '/services/amazon-fba-freight', title: 'Amazon FBA Freight', desc: 'FBA prep, labelling, and delivery to UK Amazon fulfilment centres including BHX4, EMA1, LBA1.', modified: '2025-01-15' },
  { path: '/services/warehousing', title: 'Warehousing', desc: 'Midlands storage with pick and pack, container devanning, bonded warehouse, and UK-wide distribution.', modified: '2025-01-15' },
];

const routePages = [
  { path: '/routes/china-to-uk', title: 'China to UK', desc: 'Sea 25-35 days, Air 3-5 days, Rail 14-20 days. Major Chinese ports to all UK ports.', modified: '2025-01-15' },
  { path: '/routes/germany-to-uk', title: 'Germany to UK', desc: 'Road 2-4 days, Sea 5-8 days, Air 1-2 days. Daily departures from major German cities.', modified: '2025-01-15' },
  { path: '/routes/netherlands-to-uk', title: 'Netherlands to UK', desc: 'Road 1-3 days, Sea 3-5 days, Air 1 day. Short-sea and road freight via Rotterdam.', modified: '2025-01-15' },
  { path: '/routes/india-to-uk', title: 'India to UK', desc: 'Sea 20-28 days, Air 3-5 days. Regular sailings from Mumbai, Chennai, and Mundra.', modified: '2025-01-15' },
  { path: '/routes/usa-to-uk', title: 'USA to UK', desc: 'Sea 10-15 days (east coast), Air 1-3 days. Transatlantic shipping from major US ports.', modified: '2025-01-15' },
  { path: '/routes/turkey-to-uk', title: 'Turkey to UK', desc: 'Sea 14-20 days, Road 5-7 days. Growing route for textiles, automotive, and manufacturing.', modified: '2025-01-15' },
  { path: '/routes/uae-to-uk', title: 'UAE to UK', desc: 'Sea 18-24 days, Air 2-4 days. Middle East shipping via Jebel Ali and Abu Dhabi.', modified: '2025-01-15' },
  { path: '/routes/spain-to-uk', title: 'Spain to UK', desc: 'Road 4-9 days, Sea 7-12 days. Road freight and short sea from Barcelona, Madrid, Valencia.', modified: '2025-01-15' },
  { path: '/routes/belfast-northern-ireland', title: 'Belfast & Northern Ireland', desc: 'Sea 8-14 hrs, Road 1-2 days. Full GB-NI freight with Windsor Framework customs support.', modified: '2025-01-15' },
  { path: '/routes/dublin-ireland', title: 'Dublin & Ireland', desc: 'Sea 8-14 hrs, Road 1-2 days. GB-IE freight with Irish customs clearance via RoRo ferry.', modified: '2025-01-15' },
];

const resourcePages = [
  { path: '/resources/port-congestion-tracker', title: 'Port Congestion Tracker', desc: 'Live UK port status for 18 ports including Felixstowe, Southampton, London Gateway, Belfast, and Dublin. Updated daily.', modified: '2025-01-15' },
  { path: '/resources/shipping-guides', title: 'Shipping Guides', desc: 'Comprehensive sea, air, road, rail, and customs shipping guides for UK importers.', modified: '2025-01-15' },
  { path: '/resources/container-size-guide', title: 'Container Size Guide', desc: '20ft, 40ft, 40ft HC container dimensions, capacity, weight limits, and loading guidance.', modified: '2025-01-15' },
  { path: '/resources/incoterms-guide', title: 'Incoterms Guide', desc: 'Full guide to all 11 Incoterms 2020 rules: EXW, FCA, CPT, CIP, DAP, DPU, DDP, FAS, FOB, CFR, CIF.', modified: '2025-01-15' },
  { path: '/resources/freight-faqs', title: 'Freight FAQs', desc: 'Answers to common freight forwarding questions about costs, transit times, documentation, and customs.', modified: '2025-01-15' },
  { path: '/resources/case-studies', title: 'Case Studies', desc: 'Success stories and metrics from UK importers using Carrgo freight services.', modified: '2025-01-15' },
  { path: '/resources/testimonials', title: 'Testimonials', desc: 'Reviews and feedback from satisfied UK importer clients.', modified: '2025-01-15' },
  { path: '/resources/industries', title: 'Industries', desc: 'Freight solutions tailored for furniture, e-commerce, automotive, construction, electronics, and fashion.', modified: '2025-01-15' },
  { path: '/resources/our-process', title: 'Our Process', desc: '5-step freight forwarding process from quote request to final delivery.', modified: '2025-01-15' },
  { path: '/resources/post-brexit-customs-guide', title: 'Post-Brexit Customs Guide', desc: 'Navigating UK customs after Brexit: EORI numbers, rules of origin, NI Protocol, Windsor Framework.', modified: '2025-01-15' },
];

const companyPages = [
  { path: '/', title: 'Homepage', desc: 'UK and Ireland freight forwarder. Sea, air, road, and rail shipping with all-inclusive quotes in 2 hours.', modified: '2025-01-15' },
  { path: '/about', title: 'About Carrgo', desc: 'Company story, mission, values, and team.', modified: '2025-01-15' },
  { path: '/results', title: 'Our Results', desc: 'Case studies, performance metrics, and success stories from UK importers.', modified: '2025-01-15' },
  { path: '/contact', title: 'Contact Us', desc: 'Get in touch with Carrgo via email, phone, or contact form for quotes and enquiries.', modified: '2025-01-15' },
  { path: '/get-a-quote', title: 'Get a Quote', desc: 'Free all-inclusive freight quote within 2 hours. No obligation.', modified: '2025-01-15' },
];

const legalPages = [
  { path: '/privacy', title: 'Privacy Policy', desc: 'GDPR-compliant privacy policy covering data collection, use, and protection.', modified: '2025-01-15' },
  { path: '/terms', title: 'Terms of Service', desc: 'Terms and conditions covering freight agreements, liability, insurance, and payment terms.', modified: '2025-01-15' },
];

/* ── Schema.org structured data for the sitemap page ── */
const sitemapSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Sitemap - Carrgo Freight Solutions',
  description: 'Complete sitemap of Carrgo Freight Solutions website. Browse all services, trade routes, resources, and company pages.',
  url: 'https://carrgo.co.uk/sitemap',
  isPartOf: {
    '@type': 'WebSite',
    name: 'Carrgo Freight Solutions',
    url: 'https://carrgo.co.uk',
  },
  hasPart: [
    ...servicePages.map(p => ({
      '@type': 'WebPage',
      name: p.title,
      description: p.desc,
      url: `https://carrgo.co.uk${p.path}`,
    })),
    ...routePages.map(p => ({
      '@type': 'WebPage',
      name: p.title,
      description: p.desc,
      url: `https://carrgo.co.uk${p.path}`,
    })),
    ...resourcePages.map(p => ({
      '@type': 'WebPage',
      name: p.title,
      description: p.desc,
      url: `https://carrgo.co.uk${p.path}`,
    })),
  ],
};

function PageTable({ pages }: { pages: typeof servicePages }) {
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-gray-200">
          <th scope="col" className="text-left py-2 px-3 font-semibold text-gray-700 w-[35%]">Page</th>
          <th scope="col" className="text-left py-2 px-3 font-semibold text-gray-700 w-[50%]">Description</th>
          <th scope="col" className="text-left py-2 px-3 font-semibold text-gray-700 w-[15%]">Last Updated</th>
        </tr>
      </thead>
      <tbody>
        {pages.map((page) => (
          <tr key={page.path} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
            <td className="py-2 px-3">
              <Link
                to={page.path}
                className="text-brand-700 font-medium hover:underline inline-flex items-center gap-1"
              >
                {page.title}
                <ExternalLink className="w-3 h-3 text-gray-400" aria-hidden="true" />
              </Link>
            </td>
            <td className="py-2 px-3 text-gray-600">{page.desc}</td>
            <td className="py-2 px-3 text-gray-500">
              <time dateTime={page.modified}>{page.modified}</time>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function AiSitemap() {
  const totalPages = servicePages.length + routePages.length + resourcePages.length + companyPages.length + legalPages.length;

  return (
    <>
      <Seo
        title="Sitemap | Carrgo Freight Solutions"
        description={`Complete sitemap of Carrgo Freight Solutions. Browse all ${totalPages} pages including services, trade routes, resources, and company information.`}
        ogUrl="https://carrgo.co.uk/sitemap"
        canonical="https://carrgo.co.uk/sitemap"
        structuredData={sitemapSchema}
      />

      <main role="main" itemScope itemType="https://schema.org/CollectionPage">
        <meta itemProp="name" content="Sitemap - Carrgo Freight Solutions" />
        <meta itemProp="description" content="Complete sitemap of all pages on the Carrgo Freight Solutions website." />

        {/* ─── Header ─── */}
        <section aria-label="Sitemap header" className="bg-gradient-to-br from-brand-900 to-brand-800 text-white py-12 lg:py-16">
          <div className="container-carrgo">
            <div className="max-w-3xl">
              <h1 className="text-3xl lg:text-4xl font-extrabold mb-4">
                Website Sitemap
              </h1>
              <p className="text-lg text-brand-100 leading-relaxed">
                A complete directory of all <strong className="text-white">{totalPages} pages</strong> on the Carrgo Freight Solutions website. Browse our freight services, trade routes, resources, and company information.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Quick Stats ─── */}
        <section aria-label="Sitemap statistics" className="py-8 bg-gray-50 border-b">
          <div className="container-carrgo">
            <dl className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
              <div className="bg-white rounded-lg p-4 border">
                <dt className="text-sm text-gray-500">Services</dt>
                <dd className="text-2xl font-extrabold text-brand-800">{servicePages.length}</dd>
              </div>
              <div className="bg-white rounded-lg p-4 border">
                <dt className="text-sm text-gray-500">Trade Routes</dt>
                <dd className="text-2xl font-extrabold text-brand-800">{routePages.length}</dd>
              </div>
              <div className="bg-white rounded-lg p-4 border">
                <dt className="text-sm text-gray-500">Resources</dt>
                <dd className="text-2xl font-extrabold text-brand-800">{resourcePages.length}</dd>
              </div>
              <div className="bg-white rounded-lg p-4 border">
                <dt className="text-sm text-gray-500">Company</dt>
                <dd className="text-2xl font-extrabold text-brand-800">{companyPages.length}</dd>
              </div>
              <div className="bg-white rounded-lg p-4 border">
                <dt className="text-sm text-gray-500">Legal</dt>
                <dd className="text-2xl font-extrabold text-brand-800">{legalPages.length}</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* ─── Services ─── */}
        <section aria-labelledby="sitemap-services-heading" className="py-10" data-section="services">
          <div className="container-carrgo">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center">
                <Ship className="w-5 h-5 text-brand-800" aria-hidden="true" />
              </div>
              <h2 id="sitemap-services-heading" className="text-2xl font-bold text-gray-900">Services</h2>
            </div>
            <p className="text-gray-600 mb-4">Complete freight forwarding services for UK, Northern Ireland, and Republic of Ireland importers.</p>
            <div className="bg-white rounded-xl border overflow-hidden">
              <PageTable pages={servicePages} />
            </div>
          </div>
        </section>

        {/* ─── Trade Routes ─── */}
        <section aria-labelledby="sitemap-routes-heading" className="py-10 bg-gray-50" data-section="routes">
          <div className="container-carrgo">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-brand-800" aria-hidden="true" />
              </div>
              <h2 id="sitemap-routes-heading" className="text-2xl font-bold text-gray-900">Trade Routes</h2>
            </div>
            <p className="text-gray-600 mb-4">Shipping routes to the UK from major global markets with transit times and port information.</p>
            <div className="bg-white rounded-xl border overflow-hidden">
              <PageTable pages={routePages} />
            </div>
          </div>
        </section>

        {/* ─── Resources ─── */}
        <section aria-labelledby="sitemap-resources-heading" className="py-10" data-section="resources">
          <div className="container-carrgo">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-brand-800" aria-hidden="true" />
              </div>
              <h2 id="sitemap-resources-heading" className="text-2xl font-bold text-gray-900">Resources</h2>
            </div>
            <p className="text-gray-600 mb-4">Guides, tools, and reference materials for UK importers and exporters.</p>
            <div className="bg-white rounded-xl border overflow-hidden">
              <PageTable pages={resourcePages} />
            </div>
          </div>
        </section>

        {/* ─── Company ─── */}
        <section aria-labelledby="sitemap-company-heading" className="py-10 bg-gray-50" data-section="company">
          <div className="container-carrgo">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-brand-800" aria-hidden="true" />
              </div>
              <h2 id="sitemap-company-heading" className="text-2xl font-bold text-gray-900">Company</h2>
            </div>
            <p className="text-gray-600 mb-4">Learn about Carrgo, our team, results, and how to get in touch.</p>
            <div className="bg-white rounded-xl border overflow-hidden">
              <PageTable pages={companyPages} />
            </div>
          </div>
        </section>

        {/* ─── Legal ─── */}
        <section aria-labelledby="sitemap-legal-heading" className="py-10" data-section="legal">
          <div className="container-carrgo">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-brand-800" aria-hidden="true" />
              </div>
              <h2 id="sitemap-legal-heading" className="text-2xl font-bold text-gray-900">Legal</h2>
            </div>
            <p className="text-gray-600 mb-4">Privacy policy, terms of service, and legal information.</p>
            <div className="bg-white rounded-xl border overflow-hidden">
              <PageTable pages={legalPages} />
            </div>
          </div>
        </section>

        {/* ─── XML Sitemap Link ─── */}
        <aside aria-label="XML sitemap information" className="py-10 bg-gray-50 border-t">
          <div className="container-carrgo">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Looking for the XML Sitemap?</h3>
              <p className="text-gray-600 mb-4">
                This page is designed for human visitors. For search engines and AI crawlers, we also provide an XML sitemap and an <code className="bg-gray-200 px-1 py-0.5 rounded text-sm">llms.txt</code> file.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href="/sitemap.xml"
                  className="inline-flex items-center gap-2 bg-brand-800 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-brand-700 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                  XML Sitemap
                </a>
                <a
                  href="/llms.txt"
                  className="inline-flex items-center gap-2 bg-white text-brand-800 px-5 py-2.5 rounded-lg font-medium border border-brand-800 hover:bg-gray-50 transition-colors"
                >
                  <FileText className="w-4 h-4" aria-hidden="true" />
                  llms.txt
                </a>
              </div>
            </div>
          </div>
        </aside>
      </main>
    </>
  );
}
