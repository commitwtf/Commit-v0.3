import { CommitmentResourceParams } from '@/app/api/commitments/types'
import { NextRequest, NextResponse } from 'next/server'
import { merkleTreeService, participantService } from '@/app/api/commitments/service'

export const POST = async (req: NextRequest, { params }: CommitmentResourceParams) => {
  const { commitmentId } = await params

  if (!commitmentId)
    return new NextResponse(JSON.stringify({ message: 'commitmentId is required' }), {
      status: 400,
    })

  const participants = await participantService.getParticipants(commitmentId)
  if (!participants)
    return new NextResponse(JSON.stringify({ message: 'participants not found' }), { status: 404 })

  // TODO: step 1: validate each participants if they are a winner and filter out participants array
  // TODO: step 2: should then construct the tree with only the filtered participants by winner

  const tree = merkleTreeService.createMerkleTree(commitmentId, participants)

  return new NextResponse(JSON.stringify({ root: tree.root }, null, 2), {
    status: 200,
  })
}
