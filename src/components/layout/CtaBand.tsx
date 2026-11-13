import Link from "next/link";
import { MessageCircle, CalendarCheck } from "lucide-react";
import Magnetic from "@/components/motion/Magnetic";
import { Reveal } from "@/components/motion/Reveal";
import { CLINIC, whatsappLink } from "@/content/site";

export default function CtaBand({
  headline = "The first step is the hardest. It is also the most important.",
  hindi = "पहला कदम आप उठाइए — बाकी हम संभाल लेंगे।",
}: {
  headline?: string;
  hindi?: string | null;
}) {
  return (
    <section className="container-x section-y !pb-8">
      <Reveal>
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-navy-900 px-5 py-12 text-center text-white sm:rounded-[2.5rem] sm:px-12 sm:py-20">
          {/* two soft colour washes: still on phones, a slow drift from md up */}
          <div aria-hidden className="blob -left-20 -top-20 size-[26rem] bg-pink-600/60 md:motion-safe:animate-[wash-a_12s_ease-in-out_infinite]" />
          <div aria-hidden className="blob -bottom-24 -right-16 size-[22rem] bg-navy-400/60 md:motion-safe:animate-[wash-b_14s_ease-in-out_infinite]" />
          <div className="relative">
            <h2 className="mx-auto max-w-3xl text-[1.7rem] font-extrabold leading-tight sm:text-5xl">{headline}</h2>
            {hindi && <p className="hindi mt-4 text-lg text-pink-200 sm:text-2xl">{hindi}</p>}
            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:mt-9 sm:flex-row sm:items-center">
              <Magnetic className="block sm:inline-block">
                <Link href="/contact/" className="btn-primary w-full sm:w-auto">
                  <CalendarCheck className="size-4" /> Book an Appointment
                </Link>
              </Magnetic>
              <Magnetic className="block sm:inline-block">
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-ghost w-full !border-white/25 !bg-white/10 !text-white hover:!bg-white/20 sm:w-auto">
                  <MessageCircle className="size-4" /> WhatsApp {CLINIC.phoneDisplay}
                </a>
              </Magnetic>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
