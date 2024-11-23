'use client'

import { useState, useEffect } from 'react'
import { AlertCircle } from 'lucide-react'
import { CommitCard } from '@/components'
import { useWalletGuard } from '@/hooks/useWalletGuard'
import { useGetActiveCommitments } from '@/hooks/useCommit'
import { WalletError } from '@/components'

const HomePage = () => {
  const { error: walletError } = useWalletGuard()
  const commits = useGetActiveCommitments()

  // Helper function to format BigInt values
  const formatCommitment = (commit: any) => ({
    id: commit.id,
    title: commit.description,
    participants: Number(commit.participants),
    committedValue: commit.stakeAmount ? Number(commit.stakeAmount) / 1e18 : 0, // Convert from wei to ETH
    timeRemaining: commit.timeRemaining ? Number(commit.timeRemaining) : 0,
  })

  return (
    <main className='flex-1 overflow-y-auto'>
      <div className='max-w-7xl mx-auto p-6'>
        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-2xl font-semibold text-gray-900 dark:text-white'>Active Commits</h1>
          <div className='px-4 py-1.5 bg-[#DCDCDC] dark:bg-[#2A2A2A] rounded-full'>
            <span className='text-sm font-medium text-gray-900 dark:text-white'>
              Total Commits: {commits.length}
            </span>
          </div>
        </div>

        <WalletError error={walletError} />

        <div className='bg-blue-50 dark:bg-blue-950/50 rounded-lg p-4 mb-6'>
          <div className='flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400'>
            <AlertCircle className='w-4 h-4' />
            Participate in commits to earn rewards and climb the leaderboard!
          </div>
        </div>

        {commits.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {commits.map((commit) => (
              <CommitCard key={commit.id} {...formatCommitment(commit)} />
            ))}
          </div>
        ) : (
          <div className='text-center py-12'>
            <p className='text-gray-500 dark:text-gray-400'>
              No active commits found.
            </p>
          </div>
        )}
      </div>
    </main>
  )
}

export default HomePage