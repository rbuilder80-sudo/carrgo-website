import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../../components/Seo';
import {
  allPorts,
  calculateNationalIndex,
  getPortRankings,
  laneData,
  getImporterRisk,
  type PortDetail,
  type Forecast,
  type CongestionReason,
  type ImporterImpact,
  type Trend,
  type CongestionLevel,
} from '../../data/portData';
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
  Gauge,
  Eye,
  Route,
  BarChart3,
  Calculator,
  ArrowUpRight,
  Activity,
  Zap,
  CheckCircle2,
  Info,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Tab = 'All Ports' | 'England' | 'Scotland & Wales' | 'Northern Ireland' | 'Ireland';

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

function StatusBadge({ status }: { status: CongestionLevel }) {
  const styles: Record<CongestionLevel, string> = {
    Normal: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Moderate: 'bg-amber-50 text-amber-700 border-amber-200',
    Congested: 'bg-red-50 text-red-700 border-red-200',
    Severe: 'bg-red-100 text-red-800 border-red-300',
  };
  const icons = {
    Normal: <Clock className="w-3.5 h-3.5 mr-1.5" />,
    Moderate: <AlertTriangle className="w-3.5 h-3.5 mr-1.5" />,
    Congested: <AlertTriangle className="w-3.5 h-3.5 mr-1.5" />,
    Severe: <AlertTriangle className="w-3.5 h-3.5 mr-1.5" />,
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

function HealthScoreBar({ score }: { score: number }) {
  const color =
    score >= 80 ? 'bg-emerald-500' :
    score >= 60 ? 'bg-amber-500' :
    score >= 40 ? 'bg-orange-500' : 'bg-red-500';
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-semibold text-gray-700">{score}</span>
        <span className="text-xs text-gray-400">/ 100</span>
      </div>
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${color} transition-all`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
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

function SparklineChart({ history, color }: { history: PortDetail['history']; color: string }) {
  const data = history.slice(-30);
  if (data.length < 2) return null;
  const width = 300;
  const height = 80;
  const padding = 8;
  const minScore = 30;
  const maxScore = 100;
  const xStep = (width - 2 * padding) / (data.length - 1);
  const points = data.map((d, i) => {
    const x = padding + i * xStep;
    const y = height - padding - ((d.score - minScore) / (maxScore - minScore)) * (height - 2 * padding);
    return `${x},${y}`;
  }).join(' ');
  const labelIndices = [0, Math.floor(data.length / 4), Math.floor(data.length / 2), Math.floor((3 * data.length) / 4), data.length - 1].filter(
    (v, i, a) => a.indexOf(v) === i
  );
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-20">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
      {labelIndices.map((i) => {
        const x = padding + i * xStep;
        return (
          <text key={i} x={x} y={height - 2} fontSize="7" fill="#9CA3AF" textAnchor="middle">
            {data[i].date.slice(5)}
          </text>
        );
      })}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ Section Data                                                   */
/* ------------------------------------------------------------------ */

const faqs = [
  {
    q: 'How often is the UK & Ireland Port Congestion Tracker updated?',
    a: 'This port congestion overview is based on representative example data for demonstration purposes. In a production environment, data would be sourced from real-time AIS vessel tracking, port authority reports, and berth scheduling systems, typically updated twice daily.',
  },
  {
    q: 'Which ports are included in the congestion tracker?',
    a: 'We track 18 major ports across the UK, Northern Ireland and Republic of Ireland including Felixstowe, Southampton, London Gateway, Liverpool, Bristol, Tilbury, Immingham, Grangemouth, Holyhead, Belfast, Larne, Londonderry, Dublin, Cork, Rosslare Europort, Shannon Foynes and Waterford.',
  },
  {
    q: 'What do the congestion status levels mean?',
    a: 'Normal means standard operations with minimal delays. Moderate indicates some congestion with wait times of 2-4 days. Congested means significant vessel queues with 4+ day wait times. Severe indicates critical delays of 6+ days. We recommend booking alternative ports during congested or severe periods.',
  },
  {
    q: 'How can I avoid delays at congested UK container ports?',
    a: 'Carrgo recommends monitoring port congestion indicators regularly, booking ahead during peak seasons, and considering alternative ports such as London Gateway or Tilbury when Felixstowe is congested. Contact our team for tailored routing advice based on current conditions.',
  },
  {
    q: 'Does port congestion affect freight forwarding costs?',
    a: 'Yes, congestion at major UK and Irish Sea ports can increase detention and haulage costs. Our tracker helps you plan around Northern Ireland port delays and ROI port congestion to minimise additional charges.',
  },
];

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function PortCongestion() {
  const now = useNow();
  const [activeTab, setActiveTab] = useState<Tab>('All Ports');
  const [search, setSearch] = useState('');

  /* ---- National index ---- */
  const nationalIndex = useMemo(() => calculateNationalIndex(), []);

  /* ---- tabs ---- */
  const tabs: { key: Tab; count: number }[] = useMemo(() => {
    const all = allPorts.length;
    const eng = allPorts.filter((p) => p.region === 'England').length;
    const sw = allPorts.filter((p) => p.region === 'Scotland' || p.region === 'Wales').length;
    const ni = allPorts.filter((p) => p.region === 'Northern Ireland').length;
    const ie = allPorts.filter((p) => p.region === 'Ireland').length;
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
    let list = allPorts;
    if (activeTab === 'England') list = allPorts.filter((p) => p.region === 'England');
    if (activeTab === 'Scotland & Wales') list = allPorts.filter((p) => p.region === 'Scotland' || p.region === 'Wales');
    if (activeTab === 'Northern Ireland') list = allPorts.filter((p) => p.region === 'Northern Ireland');
    if (activeTab === 'Ireland') list = allPorts.filter((p) => p.region === 'Ireland');

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
    const normal = allPorts.filter((p) => p.status === 'Normal').length;
    const moderate = allPorts.filter((p) => p.status === 'Moderate').length;
    const congested = allPorts.filter((p) => p.status === 'Congested').length;
    const severe = allPorts.filter((p) => p.status === 'Severe').length;
    const fastest = [...allPorts].sort((a, b) => b.healthScore - a.healthScore)[0];
    const slowest = [...allPorts].sort((a, b) => a.healthScore - b.healthScore)[0];
    return { normal, moderate, congested, severe, total: allPorts.length, fastest, slowest };
  }, []);

  /* ---- status sort order ---- */
  const statusOrder: Record<CongestionLevel, number> = { Severe: 0, Congested: 1, Moderate: 2, Normal: 3 };
  const sorted = useMemo(
    () => [...filtered].sort((a, b) => statusOrder[a.status] - statusOrder[b.status]),
    [filtered]
  );

  /* ---- congested ports for alerts ---- */
  const congestedPorts = useMemo(() => getPortRankings().congested, []);

  /* ---- weekly intelligence ---- */
  const weeklyStats = useMemo(() => {
    const improving = allPorts.filter((p) => p.scoreTrend > 0).length;
    const worsening = allPorts.filter((p) => p.scoreTrend < 0).length;
    const stable = allPorts.filter((p) => p.scoreTrend === 0).length;
    const mostImproved = [...allPorts].sort((a, b) => b.scoreTrend - a.scoreTrend)[0];
    const mostDeclined = [...allPorts].sort((a, b) => a.scoreTrend - b.scoreTrend)[0];
    return { improving, worsening, stable, mostImproved, mostDeclined };
  }, []);

  /* ---- rankings for section 9 ---- */
  const rankings = useMemo(() => {
    const fastest = [...allPorts].sort((a, b) => b.healthScore - a.healthScore).slice(0, 5);
    const slowest = [...allPorts].sort((a, b) => a.healthScore - b.healthScore).slice(0, 5);
    const mostImproved = [...allPorts].sort((a, b) => b.scoreTrend - a.scoreTrend).slice(0, 5);
    const mostDeclined = [...allPorts].sort((a, b) => a.scoreTrend - b.scoreTrend).slice(0, 5);
    return { fastest, slowest, mostImproved, mostDeclined };
  }, []);

  /* ---- top 3 congested for sparklines ---- */
  const topCongested = useMemo(() => {
    return [...allPorts]
      .sort((a, b) => statusOrder[a.status] - statusOrder[b.status])
      .slice(0, 3);
  }, []);

  /* ---- lane risk colors ---- */
  const laneRiskColor = (risk: string) => {
    if (risk === 'Low') return 'text-emerald-600 bg-emerald-50';
    if (risk === 'Medium') return 'text-amber-600 bg-amber-50';
    return 'text-red-600 bg-red-50';
  };

  const importerRiskColor = (risk: string) => {
    if (risk === 'Low') return 'text-emerald-600 bg-emerald-50';
    if (risk === 'Medium') return 'text-amber-600 bg-amber-50';
    if (risk === 'High') return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  const dateStr = formatDateUK(now);
  const timeStr = formatTime24(now);
  const nextUpdate = getNextUpdateLabel(now);

  return (
    <>
      <Seo
        title="UK & Ireland Port Congestion Overview 2026 | Port Status | Carrgo"
        description="UK & Ireland port congestion overview covering Felixstowe, Southampton, Liverpool, Dublin, Belfast, Grangemouth and all major UK, NI and ROI container ports. Example wait times, status indicators and trend simulations."
        keywords="uk port congestion tracker, port congestion felixstowe, port congestion southampton, belfast port status, dublin port congestion, irish sea ports, northern ireland port delays, liverpool port status, uk container port delays, port congestion today"
        canonical="https://carrgo.co.uk/resources/port-congestion-tracker"
      />

      {/* ====== Hero ====== */}
      <section aria-label="Port congestion hero" className="relative py-20 lg:py-28 overflow-hidden" style={{ backgroundColor: '#1A6DFF' }}>
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
              Port Status Overview
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              Carrgo Port Intelligence
            </h1>
            <p className="text-lg text-white/90 leading-relaxed max-w-2xl mb-8">
              UK &amp; Ireland Port Congestion Tracker, Predictions &amp; Importer Tools
            </p>

            {/* National Port Health Index */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 px-6 py-5 mb-8 inline-flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
              <div>
                <p className="text-sm text-white/80 font-medium mb-1">National Port Health Index</p>
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl font-bold text-white">{nationalIndex.index}</span>
                  <span className="text-white/70 text-sm">/ 100</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {nationalIndex.trend === 'Improving' ? (
                  <TrendingUp className="w-5 h-5 text-emerald-300" />
                ) : nationalIndex.trend === 'Worsening' ? (
                  <TrendingDown className="w-5 h-5 text-red-300" />
                ) : (
                  <Minus className="w-5 h-5 text-gray-300" />
                )}
                <span
                  className={`text-sm font-semibold ${
                    nationalIndex.trend === 'Improving'
                      ? 'text-emerald-300'
                      : nationalIndex.trend === 'Worsening'
                      ? 'text-red-300'
                      : 'text-gray-300'
                  }`}
                >
                  {nationalIndex.trend} ({nationalIndex.change > 0 ? '+' : ''}
                  {nationalIndex.change})
                </span>
              </div>
              <div className="hidden sm:block w-px h-10 bg-white/20" />
              <div className="text-sm text-white/70">
                <p>UK Average</p>
                <p className="text-white/50 text-xs mt-0.5">
                  Updated {dateStr} {timeStr} GMT
                </p>
              </div>
            </div>

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
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
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
              label="Severe / Congested"
              value={stats.congested + stats.severe}
              sub="Significant delays likely"
              icon={<AlertTriangle className="w-5 h-5 text-red-600" />}
              accent="bg-red-50"
            />
            <StatCard
              label="Fastest Port"
              value={stats.fastest?.port ?? '—'}
              sub={`Score: ${stats.fastest?.healthScore ?? '—'}`}
              icon={<Gauge className="w-5 h-5 text-emerald-600" />}
              accent="bg-emerald-50"
            />
            <StatCard
              label="Slowest Port"
              value={stats.slowest?.port ?? '—'}
              sub={`Score: ${stats.slowest?.healthScore ?? '—'}`}
              icon={<Gauge className="w-5 h-5 text-red-600" />}
              accent="bg-red-50"
            />
          </div>
        </div>
      </section>

      {/* ====== Port Intelligence Table ====== */}
      <section aria-label="Port intelligence table" className="py-12 lg:py-16 bg-white">
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
                    Health Score
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
                  <th className="px-5 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    24h Forecast
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Importer Risk
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {sorted.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center text-gray-400">
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
                      <td className="px-5 py-4 w-32">
                        <HealthScoreBar score={p.healthScore} />
                      </td>
                      <td className="px-5 py-4">
                        <StatusBadge status={p.status} />
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-700 font-medium">{p.waitTime}</td>
                      <td className="px-5 py-4">
                        <TrendIndicator trend={p.trend} />
                      </td>
                      <td className="px-5 py-4">
                        {p.forecasts[0] ? (
                          <StatusBadge status={p.forecasts[0].congestion} />
                        ) : (
                          <span className="text-xs text-gray-400">—</span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${importerRiskColor(
                            getImporterRisk(p.healthScore)
                          )}`}
                        >
                          {getImporterRisk(p.healthScore)}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <Link
                          to={`/ports/${p.slug}`}
                          className="inline-flex items-center gap-1 text-xs font-medium text-[#1A6DFF] hover:underline"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          View
                        </Link>
                      </td>
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
              <span className="w-3 h-3 rounded-full bg-orange-500" />
              Congested — Significant delays
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-700" />
              Severe — Critical delays
            </div>
          </div>

          <p className="mt-4 text-xs text-gray-400">
            Data shown is representative example data for demonstration purposes. Wait times are
            illustrative and may vary depending on vessel size, cargo type and berth availability.
            For live port conditions, contact the relevant port authority or your freight forwarder.
          </p>
        </div>
      </section>

      {/* ====== Importer Alert Section ====== */}
      <section aria-label="Importer alerts" className="py-12 lg:py-16" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="container-carrgo">
          <div className="flex items-center gap-3 mb-8">
            <AlertTriangle className="w-7 h-7 text-red-600" />
            <h2 className="text-2xl font-bold text-gray-900">Importer Alerts</h2>
          </div>
          {congestedPorts.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
              <p className="text-lg font-semibold text-gray-900">All ports operating normally</p>
              <p className="text-sm text-gray-500 mt-1">No congestion alerts at this time.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {congestedPorts.map((p) => (
                <div key={p.port} className="bg-white rounded-xl border border-red-200 p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                      <h3 className="font-semibold text-gray-900">{p.port}</h3>
                    </div>
                    <StatusBadge status={p.status} />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Health Score</span>
                      <span className="text-sm font-bold text-red-600">{p.healthScore}/100</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Expected Delay</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {p.importerImpact.expectedDelay}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Demurrage Risk</span>
                      <span
                        className={`text-sm font-semibold ${
                          p.importerImpact.demurrageRisk === 'Low'
                            ? 'text-emerald-600'
                            : p.importerImpact.demurrageRisk === 'Medium'
                            ? 'text-amber-600'
                            : 'text-red-600'
                        }`}
                      >
                        {p.importerImpact.demurrageRisk}
                      </span>
                    </div>
                    <div className="pt-3 border-t border-gray-100">
                      <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
                        Recommended Action
                      </p>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {p.importerImpact.recommendedAction}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ====== Lane Health Map ====== */}
      <section aria-label="Lane health map" className="py-12 lg:py-16 bg-white">
        <div className="container-carrgo">
          <div className="flex items-center gap-3 mb-8">
            <Route className="w-7 h-7 text-[#1A6DFF]" />
            <h2 className="text-2xl font-bold text-gray-900">International Lane Health</h2>
          </div>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-5 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Route
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Health Score
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Normal ETA
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Current ETA
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Difference
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Risk
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {laneData.map((lane) => (
                  <tr
                    key={`${lane.origin}-${lane.destination}`}
                    className="hover:bg-blue-50/40 transition-colors"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                        <MapPin className="w-3.5 h-3.5 text-gray-400" />
                        {lane.origin}
                        <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
                        {lane.destination}
                      </div>
                    </td>
                    <td className="px-5 py-4 w-32">
                      <HealthScoreBar score={lane.health} />
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-700">{lane.normalEta}</td>
                    <td className="px-5 py-4 text-sm text-gray-700 font-medium">
                      {lane.currentEta}
                    </td>
                    <td className="px-5 py-4 text-sm text-red-600 font-medium">
                      {lane.difference}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${laneRiskColor(
                          lane.risk
                        )}`}
                      >
                        {lane.risk}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ====== Weekly Intelligence Preview ====== */}
      <section aria-label="Weekly intelligence" className="py-12 lg:py-16" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="container-carrgo">
          <div className="flex items-center gap-3 mb-8">
            <BarChart3 className="w-7 h-7 text-[#1A6DFF]" />
            <h2 className="text-2xl font-bold text-gray-900">Weekly Port Intelligence</h2>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <p className="text-lg text-gray-700">
              This week:{' '}
              <span className="font-bold text-emerald-600">
                {weeklyStats.improving} ports improving
              </span>
              ,{' '}
              <span className="font-bold text-red-600">
                {weeklyStats.worsening} ports worsening
              </span>
              , <span className="font-bold text-gray-600">{weeklyStats.stable} stable</span>
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-5 h-5 text-emerald-600" />
                <h3 className="font-semibold text-gray-900">Most Improved This Week</h3>
              </div>
              {weeklyStats.mostImproved ? (
                <div>
                  <p className="text-2xl font-bold text-gray-900">{weeklyStats.mostImproved.port}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Health score trend:{' '}
                    <span className="font-bold text-emerald-600">
                      +{weeklyStats.mostImproved.scoreTrend}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500">Current score: {weeklyStats.mostImproved.healthScore}</p>
                </div>
              ) : (
                <p className="text-sm text-gray-400">No data available</p>
              )}
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-3">
                <TrendingDown className="w-5 h-5 text-red-600" />
                <h3 className="font-semibold text-gray-900">Most Declined This Week</h3>
              </div>
              {weeklyStats.mostDeclined ? (
                <div>
                  <p className="text-2xl font-bold text-gray-900">{weeklyStats.mostDeclined.port}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Health score trend:{' '}
                    <span className="font-bold text-red-600">
                      {weeklyStats.mostDeclined.scoreTrend}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500">Current score: {weeklyStats.mostDeclined.healthScore}</p>
                </div>
              ) : (
                <p className="text-sm text-gray-400">No data available</p>
              )}
            </div>
          </div>
          <div className="text-right">
            <Link
              to="/resources/weekly-report"
              className="inline-flex items-center gap-2 text-[#1A6DFF] font-medium hover:underline"
            >
              View full weekly report
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ====== Tools CTA Section ====== */}
      <section aria-label="Importer tools" className="py-12 lg:py-16 bg-white">
        <div className="container-carrgo">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <Calculator className="w-8 h-8 text-[#1A6DFF] mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2 text-lg">Importer Cost Calculator</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Calculate demurrage, detention, storage and lost sales costs for delayed cargo.
              </p>
              <Link
                to="/tools/cost-calculator"
                className="inline-flex items-center gap-2 text-[#1A6DFF] font-medium text-sm hover:underline"
              >
                Open calculator
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <Activity className="w-8 h-8 text-[#1A6DFF] mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2 text-lg">Port Comparison</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Compare health scores, wait times and forecasts across multiple ports.
              </p>
              <Link
                to="/tools/port-comparison"
                className="inline-flex items-center gap-2 text-[#1A6DFF] font-medium text-sm hover:underline"
              >
                Compare ports
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ====== Historical Charts Section ====== */}
      <section aria-label="Historical charts" className="py-12 lg:py-16" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="container-carrgo">
          <div className="flex items-center gap-3 mb-8">
            <Activity className="w-7 h-7 text-[#1A6DFF]" />
            <h2 className="text-2xl font-bold text-gray-900">30-Day Port Health Trends</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {topCongested.map((p) => {
              const lineColor =
                p.healthScore >= 80
                  ? '#10B981'
                  : p.healthScore >= 60
                  ? '#F59E0B'
                  : p.healthScore >= 40
                  ? '#F97316'
                  : '#EF4444';
              return (
                <div key={p.port} className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">{p.port}</h3>
                      <p className="text-xs text-gray-400">Score: {p.healthScore}</p>
                    </div>
                    <StatusBadge status={p.status} />
                  </div>
                  <SparklineChart history={p.history} color={lineColor} />
                  <p className="text-xs text-gray-400 mt-2 text-center">
                    Last 30 days of health scores
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====== Port Rankings Section ====== */}
      <section aria-label="Port rankings" className="py-12 lg:py-16 bg-white">
        <div className="container-carrgo">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Port Rankings</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Fastest Ports */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                Fastest Ports
              </h3>
              <table className="w-full text-left">
                <tbody>
                  {rankings.fastest.map((p, i) => (
                    <tr key={p.port} className="border-b border-gray-50 last:border-0">
                      <td className="py-2 text-xs text-gray-400 w-6">#{i + 1}</td>
                      <td className="py-2 text-sm font-medium text-gray-900">{p.port}</td>
                      <td className="py-2 text-sm font-bold text-emerald-600 text-right">
                        {p.healthScore}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Slowest Ports */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-red-600" />
                Slowest Ports
              </h3>
              <table className="w-full text-left">
                <tbody>
                  {rankings.slowest.map((p, i) => (
                    <tr key={p.port} className="border-b border-gray-50 last:border-0">
                      <td className="py-2 text-xs text-gray-400 w-6">#{i + 1}</td>
                      <td className="py-2 text-sm font-medium text-gray-900">{p.port}</td>
                      <td className="py-2 text-sm font-bold text-red-600 text-right">
                        {p.healthScore}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Most Improved */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-600" />
                Most Improved
              </h3>
              <table className="w-full text-left">
                <tbody>
                  {rankings.mostImproved.map((p, i) => (
                    <tr key={p.port} className="border-b border-gray-50 last:border-0">
                      <td className="py-2 text-xs text-gray-400 w-6">#{i + 1}</td>
                      <td className="py-2 text-sm font-medium text-gray-900">{p.port}</td>
                      <td className="py-2 text-sm font-bold text-emerald-600 text-right">
                        +{p.scoreTrend}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Most Declined */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-red-600" />
                Most Declined
              </h3>
              <table className="w-full text-left">
                <tbody>
                  {rankings.mostDeclined.map((p, i) => (
                    <tr key={p.port} className="border-b border-gray-50 last:border-0">
                      <td className="py-2 text-xs text-gray-400 w-6">#{i + 1}</td>
                      <td className="py-2 text-sm font-medium text-gray-900">{p.port}</td>
                      <td className="py-2 text-sm font-bold text-red-600 text-right">
                        {p.scoreTrend}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
                disruption to supply chains. This port congestion overview provides representative
                example data on vessel queues, berth availability and illustrative wait times across
                18 ports in England, Scotland, Wales, Northern Ireland and the Republic of Ireland.
              </p>
              <p>
                <strong>Belfast port status</strong> and <strong>Dublin port congestion</strong> are
                closely watched by freight forwarders operating across the Irish Sea.{' '}
                <strong>Northern Ireland port delays</strong> at Larne and Londonderry can impact
                ferry services and Ro-Ro cargo, while <strong>Liverpool port status</strong> affects
                trade flows in the north-west of England. For the latest{' '}
                <strong>port congestion conditions</strong>, bookmark this page or contact our team
                for current routing advice.
              </p>
              <p>
                Whether you are tracking <strong>port congestion at Felixstowe</strong> or
                monitoring <strong>UK container port delays</strong> more broadly, Carrgo provides
                the visibility you need to keep your freight moving.
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

      {/* ====== Methodology & Disclaimer ====== */}
      <section aria-label="Methodology and data disclaimer" className="py-12 lg:py-16 bg-white border-t border-gray-100">
        <div className="container-carrgo">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Info className="w-6 h-6 text-[#1A6DFF]" />
              <h2 className="text-xl font-bold text-gray-900">Methodology &amp; Data Disclaimer</h2>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-6">
              <p className="text-sm text-amber-800 font-medium mb-2">
                Important: This page displays representative example data for demonstration purposes.
              </p>
              <p className="text-sm text-amber-700 leading-relaxed">
                The port congestion indicators, health scores, wait times, forecasts and historical
                trends shown on this page are simulated example data — not live or real-time port
                conditions. In a production environment, this dashboard would integrate with live data
                feeds such as AIS vessel tracking, port authority berth schedules, and marine
                traffic APIs. For current port conditions, always contact the relevant port authority
                or your freight forwarder.
              </p>
            </div>
            <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
              <p>
                <strong>Data Sources (Planned):</strong> In a fully operational deployment, this
                dashboard would source data from: (1) Automatic Identification System (AIS) vessel
                tracking for real-time vessel positions and queue lengths; (2) Port authority berth
                scheduling and capacity reports; (3) MarineTraffic and VesselFinder APIs for vessel
                movements; (4) UK Major Ports Group and British Ports Association publications; (5)
                Local port operator reports (e.g., Peel Ports, DP World, ABP); (6) Weather and
                maritime condition feeds from the Met Office and Met Éireann.
              </p>
              <p>
                <strong>Health Score Methodology:</strong> The Port Health Score (0–100) is a composite
                metric combining illustrative factors: berth utilisation rate, average vessel waiting
                time, truck turnaround time, customs clearance speed, and rail/road connectivity. In a
                production system, these would be weighted dynamically based on historical correlation
                with actual delay incidents. Currently shown scores are representative placeholders.
              </p>
              <p>
                <strong>Forecasting:</strong> The 24-hour, 3-day and 7-day congestion forecasts shown
                are static scenario descriptions for demonstration. A production system would use
                predictive models combining scheduled vessel arrivals, weather forecasts, historical
                congestion patterns, and known infrastructure events (e.g., crane maintenance, berth
                closures) to generate probability-weighted congestion predictions.
              </p>
              <p>
                <strong>Importer Impact:</strong> Demurrage risk assessments and recommended actions
                are illustrative guidance based on typical industry patterns. Actual detention and
                demurrage costs vary by shipping line, container type, and contractual terms. Always
                verify with your carrier and freight forwarder before making routing decisions.
              </p>
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
