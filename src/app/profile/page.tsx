'use client'

import { CommitCard } from '@/src/components'
import { AlertCircle } from 'lucide-react'
import { useJoinedCommitments, useUserCommitments } from '@/hooks/useCommit'
import { useAccount } from 'wagmi'
import { cva } from 'class-variance-authority'
import { ComponentProps, PropsWithChildren } from 'react'
import { cn } from '@/utils'

const ProfilePage = () => {
  const account = useAccount()
  const { data: userCommits = [] } = useUserCommitments(account.address)
  const { data: joinedCommits = [] } = useJoinedCommitments(account.address)

  return (
    <main className='flex-1 overflow-y-auto'>
      <div className='max-w-7xl mx-auto p-6'>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Joined Commits</h1>
        {joinedCommits?.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {joinedCommits.map((commit) => (
              <CommitCard key={commit.id} {...commit} />
            ))}
          </div>
        ) : (
          <div className='bg-blue-50 dark:bg-blue-950/50 rounded-lg p-4'>
            <div className='flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400'>
              <AlertCircle className='w-4 h-4' />
              You haven&apos;t joined any commits yet. Explore active commits and start earning
              rewards!
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

export default ProfilePage