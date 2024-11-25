'use client'
import { Button } from '@/components'
import { COMMIT_CONTRACT_ADDRESS } from '@/config/contract'
import {
  useCommitmentToken,
  useGetCommitmentDetails,
  useJoinCommitment,
  useJoinFee,
} from '@/hooks/useCommit'
import { useAllowance, useApprove } from '@/hooks/useToken'
import { formatSecondsToDays, toNow } from '@/utils/date'
import { useQueryClient } from '@tanstack/react-query'
import { use } from 'react'
import { useAccount } from 'wagmi'

export default function CommitmentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { data, isError, isLoading } = useGetCommitmentDetails(Number(id))

  if (isLoading) return <div>Loading...</div>
  if (isError || !data) return <div>Error loading commitment</div>

  const { creator, stakeAmount, creatorFee, participants, description, status, timeRemaining } =
    data

  return (
    <div>
      <h1>Commitment #{id}</h1>
      <p>Creator: {creator}</p>
      <p>
        Stake Amount: {stakeAmount.formatted} {stakeAmount.token}
      </p>
      <p>
        Join Fee: {creatorFee.formatted} {creatorFee.token}
      </p>
      <p>Participants: {participants}</p>
      <p>Description: {description}</p>
      <p>Status: {status}</p>
      <p>Time Remaining: {formatSecondsToDays(timeRemaining)} seconds</p>

      <JoinCommitmentButton
        commitId={id}
        // creatorFee={creatorFee.value}
        stakeAmount={stakeAmount.value + creatorFee.value}
      />
    </div>
  )
}

function JoinCommitmentButton({
  commitId,
  stakeAmount,
}: {
  commitId: string
  stakeAmount: number
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
