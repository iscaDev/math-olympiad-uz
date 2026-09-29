'use client';
import {T} from '@/components/preferences';
export default function ErrorPage({reset}:{reset:()=>void}){return <section className="shell member-gate"><h1><T>Hozir sahifani ochib bo‘lmadi</T></h1><p><T>Server ishlayotganini tekshiring va qayta urinib ko‘ring.</T></p><button className="button primary" onClick={reset}><T>Qayta urinish</T></button></section>;}
