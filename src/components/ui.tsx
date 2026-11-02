import type { ReactNode } from "react";
import { checkoutHref, paymentNote, site } from "@/lib/site";

export function Logo() {
  return (
    <span className="inline-flex items-center gap-2.5">
      <span className="display grid h-8 w-8 place-items-center bg-blue pt-0.5 text-[1.4rem] leading-none text-white">
        12
      </span>
      <span className="label text-[0.8rem] font-bold tracking-[0.2em] text-paper">Testeurs</span>
    </span>
  );
}

export function PixelArrow({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 8 8"
      width="16"
      height="16"
      shapeRendering="crispEdges"
      fill="currentColor"
      className={className}
    >
      <path d="M4 1h1v1H4zM4 2h2v1H4zM0 3h7v2H0zM4 5h2v1H4zM4 6h1v1H4z" />
    </svg>
  );
}

// Un seul objectif, un seul libellé partout : la commande.
export function CtaButton({ id, className = "" }: { id?: string; className?: string }) {
  return (
    <a id={id} href={checkoutHref} data-cta className={`btn ${className}`}>
      <span>Lancer mon test fermé</span>
      <span aria-hidden="true" className="h-4 w-px bg-current opacity-40" />
      <span>{site.price} €</span>
      <PixelArrow className="btn-arrow" />
    </a>
  );
}

// Bouton + réassurance, en bas de chaque onglet. `data-cta-zone` masque le CTA collant mobile.
export function CtaBlock() {
  return (
    <div data-cta-zone className="mt-10 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:gap-6">
      <CtaButton />
      <p className="label text-mute">{paymentNote} · sans abonnement · remboursé si accès refusé</p>
    </div>
  );
}

// Met en évidence les {{EMPLACEMENTS}} à remplir.
export function withSlots(text: string): ReactNode[] {
  return text.split(/(\{\{[^}]+\}\})/g).map((part, i) =>
    part.startsWith("{{") ? (
      <span key={i} className="slot">
        {part}
      </span>
    ) : (
      part
    ),
  );
}
