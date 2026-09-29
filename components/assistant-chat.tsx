"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "./icons";
import MathEditor from "./math-editor";
import MathProse from "./math-prose";
import { usePreferences } from "./preferences";

type Message = { role: "user" | "assistant"; content: string };
const storageKey = "matholympiad-assistant-chat";

function isMessage(value: unknown): value is Message {
  if (!value || typeof value !== "object") return false;
  const item = value as Partial<Message>;
  return (item.role === "user" || item.role === "assistant") && typeof item.content === "string";
}

export default function AssistantChat({ enabled }: { enabled: boolean }) {
  const { t, language } = usePreferences();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [mode, setMode] = useState("hint");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);
  const transcript = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem(storageKey) ?? "[]");
      if (Array.isArray(saved)) setMessages(saved.filter(isMessage).slice(-40));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try { sessionStorage.setItem(storageKey, JSON.stringify(messages)); } catch {}
  }, [messages, ready]);

  useEffect(() => {
    transcript.current?.scrollTo({ top: transcript.current.scrollHeight, behavior: "smooth" });
  }, [messages, pending]);

  function clearChat() {
    setMessages([]);
    setInput("");
    setError("");
    try { sessionStorage.removeItem(storageKey); } catch {}
  }

  async function send(event: React.FormEvent) {
    event.preventDefault();
    const content = input.trim();
    if (pending || !content) return;
    setError("");
    const next: Message[] = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setPending(true);
    try {
      const response = await fetch("/api/assistant/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.slice(-8), mode, language }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Hozir javob olib bo‘lmadi.");
      setMessages((current) => [...current, { role: "assistant", content: result.answer }]);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Hozir javob olib bo‘lmadi.");
    } finally {
      setPending(false);
    }
  }

  const prompts = [
    "Bu masalani nimadan boshlayman?",
    "Isbotimdagi xatoni topishga yordam bering.",
    "Shu tushunchani sodda misol bilan izohlang.",
  ];

  return (
    <div className="assistant-chat-shell">
      <div className="assistant-chat-head">
        <div className="assistant-identity">
          <span className="assistant-avatar"><Icon name="sparkle" size={20} weight="fill" /></span>
          <div><strong>{t("AI yordamchi")}</strong><span>{t("Matematika suhbatiga tayyor")}</span></div>
        </div>
        <div className="assistant-head-actions">
          <label><span>{t("Yordam turi")}</span><select value={mode} onChange={(event) => setMode(event.target.value)}><option value="hint">{t("Avval ishora")}</option><option value="solution">{t("To‘liq yechim so‘rash")}</option></select></label>
          {messages.length > 0 && <button type="button" className="assistant-clear" onClick={clearChat}><Icon name="reset" size={16} /><span>{t("Suhbatni tozalash")}</span></button>}
        </div>
      </div>

      {!enabled && <div className="setup-notice assistant-setup"><Icon name="info" size={22} /><div><strong>{t("AI hali ulanmagan")}</strong><p>{t("OpenAI kaliti serverga qo‘shilgach, yordamchi ishlaydi. Hozir formula yozishni sinab ko‘rishingiz mumkin.")}</p></div></div>}

      <div className="assistant-transcript" ref={transcript} role="log" aria-live="polite" aria-busy={pending}>
        {messages.length === 0 && (
          <div className="assistant-welcome">
            <span className="assistant-welcome-symbol" aria-hidden="true">π</span>
            <h2>{t("Javobdan avval, keyingi qadam.")}</h2>
            <p>{t("Savolingizni yozing yoki formula qo‘shing. Avval ishora beraman; to‘liq yechimni o‘zingiz so‘rashingiz mumkin.")}</p>
            <div className="assistant-prompts">{prompts.map((prompt) => <button type="button" key={prompt} onClick={() => setInput(t(prompt))}>{t(prompt)}</button>)}</div>
          </div>
        )}
        {messages.map((message, index) => (
          <div key={`${message.role}-${index}`} className={`assistant-message-row ${message.role}`}>
            <span className="message-avatar">{message.role === "user" ? t("Siz").slice(0, 1) : <Icon name="sparkle" size={15} weight="fill" />}</span>
            <div className="chat-message"><strong>{t(message.role === "user" ? "Siz" : "AI yordamchi")}</strong><MathProse text={message.content} /></div>
          </div>
        ))}
        {pending && <div className="assistant-message-row assistant"><span className="message-avatar"><Icon name="sparkle" size={15} weight="fill" /></span><div className="chat-message thinking"><strong>{t("AI yordamchi")}</strong><span/><span/><span/><em>{t("Fikrlayapman…")}</em></div></div>}
      </div>

      <form className="assistant-composer" onSubmit={send}>
        <MathEditor label="Savolingiz" value={input} onChange={setInput} rows={3} maxLength={4000} />
        <div className="assistant-compose-actions">
          <p>{t("Matematik formula yozish mumkin")}</p>
          <button type="submit" className="button primary" disabled={!enabled || pending || !input.trim()}>{t("Yuborish")}<Icon name="arrow" size={18} /></button>
        </div>
      </form>
      {error && <p role="status" className="form-message assistant-error">{t(error)}</p>}
      <p className="editor-help assistant-disclaimer">{t("AI xato qilishi mumkin. Isbot va hisoblarni tekshiring. Savol matni OpenAI xizmatiga yuboriladi.")}</p>
    </div>
  );
}
