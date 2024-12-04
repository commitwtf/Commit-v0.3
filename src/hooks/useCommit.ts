'use client'
import {
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  useReadContracts,
  useAccount,
  useSimulateContract,
} from 'wagmi'
import { COMMIT_ABI } from '@/config/contract'
import { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useWaitForEvent } from './useWaitForEvent'
import { Address, formatUnits, getAddress } from 'viem'
import { gql } from 'graphql-tag'
import { useConfig } from '@/hooks/useConfig'
import { useIndexer } from './useIndexer'
import { baseSepolia, cyber } from 'viem/chains'
import { useParams } from 'next/navigation'

export interface CommitmentDetails {
  id: string
  createdAt: number
  creator: { address: Address }
  stakeAmount: { formatted: string; value: bigint; token: Address }
  creatorFee: { formatted: string; value: bigint; token: Address }
  participantCount: number
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
  participantCount: number
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
      createdAt
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
      participantCount
      participants(first: 1000) {
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
  // Check if CommitID is part of a Cyber ID that needs to be merged
  const idAt = additionalCyberIDs.indexOf(commitId)
  const commitIds = idAt > -1 ? [commitId, originalCyberIds[idAt]] : [commitId]
  const { data, ...rest } = useCommitments(
    { where: { id_in: commitIds } },
    { enabled: Boolean(commitId) }
  )

  const pairedData =
    idAt > -1 && data?.length === 2
      ? [
          {
            ...data[0],
            participantCount: Number(data[0].participantCount) + Number(data[1].participantCount),
            participants: data[0].participants.concat(data[1].participants),
          },
        ]
      : data

  return {
    ...rest,
    data: pairedData?.[0] ?? null,
  }
}

export function useGetCommitmentDeadlines(commitId: string) {
  const contracts = useConfig()
  const { data, ...rest } = useReadContracts({
    contracts: [
      {
        address: contracts.protocol,
        abi: COMMIT_ABI,
        functionName: 'getCommitmentJoinDeadline',
        args: [BigInt(commitId)],
      },
      {
        address: contracts.protocol,
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
  const contracts = useConfig()
  const waitForEvent = useWaitForEvent(COMMIT_ABI)

  const { writeContractAsync } = useWriteContract()
  const { data: PROTOCOL_CREATE_FEE } = useProtocolCreateFee()

  return useMutation({
    mutationFn: async (params: {
      tokenAddress: Address
      stakeAmount: bigint
      creatorFee: bigint
      description: string
      joinDeadline: number
      fulfillmentDeadline: number
    }) => {
      return (
        PROTOCOL_CREATE_FEE &&
        writeContractAsync({
          address: contracts.protocol,
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
          value: PROTOCOL_CREATE_FEE,
        }).then((hash) => waitForEvent(hash, 'CommitmentCreated'))
      )
    },
  })
}

// Join commitment
export function useJoinCommitment() {
  const contracts = useConfig()
  const waitForEvent = useWaitForEvent(COMMIT_ABI)
  const { writeContractAsync } = useWriteContract()
  const { data: PROTOCOL_JOIN_FEE } = useProtocolJoinFee()

  return useMutation({
    mutationFn: async (params: { commitId: string }) =>
      PROTOCOL_JOIN_FEE &&
      writeContractAsync({
        address: contracts.protocol,
        abi: COMMIT_ABI,
        functionName: 'joinCommitment',
        args: [BigInt(params.commitId)],
        value: BigInt(PROTOCOL_JOIN_FEE),
      }).then((hash) => waitForEvent(hash, 'CommitmentJoined')),
  })
}

export function useProtocolJoinFee() {
  const contracts = useConfig()
  return useReadContract({
    address: contracts.protocol,
    abi: COMMIT_ABI,
    functionName: 'PROTOCOL_JOIN_FEE',
  })
}

export function useProtocolCreateFee() {
  const contracts = useConfig()
  return useReadContract({
    address: contracts.protocol,
    abi: COMMIT_ABI,
    functionName: 'PROTOCOL_CREATE_FEE',
  })
}

export function useCommitmentToken(commitId: string) {
  const contracts = useConfig()
  return useReadContract({
    address: contracts.protocol,
    abi: COMMIT_ABI,
    functionName: 'getCommitmentTokenAddress',
    args: [BigInt(commitId)],
  })
}

export function useCommitmentCreatorClaim(commitId: string) {
  const contracts = useConfig()
  return useReadContract({
    address: contracts.protocol,
    abi: COMMIT_ABI,
    functionName: 'getCommitmentCreatorClaim',
    args: [BigInt(commitId)],
  })
}

// Resolve commitment
export function useResolveCommitment() {
  const contracts = useConfig()
  const waitForEvent = useWaitForEvent(COMMIT_ABI)
  const { writeContractAsync } = useWriteContract()

  return useMutation({
    mutationFn: async (params: { commitId: string; winners: Address[] }) =>
      writeContractAsync({
        address: contracts.protocol,
        abi: COMMIT_ABI,
        functionName: 'resolveCommitment',
        args: [BigInt(params.commitId), params.winners],
      }).then((hash) => waitForEvent(hash, 'CommitmentResolved')),
  })
}

export function useCancelCommitment() {
  const contracts = useConfig()
  const waitForEvent = useWaitForEvent(COMMIT_ABI)
  const { writeContractAsync } = useWriteContract()

  return useMutation({
    mutationFn: async (params: { commitId: string }) =>
      writeContractAsync({
        address: contracts.protocol,
        abi: COMMIT_ABI,
        functionName: 'cancelCommitment',
        args: [BigInt(params.commitId)],
      }).then((hash) => waitForEvent(hash, 'CommitmentCancelled')),
  })
}

// Claim rewards
export function useClaimRewards() {
  const contracts = useConfig()
  const waitForEvent = useWaitForEvent(COMMIT_ABI)
  const { writeContractAsync } = useWriteContract()

  return useMutation({
    mutationFn: async (params: { commitId: string }) =>
      writeContractAsync({
        address: contracts.protocol,
        abi: COMMIT_ABI,
        functionName: 'claimRewards',
        args: [BigInt(params.commitId)],
      }).then((hash) => waitForEvent(hash, 'RewardsClaimed')),
  })
}

export function useClaimCreatorFee() {
  const contracts = useConfig()
  const waitForEvent = useWaitForEvent(COMMIT_ABI)
  const { writeContractAsync } = useWriteContract()

  return useMutation({
    mutationFn: async (params: { commitId: string }) =>
      writeContractAsync({
        address: contracts.protocol,
        abi: COMMIT_ABI,
        functionName: 'claimCreator',
        args: [BigInt(params.commitId)],
      }).then((hash) => waitForEvent(hash, 'CreatorClaimed')),
  })
}

// Get participants
export function useGetCommitmentParticipants(commitId: number) {
  const contracts = useConfig()
  return useReadContract({
    address: contracts.protocol,
    abi: COMMIT_ABI,
    functionName: 'getCommitmentParticipants',
    args: [BigInt(commitId)],
  })
}

// Get winners
export function useGetCommitmentWinners(commitId: number) {
  const contracts = useConfig()
  return useReadContract({
    address: contracts.protocol,
    abi: COMMIT_ABI,
    functionName: 'getCommitmentWinners',
    args: [BigInt(commitId)],
  })
}

export function useCommitments(
  filter: {
    orderBy?: 'id' | 'participantCount' | 'createdAt'
    orderDirection?: 'asc' | 'desc'
    where?: {
      creator_in?: Address[]
      id_in?: string[]
      id_not_in?: string[]
      id_gt?: string
      createdAt_gte?: string
      status?: 'Created' | 'Resolved' | 'Cancelled'
      participants_?: { address_in: Address[] }
    }
  },
  opts: { enabled: boolean } = { enabled: true }
) {
  const client = useIndexer()

  return useQuery({
    refetchInterval: 5000,
    enabled: opts.enabled && !!client,
    queryKey: ['commitments', { filter }],
    queryFn: () =>
      client
        ?.query<{
          commitments: CommitmentGraphQL[]
        }>(COMMITMENTS_QUERY, filter)
        .toPromise()
        .then((r) => r.data?.commitments.map(mapCommitment)),
  })
}

// TODO: Update 9, 10, 12 with correct Cyber IDs
const additionalCyberIDs = ['9', '10', '12']
const originalCyberIds = ['6', '7', '8']
const collections = {
  [cyber.id]: {
    featured: [...originalCyberIds, ...additionalCyberIDs],
    hidden: ['11', '12'],
  },
  [baseSepolia.id]: {
    featured: [],
    hidden: [],
  },
}
export function useFeaturedCommits() {
  const { chainId } = useParams()
  const { featured = [] } = collections[Number(chainId) as keyof typeof collections] || {}
  const { data, ...rest } = useCommitments({
    where: { id_in: featured },
    orderBy: 'createdAt',
    orderDirection: 'asc',
  })

  // Pair the newly created commits with the first 3 created.
  // Merge participants and use the newest ID
  const _data = data?.reduce<typeof data>((acc, commit, index, array) => {
    if (index < 3) {
      const pairedCommit = array[index + 3]
      if (pairedCommit) {
        acc.push({
          ...commit,
          id: pairedCommit.id,
          participantCount: Number(commit.participantCount) + Number(pairedCommit.participantCount),
          participants: commit.participants.concat(pairedCommit.participants),
        })
      }
    }
    return acc
  }, [])

  return {
    ...rest,
    data: _data,
  }
}

export function useCommunityCommits() {
  const { chainId } = useParams()
  const { featured = [], hidden = [] } =
    collections[Number(chainId) as keyof typeof collections] || {}

  return useCommitments({
    where: {
      id_not_in: featured.concat(hidden),
      status: 'Created',
      createdAt_gte: '1732893421000',
    },
    orderBy: 'participantCount',
    orderDirection: 'desc',
  })
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
