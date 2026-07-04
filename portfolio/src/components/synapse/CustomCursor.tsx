"use client";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLCanvasElement>(null);
  const [label, setLabel] = useState("");
  const [hovered, setHovered] = useState(false);
  const reduced = useReducedMotion();
  const pos = useRef({ x: -100, y: -100 });
  const trail = useRef<{ x: number; y: number }[]>([]);

  useEffect(() => {
    if (reduced) return;

    const canvas = trailRef.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    let raf: number;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      trail.current.push({ x: e.clientX, y: e.clientY });
      if (trail.current.length > 18) trail.current.shift();

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 5}px, ${e.clientY - 5}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${e.clientX - 16}px, ${e.clientY - 16}px)`;
      }

      const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
      const interactive = el?.closest("a, button, [data-cursor]");
      if (interactive) {
        setHovered(true);
        setLabel(interactive.getAttribute("data-cursor") || "");
      } else {
        setHovered(false);
        setLabel("");
      }
    };

    const drawTrail = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (trail.current.length > 1) {
        for (let i = 1; i < trail.current.length; i++) {
          const alpha = (i / trail.current.length) * 0.5;
          const t = i / trail.current.length;
          const r = Math.round(124 + (34 - 124) * t);
          const g = Math.round(58 + (211 - 58) * t);
          const b = Math.round(237 + (238 - 237) * t);
          ctx.beginPath();
          ctx.moveTo(trail.current[i - 1].x, trail.current[i - 1].y);
          ctx.lineTo(trail.current[i].x, trail.current[i].y);
          ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
          ctx.lineWidth = 1.5;
          ctx.lineCap = "round";
          ctx.stroke();
        }
      }
      raf = requestAnimationFrame(drawTrail);
    };
    drawTrail();

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <>
      <canvas
        ref={trailRef}
        className="cursor-dot fixed inset-0 pointer-events-none"
        style={{ zIndex: 9998 }}
        aria-hidden="true"
      />
      {/* Core dot */}
      <div
        ref={dotRef}
        className="cursor-dot fixed w-2.5 h-2.5 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, #22D3EE, #7C3AED)",
          boxShadow: "0 0 8px #7C3AED, 0 0 16px rgba(34,211,238,0.5)",
          zIndex: 9999,
          transition: "transform 0.05s linear",
        }}
        aria-hidden="true"
      />
      {/* Hover ring */}
      <div
        ref={ringRef}
        className="cursor-dot fixed pointer-events-none flex items-center justify-center"
        style={{
          width: hovered ? 56 : 32,
          height: hovered ? 56 : 32,
          borderRadius: "50%",
          border: `1px solid rgba(124,58,237,${hovered ? 0.8 : 0.4})`,
          boxShadow: hovered ? "0 0 16px rgba(124,58,237,0.5), 0 0 32px rgba(34,211,238,0.2)" : "none",
          transition: "width 0.2s ease, height 0.2s ease, border-color 0.2s, box-shadow 0.2s",
          zIndex: 9997,
        }}
        aria-hidden="true"
      >
        {label && (
          <span className="text-[9px] font-mono text-cyan-300 whitespace-nowrap px-1 text-center leading-tight">
            {label}
          </span>
        )}
      </div>
    </>
  );
}
