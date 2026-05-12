'use client'

import { useState, useMemo } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Clock, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { BlogPost } from '@/types'

export default function BlogListClient({ posts }: { posts: BlogPost[] }) {
  const t = useTranslations('blog')
  const locale = useLocale()
  const [activeTag, setActiveTag] = useState('Todos')

  const allTags = useMemo(() => {
    const tags = new Set<string>()
    posts.forEach((p) => p.tags.forEach((tag) => tags.add(tag)))
    return ['Todos', ...Array.from(tags).sort()]
  }, [posts])

  const filtered = useMemo(
    () => (activeTag === 'Todos' ? posts : posts.filter((p) => p.tags.includes(activeTag))),
    [posts, activeTag]
  )

  return (
    <main id="main-content" className="mx-auto max-w-3xl px-6 py-24">
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

      {/* Tags */}
      <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filtrar por etiqueta">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            aria-pressed={activeTag === tag}
            className={`rounded-full border px-3 py-1 font-mono text-xs transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
              activeTag === tag
                ? 'border-blue-600 bg-blue-600 text-white'
                : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <AnimatePresence mode="popLayout">
        <motion.div layout className="space-y-4">
          {filtered.map((post, i) => (
            <motion.article
              key={post.slug}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <Link
                href={`/${locale}/blog/${post.slug}`}
                className={cn(
                  'group flex items-start justify-between gap-6 rounded-xl border border-zinc-200 bg-white p-6',
                  'transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md',
                  'dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-blue-900'
                )}
              >
                <div className="min-w-0 flex-1">
                  <div className="mb-3 flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-zinc-100 px-2 py-0.5 font-mono text-xs text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="mb-2 font-semibold text-zinc-900 transition-colors group-hover:text-blue-600 dark:text-zinc-50 dark:group-hover:text-blue-400">
                    {post.title}
                  </h2>
                  <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-500">
                    {post.excerpt}
                  </p>
                  <div className="mt-3 flex items-center gap-3">
                    <time
                      dateTime={post.date}
                      className="font-mono text-xs text-zinc-400 dark:text-zinc-600"
                    >
                      {new Date(post.date).toLocaleDateString(locale === 'es' ? 'es-CO' : 'en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                    <span className="flex items-center gap-1 font-mono text-xs text-zinc-400 dark:text-zinc-600">
                      <Clock size={11} aria-hidden="true" />
                      {post.readingTime} {t('min_read')}
                    </span>
                  </div>
                </div>
                <ArrowRight
                  size={16}
                  className="mt-1 shrink-0 text-zinc-300 transition-colors group-hover:text-blue-500 dark:text-zinc-700"
                  aria-hidden="true"
                />
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </AnimatePresence>

      {filtered.length === 0 && (
        <p className="py-16 text-center font-mono text-sm text-zinc-400">
          {locale === 'es' ? 'No hay artículos con esa etiqueta.' : 'No articles with that tag.'}
        </p>
      )}
    </main>
  )
}
