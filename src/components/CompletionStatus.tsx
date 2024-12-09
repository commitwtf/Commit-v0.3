'use client'
import { Address } from 'viem'
import { usePhiCreds } from '@/hooks/usePhi'
import { useParticipants } from '@/hooks/useCommit'

export function CompletionStatus({
  commitId,
  requiredCredentials,
  totalParticipants,
}: {
  commitId: string
  requiredCredentials: number
  totalParticipants: number
}) {
  const { data: participants } = useParticipants(commitId)
  const {
    data: [completed],
    isLoading,
  } = usePhiCreds(participants as Address[] | undefined, requiredCredentials)

  if (isLoading) {
    return (
      <div className='flex items-center gap-2'>
        <div>
          <div className='text-sm text-gray-500 dark:text-gray-400'>Completed</div>
          <div className='text-gray-900 dark:text-white animate-pulse'>Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className='flex items-center gap-2'>
      <div>
        <div className='text-sm text-gray-500 dark:text-gray-400'>Completed</div>
        <div className='text-gray-900 dark:text-white'>{`${completed} / ${totalParticipants}`}</div>
      </div>
    </div>
  )
}
