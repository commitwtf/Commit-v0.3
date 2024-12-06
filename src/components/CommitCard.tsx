'use client'
import { CommitmentDetails, useGetCommitmentDeadlines } from '@/hooks/useCommit'
import { formatSecondsToDays } from '@/utils/date'
import { Users, Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { TokenAmount } from './TokenAmount'
import { cn } from '@/utils'

export function CommitCard({
  id,
  description,
  participantCount,
  participants,
  stakeAmount,
  isLoading,
}: Partial<CommitmentDetails> & { isLoading?: boolean }) {
  return (
    <Link href={`/commit/${id}`} className={cn('block', { ['animate-pulse']: isLoading })}>
      <div className='bg-[#DCDCDC] dark:bg-[#2A2A2A] rounded-xl p-4 hover:shadow-md transition-all duration-200'>
        <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2'>
          {description}
        </h3>
        <div className='flex items-center justify-between mb-3'>
          <div className='flex items-center gap-2 text-gray-600 dark:text-gray-400'>
            <Users className='w-4 h-4' />
            <span className='text-sm'>{participantCount} participants</span>
          </div>
          <div className='px-2.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded-full'>
            <span className='text-sm font-medium text-gray-800 dark:text-gray-200'>
              <TokenAmount {...stakeAmount} />
            </span>
          </div>
        </div>
        <div className='flex items-center justify-between text-gray-600 dark:text-gray-400'>
          <TimeRemaining commitId={id!} />
          <ArrowRight className='w-4 h-4' />
        </div>
      </div>
    </Link>
  )
}

function TimeRemaining({ commitId }: { commitId: string }) {
  const { data: deadlines } = useGetCommitmentDeadlines(String(commitId))
  if (!deadlines?.length) return null
  return (
    <div className='flex items-center gap-2 text-sm'>
      <Clock className='w-4 h-4' />
      <span>{formatSecondsToDays(deadlines[0])} left</span>
    </div>
  )
}
