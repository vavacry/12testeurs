import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/landing";
import { MiniHeader } from "@/components/MiniHeader";
import { PixelArrow } from "@/components/ui";
import { articles } from "@/content/articles";
import { site } from "@/lib/site";

const title = "Blog : réussir son test fermé Google Play";
const description = "Des guides en français pour préparer ton test fermé Google Play et ta demande d’accès production.";

export const metadata: Metadata = {
  title: { absolute: `${title} · ${site.name}` },
  description,
  alternates: { canonical: `${site.url}/blog` },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: `${site.url}/blog`,
    siteName: site.name,
    title,
    description,
    images: `${site.url}/opengraph-image.png`,
  },
  twitter: { card: "summary_large_image", title, description, images: `${site.url}/opengraph-image.png` },
};

export default function BlogPage() {
  return (
    <div className="overflow-x-clip">
      <MiniHeader />
      <main id="contenu">
        <div className="frame px-4 py-14 md:px-8 md:py-20 xl:px-12">
          <p className="label text-mute">Blog · test fermé Google Play</p>
          <h1 className="display mt-6 text-[clamp(2.75rem,7vw,5.5rem)]">Les guides</h1>
          <p className="mt-6 max-w-[56ch] text-lg text-mute">{description}</p>
          <p className="mt-6 max-w-[56ch] text-mute">
            Tu prépares ta demande ?{" "}
            <Link href="/outils/questionnaire-acces-production" className="text-paper underline underline-offset-4">
              Utilise notre générateur gratuit de réponses
            </Link>
            .
          </p>
          <ul className="mt-12 border-t border-line">
            {articles.map((article) => (
              <li key={article.slug} className="border-b border-line">
                <Link href={`/blog/${article.slug}`} className="group block py-8">
                  <h2 className="max-w-[40ch] text-xl font-semibold text-paper group-hover:underline group-hover:underline-offset-4 md:text-2xl">
                    {article.title}
                  </h2>
                  <p className="mt-3 max-w-[64ch] text-mute">{article.excerpt}</p>
                  <p className="label mt-4 flex items-center gap-2 text-blue-text">
                    Lire le guide <PixelArrow />
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
}
