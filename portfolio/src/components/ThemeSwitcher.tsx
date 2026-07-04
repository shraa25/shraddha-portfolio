"use client";
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme, type Theme } from "@/components/ThemeProvider";

const THEMES: { value: Theme; icon: string; label: string }[] = [
  { value: "dark",  icon: "🌙", label: "Dark"  },
  { value: "light", icon: "☀️", label: "Light" },
  { value: "mono",  icon: "◑",  label: "Mono"  },
];

export default function ThemeSwitcher({ compact = false }: { compact?: boolean }) {
  const { theme, setTheme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 3, width: 60, top: 3, height: 28 });

  useEffect(() => {
    const idx = THEMES.findIndex((t) => t.value === theme);
    const btn = btnRefs.current[idx];
    const container = containerRef.current;
    if (!btn || !container) return;
    const containerRect = container.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    setIndicatorStyle({
      left: btnRect.left - containerRect.left,
      width: btnRect.width,
      top: btnRect.top - containerRect.top,
      height: btnRect.height,
    });
  }, [theme]);

  return (
    <div ref={containerRef} className="theme-switcher" role="group" aria-label="Select theme">
      <div
        className="theme-switcher-indicator"
        style={{
          position: "absolute",
          left: indicatorStyle.left,
          top: indicatorStyle.top,
          width: indicatorStyle.width,
          height: indicatorStyle.height,
        }}
      />
      {THEMES.map((t, i) => (
        <button
          key={t.value}
          ref={(el) => { btnRefs.current[i] = el; }}
          onClick={() => setTheme(t.value)}
          className={`theme-switcher-btn ${theme === t.value ? "active" : ""}`}
          aria-pressed={theme === t.value}
          aria-label={`${t.label} theme`}
          title={`${t.label} theme`}
        >
          <span aria-hidden="true">{t.icon}</span>
          {!compact && <span>{t.label}</span>}
        </button>
      ))}
    </div>
  );
}
