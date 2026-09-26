import { useState, useMemo } from 'react'
import {
  ArrowLeft,
  Bookmark,
  Star,
  ThumbsUp,
  ThumbsDown,
  Clock,
  Eye,
  User,
  Calendar,
  Sparkles,
  CheckCircle2,
  Share2,
  Compass,
  Upload,
  Award,
  MapPin
} from 'lucide-react'
import { interactionsApi } from '../services/api'

const EVENT_STORYTELLING_HIGHLIGHTS = [
  {
    id: 'story-tokyo-comiket',
    era: 'SUMMER 2025 ARCHIVE',
    title: 'Tokyo Big Sight Hall 4: When 160,000 Fans Chanted the Shinjuku Finale Live',
    location: 'Odaiba, Tokyo • Comiket Retrospective',
    badge: 'Convention Chronicle',
    accent: '#A3E635',
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=900&q=80',
    narrative:
      'From 05:30 AM first-train queues at Kokusai-Tenjijo Station to the sunset cosplay plaza overlooking Tokyo Bay, independent circle illustrators and MAPPA key animators unveiled 400+ pages of raw production gengashuu.',
  },
  {
    id: 'story-imax-premiere',
    era: 'WINTER 2025 PREMIERE',
    title: '70mm IMAX Midnight Screening: Synchronized Lightsticks & Director Q&A',
    location: 'BFI IMAX London & AMC Lincoln Square',
    badge: 'Film Premiere Recap',
    accent: '#38BDF8',
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=900&q=80',
    narrative:
      'Fans arrived in full screen-accurate Fremen stillsuits and Spider-Society rigs for the dual-laser midnight premiere, culminating in a 45-minute live sound-mixing breakdown with the score composers.',
  },
  {
    id: 'story-wcs-finals',
    era: 'AUTUMN 2025 SHOWCASE',
    title: 'World Cosplay Summit Stage: 14-Kilogram LED Mecha Armor Live Transformation',
    location: 'Nagoya Oasis 21 • Grand Championship',
    badge: 'Cosplay Storytelling',
    accent: '#C084FC',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=900&q=80',
    narrative:
      'Built over 800 hours using high-density EVA-38 foam and Arduino-synced pneumatic wings, the championship duo executed a mid-stage armor deployment in 2.4 seconds.',
  },
]

export default function ArticleReader({
  article,
  allArticles = [],
  characters = [],
  bookmarkedItems = {},
  toggleBookmark,
  onUpdateBookmarkNote,
  onSelectArticle,
  onOpenCharacterLore,
  onSelectUniverse,
  onOpenSubmissionModal,
  onBack,
  onShowToast,
}) {
  const [userStars, setUserStars] = useState(0)
  const [thumbVote, setThumbVote] = useState(null) // 'up' | 'down' | null
  const [customNote, setCustomNote] = useState(
    () => bookmarkedItems[article?.slug]?.note || bookmarkedItems[article?.id]?.note || ''
  )

  const bookmarkKey = article?.slug || article?.id || 'featured-article'
  const isBookmarked = !!bookmarkedItems[bookmarkKey] || !!bookmarkedItems[article?.id]

  // Generate chronological timeline highlights from the article sections & takeaways
  const timelineMilestones = useMemo(() => {
    if (!article) return []
    const baseYear = Number(String(article.releaseYear || '2026').slice(0, 4)) || 2026
    const takeaways = Array.isArray(article.keyTakeaways) ? article.keyTakeaways : []
    const phases = [
      {
        phase: `PHASE I • ${baseYear - 2}`,
        label: 'Canon Genesis & Concept Blueprint',
        detail:
          takeaways[0] ||
          `Initial worldbuilding bible and foundational lore established for ${article.universeName || 'this universe'}.`,
      },
      {
        phase: `PHASE II • ${baseYear - 1}`,
        label: 'Turning Point & Production Escalation',
        detail:
          takeaways[1] ||
          `Key character arcs and visual direction reached critical acclaim across community discussions.`,
      },
      {
        phase: `PHASE III • ${baseYear}`,
        label: 'Current Multiverse Benchmark',
        detail:
          takeaways[2] ||
          article.synopsis ||
          'Full canonical synthesis verified by the Fan Hub Plus Archival Council.',
      },
    ]
    return phases
  }, [article])

  // Related articles in the same or adjacent universe
  const relatedArticles = useMemo(() => {
    if (!article) return []
    const sameUniverse = allArticles.filter(
      (a) => a.slug !== article.slug && a.universe === article.universe
    )
    const fallback = allArticles.filter((a) => a.slug !== article.slug)
    return (sameUniverse.length >= 2 ? sameUniverse : fallback).slice(0, 3)
  }, [article, allArticles])

  // Related characters in the same universe
  const relatedCharacters = useMemo(() => {
    if (!article) return []
    return characters
      .filter(
        (c) =>
          c.universeSlug === article.universe ||
          c.universe.toLowerCase().includes(String(article.universe).toLowerCase())
      )
      .slice(0, 2)
  }, [article, characters])

  if (!article) return null

  const dynamicPopularity = (
    Number(article.popularityScore || 95.0) +
    (userStars >= 4 ? 0.4 : userStars > 0 ? 0.1 : 0) +
    (thumbVote === 'up' ? 0.2 : thumbVote === 'down' ? -0.1 : 0)
  ).toFixed(1)

  const handleStarRate = async (stars) => {
    setUserStars(stars)
    if (article.dbId) {
      try {
        await interactionsApi.submitRating(article.dbId, stars)
      } catch {
        // fallback for static/guest mode
      }
    }
    onShowToast?.({
      title: 'Canon Rating Logged!',
      message: `You rated "${article.title}" ${stars}/5 stars. Popularity score updated to ${dynamicPopularity}.`,
      type: 'success',
    })
  }

  const handleThumbVote = (direction) => {
    setThumbVote(direction)
    onShowToast?.({
      title: direction === 'up' ? 'Upvoted Canon Entry' : 'Feedback Logged',
      message:
        direction === 'up'
          ? `Marked "${article.title}" as essential reading.`
          : 'Your feedback helps our moderators refine this dossier.',
      type: direction === 'up' ? 'success' : 'info',
    })
  }

  const handleSaveNote = (e) => {
    e.preventDefault()
    if (!isBookmarked) {
      toggleBookmark?.(bookmarkKey, article.title, 'Featured Article', {
        category_name: article.universeName,
        thumbnail_url: article.thumbnail || article.heroImage,
        note: customNote,
      })
    }
    onUpdateBookmarkNote?.(bookmarkKey, customNote)
    onShowToast?.({
      title: 'Personal Collector Note Saved',
      message: 'Your note is attached to this bookmark in your Personal Dashboard.',
      type: 'success',
    })
  }

  return (
    <section className="py-8 sm:py-12 px-3 sm:px-6 lg:px-8 bg-[#FDFBF7] dark:bg-[#0D1117] border-b-2 border-black dark:border-neutral-100">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Top Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b-2 border-black dark:border-neutral-700">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onBack}
              className="px-3 py-1.5 bg-white dark:bg-[#161B22] text-black dark:text-white font-mono font-black text-xs uppercase border-2 border-black dark:border-white brutal-shadow-sm brutal-btn flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Content Explorer</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onSelectUniverse?.(article.universe || 'anime')
                onBack?.()
              }}
              className="px-2.5 py-1.5 font-mono font-black text-xs uppercase border-2 border-black text-black brutal-shadow-sm"
              style={{ backgroundColor: article.accentColor || '#A3E635' }}
            >
              {article.universeName || article.universe}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() =>
                toggleBookmark?.(bookmarkKey, article.title, 'Featured Article', {
                  category_name: article.universeName,
                  thumbnail_url: article.thumbnail || article.heroImage,
                  note: customNote,
                })
              }
              className={`px-3 py-1.5 font-mono font-black text-xs uppercase border-2 border-black dark:border-white brutal-shadow-sm brutal-btn flex items-center gap-1.5 ${
                isBookmarked
                  ? 'bg-[#F43F5E] text-white'
                  : 'bg-[#A3E635] text-black'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
              <span>{isBookmarked ? 'Bookmarked in Vault' : 'Bookmark Article'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (navigator?.clipboard) {
                  navigator.clipboard.writeText(window.location.href).catch(() => {})
                }
                onShowToast?.({
                  title: 'Link Copied!',
                  message: `Direct link to "${article.title}" copied to clipboard.`,
                  type: 'info',
                })
              }}
              className="p-1.5 bg-white dark:bg-[#161B22] text-black dark:text-white border-2 border-black dark:border-white brutal-shadow-sm brutal-btn"
              title="Copy direct link"
              aria-label="Share article"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Article Hero Header Card */}
        <header className="bg-white dark:bg-[#161B22] border-3 border-black dark:border-white p-5 sm:p-8 brutal-shadow-lg space-y-5">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="px-2 py-0.5 bg-black text-[#FACC15] font-black uppercase border border-black">
              CANON DOSSIER
            </span>
            <span className="px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white font-bold uppercase border border-black dark:border-neutral-600 flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#A3E635]" />
              {article.readTime || '7 MIN READ'}
            </span>
            <span className="px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white font-bold uppercase border border-black dark:border-neutral-600 flex items-center gap-1">
              <Eye className="w-3 h-3 text-[#38BDF8]" />
              {Number(article.viewCount || 84200).toLocaleString()} Views
            </span>
            <span className="px-2 py-0.5 bg-[#FACC15] text-black font-black uppercase border border-black flex items-center gap-1">
              <Star className="w-3 h-3 fill-black" />
              Popularity: {dynamicPopularity}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-black dark:text-white leading-none">
            {article.title}
          </h1>

          {article.subtitle && (
            <p className="text-sm sm:text-lg font-bold text-neutral-700 dark:text-neutral-300 leading-snug">
              {article.subtitle}
            </p>
          )}

          {/* Author & Publication Metadata Bar */}
          <div className="pt-4 border-t-2 border-black/10 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
            <div className="flex items-center gap-2.5">
              <div
                className="w-9 h-9 border-2 border-black flex items-center justify-center font-black text-black"
                style={{ backgroundColor: article.accentColor || '#A3E635' }}
              >
                <User className="w-4 h-4" />
              </div>
              <div>
                <span className="font-black uppercase text-black dark:text-white block">
                  {article.author || 'Archivist Zero'}
                </span>
                <span className="text-[11px] text-neutral-500">
                  {article.authorRole || 'Verified Canon Chronicler'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-neutral-600 dark:text-neutral-400 font-bold">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                Published: {article.publishedAt || 'Sept 2026'}
              </span>
            </div>
          </div>

          {/* Hero Banner Image */}
          {(article.heroImage || article.thumbnail) && (
            <div className="aspect-video w-full border-3 border-black overflow-hidden bg-neutral-900 brutal-shadow-md">
              <img
                src={article.heroImage || article.thumbnail}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </header>

        {/* Key Canon Takeaways Callout */}
        {Array.isArray(article.keyTakeaways) && article.keyTakeaways.length > 0 && (
          <div className="bg-[#FACC15]/20 dark:bg-[#161B22] border-3 border-black dark:border-white p-5 sm:p-6 brutal-shadow-md">
            <h2 className="font-mono text-xs sm:text-sm font-black uppercase tracking-wider text-black dark:text-white mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#F43F5E]" />
              <span>EXECUTIVE CANON TAKEAWAYS</span>
            </h2>
            <ul className="space-y-2">
              {article.keyTakeaways.map((point, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-xs sm:text-sm font-bold text-neutral-900 dark:text-neutral-100"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Rich-Text Article Body Sections */}
        <div className="bg-white dark:bg-[#161B22] border-3 border-black dark:border-white p-5 sm:p-8 brutal-shadow-md space-y-8">
          {(article.sections || []).map((sec, idx) => (
            <div key={idx} className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-black dark:text-white pb-2 border-b-2 border-black dark:border-neutral-700">
                {sec.heading}
              </h2>
              {(sec.paragraphs || []).map((para, pIdx) => (
                <p
                  key={pIdx}
                  className="text-sm sm:text-base text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed"
                >
                  {para}
                </p>
              ))}
              {sec.quote && (
                <blockquote
                  className="p-4 sm:p-5 border-l-4 border-2 border-black dark:border-white bg-[#FDFBF7] dark:bg-[#0D1117] brutal-shadow-sm italic font-bold text-sm sm:text-base text-black dark:text-white"
                  style={{ borderLeftColor: article.accentColor || '#FACC15', borderLeftWidth: '8px' }}
                >
                  {sec.quote}
                </blockquote>
              )}
            </div>
          ))}
        </div>

        {/* TIMELINE-STYLE EVENT HIGHLIGHTS */}
        <div className="bg-white dark:bg-[#161B22] border-3 border-black dark:border-white p-5 sm:p-8 brutal-shadow-md">
          <div className="flex items-center justify-between gap-2 pb-3 mb-6 border-b-2 border-black dark:border-neutral-700">
            <div>
              <span className="bg-[#38BDF8] text-black font-mono font-black text-[10px] px-2 py-0.5 border border-black uppercase">
                CHRONOLOGICAL ARCHIVE
              </span>
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-black dark:text-white mt-1">
                TIMELINE-STYLE EVENT HIGHLIGHTS
              </h2>
            </div>
            <Award className="w-6 h-6 text-[#FACC15]" />
          </div>

          <div className="relative pl-6 sm:pl-8 border-l-4 border-black dark:border-[#FACC15] space-y-6">
            {timelineMilestones.map((ms, idx) => (
              <div key={idx} className="relative">
                <div
                  className="absolute -left-[34px] sm:-left-[42px] top-1 w-5 h-5 border-2 border-black flex items-center justify-center font-mono text-[10px] font-black text-black"
                  style={{ backgroundColor: article.accentColor || '#A3E635' }}
                >
                  {idx + 1}
                </div>
                <div className="p-4 bg-neutral-50 dark:bg-[#0D1117] border-2 border-black dark:border-neutral-700 brutal-shadow-sm">
                  <span className="font-mono text-[10px] font-black uppercase px-2 py-0.5 bg-black text-[#FACC15]">
                    {ms.phase}
                  </span>
                  <h3 className="font-black text-sm sm:text-base uppercase text-black dark:text-white mt-1.5">
                    {ms.label}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 font-medium mt-1">
                    {ms.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* EVENT STORYTELLING LAYOUT FOR PAST CONVENTIONS & FILM PREMIERES */}
        <div className="bg-white dark:bg-[#161B22] border-3 border-black dark:border-white p-5 sm:p-8 brutal-shadow-md space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b-2 border-black dark:border-neutral-700">
            <div>
              <span className="bg-[#C084FC] text-black font-mono font-black text-[10px] px-2 py-0.5 border border-black uppercase">
                ON-THE-GROUND DISPATCHES
              </span>
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-black dark:text-white mt-1">
                CONVENTION & PREMIERE STORYTELLING ARCHIVE
              </h2>
            </div>
            <button
              type="button"
              onClick={onOpenSubmissionModal}
              className="px-3 py-1.5 bg-[#A3E635] text-black font-mono font-black text-xs uppercase border-2 border-black brutal-shadow-sm brutal-btn flex items-center gap-1.5 self-start"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Submit Your Con Report</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {EVENT_STORYTELLING_HIGHLIGHTS.map((story) => (
              <div
                key={story.id}
                className="border-2 border-black dark:border-neutral-700 bg-neutral-50 dark:bg-[#0D1117] flex flex-col justify-between brutal-shadow-sm"
              >
                <div>
                  <div className="aspect-16/10 w-full border-b-2 border-black overflow-hidden relative">
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full object-cover"
                    />
                    <span
                      className="absolute top-2 left-2 px-2 py-0.5 font-mono text-[10px] font-black uppercase border border-black text-black"
                      style={{ backgroundColor: story.accent }}
                    >
                      {story.badge}
                    </span>
                  </div>
                  <div className="p-3.5">
                    <span className="font-mono text-[10px] font-bold text-neutral-500 uppercase flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#F43F5E]" />
                      {story.location}
                    </span>
                    <h3 className="font-black text-xs sm:text-sm uppercase text-black dark:text-white mt-1 mb-1.5">
                      {story.title}
                    </h3>
                    <p className="text-xs text-neutral-700 dark:text-neutral-300 font-medium leading-relaxed">
                      {story.narrative}
                    </p>
                  </div>
                </div>
                <div className="px-3.5 py-2 border-t border-black/10 dark:border-neutral-800 font-mono text-[10px] font-black uppercase text-neutral-500">
                  {story.era}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5-STAR / THUMBS RATING WIDGET + PERSONAL BOOKMARK NOTE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Rating Widget */}
          <div className="bg-white dark:bg-[#161B22] border-3 border-black dark:border-white p-5 brutal-shadow-md flex flex-col justify-between">
            <div>
              <span className="font-mono text-[10px] font-black uppercase px-2 py-0.5 bg-[#FACC15] text-black border border-black">
                CANON QUALITY TELEMETRY
              </span>
              <h3 className="text-lg font-black uppercase text-black dark:text-white mt-2">
                Rate This Content Entry
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 mb-4">
                Your rating dynamically updates this entry’s Multiverse Popularity Score.
              </p>

              {/* 5-Star Selector */}
              <div className="flex items-center gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleStarRate(star)}
                    className={`p-2 border-2 border-black brutal-shadow-sm brutal-btn ${
                      userStars >= star
                        ? 'bg-[#FACC15] text-black'
                        : 'bg-neutral-100 dark:bg-[#0D1117] text-neutral-400'
                    }`}
                    aria-label={`Rate ${star} out of 5 stars`}
                  >
                    <Star className={`w-5 h-5 ${userStars >= star ? 'fill-black' : ''}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Thumbs Up / Down Quick Feedback */}
            <div className="pt-3 border-t-2 border-black/10 dark:border-neutral-800 flex items-center justify-between gap-2">
              <span className="font-mono text-xs font-bold uppercase text-neutral-500">
                Helpful Canon Analysis?
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleThumbVote('up')}
                  className={`px-3 py-1.5 font-mono text-xs font-black uppercase border-2 border-black flex items-center gap-1 ${
                    thumbVote === 'up'
                      ? 'bg-[#A3E635] text-black brutal-shadow-sm'
                      : 'bg-neutral-100 dark:bg-[#0D1117] text-black dark:text-white'
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" /> Yes
                </button>
                <button
                  type="button"
                  onClick={() => handleThumbVote('down')}
                  className={`px-3 py-1.5 font-mono text-xs font-black uppercase border-2 border-black flex items-center gap-1 ${
                    thumbVote === 'down'
                      ? 'bg-[#F43F5E] text-white brutal-shadow-sm'
                      : 'bg-neutral-100 dark:bg-[#0D1117] text-black dark:text-white'
                  }`}
                >
                  <ThumbsDown className="w-3.5 h-3.5" /> No
                </button>
              </div>
            </div>
          </div>

          {/* Personal Collector Note on Bookmark */}
          <form
            onSubmit={handleSaveNote}
            className="bg-white dark:bg-[#161B22] border-3 border-black dark:border-white p-5 brutal-shadow-md flex flex-col justify-between"
          >
            <div>
              <span className="font-mono text-[10px] font-black uppercase px-2 py-0.5 bg-[#A3E635] text-black border border-black">
                COLLECTOR VAULT NOTE
              </span>
              <h3 className="text-lg font-black uppercase text-black dark:text-white mt-2">
                Personal Note on This Entry
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 mb-3">
                Attach a personal reminder, episode timestamp, or reading note (up to 500 chars).
              </p>
              <textarea
                rows={3}
                maxLength={500}
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                placeholder="e.g. Compare this timeline with Chapter 236 barrier mechanics..."
                className="w-full border-2 border-black dark:border-white p-2.5 text-xs font-medium bg-neutral-50 dark:bg-[#0D1117] text-black dark:text-white focus:outline-none"
              />
            </div>
            <div className="pt-3 flex items-center justify-between gap-2">
              <span className="font-mono text-[10px] text-neutral-500">
                {customNote.length}/500 chars
              </span>
              <button
                type="submit"
                className="px-4 py-2 bg-[#A3E635] text-black font-black text-xs uppercase border-2 border-black brutal-shadow-sm brutal-btn"
              >
                Save Bookmark & Note
              </button>
            </div>
          </form>
        </div>

        {/* RELATED LORE LINKS & CHARACTER DOSSIERS */}
        <div className="bg-white dark:bg-[#161B22] border-3 border-black dark:border-white p-5 sm:p-8 brutal-shadow-md space-y-5">
          <div className="flex items-center justify-between pb-3 border-b-2 border-black dark:border-neutral-700">
            <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight text-black dark:text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#38BDF8]" />
              <span>RELATED LORE LINKS & CONNECTED DOSSIERS</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedArticles.map((rel) => (
              <div
                key={rel.slug}
                onClick={() => {
                  onSelectArticle?.(rel)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                className="p-4 border-2 border-black dark:border-neutral-700 bg-neutral-50 dark:bg-[#0D1117] hover:bg-[#FACC15]/20 cursor-pointer transition-colors flex flex-col justify-between brutal-shadow-sm"
              >
                <div>
                  <span
                    className="font-mono text-[10px] font-black uppercase px-2 py-0.5 border border-black text-black inline-block mb-2"
                    style={{ backgroundColor: rel.accentColor || '#A3E635' }}
                  >
                    {rel.universeName}
                  </span>
                  <h4 className="font-black text-xs sm:text-sm uppercase text-black dark:text-white line-clamp-2">
                    {rel.title}
                  </h4>
                </div>
                <span className="font-mono text-[10px] font-black uppercase text-[#F43F5E] mt-3 block">
                  Read Connected Dossier →
                </span>
              </div>
            ))}
          </div>

          {relatedCharacters.length > 0 && (
            <div className="pt-4 border-t-2 border-black/10 dark:border-neutral-800">
              <h3 className="font-mono text-xs font-black uppercase text-neutral-500 mb-3">
                Featured Champions in This Universe
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {relatedCharacters.map((char) => (
                  <div
                    key={char.id}
                    onClick={() => onOpenCharacterLore?.(char)}
                    className="p-3 border-2 border-black dark:border-neutral-700 bg-neutral-50 dark:bg-[#0D1117] flex items-center justify-between gap-3 cursor-pointer hover:border-[#A3E635]"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={char.image}
                        alt={char.name}
                        className="w-12 h-12 object-cover border-2 border-black"
                      />
                      <div>
                        <span className="font-mono text-[10px] font-bold text-neutral-500 uppercase block">
                          {char.alias}
                        </span>
                        <h4 className="font-black text-sm uppercase text-black dark:text-white">
                          {char.name}
                        </h4>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-black text-[#FACC15] font-mono text-[10px] font-black uppercase">
                      Inspect Lore
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
