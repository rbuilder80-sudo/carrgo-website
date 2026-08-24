const RESEND_API_URL = 'https://api.resend.com/emails';
const SUPPORT_EMAIL = process.env.RESEND_TO_EMAIL || 'support@carrgo.co.uk';
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'Carrgo Website <support@carrgo.co.uk>';
const ALLOWED_ORIGINS = new Set([
  'https://carrgo.co.uk',
  'https://www.carrgo.co.uk',
  'https://carrgo-uk-website.netlify.app',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
]);

function corsHeaders(origin) {
  const allowedOrigin = ALLOWED_ORIGINS.has(origin) ? origin : 'https://carrgo.co.uk';
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
    'Vary': 'Origin',
  };
}

function text(value) {
  return String(value || '').replace(/\s+/g, ' ').trim().slice(0, 2000);
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function fieldRows(fields) {
  return Object.entries(fields)
    .filter(([key, value]) => key !== 'formType' && key !== 'website' && text(value))
    .map(([key, value]) => {
      const label = key.replace(/[-_]/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
      return `<tr><th align="left" style="padding:8px;border-bottom:1px solid #e5e7eb;background:#f8fafc;">${escapeHtml(label)}</th><td style="padding:8px;border-bottom:1px solid #e5e7eb;">${escapeHtml(text(value))}</td></tr>`;
    })
    .join('');
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function buildEmail(fields) {
  const formType = text(fields.formType) || 'Website Enquiry';
  const senderEmail = text(fields.from_email || fields.email);
  const senderName = text(fields.from_name || fields.name || fields.company || 'Website visitor');
  const subject = `New ${formType} — Carrgo Website`;

  return {
    from: FROM_EMAIL,
    to: [SUPPORT_EMAIL],
    reply_to: senderEmail && isEmail(senderEmail) ? senderEmail : undefined,
    subject,
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.5;color:#111827;">
        <h2 style="margin:0 0 12px;">${escapeHtml(subject)}</h2>
        <p style="margin:0 0 16px;">A new Carrgo website form was submitted by ${escapeHtml(senderName)}.</p>
        <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:760px;border:1px solid #e5e7eb;">
          ${fieldRows(fields)}
        </table>
        <p style="font-size:12px;color:#6b7280;margin-top:16px;">Sent via Carrgo website Resend function. Only the submitted form fields are included.</p>
      </div>
    `,
    text: [
      subject,
      '',
      ...Object.entries(fields)
        .filter(([key, value]) => key !== 'website' && text(value))
        .map(([key, value]) => `${key}: ${text(value)}`),
    ].join('\n'),
  };
}

exports.handler = async function handler(event) {
  const headers = corsHeaders(event.headers.origin || event.headers.Origin || '');

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  let fields;
  try {
    fields = JSON.parse(event.body || '{}');
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid form data' }) };
  }

  if (fields.website) {
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
  }

  const senderEmail = text(fields.from_email || fields.email);
  if (!senderEmail || !isEmail(senderEmail)) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Please enter a valid email address.' }) };
  }

  if (!text(fields.from_name || fields.name)) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Please enter your name.' }) };
  }

  const email = buildEmail(fields);
  if (process.env.RESEND_TEST_MODE === 'true') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        ok: true,
        testMode: true,
        to: email.to,
        subject: email.subject,
        reply_to: email.reply_to,
      }),
    };
  }

  if (!process.env.RESEND_API_KEY) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Email service is not configured yet.' }) };
  }

  const response = await fetch(RESEND_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(email),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    return {
      statusCode: 502,
      headers,
      body: JSON.stringify({ error: data.message || 'Email service failed. Please email support@carrgo.co.uk directly.' }),
    };
  }

  return { statusCode: 200, headers, body: JSON.stringify({ ok: true, id: data.id }) };
};
