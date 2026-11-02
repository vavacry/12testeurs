// Assemble les brouillons à partir de ce que le développeur a saisi, sans rien inventer :
// un champ vide n'ajoute aucune phrase, et le résultat reste vide tant que rien n'est rempli.

export const SOURCES = [
  { id: "entourage", label: "Mon entourage", phrase: "mon entourage" },
  { id: "utilisateurs", label: "Mes utilisateurs ou ma liste email", phrase: "mes utilisateurs ou ma liste email" },
  { id: "communaute", label: "Une communauté de développeurs", phrase: "une communauté de développeurs" },
  { id: "service", label: "Un service de testeurs rémunéré", phrase: "un service de testeurs rémunéré" },
] as const;

export const CHANNELS = [
  { id: "app", label: "Formulaire dans l’app", phrase: "un formulaire dans l’app" },
  { id: "email", label: "Email", phrase: "email" },
  { id: "groupe", label: "Groupe de discussion", phrase: "un groupe de discussion" },
  { id: "console", label: "Retours privés Play Console", phrase: "les retours privés de la Play Console" },
] as const;

export const DIFFICULTIES = {
  facile: "Recruter mes testeurs a été facile.",
  moyen: "Recruter mes testeurs a demandé un peu d’effort.",
  difficile: "Recruter mes testeurs a été difficile.",
} as const;

export type Difficulty = keyof typeof DIFFICULTIES;

export type Answers = {
  difficulty: Difficulty | "";
  testerCount: string;
  sources: string[];
  recruitDetail: string;
  mostUsed: string;
  leastUsed: string;
  coverageAction: string;
  usageObserved: string;
  usageExpected: string;
  usageGaps: string;
  channels: string[];
  feedback: string;
  audience: string;
  value: string;
  installs: string;
  installsWhy: string;
  changes: string;
  readiness: string;
};

export const emptyAnswers: Answers = {
  difficulty: "",
  testerCount: "",
  sources: [],
  recruitDetail: "",
  mostUsed: "",
  leastUsed: "",
  coverageAction: "",
  usageObserved: "",
  usageExpected: "",
  usageGaps: "",
  channels: [],
  feedback: "",
  audience: "",
  value: "",
  installs: "",
  installsWhy: "",
  changes: "",
  readiness: "",
};

export type Draft = { text: string; tips: string[] };

// « crash corrigé » → « Crash corrigé. » ; garde la ponctuation finale déjà présente.
function sentence(value: string): string {
  const text = value.trim().replace(/\s*\n+\s*/g, " ");
  if (!text) return "";
  const capitalized = text[0].toLocaleUpperCase("fr-FR") + text.slice(1);
  return /[.!?…:]$/.test(capitalized) ? capitalized : `${capitalized}.`;
}

// Texte placé après un début de phrase : « Principaux retours : deux crashs. »
function after(prefix: string, value: string): string {
  const text = value.trim().replace(/\s*\n+\s*/g, " ");
  if (!text) return "";
  return `${prefix} ${text}${/[.!?…]$/.test(text) ? "" : "."}`;
}

function joinFr(items: string[]): string {
  if (items.length < 2) return items.join("");
  return `${items.slice(0, -1).join(", ")} et ${items[items.length - 1]}`;
}

const phrases = (ids: string[], options: readonly { id: string; phrase: string }[]) =>
  options.filter((option) => ids.includes(option.id)).map((option) => option.phrase);

const lines = (...parts: string[]) => parts.filter(Boolean).join(" ");

function recruitment(a: Answers): Draft {
  const count = Number.parseInt(a.testerCount, 10);
  const sources = phrases(a.sources, SOURCES);
  const who = Number.isNaN(count) ? "mes testeurs" : `${count} testeur${count > 1 ? "s" : ""}`;
  const reunited = sources.length
    ? `J’ai réuni ${who} grâce à ${joinFr(sources)}.`
    : Number.isNaN(count)
      ? ""
      : `J’ai réuni ${who}.`;
  const tips: string[] = [];
  if (!sources.length) tips.push("Indique d’où viennent tes testeurs.");
  if (!Number.isNaN(count) && count < 12) tips.push("Google demande au moins 12 testeurs inscrits au moment de la demande.");
  if (!a.recruitDetail.trim()) tips.push("Ajoute comment tu les as contactés et ce qui a été simple ou non.");
  return {
    text: lines(a.difficulty ? DIFFICULTIES[a.difficulty] : "", reunited, sentence(a.recruitDetail)),
    tips,
  };
}

function coverage(a: Answers): Draft {
  const tips: string[] = [];
  if (!a.mostUsed.trim()) tips.push("Cite les fonctions que les testeurs ont réellement utilisées.");
  if (!a.leastUsed.trim()) tips.push("Cite aussi ce qui a été moins testé, ou écris que tout a été couvert.");
  return {
    text: lines(
      after("Les fonctions les plus utilisées ont été :", a.mostUsed),
      after("Celles qui ont été moins testées :", a.leastUsed),
      after("Ce que j’ai fait pour les couvrir :", a.coverageAction),
    ),
    tips,
  };
}

function usage(a: Answers): Draft {
  const tips: string[] = [];
  if (!a.usageObserved.trim()) tips.push("Décris ce que les testeurs ont fait pendant le test.");
  if (!a.usageExpected.trim()) tips.push("Compare avec l’usage que tu attends en production.");
  if (!a.usageGaps.trim()) tips.push("Cite les écarts, ou écris qu’il n’y en a pas eu.");
  return {
    text: lines(
      after("Pendant le test :", a.usageObserved),
      after("En production, j’attends :", a.usageExpected),
      after("Écarts constatés :", a.usageGaps),
    ),
    tips,
  };
}

function feedback(a: Answers): Draft {
  const channels = phrases(a.channels, CHANNELS);
  const tips: string[] = [];
  if (!channels.length) tips.push("Indique comment tu as recueilli les retours.");
  if (!a.feedback.trim()) tips.push("Résume les retours reçus.");
  else if (!/\d/.test(a.feedback)) tips.push("Donne des faits précis : nombre de testeurs, écran, appareil ou version.");
  return {
    text: lines(
      channels.length ? `J’ai recueilli les retours par ${joinFr(channels)}.` : "",
      after("Principaux retours :", a.feedback),
    ),
    tips,
  };
}

function installs(a: Answers): Draft {
  const tips: string[] = [];
  if (!a.installs.trim()) tips.push("Donne une estimation réaliste.");
  if (!a.installsWhy.trim()) tips.push("Explique sur quoi elle repose : ton lancement, ta communauté, tes moyens.");
  return {
    text: lines(
      a.installs.trim() ? `J’estime ${a.installs.trim()} installations la première année.` : "",
      after("Cette estimation repose sur :", a.installsWhy),
    ),
    tips,
  };
}

function changes(a: Answers): Draft {
  const items = a.changes
    .split("\n")
    .map((line) => line.trim().replace(/^[-•]\s*/, ""))
    .filter(Boolean);
  const tips: string[] = [];
  if (!items.length) tips.push("Liste ce que tu as changé. Si rien n’a bougé, explique pourquoi.");
  else if (!/\d/.test(a.changes)) tips.push("Ajoute les numéros de version quand tu les as.");
  return {
    text: items.length ? `Changements faits après le test :\n${items.map((item) => `- ${item}`).join("\n")}` : "",
    tips,
  };
}

function readiness(a: Answers): Draft {
  const text = a.readiness.trim();
  return {
    text: after("J’ai décidé que l’app était prête en me basant sur :", a.readiness),
    tips: text.length >= 40 ? [] : ["Donne tes critères : crashs, parcours testés, derniers retours reçus."],
  };
}

function single(value: string, tip: string): Draft {
  return { text: sentence(value), tips: value.trim() ? [] : [tip] };
}

export const buildDrafts = (a: Answers) => ({
  recruitment: recruitment(a),
  coverage: coverage(a),
  usage: usage(a),
  feedback: feedback(a),
  audience: single(a.audience, "Décris un public précis."),
  value: single(a.value, "Dis ce que l’app permet de faire, en une ou deux phrases."),
  installs: installs(a),
  changes: changes(a),
  readiness: readiness(a),
});

export type DraftId = keyof ReturnType<typeof buildDrafts>;
