const SUPPORT_EMAIL = 'support@carrgo.co.uk';
const DEFAULT_FROM_EMAIL = 'Carrgo Website <onboarding@resend.dev>';
const RESEND_API_URL = 'https://api.resend.com/emails';

function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
    body: JSON.stringify(body),
  };
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

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return json(405, { ok: false, error: 'Method not allowed' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return json(503, { ok: false, error: 'Email service is not configured' });
  }

  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch {
    return json(400, { ok: false, error: 'Invalid submission' });
  }

  const formType = String(payload.formType || 'Website Enquiry').trim().slice(0, 80);
  const fields = normalizeFields(payload.fields);
  const fieldCount = Object.keys(fields).length;
  if (fieldCount === 0) {
    return json(400, { ok: false, error: 'Please complete the form before submitting' });
  }

  const replyTo = findEmail(fields);
  const submittedAt = new Date().toLocaleString('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Europe/London',
  });

  const resendPayload = {
    from: process.env.RESEND_FROM_EMAIL || DEFAULT_FROM_EMAIL,
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
    return json(502, {
      ok: false,
      error: body?.message || 'Unable to send email right now',
    });
  }

  return json(200, { ok: true, id: body?.id });
}
