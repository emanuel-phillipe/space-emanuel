import { type ReactNode } from 'react'

interface ILeftMenuFooterIconProps{
  icon: ReactNode
  text: string
}

function LeftMenuFooterIcon({icon, text}:ILeftMenuFooterIconProps) {
  return (
    <li className="flex items-center gap-2 px-5 py-2 rounded-full border border-zinc-800 text-zinc-600 hover:border-zinc-400 cursor-pointer hover:text-zinc-300 transition-all">
      {icon}
      <span className="font-semibold text-[0.9rem]">{text}</span>
    </li>
  )
}

export default LeftMenuFooterIcon