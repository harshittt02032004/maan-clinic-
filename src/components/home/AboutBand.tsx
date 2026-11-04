import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal, Stagger, Item } from "@/components/motion/Reveal";
import { ABOUT } from "@/content/about";
import { CLINIC } from "@/content/site";

const LADDER = [
  { y: "1905", t: "KGMU, Lucknow", d: "MBBS & MD (Psychiatry)" },
  { y: "2012–16", t: "United States", d: "Research Assistant · ECFMG certified" },
  { y: "1859", t: "IMHH, Agra", d: "Senior Resident · Assistant Professor" },
  { y: "USA", t: "Forensic Psychiatry Fellowship", d: "Selected · interests: forensic, community, de-addiction, sexual medicine" },
];

export default function AboutBand() {
  return (
    <section id="about" className="bg-ink text-white">
      <div className="container-x grid gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:gap-8">
        <Reveal className="flex flex-col gap-6 lg:col-span-6">
          <p className="kicker !text-magenta-soft"><span className="kicker-line !bg-magenta-soft" />About Dr. Mohit Jain</p>
          <blockquote className="font-display text-[28px] font-semibold leading-[1.15] sm:text-[36px] lg:text-[40px]">“{ABOUT.quote}”</blockquote>
          <p className="max-w-lg text-[16px] leading-relaxed text-[#C9D0E6]">
            Trained at King George&apos;s Medical University, Lucknow — established 1905 — for both MBBS and MD Psychiatry. Four years of medical research in the United States, then Senior Resident and Assistant Professor at the Institute of Mental Health &amp; Hospital, Agra (est. 1859).
          </p>
          <Link href="/about-dr-mohit-jain/" className="btn-white w-max">Know Dr. Jain <ArrowRight className="size-4" /></Link>
        </Reveal>

        <div className="lg:col-span-5 lg:col-start-8">
          <Stagger className="border-l-[1.5px] border-magenta-soft pl-6 sm:pl-8" gap={0.1}>
            {LADDER.map((l, i) => (
              <Item key={l.t} className={`grid grid-cols-[88px_1fr] gap-4 py-4 sm:grid-cols-[110px_1fr] ${i < LADDER.length - 1 ? "border-b border-ink-2" : ""}`}>
                <span className="font-display font-bold text-magenta-soft">{l.y}</span>
                <span>
                  <span className="block font-semibold">{l.t}</span>
                  <span className="block text-[15px] text-[#C9D0E6]">{l.d}</span>
                </span>
              </Item>
            ))}
            <Item className="pt-5 text-[13px] text-[#C9D0E6]">Reg. No. {CLINIC.registration}, {CLINIC.council}</Item>
          </Stagger>
        </div>
      </div>
    </section>
  );
}
