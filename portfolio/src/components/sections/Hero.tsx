"use client";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Rocket, Send, Download } from "lucide-react";
import TransmitText from "@/components/synapse/TransmitText";
import { ROLES } from "@/lib/data";
import { useState, useEffect, useRef } from "react";

const NeuralNetwork = dynamic(() => import("@/components/synapse/NeuralNetwork"), { ssr: false });

function TypedText() {
  const [text, setText] = useState("");
  const [roleIdx, setRoleIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const charRef = useRef(0);

  useEffect(() => {
    const current = ROLES[roleIdx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(current.substring(0, charRef.current + 1));
        charRef.current++;
        if (charRef.current === current.length) setTimeout(() => setDeleting(true), 1800);
      } else {
        setText(current.substring(0, charRef.current - 1));
        charRef.current--;
        if (charRef.current === 0) { setDeleting(false); setRoleIdx((i) => (i + 1) % ROLES.length); }
      }
    }, deleting ? 55 : 90);
    return () => clearTimeout(timeout);
  }, [text, deleting, roleIdx]);

  return (
    <span className="font-mono" style={{ color: "#22D3EE" }}>
      {text}<span className="animate-pulse opacity-80">▋</span>
    </span>
  );
}

const btnBase = "inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-between px-6 md:px-[8%] pt-28 pb-16 overflow-hidden"
    >
      {/* Left content */}
      <motion.div
        className="relative z-10 max-w-lg"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.p
          className="font-mono text-sm mb-3 tracking-widest uppercase"
          style={{ color: "rgba(34,211,238,0.7)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {"// signal.init()"}
        </motion.p>

        <TransmitText
          text="Shraddha More"
          as="h1"
          delay={0.4}
          className="text-5xl md:text-6xl font-bold leading-tight mb-3"
        />

        <div className="text-xl md:text-2xl font-normal min-h-8 mb-5">
          <TypedText />
        </div>

        <motion.p
          className="text-sm leading-relaxed mb-8 max-w-md"
          style={{ color: "rgba(226,232,240,0.55)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          Motivated B.Sc. Computer Science graduate (2026) building scalable
          AI-powered systems. Specialising in Python, Django, Flask, Machine
          Learning, and cloud deployment.
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
        >
          <a
            href="#projects"
            data-cursor="View Projects"
            className={`${btnBase} text-white`}
            style={{
              background: "linear-gradient(135deg, #7C3AED, #3B82F6)",
              boxShadow: "0 0 20px rgba(124,58,237,0.4)",
            }}
          >
            <Rocket className="h-4 w-4" /> View Projects
          </a>
          <a
            href="#contact"
            data-cursor="Contact"
            className={`${btnBase} border`}
            style={{ borderColor: "rgba(124,58,237,0.5)", color: "#22D3EE" }}
          >
            <Send className="h-4 w-4" /> Contact Me
          </a>
          <a
            href="/resume.pdf"
            download
            data-cursor="Download"
            className={`${btnBase} border`}
            style={{ borderColor: "rgba(59,130,246,0.4)", color: "rgba(226,232,240,0.7)" }}
          >
            <Download className="h-4 w-4" /> Resume
          </a>
        </motion.div>
      </motion.div>

      {/* Neural Network */}
      <motion.div
        className="relative z-10 hidden md:block"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <NeuralNetwork />
      </motion.div>
    </section>
  );
}
