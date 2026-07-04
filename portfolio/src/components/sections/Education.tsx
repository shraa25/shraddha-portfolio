"use client";
import { motion } from "framer-motion";
import SectionWrapper from "@/components/synapse/SectionWrapper";
import TransmitText from "@/components/synapse/TransmitText";

const SUBJECTS = [
  "Data Structures","Algorithms","Python Programming","DBMS",
  "Operating Systems","Machine Learning","Artificial Intelligence",
  "Software Engineering","Web Development",
];

export default function Education() {
  return (
    <SectionWrapper id="education" className="py-24 px-6 md:px-[8%]">
      <TransmitText text="Education" as="h2" className="text-4xl font-bold text-center mb-4" />
      <p className="text-center font-mono text-xs mb-12 tracking-widest" style={{ color: "rgba(34,211,238,0.5)" }}>
        // node.origin
      </p>

      <div className="max-w-3xl mx-auto relative pl-8">
        <div
          className="absolute left-0 top-0 bottom-0 w-px"
          style={{ background: "linear-gradient(to bottom, #7C3AED, rgba(34,211,238,0.2))" }}
        />
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div
            className="absolute -left-[2.35rem] top-6 w-3 h-3 rounded-full node-glow"
            style={{ background: "#7C3AED", border: "2px solid #04040a" }}
          />
          <div className="glass-card signal-border p-6">
            <div className="flex flex-wrap justify-between items-start gap-3 mb-3">
              <div>
                <h3 className="font-semibold" style={{ color: "#e2e8f0" }}>Bachelor of Science – Computer Science</h3>
                <p className="text-xs mt-1 font-mono" style={{ color: "#22D3EE" }}>
                  🏛️ JVM Mehta Degree College, Airoli, Navi Mumbai
                </p>
              </div>
              <span
                className="text-xs font-mono px-3 py-1 rounded-full whitespace-nowrap"
                style={{ background: "rgba(124,58,237,0.15)", color: "#a78bfa", border: "1px solid rgba(124,58,237,0.3)" }}
              >
                July 2023 – May 2026
              </span>
            </div>
            <p className="text-xs leading-relaxed mb-4" style={{ color: "rgba(226,232,240,0.5)" }}>
              Pursuing B.Sc. Computer Science with an outstanding CGPA of 9.50 (A Grade). Active member of Coding Club, Placement Cell Volunteer, and Tech Fest Volunteer.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {["CGPA: 9.50","A Grade","Coding Club","Placement Cell","Tech Fest"].map((t) => (
                <span key={t} className="font-mono text-xs px-2 py-0.5 rounded" style={{ background: "rgba(124,58,237,0.12)", color: "rgba(34,211,238,0.8)", border: "1px solid rgba(124,58,237,0.2)" }}>
                  {t}
                </span>
              ))}
            </div>
            <p className="font-mono text-xs mb-2" style={{ color: "rgba(226,232,240,0.35)" }}>// relevant.subjects</p>
            <div className="flex flex-wrap gap-2">
              {SUBJECTS.map((s) => (
                <span key={s} className="font-mono text-xs px-2 py-0.5 rounded" style={{ background: "rgba(59,130,246,0.08)", color: "rgba(59,130,246,0.8)", border: "1px solid rgba(59,130,246,0.15)" }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
