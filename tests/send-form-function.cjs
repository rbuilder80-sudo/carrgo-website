const assert = require('node:assert/strict');

process.env.RESEND_TEST_MODE = 'true';
process.env.RESEND_TO_EMAIL = 'support@carrgo.co.uk';
process.env.RESEND_FROM_EMAIL = 'Carrgo Website <support@carrgo.co.uk>';

const { handler } = require('../netlify/functions/send-form.cjs');

async function invoke(body, origin = 'https://carrgo.co.uk') {
  return handler({
    httpMethod: 'POST',
    headers: { origin },
    body: JSON.stringify(body),
  });
}

(async () => {
  const quote = await invoke({
    formType: 'Quote Request',
    name: 'Test User',
    email: 'test@example.com',
    origin: 'Shanghai',
    dest: 'Birmingham',
    cargo: 'Test cartons',
  });
  assert.equal(quote.statusCode, 200);
  const quoteBody = JSON.parse(quote.body);
  assert.equal(quoteBody.testMode, true);
  assert.deepEqual(quoteBody.to, ['support@carrgo.co.uk']);
  assert.equal(quoteBody.reply_to, 'test@example.com');
  assert.match(quoteBody.subject, /Quote Request/);

  const contact = await invoke({
    formType: 'Contact Enquiry',
    from_name: 'Test Contact',
    from_email: 'contact@example.com',
    message: 'This is a local test only.',
  });
  assert.equal(contact.statusCode, 200);
  const contactBody = JSON.parse(contact.body);
  assert.equal(contactBody.reply_to, 'contact@example.com');
  assert.match(contactBody.subject, /Contact Enquiry/);

  const badEmail = await invoke({ formType: 'Contact Enquiry', name: 'Bad', email: 'not-an-email' });
  assert.equal(badEmail.statusCode, 400);

  const honeypot = await invoke({ formType: 'Quote Request', name: 'Bot', email: 'bot@example.com', website: 'spam' });
  assert.equal(honeypot.statusCode, 200);
  assert.equal(JSON.parse(honeypot.body).ok, true);

  console.log('PASS send-form function test');
})();
