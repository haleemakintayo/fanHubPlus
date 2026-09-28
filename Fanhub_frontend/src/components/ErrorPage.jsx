import { useState } from 'react'
import {
  AlertTriangle,
  ShieldAlert,
  Lock,
  Compass,
  ServerCrash,
  WifiOff,
  Clock,
  ZapOff,
  Wrench,
  ArrowLeft,
  Home,
  RotateCcw,
  MessageSquarePlus,
  LogIn,
  Terminal,
  Sparkles,
} from 'lucide-react'
import { UNIVERSES } from '../data/fandomData'

export const ERROR_CATALOG = {
  400: {
    code: 400,
    slug: 'MALFORMED_SIGNAL',
    title: 'Bad Request // Corrupted Coordinates',
    subtitle: 'The multiverse relay could not parse your request payload or query parameters.',
    accent: '#FB923C',
    badgeBg: 'bg-[#FB923C] text-black',
    icon: AlertTriangle,
    loreQuote: '“Check your alchemy circle—one misplaced rune corrupts the entire transmutation.”',
    causes: [
      'Malformed URL query parameters or invalid filter syntax',
      'Corrupted JSON payload or missing required form fields',
      'Invalid character or content identifier format',
    ],
    remedy: 'Verify the URL or form fields and retry your request from the main portal.',
  },
  401: {
    code: 401,
    slug: 'CLEARANCE_REQUIRED',
    title: 'Unauthorized // Identity Unverified',
    subtitle: 'Your collector session token is missing, expired, or has not been authenticated.',
    accent: '#FACC15',
    badgeBg: 'bg-[#FACC15] text-black',
    icon: Lock,
    loreQuote: '“No Hunter License detected. Present valid credentials to enter the restricted floor.”',
    causes: [
      'JWT access token expired or cleared from local storage',
      'Attempting to modify personal bookmarks, ratings, or profile without signing in',
      'Session invalidated after password reset or security logout',
    ],
    remedy: 'Sign in with your Fan Hub Plus account to restore full collector access.',
  },
  403: {
    code: 403,
    slug: 'SECTOR_LOCKED',
    title: 'Forbidden // Level-5 Clearance Only',
    subtitle: 'Your current account role does not have permission to access this sector.',
    accent: '#F43F5E',
    badgeBg: 'bg-[#F43F5E] text-white',
    icon: ShieldAlert,
    loreQuote: '“Beyond this gate lies the Central Dogma. Only High Command may proceed.”',
    causes: [
      'Attempting to access the Administrator Control Panel with a standard Member role',
      'CSRF verification failure or restricted API moderation endpoint',
      'Insufficient permissions for protected vault operations',
    ],
    remedy: 'Switch to an Administrator account (admin@fanhub.com) or return to the public portal.',
  },
  404: {
    code: 404,
    slug: 'TIMELINE_NOT_FOUND',
    title: 'Page Not Found // Erased From Canon',
    subtitle: 'The coordinates you entered point to a timeline branch that does not exist in the archive.',
    accent: '#A3E635',
    badgeBg: 'bg-[#A3E635] text-black',
    icon: Compass,
    loreQuote: '“Perhaps the archives are incomplete—or someone rewrote the World Line.”',
    causes: [
      'Mistyped URL path, universe slug, or article identifier',
      'The requested lore entry was moved or archived during canon restructuring',
      'Broken external deep-link or outdated bookmark reference',
    ],
    remedy: 'Jump to one of the 8 active Fandom Universes below or return to the Home Portal.',
  },
  405: {
    code: 405,
    slug: 'PROTOCOL_REJECTED',
    title: 'Method Not Allowed // Invalid Action Verb',
    subtitle: 'The target endpoint does not accept the HTTP method used for this transmission.',
    accent: '#C084FC',
    badgeBg: 'bg-[#C084FC] text-black',
    icon: ZapOff,
    loreQuote: '“Read-only holocrons cannot be overwritten with a direct strike.”',
    causes: [
      'Sending a POST/DELETE request to a read-only showcase endpoint',
      'Calling a POST-only authentication route via browser GET navigation',
    ],
    remedy: 'Use the interactive portal controls to perform supported actions.',
  },
  408: {
    code: 408,
    slug: 'SYNAPSE_TIMEOUT',
    title: 'Request Timeout // Neural Link Lag',
    subtitle: 'The server waited too long for the client transmission to complete.',
    accent: '#38BDF8',
    badgeBg: 'bg-[#38BDF8] text-black',
    icon: Clock,
    loreQuote: '“Sandevistan cooldown exceeded—connection dropped before packet completion.”',
    causes: [
      'Unstable local network connection or high packet latency',
      'Large media upload interrupted before completion',
    ],
    remedy: 'Check your connection and click Retry Transmission.',
  },
  429: {
    code: 429,
    slug: 'OVERCLOCK_LIMIT',
    title: 'Too Many Requests // Rate Limit Triggered',
    subtitle: 'You have sent too many rapid requests to the Fan Hub Plus API in a short window.',
    accent: '#FB7185',
    badgeBg: 'bg-[#FB7185] text-black',
    icon: ZapOff,
    loreQuote: '“Kaioken x20 pushed your stamina past the threshold! Cool down before attacking again.”',
    causes: [
      'Rapid automated polling or repeated form submissions',
      'API rate-limiter protecting server stability during peak drop hours',
    ],
    remedy: 'Wait a few seconds for your request quota to replenish, then try again.',
  },
  500: {
    code: 500,
    slug: 'CORE_MELTDOWN',
    title: 'Internal Server Error // Reactor Anomaly',
    subtitle: 'An unexpected runtime exception occurred inside the central multiverse engine.',
    accent: '#F43F5E',
    badgeBg: 'bg-[#F43F5E] text-white',
    icon: ServerCrash,
    loreQuote: '“MAGI System Melchior-1 reports an unhandled logic paradox in the core matrix.”',
    causes: [
      'Unhandled backend exception or database query failure',
      'Unexpected client component state crash caught by the Error Boundary',
      'Temporary serialization mismatch during live data sync',
    ],
    remedy: 'Reload the portal or submit a quick bug report so our engineers can patch the anomaly.',
  },
  502: {
    code: 502,
    slug: 'RELAY_DISRUPTED',
    title: 'Bad Gateway // Upstream Relay Fault',
    subtitle: 'The edge gateway received an invalid response from the upstream Django application server.',
    accent: '#FB923C',
    badgeBg: 'bg-[#FB923C] text-black',
    icon: WifiOff,
    loreQuote: '“Subspace relay station 07 returned garbled static instead of telemetry.”',
    causes: [
      'Backend API server is restarting or reloading migrations',
      'Reverse proxy could not complete handshake with the upstream worker',
    ],
    remedy: 'Ensure the backend server is running and retry in a few moments.',
  },
  503: {
    code: 503,
    slug: 'MAINTENANCE_MODE',
    title: 'Service Unavailable // Scheduled Calibration',
    subtitle: 'The Fan Hub Plus vault is temporarily offline for scheduled maintenance or high load.',
    accent: '#34D399',
    badgeBg: 'bg-[#34D399] text-black',
    icon: Wrench,
    loreQuote: '“Eva Cage locked for LCL pressurization and armor recalibration. Stand by.”',
    causes: [
      'Database migration or seed synchronization in progress',
      'Server temporarily scaled down for maintenance window',
    ],
    remedy: 'Offline cached browsing remains available—return to the Home Portal to explore static lore.',
  },
  504: {
    code: 504,
    slug: 'GATEWAY_DESYNC',
    title: 'Gateway Timeout // Deep Space Uplink Lost',
    subtitle: 'The upstream server failed to respond before the gateway timeout window expired.',
    accent: '#38BDF8',
    badgeBg: 'bg-[#38BDF8] text-black',
    icon: Clock,
    loreQuote: '“Warp jump calculation exceeded maximum safe threshold. Aborting jump.”',
    causes: [
      'Heavy analytics aggregation or slow database connection',
      'Upstream service unreachable from the gateway node',
    ],
    remedy: 'Retry the request or return to the Home Portal.',
  },
}

export const SUPPORTED_ERROR_CODES = Object.keys(ERROR_CATALOG).map(Number)

export default function ErrorPage({
  statusCode = 404,
  requestedPath = '',
  customMessage = '',
  onNavigateHome,
  onSelectUniverse,
  onOpenModal,
  onChangeStatusCode,
}) {
  const [selectedCode, setSelectedCode] = useState(
    ERROR_CATALOG[Number(statusCode)] ? Number(statusCode) : 404
  )

  const activeCode = ERROR_CATALOG[Number(statusCode)] ? Number(statusCode) : selectedCode
  const currentError = ERROR_CATALOG[selectedCode] || ERROR_CATALOG[activeCode] || ERROR_CATALOG[404]
  const IconComponent = currentError.icon

  const handleSelectCode = (code) => {
    setSelectedCode(code)
    if (onChangeStatusCode) {
      onChangeStatusCode(code)
    }
  }

  const displayPath =
    requestedPath ||
    (typeof window !== 'undefined' ? window.location.pathname + window.location.search : '/unknown')

  return (
    <section
      aria-labelledby="error-page-heading"
      className="py-10 sm:py-16 px-3 sm:px-6 lg:px-8 bg-[#FDFBF7] dark:bg-[#0D1117] border-b-3 border-black dark:border-neutral-100 transition-colors"
    >
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Status Code Switcher Bar (Interactive Error Code Explorer) */}
        <div className="p-3 sm:p-4 bg-white dark:bg-[#161B22] border-2 border-black dark:border-neutral-700 brutal-shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#F43F5E]" />
              <span className="font-mono text-xs font-black uppercase tracking-wider text-black dark:text-white">
                System Diagnostic Status Matrix (Preview Error Codes)
              </span>
            </div>
            <span className="font-mono text-[11px] text-neutral-500 dark:text-neutral-400">
              Click any HTTP code to inspect its recovery state
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {SUPPORTED_ERROR_CODES.map((code) => {
              const item = ERROR_CATALOG[code]
              const isSelected = currentError.code === code
              return (
                <button
                  key={code}
                  type="button"
                  onClick={() => handleSelectCode(code)}
                  className={`px-2.5 py-1 font-mono text-xs font-black uppercase border-2 border-black transition-transform ${
                    isSelected
                      ? `${item.badgeBg} brutal-shadow-sm -translate-y-0.5`
                      : 'bg-neutral-100 dark:bg-[#0D1117] text-neutral-800 dark:text-neutral-200 hover:bg-[#FACC15] hover:text-black'
                  }`}
                >
                  HTTP {code}
                </button>
              )
            })}
          </div>
        </div>

        {/* Main Neo-Brutalist Error Card */}
        <div className="bg-white dark:bg-[#161B22] border-3 border-black dark:border-white brutal-shadow overflow-hidden">
          {/* Top Alert Banner */}
          <div
            className="px-4 sm:px-6 py-3 border-b-3 border-black flex flex-wrap items-center justify-between gap-2"
            style={{ backgroundColor: currentError.accent }}
          >
            <div className="flex items-center gap-2 text-black font-mono font-black text-xs sm:text-sm uppercase">
              <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
              <span>
                SYSTEM ALERT // HTTP {currentError.code} • {currentError.slug}
              </span>
            </div>
            <span className="bg-black text-white font-mono text-[10px] sm:text-xs font-bold px-2 py-0.5 uppercase">
              STATUS: INTERCEPTED
            </span>
          </div>

          {/* Body Content */}
          <div className="p-5 sm:p-8 md:p-10 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b-2 border-black/15 dark:border-neutral-700">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-black text-[#FACC15] font-mono text-xs font-black uppercase border border-black">
                  <span>ERROR CODE {currentError.code}</span>
                </div>
                <h1
                  id="error-page-heading"
                  className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-black dark:text-white leading-none"
                >
                  {currentError.title}
                </h1>
                <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 font-medium max-w-2xl pt-1">
                  {customMessage || currentError.subtitle}
                </p>
              </div>

              {/* Giant Status Number Stamp */}
              <div
                className="shrink-0 self-start md:self-center px-6 py-4 border-3 border-black brutal-shadow-sm text-center select-none"
                style={{ backgroundColor: currentError.accent }}
              >
                <span className="block font-mono text-[10px] font-black uppercase text-black/80">
                  HTTP STATUS
                </span>
                <span className="font-mono text-5xl sm:text-6xl font-black text-black leading-none tracking-tighter">
                  {currentError.code}
                </span>
              </div>
            </div>

            {/* Lore Quote Callout */}
            <blockquote className="p-4 bg-[#FDFBF7] dark:bg-[#0D1117] border-l-4 border-black dark:border-[#FACC15] font-mono text-xs sm:text-sm italic text-neutral-800 dark:text-neutral-200">
              {currentError.loreQuote}
            </blockquote>

            {/* Telemetry & Root Causes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Diagnostic Telemetry */}
              <div className="p-4 bg-neutral-900 text-neutral-100 border-2 border-black font-mono text-xs space-y-2">
                <div className="flex items-center justify-between text-[#A3E635] font-bold border-b border-neutral-700 pb-1.5">
                  <span>// TELEMETRY TRACE</span>
                  <span>LIVE DIAGNOSTIC</span>
                </div>
                <div className="space-y-1 text-[11px] sm:text-xs">
                  <p>
                    <span className="text-neutral-400">STATUS_CODE:</span>{' '}
                    <span className="text-[#FACC15] font-bold">{currentError.code}</span>
                  </p>
                  <p>
                    <span className="text-neutral-400">SIGNAL_FLAG:</span>{' '}
                    <span className="text-[#38BDF8] font-bold">{currentError.slug}</span>
                  </p>
                  <p className="truncate">
                    <span className="text-neutral-400">TARGET_URI:</span>{' '}
                    <span className="text-white">{displayPath}</span>
                  </p>
                  <p>
                    <span className="text-neutral-400">RECOVERY:</span>{' '}
                    <span className="text-[#34D399]">{currentError.remedy}</span>
                  </p>
                </div>
              </div>

              {/* Probable Causes */}
              <div className="p-4 bg-neutral-100 dark:bg-[#0D1117] border-2 border-black dark:border-neutral-700 space-y-2">
                <h2 className="font-mono text-xs font-black uppercase text-black dark:text-white border-b border-black/20 dark:border-neutral-700 pb-1.5">
                  Probable Anomaly Triggers
                </h2>
                <ul className="space-y-1.5 text-xs text-neutral-700 dark:text-neutral-300 font-medium list-disc list-inside">
                  {currentError.causes.map((cause, idx) => (
                    <li key={idx}>{cause}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => (onNavigateHome ? onNavigateHome() : (window.location.href = '/'))}
                className="px-4 py-2.5 bg-[#A3E635] text-black font-mono font-black text-xs sm:text-sm uppercase border-2 border-black brutal-shadow-sm brutal-btn flex items-center gap-2"
              >
                <Home className="w-4 h-4" />
                <span>Return to Home Portal</span>
              </button>

              <button
                type="button"
                onClick={() => window.history.back()}
                className="px-4 py-2.5 bg-white dark:bg-[#0D1117] text-black dark:text-white font-mono font-black text-xs sm:text-sm uppercase border-2 border-black dark:border-white brutal-shadow-sm brutal-btn flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Go Back</span>
              </button>

              <button
                type="button"
                onClick={() => window.location.reload()}
                className="px-4 py-2.5 bg-[#FACC15] text-black font-mono font-black text-xs sm:text-sm uppercase border-2 border-black brutal-shadow-sm brutal-btn flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retry Transmission</span>
              </button>

              {currentError.code === 401 && onOpenModal && (
                <button
                  type="button"
                  onClick={() => onOpenModal('login')}
                  className="px-4 py-2.5 bg-[#38BDF8] text-black font-mono font-black text-xs sm:text-sm uppercase border-2 border-black brutal-shadow-sm brutal-btn flex items-center gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In Now</span>
                </button>
              )}

              {onOpenModal && (
                <button
                  type="button"
                  onClick={() => onOpenModal('feedback')}
                  className="px-4 py-2.5 bg-[#F43F5E] text-white font-mono font-black text-xs sm:text-sm uppercase border-2 border-black brutal-shadow-sm brutal-btn flex items-center gap-2"
                >
                  <MessageSquarePlus className="w-4 h-4" />
                  <span>Report Anomaly</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Quick Jump to the 8 Fandom Universes */}
        <div className="p-5 bg-white dark:bg-[#161B22] border-2 border-black dark:border-neutral-700 brutal-shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#FACC15]" />
            <h3 className="font-mono text-xs font-black uppercase text-black dark:text-white">
              Fast-Travel Relay // Jump Directly to an Active Universe
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {UNIVERSES.map((u) => (
              <button
                key={u.slug}
                type="button"
                onClick={() => onSelectUniverse && onSelectUniverse(u.slug)}
                className="px-3 py-2 bg-[#FDFBF7] dark:bg-[#0D1117] hover:bg-[#FACC15] hover:text-black text-black dark:text-white border-2 border-black dark:border-neutral-600 font-mono text-xs font-bold uppercase flex items-center gap-2 transition-colors text-left"
              >
                <span
                  className="w-2.5 h-2.5 border border-black shrink-0"
                  style={{ backgroundColor: u.accentColor }}
                />
                <span className="truncate">{u.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
