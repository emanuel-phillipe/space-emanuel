import { type ReactNode } from "react"
import { Link } from "@tanstack/react-router"

interface IMobile_MenuButtonProps {
  label: string
  icon: ReactNode
  path: string
  isActive: boolean
}

function Mobile_MenuButton({ icon, path, isActive, label }: IMobile_MenuButtonProps) {
  return (
    <li>
      <Link
        to={path}
        aria-label={label}
        title={label}
        className={`p-1.5 sm:p-2.5 rounded-full flex items-center justify-center transition-colors ${
          isActive ? "bg-zinc-800 text-violet-400" : "text-zinc-400 hover:text-zinc-100"
        }`}
      >
        {icon}
      </Link>
    </li>
  )
}

export default Mobile_MenuButton