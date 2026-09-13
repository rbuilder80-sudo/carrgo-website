const SUPPORT_EMAIL = 'support@carrgo.co.uk';
const DEFAULT_FROM_EMAIL = 'Carrgo Website <support@carrgo.co.uk>';
const RESEND_API_URL = 'https://api.resend.com/emails';

function getEnv(key) {
  return globalThis.Netlify?.env?.get?.(key) || process.env[key];
}

function wantsJson(request) {
  const accept = request.headers.get('accept') || '';
  const contentType = request.headers.get('content-type') || '';
  return accept.includes('application/json') || contentType.includes('application/json');
}

function json(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  });
}

function html(status, title, message) {
  return new Response(`<!doctype html>
<html lang="en-GB">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${escapeHtml(title)} | Carrgo</title>
  <style>
    body{font:16px/1.6 system-ui,-apple-system,Segoe UI,sans-serif;background:#f8fafc;color:#111827;margin:0}
    main{max-width:680px;margin:10vh auto;padding:32px;background:#fff;border:1px solid #e5e7eb;border-radius:18px;box-shadow:0 20px 50px #0f172a1a}
    h1{font-size:2rem;line-height:1.2;margin:0 0 12px}
    a{color:#1a6dff;font-weight:700}
  </style>
</head>
<body>
  <main>
    <h1>${escapeHtml(title)}</h1>
    <p>${escapeHtml(message)}</p>
    <p><a href="/">Return to Carrgo</a></p>
  </main>
</body>
</html>`, {
    status,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'no-store',
    },
  });
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function titleCase(value) {
  return String(value)
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function normalizeFields(fields) {
  if (!fields || typeof fields !== 'object' || Array.isArray(fields)) return {};
  return Object.fromEntries(
    Object.entries(fields)
      .map(([key, value]) => [String(key).trim(), String(value ?? '').trim()])
      .filter(([key, value]) => key && value)
  );
}

function findEmail(fields) {
  const candidate = fields.from_email || fields.email || fields.reply_to || '';
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(candidate) ? candidate : undefined;
}

async function parsePayload(request) {
  const contentType = request.headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    return request.json();
  }

  if (
    contentType.includes('application/x-www-form-urlencoded') ||
    contentType.includes('multipart/form-data')
  ) {
    const formData = await request.formData();
    const rawFields = Object.fromEntries(
      Array.from(formData.entries()).map(([key, value]) => [key, typeof value === 'string' ? value : value.name])
    );
    const formType = rawFields.formType || rawFields._subject || 'Website Enquiry';
    const fields = Object.fromEntries(
      Object.entries(rawFields).filter(([key]) => !key.startsWith('_') && key !== 'formType')
    );
    return { formType, fields };
  }

  return {};
}

function buildHtml(formType, fields, submittedAt) {
  const rows = Object.entries(fields)
    .map(([key, value]) => `
      <tr>
        <th style="text-align:left;vertical-align:top;padding:10px 12px;background:#f8fafc;border-bottom:1px solid #e5e7eb;width:180px;color:#374151;font-family:Arial,sans-serif;font-size:13px;">
          ${escapeHtml(titleCase(key))}
        </th>
        <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;color:#111827;font-family:Arial,sans-serif;font-size:14px;white-space:pre-wrap;">
          ${escapeHtml(value)}
        </td>
      </tr>
    `)
    .join('');

  return `
    <div style="font-family:Arial,sans-serif;color:#111827;line-height:1.5;">
      <h1 style="font-size:20px;margin:0 0 6px;">New ${escapeHtml(formType)} - Carrgo Website</h1>
      <p style="margin:0 0 18px;color:#4b5563;font-size:14px;">Submitted ${escapeHtml(submittedAt)}</p>
      <table style="border-collapse:collapse;width:100%;max-width:720px;border:1px solid #e5e7eb;">
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}

function buildText(formType, fields, submittedAt) {
  const lines = Object.entries(fields).map(([key, value]) => `${titleCase(key)}: ${value}`);
  return [`New ${formType} - Carrgo Website`, `Submitted ${submittedAt}`, '', ...lines].join('\n');
}

export default async function sendFormEmail(request) {
  const jsonResponse = wantsJson(request);

  if (request.method !== 'POST') {
    return jsonResponse
      ? json(405, { ok: false, error: 'Method not allowed' })
      : html(405, 'Form not submitted', 'Please submit the form from carrgo.co.uk.');
  }

  const apiKey = getEnv('RESEND_API_KEY');
  if (!apiKey) {
    return jsonResponse
      ? json(503, { ok: false, error: 'Email service is not configured' })
      : html(503, 'Email service not configured', 'Please email support@carrgo.co.uk directly.');
  }

  let payload;
  try {
    payload = await parsePayload(request);
  } catch {
    return jsonResponse
      ? json(400, { ok: false, error: 'Invalid submission' })
      : html(400, 'Invalid submission', 'Please check the form and try again.');
  }

  const formType = String(payload.formType || 'Website Enquiry').trim().slice(0, 80);
  const fields = normalizeFields(payload.fields);
  const fieldCount = Object.keys(fields).length;
  if (fieldCount === 0) {
    return jsonResponse
      ? json(400, { ok: false, error: 'Please complete the form before submitting' })
      : html(400, 'Please complete the form', 'Please go back, complete the required fields and submit again.');
  }

  const replyTo = findEmail(fields);
  const submittedAt = new Date().toLocaleString('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Europe/London',
  });

  const resendPayload = {
    from: getEnv('RESEND_FROM_EMAIL') || DEFAULT_FROM_EMAIL,
    to: [SUPPORT_EMAIL],
    subject: `New ${formType} - Carrgo Website`,
    html: buildHtml(formType, fields, submittedAt),
    text: buildText(formType, fields, submittedAt),
    ...(replyTo ? { reply_to: replyTo } : {}),
  };

  const response = await fetch(RESEND_API_URL, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${apiKey}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify(resendPayload),
  });

  const body = await response.json().catch(() => null);
  if (!response.ok) {
    const message = body?.message || 'Unable to send email right now';
    return jsonResponse
      ? json(502, { ok: false, error: message })
      : html(502, 'Message not sent', `${message}. Please email support@carrgo.co.uk directly.`);
  }

  return jsonResponse
    ? json(200, { ok: true, id: body?.id })
    : html(200, 'Enquiry received', 'Thank you. Carrgo will review your details and reply from support@carrgo.co.uk.');
}
