import { Download, ExternalLink, Info, AlertTriangle, Play, ShoppingCart } from 'lucide-react'

export function VideoEmbed({ url, title = 'Video' }: { url: string; title?: string }) {
  const getEmbedUrl = (raw: string) => {
    const yt = raw.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/)
    if (yt) return `https://www.youtube.com/embed/${yt[1]}`
    const vimeo = raw.match(/vimeo\.com\/(\d+)/)
    if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`
    return raw
  }

  return (
    <div className="not-prose my-8">
      <div className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-2 border-b border-zinc-100 bg-zinc-50 px-4 py-2 dark:border-zinc-800 dark:bg-zinc-900">
          <Play size={14} className="text-blue-600 dark:text-blue-400" />
          <span className="font-mono text-xs text-zinc-500">{title}</span>
        </div>
        <div className="aspect-video w-full">
          <iframe
            src={getEmbedUrl(url)}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
      </div>
    </div>
  )
}

export function DownloadCard({
  url,
  label = 'Descargar',
  description,
  size,
}: {
  url: string
  label?: string
  description?: string
  size?: string
}) {
  return (
    <div className="not-prose my-6 flex items-center justify-between gap-4 rounded-xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-700 dark:bg-zinc-900">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
          <Download size={18} className="text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <p className="font-medium text-zinc-900 dark:text-zinc-100">{label}</p>
          {description && <p className="text-sm text-zinc-500">{description}</p>}
          {size && <p className="font-mono text-xs text-zinc-400">{size}</p>}
        </div>
      </div>
      <a
        href={url}
        download
        className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
      >
        <Download size={14} />
        Descargar
      </a>
    </div>
  )
}

export function OfferCard({
  title,
  description,
  price,
  priceLabel,
  ctaLabel = 'Obtener acceso',
  ctaUrl,
  features = [],
}: {
  title: string
  description?: string
  price?: number
  priceLabel?: string
  ctaLabel?: string
  ctaUrl: string
  features?: string[]
}) {
  return (
    <div className="not-prose my-8 overflow-hidden rounded-2xl border-2 border-blue-500 bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/30 dark:to-zinc-900">
      <div className="bg-blue-600 px-6 py-3">
        <p className="font-mono text-xs font-semibold tracking-wider text-blue-100 uppercase">
          Oferta
        </p>
      </div>
      <div className="p-6">
        <h3 className="mb-2 text-xl font-bold text-zinc-900 dark:text-zinc-50">{title}</h3>
        {description && <p className="mb-4 text-zinc-600 dark:text-zinc-400">{description}</p>}

        {features.length > 0 && (
          <ul className="mb-6 space-y-2">
            {features.map((f) => (
              <li
                key={f}
                className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300"
              >
                <span className="text-blue-600">✓</span> {f}
              </li>
            ))}
          </ul>
        )}

        <div className="flex items-center justify-between gap-4">
          <div>
            {priceLabel && (
              <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{priceLabel}</p>
            )}
            {price === 0 && <p className="text-2xl font-bold text-green-600">Gratis</p>}
          </div>
          <a
            href={ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/20"
          >
            <ShoppingCart size={16} />
            {ctaLabel}
          </a>
        </div>
      </div>
    </div>
  )
}

export function CallToAction({
  href,
  label,
  description,
  external = true,
}: {
  href: string
  label: string
  description?: string
  external?: boolean
}) {
  return (
    <div className="not-prose my-8 flex flex-col items-center gap-3 rounded-xl border border-zinc-200 bg-zinc-50 p-8 text-center dark:border-zinc-800 dark:bg-zinc-900">
      {description && <p className="text-sm text-zinc-500 dark:text-zinc-400">{description}</p>}
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-all hover:bg-blue-700"
      >
        {label}
        {external && <ExternalLink size={14} />}
      </a>
    </div>
  )
}

export function InfoBox({
  children,
  type = 'info',
}: {
  children: React.ReactNode
  type?: 'info' | 'warning'
}) {
  const styles = {
    info: 'border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950/30 dark:text-blue-200',
    warning:
      'border-yellow-200 bg-yellow-50 text-yellow-900 dark:border-yellow-800 dark:bg-yellow-950/30 dark:text-yellow-200',
  }
  const Icon = type === 'warning' ? AlertTriangle : Info
  const iconColor =
    type === 'warning' ? 'text-yellow-600 dark:text-yellow-400' : 'text-blue-600 dark:text-blue-400'

  return (
    <div className={`not-prose my-6 flex gap-3 rounded-xl border p-4 ${styles[type]}`}>
      <Icon size={18} className={`mt-0.5 shrink-0 ${iconColor}`} />
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  )
}

export const mdxComponents = {
  VideoEmbed,
  DownloadCard,
  OfferCard,
  CallToAction,
  InfoBox,
}
