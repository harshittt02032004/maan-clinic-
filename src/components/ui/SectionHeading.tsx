import { Reveal } from "@/components/motion/Reveal";

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
    <Reveal className={`${center ? "mx-auto text-center" : ""} max-w-2xl`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className={`mt-4 text-3xl font-extrabold leading-[1.1] sm:text-4xl lg:text-5xl ${tone === "dark" ? "text-navy-900" : "text-white"}`}>{title}</h2>
      {hindi && <p className={`hindi mt-2 text-lg ${tone === "dark" ? "text-pink-600" : "text-pink-200"}`}>{hindi}</p>}
      {intro && <p className={`mt-4 text-base leading-relaxed sm:text-lg ${tone === "dark" ? "text-muted" : "text-navy-100"}`}>{intro}</p>}
    </Reveal>
  );
}
