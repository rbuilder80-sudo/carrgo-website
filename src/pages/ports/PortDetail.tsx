import { useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import Seo from '../../components/Seo';
import {
  allPorts,
  getImporterRisk,
  calculateCosts,
  laneData,
  type PortDetail,
  type CongestionLevel,
  type Trend,
  type CongestionReason,
  type Forecast,
} from '../../data/portData';
import {
  Ship,
  Clock,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Minus,
  ArrowRight,
  ArrowLeft,
  Anchor,
  RefreshCw,
  MapPin,
  Package,
  DollarSign,
  Calendar,
  CheckCircle2,
  Info,
  Train,
  Warehouse,
  Truck,
  BarChart3,
  Activity,
  ChevronRight,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function getScoreColor(score: number): string {
  if (score >= 80) return '#10B981'; // emerald
  if (score >= 60) return '#F59E0B'; // amber
  if (score >= 40) return '#F97316'; // orange
  return '#EF4444'; // red
}

function getScoreBgClass(score: number): string {
  if (score >= 80) return 'bg-emerald-50 text-emerald-700 border-emerald-200';
  if (score >= 60) return 'bg-amber-50 text-amber-700 border-amber-200';
  if (score >= 40) return 'bg-orange-50 text-orange-700 border-orange-200';
  return 'bg-red-50 text-red-700 border-red-200';
}

function getStatusBadgeClass(status: CongestionLevel): string {
  switch (status) {
    case 'Normal':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'Moderate':
      return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'Congested':
      return 'bg-red-50 text-red-700 border-red-200';
    case 'Severe':
      return 'bg-red-100 text-red-800 border-red-300';
    default:
      return 'bg-gray-50 text-gray-700 border-gray-200';
  }
}

function getTrendBadgeClass(trend: Trend): string {
  switch (trend) {
    case 'Improving':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'Stable':
      return 'bg-gray-50 text-gray-600 border-gray-200';
    case 'Worsening':
      return 'bg-red-50 text-red-700 border-red-200';
    default:
      return 'bg-gray-50 text-gray-600 border-gray-200';
  }
}

function getSeverityBadgeClass(severity: CongestionReason['severity']): string {
  switch (severity) {
    case 'minor':
      return 'bg-gray-100 text-gray-600 border-gray-200';
    case 'moderate':
      return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'major':
      return 'bg-red-50 text-red-700 border-red-200';
    default:
      return 'bg-gray-100 text-gray-600 border-gray-200';
  }
}

function getSeverityDotClass(severity: CongestionReason['severity']): string {
  switch (severity) {
    case 'minor':
      return 'bg-gray-400';
    case 'moderate':
      return 'bg-amber-500';
    case 'major':
      return 'bg-red-500';
    default:
      return 'bg-gray-400';
  }
}

function getCongestionBadgeClass(congestion: CongestionLevel): string {
  switch (congestion) {
    case 'Normal':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'Moderate':
      return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'Congested':
      return 'bg-red-50 text-red-700 border-red-200';
    case 'Severe':
      return 'bg-red-100 text-red-800 border-red-300';
    default:
      return 'bg-gray-50 text-gray-700 border-gray-200';
  }
}

function getDemurrageBadgeClass(risk: string): string {
  switch (risk) {
    case 'Low':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'Medium':
      return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'High':
      return 'bg-red-50 text-red-700 border-red-200';
    case 'Very High':
      return 'bg-red-100 text-red-800 border-red-300';
    default:
      return 'bg-gray-50 text-gray-700 border-gray-200';
  }
}

function getRiskBadgeClass(risk: string): string {
  switch (risk) {
    case 'Low':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'Medium':
      return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'High':
      return 'bg-red-50 text-red-700 border-red-200';
    case 'Very High':
      return 'bg-red-100 text-red-800 border-red-300';
    default:
      return 'bg-gray-50 text-gray-700 border-gray-200';
  }
}

function getLaneRiskBadgeClass(risk: 'Low' | 'Medium' | 'High'): string {
  switch (risk) {
    case 'Low':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'Medium':
      return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'High':
      return 'bg-red-50 text-red-700 border-red-200';
    default:
      return 'bg-gray-50 text-gray-700 border-gray-200';
  }
}

function formatDateShort(dateStr: string): string {
  const d = new Date(dateStr);
  return `${d.getDate()}/${d.getMonth() + 1}`;
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                      */
/* ------------------------------------------------------------------ */

function CircularProgress({ score, size = 160 }: { score: number; size?: number }) {
  const color = getScoreColor(score);
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.6s ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-gray-900">{score}</span>
        <span className="text-xs text-gray-500 font-medium">/ 100</span>
      </div>
    </div>
  );
}

function HistoryChart({ history, score }: { history: PortDetail['history']; score: number }) {
  const width = 800;
  const height = 240;
  const padding = { top: 20, right: 20, bottom: 40, left: 40 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const yMin = 30;
  const yMax = 100;

  const xScale = (index: number) => padding.left + (index / (history.length - 1)) * chartW;
  const yScale = (value: number) => padding.top + chartH - ((value - yMin) / (yMax - yMin)) * chartH;

  const lineColor = getScoreColor(score);

  const pathD = history
    .map((pt, i) => `${i === 0 ? 'M' : 'L'} ${xScale(i)} ${yScale(pt.score)}`)
    .join(' ');

  const areaD = `${pathD} L ${xScale(history.length - 1)} ${yScale(yMin)} L ${xScale(0)} ${yScale(yMin)} Z`;

  // Pick ~10 evenly spaced dates for labels
  const labelIndices = useMemo(() => {
    const indices: number[] = [];
    const step = Math.floor((history.length - 1) / 10);
    for (let i = 0; i < history.length; i += step) {
      indices.push(i);
    }
    if (indices[indices.length - 1] !== history.length - 1) {
      indices.push(history.length - 1);
    }
    return indices;
  }, [history.length]);

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Y-axis grid lines */}
        {[40, 60, 80, 100].map((val) => (
          <g key={val}>
            <line
              x1={padding.left}
              y1={yScale(val)}
              x2={width - padding.right}
              y2={yScale(val)}
              stroke="#E5E7EB"
              strokeDasharray="4 4"
            />
            <text
              x={padding.left - 8}
              y={yScale(val)}
              textAnchor="end"
              alignmentBaseline="middle"
              className="text-xs fill-gray-400"
              fontSize="10"
            >
              {val}
            </text>
          </g>
        ))}

        {/* Reference line at 80 */}
        <line
          x1={padding.left}
          y1={yScale(80)}
          x2={width - padding.right}
          y2={yScale(80)}
          stroke="#10B981"
          strokeWidth={1.5}
          strokeDasharray="6 4"
          opacity={0.7}
        />
        <text
          x={width - padding.right + 4}
          y={yScale(80)}
          textAnchor="start"
          alignmentBaseline="middle"
          className="text-xs fill-emerald-600"
          fontSize="10"
        >
          Normal
        </text>

        {/* Area fill */}
        <path d={areaD} fill={lineColor} opacity={0.08} />

        {/* Line */}
        <path
          d={pathD}
          fill="none"
          stroke={lineColor}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Points */}
        {history.map((pt, i) => (
          <circle
            key={i}
            cx={xScale(i)}
            cy={yScale(pt.score)}
            r={2.5}
            fill={lineColor}
            opacity={0.6}
          />
        ))}

        {/* X-axis labels */}
        {labelIndices.map((i) => (
          <text
            key={i}
            x={xScale(i)}
            y={height - 10}
            textAnchor="middle"
            className="text-xs fill-gray-400"
            fontSize="10"
          >
            {formatDateShort(history[i].date)}
          </text>
        ))}
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function PortDetail() {
  const { slug } = useParams<{ slug: string }>();

  const port = useMemo(() => allPorts.find((p) => p.slug === slug), [slug]);

  /* ---- Cost Calculator State ---- */
  const [containerType, setContainerType] = useState<'20ft' | '40ft' | '40ft HC' | 'LCL'>('40ft');
  const [cargoValue, setCargoValue] = useState<string>('50000');
  const [delayDays, setDelayDays] = useState<string>('5');
  const [costResult, setCostResult] = useState<ReturnType<typeof calculateCosts> | null>(null);

  const handleCalculate = () => {
    if (!port) return;
    const value = parseFloat(cargoValue) || 0;
    const days = parseInt(delayDays, 10) || 0;
    const result = calculateCosts({ containerType, cargoValue: value, delayDays: days, port: port.port });
    setCostResult(result);
  };

  /* ---- Related lanes ---- */
  const relatedLanes = useMemo(() => {
    if (!port) return [];
    return laneData.filter((l) => l.destination.toLowerCase() === port.port.toLowerCase());
  }, [port]);

  /* ---- Alternative ports ---- */
  const alternatives = useMemo(() => {
    if (!port) return [];
    const isCongested = port.status === 'Congested' || port.status === 'Severe' || port.healthScore < 60;
    if (!isCongested) return [];
    return allPorts
      .filter((p) => p.region === port.region && p.slug !== port.slug && p.healthScore > port.healthScore)
      .sort((a, b) => b.healthScore - a.healthScore)
      .slice(0, 3);
  }, [port]);

  /* ---- Not Found ---- */
  if (!port) {
    return (
      <>
        <Seo
          title="Port Not Found | Carrgo Port Intelligence"
          description="The requested port could not be found in our UK & Ireland port congestion tracker."
        />
        <section className="py-24 lg:py-32 bg-white">
          <div className="container-carrgo text-center">
            <Anchor className="w-16 h-16 text-gray-300 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Port Not Found</h1>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              We couldn&apos;t find the port you&apos;re looking for in our UK &amp; Ireland port intelligence database.
            </p>
            <Link
              to="/resources/port-congestion-tracker"
              className="inline-flex items-center gap-2 text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
              style={{ backgroundColor: '#1A6DFF' }}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Port Intelligence
            </Link>
          </div>
        </section>
      </>
    );
  }

  const scoreColor = getScoreColor(port.healthScore);
  const scoreBgClass = getScoreBgClass(port.healthScore);
  const statusBadgeClass = getStatusBadgeClass(port.status);
  const trendBadgeClass = getTrendBadgeClass(port.trend);
  const importerRisk = getImporterRisk(port.healthScore);

  const activeReasons = port.reasons.filter((r) => r.active);
  const hasActiveReasons = activeReasons.length > 0;

  const seoKeywords = `${port.port} port congestion, ${port.port} port status, ${port.port} container delays, ${port.port} freight forwarding, ${port.port} shipping delays, UK port congestion tracker`;

  return (
    <>
      <Seo
        title={`${port.port} Port Status & Health Score | Live Congestion | Carrgo`}
        description={`Live ${port.port} port status, health score, congestion forecasts and importer intelligence. Current status: ${port.status}. Wait time: ${port.waitTime}. Updated ${port.lastUpdated}.`}
        keywords={seoKeywords}
      />

      {/* ====== 1. Hero Section ====== */}
      <section aria-label="Port detail hero" className="relative py-16 lg:py-24 overflow-hidden" style={{ backgroundColor: '#1A6DFF' }}>
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
          <div className="max-w-4xl">
            <Link
              to="/resources/port-congestion-tracker"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Port Intelligence
            </Link>

            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white/90 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                  <Ship className="w-4 h-4" />
                  Port Intelligence
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{port.port}</h1>
                <p className="text-lg text-white/90 leading-relaxed max-w-2xl">
                  Port Health Score&trade;, Real-Time Forecasts &amp; Importer Intelligence
                </p>
              </div>

              <div className="flex flex-col items-start lg:items-end gap-3">
                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${statusBadgeClass}`}>
                    <Activity className="w-3.5 h-3.5 mr-1.5" />
                    {port.status}
                  </span>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${trendBadgeClass}`}>
                    {port.trend === 'Improving' && <TrendingUp className="w-3.5 h-3.5 mr-1" />}
                    {port.trend === 'Stable' && <Minus className="w-3.5 h-3.5 mr-1" />}
                    {port.trend === 'Worsening' && <TrendingDown className="w-3.5 h-3.5 mr-1" />}
                    {port.trend}
                  </span>
                </div>
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20">
                  <RefreshCw className="w-3.5 h-3.5 text-white/80" />
                  <span className="text-sm text-white/90">
                    Last updated: <span className="font-semibold text-white">{port.lastUpdated}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== 2. Health Score Deep Dive ====== */}
      <section aria-label="Health score deep dive" className="py-12 lg:py-16" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="container-carrgo">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Circular Progress */}
            <div className="bg-white rounded-xl border border-gray-200 p-8 flex flex-col items-center text-center">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Port Health Score&trade;</h2>
              <CircularProgress score={port.healthScore} />
              <div className="mt-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold border" style={{ borderColor: scoreColor, color: scoreColor, backgroundColor: `${scoreColor}15` }}>
                {port.healthScore >= 80 ? 'Normal' : port.healthScore >= 60 ? 'Moderate' : port.healthScore >= 40 ? 'Congested' : 'Severe'}
              </div>
            </div>

            {/* Score Breakdown */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Score Comparison</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-4 rounded-lg bg-gray-50">
                    <p className="text-xs text-gray-500 font-medium mb-1">Yesterday</p>
                    <p className="text-xl font-bold text-gray-900">{port.scoreYesterday}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-50">
                    <p className="text-xs text-gray-500 font-medium mb-1">Week Ago</p>
                    <p className="text-xl font-bold text-gray-900">{port.scoreWeekAgo}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-50">
                    <p className="text-xs text-gray-500 font-medium mb-1">Month Ago</p>
                    <p className="text-xl font-bold text-gray-900">{port.scoreMonthAgo}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Score Trend</h3>
                <div className="flex items-center gap-3">
                  {port.scoreTrend > 0 ? (
                    <TrendingUp className="w-6 h-6 text-emerald-600" />
                  ) : port.scoreTrend < 0 ? (
                    <TrendingDown className="w-6 h-6 text-red-600" />
                  ) : (
                    <Minus className="w-6 h-6 text-gray-500" />
                  )}
                  <span className={`text-2xl font-bold ${port.scoreTrend > 0 ? 'text-emerald-600' : port.scoreTrend < 0 ? 'text-red-600' : 'text-gray-500'}`}>
                    {port.scoreTrend > 0 ? '+' : ''}{port.scoreTrend}
                  </span>
                  <span className="text-sm text-gray-500">points change</span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">All-Time Range</h3>
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <p className="text-xs text-gray-500 font-medium mb-1">Best Score</p>
                    <p className="text-xl font-bold text-emerald-600">{port.bestScore}</p>
                  </div>
                  <div className="h-10 w-px bg-gray-200" />
                  <div className="text-center">
                    <p className="text-xs text-gray-500 font-medium mb-1">Worst Score</p>
                    <p className="text-xl font-bold text-red-600">{port.worstScore}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== 3. Port Status Dashboard ====== */}
      <section aria-label="Port status dashboard" className="py-12 lg:py-16 bg-white">
        <div className="container-carrgo">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Operational Dashboard</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1: Vessels & Berth */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2.5 rounded-lg bg-blue-50">
                  <Ship className="w-5 h-5 text-[#1A6DFF]" />
                </div>
                <h3 className="font-semibold text-gray-900">Vessel Activity</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Vessels Waiting</span>
                  <span className="text-lg font-bold text-gray-900">{port.vesselsWaiting}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Vessels at Berth</span>
                  <span className="text-lg font-bold text-gray-900">{port.vesselsAtBerth}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Berth Utilization</span>
                  <span className="text-lg font-bold text-gray-900">{port.berthUtilization}%</span>
                </div>
              </div>
            </div>

            {/* Card 2: Wait Times */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2.5 rounded-lg bg-amber-50">
                  <Clock className="w-5 h-5 text-amber-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Wait &amp; Turnaround</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Wait Time</span>
                  <span className="text-lg font-bold text-gray-900">{port.waitTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Customs Avg</span>
                  <span className="text-lg font-bold text-gray-900">{port.customsAvgHours} hrs</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Truck Turnaround</span>
                  <span className="text-lg font-bold text-gray-900">{port.truckTurnaround}</span>
                </div>
              </div>
            </div>

            {/* Card 3: Capacity & Carriers */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2.5 rounded-lg bg-emerald-50">
                  <BarChart3 className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Capacity &amp; Carriers</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Annual Volume</span>
                  <span className="text-lg font-bold text-gray-900">{port.annualVolume}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Container Capacity</span>
                  <span className="text-sm font-bold text-gray-900 text-right">{port.containerCapacity}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-600 block mb-2">Main Carriers</span>
                  <span className="text-sm font-medium text-gray-900">{port.mainCarriers.join(', ')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== 4. Congestion Reasons ====== */}
      {hasActiveReasons && (
        <section aria-label="Congestion reasons" className="py-12 lg:py-16" style={{ backgroundColor: '#F8FAFC' }}>
          <div className="container-carrgo">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Why Is This Port Congested?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {port.reasons.map((reason, idx) => (
                <div
                  key={idx}
                  className={`bg-white rounded-xl border p-5 transition-shadow ${reason.active ? 'border-gray-200' : 'border-gray-100 opacity-60'}`}
                >
                  <div className="flex items-start gap-3">
                    <span className={`w-3 h-3 rounded-full mt-1.5 flex-shrink-0 ${getSeverityDotClass(reason.severity)}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{reason.label}</p>
                      <span
                        className={`inline-flex items-center mt-2 px-2 py-0.5 rounded-full text-xs font-medium border ${
                          reason.active ? getSeverityBadgeClass(reason.severity) : 'bg-gray-100 text-gray-500 border-gray-200'
                        }`}
                      >
                        {reason.active ? (
                          <>
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            Active
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Resolved
                          </>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ====== 5. Forecasts ====== */}
      <section aria-label="Forecasts" className="py-12 lg:py-16 bg-white">
        <div className="container-carrgo">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Congestion Forecasts</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {port.forecasts.map((f: Forecast, idx: number) => (
              <div key={idx} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-50 text-[#1A6DFF] border border-blue-100">
                    <Calendar className="w-3.5 h-3.5 mr-1.5" />
                    {f.timeframe === '24h' ? '24 Hours' : f.timeframe === '3d' ? '3 Days' : '7 Days'}
                  </span>
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getCongestionBadgeClass(f.congestion)}`}>
                    {f.congestion}
                  </span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed mb-4">{f.reason}</p>
                <div className="flex items-center gap-2">
                  <Info className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-xs text-gray-500">Confidence: <span className="font-medium text-gray-700">{f.confidence}</span></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== 6. Importer Impact Assessment ====== */}
      <section aria-label="Importer impact" className="py-12 lg:py-16" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="container-carrgo">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Importer Impact Assessment</h2>
          <div className="bg-white rounded-xl border border-gray-200 p-6 lg:p-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-4 rounded-lg bg-gray-50">
                <p className="text-xs text-gray-500 font-medium mb-2 uppercase tracking-wide">Expected Delay</p>
                <p className="text-xl font-bold text-gray-900">{port.importerImpact.expectedDelay}</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-50">
                <p className="text-xs text-gray-500 font-medium mb-2 uppercase tracking-wide">Demurrage Risk</p>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold border ${getDemurrageBadgeClass(port.importerImpact.demurrageRisk)}`}>
                  {port.importerImpact.demurrageRisk}
                </span>
              </div>
              <div className="p-4 rounded-lg bg-gray-50">
                <p className="text-xs text-gray-500 font-medium mb-2 uppercase tracking-wide">Importer Risk</p>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold border ${getRiskBadgeClass(importerRisk)}`}>
                  {importerRisk}
                </span>
              </div>
              <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
                <p className="text-xs text-blue-600 font-medium mb-2 uppercase tracking-wide">Recommended Action</p>
                <p className="text-sm font-medium text-gray-900 leading-relaxed">{port.importerImpact.recommendedAction}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== 7. Cost Impact Calculator ====== */}
      <section aria-label="Cost calculator" className="py-12 lg:py-16 bg-white">
        <div className="container-carrgo">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            What Would a Delay Cost You at {port.port}?
          </h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Form */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Container Type</label>
                  <select
                    value={containerType}
                    onChange={(e) => setContainerType(e.target.value as '20ft' | '40ft' | '40ft HC' | 'LCL')}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A6DFF]/30 focus:border-[#1A6DFF] transition-all"
                  >
                    <option value="20ft">20ft Standard</option>
                    <option value="40ft">40ft Standard</option>
                    <option value="40ft HC">40ft High Cube</option>
                    <option value="LCL">LCL (Less than Container Load)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cargo Value (GBP)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="number"
                      value={cargoValue}
                      onChange={(e) => setCargoValue(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A6DFF]/30 focus:border-[#1A6DFF] transition-all"
                      placeholder="e.g. 50000"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Delay Days</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="number"
                      value={delayDays}
                      onChange={(e) => setDelayDays(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A6DFF]/30 focus:border-[#1A6DFF] transition-all"
                      placeholder="e.g. 5"
                    />
                  </div>
                </div>
                <button
                  onClick={handleCalculate}
                  className="w-full inline-flex items-center justify-center gap-2 text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: '#1A6DFF' }}
                >
                  <DollarSign className="w-4 h-4" />
                  Calculate Costs
                </button>
              </div>
            </div>

            {/* Results */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-5">Estimated Cost Breakdown</h3>
              {costResult ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Storage</span>
                    <span className="font-semibold text-gray-900">£{costResult.storage.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Demurrage</span>
                    <span className="font-semibold text-gray-900">£{costResult.demurrage.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Detention</span>
                    <span className="font-semibold text-gray-900">£{costResult.detention.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Lost Sales</span>
                    <span className="font-semibold text-gray-900">£{costResult.lostSales.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-base font-bold text-gray-900">Total Estimated Cost</span>
                    <span className="text-xl font-bold text-[#1A6DFF]">£{costResult.total.toLocaleString()}</span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <DollarSign className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                  <p className="text-gray-500 text-sm">Enter your cargo details and click Calculate to see estimated delay costs at {port.port}.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ====== 8. 90-Day Historical Chart ====== */}
      <section aria-label="Historical chart" className="py-12 lg:py-16" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="container-carrgo">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">90-Day Health Score History</h2>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <HistoryChart history={port.history} score={port.healthScore} />
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: scoreColor }} />
                {port.port} Health Score
              </div>
              <div className="flex items-center gap-2">
                <span className="w-6 h-0.5 bg-emerald-500" />
                Normal Threshold (80)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== 9. Port Details ====== */}
      <section aria-label="Port details" className="py-12 lg:py-16 bg-white">
        <div className="container-carrgo">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Port Details</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Common Cargo */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-lg bg-purple-50">
                  <Package className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Common Cargo</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {port.commonCargo.map((cargo, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                    {cargo}
                  </span>
                ))}
              </div>
            </div>

            {/* Rail Connections */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-lg bg-indigo-50">
                  <Train className="w-5 h-5 text-indigo-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Rail Connections</h3>
              </div>
              <ul className="space-y-2">
                {port.railConnections.map((conn, idx) => (
                  <li key={idx} className="text-sm text-gray-700 flex items-center gap-2">
                    <ChevronRight className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                    {conn}
                  </li>
                ))}
              </ul>
            </div>

            {/* Nearby Depots */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-lg bg-teal-50">
                  <Warehouse className="w-5 h-5 text-teal-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Nearby Depots</h3>
              </div>
              <ul className="space-y-2">
                {port.nearbyDepots.map((depot, idx) => (
                  <li key={idx} className="text-sm text-gray-700 flex items-center gap-2">
                    <ChevronRight className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                    {depot}
                  </li>
                ))}
              </ul>
            </div>

            {/* Region & Country */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-lg bg-rose-50">
                  <MapPin className="w-5 h-5 text-rose-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Location</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Region</span>
                  <span className="text-sm font-medium text-gray-900">{port.region}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Country</span>
                  <span className="text-sm font-medium text-gray-900">{port.country}</span>
                </div>
              </div>
            </div>

            {/* Annual Volume */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-lg bg-cyan-50">
                  <BarChart3 className="w-5 h-5 text-cyan-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Volume &amp; Capacity</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Annual Volume</span>
                  <span className="text-sm font-medium text-gray-900">{port.annualVolume}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Capacity</span>
                  <span className="text-sm font-medium text-gray-900">{port.containerCapacity}</span>
                </div>
              </div>
            </div>

            {/* Truck Info */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-lg bg-orange-50">
                  <Truck className="w-5 h-5 text-orange-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Haulage</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Truck Turnaround</span>
                  <span className="text-sm font-medium text-gray-900">{port.truckTurnaround}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Customs Avg</span>
                  <span className="text-sm font-medium text-gray-900">{port.customsAvgHours} hrs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== 10. Alternative Ports ====== */}
      {alternatives.length > 0 && (
        <section aria-label="Alternative ports" className="py-12 lg:py-16" style={{ backgroundColor: '#F8FAFC' }}>
          <div className="container-carrgo">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Consider These Alternative Ports</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {alternatives.map((alt) => (
                <Link
                  key={alt.slug}
                  to={`/ports/${alt.slug}`}
                  className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Anchor className="w-5 h-5 text-[#1A6DFF]" />
                      <h3 className="font-semibold text-gray-900 group-hover:text-[#1A6DFF] transition-colors">{alt.port}</h3>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#1A6DFF] transition-colors" />
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusBadgeClass(alt.status)}`}>
                      {alt.status}
                    </span>
                    <span className="text-sm font-bold text-gray-900">{alt.healthScore}</span>
                    <span className="text-xs text-gray-500">Health Score</span>
                  </div>
                  <p className="text-xs text-gray-500">Wait time: {alt.waitTime}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ====== 11. Related Lanes ====== */}
      {relatedLanes.length > 0 && (
        <section aria-label="Related lanes" className="py-12 lg:py-16 bg-white">
          <div className="container-carrgo">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Shipping Lanes to {port.port}</h2>
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-5 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Origin</th>
                    <th className="px-5 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Destination</th>
                    <th className="px-5 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Health</th>
                    <th className="px-5 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Normal ETA</th>
                    <th className="px-5 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Current ETA</th>
                    <th className="px-5 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Difference</th>
                    <th className="px-5 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Risk</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {relatedLanes.map((lane, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/40'}>
                      <td className="px-5 py-4 text-sm font-medium text-gray-900">{lane.origin}</td>
                      <td className="px-5 py-4 text-sm text-gray-700">{lane.destination}</td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getScoreBgClass(lane.health)}`}>
                          {lane.health}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-700">{lane.normalEta}</td>
                      <td className="px-5 py-4 text-sm text-gray-700">{lane.currentEta}</td>
                      <td className="px-5 py-4 text-sm font-semibold text-red-600">{lane.difference}</td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getLaneRiskBadgeClass(lane.risk)}`}>
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
      )}

      {/* ====== 12. CTA Section ====== */}
      <section aria-label="Get a quote" className="py-16 lg:py-20" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="container-carrgo">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Need Help with Shipments Through {port.port}?
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Our team monitors {port.port} and all UK &amp; Ireland port conditions daily. We can advise the best route,
              timing and port for your cargo — helping you avoid congestion and minimise costs.
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

      {/* ====== 13. Back Link ====== */}
      <section className="py-8 bg-white border-t border-gray-100">
        <div className="container-carrgo">
          <Link
            to="/resources/port-congestion-tracker"
            className="inline-flex items-center gap-2 text-[#1A6DFF] hover:underline text-sm font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Port Intelligence
          </Link>
        </div>
      </section>
    </>
  );
}
