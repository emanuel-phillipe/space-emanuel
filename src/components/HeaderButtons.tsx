interface HeaderButtonsProps {
  screen_desc: string
}

function HeaderButtons({screen_desc}: HeaderButtonsProps) {
  return (
    <div className="flex items-center justify-between px-8 py-4 border-b border-zinc-800/80">
        <div className="flex gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500/80" />
          <span className="w-3 h-3 rounded-full bg-amber-500/80" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
        </div>
        <span className="text-zinc-400 text-sm font-medium font-poppins">{screen_desc}</span>
    </div>
  )
}

export default HeaderButtons