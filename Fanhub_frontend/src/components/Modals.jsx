import { useEffect, useState } from 'react'
import {
  X,
  Bookmark,
  Check,
  Upload,
  Trash2
} from 'lucide-react'
import Login from './Login'
import Register from './Register'


export default function Modals({
  activeModal,
  activeLoreCharacter,
  onClose,
  onShowToast,
  bookmarkedItems,
  toggleBookmark
}) {
  // Auth Form State
  const [authMode, setAuthMode] = useState(activeModal === 'register' ? 'register' : 'login')

  useEffect(() => {
    if (activeModal === 'login' || activeModal === 'register') {
      setAuthMode(activeModal)
    }
  }, [activeModal])

  // Feedback State
  const [feedbackCategory, setFeedbackCategory] = useState('bug')
  const [feedbackMessage, setFeedbackMessage] = useState('')

  // Fan Submission State
  const [subTitle, setSubTitle] = useState('')
  const [subUniverse, setSubUniverse] = useState('anime')
  const [subContent, setSubContent] = useState('')

  // Mock Admin Moderation Queue
  const [moderationItems, setModerationItems] = useState([
    {
      id: 'mod-1',
      title: 'Neon Genesis Evangelion: The Instrumentality Timeline Paradox',
      author: 'Shinji_K007',
      universe: 'Anime',
      type: 'Lore Essay',
      status: 'Pending Admin Review',
      submittedAt: 'Today, 10:14 AM'
    },
    {
      id: 'mod-2',
      title: 'Elden Ring: Shadow of the Erdtree Miquella Motive Analysis',
      author: 'TarnishedSage',
      universe: 'Gaming',
      type: 'Theory Bible',
      status: 'Pending Admin Review',
      submittedAt: 'Yesterday, 04:30 PM'
    },
    {
      id: 'mod-3',
      title: 'Spider-Man 2099 Monowire Prop 3D Build Log',
      author: 'CyberCrafter_99',
      universe: 'Cosplay',
      type: 'Crafting Guide',
      status: 'Approved & Published',
      submittedAt: '2 days ago'
    }
  ])

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
                onClick={() => toggleBookmark(activeLoreCharacter.id, activeLoreCharacter.name, 'Character Lore')}
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

              <div className="p-3 bg-neutral-100 dark:bg-[#0D1117] border-2 border-black dark:border-neutral-700 space-y-2 text-xs font-mono">
                <div className="flex justify-between border-b border-black/10 dark:border-neutral-800 pb-1.5">
                  <span className="text-neutral-500 font-bold">PRIMARY WEAPON / RELIC:</span>
                  <span className="font-black text-black dark:text-white">{activeLoreCharacter.details.weapon}</span>
                </div>
                <div className="flex justify-between border-b border-black/10 dark:border-neutral-800 pb-1.5">
                  <span className="text-neutral-500 font-bold">PRIMARY ARCHNEMESIS:</span>
                  <span className="font-black text-[#F43F5E]">{activeLoreCharacter.details.nemesis}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500 font-bold">FIRST CANON APPEARANCE:</span>
                  <span className="font-black text-black dark:text-white">{activeLoreCharacter.details.firstAppearance}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    toggleBookmark(activeLoreCharacter.id, activeLoreCharacter.name, 'Character Lore')
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
            {isRegister ? <Register onShowToast={onShowToast} onClose={onClose} /> : <Login onShowToast={onShowToast} onClose={onClose} />}
          </div>

        </div>
      </div>
    )
  }

  // ================= 3. ADMIN CONTROL PANEL & MODERATION QUEUE =================
  if (activeModal === 'admin' || activeModal === 'moderation') {
    const handleApprove = (id, title) => {
      setModerationItems(prev => prev.map(item => item.id === id ? { ...item, status: 'Approved & Published' } : item))
      onShowToast({
        title: 'Submission Approved',
        message: `"${title}" has been verified and published to Community Vault.`,
        type: 'success'
      })
    }

    const handleReject = (id, title) => {
      setModerationItems(prev => prev.filter(item => item.id !== id))
      onShowToast({
        title: 'Submission Declined',
        message: `"${title}" removed from queue per SRS criteria.`,
        type: 'warning'
      })
    }

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in"
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-modal-title"
        onClick={onClose}
      >
        <div className="relative w-full max-w-3xl bg-white dark:bg-[#161B22] border-3 border-black dark:border-white p-6 sm:p-8 brutal-shadow-lg max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
          
          <div className="flex items-center justify-between pb-3 border-b-2 border-black dark:border-neutral-700 mb-6">
            <div className="flex items-center gap-2">
              <span className="bg-[#F43F5E] text-white font-mono font-black text-xs px-2.5 py-1 border-2 border-black brutal-shadow-sm">
                ADMIN ACCESS
              </span>
              <div>
                <h3 id="admin-modal-title" className="text-xl sm:text-2xl font-black uppercase tracking-tight text-black dark:text-white">
                  SRS MODERATION QUEUE & AUDIT
                </h3>
                <span className="font-mono text-xs font-bold text-neutral-500 uppercase">
                  TechWiz 7 Admin Gatekeeper Pipeline
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

          <p className="text-xs text-neutral-700 dark:text-neutral-300 font-medium mb-6">
            In compliance with SRS TechWiz 7 Section 1.5, all user-generated canon lore, fan essays, and cosplay build guides must pass administrator vetting prior to indexing in the Community Vault.
          </p>

          <div className="space-y-3">
            {moderationItems.map((item) => (
              <div 
                key={item.id} 
                className="p-4 border-2 border-black dark:border-neutral-700 bg-neutral-50 dark:bg-[#0D1117] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 brutal-shadow-sm"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 border border-black bg-[#FACC15] text-black">
                      {item.universe}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-neutral-500">
                      {item.type} • by {item.author}
                    </span>
                  </div>
                  <h4 className="font-black text-sm uppercase text-black dark:text-white">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1 text-[11px] font-mono">
                    <span className={item.status.includes('Approved') ? 'text-emerald-500 font-black' : 'text-amber-500 font-bold'}>
                      ● {item.status}
                    </span>
                    <span className="text-neutral-400">• {item.submittedAt}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
                  {item.status.includes('Pending') ? (
                    <>
                      <button
                        onClick={() => handleApprove(item.id, item.title)}
                        className="flex-1 sm:flex-initial px-3 py-1.5 bg-[#A3E635] text-black font-black text-xs uppercase border border-black brutal-shadow-sm brutal-btn flex items-center justify-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" /> Approve
                      </button>
                      <button
                        onClick={() => handleReject(item.id, item.title)}
                        className="flex-1 sm:flex-initial px-3 py-1.5 bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 font-bold text-xs uppercase border border-black brutal-shadow-sm brutal-btn flex items-center justify-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Decline
                      </button>
                    </>
                  ) : (
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-xs font-bold border border-emerald-500">
                      Indexed in Vault
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t-2 border-black dark:border-neutral-700 flex justify-end">
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
    const handleFeedbackSubmit = (e) => {
      e.preventDefault()
      onShowToast({
        title: 'Feedback Recorded!',
        message: 'Thank you for helping us polish Fan Hub Plus for TechWiz 7.',
        type: 'success'
      })
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
                Category
              </label>
              <select
                value={feedbackCategory}
                onChange={(e) => setFeedbackCategory(e.target.value)}
                className="w-full border-2 border-black dark:border-white p-2 text-xs font-bold bg-neutral-50 dark:bg-[#0D1117] text-black dark:text-white focus:outline-none"
              >
                <option value="bug">🐛 Bug Report (Visual / Functional)</option>
                <option value="lore">📖 Lore / Canon Correction</option>
                <option value="feature">💡 Feature Suggestion</option>
                <option value="accessibility">♿ Accessibility Improvement</option>
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
              className="w-full py-3 bg-[#FACC15] text-black font-black text-xs uppercase tracking-tight border-2 border-black brutal-shadow brutal-btn"
            >
              Submit Ticket to TechWiz 7 Engineers
            </button>
          </form>

        </div>
      </div>
    )
  }

  // ================= 5. FAN SUBMISSION MODAL =================
  if (activeModal === 'submission') {
    const handleSubSubmit = (e) => {
      e.preventDefault()
      onShowToast({
        title: 'Submission Received!',
        message: 'Your entry has been forwarded to the Admin Moderation Queue for verification.',
        type: 'success'
      })
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
                Title of Creation / Lore Theory
              </label>
              <input
                type="text"
                required
                value={subTitle}
                onChange={(e) => setSubTitle(e.target.value)}
                placeholder="e.g. Analysis of the Void Century Ancient Weapons"
                className="w-full border-2 border-black dark:border-white p-2.5 text-xs font-bold bg-neutral-50 dark:bg-[#0D1117] text-black dark:text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-black uppercase text-black dark:text-white mb-1">
                Target Universe
              </label>
              <select
                value={subUniverse}
                onChange={(e) => setSubUniverse(e.target.value)}
                className="w-full border-2 border-black dark:border-white p-2 text-xs font-bold bg-neutral-50 dark:bg-[#0D1117] text-black dark:text-white focus:outline-none"
              >
                <option value="anime">🍙 Anime</option>
                <option value="gaming">🎮 Gaming</option>
                <option value="movies-tv">🎬 Movies & TV</option>
                <option value="kpop">🎤 K-Pop</option>
                <option value="comics">💥 Comics</option>
                <option value="manga">📖 Manga</option>
                <option value="cosplay">🎭 Cosplay</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono font-black uppercase text-black dark:text-white mb-1">
                Essay Body / Build Breakdown
              </label>
              <textarea
                required
                rows={5}
                value={subContent}
                onChange={(e) => setSubContent(e.target.value)}
                placeholder="Detail your canon references, chapter citations, or cosplay build steps..."
                className="w-full border-2 border-black dark:border-white p-2.5 text-xs font-medium bg-neutral-50 dark:bg-[#0D1117] text-black dark:text-white focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#A3E635] text-black font-black text-xs uppercase tracking-tight border-2 border-black brutal-shadow brutal-btn flex items-center justify-center gap-1.5"
            >
              <Upload className="w-4 h-4" />
              <span>Submit to Admin Verification Queue</span>
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
              <span className="bg-[#FACC15] text-black font-mono font-black text-xs px-2.5 py-1 border border-black">
                TECHWIZ 7
              </span>
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
              <div className="flex items-center gap-2 text-black dark:text-white font-bold">
                <Check className="w-4 h-4 text-[#A3E635]" /> Full Compliance with TechWiz 7 SRS Spec 1.9
              </div>
            </div>

            <p>
              Developed as a Single Page Application (SPA) leveraging React 19, Tailwind CSS, Lucide React, and client-side reactive state management.
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
    const bookmarkedCount = Object.keys(bookmarkedItems).length

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dash-modal-title"
        onClick={onClose}
      >
        <div className="relative w-full max-w-2xl bg-white dark:bg-[#161B22] border-3 border-black dark:border-white p-6 sm:p-8 brutal-shadow-lg max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
          
          <div className="flex items-center justify-between pb-3 border-b-2 border-black dark:border-neutral-700 mb-6">
            <div className="flex items-center gap-2">
              <span className="bg-[#A3E635] text-black font-mono font-black text-xs px-2.5 py-1 border border-black">
                COLLECTOR VAULT
              </span>
              <h3 id="dash-modal-title" className="text-xl font-black uppercase tracking-tight text-black dark:text-white">
                USER TELEMETRY & BOOKMARKS
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

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="p-3 bg-neutral-100 dark:bg-[#0D1117] border-2 border-black dark:border-neutral-700 text-center">
              <span className="font-mono text-2xl font-black text-black dark:text-white block">
                {bookmarkedCount}
              </span>
              <span className="font-mono text-[10px] uppercase font-bold text-neutral-500">
                Bookmarks Saved
              </span>
            </div>
            <div className="p-3 bg-neutral-100 dark:bg-[#0D1117] border-2 border-black dark:border-neutral-700 text-center">
              <span className="font-mono text-2xl font-black text-black dark:text-white block">
                8 / 8
              </span>
              <span className="font-mono text-[10px] uppercase font-bold text-neutral-500">
                Sectors Explored
              </span>
            </div>
            <div className="p-3 bg-neutral-100 dark:bg-[#0D1117] border-2 border-black dark:border-neutral-700 text-center">
              <span className="font-mono text-2xl font-black text-black dark:text-white block">
                Tier 4
              </span>
              <span className="font-mono text-[10px] uppercase font-bold text-neutral-500">
                Hub Rank
              </span>
            </div>
          </div>

          {/* Bookmarked items list */}
          <div>
            <h4 className="font-mono text-xs font-black uppercase tracking-wider text-black dark:text-white mb-2">
              SAVED VAULT ITEMS
            </h4>
            {bookmarkedCount === 0 ? (
              <div className="p-6 bg-neutral-50 dark:bg-[#0D1117] border-2 border-dashed border-black dark:border-neutral-700 text-center">
                <Bookmark className="w-6 h-6 mx-auto text-neutral-400 mb-2" />
                <p className="font-bold text-xs text-neutral-600 dark:text-neutral-400">
                  No items bookmarked yet! Click the bookmark icon on any character or trailer to save them here.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {Object.entries(bookmarkedItems).map(([id, item]) => (
                  <div 
                    key={id}
                    className="p-3 bg-white dark:bg-[#0D1117] border-2 border-black dark:border-neutral-700 flex items-center justify-between gap-2"
                  >
                    <div>
                      <span className="text-[10px] font-mono font-bold text-[#F43F5E] uppercase block">
                        {item.type || 'Fandom Entry'}
                      </span>
                      <h5 className="font-black text-xs uppercase text-black dark:text-white">
                        {item.title}
                      </h5>
                    </div>
                    <button
                      onClick={() => toggleBookmark(id, item.title, item.type)}
                      className="text-xs font-bold text-red-500 hover:underline px-2 py-1"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

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
