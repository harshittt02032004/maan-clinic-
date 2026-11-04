import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import Accordion from "@/components/ui/Accordion";
import { PUBLIC_FAQS } from "@/content/faq";

export default function HomeFaq() {
  return (
    <section id="faq" className="rule-b">
      <div className="container-x grid gap-10 py-16 sm:py-20 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-4">
          <h2 className="text-3xl font-extrabold leading-[1] text-ink sm:text-4xl lg:text-[44px]">Before you book, you probably want to know…</h2>
          <Link href="/faq/" className="mt-6 inline-flex items-center gap-2 border-b-2 border-magenta pb-1 font-display font-bold text-ink hover:text-magenta">
            All questions <ArrowRight className="size-4" />
          </Link>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-8">
          <Accordion items={PUBLIC_FAQS.slice(0, 4)} />
        </Reveal>
      </div>
    </section>
  );
}
