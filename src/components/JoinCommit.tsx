'use client'
import { Button } from '@/components'
import { TokenAmount } from '@/components/TokenAmount'
import { COMMIT_CONTRACT_ADDRESS } from '@/config/contract'
import { useCommitmentToken, useJoinCommitment } from '@/hooks/useCommit'
import { useAllowance, useApprove } from '@/hooks/useToken'
import { useAccount } from 'wagmi'
import { Address } from 'viem'

import { CheckBalance } from '@/components/CheckBalance'
import { useUpdateQueries } from '@/hooks/useUpdateQueries'

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

  const allowance = useAllowance(token!, address!, COMMIT_CONTRACT_ADDRESS)
  const approve = useApprove(token!, COMMIT_CONTRACT_ADDRESS)
  const transferAmount = stakeAmount?.value + creatorFee?.value

  if (participants?.includes(address!))
    return <div className='flex justify-center'>Already joined</div>

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
    </CheckBalance>
  )
}
