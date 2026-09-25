import { ArrowUp } from 'lucide-react'



export default function Footer({ 
  onSelectUniverse, 
  onOpenAuth, 
  onOpenModal 
}) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer id="sitemap" className="bg-white dark:bg-[#0D1117] border-t-3 border-black dark:border-neutral-100 transition-colors">

      {/* Top Banner Notice */}
      <div className="bg-[#FACC15] text-black border-b-2 border-black py-2 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono font-black uppercase">
          <div className="flex items-center gap-2">
            <span className="bg-black text-[#FACC15] px-1.5 py-0.5">SECTION 1.9</span>
            
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden md:inline">• ZERO TRACKERS • NO CLUTTER</span>
          </div>
        </div>
      </div>

      {/* Main 5-Column Sitemap Grid */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
          
          {/* ================= COLUMN 1: BRAND OVERVIEW & DISCLAIMER ================= */}
          <div className="lg:col-span-1 space-y-4">
            <div className="inline-block bg-[#FACC15] text-black font-black text-xl px-3 py-1 border-2 border-black brutal-shadow-sm uppercase">
              FAN HUB+
            </div>
            
            <p className="text-xs text-neutral-700 dark:text-neutral-300 font-medium leading-relaxed">
              The unified fandom portal for anime lore, gaming metas, K-pop comebacks, comic drops, and cosplay spotlights.
            </p>

            <div className="p-3 bg-neutral-100 dark:bg-[#161B22] border-2 border-black dark:border-neutral-700 space-y-1">
              <span className="font-mono text-[10px] font-black uppercase text-neutral-500 block">
                COMPETITION SPEC
              </span>
              
            </div>

            <div className="flex items-center gap-2 pt-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
              <span className="font-mono text-[11px] font-bold text-neutral-600 dark:text-neutral-400 uppercase">
                All 8 Sectors Operational
              </span>
            </div>
          </div>

          {/* ================= COLUMN 2: MAIN PAGES ================= */}
          <div>
            <h4 className="font-black text-xs uppercase tracking-wider text-black dark:text-white pb-2 mb-3 border-b-2 border-black dark:border-neutral-700 flex items-center gap-1.5">
              <span>01. MAIN PAGES</span>
            </h4>
            <ul className="space-y-2 text-xs font-bold text-neutral-700 dark:text-neutral-300">
              <li>
                <a href="#top" className="hover:text-black dark:hover:text-white hover:underline block py-0.5">
                  Home Landing
                </a>
              </li>
              <li>
                <button 
                  onClick={() => onOpenModal('about')} 
                  className="hover:text-black dark:hover:text-white hover:underline text-left block py-0.5"
                >
                  About Fan Hub Plus
                </button>
              </li>
              <li>
                <a href="#explore" className="hover:text-black dark:hover:text-white hover:underline block py-0.5">
                  Universal Multiverse Search
                </a>
              </li>
              <li>
                <a href="#events" className="hover:text-black dark:hover:text-white hover:underline block py-0.5">
                  Convention & Gathering Radar
                </a>
              </li>
              <li>
                <button 
                  onClick={() => onOpenModal('feedback')} 
                  className="hover:text-black dark:hover:text-white hover:underline text-left block py-0.5"
                >
                  Bug Report & Feedback
                </button>
              </li>
            </ul>
          </div>

          {/* ================= COLUMN 3: FANDOM UNIVERSES ================= */}
          <div>
            <h4 className="font-black text-xs uppercase tracking-wider text-black dark:text-white pb-2 mb-3 border-b-2 border-black dark:border-neutral-700 flex items-center gap-1.5">
              <span>02. 8 UNIVERSES</span>
            </h4>
            <ul className="space-y-2 text-xs font-bold text-neutral-700 dark:text-neutral-300">
              {[
                { name: 'Anime (240+ Entries)', id: 'anime', color: '#A3E635' },
                { name: 'Gaming (180+ Entries)', id: 'gaming', color: '#FACC15' },
                { name: 'Movies & TV (310+ Entries)', id: 'movies-tv', color: '#38BDF8' },
                { name: 'K-Pop (125+ Entries)', id: 'kpop', color: '#F43F5E' },
                { name: 'Comics (95+ Entries)', id: 'comics', color: '#FB7185' },
                { name: 'Manga (150+ Entries)', id: 'manga', color: '#FB923C' },
                { name: 'Cosplay (85+ Entries)', id: 'cosplay', color: '#C084FC' },
                { name: 'Community Vault (60+)', id: 'community-vault', color: '#34D399' }
              ].map(u => (
                <li key={u.id}>
                  <button
                    onClick={() => {
                      onSelectUniverse(u.id)
                      const target = document.querySelector('#explore')
                      if (target) target.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="hover:text-black dark:hover:text-white hover:underline text-left flex items-center gap-1.5 py-0.5"
                  >
                    <span className="w-2 h-2 rounded-none border border-black shrink-0" style={{ backgroundColor: u.color }} />
                    <span>{u.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* ================= COLUMN 4: FEATURES & TOOLS ================= */}
          <div>
            <h4 className="font-black text-xs uppercase tracking-wider text-black dark:text-white pb-2 mb-3 border-b-2 border-black dark:border-neutral-700 flex items-center gap-1.5">
              <span>03. FEATURES</span>
            </h4>
            <ul className="space-y-2 text-xs font-bold text-neutral-700 dark:text-neutral-300">
              <li>
                <a href="#multimedia" className="hover:text-black dark:hover:text-white hover:underline block py-0.5">
                  4K Multimedia Trailer Player
                </a>
              </li>
              <li>
                <a href="#multimedia" className="hover:text-black dark:hover:text-white hover:underline block py-0.5">
                  Lossless Audio Streamer
                </a>
              </li>
              <li>
                <a href="#characters" className="hover:text-black dark:hover:text-white hover:underline block py-0.5">
                  Character Lore Archive
                </a>
              </li>
              <li>
                <a href="#merch" className="hover:text-black dark:hover:text-white hover:underline block py-0.5">
                  The Drop Radar (Showcase)
                </a>
              </li>
              <li>
                <button 
                  onClick={() => onOpenModal('submission')} 
                  className="hover:text-black dark:hover:text-white hover:underline text-left block py-0.5"
                >
                  Submit Fan Essay or Art
                </button>
              </li>
            </ul>
          </div>

          {/* ================= COLUMN 5: USER & ADMIN ================= */}
          <div>
            <h4 className="font-black text-xs uppercase tracking-wider text-black dark:text-white pb-2 mb-3 border-b-2 border-black dark:border-neutral-700 flex items-center gap-1.5">
              <span>04. USER & ADMIN</span>
            </h4>
            <ul className="space-y-2 text-xs font-bold text-neutral-700 dark:text-neutral-300">
              <li>
                <button 
                  onClick={() => onOpenAuth('register')} 
                  className="hover:text-black dark:hover:text-white hover:underline text-left block py-0.5"
                >
                  User Registration
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenAuth('login')} 
                  className="hover:text-black dark:hover:text-white hover:underline text-left block py-0.5"
                >
                  Sign In / Authentication
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenModal('dashboard')} 
                  className="hover:text-black dark:hover:text-white hover:underline text-left block py-0.5"
                >
                  Collector Dashboard
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenModal('admin')} 
                  className="hover:text-black dark:hover:text-white hover:underline text-left block py-0.5 text-[#F43F5E]"
                >
                  Admin Control Panel
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenModal('moderation')} 
                  className="hover:text-black dark:hover:text-white hover:underline text-left block py-0.5"
                >
                  Moderation Queue (Audit)
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="mt-8 sm:mt-12 pt-4 sm:pt-6 border-t-2 border-black/10 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <div className="text-[10px] sm:text-xs font-mono text-neutral-600 dark:text-neutral-400 text-center sm:text-left px-2">
            <span>© 2026 Fan Hub Plus  • All Rights Reserved.</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={scrollToTop}
              className="px-2.5 sm:px-3.5 py-1 sm:py-1.5 bg-[#FACC15] text-black font-black text-[10px] sm:text-xs uppercase border-2 border-black brutal-shadow-sm brutal-btn flex items-center gap-1 sm:gap-1.5"
              aria-label="Scroll back to top of page"
            >
              <span className="hidden sm:inline">Back To Top</span>
              <span className="sm:hidden">↑ Top</span>
              <ArrowUp className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  )
}
