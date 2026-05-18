export const revalidate = 60

import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { getAllPosts } from '@/lib/blog'
import BlogListClient from './BlogListClient'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('blog')
  return { title: t('title'), description: t('subtitle') }
}

export default async function BlogPage() {
  const posts = await getAllPosts()
  return <BlogListClient posts={posts} />
}
