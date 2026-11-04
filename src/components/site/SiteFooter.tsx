import { Link } from "react-router-dom";
import { company, products, services } from "../../content/site";
import { useLang } from "../../i18n/context";
import Icon from "../ui/Icon";
import { contactFor, SHOW_CAREERS } from "./pages";

/*
 * Site footer, after zalo.me: a light-grey block inside the page margins, flush with the bottom
 * of the page. Inside: the logo and the address, a hairline, then three columns of links with
 * larger headings (solutions; support & contact; the company, with the products under it) and
 * a quiet last line with the copyright.
 */
export default function SiteFooter() {
  const { t, lang } = useLang();
  const vi = lang === "vi";
  const head = "text-[1.25rem] font-medium text-ink";
  const item = "text-[1rem] text-ink transition-colors hover:text-brand";
  const list = "mt-4 space-y-3.5";

  return (
    <footer className="mt-[clamp(3rem,8vh,5rem)] bg-white pb-[clamp(1.5rem,4vh,2.5rem)]">
      <div className="shell">
        <div className="rounded-[2rem] bg-[#f5f6f8] px-[clamp(1.5rem,8vw,7rem)] pb-10 pt-14">
          <div className="flex items-center justify-between gap-4">
            <Link to="/" aria-label="KMK Technology" className="inline-block">
              <img
                src="/logo/kmk/long-logo-trim.png"
                alt="KMK Technology"
                className="h-11 w-auto"
              />
            </Link>
            <div className="flex gap-2">
              {[
                {
                  href: company.facebookHref,
                  icon: "facebook" as const,
                  label: "Facebook",
                },
                {
                  href: company.messengerHref,
                  icon: "messenger" as const,
                  label: "Messenger",
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.label} KMK Technology${vi ? " (mở tab mới)" : " (opens in a new tab)"}`}
                  className="grid h-11 w-11 place-items-center rounded-full bg-white text-[1.25rem] text-ink transition-colors hover:bg-brand hover:text-white"
                >
                  <Icon name={s.icon} />
                </a>
              ))}
            </div>
          </div>
          <p className="mt-5 text-[1rem] text-ink">
            {t(company.legalName)} · {t(company.address)}
          </p>

          <nav
            aria-label={vi ? "Liên kết chân trang" : "Footer links"}
            className="mt-10 grid gap-x-10 gap-y-10 border-t border-ink/[0.07] pt-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_0.9fr]"
          >
            <div>
              <p className={head}>{vi ? "Giải pháp" : "Solutions"}</p>
              <ul className={list}>
                {services.map((s) => (
                  <li key={s.key}>
                    <Link to={contactFor(s.key)} className={item}>
                      {t(s.title)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className={head}>
                {vi ? "Hỗ trợ & Liên hệ" : "Support & Contact"}
              </p>
              <ul className={list}>
                <li>
                  <Link to="/contact" className={item}>
                    {vi ? "Gửi yêu cầu tư vấn" : "Request a consultation"}
                  </Link>
                </li>
                <li>
                  <a href={company.phoneHref} className={item}>
                    {company.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${company.email}`}
                    className={`${item} break-all`}
                  >
                    {company.email}
                  </a>
                </li>
                {[
                  { href: company.facebookHref, label: "Facebook" },
                  { href: company.messengerHref, label: "Messenger" },
                ].map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={item}
                    >
                      {s.label}
                      <span className="sr-only">
                        {vi ? " (mở tab mới)" : " (opens in a new tab)"}
                      </span>
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={company.mapHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={item}
                  >
                    {vi ? "Chỉ đường văn phòng" : "Office directions"}
                    <span className="sr-only">
                      {vi
                        ? " (Google Maps, mở tab mới)"
                        : " (Google Maps, opens in a new tab)"}
                    </span>
                  </a>
                </li>
                <li>
                  <Link to="/projects/medcg/policy" className={item}>
                    {vi ? "Chính sách bảo mật" : "Privacy policy"}
                  </Link>
                </li>
                <li>
                  <Link to="/projects/medcg/terms" className={item}>
                    {vi ? "Điều khoản dịch vụ" : "Terms of service"}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className={head}>KMK</p>
              <ul className={list}>
                <li>
                  <Link to="/about" className={item}>
                    {vi ? "Về chúng tôi" : "About us"}
                  </Link>
                </li>
                <li>
                  <Link to="/clients" className={item}>
                    {vi ? "Khách hàng" : "Clients"}
                  </Link>
                </li>
                <li>
                  <Link to="/technology" className={item}>
                    {vi ? "Công nghệ" : "Technology"}
                  </Link>
                </li>
                {SHOW_CAREERS ? (
                  <li>
                    <Link to="/careers" className={item}>
                      {vi ? "Tuyển dụng" : "Careers"}
                    </Link>
                  </li>
                ) : null}
              </ul>
              <p className={`${head} mt-10`}>{vi ? "Sản phẩm" : "Products"}</p>
              <ul className={list}>
                {products.map((p) => (
                  <li key={p.key}>
                    <Link to={`/product/${p.key}`} className={item}>
                      {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <p className="mt-12 text-[0.875rem] text-ink/50">
            © {new Date().getFullYear()} KMK Technology.{" "}
            {vi ? "Bảo lưu mọi quyền." : "All rights reserved."} &ldquo;
            {company.motto}&rdquo;
          </p>
        </div>
      </div>
    </footer>
  );
}
