import { useState, type ReactNode } from "react"
import { ModalContext } from "./ModalContextDefinition"

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false)
  const [isJadeOpen, setIsJadeOpen] = useState(false)

  const openTerminal = () => {
    setIsTerminalOpen(true)
    setIsJadeOpen(false)
  }
  const closeTerminal = () => setIsTerminalOpen(false)
  const toggleTerminal = () => {
    setIsTerminalOpen((prev) => !prev)
    setIsJadeOpen(false)
  }

  const openJade = () => {
    setIsJadeOpen(true)
    setIsTerminalOpen(false)
  }
  const closeJade = () => setIsJadeOpen(false)
  const toggleJade = () => {
    setIsJadeOpen((prev) => !prev)
    setIsTerminalOpen(false)
  }

  return (
    <ModalContext.Provider
      value={{
        isTerminalOpen,
        isJadeOpen,
        openTerminal,
        closeTerminal,
        toggleTerminal,
        openJade,
        closeJade,
        toggleJade,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}
