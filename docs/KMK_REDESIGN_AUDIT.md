# KMK Technology - Redesign Audit (baseline: commit `3a844fc`, branch `main`)

Audit performed before any change. Redesign work happens on branch `feature/premium-redesign`.

## 1. Tech stack

| Item | Baseline |
|---|---|
| Framework | React 18.3 + TypeScript 5.5 (strict) + Vite 5 (`@vitejs/plugin-react-swc`) |
| Package manager | npm (`package-lock.json`) |
| Routing | `react-router-dom` 6, `BrowserRouter` |
| Styling | Tailwind 3.4 + 3 plain CSS files (`App.css`, `Home/components/style.css`, `styles/shiny.css`) |
| Animation | `framer-motion` 11 (fade/slide on view, hero text parallax) |
| UI libs | `@mui/material` + `@emotion/*` (only used for 5 icons), `@heroicons/react` (2 icons), `react-moment` (only to print the year), `typeface-roboto` (+ a second Roboto load from Google Fonts) |
| Analytics | Google tag `G-0G27NT32V0`, StatCounter `13048572` (inline in `index.html`) |
| Backend / API | **None.** No `fetch`, no API, no env variables, no form |
| Tests | None configured |
| Scripts | `dev`, `build` (`tsc -b && vite build`), `lint`, `preview` |

Baseline results:
- `npm run build` - **PASS** (main JS 435 kB / 145 kB gzip; 26 Roboto font files emitted).
- `npm run lint` - **FAIL**: `eslint.config.js` contains a legacy `.eslintrc` object using `module.exports` in an ESM package (`ReferenceError: module is not defined`).

## 2. Routes

Defined in `src/AppRouter.tsx`.

| Path | Renders | Notes |
|---|---|---|
| `/` | `pages/Home` | Landing page |
| `/projects` | `Navbar` only | Effectively an empty page |
| `/projects/medcg/policy` | MedCG privacy policy (VI) | Auto-registered by `import.meta.glob("/src/pages/projects/*/*/index.tsx")` - **must stay reachable** (app-store linked) |
| `/projects/medcg/terms` | MedCG terms of service (VI) | Same mechanism |
| `/projects/*` (unknown) | `NotFound` (404) | |
| `*` (anything else) | Empty fragment | Blank page - bug |

Other findings: `AppRouter` logs every route with `console.log`. `src/pages/policies/yd115cg/hero.tsx` is dead code (not routed, duplicate of the old hero, imports from `@/public/...`). `error/403.tsx` is unused.

## 3. Information architecture (home)

Section order and anchors (anchors are linked from the navbar and must keep working as deep links):

| # | Component | Anchor | Content (source of truth) |
|---|---|---|---|
| 1 | `navbar.tsx` | - | Links INTRODUCE `#kmk`, FLATFORM (typo) `#platform`, SERVICES, PRODUCT, CLIENTS, CONTACT. Active-section highlight via IntersectionObserver. Mobile menu has no focus management, no Escape, no scroll lock; toggle is a `div` (not keyboard accessible) |
| 2 | `hero.tsx` | `#kmk` | "KMK TECHNOLOGY ®" over a city photo. **Hidden below `md`** - mobile users get no hero. Loads `full-verrylarge.jpg` (**11.2 MB**) + `building.png` (**4.4 MB**) |
| 3 | `introduction.tsx` | `#intro` | "Simplify Your Business / Innovate for Excellence" + mission paragraph; "Empowering Innovation / Ensuring Reliability" + vision paragraph; 2 illustration SVGs |
| 4 | `Platform.tsx` | `#platform` | Tech groups: Application (SAP, Oracle), Mobile (Angular, React Native, Node.js), Web (React, Node.js, .NET Core, SQL Server), Microsoft Power (Power Apps, Power BI, Power Automate, Power Virtual Agents, SharePoint) |
| 5 | `Services.tsx` | `#services` | Software Development; Consultant - ERP (Oracle EBS, SAP); Cloud Server - IT infrastructure equipment; Outsourcing - IT service outsourcing |
| 6 | `Products.tsx` | `#products` | MEDIFAM - Medical Family System → medifam.vn; KMK SALES - Point of Sale → kmksales.vn; KMK WMS - Warehouse Management Solutions → **`#` (dead link)** |
| 7 | `CorporateClients.tsx` | `#clients` | 9 corporate logos (PepsiCo, An Cường, OFI, Shimmer, Quảng Hưng Long, TCSC, Việt Tiến, Jia Hsin, Lucky Group); 27 medical entries (Việt Tiến is duplicated into the medical list). Custom drag-scroll with `touchAction: none` (blocks vertical page scroll on touch) |
| 8 | `Contact.tsx` | `#contact` | Long logo, mission blurb, websites (kmk-tech.vn → `href="#"`, medifam.vn, yhgd.vn, kmksales.vn), address *17 Street 24B, Binh Tri Dong B Ward, Binh Tan District, HCMC*, email `trung.ht@kmk-tech.vn`, phone `0938 220 711 – Trung Huynh Tan`. Footer © year |

External links: medifam.vn, kmksales.vn, yhgd.vn. Policy pages also use `dev@kmk-tech.vn`.

## 4. Forms

**There is no contact form**, no API, webhook, CRM, spam protection or validation anywhere in the repo. The only conversion paths are `mailto:` and the phone number (displayed as text, not a `tel:` link).

## 5. Brand

- Logo files: `public/logo/kmk/` - `logo-nbg.png` (hex mark), `long-logo*.png` (mark + "KMK TECHNOLOGY / SIMPLIFY YOUR BUSINESS"), `square-logo*.png`. No SVG logo exists.
- Mark: hexagon with a K-M-K monogram, gradient **#1A7BE3 → #5276EA** (blue → periwinkle).
- Wordmark: grey `#626365` + blue tagline `#2176F5`.
- Colors used in code: primary blue `#2176F5`, green `#00B14F` (used for "TECHNOLOGY"), dark text `#002249`. Tailwind config defines unrelated `brandPrimary #FF6B5B` / `neutralDGrey #FFC232` (not used).
- Tagline: **"Simplify your business."**
- Site language: **English** (landing); policy/terms/404 in **Vietnamese** - kept as is.

## 6. Problems found

| Area | Issue |
|---|---|
| Responsive | Hero hidden on mobile; nav pill fixed at 60 % width; Contact uses a non-wrapping `flex-row` (cramped/overflow on phones); product cards use `translateY(-90px)` hover with 5 rem padding |
| Typography | One family (Roboto) loaded twice, 26 font files; inconsistent headline sizes; `<h1>` used for every card title (8+ h1s) |
| Visual | Saturated blue→teal gradients on every section, generic card grid, illustration SVGs from stock style; template feel |
| Animation | Infinite floating icons + shimmer on every logo; no `prefers-reduced-motion` support |
| A11y | Mobile toggle is a `div`; empty `alt` on content images; drag-scroll disables touch scroll; dead `#` links; low-contrast grey text on blue |
| SEO | `<title>` only; no meta description, OG tags, canonical, structured data, robots or sitemap |
| Performance | 15.6 MB of hero imagery on first paint (desktop); MUI + Emotion shipped for 5 icons; 435 kB JS |
| Code | `console.log` in router; broken lint config; dead files |

## 7. Keep / refactor / replace

| Keep (content & behaviour) | Refactor | Replace |
|---|---|---|
| All factual content: services, products, platform list, client names & logos, address, email, phone, websites | Router (remove logging, real 404 for unknown paths, `/projects` index) | Navbar, Hero, Intro, Platform, Services, Products, Clients, Contact/Footer visuals |
| Section anchors `#kmk #intro #platform #services #products #clients #contact` | Policy/Terms page shell (text untouched) | framer-motion → GSAP + ScrollTrigger |
| `/projects/medcg/policy`, `/projects/medcg/terms` URLs and text | ESLint config (make it run) | MUI/Emotion/heroicons/react-moment/typeface-roboto → inline SVG icons + `Date` |
| Google Analytics + StatCounter snippets | Tailwind tokens | Roboto → Space Grotesk / Inter / JetBrains Mono (all Vietnamese-capable) |

## 8. Risks & rollback

- **Risk:** policy/terms URLs are referenced by the MedCG app listing. Mitigation: glob routing untouched; verified by build + browser check.
- **Risk:** removing dependencies breaks a forgotten import. Mitigation: `tsc -b` in build catches it.
- **Risk:** WebGL unavailable / low-end devices. Mitigation: Three.js scene lazy-loaded, skipped on `prefers-reduced-motion`, and the hero is complete without it.
- **Rollback:** all work is on `feature/premium-redesign`; `git checkout main` restores the baseline. Legacy image assets are left in `public/` so the old build still works.

## 9. Baseline screenshots

Not captured from the old site before changes (the dev server was not run at baseline). The `main` branch can be run with `git checkout main && npm run dev` for side-by-side comparison.
