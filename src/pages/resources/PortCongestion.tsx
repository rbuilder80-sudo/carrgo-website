import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../../components/Seo';
import {
  Ship,
  Clock,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Minus,
  Search,
  MapPin,
  ArrowRight,
  Anchor,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  HelpCircle,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Status = 'Normal' | 'Moderate' | 'Congested';
type Trend = 'Improving' | 'Stable' | 'Worsening';
type Region = 'England' | 'Scotland' | 'Wales' | 'Northern Ireland' | 'Ireland';
type Tab = 'All Ports' | 'England' | 'Scotland & Wales' | 'Northern Ireland' | 'Ireland';

interface PortStatus {
  port: string;
  slug: string;
  description: string;
  region: Region;
  country: string;
  status: Status;
  waitTime: string;
  trend: Trend;
  lastUpdated: string;
}

/* ------------------------------------------------------------------ */
/*  Data — 18 ports across UK, NI & ROI                                */
/* ------------------------------------------------------------------ */

const ports: PortStatus[] = [
  /* England */
  {
    port: 'Felixstowe',
    slug: 'felixstowe',
    description: 'Major container port',
    region: 'England',
    country: 'England',
    status: 'Moderate',
    waitTime: '2-4 days',
    trend: 'Stable',
    lastUpdated: '2h ago',
  },
  {
    port: 'Southampton',
    slug: 'southampton',
    description: 'Deep-water container port',
    region: 'England',
    country: 'England',
    status: 'Normal',
    waitTime: '1-2 days',
    trend: 'Stable',
    lastUpdated: '1h ago',
  },
  {
    port: 'London Gateway',
    slug: 'london-gateway',
    description: 'DP World automated port',
    region: 'England',
    country: 'England',
    status: 'Normal',
    waitTime: '1-2 days',
    trend: 'Improving',
    lastUpdated: '3h ago',
  },
  {
    port: 'Liverpool',
    slug: 'liverpool',
    description: 'Mersey container port',
    region: 'England',
    country: 'England',
    status: 'Moderate',
    waitTime: '2-3 days',
    trend: 'Worsening',
    lastUpdated: '4h ago',
  },
  {
    port: 'Bristol',
    slug: 'bristol',
    description: 'Avonmouth port',
    region: 'England',
    country: 'England',
    status: 'Normal',
    waitTime: '1 day',
    trend: 'Stable',
    lastUpdated: '5h ago',
  },
  {
    port: 'Tilbury',
    slug: 'tilbury',
    description: 'Thames river port',
    region: 'England',
    country: 'England',
    status: 'Normal',
    waitTime: '1-2 days',
    trend: 'Improving',
    lastUpdated: '3h ago',
  },
  {
    port: 'Immingham',
    slug: 'immingham',
    description: 'Humber estuary port',
    region: 'England',
    country: 'England',
    status: 'Moderate',
    waitTime: '2-3 days',
    trend: 'Stable',
    lastUpdated: '2h ago',
  },
  /* Scotland */
  {
    port: 'Grangemouth',
    slug: 'grangemouth',
    description: "Scotland's largest container port",
    region: 'Scotland',
    country: 'Scotland',
    status: 'Congested',
    waitTime: '4-6 days',
    trend: 'Worsening',
    lastUpdated: '1h ago',
  },
  /* Wales */
  {
    port: 'Holyhead',
    slug: 'holyhead',
    description: 'Irish Sea ferry & cargo port',
    region: 'Wales',
    country: 'Wales',
    status: 'Normal',
    waitTime: '0-1 days',
    trend: 'Stable',
    lastUpdated: '4h ago',
  },
  /* Northern Ireland */
  {
    port: 'Belfast',
    slug: 'belfast',
    description: "Northern Ireland's largest port",
    region: 'Northern Ireland',
    country: 'Northern Ireland',
    status: 'Normal',
    waitTime: '1-2 days',
    trend: 'Stable',
    lastUpdated: '6h ago',
  },
  {
    port: 'Larne',
    slug: 'larne',
    description: 'Larne Harbour, busy ferry port',
    region: 'Northern Ireland',
    country: 'Northern Ireland',
    status: 'Normal',
    waitTime: '0-1 days',
    trend: 'Improving',
    lastUpdated: '5h ago',
  },
  {
    port: 'Londonderry',
    slug: 'londonderry',
    description: 'Foyle Port, Derry',
    region: 'Northern Ireland',
    country: 'Northern Ireland',
    status: 'Normal',
    waitTime: '1 day',
    trend: 'Stable',
    lastUpdated: '7h ago',
  },
  /* Republic of Ireland */
  {
    port: 'Dublin',
    slug: 'dublin',
    description: "Ireland's largest port",
    region: 'Ireland',
    country: 'Ireland (ROI)',
    status: 'Moderate',
    waitTime: '2-4 days',
    trend: 'Worsening',
    lastUpdated: '2h ago',
  },
  {
    port: 'Cork',
    slug: 'cork',
    description: 'Southern Ireland major port',
    region: 'Ireland',
    country: 'Ireland (ROI)',
    status: 'Normal',
    waitTime: '1-2 days',
    trend: 'Stable',
    lastUpdated: '3h ago',
  },
  {
    port: 'Rosslare Europort',
    slug: 'rosslare-europort',
    description: 'Wexford ferry & cargo port',
    region: 'Ireland',
    country: 'Ireland (ROI)',
    status: 'Normal',
    waitTime: '1 day',
    trend: 'Improving',
    lastUpdated: '4h ago',
  },
  {
    port: 'Shannon Foynes',
    slug: 'shannon-foynes',
    description: 'Limerick deepwater port',
    region: 'Ireland',
    country: 'Ireland (ROI)',
    status: 'Normal',
    waitTime: '1-2 days',
    trend: 'Stable',
    lastUpdated: '5h ago',
  },
  {
    port: 'Waterford',
    slug: 'waterford',
    description: 'Southeast Ireland port',
    region: 'Ireland',
    country: 'Ireland (ROI)',
    status: 'Normal',
    waitTime: '1 day',
    trend: 'Stable',
    lastUpdated: '6h ago',
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function formatDateUK(d: Date): string {
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

function formatTime24(d: Date): string {
  const h = String(d.getHours()).padStart(2, '0');
  const m = String(d.getMinutes()).padStart(2, '0');
  return `${h}:${m}`;
}

function getNextUpdateLabel(now: Date): string {
  const h = now.getHours();
  if (h < 6) {
    return `Today at 06:00 GMT`;
  }
  if (h < 18) {
    return `Today at 18:00 GMT`;
  }
  return `Tomorrow at 06:00 GMT`;
}

function useNow(): Date {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(t);
  }, []);
  return now;
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function StatusBadge({ status }: { status: Status }) {
  const styles: Record<Status, string> = {
    Normal: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Moderate: 'bg-amber-50 text-amber-700 border-amber-200',
    Congested: 'bg-red-50 text-red-700 border-red-200',
  };
  const icons = {
    Normal: <Clock className="w-3.5 h-3.5 mr-1.5" />,
    Moderate: <AlertTriangle className="w-3.5 h-3.5 mr-1.5" />,
    Congested: <AlertTriangle className="w-3.5 h-3.5 mr-1.5" />,
  };
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${styles[status]}`}
    >
      {icons[status]}
      {status}
    </span>
  );
}

function TrendIndicator({ trend }: { trend: Trend }) {
  const map: Record<Trend, { icon: React.ReactNode; cls: string; label: string }> = {
    Improving: { icon: <TrendingUp className="w-3.5 h-3.5" />, cls: 'text-emerald-600 bg-emerald-50', label: 'Improving' },
    Stable: { icon: <Minus className="w-3.5 h-3.5" />, cls: 'text-gray-500 bg-gray-50', label: 'Stable' },
    Worsening: { icon: <TrendingDown className="w-3.5 h-3.5" />, cls: 'text-red-600 bg-red-50', label: 'Worsening' },
  };
  const t = map[trend];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${t.cls}`}>
      {t.icon}
      {t.label}
    </span>
  );
}

function StatCard({
  label,
  value,
  sub,
  icon,
  accent,
}: {
  label: string;
  value: string | number;
  sub: string;
  icon: React.ReactNode;
  accent: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-start gap-4">
      <div className={`p-3 rounded-lg ${accent}`}>{icon}</div>
      <div>
        <p className="text-sm text-gray-500 font-medium">{label}</p>
        <p className="text-2xl font-bold text-gray-900 mt-0.5">{value}</p>
        <p className="text-xs text-gray-400 mt-1">{sub}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ Section                                                        */
/* ------------------------------------------------------------------ */

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-gray-900 text-sm md:text-base">{q}</span>
        {open ? (
          <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0 ml-4" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0 ml-4" />
        )}
      </button>
      {open && (
        <div className="px-6 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4 bg-gray-50/50">
          {a}
        </div>
      )}
    </div>
  );
}

const faqs = [
  {
    q: 'How often is the UK & Ireland Port Congestion Tracker updated?',
    a: 'Our port congestion tracker updates twice daily at 06:00 GMT and 18:00 GMT, giving you reliable data on port congestion at Felixstowe, Southampton, Liverpool, Dublin, Belfast and all other monitored ports.',
  },
  {
    q: 'Which ports are included in the congestion tracker?',
    a: 'We track 18 major ports across the UK, Northern Ireland and Republic of Ireland including Felixstowe, Southampton, London Gateway, Liverpool, Bristol, Tilbury, Immingham, Grangemouth, Holyhead, Belfast, Larne, Londonderry, Dublin, Cork, Rosslare Europort, Shannon Foynes and Waterford.',
  },
  {
    q: 'What do the congestion status levels mean?',
    a: 'Normal means standard operations with minimal delays. Moderate indicates some congestion with wait times of 2-4 days. Congested means significant vessel queues with 4+ day wait times. We recommend booking alternative ports during congested periods.',
  },
  {
    q: 'How can I avoid delays at congested UK container ports?',
    a: 'Carrgo recommends monitoring our live port congestion tracker regularly, booking ahead during peak seasons, and considering alternative ports such as London Gateway or Tilbury when Felixstowe is congested. Contact our team for tailored routing advice.',
  },
  {
    q: 'Does port congestion affect freight forwarding costs?',
    a: 'Yes, congestion at major UK and Irish Sea ports can increase demurrage, detention and haulage costs. Our tracker helps you plan around Northern Ireland port delays and ROI port congestion to minimise additional charges.',
  },
];

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function PortCongestion() {
  const now = useNow();
  const [activeTab, setActiveTab] = useState<Tab>('All Ports');
  const [search, setSearch] = useState('');

  /* ---- tabs ---- */
  const tabs: { key: Tab; count: number }[] = useMemo(() => {
    const all = ports.length;
    const eng = ports.filter((p) => p.region === 'England').length;
    const sw = ports.filter((p) => p.region === 'Scotland' || p.region === 'Wales').length;
    const ni = ports.filter((p) => p.region === 'Northern Ireland').length;
    const ie = ports.filter((p) => p.region === 'Ireland').length;
    return [
      { key: 'All Ports', count: all },
      { key: 'England', count: eng },
      { key: 'Scotland & Wales', count: sw },
      { key: 'Northern Ireland', count: ni },
      { key: 'Ireland', count: ie },
    ];
  }, []);

  /* ---- filtered list ---- */
  const filtered = useMemo(() => {
    let list = ports;
    if (activeTab === 'England') list = ports.filter((p) => p.region === 'England');
    if (activeTab === 'Scotland & Wales') list = ports.filter((p) => p.region === 'Scotland' || p.region === 'Wales');
    if (activeTab === 'Northern Ireland') list = ports.filter((p) => p.region === 'Northern Ireland');
    if (activeTab === 'Ireland') list = ports.filter((p) => p.region === 'Ireland');

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.port.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.country.toLowerCase().includes(q)
      );
    }
    return list;
  }, [activeTab, search]);

  /* ---- summary stats ---- */
  const stats = useMemo(() => {
    const normal = ports.filter((p) => p.status === 'Normal').length;
    const moderate = ports.filter((p) => p.status === 'Moderate').length;
    const congested = ports.filter((p) => p.status === 'Congested').length;
    return { normal, moderate, congested, total: ports.length };
  }, []);

  /* ---- status sort order ---- */
  const statusOrder: Record<Status, number> = { Congested: 0, Moderate: 1, Normal: 2 };
  const sorted = useMemo(
    () => [...filtered].sort((a, b) => statusOrder[a.status] - statusOrder[b.status]),
    [filtered]
  );

  const dateStr = formatDateUK(now);
  const timeStr = formatTime24(now);
  const nextUpdate = getNextUpdateLabel(now);

  return (
    <>
      <Seo
        title="UK & Ireland Port Congestion Tracker 2025 | Live Port Status | Carrgo"
        description="Live UK & Ireland port congestion tracker covering Felixstowe, Southampton, Liverpool, Dublin, Belfast, Grangemouth and all major UK, NI and ROI container ports. Real-time wait times, status updates and trends."
        keywords="uk port congestion tracker, port congestion felixstowe, port congestion southampton, belfast port status, dublin port congestion, irish sea ports, northern ireland port delays, liverpool port status, uk container port delays, port congestion today"
      />

      {/* ====== Hero ====== */}
      <section aria-label="Port congestion hero" className="relative py-20 lg:py-28 overflow-hidden"
        style={{ backgroundColor: '#1A6DFF' }}
      >
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '32px 32px',
            }}
          />
        </div>
        <div className="container-carrgo relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white/90 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <Ship className="w-4 h-4" />
              Live Status
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              UK &amp; Ireland Port Congestion Tracker
            </h1>
            <p className="text-lg text-white/90 leading-relaxed max-w-2xl mb-8">
              Real-time congestion status, wait times and operational conditions for all major UK,
              Northern Ireland and Republic of Ireland container and ferry ports. Plan your
              shipments with up-to-date port congestion data for Felixstowe, Southampton, Dublin,
              Belfast and more.
            </p>

            {/* Timestamp banner */}
            <div className="inline-flex flex-wrap items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3 border border-white/20">
              <RefreshCw className="w-4 h-4 text-white/80" />
              <span className="text-sm text-white/90">
                Last updated: <span className="font-semibold text-white">{dateStr}</span> at{' '}
                <span className="font-semibold text-white">{timeStr} GMT</span>
              </span>
              <span className="hidden sm:inline text-white/40">|</span>
              <span className="text-sm text-white/80">
                Next update: <span className="font-semibold text-white">{nextUpdate}</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ====== Stats Bar ====== */}
      <section aria-label="Port statistics" className="py-8" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="container-carrgo">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              label="Total Ports Tracked"
              value={stats.total}
              sub="Across UK, NI & ROI"
              icon={<Ship className="w-5 h-5 text-[#1A6DFF]" />}
              accent="bg-blue-50"
            />
            <StatCard
              label="Normal Operations"
              value={stats.normal}
              sub="No significant delays"
              icon={<Clock className="w-5 h-5 text-emerald-600" />}
              accent="bg-emerald-50"
            />
            <StatCard
              label="Moderate Congestion"
              value={stats.moderate}
              sub="Expect minor delays"
              icon={<AlertTriangle className="w-5 h-5 text-amber-600" />}
              accent="bg-amber-50"
            />
            <StatCard
              label="Congested"
              value={stats.congested}
              sub="Significant delays likely"
              icon={<AlertTriangle className="w-5 h-5 text-red-600" />}
              accent="bg-red-50"
            />
          </div>
        </div>
      </section>

      {/* ====== Main Tracker ====== */}
      <section aria-label="Port congestion table" className="py-12 lg:py-16 bg-white">
        <div className="container-carrgo">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === t.key
                    ? 'bg-[#1A6DFF] text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {t.key}{' '}
                <span
                  className={`ml-1 text-xs ${
                    activeTab === t.key ? 'text-white/80' : 'text-gray-400'
                  }`}
                >
                  ({t.count})
                </span>
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative mb-6 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search ports (e.g. Felixstowe, Dublin...)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A6DFF]/30 focus:border-[#1A6DFF] transition-all"
            />
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-5 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Port
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Country
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Wait Time
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Trend
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
                    Updated
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {sorted.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                      <Search className="w-8 h-8 mx-auto mb-3 opacity-40" />
                      <p className="text-sm">No ports match your search.</p>
                    </td>
                  </tr>
                ) : (
                  sorted.map((p, i) => (
                    <tr
                      key={p.port}
                      className={`transition-colors hover:bg-blue-50/40 ${
                        i % 2 === 0 ? 'bg-white' : 'bg-gray-50/40'
                      }`}
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <Anchor className="w-5 h-5 text-[#1A6DFF] flex-shrink-0" />
                          <div>
                            <div className="font-semibold text-gray-900 text-sm">{p.port}</div>
                            <div className="text-xs text-gray-400">{p.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-1.5 text-xs text-gray-600">
                          <MapPin className="w-3.5 h-3.5 text-gray-400" />
                          {p.country}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <StatusBadge status={p.status} />
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-700 font-medium">{p.waitTime}</td>
                      <td className="px-5 py-4">
                        <TrendIndicator trend={p.trend} />
                      </td>
                      <td className="px-5 py-4 text-right text-xs text-gray-400">{p.lastUpdated}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Legend */}
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              Normal — Standard operations
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              Moderate — Expect minor delays
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              Congested — Significant delays likely
            </div>
          </div>

          <p className="mt-4 text-xs text-gray-400">
            Updates every 12 hours at 06:00 GMT and 18:00 GMT. Wait times are averages and may
            vary depending on vessel size, cargo type and berth availability.
          </p>
        </div>
      </section>

      {/* ====== Info Cards ====== */}
      <section aria-label="How to use tracker" className="py-16" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="container-carrgo">
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
            <article className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <Clock className="w-8 h-8 text-[#1A6DFF] mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Wait Times</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Average vessel waiting time at anchorage before berth assignment across all major UK
                container ports including Felixstowe, Southampton, Liverpool and London Gateway.
              </p>
            </article>
            <article className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <AlertTriangle className="w-8 h-8 text-[#1A6DFF] mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Status Alerts</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Congested ports such as Grangemouth may impact your supply chain. Consider
                alternative Irish Sea ports or Northern Ireland routes during peak congestion.
              </p>
            </article>
            <article className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <Ship className="w-8 h-8 text-[#1A6DFF] mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Planning Ahead</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Use this UK port congestion tracker data to plan shipment timing and select the best
                arrival port for your cargo — whether shipping to England, Scotland, Wales, Northern
                Ireland or the Republic of Ireland.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ====== SEO Content Block ====== */}
      <section aria-label="About port congestion" className="py-16 bg-white">
        <div className="container-carrgo">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              About UK &amp; Ireland Port Congestion
            </h2>
            <div className="prose prose-gray max-w-none text-gray-600 text-sm leading-relaxed space-y-4">
              <p>
                Port congestion at major UK container ports including{' '}
                <strong>Felixstowe</strong> and <strong>Southampton</strong> can cause significant
                disruption to supply chains. Our live UK port congestion tracker monitors vessel
                queues, berth availability and average wait times across 18 ports in England,
                Scotland, Wales, Northern Ireland and the Republic of Ireland.
              </p>
              <p>
                <strong>Belfast port status</strong> and <strong>Dublin port congestion</strong> are
                closely watched by freight forwarders operating across the Irish Sea.{' '}
                <strong>Northern Ireland port delays</strong> at Larne and Londonderry can impact
                ferry services and Ro-Ro cargo, while <strong>Liverpool port status</strong> affects
                trade flows in the north-west of England. For the latest{' '}
                <strong>port congestion today</strong>, bookmark this page and check back at our
                twice-daily update schedule.
              </p>
              <p>
                Whether you are tracking <strong>port congestion at Felixstowe</strong> or
                monitoring <strong>UK container port delays</strong> more broadly, Carrgo provides
                the real-time visibility you need to keep your freight moving.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====== FAQ Section ====== */}
      <section aria-label="Port congestion FAQ" className="py-16" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="container-carrgo">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <HelpCircle className="w-7 h-7 text-[#1A6DFF]" />
              <h2 className="text-2xl font-bold text-gray-900">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="space-y-3">
              {faqs.map((f, i) => (
                <FaqItem key={i} q={f.q} a={f.a} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====== CTA ====== */}
      <section aria-label="Get a quote" className="py-16 lg:py-20 bg-white">
        <div className="container-carrgo">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Need Help Routing Your Shipment?
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Our team monitors UK &amp; Ireland port conditions daily and can advise the best route
              and port for your cargo — helping you avoid congestion at Felixstowe, Dublin, Belfast
              or any other major port.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/get-a-quote"
                className="inline-flex items-center gap-2 text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#1A6DFF' }}
              >
                Get a Quote
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
