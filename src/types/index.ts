export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  liveUrl?: string
  githubUrl?: string
  image: string
  featured: boolean
}

export interface Skill {
  name: string
  category: 'frontend' | 'backend' | 'devops' | 'tools'
  level: 1 | 2 | 3 | 4 | 5
  icon: string
}

export type PostBadge = 'NUEVO' | 'PRÓXIMAMENTE' | 'DESTACADO' | 'FREE' | 'PREMIUM'
export type PostType = 'article' | 'video' | 'resource' | 'offer'

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  readingTime: number
  tags: string[]
  published: boolean
  comingSoon?: boolean
  badge?: PostBadge
  type?: PostType
  featured?: boolean
  coverImage?: string
  videoUrl?: string
  downloadUrl?: string
  downloadLabel?: string
  price?: number | null
  priceLabel?: string
}
