import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'

const BASE = 'https://morelodev.com'
const LOCALES = ['es', 'en']
const ROUTES = ['', '/experience', '/projects', '/skills', '/blog', '/contact']

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = LOCALES.flatMap((locale) =>
    ROUTES.map((route) => ({
      url: `${BASE}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1 : 0.8,
    }))
  )

  const posts = getAllPosts()
  const blogPages = LOCALES.flatMap((locale) =>
    posts.map((post) => ({
      url: `${BASE}/${locale}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    }))
  )

  return [...staticPages, ...blogPages]
}
