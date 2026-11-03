import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Accordion from "@/components/ui/Accordion";
import { PUBLIC_FAQS } from "@/content/faq";

export default function HomeFaq() {
  return (
    <section className="container-x section-y">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading eyebrow="Questions people ask" title="Before you book, you probably want to know…" hindi="जो सवाल सब पूछते हैं" />
          <Reveal delay={0.1}>
            <Link href="/faq/" className="btn-ghost mt-6 group">
              View all FAQs <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="lg:col-span-7">
          <Accordion items={PUBLIC_FAQS.slice(0, 4)} />
        </Reveal>
      </div>
    </section>
  );
}
