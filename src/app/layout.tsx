import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Analytics } from "@/components/Analytics";
import { site } from "@/lib/site";
import "./globals.css";

// Polices auto-hébergées, instanciées depuis les variables Archivo et JetBrains Mono (SIL OFL)
// pour ne garder que ce qui sert : 68 Ko au lieu de 128 Ko → meilleur LCP mobile.
// Titres façon affiche : Archivo largeur 62, graisse 800 (le LCP, donc préchargé).
const display = localFont({
  src: "../fonts/archivo-display.woff2",
  weight: "800",
  variable: "--font-archivo-display",
  display: "swap",
});

const text = localFont({
  src: "../fonts/archivo-text.woff2",
  weight: "400 600",
  variable: "--font-archivo",
  display: "swap",
});

// Mono = données et étiquettes : pas de préchargement, la bande passante va au titre.
const mono = localFont({
  src: "../fonts/jetbrains-mono.woff2",
  weight: "400 700",
  variable: "--font-jetbrains",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  // Origine seule : Next ajoute lui-même le basePath aux images (sinon /12testeurs/12testeurs/…).
  metadataBase: new URL(new URL(site.url).origin),
  title: {
    default: site.title,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "12 testeurs Google Play",
    "test fermé 14 jours",
    "accès production Google Play",
    "testeurs Google Play",
    "test fermé Google Play",
    "trouver 12 testeurs",
    "closed testing Google Play",
  ],
  alternates: { canonical: `${site.url}/` },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: `${site.url}/`,
    siteName: site.name,
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0c",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${display.variable} ${text.variable} ${mono.variable}`}>
      <body>
        <a
          href="#contenu"
          className="label sr-only z-[110] bg-paper px-4 py-3 text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Aller au contenu
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
