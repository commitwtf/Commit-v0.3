'use client'
import {
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  usePublicClient,
} from 'wagmi'
import { COMMIT_CONTRACT_ADDRESS, COMMIT_ABI } from '@/config/contract'
import { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useWaitForEvent } from './useWaitForEvent'
import { formatEther, formatUnits, getAddress } from 'viem'

export interface CommitmentDetails {
  id: number
  creator: string
  stakeAmount: { formatted: string; value: bigint; token: string }
  joinFee: number
  participants: number
  description: string
  status: number
  timeRemaining: number
}

interface CreateCommitmentParams {
  tokenAddress: string
  stakeAmount: bigint
  joinFee: bigint
  description: string
  joinDeadline: number
  fulfillmentDeadline: number
}

// Get commitment details
export function useGetCommitmentDetails(commitId: number) {
  const { data, ...rest } = useReadContract({
    address: COMMIT_CONTRACT_ADDRESS,
    abi: COMMIT_ABI,
    functionName: 'getCommitmentDetails',
    args: [BigInt(commitId)],
  })

  return {
    ...rest,
    data: data ? formatCommitment(commitId, data) : null,
  }
}

// Create new commitment
export function useCreateCommitment() {
  const { writeContract, isPending } = useWriteContract()
  const [hash, setHash] = useState<string>()

  const {
    data,
    isLoading: isConfirming,
    isSuccess,
  } = useWaitForTransactionReceipt({
    hash,
  })

  const createCommitment = async (params: CreateCommitmentParams) => {
    try {
      const tx = await writeContract({
        address: COMMIT_CONTRACT_ADDRESS,
        abi: COMMIT_ABI,
        functionName: 'createCommitment',
        args: [
          params.tokenAddress,
          params.stakeAmount,
          params.joinFee,
          params.description,
          params.joinDeadline,
          params.fulfillmentDeadline,
        ],
        value: BigInt(1000000000000000),
      })
      if (tx) setHash(tx)
      return tx
    } catch (error) {
      console.error('Contract error:', error)
      throw error
    }
  }

  return {
    createCommitment,
    isLoading: isPending || isConfirming,
    isSuccess,
    txHash: data?.transactionHash,
  }
}

// Join commitment
export function useJoinCommitment() {
  const waitForEvent = useWaitForEvent(COMMIT_ABI)
  const { writeContractAsync } = useWriteContract()

  return useMutation({
    mutationFn: async (params: { commitId: string; stakeAmount: number }) =>
      writeContractAsync({
        address: COMMIT_CONTRACT_ADDRESS,
        abi: COMMIT_ABI,
        functionName: 'joinCommitment',
        args: [BigInt(params.commitId)],
        value: BigInt(params.stakeAmount),
      }).then((hash) => waitForEvent(hash, 'CommitmentJoined')),
  })
}

export function useCommitmentToken(commitId: string) {
  return useReadContract({
    address: COMMIT_CONTRACT_ADDRESS,
    abi: COMMIT_ABI,
    functionName: 'getCommitmentTokenAddress',
    args: [BigInt(commitId)],
  })
}

// Resolve commitment
export function useResolveCommitment() {
  const { writeContract, isPending } = useWriteContract()
  const [hash, setHash] = useState<string>()

  const {
    isLoading: isConfirming,
    isSuccess,
    data,
  } = useWaitForTransactionReceipt({
    hash,
  })

  const resolve = async (commitId: number) => {
    const tx = await writeContract({
      address: COMMIT_CONTRACT_ADDRESS,
      abi: COMMIT_ABI,
      functionName: 'resolveCommitment',
      args: [commitId],
    })
    if (tx) setHash(tx)
    return tx
  }

  return {
    resolveCommitment: resolve,
    isLoading: isPending || isConfirming,
    isSuccess,
    txHash: data?.transactionHash,
  }
}

// Claim rewards
export function useClaimRewards() {
  const { writeContract, isPending } = useWriteContract()
  const [hash, setHash] = useState<string>()

  const {
    isLoading: isConfirming,
    isSuccess,
    data,
  } = useWaitForTransactionReceipt({
    hash,
  })

  const claim = async (commitId: number) => {
    const tx = await writeContract({
      address: COMMIT_CONTRACT_ADDRESS,
      abi: COMMIT_ABI,
      functionName: 'claimRewards',
      args: [commitId],
    })
    if (tx) setHash(tx)
    return tx
  }

  return {
    claimRewards: claim,
    isLoading: isPending || isConfirming,
    isSuccess,
    txHash: data?.transactionHash,
  }
}

// Get participants
export function useGetCommitmentParticipants(commitId: number) {
  return useReadContract({
    address: COMMIT_CONTRACT_ADDRESS,
    abi: COMMIT_ABI,
    functionName: 'getCommitmentParticipants',
    args: [commitId],
  })
}

// Get winners
export function useGetCommitmentWinners(commitId: number) {
  return useReadContract({
    address: COMMIT_CONTRACT_ADDRESS,
    abi: COMMIT_ABI,
    functionName: 'getCommitmentWinners',
    args: [commitId],
  })
}

// Fetch active commitments
export function useGetActiveCommitments() {
  const client = usePublicClient()

  // Get total number of commitments
  const { data: commitCount } = useReadContract({
    address: COMMIT_CONTRACT_ADDRESS,
    abi: COMMIT_ABI,
    functionName: 'nextCommitmentId',
  })

  return useQuery({
    queryKey: ['commitments', 'active', Number(commitCount)],
    queryFn: async () =>
      Promise.all(
        Array.from({ length: Number(commitCount) })
          .fill(0)
          .map((_, id) =>
            client
              ?.readContract({
                address: COMMIT_CONTRACT_ADDRESS,
                abi: COMMIT_ABI,
                functionName: 'getCommitmentDetails',
                args: [BigInt(id)],
              })
              .then((details) => formatCommitment(id, details))
          )
      ),
  })
}

function formatCommitment(id: number, details: readonly any[]) {
  // TODO: Decimals should be fetched from token
  const stakeAmount = details[1] ?? 0
  const timeRemaining = Number(details[6] ?? 0)

  return {
    id,
    creator: details[0],
    stakeAmount: {
      value: stakeAmount,
      formatted: formatUnits(stakeAmount, 18),
      token: 'ETH',
    },
    joinFee: details[2],
    participants: Number(details[3]),
    description: details[4],
    status: details[5],
    timeRemaining,
    // committedValue,
  }
}

// User's commitments
export function useUserCommitments(address: string) {
  const [userCommits, setUserCommits] = useState<CommitmentDetails[]>([])
  const { data: commitCount } = useReadContract({
    address: COMMIT_CONTRACT_ADDRESS,
    abi: COMMIT_ABI,
    functionName: 'nextCommitmentId',
  })

  useEffect(() => {
    const fetchUserCommitments = async () => {
      if (!commitCount || !address) return

      const commits = []
      for (let i = 0; i < Number(commitCount); i++) {
        const participantsResult = await useReadContract({
          address: COMMIT_CONTRACT_ADDRESS,
          abi: COMMIT_ABI,
          functionName: 'getCommitmentParticipants',
          args: [i],
        })

        if (participantsResult.data?.includes(address)) {
          const detailsResult = await useReadContract({
            address: COMMIT_CONTRACT_ADDRESS,
            abi: COMMIT_ABI,
            functionName: 'getCommitmentDetails',
            args: [i],
          })
          commits.push({
            id: i,
            creator: detailsResult.data[0],
            stakeAmount: detailsResult.data[1],
            joinFee: detailsResult.data[2],
            participants: detailsResult.data[3],
            description: detailsResult.data[4],
            status: detailsResult.data[5],
            timeRemaining: detailsResult.data[6],
          })
        }
      }
      setUserCommits(commits)
    }

    fetchUserCommitments()
  }, [commitCount, address])

  return userCommits
}
