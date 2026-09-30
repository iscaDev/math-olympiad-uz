import { T } from "@/components/preferences";
import Link from "next/link";
import Icon from "@/components/icons";
import MathText from "@/components/math";
import { ProblemCard, SectionHead } from "@/components/ui";
import { QuickQuestion, SquareLab } from "@/components/home-interactive";
import PlatformStats from "@/components/platform-stats";
import Reveal from "@/components/reveal";
import {topics,topicFor} from "@/lib/topics";
import {api} from "@/lib/api";
import type {ContentCard} from "@/lib/platform-types";
import {CatalogCard} from "@/components/content-catalog";
import type {Metadata} from "next";
export const metadata:Metadata={alternates:{canonical:"/"}};
export default async function Home() {
  const items=await api<ContentCard[]>('/api/public/catalog');
  const problems=items.filter(i=>i.kind==='problem');
  const lessons=items.filter(i=>i.kind==='lesson');
  return (
    <div className="home-page">
      <div className="home-math-backdrop" aria-hidden="true">
        <div className="math-grid" />
        <span className="math-note note-one">x² + y² = r²</span>
        <span className="math-note note-two">∑ · ∞</span>
        <svg className="orbit-diagram" viewBox="0 0 240 240" fill="none">
          <circle cx="120" cy="120" r="90" />
          <ellipse
            cx="120"
            cy="120"
            rx="44"
            ry="90"
            transform="rotate(35 120 120)"
          />
          <path d="M20 120h200M120 20v200M55 183l129-127" />
          <circle cx="184" cy="56" r="5" fill="currentColor" stroke="none" />
        </svg>
      </div>
      <div className="shell">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">
              <span />
              <T>{" O‘ZBEK TILIDA FIKRLAYMIZ. BIRGA O‘SAMIZ."}</T>
            </p>
            <h1>
              <T>{"Matematika."}</T>
              <br />
              <T>{"Yodlashdan"}</T>
              <br />
              <span className="violet-text">
                <T>{"kattaroq."}</T>
              </span>
            </h1>
            <p className="hero-description">
              <T>
                {
                  "Bir masala, yangi qarash. Mantiq, tasavvur va kashfiyot orqali olimpiada sari o‘z yo‘lingizni toping."
                }
              </T>
            </p>
            <div className="hero-actions">
              <Link href="/problems" className="button primary">
                <T>{"Masalalarni kashf etish "}</T>
                <Icon name="arrow" size={20} />
              </Link>
              <Link href="/learn" className="text-link">
                <T>{"Qayerdan boshlayman? "}</T>
                <Icon name="external" size={17} />
              </Link>
            </div>
            <div className="hero-footnote">
              <span className="mini-icon">
                <Icon name="sparkle" size={18} />
              </span>{" "}
              <T>{"Qiziquvchanlik — eng yaxshi boshlanish."}</T>
            </div>
          </div>
          <div className="hero-visual">
            <img
              src="/art/math-sculpture.png"
              lang="uz"
              alt="Binafsha geometrik tugun, to‘q sariq ko‘pyoqlik va shaffof matematik jismlar"
              width="1536"
              height="1024"
              fetchPriority="high"
            />
            <span className="art-label">
              <Icon name="compass" size={17} />
              <T>{" MATEMATIKA — BU SAN’AT HAM."}</T>
            </span>
            <QuickQuestion />
          </div>
        </section>
        <PlatformStats />
        <Reveal className="section">
          <SectionHead
            kicker="O‘Z YO‘LINGIZNI TANLANG"
            title="Qiziqishingiz qayerdan boshlanadi?"
          />
          <div className="topic-grid">
            {topics.map((topic, i) => (
              <Link
                className={`topic-card ${topic.color}`}
                href={`/problems?topic=${topic.id}`}
                key={topic.id}
              >
                <div className="topic-card-top">
                  <Icon name={topic.id} size={40} weight="duotone" />
                  <span>0{i + 1}</span>
                </div>
                <div className="topic-formula">
                  <MathText>{topic.formula}</MathText>
                </div>
                <h3>
                  <T>{topic.name}</T>
                </h3>
                <p>
                  <T>{topic.description}</T>
                </p>
                <div className="topic-bottom">
                  <span>
                    {problems.filter(p=>p.topic===topic.id).length} <T>ta masala</T>
                  </span>
                  <Icon name="external" size={20} />
                </div>
              </Link>
            ))}
          </div>
        </Reveal>
        <Reveal className="section">
          <SectionHead
            kicker="KICHIK QADAM. YANGI G‘OYA."
            title="Bugun nimani yechamiz?"
            href="/problems"
            label="Barcha masalalar"
          />
          <div className="problem-grid home-problems">
            {problems.slice(0,3).map((problem) => (
              <CatalogCard key={problem.slug} item={problem} />
            ))}
          </div>
        </Reveal>
        <Reveal className="section">
          <SquareLab />
        </Reveal>
        <Reveal className="section">
          <SectionHead
            kicker="BILIMNI QADAMMA-QADAM QURING"
            title="Avval tushuning. Keyin yeching."
            href="/learn"
            label="Barcha darslar"
          />
          <div className="lesson-preview-grid">
            {lessons.slice(0, 2).map((lesson, i) => (
              <Link
                key={lesson.id}
                href={`/learn/${lesson.slug}/`}
                className={`lesson-preview ${i === 0 ? "coral" : "blue"}`}
              >
                <div className="lesson-preview-art">
                  <MathText block>{topicFor(lesson.topic).formula}</MathText>
                  <Icon name={topicFor(lesson.topic).id} size={70} weight="duotone" />
                </div>
                <div>
                  <p className="eyebrow">
                    <T>{"QISQA DARS · "}</T>
                    {lesson.duration}
                    <T>{" DAQIQA"}</T>
                  </p>
                  <h3 lang="uz">{lesson.title}</h3>
                  <p lang="uz">{lesson.summary}</p>
                  <span className="text-link">
                    <T>{"Darsni boshlash "}</T>
                    <Icon name="arrow" size={18} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Reveal>
        <Reveal className="section">
          <div className="contest-banner">
            <div className="contest-banner-icon">
              <Icon name="trophy" size={64} weight="duotone" />
            </div>
            <div>
              <span className="eyebrow">
                <T>{"KEYINGI MANZIL — YANGI CHAQIRIQ"}</T>
              </span>
              <h2>
                <T>{"O‘zingizni sinashga tayyormisiz?"}</T>
              </h2>
              <p>
                <T>
                  {"Vaqtli testlarda bilimingizni sinab, natijalaringizni kuzating."}
                </T>
              </p>
            </div>
            <Link href="/tests" className="button dark">
              <T>{"Namunalarni ko‘rish "}</T>
              <Icon name="arrow" size={18} />
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
