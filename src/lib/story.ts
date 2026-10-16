/*
 * Shared state of the scroll story. On large screens the home page is a deck: one gesture
 * moves exactly one step (a slide, or a sub-step inside a slide). Other components (header,
 * back-to-top, anchor links) talk to the deck through this module instead of the scroll position.
 */

export type StoryState = {
  index: number;
  id: string;
  step: number;
  total: number;
  deck: boolean;
};

type Listener = (s: StoryState) => void;

let state: StoryState = { index: 0, id: "kmk", step: 0, total: 1, deck: false };
const listeners = new Set<Listener>();
let goImpl:
  ((target: number | string, opts?: { instant?: boolean }) => boolean) | null =
  null;

export function getStory() {
  return state;
}

export function setStory(next: Partial<StoryState>) {
  state = { ...state, ...next };
  listeners.forEach((l) => l(state));
}

export function onStory(l: Listener) {
  listeners.add(l);
  l(state);
  return () => {
    listeners.delete(l);
  };
}

/** Registered by the deck while it is mounted and active. */
export function registerStoryNav(fn: typeof goImpl) {
  goImpl = fn;
}

/** Go to a slide by index or section id. Returns false when no deck handles it (normal scrolling). */
export function storyGo(target: number | string, opts?: { instant?: boolean }) {
  return state.deck && goImpl ? goImpl(target, opts) : false;
}
