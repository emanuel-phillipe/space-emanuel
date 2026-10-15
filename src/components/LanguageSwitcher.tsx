import { useTranslation } from "react-i18next"
import { TranslateIcon } from "@phosphor-icons/react"

interface LanguageSwitcherProps {
  variant?: "desktop" | "mobile"
}

export function LanguageSwitcher({ variant = "desktop" }: LanguageSwitcherProps) {
  const { t, i18n } = useTranslation()
  const currentLang = i18n.resolvedLanguage?.startsWith("en") ? "en" : "pt"

  const setLanguage = (lang: "pt" | "en") => {
    if (currentLang !== lang) {
      void i18n.changeLanguage(lang)
    }
  }

  if (variant === "mobile") {
    return (
      <div role="group" aria-label={t("common.switchLanguage")} className="flex items-center gap-1 bg-zinc-900/90 border border-zinc-800/80 rounded-full p-1 text-xs font-mono">
        <TranslateIcon size={14} className="text-violet-400 ml-1.5" />
        <button
          onClick={() => setLanguage("pt")}
          className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
            currentLang === "pt"
              ? "bg-violet-600 text-white font-bold shadow-sm"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
          title={t("common.pt")}
          aria-label={t("common.pt")}
          aria-pressed={currentLang === "pt"}
        >
          PT
        </button>
        <button
          onClick={() => setLanguage("en")}
          className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
            currentLang === "en"
              ? "bg-violet-600 text-white font-bold shadow-sm"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
          title={t("common.en")}
          aria-label={t("common.en")}
          aria-pressed={currentLang === "en"}
        >
          EN
        </button>
      </div>
    )
  }

  return (
    <div role="group" aria-label={t("common.switchLanguage")} className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-zinc-800/80 bg-zinc-950/60 backdrop-blur-sm w-max hover:border-zinc-700 transition-colors">
      <TranslateIcon size={18} className="text-violet-400 shrink-0" />
      <div className="flex items-center gap-1 text-xs font-mono">
        <button
          onClick={() => setLanguage("pt")}
          className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
            currentLang === "pt"
              ? "bg-violet-600 text-white font-bold shadow-md shadow-violet-950/50"
              : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900"
          }`}
          title={t("common.pt")}
          aria-label={t("common.pt")}
          aria-pressed={currentLang === "pt"}
        >
          PT
        </button>
        <span className="text-zinc-600">/</span>
        <button
          onClick={() => setLanguage("en")}
          className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
            currentLang === "en"
              ? "bg-violet-600 text-white font-bold shadow-md shadow-violet-950/50"
              : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900"
          }`}
          title={t("common.en")}
          aria-label={t("common.en")}
          aria-pressed={currentLang === "en"}
        >
          EN
        </button>
      </div>
    </div>
  )
}

export default LanguageSwitcher
