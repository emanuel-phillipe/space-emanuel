import { ArrowSquareOutIcon } from "@phosphor-icons/react"
import { useWindowManager, type DetailWindowId } from "../context/WindowManagerContext"

export default function OpenDetailButton({ detail, children }: { detail: DetailWindowId; children: React.ReactNode }) {
  const { openDetail, details } = useWindowManager()
  return (
    <button type="button" onClick={() => openDetail(detail)} className="open-detail-button" aria-haspopup="dialog" aria-expanded={details.includes(detail)}>
      <ArrowSquareOutIcon size={18} />
      {children}
    </button>
  )
}
