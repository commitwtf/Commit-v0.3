'use client'
import { useCancelCommitment, useIsCommitCreator } from '@/hooks/useCommit'
import { Button } from './ui'

export function CancelCommit({ commitId = '' }) {
  const isCreator = useIsCommitCreator(commitId)
  const { mutate } = useCancelCommitment()

  if (!isCreator) return null

  return <Button onClick={() => mutate({ commitId })}>Cancel</Button>
}
