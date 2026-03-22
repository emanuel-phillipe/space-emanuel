import { type ReactNode } from 'react'

interface IDesktop_SecondaryButtonProps{
  icon: ReactNode
  text: string
}

function Desktop_SecondaryButton({icon, text}:IDesktop_SecondaryButtonProps) {
  return (
    <li className="flex items-center gap-2 px-5 py-2 rounded-full border border-zinc-800 text-zinc-600 hover:border-zinc-400 cursor-pointer hover:text-zinc-300 transition-all">
      {icon}
      <span className="font-semibold text-[0.9rem]">{text}</span>
    </li>
  )
}

export default Desktop_SecondaryButton