import { useEffect, useRef, useState } from "react";
import {
  about,
  clientCount,
  corporateClients,
  medicalClients,
  products,
  services,
} from "../../content/site";
import { Link } from "react-router-dom";
import { useLang } from "../../i18n/context";
import {
  gsap,
  MOTION_OK,
  POINTER_FINE,
  prefersReducedMotion,
  ScrollTrigger,
  useGSAP,
} from "../../lib/gsap";
import { appReady, setMarkStage } from "../../lib/ready";
import { countIn } from "../home/reveal";
import Icon from "../ui/Icon";
import ProductArt from "../site/ProductArt";
import type { MarkScene, Pose } from "./markScene";

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return Boolean(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/*
 * Home, in the manner of zalo.me - short, each part leading on to its own page: the opening
 * (headline, the light-blue panel with the official 3D mark - the loader's logo turns into it -
 * and the client logos running), three cards for the main pages, "from experience to trust"
 * with real product screenshots and figures, and the product ecosystem.
 */

const HERO: Pose[] = [
  { x: 0.5, y: -0.02, scale: 0.78, ry: -0.42, rx: 0.1 },
  { x: 0.5, y: 0.06, scale: 0.68, ry: 0.55, rx: 0.28 },
];
const HERO_PHONE: Pose[] = [
  { x: 0, y: -0.42, scale: 0.34, ry: -0.42, rx: 0.1 },
  { x: 0, y: -0.36, scale: 0.3, ry: 0.55, rx: 0.28 },
];

const section = "relative py-[clamp(4.5rem,11vh,7.5rem)]";
const h2 =
  "reveal-h font-display text-[clamp(1.9rem,1.4rem+1.6vw,2.75rem)] font-normal leading-[1.2] text-ink";
const lead =
  "fade mx-auto mt-4 max-w-[46rem] text-[1.0625rem] leading-relaxed text-ink/75";
const line =
  "rounded-[1.75rem] overflow-hidden border border-ink/[0.09] bg-white";

export default function MarkStory() {
  const { t, lang } = useLang();
  const vi = lang === "vi";
  const root = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scene = useRef<MarkScene | null>(null);
  const poses = useRef<Pose[]>(HERO);
  const [fallback, setFallback] = useState(false);

  // ---- the 3D mark (built under the preloader, which hands its logo over to it)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!hasWebGL()) {
      setFallback(true);
      setMarkStage(null);
      return;
    }
    let disposed = false;
    let io: IntersectionObserver | undefined;
    import("./markScene")
      .then(({ createMarkScene }) =>
        createMarkScene(canvas, prefersReducedMotion()),
      )
      .then((s) => {
        if (disposed) return s.dispose();
        scene.current = s;
        s.setPoses(poses.current);
        let started = false;
        const start = () => {
          if (started || disposed) return;
          started = true;
          io = new IntersectionObserver(([e]) =>
            s.setRunning(e.isIntersecting),
          );
          io.observe(canvas);
          s.setRunning(true);
        };
        setMarkStage({
          rect: () => s.frontRect(),
          startAt: (r) => s.startAt(r),
          morph: (p) => s.setMorph(p),
          show: () => {
            s.show();
            start();
          },
        });
        appReady.then(() => {
          start();
          s.play();
          ScrollTrigger.refresh();
        });
      })
      .catch(() => {
        setFallback(true);
        setMarkStage(null);
      });
    return () => {
      disposed = true;
      io?.disconnect();
      scene.current?.dispose();
      scene.current = null;
    };
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const apply = (p: Pose[]) => {
        poses.current = p;
        scene.current?.setPoses(p);
      };
      mm.add("(min-width: 1024px)", () => apply(HERO));
      mm.add("(max-width: 1023px)", () => apply(HERO_PHONE));

      mm.add(MOTION_OK, () => {
        const el = root.current!;
        // ---- opening: the words rise, the panel opens out, its lines follow
        const intro = gsap.timeline({
          paused: true,
          defaults: { ease: "expo.out" },
        });
        intro
          .from(".hx-word", { yPercent: 115, duration: 1.3, stagger: 0.07 }, 0)
          .from(".hx-in", { y: 24, opacity: 0, duration: 1.2 }, 0.35)
          .fromTo(
            ".hx-panel",
            { clipPath: "inset(8% 6% 0% 6% round 32px)" },
            {
              clipPath: "inset(0% 0% 0% 0% round 32px)",
              duration: 1.8,
              ease: "expo.inOut",
            },
            0.2,
          )
          .from(
            ".hx-pin",
            { y: 40, opacity: 0, duration: 1.2, stagger: 0.1 },
            0.9,
          );
        appReady.then(() => intro.play());

        // the mark turns and the panel lines drift as the opening scrolls away
        ScrollTrigger.create({
          trigger: ".ms-hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
          onUpdate: (st) => scene.current?.setProgress(st.progress),
        });
        gsap.to(".hx-pins", {
          y: -70,
          ease: "none",
          scrollTrigger: {
            trigger: ".hx-panel",
            start: "top 30%",
            end: "bottom top",
            scrub: true,
          },
        });

        // ---- headings: each one is uncovered from below
        gsap.utils.toArray<HTMLElement>(".reveal-h", el).forEach((h) =>
          gsap.fromTo(
            h,
            { clipPath: "inset(-20% 0% 100% 0%)", y: 40 },
            {
              clipPath: "inset(-20% 0% -20% 0%)",
              y: 0,
              duration: 1.3,
              ease: "expo.out",
              scrollTrigger: { trigger: h, start: "top 88%", once: true },
            },
          ),
        );

        gsap.utils.toArray<HTMLElement>(".fade", el).forEach((n) =>
          gsap.from(n, {
            y: 24,
            opacity: 0,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: { trigger: n, start: "top 90%", once: true },
          }),
        );
        gsap.utils.toArray<HTMLElement>(".fade-group", el).forEach((g) =>
          gsap.from(g.children, {
            y: 50,
            opacity: 0,
            duration: 1.2,
            stagger: 0.1,
            ease: "expo.out",
            scrollTrigger: { trigger: g, start: "top 86%", once: true },
          }),
        );

        // ---- service icons float against their tiles
        gsap.utils.toArray<HTMLElement>(".svc-ico", el).forEach((ic) =>
          gsap.fromTo(
            ic,
            { y: 30 },
            {
              y: -24,
              ease: "none",
              scrollTrigger: {
                trigger: ic,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          ),
        );

        // ---- photos are wiped open, then settle
        gsap.utils.toArray<HTMLElement>(".wipe", el).forEach((w) => {
          const img = w.querySelector("img");
          const tl = gsap.timeline({
            scrollTrigger: { trigger: w, start: "top 85%", once: true },
          });
          tl.fromTo(
            w,
            { clipPath: "inset(100% 0% 0% 0% round 24px)" },
            {
              clipPath: "inset(0% 0% 0% 0% round 24px)",
              duration: 1.4,
              ease: "expo.inOut",
            },
          );
          if (img)
            tl.from(img, { scale: 1.25, duration: 2, ease: "expo.out" }, 0.2);
        });

        // ---- the team appears one person at a time
        gsap.from(".pop", {
          scale: 0.4,
          opacity: 0,
          duration: 0.9,
          stagger: 0.07,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".team-list",
            start: "top 85%",
            once: true,
          },
        });

        // ---- the technology grid fills in like a wave
        gsap.from(".tech-cell", {
          opacity: 0,
          scale: 0.85,
          duration: 0.8,
          ease: "power3.out",
          stagger: { grid: "auto", from: "start", amount: 0.9 },
          scrollTrigger: {
            trigger: ".tech-grid",
            start: "top 85%",
            once: true,
          },
        });

        // ---- client logos ripple in
        gsap.from(".cl-logo", {
          y: 24,
          opacity: 0,
          duration: 0.9,
          ease: "expo.out",
          stagger: { each: 0.025, from: "random" },
          scrollTrigger: { trigger: ".cl-grid", start: "top 85%", once: true },
        });
        countIn(el);
      });

      mm.add(`${MOTION_OK} and ${POINTER_FINE}`, () => {
        const move = (e: PointerEvent) =>
          scene.current?.setPointer(
            e.clientX / window.innerWidth - 0.5,
            e.clientY / window.innerHeight - 0.5,
          );
        window.addEventListener("pointermove", move, { passive: true });
        return () => window.removeEventListener("pointermove", move);
      });
    },
    { scope: root, dependencies: [lang], revertOnUpdate: true },
  );

  const words = (text: string, cls = "") =>
    text.split(" ").map((w, i, arr) => (
      <span key={`${text}-${i}`}>
        <span className="rt-mask">
          <span className={`rt-word hx-word ${cls}`}>{w}</span>
        </span>
        {i < arr.length - 1 ? " " : null}
      </span>
    ));
  const logos = [...corporateClients, ...medicalClients];
  const figure = (v: number, s = "") => (
    <>
      <span data-count={v} data-pad="2">
        {String(v).padStart(2, "0")}
      </span>
      {s}
    </>
  );
  const medifam = products.find((p) => p.key === "medifam")!;
  const pillars = [
    {
      to: "/products",
      title: vi ? "Sản phẩm và dịch vụ" : "Products and services",
      body: vi
        ? "MEDIFAM, KMK Sales, Digital Information cùng các dịch vụ phần mềm, ERP và chuyển đổi số."
        : "MEDIFAM, KMK Sales, Digital Information and our software, ERP and digital transformation services.",
      visual: (
        <img
          src="/home/pillar-products.webp"
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.03]"
          style={{ objectPosition: "center" }}
        />
      ),
    },
    {
      to: "/technology",
      title: vi ? "Công nghệ" : "Technology",
      body: vi
        ? "Giải pháp số hóa 360 độ, tích hợp AI, Social Platform cùng hệ sinh thái công nghệ đa dạng."
        : "360-degree digitalisation, AI and social platform integration, with a diverse technology ecosystem.",
      visual: (
        <img
          src="/home/pillar-technology.webp"
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.03]"
          style={{ objectPosition: "center" }}
        />
      ),
    },
    {
      to: "/about",
      title: vi ? "Về chúng tôi" : "About us",
      body: vi
        ? "Hơn 11 năm kinh nghiệm, thành lập 11/2022, phương châm “Your faith - Our services”."
        : "More than 11 years of experience, founded in November 2022, with one motto: “Your faith - Our services”.",
      visual: (
        <img
          src="/home/pillar-about.webp"
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.03]"
          style={{ objectPosition: "center" }}
        />
      ),
    },
  ];

  return (
    <div ref={root} className="relative bg-white">
      {/* ================= opening ================= */}
      <section
        id="kmk"
        aria-labelledby="hero-title"
        className="ms-hero relative bg-white pb-[clamp(3rem,8vh,5rem)] pt-[clamp(2.5rem,7vh,5rem)]"
      >
        <div className="shell text-center">
          <h1
            id="hero-title"
            className="font-display text-[clamp(2.3rem,1.4rem+3vw,3.75rem)] font-normal leading-[1.18] text-ink"
          >
            {words(vi ? "Đơn giản hóa" : "Simplify")}{" "}
            {words(vi ? "doanh nghiệp" : "your business", "text-brand")}
            {vi ? (
              <>
                <br />
                {words("của bạn")}
              </>
            ) : null}
          </h1>
          <p className="hx-in mx-auto mt-5 max-w-[48rem] text-[1.125rem] leading-relaxed text-ink/75">
            {vi
              ? "KMK Technology chuyên cung cấp các giải pháp công nghệ thông tin sáng tạo và đáng tin cậy: phát triển phần mềm, tư vấn giải pháp ERP, tư vấn chuyển đổi số và gia công phần mềm."
              : "KMK Technology provides creative and reliable information technology solutions: software development, ERP consulting, digital transformation consulting and software outsourcing."}
          </p>
        </div>

        {/* showcase panel with the 3D mark */}
        <div className="shell mt-12">
          <div className="hx-panel relative grid rounded-[2rem] h-[clamp(30rem,44vw,36rem)] overflow-hidden bg-[linear-gradient(180deg,#e9f4ff_0%,#cfe5ff_100%)] lg:grid-cols-2">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
            >
              <span className="blob left-[8%] top-[10%] h-[55%] w-[34%] bg-[#a9cbff]/60" />
              <span className="blob bottom-[-10%] left-[38%] h-[60%] w-[30%] bg-white/70 [animation-delay:-6s] [animation-duration:22s]" />
              <span className="blob right-[6%] top-[4%] h-[70%] w-[38%] bg-[#8fb7ff]/50 [animation-delay:-11s] [animation-duration:26s]" />
            </div>
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(ellipse_at_50%_100%,rgba(255,255,255,0.7),rgba(255,255,255,0)_70%)]"
            />
            <canvas
              ref={canvasRef}
              aria-hidden="true"
              className="absolute inset-0 h-full w-full"
            />
            {fallback ? (
              <img
                src="/logo/kmk/logo-mark-hd.png"
                alt=""
                className="absolute left-[75%] top-1/2 w-[min(22vw,15rem)] -translate-x-1/2 -translate-y-1/2 max-lg:left-1/2 max-lg:top-[72%] max-lg:w-32"
              />
            ) : null}
            <div className="hx-pins relative flex flex-col items-center justify-start px-8 pt-12 text-center lg:justify-center lg:pt-0">
              <span className="hx-pin grid h-20 w-20 place-items-center rounded-[1.1rem] bg-white shadow-[0_10px_30px_-12px_rgba(20,60,140,0.35)]">
                <img
                  src="/logo/kmk/logo-mark-hd.png"
                  alt=""
                  className="h-12 w-auto"
                />
              </span>
              <p className="hx-pin mt-6 font-display text-[clamp(1.9rem,1.4rem+1.6vw,2.75rem)] font-medium leading-[1.15] text-brand">
                KMK Technology
              </p>
              <p className="hx-pin font-display text-[clamp(1.6rem,1.2rem+1.3vw,2.4rem)] font-normal leading-[1.2] text-[#14306b]">
                {vi
                  ? "Phần mềm · ERP · Chuyển đổi số"
                  : "Software · ERP · Digital"}
              </p>
            </div>
          </div>
        </div>
        <div className="hx-in mt-10 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
          <ul className="flex w-max animate-marquee items-center gap-14 [--marquee-duration:80s] hover:[animation-play-state:paused]">
            {[...logos, ...logos].map((c, i) => (
              <li
                key={i}
                aria-hidden={i >= logos.length}
                className="flex h-14 w-32 shrink-0 items-center justify-center"
              >
                <img
                  src={c.logo}
                  alt={i < logos.length ? c.name : ""}
                  loading="lazy"
                  className="max-h-full max-w-full object-contain"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ================= our work: one card per page ================= */}
      <section id="services" aria-labelledby="work-title" className={section}>
        <div className="shell">
          <div className="text-center">
            <h2 id="work-title" className={h2}>
              {vi ? "Lĩnh vực hoạt động của " : "What "}
              <span className="text-brand">KMK</span>
            </h2>
            <p className={lead}>
              {vi
                ? "KMK Technology cung cấp một hệ sinh thái dịch vụ CNTT toàn diện."
                : "KMK Technology offers a complete ecosystem of IT services."}
            </p>
          </div>
          <ul className="fade-group mt-12 grid gap-8 md:grid-cols-3">
            {pillars.map((c) => (
              <li key={c.to}>
                <Link to={c.to} className="group block">
                  <div className="tilt relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-[#f5f6f8]">
                    {c.visual}
                    <span className="pointer-events-none absolute inset-y-0 left-0 w-1/2 -translate-x-[150%] skew-x-[-20deg] bg-gradient-to-r from-white/0 via-white/50 to-white/0 transition-transform duration-[1.1s] ease-out group-hover:translate-x-[260%]" />
                  </div>
                  <h3 className="mt-5 text-center text-[1.25rem] font-medium text-ink transition-colors group-hover:text-brand">
                    {c.title}
                  </h3>
                  <p className="mx-auto mt-2 max-w-[21rem] text-center text-[0.9375rem] leading-relaxed text-ink/65">
                    {c.body}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ================= experience to trust ================= */}
      <section
        id="intro"
        aria-labelledby="about-title"
        className={`${section} mx-2 rounded-[2rem] sm:mx-4 lg:mx-6 bg-[#f5f6f8]`}
      >
        <div className="shell">
          <div className="text-center">
            <h2 id="about-title" className={h2}>
              {vi ? "Giới thiệu " : "About "}
              <span className="text-brand">
                {vi ? "công ty" : "the company"}
              </span>
            </h2>
            <p className={lead}>
              {t(about.intro)} {t(about.heritage)}
            </p>
            <Link
              to="/about"
              className="fade mt-5 inline-flex items-center gap-1 text-[0.9375rem] font-medium text-brand hover:underline"
            >
              {vi ? "Tìm hiểu về KMK" : "About KMK"} <Icon name="arrowRight" />
            </Link>
          </div>

          <div className="fade-group mt-12 grid gap-6 lg:grid-cols-2">
            <div className="wipe overflow-hidden rounded-[1.75rem] bg-white">
              <img
                src="/home/intro-medifam.webp"
                alt={
                  vi
                    ? "Bác sĩ cùng bệnh nhân xem lịch hẹn và kết quả xét nghiệm trên Medifam"
                    : "A doctor and her patient checking appointments and test results on Medifam"
                }
                width={1774}
                height={887}
                loading="lazy"
                className="h-full w-full object-cover object-center max-lg:aspect-[2/1]"
              />
            </div>
            <div className="flex flex-col justify-between rounded-[1.75rem] bg-white p-8 sm:p-10">
              <div>
                <p className="font-display text-[2rem] font-normal text-ink">
                  Medifam
                </p>
                <p className="mt-1 text-[1rem] text-ink/60">
                  {t(medifam.category)}
                </p>
              </div>
              <dl className="mt-10 grid grid-cols-2 gap-6">
                <div className="flex flex-col-reverse">
                  <dt className="mt-1 text-[1rem] text-ink/75">
                    {vi ? "cơ sở y tế" : "healthcare providers"}
                  </dt>
                  <dd className="font-display text-[clamp(2.8rem,2.2rem+2vw,4rem)] font-normal leading-none text-brand">
                    {figure(medicalClients.length)}
                  </dd>
                </div>
                <div className="flex flex-col-reverse">
                  <dt className="mt-1 text-[1rem] text-ink/75">
                    {vi ? "khách hàng doanh nghiệp" : "enterprise clients"}
                  </dt>
                  <dd className="font-display text-[clamp(2.8rem,2.2rem+2vw,4rem)] font-normal leading-none text-brand">
                    {figure(corporateClients.length)}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="fade-group mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="wipe overflow-hidden rounded-[1.75rem] bg-white">
              <img
                src="/home/intro-office.webp"
                alt={
                  vi
                    ? "Kỹ sư KMK Technology tại văn phòng sau khi triển khai thành công"
                    : "A KMK Technology engineer at the office after a successful deployment"
                }
                width={1254}
                height={1254}
                loading="lazy"
                className="aspect-square h-full w-full object-cover object-center"
              />
            </div>
            <div className="flex flex-col justify-between rounded-[1.75rem] bg-white p-8">
              <div>
                <p className="font-display text-[1.75rem] font-normal text-ink">
                  KMK Technology
                </p>
                <p className="mt-1 text-[0.9375rem] text-ink/60">
                  {vi
                    ? "Kế thừa từ DASolution, thành lập tháng 11/2022"
                    : "Built on DASolution, founded in November 2022"}
                </p>
              </div>
              <div className="mt-8">
                <p className="font-display text-[clamp(2.8rem,2.2rem+2vw,4rem)] font-normal leading-none text-brand">
                  {figure(11, "+")}
                </p>
                <p className="mt-1 text-[1rem] text-ink/75">
                  {vi ? "năm kinh nghiệm" : "years of experience"}
                </p>
              </div>
            </div>
            <div className="wipe overflow-hidden rounded-[1.75rem] bg-white">
              <img
                src="/home/intro-clients.webp"
                alt={
                  vi
                    ? "Dược sĩ và khách hàng xem hóa đơn điện tử trên điện thoại tại nhà thuốc"
                    : "A pharmacist and a customer checking an e-invoice on their phones"
                }
                width={1254}
                height={1254}
                loading="lazy"
                className="aspect-square h-full w-full object-cover object-center"
              />
            </div>
            <div className="flex flex-col justify-between rounded-[1.75rem] bg-white p-8">
              <div>
                <p className="font-display text-[1.75rem] font-normal text-ink">
                  {vi ? "Khách hàng" : "Clients"}
                </p>
                <p className="mt-1 text-[0.9375rem] text-ink/60">
                  {vi
                    ? "Y tế, bán lẻ và quản lý sản xuất"
                    : "Healthcare, retail and production management"}
                </p>
              </div>
              <div className="mt-8">
                <p className="font-display text-[clamp(2.8rem,2.2rem+2vw,4rem)] font-normal leading-none text-brand">
                  {figure(clientCount, "+")}
                </p>
                <p className="mt-1 text-[1rem] text-ink/75">
                  {vi ? "khách hàng tin dùng" : "clients trust us"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ecosystem of products ================= */}
      <section
        id="products"
        aria-labelledby="products-title"
        className={section}
      >
        <div className="shell">
          <div className="fade-group grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex items-start pb-4 sm:col-span-2 lg:col-span-1 lg:p-4">
              <h2
                id="products-title"
                className="font-display text-[clamp(1.9rem,1.4rem+1.6vw,2.6rem)] font-normal leading-[1.2] text-ink"
              >
                {vi
                  ? "Sản phẩm & dịch vụ tiêu biểu"
                  : "Featured products & services"}
              </h2>
            </div>
            {products.map((p) => (
              <article
                key={p.key}
                aria-labelledby={`pr-${p.key}`}
                className={`${line} tilt spot group flex min-h-[17.5rem] flex-col p-8 transition-[transform,box-shadow,border-color] duration-500 ease-out-expo hover:-translate-y-1.5 hover:border-brand/40 hover:shadow-[0_28px_50px_-30px_rgba(20,60,140,0.45)]`}
              >
                <div className="-mx-8 -mt-8 aspect-[16/9] overflow-hidden bg-[#f5f6f8]">
                  <div className="h-full w-full transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.05]">
                    <ProductArt p={p} vi={vi} />
                  </div>
                </div>
                <h3
                  id={`pr-${p.key}`}
                  className="mt-6 font-display text-[1.75rem] font-normal text-ink"
                >
                  <Link to={`/product/${p.key}`} className="hover:text-brand">
                    {p.name}
                  </Link>
                </h3>
                <p className="mt-2 flex-1 text-[1rem] text-ink/65">
                  {t(p.category)}
                </p>
                <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[0.9375rem] font-medium">
                  {p.href ? (
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-brand hover:underline"
                    >
                      {p.hrefLabel} <Icon name="arrowUpRight" />
                      <span className="sr-only">
                        {vi ? " (mở tab mới)" : " (opens in a new tab)"}
                      </span>
                    </a>
                  ) : null}
                  <Link
                    to={`/product/${p.key}`}
                    className="inline-flex items-center gap-1 text-brand hover:underline"
                  >
                    {vi ? "Xem chi tiết" : "Learn more"}{" "}
                    <Icon name="arrowRight" />
                    <span className="sr-only">: {p.name}</span>
                  </Link>
                </div>
              </article>
            ))}
            <Link
              to="/contact"
              className="grad-pan tilt group flex rounded-[1.75rem] lg:col-span-2 min-h-[17.5rem] flex-col justify-between bg-[linear-gradient(120deg,#1a5fc0,#2379e5,#4f95ec,#2379e5)] p-8 text-white"
            >
              <span>
                <span className="block font-display text-[1.75rem] font-normal leading-tight">
                  {vi
                    ? "Cần một giải pháp riêng cho doanh nghiệp?"
                    : "Need a solution built for your business?"}
                </span>
                <span className="mt-3 block max-w-[34rem] text-[1rem] leading-relaxed text-white/85">
                  {vi
                    ? "KMK Technology xây dựng phần mềm chuyên biệt theo yêu cầu của từng doanh nghiệp, giúp hợp lý hóa quy trình và giảm bớt sự phức tạp để bạn tập trung vào hoạt động cốt lõi."
                    : "KMK Technology builds specialised software to each business's requirements, streamlining processes and reducing complexity so you can focus on your core work."}
                </span>
                <span className="mt-6 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                  {services.map((sv) => (
                    <span
                      key={sv.key}
                      className="flex items-center gap-2.5 text-[0.9375rem]"
                    >
                      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-white/20 text-[0.625rem]">
                        <Icon name="check" />
                      </span>
                      {t(sv.title)}
                    </span>
                  ))}
                </span>
              </span>
              <span className="mt-8 flex flex-wrap items-center  gap-4 border-t border-white/20 pt-5">
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[0.9375rem] font-medium text-brand">
                  {vi ? "Liên hệ KMK" : "Talk to KMK"}{" "}
                  <Icon
                    name="arrowRight"
                    className="transition-transform duration-500 group-hover:translate-x-1.5"
                  />
                </span>
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
