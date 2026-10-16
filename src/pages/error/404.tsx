import { useEffect } from "react";
import Header from "../../components/layout/Header";
import Icon from "../../components/ui/Icon";
import { useLang } from "../../i18n/context";

export default function NotFound() {
  const { lang } = useLang();
  const vi = lang === "vi";

  useEffect(() => {
    const previous = document.title;
    document.title = `404 - ${vi ? "Không tìm thấy trang" : "Page not found"} | KMK Technology`;
    return () => {
      document.title = previous;
    };
  }, [vi]);

  return (
    <>
      <Header variant="page" />
      <main
        id="main"
        className="relative grid min-h-[100svh] place-items-center overflow-hidden bg-[radial-gradient(ellipse_70%_60%_at_50%_45%,#ffffff_0%,#eef2fb_55%,#e3eaf8_100%)] px-[var(--gutter)] pb-20 pt-[calc(var(--header-h)+4rem)]"
      >
        <div className="relative text-center">
          {/* 4 [KMK mark] 4 */}
          <p
            aria-hidden="true"
            className="flex items-center justify-center gap-[0.04em] font-display text-[clamp(7rem,24vw,16rem)] font-bold leading-none text-brand"
          >
            <span>4</span>
            <img
              src="/logo/kmk/logo-mark-hd.png"
              alt=""
              className="h-[0.78em] w-auto animate-floaty drop-shadow-[0_24px_40px_rgba(58,107,214,0.35)]"
            />
            <span>4</span>
          </p>
          <h1 className="mt-8 font-display text-[clamp(1.6rem,1.2rem+1.4vw,2.4rem)] font-semibold leading-tight text-ink">
            {vi
              ? "Không tìm thấy trang bạn yêu cầu"
              : "We couldn't find the page you asked for"}
          </h1>
          <p className="mx-auto mt-4 max-w-[30rem] leading-relaxed text-ink/60">
            {vi
              ? "Địa chỉ có thể đã bị nhập sai hoặc trang không còn tồn tại."
              : "The address may be mistyped, or the page may no longer exist."}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a
              href="/"
              className="group inline-flex min-h-[50px] items-center gap-3 rounded-full bg-ink pl-6 pr-1.5 font-semibold text-white transition-colors hover:bg-brand"
            >
              {vi ? "Về trang chủ" : "Back to home"}
              <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-ink transition-transform duration-500 group-hover:rotate-[-45deg]">
                <Icon name="arrowRight" />
              </span>
            </a>
            <a
              href="/#contact"
              className="inline-flex min-h-[50px] items-center rounded-full border border-ink/15 bg-white/70 px-6 font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
            >
              {vi ? "Liên hệ KMK" : "Contact KMK"}
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
