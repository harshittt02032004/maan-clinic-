"use client";

import { useEffect, useRef } from "react";

/**
 * A soft pink light that follows the cursor with a lazy, breathing lag —
 * the whole page feels like it is lit by a single warm lamp. Pointer-only.
 */
export default function CalmHalo() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current!;
    let tx = window.innerWidth / 2, ty = window.innerHeight * 0.4, x = tx, y = ty, raf = 0;
    const onMove = (e: PointerEvent) => { tx = e.clientX; ty = e.clientY; };
    const tick = () => {
      x += (tx - x) * 0.06;
      y += (ty - y) * 0.06;
      el.style.setProperty("--hx", `${x}px`);
      el.style.setProperty("--hy", `${y}px`);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener("pointermove", onMove); };
  }, []);

  return <div ref={ref} aria-hidden className="halo" />;
}
