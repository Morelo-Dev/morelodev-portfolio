'use client'

import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { useTheme } from 'next-themes'
import { usePathname, useRouter } from 'next/navigation'
import { Moon, Sun, Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

const NAV_LINKS = ['projects', 'skills', 'blog', 'contact'] as const

export default function Header() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => {
    setMounted(true)
  }, [])

  function toggleLocale() {
    const next = locale === 'es' ? 'en' : 'es'
    const segments = pathname.split('/')
    segments[1] = next
    router.push(segments.join('/'))
  }

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-all duration-300',
        scrolled
          ? 'border-b border-zinc-200 bg-white/90 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/90'
          : 'bg-transparent'
      )}
    >
      <nav
        className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4"
        aria-label="Navegación principal"
      >
        {/* Logo */}
        <Link
          href={`/${locale}`}
          className="font-mono text-sm font-semibold tracking-tight text-zinc-900 transition-colors hover:text-blue-600 dark:text-zinc-100 dark:hover:text-blue-400"
        >
          jorge<span className="text-blue-600 dark:text-blue-400">.dev</span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-6 md:flex" role="list">
          {NAV_LINKS.map((key) => (
            <li key={key}>
              <Link
                href={`/${locale}/${key}`}
                className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              >
                {t(key)}
              </Link>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleLocale}
            aria-label={t('toggleLanguage')}
            className="rounded-md px-2 py-1 font-mono text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
          >
            {locale === 'es' ? 'EN' : 'ES'}
          </button>

          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label={t('toggleTheme')}
            className="rounded-md p-2 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
          >
            {mounted && theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Mobile menu button */}
          <button
            className="rounded-md p-2 text-zinc-600 transition-colors hover:bg-zinc-100 md:hidden dark:text-zinc-400 dark:hover:bg-zinc-800"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? t('close_menu') : t('open_menu')}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-zinc-200 bg-white/95 backdrop-blur-md md:hidden dark:border-zinc-800 dark:bg-zinc-950/95"
          >
            <ul className="flex flex-col px-6 py-4" role="list">
              {NAV_LINKS.map((key) => (
                <li key={key}>
                  <Link
                    href={`/${locale}/${key}`}
                    onClick={() => setMenuOpen(false)}
                    className="block py-3 text-sm font-medium text-zinc-700 transition-colors hover:text-blue-600 dark:text-zinc-300 dark:hover:text-blue-400"
                  >
                    {t(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
