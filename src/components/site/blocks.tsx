import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import Icon from "../ui/Icon";

/*
 * The building blocks the inner pages share, so they all read as one site: the centred section
 * title, the bordered picture card, the light-blue block, the grey band and the blue call to
 * action.
 */

/** Vertical rhythm between sections. */
export const sectionY = "py-[clamp(4.5rem,11vh,7rem)]";

/** Centred section title in a regular weight; put the words to stress in a .text-brand span. */
export function SectionTitle({
  id,
  children,
}: {
  id?: string;
  children: ReactNode;
}) {
  return (
    <h2
      id={id}
      className="reveal-h mx-auto max-w-[30ch] text-center font-display text-[clamp(2rem,1.4rem+2.2vw,3.25rem)] font-normal leading-[1.22] text-ink"
    >
      {children}
    </h2>
  );
}

/** A short centred line under a section title. */
export function SectionLead({ children }: { children: ReactNode }) {
  return (
    <p className="fade mx-auto mt-4 max-w-[46rem] text-center text-[1.0625rem] leading-[1.75] text-ink/65">
      {children}
    </p>
  );
}

/** Light-grey band set in from the screen edges. */
export const greyBand = `mx-2 rounded-[2rem] bg-[#f5f6f8] sm:mx-4 lg:mx-6 ${sectionY}`;

/** The light-blue rounded block with two faint rings in its corner. */
export function BlueBlock({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[2rem] bg-[linear-gradient(180deg,#f3f8ff_0%,#eaf2fe_100%)] ${className}`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 aspect-square w-[28rem] rounded-full border border-brand/10"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-10 aspect-square w-[16rem] rounded-full border border-brand/10"
      />
      <div className="relative">{children}</div>
    </div>
  );
}

/**
 * A white card with a hairline border: the picture in a rounded frame, then the title (kept to
 * the same height across a row so the text below lines up) and the rest.
 */
export function PictureCard({
  picture,
  ratio = "aspect-[4/3]",
  title,
  titleId,
  children,
  evenTitle = true,
  as: Tag = "li",
}: {
  picture: ReactNode;
  ratio?: string;
  title: ReactNode;
  titleId?: string;
  children?: ReactNode;
  /** Reserve two lines for the title so the text below lines up across a row. */
  evenTitle?: boolean;
  as?: "li" | "article";
}) {
  return (
    <Tag
      aria-labelledby={Tag === "article" ? titleId : undefined}
      className="group flex h-full flex-col rounded-[1.75rem] border border-ink/[0.08] bg-white p-3 transition-shadow duration-500 hover:shadow-[0_24px_50px_-32px_rgba(20,40,90,0.45)]"
    >
      <div
        className={`${ratio} overflow-hidden rounded-[1.25rem] bg-[#f4f7fc]`}
      >
        <div className="h-full w-full transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.04]">
          {picture}
        </div>
      </div>
      <div className="flex flex-1 flex-col px-4 pb-4 pt-5">
        <h3
          id={titleId}
          className={`text-[1.1875rem] font-medium leading-[1.35] text-ink ${evenTitle ? "lg:min-h-[2.7em]" : ""}`}
        >
          {title}
        </h3>
        {children}
      </div>
    </Tag>
  );
}

/** Body text inside a PictureCard. */
export function CardText({ children }: { children: ReactNode }) {
  return (
    <p className="mt-2.5 text-[0.9375rem] leading-[1.7] text-ink/65">
      {children}
    </p>
  );
}

/** The blue call to action that closes each page. */
export function CtaBand({
  title,
  text,
  primary,
  secondary,
}: {
  title: ReactNode;
  text: ReactNode;
  primary: { to: string; label: ReactNode };
  secondary?: { to: string; label: ReactNode };
}) {
  return (
    <section aria-labelledby="cta-title">
      <div className="shell">
        <div className="fade relative overflow-hidden rounded-[2rem] bg-[linear-gradient(120deg,#1a5fc0,#2379e5_55%,#4f95ec)] px-[clamp(1.75rem,5vw,4rem)] py-[clamp(2.5rem,6vh,3.75rem)] text-white">
          <span
            aria-hidden="true"
            className="absolute -right-[6%] top-1/2 aspect-square w-[34%] -translate-y-1/2 rounded-full border border-white/20"
          />
          <span
            aria-hidden="true"
            className="absolute -right-[2%] top-1/2 aspect-square w-[22%] -translate-y-1/2 rounded-full border border-white/25"
          />
          <div className="relative grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <h2
                id="cta-title"
                className="font-display text-[clamp(1.6rem,1.2rem+1.4vw,2.4rem)] font-medium leading-[1.25]"
              >
                {title}
              </h2>
              <p className="mt-3 max-w-[34rem] text-[1rem] leading-[1.7] text-white/85">
                {text}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link
                to={primary.to}
                className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-white px-6 text-[0.9375rem] font-medium text-brand transition-colors hover:bg-brand-tint"
              >
                {primary.label}
                <Icon name="arrowRight" />
              </Link>
              {secondary ? (
                <Link
                  to={secondary.to}
                  className="inline-flex min-h-[48px] items-center rounded-full px-6 text-[0.9375rem] font-medium text-white ring-1 ring-white/50 transition-colors hover:bg-white/10"
                >
                  {secondary.label}
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
