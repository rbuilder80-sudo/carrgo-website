import { Ship, Mail } from 'lucide-react';
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

const company = [
  { label: 'About Us', to: '/about' },
  { label: 'Our Results', to: '/results' },
  { label: 'Contact', to: '/contact' },
  { label: 'Get a Quote', to: '/get-a-quote' },
];

const legal = [
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Terms of Service', to: '/terms' },
];

const resources = [
  { label: 'Port Congestion Tracker', to: '/resources/port-congestion-tracker' },
  { label: 'Shipping Guides', to: '/resources/shipping-guides' },
  { label: 'Container Size Guide', to: '/resources/container-size-guide' },
  { label: 'Incoterms Guide', to: '/resources/incoterms-guide' },
  { label: 'Freight FAQs', to: '/resources/freight-faqs' },
  { label: 'Case Studies', to: '/resources/case-studies' },
  { label: 'Testimonials', to: '/resources/testimonials' },
  { label: 'Industries', to: '/resources/industries' },
  { label: 'Our Process', to: '/resources/our-process' },
  { label: 'Post-Brexit Guide', to: '/resources/post-brexit-customs-guide' },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-gray-900 text-gray-300" itemScope itemType="https://schema.org/Organization">
      <meta itemProp="@id" content="https://carrgo.co.uk/#organization" />
      <link itemProp="url" href="https://carrgo.co.uk" />
      <div className="container-carrgo py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 text-white font-bold text-xl mb-4">
              <Ship className="w-8 h-8" aria-hidden="true" />
              <span itemProp="name">Carrgo Freight Solutions Ltd</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-sm" itemProp="description">
              Trusted UK freight forwarding company with over 30 years combined industry experience. All-inclusive door-to-door shipping.
            </p>
            <address className="not-italic space-y-2 text-sm" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
              <meta itemProp="addressCountry" content="GB" />
              <meta itemProp="addressRegion" content="England" />
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-400" aria-hidden="true" />
                <a href="mailto:info@carrgo.co.uk" itemProp="email" className="hover:text-white transition-colors">info@carrgo.co.uk</a>
              </div>
            </address>
            <meta itemProp="sameAs" content="https://www.linkedin.com/company/carrgo" />
          </div>

          <nav aria-label="Services">
            <h2 className="text-white font-semibold mb-4 text-base">Services</h2>
            <ul className="space-y-2 text-sm">
              {services.map(s => (
                <li key={s.to}><Link to={s.to} className="hover:text-white transition-colors">{s.label}</Link></li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Trade routes">
            <h2 className="text-white font-semibold mb-4 text-base">Trade Routes</h2>
            <ul className="space-y-2 text-sm">
              {routes.map(r => (
                <li key={r.to}><Link to={r.to} className="hover:text-white transition-colors">{r.label}</Link></li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Resources">
            <h2 className="text-white font-semibold mb-4 text-base">Resources</h2>
            <ul className="space-y-2 text-sm">
              {resources.map(r => (
                <li key={r.to}><Link to={r.to} className="hover:text-white transition-colors">{r.label}</Link></li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <h2 className="text-white font-semibold mb-4 text-base">Company</h2>
            <ul className="space-y-2 text-sm">
              {company.map(c => (
                <li key={c.to}><Link to={c.to} className="hover:text-white transition-colors">{c.label}</Link></li>
              ))}
              {legal.map(l => (
                <li key={l.to}><Link to={l.to} className="hover:text-white transition-colors text-gray-500">{l.label}</Link></li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-500">
          <small>&copy; {year} Carrgo Freight Solutions Ltd. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
}
