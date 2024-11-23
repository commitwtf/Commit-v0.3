import { useAccount, useChainId } from 'wagmi'
import { base } from 'wagmi/chains'

export function useWalletGuard() {
	const { address, isConnected } = useAccount()
	const chainId = useChainId()

	const isWrongNetwork = chainId !== base.id

	const error = !isConnected
		? 'Please connect your wallet using the button above'
		: isWrongNetwork
			? 'Please switch to the right network in your wallet'
			: null

	return {
		address,
		isConnected,
		isWrongNetwork,
		error,
		isReady: isConnected && !isWrongNetwork
	}
}