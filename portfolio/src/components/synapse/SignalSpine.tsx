"use client";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function SignalSpine() {
  const fillRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      if (fillRef.current) fillRef.current.style.height = "100%";
      return;
    }
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct = total > 0 ? (scrolled / total) * 100 : 0;
      if (fillRef.current) fillRef.current.style.height = `${pct}%`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [reduced]);

  return (
    <div className="signal-spine hidden lg:block" aria-hidden="true">
      <div className="signal-spine-track" />
      <div ref={fillRef} className="signal-spine-fill" style={{ height: "0%" }} />
    </div>
  );
}
