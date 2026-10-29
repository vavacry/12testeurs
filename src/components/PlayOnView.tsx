"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Lance une fois les animations CSS `[data-anim]` d'une séquence quand elle entre à l'écran.
 * Sans JS : aucun attribut → l'état final s'affiche directement.
 * armed : animations en pause sur leur première image · play : la séquence se lance.
 */
export function PlayOnView({ children, className = "", threshold = 0.4 }: { children: ReactNode; className?: string; threshold?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.dataset.anim = "armed";
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.dataset.anim = "play";
        io.disconnect();
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
