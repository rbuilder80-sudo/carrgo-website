'use client';

import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { api, SectionHeader, StatusBadge } from './shared';
import { Loader2, Search, Target } from 'lucide-react';

type Keyword = { id: string; term: string; source: string; estVolume: number | null; difficulty: number | null; intent: string | null; status: string };

export function KeywordScout() {
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [seed, setSeed] = useState('freight forwarding uk');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');

  const load = useCallback(async () => {
    const data = await api<{ ok: boolean; keywords: Keyword[] }>('/api/keywords');
    if (data.ok) setKeywords(data.keywords);
  }, []);

  useEffect(() => { load(); }, [load]);

  const research = async () => {
    if (!seed.trim()) return;
    setBusy(true); setMsg('');
    try {
      const res = await api<{ ok: boolean; count: number; error?: string }>('/api/keywords', {
        method: 'POST',
        body: JSON.stringify({ seed }),
      });
      setMsg(res.ok ? `Scraped ${res.count} live Google suggestions for "${seed}"` : (res.error || 'Research failed'));
      load();
    } finally {
      setBusy(false);
    }
  };

  const setStatus = async (id: string, status: string) => {
    await api('/api/keywords', { method: 'PATCH', body: JSON.stringify({ id, status }) });
    load();
  };

  return (
    <div>
      <SectionHeader
        title="Keyword Scout"
        desc="Live keyword discovery straight from Google autocomplete (multiple modifier probes, UK locale). Volume estimates are derived from suggestion rank position — real ranking signal, not invented numbers."
      />

      <Card className="bg-[#12181d] border-[#232d35] mb-5">
        <CardContent className="p-4 flex flex-wrap gap-3 items-end">
          <div className="flex-1 min-w-[240px]">
            <label className="text-xs uppercase tracking-wider text-slate-400">Seed keyword</label>
            <Input value={seed} onChange={e => setSeed(e.target.value)} onKeyDown={e => e.key === 'Enter' && research()} className="mt-1 bg-[#0f1417] border-[#2a353d] text-slate-100" />
          </div>
          <Button onClick={research} disabled={busy} className="bg-amber-500 hover:bg-amber-400 text-black font-semibold">
            {busy ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Scraping Google…</> : <><Search className="h-4 w-4 mr-2" /> Find keywords</>}
          </Button>
        </CardContent>
      </Card>
      {msg && <div className="text-xs text-amber-300 mb-3">{msg}</div>}

      <Card className="bg-[#12181d] border-[#232d35]">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-[#232d35]">
                <TableHead className="text-slate-400">Keyword</TableHead>
                <TableHead className="text-slate-400">Est. volume</TableHead>
                <TableHead className="text-slate-400">Difficulty</TableHead>
                <TableHead className="text-slate-400">Intent</TableHead>
                <TableHead className="text-slate-400">Status</TableHead>
                <TableHead className="text-slate-400"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {keywords.length === 0 && (
                <TableRow className="border-[#232d35]"><TableCell colSpan={6} className="text-slate-500 text-sm py-6 text-center">No keywords yet — run a research above.</TableCell></TableRow>
              )}
              {keywords.map(k => (
                <TableRow key={k.id} className="border-[#232d35]">
                  <TableCell className="text-slate-200 text-xs">{k.term}</TableCell>
                  <TableCell className="text-amber-300 text-xs">{k.estVolume?.toLocaleString() || '—'}</TableCell>
                  <TableCell className="text-xs">
                    <span className={((k.difficulty || 0) > 66 ? 'text-red-400' : (k.difficulty || 0) > 40 ? 'text-amber-400' : 'text-emerald-400')}>
                      {k.difficulty ?? '—'}
                    </span>
                  </TableCell>
                  <TableCell className="text-slate-400 text-xs">{k.intent}</TableCell>
                  <TableCell><StatusBadge status={k.status} /></TableCell>
                  <TableCell>
                    {k.status !== 'targeting' && (
                      <Button size="sm" variant="outline" className="h-7 border-[#2a353d] text-slate-300" onClick={() => setStatus(k.id, 'targeting')}>
                        <Target className="h-3 w-3 mr-1" /> Target
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
