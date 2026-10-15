import { useRouterState } from "@tanstack/react-router"
import { useTranslation } from "react-i18next"
import {
  UserIcon,
  InfoIcon,
  GraduationCapIcon,
  RocketLaunchIcon,
  ReadCvLogoIcon,
  TerminalWindowIcon,
  BirdIcon,
  AddressBookIcon
} from "@phosphor-icons/react"
import Desktop_LeftMenuButton from "../components/Desktop_LeftMenuButton"
import Desktop_SecondaryButton from "../components/Desktop_SecondaryButton"
import LanguageSwitcher from "../components/LanguageSwitcher"
import { useModal } from "../context/useModal"

function Desktop_Navigation() {
  const { t } = useTranslation()
  const routerState = useRouterState()
  const currentPath = routerState.location.pathname
  const { isTerminalOpen, toggleTerminal, isJadeOpen, toggleJade } = useModal()

  const leftMenuItems = [
    { icon: <UserIcon size={26} />, name: t("nav.about"), path: "/sobre-mim" },
    { icon: <InfoIcon size={26} />, name: t("nav.info"), path: "/informacoes" },
    { icon: <GraduationCapIcon size={26} />, name: t("nav.education"), path: "/formacoes" },
    { icon: <RocketLaunchIcon size={26} />, name: t("nav.experience"), path: "/experiencia" },
    { icon: <ReadCvLogoIcon size={26} />, name: t("nav.curriculum"), path: "/curriculo" },
    { icon: <AddressBookIcon size={26} />, name: t("nav.contact"), path: "/contato" },
  ]

  return (
    <div className="flex flex-col h-full justify-between select-none">
      {/* Top Status */}
      <div className="pt-2">
        <p className="text-zinc-400 font-outfit text-base tracking-wide">
          <span className="font-bold text-zinc-300">{t("common.statusLabel")}</span> &nbsp; {t("common.statusText")}
        </p>
      </div>

      {/* Main Navigation Icons */}
      <div>
        <ul className="flex flex-col gap-4 w-max">
          {leftMenuItems.map((item, index) => (
            <Desktop_LeftMenuButton
              key={index}
              text={item.name}
              icon={item.icon}
              path={item.path}
              isActive={currentPath === item.path}
            />
          ))}
        </ul>
      </div>

      {/* Bottom Controls (Terminal / JadeAI / Language) */}
      <div className="pb-2 flex flex-col gap-3.5">
        <ul className="w-max flex gap-3.5">
          <Desktop_SecondaryButton
            icon={<TerminalWindowIcon size={20} />}
            text={t("nav.terminal")}
            onClick={toggleTerminal}
            isActive={isTerminalOpen}
          />
          <Desktop_SecondaryButton
            icon={<BirdIcon size={20} />}
            text={t("nav.jade")}
            onClick={toggleJade}
            isActive={isJadeOpen}
          />
        </ul>

        {/* Lateral Menu Language Switcher */}
        <LanguageSwitcher variant="desktop" />
      </div>
    </div>
  )
}

export default Desktop_Navigation