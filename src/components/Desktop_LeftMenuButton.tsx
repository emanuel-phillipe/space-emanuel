import { useState, type ReactNode } from "react"

interface IDesktop_LeftMenuButtonProps{
  icon: ReactNode,
  text: string,
  currentWindow: number,
  id: number,
  whenClicked: (id: number) => void
}

function Desktop_LeftMenuButton({icon, text, currentWindow, id, whenClicked}:IDesktop_LeftMenuButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <li onClick={() => {whenClicked(id)}} className="cursor-pointer items-center flex gap-4" onMouseEnter={() => {setIsHovered(true)}} onMouseLeave={() => {setIsHovered(false)}}>
      <span className={`p-2 rounded-full text-zinc-500 hover:bg-zinc-900 transition-colors ${currentWindow == id ? "bg-zinc-900 text-violet-400" : "hover:text-zinc-100"}`}>{icon}</span>
      {isHovered && (<span className="text-zinc-100 font-medium motion-preset-slide-right">{text}</span>)}
    </li>
  )
}

export default Desktop_LeftMenuButton