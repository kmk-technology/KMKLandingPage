// Careers page content, in Vietnamese and English.
// DRAFT: the company profile lists no open roles or benefits. The roles, perks and hiring steps
// below are placeholders for HR to confirm (or replace) before the page goes live.
import type { L } from "../i18n/context";
import { company } from "./site";

/** Where applications go. Change to a hiring inbox (e.g. hr@kmk-tech.vn) when there is one. */
export const careersEmail = company.email;

export type JobTeam = "engineering" | "consulting" | "business";

export const jobTeams: { key: JobTeam; label: L }[] = [
  { key: "engineering", label: { vi: "Kỹ thuật", en: "Engineering" } },
  { key: "consulting", label: { vi: "Tư vấn", en: "Consulting" } },
  { key: "business", label: { vi: "Kinh doanh", en: "Business" } },
];

export type Job = {
  key: string;
  title: L;
  team: JobTeam;
  level: L;
  summary: L;
  duties: L[];
  needs: L[];
  stack?: string[];
};

const fullTime: L = { vi: "Toàn thời gian", en: "Full-time" };
export const jobPlace: L = { vi: "TP.HCM", en: "Ho Chi Minh City" };
export const jobType = fullTime;

export const jobs: Job[] = [
  {
    key: "frontend",
    title: {
      vi: "Frontend Developer (ReactJS)",
      en: "Frontend Developer (ReactJS)",
    },
    team: "engineering",
    level: { vi: "1+ năm kinh nghiệm", en: "1+ years" },
    summary: {
      vi: "Xây dựng giao diện web cho Medifam, KMK Sales và các dự án khách hàng.",
      en: "Build the web front ends of Medifam, KMK Sales and client projects.",
    },
    duties: [
      {
        vi: "Phát triển giao diện từ thiết kế Figma, tối ưu hiệu năng và trải nghiệm.",
        en: "Build screens from Figma designs, with a focus on speed and usability.",
      },
      {
        vi: "Kết nối API, quản lý trạng thái và viết component dùng lại được.",
        en: "Connect APIs, manage state and write reusable components.",
      },
      {
        vi: "Phối hợp với Backend, Tester và BA trong từng sprint.",
        en: "Work with backend, QA and BA colleagues in each sprint.",
      },
    ],
    needs: [
      {
        vi: "Nắm vững HTML, CSS, JavaScript/TypeScript và ReactJS.",
        en: "Solid HTML, CSS, JavaScript/TypeScript and ReactJS.",
      },
      {
        vi: "Biết dùng Git, quen làm việc với REST API.",
        en: "Comfortable with Git and REST APIs.",
      },
      {
        vi: "Có kinh nghiệm Next.js hoặc Tailwind CSS là lợi thế.",
        en: "Next.js or Tailwind CSS experience is a plus.",
      },
    ],
    stack: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
  },
  {
    key: "backend",
    title: {
      vi: "Backend Developer (.NET / Node.js)",
      en: "Backend Developer (.NET / Node.js)",
    },
    team: "engineering",
    level: { vi: "2+ năm kinh nghiệm", en: "2+ years" },
    summary: {
      vi: "Thiết kế và phát triển API, dịch vụ cho các hệ thống quản lý doanh nghiệp.",
      en: "Design and build the APIs and services behind our business systems.",
    },
    duties: [
      {
        vi: "Phát triển API, xử lý nghiệp vụ và tích hợp với hệ thống bên thứ ba.",
        en: "Build APIs, business logic and third-party integrations.",
      },
      {
        vi: "Thiết kế cơ sở dữ liệu, tối ưu truy vấn và hiệu năng.",
        en: "Design databases and tune queries and performance.",
      },
      {
        vi: "Tham gia review code, viết tài liệu kỹ thuật.",
        en: "Review code and write technical documentation.",
      },
    ],
    needs: [
      {
        vi: "Thành thạo .NET Core hoặc Node.js (NestJS/Express).",
        en: "Strong .NET Core or Node.js (NestJS/Express).",
      },
      {
        vi: "Có kinh nghiệm SQL Server, PostgreSQL hoặc MySQL.",
        en: "Experience with SQL Server, PostgreSQL or MySQL.",
      },
      {
        vi: "Biết Docker, Redis hoặc RabbitMQ là lợi thế.",
        en: "Docker, Redis or RabbitMQ is a plus.",
      },
    ],
    stack: [".NET Core", "Node.js", "SQL Server", "Docker"],
  },
  {
    key: "mobile",
    title: {
      vi: "Mobile Developer (Flutter)",
      en: "Mobile Developer (Flutter)",
    },
    team: "engineering",
    level: { vi: "1+ năm kinh nghiệm", en: "1+ years" },
    summary: {
      vi: "Phát triển ứng dụng di động cho bệnh nhân, nhân viên bán hàng và doanh nghiệp.",
      en: "Build mobile apps for patients, sales staff and businesses.",
    },
    duties: [
      {
        vi: "Phát triển ứng dụng Android và iOS bằng Flutter.",
        en: "Build Android and iOS apps with Flutter.",
      },
      {
        vi: "Tích hợp API, thông báo đẩy và thanh toán.",
        en: "Integrate APIs, push notifications and payments.",
      },
      {
        vi: "Đưa ứng dụng lên Google Play và App Store.",
        en: "Ship releases to Google Play and the App Store.",
      },
    ],
    needs: [
      {
        vi: "Có kinh nghiệm Flutter/Dart, hiểu vòng đời ứng dụng di động.",
        en: "Flutter/Dart experience and a good grasp of the app lifecycle.",
      },
      {
        vi: "Biết Firebase là lợi thế.",
        en: "Firebase is a plus.",
      },
    ],
    stack: ["Flutter", "Dart", "Firebase"],
  },
  {
    key: "tester",
    title: { vi: "Tester / QC", en: "Tester / QC" },
    team: "engineering",
    level: { vi: "Chấp nhận mới ra trường", en: "Fresh graduates welcome" },
    summary: {
      vi: "Đảm bảo chất lượng cho sản phẩm trước mỗi lần phát hành.",
      en: "Keep every release of our products reliable.",
    },
    duties: [
      {
        vi: "Viết test case, kiểm thử chức năng trên web và di động.",
        en: "Write test cases and test features on web and mobile.",
      },
      {
        vi: "Ghi nhận lỗi trên Jira, theo dõi đến khi được xử lý.",
        en: "Log bugs in Jira and follow them through to the fix.",
      },
    ],
    needs: [
      {
        vi: "Cẩn thận, tỉ mỉ, có tư duy logic.",
        en: "Careful, detail-minded and logical.",
      },
      {
        vi: "Biết Postman hoặc kiểm thử tự động là lợi thế.",
        en: "Postman or test automation is a plus.",
      },
    ],
    stack: ["Jira", "Postman"],
  },
  {
    key: "erp-consultant",
    title: {
      vi: "Chuyên viên Tư vấn ERP / BA",
      en: "ERP Consultant / Business Analyst",
    },
    team: "consulting",
    level: { vi: "2+ năm kinh nghiệm", en: "2+ years" },
    summary: {
      vi: "Làm việc cùng khách hàng để phân tích quy trình và triển khai giải pháp ERP.",
      en: "Work with clients to map their processes and roll out ERP solutions.",
    },
    duties: [
      {
        vi: "Khảo sát, phân tích nghiệp vụ và viết tài liệu yêu cầu.",
        en: "Run workshops, analyse processes and write requirements.",
      },
      {
        vi: "Cấu hình hệ thống, đào tạo người dùng và hỗ trợ vận hành.",
        en: "Configure the system, train users and support go-live.",
      },
    ],
    needs: [
      {
        vi: "Hiểu quy trình kế toán, bán hàng, kho hoặc sản xuất.",
        en: "Know finance, sales, inventory or manufacturing processes.",
      },
      {
        vi: "Có kinh nghiệm SAP hoặc Microsoft Power Platform là lợi thế.",
        en: "SAP or Microsoft Power Platform experience is a plus.",
      },
    ],
    stack: ["SAP", "Power Apps", "Power BI"],
  },
  {
    key: "sales",
    title: {
      vi: "Nhân viên Kinh doanh phần mềm",
      en: "Software Sales Executive",
    },
    team: "business",
    level: { vi: "1+ năm kinh nghiệm", en: "1+ years" },
    summary: {
      vi: "Giới thiệu Medifam, KMK Sales và dịch vụ của KMK tới khách hàng mới.",
      en: "Bring Medifam, KMK Sales and KMK's services to new clients.",
    },
    duties: [
      {
        vi: "Tìm kiếm khách hàng, tư vấn và giới thiệu giải pháp.",
        en: "Find prospects, advise them and present our solutions.",
      },
      {
        vi: "Phối hợp với đội kỹ thuật để demo và báo giá.",
        en: "Work with the technical team on demos and quotes.",
      },
    ],
    needs: [
      {
        vi: "Giao tiếp tốt, chủ động và yêu thích công nghệ.",
        en: "A good communicator, proactive and keen on technology.",
      },
      {
        vi: "Có kinh nghiệm bán phần mềm hoặc ngành y tế là lợi thế.",
        en: "Software or healthcare sales experience is a plus.",
      },
    ],
  },
];

export const perks: {
  icon: "spark" | "layers" | "users" | "shield" | "code" | "handshake";
  title: L;
  body: L;
}[] = [
  {
    icon: "layers",
    title: {
      vi: "Sản phẩm thật, người dùng thật",
      en: "Real products, real users",
    },
    body: {
      vi: "Làm trên Medifam, KMK Sales và các dự án cho doanh nghiệp, cơ sở y tế đang vận hành mỗi ngày.",
      en: "Work on Medifam, KMK Sales and projects that businesses and clinics run on every day.",
    },
  },
  {
    icon: "code",
    title: { vi: "Công nghệ hiện đại", en: "Modern technology" },
    body: {
      vi: "React, .NET, Flutter, cloud, AI và Microsoft Power Platform trong cùng một đội.",
      en: "React, .NET, Flutter, cloud, AI and Microsoft Power Platform in one team.",
    },
  },
  {
    icon: "spark",
    title: { vi: "Học hỏi không ngừng", en: "Always learning" },
    body: {
      vi: "Không ngừng cập nhật kiến thức, nghiên cứu và phát huy tối đa khả năng sáng tạo.",
      en: "Keep updating your knowledge, researching and making the most of your creativity.",
    },
  },
  {
    icon: "users",
    title: { vi: "Đội ngũ gần gũi", en: "A close-knit team" },
    body: {
      vi: "Đội ngũ nhỏ, trao đổi trực tiếp, ý kiến của bạn được lắng nghe.",
      en: "A small team where you talk directly and your ideas are heard.",
    },
  },
  {
    icon: "shield",
    title: { vi: "Chế độ đầy đủ", en: "Full benefits" },
    body: {
      vi: "Lương cạnh tranh, đánh giá định kỳ, bảo hiểm theo luật lao động.",
      en: "Competitive pay, regular reviews and statutory insurance.",
    },
  },
  {
    icon: "handshake",
    title: { vi: "Lộ trình rõ ràng", en: "A clear path" },
    body: {
      vi: "Được hướng dẫn khi mới vào và có lộ trình phát triển theo năng lực.",
      en: "Onboarding support and a growth path that follows your skills.",
    },
  },
];

export const hiringSteps: { title: L; body: L }[] = [
  {
    title: { vi: "Gửi CV", en: "Send your CV" },
    body: {
      vi: "Gửi CV qua email, ghi rõ vị trí ứng tuyển.",
      en: "Email your CV with the role in the subject.",
    },
  },
  {
    title: { vi: "Sàng lọc", en: "Screening" },
    body: {
      vi: "KMK xem hồ sơ và liên hệ lại trong vài ngày làm việc.",
      en: "We review it and get back to you within a few working days.",
    },
  },
  {
    title: { vi: "Phỏng vấn", en: "Interview" },
    body: {
      vi: "Trao đổi chuyên môn và văn hóa làm việc cùng đội ngũ.",
      en: "Talk skills and ways of working with the team.",
    },
  },
  {
    title: { vi: "Nhận offer", en: "Offer" },
    body: {
      vi: "Nhận thư mời và cùng KMK bắt đầu hành trình.",
      en: "Get your offer and start the journey with KMK.",
    },
  },
];

/** A pre-filled email to apply for a role (or with no role, an open application). */
export function applyHref(role: string | undefined, vi: boolean) {
  const subject = role
    ? `[${vi ? "Ứng tuyển" : "Application"}] ${role}`
    : `[${vi ? "Ứng tuyển" : "Application"}] ${vi ? "Ứng tuyển tự do" : "Open application"}`;
  const body = vi
    ? `Chào KMK Technology,\n\nTôi muốn ứng tuyển${role ? ` vị trí ${role}` : ""}. CV của tôi được đính kèm theo email này.\n\nHọ tên:\nSố điện thoại:\n`
    : `Hello KMK Technology,\n\nI would like to apply${role ? ` for the ${role} role` : ""}. My CV is attached.\n\nName:\nPhone:\n`;
  return `mailto:${careersEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
