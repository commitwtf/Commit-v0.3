'use client'

import { AlertCircle } from 'lucide-react'
import { CommitCard } from '@/src/components'
import { useWalletGuard } from '@/hooks/useWalletGuard'
import { useGetActiveCommitments } from '@/hooks/useCommit'
import { WalletError } from '@/components'
import Link from 'next/link'

const HomePage = () => {
  const { error: walletError } = useWalletGuard()
  const { data: commits = [] } = useGetActiveCommitments()

  const filteredCommits = [6, 7, 8]
    .map((id) => commits.find((commit) => Number(commit.id) === id))
    .filter((commit): commit is NonNullable<typeof commit> => commit !== undefined)

  return (
    <main className='flex-1 overflow-y-auto'>
      <div className='max-w-7xl mx-auto p-6'>
        <div className='bg-blue-50 dark:bg-blue-950/50 rounded-lg p-6 mb-6'>
          <h2 className='text-xl font-semibold mb-4 text-gray-900 dark:text-white'>
            Welcome to the featured Commit page for Phi: Cyber Safari!
          </h2>
          <div className='text-sm text-gray-800 dark:text-gray-200 space-y-4'>
            <p>
              If you're new here, Commit is a protocol designed to help you commit to activities
              you're interested in, have fun with others who share similar goals, and win rewards!
            </p>
            <p>
              For the Phi: Cyber Safari campaign, there are three Commits ready for you to join! To
              participate in any Commit, please ensure you have $0.001 ETH on the Cyber mainnet for
              gas (visit{' '}
              <Link
                href='https://cyber.co/bridge'
                className='text-blue-600 dark:text-blue-400 hover:underline'
              >
                https://cyber.co/bridge
              </Link>{' '}
              if needed). Additionally, you'll need $0.005 WETH to join each Commit (visit{' '}
              <Link
                href='https://cyberswap.cc/trade/swap'
                className='text-blue-600 dark:text-blue-400 hover:underline'
              >
                https://cyberswap.cc/trade/swap
              </Link>{' '}
              for ETH &lt;&gt; WETH conversion).
            </p>
            <p>We hope you have fun!</p>
          </div>
        </div>

        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-2xl font-semibold text-gray-900 dark:text-white'>Active Commits</h1>
          <div className='px-4 py-1.5 bg-[#DCDCDC] dark:bg-[#2A2A2A] rounded-full'>
            <span className='text-sm font-medium text-gray-900 dark:text-white'>
              Total Commits: 3
            </span>
          </div>
        </div>

        <WalletError error={walletError} />

        {commits.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {filteredCommits.map((commit) => (
              <CommitCard key={commit.id} {...commit} />
            ))}
          </div>
        ) : (
          <div className='text-center py-12'>
            <p className='text-gray-500 dark:text-gray-400'>No active commits found.</p>
          </div>
        )}
      </div>
    </main>
  )
}

export default HomePage
