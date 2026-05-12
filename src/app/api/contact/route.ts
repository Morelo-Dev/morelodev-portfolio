import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'
import { checkRateLimit } from '@/lib/rate-limit'

const MIN_FILL_TIME_MS = 3000 // menos de 3 segundos = bot

const schema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(200),
  message: z.string().min(10).max(2000),
  // Honeypot: debe estar vacío — los bots lo llenan
  _hp: z.string().max(0, 'bot'),
  // Timestamp de cuando se cargó el formulario
  _t: z.number(),
})

export async function POST(req: NextRequest) {
  // Obtener IP real (Vercel pasa x-forwarded-for)
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'

  // Rate limiting: 3 intentos por IP por hora
  const { allowed, remaining } = checkRateLimit(ip)
  if (!allowed) {
    return NextResponse.json(
      { error: 'Demasiados intentos. Intenta de nuevo en una hora.' },
      {
        status: 429,
        headers: { 'Retry-After': '3600' },
      }
    )
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Solicitud inválida' }, { status: 400 })
  }

  const parsed = schema.safeParse(body)

  if (!parsed.success) {
    // Si el honeypot está lleno, responder 200 para no dar pistas al bot
    const isBot = parsed.error.issues.some((i) => i.message === 'bot')
    if (isBot) return NextResponse.json({ ok: true })
    return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 })
  }

  const { name, email, message, _t } = parsed.data

  // Verificar tiempo mínimo de llenado del formulario
  if (Date.now() - _t < MIN_FILL_TIME_MS) {
    return NextResponse.json({ ok: true }) // silencioso para el bot
  }

  const resend = new Resend(process.env.RESEND_API_KEY ?? 'placeholder')

  try {
    await resend.emails.send({
      from: 'Portafolio <onboarding@resend.dev>',
      to: process.env.CONTACT_EMAIL ?? 'morelo.dev2025@gmail.com',
      subject: `Mensaje de ${name} — Portafolio`,
      replyTo: email,
      text: `Nombre: ${name}\nEmail: ${email}\nIP: ${ip}\n\n${message}`,
    })

    return NextResponse.json(
      { ok: true },
      { headers: { 'X-RateLimit-Remaining': String(remaining) } }
    )
  } catch {
    return NextResponse.json({ error: 'Error al enviar el mensaje' }, { status: 500 })
  }
}
