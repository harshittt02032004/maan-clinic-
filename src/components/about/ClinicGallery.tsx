import Image from "next/image";
import { Reveal, Stagger, Item } from "@/components/motion/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

/** Real photos of the clinic, from its Google Business Profile (no patients in frame). */
/** cell: grid span + aspect per breakpoint, chosen so the lg row is 2+1+1+1 = 5 equal-height cells. */
const PHOTOS = [
  { src: "/images/clinic/desk-wide.webp", alt: "Dr. Mohit Jain at his desk in the consultation room at Mann Clinic", cell: "col-span-2", box: "aspect-[16/8.2] lg:aspect-[8/5.1]" },
  { src: "/images/clinic/exterior.webp", alt: "Mann Clinic building and signboard, Gora Bazar, Raebareli", cell: "", box: "aspect-[4/3.9] lg:aspect-[4/5.1]" },
  { src: "/images/clinic/reception.webp", alt: "Reception area at Mann Clinic", cell: "", box: "aspect-[4/3.9] lg:aspect-[4/5.1]" },
  { src: "/images/clinic/consult-room.webp", alt: "Inside the consultation room at Mann Clinic", cell: "col-span-2 lg:col-span-1", box: "aspect-[16/8.2] lg:aspect-[4/5.1]" },
];

export default function ClinicGallery() {
  return (
    <section className="container-x section-y !pb-0">
      <SectionHeading eyebrow="The clinic" title="Where you will be seen." hindi="मन क्लिनिक, गोरा बाज़ार" />
      <Stagger className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5" gap={0.08}>
        {PHOTOS.map((p) => (
          <Item key={p.src} className={p.cell}>
            <div className={`relative overflow-hidden rounded-3xl border border-white/70 shadow-[var(--shadow-soft)] ${p.box}`}>
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes={p.cell.startsWith("col-span-2") ? "(min-width: 1024px) 40vw, 100vw" : "(min-width: 1024px) 20vw, 50vw"}
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </Item>
        ))}
      </Stagger>
      <Reveal delay={0.2}>
        <p className="mt-4 text-xs text-muted">Photos: Mann Clinic, Gora Bazar — from the clinic&apos;s Google profile.</p>
      </Reveal>
    </section>
  );
}
