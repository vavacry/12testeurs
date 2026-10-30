import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { mentionsLegales } from "@/content/legal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: mentionsLegales.title,
  description: mentionsLegales.metaDescription,
  alternates: { canonical: `${site.url}/mentions-legales` },
};

export default function MentionsLegalesPage() {
  return <LegalPage doc={mentionsLegales} />;
}
