import { useTranslation } from "react-i18next"
import profileImg from "../assets/profile.png"
import OpenDetailButton from "../components/OpenDetailButton"

function Desktop_SobreMim() {
  const { t } = useTranslation()

  const techBadges = [
    t("about.badges.sql"),
    t("about.badges.datadog"),
    t("about.badges.aspnet"),
    t("about.badges.agile"),
    t("about.badges.genai"),
    t("about.badges.agents")
  ]

  return (
    <section className="w-full">
      <div>

        {/* Content */}
        <div className="px-8 py-8 flex flex-col gap-6">
          {/* Header: profile pic + title */}
          <div className="flex items-center gap-5">
            <img
              src={profileImg}
              alt="Emanuel Phillipe"
              className="w-[72px] h-[74px] rounded-2xl object-cover object-top border border-zinc-700/80 shadow-md"
            />
            <div className="flex flex-col">
              <h1 className="text-zinc-100 text-2xl font-bold font-poppins">{t("about.title")}</h1>
              <p className="text-zinc-400 text-base font-medium font-poppins">{t("about.subtitle")}</p>
            </div>
          </div>

          {/* Bio text */}
          <div className="flex flex-col gap-4">
            <p className="text-zinc-200 text-base font-normal font-outfit leading-relaxed">
              {t("about.p1")}{" "}
              <strong className="font-semibold text-violet-300">{t("about.p1Highlight")}</strong>.
            </p>
            <p className="text-zinc-200 text-base font-normal font-outfit leading-relaxed">
              {t("about.p2")}{" "}
              <strong className="font-semibold text-violet-300">{t("about.p2Course")}</strong>
              {t("about.p2At")}{" "}
              <strong className="font-semibold text-violet-300">{t("about.p2Company")}</strong>
              {t("about.p2End")}
            </p>

            <div className="flex flex-wrap gap-2">
              <OpenDetailButton detail="skills">{t("windows.actions.skills")}</OpenDetailButton>
              <OpenDetailButton detail="languages">{t("windows.actions.languages")}</OpenDetailButton>
            </div>

            {/* Tech badges */}
            <div className="flex flex-wrap gap-2.5 my-2">
              {techBadges.map((badge) => (
                <span
                  key={badge}
                  className="px-4 py-2 rounded-full bg-[#18181b] border border-violet-800/80 text-zinc-200 text-sm font-medium font-poppins hover:border-violet-500 hover:text-white transition-all shadow-sm"
                >
                  {badge}
                </span>
              ))}
            </div>

            <p className="text-zinc-200 text-base font-normal font-outfit leading-relaxed">
              {t("about.p3")}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Desktop_SobreMim

