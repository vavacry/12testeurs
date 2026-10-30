# 12testeurs

Landing page de vente : 14 testeurs réels pour le test fermé Google Play, 39 €.

Next.js 16 (export statique) · TypeScript · Tailwind CSS 4 · en ligne sur https://vavacry.github.io/12testeurs/

```bash
npm install
npm run dev
```

- **Textes et emplacements à remplir** : [CONTENU.md](CONTENU.md)
- **Mise à jour, Stripe, commandes, domaine** : [DEPLOIEMENT.md](DEPLOIEMENT.md)

## Où est quoi

| Fichier | Contenu |
|---|---|
| `src/components/landing.tsx` | Hero, onglets (Étapes, Inclus, Garantie, FAQ), pied de page |
| `src/components/Tabs.tsx` | Onglets accessibles (ARIA, clavier, ancres `#etapes`…) |
| `src/content/faq.ts` | Questions de la FAQ, qui alimentent aussi les données structurées |
| `src/content/proof.ts` | Avis et chiffres réels (désactivé par défaut) |
| `src/content/legal.ts` | Mentions légales, CGV, confidentialité |
| `src/lib/site.ts` | Prix, nom, email, lien Stripe |
| `src/app/commande/` | Formulaire après paiement → email de commande |
