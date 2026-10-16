import { useEffect, useRef, useState } from "react";
import {
  about,
  clientCount,
  corporateClients,
  medicalClients,
  platformGroups,
  products,
  services,
} from "../../content/site";
import { requestTopic } from "../../features/contact/topic";
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
import Rise from "../home/Rise";
import { countIn, riseIn } from "../home/reveal";
import Magnetic from "../motion/Magnetic";
import Icon from "../ui/Icon";
import ProductMark from "../ui/ProductMark";
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
 * Pose of the mark for each beat (screen fractions: x -1 left … 1 right, y -1 bottom … 1 top).
 * hero → about (editorial) → services (spec callouts) → products (tiers) → clients → technology.
 */
const POSES: Pose[] = [
  { x: 0, y: -0.02, scale: 1.25, ry: -0.35, rx: 0.08 },
  { x: 0.5, y: 0, scale: 0.8, ry: 0.7, rx: -0.15 },
  { x: 0, y: -0.1, scale: 0.78, ry: -1.05, rx: 0.35 },
  { x: 0, y: 0.6, scale: 0.36, ry: 0.2, rx: 0 },
  { x: -0.6, y: 0.05, scale: 0.6, ry: 0.9, rx: 0.1 },
  { x: 0.6, y: 0, scale: 0.7, ry: -0.6, rx: -0.2 },
];

/** Phones: an empty slot the 3D mark travels to (sized to the logo face), see markScene anchors. */
function Anchor({ big = false }: { big?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={`ms-anchor pointer-events-none mx-auto aspect-[834/946] lg:hidden ${big ? "h-[min(34svh,17rem)]" : "mb-10 h-[min(22svh,9.5rem)]"}`}
    />
  );
}

const label = "text-[0.8125rem] font-semibold uppercase";

/*
 * Home story after Oryzo (Lusion): one 3D object - the official KMK mark - stays on stage while
 * the page scrolls around it. A huge wordmark sits behind it in the hero, the services are spec
 * callouts pointing at it, the products are a three-column line-up, and each beat moves the mark
 * to a new pose with weighted easing (markScene).
 */
export default function MarkStory() {
  const { t, lang } = useLang();
  const vi = lang === "vi";
  const root = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scene = useRef<MarkScene | null>(null);
  const [fallback, setFallback] = useState(false);
  const [beat, setBeat] = useState(0);
  const [inStory, setInStory] = useState(true);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => void appReady.then(() => setLoaded(true)), []);
  const beats = vi
    ? [
        "Mở đầu",
        "Về chúng tôi",
        "Dịch vụ",
        "Sản phẩm",
        "Khách hàng",
        "Công nghệ",
      ]
    : ["Opening", "About us", "Services", "Products", "Clients", "Technology"];

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
    // built under the preloader, so the loader logo can land on it (see lib/ready markStage)
    import("./markScene")
      .then(({ createMarkScene }) =>
        createMarkScene(canvas, prefersReducedMotion()),
      )
      .then((s) => {
        if (disposed) return s.dispose();
        scene.current = s;
        s.setPoses(POSES);
        const slots =
          root.current?.querySelectorAll<HTMLElement>(".ms-anchor") ?? [];
        s.setAnchors(() =>
          Array.from(slots, (el) => el.getBoundingClientRect()),
        );
        // render only once it can be seen (the loader covers it until the logo lands), and only
        // while the story is on screen
        let started = false;
        const start = () => {
          if (started || disposed) return;
          started = true;
          io = new IntersectionObserver(([e]) =>
            s.setRunning(e.isIntersecting),
          );
          if (root.current) io.observe(root.current);
          s.setRunning(true);
        };
        setMarkStage({
          rect: () => s.frontRect(),
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
      // each beat arriving at the top of the screen moves the mark to its pose
      gsap.utils
        .toArray<HTMLElement>(".ms-beat", root.current)
        .forEach((el, i) => {
          if (i === 0) return;
          ScrollTrigger.create({
            trigger: el,
            start: "top bottom",
            end: "top top",
            onUpdate: (self) =>
              scene.current?.setProgress(i - 1 + self.progress),
            onLeaveBack: () => scene.current?.setProgress(i - 1),
            onLeave: () => scene.current?.setProgress(i),
          });
        });

      // HUD: which beat is under the middle of the screen
      gsap.utils
        .toArray<HTMLElement>(".ms-beat", root.current)
        .forEach((el, i) =>
          ScrollTrigger.create({
            trigger: el,
            start: "top 50%",
            end: "bottom 50%",
            onToggle: (self) => self.isActive && setBeat(i),
          }),
        );
      ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: "bottom 60%",
        onToggle: (self) => setInStory(self.isActive),
      });

      // the mark bows out as the story ends, instead of being cut off by the next section
      gsap.to(".ms-canvas", {
        autoAlpha: 0,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "bottom 98%",
          end: "bottom 60%",
          scrub: true,
        },
      });

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // section titles: words rise out of their masks
        if (root.current) {
          riseIn(root.current);
          countIn(root.current);
        }

        // hero entrance after the preloader: the giant wordmark slides up behind the mark
        const intro = gsap.timeline({
          paused: true,
          defaults: { ease: "expo.out" },
        });
        intro
          .from(
            ".hx-giant",
            { yPercent: 60, autoAlpha: 0, duration: 1.8, stagger: 0.08 },
            0,
          )
          .from(
            ".hx-word",
            { yPercent: 115, duration: 1.2, stagger: 0.04 },
            0.5,
          )
          .from(
            ".hx-in",
            { y: 18, autoAlpha: 0, duration: 1, stagger: 0.07 },
            0.8,
          );
        appReady.then(() => intro.play());

        // giant wordmark drifts and fades as the hero scrolls away
        gsap.to(".hx-back", {
          yPercent: -18,
          autoAlpha: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ".ms-hero",
            start: "top top",
            end: "bottom 30%",
            scrub: true,
          },
        });

        // about: the statement lights up word by word while scrolled
        gsap.fromTo(
          ".ab-w",
          { opacity: 0.14 },
          {
            opacity: 1,
            stagger: 0.1,
            ease: "none",
            scrollTrigger: {
              trigger: ".ab-text",
              start: "top 80%",
              end: "bottom 45%",
              scrub: true,
            },
          },
        );

        // services: the callouts and their leader lines draw in around the mark
        gsap
          .timeline({
            scrollTrigger: {
              trigger: ".sv-stage",
              start: "top 60%",
              toggleActions: "play none none reverse",
            },
          })
          .from(".sv-line", {
            scaleX: 0,
            duration: 1,
            stagger: 0.12,
            ease: "expo.inOut",
          })
          .from(
            ".sv-dot",
            { scale: 0, duration: 0.6, stagger: 0.12, ease: "back.out(3)" },
            0.3,
          )
          .from(
            ".sv-card",
            {
              y: 30,
              autoAlpha: 0,
              duration: 1,
              stagger: 0.12,
              ease: "expo.out",
            },
            0.4,
          );

        // everything marked .rv rises in once
        gsap.utils.toArray<HTMLElement>(".rv", root.current).forEach((el) =>
          gsap.from(el, {
            y: 50,
            autoAlpha: 0,
            duration: 1.2,
            ease: "expo.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }),
        );

        // client logos ripple in
        gsap.from(".cl-logo", {
          y: 24,
          autoAlpha: 0,
          duration: 0.8,
          ease: "expo.out",
          stagger: { each: 0.025, from: "start" },
          scrollTrigger: {
            trigger: ".cl-grid",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });

      mm.add(`${MOTION_OK} and ${POINTER_FINE}`, () => {
        // cards tilt toward the pointer and a soft light follows it
        const offs = gsap.utils
          .toArray<HTMLElement>(".tilt", root.current)
          .map((card) => {
            gsap.set(card, { transformPerspective: 900 });
            const rx = gsap.quickTo(card, "rotationX", {
              duration: 0.6,
              ease: "power3.out",
            });
            const ry = gsap.quickTo(card, "rotationY", {
              duration: 0.6,
              ease: "power3.out",
            });
            const onMove = (e: PointerEvent) => {
              const r = card.getBoundingClientRect();
              const x = (e.clientX - r.left) / r.width;
              const y = (e.clientY - r.top) / r.height;
              card.style.setProperty("--mx", `${x * 100}%`);
              card.style.setProperty("--my", `${y * 100}%`);
              rx((0.5 - y) * 6);
              ry((x - 0.5) * 8);
            };
            const onLeave = () => {
              rx(0);
              ry(0);
            };
            card.addEventListener("pointermove", onMove);
            card.addEventListener("pointerleave", onLeave);
            return () => {
              card.removeEventListener("pointermove", onMove);
              card.removeEventListener("pointerleave", onLeave);
            };
          });

        const move = (e: PointerEvent) =>
          scene.current?.setPointer(
            e.clientX / window.innerWidth - 0.5,
            e.clientY / window.innerHeight - 0.5,
          );
        window.addEventListener("pointermove", move, { passive: true });
        return () => {
          window.removeEventListener("pointermove", move);
          offs.forEach((off) => off());
        };
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

  const statement = t(about.manifesto);
  const all = [...corporateClients, ...medicalClients];
  return (
    <div ref={root} className="relative">
      {/* stage: studio backdrop, the giant wordmark and the 3D mark, fixed behind the story */}
      <div
        className="pointer-events-none sticky top-0 -mb-[100svh] h-[100svh] w-full overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_45%,#ffffff_0%,#eef2fb_55%,#e3eaf8_100%)]" />
        <div className="hx-back absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-center font-display font-bold leading-[0.8] text-brand/[0.1]">
          <span className="hx-giant block text-[clamp(7rem,30vw,30rem)]">
            KMK
          </span>
        </div>
        <canvas
          ref={canvasRef}
          className="ms-canvas absolute inset-0 h-full w-full"
        />
        {fallback ? (
          <div className="absolute inset-0 grid place-items-center">
            <img src="/logo/kmk/logo-mark.png" alt="" className="w-40" />
          </div>
        ) : null}
      </div>

      {/* HUD: where you are in the story */}
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed bottom-8 left-5 z-30 hidden items-center gap-4 transition-opacity duration-500 [writing-mode:vertical-rl] rotate-180 2xl:flex ${inStory && loaded ? "opacity-100" : "opacity-0"}`}
      >
        <span className="font-display text-[0.875rem] font-semibold tabular-nums text-ink">
          {String(beat + 1).padStart(2, "0")}
          <span className="text-ink/35">
            {" "}
            / {String(beats.length).padStart(2, "0")}
          </span>
        </span>
        <span className="relative h-16 w-px overflow-hidden bg-ink/15">
          <span
            className="absolute inset-x-0 top-0 bg-brand transition-[height] duration-700 ease-out-expo"
            style={{ height: `${((beat + 1) / beats.length) * 100}%` }}
          />
        </span>
        <span className="text-[0.8125rem] font-semibold uppercase text-ink/55">
          {beats[beat]}
        </span>
      </div>

      {/* 01 - hero */}
      <section
        id="kmk"
        aria-labelledby="hero-title"
        className="ms-beat ms-hero relative h-[100svh] overflow-hidden"
      >
        <div className="shell relative flex h-full flex-col justify-between pb-8 pt-[calc(var(--header-h)+1.5rem)]">
          {/* keeps the headline at the bottom of the hero */}
          <div aria-hidden="true" />

          <Anchor big />

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <h1
              id="hero-title"
              className="max-w-[40rem] font-display text-[clamp(2.25rem,1.3rem+3.2vw,4.5rem)] font-semibold leading-[1.02] text-ink"
            >
              {vi ? (
                <>
                  {words("Đơn giản hóa", "text-brand")}{" "}
                  {words("doanh nghiệp của bạn.")}
                </>
              ) : (
                <>
                  {words("Simplify", "text-brand")} {words("your business.")}
                </>
              )}
            </h1>
            <div className="hx-in flex max-w-[22rem] flex-col gap-5 lg:items-end lg:text-right">
              <p className="text-[1rem] leading-relaxed text-ink/65">
                {vi
                  ? "KMK Technology đồng hành cùng doanh nghiệp với giải pháp phần mềm, ERP, hạ tầng cloud và dịch vụ IT outsourcing."
                  : "KMK Technology partners with businesses on software, ERP, cloud infrastructure and IT outsourcing."}
              </p>
              <div className="flex flex-wrap gap-3">
                <Magnetic>
                  <a
                    href="#contact"
                    className="group inline-flex min-h-[50px] items-center gap-3 rounded-full bg-ink pl-6 pr-1.5 font-semibold text-white transition-colors hover:bg-brand"
                  >
                    {vi ? "Liên hệ tư vấn" : "Contact us"}
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-ink transition-transform duration-500 group-hover:rotate-[-45deg]">
                      <Icon name="arrowRight" />
                    </span>
                  </a>
                </Magnetic>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02 - about, as an editorial spread */}
      <section
        id="intro"
        aria-labelledby="about-title"
        className="ms-beat relative py-[clamp(6rem,14vh,10rem)]"
      >
        <Anchor />
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="rv flex items-center justify-between border-b border-ink/15 pb-3">
              <p className={`${label} text-brand`}>
                {vi ? "Về chúng tôi" : "About us"}
              </p>
              <p className={`${label} text-ink/45`}>
                {vi
                  ? "Sứ mệnh · Tầm nhìn · Giá trị"
                  : "Mission · Vision · Values"}
              </p>
            </div>
            <h2 id="about-title" className="sr-only">
              {vi ? "Về KMK Technology" : "About KMK Technology"}
            </h2>
            <p className="ab-text mt-10 font-display text-[clamp(1.6rem,1rem+1.9vw,2.75rem)] font-semibold leading-[1.1] text-ink">
              {statement.split(" ").map((w, i) => (
                <span key={i} className="ab-w">
                  {w}{" "}
                </span>
              ))}
            </p>
            <div className="mt-14 grid gap-8 border-t border-ink/15 pt-8 sm:grid-cols-2">
              {[about.mission, about.vision].map((m) => (
                <div key={m.label.en} className="rv">
                  <p className={`${label} text-ink/45`}>{t(m.label)}</p>
                  <p className="mt-3 text-[1.5rem] font-semibold leading-tight text-ink">
                    {t(m.title)}
                  </p>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink/60">
                    {t(m.body)}
                  </p>
                </div>
              ))}
            </div>
            <dl className="rv mt-12 grid grid-cols-3 gap-4 rounded-[1.5rem] bg-white/80 p-6 ring-1 ring-white sm:p-8">
              {[
                {
                  v: services.length,
                  plus: false,
                  l: vi ? "Lĩnh vực dịch vụ" : "Service lines",
                },
                {
                  v: products.length,
                  plus: false,
                  l: vi ? "Sản phẩm phát triển" : "In-house products",
                },
                {
                  v: clientCount,
                  plus: true,
                  l: vi ? "Khách hàng tin dùng" : "Clients",
                },
              ].map((x) => (
                <div key={x.l} className="flex flex-col-reverse">
                  <dt className="mt-2 text-[0.875rem] leading-snug text-ink/55">
                    {x.l}
                  </dt>
                  <dd className="font-display text-[clamp(2.2rem,1.6rem+2vw,3.5rem)] font-semibold leading-none text-ink">
                    <span data-count={x.v} data-pad="2">
                      {String(x.v).padStart(2, "0")}
                    </span>
                    {x.plus ? <span className="text-brand">+</span> : null}
                  </dd>
                </div>
              ))}
            </dl>
            <ul
              className="rv mt-8 flex flex-wrap gap-2"
              aria-label={vi ? "Giá trị" : "Values"}
            >
              {about.values.map((v) => (
                <li
                  key={v.en}
                  className="rounded-full border border-ink/15 bg-white/70 px-4 py-1.5 text-[0.9375rem] font-medium text-ink"
                >
                  {t(v)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 03 - services as spec callouts around the mark */}
      <div
        id="services"
        role="region"
        aria-label={vi ? "Dịch vụ" : "Services"}
        className="ms-beat relative"
      >
        <Anchor />
        <div className="sv-stage relative lg:h-[100svh]">
          <div className="shell relative flex h-full flex-col py-[clamp(4rem,10vh,6rem)] lg:pt-[calc(var(--header-h)+2rem)]">
            <div className="rv text-center">
              <p className={`${label} text-brand`}>
                {vi ? "Dịch vụ của chúng tôi" : "Our services"}
              </p>
              <h2 className="rise mt-3 font-display text-[clamp(2rem,1.3rem+2.2vw,3.5rem)] font-semibold leading-[1.05] text-ink">
                <Rise
                  parts={
                    vi
                      ? [
                          { t: "Giải pháp toàn diện" },
                          { t: "cho doanh nghiệp.", accent: true },
                        ]
                      : [
                          { t: "End-to-end solutions" },
                          { t: "for your business.", accent: true },
                        ]
                  }
                />
              </h2>
            </div>
            <div className="mt-10 grid flex-1 gap-5 lg:mt-0 lg:grid-cols-[1fr_minmax(16rem,30%)_1fr] lg:grid-rows-2 lg:gap-x-0 lg:gap-y-10 lg:py-10">
              {services.map((s, i) => {
                const right = i % 2 === 1;
                return (
                  <article
                    key={s.key}
                    aria-labelledby={`sv-${s.key}`}
                    className={`relative flex ${right ? "lg:col-start-3 lg:justify-start" : "lg:col-start-1 lg:justify-end"} ${i < 2 ? "lg:row-start-1 lg:items-end" : "lg:row-start-2 lg:items-start"}`}
                  >
                    {/* leader line toward the mark */}
                    <span
                      aria-hidden="true"
                      className={`sv-line absolute top-1/2 hidden h-px w-[22%] bg-ink/30 lg:block ${right ? "right-[calc(100%-0.5rem)] origin-right" : "left-[calc(100%-0.5rem)] origin-left"}`}
                    />
                    <span
                      aria-hidden="true"
                      className={`sv-dot absolute top-1/2 hidden h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-brand ring-4 ring-brand/20 lg:block ${right ? "right-[calc(122%-0.5rem)]" : "left-[calc(122%-0.5rem)]"}`}
                    />
                    <div className="sv-card tilt group relative w-full overflow-hidden rounded-[1.5rem] border border-white bg-white/85 p-6 shadow-[0_24px_60px_-36px_rgba(20,40,90,0.4)] backdrop-blur-md lg:max-w-[23rem]">
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        style={{
                          background:
                            "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgba(69,122,231,0.14), transparent 45%)",
                        }}
                      />
                      <div className="flex items-baseline justify-between gap-4">
                        <p className={`${label} text-brand`}>0{i + 1}</p>
                        <p className="text-[0.8125rem] font-medium text-ink/50">
                          {t(s.short)}
                        </p>
                      </div>
                      <h3
                        id={`sv-${s.key}`}
                        className="mt-3 text-[1.5rem] font-semibold leading-tight text-ink"
                      >
                        {t(s.title)}
                      </h3>
                      <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink/65">
                        {t(s.description)}
                      </p>
                      {s.stack ? (
                        <p className="mt-3 text-[0.8125rem] font-medium text-ink/45">
                          {s.stack.join(" · ")}
                        </p>
                      ) : null}
                      <a
                        href="#contact"
                        onClick={() => requestTopic(s.key)}
                        className="group mt-4 inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-brand"
                      >
                        {vi ? "Nhận tư vấn" : "Request a consultation"}
                        <Icon
                          name="arrowRight"
                          className="transition-transform group-hover:translate-x-1"
                        />
                        <span className="sr-only">: {t(s.title)}</span>
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 04 - products, as a three-column line-up */}
      <section
        id="products"
        aria-labelledby="products-title"
        className="ms-beat relative pb-[clamp(5rem,12vh,8rem)] pt-[clamp(4rem,10vh,6rem)] lg:pt-[clamp(14rem,34vh,20rem)]"
      >
        <Anchor />
        <div className="shell">
          <div className="rv text-center">
            <p className={`${label} text-brand`}>
              {vi ? "Sản phẩm" : "Products"}
            </p>
            <h2
              id="products-title"
              className="rise mt-3 font-display text-[clamp(2rem,1.3rem+2.2vw,3.5rem)] font-semibold leading-[1.05] text-ink"
            >
              <Rise
                parts={
                  vi
                    ? [
                        { t: "Sản phẩm do" },
                        { t: "KMK phát triển.", accent: true },
                      ]
                    : [{ t: "Products built" }, { t: "by KMK.", accent: true }]
                }
              />
            </h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {products.map((p, i) => (
              <article
                key={p.key}
                className="rv tilt group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-white bg-white/90 p-7 shadow-[0_30px_70px_-40px_rgba(20,40,90,0.45)] transition-shadow duration-700 hover:shadow-[0_40px_90px_-40px_rgba(58,107,214,0.55)]"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgba(69,122,231,0.14), transparent 45%)",
                  }}
                />
                <div className="flex items-center justify-between">
                  <p className={`${label} text-ink/45`}>0{i + 1}</p>
                  <p className="rounded-full bg-brand-tint px-3 py-1 text-[0.8125rem] font-semibold text-brand">
                    {t(p.category)}
                  </p>
                </div>
                <div className="mt-12">
                  <ProductMark p={p} size="lg" />
                </div>
                <p className="mt-5 flex-1 text-[1rem] leading-relaxed text-ink/65">
                  {t(p.description)}
                </p>
                {/* one soft-blue button: the product website, or a demo request when there is none */}
                <div className="mt-8 border-t border-ink/10 pt-5">
                  {p.href ? (
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-brand-tint px-5 font-semibold text-brand transition-colors hover:bg-brand hover:text-white"
                    >
                      {p.hrefLabel} <Icon name="arrowUpRight" />
                      <span className="sr-only">
                        {vi ? " (mở tab mới)" : " (opens in a new tab)"}
                      </span>
                    </a>
                  ) : (
                    <a
                      href="#contact"
                      onClick={() => requestTopic(p.key)}
                      className="flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-brand-tint px-5 font-semibold text-brand transition-colors hover:bg-brand hover:text-white"
                    >
                      {vi ? "Liên hệ demo" : "Request a demo"}{" "}
                      <Icon name="arrowRight" />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 05 - clients: the 3D mark on the left, the client list on the right */}
      <section
        id="clients"
        aria-labelledby="clients-title"
        className="ms-beat relative py-[clamp(5rem,12vh,8rem)]"
      >
        <Anchor />
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7 lg:col-start-6">
            <p className={`rv ${label} text-brand`}>
              {vi ? "Khách hàng" : "Clients"}
            </p>
            <h2
              id="clients-title"
              className="rise mt-3 font-display text-[clamp(2rem,1.3rem+2.2vw,3.5rem)] font-semibold leading-[1.05] text-ink"
            >
              <Rise
                parts={[
                  { t: vi ? "Được tin dùng bởi" : "Trusted by" },
                  { t: `${clientCount}+`, accent: true },
                  {
                    t: vi
                      ? "doanh nghiệp và cơ sở y tế."
                      : "businesses and healthcare providers.",
                  },
                ]}
              />
            </h2>
            <dl className="rv mt-8 grid grid-cols-3 divide-x divide-ink/10 rounded-[1.5rem] bg-white/80 py-5 ring-1 ring-white">
              {[
                {
                  v: clientCount,
                  plus: true,
                  l: vi ? "Khách hàng" : "Clients",
                  c: "text-ink",
                },
                {
                  v: corporateClients.length,
                  plus: false,
                  l: vi ? "Doanh nghiệp" : "Enterprises",
                  c: "text-ink",
                },
                {
                  v: medicalClients.length,
                  plus: false,
                  l: vi ? "Cơ sở y tế" : "Healthcare",
                  c: "text-brand",
                },
              ].map((x) => (
                <div
                  key={x.l}
                  className="flex flex-col-reverse items-center px-2"
                >
                  <dt className="mt-1 text-[0.875rem] text-ink/55">{x.l}</dt>
                  <dd
                    className={`font-display text-[clamp(1.8rem,1.4rem+1.4vw,2.6rem)] font-semibold leading-none ${x.c}`}
                  >
                    <span data-count={x.v} data-pad="2">
                      {String(x.v).padStart(2, "0")}
                    </span>
                    {x.plus ? <span className="text-brand">+</span> : null}
                  </dd>
                </div>
              ))}
            </dl>
            <ul className="cl-grid mt-6 grid grid-cols-3 gap-2 sm:grid-cols-5">
              {all.map((c) => (
                <li
                  key={c.name}
                  title={c.name}
                  className="cl-logo flex aspect-[3/2] items-center justify-center rounded-2xl bg-white p-3 ring-1 ring-ink/[0.04] transition-[box-shadow,transform] duration-500 hover:-translate-y-1 hover:shadow-[0_18px_40px_-24px_rgba(20,40,90,0.45)]"
                >
                  <img
                    src={c.logo}
                    alt={c.name}
                    loading="lazy"
                    className="max-h-full max-w-full object-contain"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 06 - technology */}
      <section
        id="platform"
        aria-labelledby="platform-title"
        className="ms-beat relative py-[clamp(5rem,12vh,8rem)]"
      >
        <Anchor />
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className={`rv ${label} text-brand`}>
              {vi ? "Công nghệ" : "Technology"}
            </p>
            <h2
              id="platform-title"
              className="rise mt-3 font-display text-[clamp(2rem,1.3rem+2.2vw,3.5rem)] font-semibold leading-[1.05] text-ink"
            >
              <Rise
                parts={
                  vi
                    ? [
                        { t: "Nền tảng công nghệ", accent: true },
                        { t: "phù hợp cho từng bài toán." },
                      ]
                    : [
                        { t: "The right" },
                        { t: "technology", accent: true },
                        { t: "for every challenge." },
                      ]
                }
              />
            </h2>
            <ul className="mt-10 border-t border-ink/15">
              {platformGroups.map((g, i) => (
                <li
                  key={g.title.en}
                  className="rv grid grid-cols-[3rem_1fr] gap-4 border-b border-ink/15 py-6"
                >
                  <span className={`${label} pt-1 text-ink/40`}>0{i + 1}</span>
                  <div>
                    <p className="text-[1.25rem] font-semibold text-ink">
                      {t(g.title)}
                    </p>
                    <p className="mt-1 text-[0.9375rem] text-ink/60">
                      {t(g.benefit)}
                    </p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {g.items.map((it) => (
                        <li
                          key={it.name}
                          className="inline-flex items-center gap-2 rounded-full border border-white bg-white/85 py-1 pl-1.5 pr-3 text-[0.8125rem] font-medium text-ink"
                        >
                          <img
                            src={it.icon}
                            alt=""
                            className="h-5 w-5 object-contain"
                            loading="lazy"
                          />
                          {it.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
