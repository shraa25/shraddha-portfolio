"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Props {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
}

export default function TransmitText({ text, className = "", as: Tag = "span", delay = 0 }: Props) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <Tag ref={ref as React.RefObject<HTMLHeadingElement & HTMLParagraphElement>} className={className}>
        {text}
      </Tag>
    );
  }

  return (
    <Tag
      ref={ref as React.RefObject<HTMLHeadingElement & HTMLParagraphElement>}
      className={className}
      aria-label={text}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 6 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.04, delay: delay + i * 0.03, ease: "easeOut" }}
          className="inline-block"
          aria-hidden="true"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </Tag>
  );
}
