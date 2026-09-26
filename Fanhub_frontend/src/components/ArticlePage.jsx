import { useState, useEffect, useMemo } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Star,
  Clock,
  Eye,
  User,
  Calendar,
  Share2,
  CheckCircle2,
  BookOpen,
  Sparkles,
  FileText,
  Layers,
  ThumbsUp,
  ThumbsDown,
  Milestone,
  MapPin
} from 'lucide-react'
import {
  ARTICLES_DATA,
  CHARACTERS_DATA,
  getArticleBySlugOrTopic,
  getArticlesByUniverse,
  getUniverseBySlug
} from '../data/fandomData'
import { fandomsApi, normalizeBackendArticle } from '../services/api'

export default function ArticlePage({
  articleSlug,
  onNavigateHome,
  onSelectUniverse,
  onOpenArticle,
  bookmarks = [],
  onToggleBookmark,
  onUpdateBookmarkNote,
  userRatings = {},
  onRateItem,
  onShowToast
}) {
  const [remoteArticleMap, setRemoteArticleMap] = useState({})
  const [noteEdits, setNoteEdits] = useState({})
  const [thumbVotes, setThumbVotes] = useState({})
  const [copiedLink, setCopiedLink] = useState(false)

  // Resolve curated article first, or fallback to remote backend article
  const curatedMatch = useMemo(() => {
    const normalized = String(articleSlug || '').toLowerCase().trim()
    return (
      ARTICLES_DATA.find(
        (a) =>
          a.slug.toLowerCase() === normalized ||
          a.id.toLowerCase() === normalized ||
          (a.topicLabel && a.topicLabel.toLowerCase() === normalized)
      ) || null
    )
  }, [articleSlug])

  useEffect(() => {
    if (curatedMatch || !articleSlug) return

    let isMounted = true
    fandomsApi
      .getContentDetail(articleSlug)
      .then((data) => {
        if (!isMounted || !data) return
        const uni = getUniverseBySlug(data.category_slug)
        const normalized = normalizeBackendArticle(data, uni.accentColor)
        setRemoteArticleMap((prev) => ({ ...prev, [articleSlug]: normalized }))
      })
      .catch(() => {
        // Fallback handled by getArticleBySlugOrTopic
      })

    return () => {
      isMounted = false
    }
  }, [articleSlug, curatedMatch])

  const remoteArticle = remoteArticleMap[articleSlug] || null

  const article = useMemo(
    () => curatedMatch || remoteArticle || getArticleBySlugOrTopic(articleSlug),
    [curatedMatch, remoteArticle, articleSlug]
  )

  const universe = useMemo(() => getUniverseBySlug(article.universe), [article.universe])

  const existingBookmark = useMemo(
    () => bookmarks.find((b) => b.id === article.id),
    [bookmarks, article.id]
  )

  const noteDraft = noteEdits[article.id] !== undefined ? noteEdits[article.id] : (existingBookmark?.note || '')
  const thumbVote = thumbVotes[article.id] || null

  // Related articles in the same universe
  const relatedInUniverse = useMemo(() => {
    const sameUni = getArticlesByUniverse(article.universe).filter(
      (a) => a.slug !== article.slug
    )
    return sameUni
  }, [article.universe, article.slug])

  // Cross-universe recommendations
  const crossUniverseReads = useMemo(() => {
    return ARTICLES_DATA.filter((a) => a.universe !== article.universe).slice(0, 3)
  }, [article.universe])

  // Related characters in this universe
  const relatedCharacters = useMemo(() => {
    return CHARACTERS_DATA.filter(
      (c) =>
        c.universeSlug === universe.slug ||
        c.universe.toLowerCase().includes(universe.name.toLowerCase())
    )
  }, [universe.slug, universe.name])

  const userStar = userRatings[article.id] || 0
  const isBookmarked = Boolean(existingBookmark)

  const handleShare = () => {
    const url = window.location.href
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).catch(() => {})
    }
    setCopiedLink(true)
    if (onShowToast) {
      onShowToast('Article permalink copied to clipboard!', 'info')
    }
    setTimeout(() => setCopiedLink(false), 2500)
  }

  const handleSaveNote = (e) => {
    e.preventDefault()
    if (!isBookmarked) {
      onToggleBookmark({
        id: article.id,
        title: article.title,
        universe: universe.name,
        type: 'Article',
        accentColor: universe.accentColor,
        slug: article.slug
      })
    }
    if (onUpdateBookmarkNote) {
      onUpdateBookmarkNote(article.id, noteDraft)
    }
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] dark:bg-[#0D1117] transition-colors pb-20">
      {/* ================= STICKY TOP BREADCRUMB & READER BAR ================= */}
      <div className="bg-white dark:bg-[#161B22] border-b-3 border-black dark:border-neutral-200 sticky top-14 sm:top-20 z-30">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-2">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            <button
              onClick={() => onSelectUniverse(universe.slug)}
              className="px-3 py-1.5 text-black font-black text-xs uppercase border-2 border-black brutal-shadow-sm brutal-btn flex items-center gap-1.5"
              style={{ backgroundColor: universe.accentColor }}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{universe.name} Hub</span>
            </button>

            <button
              onClick={onNavigateHome}
              className="px-2.5 py-1.5 bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white font-mono text-xs font-bold uppercase border-2 border-black dark:border-neutral-600 hover:bg-neutral-200 dark:hover:bg-neutral-700"
            >
              Home
            </button>

            <span className="font-mono text-xs text-neutral-400 hidden sm:inline">/</span>
            <span className="font-mono text-xs font-bold text-neutral-600 dark:text-neutral-300 truncate max-w-[200px] sm:max-w-md hidden sm:inline">
              {article.title}
            </span>
          </div>

          {/* Reader Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                onToggleBookmark({
                  id: article.id,
                  title: article.title,
                  universe: universe.name,
                  type: 'Article',
                  accentColor: universe.accentColor,
                  slug: article.slug
                })
              }
              className={`px-3 py-1.5 font-black text-xs uppercase border-2 border-black dark:border-neutral-200 brutal-btn flex items-center gap-1.5 ${
                isBookmarked
                  ? 'bg-[#FACC15] text-black brutal-shadow-sm'
                  : 'bg-white dark:bg-[#0D1117] text-black dark:text-white'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" fill={isBookmarked ? 'currentColor' : 'none'} />
              <span>{isBookmarked ? 'Bookmarked' : 'Save Article'}</span>
            </button>

            <button
              onClick={handleShare}
              className="px-3 py-1.5 bg-white dark:bg-[#0D1117] text-black dark:text-white font-black text-xs uppercase border-2 border-black dark:border-neutral-200 brutal-btn flex items-center gap-1.5"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedLink ? 'Copied!' : 'Share'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ================= ARTICLE HEADER DECK ================= */}
      <header className="bg-white dark:bg-[#161B22] border-b-3 border-black dark:border-neutral-200">
        <div
          className="h-2.5 w-full border-b-2 border-black"
          style={{ backgroundColor: universe.accentColor }}
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6">
          {/* Meta Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => onSelectUniverse(universe.slug)}
              className="px-3 py-1 text-xs font-mono font-black uppercase border-2 border-black text-black brutal-shadow-sm"
              style={{ backgroundColor: universe.accentColor }}
            >
              {universe.name} UNIVERSE
            </button>
            <span className="px-2.5 py-1 bg-black text-white dark:bg-white dark:text-black font-mono text-xs font-bold uppercase border-2 border-black flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#FACC15]" />
              {article.readTime}
            </span>
            <span className="px-2.5 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-mono text-xs font-bold uppercase border-2 border-black dark:border-neutral-600 flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 text-[#38BDF8]" />
              {article.viewCount.toLocaleString()} Views
            </span>
            <span className="px-2.5 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-mono text-xs font-bold uppercase border-2 border-black dark:border-neutral-600">
              ★ {userStar || article.rating} ({article.ratingsCount} ratings)
            </span>
          </div>

          {/* Headline & Subtitle */}
          <div className="space-y-4">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-black dark:text-white leading-[1.05]">
              {article.title}
            </h1>
            <p className="text-base sm:text-xl font-bold text-neutral-700 dark:text-neutral-300 leading-relaxed">
              {article.subtitle}
            </p>
          </div>

          {/* Author & Timestamp Bar */}
          <div className="pt-4 border-t-2 border-black/10 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 border-2 border-black flex items-center justify-center font-black text-base text-black brutal-shadow-sm"
                style={{ backgroundColor: universe.accentColor }}
              >
                {article.author.charAt(0)}
              </div>
              <div>
                <div className="font-black text-xs sm:text-sm uppercase text-black dark:text-white flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  <span>{article.author}</span>
                </div>
                <div className="font-mono text-[11px] font-bold text-neutral-500">
                  {article.authorRole}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 font-mono text-xs font-bold text-neutral-600 dark:text-neutral-400">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-black dark:text-white" />
                Published: {article.publishedAt}
              </span>
              <span className="px-2 py-0.5 bg-[#34D399] text-black font-black uppercase border border-black">
                CANON VERIFIED
              </span>
            </div>
          </div>

          {/* Hero Image Frame */}
          <div className="border-4 border-black dark:border-neutral-200 brutal-shadow-lg overflow-hidden bg-neutral-900 relative">
            <img
              src={article.heroImage}
              alt={article.title}
              className="w-full max-h-[460px] object-cover"
            />
            <div className="p-3 bg-black text-white font-mono text-xs flex flex-wrap items-center justify-between gap-2 border-t-2 border-black">
              <span>
                FIG 01 // ARCHIVAL VISUAL — {article.universeName.toUpperCase()} SECTOR ({article.releaseYear})
              </span>
              <div className="flex flex-wrap gap-1.5">
                {article.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 text-[10px] font-black uppercase text-black"
                    style={{ backgroundColor: universe.accentColor }}
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ================= TWO-COLUMN EDITORIAL BODY + SIDEBAR ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* LEFT / MAIN EDITORIAL COLUMN (8 COLS) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Executive Synopsis Callout */}
            <div className="bg-white dark:bg-[#161B22] border-3 border-black dark:border-neutral-200 p-5 sm:p-6 brutal-shadow">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="px-2 py-0.5 text-xs font-mono font-black uppercase border border-black text-black"
                  style={{ backgroundColor: universe.accentColor }}
                >
                  EXECUTIVE BRIEFING
                </span>
                <span className="font-mono text-xs font-bold uppercase text-neutral-500">
                  Spoiler-Safe Overview
                </span>
              </div>
              <p className="text-sm sm:text-base font-bold text-neutral-800 dark:text-neutral-200 leading-relaxed">
                {article.synopsis}
              </p>
            </div>

            {/* Key Takeaways Box */}
            {article.keyTakeaways && article.keyTakeaways.length > 0 && (
              <div className="bg-[#FACC15]/15 dark:bg-[#161B22] border-3 border-black dark:border-neutral-200 p-5 sm:p-6 brutal-shadow space-y-3">
                <h2 className="text-base sm:text-lg font-black uppercase tracking-tight text-black dark:text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-black dark:text-[#FACC15]" />
                  <span>Key Canon Takeaways</span>
                </h2>
                <ul className="space-y-2.5">
                  {article.keyTakeaways.map((point, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm font-bold text-neutral-800 dark:text-neutral-200 leading-relaxed"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Structured Article Sections */}
            <div className="space-y-8">
              {article.sections.map((section, idx) => (
                <section
                  key={idx}
                  id={`article-section-${idx}`}
                  className="bg-white dark:bg-[#161B22] border-3 border-black dark:border-neutral-200 p-6 sm:p-8 brutal-shadow space-y-4 scroll-mt-28"
                >
                  <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-black dark:text-white pb-3 border-b-2 border-black/15 dark:border-neutral-700">
                    {section.heading}
                  </h2>

                  <div className="space-y-4">
                    {section.paragraphs.map((para, pIdx) => (
                      <p
                        key={pIdx}
                        className="text-sm sm:text-base text-neutral-800 dark:text-neutral-200 leading-relaxed font-medium"
                      >
                        {para}
                      </p>
                    ))}
                  </div>

                  {section.quote && (
                    <blockquote
                      className="mt-6 p-4 sm:p-5 bg-[#FDFBF7] dark:bg-[#0D1117] border-l-4 border-2 border-black dark:border-neutral-300 brutal-shadow-sm"
                      style={{ borderLeftColor: universe.accentColor, borderLeftWidth: '6px' }}
                    >
                      <p className="font-mono text-xs sm:text-sm italic font-bold text-black dark:text-white leading-relaxed">
                        {section.quote}
                      </p>
                    </blockquote>
                  )}
                </section>
              ))}
            </div>

            {/* Timeline-Style Event Highlights */}
            <div className="bg-white dark:bg-[#161B22] border-3 border-black dark:border-neutral-200 p-6 sm:p-8 brutal-shadow">
              <div className="flex items-center gap-2 mb-5 pb-3 border-b-2 border-black dark:border-neutral-700">
                <Milestone className="w-5 h-5 text-[#C084FC]" />
                <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight text-black dark:text-white">
                  TIMELINE-STYLE EVENT HIGHLIGHTS & CHRONOLOGY
                </h2>
              </div>

              <div className="relative pl-6 border-l-4 border-black dark:border-neutral-400 space-y-6">
                {[
                  {
                    phase: 'PHASE 01 • ORIGIN',
                    title: 'Initial Reveal & Studio Announcement',
                    date: `${article.releaseYear || '2025'} Q1`,
                    detail: `First canon key visual and production staff confirmation unveiled to global ${universe.name} audiences.`,
                  },
                  {
                    phase: 'PHASE 02 • ESCALATION',
                    title: 'World Premiere Showcase & Convention Panel',
                    date: `${article.releaseYear || '2026'} Q2`,
                    detail: `Standing-room-only stage panel featuring live director commentary, voice cast table reads, and exclusive 4K teaser footage.`,
                  },
                  {
                    phase: 'PHASE 03 • CLIMAX',
                    title: article.title,
                    date: article.publishedAt || '2026 Current',
                    detail: article.synopsis,
                  },
                ].map((milestone, idx) => (
                  <div key={idx} className="relative">
                    <span
                      className="absolute -left-[33px] top-1 w-4 h-4 border-2 border-black"
                      style={{ backgroundColor: universe.accentColor }}
                    />
                    <div className="bg-[#FDFBF7] dark:bg-[#0D1117] border-2 border-black dark:border-neutral-700 p-4 brutal-shadow-sm">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                        <span className="font-mono text-[10px] font-black uppercase px-2 py-0.5 bg-black text-[#FACC15]">
                          {milestone.phase}
                        </span>
                        <span className="font-mono text-xs font-bold text-neutral-500">
                          {milestone.date}
                        </span>
                      </div>
                      <h4 className="font-black text-sm sm:text-base uppercase text-black dark:text-white mb-1">
                        {milestone.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 font-medium">
                        {milestone.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Event Storytelling Layout for Past Conventions & Premieres */}
            <div className="bg-black text-white border-3 border-black dark:border-white p-6 sm:p-8 brutal-shadow">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b-2 border-neutral-800">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#F43F5E]" />
                  <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight">
                    CONVENTION & PREMIERE STORYTELLING ARCHIVE
                  </h2>
                </div>
                <span className="font-mono text-[10px] font-black uppercase px-2.5 py-1 bg-[#A3E635] text-black border border-white">
                  ON-SITE DISPATCH
                </span>
              </div>

              <p className="text-xs sm:text-sm text-neutral-300 font-medium leading-relaxed mb-4">
                Relive the atmosphere from the main stage floor: over 40,000 fans gathered with synchronized lightsticks, screen-accurate cosplay armor, and deafening cheers as the lights dimmed for the world premiere of <strong className="text-[#FACC15]">{article.title}</strong>.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                <div className="p-3 bg-neutral-900 border border-neutral-700">
                  <span className="text-neutral-400 block text-[10px] uppercase">CROWD PEAK DECIBELS</span>
                  <span className="text-lg font-black text-[#A3E635]">114.8 dBA</span>
                </div>
                <div className="p-3 bg-neutral-900 border border-neutral-700">
                  <span className="text-neutral-400 block text-[10px] uppercase">GLOBAL LIVESTREAM</span>
                  <span className="text-lg font-black text-[#38BDF8]">1.9M Concurrent</span>
                </div>
                <div className="p-3 bg-neutral-900 border border-neutral-700">
                  <span className="text-neutral-400 block text-[10px] uppercase">ARCHIVE STATUS</span>
                  <span className="text-lg font-black text-[#FACC15]">Preserved 4K</span>
                </div>
              </div>
            </div>

            {/* INTERACTIVE READER ENGAGEMENT: RATING & PERSONAL COLLECTOR NOTE */}
            <div className="bg-white dark:bg-[#161B22] border-3 border-black dark:border-neutral-200 p-6 sm:p-8 brutal-shadow space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-black/15 dark:border-neutral-700">
                <div>
                  <span className="font-mono text-xs font-black uppercase text-neutral-500 block">
                    COLLECTOR TELEMETRY
                  </span>
                  <h3 className="text-xl font-black uppercase text-black dark:text-white">
                    Rate This {universe.name} Dispatch
                  </h3>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-1.5 bg-[#FDFBF7] dark:bg-[#0D1117] px-3.5 py-2 border-2 border-black dark:border-neutral-300 brutal-shadow-sm">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => onRateItem && onRateItem(article.id, star)}
                        className="p-1 hover:scale-125 transition-transform"
                        aria-label={`Rate ${star} stars`}
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= (userStar || Math.round(article.rating))
                              ? 'text-[#FACC15] fill-[#FACC15]'
                              : 'text-neutral-400'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-1.5 font-mono text-xs font-black uppercase text-black dark:text-white">
                      {userStar ? `${userStar}/5` : `${article.rating}/5`}
                    </span>
                  </div>

                  {/* Thumbs Up / Thumbs Down Quick Rating */}
                  <button
                    type="button"
                    onClick={() => {
                      setThumbVotes((prev) => ({ ...prev, [article.id]: 'up' }))
                      onRateItem && onRateItem(article.id, 5)
                    }}
                    className={`px-2.5 py-2 border-2 border-black dark:border-white font-mono text-xs font-black uppercase flex items-center gap-1 brutal-btn ${
                      thumbVote === 'up' ? 'bg-[#A3E635] text-black' : 'bg-white dark:bg-[#0D1117] text-black dark:text-white'
                    }`}
                    aria-label="Thumbs Up"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>Canon</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setThumbVotes((prev) => ({ ...prev, [article.id]: 'down' }))
                      onRateItem && onRateItem(article.id, 2)
                    }}
                    className={`px-2.5 py-2 border-2 border-black dark:border-white font-mono text-xs font-black uppercase flex items-center gap-1 brutal-btn ${
                      thumbVote === 'down' ? 'bg-[#F43F5E] text-white' : 'bg-white dark:bg-[#0D1117] text-black dark:text-white'
                    }`}
                    aria-label="Thumbs Down"
                  >
                    <ThumbsDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Personal Bookmark Note Form */}
              <form onSubmit={handleSaveNote} className="space-y-3">
                <label className="block font-mono text-xs font-black uppercase text-black dark:text-white">
                  Personal Collector Note (Synced with your Dashboard Bookmarks)
                </label>
                <textarea
                  rows={3}
                  value={noteDraft}
                  onChange={(e) => setNoteEdits((prev) => ({ ...prev, [article.id]: e.target.value }))}
                  placeholder="Jot down favorite chapter numbers, timestamps, build dimensions, or theories..."
                  className="w-full p-3 bg-[#FDFBF7] dark:bg-[#0D1117] border-2 border-black dark:border-neutral-400 text-xs sm:text-sm font-bold text-black dark:text-white focus:outline-none"
                />
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="font-mono text-[11px] text-neutral-500">
                    {isBookmarked
                      ? '✓ Saved in your Collector Vault'
                      : 'Saving a note will automatically bookmark this article.'}
                  </span>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#FACC15] text-black font-black text-xs uppercase border-2 border-black brutal-shadow-sm brutal-btn"
                  >
                    Save Collector Note
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* RIGHT / STICKY SIDEBAR COLUMN (4 COLS) */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Table of Contents */}
            <div className="bg-white dark:bg-[#161B22] border-3 border-black dark:border-neutral-200 p-5 brutal-shadow space-y-3">
              <div className="flex items-center gap-2 pb-2.5 border-b-2 border-black/15 dark:border-neutral-700">
                <FileText className="w-4 h-4 text-black dark:text-[#FACC15]" />
                <h3 className="font-black text-sm uppercase text-black dark:text-white">
                  Table of Contents
                </h3>
              </div>
              <ul className="space-y-2 text-xs font-bold">
                {article.sections.map((sec, idx) => (
                  <li key={idx}>
                    <a
                      href={`#article-section-${idx}`}
                      className="block p-2 bg-[#FDFBF7] dark:bg-[#0D1117] border-2 border-black dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 hover:bg-[#FACC15] hover:text-black transition-colors"
                    >
                      {sec.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* More Articles in This Universe */}
            <div className="bg-white dark:bg-[#161B22] border-3 border-black dark:border-neutral-200 p-5 brutal-shadow space-y-4">
              <div className="flex items-center justify-between pb-2.5 border-b-2 border-black/15 dark:border-neutral-700">
                <h3 className="font-black text-sm uppercase text-black dark:text-white flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" />
                  <span>More in {universe.name}</span>
                </h3>
                <button
                  onClick={() => onSelectUniverse(universe.slug)}
                  className="font-mono text-[11px] font-black uppercase underline text-black dark:text-[#FACC15]"
                >
                  View Hub
                </button>
              </div>

              <div className="space-y-3">
                {relatedInUniverse.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onOpenArticle(rel.slug)}
                    className="p-3 bg-[#FDFBF7] dark:bg-[#0D1117] border-2 border-black dark:border-neutral-700 cursor-pointer group hover:-translate-y-0.5 transition-transform space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono font-bold text-neutral-500">
                      <span>{rel.readTime}</span>
                      <span className="text-black dark:text-[#FACC15]">★ {rel.rating}</span>
                    </div>
                    <h4 className="font-black text-xs sm:text-sm uppercase text-black dark:text-white group-hover:underline leading-snug">
                      {rel.title}
                    </h4>
                    <p className="text-[11px] text-neutral-600 dark:text-neutral-400 line-clamp-2">
                      {rel.subtitle}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Universe Characters */}
            {relatedCharacters.length > 0 && (
              <div className="bg-white dark:bg-[#161B22] border-3 border-black dark:border-neutral-200 p-5 brutal-shadow space-y-3">
                <div className="pb-2.5 border-b-2 border-black/15 dark:border-neutral-700">
                  <h3 className="font-black text-sm uppercase text-black dark:text-white">
                    {universe.name} Key Figures
                  </h3>
                </div>
                {relatedCharacters.map((c) => (
                  <div
                    key={c.id}
                    className="p-3 bg-[#FDFBF7] dark:bg-[#0D1117] border-2 border-black dark:border-neutral-700 flex items-center gap-3"
                  >
                    <img
                      src={c.image}
                      alt={c.name}
                      className="w-14 h-14 object-cover border-2 border-black shrink-0"
                    />
                    <div className="min-w-0">
                      <span
                        className="inline-block px-1.5 py-0.5 text-[9px] font-mono font-black uppercase border border-black text-black"
                        style={{ backgroundColor: universe.accentColor }}
                      >
                        {c.alias}
                      </span>
                      <h4 className="font-black text-xs sm:text-sm uppercase text-black dark:text-white truncate mt-0.5">
                        {c.name}
                      </h4>
                      <p className="text-[11px] text-neutral-500 truncate">{c.origin}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Cross-Universe Trending Dispatches */}
            <div className="bg-white dark:bg-[#161B22] border-3 border-black dark:border-neutral-200 p-5 brutal-shadow space-y-3">
              <div className="flex items-center gap-1.5 pb-2.5 border-b-2 border-black/15 dark:border-neutral-700">
                <Layers className="w-4 h-4 text-[#38BDF8]" />
                <h3 className="font-black text-sm uppercase text-black dark:text-white">
                  Cross-Universe Trending
                </h3>
              </div>
              <div className="space-y-2.5">
                {crossUniverseReads.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onOpenArticle(item.slug)}
                    className="w-full text-left p-2.5 bg-[#FDFBF7] dark:bg-[#0D1117] border-2 border-black dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors flex items-center justify-between gap-2"
                  >
                    <div className="min-w-0">
                      <span
                        className="inline-block px-1.5 py-0.5 text-[9px] font-mono font-black uppercase border border-black text-black mb-1"
                        style={{ backgroundColor: item.accentColor }}
                      >
                        {item.universeName}
                      </span>
                      <div className="font-black text-xs uppercase text-black dark:text-white line-clamp-1">
                        {item.title}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-black dark:text-white shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
