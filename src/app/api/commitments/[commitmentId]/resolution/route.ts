import { CommitmentResourceParams } from '@/app/api/commitments/types'
import { NextRequest, NextResponse } from 'next/server'
import { merkleTreeService, participantService } from '@/app/api/commitments/service'
import { db } from '@/database/kysely'
import { getAddress } from 'viem'

export const POST = async (req: NextRequest, { params }: CommitmentResourceParams) => {
  const { commitmentId } = await params

  if (!commitmentId)
    return new NextResponse(JSON.stringify({ message: 'commitmentId is required' }), {
      status: 400,
    })

  const participants = await participantService.getParticipants(commitmentId)
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
