import Hero from '@/components/sections/Hero'
import Experience from '@/components/sections/Experience'
import Projects from '@/components/sections/Projects'
import Skills from '@/components/sections/Skills'
import BlogPreview from '@/components/sections/BlogPreview'
import Contact from '@/components/sections/Contact'
import { getAllPosts } from '@/lib/blog'

export default function HomePage() {
  const posts = getAllPosts()

  return (
    <main id="main-content">
      <Hero />
      <Experience />
      <Projects />
      <Skills />
      <BlogPreview posts={posts} />
      <Contact />
    </main>
  )
}
