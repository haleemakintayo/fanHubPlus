import { useState } from 'react'
import { 
  Bell, 
  Eye, 
  Calendar, 
  Info, 
  Check
} from 'lucide-react'


export default function MerchRadar({ 
  merchDrops, 
  onShowToast 
}) {
  const [alertItems, setAlertItems] = useState({})
  const [viewCounters, setViewCounters] = useState(() => {
    const initial = {}
    merchDrops.forEach(item => {
      initial[item.id] = item.viewCountNum
    })
    return initial
  })

  const handleSetAlert = (item) => {
    const isSet = !alertItems[item.id]
    setAlertItems(prev => ({ ...prev, [item.id]: isSet }))
    
    if (isSet) {
      onShowToast({
        title: 'Drop Alert Scheduled!',
        message: `Priority alert set for "${item.title}". You'll receive a ping 1 hour before launch.`,
        type: 'warning'
      })
    } else {
      onShowToast({
        title: 'Drop Alert Removed',
        message: `Alert cancelled for "${item.title}".`,
        type: 'info'
      })
    }
  }

  const handleIncrementView = (itemId) => {
    setViewCounters(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }))
  }

  return (
    <section id="merch" className="py-16 px-4 sm:px-6 lg:px-8 border-b-2 border-black dark:border-neutral-100 bg-[#FDFBF7] dark:bg-[#0D1117] transition-colors">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b-2 border-black dark:border-neutral-800">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="bg-[#F43F5E] text-white font-black text-xs uppercase px-2.5 py-0.5 border-2 border-black brutal-shadow-sm">
                COLLECTIBLE PREVIEWS
              </span>
              <span className="font-mono text-xs font-bold uppercase text-neutral-600 dark:text-neutral-400">
                DISCOVERY ONLY • NO CHECKOUT
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-black dark:text-white">
              THE DROP RADAR
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 font-medium text-sm sm:text-base mt-1 max-w-2xl">
              Track official collectible runs, pre-orders, and vinyl releases before they sell out.
            </p>
          </div>

          {/* SRS Mandate Notice Pill */}
          <div className="bg-white dark:bg-[#161B22] p-2.5 border-2 border-black dark:border-white brutal-shadow-sm max-w-xs">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-neutral-800 dark:text-neutral-200">
              <Info className="w-4 h-4 text-[#FACC15] shrink-0" />
              <span>Catalog Showcase • Direct Partner Links Only</span>
            </div>
          </div>
        </div>

        {/* Collectible Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {merchDrops.map((item) => {
            const isAlertSet = !!alertItems[item.id]
            const currentViews = viewCounters[item.id] || item.viewCountNum

            return (
              <div
                key={item.id}
                className="bg-white dark:bg-[#161B22] border-3 border-black dark:border-white p-5 flex flex-col justify-between brutal-shadow-md hover:-translate-y-1 transition-transform relative group"
                onClick={() => handleIncrementView(item.id)}
              >
                {/* Accent Top Strip */}
                <div 
                  className="absolute -top-1.5 left-4 right-4 h-1.5 border-t-2 border-x-2 border-black"
                  style={{ backgroundColor: item.universeColor }}
                />

                <div>
                  {/* Top Status Tag & Universe */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className={`font-mono text-[11px] font-black uppercase px-2.5 py-1 border-2 border-black ${item.statusTagColor} brutal-shadow-sm`}>
                      {item.statusTag}
                    </span>
                    <span 
                      className="font-mono text-[10px] font-black uppercase px-2 py-0.5 border border-black text-black"
                      style={{ backgroundColor: item.universeColor }}
                    >
                      {item.universe}
                    </span>
                  </div>

                  {/* Product Image Frame */}
                  <div className="relative aspect-4/3 w-full mb-4 border-2 border-black overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2 bg-black/80 text-white font-mono text-[11px] font-bold px-2 py-0.5 border border-white/30 flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-[#38BDF8]" />
                      <span>{(currentViews / 1000).toFixed(1)}k views</span>
                    </div>
                  </div>

                  {/* Title & Manufacturer */}
                  <h3 className="text-xl font-black uppercase tracking-tight text-black dark:text-white leading-tight mb-1">
                    {item.title}
                  </h3>
                  <span className="font-mono text-xs font-bold text-neutral-500 uppercase block mb-3">
                    Maker: {item.manufacturer}
                  </span>

                  {/* Description */}
                  <p className="text-xs text-neutral-700 dark:text-neutral-300 font-medium leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Drop Schedule Details */}
                  <div className="p-3 bg-neutral-100 dark:bg-[#0D1117] border-2 border-black dark:border-neutral-700 mb-4 space-y-1.5 font-mono text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-500 font-bold flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" /> EST. DROP:
                      </span>
                      <span className="font-black text-black dark:text-white">
                        {item.dropDate}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-1 border-t border-black/10 dark:border-neutral-800">
                      <span className="text-neutral-500 font-bold">ESTIMATED:</span>
                      <span className="font-black text-[#10B981] dark:text-[#34D399]">
                        {item.msrp}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Action: Set Drop Alert */}
                <div className="pt-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleSetAlert(item)
                    }}
                    className={`w-full py-2.5 px-3 font-black text-xs uppercase tracking-tight border-2 border-black dark:border-white brutal-shadow-sm brutal-btn flex items-center justify-center gap-2 ${
                      isAlertSet
                        ? 'bg-[#A3E635] text-black'
                        : 'bg-white dark:bg-[#161B22] text-black dark:text-white hover:bg-[#FACC15] hover:text-black'
                    }`}
                    aria-label={`Toggle drop alert for ${item.title}`}
                  >
                    {isAlertSet ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Drop Alert Active</span>
                      </>
                    ) : (
                      <>
                        <Bell className="w-4 h-4" />
                        <span>Set Drop Alert</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
