import { cn } from '../utils'

export function LoadingSpinner({ className }: { className?: string }) {
  return (
    <div className={cn('h-5 w-5', className)}>
      <div
        style={{
          position: 'relative',
          top: '50%',
          left: '50%',
        }}
        className={cn('loading-spinner', 'h-5 w-5', className)}
      >
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            style={{
              animationDelay: `${-0.7 + 0.057 * i}s`,
              background: 'gray',
              position: 'absolute',
              borderRadius: '1rem',
              width: '27%',
              height: '7%',
              left: '-8%',
              top: '-3%',
              transform: `rotate(${30 * i}deg) translate(130%)`,
            }}
            className="animate-[spinner_0.6s_linear_infinite]"
          />
        ))}
      </div>
    </div>
  )
}
