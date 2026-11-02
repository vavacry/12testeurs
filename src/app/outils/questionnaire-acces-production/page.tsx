import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/landing";
import { MiniHeader } from "@/components/MiniHeader";
import { CtaBlock } from "@/components/ui";
import { site } from "@/lib/site";
import { QuestionnaireTool } from "./QuestionnaireTool";

const title = "Générateur : questionnaire d’accès production Google Play";
const description =
  "Outil gratuit : entre les vrais faits de ton test fermé et obtiens un brouillon de réponse pour chaque sujet du questionnaire d’accès production.";
const url = `${site.url}/outils/questionnaire-acces-production`;

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url,
    siteName: site.name,
    title,
    description,
    images: `${site.url}/opengraph-image.png`,
  },
  twitter: { card: "summary_large_image", title, description, images: `${site.url}/opengraph-image.png` },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: title,
  description,
  url,
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Tous",
  inLanguage: "fr-FR",
  isAccessibleForFree: true,
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  provider: { "@type": "Organization", name: site.name, url: `${site.url}/` },
};

export default function QuestionnaireToolPage() {
  return (
    <div className="overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <MiniHeader />
      <main id="contenu">
        <div className="frame px-4 py-14 md:px-8 md:py-20 xl:px-12">
          <p className="label text-ok">Outil gratuit · sans inscription</p>
          <h1 className="display mt-6 max-w-[18ch] text-[clamp(2.5rem,6vw,5rem)]">
            Prépare ton questionnaire d’accès production
          </h1>
          <div className="mt-8 max-w-[64ch] space-y-4 text-lg text-mute">
            <p>
              Entre ce qui s’est vraiment passé pendant ton test fermé. L’outil met tes réponses en forme, sujet par sujet,
              et te signale ce qu’il manque.
            </p>
            <p>
              Ce que tu écris reste dans ton navigateur : rien n’est envoyé, et tout s’efface quand tu fermes la page.
              Copie tes brouillons avant de partir.
            </p>
          </div>
          <div className="mt-8 max-w-[64ch] border-l-2 border-blue-text px-4 py-1 text-sm text-mute">
            <p>
              C’est un brouillon, sans garantie : Google décide seul de l’accès production, et cet outil n’est pas lié à
              Google. Les sujets viennent de sa{" "}
              <a
                href="https://support.google.com/googleplay/android-developer/answer/14151465?hl=fr"
                rel="noopener"
                className="text-paper underline underline-offset-4"
              >
                page d’aide
              </a>
              . Le texte exact peut changer : fie-toi à ta Play Console.
            </p>
            <p className="mt-2">
              Besoin d’exemples ?{" "}
              <Link
                href="/blog/questionnaire-acces-production-google-play"
                className="text-paper underline underline-offset-4"
              >
                Lis le guide complet
              </Link>
              .
            </p>
          </div>

          <QuestionnaireTool />

          <section aria-labelledby="testeurs" className="mt-16 max-w-[72ch] border-t border-line pt-8">
            <h2 id="testeurs" className="text-2xl font-semibold text-paper md:text-3xl">
              Tu n’as pas encore tes 12 testeurs ?
            </h2>
            <p className="mt-4 text-mute">
              On inscrit 14 testeurs sur ton test fermé, on te transmet leurs retours QA et on t’aide à préparer ta demande.
              Accès production refusé ? Remboursé intégralement.
            </p>
            <CtaBlock />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
