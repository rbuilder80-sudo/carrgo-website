'use client';

import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { api, SectionHeader, StatCard, StatusBadge, fmtTime } from './shared';
import { Loader2, Plus, RefreshCw, Trophy, Webhook, Target, Flame } from 'lucide-react';

type Sprint = {
  ok: boolean; start: string; targetDaily: number; dayOfSprint: number; daysLeft: number;
  enquiriesToday: number; enquiriesTotal: number; sprintEnquiries: number; expectedByNow: number;
  pacePct: number; onTrackForDaily: boolean;
  perDay: Array<{ day: string; count: number }>;
  rankSummary: { priorityKeywords: number; checked: number; top3: number; top10: number; top20: number; notRanking: number };
  publishedCount: number;
  autopilot: { enabled: boolean; lastRun: string | null };
};

type Lead = { id: string; name: string; email: string; phone: string; company: string; message: string; source: string; page: string; status: string; receivedAt: string };

export function SprintBoard({ baseUrl }: { baseUrl: string }) {
  const [sprint, setSprint] = useState<Sprint | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });
  const [csv, setCsv] = useState('');
  const [busy, setBusy] = useState('');
  const [msg, setMsg] = useState('');

  const load = useCallback(async () => {
    const [s, l] = await Promise.all([
      api<Sprint>('/api/sprint'),
      api<{ ok: boolean; leads: Lead[] }>('/api/leads'),
    ]);
    if (s.ok) setSprint(s);
    if (l.ok) setLeads(l.leads);
  }, []);

  useEffect(() => {
    load();
    const t = setInterval(load, 30000);
    return () => clearInterval(t);
  }, [load]);

  const addLead = async () => {
    if (!form.name && !form.email) { setMsg('Name or email required'); return; }
    setBusy('lead');
    await api('/api/leads', { method: 'POST', body: JSON.stringify({ ...form, source: 'manual' }) });
    setForm({ name: '', email: '', company: '', message: '' });
    setMsg('Enquiry logged.');
    setBusy('');
    load();
  };

  const importCsv = async () => {
    const lines = csv.trim().split('\n').filter(Boolean);
    let n = 0;
    for (const line of lines) {
      const [name, email, phone, company] = line.split(',').map(s => (s || '').trim());
      if (!name && !email) continue;
      await api('/api/leads', { method: 'POST', body: JSON.stringify({ name, email, phone, company, source: 'import' }) });
      n++;
    }
    setCsv('');
    setMsg(`Imported ${n} enquiries.`);
    load();
  };

  const setStatus = async (id: string, status: string) => {
    await api('/api/leads-item/' + id, { method: 'PATCH', body: JSON.stringify({ status }) });
    load();
  };

  const maxCount = Math.max(sprint?.targetDaily || 10, ...(sprint?.perDay.map(p => p.count) || [0]));

  return (
    <div>
      <SectionHeader
        title="30-Day Sprint — Enquiries & Rankings"
        desc={`Contract sprint started ${sprint?.start || '2026-08-31'}: at least ${sprint?.targetDaily || 10} enquiries/day and top rankings for the ${sprint?.rankSummary.priorityKeywords || 39} priority keywords. Every live enquiry captured here counts toward the target.`}
        right={<Button variant="outline" size="sm" className="border-[#2a353d] text-slate-300" onClick={load}><RefreshCw className="h-3.5 w-3.5 mr-1" /> Refresh</Button>}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        <StatCard label="Sprint day" value={sprint ? `${sprint.dayOfSprint} / 30` : '…'} sub={sprint ? `${sprint.daysLeft} days left` : ''} tone={sprint && sprint.daysLeft <= 10 ? 'warn' : 'neutral'} />
        <StatCard label="Enquiries today" value={sprint?.enquiriesToday ?? '…'} sub={`target ${sprint?.targetDaily || 10}/day`} tone={sprint?.onTrackForDaily ? 'good' : 'bad'} />
        <StatCard label="Sprint total" value={sprint?.sprintEnquiries ?? '…'} sub={`expected by now: ${sprint?.expectedByNow ?? 0}`} tone={sprint && sprint.pacePct >= 100 ? 'good' : sprint && sprint.pacePct >= 60 ? 'warn' : 'bad'} />
        <StatCard label="Pace" value={sprint ? `${sprint.pacePct}%` : '…'} sub="of required volume so far" tone={sprint && sprint.pacePct >= 100 ? 'good' : 'warn'} />
      </div>

      {/* 30-day chart */}
      <Card className="bg-[#12181d] border-[#232d35] mb-5">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2"><Trophy className="h-3.5 w-3.5 text-amber-400" /> Daily enquiry volume vs 10/day target</div>
            <div className="text-[10px] text-slate-500">amber bar = today · dashed line = target</div>
          </div>
          <div className="relative h-28 flex items-end gap-[3px]">
            <div className="absolute left-0 right-0 border-t border-dashed border-amber-500/40" style={{ bottom: `${Math.min(100, ((sprint?.targetDaily || 10) / maxCount) * 100)}%` }} />
            {(sprint?.perDay || []).map((p, i) => {
              const isToday = p.day === sprint.todayKey;
              const isFuture = p.day > sprint.todayKey;
              const h = p.count > 0 ? Math.max(6, (p.count / maxCount) * 100) : 2;
              return (
                <div key={p.day} className="flex-1 flex flex-col justify-end h-full group relative" title={`${p.day}: ${p.count} enquiries`}>
                  <div
                    className={`w-full rounded-t-sm transition-all ${isFuture ? 'bg-[#1a2228]' : p.count >= (sprint?.targetDaily || 10) ? 'bg-emerald-500' : isToday ? 'bg-amber-400' : p.count > 0 ? 'bg-amber-600/70' : 'bg-[#232d35]'}`}
                    style={{ height: `${isFuture ? 2 : h}%` }}
                  />
                </div>
              );
            })}
          </div>
          <div className="flex justify-between text-[10px] text-slate-600 mt-2">
            <span>Day 1 · {sprint?.start}</span><span>Day 30 · contract decision</span>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-4 mb-5">
        {/* Webhook instructions */}
        <Card className="bg-[#12181d] border-[#232d35]">
          <CardContent className="p-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-2"><Webhook className="h-3.5 w-3.5 text-amber-400" /> Live enquiry capture webhook</div>
            <p className="text-xs text-slate-400 mb-2">Point the carrgo.co.uk contact form (or Zapier / Make / n8n / Typeform) at this endpoint — every submission lands here in real time and counts toward the 10/day target:</p>
            <div className="bg-[#0f1417] border border-[#2a353d] rounded-md p-2.5 font-mono text-[11px] text-emerald-300 break-all select-all">POST {baseUrl || 'https://your-saas'}/api/leads</div>
            <p className="text-[11px] text-slate-500 mt-2">Accepts JSON or form-encoded fields: <span className="text-slate-300">name, email, phone, company, message, page</span>. Add a shared token by setting <span className="font-mono text-amber-300">leads_token</span> in Credentials → pass it as <span className="font-mono">?token=</span> or <span className="font-mono">X-Leads-Token</span>.</p>
          </CardContent>
        </Card>

        {/* Rank summary */}
        <Card className="bg-[#12181d] border-[#232d35]">
          <CardContent className="p-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2"><Target className="h-3.5 w-3.5 text-amber-400" /> Priority keyword rankings (latest live checks)</div>
            <div className="grid grid-cols-5 gap-2 text-center">
              {[
                { label: 'Top 3', v: sprint?.rankSummary.top3, c: 'text-emerald-400' },
                { label: 'Top 10', v: sprint?.rankSummary.top10, c: 'text-emerald-300' },
                { label: 'Top 20', v: sprint?.rankSummary.top20, c: 'text-amber-300' },
                { label: 'Checked', v: sprint?.rankSummary.checked, c: 'text-slate-200' },
                { label: 'Not ranking', v: sprint?.rankSummary.notRanking, c: 'text-red-400' },
              ].map(x => (
                <div key={x.label} className="bg-[#0f1417] rounded-lg p-2.5 border border-[#232d35]">
                  <div className={`text-xl font-bold ${x.c}`}>{x.v ?? '—'}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{x.label}</div>
                </div>
              ))}
            </div>
            <div className="text-[11px] text-slate-500 mt-3">of {sprint?.rankSummary.priorityKeywords || 39} priority keywords. Autopilot runs fresh live rank checks every cycle and writes content for striking-distance terms. Full detail in Keyword Scout.</div>
            <div className="text-[11px] text-slate-500 mt-1.5 flex items-center gap-1.5"><Flame className="h-3 w-3 text-amber-500" /> Autopilot {sprint?.autopilot.enabled ? 'armed' : 'off'} · {sprint?.publishedCount || 0} articles verified live</div>
          </CardContent>
        </Card>
      </div>

      {/* Add + import */}
      <div className="grid lg:grid-cols-2 gap-4 mb-5">
        <Card className="bg-[#12181d] border-[#232d35]">
          <CardContent className="p-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Log an enquiry manually</div>
            <div className="grid grid-cols-2 gap-2">
              <Input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="bg-[#0f1417] border-[#2a353d] text-slate-100" />
              <Input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="bg-[#0f1417] border-[#2a353d] text-slate-100" />
              <Input placeholder="Company" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} className="bg-[#0f1417] border-[#2a353d] text-slate-100" />
              <Input placeholder="Message" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="bg-[#0f1417] border-[#2a353d] text-slate-100" />
            </div>
            <Button onClick={addLead} disabled={busy === 'lead'} className="mt-2.5 bg-amber-500 hover:bg-amber-400 text-black font-semibold" size="sm">
              {busy === 'lead' ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Plus className="h-3.5 w-3.5 mr-1" /> Log enquiry</>}
            </Button>
          </CardContent>
        </Card>
        <Card className="bg-[#12181d] border-[#232d35]">
          <CardContent className="p-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Import enquiries (CSV — one per line: name, email, phone, company)</div>
            <textarea
              value={csv}
              onChange={e => setCsv(e.target.value)}
              rows={4}
              placeholder={'John Smith, john@acme.co.uk, 07700 900123, Acme Ltd\nJane Doe, jane@beta.com, , Beta Ltd'}
              className="w-full bg-[#0f1417] border border-[#2a353d] rounded-md p-2.5 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
            />
            <Button onClick={importCsv} disabled={!csv.trim()} variant="outline" size="sm" className="mt-2.5 border-[#2a353d] text-slate-300">Import lines</Button>
          </CardContent>
        </Card>
      </div>
      {msg && <div className="text-xs text-amber-300 mb-3">{msg}</div>}

      {/* Leads table */}
      <Card className="bg-[#12181d] border-[#232d35]">
        <CardContent className="p-0">
          <div className="max-h-[480px] overflow-y-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-[#12181d] z-10">
                <TableRow className="border-[#232d35]">
                  <TableHead className="text-slate-400">Received</TableHead>
                  <TableHead className="text-slate-400">Contact</TableHead>
                  <TableHead className="text-slate-400">Message</TableHead>
                  <TableHead className="text-slate-400">Source</TableHead>
                  <TableHead className="text-slate-400">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.length === 0 && (
                  <TableRow className="border-[#232d35]"><TableCell colSpan={5} className="text-slate-500 text-sm py-6 text-center">No enquiries yet — wire the form webhook or log one above.</TableCell></TableRow>
                )}
                {leads.map(l => (
                  <TableRow key={l.id} className="border-[#232d35]">
                    <TableCell className="text-slate-400 text-xs whitespace-nowrap">{fmtTime(l.receivedAt)}</TableCell>
                    <TableCell className="text-xs">
                      <div className="text-slate-200 font-medium">{l.name}</div>
                      {l.email && <div className="text-slate-500">{l.email}</div>}
                      {l.company && <div className="text-slate-600">{l.company}</div>}
                    </TableCell>
                    <TableCell className="text-slate-400 text-xs max-w-[260px] truncate">{l.message || '—'}</TableCell>
                    <TableCell><StatusBadge status={l.source === 'webhook' ? 'live' : l.source} /></TableCell>
                    <TableCell>
                      <Select value={l.status} onValueChange={v => setStatus(l.id, v)}>
                        <SelectTrigger className="h-7 w-[120px] text-xs bg-[#0f1417] border-[#2a353d] text-slate-200"><SelectValue /></SelectTrigger>
                        <SelectContent className="bg-[#171e24] border-[#2a353d] text-slate-100">
                          {['new', 'contacted', 'quoted', 'won', 'lost'].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
