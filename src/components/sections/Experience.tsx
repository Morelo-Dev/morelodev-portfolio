'use client'

import { useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import { experience } from '@/lib/experience'

export default function Experience() {
  const locale = useLocale()

  return (
    <section id="experience" className="mx-auto max-w-4xl px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <p className="mb-2 font-mono text-sm text-blue-600 dark:text-blue-400">
          {'// '}
          {locale === 'es' ? 'Trayectoria profesional' : 'Professional experience'}
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          {locale === 'es' ? 'Experiencia' : 'Experience'}
        </h2>
      </motion.div>

      <div className="relative">
        {/* Vertical line */}
        <div
          className="absolute top-0 left-4 h-full w-px bg-zinc-200 dark:bg-zinc-800"
          aria-hidden="true"
        />

        <div className="space-y-10">
          {experience.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative pl-12"
            >
              {/* Dot */}
              <div
                className={`absolute top-1 left-0 flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                  item.current
                    ? 'border-blue-600 bg-blue-600 dark:border-blue-400 dark:bg-blue-500'
                    : 'border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-900'
                }`}
                aria-hidden="true"
              >
                {item.current && <span className="h-2 w-2 animate-pulse rounded-full bg-white" />}
              </div>

              {/* Card */}
              <div className="rounded-xl border border-zinc-200 bg-white p-5 transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
                <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
                      {locale === 'es' ? item.role : item.roleEn}
                    </h3>
                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                      {item.company}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block rounded-full border border-zinc-200 bg-zinc-50 px-3 py-0.5 font-mono text-xs text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">
                      {item.period}
                    </span>
                    <p className="mt-1 font-mono text-xs text-zinc-400">{item.location}</p>
                  </div>
                </div>

                <p className="mb-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {locale === 'es' ? item.description : item.descriptionEn}
                </p>

                <div className="flex flex-wrap gap-2">
                  {item.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-zinc-200 bg-zinc-50 px-2 py-0.5 font-mono text-xs text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
