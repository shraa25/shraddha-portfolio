"use client";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function Footer() {
  return (
    <footer className="text-center py-8 px-4 border-t border-border text-muted-foreground text-sm space-y-1">
      <p>Designed &amp; Developed by <span className="text-purple-400 font-semibold">Shraddha More</span></p>
      <p className="text-purple-400 text-xs">Python Developer | AI &amp; Data Science Enthusiast</p>
      <p className="text-xs">© 2026 All Rights Reserved</p>
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
      className={`fixed bottom-8 right-8 z-50 w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-purple-500 text-white flex items-center justify-center shadow-lg shadow-violet-500/40 transition-all duration-300 hover:-translate-y-1 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5 pointer-events-none"}`}
    >
      <ArrowUp className="h-4 w-4" />
    </button>
  );
}
