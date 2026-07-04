"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SKILLS_BARS, SKILL_PILLS } from "@/lib/data";

function SkillBar({ name, pct, animate }: { name: string; pct: number; animate: boolean }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1.5">
        <span>{name}</span>
        <span className="text-purple-400 font-semibold">{pct}%</span>
      </div>
      <div className="h-1.5 bg-border rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-violet-600 to-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.4)]"
          initial={{ width: 0 }}
          animate={{ width: animate ? `${pct}%` : 0 }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-20 px-6 md:px-[6%]">
      <h2 className="text-4xl font-bold text-center mb-12">
        Tech <span className="bg-gradient-to-r from-violet-600 to-purple-400 bg-clip-text text-transparent">Stack</span>
      </h2>

      <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto mb-10">
        {SKILLS_BARS.map((cat) => (
          <div
            key={cat.category}
            className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 space-y-4"
          >
            <h3 className="text-purple-400 font-semibold text-sm">{cat.category}</h3>
            {cat.items.map((item) => (
              <SkillBar key={item.name} name={item.name} pct={item.pct} animate={inView} />
            ))}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 justify-center max-w-4xl mx-auto">
        {SKILL_PILLS.map((skill, i) => (
          <motion.div
            key={skill}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.03 }}
            whileHover={{ y: -3, boxShadow: "0 4px 15px rgba(124,58,237,0.2)" }}
            className="px-4 py-2 rounded-full border border-border bg-card/50 backdrop-blur-sm text-sm font-medium hover:border-purple-400 hover:bg-violet-600/15 transition-colors cursor-default"
          >
            {skill}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
