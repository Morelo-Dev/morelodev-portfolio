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

  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((w: string) => w[0]?.toUpperCase() ?? '')
    .join('')

  const safeMessage = message.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0" />
  <title>Nuevo contacto — Morelo.Dev</title>
</head>
<body style="margin:0;padding:0;background:#08080a;font-family:'Segoe UI',ui-sans-serif,system-ui,sans-serif;">

  <!-- Outer wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
         style="background:#08080a;padding:48px 16px 64px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
             style="max-width:580px;">

        <!-- ══ TOP ACCENT BAR ══ -->
        <tr>
          <td style="height:3px;background:linear-gradient(90deg,#1d4ed8 0%,#3b82f6 50%,#1d4ed8 100%);border-radius:3px 3px 0 0;"></td>
        </tr>

        <!-- ══ HERO HEADER ══ -->
        <tr>
          <td style="background:linear-gradient(160deg,#0f1729 0%,#0d1117 60%,#0a0f1e 100%);
                     padding:44px 48px 36px;position:relative;overflow:hidden;">

            <!-- Faint grid texture via repeating-linear-gradient (solo soportado en algunos clientes) -->
            <div style="position:absolute;inset:0;opacity:.04;
                        background-image:linear-gradient(to right,#3b82f6 1px,transparent 1px),
                                         linear-gradient(to bottom,#3b82f6 1px,transparent 1px);
                        background-size:28px 28px;pointer-events:none;"></div>

            <!-- Badge -->
            <table cellpadding="0" cellspacing="0" role="presentation" style="margin-bottom:20px;">
              <tr>
                <td style="background:#1e3a5f;border:1px solid #2563eb55;border-radius:100px;
                           padding:5px 14px;">
                  <span style="font-family:ui-monospace,'Cascadia Code',monospace;font-size:10px;
                               font-weight:600;color:#60a5fa;letter-spacing:2.5px;
                               text-transform:uppercase;">Morelo.Dev · Portafolio</span>
                </td>
              </tr>
            </table>

            <!-- Title -->
            <h1 style="margin:0 0 8px;font-size:26px;font-weight:700;color:#f8fafc;
                       line-height:1.25;letter-spacing:-0.3px;">
              Tienes un nuevo mensaje
            </h1>
            <p style="margin:0;font-size:14px;color:#64748b;line-height:1.5;">
              Alguien visitó tu portafolio y quiere conectar contigo.
            </p>

            <!-- Divider -->
            <div style="margin-top:28px;height:1px;
                        background:linear-gradient(90deg,#1e40af33,#3b82f622,transparent);"></div>
          </td>
        </tr>

        <!-- ══ SENDER SECTION ══ -->
        <tr>
          <td style="background:#0d0d0f;padding:32px 48px 0;">

            <p style="margin:0 0 14px;font-size:10px;font-weight:600;color:#374151;
                      letter-spacing:2px;text-transform:uppercase;">Remitente</p>

            <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
                   style="background:#111318;border:1px solid #1e2330;border-radius:14px;
                          overflow:hidden;">
              <tr>
                <!-- Avatar con iniciales -->
                <td width="72" style="padding:22px 0 22px 22px;vertical-align:middle;">
                  <div style="width:48px;height:48px;border-radius:50%;
                              background:linear-gradient(135deg,#1d4ed8,#3b82f6);
                              text-align:center;line-height:48px;">
                    <span style="font-size:17px;font-weight:700;color:#fff;
                                 font-family:ui-sans-serif,sans-serif;">${initials}</span>
                  </div>
                </td>

                <!-- Info -->
                <td style="padding:22px 22px 22px 14px;vertical-align:middle;">
                  <p style="margin:0;font-size:17px;font-weight:600;color:#f1f5f9;
                            letter-spacing:-0.2px;">${name}</p>
                  <a href="mailto:${email}"
                     style="display:inline-block;margin-top:4px;font-size:13px;
                            color:#3b82f6;text-decoration:none;">${email}</a>
                </td>

                <!-- Right chip -->
                <td align="right" style="padding:22px;vertical-align:middle;">
                  <span style="display:inline-block;background:#172033;border:1px solid #1e3a5f;
                               border-radius:8px;padding:6px 12px;font-size:11px;
                               font-weight:500;color:#60a5fa;white-space:nowrap;">
                    Nuevo contacto
                  </span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ══ MESSAGE SECTION ══ -->
        <tr>
          <td style="background:#0d0d0f;padding:24px 48px 0;">

            <p style="margin:0 0 14px;font-size:10px;font-weight:600;color:#374151;
                      letter-spacing:2px;text-transform:uppercase;">Mensaje</p>

            <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
                   style="background:#111318;border:1px solid #1e2330;border-radius:14px;
                          overflow:hidden;">
              <!-- Accent top line -->
              <tr>
                <td style="height:2px;background:linear-gradient(90deg,#2563eb,#60a5fa55,transparent);"></td>
              </tr>
              <tr>
                <td style="padding:24px 28px;">
                  <!-- Quote mark -->
                  <p style="margin:0 0 12px;font-size:32px;color:#1e3a5f;line-height:1;
                            font-family:Georgia,serif;">&ldquo;</p>
                  <p style="margin:0;font-size:15px;color:#cbd5e1;line-height:1.8;
                            white-space:pre-wrap;font-style:italic;">${safeMessage}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ══ META ROW ══ -->
        <tr>
          <td style="background:#0d0d0f;padding:20px 48px 0;">
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
                   style="background:#0f1117;border:1px solid #1a1f2e;border-radius:10px;">
              <tr>
                <!-- Fecha -->
                <td style="padding:14px 20px;border-right:1px solid #1a1f2e;" width="50%">
                  <p style="margin:0 0 3px;font-size:10px;color:#374151;letter-spacing:1.5px;
                            text-transform:uppercase;">Fecha</p>
                  <p style="margin:0;font-size:12px;color:#64748b;">${date}</p>
                </td>
                <!-- IP -->
                <td style="padding:14px 20px;" width="50%">
                  <p style="margin:0 0 3px;font-size:10px;color:#374151;letter-spacing:1.5px;
                            text-transform:uppercase;">IP de origen</p>
                  <p style="margin:0;font-size:12px;color:#64748b;font-family:monospace;">${ip}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ══ CTA ══ -->
        <tr>
          <td style="background:#0d0d0f;padding:28px 48px 0;">
            <table cellpadding="0" cellspacing="0" role="presentation">
              <tr>
                <td style="border-radius:10px;overflow:hidden;">
                  <a href="mailto:${email}?subject=Re%3A%20Tu%20mensaje%20en%20Morelo.Dev"
                     style="display:inline-block;background:linear-gradient(135deg,#1d4ed8,#2563eb);
                            color:#fff;font-size:14px;font-weight:600;text-decoration:none;
                            padding:14px 32px;border-radius:10px;letter-spacing:0.2px;">
                    Responder a ${name} →
                  </a>
                </td>
                <td style="padding-left:12px;">
                  <a href="https://morelodev-portfolio.vercel.app"
                     style="display:inline-block;background:#111318;border:1px solid #1e2330;
                            color:#94a3b8;font-size:13px;text-decoration:none;
                            padding:13px 24px;border-radius:10px;">
                    Ver portafolio
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ══ FOOTER ══ -->
        <tr>
          <td style="background:#0d0d0f;padding:36px 48px 0;">
            <div style="height:1px;background:linear-gradient(90deg,transparent,#1e2330,transparent);
                        margin-bottom:28px;"></div>

            <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
              <tr>
                <!-- Branding -->
                <td style="vertical-align:middle;">
                  <p style="margin:0;font-family:ui-monospace,monospace;font-size:14px;
                            font-weight:700;color:#1e293b;">
                    Morelo<span style="color:#2563eb;">.Dev</span>
                  </p>
                  <p style="margin:4px 0 0;font-size:11px;color:#374151;">
                    Jorge Andrés Morelo Hinestroza
                  </p>
                </td>

                <!-- Social links -->
                <td align="right" style="vertical-align:middle;">
                  <a href="https://github.com/Morelo-Dev"
                     style="display:inline-block;margin-left:10px;font-size:11px;
                            color:#374151;text-decoration:none;">GitHub</a>
                  <a href="https://linkedin.com/in/morelodev"
                     style="display:inline-block;margin-left:10px;font-size:11px;
                            color:#374151;text-decoration:none;">LinkedIn</a>
                </td>
              </tr>
            </table>

            <p style="margin:20px 0 0;font-size:10px;color:#1e2330;padding-bottom:32px;">
              Este correo fue generado automáticamente desde el formulario de contacto de
              morelodev-portfolio.vercel.app. No respondas directamente a este mensaje.
            </p>
          </td>
        </tr>

        <!-- ══ BOTTOM ACCENT BAR ══ -->
        <tr>
          <td style="height:3px;background:linear-gradient(90deg,transparent,#1d4ed8,#3b82f6,#1d4ed8,transparent);
                     border-radius:0 0 3px 3px;"></td>
        </tr>

      </table>
    </td></tr>
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
