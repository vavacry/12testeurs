import Link from "next/link";
import type { ReactNode } from "react";

// Mini-rendu des textes de src/content/articles.ts : [lien](url) et **gras**, sans bibliothèque Markdown.
export function ArticleText({ text }: { text: string }): ReactNode[] {
  return text.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g).map((part, i) => {
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const className = "text-paper underline underline-offset-4";
      return link[2].startsWith("/") ? (
        <Link key={i} href={link[2]} className={className}>
          {link[1]}
        </Link>
      ) : (
        <a key={i} href={link[2]} rel="noopener" className={className}>
          {link[1]}
        </a>
      );
    }
    if (part.startsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-paper">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}
