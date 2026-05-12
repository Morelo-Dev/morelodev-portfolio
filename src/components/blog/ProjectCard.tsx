'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { ExternalLink, Code2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Project } from '@/types'

interface ProjectCardProps {
  project: Project
  featured?: boolean
}

export default function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const t = useTranslations('projects')

  return (
    <article
      className={cn(
        'group relative flex h-full flex-col rounded-xl border border-zinc-200 bg-white p-6',
        'transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5',
        'dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-blue-900 dark:hover:shadow-blue-500/10',
        featured && 'sm:col-span-2 lg:col-span-1'
      )}
    >
      {/* Glow on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(59,130,246,0.04), transparent 70%)',
        }}
      />

      {/* Tags */}
      <div className="mb-4 flex flex-wrap gap-1.5" role="list" aria-label="Tecnologías">
        {project.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            role="listitem"
            className="rounded-full bg-zinc-100 px-2.5 py-0.5 font-mono text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
          >
            {tag}
          </span>
        ))}
        {project.tags.length > 3 && (
          <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 font-mono text-xs text-zinc-400 dark:bg-zinc-800 dark:text-zinc-600">
            +{project.tags.length - 3}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col">
        <h3 className="mb-2 font-semibold text-zinc-900 dark:text-zinc-50">{project.title}</h3>
        <p className="flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {project.description}
        </p>
      </div>

      {/* Links */}
      <div className="mt-6 flex items-center gap-3 border-t border-zinc-100 pt-4 dark:border-zinc-800">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Código fuente de ${project.title}`}
            className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-100"
          >
            <Code2 size={13} aria-hidden="true" />
            {t('code')}
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Demo en vivo de ${project.title}`}
            className="ml-auto inline-flex items-center gap-1.5 font-mono text-xs text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            {t('live')}
            <ExternalLink size={12} aria-hidden="true" />
          </a>
        )}
      </div>
    </article>
  )
}
