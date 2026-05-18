import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Clock, Lock, Download, Play, ShoppingCart } from 'lucide-react'
import { getAllPosts, getPostBySlug } from '@/lib/blog'
import PortableTextContent from '@/components/blog/PortableTextContent'
import type { PortableTextBlock } from '@portabletext/types'

export const dynamicParams = true
export const revalidate = 60

type Props = { params: Promise<{ slug: string; locale: string }> }

export async function generateStaticParams() {
  const posts = await getAllPosts()
  const locales = ['es', 'en']
  return posts
    .filter((p) => p.published)
    .flatMap((p) => locales.map((locale) => ({ locale, slug: p.slug })))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}
  return {
    title: post.data.title,
    description: post.data.excerpt,
    openGraph: post.data.coverImage
      ? { images: [{ url: post.data.coverImage as string }] }
      : undefined,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug, locale } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()
  const isComingSoon = post.data.comingSoon === true

  return (
    <main id="main-content" className="mx-auto max-w-3xl px-6 py-14">
      {/* Back */}
      <Link
        href={`/${locale}/blog`}
        className="mb-8 inline-flex items-center gap-2 font-mono text-sm text-zinc-500 transition-colors hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400"
      >
        <ArrowLeft size={14} aria-hidden="true" />
        {locale === 'es' ? 'Volver al blog' : 'Back to blog'}
      </Link>

      {/* Cover image */}
      {post.data.coverImage && !isComingSoon && (
        <div className="mb-8 overflow-hidden rounded-2xl">
          <img
            src={post.data.coverImage as string}
            alt={post.data.title as string}
            className="h-64 w-full object-cover"
          />
        </div>
      )}

      {/* Header */}
      <header className="mb-8">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {((post.data.tags as string[]) ?? []).map((tag: string) => (
            <span
              key={tag}
              className="rounded-full bg-zinc-100 px-2.5 py-0.5 font-mono text-xs text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
            >
              {tag}
            </span>
          ))}
          {post.data.badge && (
            <span className="rounded-full bg-blue-100 px-2.5 py-0.5 font-mono text-xs font-semibold text-blue-700 dark:bg-blue-900/40 dark:text-blue-400">
              {post.data.badge as string}
            </span>
          )}
          {post.data.type === 'video' && <Play size={14} className="text-zinc-400" />}
          {post.data.type === 'resource' && <Download size={14} className="text-zinc-400" />}
          {post.data.type === 'offer' && <ShoppingCart size={14} className="text-zinc-400" />}
        </div>

        <h1 className="mb-4 text-3xl leading-snug font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          {post.data.title as string}
        </h1>

        <div className="flex flex-wrap items-center gap-4">
          <time
            dateTime={post.data.date as string}
            className="font-mono text-sm text-zinc-400 dark:text-zinc-600"
          >
            {new Date(post.data.date as string).toLocaleDateString(
              locale === 'es' ? 'es-CO' : 'en-US',
              { year: 'numeric', month: 'long', day: 'numeric' }
            )}
          </time>
          <span className="flex items-center gap-1 font-mono text-sm text-zinc-400 dark:text-zinc-600">
            <Clock size={13} aria-hidden="true" />
            {post.readingTime} {locale === 'es' ? 'min de lectura' : 'min read'}
          </span>
          {(post.data.price as number) === 0 && (
            <span className="rounded-full bg-green-100 px-2.5 py-0.5 font-mono text-xs font-semibold text-green-700 dark:bg-green-900/40 dark:text-green-400">
              {locale === 'es' ? 'Gratis' : 'Free'}
            </span>
          )}
          {(post.data.price as number) > 0 && (
            <span className="rounded-full bg-purple-100 px-2.5 py-0.5 font-mono text-xs font-semibold text-purple-700 dark:bg-purple-900/40 dark:text-purple-400">
              {post.data.priceLabel as string}
            </span>
          )}
        </div>
      </header>

      <hr className="mb-8 border-zinc-100 dark:border-zinc-800" />

      {isComingSoon ? (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 py-20 text-center dark:border-zinc-700 dark:bg-zinc-900">
          <Lock size={32} className="text-zinc-400" />
          <h2 className="text-xl font-semibold text-zinc-700 dark:text-zinc-300">
            {locale === 'es' ? 'Contenido próximamente' : 'Content coming soon'}
          </h2>
          <p className="max-w-sm text-sm text-zinc-500 dark:text-zinc-400">
            {locale === 'es'
              ? 'Este artículo todavía no está disponible. Sígueme en LinkedIn para saber cuándo se publica.'
              : "This article isn't available yet. Follow me on LinkedIn to know when it's published."}
          </p>
          <a
            href="https://www.linkedin.com/in/morelodev/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
          >
            {locale === 'es' ? 'Seguir en LinkedIn' : 'Follow on LinkedIn'}
          </a>
        </div>
      ) : (
        <PortableTextContent body={(post.body ?? []) as PortableTextBlock[]} />
      )}

      {post.data.downloadUrl && !isComingSoon && (
        <div className="mt-10 border-t border-zinc-100 pt-8 dark:border-zinc-800">
          <a
            href={post.data.downloadUrl as string}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
          >
            <Download size={16} />
            {(post.data.downloadLabel as string) ??
              (locale === 'es' ? 'Descargar recurso' : 'Download resource')}
          </a>
        </div>
      )}
    </main>
  )
}
