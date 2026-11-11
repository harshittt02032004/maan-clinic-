import { CLINIC } from "./site";

export const ABOUT = {
  h1: "About Dr. Mohit Jain",
  designation: `Consultant Psychiatrist · MBBS, MD (Psychiatry) — KGMU, Lucknow · Reg. No. ${CLINIC.registration}`,
  intro:
    "Dr. Mohit Jain is a consultant psychiatrist at Mann Clinic, Raebareli. He trained at King George's Medical University (KGMU), Lucknow — established in 1905, one of India's oldest medical institutions — where he completed both his MBBS and his MD in Psychiatry. He brings together international research exposure, academic experience and years of clinical practice to make quality mental healthcare available close to home.",
  sections: [
    {
      title: "Education & training",
      body: "Dr. Jain completed both his MBBS and his MD in Psychiatry at KGMU, Lucknow. He is also ECFMG certified (USA) — the credential that qualifies international medical graduates for practice and training in the United States.",
      year: "KGMU",
    },
    {
      title: "Research in the United States",
      body: "Before specialising, Dr. Jain spent four years (2012-2016) as a Research Assistant in the United States, working in medical research and evidence-based healthcare. That research discipline still shapes how he practises: treatment decisions at Mann Clinic are grounded in evidence, not assumption.",
      year: "2012–16",
    },
    {
      title: "Academic & clinical career",
      body: "After his MD, Dr. Jain served as a Senior Resident in Psychiatry for two years, and then as Assistant Professor at the Institute of Mental Health and Hospital (IMHH), Agra — established in 1859, one of India's oldest psychiatric hospitals. There he treated patients across the full range of psychiatric conditions while teaching and training medical students and postgraduate residents.",
      year: "IMHH Agra",
    },
    {
      title: "Forensic psychiatry fellowship & special interests",
      body: "Dr. Jain has been selected for a Forensic Psychiatry Fellowship in the United States, reflecting his interest in the interface between mental health and law. His special interests include forensic psychiatry, community mental health, de-addiction psychiatry and sexual medicine.",
      year: "USA",
    },
  ],
  quote:
    "Mental health is an integral part of overall well-being. Quality psychiatric care should be accessible, understandable and stigma-free — for everyone.",
  credentials: [
    "MBBS — King George's Medical University, Lucknow",
    "MD (Psychiatry) — King George's Medical University, Lucknow",
    `Medical Registration — ${CLINIC.registration}, ${CLINIC.council}`,
    "ECFMG Certified — USA",
    "Research Assistant — United States (2012-2016)",
    "Senior Resident, Psychiatry — 2 years",
    "Assistant Professor — Institute of Mental Health & Hospital (IMHH), Agra",
    "Selected — Forensic Psychiatry Fellowship, USA",
  ],
  ctaLine: "Consult Dr. Jain at Mann Clinic, Raebareli.",
};

/** Home: hero chips + credential tiles. */
export const TRUST_CHIPS = [
  "MD Psychiatry — KGMU, Lucknow",
  "Ex-Assistant Professor — IMHH, Agra",
  "Research Experience — USA (2012-2016)",
];

export const CREDENTIAL_TILES = [
  { k: "MBBS & MD (Psychiatry)", v: "King George's Medical University, Lucknow", icon: "GraduationCap" },
  { k: "Assistant Professor", v: "Institute of Mental Health & Hospital, Agra", icon: "Landmark" },
  { k: "4 Years of Medical Research", v: "United States (2012-2016)", icon: "FlaskConical" },
  { k: "Forensic Psychiatry Fellowship", v: "Selected, USA", icon: "Scale" },
] as const;

export const PILLARS = [
  { t: "Compassionate Care", d: "You will be heard, not hurried. Your story matters as much as your symptoms.", icon: "HeartHandshake" },
  { t: "Confidential & Safe", d: "What you share in the consultation room stays in the consultation room.", icon: "LockKeyhole" },
  { t: "Evidence-Based", d: "Diagnosis and treatment grounded in science and international best practice — not guesswork.", icon: "Microscope" },
  { t: "Stigma-Free", d: "Seeing a psychiatrist is healthcare, exactly like seeing a cardiologist or an orthopaedic surgeon. Nothing more, nothing less.", icon: "Sun" },
] as const;

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
