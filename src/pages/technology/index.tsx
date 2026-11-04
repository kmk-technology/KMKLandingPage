import { useRef } from "react";
import { platformGroups, strengths } from "../../content/site";
import { useLang } from "../../i18n/context";
import { usePageMotion } from "../../components/site/motion";
import SiteLayout, { PageHero } from "../../components/site/SiteLayout";
import {
  CtaBand,
  greyBand,
  PictureCard,
  SectionLead,
  SectionTitle,
} from "../../components/site/blocks";

/*
 * Technology: the centred title with the profile's lead; the four strengths as picture cards;
 * the technology ecosystem on the grey band, each platform as a white card with its count and
 * a grid of equal tiles; and the blue call to action.
 */
export default function TechnologyPage() {
  const { t, lang } = useLang();
  const vi = lang === "vi";
  const root = useRef<HTMLDivElement>(null);
  usePageMotion(root, [lang]);

  const total = platformGroups.reduce((n, g) => n + g.items.length, 0);

  return (
    <SiteLayout
      title={vi ? "Công nghệ | KMK Technology" : "Technology | KMK Technology"}
      description={
        vi
          ? "Giải pháp đột phá & thế mạnh cạnh tranh của KMK Technology: không chỉ cung cấp phần mềm, mà mang đến một giải pháp số hóa 360 độ."
          : "KMK Technology's breakthrough solutions and competitive strengths: not just software, but a 360-degree digitalisation solution."
      }
    >
      <div ref={root}>
        <PageHero
          title={
            vi ? (
              <>
                Giải pháp đột phá &{" "}
                <span className="text-brand">thế mạnh cạnh tranh</span>
              </>
            ) : (
              <>
                Breakthrough solutions &{" "}
                <span className="text-brand">competitive strengths</span>
              </>
            )
          }
          sub={`${t(strengths.lead)} ${t(strengths.proof)}`}
        />

        {/* ================= strengths ================= */}
        <section
          aria-label={vi ? "Thế mạnh công nghệ" : "Our strengths"}
          className="pb-[clamp(4.5rem,11vh,7rem)]"
        >
          <ul className="shell fade-group grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {strengths.items.map((s, i) => (
              <PictureCard
                key={s.en}
                picture={
                  <img
                    src={`/strengths/${i + 1}.webp`}
                    alt=""
                    width={1448}
                    height={1086}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                }
                title={t(s)}
              />
            ))}
          </ul>
        </section>

        {/* ================= technology ecosystem ================= */}
        <section aria-labelledby="pf-title" className={greyBand}>
          <div className="shell">
            <SectionTitle id="pf-title">
              {vi ? "Hệ sinh thái " : "A diverse "}
              <span className="text-brand">
                {vi ? "công nghệ đa dạng" : "technology ecosystem"}
              </span>
            </SectionTitle>
            <SectionLead>
              {vi
                ? `${total} công nghệ trên ${platformGroups.length} nền tảng, từ ERP, web, di động đến cloud và AI.`
                : `${total} technologies across ${platformGroups.length} platforms, from ERP, web and mobile to cloud and AI.`}
            </SectionLead>

            <div className="mt-14 space-y-5">
              {platformGroups.map((g) => (
                <div
                  key={g.title.en}
                  className="fade rounded-[1.75rem] bg-white p-[clamp(1.25rem,3vw,2.25rem)]"
                >
                  <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
                    <div>
                      <h3 className="font-display text-[1.375rem] font-medium leading-[1.3] text-ink">
                        {t(g.title)}
                      </h3>
                      <p className="mt-1.5 text-[0.9375rem] leading-[1.7] text-ink/60">
                        {t(g.benefit)}
                      </p>
                    </div>
                    <span className="rounded-full bg-brand-tint px-3 py-1 text-[0.8125rem] font-medium text-brand">
                      {g.items.length} {vi ? "công nghệ" : "tools"}
                    </span>
                  </div>
                  <ul className="tech-grid mt-6 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
                    {g.items.map((it) => (
                      <li
                        key={it.name}
                        className="tech-cell group flex aspect-square flex-col items-center justify-center gap-2.5 rounded-[1.25rem] bg-[#f6f8fb] p-2 text-center transition-colors duration-500 hover:bg-brand-tint"
                      >
                        <img
                          src={it.icon}
                          alt=""
                          loading="lazy"
                          className="h-9 w-9 object-contain transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:scale-110"
                        />
                        <span className="line-clamp-2 text-[0.8125rem] leading-snug text-ink/75">
                          {it.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="pt-[clamp(4.5rem,11vh,7rem)]">
          <CtaBand
            title={
              vi
                ? "Cần tư vấn công nghệ cho dự án của bạn?"
                : "Need technology advice for your project?"
            }
            text={
              vi
                ? "Đội ngũ KMK sẽ đề xuất nền tảng và kiến trúc phù hợp với nhu cầu và ngân sách của bạn."
                : "The KMK team will suggest the platform and architecture that fit your needs and budget."
            }
            primary={{
              to: "/contact",
              label: vi ? "Liên hệ KMK" : "Talk to KMK",
            }}
            secondary={{
              to: "/products",
              label: vi ? "Xem sản phẩm" : "See products",
            }}
          />
        </div>
      </div>
    </SiteLayout>
  );
}
