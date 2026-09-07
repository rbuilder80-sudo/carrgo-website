const VESSEL_API_BASE_URL = 'https://api.vesselapi.com';

const PORTS = [
  { slug: 'felixstowe', name: 'Felixstowe', unlocode: 'GBFXT' },
  { slug: 'southampton', name: 'Southampton', unlocode: 'GBSOU' },
  { slug: 'london-gateway', name: 'London Gateway', unlocode: 'GBLGP' },
  { slug: 'liverpool', name: 'Liverpool', unlocode: 'GBLIV' },
  { slug: 'bristol', name: 'Bristol', unlocode: 'GBBRS' },
  { slug: 'tilbury', name: 'Tilbury', unlocode: 'GBTIL' },
  { slug: 'immingham', name: 'Immingham', unlocode: 'GBIMM' },
  { slug: 'grangemouth', name: 'Grangemouth', unlocode: 'GBGRG' },
  { slug: 'holyhead', name: 'Holyhead', unlocode: 'GBHLY' },
  { slug: 'belfast', name: 'Belfast', unlocode: 'GBBEL' },
  { slug: 'larne', name: 'Larne', unlocode: 'GBLAR' },
  { slug: 'londonderry', name: 'Londonderry', unlocode: 'GBLDY' },
  { slug: 'dublin', name: 'Dublin', unlocode: 'IEDUB' },
  { slug: 'cork', name: 'Cork', unlocode: 'IEORK' },
  { slug: 'rosslare-europort', name: 'Rosslare Europort', unlocode: 'IEROS' },
  { slug: 'shannon-foynes', name: 'Shannon Foynes', unlocode: 'IEFOV' },
  { slug: 'waterford', name: 'Waterford', unlocode: 'IEWAT' },
];

function json(statusCode, body, extraHeaders = {}) {
  return {
    statusCode,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'public, max-age=900, stale-while-revalidate=1800',
      ...extraHeaders,
    },
    body: JSON.stringify(body),
  };
}

function buildUrl(path, params = {}) {
  const url = new URL(path, VESSEL_API_BASE_URL);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, String(value));
    }
  });
  return url;
}

async function vesselFetch(path, params, apiKey) {
  const response = await fetch(buildUrl(path, params), {
    headers: {
      accept: 'application/json',
      authorization: `Bearer ${apiKey}`,
    },
  });

  const text = await response.text();
  let body = null;
  if (text) {
    try {
      body = JSON.parse(text);
    } catch {
      body = { raw: text };
    }
  }

  if (!response.ok) {
    const message = body?.error?.message || `VesselAPI returned ${response.status}`;
    const error = new Error(message);
    error.status = response.status;
    error.body = body;
    throw error;
  }

  return body;
}

function scoreFromInboundVessels(inboundCount) {
  if (inboundCount <= 2) return 88;
  if (inboundCount <= 4) return 78;
  if (inboundCount <= 8) return 68;
  if (inboundCount <= 14) return 52;
  return 38;
}

function statusFromScore(score) {
  if (score >= 80) return 'Normal';
  if (score >= 60) return 'Moderate';
  if (score >= 40) return 'Congested';
  return 'Severe';
}

function waitTimeFromStatus(status) {
  if (status === 'Normal') return '0-1 days';
  if (status === 'Moderate') return '1-3 days';
  if (status === 'Congested') return '3-5 days';
  return '5+ days';
}

function getArray(body, preferredKeys) {
  for (const key of preferredKeys) {
    if (Array.isArray(body?.[key])) return body[key];
  }
  return [];
}

async function buildPortSummary(port, apiKey, from, to) {
  const [eventsResult, inboundResult] = await Promise.allSettled([
    vesselFetch(`/v1/portevents/port/${port.unlocode}`, {
      'time.from': from,
      'time.to': to,
      'pagination.limit': 50,
    }, apiKey),
    vesselFetch(`/v1/port/${port.unlocode}/inbound`, {
      'pagination.limit': 50,
    }, apiKey),
  ]);

  const events = eventsResult.status === 'fulfilled'
    ? getArray(eventsResult.value, ['events', 'portEvents', 'data', 'vessels'])
    : [];
  const inbound = inboundResult.status === 'fulfilled'
    ? getArray(inboundResult.value, ['vesselETAs', 'vessels', 'inbound', 'data'])
    : [];

  const eventCount = events.length;
  const inboundCount = inbound.length;
  const healthScore = scoreFromInboundVessels(inboundCount);
  const status = statusFromScore(healthScore);

  return {
    ...port,
    status,
    healthScore,
    waitTime: waitTimeFromStatus(status),
    vesselsWaiting: inboundCount,
    vesselsAtBerth: Math.min(eventCount, 12),
    recentPortEvents: eventCount,
    lastUpdated: new Date().toISOString(),
    source: 'vesselapi',
  };
}

export async function handler() {
  const apiKey = process.env.VESSELAPI_KEY;
  if (!apiKey) {
    return json(503, {
      ok: false,
      error: 'VESSELAPI_KEY is not configured',
      ports: [],
    }, { 'cache-control': 'no-store' });
  }

  const now = new Date();
  const from = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();
  const to = now.toISOString();

  try {
    const settled = await Promise.allSettled(
      PORTS.map((port) => buildPortSummary(port, apiKey, from, to))
    );

    const ports = settled
      .filter((result) => result.status === 'fulfilled')
      .map((result) => result.value);

    if (ports.length === 0) {
      const firstFailure = settled.find((result) => result.status === 'rejected');
      throw firstFailure?.reason || new Error('No port data returned');
    }

    return json(200, {
      ok: true,
      source: 'vesselapi',
      generatedAt: now.toISOString(),
      ports,
      partial: ports.length !== PORTS.length,
    });
  } catch (error) {
    const statusCode = error.status === 401 || error.status === 403 ? 502 : 500;
    return json(statusCode, {
      ok: false,
      error: error.message || 'Unable to fetch VesselAPI data',
      ports: [],
    }, { 'cache-control': 'no-store' });
  }
}
