"use client";

import { useMemo, useState, type ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";
import {
  buildDrafts,
  CHANNELS,
  emptyAnswers,
  SOURCES,
  type Answers,
  type Difficulty,
  type Draft,
  type DraftId,
} from "./drafts";

const inputClass =
  "w-full border border-dashed border-line-2 bg-ink px-3 py-3 text-paper placeholder:text-dim focus:border-solid focus:border-blue-text focus:outline-2 focus:outline-offset-2 focus:outline-paper";

type TextKey = {
  [K in keyof Answers]: Answers[K] extends string ? K : never;
}[keyof Answers];

function CopyButton({ text, label, event }: { text: string; label: string; event: string }) {
  const [status, setStatus] = useState<"idle" | "ok" | "ko">("idle");
  const copy = () =>
    navigator.clipboard?.writeText(text).then(
      () => {
        setStatus("ok");
        trackEvent(event);
      },
      () => setStatus("ko"),
    ) ?? setStatus("ko");
  return (
    <button
      type="button"
      onClick={copy}
      disabled={!text}
      className="label border border-line-2 px-3 py-2 text-paper hover:border-paper disabled:cursor-not-allowed disabled:opacity-40"
    >
      {status === "ok" ? "Copié ✓" : status === "ko" ? "Sélectionne le texte" : label}
    </button>
  );
}

function DraftBox({ id, draft }: { id: DraftId; draft: Draft }) {
  return (
    <div className="border border-line-2 bg-white/[0.03] p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="label text-blue-text">Ton brouillon</p>
        <CopyButton text={draft.text} label="Copier" event={`outil-copie-${id}`} />
      </div>
      {draft.text ? (
        <p className="mt-3 break-words whitespace-pre-wrap text-paper">{draft.text}</p>
      ) : (
        <p className="mt-3 text-mute">Il s’affichera ici dès que tu auras rempli un champ.</p>
      )}
      <p className="label mt-3 text-[0.6875rem] text-dim">{draft.text.length} caractères</p>
      {draft.tips.length ? (
        <ul className="mt-3 space-y-1.5 border-t border-line pt-3 text-sm text-mute">
          {draft.tips.map((tip) => (
            <li key={tip} className="flex gap-2">
              <span aria-hidden="true" className="font-mono text-blue-text">
                →
              </span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function Question({ title, children, id, draft }: { title: string; children: ReactNode; id: DraftId; draft: Draft }) {
  return (
    <fieldset className="border-t border-line pt-8">
      <legend className="float-left mb-5 w-full text-xl font-semibold text-paper">{title}</legend>
      <div className="clear-both grid gap-6 lg:grid-cols-2 lg:gap-8">
        <div className="space-y-5">{children}</div>
        <DraftBox id={id} draft={draft} />
      </div>
    </fieldset>
  );
}

export function QuestionnaireTool() {
  const [answers, setAnswers] = useState<Answers>(emptyAnswers);
  const drafts = useMemo(() => buildDrafts(answers), [answers]);

  const set = <K extends keyof Answers>(key: K, value: Answers[K]) => setAnswers((a) => ({ ...a, [key]: value }));
  const toggle = (key: "sources" | "channels", id: string) =>
    setAnswers((a) => ({
      ...a,
      [key]: a[key].includes(id) ? a[key].filter((item) => item !== id) : [...a[key], id],
    }));

  const text = (key: TextKey, label: string, placeholder: string, rows = 3) => {
    const fieldId = `outil-${key}`;
    return (
      <div>
        <label htmlFor={fieldId} className="mb-2 block text-mute">
          {label}
        </label>
        {rows === 1 ? (
          <input
            id={fieldId}
            className={inputClass}
            placeholder={placeholder}
            value={answers[key]}
            onChange={(e) => set(key, e.target.value)}
          />
        ) : (
          <textarea
            id={fieldId}
            rows={rows}
            className={inputClass}
            placeholder={placeholder}
            value={answers[key]}
            onChange={(e) => set(key, e.target.value)}
          />
        )}
      </div>
    );
  };

  const checks = (key: "sources" | "channels", options: readonly { id: string; label: string }[], legend: string) => (
    <div>
      <p className="mb-2 text-mute">{legend}</p>
      <div className="space-y-2">
        {options.map((option) => (
          <label key={option.id} className="flex cursor-pointer items-start gap-3 text-paper">
            <input
              type="checkbox"
              className="mt-1 h-5 w-5 shrink-0 accent-blue"
              checked={answers[key].includes(option.id)}
              onChange={() => toggle(key, option.id)}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );

  const allDrafts = (
    [
      ["Recrutement des testeurs", drafts.recruitment],
      ["Fonctions utilisées", drafts.coverage],
      ["Usage comparé à la production", drafts.usage],
      ["Retours des testeurs", drafts.feedback],
      ["Public visé", drafts.audience],
      ["Valeur de l’app", drafts.value],
      ["Installations prévues", drafts.installs],
      ["Changements après le test", drafts.changes],
      ["Préparation à la production", drafts.readiness],
    ] as const
  )
    .filter(([, draft]) => draft.text)
    .map(([title, draft]) => `${title}\n${draft.text}`)
    .join("\n\n");

  return (
    <div className="mt-12 space-y-12">
      <section aria-labelledby="partie-1" className="space-y-10">
        <h2 id="partie-1" className="display text-[clamp(2rem,4vw,3rem)]">
          Partie 1 : ton test fermé
        </h2>
        <Question title="Était-il facile de recruter des testeurs ?" id="recruitment" draft={drafts.recruitment}>
          <div>
            <label htmlFor="outil-difficulty" className="mb-2 block text-mute">
              Difficulté
            </label>
            <select
              id="outil-difficulty"
              className={inputClass}
              value={answers.difficulty}
              onChange={(e) => set("difficulty", e.target.value as Difficulty | "")}
            >
              <option value="">Choisir</option>
              <option value="facile">Facile</option>
              <option value="moyen">Un peu d’effort</option>
              <option value="difficile">Difficile</option>
            </select>
          </div>
          <div>
            <label htmlFor="outil-testerCount" className="mb-2 block text-mute">
              Nombre de testeurs
            </label>
            <input
              id="outil-testerCount"
              type="number"
              inputMode="numeric"
              min={0}
              className={inputClass}
              placeholder="14"
              value={answers.testerCount}
              onChange={(e) => set("testerCount", e.target.value)}
            />
          </div>
          {checks("sources", SOURCES, "D’où viennent-ils ?")}
          {text("recruitDetail", "Détails", "J’ai d’abord écrit à mes proches, puis j’ai complété avec…")}
        </Question>

        <Question title="Les testeurs ont-ils utilisé toutes les fonctions ?" id="coverage" draft={drafts.coverage}>
          {text("mostUsed", "Les plus utilisées", "le suivi des repas et les rappels")}
          {text("leastUsed", "Les moins testées", "l’export PDF", 2)}
          {text("coverageAction", "Ce que tu as fait pour les couvrir", "j’ai demandé à plusieurs testeurs de l’essayer", 2)}
        </Question>

        <Question title="L’usage ressemblait-il à celui attendu en production ?" id="usage" draft={drafts.usage}>
          {text("usageObserved", "Ce que les testeurs ont fait", "ils ouvraient l’app quelques minutes par jour")}
          {text("usageExpected", "Ce que tu attends en production", "plus d’usage le soir")}
          {text("usageGaps", "Les écarts constatés", "le mode hors ligne a été peu utilisé", 2)}
        </Question>

        <Question title="Quels retours as-tu reçus, et comment ?" id="feedback" draft={drafts.feedback}>
          {checks("channels", CHANNELS, "Comment les as-tu recueillis ?")}
          {text("feedback", "Les principaux retours", "3 testeurs ont signalé un crash à la connexion sur Android 12", 4)}
        </Question>
      </section>

      <section aria-labelledby="partie-2" className="space-y-10">
        <h2 id="partie-2" className="display text-[clamp(2rem,4vw,3rem)]">
          Partie 2 : ton app
        </h2>
        <Question title="À qui s’adresse-t-elle ?" id="audience" draft={drafts.audience}>
          {text("audience", "Ton public", "des personnes qui préparent les repas de leur famille", 2)}
        </Question>
        <Question title="Quelle valeur apporte-t-elle ?" id="value" draft={drafts.value}>
          {text("value", "Ce que l’app permet de faire", "elle crée le menu de la semaine et la liste de courses")}
        </Question>
        <Question title="Combien d’installations prévois-tu la première année ?" id="installs" draft={drafts.installs}>
          {text("installs", "Ton estimation", "1 000 à 5 000", 1)}
          {text("installsWhy", "Sur quoi elle repose", "ma communauté de 800 abonnés et un petit budget de lancement", 2)}
        </Question>
      </section>

      <section aria-labelledby="partie-3" className="space-y-10">
        <h2 id="partie-3" className="display text-[clamp(2rem,4vw,3rem)]">
          Partie 3 : ta préparation
        </h2>
        <Question title="Qu’as-tu changé après le test ?" id="changes" draft={drafts.changes}>
          {text("changes", "Un changement par ligne", "1.0.3 : correction du crash à la connexion\n1.0.4 : bouton d’ajout agrandi", 4)}
        </Question>
        <Question title="Comment as-tu décidé que l’app était prête ?" id="readiness" draft={drafts.readiness}>
          {text("readiness", "Tes critères", "plus aucun crash signalé sur la dernière version et les parcours testés sur plusieurs appareils")}
        </Question>
      </section>

      <div className="flex flex-wrap items-center gap-4 border-t border-line pt-8">
        <CopyButton text={allDrafts} label="Copier tous les brouillons" event="outil-copie-tout" />
        <p className="text-sm text-mute">Relis tout, puis colle chaque réponse dans ta Play Console.</p>
      </div>
    </div>
  );
}
