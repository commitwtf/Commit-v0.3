'use client'
import { useQueryClient } from '@tanstack/react-query'
import { useClaimCreatorFee, useIsCommitCreator } from '@/hooks/useCommit'
import { Button } from './ui'

export function ClaimCommitCreatorFee({ commitId = '' }) {
  const isCreator = useIsCommitCreator(commitId)
  const { mutateAsync, isPending } = useClaimCreatorFee()
  const queryClient = useQueryClient()

  if (!isCreator) return null

  return (
    <Button
      isLoading={isPending}
      onClick={() =>
        mutateAsync({ commitId }).then(() =>
          queryClient.invalidateQueries({ queryKey: ['commitments', commitId] })
        )
      }
    >
      Claim Fee
    </Button>
  )
}
