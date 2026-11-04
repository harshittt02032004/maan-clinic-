import Hero from "@/components/home/Hero";
import PosterStrip from "@/components/home/PosterStrip";
import ConditionsIndex from "@/components/home/ConditionsIndex";
import AboutBand from "@/components/home/AboutBand";
import Approach from "@/components/home/Approach";
import BreathingGuide from "@/components/home/BreathingGuide";
import FirstVisit from "@/components/home/FirstVisit";
import HomeFaq from "@/components/home/HomeFaq";
import CtaBand from "@/components/layout/CtaBand";
import SectionHeading from "@/components/ui/SectionHeading";
import JsonLd from "@/components/ui/JsonLd";
import { faqLd } from "@/lib/seo";
import { PUBLIC_FAQS } from "@/content/faq";

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqLd(PUBLIC_FAQS.slice(0, 4))} />
      <Hero />
      <PosterStrip />

      <section id="conditions" className="rule-b">
        <div className="container-x grid gap-10 py-16 sm:py-20 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Conditions we treat"
              title={<>Common.<br />Medical.<br /><span className="text-magenta">Treatable.</span></>}
              intro="Every condition here is a recognised medical condition with established treatment. If any of this feels familiar — to you or someone at home — a consultation is a sensible next step."
            />
            <p className="hindi mt-5 text-[22px] font-semibold text-ink">हर समस्या का नाम है — और इलाज भी।</p>
          </div>
          <div className="lg:col-span-8">
            <ConditionsIndex />
          </div>
        </div>
      </section>

      <AboutBand />
      <Approach />
      <BreathingGuide />
      <FirstVisit />
      <HomeFaq />
      <CtaBand />
    </>
  );
}
