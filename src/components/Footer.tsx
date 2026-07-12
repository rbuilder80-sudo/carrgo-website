import { Ship, Mail, Phone, MapPin, ArrowUp, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  { label: 'Sea Freight', to: '/services/sea-freight' },
  { label: 'Air Freight', to: '/services/air-freight' },
  { label: 'Road Freight', to: '/services/road-freight' },
  { label: 'Rail Freight', to: '/services/rail-freight-china-uk' },
  { label: 'Customs Clearance', to: '/services/customs-clearance' },
  { label: 'Door-to-Door', to: '/services/door-to-door' },
  { label: 'Amazon FBA', to: '/services/amazon-fba-freight' },
  { label: 'Warehousing', to: '/services/warehousing' },
];

const routes = [
  { label: 'China to UK', to: '/routes/china-to-uk' },
  { label: 'Germany to UK', to: '/routes/germany-to-uk' },
  { label: 'Netherlands to UK', to: '/routes/netherlands-to-uk' },
  { label: 'Ireland (Dublin)', to: '/routes/dublin-ireland' },
  { label: 'Northern Ireland (Belfast)', to: '/routes/belfast-northern-ireland' },
  { label: 'India to UK', to: '/routes/india-to-uk' },
  { label: 'USA to UK', to: '/routes/usa-to-uk' },
  { label: 'Turkey to UK', to: '/routes/turkey-to-uk' },
  { label: 'UAE to UK', to: '/routes/uae-to-uk' },
  { label: 'Spain to UK', to: '/routes/spain-to-uk' },
];

const industries = [
  { label: 'Ecommerce & Amazon', to: '/industries/ecommerce' },
  { label: 'Manufacturing', to: '/industries/manufacturing' },
  { label: 'Retail & Wholesale', to: '/industries/retail' },
  { label: 'Automotive', to: '/industries/automotive' },
  { label: 'Construction', to: '/industries/construction' },
  { label: 'Electronics', to: '/industries/electronics' },
  { label: 'Medical & Pharma', to: '/industries/medical' },
  { label: 'Furniture', to: '/industries/furniture' },
];

const company = [
  { label: 'About Us', to: '/about' },
  { label: 'Our Results', to: '/results' },
  { label: 'Testimonials', to: '/resources/testimonials' },
  { label: 'Contact', to: '/contact' },
  { label: 'Get a Quote', to: '/get-a-quote' },
];

const legal = [
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Terms of Service', to: '/terms' },
];

const resources = [
  { label: 'Port Intelligence', to: '/resources/port-congestion-tracker' },
  { label: 'Shipping Guides', to: '/resources/shipping-guides' },
  { label: 'Container Size Guide', to: '/resources/container-size-guide' },
  { label: 'Incoterms Guide', to: '/resources/incoterms-guide' },
  { label: 'Freight FAQs', to: '/resources/freight-faqs' },
  { label: 'Case Studies', to: '/resources/case-studies' },
  { label: 'Industries', to: '/resources/industries' },
  { label: 'Our Process', to: '/resources/our-process' },
  { label: 'Post-Brexit Guide', to: '/resources/post-brexit-customs-guide' },
];

const portIntelligence = [
  { label: 'Port Intelligence Dashboard', to: '/resources/port-congestion-tracker' },
  { label: 'Cost Calculator', to: '/tools/cost-calculator' },
  { label: 'Port Comparison', to: '/tools/port-comparison' },
  { label: 'Felixstowe', to: '/ports/felixstowe' },
  { label: 'Southampton', to: '/ports/southampton' },
  { label: 'London Gateway', to: '/ports/london-gateway' },
  { label: 'Liverpool', to: '/ports/liverpool' },
  { label: 'Grangemouth', to: '/ports/grangemouth' },
  { label: 'Belfast', to: '/ports/belfast' },
  { label: 'Dublin', to: '/ports/dublin' },
  { label: 'Cork', to: '/ports/cork' },
  { label: 'Rosslare Europort', to: '/ports/rosslare-europort' },
];

/* ── Footer link with hover arrow reveal ── */
function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        to={to}
        className="group inline-flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors"
      >
        <span className="w-0 group-hover:w-2 transition-all duration-200 overflow-hidden">
          <span className="inline-block text-brand-400">›</span>
        </span>
        {children}
      </Link>
    </li>
  );
}

/* ── Column header ── */
function ColumnHeader({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
      {children}
    </h2>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-gray-400" itemScope itemType="https://schema.org/Organization">
      <meta itemProp="@id" content="https://carrgo.co.uk/#organization" />
      <link itemProp="url" href="https://carrgo.co.uk" />

      {/* ── Top section: brand + contact + social ── */}
      <div className="border-b border-gray-800/60">
        <div className="container-carrgo py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Brand */}
            <div className="lg:col-span-4">
              <div className="flex items-center gap-2.5 text-white font-bold text-xl mb-4">
                <div className="w-9 h-9 bg-brand-700 rounded-lg flex items-center justify-center">
                  <Ship className="w-[18px] h-[18px] text-white" aria-hidden="true" />
                </div>
                <span itemProp="name">Carrgo</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-5 max-w-sm" itemProp="description">
                Trusted UK freight forwarding company with over 30 years combined industry experience. All-inclusive door-to-door shipping with quotes in 2 hours.
              </p>
              <div className="not-italic space-y-2.5 text-sm">
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-brand-400 shrink-0" aria-hidden="true" />
                  <a href="mailto:info@carrgo.co.uk" className="hover:text-white transition-colors">info@carrgo.co.uk</a>
                </div>
              </div>
              {/* Social */}
              <div className="flex items-center gap-3 mt-5">
                <a
                  href="https://www.linkedin.com/company/carrgo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-brand-700 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Link columns */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
                <nav aria-label="Services">
                  <ColumnHeader>Services</ColumnHeader>
                  <ul className="space-y-2.5">
                    {services.map((s) => (
                      <FooterLink key={s.to} to={s.to}>{s.label}</FooterLink>
                    ))}
                  </ul>
                </nav>

                <nav aria-label="Trade routes">
                  <ColumnHeader>Trade Routes</ColumnHeader>
                  <ul className="space-y-2.5">
                    {routes.map((r) => (
                      <FooterLink key={r.to} to={r.to}>{r.label}</FooterLink>
                    ))}
                  </ul>
                </nav>

                <nav aria-label="Industries">
                  <ColumnHeader>Industries</ColumnHeader>
                  <ul className="space-y-2.5">
                    {industries.map((i) => (
                      <FooterLink key={i.to} to={i.to}>{i.label}</FooterLink>
                    ))}
                  </ul>
                </nav>

                <nav aria-label="Resources">
                  <ColumnHeader>Resources</ColumnHeader>
                  <ul className="space-y-2.5">
                    {resources.map((r) => (
                      <FooterLink key={r.to} to={r.to}>{r.label}</FooterLink>
                    ))}
                  </ul>
                </nav>

                <nav aria-label="Port Intelligence">
                  <ColumnHeader>Port Intelligence</ColumnHeader>
                  <ul className="space-y-2.5">
                    {portIntelligence.map((p) => (
                      <FooterLink key={p.to} to={p.to}>{p.label}</FooterLink>
                    ))}
                  </ul>
                </nav>

                <nav aria-label="Company">
                  <ColumnHeader>Company</ColumnHeader>
                  <ul className="space-y-2.5">
                    {company.map((c) => (
                      <FooterLink key={c.to} to={c.to}>{c.label}</FooterLink>
                    ))}
                  </ul>
                </nav>

                <nav aria-label="Legal">
                  <ColumnHeader>Legal</ColumnHeader>
                  <ul className="space-y-2.5">
                    {legal.map((l) => (
                      <FooterLink key={l.to} to={l.to}>{l.label}</FooterLink>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="container-carrgo py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-gray-500">
            <small>&copy; {year} Carrgo Freight Solutions Ltd. All rights reserved.</small>
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-white transition-colors group"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
          </button>
        </div>
      </div>

      <meta itemProp="sameAs" content="https://www.linkedin.com/company/carrgo" />
    </footer>
  );
}
