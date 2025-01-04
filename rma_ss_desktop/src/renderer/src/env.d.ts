/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly MAIN_VITE_DATABASE_URL: string
    readonly MAIN_VITE_AUTH_SECRET: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}