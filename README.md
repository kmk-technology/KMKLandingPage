# KMK Technology - website

Landing page and MedCG legal pages for KMK Technology. React 18 + TypeScript + Vite + Tailwind, GSAP/ScrollTrigger + Lenis for motion, three.js for the 3D logo. Bilingual (Vietnamese default, English).

## Run

```bash
npm install
npm run dev       # http://localhost:5173
npm run lint
npm run build     # tsc -b && vite build → dist/
npm run preview   # serve dist/ at http://localhost:4173
```

## Configuration

Copy `.env.example` to `.env.local` if you need a backend for the contact form.

| Variable | Required | Effect |
|---|---|---|
| `VITE_CONTACT_ENDPOINT` | No | URL that receives the contact form as JSON (`POST`). When empty, the form opens a pre-filled email to `trung.ht@kmk-tech.vn` instead, and says so to the visitor. |

No secrets live in the client. Analytics (Google tag `G-0G27NT32V0`, StatCounter) are in `index.html`.

## Structure

```
src/
  content/site.ts          all copy and facts (VI + EN) - edit content here
  i18n/                    language context, provider (default "vi", ?lang=en, remembered choice)
  lib/                     gsap setup, story state (deck), Lenis smooth scroll (mobile flow), ready signal (preloader → intro)
  components/
    layout/                Header, Footer, Preloader, LegalLayout
    story/                 Deck (one gesture = one step), StoryHud, slides/ (Hero, About, Services, Products, Clients, Tech, Contact)
    sections/              ServiceMocks (UI scenes used by the services slide)
    motion/                Cursor, Magnetic
    ui/                    Button, Device, Icon, LiquidGlass, Logo, LangSwitch, ProductMark, serviceIcon
    visual/                heroScene (three.js: KMK mark traced from the official logo and extruded; particle halo)
  features/contact/        ContactForm, submit (endpoint / mailto), topic prefill
  pages/                   Home, error/404, projects/medcg/{policy,terms}
```

## Routes

| Path | Page |
|---|---|
| `/` | Home (anchors `#kmk #intro #services #products #clients #platform #contact`) |
| `/projects/medcg/policy` | MedCG privacy policy (auto-registered from `src/pages/projects/*/*/index.tsx`) |
| `/projects/medcg/terms` | MedCG terms of service |
| `/projects` | Redirects to `/` |
| anything else | 404 |

The host must serve `index.html` for unknown paths (SPA fallback) so the routes above work on reload.

## Content rules

Only verified facts are shown: services, products, client logos, address, email and phone all come from the original site. Counts on the page are computed from the lists in `content/site.ts`. Product logos are typeset wordmarks (`ui/ProductMark.tsx`), not raster images.

See `docs/` for the audit, plan and motion notes.
