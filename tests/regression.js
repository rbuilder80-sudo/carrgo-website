#!/usr/bin/env node
/**
 * Carrgo SaaS regression suite — covers every path that failed for the client.
 * All checks are read-only and public (no token required). Runs in CI on every push.
 * Exit code 0 = all pass. Any failure = exit 1.
 */
'use strict';
const RAW = 'https://raw.githubusercontent.com/rbuilder80-sudo/carrgo-website';
const LIVE = 'https://www.carrgo.co.uk';
const DASH = 'https://rbuilder80-sudo.github.io/carrgo-seo-saas/';
const GA4 = 'G-QS3BEJ5G6K';
const INDEXNOW_KEY = '5BCJ0N8YEOA6Z24PL31KXWTV7MGDFSIU';

let failures = 0;
let passed = 0;

async function get(url) {
  const r = await fetch(url, { cache: 'no-store' });
  return { status: r.status, text: await r.text() };
}
function check(name, ok, detail) {
  if (ok) { passed++; console.log('  PASS ' + name + (detail ? ' — ' + detail : '')); }
  else { failures++; console.log('  FAIL ' + name + (detail ? ' — ' + detail : '')); }
}

(async () => {
  console.log('Carrgo SaaS regression suite — ' + new Date().toISOString());

  // 1. Live site
  console.log('[site]');
  const home = await get(LIVE + '/');
  check('homepage HTTP 200', home.status === 200, 'status=' + home.status);
  check('GA4 tag inline', home.text.includes(GA4), GA4);

  // 2. Published content (the client-visible outputs)
  console.log('[content]');
  const a1 = await get(LIVE + '/blog/sea-freight-costs-2026.html');
  check('article #1 live', a1.status === 200 && a1.text.length > 500, 'status=' + a1.status + ' bytes=' + a1.text.length);
  const a2 = await get(LIVE + '/blog/china-uk-shipping-time-2026.html');
  check('article #2 live', a2.status === 200 && a2.text.length > 500, 'status=' + a2.status + ' bytes=' + a2.text.length);

  // 3. Indexing pipeline
  console.log('[indexing]');
  const sm = await get(RAW + '/gh-pages/sitemap.xml');
  const locs = (sm.text.match(/<loc>/g) || []).length;
  check('sitemap >= 74 URLs', sm.status === 200 && locs >= 74, 'urls=' + locs);
  const ik = await get(LIVE + '/' + INDEXNOW_KEY + '.txt');
  check('IndexNow key file', ik.status === 200, 'status=' + ik.status);
  const ll = await get(RAW + '/gh-pages/llms.txt');
  check('llms.txt AI door', ll.status === 200 && ll.text.length > 500, 'chars=' + ll.text.length);

  // 4. Autonomous engine (previously failing path: task queue)
  console.log('[engine]');
  const hb = await get(RAW + '/main/tasks/status.md');
  const pollM = hb.text.match(/last-poll:\s*([0-9TZ:.\-+]+)/i);
  const poll = pollM ? pollM[1] : null;
  const ageSec = poll ? Math.round((Date.now() - new Date(poll)) / 1000) : null;
  check('heartbeat present', poll !== null, 'last-poll=' + (poll || 'NONE'));
  check('heartbeat fresh (<60m)', ageSec !== null && ageSec < 3600, 'age=' + (ageSec === null ? 'n/a' : ageSec + 's'));
  const tree = await fetch(`https://api.github.com/repos/rbuilder80-sudo/carrgo-website/git/trees/main?recursive=1`, { headers: { Accept: 'application/vnd.github+json' } }).then(r => r.json());
  const paths = (tree.tree || []).map(x => x.path);
  const doneCount = paths.filter(p => /^tasks\/done\/.+\.md$/.test(p)).length;
  check('tasks completed >= 1', doneCount >= 1, 'done=' + doneCount);

  // 5. Observability + client dashboard
  console.log('[observability]');
  const hf = await get(RAW + '/gh-pages/data/health.json');
  let hfOk = false, hfDetail = 'status=' + hf.status;
  if (hf.status === 200) {
    try {
      const h = JSON.parse(hf.text);
      hfOk = h.engine === 'online' && Array.isArray(h.checks) && h.checks.length >= 5 && h.checks.every(c => c.status === 'ok');
      hfDetail += ' engine=' + h.engine + ' checks=' + (h.checks || []).length + ' overall=' + h.overall;
    } catch (e) { hfDetail += ' (unparseable)'; }
  }
  check('health.json feed healthy', hfOk, hfDetail);
  const dash = await get(DASH);
  check('client dashboard 200', dash.status === 200, 'status=' + dash.status);
  const rk = await get(RAW + '/gh-pages/data/rankings.json');
  check('rankings feed 200', rk.status === 200, 'status=' + rk.status);

  console.log('');
  console.log('RESULT: ' + passed + ' passed, ' + failures + ' failed');
  process.exit(failures === 0 ? 0 : 1);
})().catch(e => { console.error('SUITE ERROR: ' + e.message); process.exit(1); });
