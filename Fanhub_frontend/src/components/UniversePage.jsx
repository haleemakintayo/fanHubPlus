import { useState, useEffect, useMemo } from 'react'
import {
  Tv,
  Gamepad2,
  Film,
  Mic2,
  Zap,
  BookOpen,
  Sparkles,
  ShieldCheck,
  ArrowLeft,
  ArrowRight,
  Search,
  Bookmark,
  Star,
  Clock,
  Eye,
  User,
  Flame,
  Layers,
  Send,
  X,
  CheckCircle2,
  Play,
  Music,
  ShoppingBag
} from 'lucide-react'
import {
  UNIVERSES,
  CHARACTERS_DATA,
  MULTIMEDIA_DATA,
  MERCH_DROPS,
  getUniverseBySlug,
  getArticlesByUniverse
} from '../data/fandomData'
import { fandomsApi, normalizeBackendArticle } from '../services/api'

const ICON_MAP = {
  Tv,
  Gamepad2,
  Film,
  Mic2,
  Zap,
  BookOpen,
  Sparkles,
  ShieldCheck
}

export default function UniversePage({
  universeSlug,
  onNavigateHome,
  onSelectUniverse,
  onOpenArticle,
  bookmarks = [],
  onToggleBookmark,
  userRatings = {},
  onRateItem,
  onOpenModal
}) {
  const [activeTab, setActiveTab] = useState('all')
  const [localSearch, setLocalSearch] = useState('')
  const [selectedTag, setSelectedTag] = useState('ALL')
  const [backendArticles, setBackendArticles] = useState([])
  const [backendCharacters, setBackendCharacters] = useState([])
  const [activeCharacterModal, setActiveCharacterModal] = useState(null)

  const universe = useMemo(() => getUniverseBySlug(universeSlug), [universeSlug])
  const IconComponent = ICON_MAP[universe.icon] || Tv

  // Reset filters on universe change
  useEffect(() => {
    setActiveTab('all')
    setLocalSearch('')
    setSelectedTag('ALL')
    setBackendArticles([])
    setBackendCharacters([])

    let isMounted = true
    // Attempt to fetch any live backend articles & characters for this category
    fandomsApi
      .getContents({ category: universe.slug })
      .then((res) => {
        if (!isMounted) return
        const list = Array.isArray(res) ? res : res?.results || []
        const normalized = list
          .filter((item) => !item.content_type || item.content_type === 'ARTICLE')
          .map((item) => normalizeBackendArticle(item, universe.accentColor))
          .filter(Boolean)
        setBackendArticles(normalized)
      })
      .catch(() => {
        // Fallback silently to curated dataset
      })

    fandomsApi
      .getCharacters({ category: universe.slug })
      .then((res) => {
        if (!isMounted) return
        const list = Array.isArray(res) ? res : res?.results || []
        const mapped = list.map((c) => ({
          id: `db-char-${c.id || c.slug}`,
          name: c.name,
          alias: c.alias_or_title || 'Canon Figure',
          universe: universe.name,
          universeSlug: universe.slug,
          accentColor: universe.accentColor,
          archetype: c.faction || `${universe.name} Icon`,
          origin: c.origin_world || universe.name,
          faction: c.faction || 'Official Canon',
          tagline: `“${c.biography ? c.biography.slice(0, 95) + '...' : 'Archived in the Fan Hub Plus Character Vault.'}”`,
          image:
            c.image_url ||
            'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80',
          stats: [
            { label: 'Power', value: c.power_stat || 90, max: 100 },
            { label: 'Speed', value: c.speed_stat || 85, max: 100 },
            { label: 'Intelligence', value: c.intelligence_stat || 88, max: 100 }
          ],
          details: {
            firstAppearance: c.first_appearance || 'Official Canon Archive',
            weapon: c.signature_weapon || 'Classified Relic',
            nemesis: c.primary_nemesis || 'Unknown Adversary',
            bio: c.biography || 'Verified character dossier in the Fan Hub Plus database.'
          }
        }))
        setBackendCharacters(mapped)
      })
      .catch(() => {})

    return () => {
      isMounted = false
    }
  }, [universe.slug, universe.accentColor, universe.name])

  // Combine curated articles + backend articles (deduplicated by slug)
  const allUniverseArticles = useMemo(() => {
    const curated = getArticlesByUniverse(universe.slug)
    const existingSlugs = new Set(curated.map((a) => a.slug))
    const merged = [...curated]
    for (const bArt of backendArticles) {
      if (!existingSlugs.has(bArt.slug)) {
        merged.push(bArt)
        existingSlugs.add(bArt.slug)
      }
    }
    return merged
  }, [universe.slug, backendArticles])

  // Filtered articles by search & tag
  const filteredArticles = useMemo(() => {
    return allUniverseArticles.filter((art) => {
      const matchesTag =
        selectedTag === 'ALL' ||
        art.tags.some((t) => t.toLowerCase() === selectedTag.toLowerCase())

      if (!localSearch.trim()) return matchesTag
      const q = localSearch.toLowerCase()
      const matchesSearch =
        art.title.toLowerCase().includes(q) ||
        art.subtitle.toLowerCase().includes(q) ||
        art.synopsis.toLowerCase().includes(q) ||
        art.author.toLowerCase().includes(q) ||
        art.tags.some((t) => t.toLowerCase().includes(q))

      return matchesTag && matchesSearch
    })
  }, [allUniverseArticles, selectedTag, localSearch])

  // Characters for this universe
  const universeCharacters = useMemo(() => {
    const curated = CHARACTERS_DATA.filter(
      (c) =>
        c.universeSlug === universe.slug ||
        c.universe.toLowerCase().includes(universe.name.toLowerCase())
    )
    return [...curated, ...backendCharacters]
  }, [universe.slug, universe.name, backendCharacters])

  // Multimedia & Merch related to this universe
  const universeMedia = useMemo(() => {
    const q = universe.name.toLowerCase()
    const trailers = MULTIMEDIA_DATA.trailers.filter(
      (t) => t.universe.toLowerCase().includes(q) || universe.slug === 'community-vault'
    )
    const tracks = MULTIMEDIA_DATA.audioTracks.filter(
      (a) => a.category.toLowerCase().includes(q) || universe.slug === 'community-vault'
    )
    const drops = MERCH_DROPS.filter(
      (m) => m.universe.toLowerCase().includes(q) || universe.slug === 'community-vault'
    )
    return {
      trailers: trailers.length > 0 ? trailers : MULTIMEDIA_DATA.trailers.slice(0, 2),
      tracks: tracks.length > 0 ? tracks : MULTIMEDIA_DATA.audioTracks.slice(0, 2),
      drops: drops.length > 0 ? drops : MERCH_DROPS.slice(0, 2)
    }
  }, [universe.name, universe.slug])

  // Unique tags across articles in this universe
  const availableTags = useMemo(() => {
    const set = new Set(['ALL'])
    universe.tags.forEach((t) => set.add(t))
    allUniverseArticles.forEach((a) => a.tags.forEach((t) => set.add(t)))
    return Array.from(set)
  }, [universe.tags, allUniverseArticles])

  const spotlightArticle = filteredArticles[0] || allUniverseArticles[0]

  const isBookmarked = (id) => bookmarks.some((b) => b.id === id)

  return (
    <div className="min-h-screen bg-[#FDFBF7] dark:bg-[#0D1117] transition-colors pb-20">
      {/* ================= TOP BREADCRUMB & UNIVERSE SWITCHER BAR ================= */}
      <div className="bg-white dark:bg-[#161B22] border-b-3 border-black dark:border-neutral-200 sticky top-14 sm:top-20 z-30">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 flex flex-col md:flex-row md:items-center justify-between gap-2.5">
          {/* Back + Breadcrumb */}
          <div className="flex items-center gap-2">
            <button
              onClick={onNavigateHome}
              className="px-3 py-1.5 bg-[#FACC15] text-black font-black text-xs uppercase border-2 border-black brutal-shadow-sm brutal-btn flex items-center gap-1.5 shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Home Portal</span>
            </button>
            <span className="font-mono text-xs font-bold text-neutral-400">/</span>
            <span className="font-mono text-xs font-black uppercase text-neutral-600 dark:text-neutral-300">
              Universes
            </span>
            <span className="font-mono text-xs font-bold text-neutral-400">/</span>
            <span
              className="px-2 py-0.5 text-xs font-mono font-black uppercase border border-black text-black"
              style={{ backgroundColor: universe.accentColor }}
            >
              {universe.name}
            </span>
          </div>

          {/* 8-Universe Quick Switcher Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
            {UNIVERSES.map((u) => {
              const active = u.slug === universe.slug
              return (
                <button
                  key={u.id}
                  onClick={() => onSelectUniverse(u.slug)}
                  className={`px-2.5 py-1 text-[10px] sm:text-xs font-black uppercase border-2 border-black dark:border-neutral-200 whitespace-nowrap transition-all ${
                    active
                      ? 'text-black brutal-shadow-sm scale-105'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                  }`}
                  style={active ? { backgroundColor: u.accentColor } : undefined}
                >
                  {u.name}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ================= UNIVERSE HERO BANNER ================= */}
      <header className="relative border-b-3 border-black dark:border-neutral-200 overflow-hidden bg-white dark:bg-[#161B22]">
        {/* Top Accent Strip */}
        <div
          className="h-3 w-full border-b-2 border-black"
          style={{ backgroundColor: universe.accentColor }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* Left Column: Title & Lore Identity */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <div
                  className="p-2.5 border-2 border-black brutal-shadow-sm text-black flex items-center justify-center"
                  style={{ backgroundColor: universe.accentColor }}
                >
                  <IconComponent className="w-6 h-6 stroke-[2.5]" />
                </div>
                <span className="px-2.5 py-1 bg-black text-white dark:bg-white dark:text-black font-mono text-xs font-black uppercase border-2 border-black">
                  SECTOR // {universe.slug.toUpperCase()}
                </span>
                <span className="px-2.5 py-1 bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white font-mono text-xs font-bold uppercase border-2 border-black dark:border-neutral-500">
                  {universe.entryCount}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-black dark:text-white leading-[0.95]">
                {universe.name}{' '}
                <span
                  className="inline-block px-2 border-3 border-black text-black brutal-shadow-sm"
                  style={{ backgroundColor: universe.accentColor }}
                >
                  HUB
                </span>
              </h1>

              <p className="text-base sm:text-lg font-medium text-neutral-700 dark:text-neutral-300 max-w-2xl leading-relaxed">
                {universe.description} Dive into full-length editorial breakdowns, verified canon timelines, character combat dossiers, and curated community research.
              </p>

              {/* Featured Universe Quote */}
              <div className="p-3.5 bg-[#FDFBF7] dark:bg-[#0D1117] border-l-4 border-2 border-black dark:border-neutral-300 max-w-2xl">
                <p className="font-mono text-xs sm:text-sm italic font-bold text-neutral-800 dark:text-neutral-200">
                  {universe.featuredQuote}
                </p>
              </div>
            </div>

            {/* Right Column: Quick Stats & In-Universe Search Box */}
            <div className="lg:col-span-4">
              <div className="bg-[#FDFBF7] dark:bg-[#0D1117] border-3 border-black dark:border-neutral-200 p-4 sm:p-5 brutal-shadow space-y-4">
                <div className="flex items-center justify-between border-b-2 border-black/15 dark:border-neutral-700 pb-2.5">
                  <span className="font-mono text-xs font-black uppercase text-black dark:text-white flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-[#F43F5E]" />
                    <span>Universe Telemetry</span>
                  </span>
                  <span
                    className="px-2 py-0.5 text-[10px] font-mono font-black uppercase border border-black text-black"
                    style={{ backgroundColor: universe.accentColor }}
                  >
                    LIVE ARCHIVE
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2.5 bg-white dark:bg-[#161B22] border-2 border-black dark:border-neutral-600">
                    <div className="text-xl font-black text-black dark:text-white">
                      {allUniverseArticles.length}
                    </div>
                    <div className="text-[10px] font-mono font-bold uppercase text-neutral-500">
                      Deep Articles
                    </div>
                  </div>
                  <div className="p-2.5 bg-white dark:bg-[#161B22] border-2 border-black dark:border-neutral-600">
                    <div className="text-xl font-black text-black dark:text-white">
                      {universeCharacters.length}
                    </div>
                    <div className="text-[10px] font-mono font-bold uppercase text-neutral-500">
                      Characters
                    </div>
                  </div>
                  <div className="p-2.5 bg-white dark:bg-[#161B22] border-2 border-black dark:border-neutral-600">
                    <div className="text-xl font-black text-black dark:text-white">
                      4.9★
                    </div>
                    <div className="text-[10px] font-mono font-bold uppercase text-neutral-500">
                      Avg Rating
                    </div>
                  </div>
                </div>

                {/* Search Within Universe */}
                <div>
                  <label className="block font-mono text-[10px] font-black uppercase text-neutral-500 mb-1">
                    Search {universe.name} Articles & Lore
                  </label>
                  <div className="flex items-center bg-white dark:bg-[#161B22] border-2 border-black dark:border-neutral-300 px-2.5 py-2">
                    <Search className="w-4 h-4 text-neutral-500 shrink-0 mr-2" />
                    <input
                      type="text"
                      value={localSearch}
                      onChange={(e) => setLocalSearch(e.target.value)}
                      placeholder={`Filter ${universe.name} topics...`}
                      className="w-full bg-transparent text-xs sm:text-sm font-bold text-black dark:text-white placeholder:text-neutral-400 focus:outline-none"
                    />
                    {localSearch && (
                      <button
                        onClick={() => setLocalSearch('')}
                        className="p-0.5 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                        aria-label="Clear filter"
                      >
                        <X className="w-3.5 h-3.5 text-black dark:text-white" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Top Pick Callout */}
                <div className="p-2.5 bg-black text-white dark:bg-white dark:text-black flex items-center justify-between text-xs font-mono">
                  <span className="font-bold uppercase">★ Editor Top Pick:</span>
                  <span className="font-black truncate ml-2">{universe.topPick}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tag Filter Bar */}
          <div className="mt-6 pt-5 border-t-2 border-black/10 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="font-mono text-[11px] font-black uppercase text-neutral-500 mr-1">
                Filter Tags:
              </span>
              {availableTags.map((tag) => {
                const active = selectedTag === tag
                return (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-2.5 py-1 text-[11px] font-mono font-bold uppercase border-2 border-black dark:border-neutral-300 transition-all ${
                      active
                        ? 'bg-black text-white dark:bg-white dark:text-black brutal-shadow-sm'
                        : 'bg-white dark:bg-[#0D1117] text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                    }`}
                  >
                    #{tag}
                  </button>
                )
              })}
            </div>

            {/* Sub-Section View Tabs */}
            <div className="flex items-center gap-1.5">
              {[
                { id: 'all', label: 'All Sectors' },
                { id: 'articles', label: `Articles (${filteredArticles.length})` },
                { id: 'characters', label: `Characters (${universeCharacters.length})` },
                { id: 'media', label: 'Media & Drops' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 text-xs font-black uppercase border-2 border-black dark:border-neutral-200 transition-all ${
                    activeTab === tab.id
                      ? 'text-black brutal-shadow-sm'
                      : 'bg-white dark:bg-[#0D1117] text-black dark:text-white'
                  }`}
                  style={activeTab === tab.id ? { backgroundColor: universe.accentColor } : undefined}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* ================= MAIN CONTENT BODY ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 space-y-12 sm:space-y-16">
        {/* 1. FEATURED SPOTLIGHT ARTICLE */}
        {(activeTab === 'all' || activeTab === 'articles') && spotlightArticle && (
          <section aria-label="Featured Spotlight Article">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span
                  className="px-2.5 py-1 text-xs font-mono font-black uppercase border-2 border-black text-black brutal-shadow-sm"
                  style={{ backgroundColor: universe.accentColor }}
                >
                  ★ COVER STORY
                </span>
                <h2 className="text-lg sm:text-2xl font-black uppercase tracking-tight text-black dark:text-white">
                  Featured {universe.name} Dossier
                </h2>
              </div>
            </div>

            <div className="bg-white dark:bg-[#161B22] border-3 border-black dark:border-neutral-200 brutal-shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-12">
              {/* Spotlight Image */}
              <div
                onClick={() => onOpenArticle(spotlightArticle.slug)}
                className="lg:col-span-6 relative min-h-[260px] sm:min-h-[360px] bg-neutral-900 border-b-3 lg:border-b-0 lg:border-r-3 border-black dark:border-neutral-200 cursor-pointer group overflow-hidden"
              >
                <img
                  src={spotlightArticle.heroImage}
                  alt={spotlightArticle.title}
                  className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span
                    className="px-2.5 py-1 text-xs font-mono font-black uppercase border-2 border-black text-black brutal-shadow-sm"
                    style={{ backgroundColor: universe.accentColor }}
                  >
                    {spotlightArticle.readTime}
                  </span>
                  <span className="px-2.5 py-1 bg-black/85 text-white text-xs font-mono font-bold uppercase border-2 border-white">
                    {spotlightArticle.releaseYear} CANON
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white font-mono text-xs">
                  <span className="flex items-center gap-1.5 font-bold">
                    <User className="w-3.5 h-3.5 text-[#FACC15]" />
                    {spotlightArticle.author}
                  </span>
                  <span className="flex items-center gap-1 font-bold">
                    <Eye className="w-3.5 h-3.5 text-[#38BDF8]" />
                    {spotlightArticle.viewCount.toLocaleString()} reads
                  </span>
                </div>
              </div>

              {/* Spotlight Details */}
              <div className="lg:col-span-6 p-5 sm:p-8 flex flex-col justify-between space-y-5">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {spotlightArticle.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-[10px] font-mono font-black uppercase bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-black dark:border-neutral-600"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <h3
                    onClick={() => onOpenArticle(spotlightArticle.slug)}
                    className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-black dark:text-white leading-tight cursor-pointer hover:underline"
                  >
                    {spotlightArticle.title}
                  </h3>

                  <p className="text-sm sm:text-base font-bold text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    {spotlightArticle.subtitle}
                  </p>

                  <div className="p-3.5 bg-[#FDFBF7] dark:bg-[#0D1117] border-2 border-black dark:border-neutral-700 space-y-1.5">
                    <span className="font-mono text-[10px] font-black uppercase text-neutral-500 block">
                      EXECUTIVE SYNOPSIS
                    </span>
                    <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                      {spotlightArticle.synopsis}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t-2 border-black/10 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        onToggleBookmark({
                          id: spotlightArticle.id,
                          title: spotlightArticle.title,
                          universe: universe.name,
                          type: 'Article',
                          accentColor: universe.accentColor,
                          slug: spotlightArticle.slug
                        })
                      }
                      className={`px-3 py-2 font-black text-xs uppercase border-2 border-black dark:border-neutral-200 brutal-btn flex items-center gap-1.5 ${
                        isBookmarked(spotlightArticle.id)
                          ? 'bg-[#FACC15] text-black brutal-shadow-sm'
                          : 'bg-white dark:bg-[#0D1117] text-black dark:text-white'
                      }`}
                    >
                      <Bookmark
                        className="w-4 h-4"
                        fill={isBookmarked(spotlightArticle.id) ? 'currentColor' : 'none'}
                      />
                      <span>{isBookmarked(spotlightArticle.id) ? 'Saved' : 'Bookmark'}</span>
                    </button>
                  </div>

                  <button
                    onClick={() => onOpenArticle(spotlightArticle.slug)}
                    className="px-5 py-2.5 text-black font-black text-xs sm:text-sm uppercase border-2 border-black brutal-shadow-sm brutal-btn flex items-center gap-2"
                    style={{ backgroundColor: universe.accentColor }}
                  >
                    <span>Read Full Article</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 2. ALL ARTICLES & LORE ARCHIVE GRID */}
        {(activeTab === 'all' || activeTab === 'articles') && (
          <section aria-label="Curated Articles Grid">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-3 border-b-3 border-black dark:border-neutral-200 gap-2">
              <div>
                <span className="font-mono text-xs font-black uppercase text-neutral-500 block">
                  EDITORIAL & CANON DISPATCHES
                </span>
                <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-black dark:text-white">
                  {universe.name} Articles & Guides ({filteredArticles.length})
                </h2>
              </div>
              <span className="font-mono text-xs font-bold text-neutral-600 dark:text-neutral-400">
                Click any dispatch to open the full multi-section reader
              </span>
            </div>

            {filteredArticles.length === 0 ? (
              <div className="bg-white dark:bg-[#161B22] border-3 border-black dark:border-neutral-200 p-8 text-center brutal-shadow">
                <p className="font-black text-lg uppercase text-black dark:text-white mb-2">
                  No matching articles in {universe.name}
                </p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                  Try clearing your search query or selecting a different tag filter.
                </p>
                <button
                  onClick={() => {
                    setLocalSearch('')
                    setSelectedTag('ALL')
                  }}
                  className="px-4 py-2 bg-[#FACC15] text-black font-black text-xs uppercase border-2 border-black brutal-shadow-sm"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((article, idx) => {
                  const bookmarked = isBookmarked(article.id)
                  const userStar = userRatings[article.id] || 0

                  return (
                    <article
                      key={article.id}
                      className="bg-white dark:bg-[#161B22] border-3 border-black dark:border-neutral-200 brutal-shadow flex flex-col justify-between group hover:-translate-y-1 transition-transform"
                    >
                      <div>
                        {/* Card Thumbnail */}
                        <div
                          onClick={() => onOpenArticle(article.slug)}
                          className="relative h-48 bg-neutral-900 border-b-3 border-black dark:border-neutral-200 overflow-hidden cursor-pointer"
                        >
                          <img
                            src={article.thumbnail}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                          <div className="absolute top-3 left-3 flex items-center gap-1.5">
                            <span
                              className="px-2 py-0.5 text-[10px] font-mono font-black uppercase border border-black text-black"
                              style={{ backgroundColor: universe.accentColor }}
                            >
                              ISSUE #{idx + 1}
                            </span>
                            <span className="px-2 py-0.5 bg-black/85 text-white text-[10px] font-mono font-bold uppercase border border-white/40 flex items-center gap-1">
                              <Clock className="w-3 h-3 text-[#FACC15]" />
                              {article.readTime}
                            </span>
                          </div>

                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              onToggleBookmark({
                                id: article.id,
                                title: article.title,
                                universe: universe.name,
                                type: 'Article',
                                accentColor: universe.accentColor,
                                slug: article.slug
                              })
                            }}
                            className={`absolute top-3 right-3 p-1.5 border-2 border-black transition-transform active:scale-95 ${
                              bookmarked
                                ? 'bg-[#FACC15] text-black'
                                : 'bg-white/90 text-black hover:bg-[#FACC15]'
                            }`}
                            aria-label={`Bookmark ${article.title}`}
                          >
                            <Bookmark
                              className="w-4 h-4"
                              fill={bookmarked ? 'currentColor' : 'none'}
                            />
                          </button>

                          <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-white">
                            <span className="font-bold truncate">{article.author}</span>
                            <span className="text-[#FACC15] font-black">
                              ★ {userStar || article.rating}
                            </span>
                          </div>
                        </div>

                        {/* Card Body */}
                        <div className="p-4 sm:p-5 space-y-3">
                          <div className="flex flex-wrap gap-1">
                            {article.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="px-1.5 py-0.5 text-[10px] font-mono font-bold uppercase bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-black/30 dark:border-neutral-600"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>

                          <h3
                            onClick={() => onOpenArticle(article.slug)}
                            className="text-lg sm:text-xl font-black uppercase tracking-tight text-black dark:text-white leading-snug cursor-pointer group-hover:underline"
                          >
                            {article.title}
                          </h3>

                          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 line-clamp-3 leading-relaxed">
                            {article.synopsis}
                          </p>
                        </div>
                      </div>

                      {/* Card Footer */}
                      <div className="px-4 sm:px-5 pb-4 pt-3 border-t-2 border-black/10 dark:border-neutral-800 flex items-center justify-between gap-2">
                        {/* Quick 5-Star Rating */}
                        <div className="flex items-center gap-0.5" title="Rate this article">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() => onRateItem && onRateItem(article.id, star)}
                              className="p-0.5 hover:scale-110 transition-transform"
                              aria-label={`Rate ${star} stars`}
                            >
                              <Star
                                className={`w-3.5 h-3.5 ${
                                  star <= (userStar || Math.round(article.rating))
                                    ? 'text-[#FACC15] fill-[#FACC15]'
                                    : 'text-neutral-400'
                                }`}
                              />
                            </button>
                          ))}
                        </div>

                        <button
                          onClick={() => onOpenArticle(article.slug)}
                          className="px-3 py-1.5 bg-black text-white dark:bg-white dark:text-black font-black text-xs uppercase border-2 border-black brutal-btn flex items-center gap-1.5"
                        >
                          <span>Read Article</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </article>
                  )
                })}
              </div>
            )}
          </section>
        )}

        {/* 3. UNIVERSE CHARACTER ROSTER */}
        {(activeTab === 'all' || activeTab === 'characters') && universeCharacters.length > 0 && (
          <section aria-label="Universe Character Roster">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-3 border-b-3 border-black dark:border-neutral-200 gap-2">
              <div>
                <span className="font-mono text-xs font-black uppercase text-neutral-500 block">
                  COMBAT & LORE PROFILES
                </span>
                <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-black dark:text-white">
                  {universe.name} Character Roster
                </h2>
              </div>
              <span className="font-mono text-xs font-bold text-neutral-600 dark:text-neutral-400">
                Verified power metrics & canonical origins
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {universeCharacters.map((char) => (
                <div
                  key={char.id}
                  className="bg-white dark:bg-[#161B22] border-3 border-black dark:border-neutral-200 brutal-shadow overflow-hidden flex flex-col sm:flex-row"
                >
                  <div className="sm:w-48 h-56 sm:h-auto relative bg-neutral-900 border-b-3 sm:border-b-0 sm:border-r-3 border-black dark:border-neutral-200 shrink-0">
                    <img
                      src={char.image}
                      alt={char.name}
                      className="w-full h-full object-cover"
                    />
                    <span
                      className="absolute top-3 left-3 px-2 py-0.5 text-[10px] font-mono font-black uppercase border border-black text-black"
                      style={{ backgroundColor: char.accentColor || universe.accentColor }}
                    >
                      {char.alias}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="text-[11px] font-mono font-bold uppercase text-neutral-500">
                        {char.origin}
                      </div>
                      <h3 className="text-xl font-black uppercase text-black dark:text-white">
                        {char.name}
                      </h3>
                      <p className="text-xs italic font-mono text-neutral-600 dark:text-neutral-300 mt-1">
                        {char.tagline}
                      </p>
                      <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 mt-3 line-clamp-3">
                        {char.details?.bio}
                      </p>
                    </div>

                    <div className="pt-3 border-t-2 border-black/10 dark:border-neutral-800 flex items-center justify-between">
                      <span className="font-mono text-[11px] font-bold uppercase text-neutral-500">
                        Faction: <strong className="text-black dark:text-white">{char.faction}</strong>
                      </span>
                      <button
                        onClick={() => setActiveCharacterModal(char)}
                        className="px-3 py-1.5 text-black font-black text-xs uppercase border-2 border-black brutal-shadow-sm brutal-btn"
                        style={{ backgroundColor: universe.accentColor }}
                      >
                        Inspect Dossier
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 4. UNIVERSE MULTIMEDIA & MERCH DROPS */}
        {(activeTab === 'all' || activeTab === 'media') && (
          <section aria-label="Universe Multimedia & Collector Drops" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Trailers & OSTs */}
            <div className="lg:col-span-7 bg-white dark:bg-[#161B22] border-3 border-black dark:border-neutral-200 p-5 sm:p-6 brutal-shadow space-y-4">
              <div className="flex items-center justify-between border-b-2 border-black/15 dark:border-neutral-700 pb-3">
                <h3 className="text-lg sm:text-xl font-black uppercase text-black dark:text-white flex items-center gap-2">
                  <Play className="w-5 h-5 text-[#F43F5E]" />
                  <span>Featured {universe.name} Streams & OSTs</span>
                </h3>
                <span className="font-mono text-xs font-bold uppercase text-neutral-500">
                  4K / Lossless
                </span>
              </div>

              <div className="space-y-3">
                {universeMedia.trailers.map((trailer) => (
                  <div
                    key={trailer.id}
                    className="p-3 bg-[#FDFBF7] dark:bg-[#0D1117] border-2 border-black dark:border-neutral-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={trailer.videoThumbnail}
                        alt={trailer.title}
                        className="w-16 h-12 object-cover border border-black shrink-0"
                      />
                      <div>
                        <span className="text-[10px] font-mono font-black uppercase text-[#F43F5E]">
                          TRAILER • {trailer.duration}
                        </span>
                        <h4 className="font-black text-xs sm:text-sm uppercase text-black dark:text-white">
                          {trailer.title}
                        </h4>
                        <p className="text-[11px] text-neutral-500 line-clamp-1">
                          {trailer.synopsis}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        onNavigateHome()
                        setTimeout(() => {
                          const el = document.querySelector('#multimedia')
                          if (el) el.scrollIntoView({ behavior: 'smooth' })
                        }, 100)
                      }}
                      className="px-3 py-1.5 bg-black text-white dark:bg-white dark:text-black font-black text-[10px] uppercase border border-black shrink-0"
                    >
                      Watch Stream
                    </button>
                  </div>
                ))}

                {universeMedia.tracks.map((track) => (
                  <div
                    key={track.id}
                    className="p-3 bg-[#FDFBF7] dark:bg-[#0D1117] border-2 border-black dark:border-neutral-700 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 border-2 border-black flex items-center justify-center text-black shrink-0"
                        style={{ backgroundColor: universe.accentColor }}
                      >
                        <Music className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono font-black uppercase text-neutral-500">
                          AUDIO TRACK • {track.duration}
                        </span>
                        <h4 className="font-black text-xs sm:text-sm uppercase text-black dark:text-white">
                          {track.title} — {track.artist}
                        </h4>
                      </div>
                    </div>
                    <span className="font-mono text-xs font-black text-neutral-600 dark:text-neutral-400">
                      ♥ {track.likes}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contribute to this Universe CTA */}
            <div className="lg:col-span-5 bg-white dark:bg-[#161B22] border-3 border-black dark:border-neutral-200 p-5 sm:p-6 brutal-shadow flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-black uppercase border-2 border-black text-black"
                  style={{ backgroundColor: universe.accentColor }}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Community Vault Integration</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black uppercase text-black dark:text-white">
                  Write for the {universe.name} Archive
                </h3>
                <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  Have an in-depth lore theory, frame-by-frame analysis, or cosplay build log for{' '}
                  <strong>{universe.name}</strong>? Submit your dispatch to our moderators. Approved entries are published directly to this Universe page!
                </p>

                <div className="p-3 bg-[#FDFBF7] dark:bg-[#0D1117] border-2 border-black dark:border-neutral-700 space-y-1.5 text-xs font-mono">
                  <div className="flex items-center gap-1.5 text-black dark:text-white font-bold">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                    <span>Zero-Spam Editorial Vetting</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-black dark:text-white font-bold">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                    <span>Full Author Attribution Badge</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onOpenModal && onOpenModal('submission')}
                className="w-full py-3 bg-[#FACC15] text-black font-black text-xs sm:text-sm uppercase border-2 border-black brutal-shadow-sm brutal-btn flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit {universe.name} Essay or Art</span>
              </button>
            </div>
          </section>
        )}
      </div>

      {/* ================= CHARACTER DOSSIER MODAL ================= */}
      {activeCharacterModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setActiveCharacterModal(null)}
        >
          <div
            className="bg-[#FDFBF7] dark:bg-[#161B22] border-4 border-black dark:border-white w-full max-w-xl brutal-shadow-lg overflow-hidden my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="p-4 border-b-3 border-black flex items-center justify-between text-black"
              style={{ backgroundColor: activeCharacterModal.accentColor || universe.accentColor }}
            >
              <div>
                <span className="font-mono text-[10px] font-black uppercase block">
                  CLASSIFIED CHARACTER DOSSIER
                </span>
                <h3 className="text-xl font-black uppercase">{activeCharacterModal.name}</h3>
              </div>
              <button
                onClick={() => setActiveCharacterModal(null)}
                className="p-1.5 bg-white text-black border-2 border-black"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 sm:p-6 space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <img
                  src={activeCharacterModal.image}
                  alt={activeCharacterModal.name}
                  className="w-28 h-28 object-cover border-2 border-black shrink-0"
                />
                <div className="space-y-1 text-center sm:text-left">
                  <div className="text-xs font-mono font-bold uppercase text-neutral-500">
                    {activeCharacterModal.alias} • {activeCharacterModal.origin}
                  </div>
                  <p className="text-xs sm:text-sm font-mono italic font-bold text-black dark:text-white">
                    {activeCharacterModal.tagline}
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-white dark:bg-[#0D1117] border-2 border-black dark:border-neutral-700 space-y-2 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
                <p>{activeCharacterModal.details?.bio}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-mono">
                <div className="p-2.5 bg-white dark:bg-[#0D1117] border-2 border-black dark:border-neutral-700">
                  <span className="text-neutral-500 block text-[10px] uppercase">Signature Weapon</span>
                  <strong className="text-black dark:text-white">
                    {activeCharacterModal.details?.weapon}
                  </strong>
                </div>
                <div className="p-2.5 bg-white dark:bg-[#0D1117] border-2 border-black dark:border-neutral-700">
                  <span className="text-neutral-500 block text-[10px] uppercase">Primary Nemesis</span>
                  <strong className="text-black dark:text-white">
                    {activeCharacterModal.details?.nemesis}
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
