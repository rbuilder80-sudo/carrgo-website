'use client';

import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { api, SectionHeader, StatusBadge, fmtTime } from './shared';
import { Loader2, RefreshCw, Download, Copy, KeyRound } from 'lucide-react';

type PairInfo = { ok: boolean; code: string | null; expiresAt?: string };
type Overview = { ok: boolean; devices: Array<{ name: string; status: string; lastHeartbeat: string | null; paired: boolean }> };

export function Bridge({ baseUrl }: { baseUrl: string }) {
  const [pair, setPair] = useState<PairInfo | null>(null);
  const [overview, setOverview] = useState<Overview | null>(null);
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState('');

  const load = useCallback(async () => {
    const [p, o] = await Promise.all([api<PairInfo>('/api/bridge/pair-new'), api<Overview>('/api/overview')]);
    setPair(p);
    if (o.ok) setOverview(o);
  }, []);

  useEffect(() => {
    load();
    const t = setInterval(load, 30000);
    return () => clearInterval(t);
  }, [load]);

  const newCode = async () => {
    setBusy(true);
    const res = await api<PairInfo>('/api/bridge/pair-new', { method: 'POST' });
    if (res.ok) setPair(res);
    setBusy(false);
  };

  const copy = async (label: string, text: string) => {
    await navigator.clipboard.writeText(text).catch(() => {});
    setCopied(label);
    setTimeout(() => setCopied(''), 1500);
  };

  return (
    <div>
      <SectionHeader
        title="Chrome Extension Bridge"
        desc="The bridge connects this SaaS to your real Chrome browser — where you are logged into Medium, LinkedIn, GSC and GA4. Approved publishing jobs are claimed by the extension, executed in your session, and the published URL is verified by the server."
      />

      <div className="grid lg:grid-cols-2 gap-4">
        <Card className="bg-[#12181d] border-[#232d35]">
          <CardContent className="p-5 space-y-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">1 · Install the extension</div>
            <a href="/downloads/seo-master-chrome-extension.zip" download>
              <Button className="w-full bg-amber-500 hover:bg-amber-400 text-black font-semibold">
                <Download className="h-4 w-4 mr-2" /> Download seo-master-chrome-extension.zip
              </Button>
            </a>
            <div className="text-xs text-slate-400 leading-relaxed">
              Unzip → open <span className="text-amber-300">chrome://extensions</span> → enable <span className="text-amber-300">Developer mode</span> → <span className="text-amber-300">Load unpacked</span> → select the unzipped folder. Then open the extension&apos;s <span className="text-amber-300">popup → settings</span>.
            </div>

            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 pt-2">2 · Paste this SaaS URL into the extension options</div>
            <div className="flex gap-2">
              <code className="flex-1 text-xs bg-[#0f1417] border border-[#2a353d] rounded-lg px-3 py-2.5 text-amber-300 truncate">{baseUrl}</code>
              <Button size="sm" variant="outline" className="border-[#2a353d] text-slate-300" onClick={() => copy('url', baseUrl)}>
                <Copy className="h-3.5 w-3.5" /> {copied === 'url' ? '✓' : ''}
              </Button>
            </div>

            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 pt-2">3 · Generate a pairing code &amp; pair</div>
            <div className="flex gap-2 items-center">
              <div className="font-mono text-2xl tracking-[0.35em] text-amber-300 bg-[#0f1417] border border-[#2a353d] rounded-lg px-4 py-2">
                {pair?.code || '——————'}
              </div>
              <Button size="sm" variant="outline" className="border-[#2a353d] text-slate-300" onClick={() => pair?.code && copy('code', pair.code)}>
                <Copy className="h-3.5 w-3.5 mr-1" /> {copied === 'code' ? '✓' : 'Copy'}
              </Button>
              <Button size="sm" variant="outline" className="border-[#2a353d] text-slate-300" onClick={newCode} disabled={busy}>
                {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <KeyRound className="h-3.5 w-3.5 mr-1" />} New
              </Button>
            </div>
            <div className="text-[11px] text-slate-500">
              {pair?.code ? <>Valid for 10 minutes — expires {fmtTime(pair.expiresAt)}. Enter it in the extension options with a device name and press &quot;Pair this Chrome&quot;.</> : 'No active code — press New to generate one.'}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#12181d] border-[#232d35]">
          <CardContent className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Paired devices</div>
              <Button size="sm" variant="outline" className="border-[#2a353d] text-slate-300" onClick={load}><RefreshCw className="h-3.5 w-3.5 mr-1" /> Refresh</Button>
            </div>
            {(overview?.devices || []).length === 0 && (
              <div className="text-sm text-slate-500">No devices paired yet. Complete steps 1–3 and the device will appear here with a live heartbeat.</div>
            )}
            <div className="space-y-2">
              {(overview?.devices || []).map(d => (
                <div key={d.name} className="flex items-center justify-between border border-[#232d35] rounded-lg px-3 py-2.5">
                  <div>
                    <div className="text-sm text-slate-200 font-medium">{d.name}</div>
                    <div className="text-[11px] text-slate-500">last heartbeat: {fmtTime(d.lastHeartbeat)}</div>
                  </div>
                  <StatusBadge status={d.status} />
                </div>
              ))}
            </div>

            <div className="border-t border-[#232d35] pt-4 space-y-2 text-xs text-slate-400 leading-relaxed">
              <div className="font-semibold text-slate-300 uppercase tracking-wider text-[11px]">What the bridge does once paired</div>
              <div>• Heartbeats every 30s → device shows online here</div>
              <div>• Claims approved extension-channel jobs automatically</div>
              <div>• Opens the platform in a background tab, fills the composer, publishes, reports the live URL</div>
              <div>• If you are not logged into the platform it reports <span className="text-orange-300">awaiting_auth</span> instead of failing silently</div>
              <div>• Popup buttons pull <span className="text-amber-300">GSC</span> and <span className="text-amber-300">GA4</span> performance data into the Intelligence page</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
