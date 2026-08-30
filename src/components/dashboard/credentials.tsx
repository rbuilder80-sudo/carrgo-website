'use client';

import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { api, SectionHeader, StatusBadge, fmtTime } from './shared';
import { Loader2, Plug, Trash2, RefreshCw } from 'lucide-react';

type Cred = {
  id: string; platform: string; label: string; status: string;
  lastCheckOk: boolean | null; lastCheckedAt: string | null; meta: Record<string, unknown>;
};

const API_PLATFORMS = [
  { key: 'medium_api', name: 'Medium (API token)', secretLabel: 'Integration token', extra: [] as Array<{ key: string; label: string }> },
  { key: 'devto', name: 'DEV.to', secretLabel: 'API key', extra: [] },
  { key: 'wordpress', name: 'WordPress (REST)', secretLabel: 'Application password', extra: [{ key: 'site', label: 'Site URL (https://yoursite.com)' }, { key: 'username', label: 'Username' }] },
  { key: 'telegram', name: 'Telegram bot', secretLabel: 'Bot token (from @BotFather)', extra: [{ key: 'chatId', label: 'Channel / chat ID (@name or -100…)' }, { key: 'username', label: 'Public channel username (optional, for link building)' }] },
  { key: 'webhook', name: 'Custom webhook', secretLabel: 'Any secret (optional)', extra: [{ key: 'url', label: 'Webhook URL (POST JSON)' }] },
];

export function CredentialsManager() {
  const [creds, setCreds] = useState<Cred[]>([]);
  const [platform, setPlatform] = useState('medium_api');
  const [secret, setSecret] = useState('');
  const [extra, setExtra] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');

  const load = useCallback(async () => {
    const data = await api<{ ok: boolean; credentials: Cred[] }>('/api/credentials');
    if (data.ok) setCreds(data.credentials);
  }, []);

  useEffect(() => { load(); }, [load]);

  const spec = API_PLATFORMS.find(p => p.key === platform)!;

  const add = async () => {
    if (!secret.trim() && platform !== 'webhook') { setMsg('Enter the secret/token'); return; }
    setBusy(true); setMsg('');
    try {
      const res = await api<{ ok: boolean; test?: { ok: boolean; detail: string }; error?: string }>('/api/credentials', {
        method: 'POST',
        body: JSON.stringify({ platform, secret, label: spec.name, meta: extra }),
      });
      if (res.ok && res.test) {
        setMsg(`Live API test: ${res.test.ok ? '✓' : '✗'} ${res.test.detail}`);
      } else setMsg(res.error || 'Failed');
      setSecret(''); setExtra({});
      await load();
    } finally {
      setBusy(false);
    }
  };

  const retest = async (id: string) => {
    setMsg('Testing against live API…');
    const res = await api<{ ok: boolean; test?: { ok: boolean; detail: string } }>('/api/credential-test/' + id, { method: 'POST' });
    if (res.ok && res.test) setMsg(`Live API test: ${res.test.ok ? '✓' : '✗'} ${res.test.detail}`);
    load();
  };

  const remove = async (id: string) => {
    await api('/api/credential-test/' + id, { method: 'DELETE' });
    load();
  };

  return (
    <div>
      <SectionHeader
        title="Credentials Manager"
        desc="Connect direct-publishing platforms. Every credential is AES-256-GCM encrypted at rest and validated with a real API round-trip before it can be used. Extension-channel platforms (Medium web, LinkedIn, X…) need no API keys — pair the Chrome bridge instead."
        right={<Button variant="outline" size="sm" className="border-[#2a353d] text-slate-300" onClick={load}><RefreshCw className="h-3.5 w-3.5 mr-1" /> Refresh</Button>}
      />

      <Card className="bg-[#12181d] border-[#232d35] mb-5">
        <CardContent className="p-4 space-y-3">
          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <label className="text-xs uppercase tracking-wider text-slate-400">Platform</label>
              <Select value={platform} onValueChange={v => { setPlatform(v); setExtra({}); }}>
                <SelectTrigger className="mt-1 bg-[#0f1417] border-[#2a353d] text-slate-100"><SelectValue /></SelectTrigger>
                <SelectContent className="bg-[#171e24] border-[#2a353d] text-slate-100">
                  {API_PLATFORMS.map(p => <SelectItem key={p.key} value={p.key}>{p.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-slate-400">{spec.secretLabel}</label>
              <Input type="password" value={secret} onChange={e => setSecret(e.target.value)} placeholder="Paste token…" className="mt-1 bg-[#0f1417] border-[#2a353d] text-slate-100" />
            </div>
          </div>
          {spec.extra.length > 0 && (
            <div className="grid md:grid-cols-2 gap-3">
              {spec.extra.map(x => (
                <div key={x.key}>
                  <label className="text-xs uppercase tracking-wider text-slate-400">{x.label}</label>
                  <Input value={extra[x.key] || ''} onChange={e => setExtra(prev => ({ ...prev, [x.key]: e.target.value }))} className="mt-1 bg-[#0f1417] border-[#2a353d] text-slate-100" />
                </div>
              ))}
            </div>
          )}
          <Button onClick={add} disabled={busy} className="bg-amber-500 hover:bg-amber-400 text-black font-semibold">
            {busy ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Plug className="h-4 w-4 mr-2" />} Connect & live-test
          </Button>
          {msg && <div className="text-xs text-amber-300">{msg}</div>}
        </CardContent>
      </Card>

      <div className="space-y-2.5">
        {creds.length === 0 && <div className="text-sm text-slate-500">No credentials connected yet.</div>}
        {creds.map(c => (
          <Card key={c.id} className="bg-[#12181d] border-[#232d35]">
            <CardContent className="p-4 flex flex-wrap items-center gap-3">
              <div className="flex-1 min-w-[200px]">
                <div className="font-semibold text-slate-100 text-sm">{c.label} <span className="text-slate-500 font-normal">({c.platform})</span></div>
                <div className="text-xs text-slate-500 mt-0.5">Last checked: {fmtTime(c.lastCheckedAt)}</div>
              </div>
              <StatusBadge status={c.status} />
              <Button size="sm" variant="outline" className="border-[#2a353d] text-slate-300" onClick={() => retest(c.id)}>Test</Button>
              <Button size="sm" variant="outline" className="border-red-500/30 text-red-400" onClick={() => remove(c.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
