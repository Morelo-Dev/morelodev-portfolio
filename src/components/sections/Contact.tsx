'use client'

import { useTranslations, useLocale } from 'next-intl'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(10),
  _hp: z.string(),
  _t: z.number(),
})
type FormData = z.infer<typeof schema>

export default function Contact() {
  const t = useTranslations('contact')
  const locale = useLocale()
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'rate-limit'>(
    'idle'
  )
  const [loadedAt] = useState<number>(() => Date.now())

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { _hp: '', _t: 0 },
  })

  async function onSubmit(data: FormData) {
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, _t: loadedAt }),
      })
      if (res.status === 429) {
        setStatus('rate-limit')
        return
      }
      if (!res.ok) throw new Error()
      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  const inputBase = cn(
    'w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 outline-none',
    'transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20',
    'dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder-zinc-600 dark:focus:border-blue-400'
  )

  return (
    <section id="contact" className="border-t border-zinc-100 dark:border-zinc-800">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="mb-2 font-mono text-sm text-blue-600 dark:text-blue-400">
              {'// '}
              {t('subtitle')}
            </p>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              {t('title')}
            </h2>
            <p className="mb-8 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              {locale === 'es'
                ? 'Estoy disponible para proyectos freelance, posiciones full-time y colaboraciones. Respondo en menos de 24 horas.'
                : "I'm available for freelance projects, full-time positions, and collaborations. I reply within 24 hours."}
            </p>

            {/* Links directos */}
            <div className="space-y-3">
              <a
                href="mailto:jorge.morelo@siempre.net.co"
                className="flex items-center gap-3 font-mono text-sm text-zinc-600 transition-colors hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400"
              >
                <span className="text-zinc-300 dark:text-zinc-700">→</span>
                jorge.morelo@siempre.net.co
              </a>
              <a
                href="https://www.linkedin.com/in/morelodev/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 font-mono text-sm text-zinc-600 transition-colors hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400"
              >
                <span className="text-zinc-300 dark:text-zinc-700">→</span>
                linkedin.com/in/morelodev
              </a>
              <a
                href="https://github.com/Morelo-Dev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 font-mono text-sm text-zinc-600 transition-colors hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400"
              >
                <span className="text-zinc-300 dark:text-zinc-700">→</span>
                github.com/Morelo-Dev
              </a>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {status === 'success' ? (
              <div className="flex h-full flex-col items-center justify-center gap-4 rounded-xl border border-green-200 bg-green-50 p-8 text-center dark:border-green-900/50 dark:bg-green-950/30">
                <CheckCircle size={36} className="text-green-500" aria-hidden="true" />
                <p className="font-medium text-zinc-800 dark:text-zinc-200">{t('success')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
                {/* Nombre */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-xs font-medium text-zinc-700 dark:text-zinc-300"
                  >
                    {t('name')}{' '}
                    <span aria-hidden="true" className="text-red-500">
                      *
                    </span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    aria-required="true"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    placeholder="Jorge Morelo"
                    className={cn(
                      inputBase,
                      errors.name && 'border-red-400 focus:border-red-400 focus:ring-red-400/20'
                    )}
                    {...register('name')}
                  />
                  {errors.name && (
                    <p
                      id="name-error"
                      role="alert"
                      className="mt-1 flex items-center gap-1 text-xs text-red-500"
                    >
                      <AlertCircle size={11} aria-hidden="true" /> {t('name_required')}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-xs font-medium text-zinc-700 dark:text-zinc-300"
                  >
                    {t('email')}{' '}
                    <span aria-hidden="true" className="text-red-500">
                      *
                    </span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    placeholder="correo@ejemplo.com"
                    className={cn(
                      inputBase,
                      errors.email && 'border-red-400 focus:border-red-400 focus:ring-red-400/20'
                    )}
                    {...register('email')}
                  />
                  {errors.email && (
                    <p
                      id="email-error"
                      role="alert"
                      className="mt-1 flex items-center gap-1 text-xs text-red-500"
                    >
                      <AlertCircle size={11} aria-hidden="true" /> {t('email_invalid')}
                    </p>
                  )}
                </div>

                {/* Mensaje */}
                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-xs font-medium text-zinc-700 dark:text-zinc-300"
                  >
                    {t('message')}{' '}
                    <span aria-hidden="true" className="text-red-500">
                      *
                    </span>
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    aria-required="true"
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    placeholder={
                      locale === 'es'
                        ? 'Cuéntame sobre tu proyecto...'
                        : 'Tell me about your project...'
                    }
                    className={cn(
                      inputBase,
                      'resize-none',
                      errors.message && 'border-red-400 focus:border-red-400 focus:ring-red-400/20'
                    )}
                    {...register('message')}
                  />
                  {errors.message && (
                    <p
                      id="message-error"
                      role="alert"
                      className="mt-1 flex items-center gap-1 text-xs text-red-500"
                    >
                      <AlertCircle size={11} aria-hidden="true" /> {t('message_required')}
                    </p>
                  )}
                </div>

                {/* Honeypot — invisible para humanos, bots lo llenan */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-[9999px] opacity-0"
                  tabIndex={-1}
                >
                  <label htmlFor="_hp">Dejar vacío</label>
                  <input
                    id="_hp"
                    type="text"
                    autoComplete="off"
                    tabIndex={-1}
                    {...register('_hp')}
                  />
                </div>

                {status === 'rate-limit' && (
                  <p
                    role="alert"
                    className="flex items-center gap-2 rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-2.5 text-sm text-yellow-700 dark:border-yellow-900/50 dark:bg-yellow-950/30 dark:text-yellow-400"
                  >
                    <AlertCircle size={14} aria-hidden="true" />
                    {locale === 'es'
                      ? 'Demasiados intentos. Vuelve en una hora.'
                      : 'Too many attempts. Try again in an hour.'}
                  </p>
                )}

                {status === 'error' && (
                  <p
                    role="alert"
                    className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400"
                  >
                    <AlertCircle size={14} aria-hidden="true" /> {t('error')}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === 'loading' ? (
                    <>
                      <span
                        className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                        aria-hidden="true"
                      />
                      {t('sending')}
                    </>
                  ) : (
                    <>
                      <Send size={14} aria-hidden="true" />
                      {t('send')}
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
