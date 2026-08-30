'use client';

import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { api, SectionHeader, StatCard, fmtTime } from './shared';
import { Loader2, Brain, RefreshCw, Check, X } from 'lucide-react';

type Suggestion = { id: string; category: string; title: string; detail: string; priority: string; status: string; createdAt: string };
type Intel = {
  ok: boolean;
  suggestions: Suggestion[];
  gsc: { topQueries: Array<{ id: string; query: string; clicks: number; impressions: number; ctr: number; position: number }>; totalClicks: number; totalImpressions: number; rows: number };
  ga4: { summary: { sessions: number; users: number; pageviews: number; engagementRate: number } | null; topPages: Array<{ id: string; path: string; sessions: number; users: number }>; totalSessions: number; totalUsers: number };
};

export function Intel({ dataVersion, onDataChange }: { dataVersion?: number; onDataChange?: () => void }) {
  const [intel, setIntel] = useState<Intel | null>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');

  const load = useCallback(async () => {
    const data = await api<Intel>('/api/intelligence');
    if (data.ok) setIntel(data);
  }, []);

  useEffect(() => { load(); }, [load, dataVersion]);

  const generate = async () => {
    setBusy(true); setMsg('');
    try {
      const res = await api<{ ok: boolean; count?: number; summary?: string; error?: string }>('/api/intelligence', { method: 'POST' });
      if (res.ok) {
        setMsg(`AI Brain generated ${res.count} suggestions from your real GSC/GA4/audit data`);
        load();
        onDataChange?.();
      } else setMsg(res.error || 'Failed');
    } finally { setBusy(false); }
  };

  const setStatus = async (id: string, status: string) => {
    await api('/api/suggestion-item/' + id, { method: 'PATCH', body: JSON.stringify({ status }) });
    load();
    onDataChange?.();
  };

  const ctrColor = (ctr: number) => (ctr > 0.05 ? 'text-emerald-400' : ctr > 0.015 ? 'text-amber-400' : 'text-red-400');
  const posColor = (p: number) => (p <= 5 ? 'text-emerald-400' : p <= 15 ? 'text-amber-400' : 'text-red-400');

  return (
    <div>
      <SectionHeader
        title="GSC + GA4 Intelligence — AI SEO Brain"
        desc="Import real Search Console and GA4 data through the Chrome bridge (popup buttons) while logged into Google. The AI Brain then turns that data into specific, data-cited actions — approving one creates a real task."
        right={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="border-[#2a353d] text-slate-300" onClick={load}><RefreshCw className="h-3.5 w-3.5 mr-1" /> Refresh</Button>
            <Button size="sm" onClick={generate} disabled={busy} className="bg-amber-500 hover:bg-amber-400 text-black font-semibold">
              {busy ? <><Loader2 className="h-3.5 w-3.5 mr-1 animate-spin" /> Thinking…</> : <><Brain className="h-3.5 w-3.5 mr-1" /> Generate intelligence</>}
            </Button>
          </div>
        }
      />
      {msg && <div className="text-xs text-amber-300 mb-3">{msg}</div>}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        <StatCard label="GSC clicks" value={(intel?.gsc.totalClicks || 0).toLocaleString()} sub={`${intel?.gsc.rows || 0} queries stored`} tone="neutral" />
        <StatCard label="GSC impressions" value={(intel?.gsc.totalImpressions || 0).toLocaleString()} tone="neutral" />
        <StatCard label="GA4 sessions" value={(intel?.ga4.totalSessions || 0).toLocaleString()} sub={`${intel?.ga4.totalUsers || 0} users`} tone="neutral" />
        <StatCard label="Open suggestions" value={intel?.suggestions.filter(s => s.status === 'open').length ?? '…'} tone="warn" />
      </div>

      <div className="grid lg:grid-cols-2 gap-4 mb-5">
        <Card className="bg-[#12181d] border-[#232d35]">
          <CardContent className="p-0">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 p-4 pb-2">Top Search Console queries</div>
            <Table>
              <TableHeader>
                <TableRow className="border-[#232d35]">
                  <TableHead className="text-slate-400">Query</TableHead>
                  <TableHead className="text-slate-400">Clicks</TableHead>
                  <TableHead className="text-slate-400">Impr.</TableHead>
                  <TableHead className="text-slate-400">CTR</TableHead>
                  <TableHead className="text-slate-400">Pos</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(intel?.gsc.topQueries || []).length === 0 && (
                  <TableRow className="border-[#232d35]"><TableCell colSpan={5} className="text-slate-500 text-xs py-5 text-center">No GSC data yet — use the extension popup "Pull GSC data" while logged into Google.</TableCell></TableRow>
                )}
                {(intel?.gsc.topQueries || []).map(q => (
                  <TableRow key={q.id} className="border-[#232d35]">
                    <TableCell className="text-slate-200 text-xs">{q.query}</TableCell>
                    <TableCell className="text-xs text-slate-300">{q.clicks}</TableCell>
                    <TableCell className="text-xs text-slate-300">{q.impressions}</TableCell>
                    <TableCell className={`text-xs ${ctrColor(q.ctr)}`}>{(q.ctr * 100).toFixed(2)}%</TableCell>
                    <TableCell className={`text-xs ${posColor(q.position)}`}>{q.position.toFixed(1)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="bg-[#12181d] border-[#232d35]">
          <CardContent className="p-0">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 p-4 pb-2">Top GA4 pages</div>
            <Table>
              <TableHeader>
                <TableRow className="border-[#232d35]">
                  <TableHead className="text-slate-400">Page</TableHead>
                  <TableHead className="text-slate-400">Sessions</TableHead>
                  <TableHead className="text-slate-400">Users</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(intel?.ga4.topPages || []).length === 0 && (
                  <TableRow className="border-[#232d35]"><TableCell colSpan={3} className="text-slate-500 text-xs py-5 text-center">No GA4 data yet — use the extension popup "Pull GA4 data" while logged into Google Analytics.</TableCell></TableRow>
                )}
                {(intel?.ga4.topPages || []).map(p => (
                  <TableRow key={p.id} className="border-[#232d35]">
                    <TableCell className="text-slate-200 text-xs">{p.path}</TableCell>
                    <TableCell className="text-xs text-slate-300">{p.sessions}</TableCell>
                    <TableCell className="text-xs text-slate-300">{p.users}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-2.5">
        {intel?.suggestions?.length === 0 && <div className="text-sm text-slate-500">No suggestions yet — import GSC/GA4 data, then press "Generate intelligence".</div>}
        {intel?.suggestions.map(s => (
          <Card key={s.id} className="bg-[#12181d] border-[#232d35]">
            <CardContent className="p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex-1 min-w-[240px]">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-[#0f1417] text-amber-300 border border-[#2a353d]">{s.category}</span>
                    <span className={`text-[10px] uppercase px-1.5 py-0.5 rounded ${s.priority === 'high' ? 'bg-red-500/10 text-red-300' : s.priority === 'medium' ? 'bg-amber-500/10 text-amber-300' : 'bg-slate-500/10 text-slate-300'}`}>{s.priority}</span>
                    {s.status !== 'open' && <span className="text-[10px] uppercase text-slate-500">{s.status}</span>}
                  </div>
                  <div className="text-sm font-semibold text-slate-100 mt-1.5">{s.title}</div>
                  <div className="text-xs text-slate-400 mt-1 leading-relaxed">{s.detail}</div>
                  <div className="text-[10px] text-slate-600 mt-1.5">{fmtTime(s.createdAt)}</div>
                </div>
                {s.status === 'open' && (
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-500 text-white" onClick={() => setStatus(s.id, 'approved')}><Check className="h-3.5 w-3.5 mr-1" /> Approve → task</Button>
                    <Button size="sm" variant="outline" className="border-red-500/30 text-red-400" onClick={() => setStatus(s.id, 'rejected')}><X className="h-3.5 w-3.5 mr-1" /> Dismiss</Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
