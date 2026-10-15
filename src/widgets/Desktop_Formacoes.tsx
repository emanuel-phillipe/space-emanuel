import { useTranslation } from "react-i18next"
import logoSantaMaria from "../assets/logo_santamaria.png"
import logoPuc from "../assets/logo_puc.png"
import logoTfla from "../assets/logo_tfla.png"
import logoCultura from "../assets/logo_cultura.png"
import logoAws from "../assets/logo_aws.png"
import OpenDetailButton from "../components/OpenDetailButton"

interface FormacaoItem {
  logo: string
  name: string
  detail: string
  date: string
}

function FormacaoCard({ logo, name, detail, date }: FormacaoItem) {
  return (
    <div className="flex items-center gap-4">
      <img
        src={logo}
        alt={name}
        className="w-[48px] h-[48px] rounded-xl object-contain bg-zinc-900 border border-zinc-700/80 p-0.5 flex-shrink-0 shadow-sm"
      />
      <div className="flex flex-col gap-0.5">
        <span className="text-zinc-100 text-lg font-semibold font-outfit">{name}</span>
        <span className="text-zinc-300 text-base font-normal font-outfit">{detail}</span>
        <span className="text-zinc-400 text-sm font-normal font-outfit">{date}</span>
      </div>
    </div>
  )
}

function Desktop_Formacoes() {
  const { t } = useTranslation()
  const items = [
    ["santaMaria", logoSantaMaria], ["puc", logoPuc],
    ["tfla", logoTfla], ["cultura", logoCultura], ["aws", logoAws],
  ].map(([id, logo]) => ({
    logo, name: t(`education.items.${id}.name`),
    detail: t(`education.items.${id}.detail`), date: t(`education.items.${id}.date`),
  }))
  const academicItems = items.slice(0, 4)
  const certificationItems = items.slice(4)

  return (
    <section className="w-full">
      <div>

        {/* Content */}
        <div className="px-8 py-8 flex flex-col gap-6">
          {/* Header */}
          <div className="flex flex-col gap-1">
            <h1 className="text-zinc-100 text-2xl font-bold font-poppins">{t("education.title")}</h1>
            <p className="text-zinc-400 text-base font-medium font-poppins">{t("education.subtitle")}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <OpenDetailButton detail="courses">{t("windows.actions.courses")}</OpenDetailButton>
            <OpenDetailButton detail="languages">{t("windows.actions.languages")}</OpenDetailButton>
          </div>

          {/* Academic list */}
          <div className="flex flex-col gap-5">
            {academicItems.map((item) => (
              <FormacaoCard key={item.name} {...item} />
            ))}
          </div>

          {/* Separator */}
          <div className="h-px bg-zinc-800/80" />

          {/* Certifications */}
          <div className="flex flex-col gap-5">
            {certificationItems.map((item) => (
              <FormacaoCard key={item.name} {...item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Desktop_Formacoes
