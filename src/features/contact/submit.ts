import { company } from "../../content/site";
import type { Lang } from "../../i18n/context";

export type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  company: string;
  /** Stable topic key (see enquiryTopics in content/site.ts). */
  topic: string;
  message: string;
};

/**
 * Optional backend. When set, the form POSTs JSON here (Formspree, a serverless
 * function, a CRM webhook…). When unset, the form opens a pre-filled e-mail draft.
 */
export const CONTACT_ENDPOINT = (
  import.meta.env.VITE_CONTACT_ENDPOINT ?? ""
).trim();
export const CONTACT_MODE: "endpoint" | "mailto" = CONTACT_ENDPOINT
  ? "endpoint"
  : "mailto";

export async function submitToEndpoint(
  payload: ContactPayload & { topicLabel: string; lang: Lang },
  signal?: AbortSignal,
) {
  const res = await fetch(CONTACT_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ ...payload, source: window.location.href }),
    signal,
  });
  if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
}

export function buildMailto(p: ContactPayload, topicLabel: string, lang: Lang) {
  const vi = lang === "vi";
  const subject = `[Website] ${topicLabel || (vi ? "Yêu cầu tư vấn" : "Enquiry")} - ${p.name}${p.company ? ` (${p.company})` : ""}`;
  const details = [
    [vi ? "Họ tên" : "Name", p.name],
    ["Email", p.email],
    [vi ? "Điện thoại" : "Phone", p.phone],
    [vi ? "Công ty" : "Company", p.company],
    [vi ? "Nhu cầu" : "Topic", topicLabel],
  ]
    .filter(([, v]) => v.trim())
    .map(([k, v]) => `${k}: ${v.trim()}`);
  const body = [p.message.trim(), "", "-", ...details].join("\n");
  return `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export type ErrorCode = "name" | "email" | "phone" | "topic" | "message";
export type FieldErrors = Partial<Record<keyof ContactPayload, ErrorCode>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\d\s.-]{8,20}$/;

export function validate(p: ContactPayload): FieldErrors {
  const e: FieldErrors = {};
  if (p.name.trim().length < 2) e.name = "name";
  if (!EMAIL_RE.test(p.email.trim())) e.email = "email";
  if (p.phone.trim() && !PHONE_RE.test(p.phone.trim())) e.phone = "phone";
  if (!p.topic) e.topic = "topic";
  if (p.message.trim().length < 10) e.message = "message";
  return e;
}
