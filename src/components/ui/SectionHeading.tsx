import { Reveal } from "@/components/motion/Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  hindi,
  intro,
  tone = "dark",
  size = "lg",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  hindi?: string;
  intro?: string;
  tone?: "dark" | "light";
  size?: "lg" | "md";
}) {
  const dark = tone === "dark";
  return (
    <Reveal>
      {eyebrow && <p className={`kicker ${dark ? "" : "!text-magenta-soft"}`}><span className={`kicker-line ${dark ? "" : "!bg-magenta-soft"}`} />{eyebrow}</p>}
      <h2 className={`mt-4 font-extrabold leading-[1] ${size === "lg" ? "text-4xl sm:text-5xl lg:text-[56px]" : "text-3xl sm:text-4xl lg:text-[44px]"} ${dark ? "text-ink" : "text-white"}`}>{title}</h2>
      {hindi && <p className={`hindi mt-3 text-xl font-semibold sm:text-2xl ${dark ? "text-magenta" : "text-magenta-soft"}`}>{hindi}</p>}
      {intro && <p className={`mt-4 max-w-xl text-[16px] leading-relaxed sm:text-[17px] ${dark ? "text-body" : "text-[#C9D0E6]"}`}>{intro}</p>}
    </Reveal>
  );
}
