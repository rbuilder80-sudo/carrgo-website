'use client';

import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { api, SectionHeader, StatusBadge, fmtTime } from './shared';
import { Check, X, Clock, RefreshCw, Loader2 } from 'lucide-react';

type Item = {
  id: string; kind: 'job' | 'task'; title: string;
  platform?: string; channel?: string; type?: string;
  approval?: string; status: string; queuedAt?: string; createdAt?: string;
  autoExecuted?: boolean; result?: string | null; error?: string | null;
};

export function ApprovalQueue({ onChanged }: { onChanged?: () => void }) {
  const [items, setItems] = useState<{ jobs: Item[]; tasks: Item[] }>({ jobs: [], tasks: [] });
  const [busyId, setBusyId] = useState('');
  const [msg, setMsg] = useState('');

  const load = useCallback(async () => {
    const data = await api<{ ok: boolean; jobs: Item[]; tasks: Item[] }>('/api/approvals');
    if (data.ok) setItems({ jobs: data.jobs, tasks: data.tasks });
  }, []);

  useEffect(() => {
    load();
    const t = setInterval(load, 15000);
    return () => clearInterval(t);
  }, [load]);

  const act = async (kind: string, id: string, action: string) => {
    setBusyId(id); setMsg('');
    try {
      const res = await api<{ ok: boolean; detail?: string; error?: string }>('/api/approvals', {
        method: 'POST',
        body: JSON.stringify({ id, kind, action }),
      });
      setMsg(res.ok ? (res.detail || `${action} ✓`) : (res.error || 'Action failed'));
      await load();
      onChanged?.();
    } finally {
      setBusyId('');
    }
  };

  const Row = ({ item }: { item: Item }) => (
    <Card className="bg-[#12181d] border-[#232d35]">
      <CardContent className="p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex-1 min-w-[220px]">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-[#0f1417] text-amber-300 border border-[#2a353d]">
                {item.kind === 'job' ? `publish → ${item.platform} (${item.channel})` : (item.type || 'task')}
              </span>
              <StatusBadge status={item.status} />
              {item.autoExecuted && <span className="text-[10px] text-slate-500">auto</span>}
            </div>
            <div className="text-sm text-slate-200 mt-1.5">{item.title}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              {fmtTime(item.queuedAt || item.createdAt)}
              {item.result ? ` · result: ${item.result.slice(0, 120)}` : ''}
              {item.error ? ` · ${item.error}` : ''}
            </div>
          </div>
          {['queued', 'pending', 'deferred'].includes(item.status) ? (
            <div className="flex gap-2">
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold" disabled={busyId === item.id} onClick={() => act(item.kind, item.id, 'approve')}>
                {busyId === item.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5 mr-1" />} Approve{item.kind === 'job' ? ' & deploy' : ' & run'}
              </Button>
              <Button size="sm" variant="outline" className="border-[#2a353d] text-slate-300" onClick={() => act(item.kind, item.id, 'defer')}><Clock className="h-3.5 w-3.5 mr-1" /> Defer</Button>
              <Button size="sm" variant="outline" className="border-red-500/30 text-red-400 hover:bg-red-500/10" onClick={() => act(item.kind, item.id, 'reject')}><X className="h-3.5 w-3.5 mr-1" /> Reject</Button>
            </div>
          ) : (
            <span className="text-[11px] text-slate-500">No action needed</span>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div>
      <SectionHeader
        title="Approval Queue"
        desc="Nothing goes live without your sign-off. Approving a publishing job sends it to the paired Chrome extension or the platform API; approving a task makes the agent execute it immediately."
        right={<Button variant="outline" size="sm" className="border-[#2a353d] text-slate-300" onClick={load}><RefreshCw className="h-3.5 w-3.5 mr-1" /> Refresh</Button>}
      />
      {msg && <div className="text-xs text-amber-300 mb-3">{msg}</div>}

      <div className="space-y-2.5">
        <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Publishing jobs awaiting sign-off ({items.jobs.length})</div>
        {items.jobs.length === 0 && <div className="text-sm text-slate-500">Queue is clear.</div>}
        {items.jobs.map(j => <Row key={j.id} item={j} />)}
      </div>

      <div className="space-y-2.5 mt-6">
        <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Agent tasks ({items.tasks.length})</div>
        {items.tasks.length === 0 && <div className="text-sm text-slate-500">No tasks yet.</div>}
        {items.tasks.map(t => <Row key={t.id} item={t} />)}
      </div>
    </div>
  );
}
