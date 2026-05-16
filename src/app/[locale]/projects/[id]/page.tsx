import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { projects } from '@/lib/projects'
import ProjectDetailClient from './ProjectDetailClient'

export async function generateStaticParams() {
  const locales = ['es', 'en']
  return locales.flatMap((locale) => projects.map((p) => ({ locale, id: p.id })))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>
}) {
  const { id, locale } = await params
  const project = projects.find((p) => p.id === id)
  if (!project) return {}

  const t = await getTranslations({ locale, namespace: 'projects' })
  const isEn = locale === 'en'
  const description =
    isEn && project.details?.translations?.en?.fullDescription
      ? project.details.translations.en.fullDescription
      : (project.details?.fullDescription ?? project.description)

  return {
    title: project.title,
    description,
    openGraph: {
      title: project.title,
      description,
    },
    // Evitar advertencia de t no utilizado
    other: { locale: t('title') ? locale : locale },
  }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>
}) {
  const { id, locale } = await params
  const project = projects.find((p) => p.id === id)
  if (!project) notFound()

  return <ProjectDetailClient project={project} locale={locale} />
}
