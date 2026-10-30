export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "list"; items: string[] };

export type LegalSection = { title: string; blocks: LegalBlock[] };

export type LegalDoc = {
  title: string; // titre H1 de la page
  metaDescription: string; // ≤ 155 caractères
  updatedAt: string;
  intro?: string;
  sections: LegalSection[];
};

/* -------------------------------------------------------------------------- */
/*                               MENTIONS LÉGALES                             */
/* -------------------------------------------------------------------------- */

export const mentionsLegales: LegalDoc = {
  title: "Mentions légales",
  metaDescription:
    "Mentions légales de 12testeurs : éditeur, directeur de la publication, hébergeur, propriété intellectuelle et absence d’affiliation à Google.",
  updatedAt: "29 octobre 2026",
  intro:
    "Conformément à la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l’économie numérique (LCEN), voici les informations relatives au site 12testeurs.",
  sections: [
    {
      title: "Éditeur du site",
      blocks: [
        {
          type: "list",
          items: [
            "Mathieu Dunand, exerçant sous le nom commercial Vascent, entrepreneur individuel (EI) sous le régime de la micro-entreprise",
            "Adresse : 200 rue de la Croix Nivert, 75015 Paris",
            "SIRET : 106 038 516 00014",
            "Immatriculation : Registre national des entreprises (RNE), SIREN 106 038 516, immatriculation du 08/06/2026",
            "Email : vacryoff@gmail.com",
            "Téléphone : 07 69 62 20 60",
            "TVA non applicable, article 293 B du Code général des impôts",
          ],
        },
      ],
    },
    {
      title: "Directeur de la publication",
      blocks: [
        {
          type: "p",
          text: "Le directeur de la publication est Mathieu Dunand.",
        },
      ],
    },
    {
      title: "Hébergeur",
      blocks: [
        {
          type: "list",
          items: [
            "Vercel Inc.",
            "440 N Barranca Ave #4133, Covina, CA 91723, États-Unis",
            "Contact : support@vercel.com",
            "Site : https://vercel.com",
          ],
        },
      ],
    },
    {
      title: "Absence d’affiliation à Google",
      blocks: [
        {
          type: "p",
          text: "12testeurs est un service indépendant. Il n’est ni affilié à Google LLC, ni approuvé par Google.",
        },
        {
          type: "p",
          text: "Google Play et Android sont des marques de Google LLC. Elles sont citées uniquement pour décrire le service proposé.",
        },
        {
          type: "p",
          text: "La décision d’accorder ou de refuser l’accès production à une application appartient à Google seule.",
        },
      ],
    },
    {
      title: "Propriété intellectuelle",
      blocks: [
        {
          type: "p",
          text: "Le nom 12testeurs, le logo, les textes, les visuels et la structure du site sont la propriété de l’éditeur, sauf mention contraire. Les éléments appartenant à des tiers restent la propriété de leurs titulaires.",
        },
        {
          type: "p",
          text: "Toute reproduction, représentation ou adaptation, totale ou partielle, sans autorisation écrite préalable de l’éditeur est interdite (article L122-4 du Code de la propriété intellectuelle). Elle peut constituer une contrefaçon (articles L335-2 et suivants du même code).",
        },
      ],
    },
    {
      title: "Responsabilité",
      blocks: [
        {
          type: "p",
          text: "L’éditeur s’efforce de fournir des informations exactes et à jour, notamment sur les règles de Google Play. Ces règles peuvent évoluer à tout moment à l’initiative de Google. Seules les pages officielles de Google font foi.",
        },
        {
          type: "p",
          text: "Le site peut contenir des liens vers des sites tiers. L’éditeur n’est pas responsable de leur contenu.",
        },
      ],
    },
    {
      title: "Données personnelles et cookies",
      blocks: [
        {
          type: "p",
          text: "Le traitement de vos données personnelles est décrit dans la politique de confidentialité. Le site n’utilise aucun cookie non essentiel ni aucun outil de mesure d’audience.",
        },
      ],
    },
  ],
};

/* -------------------------------------------------------------------------- */
/*                       CONDITIONS GÉNÉRALES DE VENTE                        */
/* -------------------------------------------------------------------------- */

export const cgv: LegalDoc = {
  title: "Conditions générales de vente",
  metaDescription:
    "CGV de 12testeurs : test fermé Google Play avec 14 testeurs réels, 39 € TTC, droit de rétractation et remboursement si Google refuse l’accès production.",
  updatedAt: "29 octobre 2026",
  intro:
    "Les présentes conditions générales de vente (CGV) s’appliquent à toute commande passée sur le site 12testeurs. Elles sont accessibles à tout moment sur le site. Le Client les accepte avant tout paiement.",
  sections: [
    {
      title: "Article 1 – Vendeur",
      blocks: [
        {
          type: "p",
          text: "Le service 12testeurs est édité par Mathieu Dunand (nom commercial : Vascent), entrepreneur individuel (EI) sous le régime de la micro-entreprise (ci-après « l’éditeur »).",
        },
        {
          type: "list",
          items: [
            "Adresse : 200 rue de la Croix Nivert, 75015 Paris",
            "SIRET : 106 038 516 00014",
            "Email : vacryoff@gmail.com",
            "Téléphone : 07 69 62 20 60",
            "TVA non applicable, article 293 B du Code général des impôts",
          ],
        },
      ],
    },
    {
      title: "Article 2 – Définitions",
      blocks: [
        {
          type: "list",
          items: [
            "Client : toute personne qui commande la Prestation, en tant que consommateur ou en tant que professionnel.",
            "Consommateur : toute personne physique qui agit à des fins qui n’entrent pas dans le cadre de son activité commerciale, industrielle, artisanale, libérale ou agricole.",
            "Projet : une application Android, identifiée par un ID de package unique. Une commande couvre un seul Projet.",
            "Test fermé : la piste de test fermé créée par le Client dans sa Google Play Console.",
            "Testeurs : les personnes mobilisées par l’éditeur pour participer au Test fermé du Client.",
            "Prestation : l’ensemble des services décrits à l’article 4.",
          ],
        },
      ],
    },
    {
      title: "Article 3 – Contexte : la règle Google Play",
      blocks: [
        {
          type: "p",
          text: "Google impose aux comptes développeur Google Play personnels créés après le 13 novembre 2023 de mener un test fermé avant de pouvoir demander l’accès production. À la date de mise à jour des présentes CGV, ce test doit réunir au moins 12 testeurs inscrits sans interruption pendant au moins 14 jours.",
        },
        {
          type: "p",
          text: "Ces règles sont fixées et modifiées par Google seule. La décision d’accorder ou de refuser l’accès production appartient exclusivement à Google. 12testeurs est un service indépendant, ni affilié à Google LLC, ni approuvé par Google.",
        },
      ],
    },
    {
      title: "Article 4 – Description de la Prestation",
      blocks: [
        {
          type: "p",
          text: "Pour chaque Projet, l’éditeur fournit :",
        },
        {
          type: "list",
          items: [
            "14 Testeurs réels : des personnes physiques, sur de vrais appareils Android, qui s’inscrivent au Test fermé du Client et restent actifs pendant 14 jours en ouvrant régulièrement l’application ;",
            "un retour qualité (QA) : bugs constatés, captures d’écran et retours sur l’expérience utilisateur, puis un résumé écrit remis en fin de test ;",
            "un suivi quotidien du nombre de Testeurs inscrits ;",
            "une aide à la rédaction des réponses au questionnaire de demande d’accès production ;",
            "si le Client le souhaite, un accompagnement pour créer la piste de test fermé, le Google Group et le lien d’inscription.",
          ],
        },
        {
          type: "p",
          text: "Les Testeurs installent l’application depuis le Google Play Store. Ils n’ont jamais accès au code source ni à la Play Console du Client. Le Client reste seul titulaire de son compte développeur et seul responsable des actions réalisées dans sa Play Console.",
        },
        {
          type: "p",
          text: "Le retour qualité repose sur l’usage réel de l’application par les Testeurs. Il ne constitue pas un audit exhaustif et ne prétend pas détecter tous les bugs.",
        },
        {
          type: "p",
          text: "La Prestation ne comprend pas :",
        },
        {
          type: "list",
          items: [
            "la soumission de la demande d’accès production, qui reste à la charge du Client ;",
            "toute intervention sur le code de l’application ou la correction des bugs ;",
            "l’obtention de l’accès production, qui dépend de la seule décision de Google.",
          ],
        },
      ],
    },
    {
      title: "Article 5 – Prix",
      blocks: [
        {
          type: "p",
          text: "Le prix est de 39 € TTC par Projet. TVA non applicable, article 293 B du Code général des impôts.",
        },
        {
          type: "p",
          text: "Il s’agit d’un paiement unique, sans abonnement ni reconduction. Le prix couvre l’ensemble de la Prestation décrite à l’article 4, accompagnement compris.",
        },
        {
          type: "p",
          text: "Le prix applicable est celui affiché sur le site au jour de la commande.",
        },
      ],
    },
    {
      title: "Article 6 – Commande et paiement",
      blocks: [
        {
          type: "p",
          text: "La commande se déroule en ligne, en trois étapes :",
        },
        {
          type: "list",
          items: [
            "le Client prend connaissance des présentes CGV et les accepte ;",
            "il paie le prix via le lien de paiement sécurisé Stripe ;",
            "après le paiement, il complète le formulaire de commande : nom, email, nom de l’application, ID du package Android, lien de test fermé s’il est déjà disponible, besoin d’accompagnement.",
          ],
        },
        {
          type: "p",
          text: "Le contrat est conclu à la confirmation du paiement par Stripe. Le prix est payable en totalité à la commande. Les données de carte bancaire sont traitées exclusivement par Stripe : l’éditeur n’y a jamais accès.",
        },
        {
          type: "p",
          text: "L’éditeur adresse au Client, par email, une confirmation de commande reprenant les caractéristiques de la Prestation et un lien vers les présentes CGV, ainsi qu’une facture.",
        },
      ],
    },
    {
      title: "Article 7 – Déroulement et délais",
      blocks: [
        {
          type: "p",
          text: "La Prestation démarre à la réception d’un lien de test fermé valide. Pour un Client Consommateur, un démarrage avant la fin du délai de rétractation suppose sa demande expresse (article 9).",
        },
        {
          type: "p",
          text: "Les Testeurs s’inscrivent au Test fermé dans un délai de 24 à 48 heures après réception du lien. Le test dure ensuite 14 jours consécutifs. L’éditeur suit chaque jour le nombre de Testeurs inscrits.",
        },
        {
          type: "p",
          text: "En fin de test, l’éditeur remet le résumé écrit et aide le Client à préparer ses réponses au questionnaire de demande d’accès production.",
        },
        {
          type: "p",
          text: "À titre indicatif, il faut prévoir environ 3 semaines au total : 14 jours de test, puis l’examen de la demande par Google. Le délai d’examen dépend de Google seule.",
        },
        {
          type: "p",
          text: "Si le Client ne dispose pas encore d’un lien de test fermé, il peut demander l’accompagnement prévu à l’article 4. Le délai de 24 à 48 heures court à compter de la réception du lien valide.",
        },
      ],
    },
    {
      title: "Article 8 – Obligations du Client",
      blocks: [
        {
          type: "p",
          text: "Pour permettre la bonne exécution de la Prestation, le Client s’engage à :",
        },
        {
          type: "list",
          items: [
            "fournir un lien de test fermé valide, permettant l’inscription des 14 Testeurs ;",
            "maintenir l’application disponible au test pendant les 14 jours ;",
            "ne pas retirer les Testeurs du Test fermé (Google Group ou liste de testeurs) pendant le test ;",
            "soumettre lui-même la demande d’accès production depuis sa Play Console ;",
            "fournir des informations exactes, notamment dans le questionnaire de demande d’accès production, dont il reste seul responsable ;",
            "proposer au test une application licite, conforme aux règles de Google Play, sans logiciel malveillant et sans risque pour les appareils des Testeurs ;",
            "n’utiliser les données des Testeurs auxquelles il a accès (par exemple les adresses email visibles dans le Google Group ou la Play Console) que pour les besoins du test, à l’exclusion de toute prospection ;",
            "respecter la réglementation applicable aux données que son application collecte auprès des Testeurs.",
          ],
        },
        {
          type: "p",
          text: "Si l’application présente un risque pour les Testeurs ou un contenu manifestement illicite, l’éditeur peut refuser ou interrompre la Prestation. Si la Prestation n’a pas encore commencé, le Client est alors intégralement remboursé.",
        },
        {
          type: "p",
          text: "Un manquement du Client à ces obligations peut compromettre le test. L’éditeur n’en est pas responsable.",
        },
      ],
    },
    {
      title: "Article 9 – Droit de rétractation (Clients Consommateurs)",
      blocks: [
        {
          type: "p",
          text: "Le Client Consommateur dispose d’un délai de 14 jours à compter de la conclusion du contrat pour se rétracter, sans avoir à motiver sa décision (article L221-18 du Code de la consommation).",
        },
        {
          type: "p",
          text: "Pour l’exercer, il adresse à l’éditeur, avant la fin de ce délai, une déclaration dénuée d’ambiguïté, par email à vacryoff@gmail.com ou par courrier à 200 rue de la Croix Nivert, 75015 Paris. Il peut utiliser le modèle de formulaire de l’article 10, sans obligation.",
        },
        {
          type: "p",
          text: "Démarrage avant la fin du délai. Le Consommateur qui souhaite que le test commence avant la fin du délai de rétractation doit en faire la demande expresse (article L221-25 du Code de la consommation). Cette demande est recueillie par une case à cocher dédiée, non pré-cochée, sur le formulaire de commande complété après le paiement. Sans cette demande, la Prestation démarre à l’expiration du délai de rétractation.",
        },
        {
          type: "p",
          text: "Rétractation après démarrage. Le Consommateur qui se rétracte après avoir demandé un démarrage anticipé verse un montant proportionné au service fourni jusqu’à la communication de sa décision (article L221-25 du Code de la consommation) :",
        },
        {
          type: "list",
          items: [
            "Testeurs pas encore inscrits : aucun montant n’est dû, le remboursement est intégral ;",
            "test en cours : le montant dû est égal à 39 € × nombre de jours de test écoulés ÷ 14. Le solde est remboursé.",
          ],
        },
        {
          type: "p",
          text: "En pratique, la Prestation ne peut pas être pleinement exécutée avant la fin du délai de rétractation. L’exception prévue à l’article L221-28, 1° du Code de la consommation n’a donc pas vocation à s’appliquer.",
        },
        {
          type: "p",
          text: "L’éditeur rembourse les sommes dues au plus tard 14 jours après avoir été informé de la rétractation, par le même moyen de paiement que celui utilisé pour la commande (article L221-24 du Code de la consommation).",
        },
        {
          type: "p",
          text: "Le droit de rétractation ne s’applique pas aux Clients professionnels.",
        },
      ],
    },
    {
      title: "Article 10 – Modèle de formulaire de rétractation",
      blocks: [
        {
          type: "p",
          text: "Veuillez compléter et renvoyer le présent formulaire uniquement si vous souhaitez vous rétracter du contrat.",
        },
        {
          type: "list",
          items: [
            "À l’attention de Mathieu Dunand (12testeurs), 200 rue de la Croix Nivert, 75015 Paris, vacryoff@gmail.com :",
            "Je vous notifie par la présente ma rétractation du contrat portant sur la prestation de services ci-dessous :",
            "Commandée le :",
            "Nom de l’application concernée :",
            "Nom du consommateur :",
            "Adresse du consommateur :",
            "Signature du consommateur (uniquement en cas d’envoi sur papier) :",
            "Date :",
          ],
        },
      ],
    },
    {
      title: "Article 11 – Remboursement en cas de refus de Google",
      blocks: [
        {
          type: "p",
          text: "Accès production refusé ? Remboursé intégralement.",
        },
        {
          type: "p",
          text: "L’éditeur ne peut pas promettre l’obtention de l’accès production : cette décision appartient à Google seule. En revanche, si Google refuse l’accès production après notre test, l’éditeur rembourse l’intégralité du prix payé, soit 39 €.",
        },
        {
          type: "p",
          text: "Toute réponse de Google qui n’accorde pas l’accès production, y compris une demande de poursuivre le test, est considérée comme un refus.",
        },
        {
          type: "p",
          text: "Conditions :",
        },
        {
          type: "list",
          items: [
            "le test fermé a été mené à son terme avec nos Testeurs : 14 jours consécutifs, sans retrait des Testeurs ni interruption du test du fait du Client ;",
            "la demande d’accès production porte sur le Projet testé et a été soumise par le Client au plus tard 7 jours après la fin des 14 jours de test, tant que nos Testeurs sont encore inscrits ;",
            "le Client fournit un justificatif du refus : capture d’écran de la Play Console ou email de Google ;",
            "la demande de remboursement est adressée à vacryoff@gmail.com dans un délai de 30 jours à compter de la réception de la décision de Google.",
          ],
        },
        {
          type: "p",
          text: "Le remboursement est effectué sur le moyen de paiement d’origine, via Stripe, sous 14 jours à compter de la réception de la demande complète.",
        },
        {
          type: "p",
          text: "Ce remboursement ne s’applique pas lorsque Google suspend ou supprime le compte développeur ou l’application pour violation de ses règles.",
        },
        {
          type: "p",
          text: "Si le test ne peut pas être mené à son terme du fait de l’éditeur, le Client est intégralement remboursé, dans les mêmes délais.",
        },
        {
          type: "p",
          text: "Cet engagement s’ajoute aux droits que le Client tient de la loi, notamment le droit de rétractation.",
        },
      ],
    },
    {
      title: "Article 12 – Propriété intellectuelle et confidentialité",
      blocks: [
        {
          type: "p",
          text: "Le Client conserve l’intégralité de ses droits sur son application, son code, ses marques et ses contenus. La Prestation n’emporte aucun transfert de droits au profit de l’éditeur ou des Testeurs.",
        },
        {
          type: "p",
          text: "Les retours QA et le résumé de fin de test sont remis au Client, qui peut les utiliser librement pour les besoins de son application.",
        },
        {
          type: "p",
          text: "L’éditeur garde confidentielles les informations transmises par le Client. Il ne communique aux Testeurs que le nom de l’application et le lien de test fermé, nécessaires à la Prestation.",
        },
        {
          type: "p",
          text: "Les Testeurs utilisent l’application comme tout utilisateur du Play Store. Ils voient les informations publiques de sa fiche, dont le nom du développeur. L’éditeur demande aux Testeurs de ne pas divulguer les applications testées.",
        },
      ],
    },
    {
      title: "Article 13 – Responsabilité",
      blocks: [
        {
          type: "p",
          text: "L’éditeur exécute la Prestation avec diligence et selon les règles de l’art.",
        },
        {
          type: "p",
          text: "Sa responsabilité ne peut pas être engagée pour les faits qui relèvent de Google ou du Client, notamment :",
        },
        {
          type: "list",
          items: [
            "la décision de Google d’accorder ou de refuser l’accès production, ses délais d’examen et toute modification de ses règles ;",
            "le fonctionnement de Google Play, de la Play Console ou de Google Groups ;",
            "une suspension ou une restriction du compte développeur du Client décidée par Google, sauf si elle résulte d’un manquement de l’éditeur ;",
            "les conséquences d’un manquement du Client à ses obligations.",
          ],
        },
        {
          type: "p",
          text: "Pour les Clients professionnels, la responsabilité de l’éditeur est limitée au prix payé pour le Projet concerné, sauf faute lourde ou dolosive.",
        },
        {
          type: "p",
          text: "Pour les Clients Consommateurs, aucune stipulation des présentes CGV ne limite les droits qu’ils tiennent de la loi.",
        },
      ],
    },
    {
      title: "Article 14 – Force majeure",
      blocks: [
        {
          type: "p",
          text: "Aucune partie n’est responsable d’un manquement causé par un cas de force majeure au sens de l’article 1218 du Code civil.",
        },
      ],
    },
    {
      title: "Article 15 – Données personnelles",
      blocks: [
        {
          type: "p",
          text: "Les données collectées lors de la commande sont traitées conformément à la politique de confidentialité, accessible sur le site.",
        },
      ],
    },
    {
      title: "Article 16 – Réclamations et médiation",
      blocks: [
        {
          type: "p",
          text: "Pour toute question ou réclamation, le Client contacte l’éditeur à vacryoff@gmail.com.",
        },
        {
          type: "p",
          text: "En cas de litige, le Client Consommateur peut recourir gratuitement au médiateur de la consommation suivant (article L612-1 du Code de la consommation) :",
        },
        {
          type: "list",
          items: ["{{MEDIATEUR_NOM}}", "Site : {{MEDIATEUR_URL}}"],
        },
        {
          type: "p",
          text: "Le médiateur peut être saisi après une réclamation écrite adressée à l’éditeur, dans un délai d’un an à compter de cette réclamation (article L612-2 du Code de la consommation).",
        },
      ],
    },
    {
      title: "Article 17 – Droit applicable et litiges",
      blocks: [
        {
          type: "p",
          text: "Les présentes CGV sont soumises au droit français. Le Client Consommateur qui réside dans un autre pays conserve la protection des dispositions impératives de la loi de son pays de résidence.",
        },
        {
          type: "p",
          text: "À défaut de solution amiable, le litige est porté devant la juridiction compétente selon les règles de droit commun. Le Consommateur peut aussi saisir la juridiction du lieu où il demeurait lors de la conclusion du contrat ou de la survenance du fait dommageable (article R631-3 du Code de la consommation).",
        },
      ],
    },
    {
      title: "Article 18 – Modification des CGV",
      blocks: [
        {
          type: "p",
          text: "L’éditeur peut modifier les présentes CGV à tout moment. Les CGV applicables sont celles en vigueur à la date de la commande.",
        },
      ],
    },
  ],
};

/* -------------------------------------------------------------------------- */
/*                         POLITIQUE DE CONFIDENTIALITÉ                       */
/* -------------------------------------------------------------------------- */

export const confidentialite: LegalDoc = {
  title: "Politique de confidentialité",
  metaDescription:
    "Politique de confidentialité de 12testeurs : données collectées, finalités, destinataires, durées de conservation et vos droits RGPD.",
  updatedAt: "29 octobre 2026",
  intro:
    "Cette politique explique comment vos données personnelles sont traitées lorsque vous consultez le site 12testeurs et commandez la prestation 12testeurs, conformément au Règlement général sur la protection des données (RGPD) et à la loi Informatique et Libertés.",
  sections: [
    {
      title: "Responsable du traitement",
      blocks: [
        {
          type: "p",
          text: "Le responsable du traitement est Mathieu Dunand, entrepreneur individuel (EI), 200 rue de la Croix Nivert, 75015 Paris (ci-après « l’éditeur »).",
        },
        {
          type: "p",
          text: "Pour toute question relative à vos données : vacryoff@gmail.com.",
        },
      ],
    },
    {
      title: "Données collectées",
      blocks: [
        {
          type: "p",
          text: "Lors du paiement. Le paiement est réalisé sur une page sécurisée de Stripe. L’éditeur n’a jamais accès à vos données de carte bancaire. Il reçoit de Stripe les informations utiles au suivi de la commande, par exemple vos nom et email, le montant, la date et le statut du paiement.",
        },
        {
          type: "p",
          text: "Lors de la commande. Après le paiement, le formulaire de commande collecte :",
        },
        {
          type: "list",
          items: [
            "votre nom ;",
            "votre adresse email ;",
            "le nom de l’application ;",
            "l’ID du package Android ;",
            "le lien de test fermé (facultatif) ;",
            "votre besoin d’accompagnement (oui ou non) ;",
            "l’identifiant de session Stripe, qui rattache la commande au paiement ;",
            "votre choix concernant le démarrage de la prestation avant la fin du délai de rétractation (case à cocher).",
          ],
        },
        {
          type: "p",
          text: "Lors de nos échanges. Si vous nous écrivez, nous traitons votre email, le contenu de vos messages et les éléments que vous nous transmettez, par exemple des captures d’écran.",
        },
        {
          type: "p",
          text: "Lors de la navigation. L’hébergeur traite des données techniques (adresse IP, date et heure de connexion, pages demandées, type de navigateur) pour assurer le fonctionnement et la sécurité du site.",
        },
        {
          type: "p",
          text: "Les champs obligatoires du formulaire sont nécessaires à l’exécution de la commande. Sans eux, la prestation ne peut pas être réalisée.",
        },
      ],
    },
    {
      title: "Finalités et bases légales",
      blocks: [
        {
          type: "list",
          items: [
            "Exécuter la commande et la prestation (organisation du test, retours QA, suivi, accompagnement) : exécution du contrat (article 6.1.b du RGPD).",
            "Gérer le paiement, la facturation et la comptabilité : exécution du contrat et obligations légales comptables et fiscales (article 6.1.b et 6.1.c du RGPD).",
            "Traiter les demandes de rétractation et de remboursement, ainsi que les réclamations : exécution du contrat et obligations légales (article 6.1.b et 6.1.c du RGPD).",
            "Répondre à vos questions avant ou après une commande : mesures précontractuelles ou intérêt légitime de l’éditeur à répondre aux demandes reçues (article 6.1.b et 6.1.f du RGPD).",
            "Assurer la sécurité du site et prévenir la fraude : intérêt légitime (article 6.1.f du RGPD).",
            "Conserver la preuve des commandes et défendre les droits de l’éditeur en cas de litige : intérêt légitime (article 6.1.f du RGPD).",
          ],
        },
        {
          type: "p",
          text: "Aucune décision fondée exclusivement sur un traitement automatisé n’est prise à votre égard. Vos données ne sont ni vendues ni louées.",
        },
      ],
    },
    {
      title: "Destinataires",
      blocks: [
        {
          type: "p",
          text: "Vos données sont traitées par l’éditeur. Elles ne sont communiquées qu’aux destinataires suivants, dans la limite de ce qui est nécessaire :",
        },
        {
          type: "list",
          items: [
            "Stripe (Stripe Payments Europe, Limited, Irlande) : paiement en ligne. Stripe traite aussi certaines données pour son propre compte, notamment pour lutter contre la fraude et respecter ses obligations légales, selon sa politique de confidentialité (https://stripe.com/privacy).",
            "Vercel Inc. (États-Unis) : hébergement du site.",
            "Google LLC, service Gmail (États-Unis) : messagerie de l’éditeur, réception et gestion des commandes. Les données du formulaire y sont transmises par email ou, le cas échéant, via un outil d’automatisation (webhook) mentionné ici dès sa mise en place.",
            "Le fournisseur de messagerie électronique de l’éditeur : échanges par email.",
            "Les testeurs : uniquement le nom de l’application et le lien de test fermé, nécessaires à la prestation. Ils installent l’application depuis le Play Store et n’ont jamais accès à votre code source ni à votre Play Console. Comme tout utilisateur du Play Store, ils voient les informations publiques de la fiche de l’application, dont le nom du développeur.",
            "Les autorités administratives ou judiciaires, uniquement lorsque la loi l’exige.",
          ],
        },
        {
          type: "p",
          text: "Sauf mention contraire ci-dessus, les prestataires techniques agissent en qualité de sous-traitants, sur instruction de l’éditeur.",
        },
      ],
    },
    {
      title: "Transferts hors de l’Union européenne",
      blocks: [
        {
          type: "p",
          text: "Certains destinataires sont établis ou traitent des données hors de l’Union européenne, notamment aux États-Unis : Vercel Inc., Stripe pour certains traitements, et Google LLC (Gmail).",
        },
        {
          type: "p",
          text: "Ces transferts sont encadrés par la décision d’adéquation de la Commission européenne du 10 juillet 2023 (EU-U.S. Data Privacy Framework) pour les entreprises certifiées, ou à défaut par les clauses contractuelles types adoptées par la Commission européenne. Vous pouvez obtenir une copie de ces garanties en écrivant à vacryoff@gmail.com.",
        },
      ],
    },
    {
      title: "Durées de conservation",
      blocks: [
        {
          type: "list",
          items: [
            "Données de commande et échanges liés : pendant l’exécution de la prestation et le traitement de toute demande de remboursement, puis 5 ans en archivage, à des fins de preuve (délai de prescription de droit commun).",
            "Factures et pièces comptables : 10 ans à compter de la clôture de l’exercice (obligations comptables et fiscales).",
            "Messages reçus sans commande : 3 ans à compter du dernier échange.",
            "Données techniques de connexion : durée limitée, définie par l’hébergeur pour assurer la sécurité du site.",
          ],
        },
        {
          type: "p",
          text: "À l’issue de ces durées, les données sont supprimées ou anonymisées.",
        },
      ],
    },
    {
      title: "Vos droits",
      blocks: [
        {
          type: "p",
          text: "Vous disposez des droits suivants sur vos données :",
        },
        {
          type: "list",
          items: [
            "droit d’accès ;",
            "droit de rectification ;",
            "droit à l’effacement ;",
            "droit à la limitation du traitement ;",
            "droit à la portabilité ;",
            "droit d’opposition aux traitements fondés sur l’intérêt légitime ;",
            "droit de définir des directives sur le sort de vos données après votre décès.",
          ],
        },
        {
          type: "p",
          text: "Pour exercer ces droits, écrivez à vacryoff@gmail.com. Une réponse vous est apportée dans un délai d’un mois, prolongeable de deux mois si la demande est complexe. En cas de doute raisonnable sur votre identité, un justificatif peut vous être demandé.",
        },
        {
          type: "p",
          text: "Certains droits sont limités par la loi. Par exemple, les pièces comptables doivent être conservées même en cas de demande d’effacement.",
        },
        {
          type: "p",
          text: "Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de la CNIL : https://www.cnil.fr, 3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07.",
        },
      ],
    },
    {
      title: "Cookies",
      blocks: [
        {
          type: "p",
          text: "Le site n’utilise aucun cookie non essentiel et aucun outil de mesure d’audience. Aucun consentement n’est donc demandé.",
        },
        {
          type: "p",
          text: "La page de paiement est hébergée par Stripe, sur son propre domaine. Stripe peut y utiliser des cookies nécessaires au paiement et à la prévention de la fraude, selon sa propre politique.",
        },
      ],
    },
    {
      title: "Sécurité",
      blocks: [
        {
          type: "p",
          text: "L’éditeur met en œuvre des mesures adaptées pour protéger vos données : connexion chiffrée (HTTPS) et accès limité à l’éditeur et aux destinataires listés ci-dessus.",
        },
      ],
    },
    {
      title: "Modification de cette politique",
      blocks: [
        {
          type: "p",
          text: "Cette politique peut être mise à jour. La date de dernière mise à jour est indiquée sur cette page.",
        },
      ],
    },
  ],
};
