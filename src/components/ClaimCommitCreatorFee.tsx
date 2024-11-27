'use client'
import { useClaimCreatorFee, useIsCommitCreator } from '@/hooks/useCommit'
import { Button } from './ui'
import { useUpdateQueries } from '@/hooks/useUpdateQueries'

export function ClaimCommitCreatorFee({ commitId = '' }) {
  const isCreator = useIsCommitCreator(commitId)
  const { mutateAsync, isPending } = useClaimCreatorFee()
  const updateQueries = useUpdateQueries()

  if (!isCreator) return null

  return (
    <Button
      isLoading={isPending}
      onClick={() => mutateAsync({ commitId }).then(() => updateQueries(['commitments', commitId]))}
    >
      Claim Fee
    </Button>
  )
}
