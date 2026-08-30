// CARRGO SEO Bridge — GA4 extractor.
// Extracts the visible Reports table (pages/sessions/users) and posts to the SaaS.
// Triggered from the extension popup ("Pull GA4 data").

function parseNum(s) {
  if (!s) return 0;
  const v = parseFloat(String(s).replace(/,/g, ''));
  return Number.isFinite(v) ? v : 0;
}

function parsePct(s) {
  if (!s) return 0;
  const v = parseFloat(String(s).replace(/[%\s,]/g, ''));
  return Number.isFinite(v) ? v / 100 : 0;
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type !== 'EXTRACT_GA4') return;

  (async () => {
    const pages = [];
    const summary = {};

    // GA4 renders report tables in scrollable grids; look for native tables and role=grid
    const tables = [...document.querySelectorAll('table, [role="grid"]')];
    for (const table of tables) {
      const rows = [...table.querySelectorAll('tr, [role="row"]')];
      for (const tr of rows) {
        const cells = [...tr.querySelectorAll('td, [role="cell"], [role="gridcell"]')].map(td => (td.innerText || '').trim());
        if (cells.length < 3) continue;
        const first = cells[0];
        if (!first || /total/i.test(first)) continue;
        const looksLikePath = /^\/[a-z0-9\-_/%.]*$/i.test(first);
        if (!looksLikePath) continue;
        const sessions = parseNum(cells[1]);
        const users = parseNum(cells[2]);
        const engagement = parsePct(cells[3]);
        if (!sessions && !users) continue;
        pages.push({ path: first, sessions, users, engagement });
      }
    }

    // Try to read the summary cards (sessions/users/pageviews/engagement rate)
    const cardText = document.body.innerText;
    const grab = (labelRegex) => {
      const re = new RegExp(labelRegex + '\\s*([\\d,.]+%?)', 'i');
      const m = cardText.match(re);
      return m ? m[1] : null;
    };
    const sSessions = grab('Sessions\\s*\\n?\\s*');
    if (sSessions) summary.sessions = parseNum(sSessions);
    const sUsers = grab('Total users\\s*\\n?\\s*');
    if (sUsers) summary.users = parseNum(sUsers);
    const sViews = grab('Views\\s*\\n?\\s*');
    if (sViews) summary.pageviews = parseNum(sViews);
    const sEng = grab('Engagement rate\\s*\\n?\\s*');
    if (sEng) summary.engagementRate = parsePct(sEng);

    if (!pages.length && !Object.keys(summary).length) {
      sendResponse({ ok: false, error: 'No GA4 data found — open Reports → Engagement → Pages and screens, ensure rows are loaded, then retry.' });
      return;
    }

    const res = await new Promise(resolve => {
      chrome.runtime.sendMessage({ type: 'SEND_GA4', pages, summary: Object.keys(summary).length ? summary : null, batch: 'ga4-' + Date.now() }, r => resolve(r));
    });
    sendResponse(res || { ok: false, error: 'No response from bridge' });
  })();

  return true;
});
