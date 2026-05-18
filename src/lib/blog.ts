import { sanityClient } from './sanity/client'
import { ALL_POSTS_QUERY, POST_BY_SLUG_QUERY } from './sanity/queries'
import type { BlogPost } from '@/types'

function estimateReadingTime(body: unknown[]): number {
  if (!Array.isArray(body)) return 1
  const text = body
    .filter((b: unknown) => (b as { _type: string })._type === 'block')
    .flatMap((b: unknown) =>
      ((b as { children?: { text?: string }[] }).children ?? []).map((c) => c.text ?? '')
    )
    .join(' ')
  return Math.max(1, Math.ceil(text.split(/\s+/).length / 200))
}

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const raw = await sanityClient.fetch<(BlogPost & { body?: unknown[] })[]>(ALL_POSTS_QUERY)
    return (raw ?? []).map((p) => ({
      ...p,
      tags: p.tags ?? [],
      readingTime: estimateReadingTime(p.body ?? []),
    }))
  } catch {
    return []
  }
}

export async function getPostBySlug(slug: string) {
  try {
    const raw = await sanityClient.fetch<(BlogPost & { body?: unknown[] }) | null>(
      POST_BY_SLUG_QUERY,
      { slug }
    )
    if (!raw) return null
    return {
      data: { ...raw, tags: raw.tags ?? [] },
      body: raw.body ?? [],
      readingTime: estimateReadingTime(raw.body ?? []),
    }
  } catch {
    return null
  }
}
