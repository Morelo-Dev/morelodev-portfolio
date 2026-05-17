import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { ThemeProvider } from 'next-themes'
import { notFound } from 'next/navigation'
import { hasLocale } from 'next-intl'
import { locales } from '@/lib/i18n'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import JsonLd from '@/components/JsonLd'
import FloatingChat from '@/components/FloatingChat'
import '../globals.css'

const BASE = 'https://morelodev.com'

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isEs = locale === 'es'

  const title = isEs
    ? 'Jorge Morelo | Desarrollador Next.js & Frontend Engineer — Colombia'
    : 'Jorge Morelo | Next.js Developer & Frontend Engineer — Colombia'
  const description = isEs
    ? 'Ingeniero Frontend y Desarrollador Full-Stack en Colombia especializado en Next.js, React y TypeScript. Creador de plataformas SaaS contables y e-commerce con Stripe. Disponible para proyectos freelance y posiciones remotas.'
    : 'Frontend Engineer and Full-Stack Developer in Colombia specialized in Next.js, React and TypeScript. Creator of SaaS platforms and e-commerce with Stripe integration. Available for freelance projects and remote positions.'
  const keywords = isEs
    ? [
        'Desarrollador Next.js Colombia',
        'Ingeniero Frontend Colombia',
        'Desarrollador Full-Stack Colombia',
        'Jorge Morelo desarrollador',
        'Next.js React TypeScript',
        'Desarrollo web Colombia',
        'Freelance frontend Colombia',
        'SaaS desarrollo Colombia',
        'Integración Stripe Colombia',
        'Portafolio desarrollador web',
      ]
    : [
        'Next.js Developer Colombia',
        'Frontend Engineer Colombia',
        'Full-Stack Developer Colombia',
        'Jorge Morelo developer',
        'Next.js React TypeScript',
        'Web development Colombia',
        'Freelance frontend developer',
        'SaaS development',
        'Stripe integration developer',
        'Web developer portfolio',
      ]

  return {
    title: {
      default: title,
      template: `%s | Jorge Morelo`,
    },
    description,
    keywords,
    authors: [{ name: 'Jorge Andrés Morelo Hinestroza' }],
    creator: 'Jorge Andrés Morelo Hinestroza',
    metadataBase: new URL(BASE),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        es: '/es',
        en: '/en',
      },
    },
    openGraph: {
      type: 'website',
      url: `${BASE}/${locale}`,
      locale: isEs ? 'es_CO' : 'en_US',
      alternateLocale: isEs ? 'en_US' : 'es_CO',
      siteName: 'Jorge Morelo',
      title,
      description,
      images: [
        {
          url: `${BASE}/${locale}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: isEs
            ? 'Jorge Morelo — Desarrollador Next.js & Frontend Engineer, Colombia'
            : 'Jorge Morelo — Next.js Developer & Frontend Engineer, Colombia',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@morelodev',
      title,
      description,
      images: [`${BASE}/${locale}/opengraph-image`],
    },
    robots: {
      index: true,
      follow: true,
    },
  }
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
        <JsonLd />
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
            <Header />
            {children}
            <Footer />
            <FloatingChat locale={locale} />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
