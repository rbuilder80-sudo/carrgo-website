'use client';

import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { api, SectionHeader, StatusBadge, fmtTime } from './shared';
import { Loader2, Link2, Search, Trash2 } from 'lucide-react';

type Backlink = { id: string; sourceUrl: string; targetUrl: string; status: string; httpStatus: number | null; lastChecked: string | null };
type Competitor = { id: string; domain: string; createdAt: string; metrics?: { results?: Array<{ name?: string; url?: string; snippet?: string }> } };

export function Competitors() {
  const [backlinks, setBacklinks] = useState<Backlink[]>([]);
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [blSource, setBlSource] = useState('');
  const [compDomain, setCompDomain] = useState('');
  const [busy, setBusy] = useState('');
  const [msg, setMsg] = useState('');

  const load = useCallback(async () => {
    const [bl, cm] = await Promise.all([
      api<{ ok: boolean; backlinks: Backlink[] }>('/api/backlinks'),
      api<{ ok: boolean; competitors: Competitor[] }>('/api/competitors'),
    ]);
    if (bl.ok) setBacklinks(bl.backlinks);
    if (cm.ok) setCompetitors(cm.competitors);
  }, []);

  useEffect(() => { load(); }, [load]);

  const checkBacklink = async () => {
    if (!/^https?:\/\//.test(blSource)) { setMsg('Enter a full source URL (https://…)'); return; }
    setBusy('bl');
    try {
      const res = await api<{ ok: boolean; found: boolean; httpStatus: number; error?: string }>('/api/backlinks', {
        method: 'POST', body: JSON.stringify({ sourceUrl: blSource, targetUrl: 'https://carrgo.co.uk' }),
      });
      setMsg(res.ok ? `Live fetch HTTP ${res.httpStatus}: carrgo.co.uk link ${res.found ? 'FOUND ✓' : 'not found on page'}` : (res.error || 'Check failed'));
      setBlSource('');
      load();
    } finally { setBusy(''); }
  };

  const addCompetitor = async () => {
    if (!compDomain.trim()) return;
    setBusy('comp');
    try {
      const res = await api<{ ok: boolean; error?: string }>('/api/competitors', { method: 'POST', body: JSON.stringify({ domain: compDomain }) });
      setMsg(res.ok ? `Recon stored for ${compDomain}` : (res.error || 'Failed'));
      setCompDomain('');
      load();
    } finally { setBusy(''); }
  };

  const removeCompetitor = async (id: string) => {
    await api('/api/competitors?id=' + id, { method: 'DELETE' });
    load();
  };

  return (
    <div>
      <SectionHeader
        title="Competitors & Backlinks"
        desc="Backlink verification performs a real HTTP fetch of the source page and checks whether carrgo.co.uk actually appears in the HTML. Competitor recon stores live web-search results per domain."
      />

      <div className="grid lg:grid-cols-2 gap-4">
        <Card className="bg-[#12181d] border-[#232d35]">
          <CardContent className="p-4 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Verify a backlink</div>
            <div className="flex gap-2">
              <Input value={blSource} onChange={e => setBlSource(e.target.value)} placeholder="https://partner-site.co.uk/blog/post" className="bg-[#0f1417] border-[#2a353d] text-slate-100" />
              <Button onClick={checkBacklink} disabled={busy === 'bl'} className="bg-amber-500 hover:bg-amber-400 text-black font-semibold shrink-0">
                {busy === 'bl' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Link2 className="h-4 w-4 mr-1" />} Check
              </Button>
            </div>
            <div className="space-y-1.5 max-h-64 overflow-y-auto">
              {backlinks.map(b => (
                <div key={b.id} className="flex items-center gap-2 text-xs">
                  <StatusBadge status={b.status} />
                  <span className="text-slate-300 truncate flex-1">{b.sourceUrl}</span>
                  <span className="text-slate-500">HTTP {b.httpStatus ?? '—'}</span>
                </div>
              ))}
              {backlinks.length === 0 && <div className="text-xs text-slate-500">No backlink checks yet.</div>}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#12181d] border-[#232d35]">
          <CardContent className="p-4 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Competitor recon</div>
            <div className="flex gap-2">
              <Input value={compDomain} onChange={e => setCompDomain(e.target.value)} placeholder="competitor.co.uk" className="bg-[#0f1417] border-[#2a353d] text-slate-100" />
              <Button onClick={addCompetitor} disabled={busy === 'comp'} className="bg-amber-500 hover:bg-amber-400 text-black font-semibold shrink-0">
                {busy === 'comp' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4 mr-1" />} Recon
              </Button>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {competitors.map(c => (
                <div key={c.id} className="text-xs border border-[#232d35] rounded-lg p-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-200 font-semibold">{c.domain}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500">{fmtTime(c.createdAt)}</span>
                      <button className="text-red-400 hover:text-red-300" onClick={() => removeCompetitor(c.id)}><Trash2 className="h-3 w-3" /></button>
                    </div>
                  </div>
                  {c.metrics?.results?.slice(0, 2).map((r, i) => (
                    <div key={i} className="text-slate-500 mt-1 truncate">• {r.name || r.url}</div>
                  ))}
                </div>
              ))}
              {competitors.length === 0 && <div className="text-xs text-slate-500">No competitors tracked yet.</div>}
            </div>
          </CardContent>
        </Card>
      </div>
      {msg && <div className="text-xs text-amber-300 mt-3">{msg}</div>}
    </div>
  );
}
