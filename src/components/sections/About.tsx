'use client'

import { useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import { Music, Code2, MapPin, Gamepad2, Car, Plane, Dumbbell } from 'lucide-react'

const INTERESTS = [
  { icon: Code2, labelEs: 'Open source', labelEn: 'Open source' },
  { icon: Gamepad2, labelEs: 'FPS & Strategy', labelEn: 'FPS & Strategy' },
  { icon: Dumbbell, labelEs: 'Baloncesto', labelEn: 'Basketball' },
  { icon: Car, labelEs: 'Conducir', labelEn: 'Driving' },
  { icon: Plane, labelEs: 'Viajes & deportes extremos', labelEn: 'Travel & extreme sports' },
  { icon: Music, labelEs: 'Vallenato', labelEn: 'Vallenato' },
  { icon: MapPin, labelEs: 'Colombia 🇨🇴', labelEn: 'Colombia 🇨🇴' },
]

const FUN_FACTS = {
  es: [
    'El diálogo es la base de toda buena relación — personal, laboral o técnica',
    'Prefiero dark mode en todo, incluyendo mi cuarto',
    'Juego shooters y estrategia: mismo músculo que debuggear bajo presión',
    'Mi código funciona mejor con vallenato de fondo',
    'Creo que el CSS no es tan difícil (y lo defiendo con argumentos)',
  ],
  en: [
    'Dialogue is the foundation of every good relationship — personal, work, or technical',
    'I prefer dark mode everywhere, including my room',
    'I play shooters and strategy games: same muscle as debugging under pressure',
    'My code works better with vallenato in the background',
    'I think CSS is not that hard (and I will argue about it)',
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
        {/* Bio + intereses */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-5"
        >
          <p className="leading-relaxed text-zinc-600 dark:text-zinc-400">
            {locale === 'es'
              ? 'Soy Jorge, desarrollador de software de Colombia. Me apasiona construir productos que se sientan bien de usar — donde el código limpio y el diseño cuidado van de la mano.'
              : "I'm Jorge, a software developer from Colombia. I'm passionate about building products that feel good to use — where clean code and thoughtful design go hand in hand."}
          </p>
          <p className="leading-relaxed text-zinc-600 dark:text-zinc-400">
            {locale === 'es'
              ? 'Fuera del editor me encontrarás en una cancha de baloncesto, planeando el próximo viaje, detrás del volante o en medio de una buena conversación. Creo que el diálogo es la base de todo — de las relaciones, los equipos y los buenos productos.'
              : "Outside the editor you'll find me on a basketball court, planning the next trip, behind the wheel, or in the middle of a good conversation. I believe dialogue is the foundation of everything — relationships, teams, and great products."}
          </p>

          {/* Chips */}
          <div className="flex flex-wrap gap-2 pt-1">
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

          {/* Spotify embed */}
          <div className="pt-2">
            <p className="mb-2 font-mono text-xs text-zinc-400">
              {locale === 'es' ? '// canción favorita' : '// favorite song'}
            </p>
            <iframe
              src="https://open.spotify.com/embed/track/20nzlXuoe47vMKRSjSRZXc?utm_source=generator&theme=0"
              width="100%"
              height="80"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="rounded-xl"
              title="En Señal de Victoria — Iván Villazón"
            />
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
            <p className="mb-4 font-mono text-xs text-zinc-400">{'// fun_facts.json'}</p>
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
