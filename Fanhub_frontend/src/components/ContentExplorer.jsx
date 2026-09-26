import { useState, useEffect, useMemo } from 'react'
import {
  Filter,
  ArrowUpDown,
  Bookmark,
  FileText,
  Film,
  Music,
  Image as ImageIcon,
  Star,
  Eye,
  Clock,
  SlidersHorizontal,
  X,
  ArrowUpRight,
  Search
} from 'lucide-react'
import { BrutalGridSkeleton } from './BrutalSkeleton'
import { fandomsApi } from '../services/api'
import { UNIVERSES, MULTIMEDIA_DATA } from '../data/fandomData'

const CONTENT_TYPE_CONFIG = {
  ARTICLE: { label: 'Article / Essay', icon: FileText, bg: 'bg-[#A3E635] text-black' },
  VIDEO: { label: '4K Video / Trailer', icon: Film, bg: 'bg-[#38BDF8] text-black' },
  AUDIO: { label: 'OST / Audio Track', icon: Music, bg: 'bg-[#F43F5E] text-white' },
  IMAGE: { label: 'Visual / Showcase', icon: ImageIcon, bg: 'bg-[#C084FC] text-black' },
}

const GENRE_OPTIONS = [
  'All Genres',
  'Simulcasts',
  'Character Lore',
  'Lore Bible',
  'Canon Timelines',
  'Comeback Radar',
  'Issue Runs',
  'Chapter Drops',
  'Foam Crafting',
  'Fan Essays',
]

const YEAR_OPTIONS = ['All Years', '2026', '2025', '2024']

const POPULARITY_OPTIONS = [
  { value: 0, label: 'All Popularity' },
  { value: 90, label: '90+ High Impact' },
  { value: 95, label: '95+ Elite Canon' },
  { value: 98, label: '98+ Mythic Tier' },
]

export default function ContentExplorer({
  articles = [],
  multimediaData = MULTIMEDIA_DATA,
  universes = UNIVERSES,
  selectedUniverse = 'all',
  onSelectUniverse,
  searchQuery = '',
  onSearchChange,
  bookmarkedItems = {},
  toggleBookmark,
  onSelectArticle,
  onOpenArticle,
  onRecordActivity,
}) {
  const openArticleHandler = onSelectArticle || onOpenArticle
  const [drawerOpen, setDrawerOpen] = useState(true)
  const [selectedType, setSelectedType] = useState('ALL')
  const [selectedGenre, setSelectedGenre] = useState('All Genres')
  const [selectedYear, setSelectedYear] = useState('All Years')
  const [minPopularity, setMinPopularity] = useState(0)
  const [sortBy, setSortBy] = useState('popular') // 'popular' | 'latest' | 'alpha'
  const [visibleCount, setVisibleCount] = useState(9)
  const [apiContent, setApiContent] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  // Hydrate additional published items from backend ContentExplorer endpoint
  useEffect(() => {
    let cancelled = false
    const timer = setTimeout(() => {
      fandomsApi
        .getContents()
        .then((res) => {
          if (cancelled) return
          const list = Array.isArray(res) ? res : res?.results || []
          setApiContent(list)
        })
        .catch(() => {
          // graceful fallback to curated catalog
        })
        .finally(() => {
          if (!cancelled) setIsLoading(false)
        })
    }, 0)

    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [])

  // Build unified multi-format catalog (ARTICLE, VIDEO, AUDIO, IMAGE)
  const unifiedCatalog = useMemo(() => {
    const items = []
    const seenSlugs = new Set()

    // 1. Curated Rich Articles
    articles.forEach((art, index) => {
      seenSlugs.add(art.slug)
      items.push({
        id: art.id || `art-${index}`,
        slug: art.slug,
        title: art.title,
        subtitle: art.subtitle || art.synopsis,
        synopsis: art.synopsis,
        universe: art.universe || 'anime',
        universeName: art.universeName || 'Anime',
        accentColor: art.accentColor || '#A3E635',
        contentType: art.universe === 'cosplay' && index % 2 === 1 ? 'IMAGE' : 'ARTICLE',
        releaseYear: String(art.releaseYear || '2026'),
        publishedAt: art.publishedAt || 'Sept 2026',
        readTime: art.readTime || '6 MIN READ',
        popularityScore: Number(art.popularityScore || 94.5),
        viewCount: Number(art.viewCount || 45000),
        rating: Number(art.rating || 4.8),
        thumbnail: art.thumbnail || art.heroImage,
        tags: Array.isArray(art.tags) ? art.tags : ['Character Lore'],
        author: art.author || 'Hub Archivist',
        rawArticle: art,
        sortOrder: 100 - index,
      })
    })

    // 2. Video Trailers
    ;(multimediaData.trailers || []).forEach((tr, index) => {
      const slug = tr.id || `video-${index}`
      if (seenSlugs.has(slug)) return
      seenSlugs.add(slug)
      const uniLower = String(tr.universe || 'anime').toLowerCase()
      const mappedUniverse = uniLower.includes('game')
        ? 'gaming'
        : uniLower.includes('movie') || uniLower.includes('spider')
        ? 'movies-tv'
        : 'anime'
      items.push({
        id: tr.id,
        slug,
        title: tr.title,
        subtitle: tr.synopsis,
        synopsis: tr.synopsis,
        universe: mappedUniverse,
        universeName: tr.universe,
        accentColor: tr.universeColor || '#38BDF8',
        contentType: 'VIDEO',
        releaseYear: String(tr.releaseYear || '2026').slice(0, 4),
        publishedAt: tr.releaseYear || '2026',
        readTime: tr.duration || '02:45',
        popularityScore: Number((tr.rating || 4.8) * 19.6).toFixed(1) * 1,
        viewCount: 185000,
        rating: Number(tr.rating || 4.9),
        thumbnail: tr.videoThumbnail,
        tags: ['4K Teasers', 'Simulcasts', 'Canon Timelines'],
        author: 'Official Studio Feed',
        rawArticle: {
          ...tr,
          slug,
          universe: mappedUniverse,
          universeName: tr.universe,
          accentColor: tr.universeColor || '#38BDF8',
          publishedAt: tr.releaseYear || '2026',
          readTime: `${tr.duration} STREAM`,
          popularityScore: 96.4,
          viewCount: 185000,
          heroImage: tr.videoThumbnail,
          tags: ['4K Teasers', 'Simulcasts', 'Canon Timelines'],
          keyTakeaways: [
            `Official ${tr.duration} high-bitrate theatrical preview (${tr.releaseYear}).`,
            `Community rating: ${tr.rating}/5.0 across ${tr.ratingsCount || 1800}+ verified votes.`,
            'Embedded YouTube & HTML5 zero-buffer playback available in the Multimedia Center.',
          ],
          sections: [
            {
              heading: '01. Visual & Frame-by-Frame Breakdown',
              paragraphs: [
                tr.synopsis,
                'Every sequence in this teaser showcases bespoke lighting direction, dynamic camera choreography, and canonical easter eggs hidden in background frames.',
              ],
              quote: `“${tr.title} sets a new benchmark for ${tr.universe} visual storytelling in 2026.”`,
            },
          ],
        },
        sortOrder: 80 - index,
      })
    })

    // 3. Audio / OST Tracks
    ;(multimediaData.audioTracks || []).forEach((tr, index) => {
      const slug = tr.id || `audio-${index}`
      if (seenSlugs.has(slug)) return
      seenSlugs.add(slug)
      items.push({
        id: tr.id,
        slug,
        title: `${tr.title} — ${tr.artist}`,
        subtitle: `Official Soundtrack & Audio Stream • ${tr.album}`,
        synopsis: `Stream "${tr.title}" by ${tr.artist} (${tr.album}). High-dynamic-range audio master with synchronized waveform telemetry.`,
        universe: 'kpop',
        universeName: tr.category || 'K-Pop & OST',
        accentColor: tr.categoryColor || '#F43F5E',
        contentType: 'AUDIO',
        releaseYear: tr.category?.includes('2025') ? '2025' : '2026',
        publishedAt: tr.album || '2026 Release',
        readTime: tr.duration || '03:15',
        popularityScore: 94.8,
        viewCount: 92000,
        rating: 4.9,
        thumbnail: tr.cover,
        tags: ['Comeback Radar', 'Theme Songs', 'Discography'],
        author: tr.artist,
        rawArticle: {
          ...tr,
          slug,
          title: `${tr.title} — ${tr.artist}`,
          universe: 'kpop',
          universeName: tr.category || 'K-Pop & OST',
          accentColor: tr.categoryColor || '#F43F5E',
          publishedAt: tr.album || '2026',
          readTime: `${tr.duration} AUDIO`,
          popularityScore: 94.8,
          viewCount: 92000,
          heroImage: tr.cover,
          synopsis: `Official audio stream and sonic production breakdown for "${tr.title}" by ${tr.artist} from ${tr.album}.`,
          tags: ['Comeback Radar', 'Theme Songs', 'Discography'],
          keyTakeaways: [
            `Performed by ${tr.artist} • Album: ${tr.album}.`,
            `Runtime: ${tr.duration} • Community Likes: ${tr.likes}.`,
            'Available for instant background playback in the Stream & Discover Audio Deck.',
          ],
          sections: [
            {
              heading: '01. Sonic Production & Arrangement Notes',
              paragraphs: [
                `"${tr.title}" blends punchy sub-bass synthesis with crisp vocal layering, anchoring ${tr.artist}'s signature sonic identity.`,
              ],
              quote: `“A defining anthem on the Fan Hub Plus soundtrack rotation.”`,
            },
          ],
        },
        sortOrder: 60 - index,
      })
    })

    // 4. Live Backend Content items
    apiContent.forEach((c, index) => {
      const slug = c.slug || `db-content-${c.id}`
      if (seenSlugs.has(slug)) return
      seenSlugs.add(slug)
      const catSlug = c.category?.slug || c.category_slug || 'anime'
      const catName = c.category?.name || c.category_name || 'Anime'
      items.push({
        id: `db-${c.id}`,
        slug,
        title: c.title,
        subtitle: c.synopsis || 'Verified Hub Database Entry',
        synopsis: c.synopsis || c.body_text || 'Verified Hub Database Entry',
        universe: catSlug,
        universeName: catName,
        accentColor: '#A3E635',
        contentType: c.content_type || 'ARTICLE',
        releaseYear: String(c.release_year || '2026').slice(0, 4),
        publishedAt: c.release_year || '2026',
        readTime: '5 MIN READ',
        popularityScore: Math.max(88, Number(c.popularity_score || 4.5) * 20),
        viewCount: Number(c.view_count || 1200),
        rating: 4.8,
        thumbnail:
          c.thumbnail_url ||
          'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1000&q=80',
        tags: ['Verified Canon', catName],
        author: c.artist_or_author || 'Hub Council',
        rawArticle: {
          id: `db-${c.id}`,
          dbId: c.id,
          slug,
          title: c.title,
          subtitle: c.synopsis,
          synopsis: c.synopsis || c.body_text,
          universe: catSlug,
          universeName: catName,
          accentColor: '#A3E635',
          author: c.artist_or_author || 'Hub Council',
          authorRole: 'Verified Database Contributor',
          publishedAt: c.release_year || '2026',
          readTime: '5 MIN READ',
          releaseYear: String(c.release_year || '2026'),
          popularityScore: Math.max(88, Number(c.popularity_score || 4.5) * 20),
          viewCount: Number(c.view_count || 1200),
          rating: 4.8,
          ratingsCount: 140,
          thumbnail:
            c.thumbnail_url ||
            'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1000&q=80',
          heroImage:
            c.thumbnail_url ||
            'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1400&q=80',
          tags: ['Verified Canon', catName],
          keyTakeaways: [
            c.synopsis || 'Indexed in the Fan Hub Plus PostgreSQL/SQLite canon repository.',
          ],
          sections: [
            {
              heading: '01. Full Archival Entry',
              paragraphs: [c.body_text || c.synopsis || c.title],
            },
          ],
        },
        sortOrder: 50 - index,
      })
    })

    return items
  }, [articles, multimediaData, apiContent])

  // Apply multi-level filters & sorting
  const filteredAndSorted = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()

    const filtered = unifiedCatalog.filter((item) => {
      const matchesCategory =
        selectedUniverse === 'all' ||
        item.universe.toLowerCase() === selectedUniverse.toLowerCase()

      const matchesType =
        selectedType === 'ALL' || item.contentType === selectedType

      const matchesGenre =
        selectedGenre === 'All Genres' ||
        item.tags.some((t) => t.toLowerCase().includes(selectedGenre.toLowerCase()))

      const matchesYear =
        selectedYear === 'All Years' ||
        String(item.releaseYear).includes(selectedYear)

      const matchesPopularity = item.popularityScore >= minPopularity

      const matchesSearch =
        q === '' ||
        item.title.toLowerCase().includes(q) ||
        (item.synopsis && item.synopsis.toLowerCase().includes(q)) ||
        item.universeName.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q))

      return (
        matchesCategory &&
        matchesType &&
        matchesGenre &&
        matchesYear &&
        matchesPopularity &&
        matchesSearch
      )
    })

    return [...filtered].sort((a, b) => {
      if (sortBy === 'popular') {
        return b.popularityScore - a.popularityScore
      }
      if (sortBy === 'latest') {
        if (b.releaseYear !== a.releaseYear) {
          return String(b.releaseYear).localeCompare(String(a.releaseYear))
        }
        return b.sortOrder - a.sortOrder
      }
      if (sortBy === 'alpha') {
        return a.title.localeCompare(b.title)
      }
      return 0
    })
  }, [
    unifiedCatalog,
    selectedUniverse,
    selectedType,
    selectedGenre,
    selectedYear,
    minPopularity,
    searchQuery,
    sortBy,
  ])

  const resetAllFilters = () => {
    onSelectUniverse?.('all')
    setSelectedType('ALL')
    setSelectedGenre('All Genres')
    setSelectedYear('All Years')
    setMinPopularity(0)
    setSortBy('popular')
    onSearchChange?.('')
  }

  const activeFilterCount =
    (selectedUniverse !== 'all' ? 1 : 0) +
    (selectedType !== 'ALL' ? 1 : 0) +
    (selectedGenre !== 'All Genres' ? 1 : 0) +
    (selectedYear !== 'All Years' ? 1 : 0) +
    (minPopularity > 0 ? 1 : 0) +
    (searchQuery.trim() !== '' ? 1 : 0)

  const displayedItems = filteredAndSorted.slice(0, visibleCount)

  return (
    <section
      id="content-explorer"
      className="py-8 sm:py-16 px-3 sm:px-6 lg:px-8 border-b-2 border-black dark:border-neutral-100 bg-[#FDFBF7] dark:bg-[#0D1117] transition-colors"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8 pb-4 sm:pb-6 border-b-2 border-black dark:border-neutral-800">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="bg-[#A3E635] text-black font-black text-[10px] sm:text-xs uppercase px-2.5 py-0.5 border-2 border-black brutal-shadow-sm">
                FANDOM CONTENT EXPLORER
              </span>
              <span className="font-mono text-[10px] sm:text-xs font-bold uppercase text-neutral-600 dark:text-neutral-400">
                MULTI-TIER FILTER & ARCHIVE
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-tight text-black dark:text-white">
              CANON LORE & MEDIA INDEX
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 font-medium text-xs sm:text-sm md:text-base mt-1 max-w-2xl">
              Filter across all 8 universes by media type, genre tags, release year, and popularity score. Click any entry to open the full Rich-Text Reader.
            </p>
          </div>

          {/* Top Controls: Toggle Filter Sidebar & Sorting Control */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setDrawerOpen((prev) => !prev)}
              className={`px-3 py-2 font-mono text-xs font-black uppercase border-2 border-black dark:border-white brutal-shadow-sm brutal-btn flex items-center gap-1.5 ${
                drawerOpen
                  ? 'bg-[#FACC15] text-black'
                  : 'bg-white dark:bg-[#161B22] text-black dark:text-white'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{drawerOpen ? 'Hide Filters' : 'Show Filters'}</span>
              {activeFilterCount > 0 && (
                <span className="px-1.5 py-0.2 bg-black text-[#FACC15] text-[10px]">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Sorting Control: Latest, Most Popular, Alphabetical */}
            <div className="flex items-center border-2 border-black dark:border-white bg-white dark:bg-[#161B22] brutal-shadow-sm">
              <span className="px-2.5 py-2 bg-neutral-100 dark:bg-neutral-800 border-r-2 border-black dark:border-white font-mono text-[10px] font-black uppercase text-black dark:text-white flex items-center gap-1">
                <ArrowUpDown className="w-3 h-3" />
                Sort
              </span>
              {[
                { id: 'popular', label: 'Most Popular' },
                { id: 'latest', label: 'Latest' },
                { id: 'alpha', label: 'A–Z' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSortBy(opt.id)}
                  className={`px-2.5 py-2 font-mono text-[10px] sm:text-xs font-black uppercase transition-colors ${
                    sortBy === opt.id
                      ? 'bg-black text-[#A3E635] dark:bg-white dark:text-black'
                      : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Explorer Layout: Multi-Level Filter Sidebar + Content Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT: Multi-Level Filter Drawer / Sidebar */}
          {drawerOpen && (
            <aside
              aria-label="Multi-level content filters"
              className="lg:col-span-3 bg-white dark:bg-[#161B22] border-3 border-black dark:border-white p-4 sm:p-5 brutal-shadow-md space-y-5"
            >
              <div className="flex items-center justify-between pb-2.5 border-b-2 border-black dark:border-neutral-700">
                <span className="font-mono text-xs font-black uppercase text-black dark:text-white flex items-center gap-1.5">
                  <Filter className="w-3.5 h-3.5 text-[#F43F5E]" />
                  <span>MULTI-LEVEL FILTERS</span>
                </span>
                {activeFilterCount > 0 && (
                  <button
                    type="button"
                    onClick={resetAllFilters}
                    className="text-[10px] font-mono font-black uppercase text-[#F43F5E] underline flex items-center gap-0.5"
                  >
                    <X className="w-3 h-3" /> Reset All
                  </button>
                )}
              </div>

              {/* 1. Keyword Search inside Explorer */}
              <div>
                <label className="block font-mono text-[10px] font-black uppercase text-neutral-500 mb-1.5">
                  1. Keyword Search
                </label>
                <div className="flex items-center border-2 border-black dark:border-white px-2.5 py-1.5 bg-neutral-50 dark:bg-[#0D1117]">
                  <Search className="w-3.5 h-3.5 text-neutral-500 mr-1.5 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange?.(e.target.value)}
                    placeholder="Title, character, tag..."
                    className="w-full bg-transparent text-xs font-bold text-black dark:text-white focus:outline-none"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => onSearchChange?.('')}
                      aria-label="Clear search query"
                    >
                      <X className="w-3.5 h-3.5 text-neutral-500" />
                    </button>
                  )}
                </div>
              </div>

              {/* 2. Content Type Filter */}
              <div>
                <label className="block font-mono text-[10px] font-black uppercase text-neutral-500 mb-1.5">
                  2. Media / Content Type
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {['ALL', 'ARTICLE', 'VIDEO', 'AUDIO', 'IMAGE'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setSelectedType(type)}
                      className={`px-2 py-1.5 font-mono text-[10px] font-black uppercase border-2 border-black dark:border-neutral-600 text-left truncate ${
                        selectedType === type
                          ? 'bg-[#A3E635] text-black font-black brutal-shadow-sm'
                          : 'bg-neutral-50 dark:bg-[#0D1117] text-neutral-700 dark:text-neutral-300'
                      }`}
                    >
                      {type === 'ALL' ? '★ All Types' : type}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Fandom Category Filter */}
              <div>
                <label className="block font-mono text-[10px] font-black uppercase text-neutral-500 mb-1.5">
                  3. Fandom Category (8 Silos)
                </label>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => onSelectUniverse?.('all')}
                    className={`px-2 py-1 font-mono text-[10px] font-black uppercase border border-black ${
                      selectedUniverse === 'all'
                        ? 'bg-black text-[#FACC15] dark:bg-white dark:text-black'
                        : 'bg-neutral-100 dark:bg-[#0D1117] text-neutral-700 dark:text-neutral-300'
                    }`}
                  >
                    All (8)
                  </button>
                  {universes.map((u) => (
                    <button
                      key={u.id}
                      type="button"
                      onClick={() => onSelectUniverse?.(u.id)}
                      className={`px-2 py-1 font-mono text-[10px] font-black uppercase border border-black ${
                        selectedUniverse === u.id
                          ? 'bg-[#FACC15] text-black brutal-shadow-sm'
                          : 'bg-neutral-100 dark:bg-[#0D1117] text-neutral-700 dark:text-neutral-300'
                      }`}
                    >
                      {u.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Genre / Canon Tag Filter */}
              <div>
                <label className="block font-mono text-[10px] font-black uppercase text-neutral-500 mb-1.5">
                  4. Genre / Canon Tag
                </label>
                <select
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                  className="w-full border-2 border-black dark:border-white p-2 text-xs font-bold bg-neutral-50 dark:bg-[#0D1117] text-black dark:text-white focus:outline-none"
                >
                  {GENRE_OPTIONS.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>

              {/* 5. Release Year Filter */}
              <div>
                <label className="block font-mono text-[10px] font-black uppercase text-neutral-500 mb-1.5">
                  5. Release Year
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {YEAR_OPTIONS.map((yr) => (
                    <button
                      key={yr}
                      type="button"
                      onClick={() => setSelectedYear(yr)}
                      className={`px-2 py-1 font-mono text-[10px] font-black uppercase border border-black ${
                        selectedYear === yr
                          ? 'bg-[#38BDF8] text-black brutal-shadow-sm'
                          : 'bg-neutral-100 dark:bg-[#0D1117] text-neutral-700 dark:text-neutral-300'
                      }`}
                    >
                      {yr}
                    </button>
                  ))}
                </div>
              </div>

              {/* 6. Minimum Popularity Filter */}
              <div>
                <label className="block font-mono text-[10px] font-black uppercase text-neutral-500 mb-1.5">
                  6. Popularity Threshold
                </label>
                <div className="space-y-1">
                  {POPULARITY_OPTIONS.map((pop) => (
                    <button
                      key={pop.value}
                      type="button"
                      onClick={() => setMinPopularity(pop.value)}
                      className={`w-full px-2.5 py-1.5 font-mono text-[10px] font-black uppercase border border-black text-left flex items-center justify-between ${
                        minPopularity === pop.value
                          ? 'bg-[#F43F5E] text-white'
                          : 'bg-neutral-50 dark:bg-[#0D1117] text-neutral-700 dark:text-neutral-300'
                      }`}
                    >
                      <span>{pop.label}</span>
                      {minPopularity === pop.value && <span>✓</span>}
                    </button>
                  ))}
                </div>
              </div>
            </aside>
          )}

          {/* RIGHT: Content Card Grid */}
          <div className={drawerOpen ? 'lg:col-span-9' : 'lg:col-span-12'}>
            {/* Active Results Counter Bar */}
            <div className="mb-4 p-3 bg-white dark:bg-[#161B22] border-2 border-black dark:border-neutral-700 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="font-black uppercase text-black dark:text-white">
                  Showing {displayedItems.length} of {filteredAndSorted.length} Indexed Entries
                </span>
                {selectedUniverse !== 'all' && (
                  <span className="px-2 py-0.5 bg-[#FACC15] text-black font-black uppercase border border-black text-[10px]">
                    Universe: {selectedUniverse}
                  </span>
                )}
                {selectedType !== 'ALL' && (
                  <span className="px-2 py-0.5 bg-[#38BDF8] text-black font-black uppercase border border-black text-[10px]">
                    Type: {selectedType}
                  </span>
                )}
              </div>
              <span className="text-[11px] text-neutral-500 uppercase font-bold">
                Click any card to open Single Content Detail & Rich-Text Reader
              </span>
            </div>

            {isLoading ? (
              <BrutalGridSkeleton
                count={6}
                columns={
                  drawerOpen
                    ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
                    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                }
              />
            ) : filteredAndSorted.length === 0 ? (
              <div className="bg-white dark:bg-[#161B22] border-3 border-black dark:border-white p-10 text-center brutal-shadow-md">
                <h3 className="font-black text-xl uppercase text-black dark:text-white mb-2">
                  No matching entries in the Content Explorer
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-md mx-auto mb-4">
                  Try relaxing your genre, release year, or popularity threshold filters to reveal more multiverse entries.
                </p>
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="px-4 py-2 bg-[#FACC15] text-black font-black text-xs uppercase border-2 border-black brutal-shadow brutal-btn"
                >
                  Reset All Explorer Filters
                </button>
              </div>
            ) : (
              <>
                <div
                  className={`grid gap-5 ${
                    drawerOpen
                      ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
                      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                  }`}
                >
                  {displayedItems.map((item) => {
                    const typeInfo =
                      CONTENT_TYPE_CONFIG[item.contentType] || CONTENT_TYPE_CONFIG.ARTICLE
                    const TypeIcon = typeInfo.icon
                    const isBookmarked = !!bookmarkedItems[item.slug] || !!bookmarkedItems[item.id]

                    return (
                      <article
                        key={item.slug}
                        className="group bg-white dark:bg-[#161B22] border-3 border-black dark:border-white p-4 flex flex-col justify-between brutal-shadow-md hover:-translate-y-1 transition-transform relative"
                      >
                        {/* Top Accent Strip */}
                        <div
                          className="absolute -top-1.5 left-3 right-3 h-1.5 border-t-2 border-x-2 border-black"
                          style={{ backgroundColor: item.accentColor }}
                        />

                        <div>
                          {/* Header Badges: Fandom Tag + Media Type Icon + Quick Bookmark */}
                          <div className="flex items-center justify-between gap-1.5 mb-3">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span
                                className="font-mono text-[10px] font-black uppercase px-2 py-0.5 border border-black text-black"
                                style={{ backgroundColor: item.accentColor }}
                              >
                                {item.universeName}
                              </span>
                              <span
                                className={`font-mono text-[10px] font-black uppercase px-2 py-0.5 border border-black flex items-center gap-1 ${typeInfo.bg}`}
                              >
                                <TypeIcon className="w-3 h-3" />
                                <span>{item.contentType}</span>
                              </span>
                            </div>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleBookmark?.(
                                  item.slug,
                                  item.title,
                                  item.contentType === 'VIDEO'
                                    ? '4K Trailer'
                                    : item.contentType === 'AUDIO'
                                    ? 'Audio Track'
                                    : 'Featured Article',
                                  {
                                    category_name: item.universeName,
                                    thumbnail_url: item.thumbnail,
                                  }
                                )
                              }}
                              className={`p-1.5 border-2 border-black dark:border-white brutal-shadow-sm brutal-btn ${
                                isBookmarked
                                  ? 'bg-[#F43F5E] text-white'
                                  : 'bg-white dark:bg-[#0D1117] text-black dark:text-white'
                              }`}
                              aria-label={
                                isBookmarked
                                  ? `Remove ${item.title} from bookmarks`
                                  : `Bookmark ${item.title}`
                              }
                              title={isBookmarked ? 'Saved in Vault' : 'Quick Bookmark'}
                            >
                              <Bookmark
                                className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`}
                              />
                            </button>
                          </div>

                          {/* Thumbnail */}
                          <div
                            onClick={() => {
                              onRecordActivity?.({
                                action_type: 'VIEW_ARTICLE',
                                target_title: item.title,
                                category_name: item.universeName,
                              })
                              openArticleHandler?.(item.rawArticle || item)
                            }}
                            className="relative aspect-16/10 w-full mb-3 border-2 border-black overflow-hidden bg-neutral-900 cursor-pointer"
                          >
                            <img
                              src={item.thumbnail}
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute bottom-1.5 left-1.5 right-1.5 flex items-center justify-between gap-1">
                              <span className="px-1.5 py-0.5 bg-black/85 text-[#FACC15] font-mono text-[10px] font-black border border-white/30 flex items-center gap-1">
                                <Star className="w-3 h-3 fill-[#FACC15]" />
                                {item.popularityScore} POP
                              </span>
                              <span className="px-1.5 py-0.5 bg-black/85 text-white font-mono text-[10px] font-bold border border-white/30 flex items-center gap-1">
                                <Clock className="w-3 h-3 text-[#A3E635]" />
                                {item.releaseYear}
                              </span>
                            </div>
                          </div>

                          {/* Title & Synopsis */}
                          <h3
                            onClick={() => {
                              onRecordActivity?.({
                                action_type: 'VIEW_ARTICLE',
                                target_title: item.title,
                                category_name: item.universeName,
                              })
                              openArticleHandler?.(item.rawArticle || item)
                            }}
                            className="font-black text-base sm:text-lg uppercase tracking-tight text-black dark:text-white leading-snug mb-1.5 cursor-pointer hover:underline line-clamp-2"
                          >
                            {item.title}
                          </h3>
                          <p className="text-xs text-neutral-700 dark:text-neutral-300 font-medium leading-relaxed line-clamp-3 mb-3">
                            {item.synopsis}
                          </p>
                        </div>

                        {/* Footer: Tags + Inspect Detail CTA */}
                        <div className="pt-2.5 border-t-2 border-black/10 dark:border-neutral-800 space-y-2.5">
                          <div className="flex flex-wrap gap-1">
                            {item.tags.slice(0, 3).map((tag, idx) => (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => setSelectedGenre(tag)}
                                className="text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 border border-black dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:bg-[#FACC15] hover:text-black"
                              >
                                #{tag}
                              </button>
                            ))}
                          </div>

                          <div className="flex items-center justify-between gap-2">
                            <span className="font-mono text-[10px] font-bold text-neutral-500 flex items-center gap-1">
                              <Eye className="w-3 h-3 text-[#38BDF8]" />
                              {(item.viewCount / 1000).toFixed(1)}k • {item.readTime}
                            </span>

                            <button
                              type="button"
                              onClick={() => {
                                onRecordActivity?.({
                                  action_type: 'VIEW_ARTICLE',
                                  target_title: item.title,
                                  category_name: item.universeName,
                                })
                                openArticleHandler?.(item.rawArticle || item)
                              }}
                              className="px-3 py-1.5 bg-black text-[#A3E635] dark:bg-white dark:text-black font-mono font-black text-[10px] uppercase border-2 border-black brutal-shadow-sm brutal-btn flex items-center gap-1"
                            >
                              <span>Read Dossier</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </article>
                    )
                  })}
                </div>

                {/* Load More Pagination Control */}
                {visibleCount < filteredAndSorted.length && (
                  <div className="mt-8 text-center">
                    <button
                      type="button"
                      onClick={() => setVisibleCount((prev) => prev + 6)}
                      className="px-6 py-3 bg-[#FACC15] text-black font-black text-xs sm:text-sm uppercase tracking-tight border-2 border-black brutal-shadow brutal-btn"
                    >
                      Load More Canon Entries ({filteredAndSorted.length - visibleCount} Remaining)
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
