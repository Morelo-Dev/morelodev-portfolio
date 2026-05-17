'use client'

import { useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import AnimatedCounter from '@/components/ui/AnimatedCounter'

const STATS = [
  { labelEs: 'Años de trayectoria tech', labelEn: 'Years in tech', value: 3, suffix: '+' },
  { labelEs: 'Proyectos entregados', labelEn: 'Projects delivered', value: 12, suffix: '+' },
  { labelEs: 'Tecnologías dominadas', labelEn: 'Technologies mastered', value: 15, suffix: '+' },
  { labelEs: 'Disponibilidad', labelEn: 'Availability', value: 100, suffix: '%' },
]

export default function Stats() {
  const locale = useLocale()

  return (
    <section
      aria-label={locale === 'es' ? 'Métricas' : 'Metrics'}
      className="border-y border-zinc-100 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-y divide-zinc-100 px-6 lg:grid-cols-4 lg:divide-y-0 dark:divide-zinc-800">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.labelEs}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="flex flex-col items-center justify-center px-6 py-8 text-center"
          >
            <p className="mb-1 font-mono text-3xl font-bold text-zinc-900 dark:text-zinc-50">
              <AnimatedCounter to={stat.value} suffix={stat.suffix} />
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {locale === 'es' ? stat.labelEs : stat.labelEn}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
