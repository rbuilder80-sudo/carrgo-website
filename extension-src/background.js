// CARRGO SEO Bridge — background service worker (MV3)

const HEARTBEAT_MS = 30000;
const CLAIM_MS = 12000;

let claimTimer = null;
let heartbeatTimer = null;

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

// ---------- heartbeat + claim loop ----------

async function heartbeat() {
  const c = await cfg();
  if (!c.paired) return;
  try {
    await api('/api/bridge/heartbeat', { deviceId: c.deviceId, version: chrome.runtime.getManifest().version });
  } catch (e) { /* offline, retry next tick */ }
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

function startLoops() {
  if (!heartbeatTimer) heartbeatTimer = setInterval(heartbeat, HEARTBEAT_MS);
  if (!claimTimer) claimTimer = setInterval(claimLoop, CLAIM_MS);
  heartbeat();
  claimLoop();
}

chrome.runtime.onStartup.addListener(startLoops);
chrome.runtime.onInstalled.addListener(startLoops);

// kick off when service worker wakes
startLoops();

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

async function dispatchJob(job) {
  const platformUrls = {
    medium: 'https://medium.com/new-story',
    linkedin: 'https://www.linkedin.com/feed/?shareActive=true&textForShare=' + encodeURIComponent(jobTitle(job)),
    x: 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(jobTitle(job)),
    reddit: 'https://www.reddit.com/submit',
    quora: 'https://www.quora.com/board',
    facebook: 'https://www.facebook.com/',
    pinterest: 'https://www.pinterest.com/pin-builder/',
  };

  const url = platformUrls[job.platform] || platformUrls.medium;
  const tab = await chrome.tabs.create({ url, active: false });
  await chrome.storage.local.set({ ['job_' + job.id]: { ...job, tabId: tab.id, startedAt: Date.now() } });

  if (job.platform === 'medium') {
    // content script does full automation; nothing else to do here
    return;
  }

  // For non-Medium platforms we copy the content to the clipboard and open the composer;
  // the content is also stored so platform content scripts (if present) can auto-fill.
  const plain = `${jobTitle(job)}\n\n${stripMd(job.bodyMd).slice(0, 1800)}`;
  try {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (text) => { navigator.clipboard.writeText(text).catch(() => {}); },
      args: [plain],
    });
  } catch (e) { /* clipboard may need focus */ }
}

function jobTitle(job) {
  return job.title || 'New from CARRGO';
}

function stripMd(md) {
  return String(md || '')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/\[(.+?)\]\((https?:\/\/[^\s)]+)\)/g, '$1 ($2)');
}

// ---------- medium automation helpers ----------

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
