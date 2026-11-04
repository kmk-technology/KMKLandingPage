import { company } from "../../content/site";
import ContactForm from "../../features/contact/ContactForm";
import { useLang } from "../../i18n/context";
import Icon, { type IconName } from "../ui/Icon";

/*
 * Contact, in the site's zalo.me manner: on the left the ways to reach KMK as bordered rows
 * (phone, email, office on Google Maps), on the right the enquiry form on a light-grey block.
 * Motion comes from the page (.fade / .fade-group, see components/site/motion).
 */
export default function Contact() {
  const { t, lang } = useLang();
  const vi = lang === "vi";

  const rows: {
    icon: IconName;
    label: string;
    value: string;
    note?: string;
    href: string;
    external?: boolean;
  }[] = [
    {
      icon: "phone",
      label: vi ? "Điện thoại" : "Phone",
      value: company.phoneDisplay,
      note: company.phoneContact,
      href: company.phoneHref,
    },
    {
      icon: "mail",
      label: "Email",
      value: company.email,
      href: `mailto:${company.email}`,
    },
    {
      icon: "pin",
      label: vi ? "Văn phòng" : "Office",
      value: t(company.address),
      note: vi ? "Xem trên Google Maps" : "View on Google Maps",
      href: company.mapHref,
      external: true,
    },
    {
      icon: "facebook",
      label: "Facebook",
      value: "KMK Technology",
      note: vi ? "Theo dõi tin tức từ KMK" : "Follow KMK's news",
      href: company.facebookHref,
      external: true,
    },
    {
      icon: "messenger",
      label: "Messenger",
      value: vi ? "Nhắn tin cho KMK" : "Message KMK",
      note: vi ? "Phản hồi trong giờ làm việc" : "Replies during office hours",
      href: company.messengerHref,
      external: true,
    },
  ];
  const opens: Record<string, string> = {
    pin: "Google Maps",
    facebook: "Facebook",
    messenger: "Messenger",
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="pb-[clamp(4.5rem,11vh,7rem)]"
    >
      <div className="shell grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2
            id="contact-title"
            className="fade font-display text-[1.5rem] font-normal text-ink"
          >
            {vi ? "Thông tin liên hệ" : "Get in touch"}
          </h2>
          <address className="fade-group mt-6 space-y-4 not-italic">
            {rows.map((r) => (
              <a
                key={r.label}
                href={r.href}
                {...(r.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="spot group flex items-center gap-4 rounded-[1.5rem] border border-ink/[0.09] bg-white p-5 transition-[border-color,box-shadow,transform] duration-500 ease-out-expo hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-[0_20px_40px_-28px_rgba(20,60,140,0.45)]"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-tint text-[1.15rem] text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                  <Icon name={r.icon} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[0.875rem] text-ink/55">
                    {r.label}
                  </span>
                  <span className="mt-0.5 block break-words text-[1.0625rem] leading-snug text-ink">
                    {r.value}
                  </span>
                  {r.note ? (
                    <span className="mt-0.5 block text-[0.875rem] text-ink/50">
                      {r.note}
                    </span>
                  ) : null}
                </span>
                <Icon
                  name={r.external ? "arrowUpRight" : "arrowRight"}
                  className="shrink-0 text-[1.1rem] text-ink/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-brand"
                />
                {r.external ? (
                  <span className="sr-only">
                    {vi
                      ? ` (mở ${opens[r.icon]})`
                      : ` (opens ${opens[r.icon]})`}
                  </span>
                ) : null}
              </a>
            ))}
          </address>
        </div>

        <div className="fade rounded-[1.75rem] bg-[#f5f6f8] p-6 sm:p-10 lg:col-span-7">
          <h3 className="font-display text-[1.5rem] font-normal text-ink">
            {vi ? "Gửi yêu cầu tư vấn" : "Request a consultation"}
          </h3>
          <p className="mb-8 mt-1 text-[0.9375rem] text-ink/60">
            {vi
              ? "Các mục có dấu * là bắt buộc."
              : "Fields marked * are required."}
          </p>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
