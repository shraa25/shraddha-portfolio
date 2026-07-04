"use client";
import { motion } from "framer-motion";
import SectionWrapper from "@/components/synapse/SectionWrapper";
import TransmitText from "@/components/synapse/TransmitText";
import { ACHIEVEMENTS } from "@/lib/data";

export default function Achievements() {
  return (
    <SectionWrapper id="achievements" className="py-24 px-6 md:px-[8%]">
      <TransmitText text="Achievements" as="h2" className="text-4xl font-bold text-center mb-4" />
      <p className="text-center font-mono text-xs mb-12 tracking-widest" style={{ color: "rgba(34,211,238,0.5)" }}>
        {"// nodes.fired"}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
        {ACHIEVEMENTS.map((a, i) => (
          <motion.div
            key={a.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            whileHover={{ y: -4 }}
            className="glass-card signal-border p-5 text-center relative overflow-hidden"
          >
            <div className="text-2xl mb-3">{a.icon}</div>
            <h3 className="font-semibold text-sm mb-1.5" style={{ color: "#e2e8f0" }}>{a.title}</h3>
            <p className="font-mono text-xs" style={{ color: "rgba(226,232,240,0.45)" }}>{a.desc}</p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
