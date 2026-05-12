'use client'

import { useTranslations, useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'
import type { BlogPost } from '@/types'
import { cn } from '@/lib/utils'

interface BlogPreviewProps {
  posts: BlogPost[]
}

export default function BlogPreview({ posts }: BlogPreviewProps) {
  const t = useTranslations('blog')
  const locale = useLocale()

  return (
    <section id="blog" className="mx-auto max-w-5xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <p className="mb-2 font-mono text-sm text-blue-600 dark:text-blue-400">
          {'// '}
          {t('subtitle')}
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          {t('title')}
        </h2>
      </motion.div>

      <div className="space-y-4">
        {posts.slice(0, 3).map((post, i) => (
          <motion.article
            key={post.slug}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <Link
              href={`/${locale}/blog/${post.slug}`}
              className={cn(
                'group flex items-start justify-between gap-6 rounded-xl border border-zinc-200 bg-white p-5',
                'transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md hover:shadow-blue-500/5',
                'dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-blue-900'
              )}
            >
              <div className="min-w-0 flex-1">
                <div className="mb-2 flex flex-wrap gap-1.5">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-zinc-100 px-2 py-0.5 font-mono text-xs text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="mb-1 font-semibold text-zinc-900 transition-colors group-hover:text-blue-600 dark:text-zinc-50 dark:group-hover:text-blue-400">
                  {post.title}
                </h3>
                <p className="line-clamp-1 text-sm text-zinc-500 dark:text-zinc-500">
                  {post.excerpt}
                </p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-2">
                <span className="flex items-center gap-1 font-mono text-xs text-zinc-400">
                  <Clock size={11} aria-hidden="true" />
                  {post.readingTime} {t('min_read')}
                </span>
                <ArrowRight
                  size={14}
                  className="text-zinc-300 transition-colors group-hover:text-blue-500 dark:text-zinc-700"
                  aria-hidden="true"
                />
              </div>
            </Link>
          </motion.article>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-8 flex justify-center"
      >
        <Link
          href={`/${locale}/blog`}
          className="inline-flex items-center gap-2 font-mono text-sm text-zinc-500 transition-colors hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400"
        >
          {locale === 'es' ? 'Ver todos los artículos' : 'View all articles'}
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </motion.div>
    </section>
  )
}
