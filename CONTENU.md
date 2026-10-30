# CONTENU — textes et emplacements à remplir

Tout ce qui est entre `{{…}}` est un **emplacement vide**. Sur le site, il apparaît encadré en pointillés bleus.

> Règles : n'invente aucun avis, chiffre, logo ou nom. La garantie s'écrit « Accès production refusé ? Remboursé intégralement. », jamais « 100 % garanti » : la décision appartient à Google. N'écris pas non plus « 12 testeurs depuis 2023 » (la règle était de 20 testeurs au départ) : dis « Google demande aujourd'hui 12 testeurs ».

---

## 1. Ce qu’il reste à remplir

### Déjà rempli
Nom (Mathieu Dunand), nom commercial (Vascent), email (vacryoff@gmail.com), SIRET, adresse, téléphone, délais de remboursement (14 jours, demande sous 30 jours), clauses des CGV. Les textes légaux restent un modèle rédigé par un agent IA : fais-les relire.

### Reste à remplir

| Fichier | Emplacement | À mettre |
|---|---|---|
| `src/content/legal.ts` | `{{MEDIATEUR_NOM}}` / `{{MEDIATEUR_URL}}` | Médiateur de la consommation agréé (**obligatoire avant de vendre à des particuliers**) |
| `src/content/faq.ts` | `{{ORIGINE_DES_TESTEURS}}` | 2 phrases vraies : qui sont les testeurs, comment tu les recrutes, s’ils sont rémunérés. La question est masquée tant que c’est vide. |
| `src/content/proof.ts` | `{{NB_APPS_PUBLIÉES}}`, `{{TÉMOIGNAGE_1}}`… | Seulement quand c’est réel, puis `enabled: true` |

### Variables GitHub (Settings → Secrets and variables → Actions → Variables)

| Variable | Rôle |
|---|---|
| `STRIPE_LINK` | Lien Stripe Payment Link. Sans lui, les boutons ouvrent un email de commande pré-rempli |
| `ORDER_WEBHOOK_URL` | Optionnel : copie des commandes vers un webhook (voir DEPLOIEMENT.md) |

---

## 2. Structure et textes de la page

La page tient en un hero et 4 onglets. Tout le contenu est dans le HTML, donc indexé par Google. Chaque onglet a son ancre : `#etapes`, `#inclus`, `#garantie`, `#faq`. Un seul libellé de bouton partout : **« Lancer mon test fermé · 39 € »**.

Fichier : `src/components/landing.tsx`

### En-tête
Logo + bouton « Lancer mon test · 39 € » (desktop uniquement).

### Hero
- Surtitre : « 12 testeurs Google Play · test fermé »
- **H1** : « Google exige 12 testeurs. On t'en fournit 14. »
- Sous-titre : « On inscrit 14 testeurs sur de vrais téléphones Android sous 24 à 48 h. Ils ouvrent ton app pendant les 14 jours exigés par Google et te remontent les bugs qu'ils trouvent. »
- Ligne prix : « 39 € par app, paiement unique. Accès production refusé ? Remboursé intégralement. » (le lien ouvre l'onglet Garantie)
- Sous le bouton : « Paiement Stripe · sans abonnement · service français »
- Carte à droite, sur desktop : « 12 exigés par Google / +2 de marge si un testeur part / = 14 testeurs réels · 39 € »

### Onglet 1 · Étapes (ouvert par défaut)
- La règle : « si ton compte développeur personnel a été créé après le 13 novembre 2023, Google demande aujourd'hui 12 testeurs inscrits pendant 14 jours d'affilée avant la publication. Si tu tombes à 11, les 14 jours recommencent. »
- **H2** : « Ce qui se passe après ta commande »
  1. **Tu commandes pour 39 €** en quelques minutes, sans créer de compte.
  2. **Tu nous envoies ton lien** de test fermé et l'ID de ton app. Pas encore de test fermé ? On le crée avec toi.
  3. **14 testeurs s'inscrivent sous 24 à 48 h** et ouvrent ton app pendant 14 jours. Tu vois le nombre d'inscrits chaque jour.
  4. **À la fin des 14 jours,** tu reçois le résumé QA et on t'aide à remplir la demande d'accès production.
- « Compte environ 3 semaines au total, examen de Google compris. »
- **Schéma « Et si un testeur abandonne ? »** (badge « Exemple ») : 14 cases, dont 2 de marge, avec le repère « Minimum Google : 12 ». Au jour 9, une case de marge devient grise et le compteur passe de 14 à 13. Les jours avancent jusqu'à J14, puis « ✓ 14 jours validés avec 13 inscrits ». Sous le schéma :
  - « Jour 9 : un testeur se désinscrit. Il en reste 13, toujours au-dessus des 12 exigés. Ton test continue jusqu'au bout. »
  - « Avec 12 testeurs pile, ce même départ aurait remis ton compteur à zéro. C'est pour ça qu'on en met 14. »

### Onglet 2 · Inclus
- **H2** : « Ce que tu reçois pour 39 € » — 39 € · « Par app · paiement unique · TTC »
- « Apps et jeux Android. Pas d'iOS : l'App Store n'impose pas ce test. »
- La liste :
  - 14 testeurs réels sur de vrais appareils Android
  - 2 testeurs de marge au-dessus du minimum Google
  - Ton app ouverte régulièrement pendant les 14 jours
  - Bugs, captures d'écran et retours UX pendant le test
  - Un résumé écrit à la fin du test
  - Le nombre d'inscrits suivi chaque jour, vérifiable dans ta Play Console
  - Aide pour créer le test fermé et remplir le questionnaire de Google
  - Facture, support et retours en français

### Onglet 3 · Garantie
- **H2** : « Accès production refusé ? Remboursé intégralement. »
- « C'est Google qui accepte ou refuse ta demande d'accès production, on ne peut pas décider à sa place. Ce qu'on maîtrise : 14 testeurs réels, actifs pendant 14 jours, et un questionnaire bien préparé. »
- Les étapes du remboursement :
  1. Tu nous envoies l'email de refus de Google, ou une capture.
  2. On vérifie que le test a bien été mené jusqu'au bout avec nos testeurs.
  3. On te rembourse les 39 € sur ton moyen de paiement, sous 14 jours.
- Lien : « Conditions complètes, cas exclus compris : article 11 des CGV »
- Encadré « Qui est derrière » : « Service tenu par Mathieu Dunand, entrepreneur individuel en France. Une question avant de commander ? Écris à vacryoff@gmail.com. 12testeurs n'est ni affilié à Google ni approuvé par Google. »

### Onglet 4 · FAQ — `src/content/faq.ts`
Ce fichier alimente aussi les données structurées pour Google.
1. D'où viennent les testeurs ? → `{{ORIGINE_DES_TESTEURS}}`
2. Que se passe-t-il si un testeur part ?
3. Combien de temps ça prend au total ?
4. Google demande 12 ou 20 testeurs ?
5. Pourquoi 39 € alors que d'autres services sont moins chers ?
6. Je n'ai pas encore créé mon test fermé, je peux commander ?
7. Pourquoi pas mes amis ou un échange sur Reddit ?
8. Mes données et mon code sont-ils en sécurité ?
9. Faut-il un compte organisation ?

Sous la liste : « Pas de réponse ici ? Écris à vacryoff@gmail.com. »

### Bas de chaque onglet
Le bouton, puis « Paiement Stripe · sans abonnement · remboursé si accès refusé ».

### Bouton collant mobile — `src/components/StickyCta.tsx`
« 14 testeurs · 39 € / Remboursé si accès refusé » + « Lancer mon test ». Il apparaît une fois le bouton du hero dépassé et se cache quand un bouton d'onglet est à l'écran.

### Pied de page
« 14 testeurs Google Play pour ton test fermé de 14 jours, 39 €. Service tenu par Mathieu Dunand, EI · vacryoff@gmail.com », puis les liens Mentions légales, CGV et Confidentialité, et la mention : « Google Play est une marque de Google LLC. 12testeurs n'est ni affilié à Google ni approuvé par Google. »

---

## 3. Page de commande `/commande` — `src/app/commande/`

C'est la page vers laquelle Stripe renvoie après le paiement. Elle n'est pas indexée et aucun lien de la page d'accueil n'y mène.
- **H1** : « Plus qu'une étape. »
- Champs : nom · email · nom de l'app · ID du package · lien de test fermé (facultatif)
- Deux cases à cocher :
  - « besoin d'aide pour créer le test fermé » ;
  - « démarrer tout de suite », qui concerne le droit de rétractation (art. 9 des CGV) et n'est pas cochée par défaut.
- Envoi vers `ORDER_WEBHOOK_URL`. Le message reçu contient la commande et l'identifiant de session Stripe.

---

## 4. SEO

- Title : « 12 testeurs Google Play : test fermé 14 jours | 39 € »
- Description : « 14 testeurs réels sur ton test fermé Google Play, 14 jours, retours QA. 39 € par app. Accès production refusé ? Remboursé intégralement. »
- Données structurées : `Service` + `Offer` (39 EUR) + `FAQPage`, sans aucune note inventée.
- Contenus à créer plus tard (cf. `../refonte/02-seo.md`) :
  - un guide pas à pas du test fermé ;
  - un article sur le questionnaire d'accès production ;
  - un article « Accès production refusé : que faire ».

Les rapports complets des agents (veille, SEO, vente, textes) sont dans `../refonte/`.
