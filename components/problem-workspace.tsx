"use client";
import { T, usePreferences } from "@/components/preferences";

import { useState } from "react";
import Link from "next/link";
import type { Problem } from "@/lib/content";
import { topicFor, problems } from "@/lib/content";
import MathText from "./math";
import Icon from "./icons";
export default function ProblemWorkspace({ problem }: { problem: Problem }) {
  const { t } = usePreferences();
  const [hintCount, setHintCount] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<
    "correct" | "incorrect" | "empty" | null
  >(null);
  const topic = topicFor(problem.topic);
  const related = problems
    .filter((p) => p.topic === problem.topic && p.slug !== problem.slug)
    .slice(0, 2);
  function check(e: React.FormEvent) {
    e.preventDefault();
    if (!answer.trim() || !Number.isFinite(Number(answer.replace(",", ".")))) {
      setFeedback("empty");
      return;
    }
    setFeedback(
      Number(answer.replace(",", ".")) === problem.answer
        ? "correct"
        : "incorrect",
    );
  }
  return (
    <div className="problem-workspace">
      <article>
        <div className="problem-heading">
          <span className={`topic-label ${topic.color}`}>
            <Icon name={problem.topic} size={18} />
            <T>{topic.name}</T>
          </span>
          <span className="level">
            <T>{problem.level}</T>
          </span>
          <span className="small-meta">
            <Icon name="clock" size={16} />
            {problem.minutes}
            <T>{" daqiqa"}</T>
          </span>
        </div>
        <h1 className="problem-title" lang="uz">
          {problem.title}
        </h1>
        <p className="problem-subtitle">
          <T>{"MASALA / "}</T>
          {problem.id} <span>·</span>
          <T>{" Mustaqil mashq uchun namuna"}</T>
        </p>
        <section className={`statement-box ${topic.color}`}>
          <p className="eyebrow">
            <T>{"MASALA SHARTI"}</T>
          </p>
          <p className="statement-text" lang="uz">
            {problem.statement}
          </p>
          <MathText block>{problem.formula}</MathText>
        </section>
        {problem.answer !== undefined ? (
          <form className="answer-form" onSubmit={check}>
            <label htmlFor="answer">
              <T>{"Javobingizni sinab ko‘ring"}</T>
            </label>
            <div>
              <input
                id="answer"
                inputMode="decimal"
                value={answer}
                onChange={(e) => {
                  setAnswer(e.target.value);
                  setFeedback(null);
                }}
                placeholder={t("Son kiriting")}
                autoComplete="off"
              />
              <button className="button primary" type="submit">
                <T>{"Tekshirish "}</T>
                <Icon name="check" size={18} />
              </button>
            </div>
            <p
              className={`answer-feedback ${feedback === "correct" ? "positive" : ""}`}
              aria-live="polite"
            >
              <T>
                {feedback === "correct"
                  ? "To‘g‘ri! Endi yechimdagi fikr yo‘lini ham taqqoslab ko‘ring."
                  : feedback === "incorrect"
                    ? "Hali mos kelmadi. Shartni yana o‘qing yoki ishoradan foydalaning."
                    : feedback === "empty"
                      ? "Javobni son ko‘rinishida kiriting."
                      : "Mahalliy namuna: javobingiz saqlanmaydi."}
              </T>
            </p>
          </form>
        ) : (
          <div className="proof-note">
            <Icon name="pencil" size={21} />
            <p>
              <T>
                {
                  "Bu isbotlash masalasi. Fikrlaringizni qog‘ozga yozing, keyin namunaviy yechim bilan taqqoslang."
                }
              </T>
            </p>
          </div>
        )}
        <section className="hints-box">
          <div className="flex items-center justify-between gap-3">
            <h2>
              <Icon name="hint" size={22} weight="duotone" />
              <T>{" Bir oz yo‘l-yo‘riq kerakmi?"}</T>
            </h2>
            <span>
              {hintCount} / {problem.hints.length}
            </span>
          </div>
          {problem.hints.slice(0, hintCount).map((hint, i) => (
            <p key={hint} className="hint-text">
              <strong>
                {i + 1}
                <T>{"-ishora"}</T>
              </strong>
              <span lang="uz">{hint}</span>
            </p>
          ))}
          {hintCount < problem.hints.length ? (
            <button
              onClick={() => setHintCount(hintCount + 1)}
              className="text-link"
            >
              <T>
                {hintCount === 0
                  ? "Birinchi ishorani ochish"
                  : "Keyingi ishorani ochish"}
              </T>
              <Icon name="down" size={16} />
            </button>
          ) : (
            <button className="text-link" onClick={() => setHintCount(0)}>
              <T>{"Ishoralarni yopish "}</T>
              <Icon name="close" size={16} />
            </button>
          )}
        </section>
        <details className="solution">
          <summary>
            <span>
              <Icon name="book" size={22} />
              <T>{" To‘liq yechim va tushuntirish"}</T>
            </span>
            <Icon name="down" size={20} />
          </summary>
          <div className="solution-body">
            {problem.solution.map((step, i) => (
              <section key={step.title} lang="uz">
                <span className="step-number">0{i + 1}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                  {step.formula && <MathText block>{step.formula}</MathText>}
                </div>
              </section>
            ))}
            <div className="takeaway">
              <Icon name="sparkle" size={24} />
              <div>
                <h3>
                  <T>{"O‘zingiz bilan olib qoling"}</T>
                </h3>
                <p lang="uz">{problem.takeaway}</p>
              </div>
            </div>
          </div>
        </details>
        <div className="problem-next">
          <Link href="/problems" className="text-link">
            <Icon name="back" size={18} />
            <T>{" Kutubxonaga qaytish"}</T>
          </Link>
          <Link href={`/learn?lesson=${problem.topic}`} className="text-link">
            <T>{"Mavzuni o‘rganish "}</T>
            <Icon name="arrow" size={18} />
          </Link>
        </div>
      </article>
      <aside>
        <div className="notepad">
          <div>
            <Icon name="pencil" size={22} />
            <h2>
              <T>{"Fikr daftari"}</T>
            </h2>
          </div>
          <p>
            <T>{"G‘oyangizni shu yerda qayd eting."}</T>
          </p>
          <textarea
            aria-label={t("Masala uchun qaydlar")}
            placeholder={t("Avval kichik holatlarni sinab ko‘rsam…")}
            rows={7}
          />
          <small>
            <T>{"Qaydlar saqlanmaydi. Sahifani yangilasangiz, yo‘qoladi."}</T>
          </small>
        </div>
        <div className="related">
          <p className="eyebrow">
            <T>{"SHU MAVZUDA YANA"}</T>
          </p>
          {related.map((p) => (
            <Link key={p.slug} href={`/problems/${p.slug}`}>
              <span>
                {p.title}
                <small>
                  <T>{p.level}</T> · {p.minutes}
                  <T>{" daqiqa"}</T>
                </small>
              </span>
              <Icon name="arrow" size={18} />
            </Link>
          ))}
        </div>
        <div className="sidebar-tip">
          <Icon name="target" size={30} weight="duotone" />
          <h3>
            <T>{"Natijadan oldin — tushunish."}</T>
          </h3>
          <p>
            <T>
              {
                "Bir yechimni to‘liq tushunish o‘nta javobni bilishdan foydaliroq."
              }
            </T>
          </p>
        </div>
      </aside>
    </div>
  );
}
