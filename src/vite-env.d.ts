/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_EMAIL: string
  readonly VITE_TELEGRAM: string
  readonly VITE_WHATSAPP: string
  readonly VITE_BACKEND_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
