'use client'

import { useTranslations, useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { BlogPost } from '@/types'
import BlogCard from '@/components/blog/BlogCard'

export default function BlogPreview({ posts }: { posts: BlogPost[] }) {
  const t = useTranslations('blog')
  const locale = useLocale()
  const preview = posts.slice(0, 3)

  return (
    <section id="blog" className="mx-auto max-w-6xl px-6 py-16">
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

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {preview.map((post, i) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <BlogCard post={post} />
          </motion.div>
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
          {locale === 'es' ? 'Ver todo el contenido' : 'View all content'}
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </motion.div>
    </section>
  )
}
