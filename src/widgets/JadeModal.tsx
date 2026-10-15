import { AnimatePresence } from "motion/react"
import AppWindow from "../components/AppWindow"
import { useTranslation } from "react-i18next"
import { useState, useRef, useEffect } from "react"
import { PaperPlaneTiltIcon } from "@phosphor-icons/react"
import { useModal } from "../context/useModal"

interface QA {
  question: string
  answer: string
}

export function JadeModal() {
  const { t } = useTranslation()
  const FAQ_KNOWLEDGE = t("jade.qaList", { returnObjects: true }) as QA[]
  const { isJadeOpen, closeJade } = useModal()
  const [selection, setSelection] = useState<{ index: number; question?: string }>({ index: 0 })
  const currentQA = {
    question: selection.question ?? (FAQ_KNOWLEDGE[selection.index]?.question ?? ""),
    answer: selection.index < 0 ? t("jade.fallbackAnswer") : FAQ_KNOWLEDGE[selection.index].answer,
  }
  const [inputVal, setInputVal] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isJadeOpen) {
      inputRef.current?.focus()
    }
  }, [isJadeOpen])


  const handleAsk = (e: React.FormEvent) => {
    e.preventDefault()
    const q = inputVal.trim().toLowerCase()
    if (!q) return

    const normalized = q.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    let index = FAQ_KNOWLEDGE.findIndex((item) =>
      item.question.toLowerCase().includes(q)
    )
    if (index < 0) {
      const keywords = [
        ["curs", "estud", "study", "studies", "education", "college"],
        ["trabal", "empresa", "localiza", "work", "job", "company"],
        ["stack", "tecnolog", "technolog", "skill"],
        ["contato", "contact", "email", "e-mail", "whatsapp"],
      ]
      index = keywords.findIndex((words) => words.some((word) => normalized.includes(word)))
    }
    setSelection({ index, question: inputVal })
    setInputVal("")
  }

  return (
    <AnimatePresence>
      {isJadeOpen && <AppWindow id="JadeModal" title={t("jade.title")} onClose={closeJade} width={460}>
      <div className="p-6">
      {/* Question */}
      <div className="mb-2">
        <h4 className="text-zinc-300 font-bold font-outfit text-base">
          {currentQA.question}
        </h4>
      </div>

      {/* Answer */}
      <div className="mb-5">
        <p className="text-zinc-100 font-outfit text-base leading-relaxed">
          {currentQA.answer}
        </p>
      </div>

      {/* Input */}
      <form onSubmit={handleAsk} className="relative flex items-center">
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder={t("jade.placeholder")}
          aria-label={t("jade.placeholder")}
          className="w-full bg-[#18181b] text-zinc-100 text-sm font-outfit rounded-xl pl-4 pr-12 py-3.5 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-violet-500/60"
        />
        <button
          type="submit"
          aria-label={t("jade.send")}
          className="absolute right-2 p-2.5 bg-violet-400 text-zinc-950 rounded-lg hover:bg-violet-300 transition-colors cursor-pointer"
        >
          <PaperPlaneTiltIcon size={18} weight="fill" />
        </button>
      </form>
      </div>
      </AppWindow>}
    </AnimatePresence>
  )
}
