import { db } from '@/lib/db';
import { ensureWorker } from '@/lib/worker';

export async function GET() {
  ensureWorker();
  const leads = await db.enquiry.findMany({ orderBy: { receivedAt: 'desc' }, take: 300 });
  return Response.json({ ok: true, leads });
}

/**
 * Public lead-capture webhook. Point any form (carrgo.co.uk, Typeform, Zapier, Make, n8n…)
 * at POST {base}/api/leads. Accepts JSON or form-encoded bodies.
 * If a `leads_token` setting exists, callers must pass it as ?token= or X-Leads-Token header.
 */
export async function POST(req: Request) {
  const contentType = req.headers.get('content-type') || '';
  let payload: Record<string, unknown> = {};
  if (contentType.includes('application/json')) {
    payload = await req.json().catch(() => ({}));
  } else if (contentType.includes('form')) {
    const form = await req.formData().catch(() => null);
    if (form) payload = Object.fromEntries(form.entries());
  } else {
    try { payload = await req.json(); } catch { payload = Object.fromEntries(new URL(req.url).searchParams); }
  }

  // optional shared-token gate
  const tokenRow = await db.setting.findUnique({ where: { key: 'leads_token' } });
  if (tokenRow?.value) {
    const url = new URL(req.url);
    const provided = req.headers.get('x-leads-token') || url.searchParams.get('token') || '';
    if (provided !== tokenRow.value) {
      return Response.json({ ok: false, error: 'Invalid leads token' }, { status: 401 });
    }
  }

  const name = String(payload.name || payload.Name || payload.fullname || payload.fullName || '').trim();
  const email = String(payload.email || payload.Email || '').trim();
  const message = String(payload.message || payload.Message || payload.enquiry || payload.details || '').trim();
  if (!name && !email) {
    return Response.json({ ok: false, error: 'Lead rejected: need at least name or email' }, { status: 422 });
  }

  const lead = await db.enquiry.create({
    data: {
      name: name || '(no name)',
      email,
      phone: String(payload.phone || payload.tel || payload.telephone || '').trim(),
      company: String(payload.company || payload.organisation || payload.organization || '').trim(),
      message,
      source: 'webhook',
      page: String(payload.page || payload.landing || req.headers.get('referer') || '').slice(0, 500),
    },
  });

  return Response.json({ ok: true, id: lead.id, message: 'Enquiry captured' });
}
