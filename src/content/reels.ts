/**
 * Short videos from the clinic's own Instagram reels (@drmohitjainpsy), supplied by the
 * owner 2026-11-14 and re-encoded for the web (scripts: ffmpeg, see git history).
 * Educational topic labels only — no outcome claims (NMC).
 */
export type Reel = {
  src: string;
  poster: string;
  title: string;
  hindi?: string;
  /** Condition page the reel's topic belongs to, if any. */
  href?: string;
  seconds: number;
};

export const REELS: Reel[] = [
  { src: "/reels/r3.mp4", poster: "/reels/r3.webp", title: "Anxiety in women", hindi: "घबराहट और चिड़चिड़ापन", href: "/anxiety-treatment/", seconds: 64 },
  { src: "/reels/r1.mp4", poster: "/reels/r1.webp", title: "De-addiction", hindi: "शराब की आदत", href: "/de-addiction-treatment/", seconds: 51 },
  { src: "/reels/r5.mp4", poster: "/reels/r5.webp", title: "Seizures (mirgi)", hindi: "मिर्गी का दौरा", href: "/memory-headache-seizure-treatment/", seconds: 92 },
  { src: "/reels/r2.mp4", poster: "/reels/r2.webp", title: "Sexual health", hindi: "बेझिझक पूछिए", href: "/sexual-health/", seconds: 57 },
  { src: "/reels/r0.mp4", poster: "/reels/r0.webp", title: "Women's mental health", hindi: "क्या आप जानती हैं?", seconds: 64 },
  { src: "/reels/r4.mp4", poster: "/reels/r4.webp", title: "Stress & calm", hindi: "तनाव", seconds: 46 },
];
