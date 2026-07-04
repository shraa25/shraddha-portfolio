"use client";
import { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ExternalLink } from "lucide-react";
import SectionWrapper from "@/components/synapse/SectionWrapper";
import TransmitText from "@/components/synapse/TransmitText";
import { PROJECTS } from "@/lib/data";

const GithubIcon = () => (
  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

function ProjectCard({ p, i }: { p: typeof PROJECTS[0]; i: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-60, 60], [6, -6]);
  const rotateY = useTransform(x, [-60, 60], [-6, 6]);

  const onMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current!.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };
  const onMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.12, duration: 0.6 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 800 }}
      className="glass-card signal-border overflow-hidden"
    >
      {/* Browser mockup bar */}
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b" style={{ borderColor: "var(--border)", background: "var(--surface-2)" }}>
        {["var(--primary)","var(--secondary)","var(--accent)"].map((c, ci) => (
          <div key={ci} className="w-2.5 h-2.5 rounded-full" style={{ background: c, opacity: 0.7 }} />
        ))}
        <span className="ml-2 font-mono text-xs" style={{ color: "var(--text-secondary)", opacity: 0.5 }}>{p.live || "localhost:3000"}</span>
      </div>
      <div className="p-5">
        <div className="text-2xl mb-3">{p.icon}</div>
        <h3 className="font-semibold mb-2 text-sm" style={{ color: "var(--text)" }}>{p.title}</h3>
        <p className="text-xs leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>{p.desc}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {p.tags.map((t) => (
            <span key={t} className="font-mono text-xs px-2 py-0.5 rounded" style={{ background: "var(--surface-2)", color: "var(--accent)", border: "1px solid var(--border)" }}>{t}</span>
          ))}
        </div>
        <div className="flex gap-2">
          {p.live && (
            <a href={p.live} target="_blank" rel="noopener noreferrer" data-cursor="Live Demo"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-all"
              style={{ background: "var(--btn-primary)", color: "var(--btn-text)", boxShadow: "0 0 12px var(--glow)" }}>
              <ExternalLink className="h-3 w-3" /> Live Demo
            </a>
          )}
          <a href={p.github} target="_blank" rel="noopener noreferrer" data-cursor="Open GitHub"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium border transition-all"
            style={{ borderColor: "var(--border-hover)", color: "var(--accent)" }}>
            <GithubIcon /> GitHub
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <SectionWrapper id="projects" className="py-24 px-6 md:px-[8%]">
      <TransmitText text="Projects" as="h2" className="text-4xl font-bold text-center mb-4" />
      <p className="text-center font-mono text-xs mb-12 tracking-widest" style={{ color: "var(--accent)", opacity: 0.6 }}>{"// signals.deployed"}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto mb-10">
        {PROJECTS.map((p, i) => <ProjectCard key={p.title} p={p} i={i} />)}
      </div>
      <div className="text-center">
        <a href="https://github.com/shraa25" target="_blank" rel="noopener noreferrer" data-cursor="Open GitHub"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium border transition-all"
          style={{ borderColor: "var(--border-hover)", color: "var(--accent)" }}>
          <GithubIcon /> View All on GitHub
        </a>
      </div>
    </SectionWrapper>
  );
}
