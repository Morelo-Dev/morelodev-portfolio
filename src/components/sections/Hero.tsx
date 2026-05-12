'use client'

import { useTranslations, useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowDown, Download } from 'lucide-react'
import { cn } from '@/lib/utils'

const TITLES = ['Software Developer', 'Frontend Engineer', 'Full Stack Dev', 'Problem Solver']

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: 'easeOut' as const },
  }),
}

export default function Hero() {
  const t = useTranslations('hero')
  const locale = useLocale()

  return (
    <section
      id="hero"
      className="relative flex min-h-[88vh] flex-col items-center justify-center overflow-hidden px-6 pt-16"
      aria-label="Presentación"
    >
      {/* Grid background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:4rem_4rem]"
      />

      {/* Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-500/20"
      />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        {/* Badge */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/80 px-4 py-1.5 backdrop-blur-sm dark:border-zinc-700 dark:bg-zinc-900/80"
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" aria-hidden="true" />
          <span className="font-mono text-xs text-zinc-600 dark:text-zinc-400">
            {locale === 'es' ? 'Disponible para proyectos' : 'Available for projects'}
          </span>
        </motion.div>

        {/* Greeting */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.1}
          className="mb-2 font-mono text-sm text-zinc-500 dark:text-zinc-400"
        >
          {t('greeting')}
        </motion.p>

        {/* Name */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.2}
          className="mb-2 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-50"
        >
          {t('name')}
        </motion.h1>

        {/* Animated title */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.3}
          className="mb-4 h-7 overflow-hidden"
          aria-label={t('title')}
        >
          <AnimatedTitles titles={TITLES} />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.4}
          className="mx-auto mb-6 max-w-xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400"
        >
          {t('subtitle')}
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.5}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            href={`/${locale}/projects`}
            className={cn(
              'inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white',
              'transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/20',
              'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
            )}
          >
            {t('cta_projects')}
            <ArrowDown size={14} aria-hidden="true" />
          </Link>

          <a
            href="/cv-jorge-morelo.pdf"
            download
            className={cn(
              'inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white px-5 py-2.5 text-sm font-medium text-zinc-700',
              'transition-all hover:border-zinc-400 hover:bg-zinc-50',
              'dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-600 dark:hover:bg-zinc-800',
              'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
            )}
          >
            <Download size={14} aria-hidden="true" />
            {t('cta_cv')}
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.6}
          className="mt-6 flex items-center justify-center gap-4"
        >
          <a
            href="https://github.com/Morelo-Dev"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub de Jorge Morelo"
            className="text-zinc-400 transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            <IconGitHub />
          </a>
          <a
            href="https://www.linkedin.com/in/morelodev/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn de Jorge Morelo"
            className="text-zinc-400 transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            <IconLinkedIn />
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          className="text-zinc-400 dark:text-zinc-600"
        >
          <ArrowDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  )
}

function IconGitHub() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

function IconLinkedIn() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function AnimatedTitles({ titles }: { titles: string[] }) {
  return (
    <motion.div
      animate={{ y: titles.map((_, i) => `-${i * 100}%`) }}
      transition={{
        duration: titles.length * 3,
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'easeInOut',
        times: titles.map((_, i) => i / titles.length),
      }}
    >
      {titles.map((title) => (
        <p
          key={title}
          className="h-8 font-mono text-lg font-semibold text-blue-600 dark:text-blue-400"
        >
          {title}
        </p>
      ))}
    </motion.div>
  )
}
