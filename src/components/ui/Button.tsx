import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import Icon, { type IconName } from "./Icon";

type Variant = "primary" | "secondary" | "dark" | "onBrand" | "outlineWhite";

const base =
  "group relative inline-flex min-h-[48px] items-center justify-center gap-3 overflow-hidden rounded-lg px-6 text-[0.9375rem] font-semibold transition-[color,background-color,border-color,box-shadow] duration-300 ease-out-expo disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-brand text-white shadow-glow hover:bg-brand-deep",
  secondary:
    "border border-line-strong bg-canvas text-ink hover:border-ink/30 hover:bg-mist",
  dark: "bg-brand text-white hover:bg-brand-deep",
  onBrand:
    "bg-white text-brand-deep shadow-[0_10px_30px_-12px_rgba(4,20,60,0.5)] hover:bg-brand-tint",
  outlineWhite:
    "border border-white/45 text-white hover:border-white hover:bg-white/10",
};

function Content({ children, icon }: { children: ReactNode; icon?: IconName }) {
  return (
    <>
      <span className="relative">{children}</span>
      {icon ? (
        <span
          className="relative grid h-5 w-5 place-items-center overflow-hidden"
          aria-hidden="true"
        >
          <Icon
            name={icon}
            className="absolute text-[1.1rem] transition-transform duration-500 ease-out-expo group-hover:translate-x-[150%]"
          />
          <Icon
            name={icon}
            className="absolute -translate-x-[150%] text-[1.1rem] transition-transform duration-500 ease-out-expo group-hover:translate-x-0"
          />
        </span>
      ) : null}
    </>
  );
}

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  icon?: IconName;
};

export function ButtonLink({
  variant = "primary",
  icon,
  className = "",
  children,
  ...rest
}: LinkProps) {
  return (
    <a className={`${base} ${variants[variant]} ${className}`} {...rest}>
      <Content icon={icon}>{children}</Content>
    </a>
  );
}

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  icon?: IconName;
};

export function Button({
  variant = "primary",
  icon,
  className = "",
  children,
  type = "button",
  ...rest
}: BtnProps) {
  return (
    <button
      type={type}
      className={`${base} ${variants[variant]} ${className}`}
      {...rest}
    >
      <Content icon={icon}>{children}</Content>
    </button>
  );
}
