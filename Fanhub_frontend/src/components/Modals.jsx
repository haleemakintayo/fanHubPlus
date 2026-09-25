import { useState } from 'react'
import {
  X,
  Bookmark,
  Check,
  Upload
} from 'lucide-react'
import Login from './Login'
import Register from './Register'
import Dashboard from './Dashboard'
import Admin from './Admin'
import { interactionsApi } from '../services/api'

const UNIVERSE_SLUGS_TO_NAMES = {
  anime: 'Anime',
  gaming: 'Gaming',
  'movies-tv': 'Movies',
  'tv-shows': 'TV Shows',
  kpop: 'K-Pop',
  comics: 'Comics',
  manga: 'Manga',
  cosplay: 'Cosplay',
}

export default function Modals({
  activeModal,
  activeLoreCharacter,
  onClose,
  onSetActiveModal,
  onShowToast,
  bookmarkedItems,
  toggleBookmark,
  onUpdateBookmarkNote,
  recentActivities,
  onClearActivities,
  onSelectUniverse,
  onApplyDisplayPreferences,
  onRecordActivity,
}) {
  // Auth Form State
  const [authMode, setAuthMode] = useState(activeModal === 'register' ? 'register' : 'login')
  const [lastActiveModal, setLastActiveModal] = useState(activeModal)

  if (activeModal !== lastActiveModal) {
    setLastActiveModal(activeModal)
    if (activeModal === 'login' || activeModal === 'register') {
      setAuthMode(activeModal)
    }
  }

  // Feedback State
  const [feedbackCategory, setFeedbackCategory] = useState('BUG')
  const [feedbackEmail, setFeedbackEmail] = useState('')
  const [feedbackName, setFeedbackName] = useState('')
  const [feedbackMessage, setFeedbackMessage] = useState('')
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false)

  // Fan Submission State
  const [subTitle, setSubTitle] = useState('')
  const [subType, setSubType] = useState('ARTICLE')
  const [subUniverse, setSubUniverse] = useState('anime')
  const [subAlias, setSubAlias] = useState('')
  const [subArchetype, setSubArchetype] = useState('')
  const [subOrigin, setSubOrigin] = useState('')
  const [subFaction, setSubFaction] = useState('')
  const [subImageUrl, setSubImageUrl] = useState('')
  const [subContent, setSubContent] = useState('')
  const [isSubmittingLore, setIsSubmittingLore] = useState(false)

  if (!activeModal && !activeLoreCharacter) return null

  // ================= 1. CHARACTER LORE MODAL =================
  if (activeLoreCharacter) {
    const isBookmarked = !!bookmarkedItems[activeLoreCharacter.id]

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in"
        role="dialog"
        aria-modal="true"
        aria-labelledby="lore-modal-title"
        onClick={onClose}
      >
        <div className="relative w-full max-w-3xl bg-white dark:bg-[#161B22] border-3 border-black dark:border-white p-6 sm:p-8 brutal-shadow-lg max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
          
          {/* Header */}
          <div className="flex items-start justify-between gap-4 pb-4 border-b-2 border-black dark:border-neutral-700 mb-6">
            <div className="flex items-center gap-3">
              <span 
                className="font-mono text-xs font-black uppercase px-2.5 py-1 border-2 border-black text-black"
                style={{ backgroundColor: activeLoreCharacter.accentColor }}
              >
                {activeLoreCharacter.universe}
              </span>
              <div>
                <span className="font-mono text-xs font-bold text-neutral-500 uppercase block">
                  {activeLoreCharacter.alias}
                </span>
                <h3 id="lore-modal-title" className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-black dark:text-white">
                  {activeLoreCharacter.name}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleBookmark(activeLoreCharacter.id, activeLoreCharacter.name, 'Character Lore', {
                  category_name: activeLoreCharacter.universe,
                  thumbnail_url: activeLoreCharacter.image,
                })}
                className={`p-2 border-2 border-black dark:border-white brutal-shadow-sm brutal-btn ${
                  isBookmarked ? 'bg-[#F43F5E] text-white' : 'bg-white dark:bg-[#0D1117] text-black dark:text-white'
                }`}
                aria-label="Bookmark character"
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={onClose}
                className="p-2 border-2 border-black dark:border-white bg-white dark:bg-[#0D1117] text-black dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800 brutal-shadow-sm"
                aria-label="Close lore modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Grid Layout: Visual + In-depth Lore */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            
            {/* Visual Column */}
            <div className="md:col-span-5 space-y-4">
              <div className="border-2 border-black overflow-hidden bg-neutral-900 brutal-shadow-sm aspect-3/4">
                <img
                  src={activeLoreCharacter.image}
                  alt={activeLoreCharacter.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-3 bg-neutral-50 dark:bg-[#0D1117] border-2 border-black dark:border-neutral-700 text-xs font-mono space-y-2">
                <div>
                  <span className="text-neutral-500 uppercase block">Faction Affiliation:</span>
                  <span className="font-black text-black dark:text-white">{activeLoreCharacter.faction}</span>
                </div>
                <div>
                  <span className="text-neutral-500 uppercase block">Origin Realm:</span>
                  <span className="font-black text-black dark:text-white">{activeLoreCharacter.origin}</span>
                </div>
              </div>
            </div>

            {/* Lore Dossier Column */}
            <div className="md:col-span-7 space-y-4">
              
              <div className="p-4 border-2 border-black dark:border-neutral-700 bg-[#FDFBF7] dark:bg-[#0D1117]">
                <h4 className="font-mono text-xs font-black uppercase text-neutral-500 mb-1">
                  CANONICAL QUOTE
                </h4>
                <p className="italic text-sm sm:text-base font-bold text-black dark:text-white">
                  {activeLoreCharacter.tagline}
                </p>
              </div>

              <div>
                <h4 className="font-mono text-xs font-black uppercase tracking-wider text-black dark:text-white mb-2">
                  CLASSIFIED DOSSIER & BIOGRAPHY
                </h4>
                <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 font-medium leading-relaxed">
                  {activeLoreCharacter.details.bio}
                </p>
              </div>

              {(activeLoreCharacter.details.weapon || activeLoreCharacter.details.nemesis || activeLoreCharacter.details.firstAppearance) && (
                <div className="p-3 bg-neutral-100 dark:bg-[#0D1117] border-2 border-black dark:border-neutral-700 space-y-2 text-xs font-mono">
                  {activeLoreCharacter.details.weapon && (
                    <div className="flex justify-between border-b border-black/10 dark:border-neutral-800 pb-1.5">
                      <span className="text-neutral-500 font-bold">PRIMARY WEAPON / RELIC:</span>
                      <span className="font-black text-black dark:text-white">{activeLoreCharacter.details.weapon}</span>
                    </div>
                  )}
                  {activeLoreCharacter.details.nemesis && (
                    <div className="flex justify-between border-b border-black/10 dark:border-neutral-800 pb-1.5">
                      <span className="text-neutral-500 font-bold">PRIMARY ARCHNEMESIS:</span>
                      <span className="font-black text-[#F43F5E]">{activeLoreCharacter.details.nemesis}</span>
                    </div>
                  )}
                  {activeLoreCharacter.details.firstAppearance && (
                    <div className="flex justify-between">
                      <span className="text-neutral-500 font-bold">FIRST CANON APPEARANCE:</span>
                      <span className="font-black text-black dark:text-white">{activeLoreCharacter.details.firstAppearance}</span>
                    </div>
                  )}
                </div>
              )}

              <div className="pt-2">
                <button
                  onClick={() => {
                    toggleBookmark(activeLoreCharacter.id, activeLoreCharacter.name, 'Character Lore', {
                      category_name: activeLoreCharacter.universe,
                      thumbnail_url: activeLoreCharacter.image,
                    })
                  }}
                  className={`w-full py-2.5 px-4 font-black text-xs uppercase tracking-tight border-2 border-black dark:border-white brutal-shadow-sm brutal-btn flex items-center justify-center gap-2 ${
                    isBookmarked ? 'bg-[#F43F5E] text-white' : 'bg-[#A3E635] text-black'
                  }`}
                >
                  <Bookmark className="w-4 h-4 fill-current" />
                  <span>{isBookmarked ? 'Saved in Personal Vault' : 'Save Character to Vault'}</span>
                </button>
              </div>

            </div>

          </div>

        </div>
      </div>
    )
  }

  // ================= 2. AUTH MODAL (LOGIN / REGISTER) =================
  if (activeModal === 'login' || activeModal === 'register') {
    const isRegister = authMode === 'register'

    const handleAuthSuccess = (data) => {
      const username = data?.user?.username || 'Collector'
      onRecordActivity?.({
        action_type: 'PROFILE_UPDATE',
        target_title: `Signed in as ${username}`,
        category_name: 'Hub Identity',
      })
      if (onSetActiveModal) {
        onSetActiveModal('dashboard')
      } else {
        onClose()
      }
    }

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
        onClick={onClose}
      >
        <div
          className="relative w-full max-w-md bg-white dark:bg-[#161B22] border-3 border-black dark:border-white p-6 sm:p-8 brutal-shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >

          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b-2 border-black dark:border-neutral-700 mb-6">
            <div className="flex items-center gap-2">
              <div className="p-1 bg-[#FACC15] text-black border border-black font-black text-xs px-2">
                HUB ACCESS
              </div>
              <h3 id="auth-modal-title" className="text-xl font-black uppercase tracking-tight text-black dark:text-white">
                {isRegister ? 'JOIN THE HUB' : 'COLLECTOR SIGN IN'}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 border-2 border-black dark:border-white bg-white dark:bg-[#0D1117] text-black dark:text-white hover:bg-neutral-200"
              aria-label="Close auth modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Mode Tabs */}
          <div className="flex border-2 border-black dark:border-white mb-6">
            <button
              type="button"
              onClick={() => setAuthMode('login')}
              className={`flex-1 py-2 font-black text-xs uppercase tracking-tight ${
                !isRegister ? 'bg-[#FACC15] text-black' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setAuthMode('register')}
              className={`flex-1 py-2 font-black text-xs uppercase tracking-tight border-l-2 border-black dark:border-white ${
                isRegister ? 'bg-[#A3E635] text-black' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300'
              }`}
            >
              Register
            </button>
          </div>

          {/* Form */}
          <div>
            {isRegister ? (
              <Register
                onShowToast={onShowToast}
                onClose={onClose}
                onAuthSuccess={handleAuthSuccess}
              />
            ) : (
              <Login
                onShowToast={onShowToast}
                onClose={onClose}
                onAuthSuccess={handleAuthSuccess}
              />
            )}
          </div>

        </div>
      </div>
    )
  }

  // ================= 3. ADMIN CONTROL PANEL & MODERATION QUEUE =================
  if (activeModal === 'admin' || activeModal === 'moderation') {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in"
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-modal-title"
        onClick={onClose}
      >
        <div
          className="relative w-full max-w-5xl bg-white dark:bg-[#161B22] border-3 border-black dark:border-white p-5 sm:p-8 brutal-shadow-lg max-h-[92vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between pb-3 border-b-2 border-black dark:border-neutral-700 mb-6">
            <div className="flex items-center gap-2">
              <span className="bg-[#F43F5E] text-white font-mono font-black text-xs px-2.5 py-1 border-2 border-black brutal-shadow-sm">
                ADMIN COMMAND CENTER
              </span>
              <div>
                <h3 id="admin-modal-title" className="text-xl sm:text-2xl font-black uppercase tracking-tight text-black dark:text-white">
                  ADMINISTRATOR CONTROL PANEL
                </h3>
                <span className="font-mono text-xs font-bold text-neutral-500 uppercase">
                  Analytics • 8-Universe Content Manager • FandomBot KB • Moderation & QA
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 border-2 border-black dark:border-white bg-white dark:bg-[#0D1117] text-black dark:text-white hover:bg-neutral-200"
              aria-label="Close admin modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <Admin
            embedded={true}
            initialSection={activeModal === 'moderation' ? 'moderation' : 'analytics'}
            onShowToast={onShowToast}
            onClose={onClose}
          />

          <div className="mt-6 pt-4 border-t-2 border-black dark:border-neutral-700 flex items-center justify-between gap-2">
            <button
              onClick={() => onSetActiveModal?.('dashboard')}
              className="px-3 py-2 bg-[#A3E635] text-black font-black text-xs uppercase border-2 border-black brutal-shadow-sm brutal-btn"
            >
              Switch to Collector Dashboard
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black font-black text-xs uppercase border-2 border-black brutal-btn"
            >
              Exit Admin View
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ================= 4. FEEDBACK / BUG REPORT MODAL =================
  if (activeModal === 'feedback') {
    const handleFeedbackSubmit = async (e) => {
      e.preventDefault()
      setIsSubmittingFeedback(true)
      try {
        await interactionsApi.submitFeedback({
          email: feedbackEmail,
          name: feedbackName,
          feedbackType: feedbackCategory,
          subject: `${feedbackCategory} Report from Hub Portal`,
          message: feedbackMessage,
        })
      } catch {
        // Fallback if guest or offline
      } finally {
        setIsSubmittingFeedback(false)
      }

      onRecordActivity?.({
        action_type: 'FEEDBACK',
        target_title: `Submitted ${feedbackCategory} ticket`,
        category_name: 'Support & QA',
      })

      onShowToast({
        title: 'Feedback Recorded!',
        message: 'Your ticket has been logged to the Admin Feedback Queue.',
        type: 'success'
      })
      setFeedbackMessage('')
      onClose()
    }

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in"
        role="dialog"
        aria-modal="true"
        aria-labelledby="feedback-modal-title"
        onClick={onClose}
      >
        <div className="relative w-full max-w-lg bg-white dark:bg-[#161B22] border-3 border-black dark:border-white p-6 sm:p-8 brutal-shadow-lg" onClick={(e) => e.stopPropagation()}>
          
          <div className="flex items-center justify-between pb-3 border-b-2 border-black dark:border-neutral-700 mb-6">
            <div className="flex items-center gap-2">
              <span className="bg-[#38BDF8] text-black font-black text-xs px-2 py-0.5 border border-black">
                QA TICKETS
              </span>
              <h3 id="feedback-modal-title" className="text-xl font-black uppercase tracking-tight text-black dark:text-white">
                BUG REPORT & FEEDBACK
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 border-2 border-black dark:border-white bg-white dark:bg-[#0D1117] text-black dark:text-white hover:bg-neutral-200"
              aria-label="Close feedback modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleFeedbackSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-black uppercase text-black dark:text-white mb-1">
                Email
              </label>
              <input
                required
                type="email"
                value={feedbackEmail}
                onChange={(e) => setFeedbackEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full border-2 border-black dark:border-white p-2 text-xs font-bold bg-neutral-50 dark:bg-[#0D1117] text-black dark:text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-black uppercase text-black dark:text-white mb-1">
                Name <span className="font-normal text-neutral-500">(optional)</span>
              </label>
              <input
                type="text"
                value={feedbackName}
                onChange={(e) => setFeedbackName(e.target.value)}
                placeholder="Your name"
                className="w-full border-2 border-black dark:border-white p-2 text-xs font-bold bg-neutral-50 dark:bg-[#0D1117] text-black dark:text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-black uppercase text-black dark:text-white mb-1">
                Category
              </label>
              <select
                value={feedbackCategory}
                onChange={(e) => setFeedbackCategory(e.target.value)}
                className="w-full border-2 border-black dark:border-white p-2 text-xs font-bold bg-neutral-50 dark:bg-[#0D1117] text-black dark:text-white focus:outline-none"
              >
                <option value="BUG">🐛 Bug Report (Visual / Functional)</option>
                <option value="SUGGESTION">💡 Feature Suggestion</option>
                <option value="INQUIRY">❓ General Query / Lore Correction</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono font-black uppercase text-black dark:text-white mb-1">
                Description / Steps to Reproduce
              </label>
              <textarea
                required
                rows={4}
                value={feedbackMessage}
                onChange={(e) => setFeedbackMessage(e.target.value)}
                placeholder="Describe what happened or your suggestion for the hub..."
                className="w-full border-2 border-black dark:border-white p-2.5 text-xs font-medium bg-neutral-50 dark:bg-[#0D1117] text-black dark:text-white focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmittingFeedback}
              className="w-full py-3 bg-[#FACC15] text-black font-black text-xs uppercase tracking-tight border-2 border-black brutal-shadow brutal-btn disabled:opacity-50"
            >
              {isSubmittingFeedback ? 'Logging Ticket...' : 'Submit Ticket'}
            </button>
          </form>

        </div>
      </div>
    )
  }

  // ================= 5. FAN SUBMISSION MODAL =================
  if (activeModal === 'submission') {
    const handleSubSubmit = async (e) => {
      e.preventDefault()
      setIsSubmittingLore(true)
      const categoryName = UNIVERSE_SLUGS_TO_NAMES[subUniverse] || 'Anime'

      try {
        if (subType === 'CHARACTER') {
          await interactionsApi.submitCharacterProfile({
            name: subTitle,
            alias: subAlias,
            archetype: subArchetype,
            origin: subOrigin,
            faction: subFaction,
            imageUrl: subImageUrl,
            biography: subContent,
            categorySlug: subUniverse,
          })
        } else {
          await interactionsApi.submitFanWork({
            title: subTitle,
            body: subContent,
            categorySlug: subUniverse,
          })
        }
      } catch {
        // Fallback if guest or offline
      } finally {
        setIsSubmittingLore(false)
      }

      onRecordActivity?.({
        action_type: 'SUBMISSION',
        target_title: subTitle,
        category_name: categoryName,
      })

      onShowToast({
        title: 'Submission Received!',
        message: `"${subTitle}" has been forwarded to the Admin Moderation Queue for verification.`,
        type: 'success'
      })
      setSubTitle('')
      setSubAlias('')
      setSubArchetype('')
      setSubOrigin('')
      setSubFaction('')
      setSubImageUrl('')
      setSubContent('')
      setSubType('ARTICLE')
      onClose()
    }

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in"
        role="dialog"
        aria-modal="true"
        aria-labelledby="submission-modal-title"
        onClick={onClose}
      >
        <div className="relative w-full max-w-lg bg-white dark:bg-[#161B22] border-3 border-black dark:border-white p-6 sm:p-8 brutal-shadow-lg" onClick={(e) => e.stopPropagation()}>
          
          <div className="flex items-center justify-between pb-3 border-b-2 border-black dark:border-neutral-700 mb-6">
            <div className="flex items-center gap-2">
              <span className="bg-[#34D399] text-black font-black text-xs px-2 py-0.5 border border-black">
                COMMUNITY VAULT
              </span>
              <h3 id="submission-modal-title" className="text-xl font-black uppercase tracking-tight text-black dark:text-white">
                SUBMIT FAN LORE OR ESSAY
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 border-2 border-black dark:border-white bg-white dark:bg-[#0D1117] text-black dark:text-white hover:bg-neutral-200"
              aria-label="Close submission modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSubSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-black uppercase text-black dark:text-white mb-1">
                Submission Type
              </label>
              <select
                value={subType}
                onChange={(e) => setSubType(e.target.value)}
                className="w-full border-2 border-black dark:border-white p-2 text-xs font-bold bg-neutral-50 dark:bg-[#0D1117] text-black dark:text-white focus:outline-none"
              >
                <option value="ARTICLE">Fan article or lore essay</option>
                <option value="CHARACTER">Character profile proposal</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-mono font-black uppercase text-black dark:text-white mb-1">
                {subType === 'CHARACTER' ? 'Character Name' : 'Title of Creation / Lore Theory'}
              </label>
              <input
                type="text"
                required
                value={subTitle}
                onChange={(e) => setSubTitle(e.target.value)}
                placeholder={subType === 'CHARACTER' ? 'e.g. Yuna Starfall' : 'e.g. Analysis of the Void Century Ancient Weapons'}
                className="w-full border-2 border-black dark:border-white p-2.5 text-xs font-bold bg-neutral-50 dark:bg-[#0D1117] text-black dark:text-white focus:outline-none"
              />
            </div>

            {subType === 'CHARACTER' && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono font-black uppercase text-black dark:text-white mb-1">
                      Alias
                    </label>
                    <input
                      type="text"
                      value={subAlias}
                      onChange={(e) => setSubAlias(e.target.value)}
                      placeholder="e.g. The Starforged"
                      className="w-full border-2 border-black dark:border-white p-2.5 text-xs font-bold bg-neutral-50 dark:bg-[#0D1117] text-black dark:text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-black uppercase text-black dark:text-white mb-1">
                      Archetype
                    </label>
                    <input
                      type="text"
                      value={subArchetype}
                      onChange={(e) => setSubArchetype(e.target.value)}
                      placeholder="e.g. Reluctant Hero"
                      className="w-full border-2 border-black dark:border-white p-2.5 text-xs font-bold bg-neutral-50 dark:bg-[#0D1117] text-black dark:text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-black uppercase text-black dark:text-white mb-1">
                      Origin
                    </label>
                    <input
                      type="text"
                      value={subOrigin}
                      onChange={(e) => setSubOrigin(e.target.value)}
                      placeholder="e.g. The Glass District"
                      className="w-full border-2 border-black dark:border-white p-2.5 text-xs font-bold bg-neutral-50 dark:bg-[#0D1117] text-black dark:text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-black uppercase text-black dark:text-white mb-1">
                      Faction
                    </label>
                    <input
                      type="text"
                      value={subFaction}
                      onChange={(e) => setSubFaction(e.target.value)}
                      placeholder="e.g. Dawn Cartographers"
                      className="w-full border-2 border-black dark:border-white p-2.5 text-xs font-bold bg-neutral-50 dark:bg-[#0D1117] text-black dark:text-white focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-mono font-black uppercase text-black dark:text-white mb-1">
                    Character Image URL
                  </label>
                  <input
                    type="url"
                    value={subImageUrl}
                    onChange={(e) => setSubImageUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full border-2 border-black dark:border-white p-2.5 text-xs font-bold bg-neutral-50 dark:bg-[#0D1117] text-black dark:text-white focus:outline-none"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-mono font-black uppercase text-black dark:text-white mb-1">
                Target Universe (8 Core Fandoms)
              </label>
              <select
                value={subUniverse}
                onChange={(e) => setSubUniverse(e.target.value)}
                className="w-full border-2 border-black dark:border-white p-2 text-xs font-bold bg-neutral-50 dark:bg-[#0D1117] text-black dark:text-white focus:outline-none"
              >
                <option value="anime">🍙 Anime</option>
                <option value="gaming">🎮 Gaming</option>
                <option value="movies-tv">🎬 Movies</option>
                <option value="tv-shows">📺 TV Shows</option>
                <option value="kpop">🎤 K-Pop</option>
                <option value="comics">💥 Comics</option>
                <option value="manga">📖 Manga</option>
                <option value="cosplay">🎭 Cosplay</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono font-black uppercase text-black dark:text-white mb-1">
                {subType === 'CHARACTER' ? 'Biography / Canon References' : 'Essay Body / Build Breakdown'}
              </label>
              <textarea
                required
                rows={5}
                value={subContent}
                onChange={(e) => setSubContent(e.target.value)}
                placeholder={subType === 'CHARACTER' ? 'Explain the character, source references, and licensing context...' : 'Detail your canon references, chapter citations, or cosplay build steps...'}
                className="w-full border-2 border-black dark:border-white p-2.5 text-xs font-medium bg-neutral-50 dark:bg-[#0D1117] text-black dark:text-white focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmittingLore}
              className="w-full py-3 bg-[#A3E635] text-black font-black text-xs uppercase tracking-tight border-2 border-black brutal-shadow brutal-btn flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
              <Upload className="w-4 h-4" />
              <span>{isSubmittingLore ? 'Submitting...' : 'Submit to Admin Verification Queue'}</span>
            </button>
          </form>

        </div>
      </div>
    )
  }

  // ================= 6. ABOUT MODAL =================
  if (activeModal === 'about' || activeModal === 'policy') {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in"
        role="dialog"
        aria-modal="true"
        aria-labelledby="about-modal-title"
        onClick={onClose}
      >
        <div className="relative w-full max-w-xl bg-white dark:bg-[#161B22] border-3 border-black dark:border-white p-6 sm:p-8 brutal-shadow-lg max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
          
          <div className="flex items-center justify-between pb-3 border-b-2 border-black dark:border-neutral-700 mb-6">
            <div className="flex items-center gap-2">
              <h3 id="about-modal-title" className="text-xl font-black uppercase tracking-tight text-black dark:text-white">
                ABOUT FAN HUB PLUS
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 border-2 border-black dark:border-white bg-white dark:bg-[#0D1117] text-black dark:text-white hover:bg-neutral-200"
              aria-label="Close about modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed">
            <p>
              <strong>Fan Hub Plus</strong> is an all-in-one fandom portal designed to eliminate fragmented communities, toxic algorithm feeds, and clickbait ads.
            </p>

            <div className="p-3 bg-neutral-100 dark:bg-[#0D1117] border-2 border-black dark:border-neutral-700 space-y-2 font-mono text-xs">
              <div className="flex items-center gap-2 text-black dark:text-white font-bold">
                <Check className="w-4 h-4 text-[#A3E635]" /> Pop-Brutalist High-Contrast Design
              </div>
              <div className="flex items-center gap-2 text-black dark:text-white font-bold">
                <Check className="w-4 h-4 text-[#A3E635]" /> 8 Specialized Universe Silos with zero bloat
              </div>
              <div className="flex items-center gap-2 text-black dark:text-white font-bold">
                <Check className="w-4 h-4 text-[#A3E635]" /> Integrated 4K Trailer Player & Audio Streamer
              </div>
              <div className="flex items-center gap-2 text-black dark:text-white font-bold">
                <Check className="w-4 h-4 text-[#A3E635]" /> Location-Aware Global Convention Radar
              </div>
            </div>

            <p>
              Developed as a Single Page Application (SPA) leveraging React 19, Tailwind CSS, Lucide React, and Django REST Framework.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t-2 border-black dark:border-neutral-700 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black font-black text-xs uppercase border-2 border-black brutal-btn"
            >
              Close Overview
            </button>
          </div>

        </div>
      </div>
    )
  }

  // ================= 7. COLLECTOR DASHBOARD MODAL =================
  if (activeModal === 'dashboard') {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dash-modal-title"
        onClick={onClose}
      >
        <div
          className="relative w-full max-w-4xl bg-white dark:bg-[#161B22] border-3 border-black dark:border-white p-5 sm:p-8 brutal-shadow-lg max-h-[92vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          
          <div className="flex items-center justify-between pb-3 border-b-2 border-black dark:border-neutral-700 mb-6">
            <div className="flex items-center gap-2">
              <span className="bg-[#A3E635] text-black font-mono font-black text-xs px-2.5 py-1 border border-black">
                COLLECTOR VAULT
              </span>
              <h3 id="dash-modal-title" className="text-xl font-black uppercase tracking-tight text-black dark:text-white">
                PERSONALIZED USER DASHBOARD
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 border-2 border-black dark:border-white bg-white dark:bg-[#0D1117] text-black dark:text-white hover:bg-neutral-200"
              aria-label="Close dashboard modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <Dashboard
            embedded={true}
            bookmarkedItems={bookmarkedItems}
            toggleBookmark={toggleBookmark}
            onUpdateBookmarkNote={onUpdateBookmarkNote}
            recentActivities={recentActivities}
            onClearActivities={onClearActivities}
            onSelectUniverse={onSelectUniverse}
            onApplyDisplayPreferences={onApplyDisplayPreferences}
            onOpenAdmin={() => onSetActiveModal?.('admin')}
            onShowToast={onShowToast}
            onClose={onClose}
          />

          <div className="mt-6 pt-4 border-t-2 border-black dark:border-neutral-700 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#FACC15] text-black font-black text-xs uppercase border-2 border-black brutal-shadow-sm brutal-btn"
            >
              Done
            </button>
          </div>

        </div>
      </div>
    )
  }

  return null
}
