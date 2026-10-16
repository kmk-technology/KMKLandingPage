import { useEffect, useRef, useState } from "react";
import {
  company,
  legalLinks,
  navigation,
  products,
  services,
} from "../../content/site";
import { useLang } from "../../i18n/context";
import { gsap, MOTION_OK, prefersReducedMotion, useGSAP } from "../../lib/gsap";
import Magnetic from "../motion/Magnetic";
import Icon from "../ui/Icon";
import LangSwitch from "../ui/LangSwitch";

const linkCls =
  "text-[0.9375rem] text-white/80 transition-colors duration-200 hover:text-white";
const headCls = "text-[0.8125rem] font-semibold text-white";

/*
 * Footer - brand blue with white type: call to action, the
 * official mark with link columns, a legal bar, and "KMK TECHNOLOGY" set very large and
 * faint along the bottom, rising letter by letter. With `reveal`, on large screens it sits
 * fixed behind the page and is uncovered as the page scrolls away (curtain reveal).
 */
export default function Footer({
  reveal = false,
  active,
  fill = false,
}: {
  reveal?: boolean;
  active?: boolean;
  fill?: boolean;
}) {
  const { t, lang } = useLang();
  const vi = lang === "vi";
  const year = new Date().getFullYear();
  const ref = useRef<HTMLElement>(null);
  const [fixed, setFixed] = useState(false);

  // Curtain reveal only when the footer content fits on screen; it then fills the whole screen, and
  // the page above keeps one screen of space at its end so the footer is uncovered completely.
  useEffect(() => {
    const el = ref.current;
    if (!reveal || !el) return;
    const root = document.documentElement;
    const update = () => {
      // natural height of the content (decorations are absolutely positioned)
      const natural = Array.from(el.children).reduce(
        (h, c) =>
          getComputedStyle(c).position === "absolute"
            ? h
            : h + (c as HTMLElement).offsetHeight,
        0,
      );
      const fits = window.innerWidth >= 1024 && natural <= window.innerHeight;
      setFixed(fits);
      root.style.setProperty(
        "--footer-reveal",
        fits ? `${window.innerHeight}px` : "0px",
      );
    };
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    update();
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
      root.style.removeProperty("--footer-reveal");
    };
  }, [reveal]);

  // Inside the story deck the footer is a slide: its entrance follows the slide, not the scroll.
  const driven = active !== undefined;
  useGSAP(
    () => {
      if (driven) {
        if (!active || prefersReducedMotion()) return;
        gsap.from(".ft-in", {
          y: 50,
          autoAlpha: 0,
          stagger: 0.08,
          duration: 1.1,
          ease: "expo.out",
          delay: 0.35,
        });
        gsap.from(".ft-char", {
          yPercent: 110,
          stagger: 0.03,
          duration: 1.2,
          ease: "expo.out",
          delay: 0.2,
        });
        return;
      }
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const trigger = fixed
          ? {
              trigger: document.documentElement,
              start: () =>
                `bottom-=${(ref.current?.offsetHeight ?? 600) * 0.75} bottom`,
              end: "bottom bottom",
            }
          : { trigger: ref.current, start: "top bottom", end: "bottom bottom" };
        gsap.from(".ft-in", {
          y: 40,
          autoAlpha: 0,
          stagger: 0.08,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { ...trigger, once: true },
        });
        gsap.from(".ft-char", {
          yPercent: 100,
          stagger: 0.025,
          ease: "power2.out",
          scrollTrigger: { ...trigger, scrub: 0.6 },
        });
      });
    },
    { scope: ref, dependencies: [fixed, active], revertOnUpdate: true },
  );

  return (
    <footer
      ref={ref}
      className={`overflow-hidden bg-brand text-white ${fixed ? "fixed inset-x-0 bottom-0 z-0 flex h-[100vh] flex-col justify-between" : "relative"} ${fill ? "flex min-h-full flex-col justify-end" : ""}`}
    >
      <div
        aria-hidden="true"
        className="grid-lines pointer-events-none absolute inset-0 opacity-[0.12] invert"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-white/20 blur-[120px]"
      />

      <div className="shell relative pt-20 lg:pt-[calc(var(--header-h)+2.5rem)]">
        {/* call to action */}
        <div className="ft-in flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3.5 py-1.5 text-[0.8125rem] font-semibold text-white ring-1 ring-white/25">
              <span
                className="h-1.5 w-1.5 rounded-full bg-white"
                aria-hidden="true"
              />
              {vi ? "Hợp tác cùng KMK" : "Work with KMK"}
            </p>
            <p className="mt-4 max-w-[20ch] font-display text-[clamp(2rem,1.3rem+2.2vw,3.4rem)] font-semibold leading-[1.02]">
              {vi
                ? "Sẵn sàng đơn giản hóa doanh nghiệp của bạn?"
                : "Ready to simplify your business?"}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Magnetic>
              <a
                href="/#contact"
                className="group inline-flex min-h-[56px] items-center gap-3 rounded-full bg-white pl-7 pr-2 font-semibold text-brand shadow-[0_14px_30px_-14px_rgba(0,0,0,0.35)]"
              >
                {vi ? "Liên hệ KMK" : "Contact KMK"}
                <span className="grid h-11 w-11 place-items-center rounded-full bg-brand text-white transition-transform duration-500 group-hover:rotate-[-45deg]">
                  <Icon name="arrowRight" />
                </span>
              </a>
            </Magnetic>
            <a
              href={company.phoneHref}
              className="inline-flex min-h-[56px] items-center gap-2 rounded-full border border-white/40 px-6 font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
            >
              <Icon name="phone" />
              {company.phoneDisplay}
            </a>
          </div>
        </div>

        {/* brand + contacts, then link columns */}
        <div className="mt-10 grid grid-cols-1 gap-12 border-t border-white/20 py-10 lg:grid-cols-12">
          <div className="ft-in lg:col-span-4">
            <a
              href="/#kmk"
              className="inline-flex items-center gap-3"
              aria-label="KMK Technology"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white shadow-[0_10px_24px_-12px_rgba(0,0,0,0.35)]">
                <img
                  src="/logo/kmk/logo-mark-hd.png"
                  alt=""
                  aria-hidden="true"
                  className="h-7 w-auto"
                />
              </span>
              <span className="leading-tight">
                <span className="block text-[1.125rem] font-semibold">
                  KMK Technology
                </span>
                <span className="block text-[0.8125rem] text-white/70">
                  {vi
                    ? "Đơn giản hóa doanh nghiệp của bạn"
                    : "Simplify your business"}
                </span>
              </span>
            </a>
            <p className="mt-6 max-w-[22rem] leading-relaxed text-white/80">
              {vi
                ? "Giải pháp phần mềm, ERP, hạ tầng cloud và IT outsourcing cho doanh nghiệp đa lĩnh vực."
                : "Software, ERP, cloud infrastructure and IT outsourcing for businesses across industries."}
            </p>
            <address className="mt-7 grid gap-3 not-italic">
              {[
                {
                  icon: "phone" as const,
                  text: `${company.phoneDisplay} · ${company.phoneContact}`,
                  href: company.phoneHref,
                },
                {
                  icon: "mail" as const,
                  text: company.email,
                  href: `mailto:${company.email}`,
                },
                {
                  icon: "pin" as const,
                  text: t(company.address),
                  href: company.mapHref,
                  ext: true,
                },
              ].map((c) => (
                <a
                  key={c.icon}
                  href={c.href}
                  {...(c.ext
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="group flex items-start gap-3 text-[0.9375rem] text-white/85 transition-colors hover:text-white"
                >
                  <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-white/12 ring-1 ring-white/20 transition-colors group-hover:bg-white group-hover:text-brand">
                    <Icon name={c.icon} />
                  </span>
                  <span className="pt-1 leading-snug">{c.text}</span>
                  {c.ext ? (
                    <span className="sr-only">
                      {vi ? " (mở Google Maps)" : " (opens Google Maps)"}
                    </span>
                  ) : null}
                </a>
              ))}
            </address>
          </div>

          <nav
            aria-label="Footer"
            className="ft-in grid grid-cols-2 gap-10 sm:grid-cols-4 lg:col-span-8"
          >
            <div>
              <p className={headCls}>{vi ? "Sản phẩm" : "Products"}</p>
              <ul className="mt-5 space-y-3">
                {products.map((p) => (
                  <li key={p.key}>
                    <a
                      href={p.href ?? "/#products"}
                      {...(p.href
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className={linkCls}
                    >
                      {p.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className={headCls}>{vi ? "Dịch vụ" : "Services"}</p>
              <ul className="mt-5 space-y-3">
                {services.map((sv) => (
                  <li key={sv.key}>
                    <a href="/#services" className={linkCls}>
                      {t(sv.title)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className={headCls}>{vi ? "Công ty" : "Company"}</p>
              <ul className="mt-5 space-y-3">
                {navigation.map((n) => (
                  <li key={n.id}>
                    <a href={`/#${n.id}`} className={linkCls}>
                      {t(n.label)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className={headCls}>Website</p>
              <ul className="mt-5 space-y-3">
                {company.websites.map((w) => (
                  <li key={w.href}>
                    <a
                      href={w.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${linkCls} group inline-flex items-center gap-1.5`}
                    >
                      {w.label}
                      <Icon
                        name="arrowUpRight"
                        className="text-[0.8rem] opacity-60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                      <span className="sr-only">
                        {vi ? " (mở tab mới)" : " (opens in a new tab)"}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        {/* legal bar */}
        <div className="flex flex-col gap-4 border-t border-white/20 py-6 text-[0.8125rem] text-white/75 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} KMK Technology.{" "}
            {vi ? "Bảo lưu mọi quyền." : "All rights reserved."}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {legalLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="transition-colors hover:text-white"
              >
                {t(l.label)}
              </a>
            ))}
            <span className="rounded-full bg-white">
              <LangSwitch />
            </span>
          </div>
        </div>
      </div>

      {/* faint oversized name along the bottom */}
      <p
        aria-hidden="true"
        className="relative select-none overflow-hidden whitespace-nowrap px-[var(--gutter)] pb-6 text-center font-display text-[7.4vw] font-bold uppercase leading-[0.85] text-white/[0.13]"
      >
        {"KMK TECHNOLOGY".split("").map((c, i) => (
          <span key={i} className="ft-char inline-block">
            {c === " " ? " " : c}
          </span>
        ))}
      </p>
    </footer>
  );
}
