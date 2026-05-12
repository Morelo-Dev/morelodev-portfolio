import type { Skill } from '@/types'

export const skills: Skill[] = [
  // Frontend
  { name: 'React', category: 'frontend', level: 5, icon: 'react' },
  { name: 'Next.js', category: 'frontend', level: 5, icon: 'nextjs' },
  { name: 'TypeScript', category: 'frontend', level: 4, icon: 'typescript' },
  { name: 'JavaScript', category: 'frontend', level: 5, icon: 'javascript' },
  { name: 'Tailwind CSS', category: 'frontend', level: 5, icon: 'tailwind' },
  { name: 'HTML5', category: 'frontend', level: 5, icon: 'html5' },
  { name: 'CSS3', category: 'frontend', level: 4, icon: 'css3' },

  // Backend
  { name: 'Node.js', category: 'backend', level: 4, icon: 'nodejs' },
  { name: 'Express', category: 'backend', level: 4, icon: 'express' },
  { name: 'Python', category: 'backend', level: 3, icon: 'python' },
  { name: 'PostgreSQL', category: 'backend', level: 4, icon: 'postgresql' },
  { name: 'MongoDB', category: 'backend', level: 3, icon: 'mongodb' },
  { name: 'Redis', category: 'backend', level: 3, icon: 'redis' },

  // DevOps
  { name: 'Docker', category: 'devops', level: 3, icon: 'docker' },
  { name: 'Git', category: 'devops', level: 5, icon: 'git' },
  { name: 'GitHub Actions', category: 'devops', level: 4, icon: 'github' },
  { name: 'Vercel', category: 'devops', level: 4, icon: 'vercel' },
  { name: 'Linux', category: 'devops', level: 3, icon: 'linux' },

  // Tools
  { name: 'VS Code', category: 'tools', level: 5, icon: 'vscode' },
  { name: 'Figma', category: 'tools', level: 3, icon: 'figma' },
  { name: 'Jest', category: 'tools', level: 4, icon: 'jest' },
  { name: 'Vite', category: 'tools', level: 4, icon: 'vite' },
]

export const skillsByCategory = {
  frontend: skills.filter((s) => s.category === 'frontend'),
  backend: skills.filter((s) => s.category === 'backend'),
  devops: skills.filter((s) => s.category === 'devops'),
  tools: skills.filter((s) => s.category === 'tools'),
}

export const categoryLabels: Record<string, { es: string; en: string }> = {
  frontend: { es: 'Frontend', en: 'Frontend' },
  backend: { es: 'Backend & DB', en: 'Backend & DB' },
  devops: { es: 'DevOps & Cloud', en: 'DevOps & Cloud' },
  tools: { es: 'Herramientas', en: 'Tools' },
}
