import { 
  Search, 
  X, 
  ShieldCheck, 
  Cpu, 
  Layers, 
  CheckCircle,
  ArrowRight,
  FileText,
  ArrowUpRight
} from 'lucide-react'
import { ARTICLES_DATA, UNIVERSES } from '../data/fandomData'


export default function Hero({ 
  searchQuery, 
  setSearchQuery, 
  selectedUniverse, 
  setSelectedUniverse,
  onOpenUniversePage,
  onOpenArticle,
  totalResultsCount
}) {
  const filterPills = [
    { id: 'all', label: '🔥 All', accent: '#FACC15' },
    { id: 'anime', label: '🍙 Anime', accent: '#A3E635' },
    { id: 'gaming', label: '🎮 Gaming', accent: '#FACC15' },
    { id: 'movies-tv', label: '🎬 Movies & TV', accent: '#38BDF8' },
    { id: 'kpop', label: '🎤 K-Pop', accent: '#F43F5E' },
    { id: 'comics', label: '💥 Comics', accent: '#FB7185' },
    { id: 'manga', label: '📖 Manga', accent: '#FB923C' },
    { id: 'cosplay', label: '🎭 Cosplay', accent: '#C084FC' },
    { id: 'community-vault', label: '🛡️ Vault', accent: '#34D399' },
  ]

  const trustBadges = [
    { label: '8 Core Universes', icon: Layers, highlight: 'bg-[#A3E635]' },
    { label: 'Zero Clutter / Ad-Free', icon: ShieldCheck, highlight: 'bg-[#38BDF8]' },
    { label: 'Admin-Moderated', icon: CheckCircle, highlight: 'bg-[#FACC15]' },
    { label: 'AI-Assisted', icon: Cpu, highlight: 'bg-[#C084FC]' },
  ]

  const matchingArticles = searchQuery.trim()
    ? ARTICLES_DATA.filter((a) => {
        const q = searchQuery.toLowerCase()
        return (
          a.title.toLowerCase().includes(q) ||
          a.subtitle.toLowerCase().includes(q) ||
          a.universeName.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q))
        )
      }).slice(0, 5)
    : []

  const matchingUniverses = searchQuery.trim()
    ? UNIVERSES.filter((u) => {
        const q = searchQuery.toLowerCase()
        return (
          u.name.toLowerCase().includes(q) ||
          u.description.toLowerCase().includes(q) ||
          u.tags.some((t) => t.toLowerCase().includes(q))
        )
      }).slice(0, 3)
    : []

  const activeUniverseObj =
    selectedUniverse !== 'all'
      ? UNIVERSES.find((u) => u.id === selectedUniverse)
      : null

  return (
    <section id="top" className="relative pt-6 sm:pt-12 pb-8 sm:pb-16 px-3 sm:px-6 lg:px-8 border-b-2 border-black dark:border-neutral-100 overflow-hidden bg-[#FDFBF7] dark:bg-[#0D1117] transition-colors">

      
      {/* Background Pop-Brutalist decorative geometric grid lines */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10 text-center">
        
        {/* Micro-Badge */}
        <div className="inline-flex items-center gap-2 mb-6">
        </div>

        {/* Main Headline */}
        <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-8xl font-black uppercase tracking-tight text-black dark:text-white leading-[0.95] mb-4 sm:mb-6">
          ONE PORTAL.{' '}
          <span className="relative inline-block px-1 sm:px-2 text-black bg-[#FACC15] border-3 border-black brutal-shadow-yellow hover:scale-[1.01] transition-transform">
            INFINITE UNIVERSES.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-3xl mx-auto text-sm sm:text-base md:text-xl font-medium text-neutral-800 dark:text-neutral-300 leading-relaxed mb-6 sm:mb-10 px-2 sm:px-0">
          Stop jumping across fragmented forums and cluttered feeds. Explore curated anime lore, gaming metas, K-pop comebacks, comic drops, and cosplay spotlights in one unified, ad-free hub.
        </p>

        {/* Interactive Search Bar Box */}
        <div className="max-w-3xl mx-auto mb-6 sm:mb-8 px-2 sm:px-0 relative">
          <div className="bg-white dark:bg-[#161B22] border-3 border-black dark:border-white p-2 sm:p-2.5 brutal-shadow-lg flex flex-col sm:flex-row items-center gap-1.5 sm:gap-3">
            <div className="flex items-center gap-2 sm:gap-3 w-full px-1.5 sm:px-2">
              <Search className="w-4 h-4 sm:w-6 sm:h-6 text-neutral-800 dark:text-neutral-200 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search universes, articles, characters, trailers..."
                className="w-full bg-transparent font-bold text-xs sm:text-sm md:text-base text-black dark:text-white placeholder:text-neutral-500 focus:outline-none"
                aria-label="Universal fandom search input"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-none border border-black dark:border-neutral-400"
                  aria-label="Clear search query"
                >
                  <X className="w-3 h-3 sm:w-4 sm:h-4 text-black dark:text-white" />
                </button>
              )}
            </div>

            <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-1.5 sm:gap-2 border-t-2 sm:border-t-0 sm:border-l-2 border-black/20 dark:border-neutral-700 pt-1.5 sm:pt-0 sm:pl-2 sm:pl-3">
              <span className="text-[9px] sm:text-[11px] font-mono font-bold uppercase text-neutral-600 dark:text-neutral-400 whitespace-nowrap">
                {totalResultsCount} Matches
              </span>
              <a
                href="#explore"
                className="px-2.5 sm:px-4 py-1.5 sm:py-2 bg-[#FACC15] text-black font-black text-[10px] sm:text-xs uppercase border-2 border-black brutal-shadow-sm brutal-btn flex items-center gap-1 sm:gap-1.5 shrink-0"
              >
                <span>Browse</span>
                <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </a>
            </div>
          </div>

          {/* Live Direct Page Results Panel when typing */}
          {searchQuery.trim() && (matchingUniverses.length > 0 || matchingArticles.length > 0) && (
            <div className="mt-2 bg-white dark:bg-[#161B22] border-3 border-black dark:border-white p-3 sm:p-4 brutal-shadow text-left space-y-3">
              {matchingUniverses.length > 0 && (
                <div>
                  <span className="font-mono text-[10px] font-black uppercase text-neutral-500 block mb-1.5">
                    MATCHING UNIVERSE HUB PAGES
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {matchingUniverses.map((u) => (
                      <button
                        key={u.id}
                        type="button"
                        onClick={() => onOpenUniversePage && onOpenUniversePage(u.slug)}
                        className="px-3 py-1.5 text-xs font-black uppercase border-2 border-black text-black brutal-shadow-sm flex items-center gap-1.5"
                        style={{ backgroundColor: u.accentColor }}
                      >
                        <span>Open {u.name} Hub</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {matchingArticles.length > 0 && (
                <div>
                  <span className="font-mono text-[10px] font-black uppercase text-neutral-500 block mb-1.5">
                    MATCHING ARTICLES & LORE GUIDES (CLICK TO READ)
                  </span>
                  <div className="space-y-1.5">
                    {matchingArticles.map((art) => (
                      <button
                        key={art.id}
                        type="button"
                        onClick={() => onOpenArticle && onOpenArticle(art.slug)}
                        className="w-full p-2 bg-[#FDFBF7] dark:bg-[#0D1117] border-2 border-black dark:border-neutral-700 hover:border-[#FACC15] flex items-center justify-between gap-2 text-left"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <FileText className="w-4 h-4 text-[#F43F5E] shrink-0" />
                          <span
                            className="px-1.5 py-0.5 text-[9px] font-mono font-black uppercase border border-black text-black shrink-0"
                            style={{ backgroundColor: art.accentColor }}
                          >
                            {art.universeName}
                          </span>
                          <span className="font-bold text-xs sm:text-sm text-black dark:text-white truncate">
                            {art.title}
                          </span>
                        </div>
                        <span className="font-mono text-[10px] font-black uppercase text-neutral-500 shrink-0">
                          {art.readTime} →
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Instant Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 max-w-4xl mx-auto mb-6 sm:mb-8 px-2 sm:px-0">
          {filterPills.map((pill) => {
            const isSelected = selectedUniverse === pill.id
            return (
              <button
                key={pill.id}
                onClick={() => setSelectedUniverse(pill.id)}
                className={`px-2 sm:px-3 py-1 sm:py-1.5 font-bold text-[10px] sm:text-sm uppercase tracking-tight border-2 border-black dark:border-white transition-all brutal-btn ${
                  isSelected
                    ? 'bg-black text-white dark:bg-white dark:text-black brutal-shadow-sm scale-105'
                    : 'bg-white dark:bg-[#161B22] text-black dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
                aria-pressed={isSelected}
                aria-label={`Filter by ${pill.label}`}
              >
                <span>{pill.label}</span>
              </button>
            )
          })}
        </div>

        {/* Direct CTA Banner when a specific Universe Filter Pill is selected */}
        {activeUniverseObj && (
          <div className="max-w-xl mx-auto mb-8 px-2">
            <div className="bg-white dark:bg-[#161B22] border-2 border-black dark:border-white p-3 brutal-shadow-sm flex flex-col sm:flex-row items-center justify-between gap-2">
              <span className="font-mono text-xs font-bold text-black dark:text-white">
                Filtering homepage by <strong>{activeUniverseObj.name}</strong> ({activeUniverseObj.entryCount})
              </span>
              <button
                type="button"
                onClick={() => onOpenUniversePage && onOpenUniversePage(activeUniverseObj.slug)}
                className="px-3.5 py-1.5 text-black font-black text-xs uppercase border-2 border-black brutal-shadow-sm brutal-btn flex items-center gap-1.5 shrink-0"
                style={{ backgroundColor: activeUniverseObj.accentColor }}
              >
                <span>Enter Full {activeUniverseObj.name} Page</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}


        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 max-w-4xl mx-auto pt-4 sm:pt-6 border-t-2 border-black/10 dark:border-neutral-800 px-2 sm:px-0">
          {trustBadges.map((badge, idx) => {
            const Icon = badge.icon
            return (
              <div
                key={idx}
                className="bg-white dark:bg-[#161B22] border-2 border-black dark:border-neutral-200 p-2 sm:p-3 brutal-shadow-sm flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2.5 text-left group hover:-translate-y-0.5 transition-transform"
              >
                <div className={`p-1 sm:p-1.5 border border-black ${badge.highlight} text-black shrink-0`}>
                  <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
                <span className="font-black text-[10px] sm:text-xs uppercase tracking-tight text-neutral-900 dark:text-neutral-100 leading-tight">
                  {badge.label}
                </span>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
