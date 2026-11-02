"use client";

import { useEffect, useState } from "react";
import { PixelArrow } from "@/components/ui";
import { checkoutHref, site } from "@/lib/site";

/**
 * CTA collant mobile : apparaît une fois le CTA du hero dépassé,
 * se retire dès qu'un autre CTA (bas d'onglet) est à l'écran, pour n'en avoir jamais deux.
 */
export function StickyCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero-cta");
    const zones = Array.from(document.querySelectorAll("[data-cta-zone]"));
    if (!hero) return;

    let heroPassed = false;
    const zoneVisible = new Set<Element>();

    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === hero) {
          heroPassed = !entry.isIntersecting && entry.boundingClientRect.top < 0;
        } else if (entry.isIntersecting) {
          zoneVisible.add(entry.target);
        } else {
          zoneVisible.delete(entry.target);
        }
      }
      setShow(heroPassed && zoneVisible.size === 0);
    });

    io.observe(hero);
    zones.forEach((zone) => io.observe(zone));
    return () => io.disconnect();
  }, []);

  return (
    <div
      data-show={show}
      inert={!show}
      className="sticky-cta fixed inset-x-0 bottom-0 z-50 border-t border-line-2 bg-ink px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden"
    >
      <div className="flex items-center justify-between gap-4">
        <p className="label leading-snug text-mute">
          <span className="text-paper">14 testeurs · {site.price}&nbsp;€</span>
          <br />
          Remboursé si accès refusé
        </p>
        <a href={checkoutHref} data-cta className="btn btn-sm">
          Lancer mon test
          <PixelArrow className="btn-arrow" />
        </a>
      </div>
    </div>
  );
}
