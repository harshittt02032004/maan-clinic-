import { CLINIC, SITE_URL } from "@/content/site";
import type { Faq } from "@/content/conditions";

export const CLINIC_ID = `${SITE_URL}/#clinic`;
export const DOCTOR_ID = `${SITE_URL}/#doctor`;

export const clinicLd = {
  "@context": "https://schema.org",
  "@type": ["MedicalClinic", "LocalBusiness"],
  "@id": CLINIC_ID,
  name: CLINIC.name,
  url: SITE_URL,
  telephone: CLINIC.phoneE164,
  medicalSpecialty: "Psychiatric",
  address: {
    "@type": "PostalAddress",
    streetAddress: `${CLINIC.address.line1}, ${CLINIC.address.line2}`,
    addressLocality: CLINIC.address.city,
    addressRegion: CLINIC.address.region,
    postalCode: CLINIC.address.postalCode,
    addressCountry: CLINIC.address.country,
  },
  openingHours: CLINIC.openingHours,
  hasMap: CLINIC.mapsLink,
  sameAs: [CLINIC.instagram, CLINIC.facebook],
  employee: { "@id": DOCTOR_ID },
};

export const doctorLd = {
  "@context": "https://schema.org",
  "@type": "Physician",
  "@id": DOCTOR_ID,
  name: CLINIC.doctor,
  jobTitle: CLINIC.role,
  medicalSpecialty: "Psychiatric",
  url: `${SITE_URL}/about-dr-mohit-jain/`,
  worksFor: { "@id": CLINIC_ID },
  alumniOf: [{ "@type": "CollegeOrUniversity", name: "King George's Medical University, Lucknow" }],
  hasCredential: [
    { "@type": "EducationalOccupationalCredential", credentialCategory: "degree", name: "MBBS" },
    { "@type": "EducationalOccupationalCredential", credentialCategory: "degree", name: "MD (Psychiatry)" },
    { "@type": "EducationalOccupationalCredential", name: "ECFMG Certified (USA)" },
  ],
};

export const faqLd = (faqs: Faq[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export const breadcrumbLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: `${SITE_URL}${it.path}`,
  })),
});

export const conditionLd = (name: string, path: string, description: string) => ({
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  url: `${SITE_URL}${path}`,
  name,
  description,
  about: { "@type": "MedicalCondition", name },
  provider: { "@id": CLINIC_ID },
  reviewedBy: { "@id": DOCTOR_ID },
});
