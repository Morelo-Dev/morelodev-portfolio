# Jorge Morelo — Portafolio

Portafolio personal construido con Next.js 16, TypeScript y Tailwind CSS. Incluye proyectos, habilidades, blog técnico y formulario de contacto.

**Live:** [morelodev-portfolio.vercel.app](https://morelodev-portfolio.vercel.app)

## Stack

- **Framework:** Next.js 16 (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS v4
- **Animaciones:** Framer Motion
- **i18n:** next-intl (ES / EN)
- **Email:** Resend
- **Deploy:** Vercel
- **CI/CD:** GitHub Actions

## Desarrollo local

```bash
pnpm install
pnpm dev
```

Crea un archivo `.env.local` basado en `.env.example` antes de correr el proyecto.

## Scripts

| Comando         | Descripción            |
| --------------- | ---------------------- |
| `pnpm dev`      | Servidor de desarrollo |
| `pnpm build`    | Build de producción    |
| `pnpm test`     | Tests unitarios        |
| `pnpm test:e2e` | Tests end-to-end       |
| `pnpm lint`     | Lint ESLint            |
| `pnpm format`   | Formatear con Prettier |
