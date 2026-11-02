import Link from "next/link";
import { Logo } from "@/components/ui";

// En-tête des pages secondaires (commande, légal, blog) : pas de CTA, juste le retour.
export function MiniHeader({ href = "/", label = "Retour" }: { href?: string; label?: string }) {
  return (
    <header className="border-b border-line bg-ink">
      <div className="frame flex h-16 items-center justify-between gap-4 px-4 md:px-8 xl:px-12">
        <Link href="/" aria-label="12testeurs, retour à l’accueil">
          <Logo />
        </Link>
        <Link href={href} className="label text-mute hover:text-paper">
          ← {label}
        </Link>
      </div>
    </header>
  );
}
