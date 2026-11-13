import { CLINIC } from "./site";

/** About page — content doc v4 (Dr. Jain's final biography). */
export const ABOUT = {
  h1: "About Dr. Mohit Jain",
  designation: `Consultant Psychiatrist · ${CLINIC.qualifications} · ${CLINIC.certification} · Reg. No. ${CLINIC.registration}`,
  intro:
    "Dr. Mohit Jain is a consultant psychiatrist at Mann Clinic, Gora Bazar, Raebareli. He completed his MBBS from King George's Medical University (KGMU), Lucknow, in 2012, and his MD in Neuro-Psychiatry from the same institution (2018-2021).",
  sections: [
    {
      title: "Experience in the United States",
      body: "After MBBS, Dr. Jain worked in the United States as a research assistant for approximately four years. Alongside research, he gained clinical exposure through observerships in the US healthcare system, developing an appreciation for collaborative, patient-centred care. He is ECFMG certified (USA).",
      year: "USA · approx. 4 years",
    },
    {
      title: "At IMHH, Agra",
      body: "Following his MD, Dr. Jain served as a Senior Resident in Psychiatry at the Institute of Mental Health and Hospital (IMHH), Agra — established in 1859, one of India's oldest psychiatric hospitals — for two years, and then as Assistant Professor in the Department of Psychiatry for two years, contributing to patient care, academic activities and the training of medical professionals.",
      year: "2 + 2 years",
    },
    {
      title: "At Mann Clinic",
      body: "Dr. Jain now consults at Mann Clinic, Gora Bazar, Raebareli, where he is committed to making mental healthcare accessible, understandable and compassionate. Through clinical practice and public mental-health education, he aims to reduce stigma, encourage timely professional consultation, and help individuals and families make informed decisions about treatment.",
      year: "Raebareli",
    },
  ],
  /** Clinical interests — each one links to its condition page. */
  interests: [
    { label: "Depression", slug: "depression-treatment" },
    { label: "Anxiety and panic symptoms", slug: "anxiety-treatment" },
    { label: "Sleep disorders", slug: "sleep-disorders-treatment" },
    { label: "Obsessive-compulsive disorder (OCD)", slug: "ocd-treatment" },
    { label: "Addiction-related problems", slug: "de-addiction-treatment" },
    { label: "Sexual health concerns", slug: "sexual-health" },
    { label: "Child and adolescent behavioural difficulties", slug: "child-adolescent-mental-health" },
    { label: "Memory problems, headaches and seizure disorders", slug: "memory-headache-seizure-treatment" },
  ],
  quote: "Mental health deserves the same attention and care as physical health.",
  approach:
    "His approach rests on compassionate listening, evidence-informed treatment, patient dignity, and supporting both patients and their families throughout recovery.",
  /** "The Journey (timeline)" — in order. */
  journey: [
    { t: "MBBS", d: "King George's Medical University, Lucknow", when: "2012" },
    { t: "Research Assistant and clinical observerships", d: "United States", when: "approx. 4 years" },
    { t: "ECFMG Certification", d: "USA", when: "" },
    { t: CLINIC.degree, d: "King George's Medical University, Lucknow", when: "2018-2021" },
    { t: "Senior Resident, Psychiatry", d: "IMHH, Agra", when: "2 years" },
    { t: "Assistant Professor, Department of Psychiatry", d: "IMHH, Agra", when: "2 years" },
    { t: "Consultant Psychiatrist", d: "Mann Clinic, Gora Bazar, Raebareli", when: "" },
  ],
  /** Registration & memberships. TODO(confirm): professional memberships (IPS etc.), if any. */
  registrationLine: `Medical Registration — ${CLINIC.registration}, ${CLINIC.council}`,
  ctaLine: "Consult Dr. Jain at Mann Clinic, Raebareli.",
};

/** Home: hero chips + credential tiles (v4). */
export const TRUST_CHIPS = [`${CLINIC.degree} — KGMU, Lucknow`, "Ex-Assistant Professor — IMHH, Agra", "ECFMG Certified — USA"];

export const CREDENTIAL_TILES = [
  { k: `MBBS & ${CLINIC.degree}`, v: "King George's Medical University, Lucknow", icon: "GraduationCap" },
  { k: "Senior Resident & Assistant Professor", v: "Institute of Mental Health & Hospital, Agra (2 + 2 years)", icon: "Landmark" },
  { k: "Research & Clinical Observerships", v: "United States (approx. 4 years)", icon: "FlaskConical" },
  { k: "ECFMG Certified", v: "USA", icon: "BadgeCheck" },
] as const;

/**
 * Titles below follow the owner's animation brief (11 Nov 2026) for the "Our approach" circles.
 * The content doc (v3 and v4) words the first two as "Compassionate" and "Confidential".
 */
export const PILLARS = [
  { t: "Compassionate Care", d: "You will be heard, not hurried. Your story matters as much as your symptoms.", icon: "HeartHandshake" },
  { t: "Confidential & Safe", d: "What you share in the consultation room stays in the consultation room.", icon: "LockKeyhole" },
  { t: "Evidence-Based", d: "Diagnosis and treatment grounded in science and international best practice — not guesswork.", icon: "Microscope" },
  { t: "Stigma-Free", d: "Seeing a psychiatrist is healthcare, exactly like seeing a cardiologist or an orthopaedic surgeon. Nothing more, nothing less.", icon: "Sun" },
] as const;

/**
 * Wording from the owner's animation brief (11 Nov 2026) for the first-visit timeline.
 * The content doc (v3 and v4) has longer versions: "An unhurried conversation / A clear explanation /
 * A plan made with you".
 */
export const FIRST_VISIT = [
  { t: "Conversation", d: "We listen to your concerns and understand your needs." },
  { t: "Explanation", d: "We discuss your concerns and explain the available treatment options in simple language." },
  { t: "Shared plan", d: "We work together to create a personalised care plan." },
];

export const HOW_TO_BOOK = [
  { t: "Message or call", d: `WhatsApp or call ${CLINIC.phoneDisplay}. A simple “Appointment chahiye” is enough.` },
  { t: "Pick a time", d: "You will be given the available slots. Choose what suits you." },
  { t: "Visit the clinic", d: "Come at your time. Bring any old prescriptions or reports if you have them." },
];
