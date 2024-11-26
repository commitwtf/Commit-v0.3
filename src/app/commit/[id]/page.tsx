'use client'
import { Button } from '@/components'
import { TokenAmount } from '@/components/TokenAmount'
import { COMMIT_CONTRACT_ADDRESS } from '@/config/contract'
import {
  getCommitmentDeadlines,
  useCommitmentToken,
  useGetCommitmentDetails,
  useJoinCommitment,
} from '@/hooks/useCommit'
import { useAllowance, useApprove } from '@/hooks/useToken'
import { formatSecondsToDays } from '@/utils/date'
import { useQueryClient } from '@tanstack/react-query'
import { use } from 'react'
import { useAccount } from 'wagmi'
import { User, Users, Clock, AlertCircle, Coins, Wallet } from 'lucide-react'

export default function CommitmentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { data, isError, isLoading } = useGetCommitmentDetails(Number(id))

  if (isLoading) {
    return (
      <main className="flex-1 overflow-y-auto">
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="size-6 rounded-full border-2 border-neutral-800 dark:border-white border-t-transparent animate-spin" />
        </div>
      </main>
    )
  }

  if (isError || !data) {
    return (
      <main className="flex-1 overflow-y-auto">
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] text-red-500">
          <AlertCircle className="w-5 h-5 mr-2" />
          Error loading commitment
        </div>
      </main>
    )
  }

  return (
    <main className="flex-1 overflow-y-auto">
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Commit Details</h1>
          <div className="px-4 py-1.5 bg-[#DCDCDC] dark:bg-[#2A2A2A] rounded-full">
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              Commit #{id}
            </span>
          </div>
        </div>

        <div className="bg-[#DCDCDC] dark:bg-[#2A2A2A] rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{data.description}</h2>
            <span className="px-2.5 py-0.5 text-sm bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full">
              {data.status}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Creator</div>
                <div className="font-mono text-sm text-gray-900 dark:text-white">
                  {data.creator?.address?.slice(0, 8)}...{data.creator?.address?.slice(-6)}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Participants</div>
                <div className="text-gray-900 dark:text-white">{data.participants?.length}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Stake Amount</div>
                <TokenAmount {...data.stakeAmount} className="text-gray-900 dark:text-white" />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Coins className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Creator Fee</div>
                <TokenAmount {...data.creatorFee} className="text-gray-900 dark:text-white" />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-base font-medium mb-1 text-gray-900 dark:text-white">Description</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>


          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <h2 className="text-base font-medium text-gray-900 dark:text-white">Deadline</h2>
            </div>
            <TimeRemaining commitId={id} />
          </div>

          <JoinCommitmentButton commitId={id} stakeAmount={data.stakeAmount?.value + data.creatorFee?.value} />
        </div>
      </div> 
    </main>
  )
}

function TimeRemaining({ commitId = '' }) {
  const { data: deadlines } = getCommitmentDeadlines(commitId)
  if (!deadlines?.length) return null
  return (
    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
      <div>
        <span className="text-gray-500 dark:text-gray-400">Join:</span>{' '}
        {formatSecondsToDays(deadlines[0])}
      </div>
      <div>
        <span className="text-gray-500 dark:text-gray-400">Fulfill:</span>{' '}
        {formatSecondsToDays(deadlines[1])}
      </div>
    </div>
  )
}

function JoinCommitmentButton({
  commitId,
  stakeAmount,
}: {
  commitId: string
  stakeAmount: bigint
}) {
  const { address } = useAccount()
  const queryClient = useQueryClient()

  const { data: token } = useCommitmentToken(commitId)
  const { mutate, isPending } = useJoinCommitment()

  const { data: allowance = 0, queryKey } = useAllowance(token!, address!, COMMIT_CONTRACT_ADDRESS)
  const approve = useApprove(token!, COMMIT_CONTRACT_ADDRESS)

  if (allowance < stakeAmount)
    return (
      <Button
        className="w-full bg-[#CECECE] hover:bg-[#BEBEBE] text-gray-900 h-10 text-sm font-medium transition-colors rounded-lg"
        isLoading={approve.isPending}
        onClick={() =>
          approve.writeContractAsync(BigInt(stakeAmount)).then(() => {
            void queryClient.invalidateQueries({ queryKey })
          })
        }
      >
        Approve
      </Button>
    )

  return (
    <Button
      className="w-full bg-[#CECECE] hover:bg-[#BEBEBE] text-gray-900 h-10 text-sm font-medium transition-colors rounded-lg"
      isLoading={isPending}
      onClick={() => mutate({ commitId })}
    >
      Commit
    </Button>
  )
}