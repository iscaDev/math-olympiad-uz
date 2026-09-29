"use client";
import { T, usePreferences } from "@/components/preferences";
import Link from "next/link";
import Icon from "./icons";
import MathText from "./math";
import type { Problem } from "@/lib/content";
import {topicFor} from "@/lib/topics";
export function Intro({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="page-intro">
      <p className="eyebrow">
        <span />
        <T>{eyebrow}</T>
      </p>
      <h1>
        <T>{title}</T>
      </h1>
      <div className="intro-copy">{children}</div>
    </div>
  );
}
export function SectionHead({
  kicker,
  title,
  href,
  label,
}: {
  kicker: string;
  title: string;
  href?: string;
  label?: string;
}) {
  return (
    <div className="section-head">
      <div>
        <p className="eyebrow">
          <T>{kicker}</T>
        </p>
        <h2>
          <T>{title}</T>
        </h2>
      </div>
      {href && (
        <Link className="text-link" href={href}>
          <T>{label ?? ""}</T>
          <Icon name="arrow" size={18} />
        </Link>
      )}
    </div>
  );
}
export function ProblemCard({ problem }: { problem: Problem }) {
  const topic = topicFor(problem.topic);
  return (
    <Link
      className={`problem-card ${topic.color}`}
      href={`/problems/${problem.slug}`}
    >
      <div className="card-top">
        <span className="topic-label">
          <Icon name={problem.topic} size={17} />
          <T>{topic.name}</T>
        </span>
        <span className="problem-id">/{problem.id}</span>
      </div>
      <div className="card-equation">
        <MathText>{problem.formula}</MathText>
      </div>
      <div className="card-body">
        <span
          className={`level level-${problem.level === "Boshlang‘ich" ? "1" : problem.level === "O‘rta" ? "2" : "3"}`}
        >
          <T>{problem.level}</T>
        </span>
        <h3 lang="uz">{problem.title}</h3>
        <p lang="uz">{problem.description}</p>
        <div className="card-bottom">
          <span>
            <Icon name="clock" size={15} />
            {problem.minutes}
            <T>{" daqiqa"}</T>
          </span>
          <span className="round-arrow">
            <Icon name="arrow" size={19} />
          </span>
        </div>
      </div>
    </Link>
  );
}
export function BreadCrumb({
  section,
  href,
  title,
}: {
  section: string;
  href: string;
  title: string;
}) {
  const { t } = usePreferences();
  return (
    <nav className="breadcrumb" aria-label={t("Sahifa yo‘li")}>
      <Link href={href}>
        <T>{section}</T>
      </Link>
      <Icon name="right" size={13} />
      <span lang="uz">{title}</span>
    </nav>
  );
}
