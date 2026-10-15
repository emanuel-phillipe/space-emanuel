import { useRouterState } from "@tanstack/react-router"
import { useTranslation } from "react-i18next"
import {
  BirdIcon,
  GraduationCapIcon,
  InfoIcon,
  HouseIcon,
  AddressBookIcon,
  ReadCvLogoIcon,
  RocketLaunchIcon,
  TerminalWindowIcon,
  UserIcon
} from "@phosphor-icons/react"
import Mobile_MenuButton from "../components/Mobile_MenuButton"
import Mobile_SecondaryButton from "../components/Mobile_SecondaryButton"
import LanguageSwitcher from "../components/LanguageSwitcher"
import { useModal } from "../context/useModal"

const mobileMenuItems = [
  { icon: <UserIcon size={22} />, label: "nav.about", path: "/sobre-mim" },
  { icon: <InfoIcon size={22} />, label: "nav.info", path: "/informacoes" },
  { icon: <GraduationCapIcon size={22} />, label: "nav.education", path: "/formacoes" },
  { icon: <RocketLaunchIcon size={22} />, label: "nav.experience", path: "/experiencia" },
  { icon: <ReadCvLogoIcon size={22} />, label: "nav.curriculum", path: "/curriculo" },
  { icon: <AddressBookIcon size={22} />, label: "nav.contact", path: "/contato" },
  { icon: <HouseIcon size={22} />, label: "nav.backToHome", path: "/" },
]

function Mobile_Navigation() {
  const { t } = useTranslation()
  const routerState = useRouterState()
  const currentPath = routerState.location.pathname
  const { isTerminalOpen, toggleTerminal, isJadeOpen, toggleJade } = useModal()

  return (
    <div className="flex flex-col items-center gap-3 py-2 px-3 w-full max-w-sm backdrop-blur-lg bg-zinc-950/80 rounded-3xl border border-zinc-800/80 shadow-2xl">
      {/* Secondary Controls & Language */}
      <div className="flex items-center gap-2.5 justify-center flex-wrap">
        <ul className="flex gap-2 justify-center">
          <Mobile_SecondaryButton
            icon={<TerminalWindowIcon size={18} />}
            text={t("nav.terminal")}
            onClick={toggleTerminal}
            isActive={isTerminalOpen}
          />
          <Mobile_SecondaryButton
            icon={<BirdIcon size={18} />}
            text={t("nav.jade")}
            onClick={toggleJade}
            isActive={isJadeOpen}
          />
        </ul>
        <LanguageSwitcher variant="mobile" />
      </div>


      {/* Main Bottom Bar */}
      <ul className="flex items-center justify-between gap-0 w-full px-1 py-1 bg-zinc-900/90 border border-zinc-800/80 rounded-full shadow-inner">
        {mobileMenuItems.map((item, index) => (
          <Mobile_MenuButton
            key={index}
            icon={item.icon}
            label={t(item.label)}
            path={item.path}
            isActive={currentPath === item.path}
          />
        ))}
      </ul>
    </div>
  )
}

export default Mobile_Navigation
