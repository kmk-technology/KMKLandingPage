// Resolves once the preloader has finished, so entrance animations start on a
// fully-rendered page (fonts swapped, layout stable) instead of under the loader.
let resolveReady: () => void = () => {};
export const appReady = new Promise<void>((r) => {
  resolveReady = r;
});
export function markReady() {
  resolveReady();
}

/*
 * Loader → hero handoff. The home page's 3D mark reports where its front face sits on screen;
 * the preloader flies its 2D logo onto exactly that rectangle and dissolves into it.
 * `null` means there is no 3D mark (other routes, no WebGL), and the loader exits normally.
 */
export type MarkRect = { x: number; y: number; w: number; h: number };
/** rect: where the mark's face is on screen · show: reveal the 3D mark (hidden until the logo lands) */
export type MarkStage = { rect: () => MarkRect; show: () => void };
let resolveStage: (stage: MarkStage | null) => void = () => {};
export const markStage = new Promise<MarkStage | null>((r) => {
  resolveStage = r;
});
export function setMarkStage(stage: MarkStage | null) {
  resolveStage(stage);
}
