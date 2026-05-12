'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import { skills, categoryLabels } from '@/lib/skills'
import SkillBar from '@/components/ui/SkillBar'

const ALL = 'all'
const LEVEL_LABEL: Record<number, { es: string; en: string }> = {
  1: { es: 'Básico', en: 'Basic' },
  2: { es: 'Elemental', en: 'Elementary' },
  3: { es: 'Intermedio', en: 'Intermediate' },
  4: { es: 'Avanzado', en: 'Advanced' },
  5: { es: 'Experto', en: 'Expert' },
}

export default function SkillsPageClient() {
  const t = useTranslations('skills')
  const locale = useLocale() as 'es' | 'en'
  const [activeCategory, setActiveCategory] = useState(ALL)

  const categories = [ALL, 'frontend', 'backend', 'devops', 'tools'] as const
  const filtered =
    activeCategory === ALL ? skills : skills.filter((s) => s.category === activeCategory)

  return (
    <main id="main-content" className="mx-auto max-w-6xl px-6 py-14">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <p className="mb-2 font-mono text-sm text-blue-600 dark:text-blue-400">
          {'// '}
          {t('subtitle')}
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          {t('title')}
        </h1>
      </motion.div>

      {/* Filtros */}
      <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoría">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            aria-pressed={activeCategory === cat}
            className={`rounded-full border px-3 py-1 font-mono text-xs transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
              activeCategory === cat
                ? 'border-blue-600 bg-blue-600 text-white'
                : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400'
            }`}
          >
            {cat === ALL ? (locale === 'es' ? 'Todos' : 'All') : categoryLabels[cat][locale]}
          </button>
        ))}
      </div>

      {/* Skills list */}
      <motion.ul layout className="grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3" role="list">
        {filtered.map((skill, i) => (
          <motion.div
            key={skill.name}
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.04 }}
          >
            <SkillBar
              skill={skill}
              levelLabel={LEVEL_LABEL[skill.level][locale]}
              delay={i * 0.04}
            />
          </motion.div>
        ))}
      </motion.ul>
    </main>
  )
}
