"use client";
import { useState } from 'react';
import Icon from './icons';
import MathEditor from './math-editor';
import MathProse from './math-prose';
import { usePreferences } from './preferences';
type Message = { role: 'user' | 'assistant'; content: string };
export default function AssistantChat({ enabled }: { enabled: boolean }) {
  const { t, language } = usePreferences(); const [input, setInput] = useState(''); const [messages, setMessages] = useState<Message[]>([]); const [mode, setMode] = useState('hint'); const [pending, setPending] = useState(false); const [error, setError] = useState('');
  async function send(e: React.FormEvent) {
    e.preventDefault(); if (pending || !input.trim()) return; setError('');
    const next: Message[] = [...messages, { role: 'user', content: input.trim() }]; setPending(true);
    try {
      const response = await fetch('/api/assistant/', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ messages: next.slice(-8), mode, language }) });
      const result = await response.json(); if (!response.ok) throw new Error(result.error ?? 'Hozir javob olib bo‘lmadi.');
      setMessages([...next, { role: 'assistant', content: result.answer }]); setInput('');
    } catch (e) { setError(e instanceof Error ? e.message : 'Hozir javob olib bo‘lmadi.'); } finally { setPending(false); }
  }
  return <><div className="assistant-welcome"><Icon name="sparkle" size={32} weight="duotone" /><h2>{t('Javobdan avval, keyingi qadam.')}</h2><p>{t('Savolingizni yozing yoki formula qo‘shing. Avval ishora beraman; to‘liq yechimni o‘zingiz so‘rashingiz mumkin.')}</p><div className="assistant-prompts">{['Bu masalani nimadan boshlayman?', 'Isbotimdagi xatoni topishga yordam bering.', 'Shu tushunchani sodda misol bilan izohlang.'].map(s => <button key={s} onClick={() => setInput(t(s))}>{t(s)}</button>)}</div></div>
    {!enabled && <div className="setup-notice"><Icon name="info" size={22} /><div><strong>{t('AI hali ulanmagan')}</strong><p>{t('OpenAI kaliti serverga qo‘shilgach, yordamchi ishlaydi. Hozir formula yozishni sinab ko‘rishingiz mumkin.')}</p></div></div>}
    <div aria-live="polite" aria-busy={pending}>{messages.map((m,i) => <div key={i} className={`chat-message ${m.role}`}><strong>{t(m.role === 'user' ? 'Siz' : 'AI yordamchi')}</strong><MathProse text={m.content} /></div>)}{pending && <p className="form-message">{t('Fikrlayapman…')}</p>}</div>
    <form onSubmit={send}><MathEditor label="Savolingiz" value={input} onChange={setInput} rows={4} maxLength={4000} /><div className="assistant-controls"><select aria-label={t('Yordam turi')} value={mode} onChange={e => setMode(e.target.value)}><option value="hint">{t('Avval ishora')}</option><option value="solution">{t('To‘liq yechim so‘rash')}</option></select><button type="submit" className="button primary" disabled={!enabled || pending || !input.trim()}>{t('Yuborish')}<Icon name="arrow" size={18} /></button></div></form><p role="status" className="form-message">{t(error)}</p><p className="editor-help">{t('AI xato qilishi mumkin. Isbot va hisoblarni tekshiring. Savol matni OpenAI xizmatiga yuboriladi.')}</p></>;
}
