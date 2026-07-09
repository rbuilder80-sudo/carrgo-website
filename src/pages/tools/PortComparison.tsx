import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../../components/Seo';
import { allPorts, getImporterRisk } from '../../data/portData';
import {
  ArrowRight,
  ChevronLeft,
  BarChart3,
  Check,
  Ship,
  Anchor,
  Clock,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Minus,
  CheckCircle2,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Status = 'Normal' | 'Moderate' | 'Congested' | 'Severe';
type Trend = 'Improving' | 'Stable' | 'Worsening';

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function StatusBadge({ status }: { status: Status }) {
  const styles: Record<Status, string> = {
    Normal: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Moderate: 'bg-amber-50 text-amber-700 border-amber-200',
    Congested: 'bg-red-50 text-red-700 border-red-200',
    Severe: 'bg-red-100 text-red-800 border-red-300',
  };
  const icons: Record<Status, React.ReactNode> = {
    Normal: <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />,
    Moderate: <AlertTriangle className="w-3.5 h-3.5 mr-1.5" />,
    Congested: <AlertTriangle className="w-3.5 h-3.5 mr-1.5" />,
    Severe: <AlertTriangle className="w-3.5 h-3.5 mr-1.5" />,
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles[status]}`}>
      {icons[status]}
      {status}
    </span>
  );
}

function TrendBadge({ trend }: { trend: Trend }) {
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

function statusRank(s: Status): number {
  const ranks: Record<Status, number> = { Normal: 4, Moderate: 3, Congested: 2, Severe: 1 };
  return ranks[s];
}

function trendRank(t: Trend): number {
  const ranks: Record<Trend, number> = { Improving: 3, Stable: 2, Worsening: 1 };
  return ranks[t];
}

function riskRank(r: string): number {
  const ranks: Record<string, number> = { Low: 4, Medium: 3, High: 2, 'Very High': 1 };
  return ranks[r] || 0;
}

function demurrageRank(r: string): number {
  const ranks: Record<string, number> = { Low: 3, Medium: 2, High: 1 };
  return ranks[r] || 0;
}

/** Parse a wait-time string like "2-4 days" into a numeric average for comparison. */
function parseWaitTime(w: string): number {
  const m = w.match(/(\d+)(?:\s*-\s*(\d+))?/);
  if (!m) return 0;
  const a = parseInt(m[1], 10);
  const b = m[2] ? parseInt(m[2], 10) : a;
  return (a + b) / 2;
}

function parseExpectedDelay(d: string): number {
  const m = d.match(/(\d+)(?:\s*-\s*(\d+))?/);
  if (!m) return 0;
  const a = parseInt(m[1], 10);
  const b = m[2] ? parseInt(m[2], 10) : a;
  return (a + b) / 2;
}

/* ------------------------------------------------------------------ */
/*  Score Bar Chart (SVG)                                              */
/* ------------------------------------------------------------------ */

function ScoreChart({ ports }: { ports: typeof allPorts }) {
  const maxBarWidth = 320;
  const maxScore = 100;

  function barColor(score: number): string {
    if (score >= 80) return '#10B981'; // emerald
    if (score >= 60) return '#F59E0B'; // amber
    if (score >= 40) return '#F97316'; // orange
    return '#EF4444'; // red
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
      <h3 className="text-lg font-bold text-gray-900 mb-6">Health Score Comparison</h3>
      <div className="space-y-4">
        {ports.map((p) => {
          const width = (p.healthScore / maxScore) * maxBarWidth;
          return (
            <div key={p.slug} className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700 w-28 sm:w-36 truncate text-right">{p.port}</span>
              <div className="flex-1 max-w-[340px]">
                <svg width={maxBarWidth + 10} height={28} className="block">
                  <rect
                    x={0}
                    y={6}
                    width={width}
                    height={16}
                    rx={8}
                    fill={barColor(p.healthScore)}
                  />
                  <text
                    x={width + 8}
                    y={19}
                    className="text-xs font-semibold"
                    fill="#374151"
                  >
                    {p.healthScore}
                  </text>
                </svg>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs text-gray-500">
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-emerald-500 inline-block" /> 80+ Good</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-amber-500 inline-block" /> 60–79 Caution</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-orange-500 inline-block" /> 40–59 Congested</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-red-500 inline-block" /> &lt;40 Severe</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Comparison Table                                                   */
/* ------------------------------------------------------------------ */

function ComparisonTable({ ports }: { ports: typeof allPorts }) {
  /* Build row definitions with a "best" evaluator */
  const rows = useMemo(() => {
    const list: {
      label: string;
      get: (p: typeof allPorts[0]) => string | React.ReactNode;
      best: (p: typeof allPorts[0]) => number;
      higherIsBetter: boolean;
    }[] = [
      {
        label: 'Health Score',
        get: (p) => p.healthScore,
        best: (p) => p.healthScore,
        higherIsBetter: true,
      },
      {
        label: 'Status',
        get: (p) => <StatusBadge status={p.status} />,
        best: (p) => statusRank(p.status),
        higherIsBetter: true,
      },
      {
        label: 'Wait Time',
        get: (p) => p.waitTime,
        best: (p) => -parseWaitTime(p.waitTime), // lower is better, negate for max
        higherIsBetter: true, // because we negated
      },
      {
        label: 'Trend',
        get: (p) => <TrendBadge trend={p.trend} />,
        best: (p) => trendRank(p.trend),
        higherIsBetter: true,
      },
      {
        label: 'Vessels Waiting',
        get: (p) => p.vesselsWaiting,
        best: (p) => -p.vesselsWaiting,
        higherIsBetter: true,
      },
      {
        label: 'Vessels at Berth',
        get: (p) => p.vesselsAtBerth,
        best: (p) => -p.vesselsAtBerth,
        higherIsBetter: true,
      },
      {
        label: 'Berth Utilization %',
        get: (p) => `${p.berthUtilization}%`,
        best: (p) => -p.berthUtilization,
        higherIsBetter: true,
      },
      {
        label: 'Customs Avg Hours',
        get: (p) => `${p.customsAvgHours}h`,
        best: (p) => -p.customsAvgHours,
        higherIsBetter: true,
      },
      {
        label: 'Truck Turnaround',
        get: (p) => p.truckTurnaround,
        best: (p) => {
          const m = p.truckTurnaround.match(/(\d+)/);
          return -(m ? parseInt(m[1], 10) : 0);
        },
        higherIsBetter: true,
      },
      {
        label: '24h Forecast',
        get: (p) => {
          const f24 = p.forecasts.find((f) => f.timeframe === '24h');
          return f24 ? (
            <span className="text-sm">
              <span className="font-medium">{f24.congestion}</span>
              <span className="text-gray-400 block text-xs truncate max-w-[160px]">{f24.reason}</span>
            </span>
          ) : (
            '-'
          );
        },
        best: (p) => {
          const f24 = p.forecasts.find((f) => f.timeframe === '24h');
          return f24 ? statusRank(f24.congestion) : 0;
        },
        higherIsBetter: true,
      },
      {
        label: '7d Forecast',
        get: (p) => {
          const f7 = p.forecasts.find((f) => f.timeframe === '7d');
          return f7 ? f7.congestion : '-';
        },
        best: (p) => {
          const f7 = p.forecasts.find((f) => f.timeframe === '7d');
          return f7 ? statusRank(f7.congestion) : 0;
        },
        higherIsBetter: true,
      },
      {
        label: 'Importer Risk',
        get: (p) => getImporterRisk(p.healthScore),
        best: (p) => riskRank(getImporterRisk(p.healthScore)),
        higherIsBetter: true,
      },
      {
        label: 'Expected Delay',
        get: (p) => p.importerImpact.expectedDelay,
        best: (p) => -parseExpectedDelay(p.importerImpact.expectedDelay),
        higherIsBetter: true,
      },
      {
        label: 'Demurrage Risk',
        get: (p) => p.importerImpact.demurrageRisk,
        best: (p) => demurrageRank(p.importerImpact.demurrageRisk),
        higherIsBetter: true,
      },
      {
        label: 'Recommended Action',
        get: (p) => (
          <span className="text-xs text-gray-600 leading-relaxed block max-w-[200px]">
            {p.importerImpact.recommendedAction}
          </span>
        ),
        best: () => 0,
        higherIsBetter: true,
      },
      {
        label: 'Annual Volume',
        get: (p) => p.annualVolume,
        best: () => 0,
        higherIsBetter: true,
      },
      {
        label: 'Container Capacity',
        get: (p) => p.containerCapacity,
        best: () => 0,
        higherIsBetter: true,
      },
      {
        label: 'Common Cargo',
        get: (p) => (
          <div className="flex flex-wrap gap-1">
            {p.commonCargo.map((c) => (
              <span key={c} className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 text-[10px] font-medium">
                {c}
              </span>
            ))}
          </div>
        ),
        best: () => 0,
        higherIsBetter: true,
      },
    ];
    return list;
  }, []);

  /* Determine which ports are "best" for each row */
  const bestSlugsPerRow = useMemo(() => {
    const map: Record<number, Set<string>> = {};
    rows.forEach((row, idx) => {
      const scores = ports.map((p) => ({ slug: p.slug, val: row.best(p) }));
      const values = scores.map((s) => s.val);
      const allSame = values.every((v) => v === values[0]);
      if (allSame) {
        map[idx] = new Set();
        return;
      }
      const maxVal = Math.max(...values);
      map[idx] = new Set(scores.filter((s) => s.val === maxVal).map((s) => s.slug));
    });
    return map;
  }, [ports, rows]);

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full text-left min-w-[600px]">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50 z-10">
              Metric
            </th>
            {ports.map((p) => (
              <th key={p.slug} className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider min-w-[140px]">
                <div className="flex items-center gap-2">
                  <Anchor className="w-4 h-4 text-[#1A6DFF]" />
                  {p.port}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {rows.map((row, idx) => (
            <tr
              key={row.label}
              className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/40'}
            >
              <td className="px-4 py-3 text-sm font-medium text-gray-700 sticky left-0 bg-inherit z-10 whitespace-nowrap">
                {row.label}
              </td>
              {ports.map((p) => {
                const isBest = bestSlugsPerRow[idx]?.has(p.slug);
                return (
                  <td
                    key={p.slug}
                    className={`px-4 py-3 text-sm text-gray-600 ${isBest ? 'font-semibold text-emerald-700 bg-emerald-50/40' : ''}`}
                  >
                    {row.get(p)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function PortComparison() {
  const [selectedSlugs, setSelectedSlugs] = useState<Set<string>>(new Set());
  const [showComparison, setShowComparison] = useState(false);

  const selectedPorts = useMemo(
    () => allPorts.filter((p) => selectedSlugs.has(p.slug)),
    [selectedSlugs]
  );

  const togglePort = (slug: string) => {
    setSelectedSlugs((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) {
        next.delete(slug);
      } else if (next.size < 5) {
        next.add(slug);
      }
      return next;
    });
  };

  const selectAll = () => {
    const firstFive = allPorts.slice(0, 5).map((p) => p.slug);
    setSelectedSlugs(new Set(firstFive));
  };

  const clearAll = () => {
    setSelectedSlugs(new Set());
  };

  const handleCompare = () => {
    if (selectedSlugs.size >= 2) {
      setShowComparison(true);
    }
  };

  return (
    <>
      <Seo
        title="Port Comparison Tool | UK & Ireland Port Health | Carrgo"
        description="Compare health scores, wait times, forecasts and capacity across UK & Ireland ports. Free port comparison tool from Carrgo."
        keywords="port comparison, uk port comparison, compare container ports, port health score, port capacity comparison, best uk port for imports"
      />

      {/* ====== Hero ====== */}
      <section aria-label="Port comparison hero" className="relative py-20 lg:py-28 overflow-hidden" style={{ backgroundColor: '#1A6DFF' }}>
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
              <BarChart3 className="w-4 h-4" />
              Free Tool
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Port Comparison
            </h1>
            <p className="text-lg text-white/90 leading-relaxed max-w-2xl">
              Compare health scores, wait times, forecasts and capacity across UK &amp; Ireland ports.
            </p>
          </div>
        </div>
      </section>

      {/* ====== Port Selection ====== */}
      <section aria-label="Select ports" className="py-12 lg:py-16 bg-white">
        <div className="container-carrgo">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Select Ports to Compare</h2>
                <p className="text-sm text-gray-500 mt-1">Choose up to 5 ports</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={selectAll}
                  className="px-3 py-1.5 rounded-lg text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Select All
                </button>
                <button
                  onClick={clearAll}
                  className="px-3 py-1.5 rounded-lg text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Clear All
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-6">
              {allPorts.map((p) => {
                const isSelected = selectedSlugs.has(p.slug);
                const isDisabled = !isSelected && selectedSlugs.size >= 5;
                return (
                  <button
                    key={p.slug}
                    onClick={() => togglePort(p.slug)}
                    disabled={isDisabled}
                    className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border text-sm font-medium transition-all ${
                      isSelected
                        ? 'border-[#1A6DFF] bg-blue-50 text-[#1A6DFF]'
                        : isDisabled
                        ? 'border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:shadow-sm'
                    }`}
                  >
                    {isSelected && (
                      <span className="absolute top-2 right-2">
                        <Check className="w-3.5 h-3.5 text-[#1A6DFF]" />
                      </span>
                    )}
                    <Ship className="w-5 h-5" />
                    <span className="text-xs text-center leading-tight">{p.port}</span>
                    <span className="text-[10px] text-gray-400">{p.country}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                {selectedSlugs.size} of 5 ports selected
              </p>
              <button
                onClick={handleCompare}
                disabled={selectedSlugs.size < 2}
                className="inline-flex items-center gap-2 text-white px-6 py-2.5 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#1A6DFF' }}
              >
                Compare Selected Ports
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ====== Comparison Results ====== */}
      {showComparison && selectedPorts.length >= 2 && (
        <>
          <section aria-label="Comparison table" className="py-12 lg:py-16" style={{ backgroundColor: '#F8FAFC' }}>
            <div className="container-carrgo">
              <div className="max-w-5xl mx-auto">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Comparing {selectedPorts.length} Ports
                </h2>
                <ComparisonTable ports={selectedPorts} />
                <p className="mt-4 text-xs text-gray-400">
                  Best values in each row are highlighted in green. Data is updated twice daily at 06:00 and 18:00 GMT.
                </p>
              </div>
            </div>
          </section>

          <section aria-label="Score chart" className="py-12 lg:py-16 bg-white">
            <div className="container-carrgo">
              <div className="max-w-3xl mx-auto">
                <ScoreChart ports={selectedPorts} />
              </div>
            </div>
          </section>
        </>
      )}

      {/* ====== CTA ====== */}
      <section aria-label="Get a quote" className="py-16 lg:py-20" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="container-carrgo">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Need Help Choosing the Right Port?
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Our freight forwarding experts can recommend the best port for your cargo based on current congestion, capacity and your delivery requirements.
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

      {/* ====== Back Link ====== */}
      <section className="py-8 bg-white">
        <div className="container-carrgo">
          <Link
            to="/resources/port-congestion-tracker"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#1A6DFF] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Port Intelligence
          </Link>
        </div>
      </section>
    </>
  );
}
