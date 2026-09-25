import { useState } from 'react'
import { 
  Sun, 
  Moon, 
  Type, 
  Menu, 
  X, 
  Compass, 
  Radio, 
  Users, 
  Calendar, 
  ShoppingBag, 
  FileText,
  LogIn,
  UserPlus,
  LogOut,
  User,
  ShieldAlert,
  LayoutDashboard,
  ArrowLeft
} from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import fanhubLogo from '../assets/fanhublogo.svg'

export default function Header({ 
  darkMode, 
  toggleDarkMode, 
  fontScale, 
  toggleFontScale, 
  onOpenAuth,
  activePage = 'home',
  onNavigatePage
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuth()

  const navLinks = [
    { name: 'Explore', href: '#explore', icon: Compass },
    { name: 'Multimedia', href: '#multimedia', icon: Radio },
    { name: 'Characters', href: '#characters', icon: Users },
    { name: 'Radar & Events', href: '#events', icon: Calendar },
    { name: 'Merch Showcase', href: '#merch', icon: ShoppingBag },
    { name: 'Sitemap', href: '#sitemap', icon: FileText },
  ]

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    if (onNavigatePage) {
      onNavigatePage('home', href)
      return
    }
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleOpenDashboardPage = () => {
    setMobileMenuOpen(false)
    if (onNavigatePage) {
      onNavigatePage('dashboard')
    } else {
      onOpenAuth?.('dashboard')
    }
  }

  const handleOpenAdminPage = () => {
    setMobileMenuOpen(false)
    if (onNavigatePage) {
      onNavigatePage('admin')
    } else {
      onOpenAuth?.('admin')
    }
  }

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FDFBF7] dark:bg-[#0D1117] border-b-2 border-black dark:border-neutral-100 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault()
              setMobileMenuOpen(false)
              onNavigatePage?.('home', '#top')
            }}
            className="flex items-center group focus:outline-none"
            aria-label="Fan Hub Plus Home"
          >
            <img
              src={fanhubLogo}
              alt="FAN HUB+"
              className="h-10 sm:h-12 md:h-14 w-auto object-contain select-none group-hover:scale-[1.03] group-hover:-rotate-1 transition-transform dark:drop-shadow-[2px_2px_0px_#06B6D4]"
            />
          </a>

          {activePage !== 'home' && (
            <button
              onClick={() => onNavigatePage?.('home', '#top')}
              className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 bg-black text-[#FACC15] dark:bg-white dark:text-black font-mono font-black text-[10px] sm:text-xs uppercase border-2 border-black brutal-shadow-sm brutal-btn"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Portal Home</span>
            </button>
          )}
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav
          className="hidden lg:flex items-center gap-0.5 xl:gap-2"
          aria-label="Main Navigation"
        >
          {navLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="px-1.5 xl:px-2.5 py-1 xl:py-1.5 font-bold text-[10px] xl:text-sm uppercase tracking-tight text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white hover:bg-neutral-200/60 dark:hover:bg-neutral-800 border-2 border-transparent hover:border-black dark:hover:border-neutral-300 transition-all rounded-none"
            >
              {item.name}
            </a>
          ))}
          <button
            type="button"
            onClick={handleOpenDashboardPage}
            className={`px-2 xl:px-2.5 py-1 xl:py-1.5 font-black text-[10px] xl:text-sm uppercase tracking-tight border-2 transition-all flex items-center gap-1 ${
              activePage === 'dashboard'
                ? 'bg-[#A3E635] text-black border-black brutal-shadow-sm'
                : 'text-neutral-800 dark:text-neutral-200 border-transparent hover:border-black dark:hover:border-neutral-300 hover:bg-neutral-200/60 dark:hover:bg-neutral-800'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </button>
        </nav>

        {/* Right: Controls & Actions */}
        <div className="flex items-center gap-1.5 sm:gap-3">

          {/* Dynamic Font Scaler (A- / A+) */}
          <button
            onClick={toggleFontScale}
            className="flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2.5 py-1 sm:py-1.5 bg-white dark:bg-[#161B22] text-black dark:text-white font-mono text-[10px] sm:text-xs font-bold border-2 border-black dark:border-neutral-100 brutal-shadow-sm brutal-btn"
            title={fontScale === 'large' ? 'Switch to Normal Font Size (16px)' : 'Switch to Large Font Size (18.5px)'}
            aria-label={`Current font size: ${fontScale === 'large' ? 'Large' : 'Normal'}. Click to toggle font scaling.`}
          >
            <Type className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span className="hidden sm:inline">{fontScale === 'large' ? 'A+' : 'A-'}</span>
          </button>

          {/* Dark / Light Mode Switch */}
          <button
            onClick={toggleDarkMode}
            className={`p-1 sm:p-1.5 sm:px-2.5 sm:py-1.5 font-black border-2 border-black brutal-shadow-sm brutal-btn flex items-center gap-1 sm:gap-1.5 transition-colors ${
              darkMode
                ? 'bg-[#161B22] text-[#FACC15] border-neutral-100'
                : 'bg-[#FACC15] text-black border-black'
            }`}
            aria-label={darkMode ? 'Currently Dark Mode. Click to switch to Light Mode.' : 'Currently Light Mode. Click to switch to Dark Mode.'}
            title={darkMode ? 'Current: Dark Mode (Click for Light Mode)' : 'Current: Light Mode (Click for Dark Mode)'}
          >
            {darkMode ? (
              <>
                <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#FACC15] text-[#FACC15]" />
                <span className="hidden sm:inline text-[10px] sm:text-xs font-mono font-black">DARK</span>
              </>
            ) : (
              <>
                <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-black text-black" />
                <span className="hidden sm:inline text-[10px] sm:text-xs font-mono font-black">LIGHT</span>
              </>
            )}
          </button>

          {/* Auth Actions: Logged In vs Guest */}
          {isAuthenticated ? (
            <>
              {user?.role === 'ADMIN' && (
                <button
                  onClick={handleOpenAdminPage}
                  className={`hidden md:inline-flex items-center gap-1 px-2.5 py-1.5 font-black text-[10px] sm:text-xs uppercase tracking-tight border-2 border-black brutal-shadow-sm brutal-btn ${
                    activePage === 'admin'
                      ? 'bg-black text-[#FACC15]'
                      : 'bg-[#F43F5E] text-white'
                  }`}
                  title="Open Admin Control Panel Page"
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Admin Panel</span>
                </button>
              )}

              <button
                onClick={handleOpenDashboardPage}
                className={`inline-flex items-center gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 font-black text-[10px] sm:text-xs uppercase tracking-tight border-2 border-black brutal-shadow-sm brutal-btn ${
                  activePage === 'dashboard'
                    ? 'bg-[#FACC15] text-black ring-2 ring-black'
                    : 'bg-[#A3E635] text-black hover:bg-[#86efac]'
                }`}
                title="Open Personalized User Dashboard Page"
              >
                <User className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span className="max-w-[90px] sm:max-w-[130px] truncate">
                  {user?.username || 'Dashboard'}
                </span>
              </button>

              <button
                onClick={() => {
                  logout()
                  onNavigatePage?.('home', '#top')
                }}
                className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-1 sm:py-1.5 font-bold text-[10px] sm:text-xs uppercase tracking-tight text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white border-2 border-black dark:border-neutral-200 bg-white dark:bg-[#161B22] brutal-shadow-sm brutal-btn"
                title="Log Out"
                aria-label="Log out of account"
              >
                <LogOut className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span className="hidden md:inline">Exit</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => onOpenAuth('login')}
                className="hidden sm:inline-flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 font-bold text-[10px] sm:text-xs uppercase tracking-tight text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white border-2 border-black dark:border-neutral-200 bg-white dark:bg-[#161B22] brutal-shadow-sm brutal-btn"
                aria-label="Log in to account"
              >
                <LogIn className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span className="hidden md:inline">Log In</span>
              </button>

              <button
                onClick={() => onOpenAuth('register')}
                className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3.5 py-1 sm:py-1.5 bg-[#A3E635] text-black font-black text-[10px] sm:text-sm uppercase tracking-tight border-2 border-black brutal-shadow brutal-btn hover:bg-[#86efac]"
                aria-label="Join Fan Hub Plus community"
              >
                <UserPlus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span className="hidden sm:inline">Join The Hub</span>
              </button>
            </>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 sm:p-2 lg:hidden bg-white dark:bg-[#161B22] text-black dark:text-white border-2 border-black dark:border-neutral-100 brutal-shadow-sm brutal-btn"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>

        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t-2 border-black dark:border-neutral-100 bg-[#FDFBF7] dark:bg-[#0D1117] p-3 sm:p-4 transition-all">
          <div className="grid grid-cols-2 gap-1.5 sm:gap-2 mb-3 sm:mb-4">
            {navLinks.map((item) => {
              const Icon = item.icon
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="flex items-center gap-1.5 sm:gap-2 p-2 sm:p-2.5 font-bold text-[10px] sm:text-xs uppercase tracking-tight bg-white dark:bg-[#161B22] text-neutral-900 dark:text-neutral-100 border-2 border-black dark:border-neutral-200 brutal-shadow-sm"
                >
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FACC15]" />
                  <span>{item.name}</span>
                </a>
              )
            })}
            <button
              type="button"
              onClick={handleOpenDashboardPage}
              className="flex items-center gap-1.5 sm:gap-2 p-2 sm:p-2.5 font-black text-[10px] sm:text-xs uppercase tracking-tight bg-[#A3E635] text-black border-2 border-black brutal-shadow-sm"
            >
              <LayoutDashboard className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black" />
              <span>Dashboard</span>
            </button>
            {user?.role === 'ADMIN' && (
              <button
                type="button"
                onClick={handleOpenAdminPage}
                className="flex items-center gap-1.5 sm:gap-2 p-2 sm:p-2.5 font-black text-[10px] sm:text-xs uppercase tracking-tight bg-[#F43F5E] text-white border-2 border-black brutal-shadow-sm"
              >
                <ShieldAlert className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                <span>Admin Panel</span>
              </button>
            )}
          </div>

          <div className="pt-2 border-t-2 border-black/20 dark:border-neutral-800 flex items-center justify-between gap-2">
            {isAuthenticated ? (
              <>
                <button
                  onClick={handleOpenDashboardPage}
                  className="flex-1 py-1.5 sm:py-2 font-black text-[10px] sm:text-xs uppercase border-2 border-black bg-[#A3E635] text-black brutal-shadow-sm"
                >
                  Dashboard ({user?.username || 'Collector'})
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false)
                    logout()
                    onNavigatePage?.('home', '#top')
                  }}
                  className="flex-1 py-1.5 sm:py-2 font-bold text-[10px] sm:text-xs uppercase border-2 border-black dark:border-neutral-200 bg-white dark:bg-[#161B22] text-black dark:text-white brutal-shadow-sm"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false)
                    onOpenAuth('login')
                  }}
                  className="flex-1 py-1.5 sm:py-2 font-bold text-[10px] sm:text-xs uppercase border-2 border-black dark:border-neutral-200 bg-white dark:bg-[#161B22] text-black dark:text-white brutal-shadow-sm"
                >
                  Log In
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false)
                    onOpenAuth('register')
                  }}
                  className="flex-1 py-1.5 sm:py-2 font-black text-[10px] sm:text-xs uppercase border-2 border-black bg-[#A3E635] text-black brutal-shadow-sm"
                >
                  Join The Hub
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
