import { useEffect, type RefObject } from "react";
import { countIn } from "../home/reveal";
import { gsap, MOTION_OK, useGSAP } from "../../lib/gsap";
import { appReady } from "../../lib/ready";

/*
 * Shared motion for the site's pages (opacity and transform only, so nothing is ever hidden
 * from keyboard or assistive tech):
 *  .page-h     - the page title, uncovered from below once the page is ready
 *  .page-in    - the rest of the title block, rising in after it
 *  .parallax   - a picture drifting against the scroll
 *  .reveal-h   - headings uncovered from below as they arrive
 *  .fade       - a soft fade-up;  .fade-group - its children, one after another
 *  .wipe       - a photo wiped open from below, its image settling
 *  .pop        - avatars popping in;  .tech-grid .tech-cell - a wave across a grid
 *  .cl-grid .cl-logo - logos rippling in;  [data-count] - count-ups
 */
export function usePageMotion(
  scope: RefObject<HTMLElement>,
  deps: unknown[] = [],
) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const el = scope.current;
        if (!el) return;
        const ins = el.querySelectorAll(".page-in");
        const heads = el.querySelectorAll(".page-h");
        if (ins.length || heads.length) {
          const intro = gsap.timeline({ paused: true });
          if (heads.length)
            intro.fromTo(
              heads,
              { clipPath: "inset(-20% 0% 100% 0%)", y: 60 },
              {
                clipPath: "inset(-20% 0% -20% 0%)",
                y: 0,
                duration: 1.4,
                ease: "expo.out",
              },
              0,
            );
          if (ins.length)
            intro.from(
              ins,
              {
                y: 32,
                opacity: 0,
                duration: 1.2,
                stagger: 0.1,
                ease: "expo.out",
              },
              0.25,
            );
          appReady.then(() => intro.play());
        }

        // pictures drift a little against the scroll
        gsap.utils.toArray<HTMLElement>(".parallax", el).forEach((n) =>
          gsap.fromTo(
            n,
            { yPercent: -6, scale: 1.12 },
            {
              yPercent: 6,
              scale: 1.12,
              ease: "none",
              scrollTrigger: {
                trigger: n.parentElement ?? n,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          ),
        );

        gsap.utils.toArray<HTMLElement>(".reveal-h", el).forEach((h) =>
          gsap.fromTo(
            h,
            { clipPath: "inset(-20% 0% 100% 0%)", y: 40 },
            {
              clipPath: "inset(-20% 0% -20% 0%)",
              y: 0,
              duration: 1.3,
              ease: "expo.out",
              scrollTrigger: { trigger: h, start: "top 88%", once: true },
            },
          ),
        );
        gsap.utils.toArray<HTMLElement>(".fade", el).forEach((n) =>
          gsap.from(n, {
            y: 24,
            opacity: 0,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: { trigger: n, start: "top 90%", once: true },
          }),
        );
        gsap.utils.toArray<HTMLElement>(".fade-group", el).forEach((g) =>
          gsap.from(g.children, {
            y: 50,
            opacity: 0,
            duration: 1.2,
            stagger: 0.1,
            ease: "expo.out",
            scrollTrigger: { trigger: g, start: "top 86%", once: true },
          }),
        );
        gsap.utils.toArray<HTMLElement>(".wipe", el).forEach((w) => {
          const img = w.querySelector("img");
          const tl = gsap.timeline({
            scrollTrigger: { trigger: w, start: "top 85%", once: true },
          });
          tl.fromTo(
            w,
            { clipPath: "inset(100% 0% 0% 0% round 24px)" },
            {
              clipPath: "inset(0% 0% 0% 0% round 24px)",
              duration: 1.4,
              ease: "expo.inOut",
            },
          );
          if (img)
            tl.from(img, { scale: 1.25, duration: 2, ease: "expo.out" }, 0.2);
        });
        gsap.utils.toArray<HTMLElement>(".pop-group", el).forEach((g) =>
          gsap.from(g.querySelectorAll(".pop"), {
            scale: 0.4,
            opacity: 0,
            duration: 0.9,
            stagger: 0.07,
            ease: "back.out(1.7)",
            scrollTrigger: { trigger: g, start: "top 85%", once: true },
          }),
        );
        gsap.utils.toArray<HTMLElement>(".tech-grid", el).forEach((g) =>
          gsap.from(g.querySelectorAll(".tech-cell"), {
            opacity: 0,
            scale: 0.85,
            duration: 0.8,
            ease: "power3.out",
            stagger: { grid: "auto", from: "start", amount: 0.7 },
            scrollTrigger: { trigger: g, start: "top 85%", once: true },
          }),
        );
        gsap.utils.toArray<HTMLElement>(".cl-grid", el).forEach((g) =>
          gsap.from(g.querySelectorAll(".cl-logo"), {
            y: 24,
            opacity: 0,
            duration: 0.9,
            ease: "expo.out",
            stagger: { each: 0.025, from: "random" },
            scrollTrigger: { trigger: g, start: "top 85%", once: true },
          }),
        );
        countIn(el);
      });
    },
    { scope, dependencies: deps, revertOnUpdate: true },
  );
}

/** Page title and description for search engines and the browser tab. */
export function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", description);
  }, [title, description]);
}

/**
 * Pointer effects inside `scope` (fine pointers, motion allowed): `.tilt` cards lean towards the
 * pointer and lift; `.spot` cards get a soft blue light that follows it.
 */
export function useInteractive(scope: RefObject<HTMLElement>) {
  useEffect(() => {
    const el = scope.current;
    if (
      !el ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    let cur: HTMLElement | null = null;
    const reset = (c: HTMLElement) => {
      c.style.setProperty("--rx", "0deg");
      c.style.setProperty("--ry", "0deg");
      c.style.setProperty("--lift", "0px");
    };
    const move = (e: PointerEvent) => {
      const c = (e.target as HTMLElement).closest<HTMLElement>(".tilt, .spot");
      if (cur && cur !== c) reset(cur);
      cur = c;
      if (!c) return;
      const r = c.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      c.style.setProperty("--mx", `${e.clientX - r.left}px`);
      c.style.setProperty("--my", `${e.clientY - r.top}px`);
      if (c.classList.contains("tilt")) {
        c.style.setProperty("--rx", `${(-y * 7).toFixed(2)}deg`);
        c.style.setProperty("--ry", `${(x * 7).toFixed(2)}deg`);
        c.style.setProperty("--lift", "-6px");
      }
    };
    const leave = () => {
      if (cur) reset(cur);
      cur = null;
    };
    el.addEventListener("pointermove", move, { passive: true });
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [scope]);
}
