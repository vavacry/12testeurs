import { Footer, Header, Hero, OfferTabs } from "@/components/landing";
import { StickyCta } from "@/components/StickyCta";
import { faq } from "@/content/faq";
import { checkoutHref, site } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${site.url}/#service`,
      name: "Testeurs pour test fermé Google Play",
      serviceType: "Test fermé Google Play avec 14 testeurs réels",
      description: site.description,
      url: site.url,
      inLanguage: "fr",
      provider: { "@type": "Organization", name: site.name, url: site.url },
      offers: {
        "@type": "Offer",
        price: String(site.price),
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        url: checkoutHref.startsWith("http") ? checkoutHref : `${site.url}/#inclus`,
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${site.url}/#faq`,
      // Le texte doit être identique à celui affiché ; les réponses encore à remplir sont exclues.
      mainEntity: faq
        .filter((item) => !item.a.includes("{{"))
        .map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
    },
  ],
};

export default function Home() {
  return (
    <div className="overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Header />
      <main id="contenu">
        <Hero />
        <OfferTabs />
      </main>
      <Footer />
      <StickyCta />
    </div>
  );
}
