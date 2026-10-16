import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import { company, navigation } from "../../content/site";
import { useLang } from "../../i18n/context";
import { gsap, prefersReducedMotion, useGSAP } from "../../lib/gsap";
import { clearHash, lockScroll, scrollToEl } from "../../lib/smooth";
import { getStory, onStory } from "../../lib/story";
import Icon from "../ui/Icon";
import LangSwitch from "../ui/LangSwitch";
import LiquidGlass from "../ui/LiquidGlass";
import Logo from "../ui/Logo";

type Props = { variant?: "home" | "page" };

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Full-width bar at the top of the page; once you scroll it contracts into a floating
 * liquid-glass capsule (iOS-style refraction, rim light and highlight). The nav has a
 * blue highlight that slides to the hovered / active link.
 */
export default function Header({ variant = "home" }: Props) {
  const { t, lang } = useLang();
  const vi = lang === "vi";
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const [active, setActive] = useState("");
  const [hover, setHover] = useState("");
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const navRef = useRef<HTMLUListElement>(null);
  const dropRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const ix = useRef({ v: 0 });
  const [glassInset, setGlassInset] = useState(0);
  const [measure, setMeasure] = useState(0);

  // Link widths change once the web font arrives and on resize - re-measure then.
  useEffect(() => {
    const bump = () => setMeasure((n) => n + 1);
    document.fonts?.ready.then(bump);
    window.addEventListener("resize", bump);
    return () => window.removeEventListener("resize", bump);
  }, []);

  useEffect(() => {
    // Hysteresis: contract past 80px, expand again only near the very top - no flicker around one threshold.
    const onScroll = () => {
      if (getStory().deck) return; // the story deck drives this instead (see below)
      const y = window.scrollY;
      setCompact((c) => variant !== "home" || (c ? y > 16 : y > 80));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [variant]);

  useEffect(() => {
    if (variant !== "home") return;
    const sections = navigation
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => Boolean(el));
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      {
        rootMargin: "-45% 0px -50% 0px",
      },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [variant]);

  // Story deck: the bar contracts after the opening, the nav follows the chapter, progress = chapter.
  useEffect(
    () =>
      onStory((st) => {
        if (!st.deck) return;
        setCompact(st.index > 0);
        setActive(st.id);
        const bar = headerRef.current?.querySelector(".hd-progress");
        if (bar)
          gsap.to(bar, {
            scaleX: st.total > 1 ? st.index / (st.total - 1) : 0,
            duration: 1,
            ease: "expo.inOut",
            overwrite: true,
          });
      }),
    [],
  );

  useGSAP(
    () => {
      tl.current = gsap
        .timeline({ paused: true, defaults: { ease: "expo.inOut" } })
        .set(menuRef.current, { visibility: "visible" })
        .fromTo(
          menuRef.current,
          { clipPath: "inset(0% 0% 100% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.7 },
        )
        .from(
          ".menu-link",
          {
            yPercent: 100,
            opacity: 0,
            duration: 0.7,
            stagger: 0.05,
            ease: "expo.out",
          },
          "-=0.3",
        )
        .from(
          ".menu-meta",
          { opacity: 0, duration: 0.4, ease: "power2.out" },
          "-=0.3",
        );
    },
    { scope: headerRef },
  );

  // Reading progress along the bottom edge of the bar.
  useGSAP(
    () => {
      if (getStory().deck) return;
      gsap.to(".hd-progress", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
      });
    },
    { scope: headerRef },
  );

  useEffect(() => {
    const timeline = tl.current;
    if (!timeline) return;
    if (prefersReducedMotion()) {
      timeline.progress(open ? 1 : 0);
      if (!open) gsap.set(menuRef.current, { visibility: "hidden" });
    } else if (open) {
      gsap.set(menuRef.current, { visibility: "visible" });
      timeline.timeScale(1).play();
    } else {
      timeline.timeScale(1.6).reverse();
    }
    document.body.classList.toggle("is-locked", open);
    lockScroll(open);
    if (open)
      menuRef.current
        ?.querySelector<HTMLElement>(FOCUSABLE)
        ?.focus({ preventScroll: true });
  }, [open]);

  const close = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) toggleRef.current?.focus({ preventScroll: true });
  }, []);

  // Menu links: unlock scrolling first, then glide to the section (a native jump would be blocked by the lock).
  const go = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    setOpen(false);
    document.body.classList.remove("is-locked");
    lockScroll(false);
    requestAnimationFrame(() => {
      scrollToEl(target);
      clearHash();
    });
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab") return;
      const nodes = [
        toggleRef.current,
        ...Array.from(
          menuRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? [],
        ),
      ].filter((n): n is HTMLElement => Boolean(n));
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const onResize = () => window.innerWidth >= 1024 && close(false);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      document.body.classList.remove("is-locked");
    };
  }, [open, close]);

  const glass = compact || open;

  // Contract / expand: tween one custom property (--ix) that clips the glass and slides the ends in.
  const COMPACT = 1056; // px, capsule width once scrolled
  const firstInset = useRef(true);
  useLayoutEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const w = bar.offsetWidth;
    const target = glass ? Math.max(0, (w - Math.min(COMPACT, w)) / 2) : 0;
    setGlassInset(glass ? target : 0);
    const set = () => bar.style.setProperty("--ix", `${ix.current.v}px`);
    if (firstInset.current || prefersReducedMotion()) {
      firstInset.current = false;
      ix.current.v = target;
      set();
      return;
    }
    const tw = gsap.to(ix.current, {
      v: target,
      duration: 0.8,
      ease: "power3.inOut",
      onUpdate: set,
      overwrite: true,
    });
    return () => {
      tw.kill();
    };
  }, [glass, measure]);

  // Liquid feel: the droplet squashes slightly and springs back as it slides.
  useEffect(() => {
    if (prefersReducedMotion() || !dropRef.current) return;
    gsap.fromTo(
      dropRef.current,
      { scaleX: 1.06, scaleY: 0.9 },
      {
        scaleX: 1,
        scaleY: 1,
        duration: 0.6,
        ease: "elastic.out(1, 0.7)",
        overwrite: true,
      },
    );
  }, [hover, active]);

  // Measure the sliding highlight from the hovered (or active) link.
  useLayoutEffect(() => {
    const id = hover || active;
    const el = navRef.current?.querySelector<HTMLElement>(`[data-nav="${id}"]`);
    // <li> is the positioned parent, so add its offset within the <ul>.
    setIndicator(
      el
        ? {
            left: (el.parentElement?.offsetLeft ?? 0) + el.offsetLeft,
            width: el.offsetWidth,
          }
        : { left: 0, width: 0 },
    );
  }, [hover, active, lang, measure]);

  return (
    // No transform on <header>: a transformed ancestor would trap the fixed menu inside it.
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-50">
      <a
        href="#main"
        className="sr-only z-[60] rounded-lg bg-brand-deep px-4 py-2 text-sm text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-4"
      >
        {vi ? "Bỏ qua đến nội dung" : "Skip to content"}
      </a>

      {/* reading progress along the top edge */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[2px]"
      >
        <span className="hd-progress block h-full origin-left scale-x-0 bg-brand" />
      </span>

      <div className="relative z-20 px-[var(--gutter)] pt-3">
        {/* The bar keeps its full layout width; contracting is a clip (--ix) on the glass plus
            transforms on the logo and actions - nothing re-lays out per frame, so it stays smooth. */}
        <div ref={barRef} className="relative mx-auto h-16 max-w-[1360px]">
          <span
            aria-hidden="true"
            className={`lg-shadow pointer-events-none absolute inset-y-0 rounded-full transition-opacity duration-500 ${glass ? "opacity-100" : "opacity-0"}`}
            style={{ left: "var(--ix, 0px)", right: "var(--ix, 0px)" }}
          />
          <LiquidGlass
            active={glass}
            insetX={glassInset}
            className="absolute inset-0 rounded-full"
          />
          <div className="relative flex h-full items-center justify-between gap-4 pl-5 pr-2">
            <a
              href="/#kmk"
              onClick={() => close(false)}
              aria-label="KMK Technology"
              className="flex shrink-0 items-center will-change-transform"
              style={{ transform: "translate3d(var(--ix, 0px), 0, 0)" }}
            >
              <Logo className="h-8 w-auto" />
            </a>

            <nav
              aria-label={vi ? "Điều hướng chính" : "Primary"}
              className="hidden lg:block"
            >
              <ul
                ref={navRef}
                onPointerLeave={() => setHover("")}
                className="relative flex items-center gap-0.5"
              >
                {/* sliding highlight under the active / hovered link */}
                <span
                  ref={dropRef}
                  aria-hidden="true"
                  className="lg-drop absolute inset-y-0 rounded-full transition-[left,width,opacity] duration-500 ease-out-expo"
                  style={{
                    left: indicator.left,
                    width: indicator.width,
                    opacity: indicator.width ? 1 : 0,
                  }}
                />
                {navigation.map((item) => {
                  const lit = (hover || active) === item.id;
                  return (
                    <li key={item.id} className="relative">
                      <a
                        href={`/#${item.id}`}
                        data-nav={item.id}
                        onPointerEnter={() => setHover(item.id)}
                        aria-current={active === item.id ? "true" : undefined}
                        className={`relative inline-flex h-10 items-center rounded-full px-4 text-[0.875rem] font-medium transition-colors duration-300 ${lit ? "text-brand" : "text-ink/75 hover:text-ink"}`}
                      >
                        {t(item.label)}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div
              className="flex items-center gap-2 will-change-transform"
              style={{
                transform: "translate3d(calc(var(--ix, 0px) * -1), 0, 0)",
              }}
            >
              <span className="hidden sm:inline-flex">
                <LangSwitch />
              </span>
              <a
                href="/#contact"
                onClick={() => close(false)}
                className="group hidden h-11 items-center gap-2 rounded-full bg-brand/90 pl-5 pr-1.5 text-[0.875rem] font-semibold text-white shadow-[inset_0_1px_0.5px_rgba(255,255,255,0.7),inset_0_-6px_12px_-8px_rgba(0,0,0,0.25),0_10px_24px_-10px_rgba(69,122,231,0.8)] transition-colors hover:bg-brand sm:inline-flex"
              >
                {vi ? "Liên hệ" : "Contact us"}
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-brand transition-transform duration-500 group-hover:rotate-[-45deg]">
                  <Icon name="arrowRight" />
                </span>
              </a>
              <button
                ref={toggleRef}
                type="button"
                className="inline-flex h-11 items-center gap-2.5 rounded-full bg-brand px-4 text-[0.875rem] font-semibold text-white lg:hidden"
                aria-expanded={open}
                aria-controls="mobile-menu"
                onClick={() => setOpen((v) => !v)}
              >
                {open ? (vi ? "Đóng" : "Close") : "Menu"}
                <span className="relative block h-2.5 w-4" aria-hidden="true">
                  <span
                    className={`absolute left-0 top-0 h-[1.5px] w-full bg-current transition-transform duration-300 ${open ? "translate-y-[4px] rotate-45" : ""}`}
                  />
                  <span
                    className={`absolute bottom-0 left-0 h-[1.5px] w-full bg-current transition-transform duration-300 ${open ? "-translate-y-[4.5px] -rotate-45" : ""}`}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={menuRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className="invisible fixed inset-0 z-10 flex flex-col overflow-y-auto bg-[linear-gradient(180deg,#ffffff_0%,#eef2fb_100%)] pt-[var(--header-h)] text-ink lg:hidden"
        style={{ clipPath: "inset(0% 0% 100% 0%)" }}
        {...(!open ? { inert: "" } : {})}
      >
        <nav aria-label="Mobile" className="shell flex-1 pt-6">
          <ul>
            {navigation.map((item, i) => (
              <li
                key={item.id}
                className="overflow-hidden border-b border-ink/10"
              >
                <a
                  href={`/#${item.id}`}
                  onClick={(e) => go(e, item.id)}
                  className="menu-link group flex items-center gap-4 py-4 font-display text-[clamp(1.9rem,8vw,3rem)] font-semibold"
                >
                  <span className="w-6 text-[0.8125rem] font-semibold text-brand">
                    0{i + 1}
                  </span>
                  <span className="flex-1">{t(item.label)}</span>
                  <Icon
                    name="arrowRight"
                    className="text-[1.25rem] text-ink/30 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-brand"
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="menu-meta shell pt-8">
          <a
            href="/#contact"
            onClick={(e) => go(e, "contact")}
            className="flex min-h-[56px] items-center justify-between rounded-full bg-ink pl-6 pr-2 font-semibold text-white"
          >
            {vi ? "Liên hệ tư vấn" : "Contact us"}
            <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-ink">
              <Icon name="arrowRight" />
            </span>
          </a>
        </div>
        <div className="menu-meta shell flex flex-wrap items-center justify-between gap-6 pb-10 pt-6 text-[0.9375rem] text-muted">
          <div className="flex flex-col gap-1">
            <a href={`mailto:${company.email}`} className="py-1 hover:text-ink">
              {company.email}
            </a>
            <a href={company.phoneHref} className="py-1 hover:text-ink">
              {company.phoneDisplay}
            </a>
          </div>
          <LangSwitch />
        </div>
      </div>
    </header>
  );
}
