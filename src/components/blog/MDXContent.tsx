'use client'

interface Props {
  source: string
}

export default function MDXContent({ source }: Props) {
  const lines = source.split('\n')

  return (
    <div>
      {lines.map((line, i) => {
        if (line.startsWith('## ')) return <h2 key={i}>{line.slice(3)}</h2>
        if (line.startsWith('# ')) return <h1 key={i}>{line.slice(2)}</h1>
        if (line.startsWith('> '))
          return (
            <blockquote key={i}>
              <p>{line.slice(2)}</p>
            </blockquote>
          )
        if (line.trim() === '') return <br key={i} />
        return <p key={i}>{line}</p>
      })}
    </div>
  )
}
