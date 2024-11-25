'use client'
import { Button } from '@/components'
import { TokenAmount } from '@/components/TokenAmount'
import { COMMIT_CONTRACT_ADDRESS } from '@/config/contract'
import {
  getCommitmentDeadlines,
  useCommitmentToken,
  useGetCommitmentDetails,
  useJoinCommitment,
  useJoinFee,
} from '@/hooks/useCommit'
import { useAllowance, useApprove } from '@/hooks/useToken'
import { formatSecondsToDays } from '@/utils/date'
import { useQueryClient } from '@tanstack/react-query'
import { use } from 'react'
import { useAccount } from 'wagmi'

export default function CommitmentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { data, isError, isLoading } = useGetCommitmentDetails(Number(id))

  if (isLoading) return <div>Loading...</div>
  if (isError || !data) return <div>Error loading commitment</div>

  const { creator, stakeAmount, creatorFee, participants, description, status } = data

  return (
    <div>
      <h1>Commitment #{id}</h1>
      <p>Creator: {creator?.address}</p>
      <p>
        Stake Amount: <TokenAmount {...stakeAmount} />
      </p>
      <p>
        Join Fee:
        <TokenAmount {...creatorFee} />
      </p>
      <p>Participants: {participants?.length}</p>
      <p>Description: {description}</p>
      <p>Status: {status}</p>
      <TimeRemaining commitId={id} />

      <JoinCommitmentButton commitId={id} stakeAmount={stakeAmount?.value + creatorFee?.value} />
    </div>
  )
}

function TimeRemaining({ commitId = '' }) {
  const { data: deadlines } = getCommitmentDeadlines(commitId)
  if (!deadlines?.length) return null
  return (
    <div>
      <p>Time Remaining: {formatSecondsToDays(deadlines[0])}</p>
      <p>Fulfillment Remaining: {formatSecondsToDays(deadlines[1])}</p>
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
    <Button isLoading={isPending} onClick={() => mutate({ commitId })}>
      Join
    </Button>
  )
}
