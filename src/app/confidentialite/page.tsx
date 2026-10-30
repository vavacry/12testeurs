import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { confidentialite } from "@/content/legal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: confidentialite.title,
  description: confidentialite.metaDescription,
  alternates: { canonical: `${site.url}/confidentialite` },
};

export default function ConfidentialitePage() {
  return <LegalPage doc={confidentialite} />;
}
