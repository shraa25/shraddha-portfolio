"use client";
import { motion } from "framer-motion";
import SectionWrapper from "@/components/synapse/SectionWrapper";
import TransmitText from "@/components/synapse/TransmitText";
import { JOURNEY } from "@/lib/data";

export default function Journey() {
  return (
    <SectionWrapper id="experience" className="py-24 px-6 md:px-[8%]">
      <TransmitText text="Learning Journey" as="h2" className="text-4xl font-bold text-center mb-4" />
      <p className="text-center font-mono text-xs mb-12 tracking-widest" style={{ color: "rgba(34,211,238,0.5)" }}>
        {"// signal.path"}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
        {JOURNEY.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            whileHover={{ y: -4 }}
            className="glass-card signal-border p-5 text-center"
          >
            <div className="text-2xl mb-3">{card.icon}</div>
            <h3 className="font-semibold text-sm mb-4" style={{ color: "#e2e8f0" }}>{card.title}</h3>
            <ul className="space-y-1.5">
              {card.items.map((item) => (
                <li
                  key={item}
                  className="font-mono text-xs px-2 py-1 rounded"
                  style={{
                    background: "rgba(124,58,237,0.08)",
                    color: "rgba(226,232,240,0.55)",
                    borderLeft: "2px solid rgba(34,211,238,0.4)",
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
