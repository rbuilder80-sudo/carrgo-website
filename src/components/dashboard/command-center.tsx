'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { api, SectionHeader, StatCard, StatusBadge, fmtTime } from './shared';
import { AutopilotPanel } from './autopilot-panel';
import { Send, Loader2, Bot, CheckCircle2, XCircle } from 'lucide-react';

type Overview = {
  ok: boolean;
  counts: { drafts: number; keywords: number; suggestions: number; queuedTasks: number; gscQueries: number; ga4Batches: number };
  latestAudit: { score: number; grade: string; createdAt: string } | null;
  devices: Array<{ name: string; status: string; paired: boolean }>;
  credentials: Array<{ platform: string; status: string }>;
  recentJobs: Array<{ id: string; platform: string; status: string; title: string; publishedUrl?: string }>;
};

type Msg = { role: 'user' | 'assistant'; content: string; actions?: Array<{ tool: string; summary: string; ok: boolean }> };

export function CommandCenter() {
  const [overview, setOverview] = useState<Overview | null>(null);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: 'assistant',
      content:
        'Master Agent online. I control the real system: I can run live site audits of carrgo.co.uk, scrape live Google keyword suggestions, write full SEO articles, queue publishing jobs to Medium/LinkedIn/WordPress/Telegram and more, verify backlinks over HTTP, and recon competitors with live web search.\n\nTry: "Run a live audit of carrgo.co.uk and tell me what to fix" or "Write an article about ocean freight costs and queue it to Medium".',
    },
  ]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const loadOverview = async () => {
    const data = await api<Overview>('/api/overview');
    if (data.ok) setOverview(data);
  };

  useEffect(() => {
    loadOverview();
    const t = setInterval(loadOverview, 30000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, busy]);

  const send = async () => {
    const text = input.trim();
    if (!text || busy) return;
    setInput('');
    setBusy(true);
    const history = messages.filter(m => m.content.length < 3500).map(m => ({ role: m.role, content: m.content }));
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    try {
      const res = await api<{ ok: boolean; reply?: string; actions?: Array<{ tool: string; summary: string; ok: boolean }>; error?: string }>('/api/agent/chat', {
        method: 'POST',
        body: JSON.stringify({ message: text, history }),
      });
      if (res.ok) {
        setMessages(prev => [...prev, { role: 'assistant', content: res.reply || 'Done.', actions: res.actions }]);
        loadOverview();
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: `⚠ ${res.error || 'Agent error'}` }]);
      }
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', content: `⚠ ${(e as Error).message}` }]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <SectionHeader
        title="Command Center — Master Agent"
        desc="The agent executes real operations against the live web: audits hit carrgo.co.uk over HTTP, keywords come from Google autocomplete, publishing jobs flow to your paired Chrome or connected platform APIs."
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        <StatCard label="Site health" value={overview?.latestAudit ? `${overview.latestAudit.score}/100` : '—'} sub={overview?.latestAudit ? `grade ${overview.latestAudit.grade} · ${fmtTime(overview.latestAudit.createdAt)}` : 'no audit yet — run one'} tone={overview?.latestAudit && overview.latestAudit.score >= 75 ? 'good' : 'warn'} />
        <StatCard label="Content drafts" value={overview?.counts.drafts ?? '…'} sub="in Content Studio" />
        <StatCard label="Live keywords" value={overview?.counts.keywords ?? '…'} sub="from Google Suggest" />
        <StatCard label="Extension devices" value={overview ? overview.devices.filter(d => d.status === 'online').length : '…'} sub={overview ? `${overview.devices.length} paired total` : ''} tone={overview && overview.devices.some(d => d.status === 'online') ? 'good' : 'warn'} />
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-4">
        <Card className="bg-[#12181d] border-[#232d35] flex flex-col h-[560px]">
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4">
            <div className="py-4 space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${m.role === 'user' ? 'bg-amber-500/15 text-amber-50 border border-amber-500/20' : 'bg-[#1a232a] text-slate-200 border border-[#26313a]'}`}>
                    {m.role === 'assistant' && (
                      <div className="flex items-center gap-1.5 mb-1.5 text-amber-400 text-[11px] font-semibold uppercase tracking-wider">
                        <Bot className="h-3.5 w-3.5" /> Master Agent
                      </div>
                    )}
                    {m.content}
                    {m.actions && m.actions.length > 0 && (
                      <div className="mt-3 space-y-1.5 border-t border-[#2a353d] pt-2.5">
                        {m.actions.map((a, j) => (
                          <div key={j} className="flex items-start gap-2 text-xs">
                            {a.ok ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 mt-0.5 shrink-0" /> : <XCircle className="h-3.5 w-3.5 text-red-400 mt-0.5 shrink-0" />}
                            <div>
                              <span className="font-mono text-[10px] bg-[#0f1417] px-1.5 py-0.5 rounded mr-1.5 text-amber-300">{a.tool}</span>
                              <span className="text-slate-300">{a.summary}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {busy && (
                <div className="flex items-center gap-2 text-amber-400 text-sm">
                  <Loader2 className="h-4 w-4 animate-spin" /> Working (live tools can take up to a minute)…
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          </div>
          <div className="p-3 border-t border-[#232d35] flex gap-2">
            <Input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
              placeholder="Command the agent: audits, keywords, content, publishing…"
              disabled={busy}
              className="bg-[#0f1417] border-[#2a353d] text-slate-100 placeholder:text-slate-500"
            />
            <Button onClick={send} disabled={busy} className="bg-amber-500 hover:bg-amber-400 text-black font-semibold">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </Card>

        <div className="space-y-3">
          <AutopilotPanel />

          <Card className="bg-[#12181d] border-[#232d35]">
            <CardContent className="p-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Publishing pipeline</div>
              {overview?.recentJobs?.length ? (
                <div className="space-y-2.5">
                  {overview.recentJobs.map(j => (
                    <div key={j.id} className="text-xs space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-semibold text-slate-200">{j.platform}</span>
                        <StatusBadge status={j.status} />
                      </div>
                      <div className="text-slate-500 line-clamp-1">{j.title}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-xs text-slate-500">No publishing jobs yet. Queue one from Content Studio or ask the agent.</div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-[#12181d] border-[#232d35]">
            <CardContent className="p-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Connected systems</div>
              <div className="space-y-2 text-xs">
                {overview?.credentials?.length ? (
                  overview.credentials.map(c => (
                    <div key={c.platform} className="flex items-center justify-between">
                      <span className="text-slate-300">{c.platform}</span>
                      <StatusBadge status={c.status} />
                    </div>
                  ))
                ) : (
                  <div className="text-slate-500">No API credentials connected yet.</div>
                )}
                {overview?.devices?.map(d => (
                  <div key={d.name} className="flex items-center justify-between">
                    <span className="text-slate-300">{d.name} (extension)</span>
                    <StatusBadge status={d.status} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
