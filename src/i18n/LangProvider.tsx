import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { ScrollTrigger } from "../lib/gsap";
import {
  LangContext,
  type L,
  type Lang,
  type LangContextValue,
} from "./context";

const STORAGE_KEY = "kmk-lang";

function initialLang(): Lang {
  try {
    const fromUrl = new URLSearchParams(window.location.search).get("lang");
    if (fromUrl === "vi" || fromUrl === "en") return fromUrl;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "vi" || stored === "en") return stored;
  } catch {
    /* storage unavailable (private mode) - fall through */
  }
  return "en"; // English by default; Vietnamese by explicit choice (VI toggle) or ?lang=vi
}

export default function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    // Copy length differs between languages - re-measure scroll-driven animations.
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [lang]);

  const value = useMemo<LangContextValue>(
    () => ({ lang, setLang, t: (s: L) => s[lang] }),
    [lang, setLang],
  );
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}
