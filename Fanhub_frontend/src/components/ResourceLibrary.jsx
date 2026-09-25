import { useEffect, useMemo, useState } from 'react'
import { Bookmark, Calendar, Eye, Filter, Flame, Package, Sparkles, TrendingUp } from 'lucide-react'
import { merchandiseApi } from '../services/api'
import MediaSpinner from './MediaSpinner'
import { UPCOMING_RELEASES } from '../data/fandomData'

const CATEGORIES = [
  { slug: 'all', name: 'All fandoms', color: '#FACC15' },
  { slug: 'anime', name: 'Anime', color: '#A3E635' },
  { slug: 'gaming', name: 'Gaming', color: '#FACC15' },
  { slug: 'movies-tv', name: 'Movies & TV', color: '#38BDF8' },
  { slug: 'comics', name: 'Comics', color: '#FB7185' },
  { slug: 'manga', name: 'Manga', color: '#FB923C' },
  { slug: 'cosplay', name: 'Cosplay', color: '#C084FC' },
]

const TAGS = ['LIMITED_EDITION', 'PRE_ORDER', 'COLLECTIBLE', 'OFFICIAL_LICENSED']

const FALLBACK_GALLERY = [
  'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=900&q=80',
]

const tagStyles = {
  LIMITED_EDITION: 'bg-[#FB7185] text-black',
  PRE_ORDER: 'bg-[#FACC15] text-black',
  COLLECTIBLE: 'bg-[#A3E635] text-black',
  OFFICIAL_LICENSED: 'bg-[#34D399] text-black',
}

function normalizeItem(item, fallback = {}) {
  const category = item.category?.slug || item.category_slug || fallback.universeSlug || 'anime'
  return {
    id: item.id || item.slug || fallback.id,
    slug: item.slug || fallback.slug || item.id || fallback.id,
    title: item.name || item.title || fallback.title,
    category,
    categoryName: item.category?.name || fallback.universe || category,
    categoryColor: item.category?.accent_color || fallback.universeColor || '#A3E635',
    image: item.image_url || item.image || fallback.image,
    gallery: item.gallery || fallback.gallery || [fallback.image, ...FALLBACK_GALLERY].filter(Boolean).slice(0, 3),
    tag: item.tag || fallback.statusTag || 'COLLECTIBLE',
    tagDisplay: item.tag_display || fallback.statusTag || 'Collectible',
    dropDate: item.drop_date_text || fallback.dropDate || 'Release date to be announced',
    msrp: item.msrp || fallback.msrp || 'MSRP preview',
    manufacturer: item.manufacturer || fallback.manufacturer || 'Official partner',
    description: item.description || fallback.description || 'A curated release from the Fan Hub partner network.',
    viewCount: Number(item.view_count ?? fallback.viewCountNum ?? 0),
    popularity: Number(item.popularity_score ?? fallback.popularity ?? 0),
    isUpcoming: item.is_upcoming ?? true,
  }
}

export default function ResourceLibrary({ merchDrops = [], bookmarkedItems = {}, toggleBookmark, onRecordActivity }) {
  const [items, setItems] = useState(() => merchDrops.map((item) => normalizeItem(item)))
  const [upcomingMerch, setUpcomingMerch] = useState([])
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeTag, setActiveTag] = useState('all')
  const [activeReleaseType, setActiveReleaseType] = useState('All')
  const [selectedGallery, setSelectedGallery] = useState({})
  const [viewCounts, setViewCounts] = useState({})
  const [activeTab, setActiveTab] = useState('showcase')
  const [page, setPage] = useState(1)
  const [serverPage, setServerPage] = useState(1)
  const [serverTotalPages, setServerTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    Promise.all([
      merchandiseApi.getItems({ category: activeCategory, tag: activeTag, page: serverPage, pageSize: 50 }),
      merchandiseApi.getUpcoming(),
    ])
      .then(([response, upcomingResponse]) => {
        if (!mounted) return
        const results = Array.isArray(response) ? response : response?.results
        const count = Array.isArray(response) ? response.length : response?.count
        if (Array.isArray(results)) {
          const normalized = results.map((item) => normalizeItem(item))
          setItems((prev) => serverPage === 1 ? normalized : [...prev, ...normalized])
          setServerTotalPages(Math.max(1, Math.ceil((count || results.length) / 50)))
        }
        if (Array.isArray(upcomingResponse)) {
          setUpcomingMerch(upcomingResponse.map((item) => normalizeItem(item)))
        }
      })
      .catch(() => {})
      .finally(() => { if (mounted) setIsLoading(false) })
    return () => { mounted = false }
  }, [activeCategory, activeTag, serverPage])

  const tags = ['all', ...TAGS]
  const groupedItemsByCategory = useMemo(() => {
    const groups = {}
    items.forEach((item) => {
      groups[item.category] = groups[item.category] || []
      groups[item.category].push(item)
    })
    const order = CATEGORIES.map((category) => category.slug)
    return Object.keys(groups)
      .sort((a, b) => order.indexOf(a) - order.indexOf(b))
      .map((category) => [category, groups[category]])
  }, [items])
  const pagedGroups = useMemo(() => {
    const pages = []
    let current = []
    let currentSize = 0
    groupedItemsByCategory.forEach((group) => {
      const groupSize = group[1].length
      if (current.length > 0 && currentSize + groupSize > 10) {
        pages.push(current)
        current = []
        currentSize = 0
      }
      current.push(group)
      currentSize += groupSize
    })
    if (current.length > 0) pages.push(current)
    return pages
  }, [groupedItemsByCategory])
  const localTotalPages = Math.max(1, pagedGroups.length)
  const visibleItems = pagedGroups[page - 1]?.flatMap((group) => group[1]) || []
  const groupedItems = useMemo(() => Object.fromEntries(pagedGroups[page - 1] || []), [pagedGroups, page])
  const releaseItems = useMemo(() => [
    ...UPCOMING_RELEASES,
    ...upcomingMerch.map((item) => ({
      id: `backend-release-${item.slug}`,
      type: 'Merchandise',
      category: item.category,
      title: item.title,
      studio: item.manufacturer,
      date: item.dropDate,
      status: item.tagDisplay,
      image: item.image,
      description: item.description,
    })),
  ], [upcomingMerch])
  const releaseTypes = ['All', ...new Set(releaseItems.map((release) => release.type))]
  const visibleReleases = releaseItems.filter((release) => activeReleaseType === 'All' || release.type === activeReleaseType)

  const trackItem = (item) => {
    const current = viewCounts[item.slug] ?? item.viewCount
    setViewCounts((prev) => ({ ...prev, [item.slug]: current + 1 }))
    merchandiseApi.trackView(item.slug).catch(() => {})
    onRecordActivity?.({ action_type: 'VIEW_MERCH', target_title: item.title, category_name: item.categoryName })
  }

  const selectGallery = (item, image) => {
    setSelectedGallery((prev) => ({ ...prev, [item.slug]: image }))
  }

  return (
    <section id="merch" className="py-8 sm:py-16 px-3 sm:px-6 lg:px-8 border-b-2 border-black dark:border-neutral-100 bg-[#FDFBF7] dark:bg-[#0D1117] transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6 border-b-2 border-black dark:border-neutral-800 pb-5">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="bg-[#F43F5E] text-white font-black text-xs uppercase px-2.5 py-1 border-2 border-black brutal-shadow-sm">MERCH + RESOURCE LIBRARY</span>
              <span className="font-mono text-xs font-bold uppercase text-neutral-500">BACKEND-CURATED DISCOVERY</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-black dark:text-white">COLLECTOR&apos;S VAULT</h2>
            <p className="text-neutral-700 dark:text-neutral-300 font-medium text-sm mt-1">Browse image galleries by fandom, filter official tags, and scout what drops next.</p>
          </div>
          <div className="flex border-2 border-black dark:border-white brutal-shadow-sm">
            {[['showcase', 'Merchandise'], ['releases', 'Upcoming releases']].map(([tab, label]) => (
              <button key={tab} type="button" onClick={() => setActiveTab(tab)} className={`px-3 py-2 font-mono text-xs font-black uppercase ${activeTab === tab ? 'bg-[#A3E635] text-black' : 'bg-white dark:bg-[#161B22] text-black dark:text-white'}`}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'showcase' ? (
          <>
            <div className="flex flex-col gap-3 mb-6">
              <div className="flex items-center gap-2 font-mono text-xs font-black uppercase text-neutral-500"><Filter className="w-4 h-4" /> Filter gallery</div>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((category) => (
                  <button key={category.slug} type="button" onClick={() => { setIsLoading(true); setActiveCategory(category.slug); setPage(1); setServerPage(1); setItems([]) }} className={`px-3 py-1.5 font-mono text-[11px] font-black uppercase border-2 border-black dark:border-white ${activeCategory === category.slug ? 'text-black' : 'bg-white dark:bg-[#161B22] text-neutral-600 dark:text-neutral-300'}`} style={activeCategory === category.slug ? { backgroundColor: category.color } : undefined}>
                    {category.name}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="font-mono text-[10px] font-black uppercase text-neutral-500">Tags:</span>
                {tags.map((tag) => (
                  <button key={tag} type="button" onClick={() => { setIsLoading(true); setActiveTag(tag); setPage(1); setServerPage(1); setItems([]) }} className={`px-2 py-1 font-mono text-[10px] font-bold uppercase border border-black dark:border-neutral-600 ${activeTag === tag ? 'bg-black text-white dark:bg-white dark:text-black' : 'text-neutral-600 dark:text-neutral-300'}`}>
                    {tag === 'all' ? 'All tags' : tag.replaceAll('_', ' ')}
                  </button>
                ))}
              </div>
            </div>
            {Object.keys(groupedItems).length === 0 ? (
              <div className="p-8 text-center border-2 border-dashed border-neutral-400 font-mono text-sm font-bold uppercase">No items match these filters.</div>
            ) : (
              <>
              <div className="space-y-8">
                {Object.entries(groupedItems).map(([category, categoryItems]) => {
                  const categoryMeta = CATEGORIES.find((entry) => entry.slug === category) || CATEGORIES[0]
                  return (
                    <div key={category}>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-3 h-3 border-2 border-black" style={{ backgroundColor: categoryMeta.color }} />
                        <h3 className="font-black uppercase text-xl text-black dark:text-white">{categoryMeta.name}</h3>
                        <span className="font-mono text-xs text-neutral-500">{categoryItems.length} showcase items</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                        {categoryItems.map((item) => {
                          const activeImage = selectedGallery[item.slug] || item.image
                          const currentViews = viewCounts[item.slug] ?? item.viewCount
                          const isBookmarked = !!bookmarkedItems[item.slug]
                          return (
                            <article key={item.slug} className="bg-white dark:bg-[#161B22] border-3 border-black dark:border-white brutal-shadow-md overflow-hidden">
                              <button type="button" onClick={() => trackItem(item)} className="block w-full text-left">
                                <div className="relative aspect-4/3 overflow-hidden bg-neutral-100 dark:bg-neutral-800 border-b-2 border-black dark:border-white">
                                  <img src={activeImage} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition-transform" />
                                  <span className="absolute top-2 left-2 font-mono text-[10px] font-black uppercase px-2 py-1 border-2 border-black text-black" style={{ backgroundColor: item.categoryColor }}>{item.categoryName}</span>
                                  <span className="absolute bottom-2 right-2 bg-black/85 text-white font-mono text-[10px] font-bold px-2 py-1 flex items-center gap-1"><Eye className="w-3 h-3 text-[#38BDF8]" /> {currentViews.toLocaleString()} views</span>
                                </div>
                              </button>
                              <div className="p-4">
                                <div className="flex items-start justify-between gap-2 mb-2">
                                  <div className="min-w-0">
                                    <span className={`inline-block font-mono text-[10px] font-black uppercase px-2 py-1 border-2 border-black ${tagStyles[item.tag] || 'bg-[#FACC15] text-black'}`}>{item.tagDisplay}</span>
                                    <h4 className="font-black uppercase text-lg leading-tight mt-2 text-black dark:text-white">{item.title}</h4>
                                    <p className="font-mono text-[10px] font-bold uppercase text-neutral-500 mt-1">{item.manufacturer}</p>
                                  </div>
                                  <button type="button" onClick={() => toggleBookmark?.(item.slug, item.title, 'Merchandise Item', { category_name: item.categoryName, thumbnail_url: item.image })} className={`p-1.5 border-2 border-black dark:border-white brutal-shadow-sm brutal-btn ${isBookmarked ? 'bg-[#F43F5E] text-white' : 'bg-white dark:bg-[#0D1117] text-black dark:text-white'}`} aria-label={`Bookmark ${item.title}`}><Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} /></button>
                                </div>
                                <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed mb-3">{item.description}</p>
                                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono mb-3">
                                  <div className="p-2 bg-neutral-100 dark:bg-[#0D1117] border border-black dark:border-neutral-700"><span className="block text-neutral-500 font-bold uppercase">Drop</span><span className="font-black text-black dark:text-white">{item.dropDate}</span></div>
                                  <div className="p-2 bg-neutral-100 dark:bg-[#0D1117] border border-black dark:border-neutral-700"><span className="block text-neutral-500 font-bold uppercase">Popularity</span><span className="font-black text-black dark:text-white">{item.popularity ? `${item.popularity}/5` : 'Tracking views'}</span></div>
                                </div>
                                <div className="flex gap-1.5 mb-3" aria-label="Image gallery">
                                  {item.gallery.slice(0, 3).map((image, index) => <button key={`${item.slug}-${index}`} type="button" onClick={() => selectGallery(item, image)} className={`w-10 h-10 border-2 ${activeImage === image ? 'border-[#F43F5E]' : 'border-black dark:border-white'}`}><img src={image} alt="" className="w-full h-full object-cover" /></button>)}
                                </div>
                                <button type="button" onClick={() => trackItem(item)} className="w-full py-2 bg-[#A3E635] text-black border-2 border-black font-black text-xs uppercase brutal-shadow-sm brutal-btn flex items-center justify-center gap-1.5"><TrendingUp className="w-4 h-4" /> Track popularity</button>
                              </div>
                            </article>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 mt-6 pt-4 border-t-2 border-black dark:border-neutral-800">
                {isLoading && <div className="w-8 h-8"><MediaSpinner size={32} /></div>}
                <span className="font-mono text-[10px] font-black uppercase text-neutral-500">Showing {visibleItems.length ? (page - 1) * 10 + 1 : 0}-{Math.min(page * 10, items.length)} of {items.length} loaded • grouped by fandom</span>
                <div className="flex items-center gap-2">
                  <button type="button" disabled={page <= 1 || isLoading} onClick={() => setPage((prev) => Math.max(1, prev - 1))} className="px-3 py-1.5 border-2 border-black dark:border-white font-mono text-xs font-black uppercase disabled:opacity-40">Previous</button>
                  <span className="font-mono text-xs font-black">Page {page} / {localTotalPages}</span>
                  <button type="button" disabled={isLoading || (page >= localTotalPages && serverPage >= serverTotalPages)} onClick={() => { if (page < localTotalPages) setPage((prev) => prev + 1); else { setIsLoading(true); setPage((prev) => prev + 1); setServerPage((prev) => prev + 1) } }} className="px-3 py-1.5 border-2 border-black dark:border-white font-mono text-xs font-black uppercase disabled:opacity-40">Next</button>
                </div>
              </div>
              </>
            )}
          </>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-4"><Sparkles className="w-5 h-5 text-[#F43F5E]" /><span className="font-mono text-xs font-black uppercase">Anticipated drops across the multiverse</span></div>
            <div className="flex flex-wrap gap-2 mb-6">
              {releaseTypes.map((type) => <button key={type} type="button" onClick={() => setActiveReleaseType(type)} className={`px-3 py-1.5 font-mono text-[11px] font-black uppercase border-2 border-black dark:border-white ${activeReleaseType === type ? 'bg-[#38BDF8] text-black' : 'bg-white dark:bg-[#161B22] text-neutral-600 dark:text-neutral-300'}`}>{type}</button>)}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {visibleReleases.map((release) => <article key={release.id} className="bg-white dark:bg-[#161B22] border-3 border-black dark:border-white brutal-shadow-sm overflow-hidden"><div className="relative aspect-video bg-neutral-100 dark:bg-neutral-800"><img src={release.image} alt={release.title} className="w-full h-full object-cover" /><span className="absolute top-2 left-2 bg-[#38BDF8] text-black border-2 border-black px-2 py-1 font-mono text-[10px] font-black uppercase">{release.type}</span></div><div className="p-4"><div className="flex items-center gap-1.5 font-mono text-[10px] font-black uppercase text-neutral-500"><Calendar className="w-3.5 h-3.5" /> {release.date} • {release.status}</div><h3 className="font-black uppercase text-lg mt-2 text-black dark:text-white">{release.title}</h3><p className="font-mono text-[10px] font-bold uppercase text-neutral-500 mt-1">{release.studio}</p><p className="text-xs text-neutral-700 dark:text-neutral-300 mt-3 leading-relaxed">{release.description}</p><div className="mt-4 flex items-center gap-1.5 font-mono text-[10px] font-black uppercase text-[#10B981]"><Flame className="w-3.5 h-3.5" /> Watchlist this release</div></div></article>)}
            </div>
            <div className="mt-6 p-4 border-2 border-black dark:border-white bg-[#FACC15] text-black flex items-center gap-2 brutal-shadow-sm"><Package className="w-5 h-5" /><span className="font-mono text-xs font-black uppercase">Merchandise drops sync automatically from the admin catalog.</span></div>
          </div>
        )}
      </div>
    </section>
  )
}
