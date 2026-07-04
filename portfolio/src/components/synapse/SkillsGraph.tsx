"use client";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const CATEGORIES = [
  {
    label: "Languages",
    color: "124,58,237",
    nodes: [
      { id: "Python", size: 22 },
      { id: "JavaScript", size: 16 },
      { id: "TypeScript", size: 15 },
      { id: "SQL", size: 14 },
      { id: "HTML/CSS", size: 13 },
    ],
  },
  {
    label: "ML / DL",
    color: "59,130,246",
    nodes: [
      { id: "Machine Learning", size: 20 },
      { id: "TensorFlow", size: 17 },
      { id: "scikit-learn", size: 16 },
      { id: "Pandas", size: 18 },
      { id: "NumPy", size: 17 },
      { id: "Deep Learning", size: 15 },
    ],
  },
  {
    label: "Web",
    color: "34,211,238",
    nodes: [
      { id: "Django", size: 18 },
      { id: "Flask", size: 17 },
      { id: "REST APIs", size: 16 },
      { id: "Next.js", size: 14 },
    ],
  },
  {
    label: "Tools",
    color: "168,85,247",
    nodes: [
      { id: "Git/GitHub", size: 18 },
      { id: "AWS", size: 15 },
      { id: "MySQL", size: 15 },
      { id: "Docker", size: 12 },
    ],
  },
];

interface Node {
  id: string; label: string; x: number; y: number;
  vx: number; vy: number; size: number;
  color: string; catIdx: number;
  connections: number[];
}

export default function SkillsGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState<string | null>(null);
  const hoveredRef = useRef<string | null>(null);
  const nodesRef = useRef<Node[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    let raf: number;

    const setup = () => {
      cancelAnimationFrame(raf);
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      canvas.width = W;
      canvas.height = H;
      const ctx = canvas.getContext("2d")!;

      const centers = [
        { x: W * 0.25, y: H * 0.3 },
        { x: W * 0.65, y: H * 0.28 },
        { x: W * 0.25, y: H * 0.72 },
        { x: W * 0.68, y: H * 0.72 },
      ];

      const nodes: Node[] = [];
      CATEGORIES.forEach((cat, ci) => {
        cat.nodes.forEach((n) => {
          const angle = Math.random() * Math.PI * 2;
          const dist = 40 + Math.random() * 60;
          nodes.push({
            id: n.id, label: n.id,
            x: centers[ci].x + Math.cos(angle) * dist,
            y: centers[ci].y + Math.sin(angle) * dist,
            vx: 0, vy: 0,
            size: n.size,
            color: cat.color,
            catIdx: ci,
            connections: [],
          });
        });
      });

      let start = 0;
      CATEGORIES.forEach((cat) => {
        const end = start + cat.nodes.length;
        for (let i = start; i < end; i++) {
          for (let j = i + 1; j < end; j++) {
            nodes[i].connections.push(j);
            nodes[j].connections.push(i);
          }
        }
        start = end;
      });

      nodesRef.current = nodes;

      const draw = () => {
        ctx.clearRect(0, 0, W, H);
        const hov = hoveredRef.current;

        nodes.forEach((n) => {
          n.connections.forEach((ci) => {
            const other = nodes[ci];
            const isActive = hov === n.id || hov === other.id;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = isActive
              ? `rgba(${n.color},0.5)`
              : `rgba(${n.color},0.12)`;
            ctx.lineWidth = isActive ? 1.2 : 0.6;
            ctx.stroke();
          });
        });

        nodes.forEach((n) => {
          const isHov = hov === n.id;
          const isConnected = hov
            ? nodes.find((x) => x.id === hov)?.connections.includes(nodes.indexOf(n))
            : false;
          const alpha = hov ? (isHov ? 1 : isConnected ? 0.7 : 0.25) : 0.75;
          const scale = isHov ? 1.4 : 1;

          if (isHov) {
            const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.size * 2.5);
            grd.addColorStop(0, `rgba(${n.color},0.4)`);
            grd.addColorStop(1, `rgba(${n.color},0)`);
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.size * 2.5, 0, Math.PI * 2);
            ctx.fillStyle = grd;
            ctx.fill();
          }

          ctx.beginPath();
          ctx.arc(n.x, n.y, n.size * scale * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${n.color},${alpha})`;
          ctx.fill();

          if (isHov || (!hov && n.size > 16)) {
            ctx.font = `${isHov ? 600 : 400} ${isHov ? 11 : 9}px monospace`;
            ctx.fillStyle = `rgba(226,232,240,${isHov ? 1 : 0.6})`;
            ctx.textAlign = "center";
            ctx.fillText(n.label, n.x, n.y + n.size * 0.5 + 12);
          }
        });

        if (!reduced) {
          nodes.forEach((n) => {
            nodes.forEach((other) => {
              if (n === other) return;
              const dx = n.x - other.x;
              const dy = n.y - other.y;
              const dist = Math.sqrt(dx * dx + dy * dy) || 1;
              const force = 800 / (dist * dist);
              n.vx += (dx / dist) * force * 0.01;
              n.vy += (dy / dist) * force * 0.01;
            });
            const ci = n.catIdx;
            n.vx += (centers[ci].x - n.x) * 0.012;
            n.vy += (centers[ci].y - n.y) * 0.012;
            n.vx *= 0.85;
            n.vy *= 0.85;
            n.x += n.vx;
            n.y += n.vy;
            n.x = Math.max(n.size, Math.min(W - n.size, n.x));
            n.y = Math.max(n.size, Math.min(H - n.size, n.y));
          });
        }

        raf = requestAnimationFrame(draw);
      };
      draw();
    };

    setup();

    const onResize = () => setup();
    window.addEventListener("resize", onResize);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      let found: string | null = null;
      for (const n of nodesRef.current) {
        const dx = n.x - mx;
        const dy = n.y - my;
        if (Math.sqrt(dx * dx + dy * dy) < n.size * 0.6 + 4) { found = n.id; break; }
      }
      hoveredRef.current = found;
      setHovered(found);
    };
    const onLeave = () => { hoveredRef.current = null; setHovered(null); };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, [reduced]);

  return (
    <div className="relative w-full" style={{ height: 420 }}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ cursor: hovered ? "pointer" : "none" }}
        role="img"
        aria-label="Interactive skills graph. Languages: Python, JavaScript, TypeScript, SQL, HTML/CSS. ML/DL: Machine Learning, TensorFlow, scikit-learn, Pandas, NumPy, Deep Learning. Web: Django, Flask, REST APIs, Next.js. Tools: Git/GitHub, AWS, MySQL, Docker."
      >
        Skills: Python, JavaScript, TypeScript, SQL, HTML/CSS, Machine Learning, TensorFlow, scikit-learn, Pandas, NumPy, Deep Learning, Django, Flask, REST APIs, Next.js, Git/GitHub, AWS, MySQL, Docker
      </canvas>
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-5 flex-wrap">
        {CATEGORIES.map((cat) => (
          <div key={cat.label} className="flex items-center gap-1.5 text-xs font-mono">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: `rgb(${cat.color})`, boxShadow: `0 0 6px rgba(${cat.color},0.8)` }}
            />
            <span style={{ color: `rgba(${cat.color},0.9)` }}>{cat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
