"use client";
import { T } from "@/components/preferences";

import { useState } from "react";
import Link from "next/link";
import Icon from "./icons";
import { contests } from "@/lib/contests";
export default function ContestPreview() {
  const [filter, setFilter] = useState("Barchasi");
  return (
    <>
      <div className="preview-notice">
        <Icon name="info" size={22} />
        <p>
          <strong>
            <T>{"Bu bo‘lim — kelajakdagi formatlar namoyishi."}</T>
          </strong>
          <T>
            {
              " Quyidagi test va olimpiadalar haqiqiy tadbir emas. Ishtirok, taymer va baholash hali mavjud emas."
            }
          </T>
        </p>
        <span className="preview-badge">
          <T>{"NAMUNA"}</T>
        </span>
      </div>
      <div className="contest-filters">
        {["Barchasi", "Test", "Olimpiada"].map((f) => (
          <button
            key={f}
            className={filter === f ? "selected" : ""}
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
          >
            <T>
              {f === "Test"
                ? "Testlar"
                : f === "Olimpiada"
                  ? "Olimpiadalar"
                  : f}
            </T>
            <span>{f === "Barchasi" ? 4 : 2}</span>
          </button>
        ))}
      </div>
      <div className="contest-grid">
        {contests
          .filter((c) => filter === "Barchasi" || c.type === filter)
          .map((c) => (
            <article className={`contest-card ${c.color}`} key={c.title}>
              <div className="contest-card-top">
                <span className="contest-emblem">
                  <Icon name={c.icon} size={36} weight="duotone" />
                </span>
                <span className="contest-type">
                  <T>{c.type}</T>
                  <T>{" · NAMUNA"}</T>
                </span>
              </div>
              <h2 lang="uz">{c.title}</h2>
              <p lang="uz">{c.description}</p>
              <div className="contest-facts">
                <span>
                  <Icon name="book" size={17} />
                  {c.count}
                  <T>{" ta "}</T>
                  <T>{c.type === "Test" ? "savol" : "masala"}</T>
                </span>
                <span>
                  <Icon name="clock" size={17} />
                  {c.time}
                  <T>{" daqiqa"}</T>
                </span>
                <span>
                  <T>{c.level}</T>
                </span>
              </div>
              <details className="contest-details">
                <summary>
                  <T>{"Formatni ko‘rish "}</T>
                  <Icon name="down" size={17} />
                </summary>
                <div>
                  <p className="tiny">
                    <T>{"REJALASHTIRILGAN MAVZULAR"}</T>
                  </p>
                  <ol>
                    {c.questions.map((q) => (
                      <li key={q} lang="uz">
                        {q}
                      </li>
                    ))}
                  </ol>
                  <p>
                    <T>
                      {
                        "Bu ro‘yxat format haqida tasavvur beradi; haqiqiy topshiriqlar keyinroq tayyorlanadi."
                      }
                    </T>
                  </p>
                </div>
              </details>
              <button className="button disabled-button" disabled>
                <T>{"Ishtirok etish — tez kunda"}</T>
              </button>
            </article>
          ))}
      </div>
      <section className="contest-explainer">
        <div>
          <p className="eyebrow">
            <T>{"HOZIRDAN TAYYORLANING"}</T>
          </p>
          <h2>
            <T>{"Katta chaqiriqlar"}</T>
            <br />
            <T>{"kichik mashqlardan boshlanadi."}</T>
          </h2>
          <Link href="/problems" className="text-link">
            <T>{"Masalalar kutubxonasiga o‘tish "}</T>
            <Icon name="arrow" size={18} />
          </Link>
        </div>
        <ol>
          {[
            ["Yo‘nalish tanlang", "Qiziqqan mavzuingizdagi masalani oching."],
            [
              "Mustaqil urinib ko‘ring",
              "Bir necha usulni sinang. Ishoraga shoshilmang.",
            ],
            [
              "Yechimni tahlil qiling",
              "Yangi g‘oyani keyingi masalada qo‘llang.",
            ],
          ].map(([title, text], i) => (
            <li key={title}>
              <span>0{i + 1}</span>
              <div>
                <h3>
                  <T>{title}</T>
                </h3>
                <p>
                  <T>{text}</T>
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
