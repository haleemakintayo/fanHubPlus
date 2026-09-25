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
  Flame,
  Bookmark,
  Eye,
  FileText
} from 'lucide-react'
import { getArticleBySlugOrTopic } from '../data/fandomData'


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
  onOpenUniversePage,
  onOpenArticle,
  searchQuery,
  onOpenTopic,
  bookmarkedItems = {},
  toggleBookmark,
  onRecordActivity
}) {
  const [activeModalUniverse, setActiveModalUniverse] = useState(null)

  const handleNavigateUniverse = (item) => {
    onRecordActivity?.({
      action_type: 'VIEW_ARTICLE',
      target_title: `Entered ${item.name} Universe Hub`,
      category_name: item.name,
    })
    if (onOpenUniversePage) {
      onOpenUniversePage(item.slug || item.id)
    } else {
      setActiveModalUniverse(item)
    }
  }

  const handleNavigateTopicArticle = (topic, universeItem) => {
    const resolved = getArticleBySlugOrTopic(topic)
    onRecordActivity?.({
      action_type: 'VIEW_ARTICLE',
      target_title: resolved?.title || topic,
      category_name: universeItem?.name || 'Fandom',
    })
    if (onOpenArticle && resolved) {
      onOpenArticle(resolved.slug)
    } else if (onOpenTopic) {
      onOpenTopic(topic)
    }
  }

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
    <section id="explore" className="py-8 sm:py-16 px-3 sm:px-6 lg:px-8 border-b-2 border-black dark:border-neutral-100 bg-[#FDFBF7] dark:bg-[#0D1117] transition-colors">

      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4 mb-6 sm:mb-10 pb-4 sm:pb-6 border-b-2 border-black dark:border-neutral-800">
          <div>
            <div className="inline-flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
              <span className="bg-[#38BDF8] text-black font-black text-[10px] sm:text-xs uppercase px-2 sm:px-2.5 py-0.5 border-2 border-black brutal-shadow-sm">
                MULTIVERSE MATRIX
              </span>
              <span className="font-mono text-[10px] sm:text-xs font-bold uppercase text-neutral-600 dark:text-neutral-400">
                8 CORE SECTORS • CLICK ANY SECTOR OR ARTICLE TO OPEN PAGE
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-tight text-black dark:text-white">
              UNIVERSE DIRECTORY
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 font-medium text-xs sm:text-sm md:text-base mt-1 max-w-2xl">
              Curated by dedicated guild masters. Click any category card to enter its dedicated Universe Hub Page, or select an article topic below to read the full dossier.
            </p>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            {selectedUniverse !== 'all' && (
              <button
                onClick={() => onSelectUniverse('all')}
                className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-neutral-200 dark:bg-neutral-800 text-black dark:text-white font-bold text-[10px] sm:text-xs uppercase border-2 border-black dark:border-neutral-300 brutal-shadow-sm flex items-center gap-1 sm:gap-1.5"
              >
                <X className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>Reset Filter</span>
              </button>
            )}
            <span className="font-mono text-[10px] sm:text-xs font-bold uppercase px-2.5 sm:px-3 py-1 sm:py-1.5 bg-black text-[#A3E635] border-2 border-black">
              Showing {filteredUniverses.length} / 8
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredUniverses.map((item) => {
              const Icon = ICON_COMPONENTS[item.icon] || Tv
              const isSelected = selectedUniverse === item.id

              return (
                <div
                  key={item.id}
                  className={`group bg-white dark:bg-[#161B22] border-3 border-black dark:border-white p-4 sm:p-5 flex flex-col justify-between transition-all relative ${
                    isSelected ? 'ring-4 ring-[#FACC15]' : ''
                  }`}
                  style={{
                    boxShadow: '5px 5px 0px 0px #000000',
                  }}
                >
                  {/* Accent Top Strip with Category Color */}
                  <div
                    className="absolute -top-1.5 left-3 right-3 sm:left-4 sm:right-4 h-1.5 border-t-2 border-x-2 border-black"
                    style={{ backgroundColor: item.accentColor }}
                  />

                  {/* Header: Icon & Entry Count Badge */}
                  <div>
                    <div className="flex items-center justify-between gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                      <div
                        onClick={() => handleNavigateUniverse(item)}
                        className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-black flex items-center justify-center brutal-shadow-sm group-hover:rotate-3 transition-transform cursor-pointer"
                        style={{ backgroundColor: item.accentColor }}
                      >
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                      </div>

                      {/* Entry Count Badge + Quick Preview */}
                      <div className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 text-[10px] font-mono font-black uppercase tracking-tight border-2 border-black bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white brutal-shadow-sm">
                          {item.entryCount}
                        </span>
                        <button
                          type="button"
                          onClick={() => setActiveModalUniverse(item)}
                          className="p-1 border-2 border-black dark:border-neutral-400 bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white hover:bg-[#FACC15] hover:text-black transition-colors"
                          title={`Quick Summary of ${item.name}`}
                          aria-label={`Quick Summary of ${item.name}`}
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Universe Title (Clickable) */}
                    <h3
                      onClick={() => handleNavigateUniverse(item)}
                      className="text-lg sm:text-xl md:text-2xl font-black uppercase tracking-tight text-black dark:text-white mb-1.5 sm:mb-2 cursor-pointer hover:underline flex items-center justify-between"
                    >
                      <span>{item.name}</span>
                    </h3>

                    {/* Description */}
                    <p className="text-neutral-700 dark:text-neutral-300 text-xs sm:text-sm font-medium leading-snug mb-3">
                      {item.description}
                    </p>

                    {/* Featured Articles List inside Card */}
                    {item.popularTopics && item.popularTopics.length > 0 && (
                      <div className="mb-3 p-2.5 bg-[#FDFBF7] dark:bg-[#0D1117] border-2 border-black dark:border-neutral-700 space-y-1.5">
                        <span className="font-mono text-[9px] font-black uppercase text-neutral-500 block">
                          FEATURED ARTICLES (CLICK TO READ)
                        </span>
                        {item.popularTopics.map((topic, tIdx) => (
                          <button
                            key={tIdx}
                            type="button"
                            onClick={() => handleNavigateTopicArticle(topic, item)}
                            className="w-full text-left text-[11px] font-bold text-black dark:text-neutral-200 hover:underline flex items-center gap-1.5 py-0.5 group/topic"
                          >
                            <FileText className="w-3 h-3 shrink-0 text-[#F43F5E]" />
                            <span className="truncate flex-1">{topic}</span>
                            <ArrowUpRight className="w-3 h-3 shrink-0 opacity-60 group-hover/topic:opacity-100" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Tags & Action Button */}
                  <div className="pt-2 sm:pt-3 border-t-2 border-black/10 dark:border-neutral-800">
                    <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-3">
                      {item.tags.slice(0, 3).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[9px] sm:text-[10px] font-mono font-bold uppercase px-1.5 sm:px-2 py-0.5 border border-black dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Enter Universe Page CTA */}
                    <button
                      onClick={() => handleNavigateUniverse(item)}
                      className="w-full py-2 px-3 font-black text-[10px] sm:text-xs uppercase tracking-tight border-2 border-black brutal-shadow-sm brutal-btn flex items-center justify-between gap-1 transition-colors"
                      style={{ backgroundColor: item.accentColor }}
                      aria-label={`Enter ${item.name} Universe Hub Page`}
                    >
                      <span className="text-black">Enter {item.name} Hub</span>
                      <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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
          onClick={() => setActiveModalUniverse(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-white dark:bg-[#161B22] border-3 border-black dark:border-white p-6 sm:p-8 brutal-shadow-lg max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            
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

              {/* Trending Topics / Featured Articles inside Universe */}
              <div>
                <h4 className="font-mono text-xs font-black uppercase tracking-wider text-black dark:text-white mb-2">
                  FEATURED ARTICLES & CANON DISCUSSIONS (CLICK TO READ)
                </h4>
                <div className="space-y-2">
                  {activeModalUniverse.popularTopics.map((topic, idx) => {
                    const resolved = getArticleBySlugOrTopic(topic)
                    const articleId = resolved?.id || `article-${activeModalUniverse.id}-${idx}`
                    const isArticleBookmarked = !!bookmarkedItems[articleId]
                    return (
                      <div
                        key={idx}
                        className="p-3 border-2 border-black dark:border-neutral-700 bg-white dark:bg-[#0D1117] flex items-center justify-between gap-2 group hover:border-[#FACC15] transition-colors"
                      >
                        <div
                          className="flex items-center gap-2 flex-1 cursor-pointer"
                          onClick={() => {
                            setActiveModalUniverse(null)
                            handleNavigateTopicArticle(topic, activeModalUniverse)
                          }}
                        >
                          <Flame className="w-4 h-4 text-[#F43F5E] shrink-0" />
                          <span className="font-bold text-sm text-black dark:text-white group-hover:underline">
                            {topic}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          {toggleBookmark && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleBookmark(articleId, resolved?.title || topic, 'Article', {
                                  category_name: activeModalUniverse.name,
                                })
                              }}
                              className={`p-1.5 border-2 border-black dark:border-white brutal-shadow-sm brutal-btn ${
                                isArticleBookmarked
                                  ? 'bg-[#F43F5E] text-white'
                                  : 'bg-white dark:bg-[#161B22] text-black dark:text-white'
                              }`}
                              title={isArticleBookmarked ? 'Bookmarked Article' : 'Bookmark Article'}
                              aria-label={`Bookmark article ${topic}`}
                            >
                              <Bookmark className={`w-3.5 h-3.5 ${isArticleBookmarked ? 'fill-current' : ''}`} />
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => {
                              setActiveModalUniverse(null)
                              handleNavigateTopicArticle(topic, activeModalUniverse)
                            }}
                            className="px-2.5 py-1 bg-[#FACC15] text-black font-mono text-xs font-black uppercase border border-black flex items-center gap-1"
                          >
                            Read <ExternalLink className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t-2 border-black dark:border-neutral-700 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  onClick={() => {
                    onSelectUniverse(activeModalUniverse.id)
                    setActiveModalUniverse(null)
                  }}
                  className="w-full sm:w-auto px-4 py-2 bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white font-black text-xs uppercase tracking-tight border-2 border-black dark:border-white"
                >
                  Filter Homepage by {activeModalUniverse.name}
                </button>
                <button
                  onClick={() => {
                    const target = activeModalUniverse
                    setActiveModalUniverse(null)
                    handleNavigateUniverse(target)
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 text-black font-black text-xs uppercase tracking-tight border-2 border-black brutal-shadow brutal-btn flex items-center justify-center gap-1.5"
                  style={{ backgroundColor: activeModalUniverse.accentColor }}
                >
                  <span>Open Full {activeModalUniverse.name} Hub Page</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        </div>
      )}
    </section>
  )
}

