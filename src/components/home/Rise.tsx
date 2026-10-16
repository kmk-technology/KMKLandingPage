/**
 * Heading text whose words rise out of masks when the heading scrolls in (animated by
 * revealIn via `.rise`). Parts marked `accent` are drawn in the brand blue.
 */
export default function Rise({
  parts,
}: {
  parts: { t: string; accent?: boolean }[];
}) {
  const words = parts.flatMap((p) =>
    p.t
      .split(" ")
      .filter(Boolean)
      .map((w) => ({ w, accent: p.accent })),
  );
  return (
    <>
      {words.map((x, i) => (
        <span key={i}>
          <span className="rt-mask">
            <span className={`rt-word rise-w ${x.accent ? "text-brand" : ""}`}>
              {x.w}
            </span>
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </>
  );
}
