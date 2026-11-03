"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { fadeUp, stagger, VIEWPORT } from "@/lib/motion";

type Props = HTMLMotionProps<"div"> & { delay?: number };

/** Fade-up-with-blur on scroll. Use `Stagger` around several `Item`s for a cascade. */
export function Reveal({ delay = 0, children, ...rest }: Props) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={{ ...fadeUp, show: { ...fadeUp.show, transition: { ...fadeUp.show.transition, delay } } }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({ children, gap = 0.08, ...rest }: HTMLMotionProps<"div"> & { gap?: number }) {
  return (
    <motion.div initial="hidden" whileInView="show" viewport={VIEWPORT} variants={stagger(gap)} {...rest}>
      {children}
    </motion.div>
  );
}

export function Item({ children, ...rest }: HTMLMotionProps<"div">) {
  return (
    <motion.div variants={fadeUp} {...rest}>
      {children}
    </motion.div>
  );
}
