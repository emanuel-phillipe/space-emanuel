import { AnimatePresence } from "motion/react"
import { useTranslation } from "react-i18next"
import { CodeIcon, GlobeHemisphereWestIcon, CertificateIcon, BriefcaseIcon, ReadCvLogoIcon, AtIcon, WhatsappLogoIcon } from "@phosphor-icons/react"
import AppWindow from "../components/AppWindow"
import OpenDetailButton from "../components/OpenDetailButton"
import { useWindowManager, type DetailWindowId } from "../context/WindowManagerContext"
import cvPdf from "../assets/Curriculo_Emanuel_Carvalho.pdf"

const skills = [
  { id: "languages", items: ["C#", "Python", "JavaScript", "TypeScript", "SQL"] },
  { id: "web", items: ["ASP.NET Core", "Node.js", "ReactJS"] },
  { id: "cloud", items: ["AWS", "Azure DevOps", "Docker"] },
  { id: "data", items: ["Datadog", "Power BI"] },
] as const

const icons = { skills: CodeIcon, courses: CertificateIcon, languages: GlobeHemisphereWestIcon, localiza: BriefcaseIcon, grupoFacil: BriefcaseIcon, summary: ReadCvLogoIcon, channels: AtIcon }

function DetailContent({ id }: { id: DetailWindowId }) {
  const { t } = useTranslation()
  if (id === "skills") return (
    <div className="detail-groups">
      {skills.map((group) => <div className="detail-panel" key={group.id}><h3>{t(`resume.skills.${group.id}`)}</h3><div className="skill-tags">{group.items.map((item) => <span key={item}>{item}</span>)}</div></div>)}
      <div className="detail-panel"><h3>{t("resume.skills.operations")}</h3><div className="skill-tags">{(t("resume.skills.processes", { returnObjects: true }) as string[]).map((item) => <span key={item}>{item}</span>)}</div></div>
    </div>
  )
  if (id === "courses") return (
    <div className="detail-timeline">{(t("resume.courses", { returnObjects: true }) as { title: string; institution: string; date: string }[]).map((course) => (
      <article key={course.title}><span className="detail-kicker">{course.date}</span><h3>{course.title}</h3><p>{course.institution}</p></article>
    ))}</div>
  )
  if (id === "languages") return (
    <div className="detail-groups">
      <div className="detail-panel"><span className="detail-kicker">{t("resume.languages.native")}</span><h3>{t("common.pt")}</h3><p>{t("resume.languages.portuguese")}</p></div>
      <div className="detail-panel"><span className="detail-kicker">C1–C2</span><h3>{t("common.en")}</h3><p>{t("resume.languages.english")}</p><span className="detail-footnote">TFLA Idiomas · Cultura Inglesa</span></div>
    </div>
  )
  if (id === "localiza" || id === "grupoFacil") {
    const roles = t(`resume.experience.${id}`, { returnObjects: true }) as { role: string; period: string; points: string[] }[]
    return <div className="detail-timeline">{roles.map((role) => <article key={role.role}><span className="detail-kicker">{role.period}</span><h3>{role.role}</h3><ul>{role.points.map((point) => <li key={point}>{point}</li>)}</ul></article>)}<OpenDetailButton detail="skills">{t("windows.actions.skills")}</OpenDetailButton></div>
  }
  if (id === "channels") return <div className="detail-groups"><a className="detail-channel" href="mailto:contato@emanuelcarvalho.com.br"><AtIcon size={28} /><span><strong>{t("info.emailLabel")}</strong>contato@emanuelcarvalho.com.br</span></a><a className="detail-channel" href="https://wa.me/5531982205685" target="_blank" rel="noreferrer"><WhatsappLogoIcon size={28} /><span><strong>WhatsApp</strong>+55 (31) 9 8220-5685</span></a><p className="detail-footnote">{t("windows.channelHint")}</p></div>
  return <div className="detail-groups"><div className="detail-panel"><span className="detail-kicker">Localiza&Co</span><h3>{t("resume.summaryRole")}</h3><p>{t("resume.summaryText")}</p></div><div className="detail-panel"><span className="detail-kicker">PUC Minas</span><h3>{t("education.items.puc.detail")}</h3><p>{t("resume.graduation")}</p></div><div className="flex flex-wrap gap-2"><OpenDetailButton detail="skills">{t("windows.actions.skills")}</OpenDetailButton><OpenDetailButton detail="courses">{t("windows.actions.courses")}</OpenDetailButton></div></div>
}

export default function SecondaryWindows() {
  const { details, closeDetail } = useWindowManager()
  const { t } = useTranslation()
  return (
    <AnimatePresence>
      {details.map((id) => {
        const Icon = icons[id]
        return <AppWindow key={id} id={id} title={t(`windows.titles.${id}`)} onClose={() => closeDetail(id)} width={id === "skills" ? 560 : 500}>
          <div className="detail-content">
            <header className="detail-heading"><span className="detail-heading-icon"><Icon size={26} /></span><div><span className="detail-kicker">{t("windows.companion")}</span><h2>{t(`windows.titles.${id}`)}</h2></div></header>
            <DetailContent id={id} />
            {id !== "channels" && <a className="detail-source" href={cvPdf} target="_blank" rel="noreferrer">{t("windows.source")} <ReadCvLogoIcon size={16} /></a>}
          </div>
        </AppWindow>
      })}
    </AnimatePresence>
  )
}
