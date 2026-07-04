"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Rocket, Send, Download } from "lucide-react";
import { ROLES } from "@/lib/data";

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 70 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.5,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.5 + 0.2,
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isDark = document.documentElement.classList.contains("dark");
      const c = isDark ? "168,85,247" : "124,58,237";
      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${c},${p.alpha})`;
        ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${c},${0.12 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}

function TypedText() {
  const [text, setText] = useState("");
  const [roleIdx, setRoleIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const charRef = useRef(0);

  useEffect(() => {
    const current = ROLES[roleIdx];
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          setText(current.substring(0, charRef.current + 1));
          charRef.current++;
          if (charRef.current === current.length)
            setTimeout(() => setDeleting(true), 1800);
        } else {
          setText(current.substring(0, charRef.current - 1));
          charRef.current--;
          if (charRef.current === 0) {
            setDeleting(false);
            setRoleIdx((i) => (i + 1) % ROLES.length);
          }
        }
      },
      deleting ? 60 : 100
    );
    return () => clearTimeout(timeout);
  }, [text, deleting, roleIdx]);

  return (
    <span className="text-purple-400">
      {text}
      <span className="animate-pulse">|</span>
    </span>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-between px-6 md:px-[6%] pt-28 pb-16 overflow-hidden"
    >
      <ParticleCanvas />

      <motion.div
        className="relative z-10 max-w-xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <p className="text-purple-400 text-lg mb-2">Hi there 👋, I&apos;m</p>
        <h1 className="text-5xl md:text-6xl font-bold leading-tight bg-gradient-to-br from-foreground via-foreground to-purple-400 bg-clip-text text-transparent mb-4">
          Shraddha More
        </h1>
        <h2 className="text-xl md:text-2xl font-normal min-h-8 mb-4">
          <TypedText />
        </h2>
        <p className="text-muted-foreground max-w-md mb-8 leading-relaxed">
          Motivated B.Sc. Computer Science graduate (2026) passionate about
          building scalable web applications and AI-powered solutions.
          Experienced in Python, Django, Flask, SQL, Machine Learning, and cloud
          deployment.
        </p>
        <div className="flex flex-wrap gap-3">
          <a href="#projects" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium bg-gradient-to-r from-violet-600 to-purple-500 text-white shadow-lg shadow-violet-500/30 hover:opacity-90 transition-opacity">
            <Rocket className="h-4 w-4" /> View Projects
          </a>
          <a href="#contact" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium border border-violet-600 text-purple-400 hover:bg-violet-600 hover:text-white transition-colors">
            <Send className="h-4 w-4" /> Contact Me
          </a>
          <a href="/resume.pdf" download className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium border border-violet-600 text-purple-400 hover:bg-violet-600 hover:text-white transition-colors">
            <Download className="h-4 w-4" /> Resume
          </a>
        </div>
      </motion.div>

      <motion.div
        className="relative z-10 hidden md:flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <div className="w-64 h-64 rounded-full p-1 bg-gradient-to-br from-violet-600 via-purple-400 to-cyan-400 animate-spin [animation-duration:6s]">
          <div className="w-full h-full rounded-full bg-card flex items-center justify-center overflow-hidden animate-spin [animation-duration:6s] [animation-direction:reverse]">
            <span className="text-6xl font-bold text-purple-400">SM</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
