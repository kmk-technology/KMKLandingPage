/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "390px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
    },
    extend: {
      // Literal values (not CSS vars) so opacity modifiers like bg-canvas/80 work.
      // Keep in sync with src/styles/tokens.css.
      colors: {
        canvas: "#ffffff",
        paper: "#f2f1ec",
        mist: "#f5f5f7",
        cloud: "#eef3fd",
        ink: {
          DEFAULT: "#1c1c1e",
          soft: "#2c2c2e",
        },
        muted: "#6e6e73",
        subtle: "#737378",
        line: {
          DEFAULT: "rgb(11 18 32 / 0.08)",
          strong: "rgb(11 18 32 / 0.14)",
        },
        brand: {
          DEFAULT: "#457ae7",
          deep: "#3a6bd6",
          violet: "#457ae7",
          soft: "#a9c0f2",
          tint: "#ecf1fc",
        },
        signal: "#457ae7",
        navy: {
          DEFAULT: "#1c1c1e",
          deep: "#141416",
          soft: "#2c2c2e",
        },
      },
      fontFamily: {
        display: ['"Google Sans Flex"', "system-ui", "sans-serif"],
        sans: [
          '"Google Sans Flex"',
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "sans-serif",
        ],
        // every label uses the brand face too (was JetBrains Mono)
        mono: ['"Google Sans Flex"', "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-hero": [
          "clamp(3.1rem, 0.9rem + 8.6vw, 11.5rem)",
          { lineHeight: "0.9" },
        ],
        "display-mega": [
          "clamp(3.5rem, 1rem + 10vw, 13rem)",
          { lineHeight: "0.9" },
        ],
        "display-xl": [
          "clamp(2.6rem, 1.3rem + 5.2vw, 6.25rem)",
          { lineHeight: "1.0" },
        ],
        "display-lg": [
          "clamp(2.1rem, 1.3rem + 3.4vw, 4.5rem)",
          { lineHeight: "1.05" },
        ],
        "display-md": [
          "clamp(1.75rem, 1.2rem + 2.2vw, 3.25rem)",
          { lineHeight: "1.12" },
        ],
        "display-sm": [
          "clamp(1.3rem, 1.1rem + 0.9vw, 1.875rem)",
          { lineHeight: "1.2" },
        ],
        lead: [
          "clamp(1.0625rem, 0.98rem + 0.35vw, 1.25rem)",
          { lineHeight: "1.65" },
        ],
      },
      maxWidth: {
        shell: "1360px",
        prose: "38rem",
      },
      boxShadow: {
        card: "0 1px 2px rgb(11 18 32 / 0.04), 0 8px 24px -12px rgb(11 18 32 / 0.08)",
        lift: "0 2px 4px rgb(11 18 32 / 0.04), 0 24px 48px -20px rgb(33 118 245 / 0.28)",
        glow: "0 12px 32px -10px rgb(33 118 245 / 0.55)",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        marquee: {
          from: { transform: "translate3d(0,0,0)" },
          to: { transform: "translate3d(-50%,0,0)" },
        },
        pulseDot: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.35", transform: "scale(0.7)" },
        },
        floaty: {
          "0%, 100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(0,-8px,0)" },
        },
      },
      animation: {
        marquee: "marquee var(--marquee-duration, 60s) linear infinite",
        "pulse-dot": "pulseDot 2.4s ease-in-out infinite",
        floaty: "floaty 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
