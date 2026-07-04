"use client";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function Footer() {
  return (
    <footer
      aria-label="Site footer"
      className="text-center py-10 px-4 border-t"
      style={{ borderColor: "rgba(124,58,237,0.15)" }}
    >
      <p className="font-mono text-xs mb-1" style={{ color: "rgba(226,232,240,0.35)" }}>
        {"// signal.end — designed & built by "}
        <span style={{ color: "#22D3EE" }}>Shraddha More</span>
      </p>
      <p className="font-mono text-xs" style={{ color: "rgba(124,58,237,0.5)" }}>
        Python Developer · AI &amp; Data Science · © 2026
      </p>
    </footer>
  );
}

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      data-cursor="Top"
      aria-label="Back to top"
      className={`fixed bottom-8 right-8 z-50 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 node-glow ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
      style={{
        background: "linear-gradient(135deg, #7C3AED, #22D3EE)",
        boxShadow: "0 0 20px rgba(124,58,237,0.5)",
      }}
    >
      <ArrowUp className="h-4 w-4 text-white" />
    </button>
  );
}
