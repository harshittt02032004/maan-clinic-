import { Reveal } from "@/components/motion/Reveal";
import LineReveal from "@/components/motion/LineReveal";

export default function SectionHeading({
  eyebrow,
  title,
  hindi,
  intro,
  align = "left",
  tone = "dark",
}: {
  eyebrow?: string;
  title: string;
  hindi?: string;
  intro?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
}) {
  const center = align === "center";
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-2xl`}>
      {eyebrow && (
        <Reveal>
          <span className="eyebrow">{eyebrow}</span>
        </Reveal>
      )}
      <LineReveal className={`mt-4 text-3xl font-extrabold leading-[1.1] sm:text-4xl lg:text-5xl ${tone === "dark" ? "text-navy-900" : "text-white"}`}>{title}</LineReveal>
      {hindi && (
        <Reveal delay={0.2}>
          <p className={`hindi mt-2 text-lg ${tone === "dark" ? "text-pink-600" : "text-pink-200"}`}>{hindi}</p>
        </Reveal>
      )}
      {intro && (
        <Reveal delay={0.3}>
          <p className={`mt-4 text-base leading-relaxed sm:text-lg ${tone === "dark" ? "text-muted" : "text-navy-100"}`}>{intro}</p>
        </Reveal>
      )}
    </div>
  );
}
