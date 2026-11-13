import { CONDITIONS } from "@/content/conditions";

/**
 * Grouping used by the homepage "Conditions we treat" tabs.
 * Every description is taken verbatim from the existing condition pages
 * (card / intro / FAQ copy) — nothing new is claimed here.
 */
export type GroupIcon = "mood" | "anxiety" | "psychotic" | "sleep" | "addiction" | "other";

export type GroupCondition = {
  name: string;
  /** Existing condition page this links to. */
  slug: string;
  description: string;
};

export type ConditionGroup = {
  id: string;
  name: string;
  icon: GroupIcon;
  intro: string;
  conditions: GroupCondition[];
};

const by = (slug: string) => {
  const c = CONDITIONS.find((x) => x.slug === slug);
  if (!c) throw new Error(`Unknown condition slug: ${slug}`);
  return c;
};

export const CONDITION_GROUPS: ConditionGroup[] = [
  {
    id: "mood",
    name: "Mood Disorders",
    icon: "mood",
    intro: "Conditions that change how you feel day after day — a low that will not lift, or swings between highs and lows.",
    conditions: [
      { name: "Depression", slug: "depression-treatment", description: by("depression-treatment").card },
      { name: "Bipolar Disorder", slug: "bipolar-disorder-treatment", description: by("bipolar-disorder-treatment").card },
    ],
  },
  {
    id: "anxiety",
    name: "Anxiety Disorders",
    icon: "anxiety",
    intro: "Worry that has become constant and uncontrollable, often showing up in the body as a racing heart, breathlessness or trembling.",
    conditions: [
      { name: "Anxiety", slug: "anxiety-treatment", description: by("anxiety-treatment").card },
      {
        name: "Panic Attacks",
        slug: "anxiety-treatment",
        description: "Sudden episodes of intense fear. They feel terrifying — like a heart attack — but they are not life-threatening. With treatment, panic attacks typically become less frequent and less intense.",
      },
    ],
  },
  {
    id: "psychotic",
    name: "Psychotic Disorders",
    icon: "psychotic",
    intro: "Conditions that affect how a person thinks and perceives reality. Early diagnosis and regular treatment matter most.",
    conditions: [
      { name: "Schizophrenia", slug: "schizophrenia-treatment", description: by("schizophrenia-treatment").card },
      {
        name: "Psychosis",
        slug: "schizophrenia-treatment",
        description: "Psychosis is a medical condition of the brain — and with early diagnosis and regular treatment, recovery and a meaningful life are possible. Families receive clear guidance and support at every step.",
      },
    ],
  },
  {
    id: "sleep",
    name: "Sleep Disorders",
    icon: "sleep",
    intro: "Sleep is when the brain repairs itself. Long-term poor sleep affects mood, memory, blood pressure, sugar control and relationships.",
    conditions: [
      { name: "Insomnia", slug: "sleep-disorders-treatment", description: by("sleep-disorders-treatment").card },
      {
        name: "Sleep-related concerns",
        slug: "sleep-disorders-treatment",
        description: "Often, a sleep problem is also the first visible sign of underlying anxiety or depression. Treating it properly often improves much more than sleep.",
      },
    ],
  },
  {
    id: "addiction",
    name: "Addiction & Behavioural Concerns",
    icon: "addiction",
    intro: "Addiction is not weak willpower and not bad character. It is a medical condition of the brain — with structured, supervised and completely confidential treatment.",
    conditions: [
      {
        name: "Alcohol Dependence",
        slug: "de-addiction-treatment",
        description: "Alcohol (sharab) dependence is a medical condition, not a character flaw. Withdrawal symptoms and craving both have established medical treatment, and most patients are treated on an OPD basis — quietly, with dignity, and in complete privacy.",
      },
      {
        name: "Tobacco Dependence",
        slug: "de-addiction-treatment",
        description: "Gutkha, khaini and cigarettes. If you have tried to quit and could not, the problem is not your willpower — withdrawal and craving are medical processes, and they respond to medical treatment.",
      },
      {
        name: "Substance Use Concerns",
        slug: "de-addiction-treatment",
        description: "Cannabis (ganja, charas), opioids (smack, heroin), sleeping pills taken without supervision and other substance dependence. Treatment follows a clear medical path: assessment, safe withdrawal management, medicines to reduce craving, counselling and relapse prevention.",
      },
    ],
  },
  {
    id: "other",
    name: "Other Mental Health Concerns",
    icon: "other",
    intro: "Other concerns seen at the clinic, for every age — each one medical, common, and treatable.",
    conditions: [
      { name: "OCD", slug: "ocd-treatment", description: by("ocd-treatment").card },
      { name: "Sexual Health Concerns", slug: "sexual-health", description: by("sexual-health").card },
      // v4: the two new pages
      { name: "Child & Adolescent Concerns", slug: "child-adolescent-mental-health", description: by("child-adolescent-mental-health").card },
      { name: "Memory, Headache & Seizures", slug: "memory-headache-seizure-treatment", description: by("memory-headache-seizure-treatment").card },
    ],
  },
];
