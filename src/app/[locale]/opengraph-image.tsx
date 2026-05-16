import { ImageResponse } from 'next/og'

export const alt = 'Jorge Morelo — Software Developer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const isEs = locale === 'es'

  const label = isEs ? 'Disponible para proyectos' : 'Available for projects'
  const role = isEs ? 'Desarrollador de Software' : 'Software Developer'
  const stack = 'React · Next.js · TypeScript · Node.js'
  const tagline = isEs
    ? 'Aplicaciones web modernas · Bogotá, Colombia'
    : 'Modern web applications · Bogotá, Colombia'

  return new ImageResponse(
    <div
      style={{
        width: '1200px',
        height: '630px',
        background: '#09090b',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '72px 80px',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {/* Grid background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(to right, #ffffff08 1px, transparent 1px), linear-gradient(to bottom, #ffffff08 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Blue glow top-left */}
      <div
        style={{
          position: 'absolute',
          top: '-80px',
          left: '-60px',
          width: '480px',
          height: '480px',
          background: 'radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)',
          borderRadius: '50%',
        }}
      />

      {/* Blue glow bottom-right */}
      <div
        style={{
          position: 'absolute',
          bottom: '-100px',
          right: '-80px',
          width: '360px',
          height: '360px',
          background: 'radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)',
          borderRadius: '50%',
        }}
      />

      {/* Content */}
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '0px' }}>
        {/* Available badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '100px',
            padding: '6px 16px',
            marginBottom: '28px',
            width: 'fit-content',
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#22c55e',
            }}
          />
          <span
            style={{
              fontSize: '14px',
              color: '#a1a1aa',
              letterSpacing: '0.02em',
            }}
          >
            {label}
          </span>
        </div>

        {/* Greeting */}
        <span
          style={{
            fontSize: '18px',
            color: '#71717a',
            letterSpacing: '0.05em',
            marginBottom: '8px',
          }}
        >
          Hola, soy
        </span>

        {/* Name */}
        <h1
          style={{
            fontSize: '72px',
            fontWeight: 700,
            color: '#fafafa',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            margin: '0 0 8px 0',
          }}
        >
          Jorge Morelo
        </h1>

        {/* Role — blue accent */}
        <span
          style={{
            fontSize: '28px',
            fontWeight: 600,
            color: '#2563eb',
            letterSpacing: '-0.01em',
            marginBottom: '28px',
          }}
        >
          {role}
        </span>

        {/* Stack pills */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '32px', flexWrap: 'wrap' }}>
          {stack.split(' · ').map((tech) => (
            <span
              key={tech}
              style={{
                fontSize: '14px',
                color: '#a1a1aa',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '6px',
                padding: '4px 12px',
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Tagline */}
        <span style={{ fontSize: '16px', color: '#52525b' }}>{tagline}</span>
      </div>

      {/* Bottom-right: URL */}
      <div
        style={{
          position: 'absolute',
          bottom: '48px',
          right: '80px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '6px',
        }}
      >
        <span style={{ fontSize: '15px', color: '#3f3f46' }}>github.com/Morelo-Dev</span>
        <span style={{ fontSize: '13px', color: '#27272a' }}>linkedin.com/in/morelodev</span>
      </div>

      {/* Accent line bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'linear-gradient(to right, transparent, #2563eb, transparent)',
        }}
      />
    </div>,
    {
      ...size,
    }
  )
}
