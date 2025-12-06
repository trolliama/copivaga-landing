/// <reference types="vite/client" />

interface Window {
  dataLayer?: unknown[];
}

interface ImportMetaEnv {
  readonly VITE_GTM_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
