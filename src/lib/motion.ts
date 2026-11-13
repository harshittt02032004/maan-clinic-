/** Shared easing + variants so every section moves with the same character. */
export const EASE = [0.22, 1, 0.36, 1] as const;
export const EASE_OUT_BACK = [0.34, 1.56, 0.64, 1] as const;

export const fadeUp = {
  // opacity + transform only: both run on the compositor. (An animated `filter: blur()` on every revealed
  // block forced a repaint per frame and was a large part of the scroll jank on phones.)
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export const stagger = (delay = 0.08, start = 0.05) => ({
  hidden: {},
  show: { transition: { staggerChildren: delay, delayChildren: start } },
});

export const VIEWPORT = { once: true, margin: "-12% 0px -8% 0px" } as const;
