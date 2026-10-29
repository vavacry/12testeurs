export type FaqItem = { q: string; a: string };

// Source unique : alimente l'onglet FAQ ET les données structurées FAQPage.
// Une réponse qui contient encore un {{EMPLACEMENT}} est exclue des données structurées.
export const faq: FaqItem[] = [
  {
    q: "D’où viennent les testeurs ?",
    a: "{{ORIGINE_DES_TESTEURS}}",
  },
  {
    q: "Que se passe-t-il si un testeur part ?",
    a: "Il en reste 13, donc tu restes au-dessus des 12 exigés et les 14 jours continuent. On compte les inscrits chaque jour, tu vois tout de suite si le nombre baisse.",
  },
  {
    q: "Combien de temps ça prend au total ?",
    a: "Compte environ 3 semaines : 24 à 48 h pour les inscriptions, 14 jours de test, puis l’examen de ta demande. Ce dernier délai dépend de Google, pas de nous.",
  },
  {
    q: "Google demande 12 ou 20 testeurs ?",
    a: "12 aujourd’hui. La règle demandait 20 testeurs à son lancement, puis Google l’a abaissée à 12. Les 14 jours d’affilée, eux, n’ont pas changé.",
  },
  {
    q: "Pourquoi 39 € alors que d’autres services sont moins chers ?",
    a: "En plus des inscriptions, tu as 2 testeurs de marge, un suivi chaque jour, des retours QA et une facture d’un service français. Et si Google refuse l’accès production après le test, tu es remboursé.",
  },
  {
    q: "Je n’ai pas encore créé mon test fermé, je peux commander ?",
    a: "Oui. Après le paiement, coche « besoin d’aide » dans le formulaire et on crée avec toi la piste de test fermé, le Google Group et le lien d’inscription.",
  },
  {
    q: "Pourquoi pas mes amis ou un échange sur Reddit ?",
    a: "Ça peut marcher. Le risque, c’est qu’une seule personne désinstalle l’app en cours de route : avec 12 inscrits pile, ton compteur repart de zéro, et personne ne te fait de rapport de bugs.",
  },
  {
    q: "Mes données et mon code sont-ils en sécurité ?",
    a: "Les testeurs installent ton app depuis le Play Store avec ton lien de test fermé, comme n’importe quel utilisateur. Ils n’ont accès ni à ton code ni à ta Play Console : on te demande seulement le lien d’inscription et l’ID du package.",
  },
  {
    q: "Faut-il un compte organisation ?",
    a: "Non, le service est fait pour les comptes personnels, ceux à qui Google impose le test fermé. Un compte organisation n’a pas cette obligation, mais il demande un numéro D-U-N-S pour être créé.",
  },
];
