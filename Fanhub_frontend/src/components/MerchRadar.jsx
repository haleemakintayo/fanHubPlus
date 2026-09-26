import { useState, useEffect } from 'react'
import { 
  Bell, 
  Eye, 
  Calendar, 
  Info, 
  Check,
  Bookmark,
  ExternalLink,
  Clock,
  Sparkles,
  Filter
} from 'lucide-react'

const MERCH_CATEGORIES = [
  { id: 'all', label: 'All Categories' },
  { id: 'anime', label: 'Anime' },
  { id: 'gaming', label: 'Gaming' },
  { id: 'movies-tv', label: 'Movies & TV' },
  { id: 'kpop', label: 'K-Pop' },
  { id: 'comics', label: 'Comics & Cosplay' },
  { id: 'manga', label: 'Manga' },
]

const STATUS_BADGES = [
  { id: 'ALL', label: 'All Drops' },
  { id: 'LIMITED EDITION', label: '[LIMITED EDITION]' },
  { id: 'PRE-ORDER', label: '[PRE-ORDER]' },
  { id: 'COLLECTIBLE', label: '[COLLECTIBLE]' },
]

function computeCountdown(targetIso, nowMs) {
  const target = new Date(targetIso).getTime()
  const diff = Math.max(0, target - nowMs)
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)

  const pad = (n) => String(n).padStart(2, '0')
  return {
    days: pad(days),
    hours: pad(hours),
    minutes: pad(minutes),
    seconds: pad(seconds),
  }
}

export default function MerchRadar({ 
  merchDrops = [], 
  upcomingReleases = [],
  onShowToast,
  bookmarkedItems = {},
  toggleBookmark,
  onRecordActivity
}) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedBadge, setSelectedBadge] = useState('ALL')
  const [alertItems, setAlertItems] = useState({})
  const [nowMs, setNowMs] = useState(() => Date.now())
  const [viewCounters, setViewCounters] = useState(() => {
    const initial = {}
    merchDrops.forEach(item => {
      initial[item.id] = item.viewCountNum
    })
    return initial
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setNowMs(Date.now())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const filteredMerch = merchDrops.filter((item) => {
    if (selectedCategory !== 'all') {
      const cat = (item.categorySlug || item.universe || '').toLowerCase()
      if (!cat.includes(selectedCategory)) return false
    }
    if (selectedBadge !== 'ALL') {
      const badge = (item.badgeType || item.statusTag || '').toUpperCase()
      if (!badge.includes(selectedBadge)) return false
    }
    return true
  })

  const handleSetAlert = (item) => {
    const isSet = !alertItems[item.id]
    setAlertItems(prev => ({ ...prev, [item.id]: isSet }))
    
    if (isSet) {
      onRecordActivity?.({
        action_type: 'VIEW_MERCH',
        target_title: `Drop Alert: ${item.title}`,
        category_name: item.universe || item.category || 'Merchandise',
      })
      onShowToast({
        title: 'Drop Alert Scheduled!',
        message: `Priority alert set for "${item.title}". You'll receive a ping 1 hour before launch.`,
        type: 'warning'
      })
    } else {
      onShowToast({
        title: 'Drop Alert Removed',
        message: `Alert cancelled for "${item.title}".`,
        type: 'info'
      })
    }
  }

  const handleIncrementView = (item) => {
    setViewCounters(prev => ({
      ...prev,
      [item.id]: (prev[item.id] || item.viewCountNum || 0) + 1
    }))
    onRecordActivity?.({
      action_type: 'VIEW_MERCH',
      target_title: item.title,
      category_name: item.universe,
    })
  }

  return (
    <section id="merch" className="py-8 sm:py-16 px-3 sm:px-6 lg:px-8 border-b-2 border-black dark:border-neutral-100 bg-[#FDFBF7] dark:bg-[#0D1117] transition-colors">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4 mb-6 sm:mb-8 pb-4 sm:pb-6 border-b-2 border-black dark:border-neutral-800">
          <div>
            <div className="inline-flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
              <span className="bg-[#F43F5E] text-white font-black text-[10px] sm:text-xs uppercase px-2 sm:px-2.5 py-0.5 border-2 border-black brutal-shadow-sm">
                COLLECTIBLE PREVIEWS
              </span>
              <span className="font-mono text-[10px] sm:text-xs font-bold uppercase text-neutral-600 dark:text-neutral-400">
                DISCOVERY ONLY • NO CHECKOUT
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-tight text-black dark:text-white">
              THE DROP RADAR
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 font-medium text-xs sm:text-sm md:text-base mt-1 max-w-2xl">
              Track official collectible runs, pre-orders, vinyl releases, and upcoming franchise drops before they sell out.
            </p>
          </div>

          {/* Mandate Notice Pill */}
          <div className="bg-white dark:bg-[#161B22] p-2 sm:p-2.5 border-2 border-black dark:border-white brutal-shadow-sm max-w-xs sm:max-w-sm">
            <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs font-mono font-bold text-neutral-800 dark:text-neutral-200">
              <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FACC15] shrink-0" />
              <span>Showcase Only • No Cart or Payment Processing</span>
            </div>
          </div>
        </div>

        {/* Filter Bar: Categories & Standardized Status Badges */}
        <div className="bg-white dark:bg-[#161B22] border-3 border-black dark:border-white p-3.5 sm:p-4 mb-8 brutal-shadow-sm space-y-3">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span className="inline-flex items-center gap-1 font-mono text-[10px] sm:text-xs font-black uppercase text-neutral-500 mr-1">
              <Filter className="w-3.5 h-3.5" /> Fandom:
            </span>
            {MERCH_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-2.5 py-1 font-mono text-[10px] sm:text-xs font-black uppercase border-2 border-black dark:border-white transition-all brutal-btn ${
                    isActive
                      ? 'bg-[#FACC15] text-black brutal-shadow-sm'
                      : 'bg-neutral-50 dark:bg-[#0D1117] text-black dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800'
                  }`}
                  aria-pressed={isActive}
                >
                  {cat.label}
                </button>
              )
            })}
          </div>

          {/* Status Badge Filters */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-2 border-t border-black/10 dark:border-neutral-800">
            <span className="font-mono text-[10px] sm:text-xs font-black uppercase text-neutral-500 mr-1">
              Badge Tier:
            </span>
            {STATUS_BADGES.map((badge) => {
              const isActive = selectedBadge === badge.id
              return (
                <button
                  key={badge.id}
                  type="button"
                  onClick={() => setSelectedBadge(badge.id)}
                  className={`px-2.5 py-1 font-mono text-[10px] sm:text-xs font-black uppercase border-2 border-black dark:border-white transition-all brutal-btn ${
                    isActive
                      ? 'bg-black text-[#A3E635] dark:bg-white dark:text-black brutal-shadow-sm'
                      : 'bg-white dark:bg-[#0D1117] text-black dark:text-white'
                  }`}
                  aria-pressed={isActive}
                >
                  {badge.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Collectible Cards Grid */}
        {filteredMerch.length === 0 ? (
          <div className="bg-white dark:bg-[#161B22] border-3 border-black dark:border-white p-8 text-center brutal-shadow-md mb-12">
            <p className="font-black text-base uppercase text-black dark:text-white mb-2">
              No collectibles match the selected category and status badge
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all')
                setSelectedBadge('ALL')
              }}
              className="px-4 py-2 bg-[#FACC15] text-black font-black text-xs uppercase border-2 border-black brutal-shadow-sm brutal-btn"
            >
              Reset Drop Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-14">
            {filteredMerch.map((item) => {
              const isAlertSet = !!alertItems[item.id]
              const isBookmarked = !!bookmarkedItems[item.id]
              const currentViews = viewCounters[item.id] || item.viewCountNum

              return (
                <div
                  key={item.id}
                  className="bg-white dark:bg-[#161B22] border-3 border-black dark:border-white p-4 sm:p-5 flex flex-col justify-between brutal-shadow-md hover:-translate-y-1 transition-transform relative group"
                  onClick={() => handleIncrementView(item)}
                >
                  {/* Accent Top Strip */}
                  <div
                    className="absolute -top-1.5 left-3 right-3 sm:left-4 sm:right-4 h-1.5 border-t-2 border-x-2 border-black"
                    style={{ backgroundColor: item.universeColor }}
                  />

                  <div>
                    {/* Top Status Tag, Universe & Bookmark */}
                    <div className="flex items-center justify-between gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                      <span className={`font-mono text-[10px] sm:text-[11px] font-black uppercase px-2 sm:px-2.5 py-0.5 sm:py-1 border-2 border-black ${item.statusTagColor} brutal-shadow-sm`}>
                        {item.statusTag}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span
                          className="font-mono text-[9px] sm:text-[10px] font-black uppercase px-1.5 sm:px-2 py-0.5 border border-black text-black"
                          style={{ backgroundColor: item.universeColor }}
                        >
                          {item.universe}
                        </span>
                        {toggleBookmark && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleBookmark(item.id, item.title, 'Merchandise Item', {
                                category_name: item.universe,
                                thumbnail_url: item.image,
                              })
                            }}
                            className={`p-1 border-2 border-black dark:border-white brutal-shadow-sm brutal-btn ${
                              isBookmarked
                                ? 'bg-[#F43F5E] text-white'
                                : 'bg-white dark:bg-[#0D1117] text-black dark:text-white'
                            }`}
                            aria-label={isBookmarked ? `Remove ${item.title} from bookmarks` : `Bookmark ${item.title}`}
                            title={isBookmarked ? 'Saved in Vault' : 'Save Merchandise to Vault'}
                          >
                            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Product Image Frame */}
                    <div className="relative aspect-4/3 w-full mb-4 border-2 border-black overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 right-2 bg-black/80 text-white font-mono text-[11px] font-bold px-2 py-0.5 border border-white/30 flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5 text-[#38BDF8]" />
                        <span>{(currentViews / 1000).toFixed(1)}k views</span>
                      </div>
                    </div>

                    {/* Title & Manufacturer */}
                    <h3 className="text-xl font-black uppercase tracking-tight text-black dark:text-white leading-tight mb-1">
                      {item.title}
                    </h3>
                    <span className="font-mono text-xs font-bold text-neutral-500 uppercase block mb-3">
                      Maker: {item.manufacturer}
                    </span>

                    {/* Description */}
                    <p className="text-xs text-neutral-700 dark:text-neutral-300 font-medium leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {/* Drop Schedule Details */}
                    <div className="p-3 bg-neutral-100 dark:bg-[#0D1117] border-2 border-black dark:border-neutral-700 mb-4 space-y-1.5 font-mono text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-500 font-bold flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" /> EST. DROP:
                        </span>
                        <span className="font-black text-black dark:text-white">
                          {item.dropDate}
                        </span>
                      </div>
                      <div className="flex items-center justify-between pt-1 border-t border-black/10 dark:border-neutral-800">
                        <span className="text-neutral-500 font-bold">ESTIMATED:</span>
                        <span className="font-black text-[#10B981] dark:text-[#34D399]">
                          {item.msrp}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action: Set Drop Alert & External Partner Showcase */}
                  <div className="pt-2 flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleSetAlert(item)
                      }}
                      className={`flex-1 py-2.5 px-3 font-black text-xs uppercase tracking-tight border-2 border-black dark:border-white brutal-shadow-sm brutal-btn flex items-center justify-center gap-1.5 ${
                        isAlertSet
                          ? 'bg-[#A3E635] text-black'
                          : 'bg-white dark:bg-[#161B22] text-black dark:text-white hover:bg-[#FACC15] hover:text-black'
                      }`}
                      aria-label={`Toggle drop alert for ${item.title}`}
                    >
                      {isAlertSet ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Alert Active</span>
                        </>
                      ) : (
                        <>
                          <Bell className="w-4 h-4" />
                          <span>Set Drop Alert</span>
                        </>
                      )}
                    </button>

                    {item.partnerUrl && (
                      <a
                        href={item.partnerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="py-2.5 px-3 bg-black text-white dark:bg-white dark:text-black font-black text-xs uppercase border-2 border-black dark:border-white brutal-shadow-sm brutal-btn flex items-center justify-center gap-1 shrink-0"
                        title={`Visit ${item.manufacturer} Official Showcase`}
                      >
                        <span>Maker</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                </div>
              )
            })}
          </div>
        )}

        {/* ================= UPCOMING RELEASE CALENDAR WITH LIVE COUNTDOWNS ================= */}
        {upcomingReleases.length > 0 && (
          <div className="bg-white dark:bg-[#161B22] border-3 border-black dark:border-white p-5 sm:p-8 brutal-shadow-lg">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 mb-6 border-b-2 border-black dark:border-neutral-700">
              <div>
                <div className="inline-flex items-center gap-2 mb-1.5">
                  <span className="bg-[#FACC15] text-black font-mono text-[10px] sm:text-xs font-black uppercase px-2.5 py-0.5 border-2 border-black brutal-shadow-sm">
                    LIVE COUNTDOWN TELEMETRY
                  </span>
                  <span className="font-mono text-[10px] sm:text-xs font-bold uppercase text-neutral-500">
                    SYNCHRONIZED UTC CLOCK
                  </span>
                </div>
                <h3 className="text-xl sm:text-3xl font-black uppercase tracking-tight text-black dark:text-white flex items-center gap-2">
                  <Clock className="w-6 h-6 text-[#F43F5E]" />
                  <span>UPCOMING RELEASE CALENDAR</span>
                </h3>
              </div>

              <span className="font-mono text-xs font-black uppercase px-3 py-1.5 bg-black text-[#A3E635] border-2 border-black self-start md:self-auto">
                {upcomingReleases.length} Scheduled Premieres & Drops
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {upcomingReleases.map((rel) => {
                const countdown = computeCountdown(rel.targetDate || '2026-11-15T00:00:00Z', nowMs)
                const isAlerted = !!alertItems[rel.id]

                return (
                  <div
                    key={rel.id}
                    className="bg-[#FDFBF7] dark:bg-[#0D1117] border-2 border-black dark:border-neutral-700 p-4 flex flex-col justify-between brutal-shadow-sm"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <span className="font-mono text-[10px] font-black uppercase px-2 py-0.5 bg-[#38BDF8] text-black border border-black">
                          {rel.type}
                        </span>
                        <span className="font-mono text-[10px] font-black uppercase px-2 py-0.5 bg-black text-[#FACC15] border border-black">
                          {rel.status}
                        </span>
                      </div>

                      <h4 className="font-black text-base uppercase text-black dark:text-white leading-snug mb-1">
                        {rel.title}
                      </h4>
                      <p className="font-mono text-[11px] font-bold text-neutral-500 uppercase mb-2">
                        {rel.studio} • {rel.date}
                      </p>
                      <p className="text-xs text-neutral-700 dark:text-neutral-300 font-medium mb-4 line-clamp-2">
                        {rel.description}
                      </p>
                    </div>

                    {/* Live Ticking Countdown Display */}
                    <div>
                      <div className="grid grid-cols-4 gap-1.5 p-2 bg-black text-white border-2 border-black mb-3 text-center font-mono">
                        <div>
                          <span className="block text-sm sm:text-base font-black text-[#A3E635]">
                            {countdown.days}
                          </span>
                          <span className="block text-[8px] uppercase text-neutral-400">DAYS</span>
                        </div>
                        <div>
                          <span className="block text-sm sm:text-base font-black text-[#FACC15]">
                            {countdown.hours}
                          </span>
                          <span className="block text-[8px] uppercase text-neutral-400">HRS</span>
                        </div>
                        <div>
                          <span className="block text-sm sm:text-base font-black text-[#38BDF8]">
                            {countdown.minutes}
                          </span>
                          <span className="block text-[8px] uppercase text-neutral-400">MIN</span>
                        </div>
                        <div>
                          <span className="block text-sm sm:text-base font-black text-[#F43F5E]">
                            {countdown.seconds}
                          </span>
                          <span className="block text-[8px] uppercase text-neutral-400">SEC</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleSetAlert({ id: rel.id, title: rel.title, universe: rel.type })}
                        className={`w-full py-2 px-3 font-black text-[11px] uppercase border-2 border-black dark:border-white brutal-shadow-sm brutal-btn flex items-center justify-center gap-1.5 ${
                          isAlerted
                            ? 'bg-[#A3E635] text-black'
                            : 'bg-white dark:bg-[#161B22] text-black dark:text-white hover:bg-[#FACC15] hover:text-black'
                        }`}
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{isAlerted ? 'Release Reminder Active' : 'Remind Me at Launch'}</span>
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

      </div>
    </section>
  )
}
