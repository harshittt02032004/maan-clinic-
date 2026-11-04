import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import CtaBand from "@/components/layout/CtaBand";
import ConditionsIndex from "@/components/home/ConditionsIndex";

export const metadata: Metadata = {
  title: "Mental Health Conditions We Treat | Mann Clinic, Raebareli",
  description:
    "Depression, anxiety, OCD, bipolar disorder, schizophrenia, sleep problems, de-addiction and sexual health — confidential treatment at Mann Clinic, Raebareli.",
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
      <section className="container-x py-12 sm:py-16">
        <ConditionsIndex />
      </section>
      <CtaBand />
    </>
  );
}
