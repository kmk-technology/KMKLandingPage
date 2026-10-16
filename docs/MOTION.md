# Motion & performance notes

Direction: scroll-story deck on large screens (see KMK_REDESIGN_PLAN.md); normal scrolling with per-slide entrances on small screens.

## Rules

- Animate **transform and opacity only** in the DOM. Never tween `font-weight`/width, avoid scrubbing `filter`.
- Everything runs inside `gsap.matchMedia()` with `(prefers-reduced-motion: no-preference)`; content is visible without JS.
- Don't put a CSS `transition` on an element GSAP scrubs - keep hover effects on an inner element.
- Inline CSS `clamp()`/`calc()` needs spaces around `+`/`-`, otherwise the value is dropped.
- Word masks: put the space *outside* the `inline-block` mask, or words glue together.

## three.js hero (`components/visual/heroScene.ts`)

- Lazy-loaded chunk after the preloader; falls back to the logo image without WebGL.
- The mark is traced from `/logo/kmk/logo-mark.png` (marching squares → simplified outlines → `ExtrudeGeometry` with bevel), so it is the official shape, not a redraw.
- `MeshPhysicalMaterial` with clearcoat and a `RoomEnvironment` reflection map; `NeutralToneMapping` keeps the blues saturated.
- Particles are sampled from the same mask: cloud → logo → orbiting halo during the intro.
- Rendering pauses when the hero is off screen; pixel ratio capped at 2.

## Load sequence

`Preloader` (fonts + window load, 0.7–2.5 s) → `markReady()` → Lenis starts, hero type rises, the 3D mark assembles; deep links (`/#clients`) are honoured after `ScrollTrigger.refresh()`.

## Pieces

| Where | Effect |
|---|---|
| `lib/smooth.ts` | Lenis on GSAP's ticker; `#id` links glide with header offset; stopped while the mobile menu is open. |
| `motion/Cursor.tsx` | Dot + trailing ring; grows over links, shows a label over `[data-cursor]`. Fine pointers only. |
| `motion/Magnetic.tsx` | Buttons drift toward the pointer; hit area never moves. |
| `motion/SplitReveal.tsx` | Headings rise word by word out of masks (rewinds on scroll back). |
| `motion/Scramble.tsx` | Section labels decode from random glyphs. |
| `sections/ServiceMocks.tsx` | Looping CSS UI scenes for each service. |
| `layout/Preloader.tsx` | Brand-blue screen with a 000→100 counter (real font/load progress); lifts away with a curved lower edge. |
| `layout/Header.tsx` + `ui/LiquidGlass.tsx` | Full-width bar at the top; after 40px of scroll it contracts into a floating liquid-glass capsule - frosted backdrop, rim light, specular highlight and (Chromium) edge refraction from a displacement map generated for the exact capsule shape. Refraction pauses while scrolling (it is costly per frame) and returns when scrolling stops. Sliding blue highlight on the nav. |
| `layout/StoryRail.tsx` | Chapter rail on wide screens (≥1536px): hairline fills with the scroll, current chapter number + title shown; fades out at the footer. |
| `.sheet` (index.css) | Sections overlap the previous one with rounded top corners. |
| `layout/Footer.tsx` | Light footer with a brand-blue CTA card; on large screens it sits fixed behind the page and is uncovered at the end (curtain reveal). |

## Measured

Automated QA: 71/71 (overflow at 9 widths ± reduced motion, console errors, menu a11y, language, form, routes, deep link, preloader, images).
