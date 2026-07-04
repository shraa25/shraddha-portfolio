"use client";
import { motion } from "framer-motion";
import { ABOUT_CARDS } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

export default function About() {
  return (
    <section id="about" className="py-20 px-6 md:px-[6%] bg-muted/30">
      <h2 className="text-4xl font-bold text-center mb-12">
        About <span className="bg-gradient-to-r from-violet-600 to-purple-400 bg-clip-text text-transparent">Me</span>
      </h2>

      <div className="max-w-3xl mx-auto text-center text-muted-foreground mb-12 space-y-3 text-sm leading-relaxed">
        <p>
          I am an aspiring <strong className="text-purple-400">Python Developer</strong> with a strong interest in
          Artificial Intelligence, Data Science, and Backend Development. I enjoy solving real-world problems by
          building intelligent applications using Python and modern frameworks.
        </p>
        <p>
          Currently expanding my knowledge in Machine Learning, Deep Learning, Data Science, REST APIs, Cloud
          Deployment, and Backend Development. My goal is to become an{" "}
          <strong className="text-purple-400">AI Engineer / Data Scientist</strong> while continuously improving my
          software engineering skills.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {ABOUT_CARDS.map((card, i) => (
          <motion.div
            key={card.title}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            whileHover={{ y: -6, boxShadow: "0 12px 40px rgba(124,58,237,0.25)" }}
            className="rounded-2xl p-6 text-center border border-border bg-card/50 backdrop-blur-sm transition-colors hover:border-violet-600"
          >
            <span className="text-3xl mb-3 block">{card.icon}</span>
            <h3 className="font-semibold mb-2">{card.title}</h3>
            <p className="text-muted-foreground text-sm">{card.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
