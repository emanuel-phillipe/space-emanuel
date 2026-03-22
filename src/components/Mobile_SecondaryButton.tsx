import { type ReactNode } from 'react'

interface IMobile_SecondaryButtonProps{
  icon: ReactNode
  text: string
}

function Mobile_SecondaryButton({icon, text}:IMobile_SecondaryButtonProps) {
  return (
    <li className="flex w-max items-center gap-2 px-5 py-2 rounded-full border-zinc-800 text-zinc-300 hover:border-zinc-400 cursor-pointer hover:text-violet-400 transition-all">
      {icon}
      <span className="font-semibold text-[0.9rem]">{text}</span>
    </li>
  )
}

export default Mobile_SecondaryButton