import type { NextRequest } from 'next/server'

export function GET(req: NextRequest) {
  return new Response(JSON.stringify({ message: 'ok' }), { status: 200 })
}
