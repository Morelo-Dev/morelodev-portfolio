import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Clock } from 'lucide-react'
import { getLocale } from 'next-intl/server'
import { getAllPosts, getPostBySlug } from '@/lib/blog'
import MDXContent from '@/components/blog/MDXContent'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return { title: post.data.title, description: post.data.excerpt }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const locale = await getLocale()

  return (
    <main id="main-content" className="mx-auto max-w-3xl px-6 py-14">
      {/* Back */}
      <Link
        href={`/${locale}/blog`}
        className="mb-6 inline-flex items-center gap-2 font-mono text-sm text-zinc-500 transition-colors hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400"
      >
        <ArrowLeft size={14} aria-hidden="true" />
        {locale === 'es' ? 'Volver al blog' : 'Back to blog'}
      </Link>

      {/* Header */}
      <header className="mb-6">
        <div className="mb-4 flex flex-wrap gap-1.5">
          {(post.data.tags as string[]).map((tag: string) => (
            <span
              key={tag}
              className="rounded-full bg-zinc-100 px-2.5 py-0.5 font-mono text-xs text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
            >
              {tag}
            </span>
          ))}
        </div>
        <h1 className="mb-4 text-3xl leading-snug font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          {post.data.title}
        </h1>
        <div className="flex items-center gap-4">
          <time
            dateTime={post.data.date}
            className="font-mono text-sm text-zinc-400 dark:text-zinc-600"
          >
            {new Date(post.data.date).toLocaleDateString(locale === 'es' ? 'es-CO' : 'en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          <span className="flex items-center gap-1 font-mono text-sm text-zinc-400 dark:text-zinc-600">
            <Clock size={13} aria-hidden="true" />
            {post.readingTime} {locale === 'es' ? 'min de lectura' : 'min read'}
          </span>
        </div>
      </header>

      <hr className="mb-6 border-zinc-100 dark:border-zinc-800" />

      {/* Contenido MDX */}
      <article className="prose prose-zinc dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-a:text-blue-600 prose-code:rounded prose-code:bg-zinc-100 prose-code:px-1 prose-code:py-0.5 prose-code:font-mono prose-code:text-sm dark:prose-a:text-blue-400 dark:prose-code:bg-zinc-800 max-w-none">
        <MDXContent source={post.content} />
      </article>
    </main>
  )
}
