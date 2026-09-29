"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { usePreferences } from "./preferences";

export default function NavigationIndicator() {
  const pathname = usePathname();
  const { t } = usePreferences();
  const [active, setActive] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setActive(false);
    if (timer.current) clearTimeout(timer.current);
  }, [pathname]);

  useEffect(() => {
    function finish() {
      setActive(false);
      if (timer.current) clearTimeout(timer.current);
    }
    function begin(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target instanceof Element ? event.target.closest("a") : null;
      if (!target || target.target === "_blank" || target.hasAttribute("download")) return;
      const href = target.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
      const next = new URL(target.href, window.location.href);
      if (next.origin !== window.location.origin || next.href === window.location.href) return;
      setActive(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(finish, 1400);
    }
    document.addEventListener("click", begin, true);
    window.addEventListener("popstate", finish);
    return () => {
      document.removeEventListener("click", begin, true);
      window.removeEventListener("popstate", finish);
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  return (
    <div className={`math-route-loader${active ? " is-active" : ""}`} role="status" aria-live="polite" aria-label={active ? t("Sahifa ochilmoqda") : undefined}>
      <span aria-hidden="true">∑</span>
    </div>
  );
}
