'use client'

import { useState, useMemo } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import BlogCard from '@/components/blog/BlogCard'
import type { BlogPost, PostType } from '@/types'

const ALL = 'Todos'

const TYPE_FILTERS: { key: PostType | 'all'; labelEs: string; labelEn: string }[] = [
  { key: 'all', labelEs: 'Todo', labelEn: 'All' },
  { key: 'article', labelEs: 'Artículos', labelEn: 'Articles' },
  { key: 'video', labelEs: 'Videos', labelEn: 'Videos' },
  { key: 'resource', labelEs: 'Recursos', labelEn: 'Resources' },
  { key: 'offer', labelEs: 'Ofertas', labelEn: 'Offers' },
]

export default function BlogListClient({ posts }: { posts: BlogPost[] }) {
  const t = useTranslations('blog')
  const locale = useLocale()
  const [activeTag, setActiveTag] = useState(ALL)
  const [activeType, setActiveType] = useState<PostType | 'all'>('all')

  const allTags = useMemo(() => {
    const tags = new Set<string>()
    posts.forEach((p) => p.tags.forEach((tag) => tags.add(tag)))
    return [ALL, ...Array.from(tags).sort()]
  }, [posts])

  const availableTypes = useMemo(() => {
    const types = new Set(posts.map((p) => p.type ?? 'article'))
    return TYPE_FILTERS.filter((f) => f.key === 'all' || types.has(f.key))
  }, [posts])

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const tagOk = activeTag === ALL || p.tags.includes(activeTag)
      const typeOk = activeType === 'all' || (p.type ?? 'article') === activeType
      return tagOk && typeOk
    })
  }, [posts, activeTag, activeType])

  const filterBtn = (active: boolean) =>
    cn(
      'rounded-full border px-3 py-1 font-mono text-xs transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600',
      active
        ? 'border-blue-600 bg-blue-600 text-white dark:border-blue-500 dark:bg-blue-500'
        : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400'
    )

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

      {/* Filtro por tipo */}
      {availableTypes.length > 2 && (
        <div
          className="mb-4 flex flex-wrap gap-2"
          role="group"
          aria-label={locale === 'es' ? 'Filtrar por tipo' : 'Filter by type'}
        >
          {availableTypes.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveType(f.key)}
              aria-pressed={activeType === f.key}
              className={filterBtn(activeType === f.key)}
            >
              {locale === 'es' ? f.labelEs : f.labelEn}
            </button>
          ))}
        </div>
      )}

      {/* Filtro por tag */}
      {allTags.length > 2 && (
        <div
          className="mb-8 flex flex-wrap gap-2"
          role="group"
          aria-label={locale === 'es' ? 'Filtrar por etiqueta' : 'Filter by tag'}
        >
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              aria-pressed={activeTag === tag}
              className={filterBtn(activeTag === tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      <AnimatePresence mode="popLayout">
        <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post, i) => (
            <motion.div
              key={post.slug}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <BlogCard post={post} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {filtered.length === 0 && (
        <p className="py-16 text-center font-mono text-sm text-zinc-400">
          {locale === 'es' ? 'No hay contenido con ese filtro.' : 'No content with that filter.'}
        </p>
      )}
    </main>
  )
}
