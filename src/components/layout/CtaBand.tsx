import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { CLINIC, fullAddress, whatsappLink } from "@/content/site";

export default function CtaBand({
  headline = "The first step is the hardest. It is also the most important.",
  hindi = "पहला कदम आप उठाइए — बाकी हम संभाल लेंगे।",
}: {
  headline?: string;
  hindi?: string | null;
}) {
  return (
    <section id="book" className="rule-t bg-magenta text-white">
      <div className="container-x grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-12">
        <Reveal className="lg:col-span-8">
          <h2 className="text-4xl font-extrabold leading-[1] sm:text-5xl lg:text-6xl">{headline}</h2>
          {hindi && <p className="hindi mt-4 text-xl font-semibold sm:text-2xl lg:text-3xl">{hindi}</p>}
        </Reveal>
        <Reveal delay={0.1} className="flex flex-col gap-3 lg:col-span-4">
          <Link href="/contact/" className="btn-ink w-full !py-5 text-[16px]">Book an appointment <ArrowRight className="size-4" /></Link>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-white w-full !py-5 text-[16px]">WhatsApp {CLINIC.phoneDisplay}</a>
          <p className="text-center text-[13px]">{fullAddress}</p>
        </Reveal>
      </div>
    </section>
  );
}
