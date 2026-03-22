import { useContext } from "react"
import { WindowContext } from "../context/WindowContext"
import { BirdIcon, GraduationCapIcon, InfoIcon, QuestionIcon, ReadCvLogoIcon, RocketLaunchIcon, TerminalWindowIcon, UserIcon } from "@phosphor-icons/react"
import Desktop_LeftMenuButton from "../components/Desktop_LeftMenuButton"
import Desktop_SecondaryButton from "../components/Desktop_SecondaryButton"

const leftMenuIcons = [
  {
    icon: <UserIcon size={30}/>,
    component: null,
    name: "Sobre Mim"
  },
  {
    icon: <InfoIcon size={30}/>,
    component: null,
    name: "Informações"
  },
  {
    icon: <GraduationCapIcon size={30}/>,
    component: null,
    name: "Formações"
  },
  {
    icon: <RocketLaunchIcon size={30}/>,
    component: null,
    name: "Portfólio"
  },
  {
    icon: <ReadCvLogoIcon size={30}/>,
    component: null,
    name: "Curriculum Vitae"
  },
  {
    icon: <QuestionIcon size={30}/>,
    component: null,
    name: "Perguntas"
  }
]

function Desktop_Navigation() {
  const windowContext = useContext(WindowContext)

  const handleLeftMenuClick = (id: number) => {
    console.log(id);
  }
    
  return (
    <div className="flex flex-col h-full justify-between">
      <div></div>
      <div>
        <ul className="flex flex-col gap-5 w-max">
          {
            leftMenuIcons.map((item, index) => {
              return (
                <Desktop_LeftMenuButton whenClicked={handleLeftMenuClick} text={item.name} icon={item.icon} id={index} key={index} currentWindow={windowContext}/>
              )
            })
          }
        </ul>
      </div>
      <div>
        <ul className="w-max flex gap-4">
          <Desktop_SecondaryButton icon={<TerminalWindowIcon size={22}/>} text="Terminal"/>
          <Desktop_SecondaryButton icon={<BirdIcon size={22}/>} text="JadeAI"/>
        </ul>
      </div>
    </div>
  )
}

export default Desktop_Navigation