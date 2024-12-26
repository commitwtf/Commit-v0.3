import { participants } from '@/app/api/commitments/constants'
import { CommitmentResourceParams } from '@/app/api/commitments/types'
import { NextRequest, NextResponse } from 'next/server'
import merkleTreeService from '@/app/api/commitments/service'
import { Address, keccak256, toHex } from 'viem'

// TODO: add signature verification & attempt recover the account from the signature
export const GET = async (
  request: NextRequest,
  { params }: CommitmentResourceParams
): Promise<NextResponse> => {
  const { commitmentId } = await params

  const searchParams = request.nextUrl.searchParams
  const account = <Address>searchParams.get('account')

  if (!commitmentId)
    return new NextResponse(JSON.stringify({ message: 'commitmentId is required' }), {
      status: 400,
    })

  if (!account)
    return new NextResponse(JSON.stringify({ message: 'account is required in URL parameters' }), {
      status: 400,
    })

  const tree = merkleTreeService.createMerkleTree(commitmentId, participants)

  return new NextResponse(
    JSON.stringify({ proof: tree.getProof([keccak256(account), keccak256(toHex(commitmentId))]) }),
    {
      status: 200,
    }
  )
}
