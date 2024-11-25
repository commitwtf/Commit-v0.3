import { useAccount, useChainId } from 'wagmi'

const CYBER_CHAIN_ID = 7560

export function useWalletGuard() {
  const { address, isConnected } = useAccount()
  const chainId = useChainId()

  console.log('Current Chain ID:', chainId)
  console.log('Expected Chain ID:', CYBER_CHAIN_ID)

  const isWrongNetwork = chainId !== CYBER_CHAIN_ID

  console.log('Current ChainId:', chainId)
  console.log('Expected ChainId:', CYBER_CHAIN_ID)
  console.log('Is Connected:', isConnected)

  const error = !isConnected
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
