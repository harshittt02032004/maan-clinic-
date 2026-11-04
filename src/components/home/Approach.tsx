import { Reveal, Stagger, Item } from "@/components/motion/Reveal";
import { PILLARS } from "@/content/about";

export default function Approach() {
  return (
    <section className="rule-b">
      <div className="container-x flex flex-col gap-9 py-16 sm:py-20">
        <Reveal className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <h2 className="max-w-2xl text-4xl font-extrabold leading-[1] text-ink sm:text-5xl lg:text-[56px]">Four things you can expect in every consultation.</h2>
          <p className="hindi text-xl font-semibold text-magenta sm:text-2xl lg:text-right">हर बात सुनी जाएगी —<br />बिना जल्दबाज़ी, बिना फ़ैसले।</p>
        </Reveal>
        <Stagger className="grid border-[1.5px] border-ink sm:grid-cols-2 lg:grid-cols-4" gap={0.08}>
          {PILLARS.map((p, i) => (
            <Item
              key={p.t}
              className={`group flex flex-col gap-10 p-6 transition-colors duration-300 hover:bg-blush sm:p-7 ${i < 3 ? "border-b-[1.5px] border-ink sm:border-b-0 lg:border-r-[1.5px]" : ""} ${i < 2 ? "sm:border-b-[1.5px] lg:border-b-0" : ""} ${i === 0 || i === 2 ? "sm:border-r-[1.5px]" : ""} ${i === 3 ? "bg-blush" : ""}`}
            >
              <span className="font-display text-[44px] font-extrabold leading-none text-magenta transition-transform duration-300 group-hover:-translate-y-1">0{i + 1}</span>
              <div>
                <h3 className="font-display text-[22px] font-bold text-ink">{p.t}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-body">{p.d}</p>
              </div>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
