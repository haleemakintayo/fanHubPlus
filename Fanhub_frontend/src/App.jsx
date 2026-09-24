import { useState, useEffect, useMemo, useRef } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import UniverseMatrix from './components/UniverseMatrix'
import MultimediaCenter from './components/MultimediaCenter'
import CharacterArchive from './components/CharacterArchive'
import MerchRadar from './components/MerchRadar'
import ConventionRadar from './components/ConventionRadar'
import FandomBot from './components/FandomBot'
import Footer from './components/Footer'
import Modals from './components/Modals'
import Toast from './components/Toast'



import {
  UNIVERSES,
  MULTIMEDIA_DATA,
  CHARACTERS_DATA,
  MERCH_DROPS,
  CONVENTIONS_DATA,
  FANDOM_BOT_QA
} from './data/fandomData'

export default function App() {
  // Theme Switching State - Default to crisp Pop-Brutalist Light Mode
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('fanhub_theme')
      if (savedTheme) return savedTheme === 'dark'
      return false // Light mode by default
    }
    return false
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

  // Toast Notification State
  const [toasts, setToasts] = useState([])

  // Bookmarking State
  const [bookmarkedItems, setBookmarkedItems] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('fanhub_bookmarks')
        return saved ? JSON.parse(saved) : {}
      } catch {
        return {}
      }
    }
    return {}
  })

  // Modal State
  const [activeModal, setActiveModal] = useState(null) // 'login' | 'register' | 'admin' | 'moderation' | 'feedback' | 'submission' | 'about' | 'dashboard'
  const [activeLoreCharacter, setActiveLoreCharacter] = useState(null)

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

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev)
    addToast({
      title: !darkMode ? 'Dark Mode Activated' : 'Light Mode Activated',
      message: !darkMode ? 'Deep Obsidian palette enabled.' : 'Cream & Canvas palette enabled.',
      type: 'info'
    })
  }

  const toggleFontScale = () => {
    setFontScale(prev => {
      const next = prev === 'normal' ? 'large' : 'normal'
      addToast({
        title: 'Font Scaler Adjusted',
        message: next === 'large' ? 'Root text size enlarged (18.5px) for enhanced readability.' : 'Root text size reset to standard (16px).',
        type: 'info'
      })
      return next
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

  // Bookmark Toggle
  const toggleBookmark = (id, title, type) => {
    setBookmarkedItems(prev => {
      const exists = !!prev[id]
      const updated = { ...prev }

      if (exists) {
        delete updated[id]
        addToast({
          title: 'Removed from Vault',
          message: `"${title}" has been removed from your saved bookmarks.`,
          type: 'info'
        })
      } else {
        updated[id] = { title, type, date: new Date().toLocaleDateString() }
        addToast({
          title: 'Saved to Vault!',
          message: `"${title}" added to your personal collector archive.`,
          type: 'success'
        })
      }

      return updated
    })
  }

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
    <div className="min-h-screen bg-[#FDFBF7] dark:bg-[#0D1117] text-neutral-900 dark:text-neutral-100 transition-colors duration-200 flex flex-col font-sans">
      
      {/* Toast Notification Layer */}
      <Toast toasts={toasts} onDismiss={dismissToast} />

      {/* 1. Header & Navigation */}
      <Header
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        fontScale={fontScale}
        toggleFontScale={toggleFontScale}
        onOpenAuth={(mode) => setActiveModal(mode)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* 2. Hero Section */}
        <Hero
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedUniverse={selectedUniverse}
          setSelectedUniverse={setSelectedUniverse}
          totalResultsCount={totalResultsCount}
        />

        {/* 3. Universe Category Matrix (8 Interactive Cards) */}
        <UniverseMatrix
          universes={UNIVERSES}
          selectedUniverse={selectedUniverse}
          onSelectUniverse={setSelectedUniverse}
          searchQuery={searchQuery}
          onOpenTopic={(topicTitle) => {
            setSearchQuery(topicTitle)
            addToast({
              title: 'Canon Thread Filtered',
              message: `Now searching for discussions regarding "${topicTitle}".`,
              type: 'info'
            })
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
          characters={CHARACTERS_DATA}
          bookmarkedItems={bookmarkedItems}
          toggleBookmark={toggleBookmark}
          onOpenLoreModal={(character) => setActiveLoreCharacter(character)}
        />

        {/* 6. Merchandise Showcase & Upcoming Drop Radar */}
        <MerchRadar
          merchDrops={MERCH_DROPS}
          onShowToast={addToast}
        />

        {/* 7. Location-Aware Event Discovery & Convention Radar */}
        <ConventionRadar
          conventionsData={CONVENTIONS_DATA}
          onShowToast={addToast}
        />

      </main>

      {/* 8. AI-Powered Assistant Teaser ("FandomBot") */}
      <FandomBot
        qaData={FANDOM_BOT_QA}
        onShowToast={addToast}
      />

      {/* 9. Footer & SRS-Mandated Full Sitemap */}
      <Footer
        onSelectUniverse={(universeId) => {
          setSelectedUniverse(universeId)
          setSearchQuery('')
        }}
        onOpenAuth={(mode) => setActiveModal(mode)}
        onOpenModal={(modalName) => setActiveModal(modalName)}
      />

      {/* Unified Modals Container */}
      <Modals
        activeModal={activeModal}
        activeLoreCharacter={activeLoreCharacter}
        onClose={() => {
          setActiveModal(null)
          setActiveLoreCharacter(null)
        }}
        onShowToast={addToast}
        bookmarkedItems={bookmarkedItems}
        toggleBookmark={toggleBookmark}
      />

    </div>
  )
}
