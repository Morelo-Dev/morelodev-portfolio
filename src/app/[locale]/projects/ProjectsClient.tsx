'use client'

import { useState, useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import ProjectCard from '@/components/blog/ProjectCard'
import { projects } from '@/lib/projects'

const ALL = 'Todos'

export default function ProjectsClient() {
  const t = useTranslations('projects')
  const [active, setActive] = useState(ALL)

  const allTags = useMemo(() => {
    const tags = new Set<string>()
    projects.forEach((p) => p.tags.forEach((tag) => tags.add(tag)))
    return [ALL, ...Array.from(tags).sort()]
  }, [])

  const filtered = useMemo(
    () => (active === ALL ? projects : projects.filter((p) => p.tags.includes(active))),
    [active]
  )

  return (
    <main id="main-content" className="mx-auto max-w-5xl px-6 py-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
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
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-10 flex flex-wrap gap-2"
        role="group"
        aria-label="Filtrar por tecnología"
      >
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActive(tag)}
            aria-pressed={active === tag}
            className={`rounded-full border px-3 py-1 font-mono text-xs transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
              active === tag
                ? 'border-blue-600 bg-blue-600 text-white dark:border-blue-500 dark:bg-blue-500'
                : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-600'
            }`}
          >
            {tag}
          </button>
        ))}
      </motion.div>

      {/* Grid */}
      <AnimatePresence mode="popLayout">
        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {filtered.length === 0 && (
        <p className="py-16 text-center font-mono text-sm text-zinc-400">
          No hay proyectos con esa tecnología.
        </p>
      )}
    </main>
  )
}
