'use client'

'use client'

import { useTranslations } from 'next-intl'
import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink, Code2, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Project } from '@/types'
import { useLocale } from 'next-intl'

interface ProjectCardProps {
  project: Project
  index?: number
}

// Mockup visual único por proyecto (puro CSS, sin imágenes)
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
      {/* Grid sutil */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to right, ${accent}10 1px, transparent 1px), linear-gradient(to bottom, ${accent}10 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Glow central */}
      <div
        className="absolute top-1/2 left-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
        style={{ background: `${accent}20` }}
      />

      {/* Mockup específico por tipo */}
      <div className="absolute inset-0 flex items-center justify-center p-5">
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
    <div className="w-full space-y-2">
      {/* Header bar */}
      <div className="flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2.5 py-1.5">
        <div className="h-1.5 w-1.5 rounded-full bg-red-400/70" />
        <div className="h-1.5 w-1.5 rounded-full bg-yellow-400/70" />
        <div className="h-1.5 w-1.5 rounded-full bg-green-400/70" />
        <div className="ml-2 h-1 w-16 rounded-full bg-white/10" />
      </div>
      {/* Stats row */}
      <div className="grid grid-cols-3 gap-1.5">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded border border-white/10 bg-white/5 p-1.5">
            <div className="mb-1 h-1 w-8 rounded-full bg-white/20" />
            <div className="h-3 w-6 rounded" style={{ background: `${accent}60` }} />
          </div>
        ))}
      </div>
      {/* Table rows */}
      <div className="space-y-1 rounded border border-white/10 bg-white/5 p-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="h-1 flex-1 rounded-full bg-white/10" />
            <div
              className="h-1 w-8 rounded-full"
              style={{ background: `${accent}${i === 1 ? '70' : '30'}` }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

function EcommerceMockup({ accent }: { accent: string }) {
  return (
    <div className="w-full space-y-2">
      {/* Product grid */}
      <div className="grid grid-cols-3 gap-1.5">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded border border-white/10 bg-white/5">
            <div
              className="h-8 rounded-t"
              style={{ background: `${accent}${i === 1 ? '40' : '20'}` }}
            />
            <div className="space-y-1 p-1.5">
              <div className="h-1 w-full rounded-full bg-white/15" />
              <div className="h-1 w-2/3 rounded-full" style={{ background: `${accent}50` }} />
            </div>
          </div>
        ))}
      </div>
      {/* Cart summary */}
      <div className="flex items-center justify-between rounded border border-white/10 bg-white/5 px-2.5 py-1.5">
        <div className="h-1 w-12 rounded-full bg-white/15" />
        <div className="h-4 w-12 rounded" style={{ background: `${accent}60` }} />
      </div>
    </div>
  )
}

function AnalyticsMockup({ accent }: { accent: string }) {
  const bars = [40, 65, 50, 80, 55, 90, 70]
  return (
    <div className="w-full space-y-2">
      {/* Chart */}
      <div className="rounded border border-white/10 bg-white/5 p-2">
        <div className="mb-2 flex h-12 items-end gap-1">
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
      {/* Metrics */}
      <div className="grid grid-cols-2 gap-1.5">
        {[1, 2].map((i) => (
          <div key={i} className="rounded border border-white/10 bg-white/5 p-1.5">
            <div className="mb-1 h-1 w-8 rounded-full bg-white/20" />
            <div className="h-2 w-10 rounded" style={{ background: `${accent}50` }} />
          </div>
        ))}
      </div>
    </div>
  )
}

function ApiMockup({ accent }: { accent: string }) {
  const methods = ['GET', 'POST', 'PUT']
  const colors: Record<string, string> = { GET: '#22c55e', POST: '#3b82f6', PUT: '#f59e0b' }
  return (
    <div className="w-full space-y-1.5">
      {methods.map((m) => (
        <div
          key={m}
          className="flex items-center gap-2 rounded border border-white/10 bg-white/5 px-2 py-1.5"
        >
          <span className="font-mono text-[9px] font-bold" style={{ color: colors[m] }}>
            {m}
          </span>
          <div className="h-1 flex-1 rounded-full bg-white/10" />
          <div className="h-1 w-6 rounded-full" style={{ background: `${accent}50` }} />
        </div>
      ))}
      {/* Response */}
      <div className="rounded border border-white/10 bg-white/5 p-1.5">
        <div className="flex gap-1.5">
          <span className="font-mono text-[9px]" style={{ color: accent }}>
            200
          </span>
          <div className="my-auto h-1 w-16 rounded-full bg-white/10" />
        </div>
      </div>
    </div>
  )
}

function GenericMockup({ accent }: { accent: string }) {
  return (
    <div className="w-full space-y-2">
      <div className="h-8 w-full rounded border border-white/10 bg-white/5" />
      <div className="grid grid-cols-2 gap-1.5">
        <div className="h-12 rounded border border-white/10 bg-white/5" />
        <div
          className="h-12 rounded border border-white/10"
          style={{ background: `${accent}15`, borderColor: `${accent}30` }}
        />
      </div>
      <div className="h-1 w-3/4 rounded-full bg-white/10" />
    </div>
  )
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const t = useTranslations('projects')
  const locale = useLocale()
  const accent = project.accent ?? '#2563eb'
  const cardRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const [imageError, setImageError] = useState(false)

  // Tilt 3D suave
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setHovered(false)
  }

  const hasRealImage = project.image && !imageError

  return (
    <motion.div
      style={{ perspective: 800 }}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.35, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <motion.article
        ref={cardRef}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          borderColor: hovered ? `${accent}50` : 'rgb(39 39 42)',
          boxShadow: hovered ? `0 20px 60px -10px ${accent}25` : undefined,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        className={cn(
          'group relative flex h-full flex-col overflow-hidden rounded-xl border bg-zinc-900',
          'transition-shadow duration-300',
          hovered ? 'shadow-2xl' : 'shadow-md'
        )}
        aria-label={project.title}
      >
        {/* ── Visual header ── */}
        <div className="relative h-40 shrink-0 overflow-hidden">
          {hasRealImage ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              onError={() => setImageError(true)}
            />
          ) : (
            <ProjectMockup accent={accent} id={project.id} />
          )}

          {/* Overlay degradado hacia el contenido */}
          <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-zinc-900 to-transparent" />

          {/* Accent line top */}
          <div
            className="absolute inset-x-0 top-0 h-0.5 transition-opacity duration-300"
            style={{ background: accent, opacity: hovered ? 1 : 0.4 }}
          />

          {/* Live badge */}
          {project.liveUrl && (
            <div
              className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-medium backdrop-blur-sm"
              style={{ background: `${accent}25`, border: `1px solid ${accent}40`, color: accent }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: accent, boxShadow: `0 0 6px ${accent}` }}
              />
              Live
            </div>
          )}
        </div>

        {/* ── Body ── */}
        <div className="flex flex-1 flex-col p-4">
          {/* Tags */}
          <div className="mb-3 flex flex-wrap gap-1.5" role="list" aria-label="Tecnologías">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                role="listitem"
                className="rounded-full bg-zinc-800 px-2.5 py-0.5 font-mono text-[10px] text-zinc-400"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="rounded-full bg-zinc-800 px-2.5 py-0.5 font-mono text-[10px] text-zinc-600">
                +{project.tags.length - 3}
              </span>
            )}
          </div>

          {/* Title + description */}
          <h3 className="mb-1.5 leading-snug font-semibold text-zinc-50">{project.title}</h3>
          <p className="flex-1 text-xs leading-relaxed text-zinc-400">{project.description}</p>

          {/* Links */}
          <div className="mt-4 flex items-center gap-3 border-t border-zinc-800 pt-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Código fuente de ${project.title}`}
                className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-500 transition-colors hover:text-zinc-200"
              >
                <Code2 size={12} aria-hidden="true" />
                {t('code')}
              </a>
            )}
            <Link
              href={`/${locale}/projects/${project.id}`}
              aria-label={`Ver detalles de ${project.title}`}
              className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-400 transition-colors hover:text-zinc-100"
            >
              {t('view_details')}
              <ArrowRight size={11} aria-hidden="true" />
            </Link>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Demo en vivo de ${project.title}`}
                className="ml-auto inline-flex items-center gap-1.5 font-mono text-xs font-medium transition-colors"
                style={{ color: accent }}
              >
                {t('live')}
                <ExternalLink size={11} aria-hidden="true" />
              </a>
            )}
          </div>
        </div>

        {/* Glow radial al hover */}
        <div
          className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(600px circle at 50% 0%, ${accent}08, transparent 60%)`,
          }}
        />
      </motion.article>
    </motion.div>
  )
}
