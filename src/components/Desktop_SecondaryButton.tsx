import { type ReactNode } from 'react'

interface IDesktop_SecondaryButtonProps {
  icon: ReactNode
  text: string
  onClick?: () => void
  isActive?: boolean
}

function Desktop_SecondaryButton({ icon, text, onClick, isActive }: IDesktop_SecondaryButtonProps) {
  return (
    <li>
    <button
      type="button"
      aria-pressed={!!isActive}
      onClick={onClick}
      className={`flex items-center gap-2.5 px-6 py-2.5 rounded-full border cursor-pointer transition-all ${
        isActive
          ? "border-violet-500/80 bg-zinc-900 text-violet-400 ring-1 ring-violet-500/30"
          : "border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-zinc-100"
      }`}
    >
      {icon}
      <span className="font-semibold text-base font-poppins">{text}</span>
    </button>
    </li>
  )
}

export default Desktop_SecondaryButton