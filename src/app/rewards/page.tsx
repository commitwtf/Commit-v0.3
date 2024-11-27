'use client'

import { rewards } from '@/data/rewards'
import { usePhiCreds } from '@/hooks/usePhi'
import { Button, Progress } from '@/src/components'
<<<<<<< HEAD
import { Check, X, AlertCircle, ExternalLink } from 'lucide-react'
import Link from 'next/link'
=======
import { Check, X, AlertCircle } from 'lucide-react'
import { useAccount } from 'wagmi'
>>>>>>> 028712ebf87c1d8fdd3882e084c81c5858835fd3

const RewardsPage = () => {
  const { address } = useAccount()
  const phi = usePhiCreds(address)

  console.log(phi.data, phi.error, phi.failureReason)
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
            <div>
              <p className='mb-1'>
                For all three Commits you joined and completed during the Phi: Cyber Safari, you'll be eligible for $CYBER rewards. For a more detailed breakdown of the rewards, please{' '}
                <Link 
                  href="https://www.notion.so/buildoncyber/Commit-Rewards-Breakdown-1360c7ec751f80328b05c0379b8695ac"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium underline hover:text-blue-700 dark:hover:text-blue-300 inline-flex items-center"
                >
                  check here
                  <ExternalLink className="w-3 h-3 ml-1" />
                </Link>.
                </p>
                <p className='mt-1 font-medium'>
                One lucky player who completes the Ultimate-level Commit will take home $5K worth of CYBER. Will you be the lucky one, anon?
                </p>
                </div>
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
                className={`absolute top-4 right-4 text-xs font-medium px-2 py-1 rounded-full ${
                  reward.status === 'Won'
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
                  className={`h-2 ${
                    reward.status === 'Won'
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
      </div >
    </main >
  )
}

export default RewardsPage
