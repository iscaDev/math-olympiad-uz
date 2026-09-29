"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import BrandMark from "./brand-mark";
import Icon from "./icons";
import { usePreferences } from "./preferences";
export default function AuthPreview({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [mode, setMode] = useState<"login" | "register">("login");
  const { t } = usePreferences();
  useEffect(() => {
    const node = dialog.current;
    if (!node || !open) return;
    setMode("login");
    node.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      node.close();
      document.body.style.overflow = previous;
    };
  }, [open]);
  return (
    <dialog
      ref={dialog}
      className="auth-dialog"
      aria-labelledby="auth-title"
      aria-describedby="auth-notice"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="auth-content">
        <div className="auth-top">
          <BrandMark />
          <button
            className="header-tool"
            aria-label={t("Yopish")}
            onClick={onClose}
            autoFocus
          >
            <Icon name="close" size={20} />
          </button>
        </div>
        <p className="eyebrow">MATH OLYMPIAD UZ</p>
        <h2 id="auth-title">
          {t(
            mode === "login"
              ? "Yana bir kashfiyotga tayyormisiz?"
              : "Birinchi qadamingiz shu yerdan.",
          )}
        </h2>
        <div className="auth-tabs" aria-label={t("Hisobga kirish usuli")}>
          <button
            aria-pressed={mode === "login"}
            onClick={() => setMode("login")}
          >
            {t("Kirish")}
          </button>
          <button
            aria-pressed={mode === "register"}
            onClick={() => setMode("register")}
          >
            {t("Ro‘yxatdan o‘tish")}
          </button>
        </div>
        <div className="auth-notice" id="auth-notice">
          <Icon name="info" size={19} />
          <p>
            {t(
              "Bu — dizayn namunasi. Hozircha hisob yaratilmaydi va ma’lumot kiritish talab qilinmaydi.",
            )}
          </p>
        </div>
        <div className="auth-fields" key={mode}>
          {mode === "register" && (
            <label>
              {t("Ismingiz")}
              <input placeholder={t("Ism va familiya")} disabled />
            </label>
          )}
          <label>
            {t("Elektron pochta")}
            <input type="email" placeholder="name@example.com" disabled />
          </label>
          <label>
            {t("Parol")}
            <input type="password" placeholder="••••••••" disabled />
          </label>
        </div>
        <button className="auth-submit" disabled>
          <Icon name="lock" size={17} />
          {t(
            mode === "login"
              ? "Kirish — tez kunda"
              : "Ro‘yxatdan o‘tish — tez kunda",
          )}
        </button>
        <Link href="/problems" className="auth-guest" onClick={onClose}>
          {t("Hozircha masalalarni ko‘rish")}
          <Icon name="arrow" size={17} />
        </Link>
      </div>
    </dialog>
  );
}
