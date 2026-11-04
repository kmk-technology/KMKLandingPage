import { useRef } from "react";
import { Link } from "react-router-dom";
import {
  benefits,
  clientCount,
  corporateClients,
  medicalClients,
} from "../../content/site";
import { useLang } from "../../i18n/context";
import { usePageMotion } from "../../components/site/motion";
import SiteLayout, { PageHero } from "../../components/site/SiteLayout";
import Icon from "../../components/ui/Icon";

/*
 * Clients, in the same style as the products and about pages: the centred title; the figures
 * as white cards on a light-blue block with a row of drifting logos; the enterprise clients as
 * four bordered cards (logo in a rounded frame); the healthcare providers as equal logo tiles
 * on a grey band; why clients work with KMK as picture cards; and the blue call to action.
 */
export default function ClientsPage() {
  const { t, lang } = useLang();
  const vi = lang === "vi";
  const root = useRef<HTMLDivElement>(null);
  usePageMotion(root, [lang]);

  const figures = [
    { v: clientCount, s: "+", l: vi ? "Khách hàng tin dùng" : "Clients" },
    {
      v: medicalClients.length,
      s: "",
      l: vi ? "Cơ sở y tế" : "Healthcare providers",
    },
    {
      v: corporateClients.length,
      s: "",
      l: vi ? "Khách hàng doanh nghiệp" : "Enterprise clients",
    },
    { v: 11, s: "+", l: vi ? "Năm kinh nghiệm" : "Years of experience" },
  ];
  const logos = [...corporateClients, ...medicalClients];

  const h2 =
    "reveal-h mx-auto max-w-[30ch] text-center font-display text-[clamp(2rem,1.4rem+2.2vw,3.25rem)] font-normal leading-[1.22] text-ink";
  const section = "py-[clamp(4.5rem,11vh,7rem)]";

  return (
    <SiteLayout
      title={vi ? "Khách hàng | KMK Technology" : "Clients | KMK Technology"}
      description={
        vi
          ? `${clientCount}+ doanh nghiệp và cơ sở y tế tin dùng giải pháp của KMK Technology.`
          : `${clientCount}+ businesses and healthcare providers trust KMK Technology.`
      }
    >
      <div ref={root}>
        <PageHero
          title={
            vi ? (
              <>
                Khách hàng & <span className="text-brand">đối tác tin cậy</span>
              </>
            ) : (
              <>
                Clients & <span className="text-brand">trusted partners</span>
              </>
            )
          }
          sub={
            vi
              ? "Niềm tin từ các doanh nghiệp hàng đầu và sự lựa chọn của hàng loạt cơ sở y tế uy tín là minh chứng rõ ràng nhất cho chất lượng và hiệu quả mà KMK Technology mang lại."
              : "The trust of leading companies and the choice of many respected healthcare providers are the clearest proof of the quality and results KMK Technology delivers."
          }
        />

        {/* ================= figures and drifting logos on a light-blue block ================= */}
        <section aria-label={vi ? "Con số" : "Figures"}>
          <div className="shell">
            <div className="relative overflow-hidden rounded-[2rem] bg-[linear-gradient(180deg,#f3f8ff_0%,#eaf2fe_100%)] px-[clamp(1rem,3.5vw,3rem)] pb-[clamp(1.75rem,4vh,2.75rem)] pt-[clamp(1rem,3.5vw,3rem)]">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 -top-24 aspect-square w-[28rem] rounded-full border border-brand/10"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 -top-10 aspect-square w-[16rem] rounded-full border border-brand/10"
              />
              <dl className="fade-group relative grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
                {figures.map((f) => (
                  <div
                    key={f.l}
                    className="tilt flex flex-col-reverse rounded-[1.5rem] bg-white p-[clamp(1.25rem,2.5vw,2rem)] shadow-[0_20px_50px_-35px_rgba(20,60,140,0.5)]"
                  >
                    <dt className="mt-3 text-[0.9375rem] leading-snug text-ink/65">
                      {f.l}
                    </dt>
                    <dd className="font-display text-[clamp(2.5rem,1.9rem+2vw,3.75rem)] font-normal leading-none text-brand">
                      <span data-count={f.v} data-pad="2">
                        {String(f.v).padStart(2, "0")}
                      </span>
                      {f.s}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="relative mt-8 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
                <ul className="flex w-max animate-marquee items-center gap-4 [--marquee-duration:90s] hover:[animation-play-state:paused]">
                  {[...logos, ...logos].map((c, i) => (
                    <li
                      key={i}
                      aria-hidden={i >= logos.length}
                      className="h-20 w-36 shrink-0 rounded-2xl bg-white p-4"
                    >
                      <img
                        src={c.logo}
                        alt={i < logos.length ? c.name : ""}
                        loading="lazy"
                        className="h-full w-full object-contain"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ================= enterprise clients ================= */}
        <section aria-labelledby="ent-title" className={section}>
          <div className="shell">
            <h2 id="ent-title" className={h2}>
              {vi ? "Doanh nghiệp " : "Businesses that "}
              <span className="text-brand">
                {vi ? "tin chọn KMK" : "choose KMK"}
              </span>
            </h2>
            <ul className="cl-grid mt-14 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
              {corporateClients.map((c) => (
                <li
                  key={c.name}
                  className="cl-logo group rounded-[1.75rem] border border-ink/[0.08] bg-white p-3 transition-shadow duration-500 hover:shadow-[0_24px_50px_-32px_rgba(20,40,90,0.45)]"
                >
                  <div className="relative aspect-[3/2] overflow-hidden rounded-[1.25rem] bg-[#f4f7fc]">
                    <img
                      src={c.logo}
                      alt={c.name}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-contain p-[clamp(1.5rem,3.5vw,2.75rem)] transition-transform duration-700 ease-out-expo group-hover:scale-[1.06]"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ================= healthcare providers on a grey band ================= */}
        <section
          aria-labelledby="med-title"
          className={`mx-2 rounded-[2rem] bg-[#f5f6f8] sm:mx-4 lg:mx-6 ${section}`}
        >
          <div className="shell">
            <h2 id="med-title" className={h2}>
              {vi ? "Cơ sở y tế " : "Healthcare providers "}
              <span className="text-brand">
                {vi ? "tin dùng Medifam" : "on Medifam"}
              </span>
            </h2>
            <ul className="cl-grid mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-6">
              {medicalClients.map((c) => (
                <li
                  key={c.name}
                  title={c.name}
                  className="cl-logo group aspect-[3/2] rounded-[1.25rem] bg-white p-[clamp(1rem,2vw,1.5rem)] transition-[transform,box-shadow] duration-500 ease-out-expo hover:-translate-y-1 hover:shadow-[0_20px_40px_-26px_rgba(20,40,90,0.4)]"
                >
                  <img
                    src={c.logo}
                    alt={c.name}
                    loading="lazy"
                    className="h-full w-full object-contain"
                  />
                </li>
              ))}
            </ul>
            <p className="fade mt-10 text-center">
              <Link
                to="/product/medifam"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-white px-5 text-[0.9375rem] font-medium text-ink ring-1 ring-ink/10 transition-colors hover:text-brand hover:ring-brand"
              >
                {vi ? "Tìm hiểu Medifam" : "About Medifam"}
                <Icon name="arrowRight" />
              </Link>
            </p>
          </div>
        </section>

        {/* ================= why clients work with KMK ================= */}
        <section aria-labelledby="why-title" className={section}>
          <div className="shell">
            <h2 id="why-title" className={h2}>
              {vi ? "Lợi ích khi hợp tác cùng " : "Why work with "}
              <span className="text-brand">KMK</span>
            </h2>
            <ul className="fade-group mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {benefits.map((b, i) => (
                <li
                  key={b.title.en}
                  className="group flex flex-col rounded-[1.75rem] border border-ink/[0.08] bg-white p-3 transition-shadow duration-500 hover:shadow-[0_24px_50px_-32px_rgba(20,40,90,0.45)]"
                >
                  <div
                    aria-hidden="true"
                    className="aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-[#f4f7fc]"
                  >
                    <img
                      src={`/benefits/${i + 1}.webp`}
                      alt=""
                      width={1448}
                      height={1086}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col px-4 pb-4 pt-5">
                    <h3 className="text-[1.1875rem] font-medium leading-[1.35] text-ink lg:min-h-[2.7em]">
                      {t(b.title)}
                    </h3>
                    <p className="mt-2.5 text-[0.9375rem] leading-[1.7] text-ink/65">
                      {t(b.body)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ================= call to action ================= */}
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
                    className="font-display text-[clamp(1.6rem,1.2rem+1.4vw,2.4rem)] font-medium leading-tight"
                  >
                    {vi
                      ? "Trở thành khách hàng tiếp theo của KMK"
                      : "Become KMK's next client"}
                  </h2>
                  <p className="mt-3 max-w-[34rem] text-[1rem] leading-relaxed text-white/85">
                    {vi
                      ? "Chia sẻ nhu cầu của bạn, đội ngũ KMK sẽ tư vấn giải pháp phù hợp."
                      : "Tell us what you need and the KMK team will suggest the right solution."}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 lg:justify-end">
                  <Link
                    to="/contact"
                    className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-white px-6 text-[0.9375rem] font-medium text-brand transition-colors hover:bg-brand-tint"
                  >
                    {vi ? "Liên hệ tư vấn" : "Contact us"}
                    <Icon name="arrowRight" />
                  </Link>
                  <Link
                    to="/products"
                    className="inline-flex min-h-[48px] items-center rounded-full px-6 text-[0.9375rem] font-medium text-white ring-1 ring-white/50 transition-colors hover:bg-white/10"
                  >
                    {vi ? "Xem sản phẩm" : "See products"}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}
