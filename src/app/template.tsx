"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";

/** Soft page transition on every route change: a pink curtain lifts, content rises in. */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <motion.div
        aria-hidden
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
        style={{ transformOrigin: "top" }}
        className="pointer-events-none fixed inset-0 z-[55] bg-gradient-to-b from-pink-600 to-pink-400"
      />
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25, ease: EASE }}>
        {children}
      </motion.div>
    </>
  );
}
