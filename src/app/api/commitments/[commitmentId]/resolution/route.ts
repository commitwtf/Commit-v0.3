import { CommitmentResourceParams } from '@/app/api/commitments/types'
import { NextRequest, NextResponse } from 'next/server'
import {
  commitmentService,
  merkleTreeService,
  participantService,
} from '@/app/api/commitments/service'
import { db } from '@/database/kysely'
import { Address, getAddress, Hash } from 'viem'
import authService from '@/app/api/auth/service'

interface Payload {
  auth: { message: string; signature: Hash }
}

export const POST = async (request: NextRequest, { params }: CommitmentResourceParams) => {
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

  const { verified, recoveredAddr } = await authService.verify(account, message, signature)
  if (!verified) {
    return new NextResponse(JSON.stringify({ message: 'signature verification failed' }), {
      status: 401,
    })
  }

  if (!commitmentId)
    return new NextResponse(JSON.stringify({ message: 'commitmentId is required' }), {
      status: 400,
    })

  const commitment = await commitmentService.getCommitment(commitmentId)
  if (!commitment)
    return new NextResponse(JSON.stringify({ message: 'commitment does not exist' }), {
      status: 404,
    })
  if (commitment.creator.address.toLowerCase() !== recoveredAddr.toLowerCase())
    return new NextResponse(
      JSON.stringify({ message: 'signature does not belong to the creator of the commitment' }),
      { status: 403 }
    )

  const participants = participantService.mapParticipants(commitment.participants)
  if (!participants)
    return new NextResponse(JSON.stringify({ message: 'participants not found' }), { status: 404 })

  const attestations = await db
    .selectFrom('attestations')
    .select(['participant'])
    .where('commitment_id', '=', commitmentId)
    .execute()

  const winners = participants.filter((participant) =>
    attestations.includes({ participant: getAddress(participant) })
  )

  const tree = merkleTreeService.createMerkleTree(commitmentId, winners)

  return new NextResponse(JSON.stringify({ root: tree.root }, null, 2), {
    status: 200,
  })
}
