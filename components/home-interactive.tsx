"use client";
import {authClient} from "@/lib/auth-client";
import {useRouter} from "next/navigation";
import { T, usePreferences } from "@/components/preferences";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Icon from "./icons";
import MathText from "./math";
export function QuickQuestion() {
  const {data:session}=authClient.useSession();const router=useRouter();
  const [answer, setAnswer] = useState<number | null>(null);
  return (
    <div className="quick-question">
      <div className="quick-title">
        <span>
          <Icon name="bolt" size={17} weight="fill" />
          <T>{" Bir daqiqalik masala"}</T>
        </span>
        <span className="tiny">
          <T>{"MANTIQ"}</T>
        </span>
      </div>
      <p>
        1, 4, 9, 16, <strong>?</strong>
      </p>
      <div className="quick-answers">
        {[20, 25, 36].map((n) => (
          <button
            key={n}
            onClick={() => {if(!session){router.push("/login/?mode=register&next=%2F");return;}setAnswer(n);}}
            className={answer === n ? (n === 25 ? "correct" : "incorrect") : ""}
            aria-pressed={answer === n}
          >
            {n}
            {answer === n && (
              <Icon name={n === 25 ? "check" : "close"} size={15} />
            )}
          </button>
        ))}
      </div>
      <p
        className={`quick-feedback ${answer === 25 ? "positive" : ""}`}
        aria-live="polite"
      >
        <T>
          {answer === null
            ? "Qonuniyatni topa olasizmi?"
            : answer === 25
              ? "To‘g‘ri! Bular 1², 2², 3², 4², 5²."
              : "Har bir sonni kvadrat sifatida ko‘ring."}
        </T>
      </p>
    </div>
  );
}
const palette = [
  "#9488ff",
  "#f2bc54",
  "#65b9ee",
  "#f47e69",
  "#8ad5bd",
  "#b9a1ef",
  "#eb9cc0",
  "#82a6dc",
];
export function SquareLab() {
  const { language } = usePreferences();
  const [n, setN] = useState(5);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    if (!playing) return;
    if (n >= 8) {
      setPlaying(false);
      return;
    }
    const timer = window.setTimeout(() => setN((value) => value + 1), 1100);
    return () => window.clearTimeout(timer);
  }, [playing, n]);
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const context = c.getContext("2d");
    if (!context) return;
    const draw = () => {
      const width = c.clientWidth;
      const height = c.clientHeight;
      if (width < 112 || height < 112) return;
      const dpr = window.devicePixelRatio || 1;
      c.width = width * dpr;
      c.height = height * dpr;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, width, height);
      const size = Math.min(width - 48, height - 44, 300);
      const step = size / n;
      const x = (width - size) / 2;
      const y = (height - size) / 2;
      for (let row = 0; row < n; row++) {
        for (let col = 0; col < n; col++) {
          context.fillStyle = palette[Math.max(row, col)];
          context.beginPath();
          context.roundRect(
            x + col * step + 2,
            y + row * step + 2,
            step - 4,
            step - 4,
            Math.min(5, step / 6),
          );
          context.fill();
        }
      }
    };
    draw();
    const observer = new ResizeObserver(draw);
    observer.observe(c);
    return () => observer.disconnect();
  }, [n]);
  return (
    <section className="math-lab">
      <div className="lab-copy">
        <p className="eyebrow light">
          <Icon name="compass" size={17} />
          <T>{" MATEMATIKA HARAKATDA"}</T>
        </p>
        <h2>
          <T>{"Formulani shunchaki"}</T>
          <br />
          <T>{"o‘qimang. "}</T>
          <em>
            <T>{"Ko‘ring."}</T>
          </em>
        </h2>
        <p>
          <T>
            {
              "Har bir yangi toq son kvadratga bitta rangli qatlam qo‘shadi. Sonni o‘zgartiring va qonuniyatni kashf eting."
            }
          </T>
        </p>
        <div className="lab-equation">
          <MathText>
            {Array.from({ length: n }, (_, i) => 2 * i + 1).join("+") +
              "=" +
              n +
              "^2"}
          </MathText>
        </div>
        <label htmlFor="square-size" className="slider-label">
          <T>{"Qatlamlar soni "}</T>
          <strong>
            <T>{"n = "}</T>
            {n}
          </strong>
        </label>
        <input
          id="square-size"
          type="range"
          min="1"
          max="8"
          value={n}
          onChange={(e) => {
            setPlaying(false);
            setN(Number(e.target.value));
          }}
        />
        <div className="range-ends">
          <span>1</span>
          <span>8</span>
        </div>
        <button
          className="lab-play"
          onClick={() => {
            if (playing) setPlaying(false);
            else {
              setN(1);
              setPlaying(true);
            }
          }}
          aria-pressed={playing}
        >
          <Icon name={playing ? "pause" : "play"} size={17} weight="fill" />
          <T>{playing ? "To‘xtatish" : "Qatlamlarni jonlantirish"}</T>
        </button>
        <Link href="/problems/toq-sonlar" className="text-link light">
          <T>{"Shu g‘oyaga oid masala "}</T>
          <Icon name="arrow" size={18} />
        </Link>
      </div>
      <div className="lab-visual">
        <div className="lab-visual-heading">
          <span>
            <T>{"TOQ SONLAR YIG‘INDISI"}</T>
          </span>
          <span>
            <T>{"VIZUAL ISBOT"}</T>
          </span>
        </div>
        <canvas
          ref={ref}
          role="img"
          aria-label={
            language === "uz"
              ? `${n} ga ${n} kvadrat. ${n} ta toq son yig‘indisi ${n * n} ga teng.`
              : language === "ru"
                ? `Квадрат ${n} на ${n}. Сумма первых ${n} нечётных чисел равна ${n * n}.`
                : `${n} by ${n} square. The first ${n} odd numbers sum to ${n * n}.`
          }
        />
        <p aria-live="polite">
          <strong>
            {n} × {n}
          </strong>
          <span>
            {n * n}
            <T>{" ta katak · "}</T>
            {n}
            <T>{" ta qatlam"}</T>
          </span>
        </p>
      </div>
    </section>
  );
}
