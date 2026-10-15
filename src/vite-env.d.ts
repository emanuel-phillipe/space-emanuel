/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly EMAILJS_PUBLIC?: string
  readonly EMAILJS_PRIVATE?: string
  readonly EMAILJS_SERVICE?: string
  readonly EMAILJS_TEMPLATE?: string
  readonly VITE_EMAILJS_PUBLIC?: string
  readonly VITE_EMAILJS_PRIVATE?: string
  readonly VITE_EMAILJS_SERVICE?: string
  readonly VITE_EMAILJS_TEMPLATE?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
