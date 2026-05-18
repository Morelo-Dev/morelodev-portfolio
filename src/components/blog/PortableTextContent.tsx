'use client'

import { PortableText } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'

const components = {
  types: {
    image: ({ value }: { value: { asset?: { url?: string }; alt?: string } }) => (
      <div className="my-6 overflow-hidden rounded-xl">
        <img src={value.asset?.url ?? ''} alt={value.alt ?? ''} className="w-full object-cover" />
      </div>
    ),
    code: ({ value }: { value: { code?: string; language?: string } }) => (
      <pre className="my-4 overflow-x-auto rounded-lg bg-zinc-950 p-4">
        <code className={`language-${value.language ?? 'text'} text-sm text-zinc-100`}>
          {value.code}
        </code>
      </pre>
    ),
  },
  marks: {
    link: ({ children, value }: { children: React.ReactNode; value?: { href?: string } }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline dark:text-blue-400"
      >
        {children}
      </a>
    ),
  },
}

export default function PortableTextContent({ body }: { body: PortableTextBlock[] }) {
  return (
    <article className="prose prose-zinc dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-a:text-blue-600 prose-code:rounded prose-code:bg-zinc-100 prose-code:px-1 prose-code:py-0.5 prose-code:font-mono prose-code:text-sm dark:prose-a:text-blue-400 dark:prose-code:bg-zinc-800 prose-pre:bg-zinc-950 prose-pre:p-0 max-w-none">
      <PortableText value={body} components={components} />
    </article>
  )
}
