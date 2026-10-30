"use client";

import Link from "next/link";
import { useActionState, type InputHTMLAttributes } from "react";
import { PixelArrow } from "@/components/ui";
import { site } from "@/lib/site";
import { submitOrder, type OrderState } from "./order";

const initialState: OrderState = { status: "idle" };

function Field({
  id,
  prompt,
  label,
  hint,
  error,
  ...input
}: {
  id: string;
  prompt: string;
  label: string;
  hint?: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>) {
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") || undefined;
  return (
    <div>
      <label htmlFor={id} className="block">
        <span aria-hidden="true" className="label block text-blue-text">
          me@12testeurs:~$ {prompt}
        </span>
        <span className="mt-1.5 block font-semibold text-paper">{label}</span>
      </label>
      <div
        className={`mt-3 flex items-center border border-dashed bg-ink focus-within:border-solid focus-within:border-blue-text focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-paper ${error ? "border-alert" : "border-line-2"}`}
      >
        <span aria-hidden="true" className="pl-4 font-mono text-blue-text">
          &gt;
        </span>
        <input
          id={id}
          name={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className="w-full min-w-0 bg-transparent px-3 py-3.5 font-mono text-[0.95rem] text-paper placeholder:text-dim focus:outline-none"
          {...input}
        />
      </div>
      {hint ? (
        <p id={`${id}-hint`} className="mt-2 text-sm text-mute">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function OrderForm() {
  const [state, formAction, pending] = useActionState(async (prev: OrderState, formData: FormData) => {
    // Le Payment Link Stripe redirige vers /commande?session_id=… : on le joint à la commande.
    formData.set("sessionId", new URLSearchParams(window.location.search).get("session_id") ?? "");
    return submitOrder(prev, formData);
  }, initialState);

  if (state.status === "success") {
    return (
      <div role="status" className="space-y-3 p-6 font-mono text-sm leading-relaxed text-mute md:p-8">
        <p>
          <span className="text-ok">[ OK ]</span> commande reçue
        </p>
        <p>
          <span className="text-ok">[ OK ]</span> on t’écrit très vite{state.email ? ` à ${state.email}` : ""}
        </p>
        <p>
          <span className="text-ok">[ OK ]</span> les 14 testeurs s’inscrivent sous 24–48 h après réception de ton lien
        </p>
        <p className="pt-4 text-paper">
          Tu peux fermer cette page. Une question ? {site.contactEmail}
          <span className="caret" />
        </p>
      </div>
    );
  }

  if (state.status === "email" && state.summary) {
    const href = `mailto:${site.contactEmail}?subject=${encodeURIComponent("Commande 12testeurs")}&body=${encodeURIComponent(state.summary)}`;
    return (
      <div role="status" className="space-y-5 p-6 md:p-8">
        <p className="font-mono text-sm text-mute">
          <span className="text-ok">[ OK ]</span> infos prêtes
        </p>
        <p className="text-lg text-paper">Dernier clic : envoie-nous ce récapitulatif par email pour lancer ton test.</p>
        <pre className="overflow-x-auto border border-line-2 bg-ink p-4 font-mono text-[0.8125rem] whitespace-pre-wrap text-mute">
          {state.summary}
        </pre>
        <a href={href} className="btn">
          Envoyer ma commande
          <PixelArrow className="btn-arrow" />
        </a>
        <p className="text-sm text-mute">Ou copie le texte ci-dessus et envoie-le à {site.contactEmail}.</p>
      </div>
    );
  }

  const v = state.values ?? {};
  const e = state.errors ?? {};

  return (
    <form action={formAction} className="space-y-8 p-6 md:p-8">
      <Field
        id="name"
        prompt="whoami"
        label="Ton nom"
        autoComplete="name"
        placeholder="Prénom Nom"
        required
        maxLength={120}
        defaultValue={v.name}
        error={e.name}
      />
      <Field
        id="email"
        prompt="mail --address"
        label="Ton email"
        type="email"
        autoComplete="email"
        placeholder="toi@domaine.com"
        required
        maxLength={200}
        defaultValue={v.email}
        error={e.email}
      />
      <Field
        id="appName"
        prompt="app --nom"
        label="Le nom de ton app"
        placeholder="Mon Super Projet"
        required
        maxLength={120}
        defaultValue={v.appName}
        error={e.appName}
      />
      <Field
        id="packageId"
        prompt="app --package"
        label="L’ID du package"
        hint="Visible dans la Play Console, sous le nom de ton app. Exemple : com.tonnom.tonapp"
        placeholder="com.tonnom.tonapp"
        required
        autoCapitalize="none"
        spellCheck={false}
        pattern="[a-zA-Z][a-zA-Z0-9_]*(\.[a-zA-Z][a-zA-Z0-9_]*)+"
        maxLength={150}
        defaultValue={v.packageId}
        error={e.packageId}
      />
      <Field
        id="testLink"
        prompt="test --lien"
        label="Le lien de ton test fermé (si déjà créé)"
        hint="Le lien d’inscription des testeurs. Pas encore créé ? Laisse vide et coche la case ci-dessous."
        type="url"
        inputMode="url"
        placeholder="https://play.google.com/apps/testing/…"
        maxLength={500}
        defaultValue={v.testLink}
        error={e.testLink}
      />

      <div className="space-y-5 border-t border-line-2 pt-8">
        <label className="flex cursor-pointer gap-4">
          <input type="checkbox" name="needHelp" className="mt-1 h-5 w-5 shrink-0 accent-blue" />
          <span className="text-mute">
            <span className="font-semibold text-paper">Je n’ai pas encore créé mon test fermé.</span> J’ai besoin d’aide
            pour la piste de test, le Google Group et le lien d’inscription.
          </span>
        </label>
        <label className="flex cursor-pointer gap-4">
          <input type="checkbox" name="expressStart" className="mt-1 h-5 w-5 shrink-0 accent-blue" />
          <span className="text-mute">
            <span className="font-semibold text-paper">Je demande que le test démarre tout de suite</span>, sans attendre
            la fin de mon délai de rétractation de 14 jours. Si je me rétracte en cours de test, je paierai la part déjà
            réalisée (
            <Link href="/cgv#article-9" target="_blank" className="text-paper underline underline-offset-4">
              article 9 des CGV
            </Link>
            ). Sans cette case, le test démarre à la fin du délai.
          </span>
        </label>
      </div>

      {/* Pot de miel anti-spam, invisible pour les humains */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Ne pas remplir</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {state.status === "error" && state.message ? (
        <p role="alert" className="border border-alert px-4 py-3 text-alert">
          {state.message}
          {!state.errors ? ` (${site.contactEmail})` : null}
        </p>
      ) : null}

      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <button type="submit" disabled={pending} className="btn disabled:cursor-wait disabled:opacity-70">
          <span aria-hidden="true">[y]</span>
          {pending ? "Transmission…" : "Envoyer et lancer le test"}
          <PixelArrow className="btn-arrow" />
        </button>
        <p className="text-sm text-mute">
          Tes données servent uniquement à exécuter ta commande.{" "}
          <Link href="/confidentialite" target="_blank" className="text-paper underline underline-offset-4">
            Confidentialité
          </Link>
        </p>
      </div>
    </form>
  );
}
