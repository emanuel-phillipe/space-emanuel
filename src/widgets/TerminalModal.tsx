import { AnimatePresence } from "motion/react"
import AppWindow from "../components/AppWindow"
import { useTranslation } from "react-i18next"
import { useState, useRef, useEffect } from "react"
import { useNavigate } from "@tanstack/react-router"
import { useModal } from "../context/useModal"

export function TerminalModal() {
  const { t } = useTranslation()
  const { isTerminalOpen, closeTerminal } = useModal()
  const [command, setCommand] = useState("")
  const [output, setOutput] = useState<Array<{ text: string } | { key: string; values?: Record<string, string> }>>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (isTerminalOpen) {
      inputRef.current?.focus()
    }
  }, [isTerminalOpen])


  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = command.trim()
    if (!trimmed) return

    const parts = trimmed.split(" ")
    const cmd = parts[0].toLowerCase()
    const arg = parts.slice(1).join(" ").toLowerCase()

    if (cmd === "clear") {
      setOutput([])
      setCommand("")
      return
    }

    if (cmd === "open") {
      if (arg.includes("sobre") || arg.includes("about")) {
        navigate({ to: "/sobre-mim" })
        closeTerminal()
      } else if (arg.includes("info")) {
        navigate({ to: "/informacoes" })
        closeTerminal()
      } else if (arg.includes("forma") || arg.includes("academic") || arg.includes("education")) {
        navigate({ to: "/formacoes" })
        closeTerminal()
      } else if (arg.includes("exp") || arg.includes("portf")) {
        navigate({ to: "/experiencia" })
        closeTerminal()
      } else if (arg.includes("curr") || arg.includes("cv")) {
        navigate({ to: "/curriculo" })
        closeTerminal()
      } else if (arg.includes("contat") || arg.includes("contact")) {
        navigate({ to: "/contato" })
        closeTerminal()
      } else if (arg.includes("home")) {
        navigate({ to: "/" })
        closeTerminal()
      } else {
        setOutput((prev) => [...prev, { text: `$ ${trimmed}` }, { key: "terminal.appNotFound", values: { arg } }])
      }
      setCommand("")
      return
    }

    if (cmd === "self") {
      setOutput((prev) => [
        ...prev,
        { text: `$ ${trimmed}` },
        { key: "terminal.selfInfo" }
      ])
      setCommand("")
      return
    }

    if (cmd === "help") {
      setOutput((prev) => [
        ...prev,
        { text: `$ ${trimmed}` },
        { key: "terminal.helpListTitle" },
        { key: "terminal.helpListOpen" },
        { key: "terminal.helpListSelf" },
        { key: "terminal.helpListClear" }
      ])
      setCommand("")
      return
    }

    setOutput((prev) => [...prev, { text: `$ ${trimmed}` }, { key: "terminal.cmdNotFound", values: { cmd } }])
    setCommand("")
  }

  return (
    <AnimatePresence>
      {isTerminalOpen && <AppWindow id="TerminalModal" title={t("terminal.title")} onClose={closeTerminal} width={460}>
      <div className="p-6">
      <div className="font-outfit text-zinc-300 text-base leading-relaxed mb-4">
        <p className="font-semibold text-zinc-100">{t("terminal.helpTitle")}</p>
        <p>{t("terminal.helpOpen")}</p>
        <p>{t("terminal.helpSelf")}</p>
      </div>

      {output.length > 0 && (
        <div className="max-h-40 overflow-y-auto mb-3 text-sm font-mono space-y-1.5 text-zinc-300 bg-zinc-950/60 p-2.5 rounded-lg border border-zinc-800/60">
          {output.map((line, idx) => (
            <div key={idx}>{"text" in line ? line.text : t(line.key, line.values)}</div>
          ))}
        </div>
      )}

      <form onSubmit={handleCommand} className="flex items-center gap-2 pt-3 border-t border-zinc-800">
        <span className="text-violet-400 font-poppins text-sm font-semibold whitespace-nowrap">
          visitor@ep-space: $
        </span>
        <input
          ref={inputRef}
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          placeholder={t("terminal.placeholder")}
          aria-label={t("terminal.placeholder")}
          className="min-w-0 bg-transparent text-violet-300 font-poppins text-sm focus:outline-none flex-1 caret-violet-400"
        />
      </form>
      </div>
      </AppWindow>}
    </AnimatePresence>
  )
}
