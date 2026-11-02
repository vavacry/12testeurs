import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleText } from "@/components/ArticleText";
import { Footer } from "@/components/landing";
import { MiniHeader } from "@/components/MiniHeader";
import { CtaBlock } from "@/components/ui";
import { articles, type ArticleBlock } from "@/content/articles";
import { site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map(({ slug }) => ({ slug }));
}

const findArticle = (slug: string) => articles.find((article) => article.slug === slug);

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const article = findArticle((await params).slug);
  if (!article) return {};
  const url = `${site.url}/blog/${article.slug}`;
  return {
    title: { absolute: article.metaTitle },
    description: article.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: "fr_FR",
      url,
      siteName: site.name,
      title: article.metaTitle,
      description: article.description,
      publishedTime: article.publishedAt,
      images: `${site.url}/opengraph-image.png`,
    },
    twitter: {
      card: "summary_large_image",
      title: article.metaTitle,
      description: article.description,
      images: `${site.url}/opengraph-image.png`,
    },
  };
}

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "h3":
      return <h3 className="pt-5 text-lg font-semibold text-paper md:text-xl">{block.text}</h3>;
    case "p":
      return (
        <p>
          <ArticleText text={block.text} />
        </p>
      );
    case "list":
      return (
        <ul className="space-y-2">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3">
              <span aria-hidden="true" className="font-mono text-blue-text">
                —
              </span>
              <span>
                <ArticleText text={item} />
              </span>
            </li>
          ))}
        </ul>
      );
    case "example":
      return (
        <blockquote className="border-l-2 border-blue-text bg-white/[0.03] px-4 py-3">
          <p className="label text-blue-text">Exemple inventé</p>
          <p className="mt-2 text-paper">{block.text}</p>
        </blockquote>
      );
  }
}

export default async function ArticlePage({ params }: PageProps<"/blog/[slug]">) {
  const article = findArticle((await params).slug);
  if (!article) notFound();

  const url = `${site.url}/blog/${article.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: article.title,
        description: article.description,
        datePublished: article.publishedAt,
        inLanguage: "fr-FR",
        mainEntityOfPage: url,
        author: { "@type": "Organization", name: site.name, url: `${site.url}/` },
        publisher: { "@type": "Organization", name: site.name, url: `${site.url}/` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: `${site.url}/` },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${site.url}/blog` },
          { "@type": "ListItem", position: 3, name: article.title, item: url },
        ],
      },
    ],
  };

  return (
    <div className="overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <MiniHeader href="/blog" label="Blog" />
      <main id="contenu">
        <article className="frame px-4 py-14 md:px-8 md:py-20 xl:px-12">
          <p className="label text-mute">Guide · publié le {article.publishedLabel}</p>
          <h1 className="display mt-6 max-w-[18ch] text-[clamp(2.5rem,6vw,5rem)]">{article.title}</h1>
          <div className="mt-10 max-w-[72ch] space-y-4 text-lg text-mute">
            {article.intro.map((text) => (
              <p key={text}>
                <ArticleText text={text} />
              </p>
            ))}
          </div>
          <div className="mt-12 max-w-[72ch]">
            {article.sections.map((section) => (
              <section key={section.title} className="border-t border-line pt-8 pb-10">
                <h2 className="text-2xl font-semibold text-paper md:text-3xl">{section.title}</h2>
                <div className="mt-4 space-y-4 text-mute">
                  {section.blocks.map((block, i) => (
                    <Block key={i} block={block} />
                  ))}
                </div>
              </section>
            ))}
            <CtaBlock />
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
