"use client";

import { useEffect, useRef } from "react";
import type { Motif } from "@/content/conditions";

/**
 * Pointer-reactive canvas artwork for each condition page hero.
 * Every motif tells the same small story: disorder near the start, calm where the
 * pointer rests. All drawing is procedural — no stock art, no AI "patient" images.
 */
export default function MindMotif({ motif, className = "" }: { motif: Motif; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, dpr = 1, raf = 0, t = 0;
    const ptr = { x: -9999, y: -9999, calm: 0 };

    const PINK = "236,45,132", NAVY = "58,75,159";

    const resize = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      const r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      ptr.x = e.clientX - r.left; ptr.y = e.clientY - r.top;
    };
    const onLeave = () => { ptr.x = -9999; ptr.y = -9999; };
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);

    // seeded particles
    const rnd = (() => { let s = 7; return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646; })();
    const P = Array.from({ length: 70 }, () => ({ x: rnd(), y: rnd(), v: 0.4 + rnd() * 0.8, r: 1 + rnd() * 2.2, a: rnd() * Math.PI * 2 }));

    const near = (x: number, y: number, rad = 160) => {
      const d = Math.hypot(x - ptr.x, y - ptr.y);
      return Math.max(0, 1 - d / rad);
    };

    const draw = () => {
      t += reduced ? 0 : 0.016;
      ctx.clearRect(0, 0, w, h);
      const inside = ptr.x > 0 && ptr.x < w && ptr.y > 0 && ptr.y < h;
      ptr.calm += ((inside ? 1 : 0) - ptr.calm) * 0.03;
      const calm = ptr.calm;

      switch (motif) {
        case "rain": {
          for (const p of P) {
            const n = near(p.x * w, p.y * h);
            p.y += (p.v * (1 - n * 0.9) * 0.006);
            if (p.y > 1.05) p.y = -0.05;
            const x = p.x * w, y = p.y * h;
            ctx.strokeStyle = `rgba(${n > 0.2 ? PINK : NAVY},${0.25 + n * 0.6})`;
            ctx.lineWidth = p.r * 0.6;
            ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + 10 + p.r * 6 * (1 - n)); ctx.stroke();
            if (n > 0.2) { ctx.fillStyle = `rgba(${PINK},${n * 0.5})`; ctx.beginPath(); ctx.arc(x, y - 6 * n, p.r * 1.6, 0, 7); ctx.fill(); }
          }
          break;
        }
        case "pulse": {
          const bpm = 1.9 - calm * 1.2; // slows when the pointer rests inside
          ctx.lineWidth = 2.5; ctx.strokeStyle = `rgba(${PINK},0.9)`;
          ctx.beginPath();
          for (let x = 0; x <= w; x += 3) {
            const u = ((x / w) * 6 + t * bpm) % 1;
            let y = h / 2;
            if (u < 0.08) y -= Math.sin(u / 0.08 * Math.PI) * 10;
            else if (u < 0.14) y += Math.sin((u - 0.08) / 0.06 * Math.PI) * (30 - calm * 16);
            else if (u < 0.22) y -= Math.sin((u - 0.14) / 0.08 * Math.PI) * (90 - calm * 50);
            else if (u < 0.3) y += Math.sin((u - 0.22) / 0.08 * Math.PI) * (30 - calm * 16);
            x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
          }
          ctx.stroke();
          ctx.strokeStyle = `rgba(${NAVY},0.15)`; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(0, h / 2); ctx.lineTo(w, h / 2); ctx.stroke();
          break;
        }
        case "loop": {
          const cx = w / 2, cy = h / 2;
          for (let k = 0; k < 7; k++) {
            const R = 40 + k * 26;
            const n = near(cx, cy, 300);
            const open = n * 0.9 + calm * 0.4;
            ctx.strokeStyle = `rgba(${k % 2 ? PINK : NAVY},${0.5 - k * 0.05})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(cx, cy, R, t * (0.6 - k * 0.05) + k, t * (0.6 - k * 0.05) + k + Math.PI * (2 - open * 1.4));
            ctx.stroke();
          }
          break;
        }
        case "wave": {
          for (let k = 0; k < 3; k++) {
            ctx.strokeStyle = `rgba(${k ? NAVY : PINK},${0.7 - k * 0.2})`; ctx.lineWidth = 3 - k;
            ctx.beginPath();
            for (let x = 0; x <= w; x += 4) {
              const n = near(x, h / 2, 260);
              const amp = (h * 0.32) * (1 - n * 0.85) * (1 - calm * 0.3);
              const y = h / 2 + Math.sin(x / (70 + k * 20) + t * 1.4 + k) * amp;
              x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
            }
            ctx.stroke();
          }
          break;
        }
        case "fragments": {
          const cx = w / 2, cy = h / 2;
          P.forEach((p, i) => {
            const ang = p.a + t * 0.15;
            const targetR = 70 + (i % 5) * 18;
            const scatterR = 120 + p.v * 220;
            const R = scatterR + (targetR - scatterR) * calm;
            const x = cx + Math.cos(ang) * R, y = cy + Math.sin(ang) * R * 0.7;
            ctx.save(); ctx.translate(x, y); ctx.rotate(ang * 2 + (1 - calm) * p.a);
            ctx.fillStyle = `rgba(${i % 3 ? PINK : NAVY},${0.35 + calm * 0.45})`;
            const s = 4 + p.r * 3;
            ctx.beginPath(); ctx.moveTo(0, -s); ctx.lineTo(s, s * 0.8); ctx.lineTo(-s, s * 0.6); ctx.closePath(); ctx.fill();
            ctx.restore();
          });
          break;
        }
        case "night": {
          const g = ctx.createRadialGradient(w * 0.75, h * 0.3, 10, w * 0.75, h * 0.3, 160);
          g.addColorStop(0, `rgba(${PINK},0.35)`); g.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
          ctx.fillStyle = "rgba(255,255,255,0.95)"; ctx.beginPath(); ctx.arc(w * 0.75, h * 0.3, 34, 0, 7); ctx.fill();
          ctx.fillStyle = "rgba(255,241,247,1)"; ctx.beginPath(); ctx.arc(w * 0.75 + 14, h * 0.3 - 8, 30, 0, 7); ctx.fill();
          for (const p of P) {
            const x = p.x * w, y = p.y * h;
            const n = near(x, y, 200);
            const tw = 0.4 + Math.abs(Math.sin(t * (2.5 - calm * 2 - n * 1.5) * p.v + p.a)) * 0.6;
            ctx.fillStyle = `rgba(${NAVY},${tw})`;
            ctx.beginPath(); ctx.arc(x, y, p.r * (0.6 + n * 0.8), 0, 7); ctx.fill();
          }
          break;
        }
        case "chain": {
          const links = 9, cx = w / 2, cy = h / 2;
          for (let k = 0; k < links; k++) {
            const u = (k - (links - 1) / 2) / links;
            const x = cx + u * w * 0.8, y = cy + Math.sin(k + t * 0.8) * 10;
            const n = near(x, y, 150);
            const gap = n * 22 + calm * 6;
            ctx.strokeStyle = `rgba(${k % 2 ? PINK : NAVY},${0.75 - n * 0.3})`;
            ctx.lineWidth = 6 - n * 3;
            ctx.beginPath();
            ctx.ellipse(x, y, 32, 18, k % 2 ? 0 : Math.PI / 2, 0.15 + gap / 40, Math.PI * 2 - 0.15 - gap / 40);
            ctx.stroke();
          }
          break;
        }
        case "pair": {
          for (let k = 0; k < 2; k++) {
            ctx.strokeStyle = `rgba(${k ? NAVY : PINK},0.8)`; ctx.lineWidth = 3;
            ctx.beginPath();
            for (let x = 0; x <= w; x += 4) {
              const n = near(x, h / 2, 280);
              const phase = (k ? Math.PI * 0.9 : 0) * (1 - n) * (1 - calm * 0.5);
              const y = h / 2 + (k ? 24 : -24) * (1 - n) + Math.sin(x / 60 + t * 1.6 + phase) * 36;
              x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
            }
            ctx.stroke();
          }
          break;
        }
      }
      if (!reduced) raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, [motif]);

  return <canvas ref={ref} aria-hidden className={`block h-full w-full touch-none ${className}`} />;
}
