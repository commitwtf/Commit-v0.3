'use client'
import { useCancelCommitment, useIsCommitCreator } from '@/hooks/useCommit'
import { Button } from './ui'
import { useQueryClient } from '@tanstack/react-query'

export function CancelCommit({ commitId = '' }) {
  const isCreator = useIsCommitCreator(commitId)
  const { mutateAsync, isPending } = useCancelCommitment()
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
      Cancel
    </Button>
  )
}
