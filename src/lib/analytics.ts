// Mesure d'audience GoatCounter : sans cookie, inactive tant que la variable GOATCOUNTER_CODE est vide.
declare global {
  interface Window {
    goatcounter?: { count?: (vars: { path: string; event?: boolean; referrer?: string }) => void };
  }
}

export const trackEvent = (name: string) => window.goatcounter?.count?.({ path: name, event: true });
