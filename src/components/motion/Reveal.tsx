"use client";

import { useEffect, useRef, type CSSProperties, type HTMLAttributes } from "react";

/**
 * Fade-up on scroll, done by the browser instead of by JavaScript.
 *
 * One shared IntersectionObserver marks an element `data-in` the first time it enters the viewport; a CSS
 * keyframe animation (opacity + transform, see `reveal-up` in globals.css) does the rest on the compositor.
 * Previously each of the ~30 reveals on a page was animated by a script on every frame, which is what made
 * scrolling stutter on phones. Use `Stagger` around several `Item`s for a cascade.
 */
let shared: IntersectionObserver | null = null;
function observer() {
  if (!shared) {
    shared = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          (e.target as HTMLElement).dataset.in = "1";
          shared!.unobserve(e.target);
        }
      },
      { rootMargin: "-12% 0px -8% 0px" },
    );
  }
  return shared;
}

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = observer();
    io.observe(el);
    return () => io.unobserve(el);
  }, []);
  return ref;
}

type DivProps = HTMLAttributes<HTMLDivElement>;

export function Reveal({ delay = 0, style, children, ...rest }: DivProps & { delay?: number }) {
  const ref = useReveal();
  return (
    <div ref={ref} data-reveal style={delay ? ({ ...style, "--rd": `${delay}s` } as CSSProperties) : style} {...rest}>
      {children}
    </div>
  );
}

export function Stagger({ gap = 0.08, style, children, ...rest }: DivProps & { gap?: number }) {
  const ref = useReveal();
  // number the items once so each can wait its turn (CSS reads --i)
  useEffect(() => {
    ref.current?.querySelectorAll<HTMLElement>(":scope > [data-reveal-item]").forEach((el, i) => el.style.setProperty("--i", String(i)));
  });
  return (
    <div ref={ref} data-stagger style={{ ...style, "--rg": `${gap}s` } as CSSProperties} {...rest}>
      {children}
    </div>
  );
}

export function Item({ children, ...rest }: DivProps) {
  return (
    <div data-reveal-item {...rest}>
      {children}
    </div>
  );
}
