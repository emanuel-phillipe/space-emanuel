import type { ReactNode } from "react"

interface Desktop_IconButtonProps {
  icon: ReactNode,
  link: string,
  label: string,
}

function Desktop_IconButton({icon, link, label}:Desktop_IconButtonProps) {
  return (
    <a className="cursor-pointer hover:text-violet-400 transition-all" aria-label={label} title={label} rel="noopener noreferrer" target="_blank" href={link}>{icon}</a>
  )
}

export default Desktop_IconButton