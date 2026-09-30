import { cn } from '@/lib/utils'
import type { MatchResult } from '@/lib/match'

export function MatchPill({
  score,
  band = 'high',
  size = 'md',
  className,
}: {
  score: number
  band?: MatchResult['band']
  size?: 'sm' | 'md' | 'lg'
  className?: string
}) {
  const getStyles = () => {
    if (score >= 85) {
      return 'bg-emerald-50 text-emerald-800 border-emerald-200'
    } else if (score >= 70) {
      return 'bg-amber-50 text-amber-800 border-amber-200'
    } else {
      return 'bg-rose-50 text-rose-800 border-rose-200'
    }
  }

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-lg border font-mono font-bold leading-none shrink-0',
        getStyles(),
        sizes[size],
        className
      )}
      aria-label={`${score} percent match`}
    >
      <span className="font-extrabold">{score}%</span>
      <span className="font-sans text-[10px] font-semibold uppercase tracking-wider opacity-80">Match</span>
    </span>
  )
}
