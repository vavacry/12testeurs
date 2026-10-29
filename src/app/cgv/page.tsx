import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { cgv } from "@/content/legal";

export const metadata: Metadata = {
  title: cgv.title,
  description: cgv.metaDescription,
  alternates: { canonical: "/cgv" },
};

export default function CgvPage() {
  return <LegalPage doc={cgv} />;
}
