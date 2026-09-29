"use client";
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import type { AttemptResult } from '@/lib/attempt-types';
import { deleteAttempt } from '@/app/actions/attempts';
import MathProse from './math-prose';
import Icon from './icons';
import { usePreferences } from './preferences';
const choiceText=(value:string)=>/\\[a-zA-Z]+|[{}_^]/.test(value)?`$${value}$`:value;
function AnswerValue({answer,type,choices}:{answer:string;type:'numeric'|'expression'|'choice';choices:string[]}){
 if(!answer)return <strong>—</strong>;
 if(type==='choice'){const index=answer.toUpperCase().charCodeAt(0)-65,value=choices[index];return <div className="review-answer-value"><strong>{answer.toUpperCase()}</strong>{value&&<><span>—</span><MathProse text={choiceText(value)}/></>}</div>;}
 return <div className="review-answer-value"><MathProse text={`$${answer}$`}/></div>;
}
export default function AttemptReview({result,standalone=false}:{result:AttemptResult;standalone?:boolean}){
 const {t}=usePreferences(),router=useRouter();const [message,setMessage]=useState('');const [pending,start]=useTransition();
 function remove(){if(!confirm(t('Bu natijani butunlay o‘chirishni xohlaysizmi?')))return;start(async()=>{const r=await deleteAttempt(result.id);if(r.error)setMessage(r.error);else{router.push('/dashboard/');router.refresh();}});}
 return <div className={standalone?'attempt-review-page':''}>
  <section className="result-hero panel-card"><div><p className="eyebrow">{t('TEST NATIJASI')}</p><h1>{result.title}</h1><p>{t('Har bir savol bo‘yicha javobingizni va to‘g‘ri javobni ko‘ring.')}</p></div><div className="result-score"><strong>{result.score}</strong><span>/ {result.total}</span></div></section>
  <div className="review-list">{result.review.map((q,i)=><section className={`panel-card review-question ${q.correct?'is-correct':'is-wrong'}`} key={q.id}>
   <div className="review-head"><span>{i+1}</span><div><h2>{t('Savol')} {i+1}</h2><small>{q.points} {t('ball')}</small></div><Icon name={q.correct?'check':'close'} size={22}/></div>
   <MathProse text={q.body}/>{q.has_image&&<img className="question-image" src={`/api/attempts/${result.id}/questions/${q.id}/image`} alt=""/>}
   <div className="answer-comparison"><div><small>{t('Sizning javobingiz')}</small><AnswerValue answer={q.given} type={q.answer_type} choices={q.choices}/></div><div><small>{t('To‘g‘ri javob')}</small><AnswerValue answer={q.correct_answer} type={q.answer_type} choices={q.choices}/></div></div>
  </section>)}</div>
  {standalone&&<div className="reader-actions"><button className="button danger" disabled={pending} onClick={remove}><Icon name="close" size={18}/>{t('Bu natijani o‘chirish')}</button><p role="status">{message}</p></div>}
 </div>
}
