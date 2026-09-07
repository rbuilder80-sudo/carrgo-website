const fs = require('fs');
const path = require('path');

const root = process.argv[2] || process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

const layout = read('src/components/Layout.tsx');
const form = read('src/components/QuickQuoteForm.tsx');

function assert(condition, message) {
  if (!condition) {
    console.error(message);
    process.exit(1);
  }
}

assert(layout.includes("import QuickQuoteForm from './QuickQuoteForm';"), 'Layout must import the shared quick quote form.');
assert(layout.includes('<QuickQuoteForm />'), 'Layout must render the quick quote form so new pages inherit it.');
assert(form.includes('data-quick-quote-placement="sticky-sidebar"'), 'Desktop quote form must use the persistent sticky sidebar placement.');
assert(form.includes('data-quick-quote-placement="mobile-sticky"'), 'Mobile quote form must use the sticky mobile quote entry placement.');
assert(form.includes('position: 1280') === false, 'Quote form CSS must not contain malformed media output.');
assert(form.includes('padding-right: 360px'), 'Desktop layout must reserve right-side space so the sidebar does not cover the main text.');

[
  'Origin',
  'Destination',
  'Goods',
  'Approx weight / volume',
  'Dimensions',
  "I'm not sure about dimensions yet",
  'Name',
  'Email',
  'Phone / WhatsApp',
].forEach((label) => {
  assert(form.includes(label), `Quick quote form is missing required field label: ${label}`);
});

assert(form.includes('Get a China-UK shipping quote'), 'China route must get a route-specific quote invitation.');
assert(form.includes("origin: 'China'"), 'China route must prefill origin.');
assert(form.includes("destination: 'United Kingdom'"), 'Route pages must prefill UK destination.');
assert(form.includes('Ask about your shipment through ${port}'), 'Port pages must use a port-specific shipment invitation.');
assert(form.includes('Ask about your shipment through this port'), 'Port delay resources must use the requested port-delay invitation.');
assert(form.includes('follow_up_note'), 'Form must say extra shipment details are requested after the enquiry arrives.');
assert(form.includes("submitToFormspree('Quick Quote Enquiry'"), 'Form must submit via the existing Carrgo enquiry backend.');
assert(form.includes('Get instant quote'), 'Primary quote button should be immediate and action-led.');

console.log('Quick quote form checks passed.');
