"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";

/** Page transition: a flat magenta sheet wipes up, content rises in beneath it. */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <motion.div
        aria-hidden
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.55, ease: EASE }}
        style={{ transformOrigin: "top" }}
        className="pointer-events-none fixed inset-0 z-[55] bg-magenta"
      />
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2, ease: EASE }}>
        {children}
      </motion.div>
    </>
  );
}
