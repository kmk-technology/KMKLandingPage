import { useEffect, useRef, type ReactNode } from "react";
import { gsap, MOTION_OK, POINTER_FINE } from "../../lib/gsap";

/** Pulls its child toward the pointer while hovered, springs back on leave. The hit area never moves. */
export default function Magnetic({
  children,
  strength = 0.35,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const inner = el?.firstElementChild as HTMLElement | null;
    if (
      !el ||
      !inner ||
      !window.matchMedia(`${POINTER_FINE} and ${MOTION_OK}`).matches
    )
      return;
    const x = gsap.quickTo(inner, "x", {
      duration: 0.6,
      ease: "elastic.out(1, 0.4)",
    });
    const y = gsap.quickTo(inner, "y", {
      duration: 0.6,
      ease: "elastic.out(1, 0.4)",
    });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      x((e.clientX - (r.left + r.width / 2)) * strength);
      y((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const leave = () => {
      x(0);
      y(0);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [strength]);

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {children}
    </span>
  );
}
