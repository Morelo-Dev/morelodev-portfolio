'use client'

import { useTranslations, useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import { skillsByCategory, categoryLabels } from '@/lib/skills'
import SkillBar from '@/components/ui/SkillBar'

const LEVEL_LABEL: Record<number, { es: string; en: string }> = {
  1: { es: 'Básico', en: 'Basic' },
  2: { es: 'Elemental', en: 'Elementary' },
  3: { es: 'Intermedio', en: 'Intermediate' },
  4: { es: 'Avanzado', en: 'Advanced' },
  5: { es: 'Experto', en: 'Expert' },
}

export default function Skills() {
  const t = useTranslations('skills')
  const locale = useLocale() as 'es' | 'en'

  return (
    <section
      id="skills"
      className="border-t border-zinc-100 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50"
    >
      <div className="mx-auto max-w-6xl px-6 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <p className="mb-2 font-mono text-sm text-blue-600 dark:text-blue-400">
            {'// '}
            {t('subtitle')}
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            {t('title')}
          </h2>
        </motion.div>

        {/* Categorías */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {(Object.entries(skillsByCategory) as [string, typeof skillsByCategory.frontend][]).map(
            ([cat, items], ci) => (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: ci * 0.1 }}
              >
                <h3 className="mb-6 font-mono text-xs font-semibold tracking-widest text-zinc-400 uppercase dark:text-zinc-500">
                  {categoryLabels[cat][locale]}
                </h3>
                <ul className="space-y-4" role="list">
                  {items.map((skill, i) => (
                    <SkillBar
                      key={skill.name}
                      skill={skill}
                      levelLabel={LEVEL_LABEL[skill.level][locale]}
                      delay={ci * 0.1 + i * 0.05}
                    />
                  ))}
                </ul>
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  )
}
