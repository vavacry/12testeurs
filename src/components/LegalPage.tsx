import { MiniHeader } from "@/components/MiniHeader";
import { withSlots } from "@/components/ui";
import type { LegalDoc } from "@/content/legal";

// « Article 11 – … » → #article-11 (ancre utilisée par la garantie) ; sinon slug du titre.
function sectionId(title: string) {
  const article = title.match(/^Article (\d+)/);
  if (article) return `article-${article[1]}`;
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <div className="overflow-x-clip">
      <MiniHeader />
      <main id="contenu">
        <div className="frame px-4 py-14 md:px-8 md:py-20 xl:px-12">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-8">
                <p className="label text-mute">Document légal · mis à jour : {withSlots(doc.updatedAt)}</p>
                <h1 className="display mt-6 text-[clamp(2.75rem,6vw,5rem)]">{doc.title}</h1>
                <nav aria-label="Sommaire" className="mt-10 hidden lg:block">
                  <ol className="label space-y-2.5 text-[0.6875rem] text-mute">
                    {doc.sections.map((s) => (
                      <li key={s.title}>
                        <a href={`#${sectionId(s.title)}`} className="hover:text-paper">
                          {s.title}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              </div>
            </aside>

            <article className="max-w-[72ch] lg:col-span-8">
              {doc.intro ? <p className="text-lg text-paper">{withSlots(doc.intro)}</p> : null}
              {doc.sections.map((s) => (
                <section key={s.title} id={sectionId(s.title)} className="border-t border-line pt-8 pb-10 first:border-t-0 first:pt-0">
                  <h2 className="text-xl font-semibold text-paper md:text-2xl">{s.title}</h2>
                  <div className="mt-4 space-y-4 text-mute">
                    {s.blocks.map((b, i) =>
                      b.type === "p" ? (
                        <p key={i}>{withSlots(b.text)}</p>
                      ) : (
                        <ul key={i} className="space-y-2">
                          {b.items.map((item, j) => (
                            <li key={j} className="flex gap-3">
                              <span aria-hidden="true" className="font-mono text-blue-text">
                                —
                              </span>
                              <span>{withSlots(item)}</span>
                            </li>
                          ))}
                        </ul>
                      ),
                    )}
                  </div>
                </section>
              ))}
            </article>
          </div>
        </div>
      </main>
    </div>
  );
}
