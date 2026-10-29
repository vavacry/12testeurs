// Preuve sociale : désactivée tant qu'elle n'est pas réelle (des cadres vides font fuir).
// Quand tu as de vrais clients : remplis, puis passe `enabled` à true.
// → la ligne chiffrée s'affiche sous le bouton du hero, le témoignage dans l'onglet « Inclus ».
export const proof = {
  enabled: false,
  stat: "{{NB_APPS_PUBLIÉES}} apps passées en production avec nous",
  testimonial: { quote: "{{TÉMOIGNAGE_1}}", author: "{{AUTEUR_1}}", app: "{{APP_1}}" },
};
