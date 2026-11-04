"use client";

import { motion } from "framer-motion";

/** Hand-drawn underline that draws itself in. Wrap a single word. */
export default function Scribble({ children, color = "#e5147e", delay = 0.6, className = "" }: { children: React.ReactNode; color?: string; delay?: number; className?: string }) {
  return (
    <span className={`scribble ${className}`}>
      {children}
      <svg viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden>
        <motion.path
          d="M4 16 C 60 4, 120 22, 170 10 S 260 4, 296 14"
          fill="none"
          stroke={color}
          strokeWidth={6}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay, ease: "easeOut" }}
        />
      </svg>
    </span>
  );
}
