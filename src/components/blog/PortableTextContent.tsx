'use client'

import { PortableText } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'

const components = {
  types: {
    image: ({ value }: { value: { asset?: { url?: string }; alt?: string; caption?: string } }) => (
      <figure className="my-8">
        <img
          src={value.asset?.url ?? ''}
          alt={value.alt ?? ''}
          className="w-full rounded-xl object-cover"
        />
        {value.caption && (
          <figcaption className="mt-2 text-center font-mono text-xs text-zinc-400">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
    code: ({ value }: { value: { code?: string; language?: string; filename?: string } }) => (
      <div className="my-6">
        {value.filename && (
          <div className="rounded-t-lg bg-zinc-800 px-4 py-2 font-mono text-xs text-zinc-400">
            {value.filename}
          </div>
        )}
        <pre
          className={`overflow-x-auto bg-zinc-950 p-4 text-sm text-zinc-100 ${value.filename ? 'rounded-b-lg' : 'rounded-lg'}`}
        >
          <code>{value.code}</code>
        </pre>
      </div>
    ),
  },
  marks: {
    link: ({
      children,
      value,
    }: {
      children: React.ReactNode
      value?: { href?: string; blank?: boolean }
    }) => (
      <a
        href={value?.href}
        target={value?.blank !== false ? '_blank' : undefined}
        rel="noopener noreferrer"
        className="text-blue-600 underline underline-offset-2 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
      >
        {children}
      </a>
    ),
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-semibold text-zinc-900 dark:text-zinc-50">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="text-zinc-700 italic dark:text-zinc-300">{children}</em>
    ),
    code: ({ children }: { children?: React.ReactNode }) => (
      <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-sm text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
        {children}
      </code>
    ),
  },
  block: {
    h1: ({ children }: { children?: React.ReactNode }) => (
      <h1 className="mt-10 mb-4 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        {children}
      </h1>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="mt-8 mb-3 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="mt-6 mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
        {children}
      </h3>
    ),
    h4: ({ children }: { children?: React.ReactNode }) => (
      <h4 className="mt-4 mb-2 text-lg font-semibold text-zinc-800 dark:text-zinc-100">
        {children}
      </h4>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="mb-4 leading-7 text-zinc-700 dark:text-zinc-300">{children}</p>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="my-6 border-l-4 border-blue-500 pl-5 text-zinc-600 italic dark:text-zinc-400">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="mb-4 ml-6 list-disc space-y-1.5 text-zinc-700 dark:text-zinc-300">
        {children}
      </ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="mb-4 ml-6 list-decimal space-y-1.5 text-zinc-700 dark:text-zinc-300">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <li className="leading-7">{children}</li>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <li className="leading-7">{children}</li>
    ),
  },
}

export default function PortableTextContent({ body }: { body: PortableTextBlock[] }) {
  return (
    <div className="max-w-none">
      <PortableText value={body} components={components} />
    </div>
  )
}
