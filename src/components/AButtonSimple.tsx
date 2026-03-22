import type { ReactNode } from "react"

interface AbuttonSimpleProps {
  icon: ReactNode,
  link: string,
}

function AButtonSimple({icon, link}:AbuttonSimpleProps) {
  return (
    <button className="cursor-pointer hover:text-violet-400 transition-all"><a rel="noopener noreferrer" target="_blank" href={link}>{icon}</a></button>
  )
}

export default AButtonSimple