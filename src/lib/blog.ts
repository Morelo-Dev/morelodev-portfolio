import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import type { BlogPost } from '@/types'

const CONTENT_DIR = path.join(process.cwd(), 'content/blog')

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(CONTENT_DIR)) return []

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.mdx'))

  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '')
      const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf-8')
      const { data, content } = matter(raw)
      const rt = readingTime(content)

      return {
        slug,
        title: data.title as string,
        excerpt: data.excerpt as string,
        date: data.date as string,
        readingTime: Math.ceil(rt.minutes),
        tags: (data.tags as string[]) ?? [],
        published: (data.published as boolean) ?? true,
      } satisfies BlogPost
    })
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string) {
  const file = path.join(CONTENT_DIR, `${slug}.mdx`)
  if (!fs.existsSync(file)) return null
  const raw = fs.readFileSync(file, 'utf-8')
  const { data, content } = matter(raw)
  const rt = readingTime(content)
  return { data, content, readingTime: Math.ceil(rt.minutes) }
}
