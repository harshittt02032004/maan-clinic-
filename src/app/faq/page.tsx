import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import CtaBand from "@/components/layout/CtaBand";
import Accordion from "@/components/ui/Accordion";
import JsonLd from "@/components/ui/JsonLd";
import { Reveal } from "@/components/motion/Reveal";
import { PUBLIC_FAQS } from "@/content/faq";
import { faqLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "FAQs — Psychiatric Treatment at Mann Clinic, Raebareli",
  description:
    "Common questions about consulting a psychiatrist — confidentiality, medicines, duration of treatment, appointments at Mann Clinic, Raebareli. Answered simply.",
  alternates: { canonical: "/faq/" },
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqLd(PUBLIC_FAQS)} />
      <PageHero eyebrow="FAQ" title="Frequently Asked Questions" hindi="जो सवाल सब पूछते हैं — सीधे जवाब" crumbs={[{ name: "FAQ", path: "/faq/" }]} compact />
      <section className="container-x max-w-4xl pb-6">
        <Reveal>
          <Accordion items={PUBLIC_FAQS} />
        </Reveal>
      </section>
      <CtaBand />
    </>
  );
}
