import { useState, useRef, useEffect } from 'react'
import { 
  Bot, 
  Send, 
  X, 
  RotateCcw
} from 'lucide-react'

export default function FandomBot({ qaData, onShowToast }) {
  const botMsgCounterRef = useRef(0)

  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 'initial',
      sender: 'bot',
      text: "Hey! Looking for a new anime or need a Marvel timeline breakdown? Ask me anything across the 8 fandom universes!",
      timestamp: 'Just now',
      badge: 'Multiverse AI Engine v2.4'
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

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

  const handleSendPrompt = (promptText) => {
    if (!promptText.trim()) return

    botMsgCounterRef.current += 1
    // Add user message
    const userMsg = {
      id: `user-${botMsgCounterRef.current}`,
      sender: 'user',
      text: promptText,
      timestamp: 'Just now'
    }

    setMessages(prev => [...prev, userMsg])
    setInputValue('')
    setIsTyping(true)

    // Simulate AI thinking and reply
    setTimeout(() => {
      let botReply = qaData[promptText]

      if (!botReply) {
        // Fallback contextual response for custom questions
        botReply = {
          reply: `Great question about "${promptText}"! In the Fan Hub Plus canon matrix, this spans multiple lore arcs. Our curators recommend checking the Universe Category directory and verified community discussions for in-depth source analysis.`,
          badge: 'Live Canon Query',
          universe: 'Multiverse'
        }
      }

      botMsgCounterRef.current += 1
      const botMsg = {
        id: `bot-${botMsgCounterRef.current}`,
        sender: 'bot',
        text: botReply.reply,
        badge: botReply.badge,
        timestamp: 'Just now'
      }

      setMessages(prev => [...prev, botMsg])
      setIsTyping(false)
    }, 700)
  }



  const handleResetChat = () => {
    setMessages([
      {
        id: 'initial',
        sender: 'bot',
        text: "Hey! Looking for a new anime or need a Marvel timeline breakdown? Ask me anything across the 8 fandom universes!",
        timestamp: 'Just now',
        badge: 'Multiverse AI Engine v2.4'
      }
    ])
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
          className="fixed bottom-2 right-1 sm:bottom-4 sm:right-2 z-50 w-[95vw] sm:w-[380px] md:w-[420px] bg-white dark:bg-[#161B22] border-3 border-black dark:border-white brutal-shadow-lg flex flex-col max-h-[65vh] sm:max-h-[70vh] md:max-h-[80vh] h-[450px] sm:h-[500px] md:h-[580px] animate-in slide-in-from-bottom duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="fandombot-header"
        >
          {/* Header */}
          <div className="bg-[#FACC15] text-black p-2 sm:p-3 border-b-3 border-black flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <div className="p-0.5 sm:p-1 bg-black text-[#FACC15] border border-black">
                <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <div>
                <h3 id="fandombot-header" className="font-black text-[10px] sm:text-sm uppercase tracking-tight leading-tight">
                  FANDOMBOT AI
                </h3>
                <span className="font-mono text-[8px] sm:text-[10px] font-bold uppercase tracking-wider block">
                  ● ONLINE
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
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
