import authService from '@/app/api/auth/service'
import { commitmentService, participantService } from '@/app/api/commitments/service'
import { CommitmentResourceParams } from '@/app/api/commitments/types'
import { db } from '@/database/kysely'
import { NextRequest, NextResponse } from 'next/server'
import { Address, getAddress, Hash } from 'viem'

interface Payload {
  auth: { message: string; signature: Hash }
  attester: Address
  attestees: Address[]
}

export const POST = async (
  request: NextRequest,
  { params }: CommitmentResourceParams
): Promise<NextResponse> => {
  const { commitmentId } = await params

  const account = <Address>request.headers.get('x-account')
  const {
    auth: { message, signature },
    attester,
    attestees,
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
  if (!attester || !attestees)
    return new NextResponse(JSON.stringify({ message: 'attester and attestees are required' }), {
      status: 400,
    })

  const commitment = await commitmentService.getCommitment(commitmentId)
  if (!commitment)
    return new NextResponse(JSON.stringify({ message: 'commitment does not exist' }), {
      status: 404,
    })
  if (commitment.creator.address.toLowerCase() !== recoveredAddr.toLowerCase())
    return new NextResponse(
      JSON.stringify({ message: 'attester is not the creator of the commitment' }),
      { status: 403 }
    )

  const joinedParticipants = participantService.mapParticipants(commitment.participants)
  const validParticipants = attestees.filter((attestee) =>
    joinedParticipants.includes(getAddress(attestee))
  )
  const rejectedParticipants = attestees.filter(
    (attestee) => !validParticipants.includes(getAddress(attestee))
  )

  if (validParticipants.length === 0) {
    return new NextResponse(JSON.stringify({ message: 'no valid participants to attest' }), {
      status: 400,
    })
  }

  try {
    await db
      .insertInto('attestations')
      .values(
        validParticipants.map((participant) => ({
          commitment_id: commitmentId,
          participant,
          attester,
        }))
      )
      .execute()

    return new NextResponse(
      JSON.stringify({
        message: 'attested',
        attestedParticipants: validParticipants,
        rejectedParticipants,
      }),
      {
        status: 200,
      }
    )
  } catch (error) {
    console.error(error)

    return new NextResponse(JSON.stringify({ message: 'attestation failed' }, null, 2), {
      status: 500,
    })
  }
}

export const GET = async (
  request: NextRequest,
  { params }: CommitmentResourceParams
): Promise<NextResponse> => {
  const { commitmentId } = await params
  const searchParams = request.nextUrl.searchParams

  let attestees: string | string[] | null | undefined = searchParams.get('attestees')
  if (!attestees)
    return new NextResponse(JSON.stringify({ message: 'attestees is required' }), { status: 400 })

  try {
    attestees = attestees?.split(',').map((attestee) => attestee)

    console.log('attestees:', attestees)

    if (!commitmentId)
      return new NextResponse(JSON.stringify({ message: 'commitmentId is required' }), {
        status: 400,
      })

    const attestations = await db
      .selectFrom('attestations')
      .select(['commitment_id', 'participant'])
      .where('participant', 'in', attestees)
      .execute()

    return new NextResponse(JSON.stringify(attestations, null, 2), {
      status: 200,
    })
  } catch (error) {
    console.error('error:', error)
    return new NextResponse(JSON.stringify({ message: 'attestation retrieval failed' }, null, 2), {
      status: 500,
    })
  }
}
