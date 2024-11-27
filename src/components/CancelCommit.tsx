'use client'
import { useCancelCommitment, useIsCommitCreator } from '@/hooks/useCommit'
import { Button } from './ui'
import { useUpdateQueries } from '@/hooks/useUpdateQueries'

export function CancelCommit({ commitId = '' }) {
  const isCreator = useIsCommitCreator(commitId)
  const { mutateAsync, isPending } = useCancelCommitment()
  const updateQueries = useUpdateQueries()
  if (!isCreator) return null

  return (
    <Button
      isLoading={isPending}
      onClick={() => mutateAsync({ commitId }).then(() => updateQueries(['commitments', commitId]))}
    >
      Cancel
    </Button>
  )
}
