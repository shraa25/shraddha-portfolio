"use client";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const GOALS = [
  { id: "AI Engineering", x: 0.5, y: 0.15, active: true },
  { id: "Computer Vision", x: 0.2, y: 0.35, active: false },
  { id: "NLP", x: 0.75, y: 0.3, active: false },
  { id: "LLMs", x: 0.85, y: 0.55, active: false },
  { id: "MLOps", x: 0.35, y: 0.6, active: false },
  { id: "FastAPI", x: 0.15, y: 0.65, active: false },
  { id: "Docker", x: 0.6, y: 0.75, active: false },
  { id: "Kubernetes", x: 0.4, y: 0.85, active: false },
];

const EDGES: [number, number][] = [
  [0, 1], [0, 2], [0, 3], [1, 4], [2, 3],
  [3, 5], [4, 6], [5, 6], [6, 7],
];

export default function RoadmapConstellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current!;
    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d")!;

    const nodes = GOALS.map((g) => ({ ...g, px: g.x * W, py: g.y * H }));
    let pulseT = 0;
    let raf: number;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Edges
      EDGES.forEach(([a, b]) => {
        ctx.beginPath();
        ctx.moveTo(nodes[a].px, nodes[a].py);
        ctx.lineTo(nodes[b].px, nodes[b].py);
        ctx.strokeStyle = "rgba(124,58,237,0.1)";
        ctx.lineWidth = 0.8;
        ctx.setLineDash([4, 6]);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Creeping signal on first edge (0→1)
      if (!reduced) {
        pulseT = (pulseT + 0.004) % 1;
        const [a, b] = EDGES[0];
        const px = nodes[a].px + (nodes[b].px - nodes[a].px) * pulseT;
        const py = nodes[a].py + (nodes[b].py - nodes[a].py) * pulseT;
        const grd = ctx.createRadialGradient(px, py, 0, px, py, 12);
        grd.addColorStop(0, "rgba(34,211,238,0.9)");
        grd.addColorStop(1, "rgba(34,211,238,0)");
        ctx.beginPath();
        ctx.arc(px, py, 12, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      }

      // Nodes
      nodes.forEach((n) => {
        const r = n.active ? 8 : 5;
        const alpha = n.active ? 0.9 : 0.2;
        const color = n.active ? "34,211,238" : "124,58,237";

        if (n.active && !reduced) {
          const grd = ctx.createRadialGradient(n.px, n.py, 0, n.px, n.py, 20);
          grd.addColorStop(0, "rgba(34,211,238,0.3)");
          grd.addColorStop(1, "rgba(34,211,238,0)");
          ctx.beginPath();
          ctx.arc(n.px, n.py, 20, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(n.px, n.py, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color},${alpha})`;
        ctx.fill();
        ctx.strokeStyle = `rgba(${color},${alpha * 0.6})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.font = `${n.active ? 600 : 400} 10px monospace`;
        ctx.fillStyle = `rgba(226,232,240,${n.active ? 0.9 : 0.3})`;
        ctx.textAlign = "center";
        ctx.fillText(n.id, n.px, n.py + r + 14);
      });

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full"
      style={{ height: 320 }}
      role="img"
      aria-label="Roadmap constellation showing upcoming learning goals"
    />
  );
}
