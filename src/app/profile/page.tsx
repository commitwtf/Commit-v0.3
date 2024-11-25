'use client'

import { useState } from 'react'
import { CommitCard } from '@/src/components'
import { AlertCircle } from 'lucide-react'

interface Commit {
  id: number
  title: string
  participants: number
  timeRemaining: string
}

const ProfilePage = () => {
  const [userCommits, setUserCommits] = useState<Commit[]>([])

  return (
    <main className='flex-1 overflow-y-auto'>
      <div className='max-w-7xl mx-auto p-6'>
        <h1 className='text-3xl font-bold mb-6 text-gray-900 dark:text-white'>Your Commits</h1>

        {userCommits.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {userCommits.map((commit) => (
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
