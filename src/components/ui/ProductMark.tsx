import type { ReactNode } from "react";
import type { Product } from "../../content/site";

type Props = {
  p: Product;
  size?: "sm" | "md" | "lg";
  tone?: "color" | "white";
};

/*
 * Product glyphs, drawn as clean vectors from the motifs of each product's official badge
 * (public/logo/*-logo.*): MEDIFAM - family care (heart + medical cross); KMK Sales - the
 * shopping bag with a confirmed sale; KMK WMS - the warehouse with rising stock bars.
 */
const glyphs: Record<string, ReactNode> = {
  medifam: (
    <>
      <path d="M12 20.2s-7.2-4.3-7.2-10a4.1 4.1 0 0 1 7.2-2.7 4.1 4.1 0 0 1 7.2 2.7c0 5.7-7.2 10-7.2 10Z" />
      <path d="M12 9.6v5.2M9.4 12.2h5.2" />
    </>
  ),
  "kmk-sales": (
    <>
      <path d="M5.6 8.4h12.8l-1.1 11.2H6.7L5.6 8.4Z" />
      <path d="M9 8.4V7a3 3 0 0 1 6 0v1.4" />
      <path d="m9.3 14 2 2 3.6-3.7" />
    </>
  ),
  "kmk-wms": (
    <>
      <path d="M3.6 9.8 12 4.8l8.4 5" />
      <path d="M5.6 9v10.4h12.8V9" />
      <path d="M9.2 19.4v-3.6M12 19.4v-5.8M14.8 19.4v-2.4" />
    </>
  ),
};

/**
 * Product tile: glossy brand-blue rounded square with the product's glyph (or its initial),
 * a soft top highlight and a coloured shadow.
 */
export function ProductMonogram({
  p,
  className = "",
  white = false,
}: {
  p: Product;
  className?: string;
  white?: boolean;
}) {
  const glyph = glyphs[p.key];
  return (
    <span
      aria-hidden="true"
      className={`relative grid shrink-0 place-items-center overflow-hidden rounded-[30%] font-display font-bold text-white ${
        white
          ? ""
          : "shadow-[0_10px_24px_-10px_rgba(58,107,214,0.8),inset_0_1px_0_rgba(255,255,255,0.45)]"
      } ${className}`}
      style={{
        background: white
          ? "rgba(255,255,255,0.18)"
          : "linear-gradient(150deg, #7aa3f5 0%, #457ae7 45%, #2f5fcc 100%)",
      }}
    >
      {/* glass highlight across the top half */}
      <span className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/35 to-white/0" />
      {glyph ? (
        <svg
          viewBox="0 0 24 24"
          className="relative h-[58%] w-[58%] drop-shadow-[0_1px_1px_rgba(20,40,110,0.35)]"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.9}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {glyph}
        </svg>
      ) : (
        <span className="relative leading-none">{p.monogram}</span>
      )}
    </span>
  );
}

const sizes = {
  sm: "text-[1.25rem]",
  md: "text-[1.75rem]",
  lg: "text-[clamp(2.1rem,1.1rem+2.2vw,3.4rem)]",
};

/** Product wordmark: the name alone, set in matte black like every title on the site. */
export default function ProductMark({ p, size = "md", tone = "color" }: Props) {
  return (
    <span
      className={`inline-block whitespace-pre font-display font-bold leading-none ${sizes[size]}`}
      aria-label={p.name}
      role="img"
    >
      <span className={tone === "white" ? "text-white" : "text-ink"}>
        {p.mark[0]}
      </span>
      <span className={tone === "white" ? "text-white/80" : "text-ink"}>
        {p.mark[1]}
      </span>
    </span>
  );
}
