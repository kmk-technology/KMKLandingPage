# KMK Technology - Redesign Plan (current direction, 2026-10-29)

**Built from the company profile** ("Hồ sơ năng lực KMK Technology", 2025): content and order follow
the profile, and so does the visual language (white pages, brand-blue diagonal slabs, rings, hexagon
dots, bold uppercase titles, blue gradient cards). Normal scrolling with calm, one-off reveals.

Sections (`src/components/world/MarkStory.tsx`, data in `src/content/site.ts`):
opening (3D mark in a ring on blue slabs, stats) → 01 company → 02 history (blue band, timeline
11+ / 2022 / Medifam) → 03 vision · mission · core values → 04 services (4, from the profile) →
05 products (Medifam, KMK Sales, KMK WMS, Digital Information) → 06 strengths + technology marquee →
07 benefits → 08 team (org chart, motto "Your faith - Our services") → 09 clients → slogan band →
contact → footer.

Loader: hexagon outline + lens opening, handing over to the 3D mark.

---

Palette `#457ae7` + matte black for text, light studio backdrop. Font: Google Sans Flex.
Code: `src/components/world/` (markScene.ts, MarkStory.tsx, logoGeometry.ts), `src/components/layout/Preloader.tsx`.
