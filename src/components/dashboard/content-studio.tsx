'use client';

import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { api, SectionHeader, StatusBadge, fmtTime } from './shared';
import { Loader2, Sparkles, Trash2, Send, Eye } from 'lucide-react';

type Draft = {
  id: string; title: string; tags: string; keywords: string; status: string;
  wordCount: number; source: string; createdAt: string; updatedAt: string; metaJson: string;
};

type DraftFull = Draft & { bodyMd: string };

export function ContentStudio({ onSentToPublisher }: { onSentToPublisher?: () => void }) {
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [viewing, setViewing] = useState<DraftFull | null>(null);
  const [editBody, setEditBody] = useState('');

  const load = useCallback(async () => {
    const data = await api<{ ok: boolean; drafts: Draft[] }>('/api/content');
    if (data.ok) setDrafts(data.drafts);
  }, []);

  useEffect(() => { load(); }, [load]);

  const generate = async () => {
    if (!topic.trim()) { setError('Enter a topic first'); return; }
    setBusy(true); setError('');
    try {
      const res = await api<{ ok: boolean; error?: string }>('/api/content', {
        method: 'POST',
        body: JSON.stringify({ topic, keywords: keywords.split(',').map(k => k.trim()).filter(Boolean), liveResearch: true }),
      });
      if (!res.ok) setError(res.error || 'Generation failed');
      else setTopic('');
      await load();
    } finally {
      setBusy(false);
    }
  };

  const view = async (id: string) => {
    const res = await fetch('/api/content-item/' + id).then(r => r.json());
    if (res.ok) { setViewing(res.draft); setEditBody(res.draft.bodyMd); }
  };

  const saveEdit = async () => {
    if (!viewing) return;
    await api('/api/content-item/' + viewing.id, { method: 'PUT', body: JSON.stringify({ bodyMd: editBody }) });
    setViewing(null);
    load();
  };

  const remove = async (id: string) => {
    await api('/api/content-item/' + id, { method: 'DELETE' });
    load();
  };

  const sendToPublisher = async (draft: Draft) => {
    await api('/api/publish', { method: 'POST', body: JSON.stringify({ draftId: draft.id, platform: 'medium', channel: 'extension' }) });
    onSentToPublisher?.();
    load();
  };

  return (
    <div>
      <SectionHeader
        title="Content Studio"
        desc="Every article is written live by the AI engine with optional live web research, then stored in the database. Send drafts straight to the Publisher Hub."
      />

      <Card className="bg-[#12181d] border-[#232d35] mb-5">
        <CardContent className="p-4 space-y-3">
          <div className="grid md:grid-cols-[1fr_1fr] gap-3">
            <div>
              <label className="text-xs uppercase tracking-wider text-slate-400">Article topic</label>
              <Input value={topic} onChange={e => setTopic(e.target.value)} placeholder="e.g. Ocean freight costs from the UK in 2026" className="mt-1 bg-[#0f1417] border-[#2a353d] text-slate-100" />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-slate-400">Target keywords (comma separated)</label>
              <Input value={keywords} onChange={e => setKeywords(e.target.value)} placeholder="ocean freight uk, container shipping costs" className="mt-1 bg-[#0f1417] border-[#2a353d] text-slate-100" />
            </div>
          </div>
          {error && <div className="text-xs text-red-400">{error}</div>}
          <Button onClick={generate} disabled={busy} className="bg-amber-500 hover:bg-amber-400 text-black font-semibold">
            {busy ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Writing with live research…</> : <><Sparkles className="h-4 w-4 mr-2" /> Generate article</>}
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-2.5">
        {drafts.length === 0 && <div className="text-sm text-slate-500">No drafts yet — generate your first article above.</div>}
        {drafts.map(d => (
          <Card key={d.id} className="bg-[#12181d] border-[#232d35]">
            <CardContent className="p-4 flex flex-wrap items-center gap-3">
              <div className="flex-1 min-w-[240px]">
                <div className="font-semibold text-slate-100 text-sm">{d.title}</div>
                <div className="text-xs text-slate-500 mt-1">
                  {d.wordCount} words · {d.tags || 'no tags'} · {fmtTime(d.createdAt)}
                </div>
              </div>
              <StatusBadge status={d.status} />
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="border-[#2a353d] text-slate-300 hover:text-white" onClick={() => view(d.id)}>
                  <Eye className="h-3.5 w-3.5 mr-1" /> View
                </Button>
                <Button size="sm" className="bg-amber-500 hover:bg-amber-400 text-black font-semibold" onClick={() => sendToPublisher(d)}>
                  <Send className="h-3.5 w-3.5 mr-1" /> Publish
                </Button>
                <Button size="sm" variant="outline" className="border-red-500/30 text-red-400 hover:bg-red-500/10" onClick={() => remove(d.id)}>
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!viewing} onOpenChange={open => !open && setViewing(null)}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto bg-[#12181d] border-[#232d35] text-slate-100">
          <DialogHeader>
            <DialogTitle className="text-white pr-6">{viewing?.title}</DialogTitle>
          </DialogHeader>
          <Textarea value={editBody} onChange={e => setEditBody(e.target.value)} rows={20} className="bg-[#0f1417] border-[#2a353d] text-slate-200 font-mono text-xs" />
          <div className="flex gap-2 justify-end">
            <Button variant="outline" className="border-[#2a353d]" onClick={() => setViewing(null)}>Close</Button>
            <Button className="bg-amber-500 hover:bg-amber-400 text-black font-semibold" onClick={saveEdit}>Save changes</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
