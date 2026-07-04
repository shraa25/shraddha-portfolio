"use client";
import { motion } from "framer-motion";
import { JOURNEY } from "@/lib/data";

export default function Journey() {
  return (
    <section id="experience" className="py-20 px-6 md:px-[6%] bg-muted/30">
      <h2 className="text-4xl font-bold text-center mb-12">
        Learning <span className="bg-gradient-to-r from-violet-600 to-purple-400 bg-clip-text text-transparent">Journey</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
        {JOURNEY.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            whileHover={{ y: -6, boxShadow: "0 12px 40px rgba(124,58,237,0.25)" }}
            className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 text-center hover:border-violet-600 transition-colors"
          >
            <div className="text-3xl mb-3">{card.icon}</div>
            <h3 className="font-semibold mb-4">{card.title}</h3>
            <ul className="space-y-2">
              {card.items.map((item) => (
                <li
                  key={item}
                  className="text-muted-foreground text-sm px-2 py-1 rounded-md bg-violet-600/8 border-l-2 border-purple-400"
                >
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
