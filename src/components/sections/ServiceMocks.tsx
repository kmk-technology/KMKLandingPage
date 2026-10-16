import type { ReactNode } from "react";
import type { ServiceKey } from "../../content/site";

/*
 * Illustrative, looping UI scenes for each service. They show what the work looks like
 * (an editor, ERP modules, a server rack, a delivery board) - no real data or figures.
 */

function Window({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div
      className={`overflow-hidden rounded-2xl shadow-[0_40px_80px_-30px_rgba(0,0,0,0.55)] bg-white`}
    >
      <div
        className={`flex items-center gap-2 px-4 py-3 border-b border-ink/5`}
      >
        <span className={`h-2.5 w-2.5 rounded-full bg-ink/15`} />
        <span className={`h-2.5 w-2.5 rounded-full bg-ink/15`} />
        <span className="h-2.5 w-2.5 rounded-full bg-brand" />
        <span className={`ml-3 font-mono text-[0.6875rem] text-ink/45`}>
          {title}
        </span>
      </div>
      {children}
    </div>
  );
}

function CodeMock() {
  const lines: [string, string][][] = [
    [
      ["#457ae7", "import"],
      ["#3c3c43", " { createApp } "],
      ["#457ae7", "from"],
      ["#3a6bd6", ' "@kmk/core"'],
    ],
    [],
    [
      ["#457ae7", "const"],
      ["#457ae7", " app"],
      ["#3c3c43", " = createApp({"],
    ],
    [
      ["#3c3c43", "  name: "],
      ["#3a6bd6", '"your-business"'],
      ["#3c3c43", ","],
    ],
    [
      ["#3c3c43", "  platforms: ["],
      ["#3a6bd6", '"web"'],
      ["#3c3c43", ", "],
      ["#3a6bd6", '"mobile"'],
      ["#3c3c43", "],"],
    ],
    [
      ["#3c3c43", "  workflow: "],
      ["#457ae7", "yourProcess"],
      ["#3c3c43", ","],
    ],
    [["#3c3c43", "});"]],
    [],
    [
      ["#457ae7", "app"],
      ["#3c3c43", ".deploy();"],
      ["#6e6e73", "  // ✓ live"],
    ],
  ];
  return (
    <Window title="app.ts">
      <div className="space-y-1.5 p-5 font-mono text-[0.75rem] leading-relaxed sm:text-[0.8125rem]">
        {lines.map((l, i) => (
          <div key={i} className="flex gap-4">
            <span className="w-4 shrink-0 text-right text-ink/25">{i + 1}</span>
            <span
              className="mock-type whitespace-pre"
              style={{ animationDelay: `${i * 0.35}s` }}
            >
              {l.map(([c, s], j) => (
                <span key={j} style={{ color: c }}>
                  {s}
                </span>
              ))}
              {i === lines.length - 1 ? (
                <span className="ml-0.5 inline-block h-3.5 w-1.5 translate-y-0.5 animate-pulse bg-brand" />
              ) : null}
            </span>
          </div>
        ))}
      </div>
    </Window>
  );
}

function ErpMock({ vi }: { vi: boolean }) {
  const mods = vi
    ? ["Tài chính", "Mua hàng", "Kho vận", "Bán hàng", "Nhân sự", "Báo cáo"]
    : ["Finance", "Purchasing", "Inventory", "Sales", "HR", "Reporting"];
  return (
    <Window title="ERP - Oracle EBS · SAP">
      <div className="relative grid grid-cols-3 gap-3 p-5">
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <line
            x1="16%"
            y1="35%"
            x2="84%"
            y2="35%"
            stroke="#457ae7"
            strokeWidth="1.5"
            className="mock-flow"
          />
          <line
            x1="16%"
            y1="72%"
            x2="84%"
            y2="72%"
            stroke="#457ae7"
            strokeWidth="1.5"
            className="mock-flow"
          />
          <line
            x1="50%"
            y1="35%"
            x2="50%"
            y2="72%"
            stroke="#457ae7"
            strokeWidth="1.5"
            className="mock-flow"
          />
        </svg>
        {mods.map((m, i) => (
          <div
            key={m}
            className="relative rounded-xl border border-ink/10 bg-white p-3 shadow-sm"
          >
            <span
              className="block h-6 w-6 rounded-lg"
              style={{ background: i % 2 ? "#a9c0f2" : "#457ae7" }}
            />
            <span className="mt-2 block text-[0.75rem] font-semibold text-ink">
              {m}
            </span>
            <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-ink/5">
              <span
                className="mock-bar block h-full rounded-full bg-brand/60"
                style={{ animationDelay: `${i * 0.3}s` }}
              />
            </span>
          </div>
        ))}
      </div>
    </Window>
  );
}

function CloudMock() {
  return (
    <Window title="infrastructure">
      <div className="space-y-3 p-5">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex items-center gap-4 rounded-xl bg-[#f4f6fb] px-4 py-3 ring-1 ring-ink/5"
          >
            <span className="flex gap-1.5">
              <span
                className="h-2 w-2 animate-pulse rounded-full bg-brand"
                style={{ animationDelay: `${i * 0.4}s` }}
              />
              <span className="h-2 w-2 rounded-full bg-brand/40" />
            </span>
            <span className="font-mono text-[0.75rem] text-ink/70">
              node-0{i + 1}
            </span>
            <span className="ml-auto h-1.5 w-1/2 overflow-hidden rounded-full bg-ink/10">
              <span
                className="mock-bar block h-full rounded-full bg-brand"
                style={{ animationDelay: `${i * 0.5}s` }}
              />
            </span>
          </div>
        ))}
      </div>
    </Window>
  );
}

function TeamMock({ vi }: { vi: boolean }) {
  const cols = vi
    ? ["Yêu cầu", "Đang làm", "Hoàn thành"]
    : ["Requested", "In progress", "Done"];
  return (
    <Window title={vi ? "Bảng công việc" : "Delivery board"}>
      <div className="relative grid grid-cols-3 gap-3 p-5">
        {cols.map((c) => (
          <div key={c} className="min-h-[12rem] rounded-xl bg-[#f4f6fb] p-2.5">
            <p className="px-1 text-[0.6875rem] font-semibold uppercase text-ink/50">
              {c}
            </p>
            <div className="mt-2 space-y-2">
              {[0, 1].map((k) => (
                <div key={k} className="rounded-lg bg-white p-2.5 shadow-sm">
                  <span className="block h-1.5 w-3/4 rounded-full bg-ink/15" />
                  <span className="mt-1.5 block h-1.5 w-1/2 rounded-full bg-ink/10" />
                </div>
              ))}
            </div>
          </div>
        ))}
        {/* the card that travels across the board */}
        <div className="mock-move absolute left-5 top-[4.6rem] w-[calc((100%-2.5rem-1.5rem)/3)] px-2.5">
          <div className="rounded-lg bg-brand-deep p-2.5 shadow-lg">
            <span className="block h-1.5 w-3/4 rounded-full bg-white/70" />
            <span className="mt-1.5 block h-1.5 w-1/2 rounded-full bg-brand/40" />
          </div>
        </div>
      </div>
    </Window>
  );
}

export default function ServiceMock({ k, vi }: { k: ServiceKey; vi: boolean }) {
  if (k === "software") return <CodeMock />;
  if (k === "erp") return <ErpMock vi={vi} />;
  if (k === "cloud") return <CloudMock />;
  return <TeamMock vi={vi} />;
}
