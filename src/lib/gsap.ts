import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

gsap.defaults({ ease: "expo.out", duration: 0.9 });

/** Shared motion vocabulary - keep durations/eases consistent across sections. */
export const motion = {
  ease: "expo.out",
  easeInOut: "power3.inOut",
  reveal: 0.9,
  micro: 0.25,
  stagger: 0.08,
} as const;

/** Media query used with gsap.matchMedia(): animations only run inside it. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
export const POINTER_FINE = "(hover: hover) and (pointer: fine)";

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export { gsap, ScrollTrigger, useGSAP };
