import { useEffect, useRef, useState, type ReactNode } from "react";
import { useLang } from "../../i18n/context";
import { ScrollTrigger } from "../../lib/gsap";
import { appReady } from "../../lib/ready";
import Icon from "../ui/Icon";
import Footer from "./Footer";
import Header from "./Header";

type Props = { title: string; product: string; children: ReactNode };
type Entry = { id: string; text: string };

const slug = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/gi, "d")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/**
 * Shell for long-form legal documents (Vietnamese source text): the site's light studio
 * backdrop, a breadcrumb and title, a sticky table of contents built from the document's
 * headings (the current one highlighted), a reading-progress line, and the text on a card.
 */
export default function LegalLayout({ title, product, children }: Props) {
  const { lang } = useLang();
  const vi = lang === "vi";
  const doc = useRef<HTMLElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const [toc, setToc] = useState<Entry[]>([]);
  const [current, setCurrent] = useState("");

  useEffect(() => {
    const previous = document.title;
    document.title = `${title} - ${product} | KMK Technology`;
    return () => {
      document.title = previous;
    };
  }, [title, product]);

  // the layout settles after the loader (scrollbar back), the fonts and the contents list:
  // re-measure scroll-driven animations then (the footer reveal depends on it)
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    appReady.then(refresh);
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);
    return () => window.removeEventListener("load", refresh);
  }, []);
  useEffect(() => {
    if (toc.length) ScrollTrigger.refresh();
  }, [toc]);

  // table of contents from the document's h2s
  useEffect(() => {
    const heads = Array.from(doc.current?.querySelectorAll("h2") ?? []);
    const seen = new Map<string, number>();
    const entries = heads.map((h) => {
      const base = slug(h.textContent ?? "") || "muc";
      const n = seen.get(base) ?? 0;
      seen.set(base, n + 1);
      h.id = n ? `${base}-${n}` : base;
      return { id: h.id, text: h.textContent ?? "" };
    });
    setToc(entries);
    const io = new IntersectionObserver(
      (items) => {
        const hit = items
          .filter((i) => i.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          )[0];
        if (hit) setCurrent(hit.target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    heads.forEach((h) => io.observe(h));
    return () => io.disconnect();
  }, []);

  // reading progress
  useEffect(() => {
    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = doc.current;
        if (!el || !bar.current) return;
        const r = el.getBoundingClientRect();
        const p = Math.min(
          1,
          Math.max(0, -r.top / Math.max(1, r.height - window.innerHeight)),
        );
        bar.current.style.transform = `scaleX(${p})`;
      });
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", update);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <Header variant="page" />
      <div aria-hidden="true" className="fixed inset-x-0 top-0 z-[60] h-[3px]">
        <div ref={bar} className="h-full origin-left scale-x-0 bg-brand" />
      </div>
      <main
        id="main"
        className="relative bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,#ffffff_0%,#eef2fb_60%,#e8eef9_100%)]"
      >
        <div
          lang="vi"
          className="shell pb-10 pt-[calc(var(--header-h)+3.5rem)] md:pb-14 md:pt-[calc(var(--header-h)+5rem)]"
        >
          <nav
            aria-label={vi ? "Đường dẫn" : "Breadcrumb"}
            className="flex flex-wrap items-center gap-2 text-[0.875rem] text-ink/55"
          >
            <a href="/" className="transition-colors hover:text-brand">
              {vi ? "Trang chủ" : "Home"}
            </a>
            <Icon name="arrowRight" className="text-[0.75rem] text-ink/30" />
            <span>{product}</span>
          </nav>
          <h1 className="mt-5 max-w-[46rem] font-display text-[clamp(2.2rem,1.4rem+2.6vw,4rem)] font-semibold leading-[1.08] text-ink">
            {title}
          </h1>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="rounded-full bg-white px-3.5 py-1.5 text-[0.8125rem] font-semibold text-brand ring-1 ring-brand/15">
              {product}
            </span>
            <span className="rounded-full bg-white px-3.5 py-1.5 text-[0.8125rem] font-medium text-ink/60 ring-1 ring-ink/10">
              {vi ? "Văn bản pháp lý" : "Legal document"}
            </span>
          </div>
        </div>

        <div className="shell grid gap-8 pb-24 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-12">
          {toc.length ? (
            <aside className="hidden lg:block">
              <nav
                aria-label={vi ? "Mục lục" : "Contents"}
                className="sticky top-[calc(var(--header-h)+2rem)]"
              >
                <p className="text-[0.8125rem] font-semibold text-ink/45">
                  {vi ? "Mục lục" : "Contents"}
                </p>
                <ol className="mt-4 space-y-1 border-l border-ink/10">
                  {toc.map((e) => (
                    <li key={e.id}>
                      <a
                        href={`#${e.id}`}
                        className={`-ml-px block border-l-2 py-1.5 pl-4 text-[0.875rem] leading-snug transition-colors ${
                          current === e.id
                            ? "border-brand font-semibold text-brand"
                            : "border-transparent text-ink/60 hover:text-ink"
                        }`}
                      >
                        {e.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>
          ) : null}
          <article
            ref={doc}
            lang="vi"
            className="legal-prose max-w-[50rem] rounded-[2rem] bg-white p-7 shadow-[0_30px_80px_-50px_rgba(20,40,90,0.45)] ring-1 ring-ink/[0.05] sm:p-10 md:p-14 [&_h2]:scroll-mt-[calc(var(--header-h)+2rem)]"
          >
            {children}
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
