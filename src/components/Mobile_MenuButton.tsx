import type { ReactNode } from "react"

interface IMobile_MenuButtonProps{
  icon: ReactNode,
  currentWindow: number,
  id: number,
  whenClicked: (id: number) => void
}


function Mobile_MenuButton({icon, currentWindow, id, whenClicked}:IMobile_MenuButtonProps) {
  return (
    <li onClick={() => {whenClicked(id)}} className="items-center flex gap-4">
      <span className={`p-2 rounded-full transition-colors ${currentWindow == id ? "bg-zinc-800 text-violet-400" : "text-zinc-300"}`}>{icon}</span>
    </li>
  )
}

export default Mobile_MenuButton