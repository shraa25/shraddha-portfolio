"use client";
import { motion } from "framer-motion";
import SectionWrapper from "@/components/synapse/SectionWrapper";
import TransmitText from "@/components/synapse/TransmitText";
import { ABOUT_CARDS } from "@/lib/data";

export default function About() {
  return (
    <SectionWrapper id="about" className="py-24 px-6 md:px-[8%]">
      <TransmitText
        text="About Me"
        as="h2"
        className="text-4xl font-bold text-center mb-4"
      />
      <p className="text-center font-mono text-xs mb-12 tracking-widest" style={{ color: "rgba(34,211,238,0.5)" }}>
        {"// node.profile"}
      </p>

      <div className="max-w-3xl mx-auto text-center mb-12 space-y-3 text-sm leading-relaxed" style={{ color: "rgba(226,232,240,0.55)" }}>
        <p>
          I am an aspiring <span style={{ color: "#22D3EE" }}>Python Developer</span> with a strong interest in
          Artificial Intelligence, Data Science, and Backend Development. I enjoy solving real-world problems by
          building intelligent applications using Python and modern frameworks.
        </p>
        <p>
          My goal is to become an <span style={{ color: "#7C3AED" }}>AI Engineer / Data Scientist</span> while
          continuously improving my software engineering skills.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {ABOUT_CARDS.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            whileHover={{ y: -4 }}
            className="glass-card signal-border p-5 transition-all duration-300"
          >
            <span className="text-2xl mb-3 block">{card.icon}</span>
            <h3 className="font-semibold mb-1.5 text-sm" style={{ color: "#e2e8f0" }}>{card.title}</h3>
            <p className="text-xs leading-relaxed" style={{ color: "rgba(226,232,240,0.5)" }}>{card.desc}</p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
