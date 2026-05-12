'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, AlertTriangle } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

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
        {/* Icono */}
        <div className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-950/30">
          <AlertTriangle size={28} className="text-red-500" aria-hidden="true" />
        </div>

        <h1 className="mb-3 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Algo salió mal
        </h1>
        <p className="mb-10 text-sm leading-relaxed text-zinc-500 dark:text-zinc-500">
          Ocurrió un error inesperado. Puedes intentar de nuevo o volver al inicio.
          {error?.digest && (
            <span className="mt-2 block font-mono text-xs text-zinc-400">ID: {error.digest}</span>
          )}
        </p>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Intentar de nuevo
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-5 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            Inicio
          </Link>
        </div>
      </motion.div>
    </main>
  )
}
