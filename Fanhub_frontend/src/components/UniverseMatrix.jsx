import { useState } from 'react'
import { 
  Tv, 
  Gamepad2, 
  Film, 
  Mic2, 
  Zap, 
  BookOpen, 
  Sparkles, 
  ShieldCheck, 
  ArrowUpRight, 
  Compass, 
  X,
  ExternalLink,
  Flame
} from 'lucide-react'


// Icon mapping dictionary
const ICON_COMPONENTS = {
  Tv,
  Gamepad2,
  Film,
  Mic2,
  Zap,
  BookOpen,
  Sparkles,
  ShieldCheck
}

export default function UniverseMatrix({ 
  universes, 
  selectedUniverse, 
  onSelectUniverse, 
  searchQuery,
  onOpenTopic 
}) {
  const [activeModalUniverse, setActiveModalUniverse] = useState(null)

  // Filter based on selected category & search query
  const filteredUniverses = universes.filter((item) => {
    const matchesFilter = selectedUniverse === 'all' || item.id === selectedUniverse
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.popularTopics && item.popularTopics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase())))
    
    return matchesFilter && (searchQuery.trim() === '' || matchesSearch)
  })

  return (
    <section id="explore" className="py-16 px-4 sm:px-6 lg:px-8 border-b-2 border-black dark:border-neutral-100 bg-[#FDFBF7] dark:bg-[#0D1117] transition-colors">

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b-2 border-black dark:border-neutral-800">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="bg-[#38BDF8] text-black font-black text-xs uppercase px-2.5 py-0.5 border-2 border-black brutal-shadow-sm">
                MULTIVERSE MATRIX
              </span>
              <span className="font-mono text-xs font-bold uppercase text-neutral-600 dark:text-neutral-400">
                8 CORE SECTORS
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-black dark:text-white">
              UNIVERSE DIRECTORY
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 font-medium text-sm sm:text-base mt-1 max-w-2xl">
              Curated by dedicated guild masters. Instant access to simulcast schedules, verified lore bibles, and fan discussions.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {selectedUniverse !== 'all' && (
              <button
                onClick={() => onSelectUniverse('all')}
                className="px-3 py-1.5 bg-neutral-200 dark:bg-neutral-800 text-black dark:text-white font-bold text-xs uppercase border-2 border-black dark:border-neutral-300 brutal-shadow-sm flex items-center gap-1.5"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset Filter</span>
              </button>
            )}
            <span className="font-mono text-xs font-bold uppercase px-3 py-1.5 bg-black text-[#A3E635] border-2 border-black">
              Showing {filteredUniverses.length} / 8 Sectors
            </span>
          </div>
        </div>

        {/* 8 Category Cards Grid */}
        {filteredUniverses.length === 0 ? (
          <div className="bg-white dark:bg-[#161B22] border-3 border-black dark:border-white p-10 text-center brutal-shadow-md">
            <Compass className="w-12 h-12 mx-auto text-neutral-400 mb-3" />
            <h3 className="font-black text-xl uppercase tracking-tight text-black dark:text-white">
              No matching universes found
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 font-medium text-sm mt-1 max-w-md mx-auto">
              No categories match your search term "{searchQuery}". Try searching for characters, trailers, or reset the filter.
            </p>
            <button
              onClick={() => {
                onSelectUniverse('all')
              }}
              className="mt-4 px-4 py-2 bg-[#FACC15] text-black font-black text-xs uppercase border-2 border-black brutal-shadow brutal-btn inline-flex items-center gap-2"
            >
              <span>View All 8 Universes</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredUniverses.map((item) => {
              const Icon = ICON_COMPONENTS[item.icon] || Tv
              const isSelected = selectedUniverse === item.id

              return (
                <div
                  key={item.id}
                  className={`group bg-white dark:bg-[#161B22] border-3 border-black dark:border-white p-5 flex flex-col justify-between transition-all brutal-btn relative ${
                    isSelected ? 'ring-4 ring-[#FACC15]' : ''
                  }`}
                  style={{
                    boxShadow: '5px 5px 0px 0px #000000',
                  }}
                >
                  {/* Accent Top Strip with Category Color */}
                  <div 
                    className="absolute -top-1.5 left-4 right-4 h-1.5 border-t-2 border-x-2 border-black"
                    style={{ backgroundColor: item.accentColor }}
                  />

                  {/* Header: Icon & Entry Count Badge */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div 
                        className="w-12 h-12 border-2 border-black flex items-center justify-center brutal-shadow-sm group-hover:rotate-3 transition-transform"
                        style={{ backgroundColor: item.accentColor }}
                      >
                        <Icon className="w-6 h-6 text-black" />
                      </div>
                      
                      {/* Entry Count Badge */}
                      <span className="px-2.5 py-1 text-xs font-mono font-black uppercase tracking-tight border-2 border-black bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white brutal-shadow-sm">
                        {item.entryCount}
                      </span>
                    </div>

                    {/* Universe Title */}
                    <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-black dark:text-white mb-2 group-hover:text-black transition-colors">
                      {item.name}
                    </h3>

                    {/* Description */}
                    <p className="text-neutral-700 dark:text-neutral-300 text-sm font-medium leading-snug mb-4">
                      {item.description}
                    </p>
                  </div>

                  {/* Tags & Action Button */}
                  <div className="pt-3 border-t-2 border-black/10 dark:border-neutral-800">
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {item.tags.slice(0, 3).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 border border-black dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 hover:rotate-1 transition-transform"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Explore CTA */}
                    <button
                      onClick={() => setActiveModalUniverse(item)}
                      className="w-full py-2 px-3 font-black text-xs uppercase tracking-tight border-2 border-black brutal-shadow-sm brutal-btn flex items-center justify-between gap-1 transition-colors"
                      style={{ backgroundColor: item.accentColor }}
                      aria-label={`Explore ${item.name} Universe details`}
                    >
                      <span className="text-black">Explore Universe</span>
                      <ArrowUpRight className="w-4 h-4 text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}

      </div>

      {/* Universe Quick-Preview Modal */}
      {activeModalUniverse && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="universe-modal-title"
        >
          <div className="relative w-full max-w-2xl bg-white dark:bg-[#161B22] border-3 border-black dark:border-white p-6 sm:p-8 brutal-shadow-lg max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b-2 border-black dark:border-neutral-700 mb-6">
              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 border-2 border-black flex items-center justify-center brutal-shadow-sm"
                  style={{ backgroundColor: activeModalUniverse.accentColor }}
                >
                  {(() => {
                    const ModalIcon = ICON_COMPONENTS[activeModalUniverse.icon] || Tv
                    return <ModalIcon className="w-6 h-6 text-black" />
                  })()}
                </div>

                <div>
                  <span className="font-mono text-xs font-black uppercase tracking-wider px-2 py-0.5 border border-black bg-[#FACC15] text-black">
                    CANON SECTOR: {activeModalUniverse.entryCount}
                  </span>
                  <h3 id="universe-modal-title" className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-black dark:text-white mt-1">
                    {activeModalUniverse.name} UNIVERSE
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setActiveModalUniverse(null)}
                className="p-1.5 border-2 border-black dark:border-white bg-white dark:bg-[#0D1117] text-black dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800 brutal-shadow-sm"
                aria-label="Close universe modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-6 text-neutral-800 dark:text-neutral-200 font-medium">
              
              <div className="p-4 border-2 border-black dark:border-neutral-600 bg-neutral-50 dark:bg-[#0D1117]">
                <h4 className="font-mono text-xs font-black uppercase text-neutral-500 mb-1">
                  OFFICIAL GUILD STATEMENT
                </h4>
                <p className="italic text-base sm:text-lg font-bold text-black dark:text-white">
                  {activeModalUniverse.featuredQuote}
                </p>
                <p className="text-sm mt-2 text-neutral-700 dark:text-neutral-300">
                  {activeModalUniverse.description}
                </p>
              </div>

              {/* Curated Tags */}
              <div>
                <h4 className="font-mono text-xs font-black uppercase tracking-wider text-black dark:text-white mb-2">
                  CURATED METADATA STACKS
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeModalUniverse.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 text-xs font-mono font-bold uppercase border-2 border-black dark:border-white bg-white dark:bg-[#161B22] text-black dark:text-white brutal-shadow-sm"
                    >
                      🏷️ {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Trending Topics inside Universe */}
              <div>
                <h4 className="font-mono text-xs font-black uppercase tracking-wider text-black dark:text-white mb-2">
                  ACTIVE CANON DISCUSSIONS
                </h4>
                <div className="space-y-2">
                  {activeModalUniverse.popularTopics.map((topic, idx) => (
                    <div
                      key={idx}
                      className="p-3 border-2 border-black dark:border-neutral-700 bg-white dark:bg-[#0D1117] flex items-center justify-between gap-2 group hover:border-[#FACC15] transition-colors cursor-pointer"
                      onClick={() => {
                        onOpenTopic(topic)
                        setActiveModalUniverse(null)
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <Flame className="w-4 h-4 text-[#F43F5E]" />
                        <span className="font-bold text-sm text-black dark:text-white">
                          {topic}
                        </span>
                      </div>
                      <span className="font-mono text-xs font-bold text-neutral-500 group-hover:text-black dark:group-hover:text-white uppercase flex items-center gap-1">
                        View Thread <ExternalLink className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t-2 border-black dark:border-neutral-700 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="font-mono text-xs text-neutral-500">
                  Moderated by Fan Hub Council • Verified for TechWiz 7
                </span>
                <button
                  onClick={() => {
                    onSelectUniverse(activeModalUniverse.id)
                    setActiveModalUniverse(null)
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 bg-black text-white dark:bg-white dark:text-black font-black text-xs uppercase tracking-tight border-2 border-black dark:border-white brutal-shadow brutal-btn"
                >
                  Set as Active Filter
                </button>
              </div>

            </div>

          </div>
        </div>
      )}
    </section>
  )
}
