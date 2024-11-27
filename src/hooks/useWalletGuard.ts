import { useAccount, useChainId } from 'wagmi'

const CYBER_CHAIN_ID = 7560

export function useWalletGuard() {
  const { address, isConnected, isConnecting } = useAccount()
  const chainId = useChainId()

  const isWrongNetwork = chainId !== CYBER_CHAIN_ID

  const error =
    !isConnected && !isConnecting
      ? 'Please connect your wallet using the button above'
      : isWrongNetwork
      ? 'Please switch to Cyber Network in your wallet'
      : null

  return {
    address,
    isConnected,
    isWrongNetwork,
    error,
    isReady: isConnected && !isWrongNetwork,
  }
}
