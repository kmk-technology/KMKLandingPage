import { useRef } from "react";
import { useLang } from "../../i18n/context";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "../../lib/gsap";

/** The company slogan as an oversized band that slides with the scroll and leans into its speed. */
export default function SloganBand() {
  const { lang } = useLang();
  const vi = lang === "vi";
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          ".mq-track",
          { xPercent: 0 },
          {
            xPercent: -30,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          },
        );
        const lean = gsap.quickTo(".mq-track", "skewX", {
          duration: 0.5,
          ease: "power3.out",
        });
        ScrollTrigger.create({
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) =>
            lean(gsap.utils.clamp(-8, 8, self.getVelocity() / -300)),
          onToggle: (self) => !self.isActive && lean(0),
        });
      });
    },
    { scope: root, dependencies: [lang], revertOnUpdate: true },
  );

  return (
    <div
      ref={root}
      className="relative overflow-hidden py-[clamp(3rem,8vh,5rem)]"
      aria-hidden="true"
    >
      <div className="mq-track flex w-max items-center gap-[0.5em] whitespace-nowrap font-display text-[clamp(3rem,1.5rem+6vw,7.5rem)] font-semibold leading-[1.2]">
        {Array.from({ length: 4 }, (_, i) => (
          <span key={i} className="flex items-center gap-[0.5em]">
            <span className={i % 2 ? "text-brand" : "text-ink"}>
              {vi
                ? "Đơn giản hóa doanh nghiệp của bạn"
                : "Simplify your business"}
            </span>
            <span className="h-[0.22em] w-[0.22em] shrink-0 rounded-full bg-brand" />
          </span>
        ))}
      </div>
    </div>
  );
}
