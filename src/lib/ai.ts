import ZAI from 'z-ai-web-dev-sdk';

export async function getZai(): Promise<InstanceType<typeof ZAI>> {
  return ZAI.create();
}

export async function llm(system: string, user: string, maxTokens = 4000): Promise<string> {
  const zai = await getZai();
  const completion = await zai.chat.completions.create({
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: user },
    ],
    thinking: { type: 'disabled' },
    max_tokens: maxTokens,
  });
  return completion.choices[0]?.message?.content || '';
}

export async function webSearch(query: string, num = 6): Promise<Array<{ name?: string; url?: string; snippet?: string; host_name?: string; date?: string }>> {
  try {
    const zai = await getZai();
    const res = await zai.functions.invoke('web_search', { query, num });
    const arr = Array.isArray(res) ? res : (res as { result?: unknown[] })?.result || [];
    return arr as Array<{ name?: string; url?: string; snippet?: string; host_name?: string; date?: string }>;
  } catch (e) {
    console.error('web_search failed', (e as Error).message);
    return [];
  }
}

export function extractJson<T>(text: string): T | null {
  if (!text) return null;
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const candidate = fenced ? fenced[1] : text;
  const start = candidate.search(/[[{]/);
  if (start === -1) return null;
  for (let end = candidate.length; end > start; end--) {
    const slice = candidate.slice(start, end);
    try {
      return JSON.parse(slice) as T;
    } catch { /* keep shrinking */ }
  }
  return null;
}
