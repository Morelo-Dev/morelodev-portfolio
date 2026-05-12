import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import ProjectsClient from './ProjectsClient'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('projects')
  return {
    title: t('title'),
    description: t('subtitle'),
  }
}

export default function ProjectsPage() {
  return <ProjectsClient />
}
