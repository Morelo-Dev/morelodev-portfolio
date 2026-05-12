export interface ExperienceItem {
  id: string
  company: string
  role: string
  roleEn: string
  period: string
  location: string
  description: string
  descriptionEn: string
  tech: string[]
  current?: boolean
}

export const experience: ExperienceItem[] = [
  {
    id: 'siempre',
    company: 'Siempre S.A.S',
    role: 'Desarrollador de Software',
    roleEn: 'Software Developer',
    period: '2023 — Presente',
    location: 'Colombia · Remoto',
    description:
      'Desarrollo y mantenimiento de aplicaciones web full-stack. Implementación de APIs REST, optimización de rendimiento y colaboración en equipo ágil.',
    descriptionEn:
      'Full-stack web application development and maintenance. REST API implementation, performance optimization, and agile team collaboration.',
    tech: ['React', 'Node.js', 'TypeScript', 'PostgreSQL'],
    current: true,
  },
  {
    id: 'empresa2',
    company: 'Empresa Anterior',
    role: 'Desarrollador Frontend',
    roleEn: 'Frontend Developer',
    period: '2022 — 2023',
    location: 'Colombia',
    description:
      'Construcción de interfaces de usuario modernas y accesibles. Integración con APIs externas y mejora de la experiencia de usuario.',
    descriptionEn:
      'Building modern, accessible user interfaces. Integration with external APIs and improving user experience.',
    tech: ['React', 'JavaScript', 'Tailwind CSS', 'REST APIs'],
    current: false,
  },
  {
    id: 'inicio',
    company: 'Freelance / Proyectos propios',
    role: 'Desarrollador Web',
    roleEn: 'Web Developer',
    period: '2021 — 2022',
    location: 'Colombia · Remoto',
    description:
      'Desarrollo de sitios y aplicaciones web para clientes. Diseño e implementación de soluciones a medida con enfoque en calidad y entrega.',
    descriptionEn:
      'Web sites and application development for clients. Design and implementation of custom solutions focused on quality and delivery.',
    tech: ['HTML', 'CSS', 'JavaScript', 'React', 'WordPress'],
    current: false,
  },
]
