import { ChevronRight, Home, RotateCcw, Compass } from 'lucide-react'

export default function Breadcrumbs({
  items = [],
  onReset,
}) {
  if (!items || items.length <= 1) return null

  return (
    <nav
      aria-label="Breadcrumb navigation"
      className="w-full bg-[#FACC15]/20 dark:bg-[#161B22] border-b-2 border-black dark:border-neutral-700 px-3 sm:px-6 lg:px-8 py-2 transition-colors"
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <ol className="flex flex-wrap items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs font-mono">
          {items.map((crumb, idx) => {
            const isLast = idx === items.length - 1
            const isFirst = idx === 0

            return (
              <li key={`${crumb.label}-${idx}`} className="flex items-center gap-1 sm:gap-1.5">
                {idx > 0 && (
                  <ChevronRight className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                )}

                {isLast || !crumb.onClick ? (
                  <span
                    aria-current={isLast ? 'page' : undefined}
                    className={`px-2 py-0.5 border border-black dark:border-neutral-600 uppercase font-black truncate max-w-[200px] sm:max-w-[320px] ${
                      isLast
                        ? 'bg-[#A3E635] text-black brutal-shadow-sm'
                        : 'bg-white dark:bg-[#0D1117] text-neutral-700 dark:text-neutral-300'
                    }`}
                  >
                    {crumb.badge && (
                      <span className="mr-1 opacity-75">[{crumb.badge}]</span>
                    )}
                    {crumb.label}
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={crumb.onClick}
                    className="px-2 py-0.5 bg-white dark:bg-[#0D1117] text-black dark:text-white border border-black dark:border-neutral-500 font-bold uppercase hover:bg-[#FACC15] hover:text-black transition-colors flex items-center gap-1"
                  >
                    {isFirst ? (
                      <Home className="w-3 h-3 shrink-0" />
                    ) : (
                      <Compass className="w-3 h-3 shrink-0" />
                    )}
                    <span className="truncate max-w-[150px] sm:max-w-[220px]">{crumb.label}</span>
                  </button>
                )}
              </li>
            )
          })}
        </ol>

        {onReset && (
          <button
            type="button"
            onClick={onReset}
            className="px-2.5 py-0.5 bg-black text-[#FACC15] dark:bg-white dark:text-black font-mono font-black text-[10px] uppercase border border-black flex items-center gap-1 hover:opacity-90"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset View</span>
          </button>
        )}
      </div>
    </nav>
  )
}
