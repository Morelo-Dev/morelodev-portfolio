import type { Metadata } from 'next'
import { getLocale } from 'next-intl/server'
import Experience from '@/components/sections/Experience'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  return {
    title: locale === 'es' ? 'Experiencia — Jorge Morelo' : 'Experience — Jorge Morelo',
    description:
      locale === 'es'
        ? 'Trayectoria profesional y experiencia laboral de Jorge Morelo.'
        : 'Jorge Morelo professional experience and work history.',
  }
}

export default function ExperiencePage() {
  return (
    <main id="main-content" className="pt-8">
      <Experience />
    </main>
  )
}
