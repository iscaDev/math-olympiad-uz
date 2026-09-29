"use client";
import { useEffect, useRef, useState } from 'react';
import type { MathfieldElement } from 'mathlive';
import { usePreferences } from './preferences';
const symbols = [ ['Kasr', '\\frac{#0}{#?}'], ['Ildiz', '\\sqrt{#0}'], ['Darajaga oshirish', '#0^{#?}'], ['Indeks', '#0_{#?}'], ['Yig‘indi', '\\sum_{n=1}^{#?}#0'], ['Integral', '\\int_{#?}^{#?}#0\\,dx'], ['π', '\\pi'], ['∞', '\\infty'], ['≤', '\\le'], ['≠', '\\ne'], ['α', '\\alpha'], ['θ', '\\theta'] ];
export default function FormulaField({ value, onChange, label = 'Formula' }: { value: string; onChange: (value: string) => void; label?: string }) {
  const { t } = usePreferences();
  const host = useRef<HTMLDivElement>(null);
  const field = useRef<MathfieldElement | null>(null);
  const change = useRef(onChange); change.current = onChange;
  const initial = useRef(value);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let cancelled = false;
    let cleanup = () => {};
    import('mathlive').then(({ MathfieldElement }) => {
      if (cancelled || !host.current) return;
      MathfieldElement.fontsDirectory = '/mathlive/fonts';
      MathfieldElement.soundsDirectory = null;
      const node = new MathfieldElement();
      node.value = initial.current;
      node.mathVirtualKeyboardPolicy = 'auto';
      node.setAttribute('aria-label', t(label));
      const input = () => change.current(node.value.slice(0, 8000));
      node.addEventListener('input', input);
      host.current.appendChild(node); field.current = node; setReady(true);
      cleanup = () => { node.removeEventListener('input', input); node.remove(); field.current = null; };
    }).catch(() => setFailed(true));
    return () => { cancelled = true; cleanup(); };
  // Recreating the field on each keystroke would lose the caret.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { if (field.current && field.current.value !== value) field.current.value = value; }, [value]);
  return <div className="formula-composer">
    <div className="symbol-toolbar" aria-label={t('Matematik belgilar')}>{symbols.map(([name, latex]) => <button key={name} type="button" disabled={!ready} title={t(name)} onClick={() => { field.current?.focus(); field.current?.insert(latex, { focus: true }); change.current(field.current?.value ?? ''); }}>{t(name)}</button>)}</div>
    <div ref={host} className="formula-input" />
    {!ready && !failed && <p className="editor-help">{t('Formula klaviaturasi yuklanmoqda…')}</p>}
    <details className="latex-source"><summary>{t('LaTeX matni')}</summary><input aria-label={`${t(label)} — LaTeX`} value={value} maxLength={8000} onChange={e => onChange(e.target.value)} autoComplete="off" /></details>
    {failed && <p role="status">{t('Klaviatura yuklanmadi. LaTeX maydonidan foydalaning.')}</p>}
  </div>;
}
