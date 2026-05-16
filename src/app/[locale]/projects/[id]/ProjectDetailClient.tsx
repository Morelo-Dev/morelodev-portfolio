'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { CheckCircle2, ExternalLink, Code2, ArrowLeft, Calendar, Activity } from 'lucide-react'
import type { Project } from '@/types'

interface ProjectDetailClientProps {
  project: Project
  locale: string
}

// Reutilizamos el mockup del ProjectCard
function ProjectMockup({ accent, id }: { accent: string; id: string }) {
  const isJmfenix = id === 'jmfenix'
  const isEcommerce = id === 'ecommerce-platform'
  const isAnalytics = id === 'analytics-dashboard'
  const isApi = id === 'api-rest'

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ background: `linear-gradient(135deg, #09090b 0%, ${accent}18 100%)` }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to right, ${accent}10 1px, transparent 1px), linear-gradient(to bottom, ${accent}10 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: `${accent}20` }}
      />
      <div className="absolute inset-0 flex items-center justify-center p-8">
        {isJmfenix && <DashboardMockup accent={accent} />}
        {isEcommerce && <EcommerceMockup accent={accent} />}
        {isApi && <ApiMockup accent={accent} />}
        {isAnalytics && <AnalyticsMockup accent={accent} />}
        {!isJmfenix && !isEcommerce && !isApi && !isAnalytics && <GenericMockup accent={accent} />}
      </div>
    </div>
  )
}

function DashboardMockup({ accent }: { accent: string }) {
  return (
    <div className="w-full space-y-3">
      <div className="flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2">
        <div className="h-2 w-2 rounded-full bg-red-400/70" />
        <div className="h-2 w-2 rounded-full bg-yellow-400/70" />
        <div className="h-2 w-2 rounded-full bg-green-400/70" />
        <div className="ml-2 h-1.5 w-24 rounded-full bg-white/10" />
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded border border-white/10 bg-white/5 p-2">
            <div className="mb-1.5 h-1.5 w-10 rounded-full bg-white/20" />
            <div className="h-4 w-8 rounded" style={{ background: `${accent}60` }} />
          </div>
        ))}
      </div>
      <div className="space-y-1.5 rounded border border-white/10 bg-white/5 p-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="h-1.5 flex-1 rounded-full bg-white/10" />
            <div
              className="h-1.5 w-10 rounded-full"
              style={{ background: `${accent}${i === 1 ? '80' : '30'}` }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

function EcommerceMockup({ accent }: { accent: string }) {
  return (
    <div className="w-full space-y-3">
      <div className="grid grid-cols-3 gap-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded border border-white/10 bg-white/5">
            <div
              className="h-12 rounded-t"
              style={{ background: `${accent}${i === 1 ? '40' : '20'}` }}
            />
            <div className="space-y-1 p-2">
              <div className="h-1.5 w-full rounded-full bg-white/15" />
              <div className="h-1.5 w-2/3 rounded-full" style={{ background: `${accent}50` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between rounded border border-white/10 bg-white/5 px-3 py-2">
        <div className="h-1.5 w-16 rounded-full bg-white/15" />
        <div className="h-6 w-16 rounded" style={{ background: `${accent}60` }} />
      </div>
    </div>
  )
}

function AnalyticsMockup({ accent }: { accent: string }) {
  const bars = [40, 65, 50, 80, 55, 90, 70]
  return (
    <div className="w-full space-y-3">
      <div className="rounded border border-white/10 bg-white/5 p-3">
        <div className="mb-3 flex h-16 items-end gap-1">
          {bars.map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm"
              style={{ height: `${h}%`, background: `${accent}${i === 5 ? '90' : '40'}` }}
            />
          ))}
        </div>
        <div className="h-px bg-white/10" />
      </div>
      <div className="grid grid-cols-2 gap-2">
        {[1, 2].map((i) => (
          <div key={i} className="rounded border border-white/10 bg-white/5 p-2">
            <div className="mb-1 h-1.5 w-10 rounded-full bg-white/20" />
            <div className="h-3 w-12 rounded" style={{ background: `${accent}50` }} />
          </div>
        ))}
      </div>
    </div>
  )
}

function ApiMockup({ accent }: { accent: string }) {
  const methods = ['GET', 'POST', 'PUT', 'DELETE']
  const colors: Record<string, string> = {
    GET: '#22c55e',
    POST: '#3b82f6',
    PUT: '#f59e0b',
    DELETE: '#ef4444',
  }
  return (
    <div className="w-full space-y-2">
      {methods.map((m) => (
        <div
          key={m}
          className="flex items-center gap-3 rounded border border-white/10 bg-white/5 px-3 py-2"
        >
          <span className="w-10 font-mono text-[10px] font-bold" style={{ color: colors[m] }}>
            {m}
          </span>
          <div className="h-1.5 flex-1 rounded-full bg-white/10" />
          <div className="h-1.5 w-8 rounded-full" style={{ background: `${accent}50` }} />
        </div>
      ))}
    </div>
  )
}

function GenericMockup({ accent }: { accent: string }) {
  return (
    <div className="w-full space-y-3">
      <div className="h-10 w-full rounded border border-white/10 bg-white/5" />
      <div className="grid grid-cols-2 gap-2">
        <div className="h-16 rounded border border-white/10 bg-white/5" />
        <div
          className="h-16 rounded border border-white/10"
          style={{ background: `${accent}15`, borderColor: `${accent}30` }}
        />
      </div>
      <div className="h-1.5 w-3/4 rounded-full bg-white/10" />
    </div>
  )
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

export default function ProjectDetailClient({ project, locale }: ProjectDetailClientProps) {
  const t = useTranslations('projects')
  const accent = project.accent ?? '#2563eb'
  const isEn = locale === 'en'

  const fullDescription =
    isEn && project.details?.translations?.en?.fullDescription
      ? project.details.translations.en.fullDescription
      : (project.details?.fullDescription ?? project.description)

  const features =
    isEn && project.details?.translations?.en?.features
      ? project.details.translations.en.features
      : (project.details?.features ?? [])

  const statusLabel =
    project.details?.status === 'in-progress' ? t('status_in_progress') : t('status_completed')

  const statusColor = project.details?.status === 'in-progress' ? '#f59e0b' : '#22c55e'

  return (
    <main className="min-h-screen bg-zinc-950 pt-20 pb-24">
      {/* Hero con gradiente accent */}
      <div
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, #09090b 0%, ${accent}15 50%, #09090b 100%)`,
        }}
      >
        {/* Grid sutil de fondo */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `linear-gradient(to right, ${accent}10 1px, transparent 1px), linear-gradient(to bottom, ${accent}10 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />

        {/* Glow superior */}
        <div
          className="absolute top-0 left-1/2 h-64 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{ background: `${accent}12` }}
        />

        <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            {/* Breadcrumb / volver */}
            <motion.div variants={itemVariants}>
              <Link
                href={`/${locale}#projects`}
                className="inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-zinc-200"
              >
                <ArrowLeft size={14} />
                {t('back')}
              </Link>
            </motion.div>

            {/* Título y metadatos */}
            <motion.div variants={itemVariants} className="mt-6">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                {/* Badge de status */}
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
                  style={{
                    background: `${statusColor}15`,
                    border: `1px solid ${statusColor}40`,
                    color: statusColor,
                  }}
                >
                  <Activity size={11} />
                  {statusLabel}
                </span>

                {/* Año */}
                {project.details?.year && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-400">
                    <Calendar size={11} />
                    {t('year')}: {project.details.year}
                  </span>
                )}
              </div>

              <h1 className="text-3xl font-bold text-zinc-50 sm:text-4xl">{project.title}</h1>
            </motion.div>

            {/* Tags del stack */}
            <motion.div variants={itemVariants} className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-zinc-800/80 px-3 py-1 font-mono text-[11px] text-zinc-300"
                  style={{ borderColor: `${accent}20` }}
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-12 grid gap-10 lg:grid-cols-[1fr_360px]"
        >
          {/* Columna izquierda: descripción y features */}
          <div className="space-y-10">
            {/* Sobre el proyecto */}
            <motion.section variants={itemVariants}>
              <h2 className="mb-4 text-lg font-semibold" style={{ color: accent }}>
                {t('about')}
              </h2>
              <p className="leading-relaxed text-zinc-300">{fullDescription}</p>
            </motion.section>

            {/* Características */}
            {features.length > 0 && (
              <motion.section variants={itemVariants}>
                <h2 className="mb-4 text-lg font-semibold" style={{ color: accent }}>
                  {t('features')}
                </h2>
                <ul className="space-y-3">
                  {features.map((feature, i) => (
                    <motion.li key={i} variants={itemVariants} className="flex items-start gap-3">
                      <CheckCircle2
                        size={16}
                        className="mt-0.5 shrink-0"
                        style={{ color: accent }}
                      />
                      <span className="text-sm leading-relaxed text-zinc-300">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.section>
            )}

            {/* Footer con botones */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-4 border-t border-zinc-800 pt-8"
            >
              <Link
                href={`/${locale}#projects`}
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-4 py-2.5 text-sm text-zinc-300 transition-all hover:border-zinc-500 hover:text-zinc-100"
              >
                <ArrowLeft size={14} />
                {t('back')}
              </Link>

              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-4 py-2.5 text-sm text-zinc-300 transition-all hover:border-zinc-500 hover:text-zinc-100"
                >
                  <Code2 size={14} />
                  {t('repo')}
                </a>
              ) : (
                <span className="inline-flex cursor-not-allowed items-center gap-2 rounded-lg border border-zinc-800 px-4 py-2.5 text-sm text-zinc-600">
                  <Code2 size={14} />
                  {t('no_repo')}
                </span>
              )}

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-white transition-all hover:opacity-90"
                  style={{ background: accent }}
                >
                  {t('live')}
                  <ExternalLink size={13} />
                </a>
              )}
            </motion.div>
          </div>

          {/* Columna derecha: mockup visual */}
          <motion.div variants={itemVariants} className="order-first lg:order-last">
            <div
              className="sticky top-24 overflow-hidden rounded-xl border"
              style={{
                borderColor: `${accent}30`,
                height: '320px',
              }}
            >
              <ProjectMockup accent={accent} id={project.id} />
            </div>

            {/* Accent line */}
            <div
              className="mt-2 h-0.5 rounded-full opacity-40"
              style={{ background: `linear-gradient(to right, ${accent}, transparent)` }}
            />
          </motion.div>
        </motion.div>
      </div>
    </main>
  )
}
