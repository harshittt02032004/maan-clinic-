/** Shared easing + variants so every section moves with the same character. */
export const EASE = [0.22, 1, 0.36, 1] as const;
export const EASE_OUT_BACK = [0.34, 1.56, 0.64, 1] as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: EASE } },
};

export const stagger = (delay = 0.08, start = 0.05) => ({
  hidden: {},
  show: { transition: { staggerChildren: delay, delayChildren: start } },
});

export const VIEWPORT = { once: true, margin: "-12% 0px -8% 0px" } as const;
