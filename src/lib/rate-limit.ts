// Rate limiter en memoria — suficiente para un formulario de contacto
// Cada entrada: { count, resetAt }
const store = new Map<string, { count: number; resetAt: number }>()

const WINDOW_MS = 60 * 60 * 1000 // 1 hora
const MAX_REQUESTS = 3 // máximo 3 envíos por IP por hora

export function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const entry = store.get(ip)

  if (!entry || now > entry.resetAt) {
    store.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return { allowed: true, remaining: MAX_REQUESTS - 1 }
  }

  if (entry.count >= MAX_REQUESTS) {
    return { allowed: false, remaining: 0 }
  }

  entry.count++
  return { allowed: true, remaining: MAX_REQUESTS - entry.count }
}
