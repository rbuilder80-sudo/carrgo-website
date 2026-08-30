// CARRGO SEO Bridge v3 — generic site publisher (content script, injected on demand)
//
// Loaded by the background worker when a site:<host> job is claimed.
// Detects the page editor (WordPress Gutenberg/Classic, Blogger, Wix, Squarespace,
// Webflow, Shopify, Ghost, custom textareas/contenteditable), fills title + body,
// and shows a confirmation panel. The user clicks Publish on their site (they are
// already logged in), then confirms in the panel — the job completes with the
// real page URL as live evidence.

(function () {
  if (window.__carrgoBridgeLoaded) return;
  window.__carrgoBridgeLoaded = true;

  let currentJob = null;

  function mdToPlain(md) {
    return String(md || '')
      .replace(/^#{1,6}\s+/gm, '')
      .replace(/\*\*(.+?)\*\*/g, '$1')
      .replace(/\*(.+?)\*/g, '$1')
      .replace(/\[(.+?)\]\((https?:\/\/[^\s)]+)\)/g, '$1 ($2)');
  }

  function mdToHtml(md) {
    const lines = String(md || '').split('\n');
    const out = [];
    let inList = false;
    for (const raw of lines) {
      const line = raw.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\[(.+?)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2">$1</a>');
      const h = line.match(/^#{1,4}\s+(.*)$/);
      if (h) { if (inList) { out.push('</ul>'); inList = false; } out.push(`<h3>${h[1]}</h3>`); }
      else if (/^[-*]\s+/.test(line)) { if (!inList) { out.push('<ul>'); inList = true; } out.push(`<li>${line.replace(/^[-*]\s+/, '')}</li>`); }
      else if (line.trim() === '') { if (inList) { out.push('</ul>'); inList = false; } }
      else { if (inList) { out.push('</ul>'); inList = false; } out.push(`<p>${line}</p>`); }
    }
    if (inList) out.push('</ul>');
    return out.join('\n');
  }

  function visible(el) {
    if (!el) return false;
    const r = el.getBoundingClientRect();
    const st = getComputedStyle(el);
    return r.width > 50 && r.height > 20 && st.display !== 'none' && st.visibility !== 'hidden';
  }

  function findTitleField() {
    const selectors = [
      '#title', 'input[name="post_title"]',
      'textarea.editor-post-title__input', // Gutenberg
      '.editor-post-title__input',          // Gutenberg div
      'input[aria-label*="itle" i]', 'textarea[aria-label*="itle" i]',
      'input[placeholder*="itle" i]',
      '.article-title input', 'input[name="title"]', '#entryTitle',
      'input[name="name"][type="text"]', // Shopify/Webflow style
    ];
    for (const s of selectors) {
      const el = document.querySelector(s);
      if (visible(el)) return el;
    }
    return null;
  }

  function findBodyField() {
    // WordPress classic
    let el = document.querySelector('#wp-content-wrap textarea#content');
    if (visible(el)) return el;
    // Blogger / Ghost / generic contenteditable
    const candidates = [...document.querySelectorAll(
      '[contenteditable="true"], div.ProseMirror, .CodeMirror textarea, textarea[name="content"], textarea[name="body"], textarea[name="description"]'
    )].filter(visible);
    // Prefer the biggest editable surface (skip title-like small inputs)
    candidates.sort((a, b) => (b.getBoundingClientRect().height) - (a.getBoundingClientRect().height));
    if (candidates.length && candidates[0].getBoundingClientRect().height > 40) return candidates[0];
    const ta = [...document.querySelectorAll('textarea')].filter(visible)
      .sort((a, b) => (b.getBoundingClientRect().height) - (a.getBoundingClientRect().height))[0];
    return ta || null;
  }

  function setNativeValue(el, value) {
    const proto = el instanceof HTMLTextAreaElement || el instanceof HTMLInputElement ? HTMLInputElement.prototype : null;
    const setter = Object.getOwnPropertyDescriptor(proto || el.__proto__, 'value')?.set;
    if (setter) setter.call(el, value); else el.value = value;
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  }

  function fillEditor(job) {
    const steps = [];
    const title = findTitleField();
    if (title) {
      if (title.isContentEditable || title.tagName === 'TEXTAREA' || title.tagName === 'INPUT') {
        title.focus();
        if (title.isContentEditable) {
          document.execCommand('selectAll', false, null);
          document.execCommand('insertText', false, job.title);
        } else {
          setNativeValue(title, job.title);
        }
        steps.push({ step: 'TITLE_FILLED', ok: true, detail: title.tagName + '.' + (title.className || '').toString().slice(0, 60) });
      }
    } else steps.push({ step: 'TITLE_FIELD_NOT_FOUND', ok: false });

    const body = findBodyField();
    if (body) {
      const html = mdToHtml(job.bodyMd);
      const plain = mdToPlain(job.bodyMd);
      body.focus();
      if (body.isContentEditable || body.classList?.contains('ProseMirror')) {
        document.execCommand('selectAll', false, null);
        document.execCommand('insertHTML', false, html);
        steps.push({ step: 'BODY_FILLED_HTML', ok: true });
      } else {
        setNativeValue(body, plain);
        steps.push({ step: 'BODY_FILLED_TEXT', ok: true });
      }
    } else steps.push({ step: 'BODY_FIELD_NOT_FOUND', ok: false });

    return steps;
  }

  // ---------- confirmation panel ----------

  function showPanel(job) {
    document.getElementById('carrgo-bridge-panel')?.remove();
    const panel = document.createElement('div');
    panel.id = 'carrgo-bridge-panel';
    panel.style.cssText = 'position:fixed;bottom:18px;right:18px;z-index:2147483647;background:#0d1216;color:#e2e8f0;border:1px solid #fbbf24;border-radius:12px;padding:14px 16px;width:320px;font:13px/1.5 -apple-system,Segoe UI,Roboto,sans-serif;box-shadow:0 12px 40px rgba(0,0,0,.5);';
    panel.innerHTML = `
      <div style="font-weight:700;color:#fbbf24;margin-bottom:4px;">⚡ CARRGO SEO Bridge</div>
      <div style="margin-bottom:8px;">Article loaded into this site's editor.<br>
      <span style="color:#94a3b8;font-size:12px;">“${(job.title || '').replace(/[<>]/g, '').slice(0, 80)}”</span></div>
      <div style="color:#94a3b8;font-size:12px;margin-bottom:10px;">1. Review → press the site's own <b>Publish</b> button<br>2. Then confirm here:</div>
      <div style="display:flex;gap:8px;">
        <button id="carrgo-done" style="flex:1;background:#10b981;color:#04110a;border:0;border-radius:8px;padding:8px 10px;font-weight:700;cursor:pointer;">✓ I published it</button>
        <button id="carrgo-fail" style="flex:1;background:#1a232a;color:#f87171;border:1px solid #33414c;border-radius:8px;padding:8px 10px;cursor:pointer;">Problem…</button>
      </div>
      <div id="carrgo-note" style="color:#64748b;font-size:11px;margin-top:8px;"></div>
    `;
    document.documentElement.appendChild(panel);

    panel.querySelector('#carrgo-done').onclick = () => {
      chrome.runtime.sendMessage({ type: 'JOB_DONE', jobId: job.id, ok: true, publishedUrl: location.href, steps: currentJob?.steps || [] }, () => {
        panel.querySelector('#carrgo-note').textContent = '✓ Reported live to the SaaS. You can close this panel.';
        setTimeout(() => panel.remove(), 2500);
      });
    };
    panel.querySelector('#carrgo-fail').onclick = () => {
      const why = prompt('What went wrong? (sent to the SaaS job log)');
      chrome.runtime.sendMessage({ type: 'JOB_DONE', jobId: job.id, ok: false, error: why || 'User reported failure on site', steps: currentJob?.steps || [] }, () => {
        panel.querySelector('#carrgo-note').textContent = 'Reported. Job marked failed in the SaaS.';
        setTimeout(() => panel.remove(), 2500);
      });
    };
  }

  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type !== 'CARRGO_SITE_JOB') return;
    const job = msg.job;
    (async () => {
      currentJob = { steps: [] };
      await new Promise(r => setTimeout(r, 800)); // let SPA editors mount
      let steps = fillEditor(job);
      // some editors need a second pass after hydration
      if (steps.some(s => !s.ok)) {
        await new Promise(r => setTimeout(r, 1500));
        steps = steps.concat(fillEditor(job).map(s => ({ ...s, step: s.step + '_RETRY' })));
      }
      currentJob.steps = steps;
      const okAny = steps.some(s => s.ok);
      showPanel(job);
      sendResponse({ ok: okAny, steps });
    })();
    return true;
  });
})();
