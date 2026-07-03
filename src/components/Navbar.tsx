import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Ship, ChevronDown } from 'lucide-react';
import SkipToContent from './SkipToContent';

const serviceLinks = [
  { label: 'Sea Freight', to: '/services/sea-freight' },
  { label: 'Air Freight', to: '/services/air-freight' },
  { label: 'Road Freight', to: '/services/road-freight' },
  { label: 'Rail Freight', to: '/services/rail-freight-china-uk' },
  { label: 'Customs Clearance', to: '/services/customs-clearance' },
  { label: 'Door-to-Door', to: '/services/door-to-door' },
  { label: 'Amazon FBA', to: '/services/amazon-fba-freight' },
  { label: 'Warehousing', to: '/services/warehousing' },
];

const routeLinks = [
  { label: 'China to UK', to: '/routes/china-to-uk' },
  { label: 'Germany to UK', to: '/routes/germany-to-uk' },
  { label: 'Netherlands to UK', to: '/routes/netherlands-to-uk' },
  { label: 'India to UK', to: '/routes/india-to-uk' },
  { label: 'USA to UK', to: '/routes/usa-to-uk' },
  { label: 'Turkey to UK', to: '/routes/turkey-to-uk' },
  { label: 'UAE to UK', to: '/routes/uae-to-uk' },
  { label: 'Spain to UK', to: '/routes/spain-to-uk' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [svcOpen, setSvcOpen] = useState(false);
  const [rteOpen, setRteOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <SkipToContent />
      <nav aria-label="Main navigation" className="container-carrgo">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 text-brand-800 font-bold text-xl" aria-label="Carrgo home">
            <Ship className="w-8 h-8" aria-hidden="true" />
            <span>Carrgo</span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            <div className="relative"
              onMouseEnter={() => setSvcOpen(true)}
              onMouseLeave={() => setSvcOpen(false)}>
              <button
                type="button"
                className="flex items-center gap-1 px-3 py-2 text-gray-700 hover:text-brand-800 font-medium transition-colors"
                aria-expanded={svcOpen}
                aria-haspopup="true"
                onClick={() => setSvcOpen(!svcOpen)}>
                Services <ChevronDown className="w-4 h-4" aria-hidden="true" />
              </button>
              {svcOpen && (
                <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg border py-2 w-56 z-50">
                  {serviceLinks.map(s => (
                    <Link key={s.to} to={s.to} className="block px-4 py-2 text-sm text-gray-700 hover:bg-brand-50 hover:text-brand-800" onClick={() => setSvcOpen(false)}>{s.label}</Link>
                  ))}
                </div>
              )}
            </div>

            <div className="relative"
              onMouseEnter={() => setRteOpen(true)}
              onMouseLeave={() => setRteOpen(false)}>
              <button
                type="button"
                className="flex items-center gap-1 px-3 py-2 text-gray-700 hover:text-brand-800 font-medium transition-colors"
                aria-expanded={rteOpen}
                aria-haspopup="true"
                onClick={() => setRteOpen(!rteOpen)}>
                Routes <ChevronDown className="w-4 h-4" aria-hidden="true" />
              </button>
              {rteOpen && (
                <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg border py-2 w-56 z-50">
                  {routeLinks.map(r => (
                    <Link key={r.to} to={r.to} className="block px-4 py-2 text-sm text-gray-700 hover:bg-brand-50 hover:text-brand-800" onClick={() => setRteOpen(false)}>{r.label}</Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/about" className="px-3 py-2 text-gray-700 hover:text-brand-800 font-medium transition-colors">About</Link>
            <Link to="/results" className="px-3 py-2 text-gray-700 hover:text-brand-800 font-medium transition-colors">Results</Link>
            <Link to="/contact" className="px-3 py-2 text-gray-700 hover:text-brand-800 font-medium transition-colors">Contact</Link>
            <Link to="/get-a-quote" className="ml-2 bg-brand-800 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-brand-900 transition-colors">Get a Quote</Link>
          </div>

          <button
            type="button"
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <nav id="mobile-menu" aria-label="Mobile navigation" className="lg:hidden bg-white border-t">
          <div className="container-carrgo py-3 space-y-1">
            <p className="px-3 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">Services</p>
            {serviceLinks.map(s => (
              <Link key={s.to} to={s.to} className="block px-3 py-2 text-gray-700 hover:bg-brand-50 rounded-lg" onClick={() => setMobileOpen(false)}>{s.label}</Link>
            ))}
            <p className="px-3 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider mt-2">Routes</p>
            {routeLinks.map(r => (
              <Link key={r.to} to={r.to} className="block px-3 py-2 text-gray-700 hover:bg-brand-50 rounded-lg" onClick={() => setMobileOpen(false)}>{r.label}</Link>
            ))}
            <div className="border-t pt-2 mt-2 space-y-1">
              <Link to="/about" className="block px-3 py-2 text-gray-700 hover:bg-brand-50 rounded-lg" onClick={() => setMobileOpen(false)}>About</Link>
              <Link to="/results" className="block px-3 py-2 text-gray-700 hover:bg-brand-50 rounded-lg" onClick={() => setMobileOpen(false)}>Results</Link>
              <Link to="/contact" className="block px-3 py-2 text-gray-700 hover:bg-brand-50 rounded-lg" onClick={() => setMobileOpen(false)}>Contact</Link>
              <Link to="/get-a-quote" className="block px-3 py-2 bg-brand-800 text-white rounded-lg font-semibold text-center mt-2" onClick={() => setMobileOpen(false)}>Get a Quote</Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
