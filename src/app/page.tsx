import Hero from "@/components/home/Hero";
import Credentials from "@/components/home/Credentials";
import ConditionsGrid from "@/components/home/ConditionsGrid";
import AboutPreview from "@/components/home/AboutPreview";
import Approach from "@/components/home/Approach";
import BreathingGuide from "@/components/home/BreathingGuide";
import FirstVisit from "@/components/home/FirstVisit";
import HomeFaq from "@/components/home/HomeFaq";
import CtaBand from "@/components/layout/CtaBand";
import DrawDivider from "@/components/motion/DrawDivider";
import SectionHeading from "@/components/ui/SectionHeading";
import JsonLd from "@/components/ui/JsonLd";
import { faqLd } from "@/lib/seo";
import { PUBLIC_FAQS } from "@/content/faq";

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqLd(PUBLIC_FAQS.slice(0, 4))} />
      <Hero />
      <Credentials />

      <section className="container-x section-y" id="conditions">
        <SectionHeading
          eyebrow="Conditions we treat"
          title="Common. Medical. Treatable."
          hindi="हर समस्या का नाम है — और इलाज भी।"
          intro="Each of these is a recognised medical condition with established treatment. Tap a card to understand the signs and what a consultation involves."
          align="center"
        />
        <div className="mt-12">
          <ConditionsGrid />
        </div>
      </section>

      <DrawDivider />
      <AboutPreview />
      <Approach />
      <BreathingGuide />
      <DrawDivider />
      <FirstVisit />
      <DrawDivider />
      <HomeFaq />
      <CtaBand />
    </>
  );
}
