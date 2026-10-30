import type { Metadata } from "next";
import { MiniHeader } from "@/components/MiniHeader";
import { hasStripe } from "@/lib/site";
import { OrderForm } from "./OrderForm";

export const metadata: Metadata = {
  title: "Commande",
  description: "Envoie-nous les infos de ton app pour lancer ton test fermé avec 14 testeurs.",
  robots: { index: false, follow: false },
};

// Avec Stripe : on arrive ici après le paiement. Sans Stripe : on commande ici, le lien de paiement suit par email.
const steps = hasStripe
  ? ["Paiement", "Infos de ton app", "Inscription des testeurs", "Demande d’accès production"]
  : ["Infos de ton app", "Lien de paiement par email (39 €)", "Inscription des testeurs", "Demande d’accès production"];
const current = hasStripe ? 1 : 0;

export default function CommandePage() {
  return (
    <div className="overflow-x-clip">
      <MiniHeader />
      <main id="contenu" className="blueprint">
        <div className="frame px-4 py-14 md:px-8 md:py-20 xl:px-12">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <p className="label flex items-center gap-2.5 text-ok">
                <span aria-hidden="true" className="h-2 w-2 bg-ok" /> {hasStripe ? "Paiement reçu" : "Commande · 39 €"}
              </p>
              <h1 className="display mt-6 text-[clamp(3rem,8vw,6.5rem)]">
                {hasStripe ? "Plus qu’une" : "Lance ton"}
                <br />
                <span className="text-blue-text">{hasStripe ? "étape." : "test fermé."}</span>
              </h1>
              <p className="mt-6 max-w-[44ch] text-lg text-mute">
                {hasStripe
                  ? "Merci ! Envoie-nous les infos de ton app. Dès qu’on a ton lien de test fermé, les 14 testeurs s’inscrivent sous 24 à 48 h."
                  : "Envoie-nous les infos de ton app. On te répond par email avec le lien de paiement (39 €), puis les 14 testeurs s’inscrivent sous 24 à 48 h."}
              </p>
              <ol className="label mt-10 space-y-3 text-mute">
                {steps.map((step, i) => (
                  <li key={step} className={i === current ? "text-paper" : undefined}>
                    {i < current ? (
                      <span className="text-ok">[✓]</span>
                    ) : i === current ? (
                      <span className="text-blue-text">[&gt;]</span>
                    ) : (
                      <span className="text-dim">[ ]</span>
                    )}{" "}
                    0{i + 1} · {step}
                  </li>
                ))}
              </ol>
            </div>
            <div className="lg:col-span-7">
              <div className="win shadow-[12px_12px_0_0_var(--color-blue)]">
                <div className="win-bar text-paper">
                  <span>Formulaire_commande.exe</span>
                  <span className="win-lines" />
                </div>
                <OrderForm />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
