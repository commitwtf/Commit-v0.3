'use client'
import { Button } from '@/components'
import { useGetCommitmentDetails, useJoinCommitment } from '@/hooks/useCommit'
import { formatSecondsToDays, toNow } from '@/utils/date'
import { use } from 'react'

export default function CommitmentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { data, isError, isLoading } = useGetCommitmentDetails(Number(id))

  if (isLoading) return <div>Loading...</div>
  if (isError || !data) return <div>Error loading commitment</div>

  const { creator, stakeAmount, joinFee, participants, description, status, timeRemaining } = data

  return (
    <div>
      <h1>Commitment #{id}</h1>
      <p>Creator: {creator}</p>
      <p>Stake Amount: {stakeAmount.formatted} ETH</p>
      <p>Join Fee: {joinFee} ETH</p>
      <p>Participants: {participants}</p>
      <p>Description: {description}</p>
      <p>Status: {status}</p>
      <p>Time Remaining: {formatSecondsToDays(timeRemaining)} seconds</p>

      <JoinCommitmentButton commitId={id} stakeAmount={stakeAmount.value} />
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
  const { data, mutate, isPending } = useJoinCommitment()
  console.log(data)
  return (
    <Button isLoading={isPending} onClick={() => mutate({ commitId, stakeAmount })}>
      Join
    </Button>
  )
}
