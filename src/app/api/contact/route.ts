import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'

const schema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  message: z.string().min(10).max(2000),
})

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY ?? 'placeholder')
  try {
    const body = await req.json()
    const { name, email, message } = schema.parse(body)

    await resend.emails.send({
      from: 'Portafolio <onboarding@resend.dev>',
      to: 'morelao.jm@gmail.com',
      subject: `Mensaje de ${name} — Portafolio`,
      replyTo: email,
      text: `Nombre: ${name}\nEmail: ${email}\n\n${message}`,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
