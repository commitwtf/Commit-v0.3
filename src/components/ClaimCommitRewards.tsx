'use client'
import { useClaimRewards, useGetCommitmentDetails } from '@/hooks/useCommit'
import { Button } from './ui'
import { useAccount } from 'wagmi'
import { getAddress } from 'viem'
import { useUpdateQueries } from '@/hooks/useUpdateQueries'

export function ClaimCommitRewards({ commitId = '' }) {
  const { address } = useAccount()
  const { mutateAsync, isPending } = useClaimRewards()
  const { data } = useGetCommitmentDetails(commitId)
  const updateQueries = useUpdateQueries()

  // Only winners can see the Claim button
  const winners = data?.winners.map((p) => getAddress(p.address))
  if (!address || !winners?.includes(getAddress(address))) return null

  return (
    <Button
      isLoading={isPending}
      onClick={() => mutateAsync({ commitId }).then(() => updateQueries(['commitments', commitId]))}
    >
      Claim Rewards
    </Button>
  )
}
