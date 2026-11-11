"use client";

import { useEffect, useRef } from "react";
import { initGsap, NO_REDUCE } from "@/lib/gsap";

/** A hand-drawn section divider that draws itself once, when it scrolls into view. */
export default function DrawDivider({ className = "text-pink-300" }: { className?: string }) {
  const path = useRef<SVGPathElement>(null);

  useEffect(() => {
    const { gsap } = initGsap();
    const mm = gsap.matchMedia();
    mm.add(NO_REDUCE, () => {
      if (!path.current) return;
      gsap.fromTo(
        path.current,
        { strokeDashoffset: 1 },
        { strokeDashoffset: 0, duration: 1.8, ease: "power2.inOut", scrollTrigger: { trigger: path.current, start: "top 92%", once: true } },
      );
    });
    return () => mm.revert();
  }, []);

  return (
    <div aria-hidden className={`container-x ${className}`}>
      <svg viewBox="0 0 800 20" className="mx-auto block h-5 w-full max-w-3xl overflow-visible" fill="none">
        <path
          ref={path}
          d="M2 11 C 50 3, 96 17, 160 9 S 260 4, 330 11 S 430 18, 500 9 S 610 3, 670 11 S 760 16, 798 8"
          pathLength={1}
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          style={{ strokeDasharray: "1 1" }}
        />
      </svg>
    </div>
  );
}
