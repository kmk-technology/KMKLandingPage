import { useRef } from "react";
import { Link, useParams } from "react-router-dom";
import {
  benefits,
  medicalClients,
  products,
  services,
} from "../../content/site";
import { useLang } from "../../i18n/context";
import { usePageMotion } from "../../components/site/motion";
import { contactFor } from "../../components/site/pages";
import ProductArt from "../../components/site/ProductArt";
import SiteLayout from "../../components/site/SiteLayout";
import Icon, { type IconName } from "../../components/ui/Icon";
import NotFound from "../error/404";

/*
 * One product: a breadcrumb; the name, its line, the description and the buttons beside the
 * product picture in a padded rounded frame; a row of quick facts; the benefits as four icon
 * cards; a blue call to action; the other products in the same card style as the products page.
 */
export default function ProductPage() {
  const { slug } = useParams();
  const { t, lang } = useLang();
  const vi = lang === "vi";
  const root = useRef<HTMLDivElement>(null);
  usePageMotion(root, [lang, slug]);
  const index = products.findIndex((p) => p.key === slug);
  if (index < 0) return <NotFound />;
  const p = products[index];
  const others = products.filter((x) => x.key !== p.key);

  const facts: { v: string; l: string }[] =
    p.key === "medifam"
      ? [
          {
            v: String(medicalClients.length),
            l: vi ? "cơ sở y tế đang dùng" : "healthcare providers",
          },
          {
            v: vi ? "Phòng khám" : "Clinics",
            l: vi
              ? "đa khoa, chuyên khoa, bác sĩ gia đình"
              : "general, specialist and family",
          },
          {
            v: "medifam.vn",
            l: vi ? "website chính thức" : "official website",
          },
        ]
      : p.key === "kmk-sales"
        ? [
            {
              v: vi ? "Bán lẻ" : "Retail",
              l: vi ? "cửa hàng, chuỗi cửa hàng" : "shops and chains",
            },
            {
              v: vi ? "Mọi lúc" : "Anywhere",
              l: vi ? "làm việc mọi lúc, mọi nơi" : "work any time, anywhere",
            },
            {
              v: "kmksales.vn",
              l: vi ? "website chính thức" : "official website",
            },
          ]
        : [
            { v: "Microsoft", l: vi ? "nền tảng triển khai" : "platform" },
            { v: "Power Apps", l: vi ? "ứng dụng nội bộ" : "internal apps" },
            {
              v: "AI",
              l: vi ? "trợ lý và tự động hóa" : "assistants and automation",
            },
          ];
  const benefitIcons: IconName[] = ["layers", "shield", "spark", "server"];
  const productIcon: Record<string, IconName> = {
    medifam: "shield",
    "kmk-sales": "layers",
    "digital-info": "spark",
  };
  const btn =
    "inline-flex min-h-[50px] items-center gap-2 rounded-full px-6 text-[0.9375rem] font-medium transition-colors";
  const h2 =
    "reveal-h font-display text-[clamp(1.8rem,1.3rem+1.6vw,2.6rem)] font-normal leading-[1.2] text-ink";

  return (
    <SiteLayout
      title={`${p.name} - ${t(p.category)} | KMK Technology`}
      description={t(p.description)}
    >
      <div ref={root}>
        {/* ================= opening ================= */}
        <section className="pb-[clamp(2.5rem,6vh,4rem)] pt-[clamp(2rem,5vh,3.5rem)]">
          <div className="shell">
            <nav
              aria-label={vi ? "Đường dẫn" : "Breadcrumb"}
              className="page-in"
            >
              <ol className="flex flex-wrap items-center gap-2 text-[0.875rem] text-ink/55">
                <li>
                  <Link to="/" className="hover:text-brand">
                    {vi ? "Trang chủ" : "Home"}
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link to="/products" className="hover:text-brand">
                    {vi ? "Sản phẩm & Dịch vụ" : "Products & Services"}
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-ink">
                  {p.name}
                </li>
              </ol>
            </nav>

            <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
              <div>
                <span className="page-in inline-flex items-center gap-2 rounded-full bg-brand-tint px-4 py-1.5 text-[0.875rem] font-medium text-brand">
                  <Icon name={productIcon[p.key] ?? "layers"} />
                  {t(p.category)}
                </span>
                <h1 className="page-h mt-5 font-display text-[clamp(2.6rem,1.8rem+2.6vw,4.25rem)] font-medium leading-[1.05] text-ink">
                  {p.name}
                </h1>
                <p className="page-in mt-5 max-w-[34rem] text-[1.0625rem] leading-relaxed text-ink/70">
                  {t(p.description)}
                </p>
                <div className="page-in mt-8 flex flex-wrap items-center gap-3">
                  <Link
                    to={contactFor(p.key)}
                    className={`${btn} bg-brand text-white shadow-[0_14px_30px_-14px_rgba(35,121,229,0.9)] hover:bg-brand-deep`}
                  >
                    {vi ? "Đăng ký demo" : "Request a demo"}
                    <Icon name="arrowRight" />
                  </Link>
                  {p.href ? (
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${btn} bg-white text-ink ring-1 ring-ink/12 hover:text-brand hover:ring-brand`}
                    >
                      {p.hrefLabel}
                      <Icon name="arrowUpRight" />
                      <span className="sr-only">
                        {vi ? " (mở tab mới)" : " (opens in a new tab)"}
                      </span>
                    </a>
                  ) : null}
                </div>
              </div>
              <div className="page-in rounded-[2rem] bg-[#f4f7fc] p-3">
                <div className="aspect-[16/10] overflow-hidden rounded-[1.5rem] bg-white">
                  <ProductArt p={p} index={index} vi={vi} />
                </div>
              </div>
            </div>

            {/* quick facts */}
            <dl className="fade-group mt-12 grid gap-4 sm:grid-cols-3">
              {facts.map((f) => (
                <div
                  key={f.l}
                  className="flex flex-col-reverse rounded-[1.5rem] border border-ink/[0.07] bg-white px-6 py-5"
                >
                  <dt className="mt-1 text-[0.9375rem] text-ink/60">{f.l}</dt>
                  <dd className="font-display text-[1.75rem] font-medium leading-tight text-brand">
                    {f.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ================= benefits ================= */}
        <section
          aria-labelledby="bn-title"
          className="mx-2 rounded-[2rem] bg-[#f5f6f8] py-[clamp(4rem,10vh,6rem)] sm:mx-4 lg:mx-6"
        >
          <div className="shell">
            <div className="text-center">
              <h2 id="bn-title" className={h2}>
                {vi ? "Lợi ích khi hợp tác cùng " : "Why work with "}
                <span className="text-brand">KMK Technology</span>
              </h2>
            </div>
            <ul className="fade-group mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {benefits.map((b, i) => (
                <li
                  key={b.title.en}
                  className="flex flex-col rounded-[1.5rem] bg-white p-7"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-tint text-[1.25rem] text-brand">
                    <Icon name={benefitIcons[i]} />
                  </span>
                  <h3 className="mt-6 text-[1.1875rem] font-semibold leading-snug text-ink">
                    {t(b.title)}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink/65">
                    {t(b.body)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ================= call to action ================= */}
        <section
          aria-labelledby="cta-title"
          className="py-[clamp(4rem,10vh,6rem)]"
        >
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
                      ? `Bắt đầu với ${p.name} ngay hôm nay`
                      : `Get started with ${p.name}`}
                  </h2>
                  <p className="mt-3 max-w-[34rem] text-[1rem] leading-relaxed text-white/85">
                    {vi
                      ? "Đội ngũ KMK sẽ tư vấn và demo sản phẩm theo đúng nhu cầu doanh nghiệp của bạn."
                      : "The KMK team will advise you and demo the product for your business's needs."}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {services.slice(0, 3).map((sv) => (
                      <li
                        key={sv.key}
                        className="rounded-full px-3 py-1 text-[0.8125rem] [background:rgba(255,255,255,0.15)]"
                      >
                        {t(sv.title)}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="lg:justify-self-end">
                  <Link
                    to={contactFor(p.key)}
                    className="group inline-flex min-h-[58px] items-center gap-3 rounded-full bg-white pl-7 pr-2 text-[1rem] font-medium text-brand shadow-[0_18px_36px_-14px_rgba(10,40,110,0.6)]"
                  >
                    {vi ? "Liên hệ tư vấn" : "Contact us"}
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-brand text-white transition-transform duration-500 group-hover:rotate-[-45deg]">
                      <Icon name="arrowRight" />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= other products ================= */}
        <section
          aria-labelledby="more-title"
          className="pb-[clamp(3rem,8vh,5rem)]"
        >
          <div className="shell">
            <h2 id="more-title" className={`${h2} text-center`}>
              {vi ? "Sản phẩm khác của " : "More from "}
              <span className="text-brand">KMK</span>
            </h2>
            <ul className="fade-group mx-auto mt-12 grid max-w-[60rem] gap-6 md:grid-cols-2">
              {others.map((o) => (
                <li key={o.key}>
                  <Link
                    to={`/product/${o.key}`}
                    className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-ink/[0.08] bg-white p-3 transition-shadow duration-500 hover:shadow-[0_24px_50px_-32px_rgba(20,40,90,0.45)]"
                  >
                    <span className="block aspect-[16/9] overflow-hidden rounded-[1.25rem] bg-[#f4f7fc]">
                      <span className="block h-full w-full transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.04]">
                        <ProductArt p={o} vi={vi} />
                      </span>
                    </span>
                    <span className="flex flex-1 flex-col px-4 pb-3 pt-5">
                      <span className="font-display text-[1.5rem] text-ink group-hover:text-brand">
                        {o.name}
                      </span>
                      <span className="mt-1 flex-1 text-[0.9375rem] text-brand">
                        {t(o.category)}
                      </span>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-ink">
                        {vi ? "Xem chi tiết" : "Learn more"}
                        <Icon
                          name="arrowRight"
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}
