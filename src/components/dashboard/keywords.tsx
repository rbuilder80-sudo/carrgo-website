'use client';

import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { api, SectionHeader, StatusBadge, fmtTime } from './shared';
import { Loader2, Search, Target, Radar, Star, ChevronDown, ChevronUp, TrendingUp, TrendingDown, Minus } from 'lucide-react';

type Keyword = { id: string; term: string; source: string; priority: boolean; estVolume: number | null; difficulty: number | null; intent: string | null; status: string };
type RankCheck = { id: string; term: string; position: number | null; found: boolean; url: string | null; checkedAt: string };
type CheckResult = { term: string; position: number | null; found: boolean; url?: string; error?: string };

export function KeywordScout() {
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [ranks, setRanks] = useState<Record<string, { position: number | null; checkedAt: string; prev: number | null; history: RankCheck[] }>>({});
  const [seed, setSeed] = useState('freight forwarding uk');
  const [busy, setBusy] = useState('');
  const [msg, setMsg] = useState('');
  const [priorityText, setPriorityText] = useState('');
  const [showPriority, setShowPriority] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  const load = useCallback(async () => {
    const [kws, checks] = await Promise.all([
      api<{ ok: boolean; keywords: Keyword[] }>('/api/keywords'),
      api<{ ok: boolean; checks: RankCheck[] }>('/api/keywords/ranks'),
    ]);
    if (kws.ok) setKeywords(kws.keywords);

    if (checks.ok) {
      const byTerm: Record<string, RankCheck[]> = {};
      for (const c of checks.checks) {
        byTerm[c.term] = byTerm[c.term] || [];
        byTerm[c.term].push(c);
      }
      const map: Record<string, { position: number | null; checkedAt: string; prev: number | null; history: RankCheck[] }> = {};
      for (const [term, list] of Object.entries(byTerm)) {
        // list is desc by checkedAt
        map[term] = {
          position: list[0].position,
          checkedAt: list[0].checkedAt,
          prev: list[1]?.position ?? null,
          history: list.slice(0, 6),
        };
      }
      setRanks(map);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const research = async () => {
    if (!seed.trim()) return;
    setBusy('research'); setMsg('');
    try {
      const res = await api<{ ok: boolean; count: number; error?: string }>('/api/keywords', { method: 'POST', body: JSON.stringify({ seed }) });
      setMsg(res.ok ? `Scraped ${res.count} live Google suggestions for "${seed}"` : (res.error || 'Research failed'));
      load();
    } finally { setBusy(''); }
  };

  const setStatus = async (id: string, status: string) => {
    await api('/api/keywords', { method: 'PATCH', body: JSON.stringify({ id, status }) });
    load();
  };

  const importPriority = async () => {
    if (!priorityText.trim()) return;
    setBusy('priority'); setMsg('');
    try {
      const res = await api<{ ok: boolean; created: number; marked: number; priorityTotal: number; error?: string }>('/api/keywords/priority', { method: 'POST', body: JSON.stringify({ terms: priorityText }) });
      if (res.ok) {
        setMsg(`Priority keywords saved: ${res.created} new, ${res.marked} updated — ${res.priorityTotal} now tracked for rank #1.`);
        setPriorityText('');
        setShowPriority(false);
      } else setMsg(res.error || 'Import failed');
      load();
    } finally { setBusy(''); }
  };

  const checkBatch = async () => {
    setBusy('batch'); setMsg('Running live Google rank checks…');
    try {
      const res = await api<{ ok: boolean; checked: number; results: CheckResult[] }>('/api/keywords/rank-check', { method: 'POST', body: JSON.stringify({ limit: 4 }) });
      if (res.ok) {
        const found = res.results.filter(r => r.found).length;
        setMsg(`${res.checked} live rank checks complete — ${found} ranking, ${res.checked - found} not in top 20. Autopilot keeps sweeping the rest.`);
      }
      load();
    } finally { setBusy(''); }
  };

  const checkOne = async (term: string) => {
    setBusy('one:' + term);
    try {
      await api('/api/keywords/rank-check', { method: 'POST', body: JSON.stringify({ term }) });
      load();
    } finally { setBusy(''); }
  };

  const priorityCount = keywords.filter(k => k.priority).length;
  const sorted = [...keywords].sort((a, b) => {
    if (a.priority !== b.priority) return a.priority ? -1 : 1;
    const pa = ranks[a.term]?.position ?? 999;
    const pb = ranks[b.term]?.position ?? 999;
    return pa - pb;
  });

  const posBadge = (pos: number | null | undefined) => {
    if (pos === null || pos === undefined) return <span className="text-red-400 font-semibold">&gt;20</span>;
    const c = pos <= 3 ? 'text-emerald-400' : pos <= 10 ? 'text-emerald-300' : pos <= 20 ? 'text-amber-300' : 'text-slate-300';
    return <span className={`${c} font-bold`}>#{pos}</span>;
  };

  const trend = (term: string) => {
    const r = ranks[term];
    if (!r || r.prev === null || r.position === null) return <Minus className="h-3 w-3 text-slate-600" />;
    if (r.position < r.prev) return <span className="flex items-center gap-0.5 text-emerald-400"><TrendingUp className="h-3 w-3" />+{r.prev - r.position}</span>;
    if (r.position > r.prev) return <span className="flex items-center gap-0.5 text-red-400"><TrendingDown className="h-3 w-3" />-{r.position - r.prev}</span>;
    return <Minus className="h-3 w-3 text-slate-600" />;
  };

  return (
    <div>
      <SectionHeader
        title="Keyword Scout — 39 Priority Keywords"
        desc="Your priority terms are tracked for rank #1 with live Google position checks (real search results, no fake numbers). Autopilot sweeps stale keywords every cycle and writes content for striking-distance terms."
        right={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="border-[#2a353d] text-slate-300" onClick={() => setShowPriority(!showPriority)}><Star className="h-3.5 w-3.5 mr-1 text-amber-400" /> Import priorities</Button>
            <Button size="sm" className="bg-amber-500 hover:bg-amber-400 text-black font-semibold" onClick={checkBatch} disabled={busy === 'batch'}>
              {busy === 'batch' ? <Loader2 className="h-3.5 w-3.5 animate-spin mr-1" /> : <Radar className="h-3.5 w-3.5 mr-1" />} Check stale ranks
            </Button>
          </div>
        }
      />

      {showPriority && (
        <Card className="bg-[#12181d] border-[#232d35] mb-4">
          <CardContent className="p-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Paste your priority keywords (one per line or comma separated) — {priorityCount} currently marked</div>
            <textarea
              value={priorityText}
              onChange={e => setPriorityText(e.target.value)}
              rows={6}
              placeholder={'freight forwarding uk\ncustoms clearance uk\nsea freight from china to uk\n…'}
              className="w-full bg-[#0f1417] border border-[#2a353d] rounded-md p-2.5 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
            />
            <div className="flex items-center gap-2 mt-2">
              <Button onClick={importPriority} disabled={busy === 'priority' || !priorityText.trim()} className="bg-amber-500 hover:bg-amber-400 text-black font-semibold" size="sm">
                {busy === 'priority' ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Save as priority'}
              </Button>
              <span className="text-[11px] text-slate-500">Existing keywords are merged — nothing is lost.</span>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="bg-[#12181d] border-[#232d35] mb-4">
        <CardContent className="p-4 flex flex-wrap gap-3 items-end">
          <div className="flex-1 min-w-[240px]">
            <label className="text-xs uppercase tracking-wider text-slate-400">Discover more keywords (live Google autocomplete)</label>
            <Input value={seed} onChange={e => setSeed(e.target.value)} onKeyDown={e => e.key === 'Enter' && research()} className="mt-1 bg-[#0f1417] border-[#2a353d] text-slate-100" />
          </div>
          <Button onClick={research} disabled={busy === 'research'} className="bg-amber-500 hover:bg-amber-400 text-black font-semibold">
            {busy === 'research' ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Scraping Google…</> : <><Search className="h-4 w-4 mr-2" /> Find keywords</>}
          </Button>
        </CardContent>
      </Card>
      {msg && <div className="text-xs text-amber-300 mb-3">{msg}</div>}

      <Card className="bg-[#12181d] border-[#232d35]">
        <CardContent className="p-0">
          <div className="max-h-[560px] overflow-y-auto custom-scrollbar">
            <Table>
              <TableHeader className="sticky top-0 bg-[#12181d] z-10">
                <TableRow className="border-[#232d35]">
                  <TableHead className="text-slate-400">Keyword</TableHead>
                  <TableHead className="text-slate-400">Google rank</TableHead>
                  <TableHead className="text-slate-400">Trend</TableHead>
                  <TableHead className="text-slate-400">Vol/Diff</TableHead>
                  <TableHead className="text-slate-400">Last checked</TableHead>
                  <TableHead className="text-slate-400"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sorted.length === 0 && (
                  <TableRow className="border-[#232d35]"><TableCell colSpan={6} className="text-slate-500 text-sm py-6 text-center">No keywords yet.</TableCell></TableRow>
                )}
                {sorted.map(k => {
                  const r = ranks[k.term];
                  return (
                    <TableRow key={k.id} className="border-[#232d35]">
                      <TableCell className="text-xs">
                        <button className="flex items-center gap-1.5 text-left group" onClick={() => setExpanded(expanded === k.term ? null : k.term)}>
                          {k.priority && <Star className="h-3 w-3 text-amber-400 fill-amber-400 shrink-0" />}
                          <span className={`${k.priority ? 'text-slate-100 font-medium' : 'text-slate-300'} group-hover:text-amber-300`}>{k.term}</span>
                          {r?.history.length ? expanded === k.term ? <ChevronUp className="h-3 w-3 text-slate-500" /> : <ChevronDown className="h-3 w-3 text-slate-600" /> : null}
                        </button>
                        {expanded === k.term && r?.history.length ? (
                          <div className="mt-1.5 ml-4 space-y-0.5">
                            {r.history.map(h => (
                              <div key={h.id} className="text-[10px] text-slate-500">
                                {fmtTime(h.checkedAt)} — {h.position === null ? <span className="text-red-400">not in top 20</span> : <span className="text-emerald-400">#{h.position}</span>}
                              </div>
                            ))}
                          </div>
                        ) : null}
                      </TableCell>
                      <TableCell className="text-xs">{r ? posBadge(r.position) : <span className="text-slate-600">not checked</span>}</TableCell>
                      <TableCell className="text-xs">{trend(k.term)}</TableCell>
                      <TableCell className="text-xs text-slate-400">{k.estVolume?.toLocaleString() || '—'} / {k.difficulty ?? '—'}</TableCell>
                      <TableCell className="text-[11px] text-slate-500">{r ? fmtTime(r.checkedAt) : '—'}</TableCell>
                      <TableCell>
                        <div className="flex gap-1.5">
                          <Button size="sm" variant="outline" className="h-7 border-[#2a353d] text-slate-300" onClick={() => checkOne(k.term)} disabled={busy !== ''}>
                            {busy === 'one:' + k.term ? <Loader2 className="h-3 w-3 animate-spin" /> : <Radar className="h-3 w-3" />}
                          </Button>
                          {k.status !== 'targeting' && (
                            <Button size="sm" variant="outline" className="h-7 border-[#2a353d] text-slate-300" onClick={() => setStatus(k.id, 'targeting')}>
                              <Target className="h-3 w-3 mr-1" /> Target
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
