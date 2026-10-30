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
// Tant qu'il n'est pas configuré, les boutons mènent au formulaire de commande du site :
// la commande arrive par email et le lien de paiement est envoyé ensuite au client.
export const hasStripe = Boolean(process.env.NEXT_PUBLIC_STRIPE_LINK);
export const checkoutHref = process.env.NEXT_PUBLIC_STRIPE_LINK || `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/commande`;
export const paymentNote = hasStripe ? "Paiement sécurisé Stripe" : "Paiement après validation";
