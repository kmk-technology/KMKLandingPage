import { useRef } from "react";
import { company } from "../../content/site";
import ContactForm from "../../features/contact/ContactForm";
import { useLang } from "../../i18n/context";
import { gsap, MOTION_OK, useGSAP } from "../../lib/gsap";
import Icon, { type IconName } from "../ui/Icon";
import Rise from "./Rise";
import { riseIn, revealIn } from "./reveal";

/*
 * Contact - two columns. Left (sticky on wide screens): the title, a short line and the ways to
 * reach KMK as a list of clickable rows (phone, email, office on Google Maps). Right: the
 * enquiry form on a white card. Rounded bottom corners let the footer show behind it.
 */
export default function Contact() {
  const { t, lang } = useLang();
  const vi = lang === "vi";
  const root = useRef<HTMLElement>(null);

  const rows: {
    icon: IconName;
    label: string;
    value: string;
    note?: string;
    href: string;
    external?: boolean;
  }[] = [
    {
      icon: "phone",
      label: vi ? "Điện thoại" : "Phone",
      value: company.phoneDisplay,
      note: company.phoneContact,
      href: company.phoneHref,
    },
    {
      icon: "mail",
      label: "Email",
      value: company.email,
      href: `mailto:${company.email}`,
    },
    {
      icon: "pin",
      label: vi ? "Văn phòng" : "Office",
      value: t(company.address),
      note: vi ? "Xem trên Google Maps" : "View on Google Maps",
      href: company.mapHref,
      external: true,
    },
  ];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        revealIn(root.current!);
        riseIn(root.current!);
        gsap.from(".ct-row", {
          x: -24,
          autoAlpha: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".ct-rows",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
        gsap.fromTo(
          ".ct-card",
          { y: 60 },
          {
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: ".ct-card",
              start: "top bottom",
              end: "top 45%",
              scrub: 0.6,
            },
          },
        );
      });
    },
    { scope: root, dependencies: [lang], revertOnUpdate: true },
  );

  return (
    <section
      ref={root}
      id="contact"
      aria-labelledby="contact-title"
      className="relative overflow-hidden rounded-b-[clamp(2rem,4vw,3.5rem)] bg-[linear-gradient(180deg,#f6f8fc_0%,#eef2fb_100%)] py-[clamp(5rem,12vh,8rem)] shadow-[0_40px_80px_-40px_rgba(20,40,90,0.35)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[15vmax] -top-[20vmax] h-[55vmax] w-[55vmax] rounded-full bg-[radial-gradient(circle,rgba(69,122,231,0.12),transparent_62%)]"
      />
      <div className="shell relative grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* left: title + ways to reach us */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+2.5rem)]">
            <p className="rv text-[0.8125rem] font-semibold uppercase text-brand">
              {vi ? "Liên hệ" : "Contact"}
            </p>
            <h2
              id="contact-title"
              className="rise mt-3 font-display text-[clamp(2.1rem,1.3rem+2.4vw,3.6rem)] font-semibold leading-[1.06] text-ink"
            >
              <Rise
                parts={
                  vi
                    ? [
                        { t: "Để KMK đồng hành cùng" },
                        { t: "doanh nghiệp của bạn.", accent: true },
                      ]
                    : [
                        { t: "Let KMK support" },
                        { t: "your business.", accent: true },
                      ]
                }
              />
            </h2>
            <p className="rv mt-5 max-w-[30rem] text-[1.0625rem] leading-relaxed text-ink/60">
              {vi
                ? "Chia sẻ nhu cầu của bạn, đội ngũ KMK sẽ liên hệ tư vấn trong thời gian sớm nhất."
                : "Tell us about your needs and our team will get back to you shortly."}
            </p>

            <address className="ct-rows mt-10 not-italic">
              <ul className="divide-y divide-ink/10 border-y border-ink/10">
                {rows.map((r) => (
                  <li key={r.label} className="ct-row">
                    <a
                      href={r.href}
                      {...(r.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="group -mx-3 flex items-center gap-4 rounded-2xl px-3 py-5 transition-colors duration-300 hover:bg-white/80"
                    >
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white text-[1.15rem] text-brand shadow-[0_10px_24px_-14px_rgba(20,40,90,0.4)] ring-1 ring-ink/[0.05] transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                        <Icon name={r.icon} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[0.8125rem] text-ink/50">
                          {r.label}
                        </span>
                        <span className="mt-0.5 block break-words text-[1.0625rem] font-semibold leading-snug text-ink">
                          {r.value}
                        </span>
                        {r.note ? (
                          <span className="mt-0.5 block text-[0.875rem] text-ink/50">
                            {r.note}
                          </span>
                        ) : null}
                      </span>
                      <Icon
                        name={r.external ? "arrowUpRight" : "arrowRight"}
                        className="shrink-0 text-[1.1rem] text-ink/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-brand"
                      />
                      {r.external ? (
                        <span className="sr-only">
                          {vi ? " (mở Google Maps)" : " (opens Google Maps)"}
                        </span>
                      ) : null}
                    </a>
                  </li>
                ))}
              </ul>
            </address>
          </div>
        </div>

        {/* right: the enquiry form */}
        <div className="lg:col-span-7">
          <div className="ct-card rounded-[2rem] bg-white p-6 shadow-[0_50px_100px_-60px_rgba(20,40,90,0.55)] ring-1 ring-ink/[0.05] sm:p-10">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-3 border-b border-ink/10 pb-6">
              <div>
                <h3 className="text-[1.5rem] font-semibold text-ink">
                  {vi ? "Gửi yêu cầu tư vấn" : "Request a consultation"}
                </h3>
                <p className="mt-1 text-[0.9375rem] text-ink/55">
                  {vi
                    ? "Các mục có dấu * là bắt buộc."
                    : "Fields marked * are required."}
                </p>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
