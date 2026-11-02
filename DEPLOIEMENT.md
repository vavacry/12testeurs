# Déploiement — 12testeurs

Le site est **100 % statique** : il n'y a aucun serveur. Il est en ligne sur **GitHub Pages** :

**https://vavacry.github.io/12testeurs/**

Dépôt : https://github.com/vavacry/12testeurs

## 1. Mettre à jour le site

Chaque `git push` sur `main` reconstruit et republie le site en 1 à 2 minutes, via le workflow `.github/workflows/pages.yml`. Pour suivre une publication : onglet **Actions** du dépôt.

```bash
git add -A
```

```bash
git commit -m "Mise à jour du site"
```

```bash
git push
```

## 2. Lancer en local

Prérequis : Node.js 20 ou plus récent.

```bash
npm install
```

```bash
npm run dev
```

Le site s'ouvre sur http://localhost:3000. En local, `NEXT_PUBLIC_BASE_PATH` reste vide, donc le site est servi à la racine.

## 3. Brancher le paiement Stripe

Tant qu'aucun lien Stripe n'est configuré, les boutons « Lancer mon test fermé » ouvrent le formulaire `/commande`, et le lien de paiement part ensuite par email.

1. Stripe, en **mode test** d'abord : **Catalogue de produits → Ajouter un produit** « Test fermé Google Play · 14 testeurs », **39,00 €**, paiement unique.
2. **Paramètres → Informations publiques** : URL des CGV `https://vavacry.github.io/12testeurs/cgv`.
3. **Liens de paiement → Nouveau** :
   - quantité fixe à 1 ;
   - **Exiger l'acceptation des conditions d'utilisation** ;
   - **création de facture après paiement**, avec en pied de facture : « EI · SIRET 106 038 516 00014 · TVA non applicable, art. 293 B du CGI » ;
   - onglet **Après le paiement** → redirection vers `https://vavacry.github.io/12testeurs/commande?session_id={CHECKOUT_SESSION_ID}`.
4. Dans GitHub, **Settings → Secrets and variables → Actions → onglet Variables → New repository variable** :
   - nom `STRIPE_LINK`, valeur `https://buy.stripe.com/…`
5. **Actions → Publier sur GitHub Pages → Run workflow**, ou n'importe quel push. Les boutons pointent alors vers Stripe et la page affiche « Paiement sécurisé Stripe ».
6. Teste avec la carte `4242 4242 4242 4242`, puis refais le produit et le lien en **mode live**.

## 4. Réception des commandes

Le formulaire `/commande` vérifie les champs, puis t'envoie la commande par email, sans serveur :

1. **Web3Forms**, si la variable `WEB3FORMS_KEY` est définie. C'est la voie recommandée. Pour l'obtenir, va sur https://web3forms.com, saisis vacryoff@gmail.com et reçois la clé par email. Ajoute-la ensuite dans GitHub : **Settings → Secrets and variables → Actions → Variables** → `WEB3FORMS_KEY`. Le plan gratuit couvre 250 envois par mois.
2. Sinon **FormSubmit** (formsubmit.co), sans clé. Lors de la toute première commande, FormSubmit t'envoie un email d'activation sur lequel il faut cliquer.
3. Si les deux échouent, le client voit le récapitulatif, avec un bouton « Copier » et un lien « Ouvrir ma messagerie ».

En option, tu peux recevoir aussi une copie automatique sur un webhook (Make, Zapier, n8n, Discord…). Ajoute dans `.github/workflows/pages.yml`, étape `npm run build` :

```yaml
          NEXT_PUBLIC_ORDER_WEBHOOK_URL: ${{ vars.ORDER_WEBHOOK_URL }}
```

Crée ensuite la variable `ORDER_WEBHOOK_URL` comme à l'étape 3. Cette URL est visible dans le code du site : utilise un webhook dédié à ces commandes.

## 5. Nom de domaine (plus tard)

1. Achète `12testeurs.fr`, par exemple chez OVH ou Gandi. Vercel ne vend pas les `.fr`.
2. GitHub : **Settings → Pages → Custom domain** → `12testeurs.fr`. Chez ton registrar, crée les enregistrements DNS indiqués par GitHub : 4 enregistrements A vers les IP de GitHub Pages, plus un CNAME `www`.
3. Dans `.github/workflows/pages.yml`, mets `NEXT_PUBLIC_BASE_PATH: ""` et `NEXT_PUBLIC_SITE_URL: https://12testeurs.fr`, puis push.
4. Mets à jour l'URL des CGV et la redirection Stripe avec le nouveau domaine.

## 6. Mesure d'audience et blog

La mesure utilise GoatCounter : pas de cookie, gratuit pour un petit site professionnel.

1. Crée un compte sur https://www.goatcounter.com. Le code est le début de ton adresse, par exemple `12testeurs` pour `12testeurs.goatcounter.com`.
2. Ajoute dans GitHub la variable `GOATCOUNTER_CODE` avec ce code, puis relance le workflow.
3. Pour suivre un canal, ajoute `?utm_source=reddit` au lien que tu partages.

Événements enregistrés : `clic-commande-…` (page du clic), `commande-envoyee` et `outil-copie-…` (brouillon copié dans le générateur, jamais son texte).

Pour publier un article, ajoute une entrée dans `src/content/articles.ts` : la page, la liste du blog et le sitemap se mettent à jour au prochain push.

## 7. Avant d'ouvrir les ventes

- [ ] Textes légaux relus : ce sont des modèles rédigés par un agent IA, pas un avis juridique.
- [ ] Lien Stripe branché et achat de test complet : paiement → `/commande` → email reçu.
- [ ] Google Search Console : propriété ajoutée, sitemap `…/sitemap.xml` envoyé.

## 8. Performance (Lighthouse 12, site en ligne, 30/10/2026)

| | Performance | Accessibilité | Bonnes pratiques | SEO |
|---|---|---|---|---|
| Mobile | 98 | 100 | 100 | 100 |
| Desktop | 100 | 100 | 100 | 100 |
