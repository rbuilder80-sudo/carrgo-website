'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export const ACCENT = '#fbbf24';

export function StatCard({ label, value, sub, tone }: { label: string; value: string | number; sub?: string; tone?: 'good' | 'warn' | 'bad' | 'neutral' }) {
  const color = tone === 'good' ? 'text-emerald-400' : tone === 'warn' ? 'text-amber-400' : tone === 'bad' ? 'text-red-400' : 'text-amber-300';
  return (
    <Card className="bg-[#12181d] border-[#232d35]">
      <CardContent className="p-4">
        <div className="text-[11px] uppercase tracking-wider text-slate-400">{label}</div>
        <div className={`text-2xl font-bold mt-1 ${color}`}>{value}</div>
        {sub ? <div className="text-[11px] text-slate-500 mt-1">{sub}</div> : null}
      </CardContent>
    </Card>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    verified: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    published: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/25',
    ok: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    live: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    pass: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    queued: 'bg-amber-500/10 text-amber-300 border-amber-500/25',
    claimed: 'bg-sky-500/10 text-sky-300 border-sky-500/25',
    running: 'bg-sky-500/10 text-sky-300 border-sky-500/25',
    pending: 'bg-amber-500/10 text-amber-300 border-amber-500/25',
    warn: 'bg-amber-500/10 text-amber-300 border-amber-500/25',
    new: 'bg-slate-500/10 text-slate-300 border-slate-500/25',
    unverified: 'bg-slate-500/10 text-slate-300 border-slate-500/25',
    online: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    offline: 'bg-slate-500/10 text-slate-400 border-slate-500/25',
    awaiting_auth: 'bg-orange-500/10 text-orange-300 border-orange-500/25',
    awaiting_approval: 'bg-orange-500/10 text-orange-300 border-orange-500/25',
    deferred: 'bg-slate-500/10 text-slate-300 border-slate-500/25',
    rejected: 'bg-red-500/10 text-red-300 border-red-500/25',
    failed: 'bg-red-500/10 text-red-300 border-red-500/25',
    fail: 'bg-red-500/10 text-red-300 border-red-500/25',
    invalid: 'bg-red-500/10 text-red-300 border-red-500/25',
    dead: 'bg-red-500/10 text-red-300 border-red-500/25',
  };
  return <Badge variant="outline" className={`text-[10px] uppercase tracking-wide ${map[status] || 'bg-slate-500/10 text-slate-300 border-slate-500/25'}`}>{status.replace(/_/g, ' ')}</Badge>;
}

export async function api<T = unknown>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
  });
  const json = await res.json().catch(() => ({ ok: false, error: 'Invalid server response' }));
  return json as T;
}

export function fmtTime(iso: string | Date | null | undefined): string {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
}

export function SectionHeader({ title, desc, right }: { title: string; desc: string; right?: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
      <div>
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <p className="text-sm text-slate-400 mt-1 max-w-2xl">{desc}</p>
      </div>
      {right}
    </div>
  );
}
