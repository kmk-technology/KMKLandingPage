import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useLang } from "../../i18n/context";
import Icon from "../ui/Icon";
import { pages } from "./pages";

/*
 * Site header, after zalo.me: a plain white bar across the full width - the official logo on
 * the left, the pages in the middle (the current one in blue with a blue underline), the
 * language on the right. A hairline and a soft shadow appear once the page scrolls, and a thin
 * blue line along the bottom shows how far down the page you are.
 * Phones: a menu button opens the pages as a list under the bar.
 */
export default function SiteHeader() {
  const { t, lang, setLang } = useLang();
  const vi = lang === "vi";
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const progress = useRef<HTMLSpanElement>(null);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const on = () => {
      setScrolled(window.scrollY > 4);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progress.current)
        progress.current.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open]);

  const isActive = (to: string) =>
    to === "/"
      ? pathname === "/"
      : pathname === to ||
        (to === "/products" && pathname.startsWith("/product"));
  const other = vi ? "en" : "vi";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 h-[var(--header-h)] bg-white transition-shadow duration-300 ${
        scrolled || open
          ? "shadow-[0_1px_0_rgba(28,28,30,0.08),0_8px_24px_-18px_rgba(20,40,90,0.35)]"
          : "shadow-[0_1px_0_rgba(28,28,30,0.06)]"
      }`}
    >
      <div className="shell flex h-full items-center justify-between gap-6">
        <Link to="/" aria-label="KMK Technology" className="shrink-0">
          <img
            src="/logo/kmk/long-logo-trim.png"
            alt="KMK Technology"
            className="h-9 w-auto sm:h-10"
          />
        </Link>

        <nav aria-label={vi ? "Trang" : "Pages"} className="hidden lg:block">
          <ul className="flex items-center gap-[clamp(1.25rem,2.4vw,2.25rem)]">
            {pages.map((p) => {
              const on = isActive(p.to);
              return (
                <li key={p.to}>
                  <NavLink
                    to={p.to}
                    aria-current={on ? "page" : undefined}
                    className={`relative block py-2 text-[0.9375rem] transition-colors ${on ? "text-brand" : "text-ink/85 hover:text-brand"}`}
                  >
                    {t(p.label)}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-0 -bottom-0.5 h-[2px] origin-left rounded-full bg-brand transition-transform duration-300 ${on ? "scale-x-100" : "scale-x-0"}`}
                    />
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="-mr-3 flex items-center gap-2 max-lg:-mr-2">
          <button
            type="button"
            onClick={() => setLang(other)}
            aria-label={vi ? "Switch to English" : "Chuyển sang tiếng Việt"}
            className="inline-flex min-h-[40px] items-center gap-2 rounded-full px-3 text-[0.9375rem] text-ink/85 transition-colors hover:bg-ink/[0.05] hover:text-brand"
          >
            <Icon name="globe" className="text-[1.1rem]" />
            <span className="font-medium uppercase">{lang}</span>
          </button>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? (vi ? "Đóng menu" : "Close menu") : "Menu"}
            className="grid h-10 w-10 place-items-center rounded-full text-ink transition-colors hover:bg-ink/[0.05] lg:hidden"
          >
            {open ? (
              <Icon name="close" className="text-[1.25rem]" />
            ) : (
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* phones: the pages as a list */}
      <nav
        id="site-menu"
        aria-label={vi ? "Trang" : "Pages"}
        hidden={!open}
        className="border-t border-ink/[0.07] bg-white lg:hidden"
      >
        <ul className="shell py-3">
          {pages.map((p) => {
            const on = isActive(p.to);
            return (
              <li key={p.to}>
                <NavLink
                  to={p.to}
                  aria-current={on ? "page" : undefined}
                  className={`flex min-h-[52px] items-center justify-between border-b border-ink/[0.06] text-[1.0625rem] last:border-0 ${on ? "text-brand" : "text-ink"}`}
                >
                  {t(p.label)}
                  <Icon name="arrowRight" className="text-ink/30" />
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
      {/* how far down the page you are */}
      <span
        ref={progress}
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-brand"
      />
    </header>
  );
}
