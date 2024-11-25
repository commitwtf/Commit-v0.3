import { CommitmentDetails } from '@/hooks/useCommit'
import { formatSecondsToDays } from '@/utils/date'
import { Users, Timer } from 'lucide-react'
import Link from 'next/link'

export function CommitCard({
  id,
  description,
  participants,
  stakeAmount,
  timeRemaining,
}: CommitmentDetails) {
  return (
    <Link href={`/commit/${id}`}>
      <div className='bg-[#DCDCDC] dark:bg-[#2A2A2A] rounded-xl p-6 hover:shadow-md transition-shadow duration-200'>
        <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>{description}</h3>

        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center gap-2 text-gray-600 dark:text-gray-400'>
            <Users className='w-4 h-4' />
            <span className='text-sm'>{participants?.length} participants</span>
          </div>
          <div className='text-gray-600 dark:text-gray-400'>
            <span className='text-sm font-medium'>
              {stakeAmount?.formatted} {stakeAmount?.token} stake
            </span>
          </div>
        </div>

        <div className='flex items-center gap-2 text-gray-600 dark:text-gray-400'>
          <Timer className='w-4 h-4' />
          <span className='text-sm'>{formatSecondsToDays(timeRemaining)} left</span>
        </div>
      </div>
    </Link>
  )
}
