import { Bookmark, ChevronRight } from 'lucide-react'


export default function CharacterArchive({ 
  characters, 
  bookmarkedItems, 
  toggleBookmark, 
  onOpenLoreModal 
}) {
  return (
    <section id="characters" className="py-8 sm:py-16 px-3 sm:px-6 lg:px-8 border-b-2 border-black dark:border-neutral-100 bg-[#FDFBF7] dark:bg-[#0D1117] transition-colors">

      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4 mb-8 sm:mb-12 pb-4 sm:pb-6 border-b-2 border-black dark:border-neutral-800">
          <div>
            <div className="inline-flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
              <span className="bg-[#A3E635] text-black font-black text-[10px] sm:text-xs uppercase px-2 sm:px-2.5 py-0.5 border-2 border-black brutal-shadow-sm">
                BIOGRAPHY REGISTRY
              </span>
              <span className="font-mono text-[10px] sm:text-xs font-bold uppercase text-neutral-600 dark:text-neutral-400">
                CANON VERIFIED
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-tight text-black dark:text-white">
              LEGENDS OF THE MULTIVERSE
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 font-medium text-xs sm:text-sm md:text-base mt-1 max-w-2xl">
              Deep-dive bios, faction affiliations, and power statistics.
            </p>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="font-mono text-[10px] sm:text-xs font-bold uppercase px-2.5 sm:px-3 py-1 sm:py-1.5 bg-black text-[#FACC15] border-2 border-black">
              4 Champions
            </span>
          </div>
        </div>

        {/* Character Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {characters.map((char) => {
            const isBookmarked = !!bookmarkedItems[char.id]

            return (
              <div
                key={char.id}
                className="group bg-white dark:bg-[#161B22] border-3 border-black dark:border-white p-4 sm:p-5 flex flex-col justify-between brutal-shadow-md hover:-translate-y-1 transition-transform relative"
              >
                {/* Accent Top Border Bar */}
                <div
                  className="absolute -top-1.5 left-3 right-3 sm:left-4 sm:right-4 h-1.5 border-t-2 border-x-2 border-black"
                  style={{ backgroundColor: char.accentColor }}
                />

                <div>
                  {/* Top Header: Universe Tag & Bookmark Button */}
                  <div className="flex items-center justify-between gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                    <span
                      className="font-mono text-[10px] sm:text-[11px] font-black uppercase px-2 sm:px-2.5 py-0.5 border-2 border-black text-black"
                      style={{ backgroundColor: char.accentColor }}
                    >
                      {char.universe}
                    </span>
                    <button
                      onClick={() => toggleBookmark(char.id, char.name, 'Character Lore')}
                      className={`p-1 sm:p-1.5 border-2 border-black dark:border-white brutal-shadow-sm brutal-btn ${
                        isBookmarked
                          ? 'bg-[#F43F5E] text-white'
                          : 'bg-white dark:bg-[#0D1117] text-black dark:text-white'
                      }`}
                      aria-label={isBookmarked ? `Remove ${char.name} from bookmarks` : `Bookmark ${char.name}`}
                      title={isBookmarked ? 'Bookmarked' : 'Add to Bookmarks'}
                    >
                      <Bookmark className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  {/* Character Avatar/Illustration Frame */}
                  <div className="relative aspect-square w-full mb-3 sm:mb-4 border-2 border-black overflow-hidden bg-neutral-900 group-hover:border-black transition-colors">
                    <img
                      src={char.image}
                      alt={char.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                    <div className="absolute bottom-1.5 sm:bottom-2 left-1.5 sm:left-2 right-1.5 sm:right-2">
                      <span className="font-mono text-[9px] sm:text-[10px] font-black uppercase text-white bg-black/80 px-1.5 sm:px-2 py-0.5 border border-white/30 block truncate">
                        {char.faction}
                      </span>
                    </div>
                  </div>

                  {/* Character Name & Archetype */}
                  <div className="mb-3 sm:mb-4">
                    <span className="font-mono text-[10px] sm:text-xs font-bold text-neutral-500 uppercase block">
                      {char.alias}
                    </span>
                    <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight text-black dark:text-white leading-tight">
                      {char.name}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-neutral-600 dark:text-neutral-400 italic mt-0.5 sm:mt-1 line-clamp-2">
                      {char.tagline}
                    </p>
                  </div>

                  {/* Power Statistics Breakdown */}
                  <div className="p-2 sm:p-3 bg-neutral-50 dark:bg-[#0D1117] border-2 border-black dark:border-neutral-700 mb-3 sm:mb-4">
                    <span className="font-mono text-[9px] sm:text-[10px] font-black uppercase text-neutral-500 block mb-1.5 sm:mb-2">
                      CANON BATTLE TELEMETRY
                    </span>

                    {/* Check if character uses numerical bar stats or text stats */}
                    {char.stats[0].value !== undefined ? (
                      <div className="space-y-2">
                        {char.stats.map((s, sIdx) => (
                          <div key={sIdx}>
                            <div className="flex justify-between text-xs font-mono font-bold text-black dark:text-white mb-0.5">
                              <span>{s.label}</span>
                              <span>{s.value}%</span>
                            </div>
                            <div className="h-2 w-full bg-neutral-200 dark:bg-neutral-800 border border-black">
                              <div
                                className="h-full border-r border-black"
                                style={{
                                  width: `${s.value}%`,
                                  backgroundColor: char.accentColor
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-1.5 text-xs font-mono">
                        {char.stats.map((s, sIdx) => (
                          <div key={sIdx} className="flex justify-between border-b border-neutral-300 dark:border-neutral-800 pb-1">
                            <span className="text-neutral-500 font-bold">{s.label}:</span>
                            <span className="font-black text-black dark:text-white truncate max-w-[120px] text-right">
                              {s.textValue}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Read Full Lore Action Button */}
                <button
                  onClick={() => onOpenLoreModal(char)}
                  className="w-full py-2 sm:py-2.5 px-2 sm:px-3 bg-black text-white dark:bg-white dark:text-black font-black text-[10px] sm:text-xs uppercase tracking-tight border-2 border-black dark:border-white brutal-shadow-sm brutal-btn flex items-center justify-center gap-1 sm:gap-1.5 mt-1.5 sm:mt-2"
                  aria-label={`Read full lore for ${char.name}`}
                >
                  <span>Read Lore</span>
                  <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
