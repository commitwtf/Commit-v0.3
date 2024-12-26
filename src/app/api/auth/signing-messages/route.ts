import { AuthResourceParams, SigningMessageScope } from '@/app/api/auth/signing-messages/types'
import { NextRequest, NextResponse } from 'next/server'
import { toHex } from 'viem'

export const GET = async (
  request: NextRequest,
  { params }: AuthResourceParams
): Promise<NextResponse> => {
  const searchParams = request.nextUrl.searchParams
  const scope = <SigningMessageScope | undefined>searchParams.get('scope')

  if (!scope)
    return new NextResponse(JSON.stringify({ message: 'scope is required' }), { status: 400 })

  if (!Object.values(SigningMessageScope).includes(scope))
    return new NextResponse(JSON.stringify({ message: 'invalid scope' }), { status: 400 })

  // TODO: add impl for case per case depending on scope provided

  const nonce = toHex(new Date().getTime() * Math.floor(Math.random() * 555))
  const message = `Sign this nonce to authenticate: ${nonce}`

  return new NextResponse(JSON.stringify({ message }, null, 2), {
    status: 200,
  })
}
