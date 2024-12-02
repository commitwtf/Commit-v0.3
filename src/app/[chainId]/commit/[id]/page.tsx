'use client'
import { TokenAmount } from '@/components/TokenAmount'
import {
  CommitmentStatus,
  useGetCommitmentDeadlines,
  useGetCommitmentDetails,
} from '@/hooks/useCommit'
import { formatSecondsToDays } from '@/utils/date'
import { use } from 'react'
import { User, Users, Clock, AlertCircle, Coins, Wallet } from 'lucide-react'
import { getAddress } from 'viem'
import { ResolveCommit } from '@/components/ResolveCommit'
import { CancelCommit } from '@/components/CancelCommit'

import { ClaimCommitCreatorFee } from '@/components/ClaimCommitCreatorFee'
import { ClaimCommitRewards } from '@/components/ClaimCommitRewards'
import { EnsName } from '@/components/ENS'
import { rewards } from '@/data/rewards'
import { JoinCommitmentButton } from '@/components/JoinCommit'
import { notFound } from 'next/navigation'

import { EnsureCorrectNetwork } from '@/components/EnsureCorrectNetwork'
import { Markdown } from '@/components/ui/markdown'

const descriptions = {
  '6': rewards[0].description,
  '7': rewards[1].description,
  '8': rewards[2].description,
  '13': `This commit is for the true POWER COMMITTERS — the COMMIT OF ALL COMMITS.

It's time to commit and unleash your potential. Become a LEGENDARY COMMITTER by taking the ULTIMATE CHALLENGE — committing to completing 69 commits within a year since Commit's launch (Nov 27, 2024). Don't hesitate, don't second-guess. Commit to something.`,
}
function getDescription(id: string) {
  return descriptions[id as keyof typeof descriptions]
}
export default function CommitmentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { data, isError, isLoading } = useGetCommitmentDetails(id)
  if (isLoading) {
    return (
      <main className='flex-1 overflow-y-auto'>
        <div className='flex items-center justify-center min-h-[calc(100vh-4rem)]'>
          <div className='size-6 rounded-full border-2 border-neutral-800 dark:border-white border-t-transparent animate-spin' />
        </div>
      </main>
    )
  }
  if (!data) return notFound()
  if (isError || !data) {
    return (
      <main className='flex-1 overflow-y-auto'>
        <div className='flex items-center justify-center min-h-[calc(100vh-4rem)] text-red-500'>
          <AlertCircle className='w-5 h-5 mr-2' />
          Error loading commitment
        </div>
      </main>
    )
  }

  return (
    <main className='flex-1 overflow-y-auto'>
      <div className='max-w-2xl mx-auto px-4 py-6 space-y-8'>
        <div className='flex justify-between items-center'>
          <h1 className='text-2xl font-semibold text-gray-900 dark:text-white'>Commit Details</h1>
          <div className='flex items-center gap-2'>
            <div className='px-4 py-1.5 bg-[#DCDCDC] dark:bg-[#2A2A2A] rounded-full'>
              <span className='text-sm font-medium text-gray-900 dark:text-white'>
                Commit #{id}
              </span>
            </div>
            <EnsureCorrectNetwork>
              {data?.participants.length < 2 && <CancelCommit commitId={data?.id} />}
              <ClaimCommitCreatorFee commitId={data?.id} />
              <ClaimCommitRewards commitId={data?.id} />
            </EnsureCorrectNetwork>
          </div>
        </div>

        <div className='bg-[#DCDCDC] dark:bg-[#2A2A2A] rounded-xl p-6'>
          <div className='flex items-center justify-between mb-6'>
            <h2 className='text-xl font-semibold text-gray-900 dark:text-white'>
              {data.description}
            </h2>
            <span className='px-2.5 py-0.5 text-sm bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full'>
              {data.status}
            </span>
          </div>

          <div className='grid grid-cols-2 gap-6 mb-6'>
            <div className='flex items-center gap-2'>
              <User className='h-5 w-5 text-gray-500 dark:text-gray-400' />
              <div>
                <div className='text-sm text-gray-500 dark:text-gray-400'>Creator</div>
                <div className='font-mono text-sm text-gray-900 dark:text-white'>
                  <EnsName address={data.creator?.address} />
                </div>
              </div>
            </div>

            <div className='flex items-center gap-2'>
              <Users className='h-5 w-5 text-gray-500 dark:text-gray-400' />
              <div>
                <div className='text-sm text-gray-500 dark:text-gray-400'>Participants</div>
                <div className='text-gray-900 dark:text-white'>{data.participants?.length}</div>
              </div>
            </div>

            <div className='flex items-center gap-2'>
              <Wallet className='h-5 w-5 text-gray-500 dark:text-gray-400' />
              <div>
                <div className='text-sm text-gray-500 dark:text-gray-400'>Stake Amount</div>
                <span className='text-gray-900 dark:text-white'>
                  <TokenAmount {...data.stakeAmount} />
                </span>
                <div className='text-xs text-gray-500 dark:text-gray-400 mt-0.5'>
                  +0.0002 ETH protocol fee
                </div>
              </div>
            </div>

            <div className='flex items-center gap-2'>
              <Coins className='h-5 w-5 text-gray-500 dark:text-gray-400' />
              <div>
                <div className='text-sm text-gray-500 dark:text-gray-400'>Creator Fee</div>
                <span className='text-gray-900 dark:text-white'>
                  <TokenAmount {...data.creatorFee} />
                </span>
              </div>
            </div>
          </div>

          <div className='mb-6'>
            <h2 className='text-base font-medium mb-1 text-gray-900 dark:text-white'>
              Description
            </h2>
            <Markdown>{getDescription(id)}</Markdown>
            <div className='text-sm text-gray-600 dark:text-gray-400'></div>
          </div>

          <div className='mb-6'>
            <div className='flex items-center gap-2 mb-2'>
              <Clock className='h-5 w-5 text-gray-500 dark:text-gray-400' />
              <h2 className='text-base font-medium text-gray-900 dark:text-white'>Deadline</h2>
            </div>
            <TimeRemaining commitId={id} />
          </div>
          {(() => {
            switch (data.status) {
              case CommitmentStatus.Created: {
                return (
                  <EnsureCorrectNetwork>
                    <JoinCommitmentButton
                      commitId={id}
                      participants={data.participants?.map((p) => getAddress(p.address))}
                      stakeAmount={data.stakeAmount}
                      creatorFee={data.creatorFee}
                    />
                  </EnsureCorrectNetwork>
                )
              }
              // TODO: Add actions Resolved and Cancelled
              case CommitmentStatus.Resolved: {
                return <pre>Resolved</pre>
              }
              case CommitmentStatus.Cancelled: {
                return <pre>Commit Cancelled</pre>
              }
            }
          })()}
        </div>
        <ResolveCommit commitId={data?.id} />
      </div>
    </main>
  )
}

function TimeRemaining({ commitId = '' }) {
  const { data: deadlines } = useGetCommitmentDeadlines(commitId)
  if (!deadlines?.length) return null

  function hasPassed(date: number) {
    return Date.now() > date
  }

  return (
    <div className='grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400'>
      <div>
        <span className='text-gray-500 dark:text-gray-400'>Join:</span>{' '}
        {hasPassed(deadlines[0]) ? 'waiting to resolve winner' : formatSecondsToDays(deadlines[0])}
      </div>
      <div>
        <span className='text-gray-500 dark:text-gray-400'>Fulfill:</span>{' '}
        {hasPassed(deadlines[1]) ? 'waiting to resolve winner' : formatSecondsToDays(deadlines[1])}
      </div>
    </div>
  )
}
