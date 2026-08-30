'use client';

import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { api, SectionHeader, StatusBadge, fmtTime, StatCard } from './shared';
import { Loader2, Radar, History } from 'lucide-react';

type Check = { id: string; category: string; title: string; status: 'pass' | 'warn' | 'fail'; detail: string };
type Run = { id: string; url: string; score: number; grade: string; createdAt: string; summary?: { checks?: Check[]; stats?: Record<string, unknown> } };

export function SiteAuditor() {
  const [url, setUrl] = useState('https://carrgo.co.uk');
  const [busy, setBusy] = useState(false);
  const [current, setCurrent] = useState<Run | null>(null);
  const [history, setHistory] = useState<Run[]>([]);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    const data = await api<{ ok: boolean; runs: Run[] }>('/api/audit');
    if (data.ok && data.runs.length) {
      setHistory(data.runs);
      if (!current) setCurrent({ ...data.runs[0], summary: data.runs[0].summary });
    }
  }, [current]);

  useEffect(() => { load(); }, []);

  const run = async () => {
    setBusy(true); setError('');
    try {
      const res = await api<{ ok: boolean; score: number; grade: string; checks: Check[]; stats: Record<string, unknown>; runId: string; error?: string }>('/api/audit', {
        method: 'POST',
        body: JSON.stringify({ url }),
      });
      if (res.ok) {
        setCurrent({ id: res.runId, url, score: res.score, grade: res.grade, createdAt: new Date().toISOString(), summary: { checks: res.checks, stats: res.stats } });
        load();
      } else setError(res.error || 'Audit failed');
    } finally {
      setBusy(false);
    }
  };

  const checks = (current?.summary?.checks || []) as Check[];
  const passed = checks.filter(c => c.status === 'pass').length;
  const warned = checks.filter(c => c.status === 'warn').length;
  const failed = checks.filter(c => c.status === 'fail').length;

  return (
    <div>
      <SectionHeader
        title="Site Auditor"
        desc="Real technical SEO audits: every check below is a live HTTP request against the site — robots.txt, sitemap.xml, security headers, TTFB, on-page SEO, canonicalisation, structured data and deep-page crawling."
      />

      <Card className="bg-[#12181d] border-[#232d35] mb-5">
        <CardContent className="p-4 flex flex-wrap gap-3 items-end">
          <div className="flex-1 min-w-[260px]">
            <label className="text-xs uppercase tracking-wider text-slate-400">Target URL</label>
            <Input value={url} onChange={e => setUrl(e.target.value)} className="mt-1 bg-[#0f1417] border-[#2a353d] text-slate-100" />
          </div>
          <Button onClick={run} disabled={busy} className="bg-amber-500 hover:bg-amber-400 text-black font-semibold">
            {busy ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Auditing live…</> : <><Radar className="h-4 w-4 mr-2" /> Run live audit</>}
          </Button>
        </CardContent>
      </Card>
      {error && <div className="text-xs text-red-400 mb-3">{error}</div>}

      {current && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
            <StatCard label="Health score" value={`${current.score}/100`} sub={`grade ${current.grade}`} tone={current.score >= 75 ? 'good' : current.score >= 50 ? 'warn' : 'bad'} />
            <StatCard label="Passed" value={passed} tone="good" />
            <StatCard label="Warnings" value={warned} tone="warn" />
            <StatCard label="Failures" value={failed} tone={failed ? 'bad' : 'good'} />
          </div>

          <Card className="bg-[#12181d] border-[#232d35] mb-5">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-wider text-slate-400">Live score</span>
                <span className="text-xs text-slate-500">{fmtTime(current.createdAt)}</span>
              </div>
              <Progress value={current.score} className="h-2.5" />
            </CardContent>
          </Card>

          <div className="space-y-2">
            {checks.map(c => (
              <Card key={c.id} className="bg-[#12181d] border-[#232d35]">
                <CardContent className="p-3.5 flex items-start gap-3">
                  <StatusBadge status={c.status} />
                  <div className="flex-1">
                    <div className="text-sm text-slate-200 font-medium">{c.title} <span className="text-[10px] uppercase text-slate-500 tracking-wider ml-1">{c.category}</span></div>
                    <div className="text-xs text-slate-400 mt-0.5">{c.detail}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      {history.length > 1 && (
        <div className="mt-6">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5"><History className="h-3.5 w-3.5" /> Audit history</div>
          <div className="flex flex-wrap gap-2">
            {history.map(h => (
              <button key={h.id} onClick={() => setCurrent(h)} className={`text-xs px-3 py-1.5 rounded-lg border ${current?.id === h.id ? 'border-amber-500/50 text-amber-300' : 'border-[#2a353d] text-slate-400 hover:text-slate-200'}`}>
                {h.score}/100 ({h.grade}) · {fmtTime(h.createdAt)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
