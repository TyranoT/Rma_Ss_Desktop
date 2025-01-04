/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly ELECTRON_RENDERER_URL: string
  readonly MAIN_VITE_AUTH_SECRET: string
  readonly MAIN_VITE_DATABASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}