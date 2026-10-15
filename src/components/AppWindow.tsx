import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, type KeyboardEvent, type PointerEvent, type ReactNode } from "react"
import { createPortal } from "react-dom"
import { motion, useIsPresent, useMotionValue, useReducedMotion } from "motion/react"
import { useTranslation } from "react-i18next"
import { ArrowsOutSimpleIcon, ArrowCounterClockwiseIcon, MinusIcon, XIcon } from "@phosphor-icons/react"
import { useWindowManager } from "../context/WindowManagerContext"
import { clampWindowPosition, MOBILE_DOCK_SPACE, WINDOW_MARGIN } from "../lib/windowGeometry"

function workspaceHeight() {
  return window.innerHeight - (window.innerWidth < 768 ? MOBILE_DOCK_SPACE : 0)
}

interface AppWindowProps {
  id: string
  title: string
  children: ReactNode
  onClose: () => void
  width?: number
  primary?: boolean
}

export default function AppWindow({ id, title, children, onClose, width = 520, primary = false }: AppWindowProps) {
  const { t } = useTranslation()
  const { order, focusWindow, releaseWindow } = useWindowManager()
  const reducedMotion = useReducedMotion()
  const isPresent = useIsPresent()
  const [collapsed, setCollapsed] = useState(false)
  const [maximized, setMaximized] = useState(false)
  const frame = useRef<HTMLDivElement>(null)
  const handle = useRef<HTMLDivElement>(null)
  const drag = useRef<{ pointerId: number; startX: number; startY: number; x: number; y: number } | null>(null)
  const restorePosition = useRef({ x: 0, y: 0 })
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const hintId = useId()
  const active = order.at(-1) === id

  const place = useCallback((nextX: number, nextY: number) => {
    if (!frame.current) return
    const position = clampWindowPosition(
      { x: nextX, y: nextY },
      { width: frame.current.offsetWidth, height: frame.current.offsetHeight },
      { width: window.innerWidth, height: workspaceHeight() },
    )
    x.set(position.x)
    y.set(position.y)
  }, [x, y])

  const center = useCallback(() => {
    if (!frame.current) return
    place((window.innerWidth - frame.current.offsetWidth) / 2, (workspaceHeight() - frame.current.offsetHeight) / 2)
  }, [place])

  useLayoutEffect(() => {
    const element = frame.current
    if (!element) return
    const offset = primary ? 0 : (order.length % 4) * 26
    place(primary && window.innerWidth >= 768 ? window.innerWidth - element.offsetWidth - 72 : (window.innerWidth - element.offsetWidth) / 2 + offset,
      (workspaceHeight() - element.offsetHeight) / 2 + offset)
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    focusWindow(id)
    handle.current?.focus({ preventScroll: true })
    return () => {
      releaseWindow(id)
      // Do not steal focus from another window the visitor has already selected.
      if (element.contains(document.activeElement) || document.activeElement === document.body) {
        if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true })
      }
    }
    // The initial position belongs to this window instance; later focus changes must not reset it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  useEffect(() => {
    const element = frame.current
    if (!element) return
    const constrain = () => place(maximized ? WINDOW_MARGIN : x.get(), maximized ? WINDOW_MARGIN : y.get())
    const observer = new ResizeObserver(constrain)
    observer.observe(element)
    window.addEventListener("resize", constrain)
    window.visualViewport?.addEventListener("resize", constrain)
    return () => {
      observer.disconnect()
      window.removeEventListener("resize", constrain)
      window.visualViewport?.removeEventListener("resize", constrain)
    }
  }, [maximized, place, x, y])

  useEffect(() => {
    if (!active || !isPresent) return
    const escape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape" && !event.defaultPrevented) {
        event.preventDefault()
        onClose()
      }
    }
    window.addEventListener("keydown", escape)
    return () => window.removeEventListener("keydown", escape)
  }, [active, isPresent, onClose])

  const toggleMaximize = () => {
    if (maximized) {
      setMaximized(false)
      // ResizeObserver reclamps the saved position after the normal dimensions return.
      x.set(restorePosition.current.x)
      y.set(restorePosition.current.y)
    } else {
      restorePosition.current = { x: x.get(), y: y.get() }
      setCollapsed(false)
      setMaximized(true)
      x.set(WINDOW_MARGIN)
      y.set(WINDOW_MARGIN)
    }
  }

  const startDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || maximized || !isPresent || (event.target as HTMLElement).closest("button, a, input")) return
    event.preventDefault()
    event.currentTarget.focus({ preventScroll: true })
    event.currentTarget.setPointerCapture(event.pointerId)
    drag.current = { pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, x: x.get(), y: y.get() }
    event.currentTarget.dataset.dragging = "true"
  }
  const moveDrag = (event: PointerEvent<HTMLDivElement>) => {
    const current = drag.current
    if (!current || current.pointerId !== event.pointerId) return
    place(current.x + event.clientX - current.startX, current.y + event.clientY - current.startY)
  }
  const endDrag = () => {
    drag.current = null
    if (handle.current) delete handle.current.dataset.dragging
  }
  const moveWithKeyboard = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget || maximized) return
    const delta = event.shiftKey ? 48 : 16
    const offsets: Record<string, [number, number]> = { ArrowLeft: [-delta, 0], ArrowRight: [delta, 0], ArrowUp: [0, -delta], ArrowDown: [0, delta] }
    if (event.key === "Home") { event.preventDefault(); center() }
    if (offsets[event.key]) {
      event.preventDefault()
      place(x.get() + offsets[event.key][0], y.get() + offsets[event.key][1])
    }
  }

  return createPortal(
    <motion.div
      ref={frame}
      className={`app-window-position ${primary ? "app-window-primary" : ""} ${maximized ? "app-window-maximized" : ""}`}
      style={{ x, y, width, zIndex: 50 + Math.max(0, order.indexOf(id)), pointerEvents: isPresent ? "auto" : "none" }}
      onPointerDownCapture={() => focusWindow(id)}
      onFocusCapture={() => focusWindow(id)}
      data-window-id={id}
      inert={!isPresent}
    >
      <motion.section
        role="dialog"
        aria-label={title}
        aria-modal={false}
        className={`app-window ${active ? "app-window-active" : ""}`}
        initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.92, y: reducedMotion ? 0 : 24, filter: reducedMotion ? "none" : "blur(5px)" }}
        animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, scale: reducedMotion ? 1 : 0.94, y: reducedMotion ? 0 : 18, filter: reducedMotion ? "none" : "blur(4px)", transition: { duration: reducedMotion ? 0 : 0.18, ease: "easeIn" } }}
        transition={{ type: "spring", stiffness: 330, damping: 29, mass: 0.8, opacity: { duration: reducedMotion ? 0 : 0.18 }, filter: { duration: reducedMotion ? 0 : 0.22 } }}
      >
        <div
          ref={handle}
          className="app-window-handle"
          tabIndex={0}
          aria-label={t("windows.move", { title })}
          aria-describedby={hintId}
          title={t("windows.moveHint")}
          onPointerDown={startDrag}
          onPointerMove={moveDrag}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onLostPointerCapture={endDrag}
          onKeyDown={moveWithKeyboard}
          onDoubleClick={(event) => { if (!(event.target as HTMLElement).closest("button")) toggleMaximize() }}
        >
          <div className="app-window-controls">
            <button type="button" className="window-dot window-dot-close" aria-label={t("windows.close", { title })} title={t("common.close")} onClick={onClose}><XIcon size={10} weight="bold" /></button>
            <button type="button" className="window-dot window-dot-minimize" aria-label={t(collapsed ? "windows.expand" : "windows.minimize")} title={t(collapsed ? "windows.expand" : "windows.minimize")} aria-expanded={!collapsed} onClick={() => { setMaximized(false); setCollapsed(!collapsed) }}><MinusIcon size={10} weight="bold" /></button>
            <button type="button" className="window-dot window-dot-maximize" aria-label={t(maximized ? "windows.restore" : "windows.maximize")} title={t(maximized ? "windows.restore" : "windows.maximize")} onClick={toggleMaximize}>{maximized ? <ArrowCounterClockwiseIcon size={10} weight="bold" /> : <ArrowsOutSimpleIcon size={10} weight="bold" />}</button>
          </div>
          <span className="app-window-title">{title}</span>
          <span className="app-window-grip" aria-hidden="true">⠿</span>
          <span id={hintId} className="sr-only">{t("windows.moveHint")}</span>
        </div>
        <div className="app-window-content" hidden={collapsed} inert={!isPresent}>{children}</div>
      </motion.section>
    </motion.div>,
    document.body,
  )
}
