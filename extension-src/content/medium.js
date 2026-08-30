// CARRGO SEO Bridge — Medium automation content script.
// Fills title + body on medium.com/new-story, then clicks Publish.

(async () => {
  const MAX_WAIT_MS = 25000;

  function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

  async function waitFor(selectorFn, timeout = MAX_WAIT_MS) {
    const start = Date.now();
    while (Date.now() - start < timeout) {
      const v = selectorFn();
      if (v) return v;
      await sleep(400);
    }
    return null;
  }

  function fireTextInput(el, text) {
    el.focus();
    document.execCommand('selectAll', false, null);
    document.execCommand('insertText', false, text);
  }

  // Ask background for a pending job targeting this tab
  function getJob() {
    return new Promise(resolve => {
      chrome.runtime.sendMessage({ type: 'GET_TAB_JOB' }, res => resolve(res));
    });
  }

  // The background stores jobs keyed by tabId; we pull via storage read through background
  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type === 'PING_MEDIUM_AUTOFILL') sendResponse({ ok: true });
  });

  // Pull job directly from chrome.storage (background writes job_<id> with tabId)
  async function pullJobFromStorage() {
    const data = await chrome.storage.local.get(null);
    const key = Object.keys(data).find(k => k.startsWith('job_') && data[k].tabId !== undefined);
    if (!key) return null;
    const job = data[key];
    // Only claim jobs for this tab that are recent
    if (Date.now() - (job.startedAt || 0) > 10 * 60 * 1000) return null;
    return { key, job };
  }

  const steps = [];
  const log = (step, ok, detail) => { steps.push({ step, ok, detail: detail || '' }); };

  const pulled = await pullJobFromStorage();
  if (!pulled) return;
  const { key, job } = pulled;

  // Wait for the editor
  const editor = await waitFor(() =>
    document.querySelector('article') ||
    document.querySelector('[contenteditable="true"]') ||
    document.querySelector('textarea')
  );
  if (!editor) {
    await chrome.runtime.sendMessage({ type: 'JOB_DONE', jobId: job.id, ok: false, error: 'Medium editor not found — are you logged in to Medium?', steps: [{ step: 'FIND_EDITOR', ok: false }], authOk: false });
    await chrome.storage.local.remove(key);
    return;
  }
  log('OPEN_PLATFORM', true, 'Medium editor loaded');

  // Detect auth state: if a sign-in wall is present, report awaiting_auth
  const signInWall = document.querySelector('a[href^="/m/signin"]') || document.body.innerText.includes('Sign in');
  if (signInWall && !document.querySelector('[data-testid="headerUserMenu"]')) {
    await chrome.runtime.sendMessage({ type: 'JOB_DONE', jobId: job.id, ok: false, error: 'Not logged in to Medium in this Chrome profile', steps: [{ step: 'CHECK_AUTH', ok: false }], authOk: false });
    await chrome.storage.local.remove(key);
    return;
  }
  log('CHECK_AUTH', true, 'Signed in');

  // Title
  const titleEl = await waitFor(() =>
    document.querySelector('textarea[aria-label], h1[contenteditable="true"], [data-testid="storyTitle"] textarea, .not(sub) textarea')
    || [...document.querySelectorAll('textarea, h1[contenteditable="true"]')].find(el => el.offsetParent !== null)
  );
  if (titleEl) {
    fireTextInput(titleEl, job.title);
    log('FILL_TITLE', true, job.title.slice(0, 60));
    await sleep(500);
  } else {
    log('FILL_TITLE', false, 'Title field not found');
  }

  // Body: click into the story content area
  const bodyArea = await waitFor(() =>
    [...document.querySelectorAll('[contenteditable="true"]')].find(el => el !== titleEl && el.offsetParent !== null)
  );
  if (bodyArea) {
    bodyArea.focus();
    const lines = String(job.bodyMd || '').split('\n');
    for (const line of lines.slice(0, 220)) {
      const t = line.trim();
      if (/^#{2}\s+/.test(t)) {
        document.execCommand('insertText', false, t.replace(/^#{2}\s+/, ''));
        await sleep(120);
        // select the line & apply H2 via shortcut
        document.execCommand('selectAll', false, null);
        // Medium: Ctrl/Cmd+Alt+2 applies Heading 2
        const kb = { code: '2', key: '2', altKey: true, ctrlKey: !navigator.platform.includes('Mac'), metaKey: navigator.platform.includes('Mac') };
        document.activeElement && document.activeElement.dispatchEvent(new KeyboardEvent('keydown', { ...kb, bubbles: true }));
        await sleep(120);
        document.execCommand('insertParagraph', false, null);
      } else if (/^[-*]\s+/.test(t)) {
        document.execCommand('insertText', false, t.replace(/^[-*]\s+/, ''));
        await sleep(80);
        // apply bullet via shortcut (Cmd/Ctrl+Shift+7)
        document.activeElement && document.activeElement.dispatchEvent(new KeyboardEvent('keydown', { code: '7', key: '7', shiftKey: true, ctrlKey: !navigator.platform.includes('Mac'), metaKey: navigator.platform.includes('Mac'), bubbles: true }));
        await sleep(120);
        document.execCommand('insertParagraph', false, null);
      } else if (t === '') {
        document.execCommand('insertParagraph', false, null);
      } else {
        document.execCommand('insertText', false, t);
        document.execCommand('insertParagraph', false, null);
      }
      await sleep(60);
    }
    log('FILL_BODY', true, `${lines.length} lines inserted`);
  } else {
    log('FILL_BODY', false, 'Body area not found');
  }

  // Tags: Medium shows tag input after content is added — best effort
  if (Array.isArray(job.tags) && job.tags.length) {
    const tagBtn = await waitFor(() => [...document.querySelectorAll('button, a')].find(b => /add a tag|add tag/i.test(b.innerText || '')), 6000);
    if (tagBtn) {
      tagBtn.click();
      await sleep(800);
      const tagInput = await waitFor(() => document.querySelector('input[placeholder*="tag" i], input[aria-label*="tag" i]'), 5000);
      if (tagInput) {
        for (const tag of job.tags.slice(0, 5)) {
          fireTextInput(tagInput, tag);
          await sleep(200);
          tagInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', bubbles: true }));
          await sleep(300);
        }
        log('FILL_TAGS', true, job.tags.slice(0, 5).join(', '));
      }
    } else {
      log('FILL_TAGS', false, 'Tag input not surfaced');
    }
  }

  // Publish: click "Publish" then confirm in dialog
  const publishBtn = await waitFor(() =>
    [...document.querySelectorAll('button, a')].find(b => /^(publish|publish now)$/i.test((b.innerText || '').trim()))
  );
  if (publishBtn) {
    publishBtn.click();
    log('CLICK_PUBLISH', true);
    await sleep(1500);
    const confirmBtn = await waitFor(() =>
      [...document.querySelectorAll('button')].find(b => /^publish now$/i.test((b.innerText || '').trim()))
    );
    if (confirmBtn) {
      confirmBtn.click();
      log('CLICK_PUBLISH_CONFIRM', true);
    }
  } else {
    log('CLICK_PUBLISH', false, 'Publish button not found');
    await chrome.runtime.sendMessage({ type: 'JOB_DONE', jobId: job.id, ok: false, error: 'Publish button not found — review the draft manually in the opened tab', steps });
    await chrome.storage.local.remove(key);
    return;
  }

  // The background tab-on-updated listener detects the published story URL and reports completion.
  // Fallback: report the filled state so the SaaS shows running steps.
  setTimeout(async () => {
    await chrome.storage.local.remove(key);
  }, 60000);
})();
