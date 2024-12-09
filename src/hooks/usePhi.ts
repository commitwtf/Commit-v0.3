import { Address, encodeFunctionData } from 'viem'
import { cyber } from 'viem/chains'
import { useReadContract, useReadContracts } from 'wagmi'

const PHI_CONTRACT_ADDRESS = '0x9baBBbE884fe75244f277F90d4bB696434fA1920' as const
const MULTICALL3_ADDRESS = '0xcA11bde05977b3631167028862bE2a173976CA11' as const
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

// ABI for the Multicall3 contract
const MULTICALL3_ABI = [
  {
    inputs: [
      {
        components: [
          { name: 'target', type: 'address' },
          { name: 'allowFailure', type: 'bool' },
          { name: 'callData', type: 'bytes' },
        ],
        name: 'calls',
        type: 'tuple[]',
      },
    ],
    name: 'aggregate3',
    outputs: [
      {
        components: [
          { name: 'success', type: 'bool' },
          { name: 'returnData', type: 'bytes' },
        ],
        name: 'returnData',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const

export function usePhiCreds(addresses?: Address[], requiredCredentials: number = 2) {
  const chainId = BigInt(7560)
  const credIds = [2, 3, 4, 5, 6, 7, 8, 9]

  // Create multicall data for each address and credential ID
  const groupedCalls = addresses?.map((address) =>
    credIds.map((credId) => ({
      target: PHI_CONTRACT_ADDRESS,
      allowFailure: false,
      callData: encodeFunctionData({
        abi: PHI_CONTRACT_ABI,
        functionName: 'isCredMinted',
        args: [chainId, BigInt(credId), address],
      }),
    }))
  )

  // Call the Multicall for each participant with their calldata
  const query = useReadContracts({
    allowFailure: false,
    query: { enabled: Boolean(addresses?.length) },
    contracts: groupedCalls?.map((calls) => ({
      address: MULTICALL3_ADDRESS,
      abi: MULTICALL3_ABI,
      functionName: 'aggregate3',
      args: [calls],
    })),
  })

  // Count the number of phiNFTs
  const data = query.data?.map((res) =>
    res.reduce((count, result) => count + (checkCount(result) ? 1 : 0), 0)
  )

  const completedCount = data?.filter((count) => count >= requiredCredentials).length

  return { ...query, data: [completedCount, data] }
}
function checkCount(result: { success: boolean; returnData: string }) {
  if (!result.success) return false
  return result.returnData === '0x0000000000000000000000000000000000000000000000000000000000000001'
}
