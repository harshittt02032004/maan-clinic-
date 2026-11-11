"use client";

import { useEffect, useRef, type ElementType } from "react";
import { initGsap, NO_REDUCE } from "@/lib/gsap";

/**
 * Headline that reveals line by line (each line slides up out of its own mask).
 * Re-splits on resize / font load, so the lines always match what the visitor sees.
 */
export default function LineReveal({
  as = "h2",
  className,
  children,
  delay = 0,
}: {
  as?: ElementType;
  className?: string;
  children: React.ReactNode;
  delay?: number;
}) {
  const Tag = as;
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const { gsap, SplitText } = initGsap();
    const mm = gsap.matchMedia();
    mm.add(NO_REDUCE, () => {
      const el = ref.current;
      if (!el) return;
      SplitText.create(el, {
        type: "lines",
        mask: "lines",
        autoSplit: true,
        onSplit(self) {
          // padding stops the mask clipping descenders (g, y, p) while the line is still rising
          self.masks.forEach((m) => m.classList.add("split-mask"));
          return gsap.from(self.lines, {
            yPercent: 110,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.09,
            delay,
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        },
      });
    });
    return () => mm.revert();
  }, [delay]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
