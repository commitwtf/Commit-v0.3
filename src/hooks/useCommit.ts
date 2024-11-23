'use client'
import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { COMMIT_CONTRACT_ADDRESS, COMMIT_ABI } from '@/config/contract'
import { useState, useEffect } from 'react'

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
	const [hash, setHash] = useState<`0x${string}` | undefined>()

	const { data, isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
		hash,
	})

	const createCommitment = async (params: any) => {
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
				value: BigInt(1000000000000000) // 0.001 ETH creation fee
			})

			if (tx) {
				setHash(tx)
			}
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
	const { isLoading: isConfirming, isSuccess, data } = useWaitForTransactionReceipt({
		hash: data?.hash,
	})

	const join = async (commitId: number, stakeAmount: string) => {
		return writeContract({
			address: COMMIT_CONTRACT_ADDRESS,
			abi: COMMIT_ABI,
			functionName: 'joinCommitment',
			args: [commitId],
			value: stakeAmount // Stake amount in ETH
		})
	}

	return {
		joinCommitment: join,
		isLoading: isPending || isConfirming,
		isSuccess,
		txHash: data?.hash,
	}
}

// Resolve commitment
export function useResolveCommitment() {
	const { writeContract, isPending } = useWriteContract()
	const { isLoading: isConfirming, isSuccess, data } = useWaitForTransactionReceipt({
		hash: data?.hash,
	})

	const resolve = async (commitId: number) => {
		return writeContract({
			address: COMMIT_CONTRACT_ADDRESS,
			abi: COMMIT_ABI,
			functionName: 'resolveCommitment',
			args: [commitId]
		})
	}

	return {
		resolveCommitment: resolve,
		isLoading: isPending || isConfirming,
		isSuccess,
		txHash: data?.hash,
	}
}

// Claim rewards
export function useClaimRewards() {
	const { writeContract, isPending } = useWriteContract()
	const { isLoading: isConfirming, isSuccess, data } = useWaitForTransactionReceipt({
		hash: data?.hash,
	})

	const claim = async (commitId: number) => {
		return writeContract({
			address: COMMIT_CONTRACT_ADDRESS,
			abi: COMMIT_ABI,
			functionName: 'claimRewards',
			args: [commitId]
		})
	}

	return {
		claimRewards: claim,
		isLoading: isPending || isConfirming,
		isSuccess,
		txHash: data?.hash,
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
	const [commitments, setCommitments] = useState<any[]>([])
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
	const [userCommits, setUserCommits] = useState<any[]>([])
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
						...detailsResult.data
					})
				}
			}
			setUserCommits(commits)
		}

		fetchUserCommitments()
	}, [commitCount, address])

	return userCommits
}
