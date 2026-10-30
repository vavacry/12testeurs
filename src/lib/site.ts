export const site = {
  name: "12testeurs",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://12testeurs.fr").replace(/\/$/, ""),
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "vacryoff@gmail.com",
  // Affichés avant l'achat (onglet Garantie, pied de page).
  owner: "Mathieu Dunand",
  company: "Vascent",
  refundDelay: "14 jours",
  price: 39,
  title: "12 testeurs Google Play : test fermé 14 jours | 39 €",
  description:
    "14 testeurs réels sur ton test fermé Google Play, 14 jours, retours QA. 39 € par app. Accès production refusé ? Remboursé intégralement.",
} as const;

// Lien Stripe Payment Link, injecté au build.
// Tant qu'il n'est pas configuré, les boutons ouvrent un email de commande pré-rempli : la page vend quand même.
const orderByEmail =
  `mailto:${site.contactEmail}?subject=${encodeURIComponent("Commande 12testeurs · test fermé 39 €")}&body=${encodeURIComponent(
    "Bonjour,\n\nJe veux lancer un test fermé avec 14 testeurs (39 €).\n\nNom de l’app :\nID du package (com.xxx.xxx) :\nLien du test fermé (si déjà créé) :\n\nMerci !",
  )}`;
export const hasStripe = Boolean(process.env.NEXT_PUBLIC_STRIPE_LINK);
export const checkoutHref = process.env.NEXT_PUBLIC_STRIPE_LINK || orderByEmail;
export const paymentNote = hasStripe ? "Paiement sécurisé Stripe" : "Commande par email";
