import { useAccount, useChainId } from 'wagmi'
import { defaultNetwork } from './useConfig'

export function useWalletGuard() {
  const { address, isConnected, isConnecting } = useAccount()
  const chainId = useChainId()

  const isWrongNetwork = chainId !== defaultNetwork.id

  const error =
    !isConnected && !isConnecting
      ? 'Please connect your wallet using the button above'
      : isWrongNetwork
      ? `Please switch to ${defaultNetwork.name} Network in your wallet`
      : null

  return {
    address,
    isConnected,
    isWrongNetwork,
    error,
    isReady: isConnected && !isWrongNetwork,
  }
}
