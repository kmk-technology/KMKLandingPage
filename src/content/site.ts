// Single source of truth for site content, in Vietnamese and English.
// Every fact here comes from the pre-redesign source (see docs/KMK_REDESIGN_AUDIT.md).
// Do not add clients, figures or claims that cannot be verified.
import type { L } from "../i18n/context";

export const company = {
  name: "KMK Technology",
  tagline: {
    vi: "Đơn giản hóa doanh nghiệp của bạn",
    en: "Simplify your business",
  } as L,
  email: "trung.ht@kmk-tech.vn",
  phoneDisplay: "0938 220 711",
  phoneHref: "tel:+84938220711",
  phoneContact: "Trung Huynh Tan",
  address: {
    vi: "Số 99, Đường số 24A, Quận Bình Tân, TP. Hồ Chí Minh",
    en: "99 Street No. 24A, Binh Tan District, Ho Chi Minh City",
  } as L,
  mapHref:
    "https://www.google.com/maps/search/?api=1&query=99+Duong+so+24A+Binh+Tan+Ho+Chi+Minh",
  websites: [
    { label: "kmk-tech.vn", href: "https://kmk-tech.vn/" },
    { label: "medifam.vn", href: "https://medifam.vn/" },
    { label: "yhgd.vn", href: "https://yhgd.vn/" },
    { label: "kmksales.vn", href: "https://kmksales.vn/" },
  ],
};

export type NavItem = { label: L; id: string };

export const navigation: NavItem[] = [
  { label: { vi: "Giới thiệu", en: "About" }, id: "intro" },
  { label: { vi: "Dịch vụ", en: "Services" }, id: "services" },
  { label: { vi: "Sản phẩm", en: "Products" }, id: "products" },
  { label: { vi: "Khách hàng", en: "Clients" }, id: "clients" },
  { label: { vi: "Công nghệ", en: "Technology" }, id: "platform" },
  { label: { vi: "Liên hệ", en: "Contact" }, id: "contact" },
];

export const about = {
  manifesto: {
    vi: "KMK Technology đồng hành cùng doanh nghiệp đa lĩnh vực, tinh gọn quy trình và giảm độ phức tạp để đội ngũ tập trung vào giá trị cốt lõi.",
    en: "KMK Technology partners with businesses across industries, streamlining processes and reducing complexity so teams can focus on what creates value.",
  } as L,
  emphasis: ["tinh", "gọn", "cốt", "lõi", "streamline", "core"],
  mission: {
    label: { vi: "Sứ mệnh", en: "Mission" } as L,
    title: {
      vi: "Đơn giản hóa doanh nghiệp của bạn.",
      en: "Simplify your business.",
    } as L,
    body: {
      vi: "Không ngừng đổi mới để mang đến những giải pháp vượt chuẩn và xây dựng quan hệ hợp tác lâu dài với khách hàng.",
      en: "We innovate continuously to deliver solutions beyond industry standards and to build lasting partnerships with our clients.",
    } as L,
  },
  vision: {
    label: { vi: "Tầm nhìn", en: "Vision" } as L,
    title: {
      vi: "Đổi mới và đáng tin cậy.",
      en: "Innovative and reliable.",
    } as L,
    body: {
      vi: "Trở thành nhà cung cấp giải pháp công nghệ hàng đầu, giúp doanh nghiệp phát huy tối đa tiềm năng.",
      en: "To become a leading provider of technology solutions that help businesses realise their full potential.",
    } as L,
  },
  values: [
    { vi: "Sáng tạo", en: "Creativity" },
    { vi: "Hợp tác", en: "Collaboration" },
    { vi: "Xuất sắc", en: "Excellence" },
  ] as L[],
};

export type ServiceKey = "software" | "erp" | "cloud" | "outsourcing";

export type Service = {
  key: ServiceKey;
  title: L;
  short: L;
  description: L;
  stack?: string[];
};

export const services: Service[] = [
  {
    key: "software",
    title: { vi: "Phát triển phần mềm", en: "Software Development" },
    short: { vi: "Web & ứng dụng di động", en: "Web & mobile apps" },
    description: {
      vi: "Thiết kế và phát triển ứng dụng web, di động theo đúng quy trình vận hành của doanh nghiệp.",
      en: "Web and mobile applications designed and built around the way your business operates.",
    },
    stack: [
      "React",
      "Angular",
      "React Native",
      "Node.js",
      ".NET Core",
      "SQL Server",
    ],
  },
  {
    key: "erp",
    title: {
      vi: "Tư vấn & triển khai ERP",
      en: "ERP Consulting & Implementation",
    },
    short: { vi: "Oracle EBS · SAP", en: "Oracle EBS · SAP" },
    description: {
      vi: "Tư vấn và triển khai Oracle EBS, SAP, hợp nhất tài chính, chuỗi cung ứng và vận hành trên một nền tảng.",
      en: "Consulting and implementation of Oracle EBS and SAP, bringing finance, supply chain and operations onto one platform.",
    },
    stack: ["Oracle EBS", "SAP"],
  },
  {
    key: "cloud",
    title: { vi: "Cloud & Hạ tầng CNTT", en: "Cloud & IT Infrastructure" },
    short: { vi: "Máy chủ · Thiết bị", en: "Servers · Equipment" },
    description: {
      vi: "Cung cấp máy chủ cloud và thiết bị hạ tầng CNTT, giúp hệ thống của doanh nghiệp vận hành ổn định.",
      en: "Cloud servers and IT infrastructure equipment that keep your business systems running reliably.",
    },
  },
  {
    key: "outsourcing",
    title: { vi: "IT Outsourcing", en: "IT Outsourcing" },
    short: { vi: "Dịch vụ CNTT trọn gói", en: "Managed IT services" },
    description: {
      vi: "KMK đảm nhận vận hành dịch vụ CNTT, giúp doanh nghiệp tối ưu chi phí mà không cần xây dựng đội ngũ riêng.",
      en: "KMK runs your IT services, helping you optimise costs without building an in-house team.",
    },
  },
];

export type Product = {
  key: string;
  /** Wordmark set as text: [KMK / Medi part, product part]; both set in ink by ProductMark. */
  mark: [string, string];
  name: string;
  monogram: string;
  category: L;
  description: L;
  /** Brand colours for the generated wordmark tile. */
  from: string;
  to: string;
  href?: string;
  hrefLabel?: string;
};

export const products: Product[] = [
  {
    key: "medifam",
    mark: ["Medi", "fam"],
    name: "MEDIFAM",
    monogram: "M",
    category: { vi: "Y khoa gia đình", en: "Family medicine" },
    description: {
      vi: "Hệ thống y khoa gia đình dành cho phòng khám và cơ sở y tế.",
      en: "A family medicine system for clinics and healthcare providers.",
    },
    from: "#457ae7",
    to: "#457ae7",
    href: "https://medifam.vn/",
    hrefLabel: "medifam.vn",
  },
  {
    key: "kmk-sales",
    mark: ["KMK", "Sales"],
    name: "KMK Sales",
    monogram: "S",
    category: { vi: "Quản lý bán hàng", en: "Point of sale" },
    description: {
      vi: "Phần mềm quản lý bán hàng tại quầy, theo dõi giao dịch hằng ngày.",
      en: "Point-of-sale software for managing day-to-day sales.",
    },
    from: "#3a6bd6",
    to: "#3a6bd6",
    href: "https://kmksales.vn/",
    hrefLabel: "kmksales.vn",
  },
  {
    key: "kmk-wms",
    mark: ["KMK ", "Wms"],
    name: "KMK WMS",
    monogram: "W",
    category: { vi: "Quản lý kho", en: "Warehouse management" },
    description: {
      vi: "Phần mềm theo dõi tồn kho và quản lý hoạt động kho hàng.",
      en: "Software for tracking inventory and managing warehouse operations.",
    },
    from: "#457ae7",
    to: "#457ae7",
  },
];

export type PlatformGroup = {
  title: L;
  benefit: L;
  items: { name: string; icon: string }[];
};

export const platformGroups: PlatformGroup[] = [
  {
    title: { vi: "Nền tảng ứng dụng", en: "Application platform" },
    benefit: {
      vi: "ERP và cơ sở dữ liệu cho các nghiệp vụ cốt lõi.",
      en: "ERP and databases for core business operations.",
    },
    items: [
      { name: "SAP", icon: "/svg/platform/SAP.svg" },
      { name: "Oracle Database", icon: "/svg/platform/oracle-logo.svg" },
    ],
  },
  {
    title: { vi: "Nền tảng di động", en: "Mobile platform" },
    benefit: {
      vi: "Ứng dụng đa nền tảng cho nhân viên và khách hàng.",
      en: "Cross-platform apps for employees and customers.",
    },
    items: [
      { name: "Angular", icon: "/svg/platform/angular-icon.svg" },
      { name: "React Native", icon: "/svg/platform/react-native-1.svg" },
      { name: "Node.js", icon: "/svg/platform/nodejs.svg" },
      { name: "Flutter", icon: "/svg/platform/flutter.svg" },
      { name: "Kotlin", icon: "/svg/platform/kotlin.svg" },
      { name: "Swift", icon: "/svg/platform/swift.svg" },
      { name: "Ionic", icon: "/svg/platform/ionic.svg" },
      { name: "Firebase", icon: "/svg/platform/firebase.svg" },
    ],
  },
  {
    title: { vi: "Nền tảng web", en: "Web platform" },
    benefit: {
      vi: "Ứng dụng web và API trên nền tảng ổn định, dễ bảo trì.",
      en: "Web applications and APIs on proven, maintainable stacks.",
    },
    items: [
      { name: "React", icon: "/svg/platform/react.svg" },
      { name: "Next.js", icon: "/svg/platform/nextdotjs.svg" },
      { name: "Vue.js", icon: "/svg/platform/vuedotjs.svg" },
      { name: "Angular", icon: "/svg/platform/angular-icon.svg" },
      { name: "TypeScript", icon: "/svg/platform/typescript.svg" },
      { name: "Tailwind CSS", icon: "/svg/platform/tailwindcss.svg" },
      { name: "Node.js", icon: "/svg/platform/nodejs.svg" },
      { name: ".NET Core", icon: "/svg/platform/dot-net-core-7.svg" },
      { name: "SQL Server", icon: "/svg/platform/microsoft-sql-server-1.svg" },
      { name: "PostgreSQL", icon: "/svg/platform/postgresql.svg" },
      { name: "MongoDB", icon: "/svg/platform/mongodb.svg" },
      { name: "Docker", icon: "/svg/platform/docker.svg" },
    ],
  },
  {
    title: { vi: "Microsoft Power Platform", en: "Microsoft Power Platform" },
    benefit: {
      vi: "Ứng dụng low-code, tự động hóa quy trình và báo cáo trong Microsoft 365.",
      en: "Low-code apps, workflow automation and reporting inside Microsoft 365.",
    },
    items: [
      { name: "Power Apps", icon: "/svg/platform/PowerApps_scalable.svg" },
      { name: "Power BI", icon: "/svg/platform/PowerBI_scalable.svg" },
      {
        name: "Power Automate",
        icon: "/svg/platform/PowerAutomate_scalable.svg",
      },
      {
        name: "Power Virtual Agents",
        icon: "/svg/platform/power-virtual-agents-colored.svg",
      },
      {
        name: "SharePoint",
        icon: "/svg/platform/microsoft-office-sharepoint-2018-present--1.svg",
      },
    ],
  },
];

export type Client = { name: string; logo: string };

export const corporateClients: Client[] = [
  { name: "PepsiCo", logo: "/svg/corporate/pepsico-logo.svg" },
  { name: "An Cường", logo: "/svg/corporate/an-cuong.svg" },
  { name: "OFI", logo: "/logo/ofi-logo.png" },
  { name: "Shimmer", logo: "/logo/shimmer-logo.png" },
  { name: "Quảng Hưng Long", logo: "/logo/qhl-logo.png" },
  { name: "TCSC", logo: "/logo/tcsc-logo.png" },
  { name: "Việt Tiến", logo: "/svg/corporate/viettien.svg" },
  { name: "Jia Hsin", logo: "/logo/jiahsin-logo.png" },
  { name: "Lucky Group", logo: "/logo/lucky-logo.png" },
];

// "Việt Tiến" appeared in both lists in the old source; it is kept once, under corporate.
export const medicalClients: Client[] = [
  { name: "PKĐK Tâm An", logo: "/logo/medical/taman.png" },
  { name: "Queen Hospital", logo: "/logo/medical/queenhopital.png" },
  { name: "Meccare", logo: "/logo/medical/meccare.png" },
  { name: "Hoàng Khang Medical Center", logo: "/logo/medical/hoangkhang.png" },
  { name: "PKĐK Phước Linh", logo: "/logo/medical/phuoclinh.jpg" },
  { name: "PKĐK Sài Gòn 115", logo: "/logo/medical/pkdk115.jpg" },
  { name: "CTY CP BV Y Dược 115", logo: "/logo/medical/yduoc115.png" },
  { name: "PK Sản Phụ An Phúc", logo: "/logo/medical/aa.png" },
  { name: "PKĐK Thành Công", logo: "/logo/medical/thanhcong.jpg" },
  { name: "Phú Lâm Medical Center", logo: "/logo/medical/phulam.png" },
  { name: "Thiên Hậu Polyclinic", logo: "/logo/medical/thienhau.jpg" },
  { name: "Hưng Dũng", logo: "/logo/medical/hungdung.jpg" },
  { name: "PK Nhi Sài Gòn – Phúc An", logo: "/logo/medical/pa+.png" },
  { name: "JT Angel", logo: "/logo/medical/JTAngel.png" },
  { name: "Y Học Gia Đình Phước Hòa", logo: "/logo/medical/yhgdPH.png" },
  { name: "Ngọc Châu", logo: "/logo/medical/ngocchau.png" },
  { name: "PKĐK Loukas Health Care", logo: "/logo/medical/loukas.png" },
  { name: "Bệnh viện Hạnh Phúc", logo: "/logo/medical/hanhphuc.png" },
  { name: "Thiên Phúc", logo: "/logo/medical/thienphuc.png" },
  { name: "PK Tĩnh Mạch Sài Gòn", logo: "/logo/medical/svg.png" },
  { name: "Pain Clinic", logo: "/logo/medical/painclinic.jpg" },
  { name: "Sơn Ca", logo: "/logo/medical/sonca.png" },
  { name: "PKYD Sài Gòn Hưng Long", logo: "/logo/medical/hunglong.jpg" },
  { name: "PKĐK Chợ Cầu", logo: "/logo/medical/cclinic.png" },
  {
    name: "CTY CP BV Sài Gòn Cửu Long",
    logo: "/logo/medical/saigoncuulong.png",
  },
  { name: "TIMEC", logo: "/logo/medical/timec.png" },
];

export const clientCount = corporateClients.length + medicalClients.length;

// Facts derived from the lists above (never hard-coded).
export const facts: { value: number; label: L }[] = [
  {
    value: services.length,
    label: { vi: "Mảng dịch vụ", en: "Service lines" },
  },
  {
    value: products.length,
    label: { vi: "Sản phẩm riêng", en: "In-house products" },
  },
  { value: clientCount, label: { vi: "Khách hàng", en: "Clients" } },
];

export const legalLinks = [
  {
    label: {
      vi: "MedCG - Chính sách bảo mật",
      en: "MedCG - Privacy policy",
    } as L,
    href: "/projects/medcg/policy",
  },
  {
    label: {
      vi: "MedCG - Điều khoản dịch vụ",
      en: "MedCG - Terms of service",
    } as L,
    href: "/projects/medcg/terms",
  },
];

/** Enquiry topics: stable keys (sent with the form) + localised labels. */
export const enquiryTopics: { key: string; label: L }[] = [
  ...services.map((s) => ({ key: s.key, label: s.title })),
  ...products.map((p) => ({
    key: p.key,
    label: { vi: p.name, en: p.name } as L,
  })),
  { key: "other", label: { vi: "Nhu cầu khác", en: "Other" } },
];
