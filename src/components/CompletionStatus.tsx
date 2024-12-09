'use client'
import { Address } from 'viem'
import { usePhiCreds } from '@/hooks/usePhi'

export function CompletionStatus({
  participants,
  requiredCredentials,
  totalParticipants,
}: {
  participants: Address[]
  requiredCredentials: number
  totalParticipants: number
}) {
  const { data, isPending } = usePhiCreds(participants, requiredCredentials)
  const completed = data?.[0] ?? '?'
  if (isPending) {
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
