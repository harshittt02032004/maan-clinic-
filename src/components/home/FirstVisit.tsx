import { Reveal, Stagger, Item } from "@/components/motion/Reveal";
import { FIRST_VISIT } from "@/content/about";

const NUM = ["१", "२", "३"];
const COL = ["text-ink", "text-magenta", "text-blue"];

export default function FirstVisit({
  steps = FIRST_VISIT,
  eyebrow = "Your first visit",
  title = "What actually happens in the room.",
}: {
  steps?: { t: string; d: string }[];
  eyebrow?: string;
  title?: string;
}) {
  return (
    <section className="rule-b bg-blush">
      <div className="container-x grid gap-10 py-16 sm:py-20 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-3">
          <p className="kicker"><span className="kicker-line" />{eyebrow}</p>
          <h2 className="mt-4 text-3xl font-extrabold leading-[1] text-ink sm:text-4xl lg:text-[44px]">{title}</h2>
        </Reveal>
        <Stagger className="grid gap-8 sm:grid-cols-3 lg:col-span-9" gap={0.12}>
          {steps.map((s, i) => (
            <Item key={s.t} className="flex gap-4 sm:flex-col sm:gap-3">
              <span className={`hindi w-12 shrink-0 text-[64px] font-extrabold leading-[0.9] sm:w-auto sm:text-[96px] ${COL[i % 3]}`}>{NUM[i % 3]}</span>
              <div>
                <h3 className="font-display text-[20px] font-bold text-ink sm:text-[22px]">{s.t}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-body">{s.d}</p>
              </div>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
