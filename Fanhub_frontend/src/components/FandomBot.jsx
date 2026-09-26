import { useState, useRef, useEffect } from 'react'
import { 
  Bot, 
  Send, 
  X, 
  RotateCcw,
  Compass,
  CheckCircle2,
  ArrowRight
} from 'lucide-react'
import { chatbotApi, formatApiError } from '../services/api'

const INITIAL_MESSAGE = {
  id: 'initial',
  sender: 'bot',
  text: "Hey! Looking for a new anime or need a Marvel timeline breakdown? Ask me anything across the 8 fandom universes—or use the 3-Step Guided Tour above to customize your hub!",
  timestamp: 'Just now',
  badge: 'Multiverse AI Engine'
}

const ONBOARDING_UNIVERSES = [
  { id: 'anime', label: 'Anime', color: '#A3E635' },
  { id: 'gaming', label: 'Gaming', color: '#FACC15' },
  { id: 'movies-tv', label: 'Movies & TV', color: '#38BDF8' },
  { id: 'kpop', label: 'K-Pop', color: '#F43F5E' },
  { id: 'comics', label: 'Comics', color: '#FB7185' },
  { id: 'manga', label: 'Manga', color: '#FB923C' },
  { id: 'cosplay', label: 'Cosplay', color: '#C084FC' },
  { id: 'community-vault', label: 'Community Vault', color: '#34D399' },
]

const ONBOARDING_FORMATS = [
  { id: '#content-explorer', label: 'Lore Dossiers & Timelines', prompt: 'Show me the top canon lore timelines and articles' },
  { id: '#multimedia', label: '4K Trailers & OST Audio', prompt: 'What are the highest rated trailers and soundtracks streaming now?' },
  { id: '#characters', label: 'Character Bios & Power Stats', prompt: 'Who are the strongest characters in the archive?' },
  { id: '#events', label: 'Conventions & Drop Radar', prompt: 'Upcoming gaming conventions in Q4' },
]

function createSessionId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return `web-${crypto.randomUUID()}`
  }
  return `web-${Date.now()}-${Math.random().toString(36).slice(2)}`
}

function getStoredSessionId() {
  if (typeof window === 'undefined') return createSessionId()
  const storedSessionId = localStorage.getItem('fanhub_chatbot_session')
  if (storedSessionId) return storedSessionId
  const sessionId = createSessionId()
  localStorage.setItem('fanhub_chatbot_session', sessionId)
  return sessionId
}

export default function FandomBot({ onShowToast, onCompleteOnboarding }) {
  const botMsgCounterRef = useRef(0)
  const historyLoadedRef = useRef(false)

  const [isOpen, setIsOpen] = useState(false)
  const [sessionId, setSessionId] = useState(getStoredSessionId)
  const [messages, setMessages] = useState([INITIAL_MESSAGE])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  // Multi-step Guided Onboarding state for first-time visitors
  const [showOnboarding, setShowOnboarding] = useState(() => {
    if (typeof window === 'undefined') return true
    return localStorage.getItem('fanhub_onboarded') !== 'true'
  })
  const [onboardingStep, setOnboardingStep] = useState(1)
  const [selectedUniverse, setSelectedUniverse] = useState(ONBOARDING_UNIVERSES[0])
  const [selectedFormat, setSelectedFormat] = useState(ONBOARDING_FORMATS[0])

  const promptChips = [
    "Recommend me an anime like Attack on Titan",
    "Where do I start reading X-Men comics?",
    "Upcoming gaming conventions in Q4"
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
    }
  }, [messages, isOpen, isTyping])

  useEffect(() => {
    if (!isOpen || historyLoadedRef.current) return

    let isCancelled = false
    chatbotApi.getHistory(sessionId)
      .then((history) => {
        if (isCancelled || !Array.isArray(history) || history.length === 0) return
        setMessages([
          INITIAL_MESSAGE,
          ...history.flatMap((entry, index) => [
            {
              id: `history-user-${entry.id || index}`,
              sender: 'user',
              text: entry.message,
              timestamp: new Date(entry.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            },
            {
              id: `history-bot-${entry.id || index}`,
              sender: 'bot',
              text: entry.response,
              timestamp: new Date(entry.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              badge: entry.matched_faq ? 'Curated FAQ' : 'Gemini AI',
            },
          ]),
        ])
      })
      .catch(() => {
        // A missing history should not prevent a new conversation.
      })
      .finally(() => {
        if (!isCancelled) historyLoadedRef.current = true
      })

    return () => {
      isCancelled = true
    }
  }, [isOpen, sessionId])

  const handleSendPrompt = async (promptText) => {
    if (!promptText.trim()) return

    botMsgCounterRef.current += 1
    const userMsg = {
      id: `user-${botMsgCounterRef.current}`,
      sender: 'user',
      text: promptText,
      timestamp: 'Just now'
    }

    setMessages(prev => [...prev, userMsg])
    setInputValue('')
    setIsTyping(true)

    try {
      const botReply = await chatbotApi.sendMessage(promptText, sessionId)
      botMsgCounterRef.current += 1
      const botMsg = {
        id: `bot-${botMsgCounterRef.current}`,
        sender: 'bot',
        text: botReply.response,
        badge: botReply.badge,
        timestamp: 'Just now'
      }

      setMessages(prev => [...prev, botMsg])
    } catch (error) {
      setMessages(prev => [...prev, {
        id: `error-${Date.now()}`,
        sender: 'bot',
        text: formatApiError(error.data, error.message || 'FandomBot is temporarily unavailable. Please try again.'),
        badge: 'Connection Notice',
        timestamp: 'Just now'
      }])
    } finally {
      setIsTyping(false)
    }
  }

  const handleFinishOnboarding = () => {
    localStorage.setItem('fanhub_onboarded', 'true')
    setShowOnboarding(false)
    onCompleteOnboarding?.({
      universeSlug: selectedUniverse.id,
      universeName: selectedUniverse.label,
      sectionSelector: selectedFormat.id,
    })

    botMsgCounterRef.current += 1
    setMessages(prev => [
      ...prev,
      {
        id: `onboard-${botMsgCounterRef.current}`,
        sender: 'bot',
        text: `Guided Setup Complete! I've calibrated your view to the **${selectedUniverse.label}** universe and jumped to **${selectedFormat.label}**. Ask me any canon lore questions anytime!`,
        badge: 'Guided Onboarding • Step 3/3',
        timestamp: 'Just now'
      }
    ])
  }

  const handleResetChat = () => {
    const nextSessionId = createSessionId()
    localStorage.setItem('fanhub_chatbot_session', nextSessionId)
    setSessionId(nextSessionId)
    historyLoadedRef.current = true
    setMessages([INITIAL_MESSAGE])
    onShowToast({
      title: 'Chat Reset',
      message: 'FandomBot session memory cleared.',
      type: 'info'
    })
  }

  return (
    <>
      {/* Floating Bottom-Right Action Button */}
      <div className="fixed bottom-4 right-4 z-40 sm:bottom-6 sm:right-6">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="group flex items-center gap-1.5 sm:gap-2.5 px-3 py-2 sm:px-4 sm:py-3 bg-[#FACC15] text-black font-black text-[10px] sm:text-sm uppercase tracking-tight border-3 border-black brutal-shadow-lg brutal-btn relative"
            aria-label="Ask FandomBot AI Assistant"
          >
            {/* Active pulse notification badge */}
            <span className="absolute -top-1.5 -right-1.5 flex h-3 w-3 sm:h-4 sm:w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F43F5E] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-4 sm:w-4 bg-[#F43F5E] border border-black text-[8px] sm:text-[9px] text-white font-bold items-center justify-center">
                1
              </span>
            </span>

            <div className="p-0.5 sm:p-1 bg-black text-[#FACC15] border border-black group-hover:rotate-6 transition-transform">
              <Bot className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span className="hidden sm:inline">Ask FandomBot 🤖</span>
          </button>
        )}
      </div>

      {/* Slide-Up Interactive FandomBot Drawer / Modal */}
      {isOpen && (
        <div
          className="fixed bottom-2 right-1 sm:bottom-4 sm:right-2 z-50 w-[95vw] sm:w-[390px] md:w-[430px] bg-white dark:bg-[#161B22] border-3 border-black dark:border-white brutal-shadow-lg flex flex-col max-h-[75vh] sm:max-h-[80vh] h-[520px] sm:h-[580px] animate-in slide-in-from-bottom duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="fandombot-header"
        >
          {/* Header */}
          <div className="bg-[#FACC15] text-black p-2.5 sm:p-3 border-b-3 border-black flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <div className="p-1 bg-black text-[#FACC15] border border-black">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h3 id="fandombot-header" className="font-black text-xs sm:text-sm uppercase tracking-tight leading-tight">
                  FANDOMBOT AI
                </h3>
                <span className="font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-wider block">
                  ● ONLINE • LORE & GUIDE
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => {
                  setOnboardingStep(1)
                  setShowOnboarding((prev) => !prev)
                }}
                className={`px-2 py-1 text-[10px] font-mono font-black uppercase border border-black flex items-center gap-1 ${
                  showOnboarding ? 'bg-black text-[#A3E635]' : 'bg-white text-black hover:bg-black hover:text-white'
                }`}
                title="Toggle 3-Step Guided Onboarding"
              >
                <Compass className="w-3 h-3" />
                <span>Guide</span>
              </button>
              <button
                onClick={handleResetChat}
                className="p-1 hover:bg-black/10 text-black border border-black rounded-none"
                title="Reset conversation"
                aria-label="Reset chat"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-black/10 text-black border border-black rounded-none"
                aria-label="Close FandomBot"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 3-Step Guided Multi-Step Onboarding Flow */}
          {showOnboarding && (
            <div className="bg-[#FDFBF7] dark:bg-[#0D1117] border-b-3 border-black dark:border-white p-3 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-black uppercase px-2 py-0.5 bg-[#A3E635] text-black border border-black">
                  GUIDED ONBOARDING • STEP {onboardingStep} OF 3
                </span>
                <button
                  type="button"
                  onClick={() => {
                    localStorage.setItem('fanhub_onboarded', 'true')
                    setShowOnboarding(false)
                  }}
                  className="font-mono text-[10px] font-bold uppercase text-neutral-500 hover:text-black dark:hover:text-white"
                >
                  Skip Tour ✕
                </button>
              </div>

              {onboardingStep === 1 && (
                <div>
                  <p className="font-black text-xs uppercase text-black dark:text-white mb-2">
                    1. Pick your primary Fandom Universe:
                  </p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {ONBOARDING_UNIVERSES.map((u) => {
                      const isSel = selectedUniverse.id === u.id
                      return (
                        <button
                          key={u.id}
                          type="button"
                          onClick={() => {
                            setSelectedUniverse(u)
                            setOnboardingStep(2)
                          }}
                          className={`px-2 py-1.5 text-left font-mono text-[10px] font-black uppercase border-2 border-black transition-all flex items-center justify-between ${
                            isSel ? 'bg-[#FACC15] text-black' : 'bg-white dark:bg-[#161B22] text-black dark:text-white'
                          }`}
                        >
                          <span>{u.label}</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {onboardingStep === 2 && (
                <div>
                  <p className="font-black text-xs uppercase text-black dark:text-white mb-2">
                    2. What do you want to explore in {selectedUniverse.label}?
                  </p>
                  <div className="space-y-1.5">
                    {ONBOARDING_FORMATS.map((fmt) => (
                      <button
                        key={fmt.id}
                        type="button"
                        onClick={() => {
                          setSelectedFormat(fmt)
                          setOnboardingStep(3)
                        }}
                        className="w-full px-2.5 py-1.5 text-left font-mono text-[10px] font-black uppercase border-2 border-black bg-white dark:bg-[#161B22] text-black dark:text-white hover:bg-[#FACC15] hover:text-black flex items-center justify-between"
                      >
                        <span>{fmt.label}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => setOnboardingStep(1)}
                    className="mt-1.5 font-mono text-[10px] font-bold uppercase text-neutral-500 underline"
                  >
                    ← Back to Step 1
                  </button>
                </div>
              )}

              {onboardingStep === 3 && (
                <div className="space-y-2">
                  <div className="p-2 bg-white dark:bg-[#161B22] border-2 border-black">
                    <div className="flex items-center gap-1.5 font-mono text-[10px] font-black uppercase text-[#10B981]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Launchpad Ready</span>
                    </div>
                    <p className="text-xs font-bold text-black dark:text-white mt-1">
                      Universe: <span className="underline">{selectedUniverse.label}</span> • Destination: <span className="underline">{selectedFormat.label}</span>
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setOnboardingStep(2)}
                      className="px-2.5 py-1.5 font-mono text-[10px] font-black uppercase border-2 border-black bg-white text-black"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={handleFinishOnboarding}
                      className="flex-1 py-1.5 px-3 bg-[#A3E635] text-black font-black text-xs uppercase border-2 border-black brutal-shadow-sm brutal-btn flex items-center justify-center gap-1.5"
                    >
                      <span>Launch My Curated Hub</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#FDFBF7] dark:bg-[#0D1117]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                {msg.badge && (
                  <span className="font-mono text-[10px] font-bold text-neutral-500 uppercase mb-1">
                    ⚡ {msg.badge}
                  </span>
                )}
                <div
                  className={`p-3 max-w-[90%] border-2 border-black text-xs sm:text-sm font-medium ${
                    msg.sender === 'user'
                      ? 'bg-[#38BDF8] text-black brutal-shadow-sm'
                      : 'bg-white dark:bg-[#161B22] text-black dark:text-white brutal-shadow-sm whitespace-pre-line'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[9px] font-mono text-neutral-400 mt-0.5">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 p-2.5 bg-white dark:bg-[#161B22] border-2 border-black max-w-xs brutal-shadow-sm">
                <Bot className="w-3.5 h-3.5 text-[#FACC15] animate-spin" />
                <span className="text-xs font-mono font-bold text-neutral-600 dark:text-neutral-300">
                  FandomBot is analyzing the multiverse archives...
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Starter Chips */}
          <div className="p-2.5 bg-neutral-100 dark:bg-[#161B22] border-t-2 border-black dark:border-neutral-700">
            <span className="text-[10px] font-mono font-black uppercase text-neutral-500 block mb-1.5">
              FREQUENTLY ASKED LORE QUERIES
            </span>
            <div className="flex flex-col gap-1.5">
              {promptChips.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendPrompt(chip)}
                  disabled={isTyping}
                  className="text-left px-2.5 py-1 text-xs font-bold text-black dark:text-white bg-white dark:bg-[#0D1117] border border-black hover:bg-[#FACC15] hover:text-black transition-colors truncate brutal-btn"
                >
                  💡 {chip}
                </button>
              ))}
            </div>
          </div>

          {/* Input Box Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSendPrompt(inputValue)
            }}
            className="p-3 bg-white dark:bg-[#0D1117] border-t-2 border-black dark:border-white flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask anything (e.g. Best RPG of 2026)..."
              disabled={isTyping}
              className="flex-1 bg-transparent font-medium text-xs sm:text-sm text-black dark:text-white placeholder:text-neutral-500 focus:outline-none"
              aria-label="Message to FandomBot"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="p-2 bg-[#A3E635] text-black border-2 border-black disabled:opacity-50 brutal-shadow-sm brutal-btn shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  )
}
