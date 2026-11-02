"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

const code = process.env.NEXT_PUBLIC_GOATCOUNTER_CODE;

// Le site navigue sans recharger la page : on compte chaque changement d'URL nous-mêmes.
function countPage() {
  window.goatcounter?.count?.({
    path: window.location.pathname,
    // Liens suivis par canal : ?utm_source=reddit remplace la provenance.
    referrer: new URLSearchParams(window.location.search).get("utm_source") ?? undefined,
  });
}

export function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (!code) return;
    countPage();
    // Quel bouton de commande, sur quelle page : clic-commande-accueil, clic-commande-blog-…
    const onClick = (event: MouseEvent) => {
      if ((event.target as Element).closest("[data-cta]")) {
        trackEvent(`clic-commande${pathname === "/" ? "-accueil" : pathname.replaceAll("/", "-")}`);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [pathname]);

  if (!code) return null;
  return (
    <Script
      src="https://gc.zgo.at/count.js"
      strategy="afterInteractive"
      data-goatcounter={`https://${code}.goatcounter.com/count`}
      data-goatcounter-settings='{"no_onload":true,"no_events":true}'
      onLoad={countPage}
    />
  );
}
