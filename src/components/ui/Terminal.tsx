'use client'

import { useEffect, useState, useRef } from 'react'

interface Line {
  type: 'command' | 'output' | 'blank'
  content: string
}

const SCRIPT: Line[] = [
  { type: 'command', content: 'whoami' },
  { type: 'output', content: '→ Jorge Morelo · Software Developer' },
  { type: 'blank', content: '' },
  { type: 'command', content: 'cat stack.json' },
  { type: 'output', content: '{' },
  { type: 'output', content: '  "frontend":  ["React", "Next.js", "TypeScript"],' },
  { type: 'output', content: '  "backend":   ["Node.js", "NestJS", "PostgreSQL"],' },
  { type: 'output', content: '  "tools":     ["Git", "Docker", "Vercel"]' },
  { type: 'output', content: '}' },
  { type: 'blank', content: '' },
  { type: 'command', content: 'git log --oneline -3' },
  { type: 'output', content: 'a3f1c2e feat: ship before coffee cools ☕' },
  { type: 'output', content: 'b8d04a1 fix: remove console.log (finally)' },
  { type: 'output', content: 'c91e3f7 chore: fix what I broke yesterday' },
  { type: 'blank', content: '' },
  { type: 'command', content: 'echo $STATUS' },
  { type: 'output', content: '→ Disponible para proyectos 🟢' },
]

const TYPING_SPEED = 38
const OUTPUT_DELAY = 60
const LINE_PAUSE = 320

export default function Terminal() {
  const [rendered, setRendered] = useState<{ line: Line; typed: string; done: boolean }[]>([])
  const [cursorVisible, setCursorVisible] = useState(true)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const blink = setInterval(() => setCursorVisible((v) => !v), 530)
    return () => clearInterval(blink)
  }, [])

  useEffect(() => {
    let cancelled = false

    async function run() {
      for (let i = 0; i < SCRIPT.length; i++) {
        if (cancelled) return
        const line = SCRIPT[i]

        if (line.type === 'blank') {
          await delay(OUTPUT_DELAY)
          if (cancelled) return
          setRendered((prev) => [...prev, { line, typed: '', done: true }])
          continue
        }

        if (line.type === 'output') {
          await delay(OUTPUT_DELAY)
          if (cancelled) return
          setRendered((prev) => [...prev, { line, typed: line.content, done: true }])
          continue
        }

        await delay(LINE_PAUSE)
        if (cancelled) return

        setRendered((prev) => [...prev, { line, typed: '', done: false }])

        for (let c = 1; c <= line.content.length; c++) {
          if (cancelled) return
          await delay(TYPING_SPEED)
          setRendered((prev) => {
            const next = [...prev]
            next[next.length - 1] = { line, typed: line.content.slice(0, c), done: false }
            return next
          })
        }

        setRendered((prev) => {
          const next = [...prev]
          next[next.length - 1] = { line, typed: line.content, done: true }
          return next
        })
      }
    }

    run()
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [rendered])

  const isFinished = rendered.length === SCRIPT.length && rendered[rendered.length - 1]?.done

  return (
    <div className="w-full overflow-hidden rounded-xl border border-zinc-200 bg-zinc-950 shadow-2xl shadow-black/20 dark:border-zinc-800">
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-900 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-500" />
        <span className="h-3 w-3 rounded-full bg-yellow-500" />
        <span className="h-3 w-3 rounded-full bg-green-500" />
        <span className="ml-2 font-mono text-xs text-zinc-500">jorge@portfolio:~</span>
      </div>

      {/* Content */}
      <div className="h-64 overflow-y-auto px-4 py-4 font-mono text-sm leading-relaxed">
        {rendered.map((entry, i) => {
          if (entry.line.type === 'blank') return <div key={i} className="h-2" />

          if (entry.line.type === 'command') {
            return (
              <div key={i} className="flex">
                <span className="mr-2 text-blue-400 select-none">$</span>
                <span className="text-zinc-100">{entry.typed}</span>
                {!entry.done && (
                  <span
                    className={`ml-px inline-block h-4 w-2 bg-blue-400 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}
                  />
                )}
              </div>
            )
          }

          return (
            <div key={i} className="text-zinc-400">
              {entry.typed}
            </div>
          )
        })}

        {isFinished && (
          <div className="flex">
            <span className="mr-2 text-blue-400 select-none">$</span>
            <span
              className={`inline-block h-4 w-2 bg-blue-400 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}
            />
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  )
}

function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms))
}
