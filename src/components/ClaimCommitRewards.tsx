'use client'
import { useClaimRewards, useGetCommitmentDetails } from '@/hooks/useCommit'
import { Button } from './ui'
import { useAccount } from 'wagmi'
import { getAddress } from 'viem'

export function ClaimCommitRewards({ commitId = '' }) {
  const { address } = useAccount()
  const { mutateAsync, isPending } = useClaimRewards()
  const { data, refetch } = useGetCommitmentDetails(commitId)

  // Only winners can see the Claim button
  const winners = data?.winners.map((p) => p.address)
  if (!address || !winners?.includes(getAddress(address))) return null

  return (
    <Button isLoading={isPending} onClick={() => mutateAsync({ commitId }).then(() => refetch())}>
      Claim Rewards
    </Button>
  )
}
