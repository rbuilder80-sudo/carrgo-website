'use client';

import { useCallback, useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { api, SectionHeader, StatCard, StatusBadge, fmtTime } from './shared';
import { RefreshCw, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Analytics = {
  ok: boolean;
  health: { latestAudit: { score: number; grade: string; url: string; createdAt: string } | null; auditHistory: Array<{ score: number; grade: string; createdAt: string }> };
  publishing: { totalJobs: number; livePublications: number; liveRate: number; recentLive: Array<{ platform: string; publishedUrl: string | null; title: string; finishedAt: string | null; status: string }> };
  content: { totalWords: number; estValueUsd: number; draftCount: number };
  keywords: { count: number };
  gsc: { clicks: number; impressions: number };
  ga4: { sessions: number; users: number };
  authority: { backlinks: number; backlinkLive: number; competitors: number };
  activity: Array<{ id: string; type: string; message: string; createdAt: string }>;
};

export function AnalyticsRoi() {
  const [data, setData] = useState<Analytics | null>(null);

  const load = useCallback(async () => {
    const res = await api<Analytics>('/api/analytics');
    if (res.ok) setData(res);
  }, []);

  useEffect(() => {
    load();
    const t = setInterval(load, 30000);
    return () => clearInterval(t);
  }, [load]);

  return (
    <div>
      <SectionHeader
        title="Analytics & ROI"
        desc="Every figure here is computed from real stored data: audit scores from live HTTP runs, publications verified by fetching their URLs, content volume from actual drafts, GSC/GA4 totals from imported performance data."
        right={<Button variant="outline" size="sm" className="border-[#2a353d] text-slate-300" onClick={load}><RefreshCw className="h-3.5 w-3.5 mr-1" /> Refresh</Button>}
      />

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 mb-6">
        <StatCard label="Site health" value={data?.health.latestAudit ? `${data.health.latestAudit.score}` : '—'} sub={data?.health.latestAudit ? `grade ${data.health.latestAudit.grade}` : 'no audit yet'} tone={data?.health.latestAudit && data.health.latestAudit.score >= 75 ? 'good' : 'warn'} />
        <StatCard label="Live publications" value={data?.publishing.livePublications ?? '…'} sub={`${data?.publishing.totalJobs ?? 0} jobs · ${data?.publishing.liveRate ?? 0}% live rate`} tone="good" />
        <StatCard label="Content produced" value={(data?.content.totalWords || 0).toLocaleString()} sub={`${data?.content.draftCount ?? 0} drafts`} />
        <StatCard label="Content value" value={`$${(data?.content.estValueUsd || 0).toLocaleString()}`} sub="@ $0.12/word market rate" tone="good" />
        <StatCard label="GSC clicks" value={(data?.gsc.clicks || 0).toLocaleString()} sub={`${(data?.gsc.impressions || 0).toLocaleString()} impressions`} />
        <StatCard label="Live backlinks" value={`${data?.authority.backlinkLive ?? 0}/${data?.authority.backlinks ?? 0}`} sub={`${data?.authority.competitors ?? 0} competitors tracked`} />
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card className="bg-[#12181d] border-[#232d35]">
          <CardContent className="p-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Recently published (verified URLs)</div>
            {(data?.publishing.recentLive || []).length === 0 && <div className="text-xs text-slate-500">Nothing published yet. Approve a job and it will appear here once the URL is verified live.</div>}
            <div className="space-y-2">
              {(data?.publishing.recentLive || []).map((p, i) => (
                <div key={i} className="text-xs flex items-center gap-2">
                  <StatusBadge status={p.status} />
                  <span className="text-slate-400 shrink-0">{p.platform}</span>
                  {p.publishedUrl ? (
                    <a href={p.publishedUrl} target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline truncate">{p.title}</a>
                  ) : (
                    <span className="text-slate-300 truncate">{p.title}</span>
                  )}
                  <span className="text-slate-600 ml-auto shrink-0">{fmtTime(p.finishedAt)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#12181d] border-[#232d35]">
          <CardContent className="p-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5"><Activity className="h-3.5 w-3.5" /> Live activity log</div>
            <div className="space-y-1.5 max-h-72 overflow-y-auto">
              {(data?.activity || []).map(a => (
                <div key={a.id} className="text-xs flex gap-2">
                  <span className="text-amber-400/80 font-mono text-[10px] uppercase shrink-0 w-20 pt-0.5">{a.type}</span>
                  <span className="text-slate-300 flex-1">{a.message}</span>
                  <span className="text-slate-600 shrink-0">{fmtTime(a.createdAt)}</span>
                </div>
              ))}
              {(data?.activity || []).length === 0 && <div className="text-xs text-slate-500">No activity yet.</div>}
            </div>
          </CardContent>
        </Card>
      </div>

      {(data?.health.auditHistory || []).length > 0 && (
        <Card className="bg-[#12181d] border-[#232d35] mt-4">
          <CardContent className="p-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Audit score trend</div>
            <div className="flex items-end gap-1.5 h-24">
              {data!.health.auditHistory.slice().reverse().map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full rounded-t bg-gradient-to-t from-amber-600/40 to-amber-400" style={{ height: `${Math.max(6, h.score)}%` }} title={`${h.score}/100`} />
                  <span className="text-[9px] text-slate-500">{h.score}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
