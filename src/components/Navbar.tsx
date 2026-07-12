import { useState, useRef, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Ship, X, ChevronRight } from 'lucide-react';
import SkipToContent from './SkipToContent';

/* ── Data ── */
const industryLinks = [
  { label: 'All Industries', to: '/resources/industries' },
  { label: 'Ecommerce & Amazon', to: '/industries/ecommerce' },
  { label: 'Manufacturing', to: '/industries/manufacturing' },
  { label: 'Retail & Wholesale', to: '/industries/retail' },
  { label: 'Automotive', to: '/industries/automotive' },
  { label: 'Construction', to: '/industries/construction' },
  { label: 'Electronics', to: '/industries/electronics' },
  { label: 'Medical & Pharma', to: '/industries/medical' },
  { label: 'Furniture', to: '/industries/furniture' },
];

const serviceLinks = [
  { label: 'All Services', to: '/services' },
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
  { label: 'All Routes', to: '/routes' },
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

const resourceLinks = [
  { label: 'Port Intelligence', to: '/resources/port-congestion-tracker' },
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

const portLinks = [
  { label: 'Port Intelligence Dashboard', to: '/resources/port-congestion-tracker' },
  { label: 'Cost Calculator', to: '/tools/cost-calculator' },
  { label: 'Port Comparison', to: '/tools/port-comparison' },
  { label: 'Felixstowe', to: '/ports/felixstowe' },
  { label: 'Southampton', to: '/ports/southampton' },
  { label: 'London Gateway', to: '/ports/london-gateway' },
  { label: 'Liverpool', to: '/ports/liverpool' },
  { label: 'Bristol', to: '/ports/bristol' },
  { label: 'Tilbury', to: '/ports/tilbury' },
  { label: 'Immingham', to: '/ports/immingham' },
  { label: 'Grangemouth', to: '/ports/grangemouth' },
  { label: 'Holyhead', to: '/ports/holyhead' },
  { label: 'Belfast', to: '/ports/belfast' },
  { label: 'Larne', to: '/ports/larne' },
  { label: 'Londonderry', to: '/ports/londonderry' },
  { label: 'Dublin', to: '/ports/dublin' },
  { label: 'Cork', to: '/ports/cork' },
  { label: 'Rosslare Europort', to: '/ports/rosslare-europort' },
  { label: 'Shannon Foynes', to: '/ports/shannon-foynes' },
  { label: 'Waterford', to: '/ports/waterford' },
];

const topLevel = [
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

/* ── Hooks ── */
function useScrolled(threshold = 10) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);
  return scrolled;
}

/* ── Dropdown ── */
function Dropdown({
  label,
  children,
  wide = false,
}: {
  label: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const enter = useCallback(() => {
    clearTimer();
    setOpen(true);
  }, [clearTimer]);

  const leave = useCallback(() => {
    timerRef.current = setTimeout(() => setOpen(false), 180);
  }, []);

  useEffect(() => clearTimer, [clearTimer]);

  /* Close on Escape and click outside */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [open]);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={enter}
      onMouseLeave={leave}
    >
      <button
        type="button"
        className="group relative px-3 py-2 text-[13px] font-medium text-gray-600 hover:text-gray-900 transition-colors tracking-[-0.01em]"
        onClick={() => setOpen((p) => !p)}
        aria-expanded={open}
      >
        {label}
        {/* Animated underline */}
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-brand-700 rounded-full transition-all duration-300 group-hover:w-4" />
      </button>

      {/* Dropdown panel with animation */}
      <div
        className={`absolute top-full left-0 mt-2 z-50 transition-all duration-200 ease-out ${
          open
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
        onMouseEnter={enter}
        onMouseLeave={leave}
      >
        <div
          className={`bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_8px_40px_-12px_rgba(0,0,0,0.18)] border border-gray-100/80 overflow-hidden ${
            wide ? 'w-[640px]' : 'w-56'
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

/* ── NavLink with active indicator ── */
function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  const location = useLocation();
  const active = location.pathname === to;
  return (
    <Link
      to={to}
      className={`group relative px-3 py-2 text-[13px] font-medium transition-colors tracking-[-0.01em] ${
        active ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'
      }`}
    >
      {children}
      <span
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-brand-700 rounded-full transition-all duration-300 ${
          active ? 'w-4' : 'w-0 group-hover:w-4'
        }`}
      />
    </Link>
  );
}

/* ── Dropdown link ── */
function DDLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="block px-4 py-1.5 text-[13px] text-gray-600 hover:text-brand-700 hover:bg-brand-50/60 rounded-md transition-colors"
    >
      {children}
    </Link>
  );
}

/* ── Mega-menu port columns ── */
function PortMegaMenu() {
  return (
    <div className="grid grid-cols-3 gap-1 p-4">
      <div className="col-span-3 mb-1">
        <p className="px-2 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Port Intelligence</p>
      </div>
      {portLinks.slice(0, 3).map((p) => (
        <DDLink key={p.to} to={p.to}>{p.label}</DDLink>
      ))}
      <div className="col-span-3 mt-2 mb-1">
        <p className="px-2 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">UK Ports</p>
      </div>
      {portLinks.slice(3, 12).map((p) => (
        <DDLink key={p.to} to={p.to}>{p.label}</DDLink>
      ))}
      <div className="col-span-3 mt-2 mb-1">
        <p className="px-2 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Northern Ireland</p>
      </div>
      {portLinks.slice(12, 15).map((p) => (
        <DDLink key={p.to} to={p.to}>{p.label}</DDLink>
      ))}
      <div className="col-span-3 mt-2 mb-1">
        <p className="px-2 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Republic of Ireland</p>
      </div>
      {portLinks.slice(15).map((p) => (
        <DDLink key={p.to} to={p.to}>{p.label}</DDLink>
      ))}
    </div>
  );
}

/* ── Hamburger icon ── */
function Hamburger({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      className="lg:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-xl hover:bg-gray-50 transition-colors"
      aria-label={open ? 'Close menu' : 'Open menu'}
      onClick={onClick}
      aria-expanded={open}
    >
      <span
        className={`block w-5 h-[1.5px] bg-gray-700 rounded-full transition-all duration-300 ${
          open ? 'rotate-45 translate-y-[4.5px]' : ''
        }`}
      />
      <span
        className={`block w-5 h-[1.5px] bg-gray-700 rounded-full transition-all duration-300 ${
          open ? 'opacity-0' : ''
        }`}
      />
      <span
        className={`block w-5 h-[1.5px] bg-gray-700 rounded-full transition-all duration-300 ${
          open ? '-rotate-45 -translate-y-[4.5px]' : ''
        }`}
      />
    </button>
  );
}

/* ── Mobile menu ── */
function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    setActiveSection(null);
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  const sections: { key: string; label: string; links: { label: string; to: string }[] }[] = [
    { key: 'services', label: 'Services', links: serviceLinks },
    { key: 'routes', label: 'Trade Routes', links: routeLinks },
    { key: 'industries', label: 'Industries', links: industryLinks },
    { key: 'resources', label: 'Resources', links: resourceLinks },
    { key: 'ports', label: 'Port Intelligence', links: portLinks },
  ];

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Dark backdrop */}
      <div
        className="absolute inset-0 bg-gray-950/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Full-screen white panel */}
      <div className="absolute inset-x-0 top-0 bottom-0 bg-white overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-gray-100">
          <Link
            to="/"
            className="flex items-center gap-2.5 text-gray-900 font-bold text-lg tracking-tight"
            onClick={onClose}
          >
            <Ship className="w-7 h-7 text-brand-700" aria-hidden="true" />
            <span>Carrgo</span>
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-50 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <nav className="px-5 py-6 pb-28" aria-label="Mobile navigation">
          {sections.map((section) => (
            <div key={section.key} className="mb-5">
              <button
                type="button"
                className="w-full flex items-center justify-between py-3 text-left border-b border-gray-100"
                onClick={() => setActiveSection(activeSection === section.key ? null : section.key)}
                aria-expanded={activeSection === section.key}
              >
                <span className="text-base font-semibold text-gray-900">{section.label}</span>
                <ChevronRight
                  className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                    activeSection === section.key ? 'rotate-90' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-out ${
                  activeSection === section.key ? 'max-h-[600px] opacity-100 mt-2' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="space-y-0.5 pl-2">
                  {section.links.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="block py-2.5 text-[15px] text-gray-600 hover:text-brand-700 transition-colors"
                      onClick={onClose}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Top-level pages */}
          <div className="space-y-0.5 mt-2 border-t border-gray-100 pt-4">
            {topLevel.map((t) => (
              <Link
                key={t.to}
                to={t.to}
                className="block py-3 text-base font-semibold text-gray-900 hover:text-brand-700 transition-colors"
                onClick={onClose}
              >
                {t.label}
              </Link>
            ))}
          </div>
        </nav>

        {/* Sticky CTA at bottom */}
        <div className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-100 px-5 py-4">
          <Link
            to="/get-a-quote"
            className="block w-full text-center bg-brand-700 hover:bg-brand-800 text-white text-[15px] font-semibold py-3.5 rounded-xl shadow-lg shadow-brand-700/20 transition-colors"
            onClick={onClose}
          >
            Get a Free Quote
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ── Main Navbar ── */
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrolled = useScrolled(8);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      <SkipToContent />
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-white/85 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] border-b border-gray-200/50'
            : 'bg-white border-b border-gray-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2.5 text-gray-900 font-bold text-lg tracking-tight shrink-0"
              aria-label="Carrgo home"
            >
              <div className="w-8 h-8 bg-brand-700 rounded-lg flex items-center justify-center shadow-sm shadow-brand-700/20">
                <Ship className="w-[18px] h-[18px] text-white" aria-hidden="true" />
              </div>
              <span className="hidden sm:inline">Carrgo</span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-0.5" aria-label="Main navigation">
              <Dropdown label="Services">
                <div className="py-2 px-1">
                  {serviceLinks.map((s) => (
                    <DDLink key={s.to} to={s.to}>{s.label}</DDLink>
                  ))}
                </div>
              </Dropdown>

              <Dropdown label="Routes">
                <div className="py-2 px-1">
                  {routeLinks.map((r) => (
                    <DDLink key={r.to} to={r.to}>{r.label}</DDLink>
                  ))}
                </div>
              </Dropdown>

              <Dropdown label="Industries">
                <div className="py-2 px-1">
                  {industryLinks.map((i) => (
                    <DDLink key={i.to} to={i.to}>{i.label}</DDLink>
                  ))}
                </div>
              </Dropdown>

              <Dropdown label="Resources">
                <div className="py-2 px-1">
                  {resourceLinks.map((r) => (
                    <DDLink key={r.to} to={r.to}>{r.label}</DDLink>
                  ))}
                </div>
              </Dropdown>

              <Dropdown label="Port Intelligence" wide>
                <PortMegaMenu />
              </Dropdown>

              {topLevel.map((t) => (
                <NavLink key={t.to} to={t.to}>{t.label}</NavLink>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2">
              {/* Desktop CTA */}
              <Link
                to="/get-a-quote"
                className="hidden lg:inline-flex items-center px-5 py-2.5 text-[13px] font-semibold text-white bg-brand-700 hover:bg-brand-800 rounded-xl shadow-sm shadow-brand-700/15 transition-all hover:shadow-md hover:shadow-brand-700/20 active:scale-[0.98]"
              >
                Get a Quote
              </Link>

              <Hamburger open={mobileOpen} onClick={() => setMobileOpen((p) => !p)} />
            </div>
          </div>
        </div>
      </header>

      {/* Spacer to prevent content from hiding under fixed header */}
      <div className="h-16" />

      {/* Mobile menu overlay */}
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
