import { Address } from 'viem'

export interface CommitmentResourceParams {
  params: Promise<
    Partial<{
      commitmentId: string
      account: Address
    }>
  >
}
