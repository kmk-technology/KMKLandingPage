import type { Product } from "../../content/site";
import { ProductMonogram } from "./ProductMark";

/*
 * Illustrative device mockups. Screens are abstract interfaces in each product's colours -
 * no invented data, names or numbers.
 */

const bar = (w: string, c = "bg-ink/10") => (
  <span className={`block h-2 rounded-full ${c}`} style={{ width: w }} />
);

function ClinicScreen({ p }: { p: Product }) {
  return (
    <div className="flex h-full bg-white">
      <div
        className="flex w-[17%] flex-col gap-2.5 p-2.5"
        style={{ background: p.from }}
      >
        <ProductMonogram p={p} white className="h-7 w-7 text-[0.7rem]" />
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className={`block h-2 rounded-full ${i === 1 ? "bg-white" : "bg-white/35"}`}
          />
        ))}
      </div>
      <div className="flex flex-1 flex-col gap-2.5 p-3.5">
        <div className="flex items-center justify-between">
          {bar("38%", "bg-ink/25")}
          <span className="h-5 w-5 rounded-full" style={{ background: p.to }} />
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block h-12 rounded-lg p-2"
              style={{
                background: i < 2 ? `${[p.from, p.to][i]}1f` : "#f1f3f7",
              }}
            >
              <span
                className="block h-1.5 w-1/2 rounded-full"
                style={{ background: i < 2 ? [p.from, p.to][i] : "#cbd5e1" }}
              />
            </span>
          ))}
        </div>
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex items-center gap-2 rounded-lg bg-ink/[0.03] p-2"
          >
            <span
              className="h-4 w-4 shrink-0 rounded-full"
              style={{ background: i % 2 ? p.to : p.from, opacity: 0.65 }}
            />
            {bar(`${62 - i * 9}%`)}
          </div>
        ))}
      </div>
    </div>
  );
}

function PosScreen({ p }: { p: Product }) {
  return (
    <div className="flex h-full gap-2.5 bg-[#f4f6fb] p-3">
      <div className="grid flex-1 grid-cols-3 content-start gap-2">
        {Array.from({ length: 9 }, (_, i) => (
          <span
            key={i}
            className="flex aspect-[5/4] flex-col justify-end rounded-lg bg-white p-1.5 shadow-sm"
          >
            <span
              className="mb-auto h-1/2 rounded-md"
              style={{ background: i % 3 === 0 ? `${p.from}26` : `${p.to}1f` }}
            />
            {bar("70%")}
          </span>
        ))}
      </div>
      <div className="flex w-[34%] flex-col gap-2 rounded-lg bg-white p-2.5 shadow-sm">
        {bar("55%", "bg-ink/25")}
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="flex justify-between">
            {bar("45%")}
            {bar("18%")}
          </span>
        ))}
        <span
          className="mt-auto block h-7 rounded-md"
          style={{ background: p.from }}
        />
      </div>
    </div>
  );
}

function WarehouseScreen({ p }: { p: Product }) {
  return (
    <div className="flex h-full flex-col gap-2.5 bg-white p-3">
      <div className="flex items-center gap-2">
        <ProductMonogram p={p} className="h-6 w-6 text-[0.6rem]" />
        {bar("40%", "bg-ink/25")}
      </div>
      <div
        className="relative grid aspect-[4/3] place-items-center rounded-xl border-2 border-dashed"
        style={{ borderColor: `${p.to}99`, background: `${p.to}12` }}
      >
        <span
          className="absolute inset-x-4 top-1/2 h-0.5 animate-pulse rounded-full"
          style={{ background: p.from }}
        />
      </div>
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex items-center gap-2 rounded-lg bg-ink/[0.03] p-2"
        >
          <span
            className="h-5 w-5 shrink-0 rounded-md"
            style={{ background: `${p.from}${i % 2 ? "55" : "33"}` }}
          />
          {bar(`${58 - i * 8}%`)}
        </div>
      ))}
    </div>
  );
}

export function Laptop({ p }: { p: Product }) {
  return (
    <div className="mx-auto w-full max-w-[34rem]" aria-hidden="true">
      <div className="rounded-t-[1.1rem] bg-[#16181d] p-[2.2%] pb-[2.6%] shadow-[0_50px_90px_-40px_rgba(0,0,0,0.7)]">
        <div className="aspect-[16/10] overflow-hidden rounded-md">
          <ClinicScreen p={p} />
        </div>
      </div>
      <div className="relative mx-[-6%] h-3.5 rounded-b-xl bg-gradient-to-b from-[#e2e3e8] to-[#a9aab2]">
        <span className="absolute left-1/2 top-0 h-1.5 w-1/6 -translate-x-1/2 rounded-b-md bg-[#8e8f96]" />
      </div>
    </div>
  );
}

export function Tablet({ p }: { p: Product }) {
  return (
    <div
      className="mx-auto w-full max-w-[30rem] rounded-[1.7rem] bg-[#16181d] p-[3%] shadow-[0_50px_90px_-40px_rgba(0,0,0,0.7)]"
      aria-hidden="true"
    >
      <div className="aspect-[4/3] overflow-hidden rounded-[1.1rem]">
        <PosScreen p={p} />
      </div>
    </div>
  );
}

export function Phone({ p }: { p: Product }) {
  return (
    <div
      className="mx-auto w-[46%] max-w-[15rem] rounded-[2.4rem] bg-[#16181d] p-[3.5%] shadow-[0_50px_90px_-40px_rgba(0,0,0,0.7)]"
      aria-hidden="true"
    >
      <div className="relative aspect-[9/19] overflow-hidden rounded-[2rem]">
        <span className="absolute left-1/2 top-2 z-10 h-4 w-1/3 -translate-x-1/2 rounded-full bg-[#16181d]" />
        <div className="h-full pt-8">
          <WarehouseScreen p={p} />
        </div>
      </div>
    </div>
  );
}
