import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Contact from '@/components/sections/Contact'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('contact')
  return { title: t('title'), description: t('subtitle') }
}

export default function ContactPage() {
  return (
    <main id="main-content" className="pt-8">
      <Contact />
    </main>
  )
}
