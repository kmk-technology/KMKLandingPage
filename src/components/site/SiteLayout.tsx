import { useEffect, useRef, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { ScrollTrigger } from "../../lib/gsap";
import { appReady } from "../../lib/ready";
import { scrollToY, startSmoothScroll } from "../../lib/smooth";
import BackToTop from "../layout/BackToTop";
import { useInteractive, usePageMeta } from "./motion";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

/**
 * Shell of every page: the header, the page under it, the footer (always down at the bottom,
 * even on a short page) and the back-to-top button. A new page opens at the top and rises in;
 * cards inside respond to the pointer (tilt and spotlight). Smooth scrolling starts once the
 * loader is done.
 */
export default function SiteLayout({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  const { pathname } = useLocation();
  const root = useRef<HTMLDivElement>(null);
  usePageMeta(title, description);
  useInteractive(root);

  useEffect(() => {
    appReady.then(() => {
      startSmoothScroll();
      ScrollTrigger.refresh();
    });
  }, []);

  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo(0, 0);
      scrollToY(0, true);
    }
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("load", refresh);
    };
  }, [pathname]);

  return (
    <div ref={root} className="flex min-h-[100svh] flex-col bg-white">
      <SiteHeader />
      <main
        id="main"
        key={pathname}
        className="page-enter relative flex-1 bg-white pt-[var(--header-h)]"
      >
        {children}
      </main>
      <SiteFooter />
      <BackToTop />
    </div>
  );
}

/**
 * Centred page title in a regular weight, a word or two in blue, uncovered from below; a short
 * line under it, on plain white.
 */
export function PageHero({
  title,
  sub,
}: {
  title: ReactNode;
  sub?: ReactNode;
}) {
  return (
    <section className="pb-[clamp(2.5rem,6vh,4rem)] pt-[clamp(3.5rem,9vh,6rem)]">
      <div className="shell text-center">
        <h1 className="page-h mx-auto max-w-[24ch] font-display text-[clamp(2.1rem,1.4rem+2.4vw,3.4rem)] font-normal leading-[1.18] text-ink">
          {title}
        </h1>
        {sub ? (
          <p className="page-in mx-auto mt-5 max-w-[50rem] text-[1.0625rem] leading-relaxed text-ink/75">
            {sub}
          </p>
        ) : null}
      </div>
    </section>
  );
}
