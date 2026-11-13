import { CLINIC, fullAddress } from "./site";
import type { Faq } from "./conditions";

type SiteFaq = Faq & {
  /** Still a placeholder in the content doc — hidden from the page and the FAQ schema until confirmed. */
  pending?: boolean;
};

export const FAQS: SiteFaq[] = [
  {
    q: "Will everything I share stay confidential?",
    a: "Yes. Whatever you discuss during your consultation stays between you and the doctor.",
  },
  {
    q: "Does visiting a psychiatrist mean something is “seriously wrong” with me?",
    a: "No. Most patients come for stress, sleep problems, low mood or anxiety. Consulting a psychiatrist for the mind is exactly like consulting a cardiologist for the heart.",
  },
  {
    q: "Are psychiatric medicines addictive? Will they become a “nasha”?",
    a: "No. Medicines prescribed and monitored by a psychiatrist are treatment, not addiction. A few medicines are reduced gradually when stopping — which is exactly why they are taken under a doctor's supervision.",
  },
  {
    q: "Will I have to take medicines for life?",
    a: "Not necessarily. Duration depends on the condition. Many treatments are short-term, and every decision about medication is discussed openly with you.",
  },
  {
    q: "Can I stop the medicines once I feel better?",
    a: "Feeling better means the treatment is working — stopping suddenly on your own often brings the problem back. Dr. Jain will reduce and stop medicines at the right time, the right way.",
  },
  {
    q: "Can I bring a family member with me?",
    a: "Of course. You can come alone or with family — whatever you are more comfortable with.",
  },
  {
    q: "Do I need a referral from another doctor?",
    a: "No. You can book an appointment directly.",
  },
  {
    q: "What should I bring to the first visit?",
    a: "Any old prescriptions, reports, and a list of medicines you currently take. If you have nothing, that is fine too.",
  },
  {
    q: "Do you see children and teenagers?",
    a: "Yes. Dr. Jain sees children and adolescents for behavioural and emotional concerns. Parents are involved at every step.",
  },
  {
    q: "Is online consultation available?",
    a: `Yes, video consultations are available. WhatsApp ${CLINIC.phoneDisplay} to book an online slot.`,
    pending: true,
  },
  {
    q: "What is the consultation fee?",
    a: CLINIC.fee
      ? `The consultation fee is ${CLINIC.fee}.`
      : `Please call or WhatsApp ${CLINIC.phoneDisplay} for consultation details.`,
  },
  {
    q: "How do I book an appointment?",
    a: `Call or WhatsApp ${CLINIC.phoneDisplay}, or visit us at ${fullAddress} during clinic hours.`,
  },
];

export const PUBLIC_FAQS = FAQS.filter((f) => !f.pending);
