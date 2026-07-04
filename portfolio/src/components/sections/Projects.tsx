"use client";
import { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ExternalLink } from "lucide-react";
import SectionWrapper from "@/components/synapse/SectionWrapper";
import TransmitText from "@/components/synapse/TransmitText";
import { PROJECTS } from "@/lib/data";
import { GithubIcon } from "@/components/ui/icons";

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
      <div
        className="flex items-center gap-1.5 px-4 py-2.5 border-b"
        style={{ borderColor: "rgba(124,58,237,0.15)", background: "rgba(124,58,237,0.05)" }}
      >
        {["#7C3AED", "#3B82F6", "#22D3EE"].map((c) => (
          <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c, opacity: 0.7 }} />
        ))}
        <span className="ml-2 font-mono text-xs" style={{ color: "rgba(226,232,240,0.3)" }}>
          {p.live || "localhost:3000"}
        </span>
      </div>

      <div className="p-5">
        <div className="text-2xl mb-3">{p.icon}</div>
        <h3 className="font-semibold mb-2 text-sm" style={{ color: "#e2e8f0" }}>{p.title}</h3>

        {/* Problem → Solution → Impact layout */}
        <p className="text-xs leading-relaxed mb-4" style={{ color: "rgba(226,232,240,0.5)" }}>{p.desc}</p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {p.tags.map((t) => (
            <span
              key={t}
              className="font-mono text-xs px-2 py-0.5 rounded"
              style={{
                background: "rgba(124,58,237,0.12)",
                color: "rgba(34,211,238,0.8)",
                border: "1px solid rgba(124,58,237,0.2)",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex gap-2">
          {p.live && (
            <a
              href={p.live}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="Live Demo"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-all"
              style={{
                background: "linear-gradient(135deg, #7C3AED, #3B82F6)",
                color: "#fff",
                boxShadow: "0 0 12px rgba(124,58,237,0.3)",
              }}
            >
              <ExternalLink className="h-3 w-3" /> Live Demo
            </a>
          )}
          <a
            href={p.github}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="Open GitHub"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium border transition-all"
            style={{ borderColor: "rgba(124,58,237,0.4)", color: "rgba(34,211,238,0.8)" }}
          >
            <GithubIcon className="h-3.5 w-3.5" /> GitHub
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
      <p className="text-center font-mono text-xs mb-12 tracking-widest" style={{ color: "rgba(34,211,238,0.5)" }}>
        {"// signals.deployed"}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto mb-10">
        {PROJECTS.map((p, i) => <ProjectCard key={p.title} p={p} i={i} />)}
      </div>

      <div className="text-center">
        <a
          href="https://github.com/shraa25"
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="Open GitHub"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium border transition-all"
          style={{
            borderColor: "rgba(124,58,237,0.4)",
            color: "#22D3EE",
            boxShadow: "0 0 20px rgba(124,58,237,0.1)",
          }}
        >
          <GithubIcon /> View All on GitHub
        </a>
      </div>
    </SectionWrapper>
  );
}
