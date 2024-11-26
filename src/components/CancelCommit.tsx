'use client'
import { useCancelCommitment, useIsCommitCreator } from '@/hooks/useCommit'
import { Button } from './ui'

export function CancelCommit({ commitId = '' }) {
  const isCreator = useIsCommitCreator(commitId)
  const { mutate, isPending } = useCancelCommitment()

  if (!isCreator) return null

  return (
    <Button isLoading={isPending} onClick={() => mutate({ commitId })}>
      Cancel
    </Button>
  )
}
