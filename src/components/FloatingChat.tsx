'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send } from 'lucide-react'
import { getChatResponse, type Locale } from '@/lib/chatbot'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

interface FloatingChatProps {
  locale: string
}

const TYPING_SPEED = 12 // ms por carácter

export default function FloatingChat({ locale }: FloatingChatProps) {
  const t = useTranslations('chat')
  const lang = (locale === 'en' ? 'en' : 'es') as Locale

  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { id: 'greeting', role: 'assistant', content: t('greeting') },
  ])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const typingRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Limpia el timeout al desmontar
  useEffect(
    () => () => {
      if (typingRef.current) clearTimeout(typingRef.current)
    },
    []
  )

  const typeResponse = useCallback((assistantId: string, fullText: string) => {
    setIsTyping(true)
    let i = 0

    const tick = () => {
      i++
      setMessages((prev) =>
        prev.map((m) => (m.id === assistantId ? { ...m, content: fullText.slice(0, i) } : m))
      )
      if (i < fullText.length) {
        typingRef.current = setTimeout(tick, TYPING_SPEED)
      } else {
        setIsTyping(false)
      }
    }

    typingRef.current = setTimeout(tick, TYPING_SPEED)
  }, [])

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      const userText = input.trim()
      if (!userText || isTyping) return

      const userMsg: Message = { id: Date.now().toString(), role: 'user', content: userText }
      const assistantId = (Date.now() + 1).toString()

      setMessages((prev) => [...prev, userMsg, { id: assistantId, role: 'assistant', content: '' }])
      setInput('')

      // Pequeño delay antes de "escribir" la respuesta
      setTimeout(() => {
        const response = getChatResponse(userText, lang)
        typeResponse(assistantId, response)
      }, 300)
    },
    [input, isTyping, lang, typeResponse]
  )

  return (
    <div className="fixed right-6 bottom-6 z-50 flex flex-col items-end gap-3">
      {/* Panel de chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 16 }}
            transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex w-[340px] flex-col overflow-hidden rounded-2xl border border-zinc-700/60 bg-zinc-900 shadow-2xl shadow-black/40"
            style={{ height: '480px' }}
          >
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-zinc-800 px-4 py-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600/20">
                  <MessageCircle size={14} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-sm leading-none font-medium text-zinc-100">{t('title')}</p>
                  <p className="mt-0.5 text-[10px] text-zinc-500">
                    {isTyping
                      ? t('thinking')
                      : locale === 'es'
                        ? 'Portafolio de Jorge Morelo'
                        : "Jorge Morelo's Portfolio"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Cerrar chat"
                className="rounded-md p-1 text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-200"
              >
                <X size={16} />
              </button>
            </div>

            {/* Mensajes */}
            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-zinc-800 text-zinc-200'
                    }`}
                  >
                    {msg.content || (
                      <span className="flex items-center gap-1">
                        {[0, 1, 2].map((i) => (
                          <motion.span
                            key={i}
                            className="inline-block h-1.5 w-1.5 rounded-full bg-zinc-500"
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                          />
                        ))}
                      </span>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="shrink-0 border-t border-zinc-800 p-3">
              <div className="flex items-center gap-2 rounded-xl bg-zinc-800 px-3 py-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t('placeholder')}
                  disabled={isTyping}
                  className="flex-1 bg-transparent text-sm text-zinc-100 placeholder-zinc-500 outline-none disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isTyping || !input.trim()}
                  aria-label={t('send')}
                  className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white transition-all hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Send size={13} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón flotante */}
      <div className="relative">
        {/* Anillos de pulsación — solo cuando el chat está cerrado */}
        {!isOpen && (
          <>
            <motion.span
              className="absolute inset-0 rounded-full bg-blue-500/30"
              animate={{ scale: [1, 1.7], opacity: [0.5, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
            />
            <motion.span
              className="absolute inset-0 rounded-full bg-blue-500/20"
              animate={{ scale: [1, 2.2], opacity: [0.4, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut', delay: 0.4 }}
            />
          </>
        )}
        <motion.button
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? 'Cerrar chat' : t('title')}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.93 }}
          className="relative flex h-14 w-14 items-center justify-center rounded-full border border-zinc-700/60 bg-zinc-900 text-blue-400 shadow-lg shadow-black/30 transition-colors hover:bg-zinc-800"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.15 }}
              >
                <X size={22} />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.15 }}
              >
                <MessageCircle size={22} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  )
}
