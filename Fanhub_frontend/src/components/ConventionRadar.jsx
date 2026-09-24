import { useState } from 'react'
import { 
  Calendar as CalendarIcon, 
  Users, 
  Check, 
  Crosshair
} from 'lucide-react'


export default function ConventionRadar({ 
  conventionsData, 
  onShowToast 
}) {
  const [selectedCity, setSelectedCity] = useState('All Cities')
  const [calendarAdded, setCalendarAdded] = useState({})

  const cities = ['All Cities', 'Tokyo', 'Los Angeles', 'London', 'Lagos']

  const filteredEvents = conventionsData.filter((ev) => {
    if (selectedCity === 'All Cities') return true
    return ev.city === selectedCity
  })

  // Simulated .ics calendar generator & toast
  const handleAddToCalendar = (event) => {
    setCalendarAdded(prev => ({ ...prev, [event.id]: true }))

    // Create a mock ICS file download for full fidelity
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//FanHubPlus//Convention Radar//EN',
      'BEGIN:VEVENT',
      `SUMMARY:${event.name}`,
      `DESCRIPTION:${event.description} - Venue: ${event.venue}`,
      `LOCATION:${event.venue}, ${event.city}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n')

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `${event.id}-invite.ics`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    onShowToast({
      title: 'Event Added to Calendar!',
      message: `${event.name} invite (.ics) downloaded and saved to your schedule.`,
      type: 'success'
    })
  }

  return (
    <section id="events" className="py-8 sm:py-16 px-3 sm:px-6 lg:px-8 border-b-2 border-black dark:border-neutral-100 bg-[#FDFBF7] dark:bg-[#0D1117] transition-colors">

      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4 mb-6 sm:mb-10 pb-4 sm:pb-6 border-b-2 border-black dark:border-neutral-800">
          <div>
            <div className="inline-flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
              <span className="bg-[#C084FC] text-black font-black text-[10px] sm:text-xs uppercase px-2 sm:px-2.5 py-0.5 border-2 border-black brutal-shadow-sm">
                GEO-RADAR & TELEMETRY
              </span>
              <span className="font-mono text-[10px] sm:text-xs font-bold uppercase text-neutral-600 dark:text-neutral-400">
                GLOBAL FANDOM MEETUPS
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-tight text-black dark:text-white">
              CONVENTIONS & GATHERINGS
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 font-medium text-xs sm:text-sm md:text-base mt-1 max-w-2xl">
              Find fan meetups, comic cons, and screening events near you.
            </p>
          </div>

          {/* City Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 sm:gap-2">
            {cities.map((city) => {
              const isSelected = selectedCity === city
              return (
                <button
                  key={city}
                  onClick={() => setSelectedCity(city)}
                  className={`px-2 sm:px-3 py-1 sm:py-1.5 font-bold text-[10px] sm:text-sm uppercase tracking-tight border-2 border-black dark:border-white transition-all brutal-btn ${
                    isSelected
                      ? 'bg-black text-white dark:bg-white dark:text-black brutal-shadow-sm'
                      : 'bg-white dark:bg-[#161B22] text-black dark:text-white hover:bg-neutral-100'
                  }`}
                  aria-pressed={isSelected}
                  aria-label={`Filter events by ${city}`}
                >
                  {city}
                </button>
              )
            })}
          </div>
        </div>

        {/* Radar Map & Event Schedule Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ================= LEFT: INTERACTIVE RADAR MAP COMPONENT (5 COLS) ================= */}
          <div className="lg:col-span-5 bg-white dark:bg-[#161B22] border-3 border-black dark:border-white p-5 brutal-shadow-lg flex flex-col justify-between">
            
            <div className="flex items-center justify-between pb-3 border-b-2 border-black dark:border-neutral-700 mb-4">
              <div className="flex items-center gap-2">
                <Crosshair className="w-5 h-5 text-[#F43F5E] animate-spin" style={{ animationDuration: '10s' }} />
                <span className="font-mono text-xs font-black uppercase tracking-wider text-black dark:text-white">
                  GLOBAL RADAR HUD: {selectedCity.toUpperCase()}
                </span>
              </div>
              <span className="font-mono text-[10px] bg-[#A3E635] text-black px-2 py-0.5 border border-black font-black uppercase">
                SIGNAL 99.8%
              </span>
            </div>

            {/* Stylized SVG Pop-Brutalist Radar Screen */}
            <div className="relative aspect-square w-full bg-[#0D1117] border-3 border-black dark:border-white overflow-hidden flex items-center justify-center p-2">
              
              {/* Radar Grid SVG Background */}
              <svg className="absolute inset-0 w-full h-full text-emerald-500/20" xmlns="http://www.w3.org/2000/svg">
                {/* Concentric circles */}
                <circle cx="50%" cy="50%" r="20%" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx="50%" cy="50%" r="35%" fill="none" stroke="currentColor" strokeWidth="1" />
                <circle cx="50%" cy="50%" r="48%" fill="none" stroke="currentColor" strokeWidth="1.5" />
                {/* Crosshairs */}
                <line x1="50%" y1="0" x2="50%" y2="100%" stroke="currentColor" strokeWidth="1" />
                <line x1="0" y1="50%" x2="100%" y2="50%" stroke="currentColor" strokeWidth="1" />
              </svg>

              {/* Rotating Radar Sweep Beam */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div 
                  className="w-full h-full animate-radar-sweep"
                  style={{
                    background: 'conic-gradient(from 0deg at 50% 50%, rgba(52, 211, 153, 0.35) 0deg, rgba(52, 211, 153, 0.05) 45deg, transparent 90deg, transparent 360deg)'
                  }}
                />
              </div>

              {/* Stylized City Pinpoints on Map */}
              {conventionsData.map((ev) => {
                const isCityActive = selectedCity === 'All Cities' || selectedCity === ev.city

                return (
                  <button
                    key={ev.id}
                    onClick={() => setSelectedCity(ev.city)}
                    className="absolute z-20 group transform -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-125 focus:outline-none"
                    style={{
                      left: `${ev.coordinates.x}%`,
                      top: `${ev.coordinates.y}%`
                    }}
                    aria-label={`Focus on ${ev.city}`}
                  >
                    <div className="relative flex items-center justify-center">
                      <span className={`absolute w-6 h-6 rounded-full animate-ping opacity-75 ${isCityActive ? 'bg-[#F43F5E]' : 'bg-neutral-600'}`} />
                      <div 
                        className={`w-4 h-4 border-2 border-black flex items-center justify-center brutal-shadow-sm ${
                          isCityActive ? 'bg-[#FACC15]' : 'bg-white'
                        }`}
                      >
                        <div className="w-1.5 h-1.5 bg-black rounded-none" />
                      </div>
                    </div>

                    {/* Pin tooltip label */}
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black text-white font-mono text-[9px] font-bold px-1.5 py-0.5 border border-white opacity-90 pointer-events-none group-hover:opacity-100">
                      {ev.city}
                    </div>
                  </button>
                )
              })}

              {/* Radar Corner Telemetry */}
              <div className="absolute bottom-2 left-2 font-mono text-[10px] text-[#34D399] leading-tight">
                <div>LAT: 35.6300° N</div>
                <div>LNG: 139.7930° E</div>
              </div>

              <div className="absolute bottom-2 right-2 font-mono text-[10px] text-[#FACC15] leading-tight text-right">
                <div>SWEEP: 360° CONT</div>
                <div>MODE: TRACKING</div>
              </div>
            </div>

            {/* City Legend pills */}
            <div className="mt-4 pt-3 border-t-2 border-black/10 dark:border-neutral-800">
              <span className="font-mono text-[11px] font-black uppercase text-neutral-500 block mb-2">
                DEPLOYED CITY NODES
              </span>
              <div className="flex flex-wrap gap-2">
                {cities.filter(c => c !== 'All Cities').map(c => (
                  <button
                    key={c}
                    onClick={() => setSelectedCity(c)}
                    className={`font-mono text-xs font-bold uppercase px-2.5 py-1 border-2 border-black dark:border-neutral-600 transition-all ${
                      selectedCity === c 
                        ? 'bg-[#FACC15] text-black brutal-shadow-sm font-black' 
                        : 'bg-neutral-100 dark:bg-[#0D1117] text-neutral-700 dark:text-neutral-300'
                    }`}
                  >
                    📍 {c}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* ================= RIGHT: EVENT SCHEDULE LIST (7 COLS) ================= */}
          <div className="lg:col-span-7 space-y-4">
            {filteredEvents.length === 0 ? (
              <div className="p-8 bg-white dark:bg-[#161B22] border-3 border-black text-center brutal-shadow-md">
                <p className="font-black uppercase text-base text-black dark:text-white">
                  No conventions scheduled for {selectedCity}
                </p>
                <button
                  onClick={() => setSelectedCity('All Cities')}
                  className="mt-3 px-4 py-1.5 bg-[#FACC15] text-black font-black text-xs uppercase border-2 border-black brutal-shadow-sm"
                >
                  View All Cities
                </button>
              </div>
            ) : (
              filteredEvents.map((event) => {
                const isAdded = !!calendarAdded[event.id]

                return (
                  <div
                    key={event.id}
                    className="bg-white dark:bg-[#161B22] border-3 border-black dark:border-white p-4 sm:p-5 brutal-shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group hover:-translate-y-0.5 transition-transform"
                  >
                    {/* Left: Date Box Block (Neo-Brutalist) */}
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-black text-[#FACC15] border-2 border-black flex flex-col items-center justify-center shrink-0 brutal-shadow-sm">
                        <span className="font-mono text-xs sm:text-sm font-black uppercase tracking-wider">
                          {event.dateMonth}
                        </span>
                        <span className="font-mono text-xl sm:text-2xl font-black leading-none mt-0.5 text-white">
                          {event.dateDay}
                        </span>
                        <span className="font-mono text-[9px] uppercase tracking-widest text-[#A3E635]">
                          {event.year}
                        </span>
                      </div>

                      {/* Event Core Info */}
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span 
                            className="font-mono text-[10px] font-black uppercase px-2 py-0.5 border border-black text-black"
                            style={{ backgroundColor: event.categoryColor }}
                          >
                            {event.category}
                          </span>
                          <span className="font-mono text-[10px] font-bold text-neutral-500 uppercase">
                            📍 {event.city}
                          </span>
                        </div>

                        <h3 className="text-base sm:text-lg font-black uppercase tracking-tight text-black dark:text-white leading-snug">
                          {event.name}
                        </h3>

                        <p className="font-medium text-xs text-neutral-600 dark:text-neutral-400 mt-0.5">
                          {event.venue}
                        </p>

                        <div className="flex items-center gap-3 mt-1.5 text-[11px] font-mono font-bold text-neutral-600 dark:text-neutral-400">
                          <span className="flex items-center gap-1 text-[#F43F5E]">
                            <Users className="w-3.5 h-3.5" />
                            {event.attendees}
                          </span>
                          <span>•</span>
                          <span className="text-[#10B981] dark:text-[#34D399]">
                            {event.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Add to Calendar Action Button */}
                    <div className="w-full sm:w-auto sm:shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-black/10 dark:border-neutral-800">
                      <button
                        onClick={() => handleAddToCalendar(event)}
                        className={`w-full sm:w-auto px-4 py-2.5 font-black text-xs uppercase tracking-tight border-2 border-black dark:border-white brutal-shadow-sm brutal-btn flex items-center justify-center gap-1.5 ${
                          isAdded
                            ? 'bg-[#A3E635] text-black'
                            : 'bg-[#FACC15] text-black hover:bg-[#fde047]'
                        }`}
                        aria-label={`Add ${event.name} to calendar`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Saved to Cal (.ics)</span>
                          </>
                        ) : (
                          <>
                            <CalendarIcon className="w-4 h-4" />
                            <span>Add to Calendar</span>
                          </>
                        )}
                      </button>
                    </div>

                  </div>
                )
              })
            )}
          </div>

        </div>

      </div>
    </section>
  )
}
