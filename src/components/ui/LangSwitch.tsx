import { LANGS, useLang } from "../../i18n/context";

/** Segmented VI / EN control. Each option is a real button with its full language name for screen readers. */
export default function LangSwitch({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLang();
  return (
    <div
      role="group"
      aria-label="Language / Ngôn ngữ"
      className={`relative inline-flex rounded-full bg-ink/[0.05] p-1 ${className}`}
    >
      <span
        aria-hidden="true"
        className={`absolute bottom-1 top-1 w-[calc(50%-4px)] rounded-full bg-canvas shadow-card transition-transform duration-500 ease-out-expo ${
          lang === "en" ? "translate-x-full" : "translate-x-0"
        }`}
      />
      {LANGS.map((l) => (
        <button
          key={l.code}
          type="button"
          lang={l.code}
          aria-pressed={lang === l.code}
          aria-label={l.name}
          onClick={() => setLang(l.code)}
          className={`relative z-10 min-h-[32px] min-w-[40px] rounded-full px-2.5 text-[0.75rem] font-semibold transition-colors ${
            lang === l.code ? "text-ink" : "text-muted hover:text-ink"
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
