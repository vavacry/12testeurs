import Link from "next/link";
import type { CSSProperties } from "react";
import { faq } from "@/content/faq";
import { proof } from "@/content/proof";
import { PlayOnView } from "@/components/PlayOnView";
import { Tabs } from "@/components/Tabs";
import { CtaBlock, CtaButton, Logo, withSlots } from "@/components/ui";
import { checkoutHref, paymentNote, site } from "@/lib/site";

const v = (vars: Record<string, string | number>) => vars as CSSProperties;

export function Header() {
  return (
    <header className="border-b border-line">
      <div className="frame flex h-16 items-center justify-between gap-4 px-4 md:px-8 xl:px-12">
        <a href="#top" aria-label="12testeurs, haut de page">
          <Logo />
        </a>
        <a href={checkoutHref} className="btn btn-sm hidden md:inline-flex">
          Lancer mon test · {site.price}&nbsp;€
        </a>
      </div>
    </header>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="blueprint absolute inset-0 [mask-image:linear-gradient(to_bottom,black_25%,transparent)]"
      />
      <div className="frame relative px-4 pt-10 pb-12 md:px-8 md:pt-16 md:pb-16 xl:px-12">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-8">
            <h1>
              <span className="hero-in label flex items-center gap-3 text-blue-text">
                <span aria-hidden="true" className="h-3 w-3 bg-blue" />
                12 testeurs Google Play · test fermé
              </span>
              <span className="display mt-5 block text-[clamp(3rem,8vw,6.75rem)]">
                Google exige 12&nbsp;testeurs.
                <br />
                On t’en fournit{" "}
                <span className="hero-sweep relative isolate px-[0.05em] text-white before:absolute before:inset-x-0 before:inset-y-[0.02em] before:-z-10 before:origin-left before:bg-blue before:content-['']">
                  14.
                </span>
              </span>
            </h1>
            <p className="hero-in mt-7 max-w-[52ch] text-lg text-mute md:text-xl" style={v({ "--d": "0.1s" })}>
              On inscrit 14 testeurs sur de vrais téléphones Android sous 24 à 48&nbsp;h. Ils ouvrent ton app pendant
              les 14 jours exigés par Google et te remontent les bugs qu’ils trouvent.
            </p>
            <p className="hero-in mt-4 font-semibold text-paper md:text-lg" style={v({ "--d": "0.15s" })}>
              39&nbsp;€ par app, paiement unique. Accès production refusé&#8239;?{" "}
              <a href="#garantie" className="underline decoration-blue decoration-2 underline-offset-4 hover:text-white">
                Remboursé intégralement.
              </a>
            </p>
            <div className="hero-in mt-8" style={v({ "--d": "0.2s" })}>
              <CtaButton id="hero-cta" />
              <p className="label mt-5 text-mute">{paymentNote} · sans abonnement · service français</p>
              {proof.enabled ? <p className="label mt-3 text-paper">{withSlots(proof.stat)}</p> : null}
            </div>
          </div>

          <div aria-hidden="true" className="hidden lg:col-span-4 lg:block">
            <div className="win shadow-[10px_10px_0_0_var(--color-blue)]">
              <div className="win-bar text-mute">
                <span>Ta commande</span>
                <span className="win-lines" />
              </div>
              <div className="px-6 pt-6 pb-5">
                <div className="flex items-end gap-4">
                  <span className="display text-[8.5rem] leading-[0.78]">12</span>
                  <span className="label pb-2 text-mute">exigés par Google</span>
                </div>
                <div className="mt-3 flex items-end gap-4">
                  <span className="display text-[8.5rem] leading-[0.78] text-blue-text">+2</span>
                  <span className="label pb-2 text-mute">de marge si un testeur part</span>
                </div>
                <div className="label mt-6 flex justify-between border-t border-line-2 pt-4">
                  <span className="text-mute">= 14 testeurs réels</span>
                  <span className="text-paper">39&nbsp;€</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Le scénario du client, en un seul panneau : un testeur part au jour 9, la marge absorbe le départ.
function DropoutSchema() {
  return (
    <PlayOnView>
      <figure className="win">
        <div className="win-bar text-mute">
          <span>Exemple</span>
          <span className="win-lines" />
        </div>
        <div className="p-5 md:p-6">
          <figcaption className="text-xl font-semibold text-paper">Et si un testeur abandonne&#8239;?</figcaption>

          <div aria-hidden="true">
            <div className="label mt-6 flex items-baseline justify-between text-mute">
              <span>Testeurs inscrits</span>
              <span className="display grid text-4xl text-paper">
                <span className="cs-before col-start-1 row-start-1 opacity-0">14</span>
                <span className="cs-after col-start-1 row-start-1">13</span>
              </span>
            </div>
            <div className="mt-3 grid grid-cols-14 gap-1">
              {Array.from({ length: 14 }, (_, k) => (
                <span
                  key={k}
                  className="cs-dot"
                  data-margin={k >= 12 ? "" : undefined}
                  data-left={k === 13 ? "" : undefined}
                />
              ))}
            </div>
            <div className="label mt-2 grid grid-cols-14 gap-1 text-[0.625rem]">
              <span className="col-span-12 border-t border-paper/50 pt-1.5 text-mute">Minimum Google : 12</span>
              <span className="col-span-2 border-t border-dashed border-blue-text pt-1.5 text-blue-text">Marge</span>
            </div>

            <div className="label mt-7 flex items-baseline justify-between text-mute">
              <span>Jours d’affilée</span>
              <span className="display text-4xl text-paper">
                J<span className="count cs-days-count" style={v({ "--n": 14 })} />
                <span className="text-dim">/14</span>
              </span>
            </div>
            <div className="mt-3 grid grid-cols-14 gap-1">
              {Array.from({ length: 14 }, (_, k) => (
                <span key={k} className="cs-day" style={v({ "--i": k + 1 })} />
              ))}
            </div>
            <div className="label mt-2 grid grid-cols-14 gap-1 text-[0.625rem] text-mute">
              <span className="col-start-9 col-span-6 border-l border-paper/50 pl-1.5">J9 : un testeur part</span>
            </div>

            <p className="cs-done label mt-6 inline-flex border border-ok px-3 py-2 text-ok">✓ 14 jours validés avec 13 inscrits</p>
          </div>

          <p className="mt-6 text-paper">
            Jour 9 : un testeur se désinscrit. Il en reste 13, toujours au-dessus des 12 exigés. Ton test continue
            jusqu’au bout.
          </p>
          <p className="mt-3 text-sm text-mute">
            Avec 12 testeurs pile, ce même départ te ferait passer sous le minimum, et son remplaçant devrait faire ses 14 jours complets. C’est pour ça qu’on en met 14.
          </p>
        </div>
      </figure>
    </PlayOnView>
  );
}

// Une question dont la réponse est encore un {{EMPLACEMENT}} n'est pas affichée.
const publishedFaq = faq.filter((item) => !item.a.includes("{{"));

const h2 = "display text-[clamp(2.1rem,4.6vw,3.4rem)]";

const steps = [
  ["Tu commandes pour 39 €", "en quelques minutes, sans créer de compte."],
  ["Tu nous envoies ton lien", "de test fermé et l’ID de ton app. Pas encore de test fermé ? On le crée avec toi."],
  ["14 testeurs s’inscrivent sous 24 à 48 h", "et ouvrent ton app pendant 14 jours. Tu vois le nombre d’inscrits chaque jour."],
  ["À la fin des 14 jours,", "tu reçois le résumé QA et on t’aide à remplir la demande d’accès production."],
];

function StepsPanel() {
  return (
    <>
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
        <div>
          <p className="text-mute">
            La règle : si ton compte développeur personnel a été créé après le 13 novembre 2023, Google demande
            aujourd’hui 12 testeurs inscrits pendant 14 jours d’affilée avant la publication. Si tu tombes à 11, les 14
            jours recommencent.
          </p>
          <h2 className={`${h2} mt-8`}>Ce qui se passe après ta commande</h2>
          <ol className="mt-7 space-y-5">
            {steps.map(([lead, rest], i) => (
              <li key={lead} className="flex gap-4">
                <span className="label grid h-8 w-8 shrink-0 place-items-center border border-line-2 text-blue-text">
                  {i + 1}
                </span>
                <p className="pt-1">
                  <strong className="font-semibold text-paper">{lead}</strong> <span className="text-mute">{rest}</span>
                </p>
              </li>
            ))}
          </ol>
          <p className="label mt-7 text-mute">Compte environ 3 semaines au total, examen de Google compris.</p>
        </div>
        <DropoutSchema />
      </div>
      <CtaBlock />
    </>
  );
}

const included = [
  "14 testeurs réels sur de vrais appareils Android",
  "2 testeurs de marge au-dessus du minimum Google",
  "Ton app ouverte régulièrement pendant les 14 jours",
  "Bugs, captures d’écran et retours UX pendant le test",
  "Un résumé écrit à la fin du test",
  "Le nombre d’inscrits suivi chaque jour, vérifiable dans ta Play Console",
  "Aide pour créer le test fermé et remplir le questionnaire de Google",
  "Facture, support et retours en français",
];

function IncludedPanel() {
  return (
    <>
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <h2 className={h2}>Ce que tu reçois pour 39&nbsp;€</h2>
          <p className="display mt-8 text-[clamp(5.5rem,12vw,8rem)] leading-[0.8]">
            39<span className="text-blue-text">€</span>
          </p>
          <p className="label mt-4 text-mute">Par app · paiement unique · TTC</p>
          <p className="mt-6 text-sm text-mute">Apps et jeux Android. Pas d’iOS : l’App Store n’impose pas ce test.</p>
        </div>
        <div className="lg:col-span-8">
          <ul className="grid gap-x-8 gap-y-4 md:grid-cols-2">
            {included.map((item) => (
              <li key={item} className="flex gap-3 border-t border-line pt-4">
                <span aria-hidden="true" className="font-mono text-sm font-bold text-ok">
                  [x]
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          {proof.enabled ? (
            <figure className="win mt-8 p-6">
              <blockquote className="text-lg text-paper">« {withSlots(proof.testimonial.quote)} »</blockquote>
              <figcaption className="label mt-4 text-mute">
                {withSlots(proof.testimonial.author)} · {withSlots(proof.testimonial.app)}
              </figcaption>
            </figure>
          ) : null}
        </div>
      </div>
      <CtaBlock />
    </>
  );
}

function GuaranteePanel() {
  return (
    <>
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <h2 className={h2}>
            Accès production refusé&#8239;? <span className="text-blue-text">Remboursé intégralement.</span>
          </h2>
          <p className="mt-6 text-lg text-mute">
            C’est Google qui accepte ou refuse ta demande d’accès production, on ne peut pas décider à sa place. Ce
            qu’on maîtrise : 14 testeurs réels, actifs pendant 14 jours, et un questionnaire bien préparé.
          </p>
          <ol className="mt-8 space-y-4">
            {[
              "Tu nous envoies l’email de refus de Google, ou une capture.",
              "On vérifie que le test a bien été mené jusqu’au bout avec nos testeurs.",
              `On te rembourse les 39 € sur ton moyen de paiement, sous ${site.refundDelay}.`,
            ].map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="label grid h-8 w-8 shrink-0 place-items-center border border-line-2 text-blue-text">
                  {i + 1}
                </span>
                <p className="pt-1">{withSlots(step)}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm text-mute">
            Conditions complètes, cas exclus compris :{" "}
            <Link href="/cgv#article-11" className="text-paper underline underline-offset-4">
              article 11 des CGV
            </Link>
            .
          </p>
        </div>
        <div className="lg:col-span-5">
          <div className="win">
            <div className="win-bar text-mute">
              <span>Qui est derrière</span>
              <span className="win-lines" />
            </div>
            <div className="space-y-4 p-6">
              <p>
                Service tenu par <strong className="font-semibold text-paper">{site.owner}</strong> ({site.company}),
                entrepreneur individuel en France.
              </p>
              <p className="text-mute">
                Une question avant de commander ? Écris à{" "}
                <span className="text-paper">{site.contactEmail}</span>.
              </p>
              <p className="text-sm text-mute">
                12testeurs n’est ni affilié à Google ni approuvé par Google.
              </p>
            </div>
          </div>
        </div>
      </div>
      <CtaBlock />
    </>
  );
}

function FaqPanel() {
  return (
    <>
      <h2 className={h2}>Questions fréquentes</h2>
      <div className="mt-8 border-t border-line">
        {publishedFaq.map((item, i) => (
          <details key={item.q} name="faq" className="faq-item border-b border-line">
            <summary className="flex cursor-pointer items-start gap-4 py-5 transition-colors hover:text-white">
              <span className="label w-8 shrink-0 pt-1 text-blue-text">{String(i + 1).padStart(2, "0")}</span>
              <span className="flex-1 text-lg leading-snug font-semibold md:text-xl">{item.q}</span>
              <span aria-hidden="true" className="faq-plus display text-3xl leading-none text-blue-text">
                +
              </span>
            </summary>
            <p className="max-w-[64ch] pr-8 pb-6 pl-12 text-mute">{withSlots(item.a)}</p>
          </details>
        ))}
      </div>
      <p className="mt-6 text-mute">
        Pas de réponse ici ? Écris à <span className="text-paper">{site.contactEmail}</span>.
      </p>
      <CtaBlock />
    </>
  );
}

export function OfferTabs() {
  return (
    <section aria-label="Détails de l’offre" className="border-t border-line">
      <div className="frame px-4 py-10 md:px-8 md:py-14 xl:px-12">
        <span aria-hidden="true" className="cross -top-2 -left-2" />
        <span aria-hidden="true" className="cross -top-2 -right-2" />
        <Tabs
          tabs={[
            { id: "etapes", label: "Étapes", content: <StepsPanel /> },
            { id: "inclus", label: "Inclus", content: <IncludedPanel /> },
            { id: "garantie", label: "Garantie", content: <GuaranteePanel /> },
            { id: "faq", label: "FAQ", content: <FaqPanel /> },
          ]}
        />
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line pb-24 md:pb-0">
      <div className="frame px-4 py-10 md:px-8 xl:px-12">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-4 max-w-[38ch] text-sm text-mute">
              14 testeurs Google Play pour ton test fermé de 14 jours, 39&nbsp;€. Service tenu par{" "}
              {site.owner} ({site.company}), EI · {site.contactEmail}
            </p>
          </div>
          <nav aria-label="Pages du site" className="md:col-span-3">
            <ul className="label space-y-3 text-mute">
              <li>
                <Link href="/blog" className="hover:text-paper">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/mentions-legales" className="hover:text-paper">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link href="/cgv" className="hover:text-paper">
                  CGV
                </Link>
              </li>
              <li>
                <Link href="/confidentialite" className="hover:text-paper">
                  Confidentialité
                </Link>
              </li>
            </ul>
          </nav>
          <p className="label text-[0.6875rem] text-dim md:col-span-4">
            Google Play est une marque de Google LLC. 12testeurs n’est ni affilié à Google ni approuvé par Google.
          </p>
        </div>
      </div>
    </footer>
  );
}
