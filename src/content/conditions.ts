/** All copy below is verbatim from the Mann Clinic content doc v3 (NMC-aligned). */

export type Motif = "rain" | "pulse" | "loop" | "wave" | "fragments" | "night" | "chain" | "pair";

export type Faq = { q: string; a: string };

export type Condition = {
  slug: string;
  name: string;
  hindi: string;
  card: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  /** Highlighted Hindi strip shown above the intro (de-addiction). */
  hindiLead?: string;
  /** Optional list shown before the signs (de-addiction: “What we treat”). */
  treats?: { title: string; items: string[] };
  signsTitle: string;
  signs: string[];
  whenToConsult: string;
  safetyNote?: boolean;
  honesty?: string;
  treatment: string;
  faqs: Faq[];
  motif: Motif;
  motifCaption: string;
};

export const CONDITION_CTA = "A confidential consultation is one message away.";

export const CONDITIONS: Condition[] = [
  {
    slug: "depression-treatment",
    name: "Depression",
    hindi: "उदासी जो जाती नहीं",
    card: "Persistent sadness, low energy, and loss of interest in things you once enjoyed. Depression is a medical condition, not a weakness — and it is treatable.",
    h1: "Depression Treatment in Raebareli",
    metaTitle: "Depression Treatment in Raebareli | Mann Clinic — Dr. Mohit Jain",
    metaDescription:
      "Persistent sadness, low energy, loss of interest? Confidential, evidence-based depression treatment in Raebareli by Dr. Mohit Jain, MD Psychiatry (KGMU).",
    intro:
      "Feeling low for a few days is normal. But when sadness stays for weeks, drains your energy, and pulls you away from work, family and the things you enjoyed — that is depression. It is one of the most common medical conditions in the world, and it is treatable.",
    signsTitle: "Common signs of depression",
    signs: [
      "Persistent sadness or emptiness for more than two weeks",
      "Loss of interest in work, hobbies or people",
      "Constant tiredness and low energy",
      "Sleeping too little — or too much",
      "Changes in appetite or weight",
      "Difficulty concentrating or making decisions",
      "Feelings of guilt, hopelessness or worthlessness",
      "Thoughts that life is not worth living",
    ],
    whenToConsult:
      "If several of these signs have stayed for two weeks or more — or if thoughts of self-harm have appeared even once — consult a psychiatrist. The earlier treatment begins, the easier recovery usually is.",
    safetyNote: true,
    treatment:
      "Your consultation begins with a detailed, unhurried assessment. Dr. Jain explains what is happening in simple language, then builds a plan with you — counselling and therapy, medication where it is needed, and regular follow-ups to track recovery. No labels, no judgement, complete confidentiality.",
    faqs: [
      {
        q: "Is depression a real illness, or just weakness?",
        a: "It is a real medical illness involving changes in brain chemistry — and like other illnesses, it has established medical treatment. Willpower alone is not a treatment plan.",
      },
      {
        q: "How long does treatment take?",
        a: "Improvement is usually gradual — many people begin to notice change within a few weeks of starting treatment. Total duration depends on the person and the severity, and it is reviewed with you at every follow-up.",
      },
    ],
    motif: "rain",
    motifCaption: "Heavy, falling — then slowly, light rises.",
  },
  {
    slug: "anxiety-treatment",
    name: "Anxiety & Panic Attacks",
    hindi: "बेचैनी और घबराहट",
    card: "Constant worry, panic attacks, restlessness, a racing heart. Anxiety is more than “overthinking” — and it can be managed with proper treatment.",
    h1: "Anxiety & Panic Attack Treatment in Raebareli",
    metaTitle: "Anxiety & Panic Attack Treatment in Raebareli | Mann Clinic",
    metaDescription:
      "Constant worry, racing heart, panic attacks? Confidential, evidence-based anxiety treatment in Raebareli from Dr. Mohit Jain, MD Psychiatry (KGMU, Lucknow).",
    intro:
      "Worrying before an exam or an important decision is normal. But when worry becomes constant, uncontrollable, and starts showing up in the body — racing heart, breathlessness, trembling — it is an anxiety disorder. This includes generalised anxiety, panic disorder, social anxiety and phobias. All of them are treatable.",
    signsTitle: "Common signs of anxiety",
    signs: [
      "Excessive worry that is hard to control",
      "Restlessness, feeling constantly on edge",
      "Racing heart, sweating, trembling",
      "Chest tightness or breathlessness",
      "Sudden episodes of intense fear (panic attacks)",
      "Avoiding places or situations out of fear",
      "Trouble falling asleep because the mind will not stop",
      "Repeated negative thoughts about the future",
    ],
    whenToConsult:
      "A very common story: sudden palpitations, an emergency visit, an ECG — and all reports come back normal. If your reports are normal but the ghabrahat keeps returning, the cause may be anxiety. That is not “nothing” — it is a recognised, treatable condition.",
    treatment:
      "Treatment starts with a proper assessment to identify the type of anxiety. The plan may include breathing and behavioural techniques, structured therapy such as CBT, and medication when needed — always discussed with you first, with regular follow-ups.",
    faqs: [
      {
        q: "Are panic attacks dangerous?",
        a: "They feel terrifying — like a heart attack — but they are not life-threatening. With treatment, panic attacks typically become less frequent and less intense.",
      },
      {
        q: "Can anxiety improve without medicines?",
        a: "Often, yes. Many mild to moderate cases respond to therapy and techniques alone. Dr. Jain discusses every option with you before deciding.",
      },
    ],
    motif: "pulse",
    motifCaption: "A racing rhythm that learns to slow down.",
  },
  {
    slug: "ocd-treatment",
    name: "Obsessive-Compulsive Disorder (OCD)",
    hindi: "बार-बार वही विचार",
    card: "Unwanted, repetitive thoughts and rituals that take over your day. Structured, evidence-based treatment helps you take your time back.",
    h1: "OCD Treatment in Raebareli",
    metaTitle: "OCD Treatment in Raebareli | Mann Clinic — Dr. Mohit Jain",
    metaDescription:
      "Repeated thoughts, washing, checking? OCD is a treatable condition. Confidential, evidence-based OCD treatment in Raebareli by Dr. Mohit Jain, MD (KGMU).",
    intro:
      "Obsessive-Compulsive Disorder (OCD) is a cycle of unwanted thoughts (obsessions) and repeated actions done to relieve them (compulsions) — washing, checking, counting, asking for reassurance. It is not a “habit” and not a personality type. It is a medical condition that can consume hours of every day — and it responds to evidence-based treatment.",
    signsTitle: "Common signs of OCD",
    signs: [
      "Fear of dirt or germs, with repeated washing or cleaning",
      "Checking locks, gas, switches again and again",
      "A strong need for symmetry or exact order",
      "Disturbing, unwanted thoughts that cause guilt or fear",
      "Counting, repeating words or actions in a fixed pattern",
      "Repeatedly asking family for reassurance",
      "Simple tasks taking hours to finish",
    ],
    whenToConsult:
      "If these thoughts and rituals take more than an hour of your day, or cause real distress at home or work, it is time to consult. OCD rarely fades on its own — structured treatment is what breaks the cycle.",
    treatment:
      "Dr. Jain uses a combination of structured therapy — including ERP (Exposure and Response Prevention), an internationally recommended, evidence-based therapy for OCD — and medication where needed. Family members are guided on how to support recovery without feeding the rituals.",
    faqs: [
      {
        q: "Are these thoughts my fault?",
        a: "No. Intrusive thoughts are a symptom of the condition, not a reflection of your character. Treatment targets the cycle, not you.",
      },
      {
        q: "Will OCD go away on its own?",
        a: "Usually it persists or slowly grows without treatment. With proper, consistent treatment, lasting improvement is achievable.",
      },
    ],
    motif: "loop",
    motifCaption: "The same loop, again and again — until the cycle breaks open.",
  },
  {
    slug: "bipolar-disorder-treatment",
    name: "Bipolar Disorder",
    hindi: "कभी आसमान पर, कभी ज़मीन पर",
    card: "Extreme swings between emotional highs and lows. With the right diagnosis and a consistent plan, stability is achievable.",
    h1: "Bipolar Disorder Treatment in Raebareli",
    metaTitle: "Bipolar Disorder Treatment in Raebareli | Mann Clinic",
    metaDescription:
      "Phases of unusual energy followed by deep lows? Bipolar disorder is manageable. Confidential treatment in Raebareli by Dr. Mohit Jain, MD Psychiatry (KGMU).",
    intro:
      "Bipolar disorder is more than mood swings. It brings episodes of unusually high energy and confidence (mania) and episodes of deep depression — sometimes weeks or months apart. With the correct diagnosis and a consistent treatment plan, people with bipolar disorder live stable, full lives.",
    signsTitle: "Signs to watch for",
    signs: [
      "High phase: unusually high energy with very little need for sleep",
      "High phase: talking fast, thoughts racing, jumping between plans",
      "High phase: overconfidence, big spending, risky decisions",
      "High phase: irritability when questioned or stopped",
      "Low phase: deep sadness, exhaustion and withdrawal",
      "Low phase: loss of interest, hopelessness",
      "A repeating pattern of such highs and lows over time",
    ],
    whenToConsult:
      "Families usually notice it first — “kabhi aasman par, kabhi zameen par.” Because the low phase looks exactly like depression, bipolar disorder is often misdiagnosed. A proper psychiatric evaluation makes all the difference.",
    treatment:
      "Treatment rests on three things: an accurate diagnosis, mood-stabilising treatment, and continuity. Dr. Jain builds a long-term plan with you and your family — including how to recognise the early signs of an episode. Regular follow-up is one of the biggest factors in staying stable.",
    faqs: [
      {
        q: "Is bipolar disorder lifelong?",
        a: "It is a long-term condition — like diabetes or blood pressure. With regular treatment, episodes can often be prevented and life stays on track.",
      },
      {
        q: "Can a person with bipolar disorder work and marry normally?",
        a: "Yes. With stable treatment and follow-up, absolutely.",
      },
    ],
    motif: "wave",
    motifCaption: "Highs and lows that gradually find their level.",
  },
  {
    slug: "schizophrenia-treatment",
    name: "Psychotic Disorders & Schizophrenia",
    hindi: "सिज़ोफ्रेनिया और साइकोसिस",
    card: "Early diagnosis and consistent treatment are linked to better long-term outcomes. Families receive clear guidance and support at every step.",
    h1: "Schizophrenia & Psychosis Treatment in Raebareli",
    metaTitle: "Schizophrenia Treatment in Raebareli | Mann Clinic",
    metaDescription:
      "Hearing voices, unusual suspicion, social withdrawal? Early treatment matters. Confidential psychosis care in Raebareli — Dr. Mohit Jain, MD (KGMU).",
    intro:
      "Psychotic disorders, including schizophrenia, affect how a person thinks and perceives reality. For families, the early signs are frightening and confusing. Here is what matters most: psychosis is a medical condition of the brain — and with early diagnosis and regular treatment, recovery and a meaningful life are possible.",
    signsTitle: "Early signs families often notice",
    signs: [
      "Hearing voices that others cannot hear",
      "Unusual suspicion — “people are against me”, “someone is following me”",
      "Talking or smiling to oneself without reason",
      "Speech that is hard to follow or connect",
      "Withdrawing from friends, family and routine",
      "Neglecting bathing, food and self-care",
      "Sudden decline in work or studies",
      "Firm beliefs that are clearly not based in reality",
    ],
    whenToConsult:
      "The person affected often does not realise something is wrong — so the family's role is crucial. Medical evidence consistently links earlier treatment with better long-term outcomes.",
    treatment:
      "Dr. Jain served as Assistant Professor at the Institute of Mental Health and Hospital (IMHH), Agra — established in 1859, one of India's oldest psychiatric hospitals — where he treated patients across the full range of psychiatric conditions. Treatment at Mann Clinic includes thorough evaluation, medication, structured family guidance, relapse prevention and long-term follow-up. Families are never left alone in this; they are guided on exactly how to support recovery at home.",
    faqs: [
      {
        q: "Can a person with schizophrenia recover?",
        a: "With regular treatment, many patients return to work, studies and family life. The single most important factor is not stopping treatment midway.",
      },
      {
        q: "How should we talk to the patient at home?",
        a: "Calmly, and without arguing over their beliefs. Dr. Jain guides every family on this in detail during consultation.",
      },
    ],
    motif: "fragments",
    motifCaption: "Scattered pieces, slowly finding their shape.",
  },
  {
    slug: "sleep-disorders-treatment",
    name: "Sleep Disorders",
    hindi: "नींद न आना",
    card: "Insomnia and disturbed sleep affect mood, memory and physical health. Treating sleep often improves much more than sleep.",
    h1: "Sleep Disorder & Insomnia Treatment in Raebareli",
    metaTitle: "Sleep Disorder & Insomnia Treatment in Raebareli | Mann Clinic",
    metaDescription:
      "Can't sleep — or sleeping too much? Poor sleep affects mood, memory and health. Evidence-based insomnia treatment in Raebareli by Dr. Mohit Jain, MD (KGMU).",
    intro:
      "Sleep is not a luxury — it is when the brain repairs itself. Long-term poor sleep affects mood, memory, blood pressure, sugar control and relationships. Often, a sleep problem is also the first visible sign of underlying anxiety or depression. Treating it properly often improves much more than sleep.",
    signsTitle: "Common sleep problems",
    signs: [
      "Difficulty falling asleep despite being tired",
      "Waking repeatedly during the night",
      "Waking too early and not falling back asleep",
      "Sleep that does not feel refreshing",
      "Excessive sleepiness during the day",
      "Dependence on sleeping pills to sleep at all",
      "Frequent nightmares or disturbed sleep",
      "A badly shifted sleep cycle (late nights, shift work)",
    ],
    whenToConsult:
      "If sleep is disturbed more than three nights a week for several weeks — or if you have started taking sleeping pills or alcohol on your own to sleep — it is time to consult. Self-medication tends to make sleep problems worse over time.",
    treatment:
      "The first step is finding the cause: anxiety, depression, habits, medicines or a medical issue. The plan then combines a structured sleep-hygiene routine, behavioural techniques (CBT-I), treatment of any underlying condition, and careful, short-term medication only where needed. The goal is natural sleep — not lifelong pills.",
    faqs: [
      {
        q: "Are sleeping pills safe?",
        a: "Under medical supervision and for short periods, they can help. Taken on your own for months, they create dependence. The goal of treatment is to restore natural sleep.",
      },
      {
        q: "Does phone use really affect sleep?",
        a: "Yes — late-night screens delay the brain's sleep signal. Screen habits are part of the assessment and the plan.",
      },
    ],
    motif: "night",
    motifCaption: "A restless night sky that settles into stillness.",
  },
  {
    slug: "de-addiction-treatment",
    name: "De-Addiction",
    hindi: "नशा मुक्ति",
    card: "Alcohol, tobacco and substance dependence are medical conditions, not character flaws. Recovery here is structured, supervised and completely confidential.",
    h1: "De-Addiction Treatment in Raebareli",
    metaTitle: "De-Addiction Treatment in Raebareli | Mann Clinic — Dr. Mohit Jain",
    metaDescription:
      "Alcohol, tobacco, ganja, smack — addiction is a brain condition, and it is treatable. Completely confidential de-addiction treatment in Raebareli. Dr. Mohit Jain, MD (KGMU).",
    hindiLead: "नशा एक मानसिक बीमारी है — और इसका इलाज है।",
    intro:
      "Addiction is not weak willpower and not bad character. It is a medical condition of the brain — and like other medical conditions, it has structured, supervised treatment. At Mann Clinic, de-addiction treatment is completely confidential: it stays between you and your doctor.",
    treats: {
      title: "What we treat",
      items: [
        "Alcohol (sharab)",
        "Tobacco — gutkha, khaini, cigarettes",
        "Cannabis — ganja, charas",
        "Opioids — smack, heroin, injectable drugs",
        "Prescription medicines — sleeping pills taken without supervision",
        "Other substance dependence",
      ],
    },
    signsTitle: "Signs that use has become addiction",
    signs: [
      "Needing more of the substance for the same effect",
      "Repeated attempts to quit that did not last",
      "Restlessness, tremors or sleeplessness when stopping",
      "Money, work or family suffering because of use",
      "Hiding use from family",
      "The day starting to revolve around the substance",
    ],
    whenToConsult:
      "If you have tried to quit and could not, the problem is not your willpower — withdrawal and craving are medical processes, and they respond to medical treatment. If quitting alone has not worked, a medical consultation is the logical next step.",
    treatment:
      "Treatment at Mann Clinic follows a clear medical path: assessment, safe withdrawal management, medicines to reduce craving, counselling and relapse prevention, and family involvement where you want it. Most patients are treated on an OPD basis — quietly, with dignity, and in complete privacy.",
    faqs: [
      {
        q: "Can addiction really be treated with medicine?",
        a: "Yes. Withdrawal symptoms and craving both have established medical treatment. Expecting someone to fight them with willpower alone is unfair — and usually unsuccessful.",
      },
      {
        q: "Will anyone find out about my treatment?",
        a: "No. Your treatment is between you and your doctor. Records and conversations are kept confidential.",
      },
      {
        q: "Is admission necessary?",
        a: "Most patients are treated without admission, through regular OPD visits. If more support is ever needed, Dr. Jain will discuss it with you first.",
      },
    ],
    motif: "chain",
    motifCaption: "Links that held tight — loosening, one by one.",
  },
  {
    slug: "sexual-health",
    name: "Sexual Health",
    hindi: "यौन स्वास्थ्य",
    card: "Evidence-based, private care for the concerns most people hesitate to talk about. No judgement — only answers and treatment.",
    h1: "Confidential Sexual Health Treatment in Raebareli",
    metaTitle: "Confidential Sexual Health Treatment in Raebareli | Mann Clinic",
    metaDescription:
      "ED, premature ejaculation, low desire, performance anxiety — confidential, science-based sexual health treatment in Raebareli by Dr. Mohit Jain, MD (KGMU).",
    intro:
      "Most sexual health problems are common, medical, and very treatable. What makes them worse is silence and misinformation. At Mann Clinic, sexual health care is what it should be: scientific, private and free of judgement, from a qualified MD psychiatrist with a special interest in sexual medicine.",
    signsTitle: "Concerns we treat",
    signs: [
      "Erectile dysfunction",
      "Premature ejaculation",
      "Low sexual desire",
      "Performance anxiety — before or after marriage",
      "Dhat syndrome and related worries",
      "Sexual problems linked to stress, depression or medicines",
      "Couples' concerns",
    ],
    honesty:
      "Our promise of honesty: no magic cures, no “guaranteed result in 7 days”, no miracle courses. Correct diagnosis and evidence-based medical treatment — the approach medical science supports.",
    whenToConsult:
      "If a concern has persisted for weeks or months, or is affecting your confidence or your relationship, consult a qualified doctor. Many sexual problems have a treatable psychological dimension, which is exactly where psychiatric training matters.",
    treatment:
      "Your consultation is fully private. Dr. Jain assesses both the medical and psychological sides of the concern, explains the actual cause in plain language, and builds an evidence-based treatment plan. Couple counselling is available where it helps — only if you want it.",
    faqs: [
      { q: "Is everything really confidential?", a: "Yes. Your records and conversations are kept private." },
      { q: "Should my spouse come along?", a: "Sometimes it helps, but it is never necessary. Your comfort decides." },
    ],
    motif: "pair",
    motifCaption: "Two rhythms, out of step — finding each other again.",
  },
];

export const conditionBySlug = (slug: string) => CONDITIONS.find((c) => c.slug === slug);

/** Short labels for menus. */
export const shortName = (c: Condition) =>
  c.slug === "schizophrenia-treatment"
    ? "Schizophrenia & Psychosis"
    : c.slug === "ocd-treatment"
      ? "OCD"
      : c.name;
