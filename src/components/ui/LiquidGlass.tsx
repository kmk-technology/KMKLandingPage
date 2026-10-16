import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { gsap } from "../../lib/gsap";

/*
 * Liquid glass surface (iOS-style): frosted, saturated backdrop with a bright rim and a
 * specular highlight. In Chromium the backdrop is also *refracted* near the edges: a
 * displacement map is generated for the element's exact rounded shape and applied through
 * an SVG filter in `backdrop-filter`, so content behind bends like it would through a lens.
 * Other browsers get the frosted glass without the refraction.
 */

// Lens refraction on (Chromium). The map is rebuilt only when the bar changes size, never per frame.
const REFRACTION = true;

const supportsRefraction = () => {
  if (!REFRACTION || typeof navigator === "undefined") return false;
  const brands = (
    navigator as Navigator & { userAgentData?: { brands: { brand: string }[] } }
  ).userAgentData?.brands;
  return Boolean(brands?.some((b) => /Chromium/i.test(b.brand)));
};

/** Displacement map for a rounded rectangle: neutral grey inside, edge band pushes pixels along the edge normal. */
function displacementMap(
  w: number,
  h: number,
  radius: number,
  band: number,
  inset = 0,
) {
  const cv = document.createElement("canvas");
  cv.width = w;
  cv.height = h;
  const ctx = cv.getContext("2d");
  if (!ctx) return "";
  const img = ctx.createImageData(w, h);
  const iw = Math.max(2, w - inset * 2); // visible width of the (clipped) capsule
  const r = Math.min(radius, h / 2, iw / 2);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      // signed distance to the rounded rect (negative inside) and its gradient (outward normal)
      const px = x + 0.5 - w / 2;
      const py = y + 0.5 - h / 2;
      const qx = Math.abs(px) - (iw / 2 - r);
      const qy = Math.abs(py) - (h / 2 - r);
      const ox = Math.max(qx, 0);
      const oy = Math.max(qy, 0);
      const outside = Math.hypot(ox, oy);
      const dist = outside + Math.min(Math.max(qx, qy), 0) - r;
      let nx = 0;
      let ny = 0;
      if (qx > 0 && qy > 0) {
        nx = (ox / (outside || 1)) * Math.sign(px);
        ny = (oy / (outside || 1)) * Math.sign(py);
      } else if (qx > qy) nx = Math.sign(px);
      else ny = Math.sign(py);
      const depth = -dist; // distance from the edge, inward
      const m = depth < band ? Math.pow(1 - Math.max(depth, 0) / band, 2) : 0;
      const i = (y * w + x) * 4;
      img.data[i] = 128 + nx * m * 127;
      img.data[i + 1] = 128 + ny * m * 127;
      img.data[i + 2] = 128;
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return cv.toDataURL();
}

type Props = {
  children?: ReactNode;
  className?: string;
  active?: boolean;
  radius?: number;
  strength?: number;
  /** Horizontal clip (px) applied through the --ix custom property; the lens map follows it. */
  insetX?: number;
};

export default function LiquidGlass({
  children,
  className = "",
  active = true,
  radius = 999,
  strength = 58,
  insetX = 0,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const id = `lg-${useId().replace(/[:]/g, "")}`;
  const [map, setMap] = useState<{ url: string; w: number; h: number } | null>(
    null,
  );
  const [refract] = useState(supportsRefraction);
  // Refraction stays on while scrolling (content slides under the lens, like iOS); it only rests
  // while the glass is resizing, because a stale map would distort. It never switches abruptly:
  // the lens strength eases to zero (visually identical to plain glass) before the filter is
  // removed, and eases back up afterwards.
  const [busy, setBusy] = useState(false);
  const [filterOn, setFilterOn] = useState(false);
  const lens = useRef({ k: 0 });
  const dispRefs = useRef<(SVGFEDisplacementMapElement | null)[]>([]);

  // Regenerate the map once the glass has settled at a new size or clip; the lens rests meanwhile.
  const insetRef = useRef(insetX);
  insetRef.current = insetX;
  const rebuild = useRef<() => void>(() => {});
  useEffect(() => {
    const el = ref.current;
    if (!el || !refract || !active) return;
    let t = 0;
    let first = true;
    const build = () => {
      if (!first) setBusy(true);
      first = false;
      clearTimeout(t);
      t = window.setTimeout(() => {
        const w = Math.round(el.offsetWidth);
        const h = Math.round(el.offsetHeight);
        if (w < 2 || h < 2) return;
        setMap({
          url: displacementMap(
            w,
            h,
            Math.min(radius, h / 2),
            Math.min(30, h / 2),
            insetRef.current,
          ),
          w,
          h,
        });
        setBusy(false);
      }, 180);
    };
    rebuild.current = () => {
      setBusy(true);
      clearTimeout(t);
      t = window.setTimeout(() => {
        first = true;
        build();
      }, 650);
    };
    const ro = new ResizeObserver(build);
    ro.observe(el);
    return () => {
      ro.disconnect();
      clearTimeout(t);
    };
  }, [refract, active, radius]);
  useEffect(() => {
    rebuild.current();
  }, [insetX]);

  const want = Boolean(refract && active && map && !busy);
  const applyLens = () => {
    const k = lens.current.k;
    dispRefs.current[0]?.setAttribute("scale", String(-strength * k));
  };
  useEffect(() => {
    if (want) {
      setFilterOn(true);
      const tw = gsap.to(lens.current, {
        k: 1,
        duration: 0.45,
        ease: "power2.out",
        onUpdate: applyLens,
        delay: 0.05,
      });
      return () => {
        tw.kill();
      };
    }
    const tw = gsap.to(lens.current, {
      k: 0,
      duration: 0.22,
      ease: "power2.in",
      onUpdate: applyLens,
      onComplete: () => setFilterOn(false),
    });
    return () => {
      tw.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [want]);
  // keep the attributes in sync when the filter (re)mounts
  useEffect(applyLens);

  // Light follows the pointer: the rim and specular highlight turn toward it, like iOS glass.
  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(hover: hover) and (pointer: fine)").matches)
      return;
    let raf = 0;
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width) * 100;
        const y = ((e.clientY - r.top) / r.height) * 100;
        const angle =
          (Math.atan2(
            e.clientY - (r.top + r.height / 2),
            e.clientX - (r.left + r.width / 2),
          ) *
            180) /
            Math.PI +
          90;
        el.style.setProperty("--lg-x", `${Math.max(-10, Math.min(110, x))}%`);
        el.style.setProperty("--lg-y", `${Math.max(-60, Math.min(160, y))}%`);
        el.style.setProperty("--lg-angle", `${angle}deg`);
      });
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  const backdrop = `url(#${id}) blur(1.5px) saturate(140%) brightness(1.04)`;

  return (
    <div
      ref={ref}
      className={`liquid-glass ${active ? "is-active" : ""} ${className}`}
      style={
        filterOn && active
          ? { backdropFilter: backdrop, WebkitBackdropFilter: backdrop }
          : undefined
      }
    >
      {refract && map ? (
        <svg
          aria-hidden="true"
          width="0"
          height="0"
          className="pointer-events-none absolute"
        >
          {/* lens refraction: the backdrop bends along the edges, colours stay true */}
          <filter
            id={id}
            x="0"
            y="0"
            width={map.w}
            height={map.h}
            filterUnits="userSpaceOnUse"
            primitiveUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feImage
              href={map.url}
              x="0"
              y="0"
              width={map.w}
              height={map.h}
              preserveAspectRatio="none"
              result="map"
            />
            <feDisplacementMap
              ref={(n) => void (dispRefs.current[0] = n)}
              in="SourceGraphic"
              in2="map"
              scale={0}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </svg>
      ) : null}
      {children}
    </div>
  );
}
