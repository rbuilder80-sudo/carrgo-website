'use client';

import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { api, SectionHeader, StatusBadge, fmtTime } from './shared';
import { Loader2, ExternalLink, RefreshCw } from 'lucide-react';

type Job = {
  id: string; platform: string; channel: string; status: string; approval: string;
  title: string; tags?: string; publishedUrl?: string | null; evidence?: string | null;
  error?: string | null; attempts?: number; deviceName?: string | null; queuedAt: string; verifiedAt?: string | null;
};

const PLATFORM_LIST = [
  { key: 'medium', name: 'Medium (extension)' },
  { key: 'linkedin', name: 'LinkedIn (extension)' },
  { key: 'x', name: 'X / Twitter (extension)' },
  { key: 'facebook', name: 'Facebook (extension)' },
  { key: 'instagram', name: 'Instagram (extension)' },
  { key: 'pinterest', name: 'Pinterest (extension)' },
  { key: 'quora', name: 'Quora (extension)' },
  { key: 'reddit', name: 'Reddit (extension)' },
  { key: 'blogger', name: 'Blogger (extension)' },
  { key: 'medium_api', name: 'Medium (API token)' },
  { key: 'devto', name: 'DEV.to (API key)' },
  { key: 'wordpress', name: 'WordPress (app password)' },
  { key: 'telegram', name: 'Telegram (bot)' },
  { key: 'webhook', name: 'Webhook (custom)' },
];

export function PublisherHub({ drafts, reloadDrafts }: { drafts: Array<{ id: string; title: string }>; reloadDrafts?: () => void }) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [draftId, setDraftId] = useState('');
  const [platform, setPlatform] = useState('medium');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');

  const load = useCallback(async () => {
    const data = await api<{ ok: boolean; jobs: Job[] }>('/api/publish');
    if (data.ok) setJobs(data.jobs);
  }, []);

  useEffect(() => {
    load();
    const t = setInterval(load, 15000);
    return () => clearInterval(t);
  }, [load]);

  const queue = async () => {
    if (!draftId) { setMsg('Select a draft first'); return; }
    setBusy(true); setMsg('');
    try {
      const res = await api<{ ok: boolean; error?: string }>('/api/publish', {
        method: 'POST',
        body: JSON.stringify({ draftId, platform }),
      });
      if (res.ok) {
        setMsg('Queued — approve it in the Approval Queue to send it live.');
        reloadDrafts?.();
      } else setMsg(res.error || 'Failed to queue');
      load();
    } finally {
      setBusy(false);
    }
  };

  const cancel = async (id: string) => {
    await api('/api/publish-item/' + id, { method: 'DELETE' });
    load();
  };

  return (
    <div>
      <SectionHeader
        title="Publisher Hub"
        desc="Queue drafts to any platform. Extension-channel jobs are executed by your paired Chrome (logged-in as you). API-channel jobs publish directly via connected credentials. Every published URL is verified over HTTP before it counts as live."
        right={<Button variant="outline" size="sm" className="border-[#2a353d] text-slate-300" onClick={load}><RefreshCw className="h-3.5 w-3.5 mr-1" /> Refresh</Button>}
      />

      <Card className="bg-[#12181d] border-[#232d35] mb-5">
        <CardContent className="p-4 flex flex-wrap items-end gap-3">
          <div className="min-w-[260px] flex-1">
            <label className="text-xs uppercase tracking-wider text-slate-400">Draft</label>
            <Select value={draftId} onValueChange={setDraftId}>
              <SelectTrigger className="mt-1 bg-[#0f1417] border-[#2a353d] text-slate-100"><SelectValue placeholder="Choose a content draft…" /></SelectTrigger>
              <SelectContent className="bg-[#171e24] border-[#2a353d] text-slate-100">
                {drafts.map(d => <SelectItem key={d.id} value={d.id}>{d.title.slice(0, 70)}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="min-w-[220px]">
            <label className="text-xs uppercase tracking-wider text-slate-400">Destination</label>
            <Select value={platform} onValueChange={setPlatform}>
              <SelectTrigger className="mt-1 bg-[#0f1417] border-[#2a353d] text-slate-100"><SelectValue /></SelectTrigger>
              <SelectContent className="bg-[#171e24] border-[#2a353d] text-slate-100">
                {PLATFORM_LIST.map(p => <SelectItem key={p.key} value={p.key}>{p.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={queue} disabled={busy} className="bg-amber-500 hover:bg-amber-400 text-black font-semibold">
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Queue publish job'}
          </Button>
        </CardContent>
      </Card>
      {msg && <div className="text-xs text-amber-300 mb-3">{msg}</div>}

      <Card className="bg-[#12181d] border-[#232d35]">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-[#232d35]">
                <TableHead className="text-slate-400">Title</TableHead>
                <TableHead className="text-slate-400">Platform</TableHead>
                <TableHead className="text-slate-400">Channel</TableHead>
                <TableHead className="text-slate-400">Status</TableHead>
                <TableHead className="text-slate-400">Evidence / URL</TableHead>
                <TableHead className="text-slate-400">Queued</TableHead>
                <TableHead className="text-slate-400"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobs.length === 0 && (
                <TableRow className="border-[#232d35]"><TableCell colSpan={7} className="text-slate-500 text-sm py-6 text-center">No publishing jobs yet.</TableCell></TableRow>
              )}
              {jobs.map(j => (
                <TableRow key={j.id} className="border-[#232d35]">
                  <TableCell className="text-slate-200 text-xs max-w-[220px] truncate">{j.title}</TableCell>
                  <TableCell className="text-slate-300 text-xs">{j.platform}</TableCell>
                  <TableCell className="text-slate-400 text-xs">{j.channel}</TableCell>
                  <TableCell><StatusBadge status={j.status} /></TableCell>
                  <TableCell className="text-xs max-w-[240px]">
                    {j.publishedUrl ? (
                      <a href={j.publishedUrl} target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline flex items-center gap-1 truncate">
                        {j.publishedUrl.slice(0, 42)} <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : j.error ? (
                      <span className="text-red-400 line-clamp-2">{j.error}</span>
                    ) : (
                      <span className="text-slate-500">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-slate-500 text-xs">{fmtTime(j.queuedAt)}</TableCell>
                  <TableCell>
                    {!['published', 'verified', 'failed'].includes(j.status) && (
                      <Button size="sm" variant="outline" className="border-red-500/30 text-red-400 h-7" onClick={() => cancel(j.id)}>Cancel</Button>
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
