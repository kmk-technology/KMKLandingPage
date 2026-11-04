import { useRef } from "react";
import { Link } from "react-router-dom";
import { about, products, services } from "../../content/site";
import { useLang } from "../../i18n/context";
import { usePageMotion } from "../../components/site/motion";
import { contactFor } from "../../components/site/pages";
import ProductArt from "../../components/site/ProductArt";
import SiteLayout, { PageHero } from "../../components/site/SiteLayout";
import {
  CardText,
  CtaBand,
  greyBand,
  PictureCard,
  SectionTitle,
} from "../../components/site/blocks";
import Icon from "../../components/ui/Icon";

/*
 * Products & services: the centred title; the three products as picture cards with a contact
 * button (which pre-selects the product in the form) and a link to the product page; the four
 * services as picture cards on the grey band; and the blue call to action.
 */
export default function ProductsPage() {
  const { t, lang } = useLang();
  const vi = lang === "vi";
  const root = useRef<HTMLDivElement>(null);
  usePageMotion(root, [lang]);

  const btn =
    "inline-flex min-h-[42px] items-center gap-1.5 rounded-full px-4 text-[0.875rem] font-medium transition-colors";

  return (
    <SiteLayout
      title={
        vi
          ? "Sản phẩm & Dịch vụ | KMK Technology"
          : "Products & Services | KMK Technology"
      }
      description={
        vi
          ? "Medifam, KMK Sales, Digital Information và các dịch vụ phần mềm, ERP, chuyển đổi số, gia công phần mềm của KMK Technology."
          : "Medifam, KMK Sales, Digital Information and KMK Technology's software, ERP, digital transformation and outsourcing services."
      }
    >
      <div ref={root}>
        <PageHero
          title={
            vi ? (
              <>
                Sản phẩm cho doanh nghiệp Việt,{" "}
                <span className="text-brand">vận hành đơn giản</span>
              </>
            ) : (
              <>
                Products for Vietnamese businesses,{" "}
                <span className="text-brand">simple to run</span>
              </>
            )
          }
          sub={t(about.manifesto)}
        />

        {/* ================= products ================= */}
        <section
          aria-label={vi ? "Sản phẩm" : "Products"}
          className="pb-[clamp(4.5rem,11vh,7rem)]"
        >
          <ul className="shell fade-group grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p, i) => (
              <li key={p.key}>
                <PictureCard
                  as="article"
                  titleId={`pr-${p.key}`}
                  ratio="aspect-[16/10]"
                  evenTitle={false}
                  picture={<ProductArt p={p} index={i} vi={vi} />}
                  title={<span className="text-[1.5rem]">{p.name}</span>}
                >
                  <p className="mt-1 text-[0.9375rem] font-medium text-brand">
                    {t(p.category)}
                  </p>
                  <div className="flex-1">
                    <CardText>{t(p.description)}</CardText>
                  </div>
                  <div className="mt-6 flex flex-wrap items-center gap-2">
                    <Link
                      to={contactFor(p.key)}
                      className={`${btn} bg-brand text-white hover:bg-brand-deep`}
                    >
                      {vi ? "Liên hệ tư vấn" : "Contact us"}
                      <span className="sr-only">: {p.name}</span>
                    </Link>
                    <Link
                      to={`/product/${p.key}`}
                      className={`${btn} text-ink ring-1 ring-ink/12 hover:text-brand hover:ring-brand`}
                    >
                      {vi ? "Xem chi tiết" : "Learn more"}
                      <Icon name="arrowRight" />
                      <span className="sr-only">: {p.name}</span>
                    </Link>
                  </div>
                </PictureCard>
              </li>
            ))}
          </ul>
        </section>

        {/* ================= services ================= */}
        <section id="services" aria-labelledby="sv-title" className={greyBand}>
          <div className="shell">
            <SectionTitle id="sv-title">
              {vi
                ? "Giải pháp giúp doanh nghiệp vận hành hiệu quả, "
                : "Solutions that help businesses run efficiently and "}
              <span className="text-brand">
                {vi ? "tăng trưởng bền vững" : "grow sustainably"}
              </span>
            </SectionTitle>
            <ul className="fade-group mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((sv) => (
                <PictureCard
                  key={sv.key}
                  titleId={`sv-${sv.key}`}
                  ratio="aspect-square"
                  picture={
                    <img
                      src={`/services/${sv.key}.webp`}
                      alt=""
                      width={1254}
                      height={1254}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  }
                  title={t(sv.title)}
                >
                  <div className="flex-1">
                    <CardText>{t(sv.description)}</CardText>
                  </div>
                  <Link
                    to={contactFor(sv.key)}
                    className="mt-5 inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-brand hover:underline"
                  >
                    {vi ? "Nhận tư vấn" : "Get advice"}
                    <Icon name="arrowRight" />
                    <span className="sr-only">: {t(sv.title)}</span>
                  </Link>
                </PictureCard>
              ))}
            </ul>
          </div>
        </section>

        <div className="pt-[clamp(4.5rem,11vh,7rem)]">
          <CtaBand
            title={
              vi
                ? "Chưa biết giải pháp nào phù hợp?"
                : "Not sure which solution fits?"
            }
            text={
              vi
                ? "Chia sẻ nhu cầu của bạn, đội ngũ KMK sẽ tư vấn và demo sản phẩm phù hợp."
                : "Tell us what you need and the KMK team will advise you and demo the right product."
            }
            primary={{
              to: "/contact",
              label: vi ? "Liên hệ tư vấn" : "Contact us",
            }}
            secondary={{
              to: "/clients",
              label: vi ? "Xem khách hàng" : "See our clients",
            }}
          />
        </div>
      </div>
    </SiteLayout>
  );
}
