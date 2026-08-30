'use client';

import { useCallback, useEffect, useState } from 'react';
import { CommandCenter } from '@/components/dashboard/command-center';
import { ContentStudio } from '@/components/dashboard/content-studio';
import { PublisherHub } from '@/components/dashboard/publisher-hub';
import { ApprovalQueue } from '@/components/dashboard/approvals';
import { CredentialsManager } from '@/components/dashboard/credentials';
import { SiteAuditor } from '@/components/dashboard/auditor';
import { KeywordScout } from '@/components/dashboard/keywords';
import { Competitors } from '@/components/dashboard/competitors';
import { Intel } from '@/components/dashboard/intel';
import { AnalyticsRoi } from '@/components/dashboard/analytics';
import { Bridge } from '@/components/dashboard/bridge';
import { SprintBoard } from '@/components/dashboard/sprint';
import { api } from '@/components/dashboard/shared';
import { cn } from '@/lib/utils';
import {
  Bot, FileText, Rocket, ClipboardCheck, KeyRound, Radar, Search, Swords,
  Brain, BarChart3, Usb, Menu, X, Globe, Trophy,
} from 'lucide-react';

const NAV = [
  { key: 'command', label: 'Command Center', icon: Bot },
  { key: 'sprint', label: 'Sprint & Enquiries', icon: Trophy },
  { key: 'content', label: 'Content Studio', icon: FileText },
  { key: 'publisher', label: 'Publisher Hub', icon: Rocket },
  { key: 'approvals', label: 'Approval Queue', icon: ClipboardCheck },
  { key: 'credentials', label: 'Credentials', icon: KeyRound },
  { key: 'auditor', label: 'Site Auditor', icon: Radar },
  { key: 'keywords', label: 'Keyword Scout', icon: Search },
  { key: 'competitors', label: 'Competitors', icon: Swords },
  { key: 'intel', label: 'GSC + GA4 Intel', icon: Brain },
  { key: 'analytics', label: 'Analytics & ROI', icon: BarChart3 },
  { key: 'bridge', label: 'Extension Bridge', icon: Usb },
];

export default function Home() {
  const [view, setView] = useState('command');
  const [navOpen, setNavOpen] = useState(false);
  const [drafts, setDrafts] = useState<Array<{ id: string; title: string }>>([]);
  const [dataVersion, setDataVersion] = useState(0);
  const [baseUrl, setBaseUrl] = useState('');
  const [pending, setPending] = useState(0);

  const loadDrafts = useCallback(async () => {
    const res = await api<{ ok: boolean; drafts: Array<{ id: string; title: string }> }>('/api/content');
    if (res.ok) setDrafts(res.drafts);
  }, []);

  const loadPending = useCallback(async () => {
    const res = await api<{ ok: boolean; jobs: unknown[]; tasks: unknown[] }>('/api/approvals');
    if (res.ok) setPending(res.jobs.length + res.tasks.filter(t => t.status === 'queued').length);
  }, []);

  useEffect(() => {
    loadDrafts();
    loadPending();
    const t = setInterval(loadPending, 30000);
    return () => clearInterval(t);
  }, [loadDrafts, loadPending]);

  useEffect(() => {
    if (typeof window !== 'undefined') setBaseUrl(window.location.origin);
  }, []);

  const refreshAll = () => {
    loadDrafts();
    loadPending();
    setDataVersion(v => v + 1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0f13] text-slate-100">
      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-[#0d1216]/95 backdrop-blur border-b border-[#1c252d]">
        <div className="flex items-center gap-3 px-4 lg:px-6 h-14">
          <button className="lg:hidden text-slate-400" onClick={() => setNavOpen(!navOpen)}>
            {navOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-amber-500 flex items-center justify-center">
              <Globe className="h-4.5 w-4.5 text-black" strokeWidth={2.5} />
            </div>
            <div>
              <div className="font-bold text-sm leading-tight text-white">CARRGO SEO Master</div>
              <div className="text-[10px] text-slate-500 leading-tight">Live Publishing &amp; Intelligence SaaS · carrgo.co.uk</div>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2 text-xs">
            <span className="hidden sm:inline text-emerald-400">● Live</span>
            {pending > 0 && (
              <button onClick={() => { setView('approvals'); setNavOpen(false); }} className="bg-amber-500/15 text-amber-300 border border-amber-500/30 rounded-full px-3 py-1 font-semibold">
                {pending} awaiting approval
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className={cn(
          'fixed lg:sticky top-14 z-30 h-[calc(100vh-3.5rem)] w-60 shrink-0 bg-[#0d1216] border-r border-[#1c252d] p-3 space-y-1 overflow-y-auto transition-transform lg:translate-x-0',
          navOpen ? 'translate-x-0' : '-translate-x-full'
        )}>
          {NAV.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                onClick={() => { setView(item.key); setNavOpen(false); }}
                className={cn(
                  'w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-colors text-left',
                  view === item.key
                    ? 'bg-amber-500/15 text-amber-300 border border-amber-500/25 font-semibold'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-[#141b21] border border-transparent'
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {item.label}
              </button>
            );
          })}
          <div className="pt-3 px-3 text-[10px] text-slate-600 leading-relaxed">
            Real data engine: HTTP audits · Google Suggest · platform APIs · Chrome evidence-gated publishing · GSC/GA4 via bridge.
          </div>
        </aside>

        {navOpen && <div className="fixed inset-0 top-14 z-20 bg-black/50 lg:hidden" onClick={() => setNavOpen(false)} />}

        {/* Main */}
        <main className="flex-1 min-w-0 p-4 lg:p-6">
          {view === 'command' && <CommandCenter />}
          {view === 'sprint' && <SprintBoard baseUrl={baseUrl} />}
          {view === 'content' && <ContentStudio onSentToPublisher={refreshAll} />}
          {view === 'publisher' && <PublisherHub drafts={drafts} reloadDrafts={loadDrafts} />}
          {view === 'approvals' && <ApprovalQueue onChanged={refreshAll} />}
          {view === 'credentials' && <CredentialsManager />}
          {view === 'auditor' && <SiteAuditor />}
          {view === 'keywords' && <KeywordScout />}
          {view === 'competitors' && <Competitors />}
          {view === 'intel' && <Intel dataVersion={dataVersion} onDataChange={refreshAll} />}
          {view === 'analytics' && <AnalyticsRoi />}
          {view === 'bridge' && <Bridge baseUrl={baseUrl} />}
        </main>
      </div>

      <footer className="mt-auto border-t border-[#1c252d] bg-[#0d1216]">
        <div className="px-6 py-4 text-[11px] text-slate-600 flex flex-wrap justify-between gap-2">
          <span>CARRGO SEO Master SaaS · publishing pipeline: approval → execution → HTTP evidence verification</span>
          <span>Every metric on this dashboard originates from live operations, never simulated.</span>
        </div>
      </footer>
    </div>
  );
}
