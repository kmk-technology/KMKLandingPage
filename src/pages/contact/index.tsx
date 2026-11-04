import { useRef } from "react";
import Contact from "../../components/home/Contact";
import { usePageMotion } from "../../components/site/motion";
import SiteLayout, { PageHero } from "../../components/site/SiteLayout";
import { useLang } from "../../i18n/context";

/** Contact - the title, then the ways to reach KMK and the enquiry form. */
export default function ContactPage() {
  const { lang } = useLang();
  const vi = lang === "vi";
  const root = useRef<HTMLDivElement>(null);
  usePageMotion(root, [lang]);

  return (
    <SiteLayout
      title={vi ? "Liên hệ | KMK Technology" : "Contact | KMK Technology"}
      description={
        vi
          ? "Liên hệ KMK Technology để được tư vấn phần mềm, ERP và chuyển đổi số: 0938 220 711, trung.ht@kmk-tech.vn."
          : "Contact KMK Technology for software, ERP and digital transformation advice: 0938 220 711, trung.ht@kmk-tech.vn."
      }
    >
      <div ref={root}>
        <PageHero
          title={
            vi ? (
              <>
                Liên hệ <span className="text-brand">KMK Technology</span>
              </>
            ) : (
              <>
                Contact <span className="text-brand">KMK Technology</span>
              </>
            )
          }
          sub={
            vi
              ? "Chia sẻ nhu cầu của bạn, đội ngũ KMK sẽ phản hồi trong thời gian sớm nhất."
              : "Tell us what you need and the KMK team will get back to you shortly."
          }
        />
        <Contact />
      </div>
    </SiteLayout>
  );
}
