'use client'
import {
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  useReadContracts,
  useAccount,
  useSimulateContract,
} from 'wagmi'
import { COMMIT_ABI_V03 } from '@/config/contract'
import { useState, useEffect } from 'react'
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'
import { useWaitForEvent } from './useWaitForEvent'
import { Address, formatUnits, getAddress } from 'viem'
import { gql } from 'graphql-tag'
import { useConfig } from '@/hooks/useConfig'
import { baseSepolia, cyber } from 'viem/chains'
import { client } from '@/lib/graphql'

export interface CommitmentDetails {
  id: string
  createdAt: number
  creator: { address: Address }
  stakeAmount: { formatted: string; value: bigint; token: Address }
  creatorFee: { formatted: string; value: bigint; token: Address }
  participantCount: number
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
type Participant = {
  address: Address
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
  participants: Participant[]
  winners: Participant[]
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
      status
      participantCount
      winners {
        address
      }
    }
  }
`

const PARTICIPANTS_QUERY = gql`
  query Participants($first: Int, $skip: Int, $where: Commitment_filter) {
    commitments(first: 1, where: $where) {
      participants(first: $first, skip: $skip, where: $p_where) {
        address
      }
    }
  }
`

// Get commitment details
export function useGetCommitmentDetails(commitId: string) {
  const { data, ...rest } = useCommitments(
    { where: { id_in: [commitId] } },
    { enabled: Boolean(commitId) }
  )
  return {
    ...rest,
    data: data?.[0] ?? null,
  }
}

export function useGetCommitmentDeadlines(commitId: string) {
  const contracts = useConfig()
  const { data, ...rest } = useReadContracts({
    contracts: [
      {
        address: contracts.protocol,
        abi: COMMIT_ABI_V03,
        functionName: 'getCommitmentJoinDeadline',
        args: [BigInt(commitId)],
      },
      {
        address: contracts.protocol,
        abi: COMMIT_ABI_V03,
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
  const waitForEvent = useWaitForEvent(COMMIT_ABI_V03)

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
          abi: COMMIT_ABI_V03,
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
  const waitForEvent = useWaitForEvent(COMMIT_ABI_V03)
  const { writeContractAsync } = useWriteContract()
  const { data: PROTOCOL_JOIN_FEE } = useProtocolJoinFee()

  return useMutation({
    mutationFn: async (params: { commitId: string }) =>
      PROTOCOL_JOIN_FEE &&
      writeContractAsync({
        address: contracts.protocol,
        abi: COMMIT_ABI_V03,
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
    abi: COMMIT_ABI_V03,
    functionName: 'PROTOCOL_JOIN_FEE',
  })
}

export function useProtocolCreateFee() {
  const contracts = useConfig()
  return useReadContract({
    address: contracts.protocol,
    abi: COMMIT_ABI_V03,
    functionName: 'PROTOCOL_CREATE_FEE',
  })
}

export function useCommitmentToken(commitId: string) {
  const contracts = useConfig()
  return useReadContract({
    address: contracts.protocol,
    abi: COMMIT_ABI_V03,
    functionName: 'getCommitmentTokenAddress',
    args: [BigInt(commitId)],
  })
}

export function useCommitmentCreatorClaim(commitId: string) {
  const contracts = useConfig()
  return useReadContract({
    address: contracts.protocol,
    abi: COMMIT_ABI_V03,
    functionName: 'getCommitmentCreatorClaim',
    args: [BigInt(commitId)],
  })
}

// Resolve commitment
export function useResolveCommitment() {
  const contracts = useConfig()
  const waitForEvent = useWaitForEvent(COMMIT_ABI_V03)
  const { writeContractAsync } = useWriteContract()

  return useMutation({
    mutationFn: async (params: { commitId: string; winners: Address[] }) =>
      writeContractAsync({
        address: contracts.protocol,
        abi: COMMIT_ABI_V03,
        functionName: 'resolveCommitment',
        args: [BigInt(params.commitId), params.winners],
      }).then((hash) => waitForEvent(hash, 'CommitmentResolved')),
  })
}

export function useCancelCommitment() {
  const contracts = useConfig()
  const waitForEvent = useWaitForEvent(COMMIT_ABI_V03)
  const { writeContractAsync } = useWriteContract()

  return useMutation({
    mutationFn: async (params: { commitId: string }) =>
      writeContractAsync({
        address: contracts.protocol,
        abi: COMMIT_ABI_V03,
        functionName: 'cancelCommitment',
        args: [BigInt(params.commitId)],
      }).then((hash) => waitForEvent(hash, 'CommitmentCancelled')),
  })
}

// Claim rewards
export function useClaimRewards() {
  const contracts = useConfig()
  const waitForEvent = useWaitForEvent(COMMIT_ABI_V03)
  const { writeContractAsync } = useWriteContract()

  return useMutation({
    mutationFn: async (params: { commitId: string }) =>
      writeContractAsync({
        address: contracts.protocol,
        abi: COMMIT_ABI_V03,
        functionName: 'claimRewards',
        args: [BigInt(params.commitId)],
      }).then((hash) => waitForEvent(hash, 'RewardsClaimed')),
  })
}

export function useClaimCreatorFee() {
  const contracts = useConfig()
  const waitForEvent = useWaitForEvent(COMMIT_ABI_V03)
  const { writeContractAsync } = useWriteContract()

  return useMutation({
    mutationFn: async (params: { commitId: string }) =>
      writeContractAsync({
        address: contracts.protocol,
        abi: COMMIT_ABI_V03,
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
    abi: COMMIT_ABI_V03,
    functionName: 'getCommitmentParticipants',
    args: [BigInt(commitId)],
  })
}

// Get winners
export function useGetCommitmentWinners(commitId: number) {
  const contracts = useConfig()
  return useReadContract({
    address: contracts.protocol,
    abi: COMMIT_ABI_V03,
    functionName: 'getCommitmentWinners',
    args: [BigInt(commitId)],
  })
}

export function useCommitments(
  filter: {
    orderBy?: 'id' | 'participantCount'
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

const collections = {
  [cyber.id]: {
    featured: ['6', '7', '8', '14', '15', '16'],
    hidden: ['11', '12'],
  },
  [baseSepolia.id]: {
    featured: [],
    hidden: [],
  },
}
export function useFeaturedCommits() {
  const { featured = [] } = collections[cyber.id]
  return useCommitments({
    where: { id_in: featured },
    orderBy: 'id',
    orderDirection: 'asc',
  })
}

export function useCommunityCommits() {
  const { featured = [], hidden = [] } = collections[cyber.id]

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

export function useHasJoinedPrevious(commitId: string) {
  const { address } = useAccount()
  const commitIndex = collections[cyber.id].featured.indexOf(commitId)
  const joinedCommit = collections[cyber.id].featured[commitIndex]

  const { data, ...rest } = useCommitments(
    {
      where: {
        id_in: [joinedCommit],
        participants_: { address_in: [address!] },
      },
    },
    { enabled: Boolean(address) }
  )

  return {
    ...rest,
    data: Boolean(data?.length),
  }
}

export function useParticipants(commitId: string) {
  const PAGE_SIZE = 1000
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage, ...rest } = useInfiniteQuery({
    initialPageParam: 0,
    queryKey: ['participants', { commitId }],
    queryFn: async (props) =>
      client
        ?.query<{
          commitments: CommitmentGraphQL[]
        }>(PARTICIPANTS_QUERY, {
          where: { id_in: [commitId] },
          first: PAGE_SIZE,
          skip: props.pageParam,
        })
        .toPromise()
        .then((r) => r.data?.commitments?.[0].participants?.map((p) => getAddress(p.address))),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage?.length === PAGE_SIZE) {
        return allPages.flat().length // The next skip value is the total fetched so far
      }
      return undefined // No more pages
    },
  })

  useEffect(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  return {
    ...rest,
    data: data?.pages.flat() as Address[],
  }
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
