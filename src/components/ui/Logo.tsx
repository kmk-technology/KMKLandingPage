type Props = { className?: string };

/** The official KMK Technology logo (mark + wordmark + tagline), trimmed from public/logo/kmk/long-logo.png. */
export default function Logo({ className = "h-9" }: Props) {
  return (
    <img
      src="/logo/kmk/long-logo-trim.png"
      alt="KMK Technology - Simplify your business"
      width={800}
      height={191}
      decoding="async"
      className={`w-auto select-none ${className}`}
      draggable={false}
    />
  );
}
