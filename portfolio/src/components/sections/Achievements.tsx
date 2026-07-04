"use client";
import { motion } from "framer-motion";
import { ACHIEVEMENTS } from "@/lib/data";

export default function Achievements() {
  return (
    <section id="achievements" className="py-20 px-6 md:px-[6%] bg-muted/30">
      <h2 className="text-4xl font-bold text-center mb-12">
        My <span className="bg-gradient-to-r from-violet-600 to-purple-400 bg-clip-text text-transparent">Achievements</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
        {ACHIEVEMENTS.map((a, i) => (
          <motion.div
            key={a.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            whileHover={{ y: -6, boxShadow: "0 12px 40px rgba(124,58,237,0.25)" }}
            className="relative rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 text-center hover:border-violet-600 transition-colors overflow-hidden group"
          >
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-violet-600 to-purple-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            <div className="text-3xl mb-3">{a.icon}</div>
            <h3 className="font-semibold mb-2 text-sm">{a.title}</h3>
            <p className="text-muted-foreground text-sm">{a.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
