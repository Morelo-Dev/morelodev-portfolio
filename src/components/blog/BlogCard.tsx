'use client'

import Link from 'next/link'
import { useLocale } from 'next-intl'
import { Clock, Lock, Play, Download, Tag, ShoppingCart, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { BlogPost, PostBadge, PostType } from '@/types'

const BADGE_STYLES: Record<PostBadge, string> = {
  NUEVO: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400',
  PRÓXIMAMENTE: 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400',
  DESTACADO: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400',
  FREE: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400',
  PREMIUM: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400',
}

const TYPE_ICONS: Record<PostType, React.ReactNode> = {
  article: <Tag size={12} />,
  video: <Play size={12} />,
  resource: <Download size={12} />,
  offer: <ShoppingCart size={12} />,
}

const TYPE_LABELS: Record<PostType, { es: string; en: string }> = {
  article: { es: 'Artículo', en: 'Article' },
  video: { es: 'Video', en: 'Video' },
  resource: { es: 'Recurso', en: 'Resource' },
  offer: { es: 'Oferta', en: 'Offer' },
}

export default function BlogCard({ post }: { post: BlogPost }) {
  const locale = useLocale()
  const isLocked = post.comingSoon || (!post.published && !post.comingSoon)
  const type = post.type ?? 'article'
  const typeLabel = TYPE_LABELS[type][locale as 'es' | 'en']

  const cardContent = (
    <article
      className={cn(
        'group relative flex h-full flex-col rounded-xl border bg-white p-5',
        'transition-all duration-300',
        isLocked
          ? 'border-zinc-200 opacity-80 dark:border-zinc-800 dark:bg-zinc-900'
          : 'border-zinc-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-blue-900'
      )}
    >
      {/* Top row: type + badge */}
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-400 dark:text-zinc-500">
          {TYPE_ICONS[type]}
          {typeLabel}
        </span>

        <div className="flex items-center gap-1.5">
          {post.badge && (
            <span
              className={cn(
                'rounded-full px-2 py-0.5 font-mono text-xs font-semibold',
                BADGE_STYLES[post.badge]
              )}
            >
              {post.badge}
            </span>
          )}
          {isLocked && (
            <span className="flex items-center gap-1 rounded-full bg-zinc-100 px-2 py-0.5 font-mono text-xs text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
              <Lock size={10} />
              {locale === 'es' ? 'Próximamente' : 'Coming soon'}
            </span>
          )}
        </div>
      </div>

      {/* Cover image */}
      {post.coverImage && !isLocked && (
        <div className="mb-4 overflow-hidden rounded-lg">
          <img
            src={post.coverImage}
            alt={post.title}
            className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}

      {/* Title & excerpt */}
      <h3
        className={cn(
          'mb-2 leading-snug font-semibold text-zinc-900 dark:text-zinc-50',
          isLocked && 'text-zinc-500 dark:text-zinc-400'
        )}
      >
        {post.title}
      </h3>
      <p className="mb-4 line-clamp-2 flex-1 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
        {post.excerpt}
      </p>

      {/* Tags */}
      {post.tags.length > 0 && !isLocked && (
        <div className="mb-4 flex flex-wrap gap-1.5">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-zinc-100 px-2 py-0.5 font-mono text-xs text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="mt-auto flex items-center justify-between border-t border-zinc-100 pt-3 dark:border-zinc-800">
        <div className="flex items-center gap-1 text-xs text-zinc-400">
          <Clock size={12} />
          <span>{post.readingTime} min</span>
        </div>

        {post.price != null && !isLocked ? (
          <span
            className={cn(
              'font-mono text-sm font-bold',
              post.price === 0
                ? 'text-green-600 dark:text-green-400'
                : 'text-purple-600 dark:text-purple-400'
            )}
          >
            {post.price === 0 ? (locale === 'es' ? 'Gratis' : 'Free') : post.priceLabel}
          </span>
        ) : !isLocked ? (
          <ArrowRight
            size={14}
            className="text-zinc-400 transition-transform group-hover:translate-x-1 group-hover:text-blue-600 dark:group-hover:text-blue-400"
          />
        ) : null}
      </div>
    </article>
  )

  if (isLocked) return cardContent

  return (
    <Link href={`/${locale}/blog/${post.slug}`} className="block h-full">
      {cardContent}
    </Link>
  )
}
