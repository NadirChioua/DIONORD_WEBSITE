'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'

interface Props {
  value: string
  label: string
  description?: string
}

export default function AnimatedCounter({ value, label, description }: Props) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })
  const [displayed, setDisplayed] = useState('0')
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!inView || hasAnimated.current) return
    hasAnimated.current = true

    const numMatch = value.match(/\d+/)
    if (!numMatch) {
      setDisplayed(value)
      return
    }

    const num = parseInt(numMatch[0])
    const suffix = value.replace(numMatch[0], '')
    const duration = 1500
    const steps = 40
    const increment = num / steps
    let current = 0
    const interval = setInterval(() => {
      current += increment
      if (current >= num) {
        setDisplayed(value)
        clearInterval(interval)
      } else {
        setDisplayed(Math.floor(current) + suffix)
      }
    }, duration / steps)

    return () => clearInterval(interval)
  }, [inView, value])

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-brand-red mb-2">{displayed}</div>
      <div className="text-brand-blue font-semibold text-lg">{label}</div>
      {description && <div className="text-gray-500 text-sm mt-1">{description}</div>}
    </div>
  )
}
