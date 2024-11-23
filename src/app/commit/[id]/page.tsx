'use client'
import { useGetCommitmentDetails } from '@/hooks/useCommit'

export default function CommitmentPage({ params }: { params: { id: string } }) {
  const { data, isError, isLoading } = useGetCommitmentDetails(Number(params.id))

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error loading commitment</div>

  const [creator, stakeAmount, joinFee, participantCount, description, status, timeRemaining] = data

  return (
    <div>
      <h1>Commitment #{params.id}</h1>
      <p>Creator: {creator}</p>
      <p>Stake Amount: {stakeAmount.toString()} ETH</p>
      <p>Join Fee: {joinFee.toString()} ETH</p>
      <p>Participants: {participantCount.toString()}</p>
      <p>Description: {description}</p>
      <p>Status: {status}</p>
      <p>Time Remaining: {timeRemaining.toString()} seconds</p>
    </div>
  )
}
