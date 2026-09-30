import { cn } from '@/lib/utils'

export function StatusBar({ onDark = false }: { onDark?: boolean }) {
  const tone = onDark ? 'text-white' : 'text-ink'
  return (
    <div className={cn('flex items-center justify-between px-6 pt-3 pb-1 text-[13px] font-semibold', tone)}>
      <span className="font-display">9:41</span>
      <div className="flex items-center gap-1.5" aria-hidden>
        {/* signal */}
        <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor">
          <rect x="0" y="7" width="3" height="4" rx="1" />
          <rect x="4.5" y="5" width="3" height="6" rx="1" />
          <rect x="9" y="2.5" width="3" height="8.5" rx="1" />
          <rect x="13.5" y="0" width="3" height="11" rx="1" />
        </svg>
        {/* wifi */}
        <svg width="16" height="11" viewBox="0 0 16 11" fill="currentColor">
          <path d="M8 2.2c2.6 0 5 1 6.8 2.6l1.2-1.4C13.9 1.5 11 .3 8 .3S2.1 1.5 0 3.4l1.2 1.4C3 3.2 5.4 2.2 8 2.2z" />
          <path d="M8 5.6c1.5 0 2.9.6 4 1.5l1.2-1.4C11.8 4.4 10 3.7 8 3.7s-3.8.7-5.2 2l1.2 1.4c1.1-.9 2.5-1.5 4-1.5z" />
          <path d="M8 8.9 9.9 7C9.4 6.5 8.7 6.2 8 6.2s-1.4.3-1.9.8L8 8.9z" />
        </svg>
        {/* battery */}
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect x="0.5" y="0.5" width="21" height="11" rx="3" stroke="currentColor" opacity="0.4" />
          <rect x="2" y="2" width="17" height="8" rx="1.6" fill="currentColor" />
          <rect x="23" y="3.5" width="1.5" height="5" rx="0.75" fill="currentColor" opacity="0.4" />
        </svg>
      </div>
    </div>
  )
}
