const statusEl = document.getElementById('status');
const msgEl = document.getElementById('msg');

function send(msg) {
  return new Promise(resolve => chrome.runtime.sendMessage(msg, res => resolve(res)));
}

(async () => {
  const st = await send({ type: 'STATUS' });
  if (st && st.paired) {
    statusEl.textContent = 'Paired · online';
    statusEl.className = 'badge on';
    document.getElementById('dname').textContent = st.deviceName || 'Chrome';
  } else {
    statusEl.textContent = 'Not paired';
    statusEl.className = 'badge off';
    document.getElementById('dname').textContent = '—';
  }
  document.getElementById('ver').textContent = st && st.version ? st.version : '—';
})();

document.getElementById('options').addEventListener('click', () => chrome.runtime.openOptionsPage());

async function pullInTab(type, url, readyText) {
  msgEl.textContent = 'Opening ' + readyText + '…';
  const tab = await chrome.tabs.create({ url, active: false });
  // wait for load then attempt extraction; content script must be on the final URL the user lands on
  let attempts = 0;
  const timer = setInterval(async () => {
    attempts++;
    try {
      const res = await chrome.tabs.sendMessage(tab.id, { type });
      if (res && res.ok !== undefined) {
        clearInterval(timer);
        if (res.ok) {
          msgEl.textContent = '✓ ' + (res.stored ? JSON.stringify(res.stored) : 'Data sent to SaaS');
          chrome.tabs.remove(tab.id).catch(() => {});
        } else {
          msgEl.textContent = res.error || 'Extraction failed';
        }
      }
    } catch (e) { /* content script not ready yet */ }
    if (attempts > 20) {
      clearInterval(timer);
      msgEl.textContent = 'Could not extract automatically — check the opened tab is showing the report, then press the button again.';
      chrome.tabs.update(tab.id, { active: true });
    }
  }, 1500);
}

document.getElementById('gsc').addEventListener('click', async () => {
  const st = await send({ type: 'STATUS' });
  if (!st || !st.paired) { msgEl.textContent = 'Pair with the SaaS first (settings).'; return; }
  await pullInTab('EXTRACT_GSC', 'https://search.google.com/u/1/search-console?resource_id=sc-domain:carrgo.co.uk', 'Search Console');
});

document.getElementById('ga4').addEventListener('click', async () => {
  const st = await send({ type: 'STATUS' });
  if (!st || !st.paired) { msgEl.textContent = 'Pair with the SaaS first (settings).'; return; }
  await pullInTab('EXTRACT_GA4', 'https://analytics.google.com/analytics/web/#/', 'Google Analytics');
});
