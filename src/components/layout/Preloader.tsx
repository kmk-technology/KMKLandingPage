import { useEffect } from "react";
import { markReady } from "../../lib/ready";

/**
 * No loading screen: the page shows at once. This only does the loader's bookkeeping - start at
 * the top (unless a #section was asked for) and tell the page it is ready so its entrance
 * animations and the 3D mark start.
 */
export default function Preloader() {
  useEffect(() => {
    if (window.location.hash.length < 2) window.scrollTo(0, 0);
    markReady();
  }, []);
  return null;
}
