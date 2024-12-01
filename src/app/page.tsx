'use client'

import { CommitCard } from '@/src/components'
import { useWalletGuard } from '@/hooks/useWalletGuard'
import { useCommunityCommits, useFeaturedCommits } from '@/hooks/useCommit'
import { WalletError } from '@/components'
import { Markdown } from '@/components/ui/markdown'

const campaigns = [
  `## Welcome to the featured Commit page for Phi: Cyber Safari!
If you're new here, Commit is a protocol designed to help you commit to activities
you're interested in, have fun with others who share similar goals, and win rewards!

For the Phi: Cyber Safari campaign, there are three Commits ready for you to join! To
participate in any Commit, please ensure you have 0.001 ETH on the Cyber mainnet for
gas and 0.0005 WETH to join each Commit — use 'Swap tokens' on the sidebar for cross-chain bridging and swapping.

We hope you have fun! To learn more about the exact steps to join and complete your
Commit, please check the user guide [here](https://buildoncyber.notion.site/Phi-Cyber-Safari-User-Guide-1470c7ec751f80099008de1fb7f64943).
    `,
]

const HomePage = () => {
  const { error: walletError } = useWalletGuard()
  const featured = useFeaturedCommits()
  const community = useCommunityCommits()

  return (
    <main className='flex-1 overflow-y-auto'>
      <div className='max-w-7xl mx-auto p-6 space-y-16'>
        <section>
          <div className='flex justify-between items-center mb-6'>
            <h1 className='text-2xl font-semibold text-gray-900 dark:text-white'>
              Featured Commits
            </h1>
            <div className='px-4 py-1.5 bg-[#DCDCDC] dark:bg-[#2A2A2A] rounded-full'>
              <span className='text-sm font-medium text-gray-900 dark:text-white'>
                Total Commits: {featured.data?.length}
              </span>
            </div>
          </div>
          <div className='bg-blue-50 dark:bg-blue-950/50 rounded-lg p-6 mb-6'>
            <Markdown className={'prose-sm'}>{campaigns[0]}</Markdown>
          </div>
          <WalletError error={walletError} />
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {(featured.isPending ? createLoadingCards(3) : featured.data)?.map((commit) => (
              <CommitCard key={commit.id} {...commit} />
            ))}
          </div>
          {!featured.isPending && !featured.data?.length && (
            <div className='text-center py-12'>
              <p className='text-gray-500 dark:text-gray-400'>No active commits found.</p>
            </div>
          )}
        </section>
        <section>
          <div className='flex justify-between items-center mb-6'>
            <h1 className='text-2xl font-semibold text-gray-900 dark:text-white'>
              Community Commits
            </h1>
            <div className='px-4 py-1.5 bg-[#DCDCDC] dark:bg-[#2A2A2A] rounded-full'>
              <span className='text-sm font-medium text-gray-900 dark:text-white'>
                Total Commits: {community.data?.length}
              </span>
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {(community.isPending ? createLoadingCards(3) : community.data)?.map((commit) => (
              <CommitCard key={commit.id} {...commit} />
            ))}
          </div>
          {!community.isPending && !community.data?.length && (
            <div className='text-center py-12'>
              <p className='text-gray-500 dark:text-gray-400'>No community commits found.</p>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

function createLoadingCards(length: number) {
  return Array.from({ length })
    .fill(0)
    .map((_, id) => ({
      id: String(id),
      key: String(id),
      isLoading: true,
    }))
}

export default HomePage
