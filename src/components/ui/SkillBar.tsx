'use client'

import { motion } from 'framer-motion'
import type { Skill } from '@/types'

interface SkillBarProps {
  skill: Skill
  levelLabel: string
  delay?: number
}

export default function SkillBar({ skill, levelLabel, delay = 0 }: SkillBarProps) {
  const pct = (skill.level / 5) * 100

  return (
    <li>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{skill.name}</span>
        <span className="font-mono text-xs text-zinc-400 dark:text-zinc-500">{levelLabel}</span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={skill.level}
        aria-valuemin={0}
        aria-valuemax={5}
        aria-label={`${skill.name}: ${levelLabel}`}
        className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700"
      >
        <motion.div
          className="h-full rounded-full bg-blue-600 dark:bg-blue-500"
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay, ease: 'easeOut' }}
        />
      </div>
    </li>
  )
}
