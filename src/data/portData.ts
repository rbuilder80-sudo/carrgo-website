/* =========================================================================
   Carrgo Port Intelligence Data Layer
   All data is client-side — no API calls, no backend, no paid subscriptions
   ========================================================================= */

export type CongestionLevel = 'Normal' | 'Moderate' | 'Congested' | 'Severe';
export type Trend = 'Improving' | 'Stable' | 'Worsening';
export type Region = 'England' | 'Scotland' | 'Wales' | 'Northern Ireland' | 'Ireland';
export type ImporterRisk = 'Low' | 'Medium' | 'High' | 'Very High';
export type ForecastConfidence = 'High' | 'Medium' | 'Low';

export interface CongestionReason {
  label: string;
  active: boolean;
  severity: 'minor' | 'moderate' | 'major';
}

export interface Forecast {
  timeframe: '24h' | '3d' | '7d';
  congestion: CongestionLevel;
  confidence: ForecastConfidence;
  reason: string;
}

export interface ImporterImpact {
  expectedDelay: string;
  demurrageRisk: 'Low' | 'Medium' | 'High';
  recommendedAction: string;
}

export interface PortHistory {
  date: string;
  score: number;
  congestion: CongestionLevel;
  vessels: number;
}

export interface PortDetail {
  port: string;
  slug: string;
  description: string;
  region: Region;
  country: string;
  status: CongestionLevel;
  waitTime: string;
  trend: Trend;
  lastUpdated: string;
  healthScore: number;
  scoreYesterday: number;
  scoreWeekAgo: number;
  scoreMonthAgo: number;
  bestScore: number;
  worstScore: number;
  scoreTrend: number;
  vesselsWaiting: number;
  vesselsAtBerth: number;
  berthUtilization: number;
  reasons: CongestionReason[];
  forecasts: Forecast[];
  importerImpact: ImporterImpact;
  history: PortHistory[];
  annualVolume: string;
  containerCapacity: string;
  mainCarriers: string[];
  commonCargo: string[];
  customsAvgHours: number;
  truckTurnaround: string;
  railConnections: string[];
  nearbyDepots: string[];
}

export interface LaneHealth {
  origin: string;
  destination: string;
  health: number;
  normalEta: string;
  currentEta: string;
  difference: string;
  risk: 'Low' | 'Medium' | 'High';
}

export const REASONS_DB: Record<string, CongestionReason[]> = {
  felixstowe: [
    { label: '4 vessels in queue', active: true, severity: 'moderate' },
    { label: 'Strong winds reducing crane ops', active: false, severity: 'minor' },
    { label: 'Berth 4 unavailable for maintenance', active: true, severity: 'major' },
    { label: 'Haulage shortages at peak hours', active: true, severity: 'moderate' },
    { label: 'Customs inspections increased', active: false, severity: 'minor' },
  ],
  southampton: [
    { label: '2 vessels in queue', active: false, severity: 'minor' },
    { label: 'Standard operations', active: true, severity: 'minor' },
    { label: 'Road access clear', active: true, severity: 'minor' },
  ],
  'london-gateway': [
    { label: '1 vessel in queue', active: false, severity: 'minor' },
    { label: 'Automated berths performing well', active: true, severity: 'minor' },
    { label: 'New rail link operational', active: true, severity: 'minor' },
  ],
  liverpool: [
    { label: '3 vessels in queue', active: true, severity: 'moderate' },
    { label: 'Peel Ports upgrading cranes', active: true, severity: 'major' },
    { label: 'Haulage delays on M62 corridor', active: true, severity: 'moderate' },
  ],
  bristol: [
    { label: '1 vessel in queue', active: false, severity: 'minor' },
    { label: 'Normal operations', active: true, severity: 'minor' },
  ],
  tilbury: [
    { label: '2 vessels in queue', active: false, severity: 'minor' },
    { label: 'Thames traffic manageable', active: true, severity: 'minor' },
    { label: 'New deep-water berth open', active: true, severity: 'minor' },
  ],
  immingham: [
    { label: '3 vessels in queue', active: true, severity: 'moderate' },
    { label: 'Humber estuary fog delays', active: false, severity: 'minor' },
    { label: 'Coal and biomass volumes up', active: true, severity: 'moderate' },
  ],
  grangemouth: [
    { label: '6 vessels in queue', active: true, severity: 'major' },
    { label: 'Scotland-wide haulage shortage', active: true, severity: 'major' },
    { label: 'Rail terminal congestion', active: true, severity: 'major' },
    { label: 'Forth Bridge traffic restrictions', active: true, severity: 'moderate' },
  ],
  holyhead: [
    { label: '1 ferry delayed', active: false, severity: 'minor' },
    { label: 'Irish Sea weather good', active: true, severity: 'minor' },
  ],
  belfast: [
    { label: '2 vessels in queue', active: false, severity: 'minor' },
    { label: 'NI Protocol operations normal', active: true, severity: 'minor' },
    { label: 'Windsor Framework clearing smoothly', active: true, severity: 'minor' },
  ],
  larne: [
    { label: '1 vessel in queue', active: false, severity: 'minor' },
    { label: 'Ferry operations on schedule', active: true, severity: 'minor' },
  ],
  londonderry: [
    { label: '1 vessel in queue', active: false, severity: 'minor' },
    { label: 'Foyle Port operations normal', active: true, severity: 'minor' },
  ],
  dublin: [
    { label: '5 vessels in queue', active: true, severity: 'major' },
    { label: 'Post-Brexit customs backlog', active: true, severity: 'major' },
    { label: 'Haulage capacity stretched', active: true, severity: 'moderate' },
    { label: 'Dublin Port Tunnel delays', active: true, severity: 'moderate' },
  ],
  cork: [
    { label: '2 vessels in queue', active: false, severity: 'minor' },
    { label: 'Ringaskiddy expansion ongoing', active: true, severity: 'minor' },
  ],
  'rosslare-europort': [
    { label: '1 ferry in queue', active: false, severity: 'minor' },
    { label: 'New freight routes from France', active: true, severity: 'minor' },
    { label: 'Brexit bypass routes popular', active: true, severity: 'minor' },
  ],
  'shannon-foynes': [
    { label: '1 vessel in queue', active: false, severity: 'minor' },
    { label: 'Limerick access road works', active: true, severity: 'minor' },
  ],
  waterford: [
    { label: '1 vessel in queue', active: false, severity: 'minor' },
    { label: 'Belview operations normal', active: true, severity: 'minor' },
  ],
};

function generateHistory(baseScore: number, volatility: number): PortHistory[] {
  const history: PortHistory[] = [];
  const today = new Date('2026-07-09');
  for (let i = 89; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const noise = Math.sin(i * 0.3) * volatility + (Math.random() - 0.5) * volatility * 0.5;
    const score = Math.round(Math.max(30, Math.min(95, baseScore + noise)));
    const congestion: CongestionLevel = score >= 80 ? 'Normal' : score >= 60 ? 'Moderate' : score >= 40 ? 'Congested' : 'Severe';
    const vessels = Math.round(Math.max(0, (100 - score) / 8 + (Math.random() - 0.5) * 2));
    history.push({ date: dateStr, score, congestion, vessels });
  }
  return history;
}

const PORT_DATA: Omit<PortDetail, 'history'>[] = [
  {
    port: 'Felixstowe', slug: 'felixstowe', description: "Major container port — UK's busiest", region: 'England', country: 'England',
    status: 'Moderate', waitTime: '2-4 days', trend: 'Stable', lastUpdated: '2h ago',
    healthScore: 72, scoreYesterday: 70, scoreWeekAgo: 68, scoreMonthAgo: 75, bestScore: 92, worstScore: 45, scoreTrend: +2,
    vesselsWaiting: 4, vesselsAtBerth: 6, berthUtilization: 78,
    reasons: REASONS_DB.felixstowe,
    forecasts: [
      { timeframe: '24h', congestion: 'Moderate', confidence: 'High', reason: 'Maintenance on Berth 4 continues; expect similar delays' },
      { timeframe: '3d', congestion: 'Moderate', confidence: 'Medium', reason: 'Vessel schedule suggests queue will reduce by Thursday' },
      { timeframe: '7d', congestion: 'Normal', confidence: 'Medium', reason: 'Berth 4 reopens Friday; crane ops return to full capacity' },
    ],
    importerImpact: { expectedDelay: '2-4 days', demurrageRisk: 'Medium', recommendedAction: 'Book haulage 48h in advance. Consider London Gateway for urgent cargo.' },
    annualVolume: '3.8 million TEU', containerCapacity: 'Deep-water berths 14.5m draft', mainCarriers: ['Maersk', 'MSC', 'ONE', 'Hapag-Lloyd', 'CMA CGM'], commonCargo: ['Electronics', 'Furniture', 'Automotive parts', 'Retail goods'], customsAvgHours: 18, truckTurnaround: '45-75 min', railConnections: ['Midlands', 'Yorkshire'], nearbyDepots: ['Ipswich', 'Colchester', 'Harwich'],
  },
  {
    port: 'Southampton', slug: 'southampton', description: 'Deep-water container port', region: 'England', country: 'England',
    status: 'Normal', waitTime: '1-2 days', trend: 'Stable', lastUpdated: '1h ago',
    healthScore: 85, scoreYesterday: 85, scoreWeekAgo: 83, scoreMonthAgo: 80, bestScore: 94, worstScore: 55, scoreTrend: 0,
    vesselsWaiting: 2, vesselsAtBerth: 5, berthUtilization: 65,
    reasons: REASONS_DB.southampton,
    forecasts: [
      { timeframe: '24h', congestion: 'Normal', confidence: 'High', reason: 'Standard operations; no disruptions forecasted' },
      { timeframe: '3d', congestion: 'Normal', confidence: 'High', reason: 'Vessel schedule within berth capacity' },
      { timeframe: '7d', congestion: 'Normal', confidence: 'Medium', reason: 'Seasonal volume stable; no significant events' },
    ],
    importerImpact: { expectedDelay: '1-2 days', demurrageRisk: 'Low', recommendedAction: 'Normal planning. Southampton is a reliable alternative to Felixstowe.' },
    annualVolume: '2.0 million TEU', containerCapacity: 'Berths up to 16m draft', mainCarriers: ['MSC', 'CMA CGM', 'Hapag-Lloyd'], commonCargo: ['Automotive', 'Wine', 'Chemicals', 'Containers'], customsAvgHours: 14, truckTurnaround: '35-50 min', railConnections: ['Midlands', 'Northwest'], nearbyDepots: ['Eastleigh', 'Winchester', 'Bournemouth'],
  },
  {
    port: 'London Gateway', slug: 'london-gateway', description: 'DP World automated port', region: 'England', country: 'England',
    status: 'Normal', waitTime: '1-2 days', trend: 'Improving', lastUpdated: '3h ago',
    healthScore: 88, scoreYesterday: 86, scoreWeekAgo: 82, scoreMonthAgo: 78, bestScore: 93, worstScore: 60, scoreTrend: +2,
    vesselsWaiting: 1, vesselsAtBerth: 4, berthUtilization: 58,
    reasons: REASONS_DB['london-gateway'],
    forecasts: [
      { timeframe: '24h', congestion: 'Normal', confidence: 'High', reason: 'Automation running at 94% efficiency' },
      { timeframe: '3d', congestion: 'Normal', confidence: 'High', reason: 'New rail link reducing road dependency' },
      { timeframe: '7d', congestion: 'Normal', confidence: 'Medium', reason: 'Capacity expansion Phase 3 progressing' },
    ],
    importerImpact: { expectedDelay: '1-2 days', demurrageRisk: 'Low', recommendedAction: 'Excellent choice for London/Midlands deliveries. Book ahead during peak season.' },
    annualVolume: '1.2 million TEU', containerCapacity: 'Automated deep-water berths', mainCarriers: ['DP World', 'CMA CGM', 'Hapag-Lloyd'], commonCargo: ['Retail', 'Electronics', 'Perishables', 'E-commerce'], customsAvgHours: 12, truckTurnaround: '30-45 min', railConnections: ['Midlands', 'North', 'Scotland'], nearbyDepots: ['Thurrock', 'Dartford', 'Basildon'],
  },
  {
    port: 'Liverpool', slug: 'liverpool', description: 'Mersey container port', region: 'England', country: 'England',
    status: 'Moderate', waitTime: '2-3 days', trend: 'Worsening', lastUpdated: '4h ago',
    healthScore: 65, scoreYesterday: 67, scoreWeekAgo: 70, scoreMonthAgo: 74, bestScore: 88, worstScore: 42, scoreTrend: -2,
    vesselsWaiting: 3, vesselsAtBerth: 4, berthUtilization: 82,
    reasons: REASONS_DB.liverpool,
    forecasts: [
      { timeframe: '24h', congestion: 'Moderate', confidence: 'High', reason: 'Crane upgrade work continuing at Terminal 1' },
      { timeframe: '3d', congestion: 'Moderate', confidence: 'Medium', reason: 'M62 roadworks expected to ease by Thursday' },
      { timeframe: '7d', congestion: 'Normal', confidence: 'Medium', reason: 'Crane upgrades complete by next Tuesday' },
    ],
    importerImpact: { expectedDelay: '2-3 days', demurrageRisk: 'Medium', recommendedAction: 'Allow extra 2 days for haulage. Consider Tilbury for northwest cargo if urgent.' },
    annualVolume: '700,000 TEU', containerCapacity: 'Post-Panamax capable', mainCarriers: ['MSC', 'CMA CGM'], commonCargo: ['Bulk goods', 'Containers', 'Agri-products'], customsAvgHours: 22, truckTurnaround: '50-80 min', railConnections: ['Midlands'], nearbyDepots: ['Warrington', 'St Helens', 'Wigan'],
  },
  {
    port: 'Bristol', slug: 'bristol', description: 'Avonmouth port', region: 'England', country: 'England',
    status: 'Normal', waitTime: '1 day', trend: 'Stable', lastUpdated: '5h ago',
    healthScore: 86, scoreYesterday: 86, scoreWeekAgo: 85, scoreMonthAgo: 84, bestScore: 91, worstScore: 65, scoreTrend: 0,
    vesselsWaiting: 1, vesselsAtBerth: 3, berthUtilization: 55,
    reasons: REASONS_DB.bristol,
    forecasts: [
      { timeframe: '24h', congestion: 'Normal', confidence: 'High', reason: 'Standard operations at Avonmouth' },
      { timeframe: '3d', congestion: 'Normal', confidence: 'High', reason: 'No disruptions forecasted' },
      { timeframe: '7d', congestion: 'Normal', confidence: 'Medium', reason: 'Seasonal volumes within capacity' },
    ],
    importerImpact: { expectedDelay: '1 day', demurrageRisk: 'Low', recommendedAction: 'Good for southwest England. Reliable for containers and Ro-Ro.' },
    annualVolume: '500,000 TEU', containerCapacity: 'Ro-Ro and container terminals', mainCarriers: ['DFDS', 'Stena Line'], commonCargo: ['Vehicles', 'Containers', 'Forest products'], customsAvgHours: 15, truckTurnaround: '40-55 min', railConnections: ['Midlands'], nearbyDepots: ['Avonmouth', 'Patchway', 'Bath'],
  },
  {
    port: 'Tilbury', slug: 'tilbury', description: 'Thames river port', region: 'England', country: 'England',
    status: 'Normal', waitTime: '1-2 days', trend: 'Improving', lastUpdated: '3h ago',
    healthScore: 84, scoreYesterday: 82, scoreWeekAgo: 80, scoreMonthAgo: 78, bestScore: 90, worstScore: 58, scoreTrend: +2,
    vesselsWaiting: 2, vesselsAtBerth: 4, berthUtilization: 62,
    reasons: REASONS_DB.tilbury,
    forecasts: [
      { timeframe: '24h', congestion: 'Normal', confidence: 'High', reason: 'New deep-water berth improving capacity' },
      { timeframe: '3d', congestion: 'Normal', confidence: 'High', reason: 'Thames traffic manageable' },
      { timeframe: '7d', congestion: 'Normal', confidence: 'Medium', reason: 'Expansion works nearing completion' },
    ],
    importerImpact: { expectedDelay: '1-2 days', demurrageRisk: 'Low', recommendedAction: 'Strong alternative to Felixstowe for London deliveries. Good rail connections.' },
    annualVolume: '800,000 TEU', containerCapacity: 'Ro-Ro and container terminals', mainCarriers: ['P&O Ferries', 'DFDS', 'CMA CGM'], commonCargo: ['Containers', 'Vehicles', 'Paper', 'Steel'], customsAvgHours: 16, truckTurnaround: '35-50 min', railConnections: ['Midlands', 'North'], nearbyDepots: ['Grays', 'Purfleet', 'Dagenham'],
  },
  {
    port: 'Immingham', slug: 'immingham', description: 'Humber estuary port', region: 'England', country: 'England',
    status: 'Moderate', waitTime: '2-3 days', trend: 'Stable', lastUpdated: '2h ago',
    healthScore: 68, scoreYesterday: 68, scoreWeekAgo: 70, scoreMonthAgo: 72, bestScore: 85, worstScore: 48, scoreTrend: 0,
    vesselsWaiting: 3, vesselsAtBerth: 5, berthUtilization: 75,
    reasons: REASONS_DB.immingham,
    forecasts: [
      { timeframe: '24h', congestion: 'Moderate', confidence: 'High', reason: 'Coal and biomass volumes elevated' },
      { timeframe: '3d', congestion: 'Moderate', confidence: 'Medium', reason: 'Humber fog risk Wednesday-Thursday' },
      { timeframe: '7d', congestion: 'Normal', confidence: 'Medium', reason: 'Biomass shipments expected to ease' },
    ],
    importerImpact: { expectedDelay: '2-3 days', demurrageRisk: 'Medium', recommendedAction: 'Monitor fog warnings. Allow extra haulage time for Humber crossings.' },
    annualVolume: '55 million tonnes (bulk)', containerCapacity: 'Bulk and liquid terminals', mainCarriers: ['ABP', 'Various bulk carriers'], commonCargo: ['Coal', 'Biomass', 'Oil', 'Containers'], customsAvgHours: 24, truckTurnaround: '55-90 min', railConnections: ['Yorkshire', 'Midlands'], nearbyDepots: ['Grimsby', 'Scunthorpe', 'Doncaster'],
  },
  {
    port: 'Grangemouth', slug: 'grangemouth', description: "Scotland's largest container port", region: 'Scotland', country: 'Scotland',
    status: 'Congested', waitTime: '4-6 days', trend: 'Worsening', lastUpdated: '1h ago',
    healthScore: 42, scoreYesterday: 45, scoreWeekAgo: 50, scoreMonthAgo: 58, bestScore: 82, worstScore: 35, scoreTrend: -3,
    vesselsWaiting: 6, vesselsAtBerth: 3, berthUtilization: 92,
    reasons: REASONS_DB.grangemouth,
    forecasts: [
      { timeframe: '24h', congestion: 'Congested', confidence: 'High', reason: 'Scotland-wide haulage shortage continuing' },
      { timeframe: '3d', congestion: 'Moderate', confidence: 'Medium', reason: 'Rail terminal congestion easing by Thursday' },
      { timeframe: '7d', congestion: 'Moderate', confidence: 'Low', reason: 'Dependent on haulage capacity recovery' },
    ],
    importerImpact: { expectedDelay: '4-6 days', demurrageRisk: 'High', recommendedAction: 'URGENT: Consider alternative Scottish ports or direct road from England. Demurrage risk is HIGH.' },
    annualVolume: '200,000 TEU', containerCapacity: "Scotland's largest container terminal", mainCarriers: ['MSC', 'CMA CGM', 'Cosco'], commonCargo: ['Whisky', 'Containers', 'Petrochemicals', 'Food'], customsAvgHours: 28, truckTurnaround: '60-100 min', railConnections: ['Central Belt', 'Glasgow'], nearbyDepots: ['Falkirk', 'Stirling', 'Edinburgh'],
  },
  {
    port: 'Holyhead', slug: 'holyhead', description: 'Irish Sea ferry & cargo port', region: 'Wales', country: 'Wales',
    status: 'Normal', waitTime: '0-1 days', trend: 'Stable', lastUpdated: '4h ago',
    healthScore: 90, scoreYesterday: 90, scoreWeekAgo: 89, scoreMonthAgo: 88, bestScore: 95, worstScore: 70, scoreTrend: 0,
    vesselsWaiting: 0, vesselsAtBerth: 2, berthUtilization: 45,
    reasons: REASONS_DB.holyhead,
    forecasts: [
      { timeframe: '24h', congestion: 'Normal', confidence: 'High', reason: 'Irish Sea weather favourable' },
      { timeframe: '3d', congestion: 'Normal', confidence: 'High', reason: 'Ferry schedule operating normally' },
      { timeframe: '7d', congestion: 'Normal', confidence: 'Medium', reason: 'Summer schedules increasing capacity' },
    ],
    importerImpact: { expectedDelay: '0-1 days', demurrageRisk: 'Low', recommendedAction: 'Excellent for Irish Sea Ro-Ro. Fast turnaround for Dublin/Cork connections.' },
    annualVolume: '2.5 million passengers + freight', containerCapacity: 'Ro-Ro ferry terminal', mainCarriers: ['Irish Ferries', 'Stena Line'], commonCargo: ['Vehicles', 'Trailers', 'Livestock', 'Containers'], customsAvgHours: 8, truckTurnaround: '25-35 min', railConnections: ['None (road only)'], nearbyDepots: ['Bangor', 'Caernarfon', 'Llandudno'],
  },
  {
    port: 'Belfast', slug: 'belfast', description: "Northern Ireland's largest port", region: 'Northern Ireland', country: 'Northern Ireland',
    status: 'Normal', waitTime: '1-2 days', trend: 'Stable', lastUpdated: '6h ago',
    healthScore: 82, scoreYesterday: 82, scoreWeekAgo: 81, scoreMonthAgo: 80, bestScore: 90, worstScore: 55, scoreTrend: 0,
    vesselsWaiting: 2, vesselsAtBerth: 4, berthUtilization: 60,
    reasons: REASONS_DB.belfast,
    forecasts: [
      { timeframe: '24h', congestion: 'Normal', confidence: 'High', reason: 'Windsor Framework clearing smoothly' },
      { timeframe: '3d', congestion: 'Normal', confidence: 'High', reason: 'NI Protocol operations stable' },
      { timeframe: '7d', congestion: 'Normal', confidence: 'Medium', reason: 'Irish Sea trade volumes steady' },
    ],
    importerImpact: { expectedDelay: '1-2 days', demurrageRisk: 'Low', recommendedAction: 'Good for EU-GB trade via NI. Windsor Framework simplifies customs for qualifying goods.' },
    annualVolume: '24 million tonnes', containerCapacity: 'Victoria Terminal 3, Stormont Wharf', mainCarriers: ['Stena Line', 'Seatruck', 'P&O'], commonCargo: ['Containers', 'Agri-products', 'Machinery', 'Food'], customsAvgHours: 14, truckTurnaround: '40-55 min', railConnections: ['None (road only)'], nearbyDepots: ['Lisburn', 'Newtownabbey', 'Craigavon'],
  },
  {
    port: 'Larne', slug: 'larne', description: 'Larne Harbour, busy ferry port', region: 'Northern Ireland', country: 'Northern Ireland',
    status: 'Normal', waitTime: '0-1 days', trend: 'Improving', lastUpdated: '5h ago',
    healthScore: 87, scoreYesterday: 85, scoreWeekAgo: 84, scoreMonthAgo: 83, bestScore: 92, worstScore: 68, scoreTrend: +2,
    vesselsWaiting: 1, vesselsAtBerth: 2, berthUtilization: 50,
    reasons: REASONS_DB.larne,
    forecasts: [
      { timeframe: '24h', congestion: 'Normal', confidence: 'High', reason: 'Ferry operations on schedule' },
      { timeframe: '3d', congestion: 'Normal', confidence: 'High', reason: 'No disruptions forecasted' },
      { timeframe: '7d', congestion: 'Normal', confidence: 'Medium', reason: 'Summer ferry schedule increasing frequency' },
    ],
    importerImpact: { expectedDelay: '0-1 days', demurrageRisk: 'Low', recommendedAction: 'Fast Ro-Ro option for Scottish/English connections. Good for perishables.' },
    annualVolume: '4.5 million tonnes', containerCapacity: 'Ro-Ro and ferry terminal', mainCarriers: ['P&O Ferries', 'Stena Line'], commonCargo: ['Vehicles', 'Trailers', 'Livestock', 'Containers'], customsAvgHours: 10, truckTurnaround: '30-40 min', railConnections: ['None'], nearbyDepots: ['Larne', 'Ballymena', 'Carrickfergus'],
  },
  {
    port: 'Londonderry', slug: 'londonderry', description: 'Foyle Port, Derry', region: 'Northern Ireland', country: 'Northern Ireland',
    status: 'Normal', waitTime: '1 day', trend: 'Stable', lastUpdated: '7h ago',
    healthScore: 83, scoreYesterday: 83, scoreWeekAgo: 82, scoreMonthAgo: 81, bestScore: 89, worstScore: 60, scoreTrend: 0,
    vesselsWaiting: 1, vesselsAtBerth: 2, berthUtilization: 52,
    reasons: REASONS_DB.londonderry,
    forecasts: [
      { timeframe: '24h', congestion: 'Normal', confidence: 'High', reason: 'Foyle Port operations normal' },
      { timeframe: '3d', congestion: 'Normal', confidence: 'High', reason: 'No disruptions forecasted' },
      { timeframe: '7d', congestion: 'Normal', confidence: 'Medium', reason: 'Northwest NI trade volumes stable' },
    ],
    importerImpact: { expectedDelay: '1 day', demurrageRisk: 'Low', recommendedAction: 'Good for northwest NI and Donegal connections. Less congested than Belfast.' },
    annualVolume: '2 million tonnes', containerCapacity: 'General cargo and bulk', mainCarriers: ['Various'], commonCargo: ['Bulk', 'Agri-products', 'Machinery'], customsAvgHours: 12, truckTurnaround: '35-50 min', railConnections: ['None'], nearbyDepots: ['Derry', 'Strabane', 'Letterkenny'],
  },
  {
    port: 'Dublin', slug: 'dublin', description: "Ireland's largest port", region: 'Ireland', country: 'Ireland (ROI)',
    status: 'Moderate', waitTime: '2-4 days', trend: 'Worsening', lastUpdated: '2h ago',
    healthScore: 58, scoreYesterday: 60, scoreWeekAgo: 63, scoreMonthAgo: 68, bestScore: 82, worstScore: 40, scoreTrend: -2,
    vesselsWaiting: 5, vesselsAtBerth: 7, berthUtilization: 88,
    reasons: REASONS_DB.dublin,
    forecasts: [
      { timeframe: '24h', congestion: 'Moderate', confidence: 'High', reason: 'Post-Brexit customs backlog continues' },
      { timeframe: '3d', congestion: 'Moderate', confidence: 'Medium', reason: 'Haulage capacity may improve by Thursday' },
      { timeframe: '7d', congestion: 'Moderate', confidence: 'Low', reason: 'Dependent on customs resource allocation' },
    ],
    importerImpact: { expectedDelay: '2-4 days', demurrageRisk: 'High', recommendedAction: 'HIGH RISK: File customs documentation early. Consider Cork or Rosslare as alternatives.' },
    annualVolume: '36 million tonnes', containerCapacity: 'Dublin Port Tunnel access', mainCarriers: ['Maersk', 'MSC', 'CMA CGM', 'Irish Continental'], commonCargo: ['Containers', 'Agri-products', 'Machinery', 'Food', 'Pharma'], customsAvgHours: 32, truckTurnaround: '55-90 min', railConnections: ['None (road only)'], nearbyDepots: ['Dublin 1', 'Tallaght', 'Swords'],
  },
  {
    port: 'Cork', slug: 'cork', description: 'Southern Ireland major port', region: 'Ireland', country: 'Ireland (ROI)',
    status: 'Normal', waitTime: '1-2 days', trend: 'Stable', lastUpdated: '3h ago',
    healthScore: 81, scoreYesterday: 81, scoreWeekAgo: 80, scoreMonthAgo: 79, bestScore: 88, worstScore: 62, scoreTrend: 0,
    vesselsWaiting: 2, vesselsAtBerth: 3, berthUtilization: 58,
    reasons: REASONS_DB.cork,
    forecasts: [
      { timeframe: '24h', congestion: 'Normal', confidence: 'High', reason: 'Ringaskiddy operations stable' },
      { timeframe: '3d', congestion: 'Normal', confidence: 'High', reason: 'Expansion works not affecting operations' },
      { timeframe: '7d', congestion: 'Normal', confidence: 'Medium', reason: 'Southern Ireland trade volumes steady' },
    ],
    importerImpact: { expectedDelay: '1-2 days', demurrageRisk: 'Low', recommendedAction: 'Good alternative to Dublin for southern Ireland. Less congested, faster customs.' },
    annualVolume: '10 million tonnes', containerCapacity: 'Ringaskiddy deepwater terminal', mainCarriers: ['MSC', 'CMA CGM', 'Cork Harbour'], commonCargo: ['Pharma', 'Food', 'Containers', 'Oil'], customsAvgHours: 16, truckTurnaround: '40-55 min', railConnections: ['None'], nearbyDepots: ['Cork City', 'Midleton', 'Cobh'],
  },
  {
    port: 'Rosslare Europort', slug: 'rosslare-europort', description: 'Wexford ferry & cargo port', region: 'Ireland', country: 'Ireland (ROI)',
    status: 'Normal', waitTime: '1 day', trend: 'Improving', lastUpdated: '4h ago',
    healthScore: 84, scoreYesterday: 82, scoreWeekAgo: 80, scoreMonthAgo: 78, bestScore: 90, worstScore: 65, scoreTrend: +2,
    vesselsWaiting: 1, vesselsAtBerth: 2, berthUtilization: 48,
    reasons: REASONS_DB['rosslare-europort'],
    forecasts: [
      { timeframe: '24h', congestion: 'Normal', confidence: 'High', reason: 'New freight routes from France operating well' },
      { timeframe: '3d', congestion: 'Normal', confidence: 'High', reason: 'Brexit bypass routes gaining popularity' },
      { timeframe: '7d', congestion: 'Normal', confidence: 'Medium', reason: 'Continental direct services expanding' },
    ],
    importerImpact: { expectedDelay: '1 day', demurrageRisk: 'Low', recommendedAction: 'EXCELLENT Brexit bypass option. Direct France routes avoid UK landbridge customs.' },
    annualVolume: '3.5 million tonnes', containerCapacity: 'Ro-Ro and ferry terminal', mainCarriers: ['Stena Line', 'Irish Ferries', 'Brittany Ferries'], commonCargo: ['Trailers', 'Vehicles', 'Containers', 'Agri-products'], customsAvgHours: 12, truckTurnaround: '30-45 min', railConnections: ['None'], nearbyDepots: ['Wexford', 'Enniscorthy', 'Gorey'],
  },
  {
    port: 'Shannon Foynes', slug: 'shannon-foynes', description: 'Limerick deepwater port', region: 'Ireland', country: 'Ireland (ROI)',
    status: 'Normal', waitTime: '1-2 days', trend: 'Stable', lastUpdated: '5h ago',
    healthScore: 79, scoreYesterday: 79, scoreWeekAgo: 78, scoreMonthAgo: 77, bestScore: 86, worstScore: 60, scoreTrend: 0,
    vesselsWaiting: 1, vesselsAtBerth: 2, berthUtilization: 55,
    reasons: REASONS_DB['shannon-foynes'],
    forecasts: [
      { timeframe: '24h', congestion: 'Normal', confidence: 'High', reason: 'Limerick access road works causing minor delays' },
      { timeframe: '3d', congestion: 'Normal', confidence: 'High', reason: 'Road works expected to complete' },
      { timeframe: '7d', congestion: 'Normal', confidence: 'Medium', reason: 'Midwest Ireland trade volumes stable' },
    ],
    importerImpact: { expectedDelay: '1-2 days', demurrageRisk: 'Low', recommendedAction: 'Good for bulk and agri-products. Monitor road access updates.' },
    annualVolume: '3 million tonnes', containerCapacity: 'Deepwater bulk terminal', mainCarriers: ['Various bulk'], commonCargo: ['Bulk', 'Agri-products', 'Wind turbines', 'Timber'], customsAvgHours: 18, truckTurnaround: '45-65 min', railConnections: ['None'], nearbyDepots: ['Limerick', 'Ennis', 'Nenagh'],
  },
  {
    port: 'Waterford', slug: 'waterford', description: 'Southeast Ireland port', region: 'Ireland', country: 'Ireland (ROI)',
    status: 'Normal', waitTime: '1 day', trend: 'Stable', lastUpdated: '6h ago',
    healthScore: 82, scoreYesterday: 82, scoreWeekAgo: 81, scoreMonthAgo: 80, bestScore: 88, worstScore: 64, scoreTrend: 0,
    vesselsWaiting: 1, vesselsAtBerth: 2, berthUtilization: 50,
    reasons: REASONS_DB.waterford,
    forecasts: [
      { timeframe: '24h', congestion: 'Normal', confidence: 'High', reason: 'Belview operations normal' },
      { timeframe: '3d', congestion: 'Normal', confidence: 'High', reason: 'No disruptions forecasted' },
      { timeframe: '7d', congestion: 'Normal', confidence: 'Medium', reason: 'Southeast Ireland trade volumes steady' },
    ],
    importerImpact: { expectedDelay: '1 day', demurrageRisk: 'Low', recommendedAction: 'Good for southeast Ireland. Less congested than Dublin.' },
    annualVolume: '1.5 million tonnes', containerCapacity: 'Belview container terminal', mainCarriers: ['Various'], commonCargo: ['Containers', 'Agri-products', 'Forestry'], customsAvgHours: 14, truckTurnaround: '40-55 min', railConnections: ['None'], nearbyDepots: ['Waterford', 'Kilkenny', 'Dungarvan'],
  },
];

export const allPorts: PortDetail[] = PORT_DATA.map((p) => ({
  ...p,
  history: generateHistory(p.healthScore, 12),
}));

export function calculateNationalIndex(): { index: number; trend: 'Improving' | 'Stable' | 'Worsening'; change: number } {
  const scores = allPorts.map((p) => p.healthScore);
  const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  const prevScores = allPorts.map((p) => p.scoreYesterday);
  const prevAvg = Math.round(prevScores.reduce((a, b) => a + b, 0) / prevScores.length);
  const change = avg - prevAvg;
  const trend: 'Improving' | 'Stable' | 'Worsening' = change > 2 ? 'Improving' : change < -2 ? 'Worsening' : 'Stable';
  return { index: avg, trend, change };
}

export interface CostCalculatorInput {
  containerType: '20ft' | '40ft' | '40ft HC' | 'LCL';
  cargoValue: number;
  delayDays: number;
  port: string;
}

export interface CostBreakdown {
  storage: number;
  demurrage: number;
  detention: number;
  lostSales: number;
  total: number;
}

export function calculateCosts(input: CostCalculatorInput): CostBreakdown {
  const rates: Record<string, { storage: number; demurrage: number; detention: number }> = {
    '20ft': { storage: 45, demurrage: 85, detention: 60 },
    '40ft': { storage: 65, demurrage: 120, detention: 85 },
    '40ft HC': { storage: 65, demurrage: 120, detention: 85 },
    LCL: { storage: 25, demurrage: 0, detention: 0 },
  };
  const r = rates[input.containerType] || rates['40ft'];
  const storage = Math.round(r.storage * input.delayDays);
  const demurrage = Math.round(r.demurrage * Math.max(0, input.delayDays - 3));
  const detention = Math.round(r.detention * Math.max(0, input.delayDays - 5));
  const lostSales = Math.round(input.cargoValue * 0.002 * input.delayDays);
  return { storage, demurrage, detention, lostSales, total: storage + demurrage + detention + lostSales };
}

export function getImporterRisk(score: number): ImporterRisk {
  if (score >= 80) return 'Low';
  if (score >= 60) return 'Medium';
  if (score >= 40) return 'High';
  return 'Very High';
}

export function getPortRankings() {
  return {
    fastest: [...allPorts].sort((a, b) => a.healthScore - b.healthScore).slice(0, 3),
    slowest: [...allPorts].sort((a, b) => b.healthScore - a.healthScore).slice(0, 3),
    mostImproved: [...allPorts].sort((a, b) => b.scoreTrend - a.scoreTrend).slice(0, 3),
    mostDeclined: [...allPorts].sort((a, b) => a.scoreTrend - b.scoreTrend).slice(0, 3),
    congested: allPorts.filter((p) => p.status === 'Congested' || p.status === 'Severe'),
  };
}

export const laneData: LaneHealth[] = [
  { origin: 'Shanghai', destination: 'Felixstowe', health: 72, normalEta: '28 days', currentEta: '33 days', difference: '+5 days', risk: 'High' },
  { origin: 'Rotterdam', destination: 'Felixstowe', health: 85, normalEta: '3 days', currentEta: '4 days', difference: '+1 day', risk: 'Low' },
  { origin: 'New York', destination: 'Southampton', health: 82, normalEta: '14 days', currentEta: '16 days', difference: '+2 days', risk: 'Medium' },
  { origin: 'Dubai', destination: 'London Gateway', health: 78, normalEta: '20 days', currentEta: '23 days', difference: '+3 days', risk: 'Medium' },
  { origin: 'Hamburg', destination: 'Immingham', health: 88, normalEta: '5 days', currentEta: '6 days', difference: '+1 day', risk: 'Low' },
  { origin: 'Mumbai', destination: 'Southampton', health: 76, normalEta: '22 days', currentEta: '26 days', difference: '+4 days', risk: 'Medium' },
  { origin: 'Dublin', destination: 'Liverpool', health: 62, normalEta: '1 day', currentEta: '3 days', difference: '+2 days', risk: 'High' },
  { origin: 'Cork', destination: 'Bristol', health: 80, normalEta: '2 days', currentEta: '3 days', difference: '+1 day', risk: 'Low' },
  { origin: 'Istanbul', destination: 'London Gateway', health: 74, normalEta: '12 days', currentEta: '15 days', difference: '+3 days', risk: 'Medium' },
  { origin: 'Singapore', destination: 'Felixstowe', health: 70, normalEta: '24 days', currentEta: '29 days', difference: '+5 days', risk: 'High' },
];

export default allPorts;
