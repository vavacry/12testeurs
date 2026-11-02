export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[] }
  | { type: "example"; text: string };

export type ArticleSection = { title: string; blocks: ArticleBlock[] };

export type Article = {
  slug: string;
  title: string; // H1
  metaTitle: string; // ≤ 60 caractères
  description: string; // ≤ 155 caractères
  excerpt: string; // résumé affiché sur la page Blog
  publishedAt: string; // AAAA-MM-JJ
  publishedLabel: string;
  intro: string[];
  sections: ArticleSection[];
};

// Les textes acceptent [lien](url) et **gras**. Une nouvelle entrée crée la page et l'ajoute au sitemap.
export const articles: Article[] = [
  {
    slug: "questionnaire-acces-production-google-play",
    title: "Questionnaire d’accès production Google Play : que répondre",
    metaTitle: "Questionnaire d’accès production Google Play : que répondre",
    description:
      "Les questions du formulaire d’accès production expliquées une par une, avec des exemples à adapter et les erreurs à éviter après ton test fermé.",
    excerpt:
      "Les sujets du formulaire expliqués un par un, avec des exemples à adapter et les erreurs à éviter après ton test fermé.",
    publishedAt: "2026-11-02",
    publishedLabel: "2 novembre 2026",
    intro: [
      "Ton test fermé est terminé, et Google te demande maintenant de remplir un questionnaire avant d’ouvrir la production. Il n’y a rien de piégeux dedans, mais les réponses vagues n’aident pas : Google veut comprendre comment ton test s’est passé et ce que tu en as tiré.",
      "Voici les sujets que liste la [page d’aide de Google](https://support.google.com/googleplay/android-developer/answer/14151465?hl=fr), avec une façon d’y répondre. Le texte exact peut changer : fie-toi à ce que tu vois dans ta Play Console.",
      "Les exemples ci-dessous sont inventés. Remplace-les par ce qui s’est vraiment passé. Pour mettre tes propres réponses en forme, utilise notre [générateur gratuit](/outils/questionnaire-acces-production).",
    ],
    sections: [
      {
        title: "Avant de commencer",
        blocks: [
          {
            type: "p",
            text: "Tu dois avoir au moins 12 testeurs inscrits au moment de la demande, et inscrits sans interruption depuis au moins 14 jours. Vérifie ce point d’abord dans ta Play Console.",
          },
          { type: "p", text: "Rassemble ensuite :" },
          {
            type: "list",
            items: [
              "la liste de tes versions et leurs dates ;",
              "les retours reçus, par email, formulaire ou groupe ;",
              "les bugs corrigés et les changements faits ;",
              "les fonctions que les testeurs ont réellement utilisées.",
            ],
          },
          {
            type: "p",
            text: "Si tu n’as rien noté pendant le test, reconstitue-le depuis ton historique de versions et tes messages.",
          },
        ],
      },
      {
        title: "Partie 1 : ton test fermé",
        blocks: [
          { type: "h3", text: "Était-il facile de recruter des testeurs ?" },
          {
            type: "p",
            text: "Dis comment tu les as trouvés, sans enjoliver. Si tu as eu recours à un service payant, écris-le. La page de Google ne parle pas des testeurs rémunérés, mais une réponse fausse te mettrait en difficulté pour rien.",
          },
          {
            type: "example",
            text: "J’ai d’abord contacté mon entourage, ce qui ne m’a donné que 5 inscrits. J’ai complété avec un service de testeurs, qui m’a apporté 14 personnes sur des appareils variés.",
          },
          { type: "h3", text: "Les testeurs ont-ils utilisé toutes les fonctions ?" },
          { type: "p", text: "Cite les fonctions testées, et celles qui l’ont été moins." },
          {
            type: "example",
            text: "Le suivi des repas et les rappels ont été beaucoup utilisés. L’export PDF a été peu testé : j’ai donc demandé à plusieurs testeurs de l’essayer en deuxième semaine.",
          },
          { type: "h3", text: "L’usage ressemblait-il à celui attendu en production ?" },
          { type: "p", text: "Compare ce qui s’est passé avec ce que tu attends de tes futurs utilisateurs, et cite les écarts." },
          {
            type: "example",
            text: "Les testeurs ouvraient l’app quelques minutes par jour, comme prévu. En production, j’attends plus d’usage le soir, car l’app sert à préparer les repas du lendemain.",
          },
          { type: "h3", text: "Quels retours as-tu reçus, et comment ?" },
          {
            type: "p",
            text: "Indique le canal, puis résume les retours avec des faits précis. C’est souvent la réponse la plus utile à soigner.",
          },
          {
            type: "example",
            text: "Les retours sont arrivés par un formulaire dans l’app et par email. Trois testeurs ont signalé un crash à la connexion sur Android 12, et deux ont trouvé le bouton d’ajout difficile à voir.",
          },
        ],
      },
      {
        title: "Partie 2 : ton app",
        blocks: [
          { type: "h3", text: "À qui s’adresse-t-elle ?" },
          { type: "p", text: "Décris un public précis." },
          { type: "example", text: "Des personnes qui cuisinent pour leur famille et veulent préparer leurs repas de la semaine." },
          { type: "h3", text: "Quelle valeur apporte-t-elle ?" },
          { type: "p", text: "Dis ce que l’app permet de faire, en une ou deux phrases, sans slogan." },
          {
            type: "example",
            text: "Elle crée le menu de la semaine et la liste de courses à partir de ce que l’utilisateur a déjà chez lui.",
          },
          { type: "h3", text: "Combien d’installations prévois-tu la première année ?" },
          {
            type: "p",
            text: "Choisis une estimation réaliste, en fonction de tes moyens de lancement. Un chiffre modeste et cohérent vaut mieux qu’un chiffre impressionnant.",
          },
        ],
      },
      {
        title: "Partie 3 : ta préparation à la production",
        blocks: [
          { type: "h3", text: "Qu’as-tu changé après le test ?" },
          { type: "p", text: "Relie chaque changement à un retour, avec le numéro de version si tu l’as." },
          {
            type: "example",
            text: "Version 1.0.3 : correction du crash à la connexion sur Android 12. Version 1.0.4 : bouton d’ajout agrandi et déplacé.",
          },
          { type: "h3", text: "Comment as-tu décidé que l’app était prête ?" },
          { type: "p", text: "Donne tes critères." },
          {
            type: "example",
            text: "Plus aucun crash signalé sur la dernière version, les parcours principaux testés sur plusieurs appareils, et les derniers retours ne concernaient que des détails.",
          },
        ],
      },
      {
        title: "Les erreurs à éviter",
        blocks: [
          {
            type: "list",
            items: [
              "**Les réponses génériques.** « Les testeurs étaient satisfaits » n’apprend rien.",
              "**Un test sans aucun changement.** Si rien n’a bougé, explique pourquoi, sans inventer de correction.",
              "**Des informations fausses.** Décris ton vrai recrutement et tes vrais retours.",
              "**Oublier les identifiants de test.** Si ton app demande une connexion, donne à Google des identifiants qui fonctionnent.",
              "**Déposer ta demande sans vérifier ton compteur.** Regarde d’abord le nombre de testeurs inscrits et leur durée.",
            ],
          },
        ],
      },
      {
        title: "Et si ta demande est refusée ?",
        blocks: [
          {
            type: "p",
            text: "La page de Google ne donne pas de liste de motifs de refus. Elle indique qu’il peut falloir continuer le test, par exemple s’il y a moins de 12 testeurs inscrits ou un engagement insuffisant.",
          },
          {
            type: "p",
            text: "Lis le message reçu, continue le test si Google le demande, corrige ce qui pose problème, et note ce que tu fais pour ta prochaine demande. L’examen prend en général 7 jours ou moins, parfois plus.",
          },
        ],
      },
      {
        title: "Tu cherches encore tes testeurs ?",
        blocks: [
          {
            type: "p",
            text: "Le questionnaire est bien plus simple quand le test a été suivi dès le premier jour. [12testeurs](/) inscrit 14 testeurs sur ton test fermé, te transmet des retours QA et t’aide à préparer ta demande.",
          },
          { type: "p", text: "Accès production refusé ? Remboursé intégralement." },
        ],
      },
    ],
  },
];
