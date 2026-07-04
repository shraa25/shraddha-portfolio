"use client";
import { motion } from "framer-motion";
import SectionWrapper from "@/components/synapse/SectionWrapper";
import TransmitText from "@/components/synapse/TransmitText";
import { GITHUB_USERNAME } from "@/lib/data";

const u = GITHUB_USERNAME;

const GithubIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const STATS = [
  `https://github-readme-stats.vercel.app/api?username=${u}&theme=tokyonight&hide_border=true&include_all_commits=true&count_private=true&show_icons=true&bg_color=00000000`,
  `https://streak-stats.demolab.com/?user=${u}&theme=tokyonight&hide_border=true&background=00000000`,
  `https://github-readme-stats.vercel.app/api/top-langs/?username=${u}&theme=tokyonight&hide_border=true&layout=compact&langs_count=8&bg_color=00000000`,
];

export default function GitHubStats() {
  return (
    <SectionWrapper id="github" className="py-24 px-6 md:px-[8%]">
      <TransmitText text="GitHub Pulse" as="h2" className="text-4xl font-bold text-center mb-4" />
      <p className="text-center font-mono text-xs mb-12 tracking-widest" style={{ color: "rgba(34,211,238,0.5)" }}>
        // live.signal
      </p>

      <div className="flex flex-wrap justify-center gap-4 mb-8 max-w-5xl mx-auto">
        {STATS.map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -4, boxShadow: "0 0 30px rgba(124,58,237,0.2)" }}
            className="glass-card signal-border overflow-hidden"
          >
            <img src={src} alt="GitHub stat" loading="lazy" className="max-w-full block" />
          </motion.div>
        ))}
      </div>

      <div className="text-center">
        <a
          href={`https://github.com/${u}`}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="Open GitHub"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium border transition-all"
          style={{ borderColor: "rgba(124,58,237,0.4)", color: "#22D3EE" }}
        >
          <GithubIcon /> Visit GitHub Profile
        </a>
      </div>
    </SectionWrapper>
  );
}
