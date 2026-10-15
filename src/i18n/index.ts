import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import { pt } from "./locales/pt"
import { en } from "./locales/en"

export const defaultNS = "translation"
export const resources = {
  pt: { translation: pt },
  en: { translation: en },
} as const

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    load: "languageOnly",
    fallbackLng: "pt",
    supportedLngs: ["pt", "en"],
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  })

export default i18n

// Keep browser and assistive technology metadata in sync with the interface.
const updateDocumentLanguage = () => {
  document.documentElement.lang = i18n.resolvedLanguage === "en" ? "en" : "pt-BR"
  document.title = i18n.t("common.pageTitle")
}
i18n.on("languageChanged", updateDocumentLanguage)
updateDocumentLanguage()
