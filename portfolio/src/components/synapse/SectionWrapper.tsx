"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Props {
  children: React.ReactNode;
  className?: string;
  id?: string;
  delay?: number;
}

export default function SectionWrapper({ children, className = "", id, delay = 0 }: Props) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={reduced ? {} : { opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`relative ${className}`}
    >
      {/* Tendril connector to spine */}
      {inView && !reduced && (
        <motion.div
          className="absolute hidden lg:block"
          style={{ left: "-2.5rem", top: "3rem", width: "2.5rem", height: "1px" }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.4, delay: delay + 0.1 }}
        >
          <div
            className="w-full h-full origin-left"
            style={{
              background: "linear-gradient(to right, rgba(124,58,237,0.6), rgba(34,211,238,0.2))",
              boxShadow: "0 0 4px rgba(124,58,237,0.4)",
            }}
          />
        </motion.div>
      )}
      {children}
    </motion.section>
  );
}
