import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';

const source = readFileSync(new URL('../src/lib/formConfig.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
const { submitToFormspree } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);
const originalFetch = globalThis.fetch;
const cases = [
  { name: 'accepted boolean', status: 200, body: { success: true }, expected: true },
  { name: 'accepted string', status: 200, body: { success: 'true' }, expected: true },
  { name: 'rejected boolean', status: 200, body: { success: false }, expected: false },
  { name: 'rejected string', status: 200, body: { success: 'false' }, expected: false },
  { name: 'missing acknowledgement', status: 200, body: {}, expected: false },
  { name: 'server error', status: 500, body: { success: true }, expected: false },
];

try {
  for (const scenario of cases) {
    globalThis.fetch = async (endpoint, options) => {
      assert.equal(endpoint, 'https://formsubmit.co/ajax/support@carrgo.co.uk');
      assert.equal(options.method, 'POST');
      assert.equal(options.body.get('form_type'), 'Delivery check');
      return new Response(JSON.stringify(scenario.body), { status: scenario.status });
    };
    const result = await submitToFormspree('Delivery check', { email: 'support@carrgo.co.uk' });
    assert.equal(result.success, scenario.expected, scenario.name);
  }
  globalThis.fetch = async () => new Response('<html>upstream error</html>', { status: 200 });
  assert.equal((await submitToFormspree('Delivery check', {})).success, false);
  globalThis.fetch = async () => { throw new Error('Network unavailable'); };
  const networkFailure = await submitToFormspree('Delivery check', {});
  assert.equal(networkFailure.success, false);
  assert.equal(networkFailure.error, 'Network unavailable');
  console.log('Form delivery checks passed: 8 response and network scenarios; no live requests sent.');
} finally {
  globalThis.fetch = originalFetch;
}
