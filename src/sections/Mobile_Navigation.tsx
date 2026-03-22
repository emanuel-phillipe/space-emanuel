import { useContext } from "react"
import { WindowContext } from "../context/WindowContext"
import { BirdIcon, GraduationCapIcon, InfoIcon, QuestionIcon, ReadCvLogoIcon, RocketLaunchIcon, TerminalWindowIcon, UserIcon } from "@phosphor-icons/react"
import Mobile_MenuButton from "../components/Mobile_MenuButton"
import Mobile_SecondaryButton from "../components/Mobile_SecondaryButton"

const leftMenuIcons = [
  {
    icon: <UserIcon size={28}/>,
    component: null,
    name: "Sobre Mim"
  },
  {
    icon: <InfoIcon size={28}/>,
    component: null,
    name: "Informações"
  },
  {
    icon: <GraduationCapIcon size={28}/>,
    component: null,
    name: "Formações"
  },
  {
    icon: <RocketLaunchIcon size={28}/>,
    component: null,
    name: "Portfólio"
  },
  {
    icon: <ReadCvLogoIcon size={28}/>,
    component: null,
    name: "Curriculum Vitae"
  },
  {
    icon: <QuestionIcon size={28}/>,
    component: null,
    name: "Perguntas"
  }
]

function Mobile_Navigation() {
  const windowContext = useContext(WindowContext)

  const handleMenuClick = (id: number) => {
    console.log(id);
  }
    
  return (
    <div className="flex flex-col gap-2 pt-2 backdrop-blur-md">
      <ul className="flex gap-4 justify-between">
        <li><Mobile_SecondaryButton icon={<TerminalWindowIcon size={22}/>} text="Terminal"/></li>
        <li><Mobile_SecondaryButton icon={<BirdIcon size={22}/>} text="JadeAI"/></li>
      </ul>
      <ul className="flex gap-4 border border-zinc-800 w-max p-2 rounded-full">
          {
            leftMenuIcons.map((item, index) => {
              return <li key={index}><Mobile_MenuButton whenClicked={handleMenuClick} icon={item.icon} id={index} currentWindow={windowContext}/></li>
            })
          }
        </ul>
    </div>
  )
}

export default Mobile_Navigation