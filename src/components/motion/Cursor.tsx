import { useEffect, useRef, useState } from "react";
import { gsap, MOTION_OK, POINTER_FINE } from "../../lib/gsap";

/*
 * Custom cursor (mouse / trackpad only): a dot that tracks exactly and a ring that trails.
 * Over links and buttons the ring grows; over elements with data-cursor="Label" it becomes
 * a filled disc showing that label. Text fields keep the native caret.
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`${POINTER_FINE} and ${MOTION_OK}`);
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled || !dot.current || !ring.current) return;
    document.documentElement.classList.add("has-cursor");
    const dx = gsap.quickTo(dot.current, "x", {
      duration: 0.08,
      ease: "power3.out",
    });
    const dy = gsap.quickTo(dot.current, "y", {
      duration: 0.08,
      ease: "power3.out",
    });
    const rx = gsap.quickTo(ring.current, "x", {
      duration: 0.45,
      ease: "power3.out",
    });
    const ry = gsap.quickTo(ring.current, "y", {
      duration: 0.45,
      ease: "power3.out",
    });
    let shown = false;

    const move = (e: PointerEvent) => {
      if (!shown) {
        shown = true;
        gsap.to([dot.current, ring.current], { autoAlpha: 1, duration: 0.3 });
      }
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const el = e.target as HTMLElement;
      const labelled = el.closest<HTMLElement>("[data-cursor]");
      const text = el.closest("input, textarea, select");
      const link = el.closest("a, button, [role=button], label");
      setLabel(labelled?.dataset.cursor ?? "");
      ring.current?.setAttribute(
        "data-state",
        text ? "hidden" : labelled ? "label" : link ? "link" : "",
      );
      dot.current?.setAttribute("data-state", text || labelled ? "hidden" : "");
    };
    const leave = () =>
      gsap.to([dot.current, ring.current], {
        autoAlpha: 0,
        duration: 0.3,
        onComplete: () => void (shown = false),
      });

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.removeEventListener("pointerleave", leave);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      <div
        ref={ring}
        aria-hidden="true"
        className="cursor-ring invisible pointer-events-none fixed left-0 top-0 z-[90] opacity-0"
      >
        <span className="cursor-ring-body">{label}</span>
      </div>
      <div
        ref={dot}
        aria-hidden="true"
        className="cursor-dot invisible pointer-events-none fixed left-0 top-0 z-[91] opacity-0"
      />
    </>
  );
}
