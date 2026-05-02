'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import { clients } from '@/data/clients'

// ─── Animated counter ─────────────────────────────────────────────────────────
function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => `${Math.round(v)}${suffix}`)

  useEffect(() => {
    if (inView) {
      const controls = animate(count, target, { duration: 1.5, ease: 'easeOut' })
      return controls.stop
    }
  }, [inView, count, target])

  return <motion.span ref={ref}>{rounded}</motion.span>
}

const stats = [
  { value: 13, suffix: '+', label: "années d'expérience" },
  { value: 6, suffix: '', label: 'grands groupes clients' },
  { value: 150, suffix: '+', label: 'projets réalisés' },
]

// ─── Logo card (grid view) ────────────────────────────────────────────────────
function LogoCard({ client, index }: { client: (typeof clients)[0]; index: number }) {
  const isVector = client.logo.endsWith('.svg')
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      <a
        href={client.website ?? '#'}
        target={client.website ? '_blank' : undefined}
        rel="noopener noreferrer"
        title={client.name}
        className="group flex flex-col items-center justify-center bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all duration-300 h-full"
      >
        <div className="relative w-full h-16 flex items-center justify-center">
          <Image
            src={client.logo}
            alt={`Logo ${client.name}`}
            width={160}
            height={64}
            className={`object-contain max-h-14 w-auto transition-all duration-300 group-hover:scale-105 ${
              isVector ? '' : 'grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100'
            }`}
            unoptimized={isVector}
          />
        </div>
        <p className="mt-3 text-xs font-semibold text-gray-500 text-center group-hover:text-brand-blue transition-colors duration-300 leading-tight">
          {client.name}
        </p>
        <p className="text-[10px] text-gray-400 text-center mt-0.5">{client.location}</p>
      </a>
    </motion.div>
  )
}

// ─── Infinite carousel strip ──────────────────────────────────────────────────
function CarouselStrip() {
  const doubled = [...clients, ...clients, ...clients]
  return (
    <div className="overflow-hidden w-full">
      <div className="logos-track">
        {doubled.map((client, i) => {
          const isVector = client.logo.endsWith('.svg')
          return (
            <div
              key={`${client.id}-${i}`}
              className="flex-shrink-0 mx-6 flex items-center justify-center bg-white rounded-xl border border-gray-100 px-8 py-4 shadow-sm w-44 h-20"
            >
              <Image
                src={client.logo}
                alt={`Logo ${client.name}`}
                width={120}
                height={48}
                className={`object-contain max-h-12 w-auto transition-all duration-300 hover:scale-105 ${
                  isVector ? '' : 'grayscale hover:grayscale-0 opacity-70 hover:opacity-100'
                }`}
                unoptimized={isVector}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Main section ─────────────────────────────────────────────────────────────
// To switch to infinite carousel: replace the grid div with <CarouselStrip />
export default function ClientsSection() {
  return (
    <section className="section-padding bg-gradient-to-b from-white to-gray-50">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-8 h-0.5 bg-brand-red" />
            <span className="text-brand-red text-sm font-semibold uppercase tracking-widest">Références</span>
            <div className="w-8 h-0.5 bg-brand-red" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-blue mb-4">
            Ils nous font confiance
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Depuis 2013, des entreprises leaders du Nord du Maroc nous confient leurs projets les plus exigeants.
          </p>
        </motion.div>

        {/* Grid — default view */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-14">
          {clients.map((client, i) => (
            <LogoCard key={client.id} client={client} index={i} />
          ))}
        </div>

        {/* Stats bar */}
        <motion.div
          className="grid grid-cols-3 gap-4 bg-brand-blue rounded-2xl p-8 text-white text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-3xl md:text-4xl font-bold text-brand-red mb-1">
                <Counter target={s.value} suffix={s.suffix} />
              </div>
              <div className="text-white/70 text-sm">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
