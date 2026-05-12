import { useTranslations } from 'next-intl'

export default function HomePage() {
  const t = useTranslations('hero')

  return (
    <main id="main-content" className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold">
        {t('greeting')} <span className="text-blue-600">{t('name')}</span>
      </h1>
      <p className="mt-4 text-xl text-zinc-600 dark:text-zinc-400">{t('title')}</p>
      <p className="mt-2 max-w-xl text-center text-zinc-500 dark:text-zinc-500">{t('subtitle')}</p>
    </main>
  )
}
