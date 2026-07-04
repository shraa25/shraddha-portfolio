"use client";
import { motion } from "framer-motion";

const SUBJECTS = [
  "Data Structures","Algorithms","Python Programming","DBMS",
  "Operating Systems","Machine Learning","Artificial Intelligence",
  "Software Engineering","Web Development",
];

export default function Education() {
  return (
    <section id="education" className="py-20 px-6 md:px-[6%]">
      <h2 className="text-4xl font-bold text-center mb-12">
        My <span className="bg-gradient-to-r from-violet-600 to-purple-400 bg-clip-text text-transparent">Education</span>
      </h2>

      <div className="max-w-3xl mx-auto relative pl-8">
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-violet-600 to-purple-400/0" />

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="absolute -left-[2.45rem] top-6 w-3.5 h-3.5 rounded-full bg-purple-400 border-2 border-background shadow-[0_0_12px_rgba(168,85,247,0.6)]" />

          <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 hover:border-violet-600 hover:translate-x-1.5 transition-all duration-300">
            <div className="flex flex-wrap justify-between items-start gap-3 mb-3">
              <div>
                <h3 className="font-semibold text-lg">Bachelor of Science – Computer Science</h3>
                <p className="text-purple-400 text-sm mt-0.5">🏛️ JVM Mehta Degree College, Airoli, Navi Mumbai</p>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-violet-600/15 text-purple-400 border border-violet-600/30 whitespace-nowrap">
                July 2023 – May 2026
              </span>
            </div>

            <p className="text-muted-foreground text-sm mb-4">
              Pursuing B.Sc. Computer Science with an outstanding CGPA of 9.50 (A Grade). Active member of Coding
              Club, Placement Cell Volunteer, and Tech Fest Volunteer.
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {["CGPA: 9.50","A Grade","Coding Club","Placement Cell","Tech Fest"].map((t) => (
                <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-violet-600/12 text-purple-400 border border-violet-600/25">
                  {t}
                </span>
              ))}
            </div>

            <p className="text-muted-foreground text-xs mb-2">Relevant Subjects:</p>
            <div className="flex flex-wrap gap-2">
              {SUBJECTS.map((s) => (
                <span key={s} className="text-xs px-2.5 py-1 rounded-full bg-violet-600/12 text-purple-400 border border-violet-600/25">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
