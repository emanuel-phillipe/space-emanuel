import { useTranslation } from "react-i18next"
import { useState, type FormEvent } from "react"
import {
  SmileyBlankIcon,
  AtIcon,
  ChatCircleTextIcon,
  CircleNotchIcon,
  CheckCircleIcon,
  WarningCircleIcon,
  PaperPlaneTiltIcon
} from "@phosphor-icons/react"
import emailjs from "@emailjs/browser"
import OpenDetailButton from "../components/OpenDetailButton"

const SERVICE_ID = import.meta.env.EMAILJS_SERVICE || import.meta.env.VITE_EMAILJS_SERVICE || ""
const TEMPLATE_ID = import.meta.env.EMAILJS_TEMPLATE || import.meta.env.VITE_EMAILJS_TEMPLATE || ""
const PUBLIC_KEY = import.meta.env.EMAILJS_PUBLIC || import.meta.env.VITE_EMAILJS_PUBLIC || ""

const RECIPIENT_EMAIL = "contato@emanuelcarvalho.com.br"

function Desktop_Contato() {
  const { t } = useTranslation()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [statusMessage, setStatusMessage] = useState("")

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const trimmedName = name.trim()
    const trimmedEmail = email.trim()
    const trimmedMessage = message.trim()

    if (!trimmedName || !trimmedMessage) {
      setStatus("error")
      setStatusMessage("contact.validationError")
      return
    }

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatus("error")
      setStatusMessage("contact.configError")
      return
    }

    setStatus("loading")
    setStatusMessage("")

    try {
      // O template do EmailJS requer o campo 'email' como endereço de destino ("To Email").
      // Enviamos RECIPIENT_EMAIL para que a mensagem chegue até você,
      // e o email do visitante em 'reply_to' para possibilitar resposta.
      const formattedMessage = trimmedEmail
        ? `${trimmedMessage}\n\n---\n${t("contact.replyEmail")}: ${trimmedEmail}`
        : trimmedMessage

      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name: trimmedName,
          from_name: trimmedName,
          user_name: trimmedName,
          msg: formattedMessage,
          email: RECIPIENT_EMAIL,
          to_email: RECIPIENT_EMAIL,
          reply_to: trimmedEmail || RECIPIENT_EMAIL,
          user_email: trimmedEmail,
        },
        PUBLIC_KEY
      )

      setStatus("success")
      setStatusMessage("contact.successMessage")
      setName("")
      setEmail("")
      setMessage("")
    } catch (error: unknown) {
      const err = error as { status?: number; text?: string; message?: string }
      console.error("Erro ao enviar email pelo EmailJS:", err.text || err.message || error)
      setStatus("error")
      setStatusMessage("contact.genericError")
    }
  }

  return (
    <section className="w-full">
      <div>

        {/* Content */}
        <div className="px-8 py-8 flex flex-col gap-7">
          {/* Header */}
          <div className="flex flex-col gap-1">
            <h1 className="text-zinc-100 text-2xl font-bold font-poppins">{t("contact.title")}</h1>
            <p className="text-zinc-400 text-base font-medium font-poppins">{t("contact.subtitle")}</p>
          </div>

          <OpenDetailButton detail="channels">{t("windows.actions.channels")}</OpenDetailButton>

          {/* Form section */}
          <div className="flex flex-col gap-4">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <label className="w-full group flex gap-4 items-center px-4 py-4 rounded-lg bg-zinc-900 border border-zinc-700/80 text-zinc-200 font-outfit focus-within:outline-none focus-within:ring-1 transition-all focus-within:ring-violet-400 focus-within:border-transparent cursor-text">
                <SmileyBlankIcon size={30} className="text-zinc-500 group-focus-within:text-violet-400 transition-all shrink-0" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t("contact.namePlaceholder")}
                  aria-label={t("contact.namePlaceholder")}
                  disabled={status === "loading"}
                  required
                  className="w-full py-1 bg-transparent outline-none font-outfit text-zinc-100 placeholder:text-zinc-500 disabled:opacity-50"
                />
              </label>

              <label className="w-full group flex gap-4 items-center px-4 py-4 rounded-lg bg-zinc-900 border border-zinc-700/80 text-zinc-200 font-outfit focus-within:outline-none focus-within:ring-1 transition-all focus-within:ring-violet-400 focus-within:border-transparent cursor-text">
                <AtIcon size={30} className="text-zinc-500 group-focus-within:text-violet-400 transition-all shrink-0" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("contact.emailPlaceholder")}
                  aria-label={t("contact.emailPlaceholder")}
                  disabled={status === "loading"}
                  className="w-full py-1 bg-transparent outline-none font-outfit text-zinc-100 placeholder:text-zinc-500 disabled:opacity-50"
                />
              </label>

              <label className="w-full group flex justify-start flex-col gap-4 items-start px-4 py-4 rounded-lg bg-zinc-900 border border-zinc-700/80 text-zinc-200 font-outfit focus-within:outline-none focus-within:ring-1 transition-all focus-within:ring-violet-400 focus-within:border-transparent cursor-text">
                <ChatCircleTextIcon size={30} className="text-zinc-500 group-focus-within:text-violet-400 transition-all shrink-0" />
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t("contact.messagePlaceholder")}
                  aria-label={t("contact.messagePlaceholder")}
                  disabled={status === "loading"}
                  required
                  className="w-full outline-none font-outfit resize-none h-32 bg-transparent text-zinc-100 placeholder:text-zinc-500 disabled:opacity-50"
                />
              </label>

              {/* Status Feedback */}
              {status === "success" && (
                <div className="flex items-center gap-3 p-4 rounded-lg bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 font-outfit text-sm">
                  <CheckCircleIcon size={24} className="text-emerald-400 shrink-0" />
                  <p>{t(statusMessage)}</p>
                </div>
              )}

              {status === "error" && (
                <div className="flex items-center gap-3 p-4 rounded-lg bg-red-950/50 border border-red-500/40 text-red-300 font-outfit text-sm">
                  <WarningCircleIcon size={24} className="text-red-400 shrink-0" />
                  <p>{t(statusMessage)}</p>
                </div>
              )}

              <span>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full flex items-center justify-center gap-2 px-4 py-4 rounded-lg bg-violet-600 text-zinc-100 text-base font-outfit font-semibold hover:bg-violet-700 disabled:opacity-60 disabled:hover:bg-violet-600 disabled:cursor-not-allowed cursor-pointer transition-colors"
                >
                  {status === "loading" ? (
                    <>
                      <CircleNotchIcon size={20} className="animate-spin" />
                      <span>{t("contact.sending")}</span>
                    </>
                  ) : (
                    <>
                      <PaperPlaneTiltIcon size={20} />
                      <span>{t("contact.submit")}</span>
                    </>
                  )}
                </button>
              </span>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Desktop_Contato
