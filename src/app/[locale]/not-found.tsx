'use client'

import Link from 'next/link'
import { useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import { ArrowLeft, Terminal } from 'lucide-react'

export default function NotFound() {
  const locale = useLocale()

  return (
    <main
      id="main-content"
      className="flex min-h-screen flex-col items-center justify-center px-6 text-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md"
      >
        {/* Code block decorativo */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900">
          <Terminal size={14} className="text-zinc-400" aria-hidden="true" />
          <code className="font-mono text-sm text-zinc-500 dark:text-zinc-400">
            <span className="text-red-500">Error</span>
            {': '}
            <span className="text-yellow-600 dark:text-yellow-400">404</span>
            {' — página no encontrada'}
          </code>
        </div>

        <h1 className="mb-3 text-6xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-50">
          404
        </h1>
        <p className="mb-2 text-lg font-medium text-zinc-700 dark:text-zinc-300">
          {locale === 'es' ? 'Página no encontrada' : 'Page not found'}
        </p>
        <p className="mb-10 text-sm leading-relaxed text-zinc-500 dark:text-zinc-500">
          {locale === 'es'
            ? 'La ruta que buscas no existe o está en construcción. Vuelve al inicio y sigue explorando.'
            : "The route you're looking for doesn't exist or is under construction. Head back home."}
        </p>

        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          {locale === 'es' ? 'Volver al inicio' : 'Back to home'}
        </Link>
      </motion.div>
    </main>
  )
}
