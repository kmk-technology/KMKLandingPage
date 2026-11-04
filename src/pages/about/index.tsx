import { useRef } from "react";
import { about, company, history, team } from "../../content/site";
import { useLang } from "../../i18n/context";
import { usePageMotion } from "../../components/site/motion";
import { gsap, MOTION_OK, useGSAP } from "../../lib/gsap";
import SiteLayout, { PageHero } from "../../components/site/SiteLayout";
import {
  CardText,
  CtaBand,
  PictureCard,
  SectionLead,
  SectionTitle,
  sectionY,
} from "../../components/site/blocks";
import Icon from "../../components/ui/Icon";

/*
 * About, with the company profile's words: the slogan and the story (centred title); the
 *  history as three milestones on a light-blue block; a grey band with the mission as a quote
 *  beside a photo; "our team" (hidden for now); the core values as picture cards; and the blue
 *  call to action.
 */
/** The team section is hidden for now; set to true to show it again. */
const SHOW_TEAM = false;

export default function AboutPage() {
  const { t, lang } = useLang();
  const vi = lang === "vi";
  const root = useRef<HTMLDivElement>(null);
  usePageMotion(root, [lang]);

  // history: the line draws itself, each milestone rises in as the line reaches it
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const wide = window.matchMedia("(min-width: 768px)").matches;
        const tl = gsap.timeline({
          scrollTrigger: { trigger: ".tl", start: "top 80%", once: true },
        });
        tl.fromTo(".tl-fill", wide ? { scaleX: 0 } : { scaleY: 0 }, {
          ...(wide ? { scaleX: 1 } : { scaleY: 1 }),
          duration: 1.6,
          ease: "power2.inOut",
        })
          .from(
            ".tl-dot",
            { scale: 0, duration: 0.6, stagger: 0.45, ease: "back.out(2)" },
            0.1,
          )
          .from(
            ".tl-card",
            {
              y: 50,
              opacity: 0,
              duration: 1.1,
              stagger: 0.18,
              ease: "expo.out",
            },
            0.3,
          );
      });
    },
    { scope: root, dependencies: [lang], revertOnUpdate: true },
  );

  const initials = (name: string) =>
    name
      .split(" ")
      .slice(-2)
      .map((w) => w[0])
      .join("");

  const values = [
    {
      img: "/about/value-1.webp",
      title: t(about.values[0]),
      line: vi
        ? "Không ngừng đổi mới để vượt qua các tiêu chuẩn ngành."
        : "Always innovating to go beyond industry standards.",
    },
    {
      img: "/about/value-2.webp",
      title: t(about.values[1]),
      line: vi
        ? "Giải pháp đáng tin cậy, quan hệ đối tác lâu dài."
        : "Reliable solutions and long-term partnerships.",
    },
    {
      img: "/about/value-3.webp",
      title: t(about.values[2]),
      line: vi
        ? "Giúp doanh nghiệp phát huy hết tiềm năng của mình."
        : "Helping businesses reach their full potential.",
    },
  ];
  const tile = "overflow-hidden rounded-[1.25rem] bg-[#f5f6f8]";
  const photo =
    "h-full w-full object-cover transition-transform duration-[1.2s] ease-out-expo hover:scale-[1.04]";

  return (
    <SiteLayout
      title={vi ? "Về chúng tôi | KMK Technology" : "About us | KMK Technology"}
      description={`${t(about.intro)} ${t(about.heritage)}`}
    >
      <div ref={root}>
        <PageHero
          title={
            vi ? (
              <>
                Đơn giản hóa hoạt động kinh doanh{" "}
                <span className="text-brand">của bạn.</span>
              </>
            ) : (
              <>
                Simplify <span className="text-brand">your business.</span>
              </>
            )
          }
          sub={`${t(about.intro)} ${t(about.heritage)}`}
        />

        {/* ================= history: nodes on a line, a card per milestone ================= */}
        <section
          aria-labelledby="tl-title"
          className="pb-[clamp(4.5rem,11vh,7rem)]"
        >
          <div className="shell">
            <div className="relative overflow-hidden rounded-[2rem] bg-[linear-gradient(180deg,#f3f8ff_0%,#eaf2fe_100%)] px-[clamp(1.25rem,4vw,3.5rem)] py-[clamp(3rem,8vh,4.5rem)]">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 -top-24 aspect-square w-[28rem] rounded-full border border-brand/10"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 -top-10 aspect-square w-[16rem] rounded-full border border-brand/10"
              />

              <div className="relative text-center">
                <h2
                  id="tl-title"
                  className="reveal-h font-display text-[clamp(2rem,1.4rem+2.2vw,3.25rem)] font-normal leading-[1.22] text-ink"
                >
                  {vi ? "Lịch sử hình thành " : "Our "}
                  <span className="text-brand">
                    {vi ? "và phát triển" : "history"}
                  </span>
                </h2>
                <p className="fade mx-auto mt-4 max-w-[40rem] text-[1.0625rem] leading-[1.75] text-ink/65">
                  {vi
                    ? "Từ nền tảng hơn một thập kỷ của DASolution đến những sản phẩm được thị trường tin dùng."
                    : "From more than a decade at DASolution to products the market trusts."}
                </p>
              </div>

              <ol className="tl relative mt-14 grid gap-6 md:grid-cols-3">
                {/* the line joining the nodes: down the left on phones, across on wider screens */}
                <span
                  aria-hidden="true"
                  className="absolute bottom-10 left-[23px] top-6 w-[2px] rounded-full bg-brand/15 md:bottom-auto md:left-[calc(16.67%)] md:right-[calc(16.67%)] md:top-[23px] md:h-[2px] md:w-auto"
                >
                  <span className="tl-fill block h-full w-full origin-top rounded-full bg-brand md:origin-left" />
                </span>
                {history.map((h, i) => {
                  const last = i === history.length - 1;
                  return (
                    <li
                      key={h.year}
                      className="relative flex gap-5 md:flex-col md:items-center md:gap-0"
                    >
                      <span
                        aria-hidden="true"
                        className={`tl-dot relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-[1.25rem] shadow-[0_12px_24px_-12px_rgba(35,121,229,0.8)] ring-[6px] ring-[#eef5ff] ${last ? "bg-brand text-white" : "bg-white text-brand"}`}
                      >
                        <Icon
                          name={(["layers", "spark", "shield"] as const)[i]}
                        />
                      </span>
                      <article
                        className={`tl-card tilt relative flex-1 overflow-hidden rounded-[1.5rem] p-7 transition-shadow duration-500 md:mt-8 md:w-full ${last ? "bg-[linear-gradient(150deg,#2379e5,#1a5fc0)] text-white shadow-[0_30px_60px_-30px_rgba(35,121,229,0.9)]" : "bg-white shadow-[0_20px_50px_-35px_rgba(20,60,140,0.5)] hover:shadow-[0_30px_60px_-30px_rgba(20,60,140,0.45)]"}`}
                      >
                        <p
                          className={`relative text-[0.875rem] font-medium ${last ? "text-white/70" : "text-ink/45"}`}
                        >
                          {vi ? "Giai đoạn" : "Stage"}{" "}
                          {String(i + 1).padStart(2, "0")}
                        </p>
                        <p
                          className={`relative mt-2 font-display text-[clamp(2.2rem,1.8rem+1.4vw,3rem)] font-medium leading-none ${last ? "text-white" : "text-brand"}`}
                        >
                          {h.year}
                        </p>
                        <h3
                          className={`relative mt-5 text-[1.25rem] font-medium ${last ? "text-white" : "text-ink"}`}
                        >
                          {t(h.title)}
                        </h3>
                        <p
                          className={`relative mt-2.5 text-[0.9375rem] leading-relaxed ${last ? "text-white/85" : "text-ink/65"}`}
                        >
                          {t(h.body)}
                        </p>
                      </article>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </section>

        {/* ================= mission, as a quote ================= */}
        <section
          aria-labelledby="mission-title"
          className="mx-2 rounded-[2rem] bg-[#f5f6f8] py-[clamp(4.5rem,11vh,7rem)] sm:mx-4 lg:mx-6"
        >
          <div className="shell">
            <div className="text-center">
              <h2
                id="mission-title"
                className="reveal-h font-display text-[clamp(2rem,1.4rem+2.2vw,3.25rem)] font-normal leading-[1.22] text-ink"
              >
                &ldquo;{company.motto}&rdquo;
              </h2>
              <p className="fade mt-3 text-[1.0625rem] text-ink/70">
                {vi
                  ? "Phương châm mà đội ngũ KMK theo đuổi mỗi ngày."
                  : "The motto the KMK team lives by every day."}
              </p>
            </div>
            <div className="mt-12 grid items-center gap-10 md:grid-cols-[minmax(0,22rem)_1fr] md:gap-16 lg:mx-[6%]">
              <div className="wipe aspect-[4/5] overflow-hidden rounded-[1.5rem]">
                <img
                  src="/about/lobby.webp"
                  alt={
                    vi
                      ? "Tường logo KMK Technology tại sảnh văn phòng"
                      : "The KMK Technology logo wall in the office lobby"
                  }
                  width={1122}
                  height={1402}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <figure className="fade">
                <span
                  aria-hidden="true"
                  className="block font-display text-[4.5rem] font-medium leading-[0.6] text-brand"
                >
                  &ldquo;
                </span>
                <blockquote className="mt-4 font-display text-[clamp(1.4rem,1.1rem+1vw,2rem)] font-normal leading-snug text-ink">
                  {t(about.mission.body)}
                </blockquote>
                <span
                  aria-hidden="true"
                  className="mt-7 block h-[3px] w-14 rounded-full bg-brand"
                />
                <figcaption className="mt-5">
                  <span className="block text-[1.0625rem] font-medium text-ink">
                    {t(about.mission.label)}
                  </span>
                  <span className="mt-1 block text-[0.9375rem] text-ink/60">
                    KMK Technology
                  </span>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* ================= our team (hidden for now: set SHOW_TEAM to true) ================= */}
        {SHOW_TEAM ? (
          <>
            <section
              id="team"
              aria-labelledby="team-title"
              className="py-[clamp(4.5rem,11vh,7rem)]"
            >
              <div className="shell">
                <div className="text-center">
                  <h2
                    id="team-title"
                    className="reveal-h font-display text-[clamp(1.9rem,1.4rem+1.6vw,2.75rem)] font-normal text-ink"
                  >
                    {vi ? "Đội ngũ của chúng tôi" : "Our team"}
                  </h2>
                  <p className="fade mx-auto mt-3 max-w-[50rem] text-[1.0625rem] leading-relaxed text-ink/70">
                    {vi
                      ? "Không ngừng cập nhật kiến thức, nghiên cứu, phát huy tối đa khả năng sáng tạo và lắng nghe phản hồi từ đối tác và khách hàng."
                      : "Always updating our knowledge, researching, making the most of our creativity and listening to partners and clients."}
                  </p>
                </div>

                {/* three photos */}
                <div className="fade-group mt-12 grid gap-3 md:h-[clamp(22rem,36vw,30rem)] md:grid-cols-3 md:grid-rows-2">
                  <div
                    className={`${tile} aspect-[16/9] md:col-span-2 md:row-span-2 md:aspect-auto`}
                  >
                    <img
                      src="/about/team-1.webp"
                      alt={
                        vi
                          ? "Đội ngũ KMK Technology chúc mừng đồng nghiệp tại văn phòng"
                          : "The KMK Technology team celebrating a colleague at the office"
                      }
                      width={1672}
                      height={941}
                      loading="lazy"
                      className={photo}
                    />
                  </div>
                  <div className={`${tile} aspect-[16/9] md:aspect-auto`}>
                    <img
                      src="/about/team-2.webp"
                      alt={
                        vi
                          ? "Ba thành viên KMK cùng xem mã nguồn trên màn hình"
                          : "Three KMK colleagues reviewing code together"
                      }
                      width={1672}
                      height={941}
                      loading="lazy"
                      className={photo}
                    />
                  </div>
                  <div className={`${tile} aspect-[16/9] md:aspect-auto`}>
                    <img
                      src="/about/team-3.webp"
                      alt={
                        vi
                          ? "Đội ngũ KMK họp nhanh trước bảng trắng"
                          : "The KMK team in a stand-up meeting at the whiteboard"
                      }
                      width={1672}
                      height={941}
                      loading="lazy"
                      className={photo}
                    />
                  </div>
                </div>

                {/* the people */}
                <ul className="pop-group mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
                  {team.map((p, i) => (
                    <li
                      key={p.name}
                      className="org-pill tilt spot flex flex-col items-center rounded-[1.25rem] bg-[#f5f6f8] px-3 py-6 text-center"
                    >
                      <span
                        aria-hidden="true"
                        className={`pop grid h-14 w-14 place-items-center rounded-full text-[1rem] font-medium ${i === 0 ? "bg-brand text-white" : "bg-white text-brand"}`}
                      >
                        {initials(p.name)}
                      </span>
                      <span className="mt-3 block text-[0.9375rem] font-medium leading-tight text-ink">
                        {p.name}
                      </span>
                      <span className="mt-1 block text-[0.8125rem] text-ink/55">
                        {p.role}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </>
        ) : null}

        {/* ================= core values ================= */}
        <section aria-labelledby="values-title" className={sectionY}>
          <div className="shell">
            <SectionTitle id="values-title">
              {vi ? "Giá trị " : "Core "}
              <span className="text-brand">{vi ? "cốt lõi" : "values"}</span>
            </SectionTitle>
            <SectionLead>
              <b className="font-medium text-ink">{t(about.vision.label)}:</b>{" "}
              {t(about.vision.body)}
            </SectionLead>
            <ul className="fade-group mt-14 grid gap-5 md:grid-cols-3">
              {values.map((v) => (
                <PictureCard
                  key={v.title}
                  evenTitle={false}
                  picture={
                    <img
                      src={v.img}
                      alt=""
                      width={1448}
                      height={1086}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  }
                  title={v.title}
                >
                  <CardText>{v.line}</CardText>
                </PictureCard>
              ))}
            </ul>
          </div>
        </section>

        <CtaBand
          title={
            vi
              ? "Đồng hành trên hành trình số hóa doanh nghiệp"
              : "A partner on your digitalisation journey"
          }
          text={`${t(company.legalName)} · ${t(company.address)} · ${company.phoneDisplay}`}
          primary={{
            to: "/contact",
            label: vi ? "Liên hệ ngay" : "Contact us",
          }}
          secondary={{
            to: "/products",
            label: vi ? "Xem sản phẩm" : "See products",
          }}
        />
      </div>
    </SiteLayout>
  );
}
