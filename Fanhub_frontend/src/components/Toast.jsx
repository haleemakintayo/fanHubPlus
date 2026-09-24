import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react'


export default function Toast({ toasts, onDismiss }) {
  if (!toasts || toasts.length === 0) return null

  return (
    <div 
      className="fixed top-20 right-4 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full"
      role="region"
      aria-live="polite"
      aria-label="Notification alerts"
    >
      {toasts.map((toast) => {
        const typeStyles = {
          success: 'bg-[#A3E635] text-black border-black',
          warning: 'bg-[#FACC15] text-black border-black',
          info: 'bg-[#38BDF8] text-black border-black',
          pink: 'bg-[#F43F5E] text-white border-black dark:border-white'
        }

        const currentStyle = typeStyles[toast.type] || 'bg-white text-black border-black dark:bg-[#161B22] dark:text-white dark:border-white'

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto border-2 ${currentStyle} p-3.5 brutal-shadow flex items-start justify-between gap-3 animate-in slide-in-from-right duration-200`}
          >
            <div className="flex items-start gap-2.5">
              {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />}
              {toast.type === 'warning' && <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />}
              {(!toast.type || toast.type === 'info') && <Info className="w-5 h-5 shrink-0 mt-0.5" />}
              <div>
                {toast.title && (
                  <h4 className="font-black text-sm uppercase tracking-tight leading-tight">
                    {toast.title}
                  </h4>
                )}
                <p className="text-xs font-bold mt-0.5 opacity-90">
                  {toast.message}
                </p>
              </div>
            </div>
            <button
              onClick={() => onDismiss(toast.id)}
              className="p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded transition-colors"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )
      })}
    </div>
  )
}
