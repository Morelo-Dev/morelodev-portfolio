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

  const date = new Date().toLocaleString('es-CO', {
    timeZone: 'America/Bogota',
    dateStyle: 'full',
    timeStyle: 'short',
  })

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Nuevo mensaje — Portafolio</title>
</head>
<body style="margin:0;padding:0;background:#09090b;font-family:'Segoe UI',system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#09090b;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#1e1e2e 0%,#1a2540 100%);border-radius:16px 16px 0 0;padding:36px 40px 28px;border-bottom:1px solid #2563eb40;">
              <p style="margin:0 0 6px;font-family:monospace;font-size:12px;color:#2563eb;letter-spacing:2px;text-transform:uppercase;">Morelo.Dev — Portafolio</p>
              <h1 style="margin:0;font-size:22px;font-weight:700;color:#f4f4f5;line-height:1.3;">Nuevo mensaje de contacto</h1>
              <p style="margin:8px 0 0;font-size:13px;color:#71717a;">${date}</p>
            </td>
          </tr>

          <!-- Sender card -->
          <tr>
            <td style="background:#111113;padding:28px 40px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#18181b;border:1px solid #27272a;border-radius:12px;overflow:hidden;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0 0 4px;font-size:11px;color:#52525b;text-transform:uppercase;letter-spacing:1px;">De</p>
                    <p style="margin:0;font-size:18px;font-weight:600;color:#f4f4f5;">${name}</p>
                    <a href="mailto:${email}" style="display:inline-block;margin-top:4px;font-size:13px;color:#2563eb;text-decoration:none;">${email}</a>
                  </td>
                  <td align="right" style="padding:20px 24px;">
                    <div style="width:44px;height:44px;border-radius:50%;background:#2563eb18;border:1px solid #2563eb40;display:flex;align-items:center;justify-content:center;">
                      <span style="font-size:20px;line-height:44px;display:block;text-align:center;">✉️</span>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="background:#111113;padding:20px 40px 0;">
              <p style="margin:0 0 10px;font-size:11px;color:#52525b;text-transform:uppercase;letter-spacing:1px;">Mensaje</p>
              <div style="background:#18181b;border:1px solid #27272a;border-left:3px solid #2563eb;border-radius:0 12px 12px 0;padding:20px 24px;">
                <p style="margin:0;font-size:15px;color:#d4d4d8;line-height:1.7;white-space:pre-wrap;">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
              </div>
            </td>
          </tr>

          <!-- Reply CTA -->
          <tr>
            <td style="background:#111113;padding:24px 40px 0;">
              <a href="mailto:${email}?subject=Re: Tu mensaje en Morelo.Dev" style="display:inline-block;background:#2563eb;color:#fff;font-size:14px;font-weight:600;text-decoration:none;padding:12px 28px;border-radius:8px;">
                Responder a ${name}
              </a>
            </td>
          </tr>

          <!-- Meta -->
          <tr>
            <td style="background:#111113;padding:20px 40px 28px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="border-top:1px solid #27272a;padding-top:16px;">
                    <p style="margin:0;font-size:11px;color:#3f3f46;">IP: ${ip} &nbsp;·&nbsp; Enviado desde el formulario de contacto de morelodev-portfolio.vercel.app</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#0c0c0e;border-radius:0 0 16px 16px;padding:20px 40px;border-top:1px solid #2563eb40;text-align:center;">
              <p style="margin:0;font-family:monospace;font-size:12px;color:#3f3f46;">Morelo<span style="color:#2563eb;">.Dev</span> &nbsp;·&nbsp; Jorge Andrés Morelo</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`

  try {
    await resend.emails.send({
      from: 'Portafolio <onboarding@resend.dev>',
      to: process.env.CONTACT_EMAIL ?? 'morelo.dev2025@gmail.com',
      subject: `✉️ ${name} te escribió desde tu portafolio`,
      replyTo: email,
      html,
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
