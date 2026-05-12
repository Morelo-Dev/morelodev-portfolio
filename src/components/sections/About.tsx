'use client'

import { useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import { Music, Coffee, Code2, MapPin } from 'lucide-react'

const INTERESTS = [
  { icon: Code2, labelEs: 'Open source', labelEn: 'Open source' },
  {
    icon: Music,
    labelEs: 'Música — Tu canción favorita aquí',
    labelEn: 'Music — Your fav song here',
  },
  { icon: Coffee, labelEs: 'Café obligatorio', labelEn: 'Coffee mandatory' },
  { icon: MapPin, labelEs: 'Colombia 🇨🇴', labelEn: 'Colombia 🇨🇴' },
]

const FUN_FACTS = {
  es: [
    'Escribo mejor código después de las 10pm',
    'Prefiero dark mode en todo, incluyendo mi cuarto',
    'Mi primer "Hello World" fue en Python',
    'Creo que el CSS no es tan difícil (y lo defiendo)',
  ],
  en: [
    'I write better code after 10pm',
    'I prefer dark mode everywhere, including my room',
    'My first "Hello World" was in Python',
    'I think CSS is not that hard (and I will die on that hill)',
  ],
}

export default function About() {
  const locale = useLocale()
  const facts = FUN_FACTS[locale as 'es' | 'en'] ?? FUN_FACTS.es

  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <p className="mb-2 font-mono text-sm text-blue-600 dark:text-blue-400">
          {'// '}
          {locale === 'es' ? 'Más allá del código' : 'Beyond the code'}
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          {locale === 'es' ? 'Sobre mí' : 'About me'}
        </h2>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <p className="leading-relaxed text-zinc-600 dark:text-zinc-400">
            {locale === 'es'
              ? 'Soy Jorge, desarrollador de software de Colombia. Me apasiona construir productos que se sientan bien de usar — donde el código limpio y el diseño cuidado van de la mano.'
              : "I'm Jorge, a software developer from Colombia. I'm passionate about building products that feel good to use — where clean code and thoughtful design go hand in hand."}
          </p>
          <p className="leading-relaxed text-zinc-600 dark:text-zinc-400">
            {locale === 'es'
              ? 'Cuando no estoy frente al editor, probablemente estoy escuchando música, tomando café o explorando algún proyecto nuevo que me parece interesante.'
              : "When I'm not in front of the editor, I'm probably listening to music, drinking coffee, or exploring some new project that caught my eye."}
          </p>

          {/* Interests */}
          <div className="flex flex-wrap gap-2 pt-2">
            {INTERESTS.map(({ icon: Icon, labelEs, labelEn }) => (
              <span
                key={labelEs}
                className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400"
              >
                <Icon size={13} className="text-blue-600 dark:text-blue-400" />
                {locale === 'es' ? labelEs : labelEn}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Fun facts */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="mb-4 font-mono text-xs text-zinc-400">
              {locale === 'es' ? '// fun_facts.json' : '// fun_facts.json'}
            </p>
            <ul className="space-y-3">
              {facts.map((fact, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                  className="flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-400"
                >
                  <span className="mt-0.5 font-mono text-blue-600 select-none dark:text-blue-400">
                    →
                  </span>
                  {fact}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
