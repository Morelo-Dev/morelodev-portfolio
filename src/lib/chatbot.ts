export type Locale = 'es' | 'en'

interface KnowledgeEntry {
  keywords: string[]
  answer: Record<Locale, string>
}

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9 ]/g, ' ')

const knowledge: KnowledgeEntry[] = [
  {
    keywords: [
      'hola',
      'hi',
      'hello',
      'hey',
      'buenas',
      'buenos',
      'saludos',
      'que tal',
      'good morning',
      'good afternoon',
    ],
    answer: {
      es: '¡Hola! 👋 Soy el asistente del portafolio de Jorge. Puedes preguntarme sobre sus proyectos, habilidades, experiencia o cómo contactarlo.',
      en: "Hello! 👋 I'm Jorge's portfolio assistant. You can ask me about his projects, skills, experience, or how to contact him.",
    },
  },
  {
    keywords: [
      'quien eres',
      'who are you',
      'que eres',
      'what are you',
      'como te llamas',
      'eres ia',
      'are you ai',
      'eres una ia',
      'chatbot',
      'bot',
    ],
    answer: {
      es: 'Soy un asistente integrado en el portafolio de Jorge Morelo. No soy una IA general — solo sé sobre Jorge, sus proyectos y habilidades. ¿En qué puedo ayudarte?',
      en: "I'm an assistant built into Jorge Morelo's portfolio. I'm not a general AI — I only know about Jorge, his projects, and skills. How can I help you?",
    },
  },
  {
    keywords: [
      'quien es jorge',
      'who is jorge',
      'sobre jorge',
      'about jorge',
      'presentacion',
      'presentation',
      'cuentame de ti',
      'tell me about',
      'sobre ti',
      'about you',
    ],
    answer: {
      es: 'Jorge Andrés Morelo Hinestroza es un desarrollador full-stack mid-level de Bogotá, Colombia 🇨🇴. Se especializa en aplicaciones web modernas con React, Next.js, TypeScript y Node.js. Construye productos con código limpio, arquitectura sólida y atención al detalle.',
      en: 'Jorge Andrés Morelo Hinestroza is a mid-level full-stack developer from Bogotá, Colombia 🇨🇴. He specializes in modern web apps with React, Next.js, TypeScript, and Node.js. He builds products with clean code, solid architecture, and attention to detail.',
    },
  },
  {
    keywords: [
      'stack',
      'tecnologias',
      'technologies',
      'habilidades',
      'skills',
      'sabe',
      'usa',
      'uses',
      'conoce',
      'knows',
      'lenguajes',
      'languages',
      'frameworks',
    ],
    answer: {
      es: 'El stack principal de Jorge:\n\n**Frontend:** React, Next.js, TypeScript, Tailwind CSS, Vite\n**Backend:** Node.js, Express, Python, FastAPI\n**Bases de datos:** PostgreSQL, MongoDB\n**Herramientas:** Git, Docker, Zustand, React Hook Form\n**UI:** shadcn/ui, Radix UI, Framer Motion',
      en: "Jorge's main stack:\n\n**Frontend:** React, Next.js, TypeScript, Tailwind CSS, Vite\n**Backend:** Node.js, Express, Python, FastAPI\n**Databases:** PostgreSQL, MongoDB\n**Tools:** Git, Docker, Zustand, React Hook Form\n**UI:** shadcn/ui, Radix UI, Framer Motion",
    },
  },
  {
    keywords: [
      'react',
      'next',
      'nextjs',
      'typescript',
      'tailwind',
      'node',
      'nodejs',
      'python',
      'postgres',
      'mongodb',
      'docker',
      'zustand',
    ],
    answer: {
      es: 'Sí, Jorge trabaja con esa tecnología. Su stack principal es React + Next.js + TypeScript en frontend, y Node.js o Python en backend. ¿Quieres saber más sobre algún proyecto donde la usa?',
      en: 'Yes, Jorge works with that technology. His main stack is React + Next.js + TypeScript on the frontend, and Node.js or Python on the backend. Want to know about a project where he uses it?',
    },
  },
  {
    keywords: [
      'proyectos',
      'projects',
      'portfolio',
      'trabajos',
      'works',
      'que ha hecho',
      'what has he built',
      'que construyo',
    ],
    answer: {
      es: 'Jorge tiene 5 proyectos en su portafolio:\n\n1. **JM Fénix** — SaaS contable (en desarrollo) 🔵\n2. **E-Commerce Platform** — tienda full-stack con Stripe\n3. **Task Manager** — colaboración en tiempo real\n4. **Analytics Dashboard** — visualizaciones con D3.js\n5. **REST API Framework** — con JWT y OpenAPI\n\nPuedes ver los detalles de cada uno en la sección Proyectos.',
      en: 'Jorge has 5 projects in his portfolio:\n\n1. **JM Fénix** — Accounting SaaS (in progress) 🔵\n2. **E-Commerce Platform** — full-stack store with Stripe\n3. **Task Manager** — real-time collaboration\n4. **Analytics Dashboard** — D3.js visualizations\n5. **REST API Framework** — with JWT and OpenAPI\n\nYou can see the details of each one in the Projects section.',
    },
  },
  {
    keywords: ['jmfenix', 'jm fenix', 'saas', 'contable', 'contabilidad', 'accounting', 'contador'],
    answer: {
      es: '**JM Fénix** es el proyecto más completo de Jorge — una plataforma SaaS para contadores y firmas contables en Colombia. Incluye:\n\n• Gestión de clientes y empresas (perfil 360°)\n• Obligaciones tributarias ante la DIAN\n• Calendarios fiscales integrados\n• Control de roles y permisos\n• Notificaciones automáticas\n• Design system propio con glassmorphism\n\nStack: React + Vite + TypeScript + Tailwind + Zustand + shadcn/ui\nEstado: En desarrollo activo 🚀',
      en: "**JM Fénix** is Jorge's most complete project — a SaaS platform for accountants and accounting firms in Colombia. It includes:\n\n• Client and company management (360° profile)\n• DIAN tax obligations tracking\n• Integrated fiscal calendars\n• Role and permission control\n• Automated notifications\n• Custom design system with glassmorphism\n\nStack: React + Vite + TypeScript + Tailwind + Zustand + shadcn/ui\nStatus: Actively in development 🚀",
    },
  },
  {
    keywords: ['ecommerce', 'e-commerce', 'tienda', 'store', 'stripe', 'compras', 'shopping'],
    answer: {
      es: '**E-Commerce Platform** es una plataforma full-stack con carrito de compras, pagos integrados con Stripe, panel de administración y gestión de inventario en tiempo real. Stack: Next.js, TypeScript, PostgreSQL, Tailwind CSS.',
      en: '**E-Commerce Platform** is a full-stack platform with shopping cart, Stripe payments, admin dashboard, and real-time inventory management. Stack: Next.js, TypeScript, PostgreSQL, Tailwind CSS.',
    },
  },
  {
    keywords: [
      'task',
      'tareas',
      'tasks',
      'websocket',
      'tiempo real',
      'real time',
      'drag',
      'colaboracion',
      'collaboration',
    ],
    answer: {
      es: '**Task Manager App** es una aplicación de gestión de tareas con drag & drop, colaboración en tiempo real vía WebSockets, notificaciones push y sincronización offline (PWA). Stack: React, Node.js, Socket.io, MongoDB.',
      en: '**Task Manager App** is a task management app with drag & drop, real-time collaboration via WebSockets, push notifications, and offline sync (PWA). Stack: React, Node.js, Socket.io, MongoDB.',
    },
  },
  {
    keywords: [
      'analytics',
      'dashboard',
      'graficas',
      'graficos',
      'charts',
      'd3',
      'visualizacion',
      'visualization',
      'datos',
      'data',
    ],
    answer: {
      es: '**Analytics Dashboard** es un panel interactivo con visualizaciones dinámicas usando D3.js, filtros avanzados, exportación a CSV/PDF y soporte para múltiples fuentes de datos. Stack: React, D3.js, Python, FastAPI, Redis.',
      en: '**Analytics Dashboard** is an interactive panel with dynamic D3.js visualizations, advanced filters, CSV/PDF export, and multi-source data support. Stack: React, D3.js, Python, FastAPI, Redis.',
    },
  },
  {
    keywords: [
      'api',
      'rest',
      'jwt',
      'autenticacion',
      'authentication',
      'swagger',
      'openapi',
      'framework',
      'backend',
    ],
    answer: {
      es: '**REST API Framework** es un framework backend con autenticación JWT, rate limiting, documentación automática con OpenAPI/Swagger y 95% de cobertura de tests. Stack: Node.js, Express, PostgreSQL, Docker, Jest.',
      en: '**REST API Framework** is a backend framework with JWT authentication, rate limiting, automatic OpenAPI/Swagger documentation, and 95% test coverage. Stack: Node.js, Express, PostgreSQL, Docker, Jest.',
    },
  },
  {
    keywords: [
      'disponible',
      'available',
      'trabajo',
      'work',
      'contratar',
      'hire',
      'freelance',
      'empleo',
      'job',
      'oportunidad',
      'opportunity',
      'contratacion',
      'remoto',
      'remote',
    ],
    answer: {
      es: '¡Sí! Jorge está **disponible** para proyectos freelance y oportunidades laborales (remoto preferido). Puedes contactarlo directamente:\n\n📧 jorge.morelo@siempre.net.co\n💼 linkedin.com/in/morelodev\n\nO usa el formulario de contacto en este portafolio.',
      en: 'Yes! Jorge is **available** for freelance projects and job opportunities (remote preferred). You can contact him directly:\n\n📧 jorge.morelo@siempre.net.co\n💼 linkedin.com/in/morelodev\n\nOr use the contact form on this portfolio.',
    },
  },
  {
    keywords: [
      'contacto',
      'contact',
      'email',
      'correo',
      'linkedin',
      'github',
      'redes',
      'social',
      'como contactar',
      'how to contact',
      'reach',
    ],
    answer: {
      es: 'Puedes contactar a Jorge por:\n\n📧 **Email:** jorge.morelo@siempre.net.co\n💼 **LinkedIn:** linkedin.com/in/morelodev\n🐙 **GitHub:** github.com/Morelo-Dev\n\nO directamente por el formulario de contacto de este portafolio 👇',
      en: 'You can reach Jorge at:\n\n📧 **Email:** jorge.morelo@siempre.net.co\n💼 **LinkedIn:** linkedin.com/in/morelodev\n🐙 **GitHub:** github.com/Morelo-Dev\n\nOr directly through the contact form on this portfolio 👇',
    },
  },
  {
    keywords: [
      'donde vive',
      'where does',
      'ubicacion',
      'location',
      'ciudad',
      'city',
      'pais',
      'country',
      'colombia',
      'bogota',
    ],
    answer: {
      es: 'Jorge es de Bogotá, Colombia 🇨🇴. Trabaja de forma remota y está abierto a proyectos internacionales.',
      en: 'Jorge is from Bogotá, Colombia 🇨🇴. He works remotely and is open to international projects.',
    },
  },
  {
    keywords: [
      'experiencia',
      'experience',
      'anos',
      'years',
      'cuanto tiempo',
      'how long',
      'senior',
      'junior',
      'mid',
      'nivel',
      'level',
    ],
    answer: {
      es: 'Jorge es desarrollador mid-level con varios años de experiencia construyendo aplicaciones web. Ha trabajado en proyectos desde SaaS empresariales hasta plataformas de e-commerce y dashboards analíticos.',
      en: "Jorge is a mid-level developer with several years of experience building web applications. He's worked on projects ranging from enterprise SaaS to e-commerce platforms and analytics dashboards.",
    },
  },
  {
    keywords: [
      'educacion',
      'education',
      'estudio',
      'studied',
      'universidad',
      'university',
      'titulo',
      'degree',
      'carrera',
    ],
    answer: {
      es: 'Para información detallada sobre la formación académica de Jorge, te recomiendo visitar su perfil de LinkedIn: linkedin.com/in/morelodev',
      en: "For detailed information about Jorge's educational background, I recommend visiting his LinkedIn profile: linkedin.com/in/morelodev",
    },
  },
  {
    keywords: [
      'precio',
      'price',
      'costo',
      'cost',
      'tarifa',
      'rate',
      'cobra',
      'charge',
      'salario',
      'salary',
      'cuanto cobras',
      'how much',
    ],
    answer: {
      es: 'Las tarifas varían según el proyecto y el alcance. Te recomiendo contactar a Jorge directamente para discutir los detalles: jorge.morelo@siempre.net.co o por LinkedIn.',
      en: 'Rates vary depending on the project and scope. I recommend contacting Jorge directly to discuss details: jorge.morelo@siempre.net.co or via LinkedIn.',
    },
  },
  {
    keywords: [
      'gracias',
      'thanks',
      'thank you',
      'genial',
      'great',
      'perfecto',
      'perfect',
      'excelente',
      'excellent',
      'bien',
      'good',
      'ok',
    ],
    answer: {
      es: '¡Con gusto! Si tienes más preguntas sobre Jorge o sus proyectos, aquí estoy. 😊',
      en: "You're welcome! If you have more questions about Jorge or his projects, I'm here. 😊",
    },
  },
  {
    keywords: ['adios', 'bye', 'hasta luego', 'goodbye', 'chao', 'ciao', 'hasta pronto'],
    answer: {
      es: '¡Hasta luego! Si necesitas más info sobre Jorge, vuelve cuando quieras. 👋',
      en: 'Goodbye! If you need more info about Jorge, come back anytime. 👋',
    },
  },
]

const FALLBACK: Record<Locale, string> = {
  es: 'No tengo información específica sobre eso. Te sugiero contactar a Jorge directamente en jorge.morelo@siempre.net.co o por LinkedIn: linkedin.com/in/morelodev',
  en: "I don't have specific information about that. I suggest contacting Jorge directly at jorge.morelo@siempre.net.co or on LinkedIn: linkedin.com/in/morelodev",
}

export function getChatResponse(input: string, locale: Locale): string {
  const normalized = normalize(input)

  for (const entry of knowledge) {
    if (entry.keywords.some((kw) => normalized.includes(normalize(kw)))) {
      return entry.answer[locale] ?? entry.answer.es
    }
  }

  return FALLBACK[locale]
}
