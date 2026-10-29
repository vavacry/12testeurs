import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { confidentialite } from "@/content/legal";

export const metadata: Metadata = {
  title: confidentialite.title,
  description: confidentialite.metaDescription,
  alternates: { canonical: "/confidentialite" },
};

export default function ConfidentialitePage() {
  return <LegalPage doc={confidentialite} />;
}
