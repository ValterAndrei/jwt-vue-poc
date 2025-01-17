/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AUTH_BASE_URL: string
  readonly VITE_DATABASE_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}