import type { ReactNode } from "react"

interface Desktop_IconButtonProps {
  icon: ReactNode,
  link: string,
}

function Desktop_IconButton({icon, link}:Desktop_IconButtonProps) {
  return (
    <button className="cursor-pointer hover:text-violet-400 transition-all"><a rel="noopener noreferrer" target="_blank" href={link}>{icon}</a></button>
  )
}

export default Desktop_IconButton