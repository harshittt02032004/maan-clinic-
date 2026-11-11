"use client";

import { useEffect, useRef } from "react";
import { initGsap, NO_REDUCE } from "@/lib/gsap";

/** Fades and lifts its direct children in one after another when it scrolls into view. */
export default function GsapStagger({ className, children, gap = 0.12, start = "top 92%" }: { className?: string; children: React.ReactNode; gap?: number; start?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { gsap } = initGsap();
    const mm = gsap.matchMedia();
    mm.add(NO_REDUCE, () => {
      const el = ref.current;
      if (!el) return;
      gsap.from(el.children, { y: 22, opacity: 0, duration: 0.8, ease: "power2.out", stagger: gap, scrollTrigger: { trigger: el, start, once: true } });
    });
    return () => mm.revert();
  }, [gap, start]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
