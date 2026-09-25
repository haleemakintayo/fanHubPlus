import { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import { ArrowLeft, Upload, MessageSquarePlus, ShieldAlert, LayoutDashboard } from 'lucide-react'
import Header from './components/Header'
import Hero from './components/Hero'
import UniverseMatrix from './components/UniverseMatrix'
import MultimediaCenter from './components/MultimediaCenter'
import CharacterArchive from './components/CharacterArchive'
import ResourceLibrary from './components/ResourceLibrary'
import ConventionRadar from './components/ConventionRadar'
import FandomBot from './components/FandomBot'
import Footer from './components/Footer'
import Modals from './components/Modals'
import Toast from './components/Toast'
import Dashboard from './components/Dashboard'
import Admin from './components/Admin'
import UniversePage from './components/UniversePage'
import ArticlePage from './components/ArticlePage'
import AboutPage from './components/AboutPage'
import { interactionsApi, adminApi, getAuthToken } from './services/api'

import {
  UNIVERSES,
  ARTICLES_DATA,
  MULTIMEDIA_DATA,
  CHARACTERS_DATA,
  MERCH_DROPS,
  CONVENTIONS_DATA,
  FANDOM_BOT_QA,
  getArticleBySlugOrTopic
} from './data/fandomData'

const TYPE_TO_BACKEND_ENUM = {
  Article: 'ARTICLE',
  'Featured Article': 'ARTICLE',
  'Character Lore': 'CHARACTER',
  'Character Profile': 'CHARACTER',
  '4K Trailer': 'VIDEO',
  'Video / Trailer': 'VIDEO',
  'Audio Track': 'AUDIO',
  'Merchandise Item': 'MERCHANDISE',
  ARTICLE: 'ARTICLE',
  CHARACTER: 'CHARACTER',
  VIDEO: 'VIDEO',
  AUDIO: 'AUDIO',
  MERCHANDISE: 'MERCHANDISE',
}

function parseRouteFromLocation() {
  if (typeof window === 'undefined') return { page: 'home', slug: null }
  const path = window.location.pathname
  const lowerPath = path.toLowerCase()
  const hash = window.location.hash.toLowerCase()

  if (lowerPath.startsWith('/universe/')) {
    const slug = decodeURIComponent(path.slice('/universe/'.length).replace(/\/+$/, ''))
    return { page: 'universe', slug: slug || 'anime' }
  }
   if (lowerPath.startsWith('/article/')) {
    const slug = decodeURIComponent(path.slice('/article/'.length).replace(/\/+$/, ''))
    return { page: 'article', slug: slug || ARTICLES_DATA[0]?.slug }
  }
  if (lowerPath === '/about' || lowerPath === '/about/') {
    return { page: 'about', slug: null }
  }
  if (lowerPath.startsWith('/dashboard') || hash === '#dashboard' || hash === '#/dashboard') {
    return { page: 'dashboard', slug: null }
  }
  if (lowerPath.startsWith('/admin') || hash === '#admin' || hash === '#/admin') {
    return { page: 'admin', slug: null }
  }
  return { page: 'home', slug: null }
}

export default function App() {
  // Dedicated Page Routing State ('home' | 'universe' | 'article' | 'dashboard' | 'admin')
  const initialRoute = useMemo(() => parseRouteFromLocation(), [])
  const [activePage, setActivePage] = useState(initialRoute.page)
  const [activeUniverseSlug, setActiveUniverseSlug] = useState(
    initialRoute.page === 'universe' ? initialRoute.slug : 'anime'
  )
  const [activeArticleSlug, setActiveArticleSlug] = useState(
    initialRoute.page === 'article' ? initialRoute.slug : ARTICLES_DATA[0]?.slug
  )
  const [adminInitialSection, setAdminInitialSection] = useState('analytics')

  // Theme Switching State - Default to crisp Pop-Brutalist Light Mode
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('fanhub_theme')
      if (savedTheme) return savedTheme === 'dark'
      return true 
    }
    return true
  })

  // Font Scaling State: 'normal' vs 'large'
  const [fontScale, setFontScale] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('fanhub_font_scale') || 'normal'
    }
    return 'normal'
  })

  // Search & Category Filtering State
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedUniverse, setSelectedUniverse] = useState('all')
  const [homeCharacters, setHomeCharacters] = useState(CHARACTERS_DATA)

  // Toast Notification State
  const [toasts, setToasts] = useState([])

  // Bookmarking State (supports articles, character profiles, videos, and merchandise with personal notes)
  const [bookmarkedItems, setBookmarkedItems] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('fanhub_bookmarks')
        if (saved) return JSON.parse(saved)
      } catch {
        // ignore
      }
    }
    return {
      'char-satoru-gojo': {
        title: 'Satoru Gojo',
        type: 'Character Lore',
        category_name: 'Anime',
        date: new Date().toLocaleDateString(),
        note: 'Compare Six Eyes Infinity stamina mechanics with Sukuna Domain amplification.',
      },
      'gta6-vice-city': {
        title: 'GTA VI: Return to Vice City (4K Breakdown)',
        type: '4K Trailer',
        category_name: 'Gaming',
        date: new Date().toLocaleDateString(),
        note: 'Pause at 01:14 to inspect volumetric neon reflections along Ocean Beach.',
      },
      'merch-malenia-arm': {
        title: 'Malenia Prosthetic Arm 1:1 Life-Size Replica',
        type: 'Merchandise Item',
        category_name: 'Gaming',
        date: new Date().toLocaleDateString(),
        note: 'Limited 1,500 piece PureArts run — pre-order opens Q3.',
      },
      'article-anime-0': {
        title: 'Jujutsu Kaisen Culling Game Arc Breakdown',
        type: 'Featured Article',
        category_name: 'Anime',
        date: new Date().toLocaleDateString(),
        note: 'Essential barrier rule summary for colony points transfer.',
      },
    }
  })

  // Recent Activity Stream State
  const [recentActivities, setRecentActivities] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('fanhub_recent_activities')
        if (saved) return JSON.parse(saved)
      } catch {
        // ignore
      }
    }
    return [
      {
        id: 'act-init-1',
        action_type: 'BOOKMARK',
        action_label: 'Bookmarked Item',
        target_title: 'Satoru Gojo (Character Lore)',
        category_name: 'Anime',
        timestamp: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
      },
      {
        id: 'act-init-2',
        action_type: 'WATCH_MEDIA',
        action_label: 'Watched / Listened to Media',
        target_title: 'GTA VI: Return to Vice City (4K Breakdown)',
        category_name: 'Gaming',
        timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
      },
      {
        id: 'act-init-3',
        action_type: 'VIEW_MERCH',
        action_label: 'Inspected Merchandise Drop',
        target_title: 'Malenia Prosthetic Arm 1:1 Life-Size Replica',
        category_name: 'Gaming',
        timestamp: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
      },
    ]
  })

  // Modal State (for overlays: 'login' | 'register' | 'feedback' | 'submission' | 'about')
  const [activeModal, setActiveModal] = useState(null)
  const [activeLoreCharacter, setActiveLoreCharacter] = useState(null)

  // Load approved character profiles so community-approved additions appear in the home archive.
  useEffect(() => {
    let isMounted = true
    adminApi.getCharacters()
      .then((profiles) => {
        if (!isMounted || !Array.isArray(profiles) || profiles.length === 0) return
        const mappedProfiles = profiles.map((profile) => {
          const category = UNIVERSES.find((universe) => universe.slug === profile.category?.slug)
          const fallbackCharacter = CHARACTERS_DATA.find((character) => character.universe === profile.category?.name)
          const details = profile.details_json && typeof profile.details_json === 'object'
            ? profile.details_json
            : {}

          return {
            id: `character-${profile.id}`,
            name: profile.name,
            alias: profile.alias || profile.archetype || 'Community Profile',
            universe: profile.category?.name || 'Community Vault',
            accentColor: category?.accentColor || '#A3E635',
            image: profile.image_url || fallbackCharacter?.image || '',
            faction: profile.faction || 'Independent',
            origin: profile.origin || 'Unknown Origin',
            tagline: profile.tagline || profile.archetype || 'Community-submitted character profile',
            stats: Array.isArray(profile.stats_json) && profile.stats_json.length > 0
              ? profile.stats_json.map((stat) => ({
                label: stat.label || 'Attribute',
                value: stat.value,
                textValue: stat.textValue || stat.value || 'N/A',
              }))
              : [{ label: 'Profile Status', textValue: 'Community submission' }],
            details: {
              ...details,
              bio: profile.biography || details.bio || 'No biography supplied.',
            },
          }
        })
        setHomeCharacters(mappedProfiles)
      })
      .catch(() => {
        // Keep the curated static archive available when the API is unavailable.
      })

    return () => {
      isMounted = false
    }
  }, [])

  // User Ratings State (persisted in localStorage)
  const [userRatings, setUserRatings] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('fanhub_user_ratings')
        if (saved) return JSON.parse(saved)
      } catch {
        // ignore
      }
    }
    return {}
  })

  useEffect(() => {
    try {
      localStorage.setItem('fanhub_user_ratings', JSON.stringify(userRatings))
    } catch {
      // ignore
    }
  }, [userRatings])

  // Listen to browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const route = parseRouteFromLocation()
      setActivePage(route.page)
      if (route.page === 'universe' && route.slug) {
        setActiveUniverseSlug(route.slug)
      } else if (route.page === 'article' && route.slug) {
        setActiveArticleSlug(route.slug)
      }
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  // Navigate to a dedicated Category / Universe Hub Page (/universe/:slug)
  const openUniversePage = useCallback((slug) => {
    const cleanSlug = String(slug || 'anime').toLowerCase().trim()
    setActiveModal(null)
    setActiveLoreCharacter(null)
    setActiveUniverseSlug(cleanSlug)
    setActivePage('universe')
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', `/universe/${encodeURIComponent(cleanSlug)}`)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [])

  // Navigate to a dedicated Article Reader Page (/article/:slug)
  const openArticlePage = useCallback((slugOrTopic) => {
    const resolved = getArticleBySlugOrTopic(slugOrTopic)
    const targetSlug = resolved?.slug || String(slugOrTopic || '').toLowerCase().trim()
    setActiveModal(null)
    setActiveLoreCharacter(null)
    setActiveArticleSlug(targetSlug)
    setActivePage('article')
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', `/article/${encodeURIComponent(targetSlug)}`)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [])

  // Navigate between dedicated pages ('home' | 'universe' | 'article' | 'dashboard' | 'admin')
  const navigateToPage = useCallback((page, sectionHref = null) => {
    setActiveModal(null)
    setActiveLoreCharacter(null)

    if (page === 'moderation') {
      setAdminInitialSection('moderation')
      setActivePage('admin')
      if (typeof window !== 'undefined') {
        window.history.pushState({}, '', '/admin')
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      return
    }

    if (page === 'admin') {
      setAdminInitialSection('analytics')
      setActivePage('admin')
      if (typeof window !== 'undefined') {
        window.history.pushState({}, '', '/admin')
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      return
    }

    if (page === 'dashboard') {
      setActivePage('dashboard')
      if (typeof window !== 'undefined') {
        window.history.pushState({}, '', '/dashboard')
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      return
    }

    if (page === 'about') {
      setActivePage('about')
      if (typeof window !== 'undefined') {
        window.history.pushState({}, '', '/about')
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      return
    }

    // Default: 'home'
    setActivePage('home')
    if (typeof window !== 'undefined') {
      const targetUrl = sectionHref && sectionHref !== '#top' ? `/${sectionHref}` : '/'
      window.history.pushState({}, '', targetUrl)
      if (sectionHref && sectionHref !== '#top') {
        setTimeout(() => {
          const el = document.querySelector(sectionHref)
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' })
          }
        }, 60)
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
  }, [])

  // Unified handler for opening either a dedicated page ('dashboard', 'admin', 'moderation') or a modal ('login', 'register', 'feedback', 'submission', 'about')
  const handleOpenRouteOrModal = useCallback((target) => {
    if (target === 'dashboard' || target === 'admin' || target === 'moderation' || target === 'about') {
      navigateToPage(target)
    } else {
      setActiveLoreCharacter(null)
      setActiveModal(target)
    }
  }, [navigateToPage])

  // Sync Dark Mode to DOM & colorScheme
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
      document.documentElement.style.colorScheme = 'dark'
      localStorage.setItem('fanhub_theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.style.colorScheme = 'light'
      localStorage.setItem('fanhub_theme', 'light')
    }
  }, [darkMode])

  // Sync Font Scale to DOM
  useEffect(() => {
    if (fontScale === 'large') {
      document.documentElement.classList.add('font-large')
      localStorage.setItem('fanhub_font_scale', 'large')
    } else {
      document.documentElement.classList.remove('font-large')
      localStorage.setItem('fanhub_font_scale', 'normal')
    }
  }, [fontScale])

  // Sync Bookmarks to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('fanhub_bookmarks', JSON.stringify(bookmarkedItems))
    } catch {
      // ignore
    }
  }, [bookmarkedItems])

  // Sync Recent Activities to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('fanhub_recent_activities', JSON.stringify(recentActivities))
    } catch {
      // ignore
    }
  }, [recentActivities])

  const activityCounterRef = useRef(0)

  const recordActivity = useCallback(({ action_type, target_title, category_name = '', detail = '' }) => {
    if (!target_title) return
    activityCounterRef.current += 1
    const entry = {
      id: `act-${Date.now()}-${activityCounterRef.current}`,
      action_type: action_type || 'VIEW_ARTICLE',
      target_title,
      category_name,
      detail,
      timestamp: new Date().toISOString(),
    }

    setRecentActivities(prev => [entry, ...prev.slice(0, 24)])

    if (getAuthToken()) {
      interactionsApi.logActivity({
        action_type: entry.action_type,
        target_title: entry.target_title,
        category_name: entry.category_name,
        detail: entry.detail,
      }).catch(() => {
        // non-blocking telemetry
      })
    }
  }, [])

  const clearActivities = useCallback(() => {
    setRecentActivities([])
  }, [])

  const applyDisplayPreferences = useCallback(({ darkMode: nextDark, fontScale: nextFont }) => {
    if (typeof nextDark === 'boolean') {
      setDarkMode(nextDark)
    }
    if (nextFont === 'normal' || nextFont === 'large') {
      setFontScale(nextFont)
    }
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev)
    addToast({
      title: !darkMode ? 'Dark Mode Activated' : 'Light Mode Activated',
      message: !darkMode ? 'Deep Obsidian palette enabled.' : 'Cream & Canvas palette enabled.',
      type: 'info'
    })
  }

  const toggleFontScale = () => {
    const next = fontScale === 'normal' ? 'large' : 'normal'
    setFontScale(next)
    addToast({
      title: 'Font Scaler Adjusted',
      message: next === 'large' ? 'Root text size enlarged (18.5px) for enhanced readability.' : 'Root text size reset to standard (16px).',
      type: 'info'
    })
  }

  const toastCounterRef = useRef(0)

  // Toast Management
  const addToast = ({ title, message, type = 'info' }) => {
    toastCounterRef.current += 1
    const id = `toast-${toastCounterRef.current}`
    setToasts(prev => [...prev, { id, title, message, type }])
    setTimeout(() => {
      dismissToast(id)
    }, 4500)
  }

  const dismissToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }

  // Bookmark Toggle (syncs local vault + backend database)
  const toggleBookmark = (id, title, type = 'Featured Article', extra = {}) => {
    const exists = !!bookmarkedItems[id]

    setBookmarkedItems(prev => {
      const updated = { ...prev }
      if (exists) {
        delete updated[id]
      } else {
        updated[id] = {
          title,
          type,
          category_name: extra.category_name || '',
          thumbnail_url: extra.thumbnail_url || '',
          note: extra.note || '',
          date: new Date().toLocaleDateString(),
        }
      }
      return updated
    })

    if (getAuthToken()) {
      interactionsApi.toggleBookmark({
        external_id: String(id),
        item_title: title,
        item_type: TYPE_TO_BACKEND_ENUM[type] || 'ARTICLE',
        category_name: extra.category_name || '',
        thumbnail_url: extra.thumbnail_url || '',
        note: extra.note || '',
      }).catch(() => {
        // non-blocking sync
      })
    }

    if (exists) {
      addToast({
        title: 'Removed from Vault',
        message: `"${title}" has been removed from your saved bookmarks.`,
        type: 'info'
      })
    } else {
      recordActivity({
        action_type: 'BOOKMARK',
        target_title: `${title} (${type})`,
        category_name: extra.category_name || type,
      })
      addToast({
        title: 'Saved to Vault!',
        message: `"${title}" added to your personal collector archive.`,
        type: 'success'
      })
    }
  }

  // Update User Note on a Bookmark (up to 500 characters)
  const updateBookmarkNote = useCallback((id, noteText) => {
    const trimmed = String(noteText || '').slice(0, 500)
    setBookmarkedItems(prev => {
      const existing = prev[id]
      if (!existing) return prev
      return {
        ...prev,
        [id]: {
          ...existing,
          note: trimmed,
        },
      }
    })

    recordActivity({
      action_type: 'NOTE_EDIT',
      target_title: `Updated personal note on bookmark #${id}`,
      detail: trimmed,
    })
  }, [recordActivity])

  // Array form of bookmarks for UniversePage & ArticlePage
  const bookmarksArray = useMemo(() => {
    return Object.entries(bookmarkedItems).map(([id, data]) => ({
      id,
      ...data,
    }))
  }, [bookmarkedItems])

  // Rate an Article or Media Item (1-5 stars)
  const handleRateItem = useCallback((itemId, score) => {
    setUserRatings(prev => ({
      ...prev,
      [itemId]: score,
    }))
    recordActivity({
      action_type: 'RATE_CONTENT',
      target_title: `Rated content #${itemId} (${score}/5 ★)`,
      detail: `${score} Stars`,
    })
    addToast({
      title: `Rated ${score}/5 Stars ★`,
      message: 'Your canon rating has been recorded in the telemetry matrix.',
      type: 'success',
    })
  }, [recordActivity])

  // Calculate live matching results count
  const totalResultsCount = useMemo(() => {
    let count = 0
    const q = searchQuery.toLowerCase().trim()

    UNIVERSES.forEach(u => {
      const matchesUniverse = selectedUniverse === 'all' || u.id === selectedUniverse
      if (matchesUniverse && (q === '' || u.name.toLowerCase().includes(q) || u.tags.some(t => t.toLowerCase().includes(q)))) {
        count++
      }
    })

    ARTICLES_DATA.forEach(a => {
      const matchesUniverse = selectedUniverse === 'all' || a.universe === selectedUniverse
      if (matchesUniverse && (q === '' || a.title.toLowerCase().includes(q) || a.subtitle.toLowerCase().includes(q))) {
        count++
      }
    })

    CHARACTERS_DATA.forEach(c => {
      if (q === '' || c.name.toLowerCase().includes(q) || c.universe.toLowerCase().includes(q) || c.alias.toLowerCase().includes(q)) {
        count++
      }
    })

    MULTIMEDIA_DATA.trailers.forEach(t => {
      if (q === '' || t.title.toLowerCase().includes(q) || t.universe.toLowerCase().includes(q)) {
        count++
      }
    })

    return count
  }, [searchQuery, selectedUniverse])

  return (
    <div id="top" className="min-h-screen bg-[#FDFBF7] dark:bg-[#0D1117] text-neutral-900 dark:text-neutral-100 transition-colors duration-200 flex flex-col font-sans">
      
      {/* Toast Notification Layer */}
      <Toast toasts={toasts} onDismiss={dismissToast} />

      {/* 1. Header & Navigation */}
      <Header
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        fontScale={fontScale}
        toggleFontScale={toggleFontScale}
        activePage={activePage}
        onNavigatePage={navigateToPage}
        onOpenAuth={handleOpenRouteOrModal}
      />

      {/* Main Content Area: Switches between Dedicated Pages ('universe', 'article', 'dashboard', 'admin', and 'home') */}
      <main className="flex-1">
        {activePage === 'universe' ? (
          <UniversePage
            universeSlug={activeUniverseSlug}
            onNavigateHome={() => navigateToPage('home', '#top')}
            onSelectUniverse={(slug) => openUniversePage(slug)}
            onOpenArticle={(slug) => openArticlePage(slug)}
            bookmarks={bookmarksArray}
            onToggleBookmark={(item) =>
              toggleBookmark(item.id, item.title, item.type || 'Featured Article', {
                category_name: item.universe,
              })
            }
            userRatings={userRatings}
            onRateItem={handleRateItem}
            onOpenModal={handleOpenRouteOrModal}
          />
        ) : activePage === 'article' ? (
          <ArticlePage
            articleSlug={activeArticleSlug}
            onNavigateHome={() => navigateToPage('home', '#top')}
            onSelectUniverse={(slug) => openUniversePage(slug)}
            onOpenArticle={(slug) => openArticlePage(slug)}
            bookmarks={bookmarksArray}
            onToggleBookmark={(item) =>
              toggleBookmark(item.id, item.title, item.type || 'Featured Article', {
                category_name: item.universe,
              })
            }
            onUpdateBookmarkNote={(id, noteText) => {
              updateBookmarkNote(id, noteText)
              addToast({
                title: 'Collector Note Saved',
                message: 'Your personal annotation has been synced to your Dashboard.',
                type: 'success',
              })
            }}
            userRatings={userRatings}
            onRateItem={handleRateItem}
            onShowToast={(msg, type = 'info') =>
              addToast({ title: 'Article Dispatch', message: msg, type })
            }
          />
         ) : activePage === 'about' ? (
           <AboutPage
             onNavigateHome={() => navigateToPage('home', '#top')}
             onOpenModal={handleOpenRouteOrModal}
           />
         ) : activePage === 'dashboard' ? (
          <section className="py-8 sm:py-12 px-3 sm:px-6 lg:px-8 bg-[#FDFBF7] dark:bg-[#0D1117] border-b-2 border-black dark:border-neutral-100">
            <div className="max-w-7xl mx-auto">
              {/* Dedicated Page Top Navigation & Quick Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 mb-6 border-b-2 border-black dark:border-neutral-700">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => navigateToPage('home', '#top')}
                    className="px-3 py-1.5 bg-white dark:bg-[#161B22] text-black dark:text-white font-mono font-black text-xs uppercase border-2 border-black dark:border-white brutal-shadow-sm brutal-btn flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Portal</span>
                  </button>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="bg-[#A3E635] text-black font-mono font-black text-[10px] px-2 py-0.5 border border-black uppercase">
                        CENTRAL HUB • /DASHBOARD
                      </span>
                    </div>
                    <h1 className="text-xl sm:text-3xl font-black uppercase tracking-tight text-black dark:text-white mt-0.5">
                      Personalized User Dashboard
                    </h1>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveModal('submission')}
                    className="px-3 py-1.5 bg-[#34D399] text-black font-mono font-black text-xs uppercase border-2 border-black brutal-shadow-sm brutal-btn flex items-center gap-1.5"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Submit Fan Lore</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveModal('feedback')}
                    className="px-3 py-1.5 bg-[#38BDF8] text-black font-mono font-black text-xs uppercase border-2 border-black brutal-shadow-sm brutal-btn flex items-center gap-1.5"
                  >
                    <MessageSquarePlus className="w-3.5 h-3.5" />
                    <span>Report Feedback</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => navigateToPage('admin')}
                    className="px-3 py-1.5 bg-[#F43F5E] text-white font-mono font-black text-xs uppercase border-2 border-black brutal-shadow-sm brutal-btn flex items-center gap-1.5"
                  >
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>Admin Control Panel</span>
                  </button>
                </div>
              </div>

              {/* Full-Page Dashboard Content */}
              <Dashboard
                embedded={true}
                bookmarkedItems={bookmarkedItems}
                toggleBookmark={toggleBookmark}
                onUpdateBookmarkNote={updateBookmarkNote}
                recentActivities={recentActivities}
                onClearActivities={clearActivities}
                onSelectUniverse={(universeId) => {
                  setSelectedUniverse(universeId)
                  recordActivity({
                    action_type: 'FILTER_UNIVERSE',
                    target_title: `Opened ${universeId.toUpperCase()} universe from Dashboard`,
                    category_name: universeId,
                  })
                  openUniversePage(universeId)
                }}
                onApplyDisplayPreferences={applyDisplayPreferences}
                onOpenAdmin={() => navigateToPage('admin')}
                onShowToast={addToast}
                onClose={() => navigateToPage('home', '#top')}
              />
            </div>
          </section>
        ) : activePage === 'admin' ? (
          <section className="py-8 sm:py-12 px-3 sm:px-6 lg:px-8 bg-[#FDFBF7] dark:bg-[#0D1117] border-b-2 border-black dark:border-neutral-100">
            <div className="max-w-7xl mx-auto">
              {/* Dedicated Admin Page Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 mb-6 border-b-2 border-black dark:border-neutral-700">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => navigateToPage('home', '#top')}
                    className="px-3 py-1.5 bg-white dark:bg-[#161B22] text-black dark:text-white font-mono font-black text-xs uppercase border-2 border-black dark:border-white brutal-shadow-sm brutal-btn flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Portal</span>
                  </button>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="bg-[#F43F5E] text-white font-mono font-black text-[10px] px-2 py-0.5 border border-black uppercase">
                        ADMIN COMMAND CENTER • /ADMIN
                      </span>
                    </div>
                    <h1 className="text-xl sm:text-3xl font-black uppercase tracking-tight text-black dark:text-white mt-0.5">
                      Administrator Control Panel
                    </h1>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => navigateToPage('dashboard')}
                    className="px-3 py-1.5 bg-[#A3E635] text-black font-mono font-black text-xs uppercase border-2 border-black brutal-shadow-sm brutal-btn flex items-center gap-1.5"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    <span>Personal Dashboard</span>
                  </button>
                </div>
              </div>

              {/* Full-Page Admin Control Panel */}
              <Admin
                embedded={true}
                initialSection={adminInitialSection}
                onShowToast={addToast}
                onClose={() => navigateToPage('home', '#top')}
              />
            </div>
          </section>
        ) : (
          <>
            {/* 2. Hero Section */}
            <Hero
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedUniverse={selectedUniverse}
              setSelectedUniverse={(u) => {
                setSelectedUniverse(u)
                if (u !== 'all') {
                  recordActivity({
                    action_type: 'FILTER_UNIVERSE',
                    target_title: `Filtered portal to ${u.toUpperCase()} universe`,
                    category_name: u,
                  })
                }
              }}
              onOpenUniversePage={openUniversePage}
              onOpenArticle={openArticlePage}
              totalResultsCount={totalResultsCount}
            />

            {/* 3. Universe Category Matrix (8 Interactive Cards) */}
            <UniverseMatrix
              universes={UNIVERSES}
              selectedUniverse={selectedUniverse}
              onSelectUniverse={(u) => {
                setSelectedUniverse(u)
                if (u !== 'all') {
                  recordActivity({
                    action_type: 'FILTER_UNIVERSE',
                    target_title: `Selected ${u.toUpperCase()} universe`,
                    category_name: u,
                  })
                }
              }}
              onOpenUniversePage={openUniversePage}
              onOpenArticle={openArticlePage}
              searchQuery={searchQuery}
              bookmarkedItems={bookmarkedItems}
              toggleBookmark={toggleBookmark}
              onRecordActivity={recordActivity}
              onOpenTopic={(topicTitle) => {
                openArticlePage(topicTitle)
              }}
            />

            {/* 4. Interactive Multimedia Center */}
            <MultimediaCenter
              multimediaData={MULTIMEDIA_DATA}
              onShowToast={addToast}
              bookmarkedItems={bookmarkedItems}
              toggleBookmark={toggleBookmark}
            />

            {/* 5. Character Profiles & Lore Archive */}
            <CharacterArchive
              characters={homeCharacters}
              bookmarkedItems={bookmarkedItems}
              toggleBookmark={toggleBookmark}
              onOpenLoreModal={(character) => {
                setActiveLoreCharacter(character)
                recordActivity({
                  action_type: 'VIEW_CHARACTER',
                  target_title: character.name,
                  category_name: character.universe,
                })
              }}
            />

            {/* 6. Merchandise Showcase & Upcoming Drop Radar */}
            <ResourceLibrary
              merchDrops={MERCH_DROPS}
              onShowToast={addToast}
              bookmarkedItems={bookmarkedItems}
              toggleBookmark={toggleBookmark}
              onRecordActivity={recordActivity}
            />

            {/* 7. Location-Aware Event Discovery & Convention Radar */}
            <ConventionRadar
              conventionsData={CONVENTIONS_DATA}
              onShowToast={addToast}
            />
          </>
        )}
      </main>

      {/* 8. AI-Powered Assistant Teaser ("FandomBot") */}
      <FandomBot
        qaData={FANDOM_BOT_QA}
        onShowToast={addToast}
      />

      {/* 9. Footer */}
      <Footer
        onSelectUniverse={(universeId) => {
          openUniversePage(universeId)
        }}
        onOpenUniversePage={openUniversePage}
        onOpenAuth={handleOpenRouteOrModal}
        onOpenModal={handleOpenRouteOrModal}
      />

      {/* Unified Modals Container (Auth, Character Lore, Feedback, Submissions, About) */}
      <Modals
        activeModal={activeModal}
        activeLoreCharacter={activeLoreCharacter}
        onClose={() => {
          setActiveModal(null)
          setActiveLoreCharacter(null)
        }}
        onSetActiveModal={handleOpenRouteOrModal}
        onShowToast={addToast}
        bookmarkedItems={bookmarkedItems}
        toggleBookmark={toggleBookmark}
        onUpdateBookmarkNote={updateBookmarkNote}
        recentActivities={recentActivities}
        onClearActivities={clearActivities}
        onSelectUniverse={(universeId) => {
          setSelectedUniverse(universeId)
          recordActivity({
            action_type: 'FILTER_UNIVERSE',
            target_title: `Opened ${universeId.toUpperCase()} universe from Dashboard`,
            category_name: universeId,
          })
          openUniversePage(universeId)
        }}
        onApplyDisplayPreferences={applyDisplayPreferences}
        onRecordActivity={recordActivity}
      />

    </div>
  )
}
