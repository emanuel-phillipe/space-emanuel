import { useTranslation } from "react-i18next"
import { GithubLogoIcon, InstagramLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react"
import Desktop_IconButton from "../components/Desktop_IconButton"

function Mobile_Welcome() {
  const { t } = useTranslation()

  return (
    <section className="text-left">
      <div>  
        <h2 className="text-[1.3rem] font-medium">{t("welcome.greeting")}</h2>
        <h1 className="text-[1.8rem] font-bold text-violet-400 motion-preset-typewriter-[50]">{t("welcome.name")}</h1>
      </div>
      <div className="mt-8">
        <p className="text-zinc-300 text-[1rem]">{t("welcome.description")}</p>
        <div className="mt-8 grid grid-rows-2 grid-cols-2 justify-start gap-4">
          <span className="py-2 px-5 rounded-full bg-zinc-800 text-zinc-300 hover:motion-preset-pulse font-semibold w-full text-center">
            {t("welcome.pillars.innovation")}
          </span>
          <span className="py-2 px-5 rounded-full bg-zinc-800 text-zinc-300 hover:motion-preset-pulse font-semibold w-full text-center">
            {t("welcome.pillars.minimalism")}
          </span>
          <span className="py-2 px-5 col-span-2 row-start-2 rounded-full bg-zinc-800 text-zinc-300 hover:motion-preset-pulse font-semibold w-full text-center">
            {t("welcome.pillars.creativity")}
          </span>
        </div>
      </div>
      <div className="mt-12 mb-36 flex justify-start gap-6 text-zinc-400">
        <Desktop_IconButton label="GitHub" icon={<GithubLogoIcon size={30}/>} link="https://github.com/emanuel-phillipe"/>
        <Desktop_IconButton label="Instagram" icon={<InstagramLogoIcon size={30}/>} link="https://www.instagram.com/emanuel.phillipe"/>
        <Desktop_IconButton label="LinkedIn" icon={<LinkedinLogoIcon size={30}/>} link="https://www.linkedin.com/in/emanuel-phillipe/"/>
      </div>
    </section>
  )
}


export default Mobile_Welcome