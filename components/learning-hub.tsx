"use client";
import { T, usePreferences } from "@/components/preferences";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { lessons, topicFor } from "@/lib/content";
import Icon from "./icons";
import MathText from "./math";
function LessonQuiz({ lesson }: { lesson: (typeof lessons)[number] }) {
  const { t } = usePreferences();
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <div className="lesson-quiz">
      <p className="eyebrow">
        <Icon name="bolt" size={16} />
        <T>{" TUSHUNGANINGIZNI SINANG"}</T>
      </p>
      <h3 lang="uz">{lesson.quiz}</h3>
      <div className="quiz-options">
        {lesson.choices.map((choice, i) => (
          <button
            className={
              selected === i
                ? i === lesson.correct
                  ? "correct"
                  : "incorrect"
                : ""
            }
            key={choice}
            onClick={() => setSelected(i)}
            aria-pressed={selected === i}
          >
            <span>{String.fromCharCode(65 + i)}</span>
            <span lang="uz">{choice}</span>
            {selected === i && (
              <Icon name={i === lesson.correct ? "check" : "close"} size={18} />
            )}
          </button>
        ))}
      </div>
      <p
        aria-live="polite"
        className={selected === lesson.correct ? "positive" : ""}
      >
        {selected === null ? (
          t("Bitta javobni tanlang.")
        ) : selected === lesson.correct ? (
          <>
            {t("To‘g‘ri!")} <span lang="uz">{lesson.explanation}</span>
          </>
        ) : (
          t("Yana bir bor o‘ylab ko‘ring. Yuqoridagi misol yordam beradi.")
        )}
      </p>
    </div>
  );
}
export default function LearningHub() {
  const [active, setActive] = useState("algebra");
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("lesson");
    if (lessons.some((l) => l.id === id)) setActive(id!);
  }, []);
  const lesson = lessons.find((l) => l.id === active)!;
  const topic = topicFor(lesson.topic);
  function choose(id: string) {
    setActive(id);
    window.history.replaceState({}, "", `/learn/?lesson=${id}`);
    requestAnimationFrame(() =>
      heading.current?.focus({ preventScroll: true }),
    );
    document.getElementById("lesson-content")?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
      block: "start",
    });
  }
  return (
    <>
      <div className="learning-cards">
        {lessons.map((l, i) => {
          const t = topicFor(l.topic);
          return (
            <button
              key={l.id}
              className={`learning-card ${t.color} ${l.id === active ? "active" : ""}`}
              onClick={() => choose(l.id)}
              aria-pressed={l.id === active}
            >
              <div className="learning-card-top">
                <span className="course-index">0{i + 1}</span>
                <Icon name={l.topic} size={34} weight="duotone" />
              </div>
              <p>
                <T>{t.name}</T>
              </p>
              <h2 lang="uz">{l.title}</h2>
              <span className="course-bottom">
                <span>
                  <Icon name="clock" size={15} />
                  {l.minutes}
                  <T>{" daqiqa"}</T>
                </span>
                <span>
                  <T>{l.id === active ? "Ochiq dars" : "Darsni ochish"}</T>{" "}
                  <Icon name="arrow" size={17} />
                </span>
              </span>
            </button>
          );
        })}
      </div>
      <div className="lesson-layout" id="lesson-content">
        <aside className="lesson-outline">
          <p className="eyebrow">
            <T>{"USHBU DARSDA"}</T>
          </p>
          <ol>
            {lesson.parts.map((p, i) => (
              <li key={p.title} lang="uz">
                <span>{i + 1}</span>
                {p.title}
              </li>
            ))}
            <li>
              <span>
                <Icon name="check" size={14} />
              </span>
              <T>{"Kichik mashq"}</T>
            </li>
          </ol>
          <div className="sidebar-tip">
            <Icon name="book" size={26} weight="duotone" />
            <h3>
              <T>{"O‘qish + mashq"}</T>
            </h3>
            <p>
              <T>
                {
                  "G‘oyani o‘zlashtirish uchun darsdan so‘ng unga oid masalani yeching."
                }
              </T>
            </p>
          </div>
        </aside>
        <article className="lesson-article">
          <span className={`topic-label ${topic.color}`}>
            <Icon name={lesson.topic} size={17} />
            <T>{topic.name}</T>
          </span>
          <h2 lang="uz" ref={heading} tabIndex={-1}>
            {lesson.title}
          </h2>
          <p className="lesson-deck" lang="uz">
            {lesson.description}
          </p>
          <div className={`lesson-formula ${topic.color}`}>
            <MathText block>{lesson.formula}</MathText>
          </div>
          {lesson.parts.map((part, i) => (
            <section key={part.title} lang="uz">
              <h3>
                <span>0{i + 1}</span>
                {part.title}
              </h3>
              <p>{part.text}</p>
            </section>
          ))}
          <LessonQuiz key={lesson.id} lesson={lesson} />
          <div className="lesson-practice">
            <div>
              <p className="eyebrow">
                <T>{"ENDI NAVBAT SIZDA"}</T>
              </p>
              <h3>
                <T>{"G‘oyani masalada sinab ko‘ring."}</T>
              </h3>
            </div>
            <Link
              className="button primary"
              href={`/problems/${lesson.problem}`}
            >
              <T>{"Masalani ochish "}</T>
              <Icon name="arrow" size={18} />
            </Link>
          </div>
        </article>
      </div>
    </>
  );
}
