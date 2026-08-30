import { decryptSecret } from './crypto';
import { fetchText } from './http';

export type CredMeta = Record<string, string>;

export type PublishResult = {
  ok: boolean;
  url?: string;
  platformPostId?: string;
  raw?: string;
  error?: string;
};

// ---------- Credential validation (live API round-trip) ----------

export async function testCredential(platform: string, secret: string, meta: CredMeta): Promise<{ ok: boolean; detail: string }> {
  try {
    switch (platform) {
      case 'medium': {
        const r = await fetchWithAuth('https://api.medium.com/v1/me', `Bearer ${secret}`);
        if (r.status === 200) {
          const j = JSON.parse(r.body);
          const name = j?.data?.name || j?.data?.username || 'unknown';
          return { ok: true, detail: `Authenticated as ${name}` };
        }
        return { ok: false, detail: `Medium API returned HTTP ${r.status} — token rejected` };
      }
      case 'devto': {
        const r = await fetchWithAuth('https://dev.to/api/articles/me/all?per_page=1', secret);
        if (r.status === 200) return { ok: true, detail: 'dev.to API key valid' };
        return { ok: false, detail: `dev.to returned HTTP ${r.status}` };
      }
      case 'wordpress': {
        const site = (meta.site || '').replace(/\/$/, '');
        if (!site) return { ok: false, detail: 'Missing site URL' };
        const basic = Buffer.from(`${meta.username || ''}:${secret}`).toString('base64');
        const r = await fetchWithAuth(`${site}/wp-json/wp/v2/users/me?context=edit`, `Basic ${basic}`);
        if (r.status === 200) return { ok: true, detail: `WordPress user "${safeJson(r.body)?.name || 'ok'}" authenticated` };
        return { ok: false, detail: `WordPress returned HTTP ${r.status}` };
      }
      case 'telegram': {
        const r = await fetchText(`https://api.telegram.org/bot${secret}/getMe`);
        if (r.ok && r.body.includes('"ok":true')) {
          const j = JSON.parse(r.body);
          return { ok: true, detail: `Bot @${j.result?.username} authenticated` };
        }
        return { ok: false, detail: `Telegram bot token rejected (HTTP ${r.status})` };
      }
      case 'webhook': {
        const url = meta.url || secret;
        if (!/^https?:\/\//i.test(url)) return { ok: false, detail: 'Webhook URL must start with http(s)://' };
        const r = await fetchText(url, 10000);
        return { ok: r.ok, detail: r.ok ? `Webhook responded HTTP ${r.status}` : `Webhook returned HTTP ${r.status || 'no response'}` };
      }
      default:
        return { ok: false, detail: `Platform "${platform}" publishes via the Chrome extension bridge — no API credential needed` };
    }
  } catch (e) {
    return { ok: false, detail: `Network error: ${(e as Error).message}` };
  }
}

function fetchWithAuth(url: string, auth: string, timeoutMs = 15000) {
  return fetchText(url, { headers: { Authorization: auth } }, timeoutMs);
}

function safeJson(s: string): Record<string, unknown> | null {
  try { return JSON.parse(s); } catch { return null; }
}

// ---------- Real publishing ----------

export async function publishViaApi(platform: string, secretEnc: string, meta: CredMeta, job: { title: string; bodyMd: string; tags: string }): Promise<PublishResult> {
  const secret = decryptSecret(secretEnc);

  switch (platform) {
    case 'medium': {
      const me = await fetchWithAuth('https://api.medium.com/v1/me', `Bearer ${secret}`);
      if (me.status !== 200) return { ok: false, error: `Medium auth failed (HTTP ${me.status})` };
      const meJ = safeJson(me.body);
      const authorId = (meJ as { data?: { id?: string } })?.data?.id;
      if (!authorId) return { ok: false, error: 'Could not resolve Medium author id' };

      const cleanTags = job.tags.split(',').map(t => t.trim()).filter(Boolean).slice(0, 5);
      const payload = {
        title: job.title,
        contentFormat: 'markdown',
        content: job.bodyMd,
        tags: cleanTags,
        publishStatus: 'public',
      };
      const r = await fetchText(`https://api.medium.com/v1/users/${authorId}/posts`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${secret}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }, 30000);
      const j = safeJson(r.body) as { data?: { id?: string; url?: string }; errors?: Array<{ message?: string }> } | null;
      if (r.status === 201 && j?.data?.url) {
        return { ok: true, url: j.data.url, platformPostId: j.data.id, raw: `Medium post created: ${j.data.url}` };
      }
      return { ok: false, error: j?.errors?.[0]?.message || `Medium API HTTP ${r.status}` };
    }

    case 'devto': {
      const cleanTags = job.tags.split(',').map(t => t.trim().replace(/[^a-z0-9]/gi, '').toLowerCase()).filter(Boolean).slice(0, 4);
      const payload = {
        article: {
          title: job.title,
          published: true,
          body_markdown: job.bodyMd,
          tags: cleanTags,
        },
      };
      const r = await fetchText('https://dev.to/api/articles', {
        method: 'POST',
        headers: { 'api-key': secret, 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }, 30000);
      const j = safeJson(r.body) as { url?: string; id?: number; error?: string } | null;
      if (r.status === 201 && j?.url) return { ok: true, url: j.url, platformPostId: String(j.id) };
      return { ok: false, error: j?.error || `dev.to HTTP ${r.status}` };
    }

    case 'wordpress': {
      const site = (meta.site || '').replace(/\/$/, '');
      const basic = Buffer.from(`${meta.username || ''}:${secret}`).toString('base64');
      // Convert simple markdown → HTML blocks
      const html = markdownToHtml(job.bodyMd);
      const r = await fetchText(`${site}/wp-json/wp/v2/posts`, {
        method: 'POST',
        headers: { Authorization: `Basic ${basic}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: job.title, content: html, status: 'publish' }),
      }, 30000);
      const j = safeJson(r.body) as { id?: number; link?: string; message?: string } | null;
      if (r.status === 201 && j?.link) return { ok: true, url: j.link, platformPostId: String(j.id) };
      return { ok: false, error: j?.message || `WordPress HTTP ${r.status}` };
    }

    case 'telegram': {
      const chat = meta.chatId || meta.channel || '';
      if (!chat) return { ok: false, error: 'Missing chat/channel id in credential meta' };
      const text = `*${job.title}*\n\n${job.bodyMd.replace(/[#*`>]/g, '').slice(0, 3500)}${job.bodyMd.length > 3500 ? '…' : ''}`;
      const r = await fetchText(`https://api.telegram.org/bot${secret}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chat, text, parse_mode: 'Markdown' }),
      }, 20000);
      const j = safeJson(r.body) as { ok?: boolean; result?: { message_id?: number }; description?: string } | null;
      if (j?.ok && j.result?.message_id) {
        const u = meta.username ? `https://t.me/${meta.username.replace('@', '')}/${j.result.message_id}` : undefined;
        return { ok: true, url: u, platformPostId: String(j.result.message_id), raw: 'Telegram message delivered' };
      }
      return { ok: false, error: j?.description || `Telegram HTTP ${r.status}` };
    }

    case 'webhook': {
      const url = meta.url || secret;
      const r = await fetchText(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: job.title, body: job.bodyMd, tags: job.tags, source: 'carrgo-seo-saas' }),
      }, 20000);
      return r.ok
        ? { ok: true, raw: `Webhook accepted payload (HTTP ${r.status})` }
        : { ok: false, error: `Webhook returned HTTP ${r.status}` };
    }

    default:
      return { ok: false, error: `Platform "${platform}" is extension-published. Pair the Chrome extension and set channel=extension.` };
  }
}

// Minimal, safe markdown→HTML for WordPress REST
export function markdownToHtml(md: string): string {
  const lines = md.split('\n');
  const out: string[] = [];
  let inList = false;
  for (const line of lines) {
    const esc = line.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    let h = esc
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/\[(.+?)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2">$1</a>');
    const lm = h.match(/^#{1,4}\s+(.*)$/);
    const isLi = /^[-*]\s+/.test(h);
    if (lm) {
      if (inList) { out.push('</ul>'); inList = false; }
      const level = (lm[0].match(/^#+/) || ['#'])[0].length;
      out.push(`<h${level + 1}>${lm[1]}</h${level + 1}>`);
    } else if (isLi) {
      if (!inList) { out.push('<ul>'); inList = true; }
      out.push(`<li>${h.replace(/^[-*]\s+/, '')}</li>`);
    } else if (h.trim() === '') {
      if (inList) { out.push('</ul>'); inList = false; }
    } else {
      if (inList) { out.push('</ul>'); inList = false; }
      out.push(`<p>${h}</p>`);
    }
  }
  if (inList) out.push('</ul>');
  return out.join('\n');
}
