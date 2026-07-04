"use client";
import { motion } from "framer-motion";
import SectionWrapper from "@/components/synapse/SectionWrapper";
import TransmitText from "@/components/synapse/TransmitText";
import { GITHUB_USERNAME } from "@/lib/data";
import { GithubIcon } from "@/components/ui/icons";

const u = GITHUB_USERNAME;

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
        {"// live.signal"}
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={`GitHub stat card ${i + 1}`} loading="lazy" width={495} height={195} className="max-w-full block" />
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
