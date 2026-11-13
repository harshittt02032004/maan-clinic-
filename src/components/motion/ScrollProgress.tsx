"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

function Bar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-pink-600 via-pink-400 to-navy-500"
    />
  );
}

/**
 * Reading-progress bar. Mouse/trackpad devices only: on phones it is a 3px line that costs a spring
 * calculation on every scroll frame, and the browser's own scrollbar already shows the position.
 */
export default function ScrollProgress() {
  const [on, setOn] = useState(false);
  useEffect(() => setOn(!window.matchMedia("(pointer: coarse)").matches), []);
  return on ? <Bar /> : null;
}
