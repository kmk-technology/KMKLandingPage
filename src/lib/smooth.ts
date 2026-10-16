import Lenis from "lenis";
import { gsap, prefersReducedMotion, ScrollTrigger } from "./gsap";
import { storyGo } from "./story";

/*
 * Smooth scrolling (Lenis) driven by GSAP's ticker so ScrollTrigger scrubs stay in sync.
 * Off for reduced motion - native scrolling is used instead.
 */

let lenis: Lenis | null = null;

function headerOffset() {
  return (
    parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--header-h"),
    ) || 76
  );
}

let anchorsBound = false;

/** Same-page anchors (#id and /#id): the story deck moves to the slide; otherwise the page glides. */
export function bindAnchors() {
  if (anchorsBound) return;
  anchorsBound = true;
  document.addEventListener("click", (e) => {
    const a = (e.target as HTMLElement).closest?.("a");
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey)
      return;
    const href = a.getAttribute("href") ?? "";
    const m = href.match(/^\/?#(.+)$/);
    if (!m || window.location.pathname !== "/") return;
    const el = document.getElementById(decodeURIComponent(m[1]));
    if (!el) return;
    e.preventDefault();
    scrollToEl(el);
    clearHash();
  });
}

/** Keep the address clean: in-page navigation scrolls, it never leaves #section in the URL. */
export function clearHash() {
  if (window.location.hash)
    history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search,
    );
}

export function startSmoothScroll() {
  bindAnchors();
  if (lenis || prefersReducedMotion()) return;
  lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis?.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

export function scrollToEl(el: HTMLElement, immediate = false) {
  // inside the story deck, a section is a slide: move the deck instead of the page
  const slide = el.closest<HTMLElement>("[data-slide]");
  if (slide && storyGo(slide.dataset.slide ?? el.id, { instant: immediate }))
    return;
  if (lenis) {
    lenis.scrollTo(el, { offset: -headerOffset(), immediate, force: true });
  } else {
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - headerOffset(),
      behavior: immediate || prefersReducedMotion() ? "auto" : "smooth",
    });
  }
}

export function lockScroll(locked: boolean) {
  if (locked) lenis?.stop();
  else lenis?.start();
}
