import { Disc } from 'lucide-react'

/**
 * Neo-Brutalist Media & Telemetry Spinner for asset-heavy views
 */
export function BrutalMediaSpinner({ label = 'SYNCHRONIZING MULTIVERSE ASSETS...' }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="p-6 bg-white dark:bg-[#161B22] border-3 border-black dark:border-white brutal-shadow-md flex flex-col items-center justify-center gap-3 text-center"
    >
      <div className="relative flex items-center justify-center w-12 h-12 bg-[#FACC15] border-2 border-black brutal-shadow-sm">
        <Disc className="w-6 h-6 text-black animate-spin" />
      </div>
      <span className="font-mono text-xs font-black uppercase tracking-wider text-black dark:text-white">
        {label}
      </span>
    </div>
  )
}

/**
 * Single Neo-Brutalist Card Skeleton
 */
export function BrutalCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="bg-white dark:bg-[#161B22] border-3 border-black dark:border-white p-4 sm:p-5 brutal-shadow-md animate-pulse flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="h-5 w-24 bg-[#FACC15]/60 border border-black" />
          <div className="h-5 w-16 bg-neutral-200 dark:bg-neutral-700 border border-black" />
        </div>
        <div className="aspect-video w-full mb-4 bg-neutral-200 dark:bg-neutral-800 border-2 border-black" />
        <div className="h-5 w-4/5 bg-neutral-300 dark:bg-neutral-700 mb-2 border border-black/20" />
        <div className="h-3.5 w-full bg-neutral-200 dark:bg-neutral-800 mb-1.5" />
        <div className="h-3.5 w-2/3 bg-neutral-200 dark:bg-neutral-800 mb-4" />
      </div>
      <div className="pt-3 border-t-2 border-black/10 dark:border-neutral-800 flex items-center justify-between gap-2">
        <div className="h-4 w-20 bg-neutral-200 dark:bg-neutral-700" />
        <div className="h-8 w-28 bg-[#A3E635]/60 border-2 border-black" />
      </div>
    </div>
  )
}

/**
 * Grid of Neo-Brutalist Loading Skeletons
 */
export function BrutalGridSkeleton({ count = 6, columns = 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' }) {
  return (
    <div role="status" aria-label="Loading content grid" className={`grid ${columns} gap-6`}>
      {Array.from({ length: count }).map((_, idx) => (
        <BrutalCardSkeleton key={idx} />
      ))}
    </div>
  )
}

export default BrutalGridSkeleton
