"use client";
import { useId, useRef, useState } from 'react';
import FormulaField from './formula-field';
import MathProse from './math-prose';
import Icon from './icons';
import { usePreferences } from './preferences';
export default function MathEditor({ label, value, onChange, rows = 6, maxLength = 60000 }: { label: string; value: string; onChange: (value: string) => void; rows?: number; maxLength?: number }) {
  const { t } = usePreferences(); const id = useId(); const textarea = useRef<HTMLTextAreaElement>(null);
  const [formulaOpen, setFormulaOpen] = useState(false); const [formula, setFormula] = useState(''); const [preview, setPreview] = useState(false); const selection = useRef([0, 0]);
  function insert(block: boolean) {
    if (!formula.trim()) return;
    const [start, end] = selection.current; const inserted = block ? `\n$$${formula}$$\n` : `$${formula}$`;
    onChange((value.slice(0, start) + inserted + value.slice(end)).slice(0, maxLength)); setFormulaOpen(false); setFormula(''); setPreview(false);
    requestAnimationFrame(() => { textarea.current?.focus(); textarea.current?.setSelectionRange(start + inserted.length, start + inserted.length); });
  }
  return <div className="math-editor">
    <div className="editor-label"><label htmlFor={id}>{t(label)}</label><span>{t('Matn + matematika')}</span></div>
    <div className="editor-toolbar"><button type="button" onClick={() => { if (textarea.current) selection.current = [textarea.current.selectionStart, textarea.current.selectionEnd]; setFormulaOpen(!formulaOpen); }} aria-expanded={formulaOpen}><span className="math-symbol">∑</span>{t('Formula qo‘shish')}</button><button type="button" onClick={() => setPreview(!preview)} aria-pressed={preview}><Icon name={preview ? 'pencil' : 'eye'} size={16} />{t(preview ? 'Yozish' : 'Ko‘rib chiqish')}</button></div>
    {formulaOpen && <div className="formula-insert"><FormulaField value={formula} onChange={setFormula} /><div className="editor-insert-actions"><button type="button" className="button small primary" disabled={!formula.trim()} onClick={() => insert(false)}>{t('Matn ichiga')}</button><button type="button" className="button small secondary" disabled={!formula.trim()} onClick={() => insert(true)}>{t('Alohida qatorga')}</button></div></div>}
    {preview ? <div className="editor-preview"><MathProse text={value || t('Yozgan matningiz shu yerda ko‘rinadi.')} /></div> : <textarea ref={textarea} id={id} value={value} maxLength={maxLength} rows={rows} onChange={e => onChange(e.target.value)} placeholder={t('Matn yozing. Formula uchun yuqoridagi tugmani bosing.')} />}
  </div>;
}
