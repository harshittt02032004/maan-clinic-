import type { Motif } from "@/content/conditions";

/** Small line icons — one per condition motif — drawn to match the poster style. */
export default function MotifIcon({ motif, className = "size-6" }: { motif: Motif; className?: string }) {
  const p = { className, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  switch (motif) {
    case "rain":
      return <svg {...p}><path d="M7 3v3M12 2v3M17 3v3" /><path d="M5 10a7 7 0 0 1 14 0c0 4-7 11-7 11S5 14 5 10z" /></svg>;
    case "pulse":
      return <svg {...p}><path d="M3 12h4l2-6 4 12 2-6h6" /></svg>;
    case "loop":
      return <svg {...p}><path d="M8 12a4 4 0 1 1 4 4" /><path d="M16 12a4 4 0 1 1-4-4" /><path d="M12 16l-1.5 2M12 8l1.5-2" /></svg>;
    case "wave":
      return <svg {...p}><path d="M2 14c3-8 5-8 8 0s5 8 8 0 3-6 4-6" /></svg>;
    case "fragments":
      return <svg {...p}><path d="M12 3l3 5-3 2-3-2z" /><path d="M5 10l4 1-1 4-4-1z" /><path d="M15 12l4-1 1 4-4 1z" /><path d="M10 17l2 4 2-4z" /></svg>;
    case "night":
      return <svg {...p}><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" /><path d="M17 3v3M18.5 4.5h-3" /></svg>;
    case "chain":
      return <svg {...p}><path d="M10 14a3.5 3.5 0 0 0 5 0l3-3a3.5 3.5 0 0 0-5-5l-1 1" /><path d="M14 10a3.5 3.5 0 0 0-5 0l-3 3a3.5 3.5 0 0 0 5 5l1-1" /><path d="M4 4l2 2M20 20l-2-2" /></svg>;
    case "pair":
      return <svg {...p}><path d="M2 10c3-5 5-5 8 0s5 5 8 0" /><path d="M2 16c3-5 5-5 8 0s5 5 8 0" /><circle cx="21" cy="13" r="1" /></svg>;
    case "blocks":
      return <svg {...p}><rect x="3" y="13" width="8" height="8" rx="1.5" /><rect x="13" y="13" width="8" height="8" rx="1.5" /><rect x="8" y="3" width="8" height="8" rx="1.5" /></svg>;
    case "links":
      return <svg {...p}><circle cx="5" cy="7" r="2" /><circle cx="19" cy="6" r="2" /><circle cx="12" cy="18" r="2.5" /><path d="M7 6.9l10-.8M6 8.8l4.6 7.1M17.9 7.7l-4.5 8.2" /></svg>;
  }
}
