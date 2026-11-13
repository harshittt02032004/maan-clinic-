import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import CtaBand from "@/components/layout/CtaBand";
import ConditionsGrid from "@/components/home/ConditionsGrid";

export const metadata: Metadata = {
  title: "Mental Health Conditions We Treat | Mann Clinic, Raebareli",
  description:
    "Depression, anxiety, OCD, sleep, de-addiction, sexual health, child & adolescent concerns, memory and seizure problems — care at Mann Clinic, Raebareli.",
  alternates: { canonical: "/conditions/" },
};

export default function ConditionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Conditions"
        title="Conditions We Treat"
        hindi="हर समस्या का नाम है — और इलाज भी।"
        intro="Every condition below is medical, common, and treatable. If any of this feels familiar — to you or to someone in your family — a consultation is a sensible next step."
        crumbs={[{ name: "Conditions", path: "/conditions/" }]}
        compact
      />
      <section className="container-x pb-10 pt-4">
        <ConditionsGrid />
      </section>
      <CtaBand />
    </>
  );
}
