/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Optional URL that receives contact-form submissions as JSON (see .env.example). */
  readonly VITE_CONTACT_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
