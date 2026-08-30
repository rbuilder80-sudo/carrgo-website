// CARRGO SEO Bridge — Google Search Console extractor.
// Extracts the Performance > Search results table (queries + pages) and posts to the SaaS.
// Triggered from the extension popup ("Pull GSC data").

function extractTableRows(container) {
  const rows = [];
  container.querySelectorAll('table tbody tr').forEach(tr => {
    const cells = [...tr.querySelectorAll('td')].map(td => td.innerText.trim());
    if (cells.length >= 3) rows.push(cells);
  });
  return rows;
}

function parseNum(s) {
  if (!s) return 0;
  const t = String(s).replace(/%,/g, m => (m === '%' ? '' : ''));
  const clean = t.replace(/,/g, '');
  if (/%$/.test(String(s).trim())) {
    const v = parseFloat(clean);
    return Number.isFinite(v) ? v / 100 : 0;
  }
  const v = parseFloat(clean);
  return Number.isFinite(v) ? v : 0;
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type !== 'EXTRACT_GSC') return;

  (async () => {
    const bodyText = document.body.innerText;
    if (/Performance.*Search results/i.test(bodyText) === false && /Welcome to Search Console/i.test(bodyText)) {
      sendResponse({ ok: false, error: 'Open Performance → Search results first, then try again.' });
      return;
    }

    const queries = [];
    const pages = [];

    // Find all tables; classify by their headers
    const tables = [...document.querySelectorAll('table')];
    for (const table of tables) {
      const headers = [...table.querySelectorAll('th')].map(th => th.innerText.trim().toLowerCase());
      const isQueryTable = headers.some(h => /quer/i.test(h)) || table.closest('[aria-label*="quer" i]') !== null;
      const rows = extractTableRows(table);
      for (const cells of rows) {
        const name = cells[0];
        const nums = cells.slice(1).map(parseNum);
        if (!name || nums.length < 3) continue;
        const row = { clicks: nums[0] || 0, impressions: nums[1] || 0, ctr: nums[2] || 0, position: nums[3] || 0 };
        if (isQueryTable) queries.push({ query: name, ...row });
        else if (/^https?:\/\//i.test(name) || name.startsWith('/')) pages.push({ page: name, ...row });
      }
    }

    if (!queries.length && !pages.length) {
      sendResponse({ ok: false, error: 'No table rows found — make sure the Performance report is fully loaded (and not a comparison view).' });
      return;
    }

    const res = await new Promise(resolve => {
      chrome.runtime.sendMessage({ type: 'SEND_GSC', queries, pages, batch: 'gsc-' + Date.now() }, r => resolve(r));
    });
    sendResponse(res || { ok: false, error: 'No response from bridge' });
  })();

  return true;
});
