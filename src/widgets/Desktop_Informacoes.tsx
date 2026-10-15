import { useTranslation } from "react-i18next"
import {
  SmileyBlankIcon,
  AtIcon,
  PhoneIcon,
  MapPinAreaIcon,
  LinkedinLogoIcon,
  GithubLogoIcon,
  InstagramLogoIcon
} from "@phosphor-icons/react"
import OpenDetailButton from "../components/OpenDetailButton"

function Desktop_Informacoes() {
  const { t } = useTranslation()

  return (
    <section className="w-full">
      <div>

        {/* Content */}
        <div className="px-8 py-8 flex flex-col gap-7">
          {/* Header */}
          <div className="flex flex-col gap-1">
            <h1 className="text-zinc-100 text-2xl font-bold font-poppins">{t("info.title")}</h1>
            <p className="text-zinc-400 text-base font-medium font-poppins">{t("info.subtitle")}</p>
          </div>

          <OpenDetailButton detail="channels">{t("windows.actions.channels")}</OpenDetailButton>

          {/* PESSOAL section */}
          <div className="flex flex-col gap-4">
            <h2 className="text-zinc-100 text-base font-bold font-outfit tracking-wider">{t("info.personalSection")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-[130px_1fr] gap-y-4 items-center">
              <div className="flex items-center gap-2.5 text-zinc-300">
                <SmileyBlankIcon size={22} className="text-violet-400" />
                <span className="text-base font-medium font-outfit">{t("info.nameLabel")}</span>
              </div>
              <span className="text-zinc-200 text-base font-outfit">
                {t("info.fullName")}
              </span>

              <div className="flex items-center gap-2.5 text-zinc-300">
                <AtIcon size={22} className="text-violet-400" />
                <span className="text-base font-medium font-outfit">{t("info.emailLabel")}</span>
              </div>
              <a
                href="mailto:contato@emanuelcarvalho.com.br"
                className="break-all text-zinc-300 text-base font-outfit hover:text-violet-400 transition-colors"
              >
                contato@emanuelcarvalho.com.br
              </a>

              <div className="flex items-center gap-2.5 text-zinc-300">
                <PhoneIcon size={22} className="text-violet-400" />
                <span className="text-base font-medium font-outfit">{t("info.phoneLabel")}</span>
              </div>
              <a
                href="https://wa.me/5531982205685"
                target="_blank"
                rel="noreferrer"
                className="break-all text-zinc-300 text-base font-outfit hover:text-violet-400 transition-colors"
              >
                {t("info.phoneValue")}
              </a>

              <div className="flex items-center gap-2.5 text-zinc-300">
                <MapPinAreaIcon size={22} className="text-violet-400" />
                <span className="text-base font-medium font-outfit">{t("info.locationLabel")}</span>
              </div>
              <span className="text-zinc-300 text-base font-outfit">
                {t("info.locationValue")}
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-zinc-800/80" />

          {/* SOCIAL section */}
          <div className="flex flex-col gap-4">
            <h2 className="text-zinc-100 text-base font-bold font-outfit tracking-wider">{t("info.socialSection")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-[130px_1fr] gap-y-4 items-center">
              <div className="flex items-center gap-2.5 text-zinc-300">
                <LinkedinLogoIcon size={22} className="text-violet-400" />
                <span className="text-base font-medium font-outfit">Linkedin</span>
              </div>
              <a
                href="https://www.linkedin.com/in/emanuel-phillipe/"
                target="_blank"
                rel="noreferrer"
                className="text-violet-400 text-base font-outfit hover:underline hover:text-violet-300 transition-colors"
              >
                emanuel-phillipe
              </a>

              <div className="flex items-center gap-2.5 text-zinc-300">
                <GithubLogoIcon size={22} className="text-violet-400" />
                <span className="text-base font-medium font-outfit">GitHub</span>
              </div>
              <a
                href="https://github.com/emanuel-phillipe"
                target="_blank"
                rel="noreferrer"
                className="text-violet-400 text-base font-outfit hover:underline hover:text-violet-300 transition-colors"
              >
                emanuel-phillipe
              </a>

              <div className="flex items-center gap-2.5 text-zinc-300">
                <InstagramLogoIcon size={22} className="text-violet-400" />
                <span className="text-base font-medium font-outfit">Instagram</span>
              </div>
              <a
                href="https://www.instagram.com/emanuel.phillipe"
                target="_blank"
                rel="noreferrer"
                className="break-all text-zinc-300 text-base font-outfit hover:text-violet-400 transition-colors"
              >
                emanuel-phillipe
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Desktop_Informacoes

