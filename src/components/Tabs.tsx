"use client";

import { useEffect, useRef, useSyncExternalStore, type KeyboardEvent, type ReactNode } from "react";

export type TabDef = { id: string; label: string; content: ReactNode };

// L'onglet actif est porté par le hash de l'URL (#etapes, #garantie…) :
// liens profonds, bouton retour et lien « Remboursé » du hero fonctionnent sans état en double.
const subscribe = (onChange: () => void) => {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
};
const getHash = () => window.location.hash.slice(1);
const getServerHash = () => "";

export function Tabs({ tabs }: { tabs: TabDef[] }) {
  const hash = useSyncExternalStore(subscribe, getHash, getServerHash);
  const active = tabs.some((t) => t.id === hash) ? hash : tabs[0].id;
  const listRef = useRef<HTMLDivElement>(null);

  // Arrivée par un lien (#garantie) : on amène la barre d'onglets à l'écran si elle n'y est pas.
  useEffect(() => {
    const reveal = () => {
      const list = listRef.current;
      if (!list || !tabs.some((t) => t.id === getHash())) return;
      const { top } = list.getBoundingClientRect();
      if (top < 0 || top > window.innerHeight * 0.6) {
        const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        list.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
      }
    };
    reveal();
    window.addEventListener("hashchange", reveal);
    return () => window.removeEventListener("hashchange", reveal);
  }, [tabs]);

  const select = (id: string, focus = false) => {
    history.replaceState(null, "", `#${id}`);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
    if (focus) document.getElementById(`tab-${id}`)?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const i = tabs.findIndex((t) => t.id === active);
    const next = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    select(tabs[(next + tabs.length) % tabs.length].id, true);
  };

  return (
    <div>
      <div
        ref={listRef}
        role="tablist"
        aria-label="Détails de l’offre"
        onKeyDown={onKeyDown}
        className="grid scroll-mt-20 grid-cols-4 border border-b-0 border-line-2"
      >
        {tabs.map((t, i) => {
          const selected = t.id === active;
          return (
            <button
              key={t.id}
              id={`tab-${t.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={t.id}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(t.id)}
              className={`label flex flex-col items-center gap-1 border-l border-line-2 px-1 py-3.5 transition-colors first:border-l-0 md:flex-row md:justify-center md:gap-3 md:py-4 ${
                selected ? "bg-blue text-white" : "bg-ink-2 text-mute hover:bg-ink-3 hover:text-paper"
              }`}
            >
              <span aria-hidden="true" className={`text-[0.625rem] ${selected ? "text-on-blue-mute" : "text-dim"}`}>
                0{i + 1}
              </span>
              <span className="text-[0.75rem] md:text-[0.8125rem]">{t.label}</span>
            </button>
          );
        })}
      </div>
      {tabs.map((t) => (
        <div
          key={t.id}
          id={t.id}
          role="tabpanel"
          aria-labelledby={`tab-${t.id}`}
          tabIndex={0}
          hidden={t.id !== active}
          className="border border-line-2 bg-ink p-5 focus-visible:outline-offset-[-3px] sm:p-8 md:p-10"
        >
          {t.content}
        </div>
      ))}
    </div>
  );
}
