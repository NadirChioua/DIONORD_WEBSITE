'use client'

import { useInView } from 'react-intersection-observer'
import { cn } from '@/lib/utils'

interface Props {
  label?: string
  title: string
  subtitle?: string
  centered?: boolean
  light?: boolean
}

export default function SectionTitle({ label, title, subtitle, centered = false, light = false }: Props) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <div
      ref={ref}
      className={cn(
        'mb-12 transition-all duration-700',
        centered && 'text-center',
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      )}
    >
      {label && (
        <div className={cn(
          'inline-flex items-center gap-2 mb-4',
          centered && 'justify-center w-full'
        )}>
          <div className="w-8 h-0.5 bg-brand-red" />
          <span className={cn('text-sm font-semibold uppercase tracking-widest', light ? 'text-brand-blue-mid' : 'text-brand-red')}>
            {label}
          </span>
          <div className="w-8 h-0.5 bg-brand-red" />
        </div>
      )}
      <h2 className={cn('section-title', light && 'text-white')}>{title}</h2>
      {subtitle && (
        <p className={cn('section-subtitle', centered && 'mx-auto', light && 'text-white/70')}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
