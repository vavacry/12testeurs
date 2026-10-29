import type { Metadata } from "next";
import { MiniHeader } from "@/components/MiniHeader";
import { OrderForm } from "./OrderForm";

export const metadata: Metadata = {
  title: "Finalise ta commande",
  description: "Dernière étape : envoie-nous les infos de ton app pour lancer ton test fermé.",
  robots: { index: false, follow: false },
};

export default function CommandePage() {
  return (
    <div className="overflow-x-clip">
      <MiniHeader />
      <main id="contenu" className="blueprint">
        <div className="frame px-4 py-14 md:px-8 md:py-20 xl:px-12">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <p className="label flex items-center gap-2.5 text-ok">
                <span aria-hidden="true" className="h-2 w-2 bg-ok" /> Paiement reçu
              </p>
              <h1 className="display mt-6 text-[clamp(3rem,8vw,6.5rem)]">
                Plus qu’une
                <br />
                <span className="text-blue-text">étape.</span>
              </h1>
              <p className="mt-6 max-w-[44ch] text-lg text-mute">
                Merci ! Envoie-nous les infos de ton app. Dès qu’on a ton lien de test fermé, les 14 testeurs
                s’inscrivent sous 24 à 48 h.
              </p>
              <ol className="label mt-10 space-y-3 text-mute">
                <li>
                  <span className="text-ok">[✓]</span> 01 · Paiement
                </li>
                <li className="text-paper">
                  <span className="text-blue-text">[&gt;]</span> 02 · Infos de ton app
                </li>
                <li>
                  <span className="text-dim">[ ]</span> 03 · Inscription des testeurs
                </li>
                <li>
                  <span className="text-dim">[ ]</span> 04 · Demande d’accès production
                </li>
              </ol>
            </div>
            <div className="lg:col-span-7">
              <div className="win shadow-[12px_12px_0_0_var(--color-blue)]">
                <div className="win-bar text-paper">
                  <span>Formulaire_commande.exe</span>
                  <span className="win-lines" />
                  <span className="win-btn text-mute">×</span>
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
