// Lets any CTA on the page pre-select the enquiry topic in the contact form.
const EVENT = "kmk:contact-topic";

export function requestTopic(topic: string) {
  window.dispatchEvent(new CustomEvent<string>(EVENT, { detail: topic }));
}

export function onTopicRequest(handler: (topic: string) => void) {
  const listener = (e: Event) => handler((e as CustomEvent<string>).detail);
  window.addEventListener(EVENT, listener);
  return () => window.removeEventListener(EVENT, listener);
}
