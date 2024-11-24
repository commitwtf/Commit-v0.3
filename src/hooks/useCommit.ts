'use client'
import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { COMMIT_CONTRACT_ADDRESS, COMMIT_ABI } from '@/config/contract'
import { useState, useEffect } from 'react'

interface CommitmentDetails {
	creator: string
	stakeAmount: bigint
	joinFee: bigint
	participants: bigint
	description: string
	status: number
	timeRemaining: bigint
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
	return useReadContract({
		address: COMMIT_CONTRACT_ADDRESS,
		abi: COMMIT_ABI,
		functionName: 'getCommitmentDetails',
		args: [commitId],
	})
}

// Create new commitment
export function useCreateCommitment() {
	const { writeContract, isPending } = useWriteContract()
	const [hash, setHash] = useState<string>()

	const { data, isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
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
					params.fulfillmentDeadline
				],
				value: BigInt(1000000000000000)
			})
			if (tx) setHash(tx)
			return tx
		} catch (error) {
			console.error("Contract error:", error)
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
	const { writeContract, isPending } = useWriteContract()
	const [hash, setHash] = useState<string>()

	const { isLoading: isConfirming, isSuccess, data } = useWaitForTransactionReceipt({
		hash,
	})

	const join = async (commitId: number, stakeAmount: bigint) => {
		const tx = await writeContract({
			address: COMMIT_CONTRACT_ADDRESS,
			abi: COMMIT_ABI,
			functionName: 'joinCommitment',
			args: [commitId],
			value: stakeAmount
		})
		if (tx) setHash(tx)
		return tx
	}

	return {
		joinCommitment: join,
		isLoading: isPending || isConfirming,
		isSuccess,
		txHash: data?.transactionHash,
	}
}

// Resolve commitment
export function useResolveCommitment() {
	const { writeContract, isPending } = useWriteContract()
	const [hash, setHash] = useState<string>()

	const { isLoading: isConfirming, isSuccess, data } = useWaitForTransactionReceipt({
		hash,
	})

	const resolve = async (commitId: number) => {
		const tx = await writeContract({
			address: COMMIT_CONTRACT_ADDRESS,
			abi: COMMIT_ABI,
			functionName: 'resolveCommitment',
			args: [commitId]
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

	const { isLoading: isConfirming, isSuccess, data } = useWaitForTransactionReceipt({
		hash,
	})

	const claim = async (commitId: number) => {
		const tx = await writeContract({
			address: COMMIT_CONTRACT_ADDRESS,
			abi: COMMIT_ABI,
			functionName: 'claimRewards',
			args: [commitId]
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
	const [commitments, setCommitments] = useState<CommitmentDetails[]>([])
	const { data: commitCount } = useReadContract({
		address: COMMIT_CONTRACT_ADDRESS,
		abi: COMMIT_ABI,
		functionName: 'nextCommitmentId'
	})

	useEffect(() => {
		const fetchCommitments = async () => {
			if (!commitCount) return

			const commits = []
			for (let i = 0; i < Number(commitCount); i++) {
				const result = await useReadContract({
					address: COMMIT_CONTRACT_ADDRESS,
					abi: COMMIT_ABI,
					functionName: 'getCommitmentDetails',
					args: [i],
				})

				if (result.data && result.data[5] === 0) {
					commits.push({
						id: i,
						creator: result.data[0],
						stakeAmount: result.data[1],
						joinFee: result.data[2],
						participants: result.data[3],
						description: result.data[4],
						status: result.data[5],
						timeRemaining: result.data[6]
					})
				}
			}
			setCommitments(commits)
		}

		fetchCommitments()
	}, [commitCount])

	return commitments
}

// User's commitments 
export function useUserCommitments(address: string) {
	const [userCommits, setUserCommits] = useState<CommitmentDetails[]>([])
	const { data: commitCount } = useReadContract({
		address: COMMIT_CONTRACT_ADDRESS,
		abi: COMMIT_ABI,
		functionName: 'nextCommitmentId'
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
						timeRemaining: detailsResult.data[6]
					})
				}
			}
			setUserCommits(commits)
		}

		fetchUserCommitments()
	}, [commitCount, address])

	return userCommits
}

