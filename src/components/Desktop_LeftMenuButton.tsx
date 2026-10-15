import { useState, type ReactNode } from "react"
import { Link } from "@tanstack/react-router"

interface IDesktop_LeftMenuButtonProps {
  icon: ReactNode
  text: string
  path: string
  isActive: boolean
}

function Desktop_LeftMenuButton({ icon, text, path, isActive }: IDesktop_LeftMenuButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <li>
      <Link
        to={path}
        aria-label={text}
        title={text}
        className="cursor-pointer items-center flex gap-4 group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span
          className={`p-3 rounded-full transition-all ${
            isActive
              ? "bg-zinc-900 text-violet-400 ring-1 ring-violet-500/40"
              : "text-zinc-400 group-hover:bg-zinc-900 group-hover:text-zinc-100"
          }`}
        >
          {icon}
        </span>
        {isHovered && (
          <span className="text-zinc-100 font-semibold text-base font-poppins motion-preset-slide-right whitespace-nowrap">
            {text}
          </span>
        )}
      </Link>
    </li>
  )
}

export default Desktop_LeftMenuButton