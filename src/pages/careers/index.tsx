import { useRef, useState } from "react";
import {
  applyHref,
  careersEmail,
  hiringSteps,
  jobPlace,
  jobs,
  jobTeams,
  jobType,
  perks,
  type JobTeam,
} from "../../content/careers";
import { useLang } from "../../i18n/context";
import { usePageMotion } from "../../components/site/motion";
import SiteLayout from "../../components/site/SiteLayout";
import Icon from "../../components/ui/Icon";

/*
 * Careers, in the same style as the other pages: the title and a team photo; why work at KMK
 * as six cards; the open roles as a list you can filter by team, each opening in place to show
 * the work, what we look for and an "apply" button (a pre-filled email for the CV); the hiring
 * steps on a light-blue block; and an open application for everyone else.
 */
export default function CareersPage() {
  const { t, lang } = useLang();
  const vi = lang === "vi";
  const root = useRef<HTMLDivElement>(null);
  usePageMotion(root, [lang]);

  const [team, setTeam] = useState<JobTeam | "all">("all");
  const [open, setOpen] = useState<string | null>(null);
  const shown = team === "all" ? jobs : jobs.filter((j) => j.team === team);
  const teamLabel = (k: JobTeam) => t(jobTeams.find((x) => x.key === k)!.label);

  const h2 =
    "reveal-h font-display text-[clamp(1.9rem,1.4rem+1.6vw,2.75rem)] font-normal text-ink";
  const chip =
    "inline-flex min-h-[40px] items-center gap-2 rounded-full px-4 text-[0.9375rem] font-medium transition-colors";

  return (
    <SiteLayout
      title={vi ? "Tuyển dụng | KMK Technology" : "Careers | KMK Technology"}
      description={
        vi
          ? "Cơ hội nghề nghiệp tại KMK Technology: Frontend, Backend, Mobile, Tester, Tư vấn ERP và Kinh doanh phần mềm tại TP.HCM."
          : "Careers at KMK Technology: frontend, backend, mobile, QA, ERP consulting and software sales roles in Ho Chi Minh City."
      }
    >
      <div ref={root}>
        {/* ================= title and team photo ================= */}
        <section className="pb-[clamp(4.5rem,11vh,7rem)] pt-[clamp(3.5rem,9vh,6rem)]">
          <div className="shell">
            <div className="text-center">
              <p className="page-in inline-flex items-center gap-2 rounded-full bg-brand-tint px-4 py-1.5 text-[0.875rem] font-medium text-brand">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                {vi ? "Tuyển dụng" : "Careers"}
              </p>
              <h1 className="page-h mx-auto mt-5 max-w-[24ch] font-display text-[clamp(2.1rem,1.4rem+2.4vw,3.4rem)] font-normal leading-[1.18] text-ink">
                {vi ? "Cùng KMK " : "Help us "}
                <span className="text-brand">
                  {vi
                    ? "đơn giản hóa doanh nghiệp Việt"
                    : "simplify Vietnamese business"}
                </span>
              </h1>
              <p className="page-in mx-auto mt-5 max-w-[44rem] text-[1.0625rem] leading-relaxed text-ink/70">
                {vi
                  ? "Chúng tôi tìm những người yêu công nghệ, muốn tạo ra phần mềm mà doanh nghiệp và cơ sở y tế dùng mỗi ngày."
                  : "We are looking for people who love technology and want to build software that businesses and clinics use every day."}
              </p>
              <div className="page-in mt-8 flex flex-wrap justify-center gap-3">
                <a
                  href="#jobs"
                  className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-brand px-6 text-[0.9375rem] font-medium text-white shadow-[0_12px_28px_-14px_rgba(35,121,229,0.9)] transition-colors hover:bg-brand-deep"
                >
                  {vi ? "Xem vị trí đang tuyển" : "See open roles"}
                  <Icon name="arrowDown" />
                </a>
                <a
                  href={applyHref(undefined, vi)}
                  className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-white px-6 text-[0.9375rem] font-medium text-ink ring-1 ring-ink/12 transition-colors hover:text-brand hover:ring-brand"
                >
                  <Icon name="mail" />
                  {vi ? "Gửi CV" : "Send your CV"}
                </a>
              </div>
            </div>

            <div className="wipe mt-14 aspect-[16/9] overflow-hidden rounded-[2rem] bg-[#f5f6f8] sm:aspect-[21/9]">
              <img
                src="/about/team-1.webp"
                alt={
                  vi
                    ? "Đội ngũ KMK Technology chúc mừng đồng nghiệp tại văn phòng"
                    : "The KMK Technology team celebrating a colleague at the office"
                }
                width={1672}
                height={941}
                className="h-full w-full object-cover object-[center_35%]"
              />
            </div>
          </div>
        </section>

        {/* ================= why KMK ================= */}
        <section
          aria-labelledby="why-title"
          className="pb-[clamp(4.5rem,11vh,7rem)]"
        >
          <div className="shell">
            <div className="text-center">
              <h2 id="why-title" className={h2}>
                {vi ? "Vì sao chọn " : "Why "}
                <span className="text-brand">KMK</span>?
              </h2>
              <p className="fade mx-auto mt-3 max-w-[40rem] text-[1.0625rem] leading-relaxed text-ink/65">
                {vi
                  ? "Một môi trường để bạn làm sản phẩm thật, học công nghệ mới và lớn lên cùng công ty."
                  : "A place to build real products, learn new technology and grow with the company."}
              </p>
            </div>
            <ul className="fade-group mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {perks.map((p) => (
                <li
                  key={t(p.title)}
                  className="spot rounded-[1.75rem] bg-[#f5f6f8] p-7 transition-colors duration-500 hover:bg-brand-tint"
                >
                  <span
                    aria-hidden="true"
                    className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-[1.375rem] text-brand shadow-[0_10px_24px_-14px_rgba(20,60,140,0.5)]"
                  >
                    <Icon name={p.icon} />
                  </span>
                  <h3 className="mt-6 text-[1.25rem] font-medium text-ink">
                    {t(p.title)}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink/65">
                    {t(p.body)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ================= open roles ================= */}
        <section
          id="jobs"
          aria-labelledby="jobs-title"
          className="scroll-mt-24 pb-[clamp(4.5rem,11vh,7rem)]"
        >
          <div className="shell">
            <div className="text-center">
              <h2 id="jobs-title" className={h2}>
                {vi ? "Vị trí " : "Open "}
                <span className="text-brand">
                  {vi ? "đang tuyển" : "roles"}
                </span>
              </h2>
              <p className="fade mt-3 text-[1.0625rem] text-ink/65">
                {vi
                  ? `${jobs.length} vị trí · ${t(jobPlace)} · ${t(jobType)}`
                  : `${jobs.length} roles · ${t(jobPlace)} · ${t(jobType)}`}
              </p>
            </div>

            <div
              role="group"
              aria-label={vi ? "Lọc theo nhóm" : "Filter by team"}
              className="fade mt-10 flex flex-wrap justify-center gap-2"
            >
              {(["all", ...jobTeams.map((x) => x.key)] as const).map((k) => {
                const on = team === k;
                const count =
                  k === "all"
                    ? jobs.length
                    : jobs.filter((j) => j.team === k).length;
                return (
                  <button
                    key={k}
                    type="button"
                    aria-pressed={on}
                    onClick={() => {
                      setTeam(k);
                      setOpen(null);
                    }}
                    className={`${chip} ${on ? "bg-brand text-white" : "bg-[#f5f6f8] text-ink hover:text-brand"}`}
                  >
                    {k === "all" ? (vi ? "Tất cả" : "All") : teamLabel(k)}
                    <span
                      className={`rounded-full px-2 text-[0.8125rem] ${on ? "bg-white/20" : "bg-white text-ink/55"}`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            <ul className="mx-auto mt-8 max-w-[60rem] space-y-3">
              {shown.map((j) => {
                const isOpen = open === j.key;
                const panel = `job-${j.key}`;
                return (
                  <li
                    key={j.key}
                    className={`overflow-hidden rounded-[1.5rem] border bg-white transition-[border-color,box-shadow] duration-500 ${isOpen ? "border-brand/30 shadow-[0_24px_50px_-34px_rgba(20,60,140,0.5)]" : "border-ink/[0.08] hover:border-brand/30"}`}
                  >
                    <h3>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={panel}
                        onClick={() => setOpen(isOpen ? null : j.key)}
                        className="flex w-full items-center gap-4 px-6 py-5 text-left sm:px-8 sm:py-6"
                      >
                        <span className="min-w-0 flex-1">
                          <span className="block text-[1.1875rem] font-medium leading-snug text-ink">
                            {t(j.title)}
                          </span>
                          <span className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[0.875rem] text-ink/55">
                            <span className="font-medium text-brand">
                              {teamLabel(j.team)}
                            </span>
                            <span>{t(j.level)}</span>
                            <span className="inline-flex items-center gap-1">
                              <Icon name="pin" /> {t(jobPlace)}
                            </span>
                            <span>{t(jobType)}</span>
                          </span>
                        </span>
                        <span
                          aria-hidden="true"
                          className={`grid h-10 w-10 shrink-0 place-items-center rounded-full text-[1.125rem] transition-[transform,background-color,color] duration-500 ease-out-expo ${isOpen ? "rotate-45 bg-brand text-white" : "bg-[#f5f6f8] text-ink"}`}
                        >
                          <Icon name="plus" />
                        </span>
                      </button>
                    </h3>
                    <div
                      id={panel}
                      className={`grid transition-all duration-500 ease-out-expo ${isOpen ? "visible grid-rows-[1fr]" : "invisible grid-rows-[0fr]"}`}
                    >
                      <div className="overflow-hidden">
                        <div className="border-t border-ink/[0.07] px-6 pb-7 pt-6 sm:px-8">
                          <p className="text-[1rem] leading-relaxed text-ink/75">
                            {t(j.summary)}
                          </p>
                          <div className="mt-6 grid gap-6 md:grid-cols-2">
                            {[
                              {
                                head: vi ? "Công việc" : "What you'll do",
                                items: j.duties,
                              },
                              {
                                head: vi ? "Yêu cầu" : "What we look for",
                                items: j.needs,
                              },
                            ].map((g) => (
                              <div key={g.head}>
                                <p className="text-[0.9375rem] font-medium text-ink">
                                  {g.head}
                                </p>
                                <ul className="mt-3 space-y-2.5">
                                  {g.items.map((it) => (
                                    <li
                                      key={t(it)}
                                      className="flex gap-2.5 text-[0.9375rem] leading-relaxed text-ink/70"
                                    >
                                      <Icon
                                        name="check"
                                        className="mt-[0.3em] shrink-0 text-brand"
                                      />
                                      {t(it)}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                          <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
                            {j.stack ? (
                              <ul
                                aria-label={vi ? "Công nghệ" : "Technology"}
                                className="flex flex-wrap gap-2"
                              >
                                {j.stack.map((s) => (
                                  <li
                                    key={s}
                                    className="rounded-full bg-brand-tint px-3 py-1 text-[0.8125rem] font-medium text-brand"
                                  >
                                    {s}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <span />
                            )}
                            <a
                              href={applyHref(t(j.title), vi)}
                              className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-brand px-5 text-[0.9375rem] font-medium text-white transition-colors hover:bg-brand-deep"
                            >
                              {vi ? "Ứng tuyển ngay" : "Apply now"}
                              <Icon name="arrowRight" />
                              <span className="sr-only">: {t(j.title)}</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* ================= hiring steps ================= */}
        <section
          aria-labelledby="steps-title"
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
              <h2 id="steps-title" className={`relative text-center ${h2}`}>
                {vi ? "Quy trình " : "How we "}
                <span className="text-brand">{vi ? "tuyển dụng" : "hire"}</span>
              </h2>
              <ol className="fade-group relative mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {hiringSteps.map((s, i) => {
                  const last = i === hiringSteps.length - 1;
                  return (
                    <li
                      key={t(s.title)}
                      className={`tilt rounded-[1.5rem] p-7 ${last ? "bg-[linear-gradient(150deg,#2379e5,#1a5fc0)] text-white shadow-[0_30px_60px_-30px_rgba(35,121,229,0.9)]" : "bg-white shadow-[0_20px_50px_-35px_rgba(20,60,140,0.5)]"}`}
                    >
                      <span
                        className={`font-display text-[2.5rem] font-medium leading-none ${last ? "text-white" : "text-brand"}`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3
                        className={`mt-5 text-[1.25rem] font-medium ${last ? "text-white" : "text-ink"}`}
                      >
                        {t(s.title)}
                      </h3>
                      <p
                        className={`mt-2 text-[0.9375rem] leading-relaxed ${last ? "text-white/85" : "text-ink/65"}`}
                      >
                        {t(s.body)}
                      </p>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </section>

        {/* ================= open application ================= */}
        <section
          aria-labelledby="cv-title"
          className="mx-2 rounded-[2rem] bg-[#f5f6f8] py-[clamp(4.5rem,11vh,7rem)] sm:mx-4 lg:mx-6"
        >
          <div className="shell fade text-center">
            <h2
              id="cv-title"
              className="font-display text-[clamp(1.7rem,1.3rem+1.2vw,2.3rem)] font-normal text-ink"
            >
              {vi ? "Chưa thấy vị trí phù hợp?" : "Don't see the right role?"}
            </h2>
            <p className="mx-auto mt-3 max-w-[40rem] text-[1.0625rem] leading-relaxed text-ink/70">
              {vi
                ? "Gửi CV cho KMK, chúng tôi sẽ liên hệ khi có cơ hội phù hợp với bạn."
                : "Send us your CV and we will be in touch when a role fits you."}
            </p>
            <a
              href={applyHref(undefined, vi)}
              className="mt-8 inline-flex min-h-[48px] items-center gap-2 rounded-full bg-brand px-6 text-[0.9375rem] font-medium text-white shadow-[0_12px_28px_-14px_rgba(35,121,229,0.9)] transition-colors hover:bg-brand-deep"
            >
              <Icon name="mail" />
              {vi ? "Gửi CV ứng tuyển" : "Send your CV"}
            </a>
            <p className="mt-4 text-[0.9375rem] text-ink/55">{careersEmail}</p>
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}
