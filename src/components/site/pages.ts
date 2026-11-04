import type { L } from "../../i18n/context";

/** The careers page is hidden for now (no menu, footer link or route); set to true to show it. */
export const SHOW_CAREERS = false;

/** The site's pages, in menu order (header and footer). */
const allPages: { to: string; label: L }[] = [
  { to: "/", label: { vi: "Trang chủ", en: "Home" } },
  {
    to: "/products",
    label: { vi: "Sản phẩm & Dịch vụ", en: "Products & Services" },
  },
  { to: "/technology", label: { vi: "Công nghệ", en: "Technology" } },
  { to: "/clients", label: { vi: "Khách hàng", en: "Clients" } },
  { to: "/about", label: { vi: "Về chúng tôi", en: "About us" } },
  { to: "/careers", label: { vi: "Tuyển dụng", en: "Careers" } },
  { to: "/contact", label: { vi: "Liên hệ", en: "Contact" } },
];
export const pages = allPages.filter(
  (p) => SHOW_CAREERS || p.to !== "/careers",
);

/** Link to the contact page with the enquiry topic chosen in advance. */
export const contactFor = (topic: string) =>
  `/contact?topic=${encodeURIComponent(topic)}`;
