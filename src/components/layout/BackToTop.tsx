import { useEffect, useRef, useState } from "react";
import { useLang } from "../../i18n/context";
import { scrollToEl } from "../../lib/smooth";
import { getStory, onStory } from "../../lib/story";
import Icon from "../ui/Icon";

const R = 21;
const C = 2 * Math.PI * R;

/**
 * Back-to-top: a small glass button in the corner that appears after the first screen.
 * Its ring fills with the reading progress; clicking glides back to the top.
 */
export default function BackToTop() {
  const { lang } = useLang();
  const [show, setShow] = useState(false);
  const ring = useRef<SVGCircleElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      if (getStory().deck) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      setShow(window.scrollY > window.innerHeight * 0.8);
      if (ring.current)
        ring.current.style.strokeDashoffset = String(C * (1 - p));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    // in the story deck, progress is the current chapter
    const off = onStory((st) => {
      if (!st.deck) return;
      setShow(st.index > 0);
      if (ring.current)
        ring.current.style.strokeDashoffset = String(
          C * (1 - (st.total > 1 ? st.index / (st.total - 1) : 0)),
        );
    });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      off();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const toTop = () => {
    const top = document.getElementById("kmk") ?? document.body;
    scrollToEl(top);
    // the header offset is irrelevant at the very top - land exactly at 0
    window.setTimeout(
      () => window.scrollY < 120 && window.scrollTo({ top: 0 }),
      1400,
    );
  };

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label={lang === "vi" ? "Về đầu trang" : "Back to top"}
      tabIndex={show ? 0 : -1}
      className={`btt group fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full transition-[opacity,transform] duration-500 ease-out-expo ${
        show
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <svg
        viewBox="0 0 48 48"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full -rotate-90"
      >
        <circle
          cx="24"
          cy="24"
          r={R}
          fill="none"
          stroke="rgba(69,122,231,0.18)"
          strokeWidth="2"
        />
        <circle
          ref={ring}
          cx="24"
          cy="24"
          r={R}
          fill="none"
          stroke="#457ae7"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={C}
        />
      </svg>
      <span className="relative text-[1.1rem] text-brand transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5">
        <Icon name="arrowRight" className="-rotate-90" />
      </span>
    </button>
  );
}
