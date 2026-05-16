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
    .replace(/\s+/g, ' ')
    .trim()

const knowledge: KnowledgeEntry[] = [
  // ── Saludos ────────────────────────────────────────────────────────────────
  {
    keywords: [
      'hola',
      'hi',
      'hello',
      'hey',
      'buenas',
      'buenos dias',
      'buenos tardes',
      'buenas noches',
      'saludos',
      'que tal',
      'como estas',
      'good morning',
      'good afternoon',
      'good evening',
      'howdy',
      'sup',
      'ey',
      'greetings',
    ],
    answer: {
      es: '¡Hola! 👋 Soy el asistente del portafolio de Jorge. Puedo contarte sobre sus proyectos, habilidades, experiencia o cómo contactarlo. ¿Qué quieres saber?',
      en: "Hello! 👋 I'm Jorge's portfolio assistant. I can tell you about his projects, skills, experience, or how to reach him. What would you like to know?",
    },
  },

  // ── Nombre ─────────────────────────────────────────────────────────────────
  {
    keywords: [
      'cual es su nombre',
      'como se llama',
      'nombre completo',
      'nombre del developer',
      'nombre del desarrollador',
      'who is this',
      'what is his name',
      'his name',
      'nombre',
      'name',
      'llamar',
      'llama',
      'jorge',
      'morelo',
    ],
    answer: {
      es: 'Se llama Jorge Andrés Morelo Hinestroza 🙋. Es desarrollador full-stack de Uraba, Colombia. Puedes llamarlo simplemente Jorge Morelo.',
      en: "His name is Jorge Andrés Morelo Hinestroza 🙋. He's a full-stack developer from Uraba, Colombia. You can simply call him Jorge Morelo.",
    },
  },

  // ── Quién es / Presentación ────────────────────────────────────────────────
  {
    keywords: [
      'quien es',
      'who is',
      'quien eres',
      'who are you',
      'sobre jorge',
      'about jorge',
      'presentacion',
      'presentation',
      'cuentame de jorge',
      'tell me about jorge',
      'sobre ti',
      'about you',
      'describe',
      'bio',
      'perfil',
      'profile',
      'resumen',
      'summary',
      'que hace',
      'what does he do',
    ],
    answer: {
      es: 'Jorge Andrés Morelo Hinestroza es desarrollador full-stack mid-level de Uraba, Colombia 🇨🇴.\n\nSe especializa en aplicaciones web modernas con React, Next.js, TypeScript y Node.js. Construye productos digitales con código limpio, arquitectura sólida y mucha atención al detalle.\n\nActualmente trabaja en JM Fénix, un SaaS para firmas contables, y está disponible para proyectos freelance.',
      en: "Jorge Andrés Morelo Hinestroza is a mid-level full-stack developer from Uraba, Colombia 🇨🇴.\n\nHe specializes in modern web apps with React, Next.js, TypeScript, and Node.js. He builds digital products with clean code, solid architecture, and great attention to detail.\n\nHe's currently working on JM Fénix, a SaaS for accounting firms, and is available for freelance projects.",
    },
  },

  // ── Identidad del bot ──────────────────────────────────────────────────────
  {
    keywords: [
      'eres ia',
      'are you ai',
      'eres una ia',
      'eres un bot',
      'are you a bot',
      'eres robot',
      'are you robot',
      'chatbot',
      'asistente',
      'assistant',
      'quien eres tu',
      'who are you',
      'como te llamas',
      'what is your name',
      'tu nombre',
      'your name',
    ],
    answer: {
      es: 'Soy un asistente integrado directamente en el portafolio de Jorge 🤖. No soy una IA general — solo conozco sobre Jorge: sus proyectos, habilidades y cómo contactarlo. ¡Pregunta lo que quieras!',
      en: "I'm an assistant built directly into Jorge's portfolio 🤖. I'm not a general AI — I only know about Jorge: his projects, skills, and how to reach him. Ask me anything!",
    },
  },

  // ── Edad ───────────────────────────────────────────────────────────────────
  {
    keywords: [
      'cuantos anos tiene',
      'edad',
      'how old',
      'age',
      'anos de edad',
      'years old',
      'nacimiento',
      'birth',
      'cuando nacio',
      'when was he born',
    ],
    answer: {
      es: 'No tengo esa información exacta. Para conocer más sobre Jorge como persona, te recomiendo su LinkedIn: linkedin.com/in/morelodev 😊',
      en: "I don't have that exact information. To learn more about Jorge personally, I recommend his LinkedIn: linkedin.com/in/morelodev 😊",
    },
  },

  // ── Ubicación ─────────────────────────────────────────────────────────────
  {
    keywords: [
      'donde vive',
      'where does he live',
      'ubicacion',
      'location',
      'ciudad',
      'city',
      'pais',
      'country',
      'colombia',
      'bogota',
      'donde esta',
      'where is he',
      'de donde es',
      'where is he from',
      'nacionalidad',
      'nationality',
      'remoto',
      'remote',
      'trabaja remoto',
      'works remotely',
    ],
    answer: {
      es: 'Jorge vive en Uraba, Colombia 🇨🇴. Trabaja 100% remoto y está abierto a proyectos con equipos de cualquier parte del mundo.',
      en: 'Jorge lives in Uraba, Colombia 🇨🇴. He works 100% remotely and is open to projects with teams from anywhere in the world.',
    },
  },

  // ── Idiomas ────────────────────────────────────────────────────────────────
  {
    keywords: [
      'idiomas',
      'languages spoken',
      'habla ingles',
      'speaks english',
      'ingles',
      'english',
      'espanol',
      'spanish',
      'que idiomas',
      'idioma',
      'language',
      'bilingual',
      'bilingue',
    ],
    answer: {
      es: 'Jorge habla español (nativo) e inglés (nivel profesional). Puede trabajar en proyectos y comunicarse fluidamente en ambos idiomas. 🌎',
      en: 'Jorge speaks Spanish (native) and English (professional level). He can work on projects and communicate fluently in both languages. 🌎',
    },
  },

  // ── Habilidades / Stack ─────────────────────────────────────────────────────
  {
    keywords: [
      'stack',
      'tecnologias',
      'technologies',
      'habilidades',
      'skills',
      'que sabe',
      'que usa',
      'que conoce',
      'herramientas',
      'tools',
      'lenguajes',
      'languages',
      'frameworks',
      'librerias',
      'libraries',
      'frontend',
      'backend',
      'fullstack',
      'full stack',
      'que maneja',
    ],
    answer: {
      es: 'El stack de Jorge:\n\nFrontend: React, Next.js, TypeScript, Tailwind CSS, Vite, Framer Motion\nBackend: Node.js, Express, Python, FastAPI\nBases de datos: PostgreSQL, MongoDB\nUI: shadcn/ui, Radix UI, MUI\nEstado: Zustand, React Hook Form\nDevOps: Git, Docker, Vercel',
      en: "Jorge's stack:\n\nFrontend: React, Next.js, TypeScript, Tailwind CSS, Vite, Framer Motion\nBackend: Node.js, Express, Python, FastAPI\nDatabases: PostgreSQL, MongoDB\nUI: shadcn/ui, Radix UI, MUI\nState: Zustand, React Hook Form\nDevOps: Git, Docker, Vercel",
    },
  },

  // ── Tecnologías específicas ────────────────────────────────────────────────
  {
    keywords: [
      'react',
      'next',
      'nextjs',
      'next.js',
      'typescript',
      'tailwind',
      'vite',
      'node',
      'nodejs',
      'python',
      'fastapi',
      'express',
      'postgres',
      'postgresql',
      'mongodb',
      'docker',
      'zustand',
      'shadcn',
      'radix',
      'framer',
      'vercel',
    ],
    answer: {
      es: 'Sí, Jorge trabaja con esa tecnología. ¿Quieres saber en qué proyecto la usa o más detalles de su stack?',
      en: 'Yes, Jorge works with that technology. Want to know which project he uses it in, or more details about his stack?',
    },
  },

  // ── Proyectos (general) ─────────────────────────────────────────────────────
  {
    keywords: [
      'proyectos',
      'projects',
      'portfolio',
      'trabajos',
      'works',
      'portafolio',
      'que ha hecho',
      'what has he built',
      'que construyo',
      'que ha construido',
      'lista de proyectos',
      'project list',
      'ver proyectos',
      'show projects',
    ],
    answer: {
      es: 'Jorge tiene 5 proyectos en su portafolio:\n\n1. JM Fénix — SaaS contable (en desarrollo) 🔵\n2. E-Commerce Platform — tienda full-stack con Stripe\n3. Task Manager — colaboración en tiempo real\n4. Analytics Dashboard — visualizaciones con D3.js\n5. REST API Framework — con JWT y OpenAPI\n\nHaz clic en cada tarjeta de la sección Proyectos para ver los detalles.',
      en: 'Jorge has 5 projects in his portfolio:\n\n1. JM Fénix — Accounting SaaS (in progress) 🔵\n2. E-Commerce Platform — full-stack store with Stripe\n3. Task Manager — real-time collaboration\n4. Analytics Dashboard — D3.js visualizations\n5. REST API Framework — with JWT and OpenAPI\n\nClick on each card in the Projects section to see the details.',
    },
  },

  // ── JM Fénix ───────────────────────────────────────────────────────────────
  {
    keywords: [
      'jmfenix',
      'jm fenix',
      'fenix',
      'saas',
      'contable',
      'contabilidad',
      'accounting',
      'contador',
      'contadores',
      'dian',
      'fiscal',
      'tributario',
      'tributaria',
      'obligaciones',
      'impuestos',
      'taxes',
      'firmas',
    ],
    answer: {
      es: 'JM Fénix es el proyecto principal de Jorge — un SaaS para firmas contables en Colombia 🚀\n\nIncluye:\n• Gestión de clientes (naturales y jurídicos) con perfil 360°\n• Obligaciones tributarias ante la DIAN\n• Calendarios fiscales integrados\n• Control de roles y permisos granular\n• Notificaciones automáticas por email\n• Design system con glassmorphism y tokens CSS\n\nStack: React + Vite + TypeScript + Tailwind + Zustand + shadcn/ui\nEstado: En desarrollo activo — demo en jmfenix.vercel.app',
      en: "JM Fénix is Jorge's main project — a SaaS for accounting firms in Colombia 🚀\n\nIncludes:\n• Client management (individuals & legal entities) with 360° profile\n• DIAN tax obligations tracking\n• Integrated fiscal calendars\n• Granular role and permission control\n• Automated email notifications\n• Glassmorphism design system with CSS tokens\n\nStack: React + Vite + TypeScript + Tailwind + Zustand + shadcn/ui\nStatus: Actively in development — demo at jmfenix.vercel.app",
    },
  },

  // ── E-Commerce ─────────────────────────────────────────────────────────────
  {
    keywords: [
      'ecommerce',
      'e-commerce',
      'e commerce',
      'tienda',
      'store',
      'stripe',
      'compras',
      'shopping',
      'carrito',
      'cart',
      'pagos',
      'payments',
      'inventario',
    ],
    answer: {
      es: 'E-Commerce Platform es una tienda online full-stack con:\n• Carrito de compras y checkout\n• Pagos integrados con Stripe\n• Panel de administración\n• Gestión de inventario en tiempo real\n\nStack: Next.js, TypeScript, PostgreSQL, Tailwind CSS',
      en: 'E-Commerce Platform is a full-stack online store with:\n• Shopping cart and checkout flow\n• Stripe payment integration\n• Admin dashboard\n• Real-time inventory management\n\nStack: Next.js, TypeScript, PostgreSQL, Tailwind CSS',
    },
  },

  // ── Task Manager ───────────────────────────────────────────────────────────
  {
    keywords: [
      'task',
      'tareas',
      'tasks',
      'websocket',
      'tiempo real',
      'real time',
      'real-time',
      'drag',
      'drop',
      'colaboracion',
      'collaboration',
      'pwa',
      'offline',
      'socket',
      'notificaciones push',
      'push notifications',
    ],
    answer: {
      es: 'Task Manager App es una app de gestión de tareas con:\n• Drag & drop para organizar tareas\n• Colaboración en tiempo real (WebSockets)\n• Notificaciones push\n• Sincronización offline (PWA)\n\nStack: React, Node.js, Socket.io, MongoDB',
      en: 'Task Manager App is a task management app with:\n• Drag & drop to organize tasks\n• Real-time collaboration (WebSockets)\n• Push notifications\n• Offline sync (PWA)\n\nStack: React, Node.js, Socket.io, MongoDB',
    },
  },

  // ── Analytics Dashboard ────────────────────────────────────────────────────
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
      'visualizaciones',
      'reportes',
      'reports',
      'csv',
      'pdf',
      'exportar',
      'export',
      'datos',
      'data',
      'metricas',
      'metrics',
    ],
    answer: {
      es: 'Analytics Dashboard es un panel de datos con:\n• Visualizaciones interactivas con D3.js\n• Filtros dinámicos avanzados\n• Exportación a CSV y PDF\n• Múltiples fuentes de datos\n\nStack: React, D3.js, Python, FastAPI, Redis',
      en: 'Analytics Dashboard is a data panel with:\n• Interactive visualizations with D3.js\n• Advanced dynamic filters\n• CSV and PDF export\n• Multiple data sources\n\nStack: React, D3.js, Python, FastAPI, Redis',
    },
  },

  // ── REST API ───────────────────────────────────────────────────────────────
  {
    keywords: [
      'api',
      'rest',
      'restful',
      'jwt',
      'autenticacion',
      'authentication',
      'swagger',
      'openapi',
      'rate limiting',
      'coverage',
      'cobertura',
      'tests',
      'testing',
      'jest',
      'backend framework',
    ],
    answer: {
      es: 'REST API Framework es un backend con:\n• Autenticación JWT segura\n• Rate limiting integrado\n• Documentación automática OpenAPI/Swagger\n• 95% de cobertura de tests\n\nStack: Node.js, Express, PostgreSQL, Docker, Jest',
      en: 'REST API Framework is a backend with:\n• Secure JWT authentication\n• Built-in rate limiting\n• Automatic OpenAPI/Swagger documentation\n• 95% test coverage\n\nStack: Node.js, Express, PostgreSQL, Docker, Jest',
    },
  },

  // ── Disponibilidad / Contratar ─────────────────────────────────────────────
  {
    keywords: [
      'disponible',
      'available',
      'contratar',
      'hire',
      'freelance',
      'empleo',
      'job',
      'trabajo',
      'oportunidad',
      'opportunity',
      'remoto',
      'remote',
      'puedo contratarlo',
      'can i hire',
      'esta libre',
      'is he free',
      'busca trabajo',
      'looking for work',
      'abierto a trabajar',
      'open to work',
      'contratacion',
      'hiring',
      'posicion',
      'position',
    ],
    answer: {
      es: '¡Sí! Jorge está disponible para proyectos freelance y oportunidades laborales 🟢\n\nPrefiere trabajo remoto. Puedes contactarlo directamente:\n• Email: morelo.dev2025@gmail.com\n• LinkedIn: linkedin.com/in/morelodev\n\nO usa el formulario de contacto en este portafolio.',
      en: 'Yes! Jorge is available for freelance projects and job opportunities 🟢\n\nHe prefers remote work. You can contact him directly:\n• Email: morelo.dev2025@gmail.com\n• LinkedIn: linkedin.com/in/morelodev\n\nOr use the contact form on this portfolio.',
    },
  },

  // ── Contacto ───────────────────────────────────────────────────────────────
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
      'escribirle',
      'write to him',
      'mensaje',
      'message',
      'hablar',
      'talk',
      'comunicar',
      'communicate',
      'whatsapp',
      'telegram',
    ],
    answer: {
      es: 'Puedes contactar a Jorge por:\n\n• Email: morelo.dev2025@gmail.com\n• LinkedIn: linkedin.com/in/morelodev\n• GitHub: github.com/Morelo-Dev\n\nO usa el formulario de contacto de este portafolio 👇',
      en: 'You can reach Jorge at:\n\n• Email: morelo.dev2025@gmail.com\n• LinkedIn: linkedin.com/in/morelodev\n• GitHub: github.com/Morelo-Dev\n\nOr use the contact form on this portfolio 👇',
    },
  },

  // ── GitHub ─────────────────────────────────────────────────────────────────
  {
    keywords: [
      'github',
      'repositorio',
      'repository',
      'repo',
      'codigo fuente',
      'source code',
      'git',
      'commits',
      'open source',
    ],
    answer: {
      es: 'El GitHub de Jorge es github.com/Morelo-Dev 🐙\n\nAhí puedes ver sus repositorios y contribuciones.',
      en: "Jorge's GitHub is github.com/Morelo-Dev 🐙\n\nThere you can see his repositories and contributions.",
    },
  },

  // ── LinkedIn ───────────────────────────────────────────────────────────────
  {
    keywords: [
      'linkedin',
      'perfil profesional',
      'professional profile',
      'red profesional',
      'professional network',
    ],
    answer: {
      es: 'El LinkedIn de Jorge es linkedin.com/in/morelodev 💼\n\nAhí puedes ver su experiencia profesional completa y conectar con él.',
      en: "Jorge's LinkedIn is linkedin.com/in/morelodev 💼\n\nThere you can see his full professional experience and connect with him.",
    },
  },

  // ── Experiencia ────────────────────────────────────────────────────────────
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
      'seniority',
      'tiempo desarrollando',
      'how long coding',
      'trayectoria',
      'career',
      'historial',
      'history',
      'trabajos anteriores',
      'previous jobs',
    ],
    answer: {
      es: 'Jorge es desarrollador mid-level con varios años de experiencia construyendo aplicaciones web. Ha trabajado en proyectos desde SaaS empresariales hasta plataformas e-commerce y dashboards analíticos.\n\nPara ver su historial profesional completo: linkedin.com/in/morelodev',
      en: "Jorge is a mid-level developer with several years of experience building web applications. He's worked on projects ranging from enterprise SaaS to e-commerce platforms and analytics dashboards.\n\nFor his full professional history: linkedin.com/in/morelodev",
    },
  },

  // ── Educación ─────────────────────────────────────────────────────────────
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
      'formacion',
      'training',
      'certificaciones',
      'certifications',
      'cursos',
      'courses',
    ],
    answer: {
      es: 'Para información detallada sobre la formación académica de Jorge, te recomiendo visitar su LinkedIn: linkedin.com/in/morelodev 🎓',
      en: "For detailed info about Jorge's educational background, I recommend visiting his LinkedIn: linkedin.com/in/morelodev 🎓",
    },
  },

  // ── Precio / Tarifa ────────────────────────────────────────────────────────
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
      'presupuesto',
      'budget',
      'honorarios',
      'fees',
      'valor',
      'value',
    ],
    answer: {
      es: 'Las tarifas varían según el alcance y tipo de proyecto. Te recomiendo contactar a Jorge directamente para discutirlo:\n• Email: morelo.dev2025@gmail.com\n• LinkedIn: linkedin.com/in/morelodev',
      en: 'Rates vary depending on the project scope and type. I recommend contacting Jorge directly to discuss it:\n• Email: morelo.dev2025@gmail.com\n• LinkedIn: linkedin.com/in/morelodev',
    },
  },

  // ── Estilo de trabajo ──────────────────────────────────────────────────────
  {
    keywords: [
      'como trabaja',
      'how does he work',
      'metodologia',
      'methodology',
      'agile',
      'scrum',
      'proceso',
      'process',
      'forma de trabajar',
      'work style',
      'colaborativo',
      'collaborative',
      'autonomo',
      'autonomous',
    ],
    answer: {
      es: 'Jorge trabaja de forma autónoma y colaborativa. Tiene experiencia con metodologías ágiles, comunicación clara y entrega de resultados. Prefiere proyectos donde pueda aportar desde la arquitectura hasta el producto final.',
      en: 'Jorge works both autonomously and collaboratively. He has experience with agile methodologies, clear communication, and delivering results. He prefers projects where he can contribute from architecture to the final product.',
    },
  },

  // ── Por qué contratarlo ────────────────────────────────────────────────────
  {
    keywords: [
      'por que contratarlo',
      'why hire him',
      'que lo diferencia',
      'what makes him different',
      'fortalezas',
      'strengths',
      'puntos fuertes',
      'strong points',
      'valor',
      'value',
      'aporta',
      'contributes',
      'ventajas',
      'advantages',
      'por que el',
      'why him',
    ],
    answer: {
      es: 'Razones para trabajar con Jorge:\n\n• Código limpio y bien estructurado\n• Atención al detalle en UI/UX\n• Arquitectura sólida y escalable\n• Comunicación clara y proactiva\n• Experiencia construyendo productos reales (no solo demos)\n• Disponible y comprometido con los plazos',
      en: 'Reasons to work with Jorge:\n\n• Clean and well-structured code\n• Attention to UI/UX detail\n• Solid and scalable architecture\n• Clear and proactive communication\n• Experience building real products (not just demos)\n• Available and committed to deadlines',
    },
  },

  // ── Portafolio ─────────────────────────────────────────────────────────────
  {
    keywords: [
      'este portafolio',
      'this portfolio',
      'como hizo este sitio',
      'how did he build this',
      'tecnologia del portafolio',
      'portfolio tech',
      'sitio web',
      'website',
      'pagina web',
      'webpage',
      'nextjs portfolio',
    ],
    answer: {
      es: 'Este portafolio está construido con Next.js 16 (App Router), TypeScript, Tailwind CSS v4 y Framer Motion para animaciones. Incluye i18n en español e inglés, modo oscuro/claro, SEO optimizado, sitemap y og:image dinámica. Está deployado en Vercel.',
      en: 'This portfolio is built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, and Framer Motion for animations. It includes Spanish/English i18n, dark/light mode, optimized SEO, sitemap, and dynamic og:image. Deployed on Vercel.',
    },
  },

  // ── Tiempo de respuesta / Disponibilidad inmediata ─────────────────────────
  {
    keywords: [
      'cuando puede empezar',
      'when can he start',
      'disponibilidad inmediata',
      'immediate availability',
      'empieza ya',
      'starts now',
      'urgente',
      'urgent',
      'inmediatamente',
      'immediately',
      'cuando',
      'when',
    ],
    answer: {
      es: 'Jorge está disponible actualmente. Para coordinar fechas de inicio y detalles, lo mejor es contactarlo directamente:\n• Email: morelo.dev2025@gmail.com\n• LinkedIn: linkedin.com/in/morelodev',
      en: "Jorge is currently available. To coordinate start dates and details, it's best to contact him directly:\n• Email: morelo.dev2025@gmail.com\n• LinkedIn: linkedin.com/in/morelodev",
    },
  },

  // ── Demo de JM Fénix ───────────────────────────────────────────────────────
  {
    keywords: [
      'demo',
      'live',
      'en vivo',
      'ver demo',
      'see demo',
      'probar',
      'try',
      'acceder',
      'access',
      'link del proyecto',
      'project link',
      'url',
      'enlace',
    ],
    answer: {
      es: 'El único proyecto con demo en vivo es JM Fénix:\njmfenix.vercel.app 🔗\n\nLos demás proyectos son privados pero puedes ver los detalles en las tarjetas del portafolio.',
      en: 'The only project with a live demo is JM Fénix:\njmfenix.vercel.app 🔗\n\nThe other projects are private but you can see the details on the portfolio cards.',
    },
  },

  // ── Agradecimientos ────────────────────────────────────────────────────────
  {
    keywords: [
      'gracias',
      'thanks',
      'thank you',
      'muchas gracias',
      'thank you so much',
      'genial',
      'great',
      'perfecto',
      'perfect',
      'excelente',
      'excellent',
      'bien',
      'good',
      'ok',
      'entendido',
      'got it',
      'claro',
      'sure',
      'de nada',
      'np',
      'chevere',
      'bacano',
      'cool',
    ],
    answer: {
      es: '¡Con gusto! Si tienes más preguntas sobre Jorge, aquí estoy 😊',
      en: "You're welcome! If you have more questions about Jorge, I'm here 😊",
    },
  },

  // ── Despedida ──────────────────────────────────────────────────────────────
  {
    keywords: [
      'adios',
      'bye',
      'hasta luego',
      'goodbye',
      'chao',
      'ciao',
      'hasta pronto',
      'see you',
      'nos vemos',
      'hasta la proxima',
    ],
    answer: {
      es: '¡Hasta luego! Si necesitas más info sobre Jorge, vuelve cuando quieras 👋',
      en: 'Goodbye! If you need more info about Jorge, come back anytime 👋',
    },
  },

  // ── Preguntas negativas / frustración ─────────────────────────────────────
  {
    keywords: [
      'no sabes',
      "you don't know",
      'no sirves',
      'useless',
      'inutil',
      'no entiendes',
      "don't understand",
      'mal',
      'bad',
      'horrible',
    ],
    answer: {
      es: 'Tienes razón, soy un asistente básico con conocimiento limitado sobre Jorge 😅. Para cualquier duda específica, la mejor opción es contactarlo directamente: morelo.dev2025@gmail.com',
      en: "You're right, I'm a basic assistant with limited knowledge about Jorge 😅. For any specific questions, the best option is to contact him directly: morelo.dev2025@gmail.com",
    },
  },
]

const FALLBACK: Record<Locale, string> = {
  es: '¡Buena pregunta! No tengo esa información específica. Te sugiero contactar a Jorge directamente:\n• Email: morelo.dev2025@gmail.com\n• LinkedIn: linkedin.com/in/morelodev',
  en: "Good question! I don't have that specific information. I suggest contacting Jorge directly:\n• Email: morelo.dev2025@gmail.com\n• LinkedIn: linkedin.com/in/morelodev",
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
