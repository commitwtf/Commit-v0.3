import { Address } from 'viem'
import { cyber } from 'viem/chains'
import { useReadContracts } from 'wagmi'

const PHI_CONTRACT_ADDRESS = '0x9baBBbE884fe75244f277F90d4bB696434fA1920' as const
const PHI_CONTRACT_ABI = [
  {
    type: 'function',
    inputs: [
      { name: 'credChainId', internalType: 'uint256', type: 'uint256' },
      { name: 'credId', internalType: 'uint256', type: 'uint256' },
      { name: 'minter', internalType: 'address', type: 'address' },
    ],
    name: 'isCredMinted',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
] as const

export function usePhiCreds(addresses?: Address[], requiredCredentials: number = 2) {
  const credCount = 8
  const { data, isLoading, ...rest } = useReadContracts({
    allowFailure: false,
    query: { enabled: addresses && Boolean(addresses?.length) },
    contracts:
      addresses?.flatMap((address) =>
        Array.from({ length: credCount }, (_, i) => {
          const credId = i + 2 // credentials from 2 to 8
          return {
            address: PHI_CONTRACT_ADDRESS,
            abi: PHI_CONTRACT_ABI,
            functionName: 'isCredMinted',
            args: [cyber.id, BigInt(credId), address],
          }
        })
      ) ?? [],
  })

  // For single address (rewards page), return total creds
  if (addresses?.length === 1) {
    const totalCreds = data?.filter(Boolean).length ?? 0
    return {
      ...rest,
      isLoading,
      data: [totalCreds, addresses.length],
    }
  }

  // For multiple addresses (completion status), return completed count
  const completedCount =
    data?.reduce((acc, _, index, array) => {
      if (index % credCount === 0) {
        const participantCreds = array.slice(index, index + credCount)
        if (participantCreds.filter(Boolean).length >= requiredCredentials) acc++
      }
      return acc
    }, 0) ?? 0

  return {
    ...rest,
    isLoading,
    data: [completedCount, addresses?.length ?? 0],
  }
}
