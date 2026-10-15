import { type ReactNode } from 'react'

interface IMobile_SecondaryButtonProps {
  icon: ReactNode
  text: string
  onClick?: () => void
  isActive?: boolean
}

function Mobile_SecondaryButton({ icon, text, onClick, isActive }: IMobile_SecondaryButtonProps) {
  return (
    <li>
    <button
      type="button"
      aria-pressed={!!isActive}
      onClick={onClick}
      className={`flex w-max items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-medium cursor-pointer transition-all ${
        isActive
          ? "border-violet-500 bg-zinc-900 text-violet-400"
          : "border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-zinc-100"
      }`}
    >
      {icon}
      <span className="font-semibold text-[0.85rem]">{text}</span>
    </button>
    </li>
  )
}

export default Mobile_SecondaryButton