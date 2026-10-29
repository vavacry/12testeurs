# Déploiement — 12testeurs

## 1. Lancer en local

Prérequis : Node.js 20 ou plus récent.

```bash
cd 12testeurs
npm install
cp .env.example .env.local   # puis remplis les valeurs
npm run dev                  # http://localhost:3000
```

En local, si `ORDER_WEBHOOK_URL` est vide, les commandes du formulaire `/commande` s'affichent dans le terminal. En production, ce champ vide déclenche une erreur visible.

Pour tester en conditions réelles : `npm run build && npm run start`.

## 2. Créer le lien de paiement Stripe

Commence en **mode test** (interrupteur en haut du tableau de bord Stripe).

1. **Catalogue de produits → Ajouter un produit** : « Test fermé Google Play · 14 testeurs », prix **39,00 €**, paiement unique.
2. **Paramètres → Informations publiques** : renseigne l'URL des CGV `https://12testeurs.fr/cgv`.
3. **Liens de paiement → Nouveau**, sur ce produit :
   - quantité fixe à 1 ;
   - coche **« Exiger que les clients acceptent vos conditions d'utilisation »** ;
   - active **la création de facture après paiement**. Dans le pied de facture, ajoute : « EI · SIRET … · TVA non applicable, art. 293 B du CGI » ;
   - onglet **Après le paiement** → « Ne pas afficher de page de confirmation » → redirection vers :
     `https://12testeurs.fr/commande?session_id={CHECKOUT_SESSION_ID}`
4. Copie l'URL du lien (`https://buy.stripe.com/…`) dans `NEXT_PUBLIC_STRIPE_LINK`.
5. **Paramètres → E-mails clients** : active l'envoi des reçus de paiement.
6. Fais un achat de test avec la carte `4242 4242 4242 4242` (date future, n'importe quel CVC). Vérifie que tu arrives sur `/commande` et que la commande arrive bien sur ton webhook.
7. Recrée le produit et le lien en **mode live**, puis remplace l'URL de test.

## 3. Recevoir les commandes (`ORDER_WEBHOOK_URL`)

Le formulaire envoie un POST JSON : `{ content, text, order: { name, email, appName, packageId, testLink, needHelp, expressStart, stripeSessionId, receivedAt } }`.

Au choix :
- **Make** : scénario « Webhooks → Custom webhook », puis Google Sheets et/ou email ;
- **Zapier** : « Webhooks by Zapier → Catch Hook » ;
- **n8n** : nœud « Webhook » ;
- **Discord** : salon → Intégrations → Webhooks. Le champ `content` s'affiche tel quel ;
- **Slack** : Incoming Webhook. Le champ `text` s'affiche tel quel.

## 4. Déployer sur Vercel

1. Mets le dossier `12testeurs` dans un dépôt GitHub.
2. Sur vercel.com : **Add New → Project → Import** le dépôt. Si le dépôt contient le dossier parent, règle **Root Directory = `12testeurs`**. Le framework Next.js est détecté tout seul.
3. **Environment Variables** : `NEXT_PUBLIC_STRIPE_LINK`, `NEXT_PUBLIC_SITE_URL=https://12testeurs.fr`, `NEXT_PUBLIC_CONTACT_EMAIL`, `ORDER_WEBHOOK_URL`.
4. **Deploy**.

Les variables `NEXT_PUBLIC_*` sont intégrées au moment du build : après une modification, il faut redéployer.

Alternative en ligne de commande :

```bash
npm i -g vercel
```

```bash
vercel
```

```bash
vercel --prod
```

## 5. Nom de domaine

`12testeurs.fr` et `12testeurs.com` étaient disponibles le 28/10/2026. Achète-les chez Vercel ou chez un registrar (OVH, Gandi…).

Ensuite, dans le projet Vercel : **Settings → Domains → Add** `12testeurs.fr`, puis `www.12testeurs.fr` en redirection. Recopie chez ton registrar les enregistrements DNS que Vercel affiche. Ajoute `12testeurs.com` en redirection vers le `.fr`.

## 6. Avant d'ouvrir les ventes

- [ ] Tous les `{{…}}` remplis (voir `CONTENU.md`), y compris `{{ORIGINE_DES_TESTEURS}}`
- [ ] Les 3 clauses `{{A_VALIDER}}` des CGV tranchées, et les textes légaux relus
- [ ] Médiateur de la consommation désigné
- [ ] Achat de test Stripe complet : paiement → `/commande` → webhook reçu
- [ ] Google Search Console : domaine vérifié, sitemap `https://12testeurs.fr/sitemap.xml` envoyé
- [ ] Test des résultats enrichis : https://search.google.com/test/rich-results

## 7. Performance (mesurée en local, Lighthouse 12, version de production)

| | Performance | Accessibilité | Bonnes pratiques | SEO |
|---|---|---|---|---|
| Mobile | 96 | 100 | 100 | 100 |
| Desktop | 100 | 100 | 100 | 100 |

Les polices sont auto-hébergées. Elles ont été réduites au strict nécessaire (68 Ko au lieu de 128 Ko), voir `src/fonts/LICENCE.md`.
