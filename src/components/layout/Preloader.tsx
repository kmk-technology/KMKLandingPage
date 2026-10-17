import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "../../lib/gsap";
import { markReady, markStage, type MarkStage } from "../../lib/ready";

const MIN_MS = 3000; // long enough to watch the mark fill
const MAX_MS = 4800; // never hold the page hostage on a slow network

const LOGO = "/logo/kmk/logo-mark-hd.png";
// the logo's own proportions (logo-mark-hd.png is 834 x 946)
const VW = 834;
const VH = 946;

/** Closed path for a liquid surface at height level (0 bottom … 1 top) with a moving wave. */
function wave(level: number, phase: number, amp: number) {
  const y0 = VH * (1 - level);
  let d = `M0 ${VH}L0 ${y0.toFixed(1)}`;
  for (let x = 0; x <= VW; x += 24) {
    const y = y0 + Math.sin((x / VW) * Math.PI * 2 * 1.4 + phase) * amp;
    d += `L${x} ${y.toFixed(1)}`;
  }
  return d + `L${VW} ${VH}Z`;
}

/**
 * Preloader — the logo loads. The official KMK mark stands large in the middle and fills with
 * brand blue from the bottom up (a liquid surface with two offset waves) as real loading
 * progress (web fonts, window load, the 3D scene) advances. The name and current step sit at
 * the top, the slogan and a large counter at the bottom, with a progress line along the edge.
 * When ready a light sweeps across the mark, everything else clears, and on the home page the
 * logo flies onto the 3D mark in the hero (same size and spot) and dissolves into it.
 * Elsewhere two curtains (light, then brand blue) rise instead.
 */
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const front = useRef<SVGPathElement>(null);
  const back = useRef<SVGPathElement>(null);
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const start = performance.now();
    // deep links (/#section) get a short version: the visitor wants that section, not the intro
    const deepLink = window.location.hash.length > 1;
    const minMs = deepLink ? 900 : MIN_MS;
    // no scrolling while loading: a class of its own (the menu manages body.is-locked), plus the
    // inputs that could still move the page (wheel, touch, keys)
    const html = document.documentElement;
    html.classList.add("is-loading");
    const block = (e: Event) => {
      if (html.classList.contains("is-loading")) e.preventDefault();
    };
    const keys = (e: KeyboardEvent) => {
      if (
        [
          " ",
          "PageDown",
          "PageUp",
          "ArrowDown",
          "ArrowUp",
          "Home",
          "End",
        ].includes(e.key)
      )
        block(e);
    };
    window.addEventListener("wheel", block, { passive: false });
    window.addEventListener("touchmove", block, { passive: false });
    window.addEventListener("keydown", keys);
    const unlock = () => {
      html.classList.remove("is-loading");
      window.removeEventListener("wheel", block);
      window.removeEventListener("touchmove", block);
      window.removeEventListener("keydown", keys);
    };
    if (!deepLink) window.scrollTo(0, 0);
    const still = prefersReducedMotion();

    // a context scoped to the loader, reverted on cleanup: React StrictMode runs this effect twice
    // in dev, and plain tweens would otherwise capture a half-animated state
    const ctx = gsap.context(() => {}, root);
    if (!still)
      ctx.add(() => {
        gsap.fromTo(
          ".pl-logo",
          { autoAlpha: 0, scale: 0.9, y: 20 },
          { autoAlpha: 1, scale: 1, y: 0, duration: 1.4, ease: "expo.out" },
        );
        gsap.fromTo(
          ".pl-glow",
          { autoAlpha: 0, scale: 0.7 },
          { autoAlpha: 1, scale: 1, duration: 1.8, ease: "expo.out" },
        );
        gsap.fromTo(
          ".pl-fade",
          { autoAlpha: 0, y: 14 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            stagger: 0.08,
            ease: "expo.out",
            delay: 0.3,
          },
        );
      });

    // progress: ease toward the latest real milestone, creep while waiting
    const progress = { v: 0 };
    let target = 15;
    let last = -1;
    let phase = 0;
    let finishing = false; // the exit timeline drives the count from here
    const tick = () => {
      if (!still && !finishing) {
        target = Math.min(target + 0.1, 92);
        // never faster than the minimum duration, so the count is always seen running
        const cap = ((performance.now() - start) / minMs) * 92;
        // eased and rate-limited (frame-rate independent), so the count never jumps
        const dr = Math.min(gsap.ticker.deltaRatio(), 2);
        progress.v += Math.min(
          (Math.min(target, cap) - progress.v) * 0.08 * dr,
          0.9 * dr,
        );
      }
      const v = Math.round(progress.v);
      if (v !== last) {
        last = v;
        setPct(v);
      }
      // the liquid: two offset waves rise with progress, calming as it fills
      const lvl = still ? 1 : Math.min(progress.v / 100, 1);
      phase += 0.06 * Math.min(gsap.ticker.deltaRatio(), 2);
      const amp = 22 * Math.sin(Math.PI * Math.min(lvl * 1.05, 1)) + 2;
      front.current?.setAttribute("d", wave(lvl * 1.06, phase, amp));
      back.current?.setAttribute(
        "d",
        wave(lvl * 1.06 + 0.025, phase * 0.8 + 2.2, amp * 0.8),
      );
    };
    gsap.ticker.add(tick);

    const fonts = (document.fonts?.ready ?? Promise.resolve()).then(() => {
      target = Math.max(target, 60);
    });
    const loaded = new Promise<void>((r) => {
      if (document.readyState === "complete") r();
      else window.addEventListener("load", () => r(), { once: true });
    }).then(() => {
      target = Math.max(target, 85);
    });
    // home page: also wait for the 3D mark, so the logo has somewhere to land
    let stage: MarkStage | null = null;
    const home = window.location.pathname === "/";
    const staged =
      home && !deepLink
        ? markStage.then((f) => void (stage = f))
        : Promise.resolve();
    const timeout = new Promise<void>((r) => setTimeout(r, MAX_MS));

    let cancelled = false;
    Promise.race([Promise.all([fonts, loaded, staged]), timeout]).then(
      async () => {
        const elapsed = performance.now() - start;
        if (elapsed < minMs)
          await new Promise((r) => setTimeout(r, minMs - elapsed));
        if (cancelled) return;
        const release = () => {
          unlock();
          markReady();
        };
        const finish = () => {
          gsap.ticker.remove(tick);
          release();
          setDone(true);
        };
        if (still) return finish();
        finishing = true;
        if (deepLink) {
          ctx.add(() =>
            gsap.to(root.current, {
              autoAlpha: 0,
              duration: 0.4,
              ease: "power2.out",
              onStart: release,
              onComplete: finish,
            }),
          );
          return;
        }
        const tl = gsap.timeline({ onComplete: finish });
        ctx.add(() => tl);
        tl.to(progress, { v: 100, duration: 0.6, ease: "power2.inOut" })
          // full: a light sweeps across the mark, which gives a small beat
          // the light crosses the whole mark, then is gone
          .fromTo(
            ".pl-shine",
            { xPercent: -160, autoAlpha: 1 },
            { xPercent: 260, duration: 1, ease: "power2.inOut" },
            "+=0.1",
          )
          .set(".pl-shine", { autoAlpha: 0 })
          .to(
            ".pl-logo",
            {
              scale: 1.04,
              duration: 0.3,
              yoyo: true,
              repeat: 1,
              ease: "power2.inOut",
            },
            "<0.2",
          )
          // hold on "ready · 100", then everything but the mark clears
          .to(
            ".pl-fade",
            {
              autoAlpha: 0,
              y: -10,
              duration: 0.5,
              stagger: 0.04,
              ease: "power2.in",
            },
            "+=0.3",
          )
          .to(
            ".pl-glow",
            { autoAlpha: 0, scale: 1.3, duration: 0.6, ease: "power2.out" },
            "<",
          );

        const target = stage;
        if (target) {
          // the logo becomes the 3D mark, in one continuous move:
          //  1. behind the (still opaque) loader the 3D mark is placed flat on the exact spot of
          //     the logo and starts rendering, so its first frames are already smooth;
          //  2. the backdrop clears and the flat logo cross-fades into the identical 3D face;
          //  3. a single eased progress drives depth, size, position and turn into the hero pose.
          const logo = root.current!.querySelector<HTMLElement>(".pl-logo")!;
          const m = { p: 0 };
          tl.call(() => {
            const r = logo.getBoundingClientRect();
            target.morph(0);
            target.startAt({ x: r.left, y: r.top, w: r.width, h: r.height });
            target.show();
          })
            .set(".pl-blue", { autoAlpha: 0 }, "+=0.15")
            .to(".pl-light", {
              backgroundColor: "rgba(244,247,253,0)",
              duration: 0.6,
              ease: "power2.inOut",
            })
            .to(
              ".pl-bg",
              { autoAlpha: 0, duration: 0.6, ease: "power2.inOut" },
              "<",
            )
            .to(
              logo,
              { autoAlpha: 0, duration: 0.45, ease: "power1.inOut" },
              "<0.15",
            )
            .to(
              m,
              {
                p: 1,
                duration: 2.2,
                // moves at once, then settles softly into the hero pose
                ease: "power2.out",
                onUpdate: () => target.morph(m.p),
              },
              "<0.1",
            )
            .call(release, undefined, "<0.5");
        } else {
          tl.to(
            ".pl-logo",
            { scale: 0.7, autoAlpha: 0, duration: 0.6, ease: "expo.in" },
            "<",
          )
            .call(release, undefined, "+=0.05")
            .to(
              ".pl-curtain",
              {
                yPercent: -100,
                duration: 1.1,
                stagger: { each: 0.14, from: "end" },
                ease: "expo.inOut",
              },
              "<",
            );
        }
      },
    );

    return () => {
      cancelled = true;
      unlock();
      gsap.ticker.remove(tick);
      ctx.revert();
    };
  }, []);

  if (done) return null;
  const mask = `url(${LOGO}) center / contain no-repeat`;

  return (
    <div
      ref={root}
      className="pointer-events-none fixed inset-0 z-[100]"
      role="status"
      aria-live="polite"
    >
      <span className="sr-only">Đang tải KMK Technology… {pct}%</span>
      <div className="pl-curtain pl-blue absolute inset-0 bg-brand" />
      <div
        className="pl-curtain pl-light absolute inset-0 overflow-hidden bg-[#f4f7fd] [--lw:min(17rem,30vh,52vw)]"
        aria-hidden="true"
      >
        {/* soft light */}
        <div className="pl-bg absolute inset-0">
          <div className="absolute -left-[20vmax] -top-[25vmax] h-[70vmax] w-[70vmax] rounded-full bg-[radial-gradient(circle,rgba(69,122,231,0.14),transparent_62%)]" />
          <div className="absolute -bottom-[30vmax] -right-[20vmax] h-[75vmax] w-[75vmax] rounded-full bg-[radial-gradient(circle,rgba(122,163,245,0.18),transparent_62%)]" />
        </div>

        {/* the mark, large, at the exact centre */}
        <div className="absolute left-1/2 top-1/2 w-[var(--lw)] -translate-x-1/2 -translate-y-1/2">
          <div className="pl-glow absolute left-1/2 top-[62%] h-[70%] w-[130%] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(69,122,231,0.35),transparent)] blur-2xl" />
          <div className="pl-logo relative">
            {/* faint mark, then the real one filled by a rising liquid (two offset waves) */}
            <svg viewBox={`0 0 ${VW} ${VH}`} className="block w-full">
              <defs>
                <clipPath id="pl-front">
                  <path ref={front} d={wave(0, 0, 0)} />
                </clipPath>
                <clipPath id="pl-back">
                  <path ref={back} d={wave(0, 0, 0)} />
                </clipPath>
              </defs>
              <image
                href={LOGO}
                width={VW}
                height={VH}
                opacity={0.12}
                style={{ filter: "grayscale(1)" }}
              />
              <image
                href={LOGO}
                width={VW}
                height={VH}
                opacity={0.35}
                clipPath="url(#pl-back)"
              />
              <image
                href={LOGO}
                width={VW}
                height={VH}
                clipPath="url(#pl-front)"
              />
            </svg>
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ WebkitMask: mask, mask }}
            >
              <div className="pl-shine invisible absolute inset-y-0 left-0 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-0" />
            </div>
          </div>
        </div>

        {/* bottom: the large counter */}
        <div className="absolute inset-x-[var(--gutter)] bottom-9 flex items-end justify-end">
          <p className="pl-fade flex items-start font-display text-[clamp(4.5rem,3rem+7vw,10rem)] font-bold leading-[0.85] text-ink tabular-nums">
            {String(pct).padStart(2, "0")}
            <span className="ml-1 mt-[0.08em] text-[0.38em] font-bold leading-none text-brand">
              %
            </span>
          </p>
        </div>

        {/* progress bar along the bottom edge, with a glowing head */}
        <div className="pl-fade absolute inset-x-0 bottom-0 h-1.5 bg-ink/[0.06]">
          <div
            className="relative h-full bg-gradient-to-r from-[#7aa3f5] to-brand transition-[width] duration-300 ease-out"
            style={{ width: `${pct}%` }}
          >
            <span className="absolute -right-1 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-brand/40 blur-[6px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
