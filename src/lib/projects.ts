import type { Project } from '@/types'

export const projects: Project[] = [
  {
    id: 'jmfenix',
    title: 'JM Fénix — SaaS Contable',
    description:
      'Plataforma SaaS para contadores: gestión de clientes y empresas, obligaciones tributarias, calendarios DIAN, control de roles, auditoría y notificaciones automáticas. Diseño modular feature-based con glassmorphism y design system propio.',
    tags: [
      'React',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'Zustand',
      'shadcn/ui',
      'React Hook Form',
    ],
    liveUrl: 'https://jmfenix.vercel.app',
    image: '/projects/jmfenix.png',
    featured: true,
    accent: '#2563eb',
    details: {
      fullDescription:
        'JM Fénix es una plataforma SaaS diseñada para contadores y firmas contables en Colombia. Centraliza la gestión de clientes (personas naturales y jurídicas), empresas asociadas, obligaciones tributarias ante la DIAN, calendarios fiscales y control de acceso por roles. Construida con arquitectura feature-based modular, design system propio con glassmorphism, y un flujo de trabajo optimizado para el día a día del contador.',
      features: [
        'Gestión de clientes y empresas con perfil 360°',
        'Obligaciones tributarias y calendarios DIAN integrados',
        'Control de roles y permisos granular',
        'Notificaciones automáticas por email',
        'Auditoría completa de acciones',
        'Design system con glassmorphism y tokens CSS',
      ],
      year: 2024,
      status: 'in-progress',
      translations: {
        en: {
          fullDescription:
            "JM Fénix is a SaaS platform designed for accountants and accounting firms in Colombia. It centralizes client management (individuals and legal entities), associated companies, DIAN tax obligations, fiscal calendars, and role-based access control. Built with a modular feature-based architecture, a custom design system with glassmorphism, and a workflow optimized for the accountant's daily routine.",
          features: [
            '360° client and company profile management',
            'Integrated DIAN tax obligations and fiscal calendars',
            'Granular role and permission control',
            'Automated email notifications',
            'Complete action audit trail',
            'Glassmorphism design system with CSS tokens',
          ],
        },
      },
    },
  },
  {
    id: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    description:
      'Plataforma de comercio electrónico full-stack con carrito de compras, pagos con Stripe, panel de administración y gestión de inventario en tiempo real.',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Stripe', 'Tailwind CSS'],
    githubUrl: 'https://github.com/Morelo-Dev',
    image: '/projects/ecommerce.png',
    featured: true,
    accent: '#7c3aed',
    details: {
      fullDescription:
        'Plataforma de e-commerce completa construida con Next.js y PostgreSQL. Incluye catálogo de productos con filtros dinámicos, carrito persistente, flujo de checkout con integración Stripe, panel de administración para gestionar pedidos e inventario, y autenticación de usuarios con NextAuth.',
      features: [
        'Catálogo con búsqueda y filtros dinámicos',
        'Carrito de compras persistente con localStorage',
        'Pagos seguros con Stripe y webhooks',
        'Panel de administración para pedidos e inventario',
        'Autenticación de usuarios con sesiones seguras',
        'Optimización de imágenes y SSR para SEO',
      ],
      year: 2023,
      status: 'completed',
      translations: {
        en: {
          fullDescription:
            'Full-stack e-commerce platform built with Next.js and PostgreSQL. Includes a product catalog with dynamic filters, persistent cart, Stripe-powered checkout flow, admin panel for managing orders and inventory, and user authentication with NextAuth.',
          features: [
            'Product catalog with search and dynamic filters',
            'Persistent shopping cart with localStorage',
            'Secure payments with Stripe and webhooks',
            'Admin panel for orders and inventory management',
            'User authentication with secure sessions',
            'Image optimization and SSR for SEO',
          ],
        },
      },
    },
  },
  {
    id: 'task-manager',
    title: 'Task Manager App',
    description:
      'Aplicación de gestión de tareas con drag & drop, colaboración en tiempo real vía WebSockets, notificaciones push y sincronización offline.',
    tags: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'PWA'],
    githubUrl: 'https://github.com/Morelo-Dev',
    image: '/projects/tasks.png',
    featured: true,
    accent: '#059669',
    details: {
      fullDescription:
        'Aplicación de gestión de tareas colaborativa con tableros Kanban, drag & drop fluido y sincronización en tiempo real usando WebSockets. Soporta múltiples usuarios en el mismo tablero, comentarios en tarjetas, etiquetas y fechas de vencimiento. Funciona como PWA con soporte offline.',
      features: [
        'Tableros Kanban con drag & drop fluido',
        'Colaboración en tiempo real con WebSockets',
        'Notificaciones push para tareas asignadas',
        'Soporte offline como Progressive Web App',
        'Comentarios y adjuntos en tarjetas',
        'Filtros por etiqueta, responsable y fecha',
      ],
      year: 2023,
      status: 'completed',
      translations: {
        en: {
          fullDescription:
            'Collaborative task management app with Kanban boards, fluid drag & drop, and real-time sync using WebSockets. Supports multiple users on the same board, card comments, labels, and due dates. Works as a PWA with offline support.',
          features: [
            'Kanban boards with fluid drag & drop',
            'Real-time collaboration with WebSockets',
            'Push notifications for assigned tasks',
            'Offline support as a Progressive Web App',
            'Comments and attachments on cards',
            'Filters by label, assignee, and date',
          ],
        },
      },
    },
  },
  {
    id: 'analytics-dashboard',
    title: 'Analytics Dashboard',
    description:
      'Dashboard de analíticas con visualizaciones interactivas, filtros dinámicos, exportación a CSV/PDF y soporte para múltiples fuentes de datos.',
    tags: ['React', 'D3.js', 'Python', 'FastAPI', 'Redis'],
    githubUrl: 'https://github.com/Morelo-Dev',
    image: '/projects/dashboard.png',
    featured: false,
    accent: '#d97706',
    details: {
      fullDescription:
        'Dashboard de analíticas de datos construido con React y D3.js en el frontend, respaldado por una API FastAPI en Python con Redis para caché de consultas. Permite conectar múltiples fuentes de datos, crear gráficos personalizados y exportar reportes en CSV y PDF.',
      features: [
        'Visualizaciones interactivas con D3.js (barras, líneas, dispersión)',
        'Conexión a múltiples fuentes de datos via API',
        'Caché inteligente con Redis para consultas pesadas',
        'Exportación de reportes en CSV y PDF',
        'Filtros dinámicos por rango de fechas y dimensiones',
        'Actualización automática de datos en tiempo real',
      ],
      year: 2022,
      status: 'completed',
      translations: {
        en: {
          fullDescription:
            'Data analytics dashboard built with React and D3.js on the frontend, backed by a FastAPI Python API with Redis for query caching. Supports multiple data source connections, custom chart creation, and report export in CSV and PDF.',
          features: [
            'Interactive D3.js visualizations (bar, line, scatter)',
            'Multiple data source connections via API',
            'Intelligent Redis cache for heavy queries',
            'Report export in CSV and PDF',
            'Dynamic filters by date range and dimensions',
            'Automatic real-time data refresh',
          ],
        },
      },
    },
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
    accent: '#64748b',
    details: {
      fullDescription:
        'Framework base para APIs REST empresariales construido sobre Express y PostgreSQL. Incluye autenticación JWT con refresh tokens, rate limiting por IP y usuario, generación automática de documentación OpenAPI/Swagger, middleware de validación con Zod, y suite completa de tests con Jest y 95% de cobertura.',
      features: [
        'Autenticación JWT con access y refresh tokens',
        'Rate limiting configurable por IP y usuario',
        'Documentación automática con OpenAPI/Swagger',
        'Validación de esquemas con Zod',
        'Suite de tests con 95% de cobertura (Jest)',
        'Dockerizado con Docker Compose para desarrollo',
      ],
      year: 2022,
      status: 'completed',
      translations: {
        en: {
          fullDescription:
            'Base framework for enterprise REST APIs built on Express and PostgreSQL. Includes JWT authentication with refresh tokens, per-IP and per-user rate limiting, automatic OpenAPI/Swagger documentation, Zod schema validation, and a complete test suite with Jest at 95% coverage.',
          features: [
            'JWT authentication with access and refresh tokens',
            'Configurable rate limiting per IP and user',
            'Automatic OpenAPI/Swagger documentation',
            'Schema validation with Zod',
            'Test suite with 95% coverage (Jest)',
            'Dockerized with Docker Compose for development',
          ],
        },
      },
    },
  },
]

export const featuredProjects = projects.filter((p) => p.featured)
