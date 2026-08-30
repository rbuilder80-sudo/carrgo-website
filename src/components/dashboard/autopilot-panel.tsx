'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { api, fmtTime } from './shared';
import { Loader2, Power, Play, Brain, CircleStop } from 'lucide-react';

type Log = { id: string; step: string; message: string; detail: string; ok: boolean; createdAt: string };
type Status = { ok: boolean; enabled: boolean; mode: string; intervalMin: number; lastRun: string | null; cycles: number; running: boolean; logs: Log[] };

const STEP_STYLE: Record<string, string> = {
  think: 'border-sky-500/30 bg-sky-500/5 text-sky-300',
  act: 'border-amber-500/30 bg-amber-500/5 text-amber-300',
  result: 'border-emerald-500/30 bg-emerald-500/5 text-emerald-300',
};

export function AutopilotPanel() {
  const [st, setSt] = useState<Status | null>(null);
  const [busy, setBusy] = useState('');
  const feedRef = useRef<HTMLDivElement>(null);

  const load = useCallback(async () => {
    const s = await api<Status>('/api/autopilot');
    if (s.ok) setSt(s);
  }, []);

  useEffect(() => {
    load();
    const t = setInterval(load, 8000);
    return () => clearInterval(t);
  }, [load]);

  useEffect(() => {
    if (feedRef.current) feedRef.current.scrollTop = 0;
  }, [st?.logs.length]);

  const act = async (body: Record<string, unknown>, label: string) => {
    setBusy(label);
    try {
      await api('/api/autopilot', { method: 'POST', body: JSON.stringify(body) });
      await load();
    } finally {
      setBusy('');
    }
  };

  return (
    <Card className="bg-[#12181d] border-[#232d35]">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-1">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Brain className="h-3.5 w-3.5 text-amber-400" /> Autopilot — the agent on its own
          </div>
          <div className="flex items-center gap-1.5">
            {st?.running ? (
              <span className="text-[10px] text-sky-300 flex items-center gap-1"><Loader2 className="h-3 w-3 animate-spin" /> cycle running…</span>
            ) : (
              <span className={`text-[10px] flex items-center gap-1 ${st?.enabled ? 'text-emerald-400' : 'text-slate-500'}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${st?.enabled ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
                {st?.enabled ? 'armed' : 'off'}
              </span>
            )}
          </div>
        </div>
        <p className="text-[11px] text-slate-500 mb-3">
          Every {st?.intervalMin || 20} min: live rank checks on priority keywords → picks striking-distance terms → writes a full SEO article → publishes to any destination with granted permission. Decisions logged below.
        </p>

        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Button
            size="sm" variant="outline"
            className={`h-8 ${st?.enabled ? 'border-red-500/40 text-red-300' : 'border-emerald-500/40 text-emerald-300'}`}
            onClick={() => act({ action: st?.enabled ? 'disable' : 'enable' }, 'toggle')}
            disabled={busy !== ''}
          >
            {busy === 'toggle' ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : st?.enabled ? <><CircleStop className="h-3.5 w-3.5 mr-1" /> Disarm</> : <><Power className="h-3.5 w-3.5 mr-1" /> Arm</>}
          </Button>
          <Button size="sm" className="h-8 bg-amber-500 hover:bg-amber-400 text-black font-semibold" onClick={() => act({ action: 'run' }, 'run')} disabled={busy !== '' || Boolean(st?.running)}>
            {busy === 'run' || st?.running ? <Loader2 className="h-3.5 w-3.5 animate-spin mr-1" /> : <Play className="h-3.5 w-3.5 mr-1" />} Run cycle now
          </Button>
          <Select value={st?.mode || 'aggressive'} onValueChange={v => act({ action: 'mode', mode: v }, 'mode')}>
            <SelectTrigger className="h-8 w-[130px] text-xs bg-[#0f1417] border-[#2a353d] text-slate-200"><SelectValue /></SelectTrigger>
            <SelectContent className="bg-[#171e24] border-[#2a353d] text-slate-100">
              <SelectItem value="aggressive">Aggressive</SelectItem>
              <SelectItem value="safe">Safe</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-[10px] text-slate-500 ml-auto">{st?.cycles || 0} cycles · last {fmtTime(st?.lastRun)}</span>
        </div>

        <div ref={feedRef} className="max-h-64 overflow-y-auto space-y-1.5 custom-scrollbar">
          {!st?.logs.length && <div className="text-[11px] text-slate-600 py-4 text-center">No cycles yet — press “Run cycle now” or arm autopilot.</div>}
          {st?.logs.map(l => (
            <div key={l.id} className={`border rounded-md p-2 text-[11px] leading-relaxed ${STEP_STYLE[l.step] || 'border-[#232d35] bg-[#0f1417] text-slate-300'}`}>
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[9px] uppercase tracking-wider opacity-80">{l.step}{l.ok === false ? ' · FAILED' : ''}</span>
                <span className="text-slate-600 text-[9px]">{fmtTime(l.createdAt)}</span>
              </div>
              <div className="text-slate-200 mt-0.5">{l.message}</div>
              {l.detail && <div className="text-slate-500 mt-0.5 whitespace-pre-wrap line-clamp-3">{l.detail}</div>}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
