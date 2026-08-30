// CARRGO SEO Bridge v3 — background service worker (MV3, alarm-driven)
//
// - Heartbeat every 30s: keeps device online + reports every site open in Chrome
//   (the SaaS Publisher Hub surfaces them as publishable destinations).
// - Claim loop every 15s: pulls approved publishing jobs:
//     * medium      → full auto-publish (content/medium.js)
//     * site:<host> → opens/focuses that site, loads content/generic.js which
//                     fills the editor and asks you to confirm publish
// - GSC/GA4 auto-sync every 20 min: if Search Console / GA4 tabs are open,
//   silently extracts performance data into the SaaS.

const HEARTBEAT_MIN = 0.5;   // 30s
const CLAIM_MIN = 0.25;      // 15s
const SYNC_MIN = 20;         // 20 min

let loopsStarted = false;

async function cfg() {
  const { saasUrl, deviceId, deviceKey, deviceName, paired } = await chrome.storage.local.get(['saasUrl', 'deviceId', 'deviceKey', 'deviceName', 'paired']);
  return { saasUrl: (saasUrl || '').replace(/\/$/, ''), deviceId, deviceKey, deviceName, paired };
}

async function api(path, body, requireAuth = true) {
  const c = await cfg();
  if (!c.saasUrl) throw new Error('SaaS URL not configured');
  const headers = { 'Content-Type': 'application/json' };
  if (requireAuth && c.deviceKey) headers['X-Device-Key'] = c.deviceKey;
  const res = await fetch(`${c.saasUrl}${path}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body || {}),
  });
  const json = await res.json().catch(() => ({}));
  return { status: res.status, json };
}

function notify(message) {
  try {
    chrome.notifications.create({ type: 'basic', iconUrl: 'icons/icon128.png', title: 'CARRGO SEO Bridge', message });
  } catch (e) { /* notifications may be unavailable */ }
}

// ---------- open tabs → SaaS (Publisher Hub discovery) ----------

async function collectTabs() {
  const tabs = await chrome.tabs.query({ url: ['http://*/*', 'https://*/*'] });
  const seen = new Set();
  const out = [];
  for (const t of tabs) {
    try {
      const u = new URL(t.url);
      if (!/^https?:$/.test(u.protocol)) continue;
      const host = u.hostname;
      if (seen.has(host)) continue;
      seen.add(host);
      out.push({ host, title: (t.title || '').slice(0, 200) });
      if (out.length >= 40) break;
    } catch (e) { /* ignore bad urls */ }
  }
  return out;
}

// ---------- heartbeat + claim + sync ----------

async function heartbeat() {
  const c = await cfg();
  if (!c.paired) return;
  try {
    const tabs = await collectTabs();
    await api('/api/bridge/heartbeat', { deviceId: c.deviceId, version: chrome.runtime.getManifest().version, tabs });
  } catch (e) { /* offline, retry next alarm */ }
}

async function claimLoop() {
  const c = await cfg();
  if (!c.paired) return;
  try {
    const { json } = await api('/api/bridge/claim', { deviceId: c.deviceId });
    if (json && json.job) {
      notify(`New publishing job: ${json.job.title.slice(0, 70)}`);
      await dispatchJob(json.job);
    }
  } catch (e) { /* server unreachable */ }
}

async function autoSyncGoogle() {
  const c = await cfg();
  if (!c.paired) return;
  const tabs = await chrome.tabs.query({ url: ['https://search.google.com/*search-console*', 'https://analytics.google.com/*'] });
  for (const t of tabs) {
    const type = /search-console/.test(t.url || '') ? 'EXTRACT_GSC' : 'EXTRACT_GA4';
    try {
      const res = await chrome.tabs.sendMessage(t.id, { type, auto: true });
      if (res && res.ok) console.log('[bridge] auto-sync ok:', type);
    } catch (e) { /* tab not showing the report — skip */ }
  }
}

function startLoops() {
  if (loopsStarted) return;
  loopsStarted = true;
  chrome.alarms.create('heartbeat', { periodInMinutes: HEARTBEAT_MIN });
  chrome.alarms.create('claim', { periodInMinutes: CLAIM_MIN });
  chrome.alarms.create('googlesync', { periodInMinutes: SYNC_MIN });
  heartbeat();
  claimLoop();
}

chrome.runtime.onStartup.addListener(startLoops);
chrome.runtime.onInstalled.addListener(startLoops);
chrome.alarms.onAlarm.addListener(al => {
  if (al.name === 'heartbeat') heartbeat();
  else if (al.name === 'claim') claimLoop();
  else if (al.name === 'googlesync') autoSyncGoogle();
});

// kick off when service worker wakes
setTimeout(startLoops, 300);

// ---------- message hub ----------

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  (async () => {
    try {
      if (msg.type === 'PAIR') {
        const { saasUrl, code, name } = msg;
        const deviceId = (await chrome.storage.local.get('deviceId')).deviceId || crypto.randomUUID();
        await chrome.storage.local.set({ saasUrl: saasUrl.replace(/\/$/, ''), deviceId, deviceName: name || 'Chrome' });
        const r = await api('/api/bridge/pair', { deviceId, name: name || 'Chrome', pairingCode: code }, false);
        if (r.json && r.json.ok) {
          await chrome.storage.local.set({ paired: true, deviceKey: r.json.deviceKey });
          loopsStarted = false;
          startLoops();
          sendResponse({ ok: true, deviceName: r.json.deviceName });
        } else {
          sendResponse({ ok: false, error: (r.json && r.json.error) || `HTTP ${r.status}` });
        }
        return;
      }

      if (msg.type === 'TEST_CONN') {
        try {
          const r = await fetch(`${msg.saasUrl.replace(/\/$/, '')}/api/overview`);
          sendResponse({ ok: r.ok, status: r.status });
        } catch (e) {
          sendResponse({ ok: false, error: e.message });
        }
        return;
      }

      if (msg.type === 'STATUS') {
        const c = await cfg();
        sendResponse({ ok: true, ...c, version: chrome.runtime.getManifest().version });
        return;
      }

      if (msg.type === 'UNPAIR') {
        await chrome.storage.local.set({ paired: false, deviceKey: '' });
        sendResponse({ ok: true });
        return;
      }

      if (msg.type === 'JOB_DONE') {
        const c = await cfg();
        const r = await api('/api/bridge/complete', {
          deviceId: c.deviceId,
          jobId: msg.jobId,
          ok: msg.ok,
          publishedUrl: msg.publishedUrl,
          error: msg.error,
          steps: msg.steps,
          authOk: msg.authOk,
        });
        sendResponse(r);
        return;
      }

      if (msg.type === 'SEND_GSC') {
        const c = await cfg();
        const r = await api('/api/bridge/gsc', { deviceId: c.deviceId, queries: msg.queries || [], pages: msg.pages || [], batch: msg.batch });
        sendResponse(r);
        return;
      }

      if (msg.type === 'SEND_GA4') {
        const c = await cfg();
        const r = await api('/api/bridge/ga4', { deviceId: c.deviceId, pages: msg.pages || [], summary: msg.summary, batch: msg.batch });
        sendResponse(r);
        return;
      }
    } catch (e) {
      sendResponse({ ok: false, error: e.message });
    }
  })();
  return true; // async response
});

// ---------- job dispatch ----------

function jobTitle(job) {
  return job.title || 'New from CARRGO';
}

async function dispatchJob(job) {
  // site:<host> → publish into the user's own open site
  if (String(job.platform).startsWith('site:')) {
    await dispatchSiteJob(job);
    return;
  }
  if (job.platform === 'medium') {
    const tab = await chrome.tabs.create({ url: 'https://medium.com/new-story', active: false });
    await chrome.storage.local.set({ ['job_' + job.id]: { ...job, tabId: tab.id, startedAt: Date.now() } });
    return;
  }

  const platformUrls = {
    linkedin: 'https://www.linkedin.com/feed/?shareActive=true&textForShare=' + encodeURIComponent(jobTitle(job)),
    x: 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(jobTitle(job)),
    reddit: 'https://www.reddit.com/submit',
    quora: 'https://www.quora.com/board',
    facebook: 'https://www.facebook.com/',
    pinterest: 'https://www.pinterest.com/pin-builder/',
    blogger: 'https://www.blogger.com/blog/post/preview',
  };
  const url = platformUrls[job.platform] || platformUrls.linkedin;
  const tab = await chrome.tabs.create({ url, active: false });
  await chrome.storage.local.set({ ['job_' + job.id]: { ...job, tabId: tab.id, startedAt: Date.now() } });

  const plain = `${jobTitle(job)}\n\n${stripMd(job.bodyMd).slice(0, 1800)}`;
  try {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (text) => { navigator.clipboard.writeText(text).catch(() => {}); },
      args: [plain],
    });
  } catch (e) { /* clipboard may need focus */ }
}

// ---------- generic site publishing (site:<host>) ----------

async function dispatchSiteJob(job) {
  const host = job.platform.slice(5);
  // 1. Reuse an existing open tab on that host (so we publish inside the user's real logged-in session)
  let tab = null;
  const tabs = await chrome.tabs.query({ url: [`http://${host}/*`, `https://${host}/*`, `http://*.${host}/*`, `https://*.${host}/*`] });
  if (tabs.length) {
    tab = tabs.find(t => t.active) || tabs[0];
    await chrome.tabs.update(tab.id, { active: true });
  } else {
    // look for an editor route first on their own site
    const guess = /wordpress|wp-admin/i.test(host) ? `https://${host}/wp-admin/post-new.php` : `https://${host}/`;
    tab = await chrome.tabs.create({ url: guess, active: false });
  }

  await chrome.storage.local.set({ ['job_' + job.id]: { ...job, tabId: tab.id, startedAt: Date.now() } });

  // 2. Wait for the tab to finish loading, then inject the generic publisher
  const waitAndInject = async (tabId, attempt = 0) => {
    if (attempt > 30) {
      await api('/api/bridge/complete', { deviceId: (await cfg()).deviceId, jobId: job.id, ok: false, error: 'Timed out loading the site tab' }).catch(() => {});
      return;
    }
    try {
      const t = await chrome.tabs.get(tabId);
      if (t.status !== 'complete') { setTimeout(() => waitAndInject(tabId, attempt + 1), 1000); return; }
      await chrome.scripting.executeScript({ target: { tabId }, files: ['content/generic.js'] });
      await chrome.tabs.sendMessage(tabId, { type: 'CARRGO_SITE_JOB', job: { id: job.id, title: job.title, bodyMd: job.bodyMd, tags: job.tags || '' } }).catch(() => {});
    } catch (e) {
      setTimeout(() => waitAndInject(tabId, attempt + 1), 1000);
    }
  };
  waitAndInject(tab.id);
}

function stripMd(md) {
  return String(md || '')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/\[(.+?)\]\((https?:\/\/[^\s)]+)\)/g, '$1 ($2)');
}

// ---------- medium automation: capture published URL ----------

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo) => {
  if (changeInfo.status !== 'complete') return;
  const data = await chrome.storage.local.get();
  const jobKey = Object.keys(data).find(k => k.startsWith('job_') && data[k].tabId === tabId);
  if (!jobKey) return;
  const job = data[jobKey];
  if (job.platform !== 'medium') return;

  // If we ended up on a published story URL, capture evidence
  const tab = await chrome.tabs.get(tabId);
  if (/^https:\/\/(medium\.com|[^\/]*\.medium\.com)\/p\/|\/[a-f0-9]{8,}/.test(tab.url || '') && !/new-story/.test(tab.url)) {
    const steps = (job.steps || []).concat([{ step: 'PUBLISH_CONFIRMED', ok: true, detail: tab.url }]);
    await chrome.storage.local.set({ [jobKey]: { ...job, steps, publishedUrl: tab.url } });
    const c = await cfg();
    await api('/api/bridge/complete', {
      deviceId: c.deviceId, jobId: job.id, ok: true, publishedUrl: tab.url, steps,
    }).catch(() => {});
    await chrome.storage.local.remove(jobKey);
    notify('Medium post published and verified ✓');
  }
});
