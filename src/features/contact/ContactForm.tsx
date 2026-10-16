import {
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import { Button } from "../../components/ui/Button";
import Icon from "../../components/ui/Icon";
import { company, enquiryTopics } from "../../content/site";
import { useLang, type L } from "../../i18n/context";
import {
  buildMailto,
  CONTACT_MODE,
  submitToEndpoint,
  validate,
  type ContactPayload,
  type ErrorCode,
  type FieldErrors,
} from "./submit";
import { onTopicRequest } from "./topic";

type Status = "idle" | "submitting" | "sent" | "drafted" | "error";

const EMPTY: ContactPayload = {
  name: "",
  email: "",
  phone: "",
  company: "",
  topic: "",
  message: "",
};

const text = {
  name: { vi: "Họ và tên", en: "Full name" },
  email: { vi: "Email", en: "Email" },
  phone: { vi: "Số điện thoại", en: "Phone" },
  company: { vi: "Công ty", en: "Company" },
  topic: { vi: "Nhu cầu tư vấn", en: "Area of interest" },
  topicPlaceholder: { vi: "Chọn lĩnh vực", en: "Select an area" },
  message: { vi: "Nội dung yêu cầu", en: "Your request" },
  messagePlaceholder: {
    vi: "Mô tả ngắn mục tiêu, phạm vi và thời gian mong muốn",
    en: "Briefly describe your goals, scope and timeline",
  },
  optional: { vi: "Không bắt buộc", en: "Optional" },
  submitMail: { vi: "Gửi qua email", en: "Send via email" },
  submitApi: { vi: "Gửi yêu cầu", en: "Send request" },
  sending: { vi: "Đang gửi…", en: "Sending…" },
  noteMail: {
    vi: `Khi gửi, ứng dụng email sẽ mở sẵn thư tới ${company.email}. Website không lưu dữ liệu.`,
    en: `Sending opens your email app with this message addressed to ${company.email}. Nothing is stored on this website.`,
  },
  noteApi: {
    vi: "Thông tin của bạn chỉ được dùng để phản hồi yêu cầu này.",
    en: "Your details are only used to reply to this enquiry.",
  },
  sent: {
    vi: "Cảm ơn bạn, yêu cầu đã được gửi. KMK sẽ phản hồi qua email bạn cung cấp.",
    en: "Thank you, your request has been sent. KMK will reply to the email address you provided.",
  },
  drafted: {
    vi: "Thư đã được soạn sẵn trong ứng dụng email - bấm gửi để hoàn tất. Không thấy? Gửi tới",
    en: "Your email app should now show the drafted message - press send there to reach us. Nothing opened? Email",
  },
  orCall: { vi: "hoặc gọi", en: "or call" },
  error: {
    vi: "Chưa gửi được. Vui lòng thử lại hoặc email tới",
    en: "We couldn't send your enquiry. Please try again, or email",
  },
} satisfies Record<string, L>;

const errorText: Record<ErrorCode, L> = {
  name: { vi: "Vui lòng nhập họ tên.", en: "Please enter your name." },
  email: {
    vi: "Vui lòng nhập email hợp lệ.",
    en: "Please enter a valid email address.",
  },
  phone: {
    vi: "Vui lòng nhập số điện thoại hợp lệ.",
    en: "Please enter a valid phone number.",
  },
  topic: {
    vi: "Vui lòng chọn lĩnh vực cần tư vấn.",
    en: "Please select an area of interest.",
  },
  message: {
    vi: "Vui lòng mô tả thêm (ít nhất 10 ký tự).",
    en: "Please tell us a little more (at least 10 characters).",
  },
};

const inputCls =
  "w-full rounded-xl border bg-[#f6f8fb] px-4 py-3.5 text-[1rem] text-ink placeholder:text-subtle transition-[border-color,background-color,box-shadow] duration-300 focus:border-brand focus:bg-canvas focus:shadow-[0_0_0_4px_rgb(33_118_245/0.12)] focus:outline-none";

function Field({
  id,
  label,
  error,
  optional,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  optional?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 flex items-baseline gap-1 text-[0.875rem] font-medium text-ink"
      >
        {label}
        {optional ? (
          <span className="ml-auto text-[0.75rem] font-normal text-subtle">
            {optional}
          </span>
        ) : (
          <span className="text-brand" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {error ? (
        <p
          id={`${id}-error`}
          className="mt-2 flex items-center gap-2 text-[0.8125rem] text-[#c0392b]"
        >
          <Icon name="alert" className="shrink-0" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default function ContactForm() {
  const { t, lang } = useLang();
  const uid = useId();
  const [values, setValues] = useState<ContactPayload>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<
    Partial<Record<keyof ContactPayload, boolean>>
  >({});
  const [status, setStatus] = useState<Status>("idle");
  const [honeypot, setHoneypot] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const inflight = useRef(false);

  // CTAs elsewhere on the page can pre-select a topic.
  useEffect(
    () =>
      onTopicRequest((topic) => {
        if (enquiryTopics.some((e) => e.key === topic))
          setValues((v) => ({ ...v, topic }));
      }),
    [],
  );

  const id = (k: keyof ContactPayload) => `${uid}-${k}`;
  const topicLabel = (key: string) => {
    const found = enquiryTopics.find((e) => e.key === key);
    return found ? t(found.label) : "";
  };

  const update =
    (k: keyof ContactPayload) =>
    (
      e: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      const next = { ...values, [k]: e.target.value };
      setValues(next);
      if (touched[k]) setErrors(validate(next));
      if (status !== "idle" && status !== "submitting") setStatus("idle");
    };

  const blur = (k: keyof ContactPayload) => () => {
    setTouched((prev) => ({ ...prev, [k]: true }));
    setErrors(validate(values));
  };

  const errorFor = (k: keyof ContactPayload) => {
    const code = touched[k] ? errors[k] : undefined;
    return code ? t(errorText[code]) : undefined;
  };

  const a11y = (k: keyof ContactPayload) => ({
    id: id(k),
    name: k,
    "aria-invalid": Boolean(errorFor(k)) || undefined,
    "aria-describedby": errorFor(k) ? `${id(k)}-error` : undefined,
    onBlur: blur(k),
    onChange: update(k),
    value: values[k],
  });

  const border = (k: keyof ContactPayload) =>
    errorFor(k) ? "border-[#c0392b]/60" : "border-line";

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (inflight.current) return; // double-submit guard
    const found = validate(values);
    setErrors(found);
    setTouched({
      name: true,
      email: true,
      phone: true,
      company: true,
      topic: true,
      message: true,
    });
    const firstInvalid = (Object.keys(found) as (keyof ContactPayload)[])[0];
    if (firstInvalid) {
      formRef.current
        ?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)
        ?.focus();
      return;
    }
    if (honeypot) return; // bot: drop silently

    if (CONTACT_MODE === "mailto") {
      window.location.href = buildMailto(
        values,
        topicLabel(values.topic),
        lang,
      );
      setStatus("drafted");
      statusRef.current?.focus();
      return;
    }

    inflight.current = true;
    setStatus("submitting");
    const ctrl = new AbortController();
    const timer = window.setTimeout(() => ctrl.abort(), 15000);
    try {
      await submitToEndpoint(
        { ...values, topicLabel: topicLabel(values.topic), lang },
        ctrl.signal,
      );
      setStatus("sent");
      setValues(EMPTY);
      setTouched({});
    } catch {
      setStatus("error");
    } finally {
      window.clearTimeout(timer);
      inflight.current = false;
      statusRef.current?.focus();
    }
  }

  const mailLink = (
    <a
      className="font-semibold underline underline-offset-4"
      href={`mailto:${company.email}`}
    >
      {company.email}
    </a>
  );

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      className="relative space-y-5"
      aria-describedby={`${uid}-mode`}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={id("name")} label={t(text.name)} error={errorFor("name")}>
          <input
            type="text"
            autoComplete="name"
            required
            className={`${inputCls} ${border("name")}`}
            {...a11y("name")}
          />
        </Field>
        <Field id={id("email")} label={t(text.email)} error={errorFor("email")}>
          <input
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            className={`${inputCls} ${border("email")}`}
            {...a11y("email")}
          />
        </Field>
        <Field
          id={id("phone")}
          label={t(text.phone)}
          optional={t(text.optional)}
          error={errorFor("phone")}
        >
          <input
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            className={`${inputCls} ${border("phone")}`}
            {...a11y("phone")}
          />
        </Field>
        <Field
          id={id("company")}
          label={t(text.company)}
          optional={t(text.optional)}
        >
          <input
            type="text"
            autoComplete="organization"
            className={`${inputCls} ${border("company")}`}
            {...a11y("company")}
          />
        </Field>
      </div>

      <Field id={id("topic")} label={t(text.topic)} error={errorFor("topic")}>
        <div className="relative">
          <select
            required
            className={`${inputCls} ${border("topic")} appearance-none pr-12`}
            {...a11y("topic")}
          >
            <option value="" disabled>
              {t(text.topicPlaceholder)}
            </option>
            {enquiryTopics.map((topic) => (
              <option key={topic.key} value={topic.key}>
                {t(topic.label)}
              </option>
            ))}
          </select>
          <Icon
            name="arrowDown"
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted"
          />
        </div>
      </Field>

      <Field
        id={id("message")}
        label={t(text.message)}
        error={errorFor("message")}
      >
        <textarea
          rows={5}
          required
          placeholder={t(text.messagePlaceholder)}
          className={`${inputCls} ${border("message")} min-h-[9rem] resize-y`}
          {...a11y("message")}
        />
      </Field>

      {/* Honeypot - invisible to people, tempting to bots */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
      >
        <label>
          Website
          <input
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </label>
      </div>

      <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <p
          id={`${uid}-mode`}
          className="max-w-[24rem] text-[0.8125rem] leading-relaxed text-muted"
        >
          {CONTACT_MODE === "mailto" ? t(text.noteMail) : t(text.noteApi)}
        </p>
        <Button
          type="submit"
          icon="arrowRight"
          disabled={status === "submitting"}
          aria-busy={status === "submitting"}
          className="shrink-0"
        >
          {status === "submitting"
            ? t(text.sending)
            : CONTACT_MODE === "mailto"
              ? t(text.submitMail)
              : t(text.submitApi)}
        </Button>
      </div>

      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className="outline-none"
      >
        {status === "sent" && (
          <p className="flex items-start gap-3 rounded-xl border border-signal/30 bg-signal/10 p-4 text-[0.9375rem] text-ink">
            <Icon name="check" className="mt-0.5 shrink-0 text-signal" />
            {t(text.sent)}
          </p>
        )}
        {status === "drafted" && (
          <p className="flex items-start gap-3 rounded-xl border border-brand/20 bg-brand-tint p-4 text-[0.9375rem] text-ink">
            <Icon name="mail" className="mt-0.5 shrink-0 text-brand" />
            <span>
              {t(text.drafted)} {mailLink} {t(text.orCall)}{" "}
              <a
                className="font-semibold underline underline-offset-4"
                href={company.phoneHref}
              >
                {company.phoneDisplay}
              </a>
              .
            </span>
          </p>
        )}
        {status === "error" && (
          <p className="flex items-start gap-3 rounded-xl border border-[#c0392b]/30 bg-[#c0392b]/5 p-4 text-[0.9375rem] text-ink">
            <Icon name="alert" className="mt-0.5 shrink-0 text-[#c0392b]" />
            <span>
              {t(text.error)} {mailLink}.
            </span>
          </p>
        )}
      </div>
    </form>
  );
}
