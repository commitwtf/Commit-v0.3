'use client'

import { Button, Progress } from '@/src/components'
import { Check, X, AlertCircle } from 'lucide-react'

const RewardsPage = () => {
  const rewards = [
    {
      name: 'Basic Level Commit',
      description: 'Collect a minimum of 2 Creds from the Phi: Cyber Safari campaign',
      tokens: 1385,
      progress: 0,
      status: 'Not Eligible',
    },
    {
      name: 'Medium Level Commit',
      description: 'Collect a minimum of 4 Creds from the Phi: Cyber Safari campaign',
      tokens: 4155,
      progress: 0,
      status: 'Not Eligible',
    },
    {
      name: 'Ultimate Level Commit',
      description: 'Collect all 8 Creds from the Phi: Cyber Safari campaign',
      tokens: 8310,
      progress: 0,
      status: 'Not Eligible',
    },
  ]

  return (
    <main className='flex-1 overflow-y-auto'>
      <div className='max-w-7xl mx-auto p-6'>
        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-2xl font-semibold text-gray-900 dark:text-white'>Rewards</h1>
          <div className='px-4 py-1.5 bg-[#DCDCDC] dark:bg-[#2A2A2A] rounded-full'>
            <span className='text-sm font-medium text-gray-900 dark:text-white'>
              Total Rewards:{' '}
              {rewards.reduce((acc, reward) => acc + reward.tokens, 0).toLocaleString()} $CYBER
            </span>
          </div>
        </div>

        <div className='bg-blue-50 dark:bg-blue-950/50 rounded-lg p-4 mb-6'>
          <div className='flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400'>
            <AlertCircle className='w-4 h-4' />
            Winners for each reward tier are chosen randomly from the set of eligible commit
            winners.
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {rewards.map((reward, index) => (
            <div key={index} className='relative bg-[#DCDCDC] dark:bg-[#2A2A2A] rounded-xl p-6'>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
                {reward.name}
              </h3>
              <p className='text-gray-600 dark:text-gray-400 text-sm mb-4'>{reward.description}</p>

              <span
                className={`absolute top-4 right-4 text-xs font-medium px-2 py-1 rounded-full ${reward.status === 'Won'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                    : reward.status === 'In Progress'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
                  }`}
              >
                {reward.status}
              </span>

              <div className='mb-4'>
                <span className='text-2xl font-bold text-gray-900 dark:text-white'>
                  {reward.tokens.toLocaleString()} $CYBER
                </span>
              </div>

              <div className='space-y-2 mb-4'>
                <div className='flex items-center justify-between text-sm text-gray-600 dark:text-gray-400'>
                  <span>Progress: {reward.progress}%</span>
                </div>
                <Progress
                  value={reward.progress}
                  className={`h-2 ${reward.status === 'Won'
                      ? 'bg-gray-100 dark:bg-gray-700 [&>div]:bg-black dark:[&>div]:bg-white'
                      : 'bg-gray-100 dark:bg-gray-700 [&>div]:bg-gray-300 dark:[&>div]:bg-gray-600'
                    }`}
                />
              </div>

              <Button
                className='w-full bg-[#CECECE] text-gray-900 hover:bg-[#BEBEBE]'
                variant={reward.status === 'Won' ? 'default' : 'outline'}
                disabled={reward.status !== 'Won'}
              >
                {reward.status === 'Won' ? (
                  <>
                    <Check className='w-4 h-4 mr-2' />
                    Claim Reward
                  </>
                ) : (
                  <>
                    <X className='w-4 h-4 mr-2' />
                    Not Claimable
                  </>
                )}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default RewardsPage
