import { useTranslation } from "react-i18next"
import { useWindowManager, type DetailWindowId } from "../context/WindowManagerContext"
import { CaretDownIcon } from "@phosphor-icons/react"
import logoLocaliza from "../assets/logo_localiza.png"
import logoGrupoFacil from "../assets/logo_grupofacil.png"
import OpenDetailButton from "../components/OpenDetailButton"

interface ExperienciaItem {
  id: DetailWindowId
  logo: string
  company: string
  role: string
  period: string
}

function ExperienciaCard({ id, logo, company, role, period }: ExperienciaItem) {
  const { openDetail } = useWindowManager()
  const { t } = useTranslation()
  return (
    <button type="button" onClick={() => openDetail(id)} className="experience-card" aria-haspopup="dialog" aria-label={t("windows.exploreCompany", { company })}>
      <img src={logo} alt="" className="w-12 h-12 rounded-xl object-contain bg-zinc-900 border border-zinc-700/80 p-0.5 shrink-0" />
      <span className="flex flex-col gap-1 flex-1 min-w-0">
        <strong className="text-zinc-100 text-lg font-semibold font-outfit">{company}</strong>
        <span className="text-zinc-300 text-base font-outfit">{role}</span>
        <span className="text-zinc-400 text-sm font-outfit">{period}</span>
        <span className="text-violet-400 text-xs mt-1">{t("windows.actions.experience")}</span>
      </span>
      <CaretDownIcon size={20} className="text-violet-400 -rotate-90 shrink-0" />
    </button>
  )
}

function Desktop_Experiencia() {
  const { t } = useTranslation()
  const experiencias: ExperienciaItem[] = [
    ["localiza", logoLocaliza], ["grupoFacil", logoGrupoFacil],
  ].map(([id, logo]) => ({
    id: id as DetailWindowId, logo, company: t(`experience.items.${id}.company`),
    role: t(`experience.items.${id}.role`), period: t(`experience.items.${id}.period`),
  }))

  return (
    <section className="w-full">
      <div>

        {/* Content */}
        <div className="px-8 py-8 flex flex-col gap-6">
          {/* Header */}
          <div className="flex flex-col gap-1">
            <h1 className="text-zinc-100 text-2xl font-bold font-poppins">{t("experience.title")}</h1>
            <p className="text-zinc-400 text-base font-medium font-poppins">{t("experience.subtitle")}</p>
          </div>

          <OpenDetailButton detail="skills">{t("windows.actions.skills")}</OpenDetailButton>

          {/* List */}
          <div className="flex flex-col gap-3">
            {experiencias.map((item) => (
              <ExperienciaCard key={item.company} {...item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Desktop_Experiencia
