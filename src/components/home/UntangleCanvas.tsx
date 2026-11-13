"use client";

import { useEffect, useRef } from "react";
import { useScroll } from "framer-motion";

/**
 * The hero's tangled thought-line (poster-style scribble) that the visitor untangles.
 * Every point along the line has its own "calm" value: it rises while the pointer is near,
 * stays calm once touched, and drifts calmer on its own so the line never stays chaotic.
 * On touch devices the page scroll untangles it instead. When the whole line is calm it
 * settles into one soft wave that ends at the CTA anchor (bottom-right) and lights it up.
 */
const POINTS = 110;

export default function UntangleCanvas({ onCalm, className = "" }: { onCalm?: (calm: boolean) => void; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const { scrollY } = useScroll();

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touch = window.matchMedia("(hover: none)").matches;
    let w = 0, h = 0, raf = 0, t = 0, lit = false;
    // The loop only runs while the canvas is on screen and the line still has something to do.
    let visible = true, settled = false;
    const ptr = { x: -9999, y: -9999, active: false };
    // Phones: fewer points and a lower pixel ratio. The line looks the same at that size and costs about half.
    const N = touch ? 72 : POINTS;

    const rnd = (() => { let s = 2026; return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646; })();
    const seeds = Array.from({ length: N }, () => ({ a: rnd() * Math.PI * 2, k: 0.6 + rnd() * 0.8, j: rnd() - 0.5, calm: reduced ? 1 : 0 }));

    const resize = () => {
      const dpr = Math.min(touch ? 1.5 : 2, window.devicePixelRatio || 1);
      const r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const wake = () => { settled = false; if (visible && !raf) raf = requestAnimationFrame(draw); };
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      ptr.x = e.clientX - r.left; ptr.y = e.clientY - r.top; ptr.active = true;
      wake();
    };
    const onLeave = () => { ptr.active = false; };
    // Pause completely while the hero is scrolled out of view.
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) wake();
    });
    io.observe(canvas);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerdown", onMove);
    canvas.addEventListener("pointerleave", onLeave);

    // calm (target) position: a soft S-curve from top-left to the CTA anchor bottom-right
    const calmPos = (u: number): [number, number] => {
      const x = w * (0.06 + u * 0.78);
      const y = h * (0.28 + u * 0.56) + Math.sin(u * Math.PI * 2.2) * h * 0.09;
      return [x, y];
    };
    // tangled position: loops + jitter orbiting the calm path
    const tangledPos = (i: number, u: number): [number, number] => {
      const s = seeds[i];
      const [cx, cy] = calmPos(u);
      const A = Math.min(w, h) * 0.26;
      const wob = Math.sin(t * 0.6 + s.a) * 6; // slow breathing so it never looks frozen
      return [cx + Math.cos(u * 26 + s.a) * A * s.k + s.j * 60 + wob, cy + Math.sin(u * 19 + s.a * 1.3) * A * 0.75 + wob * 0.6];
    };
    const ease = (v: number) => 1 - Math.pow(1 - v, 3);

    function draw() {
      raf = 0;
      t += 0.016;
      ctx.clearRect(0, 0, w, h);

      // scroll-driven calm on touch devices (and a bonus for everyone)
      const sc = Math.min(1, Math.max(0, (scrollY.get() - 40) / 420));
      const pts: [number, number][] = [];
      let total = 0;
      for (let i = 0; i < N; i++) {
        const u = i / (N - 1);
        const s = seeds[i];
        const [tx, ty] = tangledPos(i, u);
        if (ptr.active) {
          const d = Math.hypot(tx - ptr.x, ty - ptr.y);
          const near = Math.max(0, 1 - d / 150);
          s.calm += (1 - s.calm) * near * 0.12;
        }
        s.calm += (1 - s.calm) * 0.0012; // slow self-settling
        const c = Math.max(s.calm, touch ? sc : sc * 0.9);
        total += c;
        const [cx, cy] = calmPos(u);
        const e = ease(c);
        pts.push([tx + (cx - tx) * e, ty + (cy - ty) * e]);
      }
      const avg = total / N;

      // soft glow under the line
      ctx.lineCap = "round"; ctx.lineJoin = "round";
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, `rgba(236,45,132,${0.9})`);
      grad.addColorStop(1, `rgba(58,75,159,${0.5 + avg * 0.5})`);

      const path = () => {
        ctx.beginPath();
        ctx.moveTo(pts[0][0], pts[0][1]);
        for (let i = 1; i < N - 1; i++) {
          const mx = (pts[i][0] + pts[i + 1][0]) / 2, my = (pts[i][1] + pts[i + 1][1]) / 2;
          ctx.quadraticCurveTo(pts[i][0], pts[i][1], mx, my);
        }
        ctx.lineTo(pts[N - 1][0], pts[N - 1][1]);
      };
      path();
      ctx.strokeStyle = `rgba(236,45,132,${0.12 + avg * 0.15})`; ctx.lineWidth = 16 + avg * 10; ctx.stroke();
      path();
      ctx.strokeStyle = grad; ctx.lineWidth = 3.5 + avg * 2.5; ctx.stroke();

      // knots: small dots where the line is still tangled
      for (let i = 0; i < N; i += 9) {
        const k = 1 - seeds[i].calm;
        if (k < 0.15) continue;
        ctx.fillStyle = `rgba(236,45,132,${k * 0.7})`;
        ctx.beginPath(); ctx.arc(pts[i][0], pts[i][1], 2 + k * 3, 0, 7); ctx.fill();
      }

      // the line's end glows as it reaches the CTA anchor
      const [ex, ey] = pts[N - 1];
      const pulse = 1 + Math.sin(t * 3) * 0.15;
      ctx.fillStyle = `rgba(236,45,132,${0.25 + avg * 0.45})`;
      ctx.beginPath(); ctx.arc(ex, ey, (8 + avg * 10) * pulse, 0, 7); ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.beginPath(); ctx.arc(ex, ey, 3.5, 0, 7); ctx.fill();

      // pointer halo
      if (ptr.active && !touch) {
        const g = ctx.createRadialGradient(ptr.x, ptr.y, 0, ptr.x, ptr.y, 150);
        g.addColorStop(0, "rgba(255,147,193,0.28)"); g.addColorStop(1, "rgba(255,147,193,0)");
        ctx.fillStyle = g; ctx.fillRect(ptr.x - 150, ptr.y - 150, 300, 300);
      }

      const nowLit = avg > 0.85;
      if (nowLit !== lit) { lit = nowLit; onCalm?.(lit); }

      // Fully untangled and nobody touching it: the picture no longer changes, so stop drawing.
      settled = avg > 0.995 && !ptr.active;
      if (visible && !settled) raf = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerdown", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, [onCalm, scrollY]);

  // touch-pan-y: a finger that starts on the canvas still scrolls the page (touch-none used to trap it)
  return <canvas ref={ref} aria-hidden className={`block h-full w-full touch-pan-y ${className}`} />;
}
