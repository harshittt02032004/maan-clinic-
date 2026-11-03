/**
 * Single source of truth for clinic facts.
 * Anything wrapped in [square brackets] is still a placeholder from the
 * content doc (v3, NMC-aligned) — confirm with Dr. Jain, then replace here.
 */

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mann-clinic.vercel.app";

export const CLINIC = {
  name: "Mann Clinic",
  brandMark: "मन",
  tagline: "Mann Clinic — confidential, evidence-based psychiatric care in Raebareli.",
  doctor: "Dr. Mohit Jain",
  doctorShort: "Dr. Jain",
  role: "Consultant Psychiatrist",
  qualifications: "MBBS, MD (Psychiatry)",
  university: "KGMU, Lucknow",
  /** TODO(confirm): registration number + council — permitted info under NMC rules. */
  registration: "[Registration Number]",
  council: "[Medical Council]",
  /**
   * Main line per the Google Business Profile (98894 97550). The newer Instagram
   * posters print 79-9182-2067 as Call/WhatsApp — kept as `altPhone`.
   */
  phoneDisplay: "+91 98894 97550",
  phoneE164: "+919889497550",
  whatsappE164: "919889497550",
  altPhoneDisplay: "+91 79918 22067",
  /** Google Business Profile address (2026-11-03). Facebook/Instagram bio says "In front of the church, Near Kendriya Vidyalaya, Gora Bazar" — same spot. */
  address: {
    line1: "In front of the Church, Singh Vihar Colony",
    line2: "Near Central School (KV), Krishna Nagar, Civil Lines",
    city: "Raebareli",
    region: "Uttar Pradesh",
    postalCode: "229001",
    country: "IN",
  },
  /** From the Google Business Profile. TODO(confirm): Saturday — GBP showed it closed in the Diwali week only. */
  timings: "Mon–Sun · 9 AM–12 PM & 4 PM–8 PM",
  openingHours: ["Mo-Su 09:00-12:00", "Mo-Su 16:00-20:00"],
  mapsLink: "https://maps.google.com/?cid=16889960855991577045",
  mapsEmbed: "https://www.google.com/maps?q=Mann+Clinic+Dr.+Mohit+Jain+Civil+Lines+Raebareli&output=embed",
  /** Optional, NMC-permitted. Leave null to keep the fee off the website. */
  fee: null as string | null,
  instagram: "https://www.instagram.com/drmohitjainpsy/",
  facebook: "https://www.facebook.com/drmohitjainpsy/",
  /** Drop the doctor's photo at public/images/dr-mohit-jain.jpg and set this to that path. */
  doctorPhoto: null as string | null,
  teleManas: "14416",
} as const;

export const fullAddress = `${CLINIC.address.line1}, ${CLINIC.address.line2}, ${CLINIC.address.city}, UP ${CLINIC.address.postalCode}`;

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/about-dr-mohit-jain/", label: "About Dr. Jain" },
  { href: "/conditions/", label: "Conditions", dropdown: true },
  { href: "/faq/", label: "FAQ" },
  { href: "/contact/", label: "Contact" },
] as const;

export const DISCLAIMER =
  "The information on this website is for general awareness only and is not a substitute for professional medical advice, diagnosis or treatment. Please consult a qualified doctor for any concerns about your health.";

export const CRISIS_LINE =
  "If you or someone you know is in severe emotional distress, the Government of India's free 24x7 mental health helpline Tele-MANAS is available at 14416.";

export function whatsappLink(text = "Hello, I would like to book an appointment at Mann Clinic.") {
  return `https://wa.me/${CLINIC.whatsappE164}?text=${encodeURIComponent(text)}`;
}

export const telLink = `tel:${CLINIC.phoneE164}`;
