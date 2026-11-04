import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SiteLayout from "../../components/site/SiteLayout";
import MarkStory from "../../components/world/MarkStory";
import { useLang } from "../../i18n/context";
import { appReady } from "../../lib/ready";
import { clearHash, scrollToEl } from "../../lib/smooth";

/** Home - the company at a glance (MarkStory); each section leads on to its own page. */
export default function Home() {
  const { lang } = useLang();
  const vi = lang === "vi";

  const navigate = useNavigate();

  // old one-page links: sections that moved to their own page open that page, the rest scroll
  useEffect(() => {
    const { hash } = window.location;
    if (hash.length < 2) return;
    const moved: Record<string, string> = {
      team: "/about",
      clients: "/clients",
      platform: "/technology",
      contact: "/contact",
    };
    const to = moved[decodeURIComponent(hash.slice(1))];
    if (to) {
      navigate(to, { replace: true });
      return;
    }
    appReady.then(() =>
      requestAnimationFrame(() => {
        const el = document.getElementById(decodeURIComponent(hash.slice(1)));
        if (el) scrollToEl(el, true);
        clearHash();
      }),
    );
  }, [navigate]);

  return (
    <SiteLayout
      title={
        vi
          ? "KMK Technology | Đơn giản hóa doanh nghiệp của bạn"
          : "KMK Technology | Simplify your business"
      }
      description={
        vi
          ? "Công ty TNHH Công Nghệ KMK (KMK Technology) chuyên cung cấp các giải pháp công nghệ thông tin sáng tạo và đáng tin cậy. Sản phẩm: MEDIFAM, KMK Sales, Digital Information."
          : "KMK Technology Co., Ltd. provides creative and reliable information technology solutions. Products: MEDIFAM, KMK Sales, Digital Information."
      }
    >
      <MarkStory />
    </SiteLayout>
  );
}
