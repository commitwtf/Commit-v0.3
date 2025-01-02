import { CommitmentResourceParams } from '@/app/api/commitments/types'
import { NextRequest, NextResponse } from 'next/server'
import { merkleTreeService, participantService } from '@/app/api/commitments/service'
import { Address, Hash, keccak256, toHex } from 'viem'
import authService from '@/app/api/auth/service'

interface Payload {
  auth: { message: string; signature: Hash }
}

export const POST = async (
  request: NextRequest,
  { params }: CommitmentResourceParams
): Promise<NextResponse> => {
  const { commitmentId } = await params

  const account = <Address>request.headers.get('x-account')
  const {
    auth: { message, signature },
  } = <Payload>await request.json()

  if (!signature || !message)
    return new NextResponse(
      JSON.stringify({ message: 'signature and message is required in payload' }),
      {
        status: 400,
      }
    )
  if (!account)
    return new NextResponse(JSON.stringify({ message: 'account is required in URL parameters' }), {
      status: 400,
    })
  if (!commitmentId)
    return new NextResponse(JSON.stringify({ message: 'commitmentId is required' }), {
      status: 400,
    })

  const { verified } = await authService.verify(account, message, signature)
  if (!verified) {
    return new NextResponse(JSON.stringify({ message: 'signature verification failed' }), {
      status: 401,
    })
  }

  const participants = await participantService.getParticipants(commitmentId)
  if (!participants)
    return new NextResponse(JSON.stringify({ message: 'participants not found' }), { status: 404 })

  const tree = merkleTreeService.createMerkleTree(commitmentId, participants)

  return new NextResponse(
    JSON.stringify({
      // TODO: finalize, should be aligned with SC leaf hashing
      proof: tree.getProof([keccak256(account), keccak256(toHex(commitmentId))]),
    }),
    {
      status: 200,
    }
  )
}
