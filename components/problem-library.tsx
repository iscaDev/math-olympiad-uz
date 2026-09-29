"use client";
import { T, usePreferences } from "@/components/preferences";

import { useEffect, useMemo, useState } from "react";
import { problems, topics } from "@/lib/content";
import { ProblemCard } from "./ui";
import Icon from "./icons";
export default function ProblemLibrary() {
  const { t: translate, language } = usePreferences();
  const [topic, setTopic] = useState("all");
  const [level, setLevel] = useState("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("default");
  useEffect(() => {
    const update = () => {
      const value = new URLSearchParams(window.location.search).get("topic");
      setTopic(topics.some((t) => t.id === value) ? value! : "all");
    };
    update();
    window.addEventListener("popstate", update);
    return () => window.removeEventListener("popstate", update);
  }, []);
  function chooseTopic(value: string) {
    setTopic(value);
    const url = new URL(window.location.href);
    if (value === "all") url.searchParams.delete("topic");
    else url.searchParams.set("topic", value);
    window.history.replaceState({}, "", url);
  }
  function reset() {
    chooseTopic("all");
    setLevel("all");
    setQuery("");
    setSort("default");
  }
  const filtered = useMemo(() => {
    const normalized = query
      .toLocaleLowerCase()
      .trim()
      .replace(/[‘’ʻʼ`']/g, "");
    const rows = problems.filter(
      (p) =>
        (topic === "all" || p.topic === topic) &&
        (level === "all" || p.level === level) &&
        `${p.title} ${p.description} ${p.id}`
          .toLocaleLowerCase()
          .replace(/[‘’ʻʼ`']/g, "")
          .includes(normalized),
    );
    if (sort === "time") rows.sort((a, b) => a.minutes - b.minutes);
    if (sort === "difficulty") {
      const levels = ["Boshlang‘ich", "O‘rta", "Murakkab"];
      rows.sort((a, b) => levels.indexOf(a.level) - levels.indexOf(b.level));
    }
    return rows;
  }, [topic, level, query, sort]);
  return (
    <div className="library-layout">
      <aside className="library-sidebar">
        <h2>
          <Icon name="filter" size={18} />
          <T>{" Yo‘nalishlar"}</T>
        </h2>
        <div className="topic-filters">
          <button
            className={topic === "all" ? "selected" : ""}
            onClick={() => chooseTopic("all")}
            aria-pressed={topic === "all"}
          >
            <Icon name="compass" />
            <T>{"Barcha yo‘nalishlar"}</T>
            <span>12</span>
          </button>
          {topics.map((t) => (
            <button
              className={`${topic === t.id ? "selected" : ""} ${t.color}`}
              key={t.id}
              aria-pressed={topic === t.id}
              onClick={() => chooseTopic(t.id)}
            >
              <Icon name={t.id} />
              <T>{t.name}</T>
              <span>3</span>
            </button>
          ))}
        </div>
        <div className="level-filter">
          <label htmlFor="level-filter">
            <T>{"Qiyinlik darajasi"}</T>
          </label>
          <select
            id="level-filter"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            <option value="all">
              <T>{"Barcha darajalar"}</T>
            </option>
            {["Boshlang‘ich", "O‘rta", "Murakkab"].map((l) => (
              <option key={l} value={l}>
                {translate(l)}
              </option>
            ))}
          </select>
        </div>
        <div className="sidebar-tip">
          <Icon name="hint" size={26} weight="duotone" />
          <h3>
            <T>{"Javobga shoshilmang."}</T>
          </h3>
          <p>
            <T>
              {
                "Qiyin bo‘lsa, birinchi ishorani oching. Kichik kuzatuv ham katta qadam."
              }
            </T>
          </p>
        </div>
      </aside>
      <div className="library-main">
        <div className="library-toolbar">
          <label className="search-box">
            <Icon name="search" size={20} />
            <input
              aria-label={translate("Masala qidirish")}
              placeholder={translate("Masala nomi yoki raqami…")}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button
                aria-label={translate("Qidiruvni tozalash")}
                onClick={() => setQuery("")}
              >
                <Icon name="close" size={18} />
              </button>
            )}
          </label>
          <select
            aria-label={translate("Masalalarni tartiblash")}
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="default">
              <T>{"Standart tartib"}</T>
            </option>
            <option value="time">
              <T>{"Vaqt bo‘yicha"}</T>
            </option>
            <option value="difficulty">
              <T>{"Osondan qiyinga"}</T>
            </option>
          </select>
        </div>
        <div className="results-meta">
          <p aria-live="polite">
            <strong>{filtered.length}</strong>{" "}
            {language === "en" && filtered.length === 1
              ? "problem found"
              : translate("ta masala topildi")}
          </p>
          {(topic !== "all" || level !== "all" || query) && (
            <button className="text-link" onClick={reset}>
              <T>{"Filtrlarni tozalash "}</T>
              <Icon name="reset" size={16} />
            </button>
          )}
          <span className="tiny">
            <T>{"Namunaviy to‘plam"}</T>
          </span>
        </div>
        {filtered.length ? (
          <div className="problem-grid library-grid">
            {filtered.map((p) => (
              <ProblemCard key={p.id} problem={p} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Icon name="search" size={40} />
            <h2>
              <T>{"Hozircha mos masala yo‘q."}</T>
            </h2>
            <p>
              <T>{"Boshqa so‘z yoki yo‘nalishni tanlab ko‘ring."}</T>
            </p>
            <button className="button primary" onClick={reset}>
              <T>{"Barcha masalalarni ko‘rish"}</T>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
