import { useEffect } from "react";
import BackToTop from "../../components/layout/BackToTop";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import Contact from "../../components/home/Contact";
import SloganBand from "../../components/home/SloganBand";
import Cursor from "../../components/motion/Cursor";
import MarkStory from "../../components/world/MarkStory";
import { ScrollTrigger } from "../../lib/gsap";
import { appReady } from "../../lib/ready";
import { clearHash, scrollToEl, startSmoothScroll } from "../../lib/smooth";

/*
 * Home - after Oryzo: one 3D object (the KMK mark) stays on stage while the story scrolls
 * around it (MarkStory), then the contact section and the footer.
 */
export default function Home() {
  useEffect(() => {
    const { hash } = window.location;
    appReady.then(() => {
      startSmoothScroll();
      ScrollTrigger.refresh();
      if (hash.length < 2) return;
      requestAnimationFrame(() => {
        const el = document.getElementById(decodeURIComponent(hash.slice(1)));
        if (el) scrollToEl(el, true);
        clearHash();
      });
    });
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);
    return () => window.removeEventListener("load", refresh);
  }, []);

  return (
    <>
      <Header />
      <div
        className="relative z-10"
        style={{ marginBottom: "var(--footer-reveal, 0px)" }}
      >
        <main id="main">
          <MarkStory />
          <SloganBand />
          <Contact />
        </main>
      </div>
      <Footer reveal />
      <BackToTop />
      <Cursor />
    </>
  );
}
