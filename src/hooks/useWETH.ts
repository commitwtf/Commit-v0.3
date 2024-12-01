import { useMutation } from '@tanstack/react-query'
import { useConfig } from './useConfig'
import { useWriteContract } from 'wagmi'
import { useWaitForEvent } from './useWaitForEvent'

const wethAbi = [
  {
    constant: false,
    inputs: [],
    name: 'deposit',
    outputs: [],
    payable: true,
    stateMutability: 'payable',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'dst',
        type: 'address',
      },
      {
        indexed: false,
        name: 'wad',
        type: 'uint256',
      },
    ],
    name: 'Deposit',
    type: 'event',
  },
]
export function useWETH() {
  const contracts = useConfig()
  const waitForEvent = useWaitForEvent(wethAbi)
  const { writeContractAsync } = useWriteContract()

  return useMutation({
    mutationFn: async ({ value }: { value: bigint }) =>
      writeContractAsync({
        address: contracts.weth!,
        abi: wethAbi,
        functionName: 'deposit',
        value,
      }).then((hash) => waitForEvent(hash, 'Deposit')),
  })
}
