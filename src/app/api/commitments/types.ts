import { Address } from 'viem'

export interface CommitmentResourceParams {
  params: Promise<
    Partial<{
      commitmentId: string
      account?: Address
      attestees?: Address[]
    }>
  >
}

export interface Commitment {
  id: string
  participantCount: string
  status: string
  creator: Creator
  participants: Participant[]
  winners: Winner[]
}

export interface Creator {
  id: Address
  address: Address
}

export interface Participant {
  id: `${string}-${Address}`
}

export interface Winner {
  id: `${string}-${Address}`
}
