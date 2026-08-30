const $ = (id) => document.getElementById(id);
const statusEl = $('status');

function send(msg) {
  return new Promise(resolve => chrome.runtime.sendMessage(msg, res => resolve(res)));
}

(async () => {
  const st = await send({ type: 'STATUS' });
  if (st && st.paired) {
    statusEl.innerHTML = `<span class="ok">✓ Paired as "${st.deviceName}"</span> — SaaS: ${st.saasUrl || 'not set'}`;
    $('saasUrl').value = st.saasUrl || '';
    $('name').value = st.deviceName || '';
  } else {
    statusEl.textContent = 'Not paired yet. Fill the fields above and press "Pair this Chrome".';
  }
})();

$('test').addEventListener('click', async () => {
  const url = $('saasUrl').value.trim().replace(/\/$/, '');
  if (!url) { statusEl.innerHTML = '<span class="err">Enter the SaaS URL first.</span>'; return; }
  statusEl.textContent = 'Testing…';
  const r = await send({ type: 'TEST_CONN', saasUrl: url });
  statusEl.innerHTML = r && r.ok
    ? '<span class="ok">✓ Connection OK</span>'
    : `<span class="err">Connection failed${r && r.error ? ': ' + r.error : ''}</span>`;
});

$('pair').addEventListener('click', async () => {
  const saasUrl = $('saasUrl').value.trim().replace(/\/$/, '');
  const code = $('code').value.trim();
  const name = $('name').value.trim() || 'Chrome';
  if (!saasUrl || !code) { statusEl.innerHTML = '<span class="err">SaaS URL and pairing code are required.</span>'; return; }
  statusEl.textContent = 'Pairing…';
  const r = await send({ type: 'PAIR', saasUrl, code, name });
  if (r && r.ok) {
    statusEl.innerHTML = `<span class="ok">✓ Paired as "${r.deviceName}". Publishing jobs will now flow automatically.</span>`;
  } else {
    statusEl.innerHTML = `<span class="err">${(r && r.error) || 'Pairing failed'}</span>`;
  }
});

$('unpair').addEventListener('click', async () => {
  await send({ type: 'UNPAIR' });
  statusEl.textContent = 'Unpaired. Reload the extension to pair again.';
});
