import { CommitmentResourceParams } from '@/app/api/commitments/types'
import { NextRequest, NextResponse } from 'next/server'
import { participants } from '@/app/api/commitments/constants'
import merkleTreeService from '@/app/api/commitments/service'

// TODO: ideally should fetch all participants from the subgraph that relates to commitmentId
export const POST = async (req: NextRequest, { params }: CommitmentResourceParams) => {
  const { commitmentId } = await params

  if (!commitmentId)
    return new NextResponse(JSON.stringify({ message: 'commitmentId is required' }), {
      status: 400,
    })

  const tree = merkleTreeService.createMerkleTree(commitmentId, participants)

  return new NextResponse(JSON.stringify({ root: tree.root }, null, 2), { status: 200 })
}
