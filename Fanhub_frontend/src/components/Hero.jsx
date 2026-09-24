import { 
  Search, 
  X, 
  ShieldCheck, 
  Cpu, 
  Layers, 
  CheckCircle,
  ArrowRight
} from 'lucide-react'


export default function Hero({ 
  searchQuery, 
  setSearchQuery, 
  selectedUniverse, 
  setSelectedUniverse,
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

  return (
    <section id="top" className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b-2 border-black dark:border-neutral-100 overflow-hidden bg-[#FDFBF7] dark:bg-[#0D1117] transition-colors">

      
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
          <div className="bg-[#A3E635] text-black font-black text-xs sm:text-sm uppercase tracking-wider px-3.5 py-1.5 border-2 border-black brutal-shadow-sm hover:rotate-1 transition-transform cursor-default">
            <span>⚡ TECHWIZ 7 SHOWCASE • ALL-IN-ONE FANDOM PORTAL</span>
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-black dark:text-white leading-[0.95] mb-6">
          ONE PORTAL.{' '}
          <span className="relative inline-block px-2 text-black bg-[#FACC15] border-3 border-black brutal-shadow-yellow hover:scale-[1.01] transition-transform">
            INFINITE UNIVERSES.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl font-medium text-neutral-800 dark:text-neutral-300 leading-relaxed mb-10">
          Stop jumping across fragmented forums and cluttered feeds. Explore curated anime lore, gaming metas, K-pop comebacks, comic drops, and cosplay spotlights in one unified, ad-free hub.
        </p>

        {/* Interactive Search Bar Box */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="bg-white dark:bg-[#161B22] border-3 border-black dark:border-white p-2.5 sm:p-3 brutal-shadow-lg flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-3 w-full px-2">
              <Search className="w-6 h-6 text-neutral-800 dark:text-neutral-200 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search across 8 universes, characters, soundtracks, trailers..."
                className="w-full bg-transparent font-bold text-sm sm:text-base text-black dark:text-white placeholder:text-neutral-500 focus:outline-none"
                aria-label="Universal fandom search input"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-none border border-black dark:border-neutral-400"
                  aria-label="Clear search query"
                >
                  <X className="w-4 h-4 text-black dark:text-white" />
                </button>
              )}
            </div>

            <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-2 border-t-2 sm:border-t-0 sm:border-l-2 border-black/20 dark:border-neutral-700 pt-2 sm:pt-0 sm:pl-3">
              <span className="text-[11px] font-mono font-bold uppercase text-neutral-600 dark:text-neutral-400 whitespace-nowrap">
                {totalResultsCount} Matches
              </span>
              <a
                href="#explore"
                className="px-4 py-2 bg-[#FACC15] text-black font-black text-xs uppercase border-2 border-black brutal-shadow-sm brutal-btn flex items-center gap-1.5 shrink-0"
              >
                <span>Browse</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Instant Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto mb-12">
          {filterPills.map((pill) => {
            const isSelected = selectedUniverse === pill.id
            return (
              <button
                key={pill.id}
                onClick={() => setSelectedUniverse(pill.id)}
                className={`px-3 py-1.5 font-bold text-xs sm:text-sm uppercase tracking-tight border-2 border-black dark:border-white transition-all brutal-btn ${
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

        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto pt-6 border-t-2 border-black/10 dark:border-neutral-800">
          {trustBadges.map((badge, idx) => {
            const Icon = badge.icon
            return (
              <div
                key={idx}
                className="bg-white dark:bg-[#161B22] border-2 border-black dark:border-neutral-200 p-3 brutal-shadow-sm flex items-center justify-center gap-2.5 text-left group hover:-translate-y-0.5 transition-transform"
              >
                <div className={`p-1.5 border border-black ${badge.highlight} text-black shrink-0`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="font-black text-xs uppercase tracking-tight text-neutral-900 dark:text-neutral-100 leading-tight">
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
