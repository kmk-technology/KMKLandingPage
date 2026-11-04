// Single source of truth for site content, in Vietnamese and English.
// Every fact here comes from the company profile ("Hồ sơ năng lực KMK Technology", 2025)
// or the pre-redesign source (see docs/KMK_REDESIGN_AUDIT.md).
// Do not add clients, figures or claims that cannot be verified.
import type { L } from "../i18n/context";

export const company = {
  name: "KMK Technology",
  legalName: {
    vi: "Công ty TNHH Công Nghệ KMK",
    en: "KMK Technology Co., Ltd.",
  } as L,
  motto: "Your faith - Our services",
  tagline: {
    vi: "Đơn giản hóa doanh nghiệp của bạn",
    en: "Simplify your business",
  } as L,
  email: "trung.ht@kmk-tech.vn",
  phoneDisplay: "0938 220 711",
  phoneHref: "tel:+84938220711",
  phoneContact: "Trung Huynh Tan",
  address: {
    vi: "Số 99, Đường 24A, P. An Lạc, TP.HCM",
    en: "99 Street 24A, An Lac Ward, Ho Chi Minh City",
  } as L,
  mapHref:
    "https://www.google.com/maps/search/?api=1&query=99+Duong+24A+An+Lac+Ho+Chi+Minh",
  facebookHref: "https://www.facebook.com/profile.php?id=61571784489341",
  messengerHref: "https://m.me/61571784489341",
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
  { label: { vi: "Đội ngũ", en: "Team" }, id: "team" },
  { label: { vi: "Khách hàng", en: "Clients" }, id: "clients" },
  { label: { vi: "Liên hệ", en: "Contact" }, id: "contact" },
];

export const about = {
  intro: {
    vi: 'Công ty TNHH Công Nghệ KMK (KMK Technology) là đơn vị chuyên cung cấp các giải pháp công nghệ thông tin sáng tạo và đáng tin cậy, với sứ mệnh "Đơn giản hóa hoạt động kinh doanh của bạn" (Simplify Your Business).',
    en: 'KMK Technology Co., Ltd. (KMK Technology) provides creative and reliable information technology solutions, with the mission "Simplify Your Business".',
  } as L,
  heritage: {
    vi: "Kế thừa hơn một thập kỷ kinh nghiệm từ tiền thân là DASolution, KMK Technology tự hào mang đến các sản phẩm phần mềm chuyên biệt, dịch vụ tư vấn ERP và giải pháp hạ tầng CNTT toàn diện.",
    en: "Building on more than a decade of experience from its predecessor DASolution, KMK Technology is proud to deliver specialised software products, ERP consulting services and complete IT infrastructure solutions.",
  } as L,
  manifesto: {
    vi: "Chúng tôi tập trung vào việc phát triển các sản phẩm công nghệ giúp tối ưu hóa quy trình vận hành, nâng cao hiệu suất và thúc đẩy sự tăng trưởng bền vững cho các doanh nghiệp trong nhiều lĩnh vực, đặc biệt là ngành y tế, bán lẻ và quản lý sản xuất.",
    en: "We focus on building technology products that optimise operations, raise performance and drive sustainable growth for businesses in many fields, especially healthcare, retail and production management.",
  } as L,
  industries: [
    { vi: "Y tế", en: "Healthcare" },
    { vi: "Bán lẻ", en: "Retail" },
    { vi: "Quản lý sản xuất", en: "Production management" },
  ] as L[],
  mission: {
    label: { vi: "Sứ mệnh", en: "Mission" } as L,
    title: { vi: "Simplify Your Business", en: "Simplify Your Business" } as L,
    body: {
      vi: '"Simplify Your Business" – Chúng tôi đơn giản hóa hoạt động kinh doanh của bạn bằng cách hợp lý hóa các quy trình và giảm bớt sự phức tạp, cho phép bạn tập trung vào các hoạt động cốt lõi. Chúng tôi không ngừng đổi mới để mang lại các giải pháp tiên tiến, vượt qua các tiêu chuẩn ngành.',
      en: '"Simplify Your Business" – we simplify your business by streamlining processes and reducing complexity, so you can focus on your core activities. We keep innovating to deliver advanced solutions that go beyond industry standards.',
    } as L,
  },
  vision: {
    label: { vi: "Tầm nhìn", en: "Vision" } as L,
    title: {
      vi: "Nhà cung cấp hàng đầu về giải pháp công nghệ",
      en: "A leading technology solutions provider",
    } as L,
    body: {
      vi: "Trở thành nhà cung cấp hàng đầu về các giải pháp công nghệ sáng tạo và đáng tin cậy, giúp các doanh nghiệp phát huy hết tiềm năng của mình. Chúng tôi hướng tới việc xây dựng các mối quan hệ đối tác lâu dài và thúc đẩy tăng trưởng bền vững.",
      en: "To become a leading provider of creative and reliable technology solutions that help businesses reach their full potential. We aim to build long-term partnerships and drive sustainable growth.",
    } as L,
  },
  values: [
    { vi: "Đổi mới để trở nên xuất sắc", en: "Innovate for Excellence" },
    { vi: "Đảm bảo sự tin cậy", en: "Ensuring Reliability" },
    { vi: "Trao quyền cho sự đổi mới", en: "Empowering Innovation" },
  ] as L[],
};

/** History, from the company profile. */
export const history: { year: string; title: L; body: L }[] = [
  {
    year: "11+",
    title: { vi: "Nền tảng kinh nghiệm", en: "A foundation of experience" },
    body: {
      vi: "KMK Technology được xây dựng trên nền tảng vững chắc của DASolution, với hơn 11 năm kinh nghiệm trong ngành công nghệ thông tin.",
      en: "KMK Technology is built on the solid foundation of DASolution, with more than 11 years of experience in information technology.",
    },
  },
  {
    year: "11/2022",
    title: { vi: "Cột mốc thành lập", en: "Founding milestone" },
    body: {
      vi: "Chính thức thành lập vào tháng 11 năm 2022, KMK Technology đánh dấu một chương mới trong hành trình phát triển, kết hợp kinh nghiệm dày dặn với một tầm nhìn mới, năng động và sáng tạo.",
      en: "Officially founded in November 2022, KMK Technology opened a new chapter in its journey, combining deep experience with a new, dynamic and creative vision.",
    },
  },
  {
    year: "Medifam",
    title: { vi: "Khẳng định vị thế", en: "An established position" },
    body: {
      vi: "Ngay từ khi ra mắt, các sản phẩm của chúng tôi, đặc biệt là hệ thống y khoa Medifam, đã nhanh chóng được thị trường đón nhận và nhận được sự tin tưởng vững chắc từ hàng loạt đối tác và khách hàng lớn.",
      en: "From launch, our products, above all the Medifam medical system, were quickly embraced by the market and earned the firm trust of many partners and major clients.",
    },
  },
];

/** Why work with KMK, from the company profile. */
export const benefits: { title: L; body: L }[] = [
  {
    title: {
      vi: "Tối ưu hóa Vận hành & Chi phí",
      en: "Optimised operations & costs",
    },
    body: {
      vi: "Tự động hóa các quy trình thủ công (đăng ký, quản lý hồ sơ, trả kết quả), giúp giảm tải công việc hành chính, tiết kiệm thời gian và chi phí nhân sự.",
      en: "Automating manual processes (registration, records management, returning results) reduces administrative work and saves time and staff costs.",
    },
  },
  {
    title: {
      vi: "Nâng cao Hình ảnh & Năng lực cạnh tranh",
      en: "A stronger image & competitiveness",
    },
    body: {
      vi: "Cung cấp trải nghiệm hiện đại, chuyên nghiệp, không cần chờ đợi, tạo ra lợi thế cạnh tranh vượt trội cho doanh nghiệp khi cung cấp sản phẩm hay dịch vụ.",
      en: "A modern, professional experience with no waiting gives your business a clear competitive edge when providing products or services.",
    },
  },
  {
    title: {
      vi: "Tăng trưởng Doanh thu Bền vững",
      en: "Sustainable revenue growth",
    },
    body: {
      vi: "Giải pháp của chúng tôi giúp nâng cao sự hài lòng của khách hàng, tăng tỷ lệ quay trở lại và tạo cơ hội chuyển đổi từ khách hàng trung thành.",
      en: "Our solutions raise customer satisfaction, increase return rates and create conversion opportunities from loyal customers.",
    },
  },
  {
    title: {
      vi: "Quản lý Doanh nghiệp Hiệu quả",
      en: "Effective business management",
    },
    body: {
      vi: "Chúng tôi cung cấp công cụ báo cáo và phân tích hiệu suất hoạt động, giúp ban lãnh đạo có cái nhìn tổng quan và xây dựng các chiến lược thiết thực.",
      en: "We provide reporting and performance analysis tools that give leadership the full picture and help build practical strategies.",
    },
  },
];

/** Strengths, from the company profile. */
export const strengths = {
  lead: {
    vi: "Chúng tôi không chỉ cung cấp phần mềm, mà mang đến một giải pháp số hóa 360 độ.",
    en: "We don't just provide software, we deliver a 360-degree digitalisation solution.",
  } as L,
  proof: {
    vi: "Đặc biệt, dự án triển khai hệ thống Medifam đã giúp hàng chục bệnh viện và phòng khám nâng cao chất lượng dịch vụ, giảm thời gian chờ đợi và quản lý hồ sơ bệnh án hiệu quả.",
    en: "In particular, the Medifam roll-out has helped dozens of hospitals and clinics raise service quality, cut waiting times and manage medical records efficiently.",
  } as L,
  items: [
    {
      vi: "Số hóa toàn diện quy trình vận hành",
      en: "Full digitalisation of operations",
    },
    {
      vi: "Tích hợp AI, Social Platform",
      en: "AI and social platform integration",
    },
    { vi: "Mô hình B2B2C thông minh", en: "A smart B2B2C model" },
    {
      vi: "Hệ sinh thái công nghệ đa dạng",
      en: "A diverse technology ecosystem",
    },
  ] as L[],
};

/** The team, from the company profile (names as published there). */
export const team: { name: string; role: string; lead?: boolean }[] = [
  { name: "Huỳnh Tấn Trung", role: "Director", lead: true },
  { name: "Đỗ Ngọc Minh Tiến", role: "Technical Leader" },
  { name: "Lưu Đức Phú", role: "Project Leader" },
  { name: "Trần Văn Phúc", role: "Project Leader" },
  { name: "Võ Đang Trường", role: "Technical" },
  { name: "Trần Hoài Phong", role: "Technical" },
  { name: "Nguyễn Phạm Hoài Thanh", role: "Technical" },
];

export type ServiceKey = "software" | "erp" | "digital" | "outsourcing";

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
      vi: "Xây dựng và phát triển các ứng dụng phần mềm chuyên biệt theo yêu cầu của từng doanh nghiệp.",
      en: "Building and developing specialised software applications to each business's requirements.",
    },
  },
  {
    key: "erp",
    title: { vi: "Tư vấn giải pháp ERP", en: "ERP Consulting" },
    short: { vi: "Oracle EBS · SAP", en: "Oracle EBS · SAP" },
    description: {
      vi: "Tư vấn triển khai các hệ thống quản trị nguồn lực doanh nghiệp hàng đầu như Oracle EBS, SAP.",
      en: "Consulting on the implementation of leading enterprise resource planning systems such as Oracle EBS and SAP.",
    },
    stack: ["Oracle EBS", "SAP"],
  },
  {
    key: "digital",
    title: {
      vi: "Tư vấn chuyển đổi số",
      en: "Digital Transformation Consulting",
    },
    short: { vi: "Lộ trình · Đào tạo", en: "Roadmap · Training" },
    description: {
      vi: "Tư vấn lộ trình chuyển đổi số, giải pháp công nghệ phù hợp, đào tạo & chuyển giao công nghệ.",
      en: "Consulting on the digital transformation roadmap and the right technology, with training & technology transfer.",
    },
  },
  {
    key: "outsourcing",
    title: { vi: "Dịch vụ Gia công phần mềm", en: "Software Outsourcing" },
    short: { vi: "Nguồn lực CNTT", en: "IT resources" },
    description: {
      vi: "Cung cấp nguồn lực CNTT chất lượng cao, giúp doanh nghiệp tối ưu chi phí và tập trung vào chuyên môn.",
      en: "Providing high-quality IT resources that help businesses optimise costs and focus on their expertise.",
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
    category: {
      vi: "Hệ thống Quản lý Y khoa",
      en: "Medical management system",
    },
    description: {
      vi: "Giải pháp quản trị tổng thể dành cho các phòng khám đa khoa, chuyên khoa, bác sĩ gia đình. Medifam đã giúp hàng chục bệnh viện và phòng khám nâng cao chất lượng dịch vụ, giảm thời gian chờ đợi và quản lý hồ sơ bệnh án hiệu quả.",
      en: "A complete management solution for general and specialist clinics and family doctors. Medifam has helped dozens of hospitals and clinics raise service quality, cut waiting times and manage medical records efficiently.",
    },
    from: "#2379e5",
    to: "#2379e5",
    href: "https://medifam.vn/",
    hrefLabel: "medifam.vn",
  },
  {
    key: "kmk-sales",
    mark: ["KMK ", "Sales"],
    name: "KMK Sales",
    monogram: "S",
    category: {
      vi: "Phần mềm Quản lý Bán hàng",
      en: "Sales management software",
    },
    description: {
      vi: "Phần mềm quản lý bán hàng dành cho các chủ doanh nghiệp. Đáp ứng đầy đủ các nghiệp vụ quản lý bán hàng, giúp khách hàng tối đa hóa năng lực kinh doanh cửa hàng. Làm việc mọi lúc, mọi nơi.",
      en: "Sales management software for business owners. It covers every sales management task, helping stores get the most out of their business. Work any time, anywhere.",
    },
    from: "#1b68cc",
    to: "#1b68cc",
    href: "https://kmksales.vn/",
    hrefLabel: "kmksales.vn",
  },
  {
    key: "digital-info",
    mark: ["Digital ", "Information"],
    name: "Digital Information",
    monogram: "D",
    category: {
      vi: "AI, PowerApp, automation trên Microsoft Platform",
      en: "AI, PowerApp and automation on the Microsoft Platform",
    },
    description: {
      vi: "Số hóa thông tin doanh nghiệp trên Microsoft Platform: ứng dụng nội bộ với Power Apps, tự động hóa quy trình với Power Automate, báo cáo với Power BI và trợ lý AI trong Microsoft 365.",
      en: "Digitalising business information on the Microsoft Platform: internal apps with Power Apps, workflow automation with Power Automate, reports with Power BI and AI assistants in Microsoft 365.",
    },
    from: "#1b68cc",
    to: "#1b68cc",
  },
];

export type PlatformGroup = {
  title: L;
  benefit: L;
  items: { name: string; icon: string }[];
};

export const platformGroups: PlatformGroup[] = [
  {
    title: {
      vi: "Nền tảng doanh nghiệp (ERP)",
      en: "Enterprise platforms (ERP)",
    },
    benefit: {
      vi: "Hệ thống quản trị nguồn lực doanh nghiệp và cơ sở dữ liệu cho các nghiệp vụ cốt lõi.",
      en: "Enterprise resource planning and databases for core business operations.",
    },
    items: [
      { name: "SAP", icon: "/svg/platform/SAP.svg" },
      { name: "Oracle Database", icon: "/svg/platform/oracle-logo.svg" },
      { name: "SQL Server", icon: "/svg/platform/microsoft-sql-server-1.svg" },
    ],
  },
  {
    title: { vi: "Nền tảng web", en: "Web platform" },
    benefit: {
      vi: "Giao diện web hiện đại, nhanh và dễ bảo trì.",
      en: "Modern, fast and maintainable web front ends.",
    },
    items: [
      { name: "React", icon: "/svg/platform/react.svg" },
      { name: "Next.js", icon: "/svg/platform/nextdotjs.svg" },
      { name: "Vue.js", icon: "/svg/platform/vuedotjs.svg" },
      { name: "Nuxt.js", icon: "/svg/platform/nuxtdotjs.svg" },
      { name: "Angular", icon: "/svg/platform/angular-icon.svg" },
      { name: "TypeScript", icon: "/svg/platform/typescript.svg" },
      { name: "Tailwind CSS", icon: "/svg/platform/tailwindcss.svg" },
      { name: "Redux", icon: "/svg/platform/redux.svg" },
      { name: "Vite", icon: "/svg/platform/vite.svg" },
      { name: "WordPress", icon: "/svg/platform/wordpress.svg" },
    ],
  },
  {
    title: { vi: "Backend & API", en: "Backend & APIs" },
    benefit: {
      vi: "Máy chủ ứng dụng, API và tích hợp hệ thống ổn định, bảo mật.",
      en: "Stable, secure application servers, APIs and system integration.",
    },
    items: [
      { name: "PHP", icon: "/svg/platform/php.svg" },
      { name: "Laravel", icon: "/svg/platform/laravel.svg" },
      { name: "Node.js", icon: "/svg/platform/nodejs.svg" },
      { name: "NestJS", icon: "/svg/platform/nestjs.svg" },
      { name: "Express", icon: "/svg/platform/express.svg" },
      { name: ".NET Core", icon: "/svg/platform/dot-net-core-7.svg" },
      { name: "Java", icon: "/svg/platform/openjdk.svg" },
      { name: "Spring Boot", icon: "/svg/platform/springboot.svg" },
      { name: "Python", icon: "/svg/platform/python.svg" },
      { name: "Django", icon: "/svg/platform/django.svg" },
      { name: "FastAPI", icon: "/svg/platform/fastapi.svg" },
      { name: "Go", icon: "/svg/platform/go.svg" },
      { name: "GraphQL", icon: "/svg/platform/graphql.svg" },
    ],
  },
  {
    title: { vi: "Nền tảng di động", en: "Mobile platform" },
    benefit: {
      vi: "Ứng dụng đa nền tảng cho nhân viên và khách hàng.",
      en: "Cross-platform apps for employees and customers.",
    },
    items: [
      { name: "React Native", icon: "/svg/platform/react-native-1.svg" },
      { name: "Flutter", icon: "/svg/platform/flutter.svg" },
      { name: "Dart", icon: "/svg/platform/dart.svg" },
      { name: "Kotlin", icon: "/svg/platform/kotlin.svg" },
      { name: "Swift", icon: "/svg/platform/swift.svg" },
      { name: "Firebase", icon: "/svg/platform/firebase.svg" },
    ],
  },
  {
    title: { vi: "Cơ sở dữ liệu & xử lý dữ liệu", en: "Databases & data" },
    benefit: {
      vi: "Lưu trữ, tìm kiếm và truyền tải dữ liệu tin cậy ở mọi quy mô.",
      en: "Reliable storage, search and data streaming at any scale.",
    },
    items: [
      { name: "PostgreSQL", icon: "/svg/platform/postgresql.svg" },
      { name: "MySQL", icon: "/svg/platform/mysql.svg" },
      { name: "MongoDB", icon: "/svg/platform/mongodb.svg" },
      { name: "Redis", icon: "/svg/platform/redis.svg" },
      { name: "Elasticsearch", icon: "/svg/platform/elasticsearch.svg" },
      { name: "RabbitMQ", icon: "/svg/platform/rabbitmq.svg" },
      { name: "Apache Kafka", icon: "/svg/platform/apachekafka.svg" },
    ],
  },
  {
    title: { vi: "Cloud & DevOps", en: "Cloud & DevOps" },
    benefit: {
      vi: "Triển khai, vận hành và giám sát hệ thống tự động trên cloud.",
      en: "Automated deployment, operation and monitoring in the cloud.",
    },
    items: [
      {
        name: "Amazon Web Services",
        icon: "/svg/platform/amazonwebservices.svg",
      },
      { name: "Google Cloud", icon: "/svg/platform/googlecloud.svg" },
      { name: "Docker", icon: "/svg/platform/docker.svg" },
      { name: "Kubernetes", icon: "/svg/platform/kubernetes.svg" },
      { name: "NGINX", icon: "/svg/platform/nginx.svg" },
      { name: "Linux", icon: "/svg/platform/linux.svg" },
      { name: "Cloudflare", icon: "/svg/platform/cloudflare.svg" },
      { name: "Git", icon: "/svg/platform/git.svg" },
      { name: "GitHub Actions", icon: "/svg/platform/githubactions.svg" },
      { name: "GitLab", icon: "/svg/platform/gitlab.svg" },
      { name: "Jenkins", icon: "/svg/platform/jenkins.svg" },
    ],
  },
  {
    title: { vi: "AI & học máy", en: "AI & machine learning" },
    benefit: {
      vi: "Tích hợp AI vào quy trình: trợ lý ảo, xử lý ngôn ngữ và phân tích dữ liệu.",
      en: "AI built into your workflows: assistants, language processing and data analysis.",
    },
    items: [
      { name: "OpenAI", icon: "/svg/platform/openai.svg" },
      { name: "LangChain", icon: "/svg/platform/langchain.svg" },
      { name: "TensorFlow", icon: "/svg/platform/tensorflow.svg" },
      { name: "PyTorch", icon: "/svg/platform/pytorch.svg" },
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
  {
    title: { vi: "Công cụ làm việc", en: "Delivery tools" },
    benefit: {
      vi: "Thiết kế, quản lý dự án và kiểm thử API minh bạch cùng khách hàng.",
      en: "Design, project tracking and API testing, shared openly with clients.",
    },
    items: [
      { name: "Figma", icon: "/svg/platform/figma.svg" },
      { name: "Jira", icon: "/svg/platform/jira.svg" },
      { name: "Postman", icon: "/svg/platform/postman.svg" },
    ],
  },
];

export type Client = { name: string; logo: string };

export const corporateClients: Client[] = [
  { name: "PepsiCo", logo: "/svg/corporate/pepsico-logo.svg" },
  { name: "An Cường", logo: "/svg/corporate/an-cuong.svg" },
  { name: "OFI", logo: "/logo/ofi-logo.png" },
  { name: "Việt Tiến", logo: "/svg/corporate/viettien.svg" },
];

// "Việt Tiến" appeared in both lists in the old source; it is kept once, under corporate.
export const medicalClients: Client[] = [
  { name: "PKĐK Tâm An", logo: "/logo/clients/taman.png" },
  { name: "Queen Hospital", logo: "/logo/clients/queenhopital.png" },
  { name: "Meccare", logo: "/logo/clients/meccare.png" },
  { name: "Hoàng Khang Medical Center", logo: "/logo/clients/hoangkhang.png" },
  { name: "PKĐK Phước Linh", logo: "/logo/clients/phuoclinh.png" },
  { name: "PKĐK Sài Gòn 115", logo: "/logo/clients/pkdk115.png" },
  { name: "CTY CP BV Y Dược 115", logo: "/logo/clients/yduoc115.png" },
  { name: "PK Sản Phụ An Phúc", logo: "/logo/clients/aa.png" },
  { name: "PKĐK Thành Công", logo: "/logo/clients/thanhcong.png" },
  { name: "Phú Lâm Medical Center", logo: "/logo/clients/phulam.png" },
  { name: "Thiên Hậu Polyclinic", logo: "/logo/clients/thienhau.png" },
  { name: "Hưng Dũng", logo: "/logo/clients/hungdung.png" },
  { name: "PK Nhi Sài Gòn – Phúc An", logo: "/logo/clients/paplus.png" },
  { name: "JT Angel", logo: "/logo/clients/JTAngel.png" },
  { name: "Y Học Gia Đình Phước Hòa", logo: "/logo/clients/yhgdPH.png" },
  { name: "Ngọc Châu", logo: "/logo/clients/ngocchau.png" },
  { name: "PKĐK Loukas Health Care", logo: "/logo/clients/loukas.png" },
  { name: "Bệnh viện Hạnh Phúc", logo: "/logo/clients/hanhphuc.png" },
  { name: "Thiên Phúc", logo: "/logo/clients/thienphuc.png" },
  { name: "PK Tĩnh Mạch Sài Gòn", logo: "/logo/clients/svg.png" },
  { name: "Pain Clinic", logo: "/logo/clients/painclinic.png" },
  { name: "Sơn Ca", logo: "/logo/clients/sonca.png" },
  { name: "PKYD Sài Gòn Hưng Long", logo: "/logo/clients/hunglong.png" },
  { name: "PKĐK Chợ Cầu", logo: "/logo/clients/cclinic.png" },
  {
    name: "CTY CP BV Sài Gòn Cửu Long",
    logo: "/logo/clients/saigoncuulong.png",
  },
  { name: "TIMEC", logo: "/logo/clients/timec.png" },
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
