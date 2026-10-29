import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { mentionsLegales } from "@/content/legal";

export const metadata: Metadata = {
  title: mentionsLegales.title,
  description: mentionsLegales.metaDescription,
  alternates: { canonical: "/mentions-legales" },
};

export default function MentionsLegalesPage() {
  return <LegalPage doc={mentionsLegales} />;
}
