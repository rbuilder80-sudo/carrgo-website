import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Ship } from 'lucide-react';
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

const resourceLinks = [
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

/* ── Dropdown component (desktop hover) ── */
function Dropdown({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleEnter = () => {
    clearTimer();
    setOpen(true);
  };

  const handleLeave = () => {
    timerRef.current = setTimeout(() => setOpen(false), 150);
  };

  useEffect(() => clearTimer, []);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <button
        type="button"
        className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-[#1A6DFF] transition-colors"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        {label}
      </button>
      {open && (
        <div
          className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-100 py-2 w-56 z-50"
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          {children}
        </div>
      )}
    </div>
  );
}

/* ── Mobile overlay menu ── */
function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      {/* Slide-out panel */}
      <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-xl overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <span className="font-semibold text-gray-900">Menu</span>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <nav className="p-4 space-y-6" aria-label="Mobile navigation">
          {/* Services */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Services</p>
            <div className="space-y-1">
              {serviceLinks.map(s => (
                <Link
                  key={s.to}
                  to={s.to}
                  className="block py-2 text-sm text-gray-700 hover:text-[#1A6DFF] transition-colors"
                  onClick={onClose}
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Routes */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Trade Routes</p>
            <div className="space-y-1">
              {routeLinks.map(r => (
                <Link
                  key={r.to}
                  to={r.to}
                  className="block py-2 text-sm text-gray-700 hover:text-[#1A6DFF] transition-colors"
                  onClick={onClose}
                >
                  {r.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Resources</p>
            <div className="space-y-1">
              {resourceLinks.map(r => (
                <Link
                  key={r.to}
                  to={r.to}
                  className="block py-2 text-sm text-gray-700 hover:text-[#1A6DFF] transition-colors"
                  onClick={onClose}
                >
                  {r.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Pages */}
          <div className="border-t border-gray-100 pt-4 space-y-1">
            <Link to="/about" className="block py-2 text-sm text-gray-700 hover:text-[#1A6DFF] transition-colors" onClick={onClose}>About</Link>
            <Link to="/contact" className="block py-2 text-sm text-gray-700 hover:text-[#1A6DFF] transition-colors" onClick={onClose}>Contact</Link>
          </div>

          <Link
            to="/get-a-quote"
            className="block w-full text-center bg-[#1A6DFF] hover:bg-[#1557CC] text-white text-sm font-medium py-2.5 rounded-full transition-colors"
            onClick={onClose}
          >
            Get a Quote
          </Link>
        </nav>
      </div>
    </div>
  );
}

/* ── Main Navbar ── */
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  /* Close mobile menu on route change */
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      <SkipToContent />
      <header className="bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 text-[#111827] font-bold text-lg shrink-0"
              aria-label="Carrgo home"
            >
              <Ship className="w-7 h-7 text-[#1A6DFF]" aria-hidden="true" />
              <span>Carrgo</span>
            </Link>

            {/* Desktop navigation */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              <Dropdown label="Services">
                {serviceLinks.map(s => (
                  <Link
                    key={s.to}
                    to={s.to}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#1A6DFF] transition-colors"
                  >
                    {s.label}
                  </Link>
                ))}
              </Dropdown>

              <Dropdown label="Routes">
                {routeLinks.map(r => (
                  <Link
                    key={r.to}
                    to={r.to}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#1A6DFF] transition-colors"
                  >
                    {r.label}
                  </Link>
                ))}
              </Dropdown>

              <Dropdown label="Resources">
                {resourceLinks.map(r => (
                  <Link
                    key={r.to}
                    to={r.to}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#1A6DFF] transition-colors"
                  >
                    {r.label}
                  </Link>
                ))}
              </Dropdown>

              <Link
                to="/about"
                className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-[#1A6DFF] transition-colors"
              >
                About
              </Link>

              <Link
                to="/contact"
                className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-[#1A6DFF] transition-colors"
              >
                Contact
              </Link>
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-3">
              {/* Desktop CTA */}
              <Link
                to="/get-a-quote"
                className="hidden lg:inline-flex items-center px-5 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
              >
                Get a Quote
              </Link>

              {/* Mobile hamburger */}
              <button
                type="button"
                className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                aria-label="Open menu"
                onClick={() => setMobileOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Subtle bottom border */}
        <div className="border-b border-gray-100" />
      </header>

      {/* Mobile menu overlay */}
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
