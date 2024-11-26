'use client'
import {
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  useReadContracts,
  useAccount,
} from 'wagmi'
import { COMMIT_CONTRACT_ADDRESS, COMMIT_ABI } from '@/config/contract'
import { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useWaitForEvent } from './useWaitForEvent'
import { Address, formatUnits, getAddress } from 'viem'
import { client } from '@/lib/graphql'
import { gql } from 'graphql-tag'

export interface CommitmentDetails {
  id: string
  creator: { address: Address }
  stakeAmount: { formatted: string; value: bigint; token: Address }
  creatorFee: { formatted: string; value: bigint; token: Address }
  participants: { address: Address }[]
  winners: { address: Address }[]
  description: string
  status: CommitmentStatus
}

export enum CommitmentStatus {
  Created = 'Created',
  Resolved = 'Resolved',
  Cancelled = 'Cancelled',
}

interface CreateCommitmentParams {
  tokenAddress: string
  stakeAmount: bigint
  joinFee: bigint
  description: string
  joinDeadline: number
  fulfillmentDeadline: number
}

type CommitmentGraphQL = {
  id: string
  creator: {
    address: Address
    totalClaimed: string
  }
  tokenAddress: Address
  stakeAmount: string
  creatorFee: string
  status: string
  participants: {
    address: Address
  }[]
  winners: {
    address: Address
  }[]
  description: string
}
const COMMITMENTS_QUERY = gql`
  query Commitments(
    $first: Int
    $skip: Int
    $orderBy: Commitment_orderBy
    $orderDirection: OrderDirection
    $where: Commitment_filter
  ) {
    commitments(
      first: $first
      skip: $skip
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: $where
    ) {
      id
      description
      creator {
        address
        totalClaimed
      }
      tokenAddress
      stakeAmount
      creatorFee
      creatorFee
      status
      participants {
        address
      }
      winners {
        address
      }
    }
  }
`

// Get commitment details
export function useGetCommitmentDetails(commitId: string) {
  return useQuery({
    queryKey: ['commitments', 'active'],
    queryFn: () =>
      client
        .query<{
          commitments: CommitmentGraphQL[]
        }>(COMMITMENTS_QUERY, {
          where: { id_in: [commitId] },
        })
        .toPromise()
        .then((r) => r.data?.commitments.map(mapCommitment))
        .then((r) => r?.[0] || null),
  })
}

export function useGetCommitmentDeadlines(commitId: string) {
  const { data, ...rest } = useReadContracts({
    contracts: [
      {
        address: COMMIT_CONTRACT_ADDRESS,
        abi: COMMIT_ABI,
        functionName: 'getCommitmentJoinDeadline',
        args: [BigInt(commitId)],
      },
      {
        address: COMMIT_CONTRACT_ADDRESS,
        abi: COMMIT_ABI,
        functionName: 'getCommitmentFulfillmentDeadline',
        args: [BigInt(commitId)],
      },
    ],
  })

  return {
    ...rest,
    data: data?.map((d) => Number(d.result ?? 0) * 1000),
  }
}

// Create new commitment
export function useCreateCommitment() {
  const waitForEvent = useWaitForEvent(COMMIT_ABI)
  const { writeContractAsync } = useWriteContract()
  const { data: PROTOCOL_JOIN_FEE } = useProtocolJoinFee()

  return useMutation({
    mutationFn: async (params: {
      tokenAddress: Address
      stakeAmount: bigint
      creatorFee: bigint
      description: string
      joinDeadline: number
      fulfillmentDeadline: number
    }) => {
      console.log(params)
      return (
        PROTOCOL_JOIN_FEE &&
        writeContractAsync({
          address: COMMIT_CONTRACT_ADDRESS,
          abi: COMMIT_ABI,
          functionName: 'createCommitment',
          args: [
            params.tokenAddress,
            params.stakeAmount,
            params.creatorFee,
            params.description,
            BigInt(params.joinDeadline),
            BigInt(params.fulfillmentDeadline),
          ],
          value: PROTOCOL_JOIN_FEE,
        }).then((hash) => waitForEvent(hash, 'CommitmentCreated'))
      )
    },
  })

  // const { writeContract, isPending } = useWriteContract()
  // const [hash, setHash] = useState<Address>()
  // const {
  //   data,
  //   isLoading: isConfirming,
  //   isSuccess,
  // } = useWaitForTransactionReceipt({
  //   hash,
  // })
  // const createCommitment = async (params: CreateCommitmentParams) => {
  //   try {
  //     const tx = await writeContract({
  //       address: COMMIT_CONTRACT_ADDRESS,
  //       abi: COMMIT_ABI,
  //       functionName: 'createCommitment',
  //       args: [
  // getAddress(params.tokenAddress),
  // params.stakeAmount,
  // params.joinFee,
  // params.description,
  // BigInt(params.joinDeadline),
  // BigInt(params.fulfillmentDeadline),
  //       ],
  //       value: BigInt(1000000000000000),
  //     })
  //     if (tx) setHash(tx)
  //     return tx
  //   } catch (error) {
  //     console.error('Contract error:', error)
  //     throw error
  //   }
  // }
  // return {
  //   createCommitment,
  //   isLoading: isPending || isConfirming,
  //   isSuccess,
  //   txHash: data?.transactionHash,
  // }
}

// Join commitment
export function useJoinCommitment() {
  const waitForEvent = useWaitForEvent(COMMIT_ABI)
  const { writeContractAsync } = useWriteContract()
  const { data: PROTOCOL_JOIN_FEE } = useProtocolJoinFee()

  return useMutation({
    mutationFn: async (params: { commitId: string }) =>
      PROTOCOL_JOIN_FEE &&
      writeContractAsync({
        address: COMMIT_CONTRACT_ADDRESS,
        abi: COMMIT_ABI,
        functionName: 'joinCommitment',
        args: [BigInt(params.commitId)],
        value: BigInt(PROTOCOL_JOIN_FEE),
      }).then((hash) => waitForEvent(hash, 'CommitmentJoined')),
  })
}

export function useProtocolJoinFee() {
  return useReadContract({
    address: COMMIT_CONTRACT_ADDRESS,
    abi: COMMIT_ABI,
    functionName: 'PROTOCOL_JOIN_FEE',
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
  const waitForEvent = useWaitForEvent(COMMIT_ABI)
  const { writeContractAsync } = useWriteContract()

  return useMutation({
    mutationFn: async (params: { commitId: string; winners: Address[] }) =>
      writeContractAsync({
        address: COMMIT_CONTRACT_ADDRESS,
        abi: COMMIT_ABI,
        functionName: 'resolveCommitment',
        args: [BigInt(params.commitId), params.winners],
      }).then((hash) => waitForEvent(hash, 'CommitmentResolved')),
  })
}

export function useCancelCommitment() {
  const waitForEvent = useWaitForEvent(COMMIT_ABI)
  const { writeContractAsync } = useWriteContract()

  return useMutation({
    mutationFn: async (params: { commitId: string }) =>
      writeContractAsync({
        address: COMMIT_CONTRACT_ADDRESS,
        abi: COMMIT_ABI,
        functionName: 'cancelCommitment',
        args: [BigInt(params.commitId)],
      }).then((hash) => waitForEvent(hash, 'CommitmentCancelled')),
  })
}

// Claim rewards
export function useClaimRewards() {
  const waitForEvent = useWaitForEvent(COMMIT_ABI)
  const { writeContractAsync } = useWriteContract()

  return useMutation({
    mutationFn: async (params: { commitId: string }) =>
      writeContractAsync({
        address: COMMIT_CONTRACT_ADDRESS,
        abi: COMMIT_ABI,
        functionName: 'claimRewards',
        args: [BigInt(params.commitId)],
      }).then((hash) => waitForEvent(hash, 'RewardsClaimed')),
  })
}

export function useClaimCreatorFee() {
  const waitForEvent = useWaitForEvent(COMMIT_ABI)
  const { writeContractAsync } = useWriteContract()

  return useMutation({
    mutationFn: async (params: { commitId: string }) =>
      writeContractAsync({
        address: COMMIT_CONTRACT_ADDRESS,
        abi: COMMIT_ABI,
        functionName: 'claimCreator',
        args: [BigInt(params.commitId)],
      }).then((hash) => waitForEvent(hash, 'CreatorClaimed')),
  })
}

// Get participants
export function useGetCommitmentParticipants(commitId: number) {
  return useReadContract({
    address: COMMIT_CONTRACT_ADDRESS,
    abi: COMMIT_ABI,
    functionName: 'getCommitmentParticipants',
    args: [BigInt(commitId)],
  })
}

// Get winners
export function useGetCommitmentWinners(commitId: number) {
  return useReadContract({
    address: COMMIT_CONTRACT_ADDRESS,
    abi: COMMIT_ABI,
    functionName: 'getCommitmentWinners',
    args: [BigInt(commitId)],
  })
}

export function useCommitments(
  filter: {
    orderBy?: 'id'
    orderDirection?: 'asc' | 'desc'
    where?: {
      creator_in?: Address[]
      id_in?: string[]
      participants_?: { address_in: Address[] }
    }
  },
  opts: { enabled: boolean } = { enabled: true }
) {
  return useQuery({
    enabled: opts.enabled,
    queryKey: ['commitments', filter],
    queryFn: () =>
      client
        .query<{
          commitments: CommitmentGraphQL[]
        }>(COMMITMENTS_QUERY, filter)
        .toPromise()
        .then((r) => r.data?.commitments.map(mapCommitment)),
  })
}

// Fetch active commitments
export function useGetActiveCommitments() {
  return useCommitments({ orderBy: 'id', orderDirection: 'desc' })
}
// User's commitments
export function useUserCommitments(address?: Address) {
  return useCommitments({ where: { creator_in: [address!] } }, { enabled: Boolean(address) })
}
export function useJoinedCommitments(address?: Address) {
  return useCommitments(
    { where: { participants_: { address_in: [address!] } } },
    { enabled: Boolean(address) }
  )
}

function mapCommitment(commitment: CommitmentGraphQL) {
  const creatorFee = BigInt(commitment.creatorFee)
  const stakeAmount = BigInt(commitment.stakeAmount)
  return {
    ...commitment,
    status: commitment.status as CommitmentStatus,
    stakeAmount: {
      value: stakeAmount,
      formatted: formatUnits(stakeAmount, 18),
      token: commitment.tokenAddress,
    },
    creatorFee: {
      value: creatorFee,
      formatted: formatUnits(creatorFee, 18),
      token: commitment.tokenAddress,
    },
  }
}

export function useIsCommitCreator(commitId: string) {
  const { address } = useAccount()
  const { data } = useGetCommitmentDetails(commitId)

  const creatorAddress = data?.creator?.address
  return address && creatorAddress && getAddress(creatorAddress) === getAddress(address)
}
