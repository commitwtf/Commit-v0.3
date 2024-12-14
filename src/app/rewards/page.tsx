'use client'

import { Reward, rewards } from '@/data/rewards'
import { useGetCommitmentDetails } from '@/hooks/useCommit'
import { usePhiCreds } from '@/hooks/usePhi'
import { Button, Progress } from '@/src/components'
import { Check, X, AlertCircle, ExternalLink, Users, Gift } from 'lucide-react'
import Link from 'next/link'
import { useAccount } from 'wagmi'

const RewardsPage = () => {
  const { address } = useAccount()
  const phi = usePhiCreds(address ? [address] : undefined)

  console.log(phi.data, phi.error, phi.failureReason)

  const creds = (phi.data ?? []) as number[][]
  return (
    <main className='flex-1 overflow-y-auto'>
      <div className='max-w-7xl mx-auto p-6'>
        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-2xl font-semibold text-gray-900 dark:text-white'>Rewards</h1>
          <div className='px-4 py-1.5 bg-[#DCDCDC] dark:bg-[#2A2A2A] rounded-full'>
            <span className='text-sm font-medium text-gray-900 dark:text-white'>
              Total Rewards:{' '}
              {/*rewards.reduce((acc, reward) => acc + reward.tokens, 0).toLocaleString() */} 13,850
              $CYBER
            </span>
          </div>
        </div>

        <div className='bg-blue-50 dark:bg-blue-950/50 rounded-lg p-4 mb-6'>
          <div className='flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400'>
            <AlertCircle className='w-4 h-4' />
            <div>
              <p className='mb-1'>
                For any commit that's completed before Dec 07, 2024, 8pm GMT+8, your rewards are now available on{' '}
                <Link
                  href=' https://app.galxe.com/quest/Cyber/GCFbktoYQ1'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='font-medium underline hover:text-blue-700 dark:hover:text-blue-300 inline-flex items-center'
                >
                  Galxe
                  <ExternalLink className='w-3 h-3 ml-1' />
                </Link>
                .
              </p>
              <p>
                Starting Dec 8th, new users will still be able to participate in all three Commits
                for unclaimed rewards until Dec 15, 2024. For more details, please{' '}
                <Link
                  href='https://www.notion.so/buildoncyber/Commit-Rewards-Breakdown-1360c7ec751f80328b05c0379b8695ac'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='font-medium underline hover:text-blue-700 dark:hover:text-blue-300 inline-flex items-center'
                >
                  check here
                  <ExternalLink className='w-3 h-3 ml-1' />
                </Link>
                .
              </p>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {rewards.map((reward, index) => (
            <RewardCard key={index} {...reward} creds={creds} />
          ))}
        </div>
      </div>
    </main>
  )
}

function RewardCard({ creds, ...reward }: Reward & { creds: number[][] }) {
  const { data: commitment } = useGetCommitmentDetails(reward.commitId ?? '')

  console.log(creds)
  const totalCreds = (creds?.[1])?.[0] ?? 0
  // TODO: Verify this works for wallet with NFTs
  const progress = Math.min((totalCreds / reward.requirement) * 100, 100)

  const status = progress === 100 ? 'Won' : 'In Progress'

  const remainingSlots = reward.totalSlots ? reward.totalSlots - (commitment?.participantCount ?? 0) : undefined
  const totalSlots = reward.totalSlots

  return (
    <div className='relative bg-[#DCDCDC] dark:bg-[#2A2A2A] rounded-xl p-6'>
      <div className='flex justify-between items-start mb-2'>
        <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>{reward.name}</h3>

        <span
          className={`absolute top-4 right-4 text-xs font-medium px-2 py-1 rounded-full ${status === 'Won'
            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
            : status === 'In Progress'
              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
              : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
            }`}
        >
          {status}
        </span>
      </div>

      <p className='text-gray-600 dark:text-gray-400 text-sm mb-4'>{reward.description}</p>

      <div className='mb-4'>
        <span className='text-2xl font-bold text-gray-900 dark:text-white'>
          {reward.tokens.toLocaleString()} $CYBER
        </span>
      </div>

      <div className='space-y-2 mb-4'>
        <div className='flex items-center justify-between text-sm text-gray-600 dark:text-gray-400'>
          <span>Progress: {progress}%</span>
          <div className='flex items-center gap-1'>
            <Gift className='h-4 w-4' />
            <span>
              {remainingSlots !== undefined && totalSlots !== undefined
                ? `${remainingSlots}/${totalSlots}`
                : 'No rewards'}
            </span>
          </div>
        </div>
        <Progress
          value={progress}
          className={`h-2 ${status === 'Won'
            ? 'bg-gray-100 dark:bg-gray-700 [&>div]:bg-black dark:[&>div]:bg-white'
            : 'bg-gray-100 dark:bg-gray-700 [&>div]:bg-gray-300 dark:[&>div]:bg-gray-600'
            }`}
        />
      </div>

      <Button
        className='w-full bg-[#CECECE] text-gray-900 hover:bg-[#BEBEBE]'
        variant={status === 'Won' ? 'default' : 'outline'}
        disabled={status !== 'Won'}
        onClick={() =>
          status === 'Won' &&
          window.open(
            'https://app.galxe.com/quest/Cyber/GCFbktoYQ1',
            '_blank',
            'noopener noreferrer'
          )
        }
      >
        {status === 'Won' ? (
          <>
            <Check className='w-4 h-4 mr-2' />
            Check Rewards on Galxe
          </>
        ) : (
          <>
            <X className='w-4 h-4 mr-2' />
            Not Claimable
          </>
        )}
      </Button>
    </div>
  )
}

export default RewardsPage
