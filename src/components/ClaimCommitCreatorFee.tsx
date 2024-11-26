'use client'
import { useClaimCreatorFee, useGetCommitmentDetails, useIsCommitCreator } from '@/hooks/useCommit'
import { Button } from './ui'

export function ClaimCommitCreatorFee({ commitId = '' }) {
  const isCreator = useIsCommitCreator(commitId)
  const { mutateAsync, isPending } = useClaimCreatorFee()
  const { refetch } = useGetCommitmentDetails(commitId)

  if (!isCreator) return null

  return (
    <Button isLoading={isPending} onClick={() => mutateAsync({ commitId }).then(() => refetch())}>
      Claim Fee
    </Button>
  )
}
