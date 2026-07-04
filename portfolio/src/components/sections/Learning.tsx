"use client";
import { motion } from "framer-motion";
import { LEARNING } from "@/lib/data";

export default function Learning() {
  return (
    <section id="learning" className="py-20 px-6 md:px-[6%]">
      <h2 className="text-4xl font-bold text-center mb-12">
        Currently{" "}
        <span className="bg-gradient-to-r from-violet-600 to-purple-400 bg-clip-text text-transparent">
          Learning
        </span>
      </h2>

      <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
        {LEARNING.map((item, i) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ scale: 1.05, y: -4 }}
            className="px-5 py-2.5 rounded-full border border-border bg-card/50 backdrop-blur-sm font-medium text-sm hover:border-violet-600 hover:bg-violet-600/15 transition-colors cursor-default"
          >
            {item}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
