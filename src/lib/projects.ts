import type { Project } from '@/types'

export const projects: Project[] = [
  {
    id: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    description:
      'Plataforma de comercio electrónico full-stack con carrito de compras, pagos con Stripe, panel de administración y gestión de inventario en tiempo real.',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Stripe', 'Tailwind CSS'],
    liveUrl: 'https://demo.example.com',
    githubUrl: 'https://github.com/Morelo-Dev',
    image: '/projects/ecommerce.png',
    featured: true,
  },
  {
    id: 'task-manager',
    title: 'Task Manager App',
    description:
      'Aplicación de gestión de tareas con drag & drop, colaboración en tiempo real vía WebSockets, notificaciones push y sincronización offline.',
    tags: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'PWA'],
    liveUrl: 'https://tasks.example.com',
    githubUrl: 'https://github.com/Morelo-Dev',
    image: '/projects/tasks.png',
    featured: true,
  },
  {
    id: 'analytics-dashboard',
    title: 'Analytics Dashboard',
    description:
      'Dashboard de analíticas con visualizaciones interactivas, filtros dinámicos, exportación a CSV/PDF y soporte para múltiples fuentes de datos.',
    tags: ['React', 'D3.js', 'Python', 'FastAPI', 'Redis'],
    githubUrl: 'https://github.com/Morelo-Dev',
    image: '/projects/dashboard.png',
    featured: true,
  },
  {
    id: 'api-rest',
    title: 'REST API Framework',
    description:
      'Framework REST API con autenticación JWT, rate limiting, documentación automática con OpenAPI/Swagger y cobertura de tests al 95%.',
    tags: ['Node.js', 'Express', 'PostgreSQL', 'Docker', 'Jest'],
    githubUrl: 'https://github.com/Morelo-Dev',
    image: '/projects/api.png',
    featured: false,
  },
]

export const featuredProjects = projects.filter((p) => p.featured)
