import { CommitmentResourceParams } from '@/app/api/commitments/types'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (
  request: NextRequest,
  { params }: CommitmentResourceParams
): Promise<NextResponse> => {
  return new NextResponse(JSON.stringify({ message: 'Not implemented' }, null, 2), {
    status: 501,
  })
}
