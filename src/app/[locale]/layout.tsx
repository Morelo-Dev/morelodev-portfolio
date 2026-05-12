import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { ThemeProvider } from 'next-themes'
import { notFound } from 'next/navigation'
import { hasLocale } from 'next-intl'
import { locales } from '@/lib/i18n'
import '../globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Jorge Morelo — Desarrollador de Software',
    template: '%s | Jorge Morelo',
  },
  description:
    'Portafolio de Jorge Andrés Morelo Hinestroza, desarrollador de software mid-level especializado en aplicaciones web modernas.',
  authors: [{ name: 'Jorge Andrés Morelo Hinestroza' }],
  creator: 'Jorge Andrés Morelo Hinestroza',
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    alternateLocale: 'en_US',
    siteName: 'Jorge Morelo',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@morelodev',
  },
  robots: {
    index: true,
    follow: true,
  },
}

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  if (!hasLocale(locales, locale)) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-white text-zinc-900 antialiased dark:bg-zinc-950 dark:text-zinc-50">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-blue-600 focus:px-4 focus:py-2 focus:text-white focus:outline-none"
            >
              {locale === 'es' ? 'Ir al contenido principal' : 'Skip to main content'}
            </a>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
