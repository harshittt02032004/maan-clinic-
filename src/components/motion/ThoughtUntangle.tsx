"use client";

import { useMemo, useRef } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";

/**
 * A tangled scribble — the kind drawn around heads on the clinic's posters —
 * that straightens into a calm wave as the user scrolls through the section.
 * Pure SVG: point-by-point interpolation driven by scroll progress.
 */
const N = 60;
const W = 1200;
const H = 220;

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function buildPoints() {
  const rnd = seeded(42);
  const tangled: [number, number][] = [];
  const calm: [number, number][] = [];
  for (let i = 0; i < N; i++) {
    const t = i / (N - 1);
    const x = 40 + t * (W - 80);
    // tangled: loops + jitter around the centre line
    const loop = Math.sin(t * Math.PI * 14) * 60 * (0.5 + rnd());
    const jitter = (rnd() - 0.5) * 90;
    tangled.push([x + Math.cos(t * Math.PI * 9) * 48, H / 2 + loop + jitter]);
    // calm: a gentle single wave
    calm.push([x, H / 2 + Math.sin(t * Math.PI * 2) * 22]);
  }
  return { tangled, calm };
}

// one-decimal rounding keeps the SSR and client strings byte-identical
const r = (n: number) => Math.round(n * 10) / 10;

function toPath(pts: [number, number][]) {
  let d = `M ${r(pts[0][0])} ${r(pts[0][1])}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const mx = (pts[i][0] + pts[i + 1][0]) / 2;
    const my = (pts[i][1] + pts[i + 1][1]) / 2;
    d += ` Q ${r(pts[i][0])} ${r(pts[i][1])} ${r(mx)} ${r(my)}`;
  }
  const l = pts[pts.length - 1];
  d += ` T ${r(l[0])} ${r(l[1])}`;
  return d;
}

export default function ThoughtUntangle({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const { tangled, calm } = useMemo(buildPoints, []);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 35%"] });
  const p = useSpring(scrollYProgress, { stiffness: 60, damping: 20, mass: 0.6 });
  const hue = useTransform(p, [0, 1], ["#d9127a", "#3a4b9f"]);
  const width = useTransform(p, [0, 1], [3, 5]);

  useMotionValueEvent(p, "change", (v) => {
    const e = 1 - Math.pow(1 - v, 3);
    const pts = tangled.map(([tx, ty], i) => [tx + (calm[i][0] - tx) * e, ty + (calm[i][1] - ty) * e] as [number, number]);
    pathRef.current?.setAttribute("d", toPath(pts));
  });

  return (
    <div ref={ref} className={`relative ${className}`} aria-hidden>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full overflow-visible" fill="none">
        <motion.path ref={pathRef} d={toPath(tangled)} suppressHydrationWarning stroke={hue} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" style={{ filter: "drop-shadow(0 6px 14px rgba(236,45,132,0.25))" }} />
      </svg>
      <div className="pointer-events-none absolute inset-x-0 -bottom-2 flex justify-between px-6 text-[10px] font-bold uppercase tracking-[0.22em] text-muted">
        <span>उलझन</span>
        <span>सुलझन</span>
      </div>
    </div>
  );
}
