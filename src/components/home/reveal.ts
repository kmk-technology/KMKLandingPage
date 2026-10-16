import { gsap } from "../../lib/gsap";

/** Fade-and-rise for every `.rv` inside `scope` as it scrolls in (rewinds when scrolled back above). */
export function revealIn(scope: HTMLElement) {
  gsap.utils.toArray<HTMLElement>(".rv", scope).forEach((el) =>
    gsap.from(el, {
      y: 44,
      autoAlpha: 0,
      duration: 1.1,
      ease: "expo.out",
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        toggleActions: "play none none reverse",
      },
    }),
  );
}

/** Headings built with <Rise>: words rise out of their masks one after another. */
export function riseIn(scope: HTMLElement) {
  gsap.utils.toArray<HTMLElement>(".rise", scope).forEach((h) =>
    gsap.from(h.querySelectorAll(".rise-w"), {
      yPercent: 115,
      rotate: 3,
      duration: 1.2,
      stagger: 0.05,
      ease: "expo.out",
      scrollTrigger: {
        trigger: h,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    }),
  );
}

/** Count-up on scroll for every `[data-count]` inside `scope` (final value is the server-rendered text). */
export function countIn(scope: HTMLElement) {
  gsap.utils.toArray<HTMLElement>("[data-count]", scope).forEach((el) => {
    const end = Number(el.dataset.count);
    const pad = Number(el.dataset.pad ?? 2);
    const o = { v: 0 };
    gsap.to(o, {
      v: end,
      duration: 1.8,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
      onUpdate: () =>
        void (el.textContent = String(Math.round(o.v)).padStart(pad, "0")),
    });
  });
}
