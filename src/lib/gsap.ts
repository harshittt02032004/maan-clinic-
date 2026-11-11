import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

let registered = false;

/** Registers GSAP plugins once, in the browser only. Call from useEffect. */
export function initGsap() {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, SplitText);
    registered = true;
    // web fonts can change text height after the first measurement: re-measure trigger positions once
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  }
  return { gsap, ScrollTrigger, SplitText };
}

/**
 * Every scroll animation is wrapped in `mm.add(NO_REDUCE, …)`. Visitors who prefer reduced
 * motion never enter that branch, so nothing is hidden or moved: they get the final state.
 */
export const NO_REDUCE = "(prefers-reduced-motion: no-preference)";

export function pathLength(el: Element): number {
  try {
    return (el as SVGGeometryElement).getTotalLength();
  } catch {
    return 100;
  }
}
