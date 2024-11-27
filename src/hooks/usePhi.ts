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

export function usePhiCreds(address?: Address) {
  const credCount = 7
  const { data, ...rest } = useReadContracts({
    allowFailure: false,
    query: { enabled: Boolean(address) },
    contracts: Array.from({ length: credCount }, (_, i) => {
      const credId = i + 2 // credentials from 2 to 8
      return {
        address: PHI_CONTRACT_ADDRESS,
        abi: PHI_CONTRACT_ABI,
        functionName: 'isCredMinted',
        args: [cyber.id, BigInt(credId), address],
      }
    }),
  })

  return {
    ...rest,
    // Returns [credMints, credCount] - eg. [3, 7]
    data: [(data ?? []).filter((d) => Boolean(d)).length, credCount],
  }
}
