import { createContext, useContext } from "react";

export type Lang = "vi" | "en";
/** A string in both site languages. */
export type L = Record<Lang, string>;

export const LANGS: { code: Lang; label: string; name: string }[] = [
  { code: "vi", label: "VI", name: "Tiếng Việt" },
  { code: "en", label: "EN", name: "English" },
];

export type LangContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (s: L) => string;
};

export const LangContext = createContext<LangContextValue | null>(null);

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside <LangProvider>");
  return ctx;
}
