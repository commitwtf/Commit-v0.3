'use client'
import { Button } from '@/components'
import { TokenAmount } from '@/components/TokenAmount'
import { COMMIT_CONTRACT_ADDRESS } from '@/config/contract'
import {
  useCommitmentToken,
  useGetCommitmentDeadlines,
  useJoinCommitment,
  useProtocolJoinFee,
} from '@/hooks/useCommit'
import { useAllowance, useApprove } from '@/hooks/useToken'
import { useAccount } from 'wagmi'
import { Address, formatEther, getAddress } from 'viem'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

import { CheckBalance } from '@/components/CheckBalance'
import { useUpdateQueries } from '@/hooks/useUpdateQueries'

function hasPassed(date: number) {
  return Date.now() > date
}
export function JoinCommitmentButton({
  commitId,
  participants,
  stakeAmount,
  creatorFee,
}: {
  commitId: string
  participants?: Address[]
  stakeAmount: { value: bigint; formatted: string; token: Address }
  creatorFee: { value: bigint; formatted: string; token: Address }
}) {
  const { address } = useAccount()

  const { data: token } = useCommitmentToken(commitId)
  const { mutateAsync, isPending } = useJoinCommitment()
  const updateQueries = useUpdateQueries()
  const { data: protocolFee } = useProtocolJoinFee()
  const { data: deadlines } = useGetCommitmentDeadlines(commitId)

  const allowance = useAllowance(token!, address!, COMMIT_CONTRACT_ADDRESS)
  const approve = useApprove(token!, COMMIT_CONTRACT_ADDRESS)
  const transferAmount = stakeAmount?.value + creatorFee?.value

  if (deadlines?.[0] && hasPassed(deadlines?.[0])) return <div>Join deadline has passed</div>

  if (address && participants?.includes(getAddress(address)))
    return (
      <div className='flex justify-center'>
        Already joined — complete your commit on{' '}
        <Link
          href='https://phi.box'
          target='_blank'
          rel='noopener noreferrer'
          className='ml-1 font-medium underline hover:text-green-700 dark:hover:text-green-300 inline-flex items-center'
        >
          Phi
          <ExternalLink className='w-3 h-3 ml-1' />
        </Link>
      </div>
    )

  if ((allowance.data ?? 0) < stakeAmount?.value)
    return (
      <Button
        className='w-full bg-[#CECECE] hover:bg-[#BEBEBE] text-gray-900 h-10 text-sm font-medium transition-colors rounded-lg'
        isLoading={approve.isPending}
        onClick={() =>
          approve.writeContractAsync(BigInt(transferAmount)).then(() => {
            void allowance.refetch()
          })
        }
      >
        Approve <TokenAmount {...stakeAmount} value={transferAmount} />
      </Button>
    )

  return (
    <CheckBalance className='w-full' amount={transferAmount} tokenAddress={token!}>
      <Button
        className='w-full bg-[#CECECE] hover:bg-[#BEBEBE] text-gray-900 h-10 text-sm font-medium transition-colors rounded-lg'
        isLoading={isPending}
        onClick={() =>
          mutateAsync({ commitId }).then(() => updateQueries(['commitments', commitId]))
        }
      >
        Commit <TokenAmount {...stakeAmount} value={transferAmount} />
      </Button>
      <div className='flex justify-center text-sm text-gray-600 py-2'>
        +{formatEther(protocolFee!)} ETH to join
      </div>
    </CheckBalance>
  )
}
