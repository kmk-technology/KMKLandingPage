# KMK Technology - Redesign Plan (current direction)

**"One object, many beats" - after [oryzo.ai](https://oryzo.ai/) (Lusion)**, requested by the client.
The official KMK mark, traced from `logo-mark.png` and extruded in three.js, is the only 3D element.
It is lit like a product shot (spot key, cool rim, fill, studio reflections) on a transparent canvas
fixed behind the page, and every section moves it to a new pose with weighted easing.

| # | Section (`id`) | What happens |
|---|---|---|
| 01 | Hero (`kmk`) | Huge faint "KMK" behind the mark, which spins in after the loader; headline bottom-left |
| 02 | About (`intro`) | Editorial spread: statement lights up word by word on scroll; mission, vision, values. Mark on the right |
| 03 | Services (`services`) | Four spec callouts with leader lines pointing at the mark in the centre |
| 04 | Products (`products`) | Three-column line-up (MEDIFAM, KMK Sales, KMK WMS); mark small above the title |
| 05 | Clients (`clients`) | Counts + grid of all client logos; mark on the left |
| 06 | Technology (`platform`) | Numbered platform list with tech chips; mark on the right |
| - | Contact (`contact`), footer | Regular sections |

Loader: the official HD mark fills with blue from the bottom up as real loading progress advances
(light sweep, "KMK Technology", small %). On the home page the text then lifts away, the screen
clears and the logo flies onto the face of the 3D mark (same size and spot, `lib/ready.ts` markStage)
and dissolves into it; the 3D mark then turns into its pose. Deep links and other routes skip the flight.

3D mark: analytic rounded hexagon fitted to `logo-mark-hd.png` (crop of logo-nbg.png), smooth-shaded
bevel, the logo image on the face (emissive, not tone-mapped) so the letters match the artwork exactly.
Phones: the mark travels between empty anchor slots at the top of each section (`.ms-anchor`).
It fades out as the story ends.

Modern layer: kinetic section titles (words rise out of masks), a vertical section HUD on screens
1440px and wider, cards that tilt toward the pointer with a following light, the slogan band
("Đơn giản hóa doanh nghiệp của bạn") sliding and leaning with scroll speed before Contact, and the
liquid-glass header with lens refraction. Product marks: glyph tiles (MEDIFAM heart + cross,
KMK Sales bag + check, KMK WMS warehouse + bars) drawn from the motifs of the official badges, with
typeset names.

Copy: professional company-introduction voice in VI and EN; the hero headline is the slogan.

Palette `#457ae7` + matte black for text, light studio backdrop. Font: Google Sans Flex.
Code: `src/components/world/` (markScene.ts, MarkStory.tsx, logoGeometry.ts), `src/components/layout/Preloader.tsx`.
